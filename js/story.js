/* ============================================================
   story.js — 剧情加载器：合并全局数据、变量插值、事件查询
   数据文件（data/*.js）以全局变量形式提供，避免 fetch 跨域问题
   暴露：window.Story
   ============================================================ */
(function (global) {
  "use strict";

  const events = {};          // id -> event 对象
  const matchPools = {};      // poolId -> 事件池
  let CONFIG = null;

  function bindConfig(cfg) { CONFIG = cfg; }

  // 注册一批事件（合并进 events）
  function registerEvents(list) {
    if (!list) return;
    list.forEach(ev => { events[ev.id] = ev; });
  }
  function registerMatchPools(obj) {
    if (!obj) return;
    Object.keys(obj).forEach(k => { matchPools[k] = obj[k]; });
  }

  // 初始化：合并各章节全局数据
  function init() {
    if (global.CHAPTER1) registerEvents(global.CHAPTER1.events);
    if (global.CHAPTER2) registerEvents(global.CHAPTER2.events);
    if (global.ENDINGS)  registerEvents(global.ENDINGS.events);
    if (global.MATCH_POOLS) registerMatchPools(global.MATCH_POOLS);
  }

  function getEvent(id) { return events[id] || null; }

  // 变量插值：{key} 从 state 取，支持少量特殊函数
  function interpolate(text) {
    if (!text) return "";
    const st = global.State.current;
    return text.replace(/\{(\w+)\}/g, (m, key) => {
      switch (key) {
        case "trainPoints": return st ? st.trainPoints : 0;
        case "rootDisplay": return global.State.rootDisplay();
        case "age": return st ? st.age : 14;
        case "round": return st ? st.round : 1;
        case "reputation": return st ? st.reputation : 0;
        case "stamina": return st ? st.stamina : 100;
        case "spiritStones": return st ? st.spiritStones : 0;
        case "elementAdj": return st ? (CONFIG.elementAdj[st.rootType] || "") : "";
        case "position": return st && st.position ? st.position : "未定";
        case "playstyle": return st && st.playstyle ? st.playstyle : "未定";
        case "goals": return st ? st.goals : 0;
        case "assists": return st ? st.assists : 0;
        case "matches": return st ? st.matches : 0;
        default:
          if (st && st.attrs && st.attrs[key] !== undefined) return Math.floor(st.attrs[key]);
          return m;
      }
    });
  }

  // 从踢法池中随机抽取 n 个事件（不重复）
  function pickMatchEvents(poolId, n) {
    const pool = matchPools[poolId];
    if (!pool || !pool.events) return [];
    const copy = pool.events.slice();
    const out = [];
    for (let i = 0; i < n && copy.length; i++) {
      const idx = Math.floor(Math.random() * copy.length);
      out.push(copy.splice(idx, 1)[0]);
    }
    return out;
  }

  function hasMatchPool(poolId) { return !!matchPools[poolId]; }

  global.Story = {
    bindConfig, init, getEvent, interpolate, pickMatchEvents, hasMatchPool,
    all: () => events
  };
})(window);
