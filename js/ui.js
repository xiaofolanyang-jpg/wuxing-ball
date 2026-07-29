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
  let typeCtrl = null;       // { el, text, i, timer, resolve, done, cursor }
  let pending = Promise.resolve(); // 渲染串行队列
  let skipRequested = false;
  let $matchHUD = null;      // 比赛实时计分牌（比分+双方威胁值）

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
        // 把剩余文字补到光标之前并移除光标，避免跳过后光标遗留
        // （修复：多次点击跳过导致多个光标残留不消失）
        if (typeCtrl.cursor) {
          typeCtrl.cursor.insertAdjacentText("beforebegin", typeCtrl.text.slice(typeCtrl.i));
          typeCtrl.cursor.remove();
          typeCtrl.cursor = null;
        } else {
          typeCtrl.el.insertAdjacentText("beforeend", typeCtrl.text.slice(typeCtrl.i));
        }
        typeCtrl.i = typeCtrl.text.length;
        typeCtrl.done = true;
        scrollBottom();
        typeCtrl.resolve();
      }
    });

    // 状态栏点击 → 属性面板
    document.getElementById("statusBar").addEventListener("click", showStatusPanel);
    document.getElementById("attrBtn").addEventListener("click", showStatusPanel);

    // 帮助按钮 → 玩法说明
    document.getElementById("helpBtn").addEventListener("click", showHelpPanel);

    // 启动存档检测
    bootStart();
  }

  /* ---------- 工具 ---------- */
  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
  function clearChoices() { $choice.innerHTML = ""; }

  // 滚动节流（防闪烁关键）：
  //  - rAF 合并：打字机每字符都会调 scrollBottom，这里合并为每帧最多一次，避免高频强制重排；
  //  - 仅当用户处于底部附近才自动滚动，避免用户回看历史时被强制拉回。
  let scrollRAF = null;
  function scrollBottom(force) {
    if (scrollRAF) return;
    scrollRAF = requestAnimationFrame(() => {
      scrollRAF = null;
      if (!$story) return;
      const gap = $story.scrollHeight - $story.scrollTop - $story.clientHeight;
      if (force || gap < 140) $story.scrollTop = $story.scrollHeight;
    });
  }

  /* ---------- 体力/心魔分级标签 ---------- */
  function staminaLabel(val) {
    if (val < 10) return '<span style="color:#e74c3c;font-weight:bold">' + val + " 强弩之末</span>";
    if (val < 30) return '<span style="color:#e67e22">' + val + " 体力告急</span>";
    if (val < 50) return '<span style="color:#f1c40f">' + val + " 略显疲态</span>";
    return val;
  }
  function demonLabel(val) {
    if (val >= 45) return '<span style="color:#e74c3c;font-weight:bold">心魔' + val + " 噬心</span>";
    if (val >= 30) return '<span style="color:#e67e22">心魔' + val + " 侵蚀</span>";
    if (val >= 15) return '<span style="color:#f1c40f">心魔' + val + " 低语</span>";
    return "心魔值 " + val;
  }

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

      typeCtrl = { el: p, text, i: 0, timer: null, resolve, done: false, cursor };
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

  function showCheckResult(kind, tag, growth) {
    // 在文字区底部插一条检定标签
    enqueue(() => new Promise(resolve => {
      const span = document.createElement("div");
      span.className = "check-result " + kind;
      const label = kind === "critical" ? "灵光一闪！" : (kind === "success" ? "检定成功" : "检定失败");
      span.textContent = label + (tag ? "  " + tag : "") + (growth ? "  【" + growth + "】" : "");
      $story.appendChild(span);
      setTimeout(resolve, 200);
    }));
  }

  /* ============================================================
     选项按钮
     ============================================================ */
  // 结果提示（问题3）：把 effects 汇总成一句简短的可能结果提示
  function effectsToHint(effects) {
    if (!effects) return "";
    const signed = n => (n >= 0 ? "+" : "") + n;
    const parts = [];
    if (effects.reputation) parts.push("声望" + signed(effects.reputation));
    if (effects.stamina) parts.push("体力" + signed(effects.stamina));
    if (effects.demonValue) parts.push("心魔" + signed(effects.demonValue));
    if (effects.spiritStones) parts.push("灵石" + signed(effects.spiritStones));
    if (effects.goals) parts.push("进球" + signed(effects.goals));
    if (effects.assists) parts.push("助攻" + signed(effects.assists));
    if (effects.attrs) {
      Object.keys(effects.attrs).forEach(a => {
        if (CONFIG.attrNames[a]) parts.push(CONFIG.attrNames[a] + signed(effects.attrs[a]));
      });
    }
    if (effects.bonds) parts.push("羁绊↑");
    return parts.join(" · ");
  }
  // 自动推导提示：检定选项取“成功分支”的效果（可能收益），普通选项取自身 effects；choice.hint 可手动覆盖
  function deriveHint(choice) {
    if (choice.hint) return choice.hint;
    const effects = choice.check
      ? ((choice.success && choice.success.effects) || choice.effects)
      : choice.effects;
    return effectsToHint(effects);
  }

  function renderChoices(choices, opts) {
    opts = opts || {};
    return new Promise(resolve => {
      clearChoices();
      const frag = document.createDocumentFragment();
      const btns = [];
      choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.className = "choice-btn fade-in";
        const label = document.createElement("span");
        label.textContent = global.Story.interpolate(choice.text);
        btn.appendChild(label);
        // 检定标签
        if (choice.check) {
          const tag = document.createElement("span");
          tag.className = "check-tag";
          const names = choice.check.attrs.map(a => CONFIG.attrNames[a]).join("+");
          tag.textContent = "检定:" + names + " 难度" + choice.check.difficulty;
          btn.appendChild(tag);
        }
        // 结果提示（问题3）：简要提示可能会发生的结果
        const hintText = deriveHint(choice);
        if (hintText) {
          const hint = document.createElement("span");
          hint.className = "choice-hint";
          hint.textContent = "↳ " + hintText;
          btn.appendChild(hint);
        }
        btn.addEventListener("click", () => {
          if (typeCtrl && !typeCtrl.done) return; // 打字中禁用
          if (btn.disabled) return;               // 防双击重复触发
          btns.forEach(b => { b.disabled = true; }); // 点击后立即禁用全部按钮，消除残留闪烁
          btn.classList.add("picked");
          resolve(choice);
        });
        btns.push(btn);
        frag.appendChild(btn);
      });
      $choice.appendChild(frag); // 一次性挂载，避免逐个 append 造成多次重排闪烁
    });
  }

  /* ---------- 继续按钮 ---------- */
  function waitContinue(label) {
    return new Promise(resolve => {
      clearChoices();
      const btn = document.createElement("button");
      btn.className = "choice-btn fade-in";
      btn.textContent = label || "继续";
      btn.addEventListener("click", () => {
        if (btn.disabled) return;
        btn.disabled = true; // 立即禁用，防止双击重复 resolve
        resolve();
      });
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
    res.innerHTML = "声望 " + st.reputation + " · 体力 " + staminaLabel(st.stamina) + " · 灵石 " + st.spiritStones +
      " · 进球 " + st.goals + " · 助攻 " + st.assists + " · 比赛 " + st.matches + "胜" + st.wins;
    // 评级分布 + 自由属性点 + 心魔值（设计稿第五章·状态总览）
    const rd = st.ratingDist || {};
    res.innerHTML += "<br>评级分布 S×" + (rd.S || 0) + " A×" + (rd.A || 0) + " B×" + (rd.B || 0) +
      " C×" + (rd.C || 0) + " D×" + (rd.D || 0) +
      " · 自由属性点 " + (st.freePoints || 0) + " · " + demonLabel(st.demonValue || 0);
    panel.appendChild(res);

    // 羁绊图鉴（设计稿第五章·羁绊页面展示：已解锁彩色/进行中进度）
    if (CONFIG.bonds) {
      const bt = document.createElement("div");
      bt.style.cssText = "margin-top:14px;font-size:13px;";
      const bTitle = document.createElement("div");
      bTitle.style.cssText = "color:var(--gold);font-weight:bold;text-align:center;margin-bottom:6px;";
      bTitle.textContent = "── 羁绊图鉴 ──";
      bt.appendChild(bTitle);
      const unlocked = st.bondsUnlocked || [];
      Object.keys(CONFIG.bonds).forEach(bid => {
        const b = CONFIG.bonds[bid];
        const prog = (st.bondProgress && st.bondProgress[bid]) || 0;
        const row = document.createElement("div");
        row.style.cssText = "margin-bottom:8px;padding:6px 8px;border:1px solid rgba(255,255,255,0.08);border-radius:6px;text-align:center;";
        if (unlocked.indexOf(bid) >= 0) {
          row.innerHTML = "<b style='color:var(--gold);'>★ " + b.name + "</b>（" + b.type + "·" + b.target + "）<br>" +
            "<span style='color:var(--text-dim);font-size:12px;'>" + b.effect + "<br>" + b.story + "</span>";
        } else {
          row.innerHTML = "<b style='color:var(--text-dim);'>◇ " + b.name + "</b>（" + b.type + "·" + b.target + "）<br>" +
            "<span style='color:var(--text-dim);font-size:12px;'>进度 " + Math.min(prog, b.threshold) + "/" + b.threshold + " · " + b.effect + "</span>";
        }
        bt.appendChild(row);
      });
      panel.appendChild(bt);
    }

    // 按钮行：灵石商店 + 收起
    const btnRow = document.createElement("div");
    btnRow.style.cssText = "display:flex;gap:10px;justify-content:center;margin-top:12px;";
    const shopBtn = document.createElement("button");
    shopBtn.className = "close-btn";
    shopBtn.textContent = "灵石商店";
    shopBtn.addEventListener("click", () => showShopPanel());
    const close = document.createElement("button");
    close.className = "close-btn";
    close.textContent = "收起";
    close.addEventListener("click", () => ov.classList.remove("show"));
    btnRow.appendChild(shopBtn);
    btnRow.appendChild(close);
    panel.appendChild(btnRow);

    ov.appendChild(panel);
    ov.classList.add("show");
  }

  /* ============================================================
     灵石商店（设计稿第七章·资源系统：灵石购买丹药/功法）
     ============================================================ */
  function applyShopItem(item) {
    const st = global.State.current;
    if (item.id === "pill_qi") {
      st.stamina = Math.min(100, st.stamina + 30);
    } else if (item.id === "pill_body") {
      const affEls = (st.affinityElements && st.affinityElements.length) ? st.affinityElements : CONFIG.elementOrder;
      const el = affEls[Math.floor(Math.random() * affEls.length)];
      const attrs = CONFIG.attrs[el];
      const a = attrs[Math.floor(Math.random() * attrs.length)];
      st.attrs[a] = Math.min(CONFIG.attrMax || 100, st.attrs[a] + 2);
    } else if (item.id === "manual_ball") {
      st.trainPoints = (st.trainPoints || 0) + 1;
    }
  }

  function showShopPanel() {
    const st = global.State.current;
    if (!st) return;
    const ov = document.getElementById("overlay");
    ov.innerHTML = "";
    const panel = document.createElement("div");
    panel.className = "overlay-panel";

    const title = document.createElement("div");
    title.className = "overlay-title";
    title.textContent = "灵石商店";
    panel.appendChild(title);

    const money = document.createElement("div");
    money.style.cssText = "text-align:center;color:var(--gold);margin-bottom:12px;font-size:14px;";
    money.textContent = "当前灵石：" + st.spiritStones;
    panel.appendChild(money);

    (CONFIG.shopItems || []).forEach(item => {
      const row = document.createElement("div");
      row.style.cssText = "display:flex;justify-content:space-between;align-items:center;padding:8px 10px;margin-bottom:8px;border:1px solid rgba(255,255,255,0.1);border-radius:6px;";
      const info = document.createElement("div");
      info.innerHTML = "<b>" + item.name + "</b> <span style='color:var(--text-dim);font-size:12px;'>[" + item.type + "]</span><br><span style='color:var(--text-dim);font-size:12px;'>" + item.desc + "</span>";
      const buy = document.createElement("button");
      buy.className = "choice-btn";
      buy.style.cssText = "width:auto;padding:6px 12px;margin:0;flex-shrink:0;";
      buy.textContent = item.cost + "灵石";
      buy.addEventListener("click", () => {
        if (st.spiritStones < item.cost) { toast("灵石不足"); return; }
        st.spiritStones -= item.cost;
        applyShopItem(item);
        money.textContent = "当前灵石：" + st.spiritStones;
        updateStatus();
        toast("已购入" + item.name);
      });
      row.appendChild(info);
      row.appendChild(buy);
      panel.appendChild(row);
    });

    const close = document.createElement("button");
    close.className = "close-btn";
    close.textContent = "离开商店";
    close.addEventListener("click", () => { ov.classList.remove("show"); ov.innerHTML = ""; });
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
  function renderMatchIntro(opp, situation, ourRating, oppStrength) {
    return enqueue(() => new Promise(resolve => {
      const sb = document.createElement("div");
      sb.className = "scoreboard fade-in";
      const sitMap = { strong: "以强打弱", even: "势均力敌", weak: "以弱打强" };
      let txt = "对阵 · " + (opp.name || "对手") + (opp.element ? "（" + opp.element + "灵根）" : "");
      if (situation) txt += " · " + (sitMap[situation] || "");
      sb.textContent = txt;
      $story.appendChild(sb);
      if (situation) {
        const sub = document.createElement("div");
        sub.className = "system-msg fade-in";
        sub.style.cssText = "text-align:center;font-size:12px;";
        sub.textContent = "我方综合评级 " + Math.round(ourRating) + " vs 对手 " + oppStrength +
          (situation === "strong" ? "（检定难度-5）" : situation === "weak" ? "（检定难度+5）" : "");
        $story.appendChild(sub);
      }
      setTimeout(resolve, 250);
    }));
  }
  function renderMatchHeader(idx, total, label) {
    return enqueue(() => new Promise(resolve => {
      const d = document.createElement("div");
      d.className = "divider fade-in";
      d.textContent = (label ? label + " · " : "") + idx + " / " + total;
      $story.appendChild(d);
      setTimeout(resolve, 200);
    }));
  }

  /* ============================================================
     比赛实时计分牌（比分 + 双方威胁值，置顶跟随滚动）
     ============================================================ */
  function showMatchHUD(ms, goalsFor, goalsAgainst) {
    hideMatchHUD();
    $matchHUD = document.createElement("div");
    $matchHUD.className = "match-hud fade-in";
    $story.insertBefore($matchHUD, $story.firstChild);
    updateMatchHUD(ms, goalsFor, goalsAgainst);
  }

  function updateMatchHUD(ms, goalsFor, goalsAgainst) {
    if (!$matchHUD) return;
    const MAX = 6; // 威胁条显示上限
    const bar = (v, opp) => '<span class="hud-bar"><span class="hud-fill' + (opp ? ' opp' : '') +
      '" style="width:' + Math.min(100, Math.round(v / MAX * 100)) + '%"></span></span>';
    $matchHUD.innerHTML =
      '<div class="hud-score">我方 ' + goalsFor + ' : ' + goalsAgainst + ' ' + (ms.opponentName || "对手") + '</div>' +
      '<div class="hud-row"><span class="hud-label">我威胁 ' + ms.threat + '</span>' + bar(ms.threat, false) + '</div>' +
      '<div class="hud-row"><span class="hud-label">敌威胁 ' + ms.oppThreat + '</span>' + bar(ms.oppThreat, true) + '</div>';
  }

  function hideMatchHUD() {
    if ($matchHUD) { $matchHUD.remove(); $matchHUD = null; }
  }
  function renderMatchResult(branch, ms, goalsFor, goalsAgainst, rating, reward, resultRep) {
    return enqueue(() => new Promise(resolve => {
      const sb = document.createElement("div");
      sb.className = "scoreboard fade-in";
      const map = { bigwin: "大胜", win: "小胜", draw: "平局", lose: "失利" };
      sb.textContent = map[branch] + " · " + goalsFor + " : " + goalsAgainst;
      $story.appendChild(sb);
      // 声望拆解：胜负结果 + 评级奖励 = 净变化（避免玩家误读“赢了却扣分”）
      const signed = n => (n >= 0 ? "+" : "") + n;
      const rRep = resultRep || 0;
      const netRep = rRep + (reward.reputation || 0);
      const rt = document.createElement("div");
      rt.className = "system-msg fade-in";
      rt.style.cssText = "text-align:center;";
      rt.textContent = "本场评级 " + rating + " · 自由属性点+" + reward.points +
        " · 声望 " + signed(rRep) + "(胜负)" + signed(reward.reputation) + "(评级)=合计" + signed(netRep);
      $story.appendChild(rt);
      // 表现明细（设计稿第五章：你的表现：X进球 / Y助攻 / 关键选择成功Z/W）
      const detail = document.createElement("div");
      detail.className = "system-msg fade-in";
      detail.style.cssText = "text-align:center;font-size:12px;color:var(--text-dim);";
      detail.textContent = "你的表现：" + ms.goals + "进球 / " + ms.assists + "助攻 / 关键选择成功" +
        ms.keySuccess + "/" + ms.keyAttempts + (rating === "D" ? " · 心魔值+12" : "");
      $story.appendChild(detail);
      setTimeout(resolve, 300);
    }));
  }

  /* ============================================================
     自由属性点分配面板（比赛评级奖励，1点=1属性无倍率）
     ============================================================ */
  function showFreePointsPanel() {
    return new Promise(resolve => {
      const st = global.State.current;
      const ov = document.getElementById("overlay");
      ov.innerHTML = "";
      const panel = document.createElement("div");
      panel.className = "overlay-panel train-panel";

      const title = document.createElement("div");
      title.className = "overlay-title";
      title.textContent = "自由属性点分配";
      panel.appendChild(title);

      const pts = document.createElement("div");
      pts.className = "train-pts";
      pts.textContent = "剩余自由点：" + st.freePoints;
      panel.appendChild(pts);

      const tip = document.createElement("div");
      tip.style.cssText = "font-size:13px;color:var(--text-dim);text-align:center;margin-bottom:10px;";
      tip.textContent = "比赛评级奖励。1点=1属性（无倍率），可留到以后再分配。";
      panel.appendChild(tip);

      const grid = document.createElement("div");
      grid.className = "attrs-grid";
      CONFIG.elementOrder.forEach(el => {
        const g = document.createElement("div");
        g.className = "element-group " + el;
        const h = document.createElement("h4");
        h.textContent = el + "行";
        g.appendChild(h);
        CONFIG.attrs[el].forEach(a => {
          const row = document.createElement("div");
          row.className = "attr-row";
          const nm = document.createElement("span");
          nm.className = "attr-name";
          nm.textContent = CONFIG.attrNames[a];
          const val = document.createElement("span");
          val.className = "attr-val";
          val.textContent = Math.floor(st.attrs[a]);
          row.appendChild(nm); row.appendChild(val);
          row.addEventListener("click", () => {
            if (st.freePoints <= 0) { toast("自由点已用完"); return; }
            st.attrs[a] = Math.min(CONFIG.attrMax || 100, st.attrs[a] + 1);
            st.freePoints -= 1;
            val.textContent = Math.floor(st.attrs[a]);
            pts.textContent = "剩余自由点：" + st.freePoints;
            updateStatus();
          });
          g.appendChild(row);
        });
        grid.appendChild(g);
      });
      panel.appendChild(grid);

      const done = document.createElement("button");
      done.className = "train-done";
      done.textContent = "分配完成";
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

    // 达成条件
    if (ev.condition) {
      const cond = document.createElement("div");
      cond.className = "ending-condition";
      cond.textContent = ev.condition;
      panel.appendChild(cond);
    }

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
      c.addEventListener("click", () => { if (c.disabled) return; c.disabled = true; n.disabled = true; global.Engine.continueGame(); });
      $choice.appendChild(c);
      const n = document.createElement("button");
      n.className = "choice-btn fade-in"; n.textContent = "开新的一局";
      n.addEventListener("click", () => { if (n.disabled) return; n.disabled = true; c.disabled = true; showDifficultyPanel(); });
      $choice.appendChild(n);
    } else {
      showDifficultyPanel();
    }
  }

  /* ============================================================
     开局难度选择（问题5：灵根觉醒之前选择难度）
     困难=全属性5 / 普通=全属性8 / 简单=全属性12
     ============================================================ */
  function showDifficultyPanel() {
    clearChoices();
    const tip = document.createElement("div");
    tip.className = "fade-in";
    tip.style.cssText = "color:var(--gold);font-size:13px;text-align:center;margin-bottom:8px;";
    tip.textContent = "── 选择开局难度 ──";
    $choice.appendChild(tip);

    const defs = [
      { key: "hard",   label: "困难（全属性初始 5）",  desc: "天将降大任，苦其心志。成长慢、检定难，适合老手。" },
      { key: "normal", label: "普通（全属性初始 8）",  desc: "不偏不倚，稳步前行。标准体验。" },
      { key: "easy",   label: "简单（全属性初始 12）", desc: "天赋异禀，一路坦途。适合专注看剧情。" }
    ];
    const frag = document.createDocumentFragment();
    const btns = [];
    defs.forEach(d => {
      const btn = document.createElement("button");
      btn.className = "choice-btn fade-in";
      const label = document.createElement("span");
      label.textContent = d.label;
      btn.appendChild(label);
      const sub = document.createElement("span");
      sub.className = "check-tag";
      sub.textContent = d.desc;
      btn.appendChild(sub);
      btn.addEventListener("click", () => {
        if (btn.disabled) return;
        btns.forEach(b => { b.disabled = true; });
        btn.classList.add("picked");
        global.Engine.startNew(d.key);
      });
      btns.push(btn);
      frag.appendChild(btn);
    });
    $choice.appendChild(frag);
  }

  /* ============================================================
     玩法说明面板（纯前端 HTML，兼容 file:// 协议）
     ============================================================ */
  function showHelpPanel() {
    const ov = document.getElementById("overlay");
    ov.innerHTML = "";
    const panel = document.createElement("div");
    panel.className = "overlay-panel";

    const title = document.createElement("div");
    title.className = "overlay-title";
    title.textContent = "玩法说明";
    panel.appendChild(title);

    const content = document.createElement("div");
    content.className = "help-content";
    content.innerHTML = HELP_HTML;
    panel.appendChild(content);

    const close = document.createElement("button");
    close.className = "close-btn";
    close.textContent = "关闭";
    close.addEventListener("click", () => ov.classList.remove("show"));
    panel.appendChild(close);

    ov.appendChild(panel);
    ov.classList.add("show");
  }

  const HELP_HTML = `
<h3>一、游戏基本流程</h3>
<p>这是一款<b>修仙×足球</b>的文字养成游戏。你将扮演一个矿坑边长大的少年，从蹴鞠庙觉醒灵根开始，经历青训、职业、留洋，一步步走向世界之巅。</p>
<ul>
<li><b>章节推进</b>：共十八章，从14岁觉醒到22岁终章，覆盖青训、职业、留洋、世青赛、巅峰谢幕全生涯。读完剧情后面临各种选择，影响属性、声望和后续走向。</li>
<li><b>选项分支</b>：部分选项带有“检定”——根据属性判断成功/失败。偶尔触发“灵光一闪”（暴击），获得超额回报。</li>
<li><b>修炼加点</b>：每章有修炼环节，把修炼点分配到任意属性。灵根亲和属性成长更快。</li>
</ul>

<h3>二、灵根系统</h3>
<p>开局按下测灵石，随机觉醒灵根。品质影响修炼速度：</p>
<table><tr><th>品质</th><th>倍率</th><th>概率</th></tr>
<tr><td>天品（单灵根）</td><td>×2.5</td><td>15%</td></tr>
<tr><td>双灵根</td><td>×2</td><td>80%</td></tr>
<tr><td>全灵根（五行全亲和）</td><td>×1.5</td><td>5%</td></tr></table>
<p>觉醒后不满意可重新觉醒，<b>共3次机会</b>（含首次）。三次后锁定。</p>
<p><b>灵根锁</b>：非亲和属性有上限（天品55/双灵根65），全灵根无锁（五行全亲和）。前期天品碾压，后期全灵根反超。</p>

<h3>三、属性与修炼</h3>
<h4>五行属性（20项）</h4>
<ul>
<li><b>金</b>（防守）：铲断、拦截、对抗、硬度</li>
<li><b>木</b>（突破）：盘带、速度、耐力、柔韧</li>
<li><b>水</b>（组织）：传球、视野、球商、节奏</li>
<li><b>火</b>（进攻）：射门、爆发、力量、决断</li>
<li><b>土</b>（定位）：站位、头球、平衡、抗压</li>
</ul>
<h4>修炼点</h4>
<ul>
<li>每回合获得 <b>4点修炼点</b>，自由分配。</li>
<li>亲和属性：完整倍率加成。非亲和：80%效率，且受灵根锁上限约束。</li>
<li>检定成功后，所用属性额外成长（成功+1，暴击+2，再乘灵根倍率）。</li>
</ul>
<h4>五行共鸣（后期核心）</h4>
<ul>
<li>≥8属性达通脉(45+)：检定<b>+4%</b>（五行初通）</li>
<li>≥16属性达通脉(45+)：检定<b>+8%</b>（五行流转）</li>
<li>≥12属性达化域(70+)：检定<b>+12%</b>（五行归一）</li>
<li>≥8属性达天人合一(90+)：检定<b>+15%</b>（天人合道，仅全灵根）</li>
</ul>
<h4>境界</h4>
<table><tr><th>境界</th><th>属性要求</th></tr>
<tr><td>感气</td><td>0~19</td></tr>
<tr><td>凝形</td><td>20~44</td></tr>
<tr><td>通脉</td><td>45~69</td></tr>
<tr><td>化域</td><td>70~89</td></tr>
<tr><td>天人合一</td><td>90~100</td></tr></table>
<p>通脉是多数好结局的门槛，天人合一一通往最高结局。</p>

<h3>四、比赛规则</h3>
<p>比赛采用 <b>6节点制</b>：</p>
<ul>
<li><b>你的回合</b>（2次）：从位置事件池抽取，选择行动。</li>
<li><b>队友回合</b>（2次）：队友自动行动。</li>
<li><b>关键时刻</b>（2次）：高压力、高回报。</li>
</ul>
<h4>行动结果</h4>
<ul>
<li><b>成功</b>：积累威胁值，推进比分。</li>
<li><b>失败</b>：对手获得威胁值，消耗体力。</li>
<li><b>灵光一闪</b>：超额成功，威胁值额外+1，属性成长翻倍。</li>
</ul>
<h4>局面系统</h4>
<ul>
<li>优势局：检定更容易，对手起始威胁为0。</li>
<li>均势局：正常难度。</li>
<li>劣势局：检定更难，对手起始有威胁值。</li>
</ul>
<h4>赛后评级</h4>
<table><tr><th>评级</th><th>条件</th><th>奖励</th></tr>
<tr><td>S</td><td>进球+助攻≥2 且关键全成</td><td>3自由点+15声望</td></tr>
<tr><td>A</td><td>有进球/助攻 且成功率>70%</td><td>2自由点+10声望</td></tr>
<tr><td>B</td><td>成功率≥45%</td><td>1自由点+5声望</td></tr>
<tr><td>C</td><td>成功率≥25%</td><td>1自由点+1声望</td></tr>
<tr><td>D</td><td>成功率<25%</td><td>-3声望，心魔+8</td></tr></table>

<h3>五、羁绊系统</h3>
<p>与特定角色建立羁绊，通过比赛和剧情积累进度，达到阈值后自动解锁：</p>
<ul>
<li><b>金兰之交</b>（范志贵）：检定+5%</li>
<li><b>既生瑜何生亮</b>（武石）：与武石交锋时+10%</li>
<li><b>水火不容</b>（布澜门将）：对水灵根+10%</li>
<li><b>风火连城</b>（内牛尔）：比赛检定+8%</li>
<li><b>心有灵犀</b>（苏雯）：比赛检定+8%</li>
</ul>

<h3>六、心魔值与结局</h3>
<ul>
<li>心魔值来源：D评级(+12)、输球(+4)、平局(+2)、关键时刻失败(+2)、负面拉择。</li>
<li>梯度惩罚：心魔≥15检定−3%，≥30检定−6%，≥45检定−10%。</li>
<li>消解方式：每回合自然衰减−1，部分剧情选项可额外降低。</li>
<li><b>心魔值≥60 → 强制触发“黯然离场”结局！</b></li>
</ul>
<h3>七、体力系统</h3>
<ul>
<li>检定失败消耗体力3-6点，每回合自动恢复+10。</li>
<li>体力<50：检定−3%；<30：−7%；<10：−12%。</li>
<li><b>体力<10时强制休息一回合</b>（跳过训练，恢复至40）。</li>
<li>恢复手段：回合自动恢复、聚气丹(+30)、队友事件(+5)。</li>
</ul>
<p>游戏共<b>10种结局</b>，由心魔值、境界、声望、关键拉择综合判定。包括：球圣封神、天罡之星、功勋队长、浪子回头、教练之路、传奇复出、新星升起、蛰伏待时、江湖再见、黯然离场。</p>

<h3>八、难度选择</h3>
<table><tr><th>难度</th><th>初始属性</th><th>适合</th></tr>
<tr><td>困难</td><td>全属性 5</td><td>老手，硬核体验</td></tr>
<tr><td>普通</td><td>全属性 8</td><td>标准体验</td></tr>
<tr><td>简单</td><td>全属性 12</td><td>专注看剧情</td></tr></table>
<p>难度只影响开局起点，不影响成长速度和后期上限。</p>

<h3>小贴士</h3>
<div class="tip">
• 修炼点优先加位置核心属性（前锋→射门/爆发，中场→传球/视野，后卫→铲断/站位）<br>
• 保守选项难度低收益小，激进选项难度高但可能直接进球<br>
• 灵根相克：被对手克制时检定-10%，考虑选更稳妥的行动<br>
• 尽量保持B级以上评级，自由点是重要属性来源<br>
• 存档自动进行，关闭页面后重新打开可继续
</div>
`;

  global.UI = {
    bindConfig, init, updateStatus,
    renderTextBlock, renderDivider, renderChoices, waitContinue, showCheckResult,
    showStatusPanel, showTrainPanel,
    renderMatchIntro, renderMatchHeader, renderMatchResult, showFreePointsPanel,
    showMatchHUD, updateMatchHUD, hideMatchHUD,
    showEnding, toast
  };
})(window);
