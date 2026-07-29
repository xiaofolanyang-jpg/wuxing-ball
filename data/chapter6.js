/* data/chapter6.js — 第六章《宿敌》v3.0 剧本版
 * 主题：宿敌初遇。来自五院的"下凡"球员。第一次感受到"天才"的差距。
 * 年龄：16-17岁 | 时间跨度：数周 | 事件数：10
 * 事件链：消息 → 通道初遇 → 碾压(match) → 更衣室 → 加练 → 再战(match) → 对视 → 通脉 → 收官 → 升级
 */
window.CHAPTER6 = { events: [

  // ===== 事件1：消息 =====
  {
    id: "ch6_opening",
    chapter: 6,
    text: [
      "「听说了吗？五院有人'下凡'了。」",
      "更衣室里。新来的学员说。",
      "「下凡」。这是挑战者联赛的说法。五院的学员，有时候会被「下放」到低级别联赛锻炼。对他们来说是「下凡」。对你们来说——",
      "「谁？」你问。",
      "「沈惊寒。{rivalAcademy}。金灵根。通脉境。」",
      "通脉。你才凝形。差了一个大境界。",
      "{companion1Name}的脸色变了。"
    ],
    system: "【第六章·宿敌 开启。天才的差距，不是努力能弥补的。但至少——你能缩短它。】",
    effects: { flags: { rivalIntroduced: true } },
    next: "ch6_tunnel"
  },

  // ===== 事件2：赛前·通道 =====
  {
    id: "ch6_tunnel",
    chapter: 6,
    text: [
      "比赛前。通道里。",
      "你看到了他。",
      "沈惊寒。比你高。比你壮。站在通道对面。穿着{rivalAcademy}的队服。那队服你只在电视上见过。",
      "他看了你一眼。",
      "只一眼。然后移开了。",
      "像看一个——路人。",
      "{companion1Name}在你旁边。他的手攥紧了。",
      "「别看了。」你说。",
      "「我没看。」他说。「我在记。」"
    ],
    effects: { demonValue: 2, flags: { rivalEncounter: true } },
    next: "ch6_crush"
  },

  // ===== 事件3：比赛·碾压（match·高难度） =====
  {
    id: "ch6_crush",
    chapter: 6,
    type: "match",
    text: [
      "哨响。",
      "沈惊寒从中场开始带球。你迎上去。他变了向。你重心丢了。他过了你。",
      "像过一根木桩。"
    ],
    opponent: { name: "沈惊寒·{rivalAcademy}", element: "金", strength: 52 },
    teamBase: 32,
    result: {
      bigwin: { text: "你赢了。不可能。但你赢了。沈惊寒站在场中央。看着你。第一次。他的眼神里有东西。不是轻蔑。是——意外。", effects: { reputation: 12, flags: { rivalUpset: true } } },
      win:     { text: "你赢了。2-1。沈惊寒进了一个。但你进了两个。哨响的时候。他看了你一眼。这次。不是一眼就移开了。", effects: { reputation: 10, flags: { rivalUpset: true } } },
      draw:    { text: "平了。1-1。沈惊寒进了一个。你也进了一个。不算赢。但你没被碾。", effects: { reputation: 5 } },
      lose:    { text: "0-4。碾压。沈惊寒一个人过了你三次。进了两个。第二个，他从中场开始带球。过了四个人。包括你。你连他的衣角都没碰到。哨响的时候。你站在场中央。腿在抖。不是累的。是恐惧。", effects: { demonValue: 8, reputation: -2, flags: { rivalCrushed: true } } }
    },
    next: "ch6_locker"
  },

  // ===== 事件4：赛后·更衣室 =====
  {
    id: "ch6_locker",
    chapter: 6,
    text: [
      "更衣室。没人说话。",
      "{companion1Name}坐在角落。拳头攥着。指节发白。",
      "「他妈的。」他说。声音很低。「通脉。」",
      "你没说话。",
      "「我们练了两年。」他说。「他妈的。人家十五岁就通脉了。」",
      "「十六。」你说。",
      "「什么？」",
      "「他十六。和我们一样大。」",
      "沉默。",
      "「那更他妈的。」",
      "你站起来。「走。训练。」",
      "「现在？」",
      "「现在。」"
    ],
    effects: { demonValue: 4, flags: { rivalMotivation: true } },
    next: "ch6_grind"
  },

  // ===== 事件5：加练 =====
  {
    id: "ch6_grind",
    chapter: 6,
    text: [
      "从那天起。你变了。",
      "每天多练两个小时。{companion1Name}也是。你们不说话。只是练。",
      "射门。传球。跑位。防守。一遍一遍。",
      "李教习站在场边。看着。没说话。",
      "一个月后。你的属性涨了。不是涨了一点。是涨了一截。",
      "凝形巅峰。快到通脉了。"
    ],
    effects: { coreAttrs: 4, stamina: -10 },
    next: "ch6_rematch"
  },

  // ===== 事件6：第二次相遇（match·差距缩小） =====
  {
    id: "ch6_rematch",
    chapter: 6,
    type: "match",
    text: [
      "联赛后半段。你又遇到了沈惊寒。",
      "这次不一样了。你更快了。更准了。更狠了。",
      "哨响。"
    ],
    opponent: { name: "沈惊寒·再战", element: "金", strength: 46 },
    teamBase: 34,
    result: {
      bigwin: { text: "你赢了。大胜。沈惊寒站在场中央。看着你。这次。他的眼神里有东西。不是轻蔑。是——认真。", effects: { reputation: 10, flags: { rivalGapClosing: true } } },
      win:     { text: "你赢了。2-1。你过了他一次。一次。他愣了。你看到了。他愣了。", effects: { reputation: 8, flags: { rivalGapClosing: true } } },
      draw:    { text: "平了。1-1。你过了他一次。他愣了。你看到了。差距在缩小。", effects: { reputation: 5, flags: { rivalGapClosing: true } } },
      lose:    { text: "输了。1-2。但只输了一个。而且——你过了他一次。一次。他愣了。你看到了。他愣了。", effects: { reputation: 5, flags: { rivalGapClosing: true } } }
    },
    next: "ch6_gaze"
  },

  // ===== 事件7：赛后·对视（宿敌羁绊） =====
  {
    id: "ch6_gaze",
    chapter: 6,
    text: [
      "赛后。通道里。",
      "他又看了你一眼。",
      "这次。不是一眼就移开了。",
      "他看着你。看了三秒。",
      "「你变强了。」他说。声音很平。",
      "「下次。」你说。「我赢你。」",
      "他笑了。不是嘲笑。是——期待。",
      "「我等着。」",
      "他走了。"
    ],
    system: "【宿敌羁绊建立。交锋积累进度。】",
    effects: { bonds: { sudi: 3 }, flags: { rivalBondEstablished: true } },
    next: "ch6_tongmai"
  },

  // ===== 事件8：通脉（境界突破） =====
  {
    id: "ch6_tongmai",
    chapter: 6,
    text: [
      "那天晚上。五行室。",
      "你在修炼。灵力在经脉里冲。比上次凝形时更猛。像洪水。像岩浆。",
      "你咬住牙。",
      "冲。",
      "通了。",
      "通脉。",
      "你睁开眼。五行室里的灵脉碎片在发光。你的灵根在共鸣。",
      "通脉境。洲际球星水平。",
      "你站起来。走出五行室。",
      "外面是夜。月亮很亮。",
      "{companion1Name}坐在门口。他也在发光。",
      "「你也突破了？」你问。",
      "「比你早三天。」他笑。",
      "「……闭嘴。」"
    ],
    system: "【境界突破：凝形 → 通脉。灵力贯通经脉，检定基础大幅提升。】",
    effects: { allAttrsFlat: 3, flags: { realmBreakthrough: "通脉" } },
    next: "ch6_closing"
  },

  // ===== 事件9：赛季·收官 =====
  {
    id: "ch6_closing",
    chapter: 6,
    text: [
      "通脉之后。一切不一样了。",
      "你的检定成功率涨了。你的比赛阅读变了。你能看到以前看不到的东西。",
      "最后五场。四胜一平。",
      "赛季结束。排名第三。",
      "升级附加赛。又来了。"
    ],
    effects: { reputation: 10, matches: 5, wins: 4 },
    next: "ch6_promote"
  },

  // ===== 事件10：升级 =====
  {
    id: "ch6_promote",
    chapter: 6,
    text: [
      "附加赛。这次你赢了。",
      "2-0。{companion1Name}进了一个。你进了一个。",
      "B级。",
      "不。不只是B级。你的声望。你的境界。你的实力。已经不止B级了。",
      "李教习站在场边。他戒了旱烟之后，嘴里叼着一根草。",
      "「明年。」他说。「天罡联赛。」",
      "你看着他。",
      "「不是附加赛。」他说。「是直升。你们的积分。够了。」",
      "天罡联赛。五洲天罡联赛。",
      "五院。传奇球员。",
      "你深吸一口气。",
      "「走。」"
    ],
    effects: { flags: { tiangangPromoted: true }, reputation: 15, academyGrade: "B", chapter: 1, age: 1 },
    next: "ch7_opening"
  }

] };
