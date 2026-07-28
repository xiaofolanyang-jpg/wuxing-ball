/* data/chapter4.js — 第四章《学院大比·组队》（设计稿第五章·16岁上半年）
 * 事件链：大比通知(球探孙德斯) → 球探报告 → 邀请内牛尔 → 邀请苏雯 → 本校选人 → 战术确定 → 队内矛盾 → 集训磨合 → 热身赛 → 章末
 * 说明：承接第三章《省赛》。你首次拥有"选人权"——选谁做队友，决定你的命运。
 *       新增队友羁绊：风火连城(内牛尔)、心有灵犀(苏雯)。
 */
window.CHAPTER4 = { events: [

  // 开场：球探孙德斯递上名片，学院大比通知
  {
    id: "ch4_opening",
    chapter: 4,
    text: [
      "省赛结束第三天，你在训练场门口被一个穿灰色西装的中年人拦住了。他皮鞋上沾着草皮碎屑，像是刚从哪块场地过来。名片递过来的时候你闻到他身上有烟味和薄荷糖的气息——「天罡球探·孙德斯」。",
      "「省赛那场球，我看了九十分钟。」他说话不快，眼睛却一直在打量你的腿，「下个月，学院大比。八所学院，全国最好的苗子都去。你拿到票了。」",
      "他剥了颗薄荷糖扔嘴里，压低声音：「但大比是五人制。你一个人踢不过五个人，我干这行二十年了，没见过。所以你得挑队友。挑谁——你说了算。」"
    ],
    system: "【第四章·学院大比·组队 开启。你第一次拥有『选人权』。】\n【专属机制：选队友——灵根互补/位置搭配/性格匹配，皆影响大比走向。】",
    next: "ch4_scout_report"
  },

  // 球探报告：查看候选球员
  {
    id: "ch4_scout_report",
    chapter: 4,
    text: [
      "孙德斯从公文包里抽出一沓纸，边角都卷了，上面密密麻麻全是手写的批注。他把十张球员卡一字排开，手指点了点其中两张：",
      "「内牛尔，木灵根双修，边锋。盘带52，速度48。」他顿了顿，「脾气大，放话说不跟弱者组队。但我看了他三场球，那双脚不会说谎。」",
      "「苏雯，水灵根，前腰。传球55，视野51。大比MVP热门。」孙德斯敲了敲桌面，「这姑娘冷静得不像十六岁，像一潭水，你扔石头进去连个响都听不见。」",
      "「剩下八个，各有各的毛病。」他把报告往你面前一推，「规矩记好了：本校最多三个，外校至少两个，后卫中场前锋都得有。选吧，别磨蹭。」"
    ],
    system: "【选人规则：5人阵容，本校≤3、外校≥2，须覆盖后卫+中场+前锋。】",
    next: "ch4_invite_a"
  },

  // 第一邀请：内牛尔（木灵根边锋，孤傲，需检定）
  {
    id: "ch4_invite_a",
    chapter: 4,
    text: [
      "训练场边，傍晚的光把草皮染成暗金色。内牛尔一个人站在角旗区附近颠球，球像粘在脚背上。你走过去的时候他眼皮都没抬。",
      "「我不跟弱者组队。」他说这话的时候球正好从右脚换到左脚，没停，「你要拉我，先证明你配。」"
    ],
    choices: [
      { id: "A", text: "废话少说，当场比脚法", check: { attrs: ["dribble", "resolve"], difficulty: 34, tag: "盘带+决断" }, next: "ch4_invite_b",
        success: { text: "你接住他拨过来的球，连做三个变向，没丢。内牛尔的球停了。他看了你一眼，是正眼：「有点意思。算我一个。」", effects: { reputation: 6, bonds: { linxiao: 20 }, flags: { linxiaoJoined: true } } },
        fail: { text: "他一个扣球就把你重心晃没了。你摔在草皮上，嘴里全是土腥味。内牛尔嗤了一声，走了两步又回头：「看在你敢上的份上，勉强吧。」", effects: { reputation: -2, bonds: { linxiao: 10 }, flags: { linxiaoJoined: true } } },
        critical: { text: "【灵光一闪】你一记插花脚把球从他裆下穿过去。内牛尔愣了。然后他笑了，是那种真笑：「行。就等你这种。」", effects: { reputation: 12, bonds: { linxiao: 30 }, flags: { linxiaoJoined: true, linxiaoImpressed: true } } }
      },
      { id: "B", text: "不跟他犟，讲道理：队伍需要他的速度", check: { attrs: ["iq", "vision"], difficulty: 29, tag: "球商+视野" }, next: "ch4_invite_b",
        success: { text: "你把战术板上的跑位图给他看，讲了三分钟。内牛尔没打断你，最后说了句：「你懂球。行。」", effects: { reputation: 4, bonds: { linxiao: 15 }, flags: { linxiaoJoined: true } } },
        fail: { text: "内牛尔摆手：「少来这套。」但你第二天又去了，第三天也去了。第四天他把球踢给你：「烦死了。加入。」", effects: { bonds: { linxiao: 10 }, flags: { linxiaoJoined: true } } }
      },
      { id: "C", text: "算了，不勉强，找别人", effects: { flags: { linxiaoJoined: false }, attrs: { iq: 1 } }, next: "ch4_invite_b" }
    ]
  },

  // 第二邀请：苏雯（水灵根前腰，MVP热门，需检定）
  {
    id: "ch4_invite_b",
    chapter: 4,
    text: [
      "图书馆角落，苏雯面前摊着笔记本电脑，屏幕上是比赛录像的暂停画面。她戴着耳机，你敲了敲桌面她才摘下来，表情没什么变化。",
      "「我的球只给跑位聪明的人。」她说话很轻，像在陈述天气，「你想让我做球？先看看这个。」她把战术板推过来，「三十秒，告诉我破绽在哪。」"
    ],
    choices: [
      { id: "A", text: "仔细看，指出肋部空当", check: { attrs: ["iq", "vision"], difficulty: 36, tag: "球商+视野" }, next: "ch4_school_picks",
        success: { text: "你点了点肋部的位置。苏雯看了两秒，把战术板收回去：「眼力不错。合作愉快。」语气跟说「今天天气不错」一样平。", effects: { reputation: 6, bonds: { suwan: 20 }, flags: { suwanJoined: true } } },
        fail: { text: "你指了个位置，她摇头。但你没急着辩解，认真又看了一遍。她观察了你一会儿：「态度行。场上再教你。」", effects: { bonds: { suwan: 10 }, flags: { suwanJoined: true } } },
        critical: { text: "【灵光一闪】你不仅指出破绽，还顺手画了三条跑位线。苏雯把耳机彻底摘了，站起来：「MVP的对手，原来是你。」", effects: { reputation: 12, bonds: { suwan: 30 }, flags: { suwanJoined: true, suwanImpressed: true } } }
      },
      { id: "B", text: "老实说：没看出来，但我愿意学", effects: { bonds: { suwan: 12 }, flags: { suwanJoined: true }, attrs: { iq: 1 } }, next: "ch4_school_picks" },
      { id: "C", text: "不合适，找别人吧", effects: { flags: { suwanJoined: false }, attrs: { resolve: 1 } }, next: "ch4_school_picks" }
    ]
  },

  // 本校选人：范志贵/老周（位置冲突处理）
  {
    id: "ch4_school_picks",
    chapter: 4,
    text: [
      "外校两个人定了，本校还差名额。消息传开之后，阿贵第一个冲过来，嗓门大得隔壁宿舍都能听见：「兄弟！带我！我跑不死！九十分钟全场覆盖那种！」",
      "老周没来，是你去器材室找他的时候碰见的。他正蹲在地上整理护腿板，头也没抬：「后腰的位置，我守得住。」就这一句，不多说。",
      "但名额有限。位置重叠，意味着有人得竞争，有人得坐板凳。"
    ],
    choices: [
      { id: "A", text: "带阿贵，反击的时候需要他那双腿", effects: { bonds: { agui: 15 }, relationships: { agui: 10 }, flags: { aguiInTeam: true } }, next: "ch4_tactics" },
      { id: "B", text: "带老周，后场需要他兜底", effects: { reputation: 3, flags: { laozhouInTeam: true }, attrs: { tackle: 1 } }, next: "ch4_tactics" },
      { id: "C", text: "都带上，我多跑点就是了", effects: { bonds: { agui: 10 }, reputation: 2, stamina: -10, flags: { aguiInTeam: true, laozhouInTeam: true } }, next: "ch4_tactics" }
    ]
  },

  // 战术确定：传控/反击/高压
  {
    id: "ch4_tactics",
    chapter: 4,
    text: [
      "五个人凑齐了。孙德斯把战术板往地上一搁，五个人围着蹲下来，跟路边看人下棋似的。",
      "「五人制，场地小，节奏快，没给你磨蹭的余地。」他拿笔在板上画了个圈，「一套明确的打法，比十次个人英雄管用。我干这行见过太多天才凑一块踢成散沙的。」他看了看你们五个，「传控、反击、高压，选一条路，然后死磕到底。」"
    ],
    choices: [
      { id: "A", text: "传控：把球控在脚下，节奏我们说了算", effects: { flags: { tactic: "possession" }, attrs: { passing: 2, rhythm: 1 } }, next: "ch4_conflict" },
      { id: "B", text: "反击：让出球权，一刀捅死", effects: { flags: { tactic: "counter" }, attrs: { speed: 2, burst: 1 } }, next: "ch4_conflict" },
      { id: "C", text: "高压：从前场就开始抢，让他们喘不上气", effects: { flags: { tactic: "press" }, attrs: { resolve: 2, strength: 1 } }, next: "ch4_conflict" }
    ]
  },

  // 队内矛盾：性格冲突（调解/无视/换人）
  {
    id: "ch4_conflict",
    chapter: 4,
    text: [
      "集训第三天，出事了。一次对抗赛里传球失误，内牛尔当着全队的面把球往地上一摔，对面那人也上来了，两个人鼻子顶着鼻子，范志贵赶紧插到中间。",
      "孙德斯站在场边，手插兜里，没动。等两边都不说话了，他才慢悠悠开口：「这也是大比的一课。」他看向你，「队长，你来。」"
    ],
    choices: [
      { id: "A", text: "把两个人拉开，把话说开", check: { attrs: ["iq", "pressure"], difficulty: 30, tag: "球商+抗压" }, next: "ch4_train",
        success: { text: "你没讲大道理，就说了一句：「你俩吵完了？吵完了继续练。」然后自己先跑回位置。两个人对视一眼，跟上了。", effects: { reputation: 5, bonds: { linxiao: 8 }, attrs: { pressure: 1 } } },
        fail: { text: "你说了几句，两边都给了面子，但眼神还是不对付。至少没打起来。", effects: { reputation: -1 } }
      },
      { id: "B", text: "先不管，赢一场球什么都解决了", effects: { attrs: { resolve: 1 }, demonValue: 3 }, next: "ch4_train" },
      { id: "C", text: "直接换人，刺头不要了", effects: { reputation: -3, flags: { linxiaoJoined: false }, bonds: { linxiao: -20 }, attrs: { resolve: 2 } }, next: "ch4_train" }
    ]
  },

  // 集训磨合（修炼）
  {
    id: "ch4_train",
    chapter: 4,
    text: "大比前最后两周，封闭集训。白天练战术跑位，晚上加练灵根配合，攻防转换来来回回磨了上百遍。到后来不用喊，五个人跑位跟呼吸似的。深夜的球场只剩你们五个，灯光把影子拉得老长，范志贵的喘气声最大，但没人喊停。",
    next: "ch4_warmup"
  },

  // 热身赛（比赛·弱队·检验阵容）
  {
    id: "ch4_warmup",
    chapter: 4,
    type: "match",
    text: "热身赛，对手是青云学院二队，实力一般。孙德斯赛前只说了句：「输赢无所谓，我看配合。」他搬了把折叠椅坐在场边，翘着腿，手里捏着颗薄荷糖。",
    opponent: { name: "青云学院二队", element: "木", strength: 36 },
    fallback_choices: [
      { id: "A", sit: "attack", text: "跟内牛尔连线，反击中高速前插", check: { attrs: ["speed", "burst"], difficulty: 30, tag: "速度+爆发" },
        success: { text: "内牛尔后场一脚长传，你{elementAdj}地插上去，球落地的时候你刚好到。单刀，推远角，进了。", effects: { reputation: 9, goals: 1, bonds: { linxiao: 10 }, attrs: { speed: 1 } } },
        fail: { text: "跑早了半步，边裁举旗。越位。内牛尔摊了摊手。", effects: { stamina: -4 } },
        critical: { text: "【灵光一闪】你和内牛尔同时启动，两道影子从对方后卫身边掠过去，他们连转身都没来得及。", effects: { reputation: 16, goals: 1, bonds: { linxiao: 15 }, attrs: { speed: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "接苏雯的直塞，禁区内终结", check: { attrs: ["shooting", "positioning"], difficulty: 32, tag: "射门+站位" },
        success: { text: "苏雯的球到的时候你刚好跑到位，不用调整，顺势一推。她连头都没抬，好像早就知道你会在那。", effects: { reputation: 8, goals: 1, bonds: { suwan: 10 }, attrs: { shooting: 1 } } },
        fail: { text: "射门被门将扑了。苏雯那脚传球其实给得很好，是你没处理好。", effects: { stamina: -4 } }
      },
      { id: "C", sit: "defense", text: "先把后场站住，不急", check: { attrs: ["tackle", "positioning"], difficulty: 24, tag: "铲断+站位" },
        success: { text: "你指挥防线保持紧凑，对方全场没找到一次舒服的起脚机会。", effects: { reputation: 5, attrs: { positioning: 1 } } },
        fail: { text: "走神了一下，对方偷了个身后。好在只是热身赛。", effects: { stamina: -5 } }
      }
    ],
    result: {
      bigwin: { text: "大胜。孙德斯从折叠椅上站起来，把薄荷糖棍扔了：「这套阵容，能走远。」他说这话的时候语气跟报天气预报似的。", effects: { reputation: 8, flags: { keySuccess: true } } },
      win:     { text: "小胜。配合有了雏形，但几个衔接点还是生涩。", effects: { reputation: 5 } },
      draw:    { text: "平局。问题暴露不少，跑位重叠、传球时机对不上。回去还得练。", effects: { reputation: 1 } },
      lose:    { text: "热身赛输了。更衣室里没人说话，只有拧毛巾和喝水的声音。", effects: { reputation: -4, stamina: -5, demonValue: 4 } }
    },
    next: "ch4_end"
  },

  // 章末 → 第五章《学院大比·征战》
  {
    id: "ch4_end",
    chapter: 4,
    text: [
      "热身赛打完，大比就在下周了。帝都，三十二支队，全国八所学院。",
      "更衣室里，五个人站成一圈。不知道谁先伸的手，然后五双手叠在一起。掌心都是汗。孙德斯靠在门框上，最后说了句：「从明天起，你们五个人的名字写在一块了。」然后他转身走了，皮鞋踩在水泥地上咔咔响。"
    ],
    system: "【第四章·学院大比·组队 完。接下来：第五章·学院大比·征战。】",
    effects: { chapter: 1, age: 1 },
    next: "ch5_opening"
  }

] };
