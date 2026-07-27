/* data/chapter4.js — 第四章《学院大比·组队》（设计稿第五章·16岁上半年）
 * 事件链：大比通知(球探孙先生) → 球探报告 → 邀请林啸 → 邀请苏晚 → 本校选人 → 战术确定 → 队内矛盾 → 集训磨合 → 热身赛 → 章末
 * 说明：承接第三章《省赛》。你首次拥有"选人权"——选谁做队友，决定你的命运。
 *       新增队友羁绊：风火连城(林啸)、心有灵犀(苏晚)。
 */
window.CHAPTER4 = { events: [

  // 开场：球探孙先生递上名片，学院大比通知
  {
    id: "ch4_opening",
    chapter: 4,
    text: [
      "省赛落幕不久，一位西装革履的中年人拦住了你。他递上一张烫金名片——「天罡球探·孙先生」。",
      "「小子，省赛那场球，我看了一整场。」他眼中精光闪动，「下月，全国八大学院精英齐聚『学院大比』。你，拿到入场券了。」",
      "他压低声音：「但大比是五人制团队赛。你一个人再强，也踢不赢五个人。所以——你需要选队友。而选谁，由你定。」"
    ],
    system: "【第四章·学院大比·组队 开启。你第一次拥有『选人权』。】\n【专属机制：选队友——灵根互补/位置搭配/性格匹配，皆影响大比走向。】",
    next: "ch4_scout_report"
  },

  // 球探报告：查看候选球员
  {
    id: "ch4_scout_report",
    chapter: 4,
    text: [
      "孙先生摊开一份厚厚的球探报告，十名候选球员的信息卡一一排开：",
      "「林啸·木灵根双修·边锋·突破型——盘带52 速度48。性格孤傲，放话『不和弱者组队』。」",
      "「苏晚·水灵根·前腰·古典十号——传球55 视野51。大比MVP热门，冷静得像一汪深潭。」",
      "「其余八人，或灵根互补，或位置重叠，或性格难缠……」孙先生敲了敲报告，「记住：本校最多三人，外校至少两人；后卫、中场、前锋，缺一不可。选吧。」"
    ],
    system: "【选人规则：5人阵容，本校≤3、外校≥2，须覆盖后卫+中场+前锋。】",
    next: "ch4_invite_a"
  },

  // 第一邀请：林啸（木灵根边锋，孤傲，需检定）
  {
    id: "ch4_invite_a",
    chapter: 4,
    text: [
      "训练场边，林啸独自颠着球，眼皮都不抬：「我不和弱者组队。证明你配得上我。」",
      "他的木灵力在脚尖流转，球像长在脚上。你知道，这既是拒绝，也是考验。"
    ],
    choices: [
      { id: "A", text: "用实力说话：当场和他比试脚法", check: { attrs: ["dribble", "resolve"], difficulty: 40, tag: "盘带+决断" }, next: "ch4_invite_b",
        success: { text: "你一连三个变向不落下风，林啸终于正眼看你：「有点意思。算我一个。」", effects: { reputation: 6, bonds: { linxiao: 20 }, flags: { linxiaoJoined: true } } },
        fail: { text: "你被他晃得重心尽失。林啸嗤笑转身，但最终留下一句：「看在你敢挑战的份上，勉强加入。」", effects: { reputation: -2, bonds: { linxiao: 10 }, flags: { linxiaoJoined: true } } },
        critical: { text: "【灵光一闪】你一记插花脚过人，林啸愣在原地，随即大笑：「好！就等你这样的！」", effects: { reputation: 12, bonds: { linxiao: 30 }, flags: { linxiaoJoined: true, linxiaoImpressed: true } } }
      },
      { id: "B", text: "晓之以理：团队需要他的速度", check: { attrs: ["iq", "vision"], difficulty: 35, tag: "球商+视野" }, next: "ch4_invite_b",
        success: { text: "你剖析战术利弊，林啸沉吟片刻：「你懂球。行，我加入。」", effects: { reputation: 4, bonds: { linxiao: 15 }, flags: { linxiaoJoined: true } } },
        fail: { text: "林啸不耐烦地摆手：「少废话。」但你没有放弃，三顾茅庐，他终被诚意打动。", effects: { bonds: { linxiao: 10 }, flags: { linxiaoJoined: true } } }
      },
      { id: "C", text: "放弃林啸，另寻他人", effects: { flags: { linxiaoJoined: false }, attrs: { iq: 1 } }, next: "ch4_invite_b" }
    ]
  },

  // 第二邀请：苏晚（水灵根前腰，MVP热门，需检定）
  {
    id: "ch4_invite_b",
    chapter: 4,
    text: [
      "图书馆里，苏晚正在复盘比赛录像。她头也不回：「我的传球，只给跑位聪明的人。你想让我给你做球？先让我看看你的球商。」",
      "她随手抛来一份战术板：「三十秒，告诉我这套防守的破绽在哪。」"
    ],
    choices: [
      { id: "A", text: "凝神细看，指出肋部空当", check: { attrs: ["iq", "vision"], difficulty: 42, tag: "球商+视野" }, next: "ch4_school_picks",
        success: { text: "你精准点出肋部漏洞，苏晚眼中闪过讶异：「……好眼力。合作愉快。」", effects: { reputation: 6, bonds: { suwan: 20 }, flags: { suwanJoined: true } } },
        fail: { text: "你指错了位置。苏晚摇头，但见你态度诚恳，仍点头：「罢了，场上再教你。」", effects: { bonds: { suwan: 10 }, flags: { suwanJoined: true } } },
        critical: { text: "【灵光一闪】你不仅指出破绽，还给出三种破解跑位。苏晚起身：「MVP的对手，原来是你。」", effects: { reputation: 12, bonds: { suwan: 30 }, flags: { suwanJoined: true, suwanImpressed: true } } }
      },
      { id: "B", text: "坦诚相告：破绽我没看出，但我愿意学", effects: { bonds: { suwan: 12 }, flags: { suwanJoined: true }, attrs: { iq: 1 } }, next: "ch4_school_picks" },
      { id: "C", text: "放弃苏晚，另寻他人", effects: { flags: { suwanJoined: false }, attrs: { resolve: 1 } }, next: "ch4_school_picks" }
    ]
  },

  // 本校选人：阿贵/老周（位置冲突处理）
  {
    id: "ch4_school_picks",
    chapter: 4,
    text: [
      "外校两人敲定，还差本校名额。阿贵拍着胸脯：「兄弟，带我一个！我跑不死！」老周则沉稳地整理护腿板：「后腰的位置，我守得稳。」",
      "但名单有限——位置重叠，意味着有人要竞争首发，甚至坐冷板凳。"
    ],
    choices: [
      { id: "A", text: "带上阿贵：他的跑动是反击利器", effects: { bonds: { agui: 15 }, relationships: { agui: 10 }, flags: { aguiInTeam: true } }, next: "ch4_tactics" },
      { id: "B", text: "带上老周：他的拦截是防守保障", effects: { reputation: 3, flags: { laozhouInTeam: true }, attrs: { tackle: 1 } }, next: "ch4_tactics" },
      { id: "C", text: "两个都带：宁可自己多跑，也要兄弟齐心", effects: { bonds: { agui: 10 }, reputation: 2, stamina: -10, flags: { aguiInTeam: true, laozhouInTeam: true } }, next: "ch4_tactics" }
    ]
  },

  // 战术确定：传控/反击/高压
  {
    id: "ch4_tactics",
    chapter: 4,
    text: [
      "五人齐整，孙先生展开战术板：「大比是五人制，节奏快、空间小。一套明确的战术，胜过十次个人英雄。」",
      "「传控，如水银泻地；反击，如疾风掠原；高压，如烈火焚城。你们，选哪一条路？」"
    ],
    choices: [
      { id: "A", text: "传控流转：以水灵根为核，控制节奏", effects: { flags: { tactic: "possession" }, attrs: { passing: 2, rhythm: 1 } }, next: "ch4_conflict" },
      { id: "B", text: "快速反击：以木灵根为刃，一击致命", effects: { flags: { tactic: "counter" }, attrs: { speed: 2, burst: 1 } }, next: "ch4_conflict" },
      { id: "C", text: "高位逼抢：以火灵根为焰，窒息对手", effects: { flags: { tactic: "press" }, attrs: { resolve: 2, strength: 1 } }, next: "ch4_conflict" }
    ]
  },

  // 队内矛盾：性格冲突（调解/无视/换人）
  {
    id: "ch4_conflict",
    chapter: 4,
    text: [
      "集训第三天，矛盾爆发。林啸和队内另一人因一次传球失误当众争执，险些动手。全队气氛降至冰点。",
      "孙先生抱臂旁观，没有插手的意思：「这也是大比的一课。队长，你来处理。」"
    ],
    choices: [
      { id: "A", text: "出面调解：把话说开，各退一步", check: { attrs: ["iq", "pressure"], difficulty: 36, tag: "球商+抗压" }, next: "ch4_train",
        success: { text: "你一番话入情入理，两人握手言和。队伍凝聚力大增。", effects: { reputation: 5, bonds: { linxiao: 8 }, attrs: { pressure: 1 } } },
        fail: { text: "调解收效甚微，但至少没打起来。裂痕仍在。", effects: { reputation: -1 } }
      },
      { id: "B", text: "冷处理：用一场胜利掩盖矛盾", effects: { attrs: { resolve: 1 }, demonValue: 3 }, next: "ch4_train" },
      { id: "C", text: "铁腕换人：把刺头移出名单", effects: { reputation: -3, flags: { linxiaoJoined: false }, bonds: { linxiao: -20 }, attrs: { resolve: 2 } }, next: "ch4_train" }
    ]
  },

  // 集训磨合（修炼）
  {
    id: "ch4_train",
    chapter: 4,
    text: "大比前最后两周，全队封闭集训。战术跑位、灵根配合、攻防转换——你们把每一个细节反复打磨。深夜的球场上，五个人的影子被灯光拉得很长。",
    next: "ch4_warmup"
  },

  // 热身赛（比赛·弱队·检验阵容）
  {
    id: "ch4_warmup",
    chapter: 4,
    type: "match",
    text: "热身赛。对手是一支实力平平的学院队，正是检验阵容与战术的试金石。孙先生站在场边：「输赢其次，我要看你们的配合。」",
    opponent: { name: "青云学院二队", element: "木", strength: 36 },
    fallback_choices: [
      { id: "A", sit: "attack", text: "与林啸连线，反击中高速前插", check: { attrs: ["speed", "burst"], difficulty: 36, tag: "速度+爆发" },
        success: { text: "林啸一记长传，你{elementAdj}地高速插上，单刀破门！", effects: { reputation: 9, goals: 1, bonds: { linxiao: 10 }, attrs: { speed: 1 } } },
        fail: { text: "前插时机稍早，越位在先。", effects: { stamina: -4 } },
        critical: { text: "【灵光一闪】风火连城！两道残影掠过，对手只看到背影。", effects: { reputation: 16, goals: 1, bonds: { linxiao: 15 }, attrs: { speed: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "接苏晚直塞，禁区内终结", check: { attrs: ["shooting", "positioning"], difficulty: 38, tag: "射门+站位" },
        success: { text: "苏晚的传球恰到好处，你心领神会推射入网！", effects: { reputation: 8, goals: 1, bonds: { suwan: 10 }, attrs: { shooting: 1 } } },
        fail: { text: "射门被门将扑出，苏晚的妙传白费了。", effects: { stamina: -4 } }
      },
      { id: "C", sit: "defense", text: "先稳固防守，再图进攻", check: { attrs: ["tackle", "positioning"], difficulty: 30, tag: "铲断+站位" },
        success: { text: "你指挥防线滴水不漏，对手全场颗粒无收。", effects: { reputation: 5, attrs: { positioning: 1 } } },
        fail: { text: "一次走神，被对手偷了一个。", effects: { stamina: -5 } }
      }
    ],
    result: {
      bigwin: { text: "热身赛大胜！配合行云流水，孙先生频频点头：「这套阵容，能走很远。」", effects: { reputation: 8, flags: { keySuccess: true } } },
      win:     { text: "小胜。战术初见成效，但磨合仍有生涩。", effects: { reputation: 5 } },
      draw:    { text: "平局。配合生疏，问题暴露不少。", effects: { reputation: 1 } },
      lose:    { text: "热身赛爆冷告负。更衣室里，气氛凝重。", effects: { reputation: -4, stamina: -5, demonValue: 4 } }
    },
    next: "ch4_end"
  },

  // 章末 → 第五章《学院大比·征战》
  {
    id: "ch4_end",
    chapter: 4,
    text: [
      "热身赛结束，大比的战鼓已经擂响。全国八大学院，三十二支劲旅，齐聚帝都。",
      "更衣室里，五双手叠在一起。孙先生最后叮嘱：「记住，你们五个人的名字，从明天起，将被写进同一页历史。」"
    ],
    system: "【第四章·学院大比·组队 完。接下来：第五章·学院大比·征战。】",
    effects: { chapter: 1, age: 1 },
    next: "ch5_opening"
  }

] };
