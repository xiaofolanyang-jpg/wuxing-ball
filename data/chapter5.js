/* data/chapter5.js — 第五章《学院大比·征战》（设计稿第六章·16岁下半年）
 * 事件链：大比开幕 → 小组赛×2 → 1/4决赛 → 半决赛(宿敌赵凛) → 决赛前夜 → 决赛(BOSS) → MVP结算 → 合同抉择 → 章末
 * 说明：5v5团队赛，个人影响力极大。选人结果影响难度，羁绊密集推进。
 *       半决赛触发"既生瑜何生亮"(赵凛)；决赛以弱打强。大比排名决定声望。
 */
window.CHAPTER5 = { events: [

  // 开场：大比开幕
  {
    id: "ch5_opening",
    chapter: 5,
    text: [
      "帝都，天罡竞技场。三十二支队伍列阵于绿茵之上，旌旗猎猎，人声鼎沸。",
      "开幕式上，主持人高声宣布：「学院大比，五人制，单败淘汰与小组循环结合。胜者，将获得直通职业青训的门票！」",
      "你望向对面——赵凛站在另一支队伍的阵前，目光穿过人群，与你遥遥相撞。他比了个口型：「决赛见。」"
    ],
    system: "【第五章·学院大比·征战 开启。5v5团队赛，每一场都是生死战。】\n【大比排名：冠军声望+30，四强+15，小组出局+5。】",
    next: "ch5_group1"
  },

  // 小组赛第1场（以强打弱）
  {
    id: "ch5_group1",
    chapter: 5,
    type: "match",
    text: "小组赛首轮。对手是一支来自边陲的学院队，实力平平。孙先生提醒：「大比无弱旅，别轻敌。」",
    opponent: { name: "南疆学院", element: "木", strength: 40 },
    fallback_choices: [
      { id: "A", sit: "attack", text: "开场抢攻，闪电破门", check: { attrs: ["shooting", "burst"], difficulty: 38, tag: "射门+爆发" },
        success: { text: "开场三分钟，你{elementAdj}地一脚冷射破门，先声夺人！", effects: { reputation: 9, goals: 1, attrs: { shooting: 1 } } },
        fail: { text: "操之过急，射门偏出。", effects: { stamina: -4 } },
        critical: { text: "【灵光一闪】开场闪击！解说：「这脚，快如闪电！」", effects: { reputation: 15, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "传控渗透，撕开防线", check: { attrs: ["passing", "vision"], difficulty: 36, tag: "传球+视野" },
        success: { text: "你与苏晚连续传递，撕开防线，助攻队友破门！", effects: { reputation: 7, assists: 1, bonds: { suwan: 8 }, attrs: { passing: 1 } } },
        fail: { text: "渗透被断，对手打起反击。", effects: { stamina: -4 } }
      },
      { id: "C", sit: "defense", text: "稳扎稳打，控制节奏", check: { attrs: ["rhythm", "positioning"], difficulty: 30, tag: "节奏+站位" },
        success: { text: "你把节奏牢牢握在脚下，对手全场疲于奔命。", effects: { reputation: 5, attrs: { rhythm: 1 } } },
        fail: { text: "节奏被对手冲乱。", effects: { stamina: -4 } }
      }
    ],
    result: {
      bigwin: { text: "小组赛首战大胜！看台上，已有球探开始记录你的名字。", effects: { reputation: 8 } },
      win:     { text: "小胜。大比首战，有惊无险。", effects: { reputation: 5 } },
      draw:    { text: "爆冷战平。孙先生脸色凝重：「我说过，大比无弱旅。」", effects: { reputation: 1 } },
      lose:    { text: "首战告负，出线形势陡然严峻。", effects: { reputation: -4, stamina: -5, demonValue: 4 } }
    },
    next: "ch5_group2"
  },

  // 小组赛第2场·出线关键战（势均力敌，关键时刻×2）
  {
    id: "ch5_group2",
    chapter: 5,
    type: "match",
    text: "小组赛次轮，出线关键战。对手「东海学院」与你队实力在伯仲之间，阵中一名水灵根门将尤其难缠——正是当年沧澜青训出身的老对手。",
    opponent: { name: "东海学院", element: "水", strength: 48 },
    fallback_choices: [
      { id: "A", sit: "attack", text: "直面门将，大力抽射", check: { attrs: ["shooting", "power"], difficulty: 44, tag: "射门+力量" },
        success: { text: "你{elementAdj}地一脚爆射，皮球应声入网！那门将鞭长莫及。", effects: { reputation: 11, goals: 1, bonds: { canglan: 10 }, attrs: { shooting: 1 } } },
        fail: { text: "门将神勇扑救，将球拒之门外。", effects: { stamina: -5 } },
        critical: { text: "【灵光一闪】你一脚石破天惊的远射，洞穿十指关！旧怨今日得偿。", effects: { reputation: 18, goals: 1, bonds: { canglan: 15 }, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "调动门将，巧射远角", check: { attrs: ["shooting", "iq"], difficulty: 40, tag: "射门+球商" },
        success: { text: "你佯装传中，突然搓射远角，门将扑救不及！", effects: { reputation: 9, goals: 1, attrs: { shooting: 1 } } },
        fail: { text: "搓射角度太正，被门将没收。", effects: { stamina: -4 } }
      },
      { id: "C", sit: "defense", text: "先冻结对方核心，再图进取", check: { attrs: ["tackle", "iq"], difficulty: 38, tag: "铲断+球商" },
        success: { text: "你全场冻结对方核心，东海学院进攻哑火。", effects: { reputation: 7, attrs: { tackle: 1 } } },
        fail: { text: "对方核心一个变向，制造杀机。", effects: { stamina: -5 } }
      }
    ],
    result: {
      bigwin: { text: "关键战大胜！你队提前锁定出线名额。", effects: { reputation: 10, flags: { keySuccess: true } } },
      win:     { text: "险胜出线！终场哨响，全队相拥。", effects: { reputation: 7 } },
      draw:    { text: "战平，凭净胜球勉强出线。", effects: { reputation: 3 } },
      lose:    { text: "关键战告负，小组出局。大比之旅戛然而止。", effects: { reputation: -5, stamina: -6, demonValue: 6 } }
    },
    next: "ch5_quarter"
  },

  // 四分之一决赛
  {
    id: "ch5_quarter",
    chapter: 5,
    type: "match",
    text: "八强战。对手「西岭学院」以土灵根铁桶阵著称，防守密不透风。孙先生布置：「用耐心，撕开他们的耐心。」",
    opponent: { name: "西岭学院", element: "土", strength: 50 },
    fallback_choices: [
      { id: "A", sit: "attack", text: "定位球抢点，头槌破僵", check: { attrs: ["heading", "positioning"], difficulty: 42, tag: "头球+站位" },
        success: { text: "角球开出，你旱地拔葱，头槌砸开铁桶阵！", effects: { reputation: 10, goals: 1, attrs: { heading: 1 } } },
        fail: { text: "起跳被干扰，头球顶偏。", effects: { stamina: -4 } },
        critical: { text: "【灵光一闪】泰山压顶！解说：「这就是支点的力量！」", effects: { reputation: 16, goals: 1, attrs: { heading: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "肋部直塞，打穿身后", check: { attrs: ["passing", "vision"], difficulty: 40, tag: "传球+视野" },
        success: { text: "你一记{elementAdj}的直塞打穿身后，林啸高速插上破门！", effects: { reputation: 8, assists: 1, bonds: { linxiao: 8 }, attrs: { passing: 1 } } },
        fail: { text: "直塞被土灵根后卫预判拦截。", effects: { stamina: -4 } }
      },
      { id: "C", sit: "defense", text: "耐心周旋，等对手犯错", check: { attrs: ["rhythm", "pressure"], difficulty: 34, tag: "节奏+抗压" },
        success: { text: "你稳住节奏，对手久攻不下先自乱了阵脚。", effects: { reputation: 5, attrs: { pressure: 1 } } },
        fail: { text: "久攻不下，心态急躁。", effects: { stamina: -4, demonValue: 2 } }
      }
    ],
    result: {
      bigwin: { text: "八强战大胜！四强在望，MVP榜单上你的名字开始攀升。", effects: { reputation: 9 } },
      win:     { text: "小胜晋级四强！更衣室里欢声雷动。", effects: { reputation: 6 } },
      draw:    { text: "战平，加时苦战后点球险胜。", effects: { reputation: 4, stamina: -8 } },
      lose:    { text: "八强战折戟，大比止步。", effects: { reputation: -4, stamina: -6, demonValue: 5 } }
    },
    next: "ch5_semi"
  },

  // 半决赛·宿敌对决（赵凛的队，"既生瑜何生亮"触发）
  {
    id: "ch5_semi",
    chapter: 5,
    type: "match",
    text: [
      "半决赛。球网两侧，你与赵凛再度相对。他率领的「北都书院」一路横扫，气势正盛。",
      "「从青训到省赛，再到大比。」赵凛活动着手腕，水灵力在他周身流转，「你我之间，该有个了断了。」",
      "解说席上有人感叹：「既生瑜，何生亮。这一代最好的两个天才，偏偏生在了同一时代。」"
    ],
    opponent: { name: "北都书院·赵凛", element: "水", strength: 54 },
    fallback_choices: [
      { id: "A", sit: "attack", text: "正面硬撼，用最强一击回应", check: { attrs: ["shooting", "resolve"], difficulty: 46, tag: "射门+决断" },
        success: { text: "你{elementAdj}地拔脚怒射，皮球轰穿赵凛的封堵！他脸色铁青。", effects: { reputation: 13, goals: 1, bonds: { zhaolin: 15 }, attrs: { shooting: 1 } } },
        fail: { text: "赵凛预判精准，将你的射门封堵。", effects: { stamina: -6 } },
        critical: { text: "【灵光一闪】你在赵凛面前轰入世界波！全场起立，宿敌之战，你占得先机！", effects: { reputation: 22, goals: 1, bonds: { zhaolin: 20 }, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "牵制赵凛，为队友做嫁衣", check: { attrs: ["passing", "iq"], difficulty: 42, tag: "传球+球商" },
        success: { text: "你吸引赵凛包夹，分球给无人盯防的队友破门！", effects: { reputation: 9, assists: 1, bonds: { zhaolin: 10 }, attrs: { passing: 1 } } },
        fail: { text: "赵凛看穿你的意图，提前卡断。", effects: { stamina: -5 } }
      },
      { id: "C", sit: "defense", text: "贴身缠斗，冻结赵凛", check: { attrs: ["tackle", "strength"], difficulty: 44, tag: "铲断+对抗" },
        success: { text: "你全场贴身缠斗，赵凛一筹莫展，怒火中烧却无可奈何。", effects: { reputation: 8, bonds: { zhaolin: 10 }, attrs: { tackle: 1 } } },
        fail: { text: "赵凛一个变向晃开你，制造杀机。", effects: { stamina: -6 } }
      }
    ],
    result: {
      bigwin: { text: "大胜赵凛，挺进决赛！他盯着你，一字一句：「决赛，或者下一次，我不会再输。」", effects: { reputation: 14, bonds: { zhaolin: 15 }, flags: { keySuccess: true } } },
      win:     { text: "险胜宿敌！终场哨响，赵凛一言不发地离场，背影写满不甘。", effects: { reputation: 10, bonds: { zhaolin: 10 } } },
      draw:    { text: "鏖战成和，点球惜败。赵凛冷笑：「你还是赢不了我。」", effects: { reputation: 3, demonValue: 4 } },
      lose:    { text: "你输给了赵凛。他走过你身边：「决赛的门票，我收下了。」", effects: { reputation: -6, stamina: -6, demonValue: 6 } }
    },
    next: "ch5_final_eve"
  },

  // 决赛前夜·队友夜谈（羁绊大推进）
  {
    id: "ch5_final_eve",
    chapter: 5,
    text: [
      "决赛前夜，天台。五个少年席地而坐，望着帝都的万家灯火。",
      "林啸难得地开口：「以前我觉得，踢球是一个人的事。」阿贵接话：「现在呢？」林啸瞥你一眼：「……现在，是五个人的。」",
      "苏晚轻声说：「明天，无论输赢，我们都踢出了自己的球。」夜风拂过，五颗年轻的心，从未如此贴近。"
    ],
    system: "【羁绊大推进：与全体队友的羁绊进度+10。】",
    choices: [
      { id: "A", text: "举杯：「明天，我们一起把冠军带回去！」", effects: { bonds: { linxiao: 10, suwan: 10, agui: 10 }, reputation: 3, attrs: { resolve: 1 } }, next: "ch5_final" },
      { id: "B", text: "沉默望向远方，把决心藏进眼底", effects: { bonds: { linxiao: 10, suwan: 10, agui: 10 }, attrs: { pressure: 1 }, demonValue: -2 }, next: "ch5_final" }
    ]
  },

  // 决赛（BOSS战，以弱打强）
  {
    id: "ch5_final",
    chapter: 5,
    type: "match",
    text: "决赛。对手「金阙皇朝」是卫冕冠军，全员凝形境以上，实力碾压。赛前无人看好你们。孙先生却笑了：「光脚的不怕穿鞋的。去，把他们的王座，掀翻。」",
    opponent: { name: "金阙皇朝", element: "金", strength: 60 },
    fallback_choices: [
      { id: "A", sit: "attack", text: "反击中单骑闯关", check: { attrs: ["dribble", "burst"], difficulty: 48, tag: "盘带+爆发" },
        success: { text: "你{elementAdj}地连过两人，禁区内冷静推射！以弱胜强的号角，由你吹响！", effects: { reputation: 14, goals: 1, attrs: { dribble: 1 } } },
        fail: { text: "金阙的链式防守将你绞杀。", effects: { stamina: -6 } },
        critical: { text: "【灵光一闪】单骑闯关，撕碎整条冠军防线！解说疯狂：「奇迹！这是奇迹的前奏！」", effects: { reputation: 24, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "团队配合，层层渗透", check: { attrs: ["passing", "vision"], difficulty: 44, tag: "传球+视野" },
        success: { text: "你们五人行云流水般的传递，撕开冠军防线，队友破门！", effects: { reputation: 10, assists: 1, bonds: { suwan: 8 }, attrs: { passing: 1 } } },
        fail: { text: "渗透被金阙的铁腰拦截。", effects: { stamina: -5 } }
      },
      { id: "C", sit: "defense", text: "铁血防守，拖入点球", check: { attrs: ["tackle", "pressure"], difficulty: 40, tag: "铲断+抗压" },
        success: { text: "你与队友筑起血肉长城，冠军的狂攻颗粒无收！", effects: { reputation: 8, attrs: { pressure: 1 } } },
        fail: { text: "防线被冠军的持续施压凿穿。", effects: { stamina: -6 } }
      }
    ],
    result: {
      bigwin: { text: "掀翻卫冕冠军，夺得学院大比冠军！你们五个人的名字，一夜之间传遍全国！", effects: { reputation: 30, flags: { keySuccess: true, dabiChamp: true } } },
      win:     { text: "绝杀冠军！你们捧起大比奖杯，泪水与汗水一同落下。", effects: { reputation: 25, flags: { dabiChamp: true } } },
      draw:    { text: "鏖战至点球，惜败摘银。虽败犹荣，四强之名已足够响亮。", effects: { reputation: 15 } },
      lose:    { text: "决赛告负，屈居亚军。但你们以弱旅之姿杀进决赛，虽败犹荣。", effects: { reputation: 12, stamina: -6 } }
    },
    next: "ch5_mvp"
  },

  // MVP结算 + 合同抉择
  {
    id: "ch5_mvp",
    chapter: 5,
    text: [
      "大比落幕，MVP评选揭晓。无论奖杯归属，你的名字都出现在了最佳阵容的候选名单上——这是对你整届表现的最佳注脚。",
      "赛后，职业球探蜂拥而至。三份青训合同摆在你面前：豪门「金阙FC」的替补席、中游球队「青木联」的核心位、以及家乡球队「青云FC」的主力承诺。",
      "孙先生意味深长：「还有第三条路——下月，传说中的『淬炼营』将开启选拔。36人进，11人出。那里，才是通往天罡联队的独木桥。」"
    ],
    choices: [
      { id: "A", text: "签约豪门金阙FC：哪怕从替补做起", effects: { flags: { contract: "jinqve" }, reputation: 10, spiritStones: 40 }, next: "ch5_end" },
      { id: "B", text: "签约青木联：做一支球队的核心", effects: { flags: { contract: "qingmu" }, reputation: 8, spiritStones: 30 }, next: "ch5_end" },
      { id: "C", text: "暂不签约，等待淬炼营选拔", effects: { flags: { contract: "camp" }, reputation: 5, attrs: { resolve: 2 } }, next: "ch5_end" }
    ]
  },

  // 章末 → 第六章《淬炼营·入营》
  {
    id: "ch5_end",
    chapter: 5,
    text: [
      "大比的硝烟散尽，但你的征途才刚刚开始。",
      "深夜，你收到一封没有署名的请柬，上面只有一行字：「昆仑山腹，淬炼营。强者，来。」",
      "你望向窗外。月光如水，照亮了远方连绵的群山。那里，将是你下一段传奇的起点。"
    ],
    system: "【第五章·学院大比·征战 完。接下来：第六章·淬炼营·入营。】",
    effects: { chapter: 1, age: 1 },
    next: "ch6_opening"
  }

] };
