/* data/chapter6.js — 第六章《淬炼营·入营》（设计稿第七章·17岁前6周）
 * 事件链：入营索道 → 营规宣布 → 摸底测试 → 1v1×3(含复仇赛) → 2v2×2 → 五行阵试炼 → 深夜加练 → 第6周结算
 * 说明：蓝色监狱式淘汰。36人进，11人出。没有队友，只有对手。
 *       1v1单挑采用简化检定（试探/交锋/终结三回合浓缩为一次关键检定）。
 */
window.CHAPTER6 = { events: [

  // 开场：入营·索道上升·昆仑山腹
  {
    id: "ch6_opening",
    chapter: 6,
    text: [
      "昆仑山腹。索道穿云而上，脚下是万丈深渊，头顶是皑皑雪峰。",
      "吊厢里，三十六名来自全国各地的天才少年，彼此打量，无人说话。空气中弥漫着灵力波动与无声的敌意。",
      "索道尽头，一座悬空球场嵌在绝壁之间。一名白发老者负手而立，衣袂猎猎——正是传说中的营主，姜太虚。"
    ],
    system: "【第六章·淬炼营·入营 开启。36人进，11人出。这里没有队友，只有对手。】",
    next: "ch6_rules"
  },

  // 营规宣布："弱者淘汰。"
  {
    id: "ch6_rules",
    chapter: 6,
    text: [
      "姜太虚的声音不大，却清晰地钻进每个人耳中：「欢迎来到淬炼营。」",
      "「这里只有一条规矩——弱者淘汰。」他环视众人，「六周之后，三十六人中只有十一人能站着离开。被淘汰者的名字，将被抹去，仿佛从未存在。」",
      "「你们在各自的地方都是天才。但在这里，天才只是入场券。」他抬手一挥，「现在，摸底测试。让我看看，你们有几分斤两。」"
    ],
    system: "【营规：弱者淘汰。每周淘汰末位，六周后仅存11人。】",
    next: "ch6_baseline"
  },

  // 摸底测试（排名分档，决定初始对手）
  {
    id: "ch6_baseline",
    chapter: 6,
    type: "match",
    text: "摸底测试：与营中随机抽取的对手进行一场对抗赛，成绩决定初始排名与分档。你抽到的对手，是一名沉默寡言的火灵根少年。",
    opponent: { name: "淬炼营·火灵根少年", element: "火", strength: 48 },
    fallback_choices: [
      { id: "A", sit: "attack", text: "先声夺人，抢攻破门", check: { attrs: ["shooting", "burst"], difficulty: 42, tag: "射门+爆发" },
        success: { text: "你{elementAdj}地一脚冷射，率先破门！摸底测试，先拔头筹。", effects: { reputation: 8, goals: 1, attrs: { shooting: 1 } } },
        fail: { text: "射门被对方门将扑出。", effects: { stamina: -5 } },
        critical: { text: "【灵光一闪】开场闪击！姜太虚微微颔首：「有点意思。」", effects: { reputation: 14, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "稳扎稳打，控制中场", check: { attrs: ["passing", "iq"], difficulty: 38, tag: "传球+球商" },
        success: { text: "你牢牢掌控中场节奏，对手有力使不出。", effects: { reputation: 6, attrs: { iq: 1 } } },
        fail: { text: "中场被对方绞杀。", effects: { stamina: -4 } }
      },
      { id: "C", sit: "defense", text: "稳固防守，伺机反击", check: { attrs: ["tackle", "positioning"], difficulty: 34, tag: "铲断+站位" },
        success: { text: "你防守滴水不漏，反击中制造杀机。", effects: { reputation: 5, attrs: { positioning: 1 } } },
        fail: { text: "防守中被对方偷了一个。", effects: { stamina: -5 } }
      }
    ],
    result: {
      bigwin: { text: "摸底测试大胜！你被分入上游档位，初始排名靠前。", effects: { reputation: 8 } },
      win:     { text: "小胜。你的排名进入中上游。", effects: { reputation: 5 } },
      draw:    { text: "战平。中游档位，不上不下。", effects: { reputation: 2 } },
      lose:    { text: "首战告负，被分入下游档位。姜太虚的目光扫过你，意味不明。", effects: { reputation: -3, demonValue: 4 } }
    },
    next: "ch6_duel1"
  },

  // 1v1第1场（试探性对手，教学）
  {
    id: "ch6_duel1",
    chapter: 6,
    text: [
      "第2周，1v1循环赛第一轮。规则：三回合博弈——试探、交锋、终结。你的对手是一名木灵根少年，实力平平，正适合热身。",
      "他紧张地搓着手：「请、请多指教。」你活动了一下脚踝。这一场，是找回节奏的好机会。"
    ],
    choices: [
      { id: "A", text: "正面突破，一力降十会", check: { attrs: ["dribble", "speed"], difficulty: 36, tag: "盘带+速度" }, next: "ch6_duel2",
        success: { text: "你一个变向晃开对手，推射入网。干净利落。", effects: { reputation: 6, goals: 1, attrs: { dribble: 1 } } },
        fail: { text: "对手预判了你的突破，将球断下。", effects: { stamina: -4 } },
        critical: { text: "【灵光一闪】三连变向，对手脚踝都被晃开了！全场侧目。", effects: { reputation: 12, goals: 1, attrs: { dribble: 2 } } }
      },
      { id: "B", text: "假动作晃开空间，从容起脚", check: { attrs: ["shooting", "iq"], difficulty: 38, tag: "射门+球商" }, next: "ch6_duel2",
        success: { text: "你假射真扣，晃开角度后冷静推射。", effects: { reputation: 6, goals: 1, attrs: { shooting: 1 } } },
        fail: { text: "假动作被识破。", effects: { stamina: -4 } }
      }
    ]
  },

  // 1v1第2场（实力相近，博弈感强）
  {
    id: "ch6_duel2",
    chapter: 6,
    text: [
      "第3周，1v1第二轮。这次的对手与你实力在伯仲之间——一名金灵根后卫，铲断凶狠，眼神如刀。",
      "「听说你过人不错。」他活动着脖颈，骨节咔咔作响，「希望你的脚踝，比你的嘴硬。」"
    ],
    choices: [
      { id: "A", text: "以快打慢，抢在他出脚前突破", check: { attrs: ["speed", "burst"], difficulty: 44, tag: "速度+爆发" }, next: "ch6_duel3",
        success: { text: "你抢在他出脚的刹那趟球过人，单刀破门！", effects: { reputation: 8, goals: 1, attrs: { speed: 1 } } },
        fail: { text: "他出脚更快，一记凶狠铲断将球破坏。", effects: { stamina: -6 } },
        critical: { text: "【灵光一闪】你快如闪电，他连你的衣角都没碰到！", effects: { reputation: 14, goals: 1, attrs: { speed: 2 } } }
      },
      { id: "B", text: "节奏变化，诱他出脚再过人", check: { attrs: ["dribble", "iq"], difficulty: 42, tag: "盘带+球商" }, next: "ch6_duel3",
        success: { text: "你忽快忽慢，诱他出脚后一个变向抹过，推射入网。", effects: { reputation: 8, goals: 1, attrs: { dribble: 1 } } },
        fail: { text: "他不上当，稳稳卡住位置。", effects: { stamina: -5 } }
      },
      { id: "C", text: "拉开距离，直接起脚远射", check: { attrs: ["shooting", "power"], difficulty: 45, tag: "射门+力量" }, next: "ch6_duel3",
        success: { text: "你拉开空间拔脚怒射，皮球轰入死角！", effects: { reputation: 9, goals: 1, attrs: { shooting: 1 } } },
        fail: { text: "远射被他飞身封堵。", effects: { stamina: -5 } }
      }
    ]
  },

  // 1v1第3场·复仇赛（可指定对手·赵凛）
  {
    id: "ch6_duel3",
    chapter: 6,
    text: [
      "第3周最后一轮，复仇赛——你可以指定一名对手。你的目光越过人群，落在赵凛身上。",
      "他似有所感，回头与你对视，嘴角勾起一丝冷笑：「正合我意。」",
      "营地里响起低低的骚动。所有人都知道，这是宿敌之间的了断。"
    ],
    choices: [
      { id: "A", text: "指定赵凛：新仇旧恨，一次算清", check: { attrs: ["shooting", "resolve"], difficulty: 48, tag: "射门+决断" }, next: "ch6_2v2_1",
        success: { text: "决胜回合，你{elementAdj}地一脚爆射洞穿十指关！赵凛，这次是你赢了。", effects: { reputation: 12, goals: 1, bonds: { zhaolin: 15 }, attrs: { shooting: 1 } } },
        fail: { text: "赵凛预判了你的射门，将球扑出。他冷笑：「你还是太嫩。」", effects: { stamina: -6, demonValue: 5 } },
        critical: { text: "【灵光一闪】你在赵凛面前轰出惊天世界波！他怔立当场，久久无言。", effects: { reputation: 20, goals: 1, bonds: { zhaolin: 20 }, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", text: "指定另一名强者，避开赵凛锋芒", check: { attrs: ["dribble", "speed"], difficulty: 42, tag: "盘带+速度" }, next: "ch6_2v2_1",
        success: { text: "你击败指定对手，稳稳拿下一分。", effects: { reputation: 7, goals: 1, attrs: { dribble: 1 } } },
        fail: { text: "对手实力不俗，你惜败。", effects: { stamina: -5 } }
      }
    ]
  },

  // 2v2·临时组队（和陌生人配合，考验适应力）
  {
    id: "ch6_2v2_1",
    chapter: 6,
    text: [
      "第4周，2v2对抗赛——临时抽签组队。你的搭档是一名素不相识的土灵根中卫，沉默得像一块石头。",
      "「抽签就是抽签。」姜太虚的声音响起，「真正的强者，和谁搭档都能赢。开始吧。」"
    ],
    choices: [
      { id: "A", text: "主动沟通，快速建立默契", check: { attrs: ["iq", "passing"], difficulty: 40, tag: "球商+传球" }, next: "ch6_2v2_2",
        success: { text: "你与搭档迅速找到配合节奏，一记撞墙配合后破门！", effects: { reputation: 7, goals: 1, attrs: { passing: 1 } } },
        fail: { text: "沟通不畅，配合生疏，被对手抓住破绽。", effects: { stamina: -5 } }
      },
      { id: "B", text: "各自为战，靠个人能力解决", check: { attrs: ["dribble", "shooting"], difficulty: 44, tag: "盘带+射门" }, next: "ch6_2v2_2",
        success: { text: "你单骑闯关，硬生生撕开对手防线破门！", effects: { reputation: 8, goals: 1, attrs: { dribble: 1 } } },
        fail: { text: "独木难支，你被双人包夹断球。", effects: { stamina: -6 } }
      }
    ]
  },

  // 2v2·自由组队（选谁做搭档？短暂的合作信任）
  {
    id: "ch6_2v2_2",
    chapter: 6,
    text: [
      "第5周，2v2自由组队。这一次，你可以自己选择搭档。",
      "人群中，阿贵朝你挤眉弄眼；林啸抱臂而立，眼神却带着期待。选谁，是一瞬间的信任。"
    ],
    choices: [
      { id: "A", text: "选阿贵：兄弟齐心，其利断金", check: { attrs: ["speed", "passing"], difficulty: 38, tag: "速度+传球" }, next: "ch6_wuxing",
        success: { text: "阿贵不知疲倦的跑动扯开空当，你心领神会破门！", effects: { reputation: 7, goals: 1, bonds: { agui: 12 }, attrs: { speed: 1 } } },
        fail: { text: "配合稍显急躁，错失良机。", effects: { stamina: -4 } }
      },
      { id: "B", text: "选林啸：风火连城，快如闪电", check: { attrs: ["speed", "burst"], difficulty: 42, tag: "速度+爆发" }, next: "ch6_wuxing",
        success: { text: "你与林啸双翼齐飞，对手只看到两道残影！", effects: { reputation: 8, goals: 1, bonds: { linxiao: 12 }, attrs: { speed: 1 } } },
        fail: { text: "两人都想当主角，配合脱节。", effects: { stamina: -5 } }
      }
    ]
  },

  // 五行阵·特殊试炼（个人挑战，失败即走）
  {
    id: "ch6_wuxing",
    chapter: 6,
    text: [
      "第6周，五行阵·特殊试炼。悬空球场中央，五座灵力阵碑按金木水火土方位排开，流转着五色光华。",
      "姜太虚负手而立：「五行阵，考验的是你对五行之力的理解与运用。闯过三阵，方可留下；失败——立刻下山。」",
      "你深吸一口气，踏入阵中。灵力如潮水般涌来，五行生克，变幻莫测。"
    ],
    choices: [
      { id: "A", text: "以本命灵根为引，稳扎稳打闯阵", check: { attrs: ["resolve", "iq"], difficulty: 46, tag: "决断+球商" }, next: "ch6_night",
        success: { text: "你以本命灵根为锚，逐一破解五行生克，闯过三阵！姜太虚微微颔首。", effects: { reputation: 10, attrs: { resolve: 1, iq: 1 } } },
        fail: { text: "你在第二阵被相克之力困住，险些出局，勉强撑过。", effects: { stamina: -10, demonValue: 4 } },
        critical: { text: "【灵光一闪】你竟在阵中悟出五行相生之理，五阵全过！姜太虚眼中精光一闪：「孺子可教。」", effects: { reputation: 18, attrs: { resolve: 2, iq: 2 }, flags: { wuxingInsight: true, keySuccess: true } } }
      },
      { id: "B", text: "剑走偏锋，以巧破力", check: { attrs: ["dribble", "agility"], difficulty: 44, tag: "盘带+柔韧" }, next: "ch6_night",
        success: { text: "你身法灵动，在五行阵力的缝隙中穿行，有惊无险过关。", effects: { reputation: 8, attrs: { agility: 1 } } },
        fail: { text: "你被阵力扫中，狼狈跌出，勉强及格。", effects: { stamina: -8 } }
      }
    ]
  },

  // 深夜加练选择（体力-20换属性+2）
  {
    id: "ch6_night",
    chapter: 6,
    text: [
      "试炼结束的深夜，你独自来到球场加练。月光下，皮球撞击墙壁的声音格外清晰。",
      "你想起矿坑边那个踢破布球的下午。同样的动作，你已经做了十年。",
      "身体的疲惫在叫嚣，但心底有个声音说：再练一组。"
    ],
    choices: [
      { id: "A", text: "咬牙加练：用汗水浇灌天赋", effects: { stamina: -20, attrs: { shooting: 2, resolve: 1 } }, next: "ch6_end" },
      { id: "B", text: "适可而止：休息也是训练的一部分", effects: { stamina: 15, attrs: { iq: 1 } }, next: "ch6_end" }
    ]
  },

  // 第6周结算·剩余22人 → 第七章
  {
    id: "ch6_end",
    chapter: 6,
    text: [
      "第6周结束。淘汰名单公布，十四个名字被念到，他们沉默地收拾行囊，登上下降的索道。",
      "有人回头望了一眼悬空球场，眼中满是不甘。索道没入云海，他们的身影就此消失。",
      "姜太虚的声音在剩下的二十二人耳边响起：「恭喜你们，还站着。但真正的淬炼，现在才开始。」"
    ],
    system: "【第六章·淬炼营·入营 完。36人→22人。接下来：第七章·淬炼营·存活。】",
    effects: { chapter: 1, age: 1 },
    next: "ch7_opening"
  }

] };
