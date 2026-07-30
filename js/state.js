/* ============================================================
   state.js — 玩家状态管理 + 存档 + 辅助函数
   依赖：window.CONFIG (由 story.js 加载 config.json 后赋值)
   暴露：window.State
   ============================================================ */
(function (global) {
  "use strict";

  let CONFIG = null;

  // 绑定配置（story.js 加载后调用）
  function bindConfig(cfg) { CONFIG = cfg; }

  // 生成初始灵根（觉醒仪式随机）
  function rollRoot() {
    const roll = Math.random();
    let qKey;
    if (roll < CONFIG.quality.heaven.prob) qKey = "heaven";
    else if (roll < CONFIG.quality.heaven.prob + CONFIG.quality.dual.prob) qKey = "dual";
    else qKey = "full";

    // 随机主灵根及亲和列表
    const order = CONFIG.elementOrder.slice();
    // 打乱
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    let affinity = [];
    if (qKey === "heaven") affinity = [order[0]];
    else if (qKey === "dual") affinity = [order[0], order[1]];
    else affinity = CONFIG.elementOrder.slice(); // 全灵根：五行全亲和

    return {
      rootType: affinity[0],
      rootQuality: qKey,
      affinityElements: affinity
    };
  }

  // 开局难度（问题5）：困难=全属性5 / 普通=全属性8 / 简单=全属性12
  const DIFFICULTY_BASE = { hard: 5, normal: 8, easy: 12 };

  // 创建初始状态（difficulty 可选：hard/normal/easy，默认 normal）
  function createInitial(difficulty) {
    const diff = DIFFICULTY_BASE[difficulty] !== undefined ? difficulty : "normal";
    const baseVal = DIFFICULTY_BASE[diff];
    const attrs = {};
    CONFIG.elementOrder.forEach(el => {
      CONFIG.attrs[el].forEach(a => { attrs[a] = baseVal; });
    });
    return {
      name: "",
      age: 14,
      chapter: 1,
      round: 1,
      // 开局难度（随存档保存/恢复）
      difficulty: diff,
      rootType: null,
      rootQuality: null,
      affinityElements: [],
      // 灵根重选（设计稿 3.2）：已重roll次数 + 上次灵根显示串（用于对比提示）
      rerollCount: 0,
      lastRootDisplay: null,
      attrs: attrs,
      position: null,
      playstyle: null,
      trainPoints: CONFIG.baseTrainPoints,
      reputation: 0,
      stamina: 100,
      spiritStones: 0,
      relationships: {},
      flags: {},
      // 比赛统计
      goals: 0,
      assists: 0,
      matches: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      lastMatchScore: null,   // { my: 2, opp: 1 }（供 {lastScore} 插值）
      lastMatchResult: null,  // "win"/"draw"/"lose"（供 {lastResult} 插值）
      // 增强版比赛（设计稿第五章）：自由属性点 + 评级分布
      freePoints: 0,
      ratingDist: { S: 0, A: 0, B: 0, C: 0, D: 0 },
      // 心魔值（设计稿第五章评级表：D评级+12；梯度惩罚15/30/45；坏结局阈值60）
      demonValue: 0,
      // 羁绊系统（设计稿 v3.0·动态羁绊）：进度值 + 已解锁羁绊id列表
      // 同袍(同场≥3)/默契(≥8场+配合)/金兰(≥15场+剧情)/宿敌(交锋≥3互有胜负)/传奇之交/传承/双子星
      bondProgress: { tongpao: 0, moqi: 0, jinlan: 0, sudi: 0, chuanqi: 0, chuancheng: 0, shuangzi: 0 },
      bondsUnlocked: [],
      // 流程控制
      currentEventId: null,
      matchContext: null,
      // 传奇球员系统
      encounterFlags: {},      // { "jinqve": true } 已交手的球队
      legendSpawned: {},       // { "jinqve_guli": true } 已触发的概率传奇
      // 比赛风格系统
      seriesCount: {},         // { "jinqve": 2 } 与每队交手次数
      consecutiveFails: 0,     // 当前连续检定失败次数
      setPieceCount: 0,        // 本场定位球次数
      // 淬炼营（进入后初始化为对象）
      camp: null,
      // camp 结构: { rank, wins, losses, coachScore, teamId, teammates[], passives[], awakening:false }

      /* ===== v3.0 世界生成（开局由 GameSetup 填充，供剧本插值） ===== */
      continent: null,          // 起始大洲（铸铁洲/青岚洲/潮音洲/烈原洲/磐石洲）
      continentElement: null,   // 大洲五行偏向
      homeAcademy: null,        // 本洲五院（金阙院等，终极目标）
      academyName: null,        // 玩家起始小学院名
      nationality: null,        // 国籍（洲内随机国家）
      rivalAcademy: null,       // 同级对手学院名
      academyGrade: "D",        // 学院评级 D→C→B→A→S
      companions: [],           // 成长型传奇队友数组
      companionCount: 0         // 队友数量（2-4）
    };
  }

  // ---- 辅助函数 ----
  // 属性属于哪个五行（中文）
  function attrToElement(attrName) {
    for (const el of CONFIG.elementOrder) {
      if (CONFIG.attrs[el].includes(attrName)) return el;
    }
    return null;
  }

  // 数值 → 境界名
  function getRealm(val) {
    for (const r of CONFIG.realm) {
      if (val >= r.min && val <= r.max) return r.name;
    }
    return CONFIG.realm[0].name;
  }

  // 倍率：某五行是否亲和（问题1：亲和按品质倍率，非亲和统一 0.8）
  function getMultiplier(element) {
    if (!global.State.current) return 1;
    const st = global.State.current;
    if (!st.affinityElements.includes(element)) return CONFIG.nonAffinityMult;
    return CONFIG.quality[st.rootQuality].mult;
  }

  // 灵根中文显示
  function rootDisplay() {
    const st = global.State.current;
    if (!st.rootType) return "未觉醒";
    const q = CONFIG.quality[st.rootQuality].name;
    const elName = st.rootType;
    const aff = st.affinityElements.join("");
    return `${elName}·${q}（${aff}）`;
  }

  // ---- 存档 ----
  function save() {
    try {
      localStorage.setItem(CONFIG.saveKey, JSON.stringify(global.State.current));
      return true;
    } catch (e) { console.warn("存档失败", e); return false; }
  }
  function load() {
    try {
      const raw = localStorage.getItem(CONFIG.saveKey);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) { return null; }
  }
  function clearSave() {
    try { localStorage.removeItem(CONFIG.saveKey); } catch (e) {}
  }

  global.State = {
    bindConfig,
    createInitial,
    rollRoot,
    attrToElement,
    getRealm,
    getMultiplier,
    rootDisplay,
    save,
    load,
    clearSave,
    current: null,
    // 运行期：每回合恢复修炼点
    refillTrainPoints: function () {
      global.State.current.trainPoints = CONFIG.baseTrainPoints;
    }
  };
})(window);
