/* data/chapter5.js — 第五章《挑战者联赛·首赛季》v3.0 剧本版
 * 主题：正式联赛。学院养成。从"能赢"到"稳定赢"。
 * 年龄：16岁 | 时间跨度：一个赛季（六个月） | 事件数：10
 * 事件链：开幕 → 主场(match) → 客场(match) → 招募 → 连败 → 夜训 → 反弹 → 排名 → 附加赛(match) → 结算
 */
window.CHAPTER5 = { events: [

  // ===== 事件1：赛季开幕 =====
  {
    id: "ch5_opening",
    chapter: 5,
    text: [
      "挑战者联赛。八支队伍。单循环。十四场。",
      "{academyName}。C级。硬地场。五行室。你们不再是最低的了。但也不是最高的。",
      "开幕战。主场。",
      "看台上坐了两百多人。比资格赛时的二十个多了十倍。{companion1Name}站在你旁边。看着看台。",
      "「两百个。」他说。「以后会是两千个。两万个。」",
      "你没说话。但你信。"
    ],
    system: "【第五章·挑战者联赛·首赛季 开启。十四场。从「能赢」到「稳定赢」。】",
    effects: { flags: { season1Start: true } },
    next: "ch5_round1"
  },

  // ===== 事件2：第一轮·主场（比赛·6节点） =====
  {
    id: "ch5_round1",
    chapter: 5,
    type: "match",
    text: [
      "第一轮。主场。对手和你们差不多。C级。",
      "哨响。联赛的节奏。和资格赛不一样。更快。更紧。每一脚球都有人盯着。"
    ],
    opponent: { name: "C级挑战者·首轮", element: "木", strength: 36 },
    teamBase: 32,
    result: {
      bigwin: { text: "大胜。干净。{companion1Name}进了一个。你助攻了一个。看台上两百个人在喊。", effects: { reputation: 5, assists: 1 } },
      win:     { text: "赢了。2-0。干净。{companion1Name}进了一个。你助攻了一个。", effects: { reputation: 3, assists: 1 } },
      draw:    { text: "平了。1-1。主场。不够好。看台上有人提前走了。", effects: { reputation: 1 } },
      lose:    { text: "输了。主场。0-1。看台上安静了。你站在场中央。耳朵里全是自己的心跳。", effects: { demonValue: 3 } }
    },
    next: "ch5_away"
  },

  // ===== 事件3：第三轮·客场（比赛·客场压力） =====
  {
    id: "ch5_away",
    chapter: 5,
    type: "match",
    text: [
      "客场。对方的场地。对方的看台。三百人。全是骂你的。",
      "「滚回去！D级的废物！」",
      "你站在场中央。耳朵里全是噪音。",
      "{companion1Name}凑过来。「别听。」",
      "「我没听。」",
      "「你耳朵红了。」",
      "「……闭嘴。」"
    ],
    opponent: { name: "C级挑战者·客场", element: "水", strength: 38 },
    teamBase: 32,
    result: {
      bigwin: { text: "客场大胜。三百个人安静了。你站在场中央。耳朵不红了。", effects: { reputation: 7, flags: { awayWin: true } } },
      win:     { text: "客场赢了。三百个人骂了九十分钟。但哨响的时候。他们闭嘴了。", effects: { reputation: 5, flags: { awayWin: true } } },
      draw:    { text: "平了。客场。不算差。但骂声跟了你一路。", effects: { reputation: 2 } },
      lose:    { text: "输了。客场。骂声像浪一样。你低着头走进通道。", effects: { demonValue: 3 } }
    },
    next: "ch5_recruit"
  },

  // ===== 事件4：学院养成·招募 =====
  {
    id: "ch5_recruit",
    chapter: 5,
    text: [
      "赛季中段。学院可以招募新学员了。",
      "李教习——现在是「院长」了，虽然他还是坐在那块石头上抽旱烟——给了你两个候选。",
      "一个天赋高，脾气差。一个天赋一般，但极其刻苦。"
    ],
    choices: [
      { id: "A", text: "招天赋型——他来了第一天就和{companion1Name}吵了一架", effects: { flags: { recruitTalent: true }, reputation: 2 }, next: "ch5_slump" },
      { id: "B", text: "招刻苦型——他每天第一个到，最后一个走", effects: { flags: { recruitHardwork: true }, reputation: 2 }, next: "ch5_slump" }
    ]
  },

  // ===== 事件5：第七轮·连败 =====
  {
    id: "ch5_slump",
    chapter: 5,
    text: [
      "第七轮。输了。",
      "第八轮。又输了。",
      "两连败。排名掉到第五。",
      "更衣室里。气氛很差。",
      "「怎么回事？」你问。",
      "没人回答。",
      "{companion1Name}坐在角落。脚踝上缠着冰袋。他最近状态不好。连续三场没进球。",
      "「我没事。」他说。但你看得出来。他有事。"
    ],
    effects: { demonValue: 6, matches: 2 },
    next: "ch5_nighttrain"
  },

  // ===== 事件6：夜训 =====
  {
    id: "ch5_nighttrain",
    chapter: 5,
    text: [
      "你睡不着。去了训练场。",
      "{companion1Name}已经在了。他在射门。一遍一遍。同一个角度。同一个脚法。",
      "「你在干嘛？」",
      "「找感觉。」他没停。「丢了。」",
      "你站在旁边看。看了二十分钟。",
      "「你的支撑脚。」你说。「偏了。两厘米。」",
      "他停了。低头看。「……操。」",
      "他调整了。再射。进了。",
      "「谢了。」他说。",
      "「不客气。」",
      "他又射了五十个。你帮他捡球。"
    ],
    effects: { bonds: { tongpao: 3 }, coreAttrs: 1, demonValue: -3 },
    next: "ch5_rebound"
  },

  // ===== 事件7：第九轮·反弹 =====
  {
    id: "ch5_rebound",
    chapter: 5,
    text: [
      "第九轮。你赢了。3-1。",
      "{companion1Name}进了两个。第二个是凌空抽射。球带着弧线。砸入死角。",
      "他跑向看台。吼了一声。两百个人跟着吼。",
      "你站在中场。笑了。"
    ],
    effects: { reputation: 5, demonValue: -4, matches: 1, wins: 1 },
    next: "ch5_standings"
  },

  // ===== 事件8：赛季末·排名 =====
  {
    id: "ch5_standings",
    chapter: 5,
    text: [
      "十四场结束。",
      "{academyName}。第四名。",
      "不够升级。但够「升级附加赛」。又是附加赛。",
      "「去年也是第四。」李教习说。「今年。不能再输了。」",
      "他看着你。第一次。他的眼神里有期待。"
    ],
    effects: { flags: { promotionPlayoff: true }, reputation: 3 },
    next: "ch5_playoff"
  },

  // ===== 事件9：升级附加赛（比赛·BOSS战） =====
  {
    id: "ch5_playoff",
    chapter: 5,
    type: "match",
    text: [
      "附加赛。对手是B级学院。比你们高一级。",
      "一场。定生死。赢了下赛季升B。输了。再来。",
      "哨响。"
    ],
    opponent: { name: "B级学院·附加赛", element: "金", strength: 44 },
    teamBase: 32,
    result: {
      bigwin: { text: "大胜B级。哨响的时候你跪在地上。升级了。B级。李教习站在场边。旱烟灭了。他没点。", effects: { reputation: 15, flags: { promoted: true } } },
      win:     { text: "赢了。2-1。绝杀。升级了。B级。{companion1Name}冲过来把你扑倒。两百个人在吼。", effects: { reputation: 15, flags: { promoted: true } } },
      draw:    { text: "平了。加时。点球。你站在点球点前。腿在抖。哨响。你射了。进了。但对面也进了。输了点球。", effects: { demonValue: 8, flags: { promotionFailed: true } } },
      lose:    { text: "输了。B级就是B级。你坐在场边。喘。李教习走过来。拍了拍你后脑勺。「明年。」", effects: { demonValue: 8, flags: { promotionFailed: true } } }
    },
    next: "ch5_settle_gate"
  },

  // ===== 事件10：赛季结算（条件分支） =====
  {
    id: "ch5_settle_gate",
    chapter: 5,
    text: "赛季结束。",
    choices: [
      { id: "A", when: { flag: "promoted" }, text: "继续", next: "ch5_settle_win" },
      { id: "B", when: { notFlag: "promoted" }, text: "继续", next: "ch5_settle_lose" }
    ]
  },
  {
    id: "ch5_settle_win",
    chapter: 5,
    text: [
      "「B级。」李教习站在门口。看着新挂上去的牌子。「明年。标准场。五行室升级。」",
      "他顿了顿。「还有。我戒了。」他把旱烟杆扔了。"
    ],
    effects: { academyGrade: "B", chapter: 1 },
    next: "ch6_opening"
  },
  {
    id: "ch5_settle_lose",
    chapter: 5,
    text: [
      "「没事。」李教习说。「再来。」他点了根新的旱烟。「明年。」"
    ],
    effects: { chapter: 1 },
    next: "ch6_opening"
  }

] };
