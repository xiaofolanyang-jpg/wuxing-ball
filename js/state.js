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
    else if (roll < CONFIG.quality.heaven.prob + CONFIG.quality.dual.prob + CONFIG.quality.triple.prob) qKey = "triple";
    else qKey = "mixed";

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
    else if (qKey === "triple") affinity = [order[0], order[1], order[2]];
    else affinity = [order[0], order[1], order[2], order[3]]; // 杂灵根4+

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
      // 增强版比赛（设计稿第五章）：自由属性点 + 评级分布
      freePoints: 0,
      ratingDist: { S: 0, A: 0, B: 0, C: 0, D: 0 },
      // 心魔值（设计稿第五章评级表：D评级+10；心魔劫本体后续版本实现）
      demonValue: 0,
      // 羁绊系统（设计稿第五章·羁绊与技能）：进度值 + 已解锁羁绊id列表
      bondProgress: { agui: 0, zhaolin: 0, canglan: 0, linxiao: 0, suwan: 0 },
      bondsUnlocked: [],
      // 流程控制
      currentEventId: null,
      matchContext: null
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
