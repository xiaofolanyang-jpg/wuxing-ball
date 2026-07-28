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
    if (global.CHAPTER3) registerEvents(global.CHAPTER3.events);
    if (global.CHAPTER4) registerEvents(global.CHAPTER4.events);
    if (global.CHAPTER5) registerEvents(global.CHAPTER5.events);
    if (global.CHAPTER6) registerEvents(global.CHAPTER6.events);
    if (global.CHAPTER7) registerEvents(global.CHAPTER7.events);
    if (global.CHAPTER8) registerEvents(global.CHAPTER8.events);
    if (global.CHAPTER9) registerEvents(global.CHAPTER9.events);
    if (global.CHAPTER10) registerEvents(global.CHAPTER10.events);
    if (global.CHAPTER11) registerEvents(global.CHAPTER11.events);
    if (global.CHAPTER12) registerEvents(global.CHAPTER12.events);
    if (global.CHAPTER13) registerEvents(global.CHAPTER13.events);
    if (global.CHAPTER14) registerEvents(global.CHAPTER14.events);
    if (global.CHAPTER15) registerEvents(global.CHAPTER15.events);
    if (global.CHAPTER16) registerEvents(global.CHAPTER16.events);
    if (global.CHAPTER17) registerEvents(global.CHAPTER17.events);
    if (global.CHAPTER18) registerEvents(global.CHAPTER18.events);
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
        case "affinityMult": return st && st.rootQuality ? CONFIG.quality[st.rootQuality].mult : 1;
        case "nonAffinityMult": return CONFIG.nonAffinityMult;
        case "position": return st && st.position ? st.position : "未定";
        case "playstyle": return st && st.playstyle ? st.playstyle : "未定";
        case "goals": return st ? st.goals : 0;
        case "assists": return st ? st.assists : 0;
        case "matches": return st ? st.matches : 0;
        case "rerollLeft": return st ? Math.max(0, (CONFIG.maxRerolls - 1) - (st.rerollCount || 0)) : 0;
        default:
          if (st && st.attrs && st.attrs[key] !== undefined) return Math.floor(st.attrs[key]);
          return m;
      }
    });
  }

  // 从踢法池中随机抽取 n 个事件（不重复）
  // posture（可选）：attack/balanced/defense 攻防姿态。
  //   1) 优先抽事件级 sit 标签与 posture 匹配的事件；
  //   2) 不足时从 balanced/无标签事件补齐，再不行才用其他局面事件兜底。
  function pickMatchEvents(poolId, n, posture) {
    const pool = matchPools[poolId];
    if (!pool || !pool.events) return [];
    const all = pool.events.slice();
    const out = [];
    function drawFrom(list) {
      while (out.length < n && list.length) {
        const idx = Math.floor(Math.random() * list.length);
        out.push(list.splice(idx, 1)[0]);
      }
    }
    // 1) 优先匹配当前攻防姿态的事件（防守局面也能抽到防守场景）
    if (posture) {
      const matching = all.filter(e => e.sit === posture);
      drawFrom(matching);
    }
    // 2) 补齐：balanced/无标签优先，再用其余事件兜底，保证任何局面都抽得出事件
    const used = out.slice();
    const rest = all.filter(e => used.indexOf(e) < 0);
    const balanced = rest.filter(e => !e.sit || e.sit === "balanced");
    const others = rest.filter(e => e.sit && e.sit !== "balanced");
    drawFrom(balanced);
    drawFrom(others);
    return out;
  }

  function hasMatchPool(poolId) { return !!matchPools[poolId]; }

  global.Story = {
    bindConfig, init, getEvent, interpolate, pickMatchEvents, hasMatchPool,
    all: () => events
  };
})(window);
