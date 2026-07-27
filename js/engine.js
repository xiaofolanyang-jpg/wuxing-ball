/* ============================================================
   engine.js — 游戏引擎核心
   职责：状态机调度、加点、属性检定、effects 应用、比赛模拟、结局判定
   依赖：window.CONFIG / window.State / window.Story / window.UI
   暴露：window.Engine
   ============================================================ */
(function (global) {
  "use strict";

  let CONFIG = null;
  let currentEvent = null;       // 当前事件对象
  let matchState = null;         // 比赛运行态

  function bindConfig(cfg) { CONFIG = cfg; }

  /* ---------- 属性检定 ---------- */
  // attrs: 参与检定的属性key数组, difficulty: 0-100, opponentEl: 对手灵根(中文,可空)
  function skillCheck(attrs, difficulty, opponentEl) {
    const st = global.State.current;
    const vals = attrs.map(a => st.attrs[a] || 0);
    const avg = vals.reduce((s, v) => s + v, 0) / vals.length;
    let chance = CONFIG.baseCheckChance + (avg - difficulty) * CONFIG.checkSlope;

    // 灵根相克：玩家灵根被对手克制则 -10%
    if (opponentEl && st.rootType && CONFIG.ke[st.rootType] === opponentEl) {
      chance -= 0.10;
    }
    // 羁绊加成（设计稿第五章·羁绊技能）：已解锁羁绊在对应条件下提升检定成功率
    if (st.bondsUnlocked && st.bondsUnlocked.length && CONFIG.bonds) {
      const oppName = matchState ? matchState.opponentName : "";
      st.bondsUnlocked.forEach(bid => {
        const b = CONFIG.bonds[bid];
        if (!b || !b.bonus) return;
        if (bid === "zhaolin" && oppName.indexOf("赵凛") < 0) return;
        if (bid === "canglan" && opponentEl !== "水") return;
        chance += b.bonus;
      });
    }
    chance = Math.max(CONFIG.clampMin, Math.min(CONFIG.clampMax, chance));

    if (Math.random() < CONFIG.critChance) return "critical";
    return Math.random() < chance ? "success" : "fail";
  }

  /* ---------- 加点 ---------- */
  function applyTrainPoint(attrName) {
    const st = global.State.current;
    if (st.trainPoints <= 0) return false;
    const el = global.State.attrToElement(attrName);
    const mult = global.State.getMultiplier(el);
    st.attrs[attrName] = Math.min(999, st.attrs[attrName] + mult);
    st.trainPoints -= 1;
    return true;
  }

  /* ---------- 羁绊系统（设计稿第五章） ---------- */
  // 羁绊进度累积 + 解锁检查
  function addBondProgress(bondId, amount) {
    if (!amount || !CONFIG.bonds || !CONFIG.bonds[bondId]) return;
    const st = global.State.current;
    if (!st.bondProgress) st.bondProgress = {};
    if (!st.bondsUnlocked) st.bondsUnlocked = [];
    st.bondProgress[bondId] = (st.bondProgress[bondId] || 0) + amount;
    const def = CONFIG.bonds[bondId];
    if (st.bondProgress[bondId] >= def.threshold && st.bondsUnlocked.indexOf(bondId) < 0) {
      st.bondsUnlocked.push(bondId);
      global.UI.toast("羁绊解锁·" + def.name);
    }
  }

  /* ---------- effects 应用 ---------- */
  function applyEffects(effects) {
    if (!effects) return;
    const st = global.State.current;
    const numKeys = ["reputation", "stamina", "spiritStones", "trainPoints",
                     "age", "chapter", "goals", "assists", "matches", "wins", "round"];
    numKeys.forEach(k => {
      if (effects[k] !== undefined) {
        st[k] = (st[k] || 0) + effects[k];
      }
    });
    if (effects.attrs) {
      Object.keys(effects.attrs).forEach(a => {
        st.attrs[a] = Math.max(0, Math.min(999, (st.attrs[a] || 0) + effects.attrs[a]));
      });
    }
    // 全属性百分比加成（设计稿第八章·心魔劫选项C：全属性+3%）
    if (effects.allAttrsPercent) {
      Object.keys(st.attrs).forEach(a => {
        st.attrs[a] = Math.min(999, st.attrs[a] * (1 + effects.allAttrsPercent / 100));
      });
    }
    if (effects.flags) Object.assign(st.flags, effects.flags);
    if (effects.relationships) {
      Object.keys(effects.relationships).forEach(r => {
        st.relationships[r] = (st.relationships[r] || 0) + effects.relationships[r];
      });
    }
    if (effects.position) st.position = effects.position;
    if (effects.playstyle) st.playstyle = effects.playstyle;
    // 心魔值增减（设计稿第八章·心魔劫）
    if (effects.demonValue !== undefined) {
      st.demonValue = Math.max(0, (st.demonValue || 0) + effects.demonValue);
    }
    // 羁绊进度（设计稿第五章）
    if (effects.bonds) {
      Object.keys(effects.bonds).forEach(b => addBondProgress(b, effects.bonds[b]));
    }
    if (st.stamina > 100) st.stamina = 100;
    if (st.stamina < 0) st.stamina = 0;
  }

  /* ---------- 修炼回合推进 ---------- */
  function endRound() {
    const st = global.State.current;
    st.round += 1;
    global.State.refillTrainPoints();
    global.UI.updateStatus();
    autoSave(true);
  }

  /* ---------- 自动存档 ---------- */
  let saveTimer = null;
  function autoSave(silent) {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      global.State.save();
      if (!silent) global.UI.toast("已存档");
    }, 300);
  }

  /* ---------- 选项可见性（when 条件） ---------- */
  // choice.when: { rerollLeft: true } 要求剩余重roll次数>0；{ flag: "xx" } 要求旗标为真；{ notFlag: "xx" } 要求旗标为假
  function choiceVisible(c) {
    if (!c.when) return true;
    const st = global.State.current;
    if (c.when.rerollLeft) {
      const left = Math.max(0, (CONFIG.maxRerolls - 1) - (st.rerollCount || 0));
      if (left <= 0) return false;
    }
    if (c.when.flag && !(st.flags && st.flags[c.when.flag])) return false;
    if (c.when.notFlag && st.flags && st.flags[c.when.notFlag]) return false;
    if (c.when.mixedRoot && st.rootQuality !== "mixed") return false;
    return true;
  }

  /* ============================================================
     事件调度主循环
     ============================================================ */
  async function goto(eventId) {
    const ev = global.Story.getEvent(eventId);
    if (!ev) {
      global.UI.renderTextBlock("【事件缺失：" + eventId + "】");
      return;
    }
    currentEvent = ev;
    global.State.current.currentEventId = eventId;

    // 特殊类型预处理
    if (ev.type === "root_awaken") {
      if (!global.State.current.rootType) {
        const r = global.State.rollRoot();
        Object.assign(global.State.current, r);
        global.UI.updateStatus();
      }
    }
    // 渲染正文（支持 byRoot：按玩家灵根动态切换 text/system）
    let textSrc = ev.text;
    let systemSrc = ev.system;
    if (ev.byRoot && global.State.current && global.State.current.rootType) {
      const key = global.State.current.rootQuality === "mixed" ? "杂" : global.State.current.rootType;
      const br = ev.byRoot[key];
      if (br) {
        if (br.text) textSrc = br.text;
        if (br.system) systemSrc = br.system;
      }
    }
    if (textSrc) {
      await global.UI.renderTextBlock(textSrc);
    }
    // 系统提示（金色段落）
    if (systemSrc) {
      await global.UI.renderDivider();
      await global.UI.renderTextBlock(systemSrc, { system: true });
    }
    // 灵根重选：对比提示 + 铜钱提示（设计稿 3.2）
    if (ev.type === "root_awaken") {
      const st = global.State.current;
      const rerollLeft = Math.max(0, (CONFIG.maxRerolls - 1) - (st.rerollCount || 0));
      if ((st.rerollCount || 0) > 0 && st.lastRootDisplay) {
        await global.UI.renderTextBlock("【重新觉醒】上次：" + st.lastRootDisplay + " → 本次：" + global.State.rootDisplay(), { system: true });
      }
      if (rerollLeft > 0) {
        const hint = (st.rerollCount || 0) === 0
          ? CONFIG.rootRerollHint
          : "庙祝摩挲着桌上剩下的铜钱：「只剩{rerollLeft}次机会了。想好了再按。」";
        await global.UI.renderTextBlock(hint, { system: true });
      }
    }

    // 结局分发：显示过渡文字后判定
    if (ev.type === "ending_dispatch") {
      await global.UI.waitContinue();
      return dispatchEnding();
    }

    // 修炼面板
    if (ev.type === "train") {
      return runTrain(ev);
    }
    // 比赛
    if (ev.type === "match") {
      return runMatch(ev);
    }
    // 结局
    if (ev.type === "ending") {
      return global.UI.showEnding(ev, false);
    }

    // 普通选项（按 when 条件过滤后渲染）
    if (ev.choices && ev.choices.length) {
      let visible = ev.choices.filter(choiceVisible);
      if (!visible.length) visible = ev.choices; // 兜底：when 条件全过滤时显示全部选项，防止卡死
      const choice = await global.UI.renderChoices(visible);
      await handleChoice(choice, ev);
    } else {
      // 无选项事件，停留等继续
      await global.UI.waitContinue();
      // 事件级 effects（章末结算：chapter/age 递增、声望等）
      if (ev.effects) {
        applyEffects(ev.effects);
        global.UI.updateStatus();
        autoSave(true);
      }
      if (ev.next) goto(ev.next);
    }
  }

  // 处理选项：检定 + effects + 跳转
  async function handleChoice(choice, parentEvent) {
    // 灵根重roll：不走正常 effects/跳转，直接重抽灵根并回到觉醒结果事件（设计稿 3.2）
    if (choice.reroll) {
      const st = global.State.current;
      st.lastRootDisplay = global.State.rootDisplay();
      const r = global.State.rollRoot();
      Object.assign(st, r);
      st.rerollCount = (st.rerollCount || 0) + 1;
      global.UI.updateStatus();
      autoSave(true);
      if (choice.next) goto(choice.next);
      return;
    }
    let resultText = "";
    let effects = choice.effects || {};
    let nextId = choice.next;
    let checkKind = null;

    if (choice.check) {
      const opponentEl = matchState ? matchState.opponentEl : null;
      let difficulty = choice.check.difficulty;
      if (matchState) difficulty += (matchState.difficultyMod || 0);
      const r = skillCheck(choice.check.attrs, difficulty, opponentEl);
      checkKind = r;
      const branch = choice[r] || choice.success;
      if (branch) {
        if (branch.text) resultText = global.Story.interpolate(branch.text);
        effects = branch.effects || effects;
        nextId = branch.next || nextId;
      }
      global.UI.showCheckResult(r, global.Story.interpolate(choice.check.tag || ""));
    }

    applyEffects(effects);
    global.UI.updateStatus();

    if (resultText) {
      await global.UI.renderTextBlock(resultText, { check: checkKind });
    }

    // 比赛模式：威胁值 / 进球助攻 / 关键成功 跟踪（设计稿第五章）
    if (matchState) {
      if (choice.check) {
        matchState.totalCount++;
        if (checkKind === "success" || checkKind === "critical") {
          matchState.successCount++;
          matchState.success++;
          const base = matchState.isKeyMoment ? 2 : 1;
          matchState.threat += base + (checkKind === "critical" ? 1 : 0);
          if (matchState.isKeyMoment) matchState.keySuccess++;
        } else {
          matchState.oppThreat += 1;
        }
        if (matchState.isKeyMoment) matchState.keyAttempts++;
      }
      if (effects.goals) matchState.goals += effects.goals;
      if (effects.assists) matchState.assists += effects.assists;
      // 比赛子事件结束后由 runMatch 接管流程，不在此跳转
      return;
    }

    await global.UI.waitContinue();

    if (parentEvent && parentEvent.type === "train") {
      endRound();
    }

    if (nextId) goto(nextId);
  }

  /* ============================================================
     修炼面板
     ============================================================ */
  async function runTrain(ev) {
    await global.UI.showTrainPanel(ev);
    endRound();
    if (ev.next) goto(ev.next);
  }

  /* ============================================================
     比赛模拟
     ============================================================ */
  function buildPoolId(ev) {
    const st = global.State.current;
    if (st.position && st.playstyle) {
      const id = st.position + "_" + st.playstyle;
      if (global.Story.hasMatchPool(id)) return id;
    }
    return ev.pool || null;
  }

  /* ---------- 比赛辅助（设计稿第五章） ---------- */
  // 威胁值 → 弹性进球数
  function threatToGoals(t) {
    if (t >= 5) return 3;
    if (t >= 3) return 2;
    if (t >= 1) return 1;
    return 0;
  }

  // 评级奖励表
  const RATING_REWARDS = {
    S: { points: 3, reputation: 15 },
    A: { points: 2, reputation: 10 },
    B: { points: 1, reputation: 5 },
    C: { points: 0, reputation: 1 },
    D: { points: 0, reputation: -3 }
  };

  // 比赛评级：S(进球+助攻≥2且关键全成) / A(有进球或助攻且成功率>70%) / B(50-70%) / C(30-50%) / D(<30%)
  function computeRating(ms) {
    const rate = ms.totalCount > 0 ? ms.successCount / ms.totalCount : 0;
    const ga = ms.goals + ms.assists;
    if (ga >= 2 && ms.keyAttempts > 0 && ms.keySuccess >= ms.keyAttempts) return "S";
    if (ga >= 1 && rate > 0.7) return "A";
    if (rate >= 0.5) return "B";
    if (rate >= 0.3) return "C";
    return "D";
  }

  // 从数组随机抽 n 个（不重复）
  function pickRandom(arr, n) {
    const copy = arr.slice();
    const out = [];
    for (let i = 0; i < n && copy.length; i++) {
      const idx = Math.floor(Math.random() * copy.length);
      out.push(copy.splice(idx, 1)[0]);
    }
    return out;
  }

  // 当前局面（按弹性比分）：leading / level / trailing
  function currentSituation() {
    const gf = threatToGoals(matchState.threat);
    const ga = threatToGoals(matchState.oppThreat);
    if (gf > ga) return "leading";
    if (gf < ga) return "trailing";
    return "level";
  }
  function situationName(s) {
    return { leading: "领先", level: "平局", trailing: "落后" }[s] || s;
  }

  // 当前攻防姿态（用于选项过滤与事件抽取）：strong→attack / even→balanced / weak→defense
  function computePosture() {
    if (!matchState) return "balanced";
    if (matchState.situation === "strong") return "attack";
    if (matchState.situation === "weak") return "defense";
    return "balanced";
  }

  // 局面动态选项（设计稿第五章）：
  //   进攻姿态(attack)→只呈现进攻/平衡类选项，不出现防守选项
  //   平衡姿态(balanced)→呈现全部选项，攻守兼备
  //   防守姿态(defense)→优先防守/平衡类，保留1个高风险高回报进攻
  function filterChoicesBySituation(choices, posture) {
    if (!choices || choices.length <= 1 || !posture) return choices;
    const atk = choices.filter(c => c.sit === "attack");
    const bal = choices.filter(c => c.sit === "balanced" || !c.sit);
    const def = choices.filter(c => c.sit === "defense");
    let picked;
    if (posture === "attack") {
      picked = atk.concat(bal).slice(0, 4);
    } else if (posture === "defense") {
      picked = def.concat(bal);
      if (atk.length) picked = picked.concat(atk.slice(0, 1)); // 保留1个高风险高回报进攻
      picked = picked.slice(0, 5);
    } else {
      picked = choices.slice(0, 5);
    }
    if (!picked.length) picked = choices.slice(0, 3); // 兜底：保证有选项可选
    // 按原选项顺序输出
    return choices.filter(c => picked.indexOf(c) >= 0);
  }

  async function runMatch(ev) {
    const st = global.State.current;
    const opp = ev.opponent || {};
    const strength = opp.strength || 30;

    // --- 局面判定：我方综合评级 = 队伍基数 + 玩家属性均值 ---
    const attrKeys = Object.keys(st.attrs);
    const attrAvg = attrKeys.reduce((s, k) => s + st.attrs[k], 0) / attrKeys.length;
    const ourRating = (ev.teamBase || 30) + attrAvg;
    const diff = ourRating - strength;
    let situation, difficultyMod, initOppThreat;
    if (diff > 15) { situation = "strong"; difficultyMod = -5; initOppThreat = 0; }
    else if (diff < -15) { situation = "weak"; difficultyMod = 5; initOppThreat = 2; }
    else { situation = "even"; difficultyMod = 0; initOppThreat = 1; }

    matchState = {
      opponentEl: opp.element || null,
      opponentName: opp.name || "对手",
      opponentStrength: strength,
      situation: situation,
      difficultyMod: difficultyMod,
      threat: 0,
      oppThreat: initOppThreat,
      goals: 0,
      assists: 0,
      keyAttempts: 0,
      keySuccess: 0,
      successCount: 0,
      totalCount: 0,
      isKeyMoment: false,
      usedKeys: [],
      success: 0,
      subs: []
    };

    // 赛前信息（含局面）
    await global.UI.renderMatchIntro(opp, situation, ourRating, strength);

    // 羁绊进度累积（设计稿第五章）：遇水灵根对手→水火不容；遇赵凛→既生瑜何生亮
    if (opp.element === "水") addBondProgress("canglan", 10);
    if ((opp.name || "").indexOf("赵凛") >= 0) addBondProgress("zhaolin", 15);

    // 玩家事件（位置池，抽 2 个）
    const poolId = buildPoolId(ev);
    let playerSubs = [];
    if (poolId) playerSubs = global.Story.pickMatchEvents(poolId, 2, computePosture());
    if (!playerSubs.length && ev.fallback_choices) {
      playerSubs = [{ text: "", choices: ev.fallback_choices }];
    }

    // 队友事件（通用池，抽 2 个，纯演出）
    const teammatePool = (global.MATCH_EXTRA && global.MATCH_EXTRA.teammate) || [];
    const teammateSubs = pickRandom(teammatePool, 2);

    st.matches += 1;

    // 6 节点序列：玩家×2 + 队友×2 + 关键时刻×2
    const nodes = [];
    if (playerSubs[0]) nodes.push({ type: "player", data: playerSubs[0] });
    if (teammateSubs[0]) nodes.push({ type: "teammate", data: teammateSubs[0] });
    if (playerSubs[1]) nodes.push({ type: "player", data: playerSubs[1] });
    if (teammateSubs[1]) nodes.push({ type: "teammate", data: teammateSubs[1] });
    nodes.push({ type: "key" });
    nodes.push({ type: "key" });

    const total = nodes.length;
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.type === "player") await playPlayerNode(node.data, i + 1, total);
      else if (node.type === "teammate") await playTeammateNode(node.data, i + 1, total);
      else await playKeyNode(i + 1, total);
    }

    // --- 弹性比分 + 结果映射（向后兼容） ---
    const goalsFor = threatToGoals(matchState.threat);
    const goalsAgainst = threatToGoals(matchState.oppThreat);
    const goalDiff = goalsFor - goalsAgainst;
    let branchKey;
    if (goalDiff >= 2) branchKey = "bigwin";
    else if (goalDiff === 1) branchKey = "win";
    else if (goalDiff === 0) branchKey = "draw";
    else branchKey = "lose";

    // --- 评级 + 自由点奖励 ---
    const rating = computeRating(matchState);
    const reward = RATING_REWARDS[rating];
    st.freePoints = (st.freePoints || 0) + reward.points;
    st.ratingDist[rating] = (st.ratingDist[rating] || 0) + 1;
    // 设计稿第五章评级表：D 评级心魔值+10
    if (rating === "D") st.demonValue = (st.demonValue || 0) + 10;
    if (branchKey === "bigwin" || branchKey === "win") st.wins += 1;

    const result = (ev.result && ev.result[branchKey]) || { text: "比赛结束。", effects: {} };

    await global.UI.renderMatchResult(branchKey, matchState, goalsFor, goalsAgainst, rating, reward);
    await global.UI.renderTextBlock(global.Story.interpolate(result.text));
    applyEffects(result.effects);
    applyEffects({ reputation: reward.reputation });
    global.UI.updateStatus();

    // 自由属性点分配面板
    if (st.freePoints > 0) {
      await global.UI.showFreePointsPanel();
    }

    matchState = null;
    await global.UI.waitContinue();
    autoSave(true);

    const nextId = result.next || ev.next;
    if (nextId) goto(nextId);
  }

  // 玩家事件节点（位置池）
  async function playPlayerNode(sub, idx, total) {
    matchState.isKeyMoment = false;
    await global.UI.renderMatchHeader(idx, total, "你的回合");
    if (sub.text) await global.UI.renderTextBlock(global.Story.interpolate(sub.text));
    // 局面动态选项（按攻防姿态过滤）
    let choices = sub.choices;
    if (choices && choices.length && matchState) {
      choices = filterChoicesBySituation(choices, computePosture());
    }
    if (!choices || !choices.length) {
      await global.UI.waitContinue();
      return;
    }
    const choice = await global.UI.renderChoices(choices, { match: true });
    await handleChoice(choice, { type: "match" });
    await global.UI.waitContinue();
  }

  // 队友事件节点（纯演出，auto 效果自动结算）
  async function playTeammateNode(te, idx, total) {
    await global.UI.renderMatchHeader(idx, total, "队友回合");
    if (te.text) await global.UI.renderTextBlock(global.Story.interpolate(te.text));
    const auto = te.auto || {};
    if (auto.threat) matchState.threat = Math.max(0, matchState.threat + auto.threat);
    if (auto.oppThreat) matchState.oppThreat = Math.max(0, matchState.oppThreat + auto.oppThreat);
    if (auto.difficultyMod) matchState.difficultyMod += auto.difficultyMod;
    if (auto.stamina) {
      applyEffects({ stamina: auto.stamina });
      global.UI.updateStatus();
    }
    if (te.result) await global.UI.renderTextBlock(te.result, { system: true });
    // 阿贵队友事件→金兰之交羁绊进度（设计稿第五章）
    if (te.text && te.text.indexOf("阿贵") >= 0) addBondProgress("agui", 10);
    await global.UI.waitContinue();
  }

  // 关键时刻节点（按局面抽取，权重×2）
  async function playKeyNode(idx, total) {
    matchState.isKeyMoment = true;
    const sit = currentSituation();
    const keyPool = (global.MATCH_EXTRA && global.MATCH_EXTRA.key) || {};
    let keys = Object.keys(keyPool).filter(k => !matchState.usedKeys.includes(k));
    if (!keys.length) keys = Object.keys(keyPool);
    const kId = keys[Math.floor(Math.random() * keys.length)];
    matchState.usedKeys.push(kId);
    const moment = (keyPool[kId] && (keyPool[kId][sit] || keyPool[kId].level)) || { text: "", choices: [] };

    await global.UI.renderMatchHeader(idx, total, "关键时刻·" + situationName(sit));
    if (moment.text) await global.UI.renderTextBlock(global.Story.interpolate(moment.text));
    if (!moment.choices || !moment.choices.length) {
      await global.UI.waitContinue();
      return;
    }
    const choice = await global.UI.renderChoices(moment.choices, { match: true });
    await handleChoice(choice, { type: "match" });
    await global.UI.waitContinue();
  }

  /* ============================================================
     结局判定
     ============================================================ */
  function dispatchEnding() {
    const st = global.State.current;
    const f = st.flags || {};
    // 境界判定（设计稿第三章3.3）：任一属性达通脉(45+)/天人合一(90+)
    const attrVals = Object.keys(st.attrs).map(k => st.attrs[k]);
    const tianren = attrVals.some(v => v >= 90);
    const tongmai = attrVals.some(v => v >= 45);
    let target;
    // 心魔值满→强制黯然退场（设计稿第十章结局表：天劫失败/心魔满）
    if ((st.demonValue || 0) >= 100) {
      target = "end_dusk";
    }
    // 杂灵根+五行归一→浪子回头（设计稿第十章：废根不废人）
    else if (st.rootQuality === "mixed" && f.wuxingGuiyi) {
      target = "end_return";
    }
    // 选择当教练→教练之路（隐藏路线）
    else if (f.choiceCoach) {
      target = "end_coach";
    }
    // 退役后复出→传奇复出
    else if (f.choiceRetire && f.comeback) {
      target = "end_comeback";
    }
    // 因伤退役不复出→黯然离场
    else if (f.choiceRetire) {
      target = "end_dusk";
    }
    // 天人合一+全国冠军+远赴五洲→球圣封神（最高结局）
    else if (f.nationalChamp && f.choiceTianguang && tianren) {
      target = "end_saint";
    }
    // 通脉+远赴天罡→天罡之星
    else if (f.choiceTianguang && tongmai) {
      target = "end_star";
    }
    // 通脉+留守+声望极高→功勋队长
    else if (f.choiceStay && tongmai && st.reputation >= 120) {
      target = "end_captain";
    }
    // 声望高+关键成功→新星升起（兼容既有）
    else if (st.reputation >= 80 && f.keySuccess) {
      target = "end_rising";
    }
    // 声望中等→蛰伏待时（兼容既有）
    else if (st.reputation >= 40) {
      target = "end_dormant";
    }
    // 开放式→江湖再见
    else {
      target = "end_jianghu";
    }
    goto(target);
  }

  /* ============================================================
     启动
     ============================================================ */
  function startNew(difficulty) {
    global.State.clearSave();
    global.State.current = global.State.createInitial(difficulty);
    global.UI.updateStatus();
    global.State.save(); // 难度选择后立即存档，保证存档含 difficulty
    goto("ch1_opening");
  }

  function continueGame() {
    const saved = global.State.load();
    if (saved) {
      global.State.current = saved;
      global.UI.updateStatus();
      goto(saved.currentEventId || "ch1_opening");
      return true;
    }
    return false;
  }

  // 开局选择：是否有存档
  function hasSave() { return !!global.State.load(); }

  global.Engine = {
    bindConfig,
    skillCheck,
    applyTrainPoint,
    applyEffects,
    goto,
    handleChoice,
    startNew,
    continueGame,
    hasSave,
    autoSave
  };
})(window);
