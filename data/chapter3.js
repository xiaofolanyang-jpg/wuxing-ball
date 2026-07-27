/* data/chapter3.js — 第三章《省赛》职业生涯·省级锦标赛篇（18-19岁）
 * 事件链：开赛通知 → 小组赛首战 → 赛前集训 → 宿敌对决(赵凛) → 队长袖标 → 决赛 → 假期抉择 → 结局分发
 * 说明：承接第二章《崭露》的职业线，对应设计稿第四章"市联赛·下/省赛"的浓缩延续。
 *       宿敌对决同时触发"既生瑜何生亮"(赵凛)与"水火不容"(水灵根)羁绊进度。
 */
window.CHAPTER3 = { events: [

  // 开场
  {
    id: "ch3_opening",
    chapter: 3,
    text: [
      "伤愈复出三个月后，俱乐部收到一纸通知：省级青年锦标赛即将开赛。",
      "教练把你叫到办公室：「这次全省豪强齐聚。你伤愈后状态如何，该拉出去溜溜了。」",
      "他顿了顿，递来报名名单：「还有个消息——赵凛代表东城实验参赛。你俩的账，该算算了。」"
    ],
    system: "【第三章·省赛 开启。宿敌的擂台，已经摆好。】",
    next: "ch3_league_1"
  },

  // 小组赛首战（比赛）
  {
    id: "ch3_league_1",
    chapter: 3,
    type: "match",
    text: "省赛小组赛首轮。对手是擅长水行传控的「城南体校」。教练安排你首发：「开门红，稳住军心。」",
    opponent: { name: "城南体校", element: "水", strength: 32 },
    fallback_choices: [
      { id: "A", sit: "attack", text: "接球转身，直接起脚", check: { attrs: ["shooting", "burst"], difficulty: 38, tag: "射门+爆发" },
        success: { text: "你转身一脚{elementAdj}的抽射，皮球应声入网！", effects: { reputation: 10, goals: 1, attrs: { shooting: 1 } } },
        fail: { text: "射门被回防的后卫封堵。", effects: { stamina: -5 } },
        critical: { text: "【灵光一闪】省赛首球！看台一片沸腾。", effects: { reputation: 16, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "直塞找插上的队友", check: { attrs: ["passing", "vision"], difficulty: 35, tag: "传球+视野" },
        success: { text: "你一记{elementAdj}的直塞撕开防线，队友单刀破门！", effects: { reputation: 8, assists: 1, attrs: { passing: 1 } } },
        fail: { text: "传球意图被识破，中途被断。", effects: { stamina: -4 } }
      },
      { id: "C", sit: "defense", text: "先回防，稳住后场", check: { attrs: ["tackle", "positioning"], difficulty: 30, tag: "铲断+站位" },
        success: { text: "你在禁区前沿一记干净铲断，化解对方攻势。", effects: { reputation: 5, attrs: { tackle: 1 } } },
        fail: { text: "回防中被对方晃开身位。", effects: { stamina: -5 } }
      }
    ],
    result: {
      bigwin: { text: "开门红，大胜！你的名字开始在看台被传颂。", effects: { reputation: 10 } },
      win:     { text: "小胜。教练点头：「不错，继续保持。」", effects: { reputation: 6 } },
      draw:    { text: "平局。首战磕磕绊绊，还需磨合。", effects: { reputation: 2 } },
      lose:    { text: "首战告负。更衣室里一片沉闷。", effects: { reputation: -3, stamina: -5 } }
    },
    next: "ch3_train"
  },

  // 赛前集训（修炼）
  {
    id: "ch3_train",
    chapter: 3,
    type: "train",
    text: "宿敌对决前，球队安排封闭集训。你深知赵凛不好对付——多练一分，就多一分胜算。修炼房里，你把灵力一遍遍压进经脉。",
    next: "ch3_rival_match"
  },

  // 宿敌对决（比赛·赵凛·水灵根 → 触发既生瑜何生亮+水火不容羁绊）
  {
    id: "ch3_rival_match",
    chapter: 3,
    type: "match",
    text: "省赛半决赛。对面站着的，正是赵凛。他隔着球场盯着你，嘴角勾起一丝冷笑：「等你三个月了。」裁判哨响。",
    opponent: { name: "东城实验·赵凛", element: "水", strength: 48 },
    fallback_choices: [
      { id: "A", sit: "attack", text: "直面赵凛的防守，强行起脚", check: { attrs: ["shooting", "resolve"], difficulty: 45, tag: "射门+决断" },
        success: { text: "你{elementAdj}地起脚，皮球越过赵凛的封堵轰入网窝！", effects: { reputation: 14, goals: 1, attrs: { shooting: 1 } } },
        fail: { text: "赵凛预判了你的射门，伸腿封堵。", effects: { stamina: -6 } },
        critical: { text: "【灵光一闪】你在赵凛面前破门！全场沸腾，他脸色铁青。", effects: { reputation: 22, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "吸引赵凛防守后分球队友", check: { attrs: ["passing", "vision"], difficulty: 40, tag: "传球+视野" },
        success: { text: "你吸引赵凛上抢，分球给无人盯防的队友破门！", effects: { reputation: 10, assists: 1, attrs: { passing: 1 } } },
        fail: { text: "赵凛看穿你的意图，提前卡断传球线路。", effects: { stamina: -5 } }
      },
      { id: "C", sit: "defense", text: "贴身盯防赵凛，不给他机会", check: { attrs: ["tackle", "strength"], difficulty: 42, tag: "铲断+对抗" },
        success: { text: "你全场贴身盯防，赵凛一筹莫展，毫无建树。", effects: { reputation: 8, attrs: { tackle: 1 } } },
        fail: { text: "赵凛一个变向晃开你，制造杀机。", effects: { stamina: -6 } }
      }
    ],
    result: {
      bigwin: { text: "大胜赵凛！赛后他狠狠盯着你：「没完。」", effects: { reputation: 16, flags: { keySuccess: true } } },
      win:     { text: "你战胜了赵凛，挺进决赛。他一言不发转身离场。", effects: { reputation: 10 } },
      draw:    { text: "平局。赵凛冷笑：「你还是赢不了我。」", effects: { reputation: 4 } },
      lose:    { text: "你输给了赵凛。他走过你身边：「你变弱了。」心魔在心底滋生。", effects: { reputation: -5, stamina: -6, demonValue: 5 } }
    },
    next: "ch3_coach_talk"
  },

  // 队长袖标（选择）
  {
    id: "ch3_coach_talk",
    chapter: 3,
    text: [
      "决赛前夜，教练把你叫进办公室：「球队需要一个领袖。」",
      "他看着你：「我想把队长袖标给你。但我想先听听你的想法。」"
    ],
    choices: [
      { id: "A", text: "接过袖标，带领球队冲冠", effects: { reputation: 8, attrs: { resolve: 2 }, flags: { captain: true } }, next: "ch3_exam" },
      { id: "B", text: "婉拒，专注踢好自己的球", effects: { reputation: 3, attrs: { iq: 2 } }, next: "ch3_exam" }
    ]
  },

  // 决赛（比赛）
  {
    id: "ch3_exam",
    chapter: 3,
    type: "match",
    text: "省赛决赛。对手是卫冕冠军「北门体校」，以钢铁防线著称。看台上，各地球探云集。你深吸一口气，踏上草皮。",
    opponent: { name: "北门体校", element: "金", strength: 44 },
    fallback_choices: [
      { id: "A", sit: "attack", text: "禁区前沿起脚远射", check: { attrs: ["shooting", "power"], difficulty: 43, tag: "射门+力量" },
        success: { text: "你{elementAdj}的远射轰穿钢铁防线！", effects: { reputation: 13, goals: 1, attrs: { shooting: 1 } } },
        fail: { text: "射门被链式防守封堵。", effects: { stamina: -5 } },
        critical: { text: "【灵光一闪】石破天惊的远射！决赛最美进球。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "与队友配合渗透防线", check: { attrs: ["passing", "iq"], difficulty: 38, tag: "传球+球商" },
        success: { text: "你与队友精妙配合，撕开防线，队友破门！", effects: { reputation: 9, assists: 1, attrs: { passing: 1 } } },
        fail: { text: "防线太严密，渗透失败。", effects: { stamina: -4 } }
      },
      { id: "C", sit: "defense", text: "先稳防守，再寻战机", check: { attrs: ["positioning", "balance"], difficulty: 32, tag: "站位+平衡" },
        success: { text: "你指挥若定，防线固若金汤，没给对手机会。", effects: { reputation: 6, attrs: { positioning: 1 } } },
        fail: { text: "一次走神，让对方制造险情。", effects: { stamina: -5 } }
      }
    ],
    result: {
      bigwin: { text: "大胜卫冕冠军，省赛夺冠！MVP实至名归。", effects: { reputation: 18, flags: { keySuccess: true, provincialChamp: true } } },
      win:     { text: "你捧起省赛冠军奖杯。它比你想象的沉。", effects: { reputation: 12, flags: { provincialChamp: true } } },
      draw:    { text: "平局。冠军归属待定，命运悬而未决。", effects: { reputation: 6 } },
      lose:    { text: "决赛失利。你离冠军，还差一口气。", effects: { reputation: -4, stamina: -6 } }
    },
    next: "ch3_vacation"
  },

  // 假期抉择（选择）
  {
    id: "ch3_vacation",
    chapter: 3,
    text: "赛季落幕，假期来临。你打算如何度过这难得的休整期？",
    choices: [
      { id: "A", text: "留在俱乐部加练，笨鸟先飞", effects: { stamina: -15, attrs: { resolve: 2, shooting: 1 } }, next: "ch3_end" },
      { id: "B", text: "回青云城，去蹴鞠庙看看庙祝", effects: { stamina: 20, attrs: { pressure: 2 }, demonValue: -10 }, next: "ch3_end" },
      { id: "C", text: "打工赚灵石，补贴家用", effects: { spiritStones: 30, stamina: -10, attrs: { pressure: 1 } }, next: "ch3_end" }
    ]
  },

  // 章末结算 → 跳转第四章《学院大比·组队》
  {
    id: "ch3_end",
    chapter: 3,
    text: [
      "省赛的硝烟散尽。你站在领奖台上，汗水与荣光一并落定。",
      "更衣室里，教练递来一份烫金请柬：「全国八大学院精英齐聚的『学院大比』，向你敞开大门。那里，才是真正天才的战场。」"
    ],
    system: "【第三章·省赛 完。接下来：第四章·学院大比·组队。】",
    effects: { chapter: 1, age: 1 },
    next: "ch4_opening"
  }

] };
