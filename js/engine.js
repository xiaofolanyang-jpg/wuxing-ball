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
    // 心魔梯度惩罚：心魔值越高，检定成功率越低
    if (CONFIG.demonThresholds && (st.demonValue || 0) > 0) {
      for (const t of CONFIG.demonThresholds) {
        if (st.demonValue >= t.min) { chance -= t.penalty; break; }
      }
    }
    // 体力梯度惩罚：体力越低，检定成功率越低
    if (CONFIG.staminaThresholds) {
      for (const t of CONFIG.staminaThresholds) {
        if (st.stamina < t.max) { chance -= t.penalty; break; }
      }
    }
    // 羁绊加成（设计稿 v3.0·动态羁绊）：已解锁羁绊 bonus 求和，受 bondBonusCap 上限约束
    // 触发条件在解锁时（addBondProgress）控制，应用时不再做对手特判
    if (st.bondsUnlocked && st.bondsUnlocked.length && CONFIG.bonds) {
      let bondSum = 0;
      st.bondsUnlocked.forEach(bid => {
        const b = CONFIG.bonds[bid];
        if (b && b.bonus) bondSum += b.bonus;
      });
      chance += Math.min(bondSum, CONFIG.bondBonusCap || 1);
    }
    // 五行共鸣加成：多属性达到高境界时触发（全灵根后期核心机制）
    chance += getResonanceBonus();
    chance = Math.max(CONFIG.clampMin, Math.min(CONFIG.clampMax, chance));

    // 暴击概率随成功率成长：高属性角色暴击率更高
    let critChance = CONFIG.critBase + chance * CONFIG.critScale;
    // 淬炼营被动技能钩子：开小灶解锁的被动影响暴击/难度
    if (st.camp && st.camp.passives && st.camp.passives.length && CONFIG.passiveSkills) {
      st.camp.passives.forEach(function (pid) {
        const p = CONFIG.passiveSkills[pid];
        if (!p) return;
        if (p.critBonus && checkMatchesType(attrs, p.checkType)) critChance += p.critBonus;
        if (p.diffMod && (!p.condition || matchState && matchState[p.condition])) chance -= p.diffMod;
      });
    }
    if (Math.random() < critChance) return "critical";
    return Math.random() < chance ? "success" : "fail";
  }

  /* ---------- 灵根锁：属性上限 ---------- */
  // 亲和属性上限 = attrMax(100)；非亲和属性上限 = quality.nonAffinityCap
  function getAttrCap(attrName) {
    const st = global.State.current;
    if (!st || !st.rootQuality) return CONFIG.attrMax || 100;
    const el = global.State.attrToElement(attrName);
    if (st.affinityElements && st.affinityElements.includes(el)) return CONFIG.attrMax || 100;
    const q = CONFIG.quality[st.rootQuality];
    return (q && q.nonAffinityCap !== undefined) ? q.nonAffinityCap : (CONFIG.attrMax || 100);
  }

  /* ---------- 五行共鸣：多属性达到高境界时触发检定加成 ---------- */
  function getResonanceBonus() {
    const st = global.State.current;
    if (!CONFIG.resonance || !st || !st.attrs) return 0;
    const vals = Object.values(st.attrs);
    let best = 0;
    for (const tier of CONFIG.resonance) {
      const count = vals.filter(v => v >= tier.realmMin).length;
      if (count >= tier.countMin && tier.bonus > best) best = tier.bonus;
    }
    return best;
  }

  /* ---------- 加点 ---------- */
  function applyTrainPoint(attrName) {
    const st = global.State.current;
    if (st.trainPoints <= 0) return false;
    const el = global.State.attrToElement(attrName);
    const mult = global.State.getMultiplier(el);
    const cap = getAttrCap(attrName);
    st.attrs[attrName] = Math.min(cap, st.attrs[attrName] + mult);
    st.trainPoints -= 1;
    return true;
  }

  // 检定成长（问题2）：检定成功后，检定所用属性按灵根倍率成长（练什么涨什么）
  // amount: 基础成长值（success=1 / critical=1.5），实际成长 = amount × 灵根倍率
  function growCheckAttrs(attrs, amount) {
    const st = global.State.current;
    const parts = [];
    attrs.forEach(a => {
      const el = global.State.attrToElement(a);
      const mult = global.State.getMultiplier(el);
      const gain = amount * mult;
      const cap = getAttrCap(a);
      st.attrs[a] = Math.min(cap, (st.attrs[a] || 0) + gain);
      parts.push(CONFIG.attrNames[a] + "+" + (Math.round(gain * 10) / 10));
    });
    return parts.join(" ");
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
        st.attrs[a] = Math.max(0, Math.min(getAttrCap(a), (st.attrs[a] || 0) + effects.attrs[a]));
      });
    }
    // 全属性百分比加成（设计稿第八章·心魔劫选项C：全属性+3%）
    if (effects.allAttrsPercent) {
      Object.keys(st.attrs).forEach(a => {
        st.attrs[a] = Math.min(getAttrCap(a), st.attrs[a] * (1 + effects.allAttrsPercent / 100));
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
    // 核心属性（灵根亲和属性）平坦加成
    if (effects.coreAttrs) {
      const aff = st.affinityElements || [st.rootType];
      aff.forEach(el => {
        (CONFIG.attrs[el] || []).forEach(a => {
          st.attrs[a] = Math.max(0, Math.min(getAttrCap(a), (st.attrs[a] || 0) + effects.coreAttrs));
        });
      });
    }
    // 全属性平坦加成
    if (effects.allAttrsFlat) {
      Object.keys(st.attrs).forEach(a => {
        st.attrs[a] = Math.max(0, Math.min(getAttrCap(a), (st.attrs[a] || 0) + effects.allAttrsFlat));
      });
    }
    // 学院等级
    if (effects.academyGrade) st.academyGrade = effects.academyGrade;
    if (st.stamina > 100) st.stamina = 100;
    if (st.stamina < 0) st.stamina = 0;
  }

  /* ---------- 修炼回合推进 ---------- */
  function endRound() {
    const st = global.State.current;
    st.round += 1;
    // 心魔自然衰减（不行动时心魔缓慢消退）
    if (CONFIG.demonDecayPerRound && (st.demonValue || 0) > 0) {
      st.demonValue = Math.max(0, st.demonValue - CONFIG.demonDecayPerRound);
    }
    // 体力每回合自动恢复
    if (CONFIG.staminaRegenPerRound) {
      st.stamina = Math.min(100, st.stamina + CONFIG.staminaRegenPerRound);
    }
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
    if (c.when.mixedRoot && st.rootQuality !== "full") return false;
    if (c.when.notMixedRoot && st.rootQuality === "full") return false;
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
    // v3.0：成长型队友生成（须在灵根觉醒后，按玩家灵根做互补）
    if (ev.type === "gen_companions") {
      if (global.GameSetup && (!global.State.current.companions || !global.State.current.companions.length)) {
        global.GameSetup.generateCompanions(global.State.current);
        global.UI.updateStatus();
      }
    }
    // 渲染正文（支持 byRoot：按玩家灵根动态切换 text/system）
    let textSrc = ev.text;
    let systemSrc = ev.system;
    if (ev.byRoot && global.State.current && global.State.current.rootType) {
      const key = global.State.current.rootQuality === "full" ? "杂" : global.State.current.rootType;
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
          : "白袍人摩挲着凳上剩下的铜钱：「只剩{rerollLeft}次机会了。想好了再按。」";
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
    // 淬炼营循环赛（试玩反馈#5）
    if (ev.type === "tournament") {
      return runTournament(ev);
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
      // 检定成长（问题2）：成功后检定属性成长，涨的是“检定需要的属性”
      let growth = "";
      if (r === "success" || r === "critical") {
        growth = growCheckAttrs(choice.check.attrs, r === "critical" ? 1.5 : 1);
      }
      global.UI.showCheckResult(r, global.Story.interpolate(choice.check.tag || ""), growth);
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
          matchState.threat += base;
          if (matchState.isKeyMoment) matchState.keySuccess++;
        } else {
          matchState.oppThreat += 1;
          // 心魔值：关键时刻失败+2
          if (matchState.isKeyMoment) global.State.current.demonValue = (global.State.current.demonValue || 0) + (CONFIG.demonOnKeyFail || 2);
        }
        if (matchState.isKeyMoment) matchState.keyAttempts++;
      }
      if (effects.goals) matchState.goals += effects.goals;
      if (effects.assists) matchState.assists += effects.assists;
      syncMatchHUD(); // 实时刷新比分/威胁值
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
    const st = global.State.current;
    // 体力崩溃：强制休息，跳过训练，恢复体力
    if (CONFIG.staminaCollapseThreshold && st.stamina < CONFIG.staminaCollapseThreshold) {
      st.stamina = CONFIG.staminaCollapseRecover || 40;
      global.UI.toast("体力透支，强制休息一回合（体力恢复至" + st.stamina + "）");
      endRound();
      if (ev.next) goto(ev.next);
      return;
    }
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
  // 威胁值 → 弹性进球数（扩展上限，碾压局可打出4-5球）
  function threatToGoals(t) {
    if (t >= 12) return 5;
    if (t >= 9) return 4;
    if (t >= 7) return 3;
    if (t >= 4) return 2;
    if (t >= 2) return 1;
    return 0;
  }

  // 实时刷新比赛计分牌（威胁值→比分换算，同步到 UI）
  function syncMatchHUD() {
    if (matchState) global.UI.updateMatchHUD(matchState, threatToGoals(matchState.threat), threatToGoals(matchState.oppThreat));
  }

  // 评级奖励表（C级也给1自由点，减少挫败感）
  const RATING_REWARDS = {
    S: { points: 2, reputation: 15 },
    A: { points: 2, reputation: 10 },
    B: { points: 1, reputation: 5 },
    C: { points: 0, reputation: 1 },
    D: { points: 0, reputation: -3 }
  };

  // 比赛评级（纯表现导向）：S(100%成功且至少1关键成功) / A(rate>70%且有亮点) / B(≥45%) / C(≥25%) / D(<25%)
  function computeRating(ms) {
    const rate = ms.totalCount > 0 ? ms.successCount / ms.totalCount : 0;
    const ga = ms.goals + ms.assists;
    if (rate >= 1 && ms.keyAttempts > 0 && ms.keySuccess >= 1) return "S";
    if (rate > 0.7 && (ga >= 1 || ms.keySuccess >= 1)) return "A";
    if (rate >= 0.45) return "B";
    if (rate >= 0.25) return "C";
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
    if (diff > 15) { situation = "strong"; difficultyMod = -8; initOppThreat = 0; }
    else if (diff < -15) { situation = "weak"; difficultyMod = 8; initOppThreat = 2; }
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
    // 开启实时计分牌（比分 + 双方威胁值）
    global.UI.showMatchHUD(matchState, threatToGoals(matchState.threat), threatToGoals(matchState.oppThreat));

    // 羁绊进度累积（设计稿 v3.0·动态羁绊）：对手被标记为宿敌时累积宿敌羁绊
    if (opp.rival) addBondProgress("sudi", 12);

    // 玩家事件（位置池，抽 2 个）
    const poolId = buildPoolId(ev);
    let playerSubs = [];
    if (poolId) playerSubs = global.Story.pickMatchEvents(poolId, 2, computePosture());
    if (!playerSubs.length && ev.fallback_choices) {
      playerSubs = [{ text: "", choices: ev.fallback_choices }];
    }

    // 队友事件（通用池，抽 2 个，纯演出）
    // 按实际阵容过滤（问题4）：agui=发小默认在场；laozhou/linxiao/suwan 依赖选人旗标；无 who=通用事件
    const allTeammates = (global.MATCH_EXTRA && global.MATCH_EXTRA.teammate) || [];
    const teamFlags = st.flags || {};
    const teammatePool = allTeammates.filter(t => {
      if (!t.who) return true;
      if (t.who === "agui") return true;
      if (t.who === "laozhou") return !!teamFlags.laozhouInTeam;
      if (t.who === "linxiao") return !!teamFlags.linxiaoJoined;
      if (t.who === "suwan") return !!teamFlags.suwanJoined;
      return true;
    });
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
    // 设计稿第五章评级表：D 评级心魔值+12
    if (rating === "D") st.demonValue = (st.demonValue || 0) + (CONFIG.demonOnD || 12);
    // 心魔值：输球+4，平局+2
    if (branchKey === "lose") st.demonValue = (st.demonValue || 0) + (CONFIG.demonOnLose || 4);
    else if (branchKey === "draw") st.demonValue = (st.demonValue || 0) + (CONFIG.demonOnDraw || 2);
    if (branchKey === "bigwin" || branchKey === "win") st.wins += 1;
    else if (branchKey === "draw") st.draws = (st.draws || 0) + 1;
    else st.losses = (st.losses || 0) + 1;
    // 动态插值存储（#7 比分 + #1/#3 战绩）
    st.lastMatchScore = { my: goalsFor, opp: goalsAgainst };
    st.lastMatchResult = (branchKey === "bigwin" || branchKey === "win") ? "win" : branchKey === "draw" ? "draw" : "lose";

    const result = (ev.result && ev.result[branchKey]) || { text: "比赛结束。", effects: {} };

    await global.UI.renderMatchResult(branchKey, matchState, goalsFor, goalsAgainst, rating, reward, (result.effects && result.effects.reputation) || 0);
    await global.UI.renderTextBlock(global.Story.interpolate(result.text));
    applyEffects(result.effects);
    applyEffects({ reputation: reward.reputation });
    global.UI.updateStatus();

    // 自由属性点分配面板
    if (st.freePoints > 0) {
      await global.UI.showFreePointsPanel();
    }

    matchState = null;
    global.UI.hideMatchHUD();
    await global.UI.waitContinue();
    autoSave(true);

    const nextId = result.next || ev.next;
    if (nextId) goto(nextId);
  }

  /* ============================================================
     淬炼营循环赛（type:"tournament"）
     10队单循环，玩家操作3场关键比赛（优势/均势/劣势），
     其余NPC自动模拟，最终输出积分榜。
     事件格式：{ type:"tournament", keyMatches:[{opponent,teamBase,result,label}], text, next }
     ============================================================ */
  async function runTournament(ev) {
    const st = global.State.current;
    const cc = CONFIG.campConfig || {};
    const pool = (cc.teamNamePool || []).slice();
    const playerTeam = cc.playerTeamName || "破阵队";
    const teamCount = cc.teamCount || 10;

    // 1. 生成队伍（玩家队 + 随机抽取）
    const npcTeams = pickRandom(pool, teamCount - 1);
    const teams = [{ name: playerTeam, isPlayer: true, str: 50 }];
    npcTeams.forEach(n => teams.push({ name: n, isPlayer: false, str: 35 + Math.floor(Math.random() * 25) }));

    // 2. 显示分组名单
    if (ev.text) await global.UI.renderTextBlock(ev.text);
    await global.UI.renderTextBlock("【循环赛分组】" + teams.map(t => t.name).join("、"), { system: true });
    await global.UI.waitContinue();

    // 3. 生成单循环赛程
    const schedule = [];
    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        schedule.push({ home: i, away: j, played: false, hs: 0, as: 0 });
      }
    }

    // 4. 标记玩家参与的3场关键比赛
    const keyMatches = ev.keyMatches || [];
    const playerIdx = 0;
    // 为每场keyMatch找一个未分配的含玩家的赛程槽位
    const keySlots = [];
    for (let k = 0; k < keyMatches.length && k < 3; k++) {
      // 找一个未用的玩家比赛槽
      const slot = schedule.find(m => !m.played && !keySlots.includes(m) && (m.home === playerIdx || m.away === playerIdx));
      if (slot) keySlots.push(slot);
    }

    // 5. 玩家操作3场关键比赛
    const playerResults = []; // {label, result, my, opp}
    for (let k = 0; k < keySlots.length; k++) {
      const km = keyMatches[k];
      const slot = keySlots[k];
      const oppIdx = slot.home === playerIdx ? slot.away : slot.home;
      // 用keyMatch的opponent覆盖队名
      const matchEv = {
        id: ev.id + "_key" + k,
        chapter: ev.chapter,
        type: "match",
        text: km.text || ["循环赛第" + (k + 1) + "场。"],
        opponent: km.opponent || { name: teams[oppIdx].name, element: "金", strength: 45 },
        teamBase: km.teamBase || 30,
        result: km.result || {
          bigwin: { text: "大胜。", effects: {} },
          win: { text: "赢了。", effects: {} },
          draw: { text: "平了。", effects: {} },
          lose: { text: "输了。", effects: {} }
        }
      };
      // 运行标准比赛流程（不跳转，用flag拦截next）
      matchEv._noGoto = true;
      const mResult = await runMatchInternal(matchEv);
      slot.played = true;
      slot.hs = slot.home === playerIdx ? mResult.goalsFor : mResult.goalsAgainst;
      slot.as = slot.away === playerIdx ? mResult.goalsFor : mResult.goalsAgainst;
      playerResults.push({ label: km.label || "第" + (k + 1) + "场", result: mResult.branchKey, my: mResult.goalsFor, opp: mResult.goalsAgainst });
    }

    // 6. 自动模拟其余NPC比赛
    schedule.forEach(m => {
      if (m.played) return;
      const hStr = teams[m.home].str + 3; // 主场优势
      const aStr = teams[m.away].str;
      const diff = hStr - aStr;
      const r = Math.random() * 60 - 30 + diff;
      if (r > 8) { m.hs = 1 + Math.floor(Math.random() * 2); m.as = Math.floor(Math.random() * m.hs); }
      else if (r < -8) { m.as = 1 + Math.floor(Math.random() * 2); m.hs = Math.floor(Math.random() * m.as); }
      else { m.hs = m.as = Math.floor(Math.random() * 2); }
      m.played = true;
    });

    // 7. 计算积分榜
    const standings = teams.map((t, i) => ({ name: t.name, isPlayer: t.isPlayer, pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 }));
    schedule.forEach(m => {
      const h = standings[m.home], a = standings[m.away];
      h.gf += m.hs; h.ga += m.as;
      a.gf += m.as; a.ga += m.hs;
      if (m.hs > m.as) { h.w++; h.pts += 3; a.l++; }
      else if (m.hs < m.as) { a.w++; a.pts += 3; h.l++; }
      else { h.d++; a.d++; h.pts++; a.pts++; }
    });
    standings.sort((x, y) => y.pts - x.pts || (y.gf - y.ga) - (x.gf - x.ga));

    // 8. 输出结果
    const playerRow = standings.find(s => s.isPlayer);
    const rank = standings.indexOf(playerRow) + 1;
    let summary = "【循环赛终榜】\n";
    standings.slice(0, 5).forEach((s, i) => {
      summary += (i + 1) + ". " + s.name + " " + s.pts + "分（" + s.w + "胜" + s.d + "平" + s.l + "负）" + (s.isPlayer ? " ←你" : "") + "\n";
    });
    if (rank > 5) summary += "...\n" + rank + ". " + playerRow.name + " " + playerRow.pts + "分（" + playerRow.w + "胜" + playerRow.d + "平" + playerRow.l + "负）";
    await global.UI.renderTextBlock(summary, { system: true });

    // 9. 存储战绩到state
    st.matches += playerResults.length;
    playerResults.forEach(r => {
      if (r.result === "bigwin" || r.result === "win") st.wins++;
      else if (r.result === "draw") st.draws = (st.draws || 0) + 1;
      else st.losses = (st.losses || 0) + 1;
    });
    if (!st.camp) st.camp = {};
    st.camp.leagueRank = rank;
    st.camp.leagueRecord = playerRow.w + "胜" + playerRow.d + "平" + playerRow.l + "负";

    // 10. 事件效果 + 跳转
    if (ev.effects) { applyEffects(ev.effects); global.UI.updateStatus(); }
    autoSave(true);
    await global.UI.waitContinue();
    if (ev.next) goto(ev.next);
  }

  // runMatch 内部版本（不触发goto，返回结果对象）
  async function runMatchInternal(ev) {
    // 复用runMatch的核心逻辑，但拦截跳转
    const origGoto = goto;
    let captured = null;
    // 临时覆盖goto以捕获结果
    const savedNext = ev.next;
    ev.next = null;
    // 直接调用runMatch（它会在末尾尝试goto，但next为null则不跳）
    await runMatch(ev);
    // 从 state 读取结果
    const st = global.State.current;
    return {
      goalsFor: st.lastMatchScore ? st.lastMatchScore.my : 0,
      goalsAgainst: st.lastMatchScore ? st.lastMatchScore.opp : 0,
      branchKey: st.lastMatchResult === "win" ? "win" : st.lastMatchResult === "draw" ? "draw" : "lose"
    };
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
    syncMatchHUD(); // 实时刷新比分/威胁值
    if (auto.stamina) {
      applyEffects({ stamina: auto.stamina });
      global.UI.updateStatus();
    }
    if (te.result) await global.UI.renderTextBlock(te.result, { system: true });
    // 队友联动节点→同袍羁绊进度（设计稿 v3.0·动态羁绊：同场配合累积）
    addBondProgress("tongpao", 5);
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
    const champ = f.wuxingChamp || f.nationalChamp;   // 五行大会/全国冠军
    const retired = f.choiceRetire || f.injuryRetire;  // 主动或因伤退役
    let target;
    // 按剧本第十八章事件5·判定优先级 1-11
    if (champ && f.choiceTianguang && tianren) {
      target = "end_saint";        // 1 球圣封神
    } else if (f.choiceTianguang && tongmai) {
      target = "end_star";         // 2 天罡之星
    } else if (f.choiceStay && tongmai && st.reputation >= 120) {
      target = "end_captain";      // 3 功勋队长
    } else if (st.rootQuality === "full" && f.wuxingGuiyi) {
      target = "end_return";       // 4 浪子回头
    } else if (f.choiceCoach) {
      target = "end_coach";        // 5 教练之路
    } else if (champ) {
      target = "end_assembly";     // 6 五行大会（冠军但未达球圣全条件）
    } else if (f.twinsBest) {
      target = "end_twins";        // 7 双子星
    } else if (retired && f.comeback) {
      target = "end_comeback";     // 8 传奇复出
    } else if (st.reputation >= 100 && f.choiceRetire) {
      target = "end_retire";       // 9 功成身退
    } else if ((st.demonValue || 0) >= (CONFIG.demonBadEndThreshold || 60) || (retired && !f.comeback)) {
      target = "end_dusk";         // 10 黯然离场
    } else {
      target = "end_jianghu";      // 11 江湖再见（兜底）
    }
    goto(target);
  }

  /* ============================================================
     启动
     ============================================================ */
  function startNew(difficulty) {
    global.State.clearSave();
    global.State.current = global.State.createInitial(difficulty);
    // v3.0：开局生成大洲 + 起始小学院 + 国籍 + 对手学院（与灵根无关）
    if (global.GameSetup) global.GameSetup.generateWorld(global.State.current);
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

  /* ============================================================
     比赛增强系统（比赛内容大纲 + 球队群像设计稿）
     ============================================================ */

  // 辅助：判断检定属性是否匹配被动技能类型
  function checkMatchesType(attrs, checkType) {
    if (!checkType) return false;
    var defenseAttrs = ["tackle","intercept","strength","hardness","positioning"];
    var dribbleAttrs = ["dribble","speed","agility"];
    var shootingAttrs = ["shooting","burst","power"];
    var strengthAttrs = ["strength","hardness","balance"];
    var map = { defense: defenseAttrs, dribble: dribbleAttrs, shooting: shootingAttrs, strength: strengthAttrs };
    var pool = map[checkType];
    if (!pool) return false;
    return attrs.some(function (a) { return pool.indexOf(a) >= 0; });
  }

  // 1. 五行相克修正：返回玩家和对手的检定难度修正值
  function getElementClash(playerEl, oppEl) {
    if (!CONFIG.elementClash || !playerEl || !oppEl) return { playerMod: 0, oppMod: 0 };
    var key = playerEl + "克" + oppEl;
    if (CONFIG.elementClash[key]) return { playerMod: CONFIG.elementClash[key].keMod, oppMod: CONFIG.elementClash[key].beiMod };
    var rev = oppEl + "克" + playerEl;
    if (CONFIG.elementClash[rev]) return { playerMod: CONFIG.elementClash[rev].beiMod, oppMod: CONFIG.elementClash[rev].keMod };
    return { playerMod: 0, oppMod: 0 };
  }

  // 2. 风格随机事件抽取：按对手五行+节点+比分状态概率触发
  function getStyleEvent(oppElement, node, ms) {
    if (!CONFIG.styleEvents || !global.MATCH_STYLE_EVENTS) return null;
    var se = CONFIG.styleEvents;
    if (se.triggerNodes.indexOf(node) < 0) return null;
    var pool = global.MATCH_STYLE_EVENTS[oppElement];
    if (!pool || !pool.length) return null;
    var prob = se.triggerProb;
    // 比分修正
    if (ms && se.scoreModifier) {
      var diff = (ms.myScore || 0) - (ms.oppScore || 0);
      if (diff >= 2) prob += se.scoreModifier.lead2;
      else if (diff <= -2) prob += se.scoreModifier.trail2;
      else prob += se.scoreModifier.close;
    }
    // 时间修正
    if (ms && ms.minute >= 85 && se.timeModifier) prob += se.timeModifier.last5;
    if (Math.random() > prob) return null;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  // 3. 关键时刻三选一：返回风格专属分支数据
  function getKeyMomentBranch(oppElement, ms) {
    if (!CONFIG.keyMomentTypes) return null;
    var branches = global.KEY_MOMENT_BRANCHES && global.KEY_MOMENT_BRANCHES[oppElement];
    if (!branches) return null;
    return branches; // { A:{...}, B:{...}, C:{...} }
  }

  // 4. 比分动态叙事：根据当前比分返回叙事文本
  function getScoreNarrative(myScore, oppScore, minute) {
    if (!CONFIG.scoreNarrative) return null;
    var diff = myScore - oppScore;
    var key;
    if (minute >= 85) key = "last5";
    else if (diff >= 2) key = "lead2";
    else if (diff === 1) key = "lead1";
    else if (diff === 0) key = "draw";
    else if (diff === -1) key = "trail1";
    else key = "trail2";
    var txt = CONFIG.scoreNarrative[key];
    return (txt && txt.indexOf("[TODO") < 0) ? txt : null;
  }

  // 5. 赛前传奇对视：仅首次交手触发
  function checkLegendEncounter(teamKey) {
    var st = global.State.current;
    if (!CONFIG.legendEncounter || !teamKey) return null;
    if (st.encounterFlags && st.encounterFlags[teamKey]) return null;
    var txt = CONFIG.legendEncounter[teamKey];
    if (!txt || txt.indexOf("[TODO") >= 0) return null;
    if (!st.encounterFlags) st.encounterFlags = {};
    st.encounterFlags[teamKey] = true;
    // 更新交手次数
    if (!st.seriesCount) st.seriesCount = {};
    st.seriesCount[teamKey] = (st.seriesCount[teamKey] || 0) + 1;
    return txt;
  }

  // 6. 赛后传奇认可：评级>=A时触发
  function checkLegendRespect(teamKey, rating) {
    if (!CONFIG.legendRespect || rating === "B" || rating === "C" || rating === "D") return null;
    // 找到对应球队的固定传奇（非概率）
    var legends = CONFIG.legends;
    if (!legends) return null;
    var keys = Object.keys(legends);
    for (var i = 0; i < keys.length; i++) {
      var lg = legends[keys[i]];
      if (lg.team === teamKey && !lg.prob) {
        var txt = CONFIG.legendRespect[keys[i]];
        if (txt && txt.indexOf("[TODO") < 0) return { key: keys[i], text: txt };
      }
    }
    return null;
  }

  // 7. 概率传奇登场检测：60分钟后每回合调用
  function checkLegendSpawn(teamKey, ms) {
    var st = global.State.current;
    if (!CONFIG.legendSpawn || !teamKey) return null;
    var ls = CONFIG.legendSpawn;
    if (ms && ms.minute < ls.baseMinute) return null;
    // 找到对应球队的 prob 传奇
    var legends = CONFIG.legends;
    if (!legends) return null;
    var probKey = null;
    var keys = Object.keys(legends);
    for (var i = 0; i < keys.length; i++) {
      if (legends[keys[i]].team === teamKey && legends[keys[i]].prob) { probKey = keys[i]; break; }
    }
    if (!probKey) return null;
    var spawnId = teamKey + "_" + probKey;
    if (st.legendSpawned && st.legendSpawned[spawnId]) return null;
    // 计算概率
    var prob = ls.baseProb;
    var mod = ls.modifiers[spawnId];
    if (mod) {
      var condMet = true;
      if (mod.condKey === "reputation" && st.reputation < mod.condMin) condMet = false;
      if (mod.condKey === "consecutiveFails" && (st.consecutiveFails || 0) < mod.condMin) condMet = false;
      if (mod.condKey === "setPieceCount" && (st.setPieceCount || 0) < mod.condMin) condMet = false;
      if (mod.condKey === "hasFreeKick" && !(ms && ms.hasFreeKick)) condMet = false;
      if (mod.condKey === "extraTime" && !(ms && ms.extraTime)) condMet = false;
      if (condMet) prob += mod.bonus;
    }
    if (Math.random() > prob) return null;
    // 触发成功
    if (!st.legendSpawned) st.legendSpawned = {};
    st.legendSpawned[spawnId] = true;
    return { key: probKey, legend: legends[probKey] };
  }

  // 8. 传奇登场后效果应用
  function applyLegendSpawnEffects(ms) {
    if (!CONFIG.legendSpawn || !ms) return;
    var eff = CONFIG.legendSpawn.effects;
    ms.opponentStrength = (ms.opponentStrength || 0) + eff.strengthBonus;
    ms.keyDiffBonus = (ms.keyDiffBonus || 0) + eff.keyDiffBonus;
    ms.legendAwakened = true;
  }

  /* ============================================================
     淬炼营系统（淬炼营比赛大纲）
     ============================================================ */

  // 1. 初始化淬炼营：生成100人排名表
  function initCamp() {
    var st = global.State.current;
    var cc = CONFIG.campConfig;
    if (!cc) return null;
    var players = [];
    for (var i = 0; i < cc.totalPlayers; i++) {
      players.push({
        id: i, name: "NPC_" + (i + 1), isPlayer: i === 0,
        wins: 0, losses: 0, coachScore: 50, balance: 50, awakening: false, eliminated: false
      });
    }
    players[0].name = st.name || "玩家";
    players[0].isPlayer = true;
    st.camp = {
      rank: 50, wins: 0, losses: 0, coachScore: 50,
      teamId: null, teammates: [], passives: [], awakening: false,
      players: players, phase: "1v1", matchDay: 0
    };
    return st.camp;
  }

  // 2. 计算淬炼营排名（4维加权）
  function calcCampRanking(player) {
    var cc = CONFIG.campConfig;
    if (!cc) return 0;
    var w = cc.rankingWeights;
    var totalMatches = player.wins + player.losses || 1;
    var recordScore = (player.wins / totalMatches) * 100;
    var coachScore = player.coachScore || 50;
    var balanceScore = player.balance || 50;
    var awakenScore = player.awakening ? 100 : 0;
    return recordScore * w.record + coachScore * w.coach + balanceScore * w.balance + awakenScore * w.awakening;
  }

  // 3. 1v1对阵生成（三种模式）
  function generate1v1Pairing(mode) {
    var st = global.State.current;
    if (!st.camp) return null;
    var alive = st.camp.players.filter(function (p) { return !p.eliminated && !p.isPlayer; });
    if (!alive.length) return null;
    if (mode === "random") {
      return alive[Math.floor(Math.random() * alive.length)];
    } else if (mode === "ranked") {
      // 排名接近的优先
      alive.sort(function (a, b) { return calcCampRanking(b) - calcCampRanking(a); });
      var mid = Math.floor(alive.length / 2);
      return alive[Math.max(0, mid + Math.floor(Math.random() * 5) - 2)];
    } else {
      // deathmatch：边缘玩家互打
      alive.sort(function (a, b) { return calcCampRanking(a) - calcCampRanking(b); });
      return alive[Math.floor(Math.random() * Math.min(10, alive.length))];
    }
  }

  // 4. 1v1比赛结算（3节点制）
  function resolve1v1Match(opponent) {
    var st = global.State.current;
    if (!st.camp) return null;
    var results = [];
    var myScore = 0, oppScore = 0;
    for (var node = 0; node < 3; node++) {
      var diff = 28 + node * 4; // 难度递增
      var r = skillCheck(["dribble", "shooting"], diff, null);
      results.push(r);
      if (r === "critical") myScore += 2;
      else if (r === "success") myScore += 1;
      else oppScore += 1;
    }
    var won = myScore > oppScore;
    st.camp.wins += won ? 1 : 0;
    st.camp.losses += won ? 0 : 1;
    if (opponent) {
      opponent.wins += won ? 0 : 1;
      opponent.losses += won ? 1 : 0;
    }
    return { won: won, myScore: myScore, oppScore: oppScore, results: results };
  }

  // 5. 教练青睐判定
  function checkCoachFavor(performance) {
    var st = global.State.current;
    var co = CONFIG.campObservation;
    if (!co || !st.camp) return null;
    if (performance < co.favorThreshold) return null;
    if (Math.random() > co.favorProb) return null;
    // 根据玩家最高属性对应五行确定教习
    var bestEl = "金";
    var bestVal = 0;
    CONFIG.elementOrder.forEach(function (el) {
      CONFIG.attrs[el].forEach(function (a) {
        if ((st.attrs[a] || 0) > bestVal) { bestVal = st.attrs[a]; bestEl = el; }
      });
    });
    return { element: bestEl, score: performance };
  }

  // 6. 组队约束校验（>=3灵根, >=1后+1前）
  function validateTeam(team) {
    if (!team || team.length !== (CONFIG.campConfig ? CONFIG.campConfig.teamSize : 5)) return { valid: false, reason: "人数不足" };
    var roots = {};
    var hasDef = false, hasFwd = false;
    team.forEach(function (p) {
      if (p.root) roots[p.root] = true;
      if (p.pos && ["CB","SW","RB","LB","GK"].indexOf(p.pos) >= 0) hasDef = true;
      if (p.pos && ["ST","LW","RW","CF"].indexOf(p.pos) >= 0) hasFwd = true;
    });
    if (Object.keys(roots).length < 3) return { valid: false, reason: "灵根不足3种" };
    if (!hasDef) return { valid: false, reason: "缺后卫" };
    if (!hasFwd) return { valid: false, reason: "缺前锋" };
    return { valid: true, reason: "" };
  }

  // 7. 循环赛赛程生成（10队单循环9轮）
  function generateLeagueSchedule(teams) {
    if (!teams || teams.length < 2) return [];
    var n = teams.length;
    var rounds = [];
    var list = teams.slice();
    if (n % 2 !== 0) list.push(null); // 拜占位
    var total = list.length;
    for (var round = 0; round < total - 1; round++) {
      var matches = [];
      for (var i = 0; i < total / 2; i++) {
        var a = list[i], b = list[total - 1 - i];
        if (a !== null && b !== null) matches.push([a, b]);
      }
      rounds.push(matches);
      // 轮转（固定第一个）
      var last = list.pop();
      list.splice(1, 0, last);
    }
    return rounds;
  }

  // 8. 淬炼营结局分发（6种）
  function dispatchCampEnding() {
    var st = global.State.current;
    if (!st.camp) return "camp_survive";
    var c = st.camp;
    if (c.awakening && c.rank <= 10) return "camp_master";  // 营主弟子
    if (c.teamId && c.rank === 1) return "camp_champion";   // 淬炼冠军
    if (c.teamId && c.rank <= 4) return "camp_semifinal";   // 四强
    if (c.awakening) return "camp_awakened";                // 觉醒者
    if (c.wins >= 1) return "camp_survive";                 // 存活
    return "camp_eliminated";                               // 淘汰
  }

  // 9. 淬炼营排名更新（每场1v1后调用）
  function updateCampRanking() {
    var st = global.State.current;
    if (!st.camp || !st.camp.players) return;
    var players = st.camp.players;
    players.forEach(function (p) { p._score = calcCampRanking(p); });
    players.sort(function (a, b) { return b._score - a._score; });
    for (var i = 0; i < players.length; i++) {
      if (players[i].isPlayer) { st.camp.rank = i + 1; break; }
    }
  }

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
    autoSave,
    // 比赛增强系统
    getElementClash,
    getStyleEvent,
    getKeyMomentBranch,
    getScoreNarrative,
    checkLegendEncounter,
    checkLegendRespect,
    checkLegendSpawn,
    applyLegendSpawnEffects,
    // 淬炼营系统
    initCamp,
    calcCampRanking,
    generate1v1Pairing,
    resolve1v1Match,
    checkCoachFavor,
    validateTeam,
    generateLeagueSchedule,
    dispatchCampEnding,
    updateCampRanking
  };
})(window);
