/* data/chapter8.js — 第八章《天罡联赛·第二季》v3.0 剧本版
 * 主题：第二赛季。战术成型。新队友。冲击冠军。五行大会选拔前哨。
 * 年龄：17-18岁 | 时间跨度：一个赛季 | 事件数：10
 * 事件链：新赛季 → 新队友 → 融入 → 战术 → 传奇再战(match) → 冠军争夺(match) → 结算 → 五行大会消息 → 国主视野 → 国赛(match)
 */
window.CHAPTER8 = { events: [

  // ===== 事件1：新赛季·新面孔 =====
  {
    id: "ch8_opening",
    chapter: 8,
    text: [
      "新赛季。",
      "你不再是「新人」了，你是「核心」。或者至少——你是「之一」。",
      "{companion1Name}站在你旁边。「第二年。」他说。「不一样了。」",
      "「哪不一样？」",
      "「他们怕我们了。」"
    ],
    system: "【第八章·天罡联赛·第二季 开启。从「属于这里」到「统治这里」。】",
    effects: { flags: { season2Start: true } },
    next: "ch8_newmate"
  },

  // ===== 事件2：新队友·融入 =====
  {
    id: "ch8_newmate",
    chapter: 8,
    text: [
      "新来的，很强。但——不合群。",
      "训练的时候，他不传球，自己带，自己射。",
      "{companion1Name}看不下去了。「你他妈——」",
      "你拉住了他。「给他时间。」",
      "「给什么时间？联赛不等人。」",
      "「一周。」你说。「一周之后，他还不传，我亲自跟他说。」"
    ],
    effects: { flags: { newTeammateIntroduced: true } },
    next: "ch8_integrate"
  },

  // ===== 事件3：一周后 =====
  {
    id: "ch8_integrate",
    chapter: 8,
    text: [
      "一周后，训练赛。",
      "新来的拿球，三个人围上来。他带了两步，没空间了。",
      "他抬头，看到了{companion1Name}。",
      "他传了。",
      "{companion1Name}接了，射了，进了。",
      "新来的站在原地，愣了一下，然后——笑了。",
      "「不错。」他说。",
      "「你也是。」{companion1Name}说。"
    ],
    effects: { bonds: { tongpao: 2 }, flags: { newTeammateIntegrated: true } },
    next: "ch8_tactic"
  },

  // ===== 事件4：战术成型 =====
  {
    id: "ch8_tactic",
    chapter: 8,
    text: [
      "教练把你们叫到一起。",
      "「今年。我们打什么？」"
    ],
    choices: [
      { id: "A", text: "传控体系——节奏慢，控制型", effects: { flags: { tactic2: "possession" } }, next: "ch8_legends" },
      { id: "B", text: "快速反击——节奏快，一击致命", effects: { flags: { tactic2: "counter" } }, next: "ch8_legends" },
      { id: "C", text: "高压逼抢——全场压迫", effects: { flags: { tactic2: "press" } }, next: "ch8_legends" },
      { id: "D", text: "双核战术——围绕你和{companion1Name}", effects: { flags: { tactic2: "dualcore" }, bonds: { tongpao: 2 } }, next: "ch8_legends" }
    ]
  },

  // ===== 事件5：第六场·传奇再战（match·三传奇） =====
  {
    id: "ch8_legends",
    chapter: 8,
    type: "match",
    text: [
      "第六场，对面有三个传奇。",
      "三个，化域境。",
      "你站在场中央，看着他们。",
      "「三个。」{companion1Name}说。声音有点干。",
      "「嗯。」",
      "「怕吗？」",
      "你想了想。「不怕。」",
      "「我有点。」",
      "「那就对了。」你说。「怕了才认真。」"
    ],
    opponent: { name: "五院·三传奇", element: "火", strength: 70 },
    teamBase: 38,
    result: {
      bigwin: { text: "你赢了。三个传奇，你赢了。全场起立。你站在场中央，腿在抖。不是怕，是——爽。", effects: { reputation: 18 } },
      win:     { text: "你赢了，{lastScore}。三个传奇，你进了一个。在三个化域境面前，你进了一个。", effects: { reputation: 15 } },
      draw:    { text: "平了，{lastScore}。你进了一个，在三个化域境面前，你进了一个。够了。", effects: { reputation: 12 } },
      lose:    { text: "{lastScore}，输了。但你进了一个，在三个化域境面前，你进了一个。虽败犹荣。", effects: { reputation: 12, goals: 1 } }
    },
    next: "ch8_midseason"
  },

  // ===== 事件5.5：赛季中段·喘息 =====
  {
    id: "ch8_midseason",
    chapter: 8,
    text: [
      "三传奇，你赢了，或者输了。但——你踢了。",
      "消息传开了。「那个新人，能跟传奇对位。」",
      "你走在路上，有人看你，有人指你。",
      "{companion1Name}说。「习惯了。」",
      "「习惯什么？」",
      "「被看。」",
      "你笑了。但你知道，下一场，更重要。"
    ],
    effects: { reputation: 5, demonValue: -2 },
    next: "ch8_title"
  },

  // ===== 事件6：第十场·冠军争夺（match·天王山） =====
  {
    id: "ch8_title",
    chapter: 8,
    type: "match",
    text: [
      "第十场，如果赢了，排名第一。",
      "两万人，全在喊。",
      "你听不见。你只听到自己的心跳，和球碰脚背的声音。"
    ],
    opponent: { name: "天罡·天王山", element: "金", strength: 64 },
    teamBase: 40,
    result: {
      bigwin: { text: "大胜，排名第一。两万人在喊你的名字。你站在场中央，风把汗吹凉了。你笑了。", effects: { reputation: 15, flags: { titleRace: true } } },
      win:     { text: "赢了，{lastScore}，排名第一。{companion1Name}冲过来。「第一！我们是第一！」", effects: { reputation: 12, flags: { titleRace: true } } },
      draw:    { text: "平了，{lastScore}。最后五分钟，你射了，进了。但对面也进了，差一点。", effects: { reputation: 8 } },
      lose:    { text: "输了，{lastScore}。差一点，就差一点。你坐在场边，喘。", effects: { demonValue: 4 } }
    },
    next: "ch8_result_gate"
  },

  // ===== 事件7：赛季末·冠军/亚军（条件分支） =====
  {
    id: "ch8_result_gate",
    chapter: 8,
    text: "十四场结束，赛季结算。",
    choices: [
      { id: "A", when: { flag: "titleRace" }, text: "继续", next: "ch8_champion" },
      { id: "B", when: { notFlag: "titleRace" }, text: "继续", next: "ch8_runner" }
    ]
  },
  {
    id: "ch8_champion",
    chapter: 8,
    text: [
      "哨响，冠军。",
      "{academyName}，天罡联赛冠军。",
      "两万人，全在喊你的名字。",
      "{companion1Name}把你扑倒。「我们！他妈的！冠军！」",
      "你躺在草皮上，看着天，灯很亮。",
      "你笑了。"
    ],
    effects: { reputation: 30, flags: { tiangangChampion: true } },
    next: "ch8_assembly"
  },
  {
    id: "ch8_runner",
    chapter: 8,
    text: [
      "差一点。但——够了。够证明你们属于这里。",
      "不是冠军。但你是天罡的亚军。升班马，第二年，亚军。",
      "{companion1Name}坐在场边。「明年。」他说。「冠军。」"
    ],
    effects: { reputation: 15 },
    next: "ch8_assembly"
  },

  // ===== 事件8：五行大会·选拔消息 =====
  {
    id: "ch8_assembly",
    chapter: 8,
    text: [
      "赛季结束，一封信。",
      "不是给学院的，是给国家的。",
      "「兹通知：本届五行大会将于明年举行。各国国主将于三个月内完成选拔。请符合条件者做好准备。」",
      "五行大会。",
      "四年一次，五大洲，五支国家队。",
      "你看着那封信，手在抖。",
      "{companion1Name}凑过来，看了一眼。",
      "「走。」他说。",
      "「去哪？」",
      "「训练。」"
    ],
    effects: { flags: { assemblyAnnounced: true } },
    next: "ch8_observe"
  },

  // ===== 事件9：国主·视野 =====
  {
    id: "ch8_observe",
    chapter: 8,
    text: [
      "消息传开了。",
      "「国主在看。」所有人都在说。",
      "你的每一场比赛，每一次触球，都可能被看到。",
      "压力，巨大的压力。",
      "但也是——动力。",
      "你开始加练，{companion1Name}也是，所有人都在加练。"
    ],
    effects: { demonValue: 3, coreAttrs: 2, flags: { underObservation: true } },
    next: "ch8_national"
  },

  // ===== 事件10：洲内国赛·入选（match） =====
  {
    id: "ch8_national",
    chapter: 8,
    type: "match",
    text: [
      "洲内国赛，五行大会的预选赛。",
      "你入选了，国赛候选。",
      "第一次穿上国家队的队服。不是学院的，是国家的。",
      "{companion1Name}也入选了。",
      "「一起。」他说。",
      "「一起。」"
    ],
    opponent: { name: "洲内国赛·精英", element: "水", strength: 60 },
    teamBase: 40,
    result: {
      bigwin: { text: "国赛冠军。国主在看台上，他站了起来，鼓了掌。你看到了，他鼓了掌。", effects: { reputation: 18, flags: { nationalCompetitionWin: true } } },
      win:     { text: "赢了，国赛冠军。国主在看台上，他站了起来，鼓了掌。", effects: { reputation: 15, flags: { nationalCompetitionWin: true } } },
      draw:    { text: "平了，加时，点球，赢了。国赛冠军，国主鼓了掌。", effects: { reputation: 12, flags: { nationalCompetitionWin: true } } },
      lose:    { text: "输了。国赛，你坐在场边，喘。国主在看台上，没站起来。没关系，下次。", effects: { reputation: 5, demonValue: 3 } }
    },
    effects: { chapter: 1, age: 1 },
    next: "ch9_opening"
  }

] };
