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
    if (effects.flags) Object.assign(st.flags, effects.flags);
    if (effects.relationships) {
      Object.keys(effects.relationships).forEach(r => {
        st.relationships[r] = (st.relationships[r] || 0) + effects.relationships[r];
      });
    }
    if (effects.position) st.position = effects.position;
    if (effects.playstyle) st.playstyle = effects.playstyle;
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

    // 普通选项
    if (ev.choices && ev.choices.length) {
      const choice = await global.UI.renderChoices(ev.choices);
      await handleChoice(choice, ev);
    } else {
      // 无选项事件，停留等继续
      await global.UI.waitContinue();
      if (ev.next) goto(ev.next);
    }
  }

  // 处理选项：检定 + effects + 跳转
  async function handleChoice(choice, parentEvent) {
    let resultText = "";
    let effects = choice.effects || {};
    let nextId = choice.next;
    let checkKind = null;

    if (choice.check) {
      const opponentEl = matchState ? matchState.opponentEl : null;
      const r = skillCheck(choice.check.attrs, choice.check.difficulty, opponentEl);
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

    // 比赛模式：累加成功
    if (matchState && choice.check) {
      if (checkKind === "success" || checkKind === "critical") matchState.success++;
    }

    if (matchState) {
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

  async function runMatch(ev) {
    const st = global.State.current;
    const opp = ev.opponent || {};
    matchState = {
      opponentEl: opp.element || null,
      opponentName: opp.name || "对手",
      opponentStrength: opp.strength || 30,
      success: 0,
      subs: []
    };

    // 赛前信息
    await global.UI.renderMatchIntro(opp);

    // 取子事件池
    const poolId = buildPoolId(ev);
    let subs = [];
    if (poolId) subs = global.Story.pickMatchEvents(poolId, 3);
    if (!subs.length && ev.fallback_choices) {
      // 无池时用事件自带选项作为单节点
      subs = [{ text: "", choices: ev.fallback_choices }];
    }
    matchState.subs = subs;

    st.matches += 1;

    // 依次播放 3 个子事件
    for (let i = 0; i < subs.length; i++) {
      await playMatchSub(subs[i], i + 1, subs.length);
    }

    // 结算
    const s = matchState.success;
    let branchKey;
    if (s >= 3) branchKey = "bigwin";
    else if (s === 2) branchKey = "win";
    else if (s === 1) branchKey = "draw";
    else branchKey = "lose";

    const result = (ev.result && ev.result[branchKey]) || { text: "比赛结束。", effects: {} };

    // 比赛结果统计
    if (branchKey === "bigwin" || branchKey === "win") { st.wins += 1; st.goals += (branchKey === "bigwin" ? 2 : 1); }
    if (branchKey === "draw") st.goals += 1;
    if (branchKey === "lose") st.assists += 0;

    await global.UI.renderMatchResult(branchKey, s, subs.length);
    await global.UI.renderTextBlock(global.Story.interpolate(result.text));
    applyEffects(result.effects);
    global.UI.updateStatus();

    matchState = null;
    await global.UI.waitContinue();
    autoSave(true);

    if (result.next) goto(result.next);
  }

  async function playMatchSub(sub, idx, total) {
    await global.UI.renderMatchHeader(idx, total);
    if (sub.text) await global.UI.renderTextBlock(global.Story.interpolate(sub.text));
    if (!sub.choices || !sub.choices.length) {
      await global.UI.waitContinue();
      return;
    }
    const choice = await global.UI.renderChoices(sub.choices, { match: true });
    await handleChoice(choice, { type: "match" });
    await global.UI.waitContinue();
  }

  /* ============================================================
     结局判定
     ============================================================ */
  function dispatchEnding() {
    const st = global.State.current;
    let target = "end_dusk"; // 默认黯然
    if (st.reputation >= 80 && st.flags.keySuccess) target = "end_rising";
    else if (st.reputation >= 40) target = "end_dormant";
    else target = "end_dusk";
    goto(target);
  }

  /* ============================================================
     启动
     ============================================================ */
  function startNew() {
    global.State.clearSave();
    global.State.current = global.State.createInitial();
    global.UI.updateStatus();
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
