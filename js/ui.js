/* ============================================================
   ui.js — UI 渲染层
   职责：文字打字机、选项按钮、状态面板、修炼面板、比赛演出、结局页
   依赖：window.CONFIG / window.State / window.Story / window.Engine
   暴露：window.UI
   ============================================================ */
(function (global) {
  "use strict";

  let CONFIG = null;
  let $story, $choice, $root, $titleSub;
  let $statLinggen, $statJingjie, $statRound, $statChapter, $statPts;

  // 打字机控制
  let typeCtrl = null;       // { el, text, i, timer, resolve, done }
  let pending = Promise.resolve(); // 渲染串行队列
  let skipRequested = false;

  function bindConfig(cfg) { CONFIG = cfg; }

  function init() {
    $root = document.getElementById("app");
    $story = document.getElementById("storyArea");
    $choice = document.getElementById("choiceArea");
    $titleSub = document.getElementById("titleSub");
    $statLinggen = document.getElementById("statLinggen");
    $statJingjie = document.getElementById("statJingjie");
    $statRound = document.getElementById("statRound");
    $statChapter = document.getElementById("statChapter");
    $statPts = document.getElementById("statPts");

    // 点击文字区：跳过当前打字段落
    $story.addEventListener("click", () => {
      if (typeCtrl && !typeCtrl.done) {
        skipRequested = true;
        clearTimeout(typeCtrl.timer);
        typeCtrl.el.insertAdjacentText("beforeend", typeCtrl.text.slice(typeCtrl.i));
        typeCtrl.i = typeCtrl.text.length;
        typeCtrl.done = true;
        typeCtrl.resolve();
      }
    });

    // 状态栏点击 → 属性面板
    document.getElementById("statusBar").addEventListener("click", showStatusPanel);
    document.getElementById("attrBtn").addEventListener("click", showStatusPanel);

    // 启动存档检测
    bootStart();
  }

  /* ---------- 工具 ---------- */
  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
  function clearChoices() { $choice.innerHTML = ""; }
  function scrollBottom() { $story.scrollTop = $story.scrollHeight; }

  /* ---------- 状态栏更新 ---------- */
  function updateStatus() {
    const st = global.State.current;
    if (!st) return;
    const en = CONFIG.elementEn[st.rootType] || "";
    $statLinggen.textContent = st.rootType ? global.State.rootDisplay() : "未觉醒";
    $statLinggen.className = "status-value " + (en ? "element-" + en : "");
    // 境界取主亲和属性境界（用亲和元素第一个属性近似）
    let realmTxt = "—";
    if (st.rootType) {
      const mainAttr = CONFIG.attrs[st.rootType][0];
      realmTxt = global.State.getRealm(st.attrs[mainAttr]);
    }
    $statJingjie.textContent = realmTxt;
    $statRound.textContent = "第" + st.round + "月";
    $statChapter.textContent = "第" + st.chapter + "章";
    $statPts.textContent = st.trainPoints;
  }

  /* ============================================================
     文字渲染（打字机，串行队列）
     ============================================================ */
  function enqueue(task) {
    pending = pending.then(task).catch(e => console.error(e));
    return pending;
  }

  function renderTextBlock(src, opts) {
    opts = opts || {};
    return enqueue(() => _renderText(src, opts));
  }

  async function _renderText(src, opts) {
    const text = global.Story.interpolate(typeof src === "string" ? src : src.join("\n"));
    const paras = text.split("\n");
    for (const p of paras) {
      if (p === "") { await sleep(40); continue; }
      await typePara(p, opts);
      await sleep(80);
    }
  }

  function typePara(text, opts) {
    return new Promise(resolve => {
      const p = document.createElement("p");
      let cls = "narration fade-in";
      if (opts.system) cls = "system-msg fade-in";
      if (opts.check === "critical") cls = "system-msg crit fade-in";
      if (opts.check === "fail") cls = "narration fade-in";
      if (opts.check === "success") cls = "narration fade-in";
      p.className = cls;
      $story.appendChild(p);

      const cursor = document.createElement("span");
      cursor.className = "cursor";
      p.appendChild(cursor);

      typeCtrl = { el: p, text, i: 0, timer: null, resolve, done: false };
      skipRequested = false;

      function tick() {
        if (typeCtrl.i < text.length) {
          cursor.insertAdjacentText("beforebegin", text[typeCtrl.i]);
          typeCtrl.i++;
          scrollBottom();
          typeCtrl.timer = setTimeout(tick, CONFIG.typeSpeed);
        } else {
          cursor.remove();
          typeCtrl.done = true;
          resolve();
        }
      }
      tick();
    });
  }

  function renderDivider() {
    return enqueue(() => new Promise(resolve => {
      const d = document.createElement("div");
      d.className = "divider fade-in";
      d.textContent = "◇ ◆ ◇";
      $story.appendChild(d);
      setTimeout(resolve, 300);
    }));
  }

  function showCheckResult(kind, tag) {
    // 在文字区底部插一条检定标签
    enqueue(() => new Promise(resolve => {
      const span = document.createElement("div");
      span.className = "check-result " + kind;
      const label = kind === "critical" ? "灵光一闪！" : (kind === "success" ? "检定成功" : "检定失败");
      span.textContent = label + (tag ? "  " + tag : "");
      $story.appendChild(span);
      setTimeout(resolve, 200);
    }));
  }

  /* ============================================================
     选项按钮
     ============================================================ */
  function renderChoices(choices, opts) {
    opts = opts || {};
    return new Promise(resolve => {
      clearChoices();
      choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.className = "choice-btn fade-in";
        const label = document.createElement("span");
        label.textContent = choice.text;
        btn.appendChild(label);
        // 检定标签
        if (choice.check) {
          const tag = document.createElement("span");
          tag.className = "check-tag";
          const names = choice.check.attrs.map(a => CONFIG.attrNames[a]).join("+");
          tag.textContent = "检定:" + names + " 难度" + choice.check.difficulty;
          btn.appendChild(tag);
        }
        btn.addEventListener("click", () => {
          if (typeCtrl && !typeCtrl.done) return; // 打字中禁用
          resolve(choice);
        });
        $choice.appendChild(btn);
      });
    });
  }

  /* ---------- 继续按钮 ---------- */
  function waitContinue(label) {
    return new Promise(resolve => {
      clearChoices();
      const btn = document.createElement("button");
      btn.className = "choice-btn fade-in";
      btn.textContent = label || "继续";
      btn.addEventListener("click", () => resolve());
      $choice.appendChild(btn);
    });
  }

  /* ============================================================
     属性面板（覆盖层）
     ============================================================ */
  function showStatusPanel() {
    const st = global.State.current;
    if (!st) return;
    const ov = document.getElementById("overlay");
    ov.innerHTML = "";
    const panel = document.createElement("div");
    panel.className = "overlay-panel";

    const title = document.createElement("div");
    title.className = "overlay-title";
    title.textContent = "五行灵根";
    panel.appendChild(title);

    const info = document.createElement("div");
    info.style.cssText = "text-align:center;color:var(--gold);margin-bottom:14px;font-size:14px;";
    info.textContent = global.State.rootDisplay() + " · 位置:" + (st.position || "未定") + " · 踢法:" + (st.playstyle || "未定");
    panel.appendChild(info);

    const grid = document.createElement("div");
    grid.className = "attrs-grid";
    CONFIG.elementOrder.forEach(el => {
      const g = document.createElement("div");
      g.className = "element-group " + el;
      const h = document.createElement("h4");
      h.textContent = el + "行";
      if (st.affinityElements.includes(el)) {
        const aff = document.createElement("span");
        aff.className = "attr-affinity";
        aff.textContent = "亲和×" + global.State.getMultiplier(el);
        h.appendChild(aff);
      }
      g.appendChild(h);
      CONFIG.attrs[el].forEach(a => {
        const row = document.createElement("div");
        row.className = "attr-row";
        const nm = document.createElement("span");
        nm.className = "attr-name";
        nm.textContent = CONFIG.attrNames[a];
        const bar = document.createElement("span");
        bar.className = "attr-bar";
        const inner = document.createElement("i");
        inner.style.width = Math.min(100, st.attrs[a]) + "%";
        bar.appendChild(inner);
        const val = document.createElement("span");
        val.className = "attr-val";
        val.textContent = Math.floor(st.attrs[a]) + " " + global.State.getRealm(st.attrs[a]);
        row.appendChild(nm); row.appendChild(bar); row.appendChild(val);
        g.appendChild(row);
      });
      grid.appendChild(g);
    });
    panel.appendChild(grid);

    // 资源
    const res = document.createElement("div");
    res.style.cssText = "margin-top:14px;font-size:13px;color:var(--text-dim);text-align:center;";
    res.innerHTML = "声望 " + st.reputation + " · 体力 " + st.stamina + " · 灵石 " + st.spiritStones +
      " · 进球 " + st.goals + " · 助攻 " + st.assists + " · 比赛 " + st.matches + "胜" + st.wins;
    panel.appendChild(res);

    const close = document.createElement("button");
    close.className = "close-btn";
    close.textContent = "收起";
    close.addEventListener("click", () => ov.classList.remove("show"));
    panel.appendChild(close);

    ov.appendChild(panel);
    ov.classList.add("show");
  }

  /* ============================================================
     修炼面板
     ============================================================ */
  function showTrainPanel(ev) {
    return new Promise(resolve => {
      const st = global.State.current;
      const ov = document.getElementById("overlay");
      ov.innerHTML = "";
      const panel = document.createElement("div");
      panel.className = "overlay-panel train-panel";

      const title = document.createElement("div");
      title.className = "overlay-title";
      title.textContent = "本月修炼";
      panel.appendChild(title);

      const pts = document.createElement("div");
      pts.className = "train-pts";
      pts.id = "trainPts";
      pts.textContent = "剩余修炼点：" + st.trainPoints;
      panel.appendChild(pts);

      if (ev && ev.text) {
        const tip = document.createElement("div");
        tip.style.cssText = "font-size:13px;color:var(--text-dim);text-align:center;margin-bottom:10px;";
        tip.textContent = "亲和属性享受倍率加成，点击属性投入1点。";
        panel.appendChild(tip);
      }

      const grid = document.createElement("div");
      grid.className = "attrs-grid";
      CONFIG.elementOrder.forEach(el => {
        const g = document.createElement("div");
        g.className = "element-group " + el;
        const h = document.createElement("h4");
        h.textContent = el + "行";
        if (st.affinityElements.includes(el)) {
          const aff = document.createElement("span");
          aff.className = "attr-affinity";
          aff.textContent = "×" + global.State.getMultiplier(el);
          h.appendChild(aff);
        }
        g.appendChild(h);
        CONFIG.attrs[el].forEach(a => {
          const row = document.createElement("div");
          row.className = "attr-row";
          const nm = document.createElement("span");
          nm.className = "attr-name";
          nm.textContent = CONFIG.attrNames[a];
          const bar = document.createElement("span");
          bar.className = "attr-bar";
          const inner = document.createElement("i");
          inner.style.width = Math.min(100, st.attrs[a]) + "%";
          bar.appendChild(inner);
          const val = document.createElement("span");
          val.className = "attr-val";
          val.textContent = Math.floor(st.attrs[a]);
          row.appendChild(nm); row.appendChild(bar); row.appendChild(val);
          row.addEventListener("click", () => {
            if (st.trainPoints <= 0) { toast("修炼点已用完"); return; }
            global.Engine.applyTrainPoint(a);
            inner.style.width = Math.min(100, st.attrs[a]) + "%";
            val.textContent = Math.floor(st.attrs[a]);
            pts.textContent = "剩余修炼点：" + st.trainPoints;
            updateStatus();
          });
          g.appendChild(row);
        });
        grid.appendChild(g);
      });
      panel.appendChild(grid);

      const done = document.createElement("button");
      done.className = "train-done";
      done.textContent = "修炼完成";
      done.addEventListener("click", () => {
        ov.classList.remove("show");
        ov.innerHTML = "";
        resolve();
      });
      panel.appendChild(done);

      ov.appendChild(panel);
      ov.classList.add("show");
    });
  }

  /* ============================================================
     比赛演出
     ============================================================ */
  function renderMatchIntro(opp) {
    return enqueue(() => new Promise(resolve => {
      const sb = document.createElement("div");
      sb.className = "scoreboard fade-in";
      sb.textContent = "对阵 · " + (opp.name || "对手") + (opp.element ? "（" + opp.element + "灵根）" : "");
      $story.appendChild(sb);
      setTimeout(resolve, 250);
    }));
  }
  function renderMatchHeader(idx, total) {
    return enqueue(() => new Promise(resolve => {
      const d = document.createElement("div");
      d.className = "divider fade-in";
      d.textContent = "第 " + idx + " / " + total + " 关键时刻";
      $story.appendChild(d);
      setTimeout(resolve, 200);
    }));
  }
  function renderMatchResult(branch, success, total) {
    return enqueue(() => new Promise(resolve => {
      const sb = document.createElement("div");
      sb.className = "scoreboard fade-in";
      const map = { bigwin: "大胜", win: "小胜", draw: "平局", lose: "失利" };
      sb.textContent = map[branch] + " · 关键成功 " + success + "/" + total;
      $story.appendChild(sb);
      setTimeout(resolve, 300);
    }));
  }

  /* ============================================================
     结局页
     ============================================================ */
  function showEnding(ev) {
    const st = global.State.current;
    const ov = document.getElementById("overlay");
    ov.innerHTML = "";
    const panel = document.createElement("div");
    panel.className = "overlay-panel";

    const t = document.createElement("div");
    t.className = "ending-title";
    t.textContent = ev.title || "结局";
    panel.appendChild(t);

    // 结算总览
    const summary = document.createElement("div");
    summary.className = "summary-grid";
    const items = [
      ["灵根", global.State.rootDisplay()],
      ["位置", st.position || "—"],
      ["踢法", st.playstyle || "—"],
      ["生涯回合", st.round],
      ["进球", st.goals],
      ["助攻", st.assists],
      ["比赛/胜场", st.matches + " / " + st.wins],
      ["最终声望", st.reputation]
    ];
    items.forEach(([k, v]) => {
      const k2 = document.createElement("span"); k2.className = "k"; k2.textContent = k;
      const v2 = document.createElement("span"); v2.className = "v"; v2.textContent = v;
      summary.appendChild(k2); summary.appendChild(v2);
    });
    panel.appendChild(summary);

    // 评语
    if (ev.eval) {
      const e = document.createElement("div");
      e.className = "ending-eval fade-in";
      e.textContent = global.Story.interpolate(ev.eval);
      panel.appendChild(e);
    }

    const restart = document.createElement("button");
    restart.className = "restart-btn";
    restart.textContent = "再世为人";
    restart.addEventListener("click", () => {
      global.State.clearSave();
      location.reload();
    });
    panel.appendChild(restart);

    ov.appendChild(panel);
    ov.classList.add("show");
    global.State.save();
  }

  /* ---------- Toast ---------- */
  let toastTimer = null;
  function toast(msg) {
    let el = document.getElementById("saveToast");
    if (!el) {
      el = document.createElement("div");
      el.id = "saveToast";
      el.className = "save-toast";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 1400);
  }

  /* ============================================================
     开局：存档检测
     ============================================================ */
  function bootStart() {
    if (global.Engine.hasSave()) {
      clearChoices();
      const tip = document.createElement("div");
      tip.className = "fade-in";
      tip.style.cssText = "color:var(--text-dim);font-size:12px;text-align:center;margin-bottom:8px;";
      tip.textContent = "检测到存档";
      $choice.appendChild(tip);
      const c = document.createElement("button");
      c.className = "choice-btn fade-in"; c.textContent = "继续上局";
      c.addEventListener("click", () => global.Engine.continueGame());
      $choice.appendChild(c);
      const n = document.createElement("button");
      n.className = "choice-btn fade-in"; n.textContent = "开新的一局";
      n.addEventListener("click", () => global.Engine.startNew());
      $choice.appendChild(n);
    } else {
      global.Engine.startNew();
    }
  }

  global.UI = {
    bindConfig, init, updateStatus,
    renderTextBlock, renderDivider, renderChoices, waitContinue, showCheckResult,
    showStatusPanel, showTrainPanel,
    renderMatchIntro, renderMatchHeader, renderMatchResult,
    showEnding, toast
  };
})(window);
