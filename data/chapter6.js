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
      "索道升到第三根支柱的时候，冷空气开始往肺里灌。不是冬天那种干冷，是带着水汽的、刀子一样刮喉咙的冷。吊厢铁皮被风拍得嗡嗡响，脚下的云海翻涌着，偶尔裂开一道缝，露出底下灰白色的岩壁。",
      "三十六个人挤在四节吊厢里，没人说话。有人搓手，有人盯着自己的鞋尖。你听见旁边那人的呼吸声比你还重。空气里有一股淡淡的灵力波动，像暴雨前闷在胸腔里的那股气。",
      "索道尽头，一座球场嵌在两扇绝壁之间，四面透风，能听见风灌进球门框时发出的呜咽声。一个白发老人站在中圈，双手背在身后，军大衣领子竖着，下巴微抬——姜太虚。他看起来更像一个在山顶等公交车的退休老头。"
    ],
    system: "【第六章·淬炼营·入营 开启。36人进，11人出。这里没有队友，只有对手。】",
    next: "ch6_rules"
  },

  // 营规宣布："弱者淘汰。"
  {
    id: "ch6_rules",
    chapter: 6,
    text: [
      "风很大，但姜太虚开口的时候，每个字都清清楚楚地塞进了你耳朵里，像有人贴着你的耳廓在说话。",
      "「规矩一条。」他竖起一根手指，「弱的走。」顿了一下，「六周。三十六个人，留十一个。走了的，名字划掉，档案销毁，跟没来过一样。」",
      "他把手收回去，重新背在身后。风把他军大衣的下摆吹得啪啪响。「别跟我提你们以前多厉害。」他偏了偏头，朝球场努了努嘴，「上去。让我看看。」"
    ],
    system: "【营规：弱者淘汰。每周淘汰末位，六周后仅存11人。】",
    next: "ch6_baseline"
  },

  // 摸底测试（排名分档，决定初始对手）
  {
    id: "ch6_baseline",
    chapter: 6,
    type: "match",
    text: "摸底测试。你第一次踏上悬空球场的草皮，脚底能感觉到平台在风里微微发颤。海拔太高，跑两步嗓子就发紧。抽签分到的对手是个火灵根少年，黑瘦，话少，热身时一直拿额头撞门柱，咚、咚、咚，像在给什么上发条。",
    opponent: { name: "淬炼营·火灵根少年", element: "火", strength: 48 },
    fallback_choices: [
      { id: "A", sit: "attack", text: "先声夺人，抢攻破门", check: { attrs: ["shooting", "burst"], difficulty: 39, tag: "射门+爆发" },
        success: { text: "你{elementAdj}地一脚冷射，率先破门！摸底测试，先拔头筹。", effects: { reputation: 8, goals: 1, attrs: { shooting: 1 } } },
        fail: { text: "射门被对方门将扑出。", effects: { stamina: -5 } },
        critical: { text: "【灵光一闪】开场闪击！姜太虚微微颔首：「有点意思。」", effects: { reputation: 14, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "稳扎稳打，控制中场", check: { attrs: ["passing", "iq"], difficulty: 35, tag: "传球+球商" },
        success: { text: "你牢牢掌控中场节奏，对手有力使不出。", effects: { reputation: 6, attrs: { iq: 1 } } },
        fail: { text: "中场被对方绞杀。", effects: { stamina: -4 } }
      },
      { id: "C", sit: "defense", text: "稳固防守，伺机反击", check: { attrs: ["tackle", "positioning"], difficulty: 31, tag: "铲断+站位" },
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
      "第2周，1v1循环赛。场地只有半场大，边线外两米就是崖壁，风从底下往上灌，球速会被吹偏。规则简单：三回合，试探、交锋、终结，一次定胜负。",
      "你的对手是个木灵根少年，比你矮半个头，站在对面一直在搓手指，指节搓得发红。「那、那个，」他清了清嗓子，「请多指教。」你活动了一下脚踝，听见自己的关节咔嗒响了一声。这一场，先找节奏。"
    ],
    choices: [
      { id: "A", text: "正面突破，一力降十会", check: { attrs: ["dribble", "speed"], difficulty: 33, tag: "盘带+速度" }, next: "ch6_duel2",
        success: { text: "你一个变向晃开对手，推射入网。干净利落。", effects: { reputation: 6, goals: 1, attrs: { dribble: 1 } } },
        fail: { text: "对手预判了你的突破，将球断下。", effects: { stamina: -4 } },
        critical: { text: "【灵光一闪】三连变向，对手脚踝都被晃开了！全场侧目。", effects: { reputation: 12, goals: 1, attrs: { dribble: 2 } } }
      },
      { id: "B", text: "假动作晃开空间，从容起脚", check: { attrs: ["shooting", "iq"], difficulty: 35, tag: "射门+球商" }, next: "ch6_duel2",
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
      "第3周，第二轮。这次的对手不一样。金灵根，后卫出身，小腿上全是旧伤疤，站在那儿像一截铁桩。他热身的方式是原地高抬腿，膝盖撞得啪啪响。",
      "他歪着头打量你，脖颈左右一拧，骨节咔咔地响了一串。「听说你过人挺花。」他吐了口气，白雾散在冷空气里，「待会儿你变向的时候，留意一下自己脚踝。别崴了，我可不扶。」你胃里紧了一下。这个人的水平，跟你差不多。"
    ],
    choices: [
      { id: "A", text: "以快打慢，抢在他出脚前突破", check: { attrs: ["speed", "burst"], difficulty: 41, tag: "速度+爆发" }, next: "ch6_duel3",
        success: { text: "你抢在他出脚的刹那趟球过人，单刀破门！", effects: { reputation: 8, goals: 1, attrs: { speed: 1 } } },
        fail: { text: "他出脚更快，一记凶狠铲断将球破坏。", effects: { stamina: -6 } },
        critical: { text: "【灵光一闪】你快如闪电，他连你的衣角都没碰到！", effects: { reputation: 14, goals: 1, attrs: { speed: 2 } } }
      },
      { id: "B", text: "节奏变化，诱他出脚再过人", check: { attrs: ["dribble", "iq"], difficulty: 39, tag: "盘带+球商" }, next: "ch6_duel3",
        success: { text: "你忽快忽慢，诱他出脚后一个变向抹过，推射入网。", effects: { reputation: 8, goals: 1, attrs: { dribble: 1 } } },
        fail: { text: "他不上当，稳稳卡住位置。", effects: { stamina: -5 } }
      },
      { id: "C", text: "拉开距离，直接起脚远射", check: { attrs: ["shooting", "power"], difficulty: 42, tag: "射门+力量" }, next: "ch6_duel3",
        success: { text: "你拉开空间拔脚怒射，皮球轰入死角！", effects: { reputation: 9, goals: 1, attrs: { shooting: 1 } } },
        fail: { text: "远射被他飞身封堵。", effects: { stamina: -5 } }
      }
    ]
  },

  // 1v1第3场·复仇赛（可指定对手·武石）
  {
    id: "ch6_duel3",
    chapter: 6,
    text: [
      "第3周最后一轮。复仇赛，可以点名。你还没开口，目光已经先你一步越过了人群。",
      "武石正在场边拿鞋钉刮鞋底的血渍，感觉到你的视线，抬起头。两个人隔着二十米对视了三秒。他把鞋往地上一摔，朝你走过来，嘴角带着那种你熟悉的、欠揍的笑：「等你这句话等了一礼拜了。」",
      "周围安静下来。连风都好像歇了一口气。没人起哄，没人议论。该看的都写在脸上了。"
    ],
    choices: [
      { id: "A", text: "指定武石：新仇旧恨，一次算清", check: { attrs: ["shooting", "resolve"], difficulty: 45, tag: "射门+决断" }, next: "ch6_2v2_1",
        success: { text: "决胜回合，你{elementAdj}地一脚爆射洞穿十指关！武石，这次是你赢了。", effects: { reputation: 12, goals: 1, bonds: { zhaolin: 15 }, attrs: { shooting: 1 } } },
        fail: { text: "武石预判了你的射门，将球扑出。他冷笑：「你还是太嫩。」", effects: { stamina: -6, demonValue: 5 } },
        critical: { text: "【灵光一闪】你在武石面前轰出惊天世界波！他怔立当场，久久无言。", effects: { reputation: 20, goals: 1, bonds: { zhaolin: 20 }, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", text: "指定另一名强者，避开武石锋芒", check: { attrs: ["dribble", "speed"], difficulty: 39, tag: "盘带+速度" }, next: "ch6_2v2_1",
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
      "第4周，2v2。抽签组队，没得选。你的搭档是个土灵根中卫，方脸，厚嘴唇，从集合到上场一共说了零个字。他蹲在场边系鞋带，系了三次，每次都拆掉重来。你站在他旁边，不知道该说什么，就跟着活动了一下膝盖。",
      "姜太虚在场边嗑瓜子：「嫌搭档不好？换？没得换。」他把瓜子壳吐在地上，「跟谁搭都能赢的，才叫本事。去吧。」"
    ],
    choices: [
      { id: "A", text: "主动沟通，快速建立默契", check: { attrs: ["iq", "passing"], difficulty: 37, tag: "球商+传球" }, next: "ch6_2v2_2",
        success: { text: "你与搭档迅速找到配合节奏，一记撞墙配合后破门！", effects: { reputation: 7, goals: 1, attrs: { passing: 1 } } },
        fail: { text: "沟通不畅，配合生疏，被对手抓住破绽。", effects: { stamina: -5 } }
      },
      { id: "B", text: "各自为战，靠个人能力解决", check: { attrs: ["dribble", "shooting"], difficulty: 41, tag: "盘带+射门" }, next: "ch6_2v2_2",
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
      "第5周，2v2自由组队。姜太虚说完「自己找搭档」三个字就不管了，背着手走了。",
      "范志贵小跑过来，还没站定就开始说：「咱俩搭吧？我跑得快，你传给我就行，不用传太准，我接得住，接不住我再跑一趟——」他搓着手，语速越来越快。远处，内牛尔抱着胳膊靠在崖壁上，没过来，但目光一直跟着你。他冲你点了一下下巴，很轻，像是怕被人看见。",
      "你朝谁走过去，就是把后背交给谁。"
    ],
    choices: [
      { id: "A", text: "选阿贵：兄弟齐心，其利断金", check: { attrs: ["speed", "passing"], difficulty: 35, tag: "速度+传球" }, next: "ch6_wuxing",
        success: { text: "范志贵不知疲倦的跑动扯开空当，你心领神会破门！", effects: { reputation: 7, goals: 1, bonds: { agui: 12 }, attrs: { speed: 1 } } },
        fail: { text: "配合稍显急躁，错失良机。", effects: { stamina: -4 } }
      },
      { id: "B", text: "选内牛尔：风火连城，快如闪电", check: { attrs: ["speed", "burst"], difficulty: 39, tag: "速度+爆发" }, next: "ch6_wuxing",
        success: { text: "你与内牛尔双翼齐飞，对手只看到两道残影！", effects: { reputation: 8, goals: 1, bonds: { linxiao: 12 }, attrs: { speed: 1 } } },
        fail: { text: "两人都想当主角，配合脱节。", effects: { stamina: -5 } }
      }
    ]
  },

  // 五行阵·特殊试炼（个人挑战，失败即走）
  {
    id: "ch6_wuxing",
    chapter: 6,
    text: [
      "第6周。球场中央立起五块石碑，金木水火土，按方位摆开。碑面上有纹路在流动，发出低频的嗡鸣声，像把耳朵贴在变压器上。五色光从碑顶往上冒，在冷风里扭成一股一股的。",
      "姜太虚站在阵外，手揣在军大衣兜里：「过三块碑，留下。过不了——」他朝山下的方向偏了偏头，没说完。不用说。",
      "你踏进阵的那一刻，耳膜嗡了一下。灵力不是涌过来的，是压过来的，像有人拿手掌按住你的胸骨。五行生克的力道在脚底下转，你踩错一步就会被弹出去。"
    ],
    choices: [
      { id: "A", text: "以本命灵根为引，稳扎稳打闯阵", check: { attrs: ["resolve", "iq"], difficulty: 43, tag: "决断+球商" }, next: "ch6_night",
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
      "夜里十一点半，你睡不着，套上鞋去了球场。月光把草皮照得发白，呼出的气一团一团散在面前。你拿球往墙上踢，砰——回声从对面的崖壁弹回来，隔了半秒，砰。像有人在跟你对练。",
      "脚背抽得生疼，但停不下来。你想起矿坑边上那个下午，也是这么踢的，对着一面土墙，球是破布缠的，踢飞了得下坑去捡。十年了。动作没变过。",
      "大腿在发抖。肺里全是冷风。你跟自己说：再来一组。声音很轻，像是怕被谁听见。"
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
      "第6周结束。名单贴在食堂门口，十四个人。你路过的时候瞄了一眼，没敢多看。",
      "下午三点，那十四个人背着包去了索道站。没人哭。有人把球衣叠得很整齐，塞进包底。有人跟旁边的人说了句「回见」，声音很平。吊厢门关上的时候发出咔嗒一声，然后索道就动了。缆绳嗡嗡地响，吊厢越来越小，最后没进云海里，什么都看不见了。",
      "食堂晚饭照常供应。姜太虚端着搪瓷缸子从剩下的二十二个人中间走过去，说了句：「还站着呢。行。」然后他就走了。"
    ],
    system: "【第六章·淬炼营·入营 完。36人→22人。接下来：第七章·淬炼营·存活。】",
    effects: { chapter: 1, age: 1 },
    next: "ch7_opening"
  }

] };
