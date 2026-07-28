/* data/chapter17.js — 第十七章《风暴·心魔》（21-22岁·天劫）
 * 事件链：巅峰危机 → 伤病天劫 → 复健 → 心魔劫·质疑 → 心魔劫·决战 → 复出之战(比赛) → 章末
 * 说明：职业生涯最大危机。伤病劫影响身体与状态；心魔劫分两层（质疑→决战），纯选择，大幅影响 demonValue。
 *       扩写：补复健过程、心魔劫第一层（质疑）、复出之战（比赛）。
 *       章末 age+1（21→22）。终极抉择（留守/远赴/退役/执教）放在第十八章，沿用既有结局分发顺序。
 */
window.CHAPTER17 = { events: [

  // 开场：巅峰之上的危机
  {
    id: "ch17_opening",
    chapter: 17,
    text: [
      "二十一岁到二十二岁。你把最好的年华踢进了每一座球场。联赛冠军，洲际大赛，世界足球先生提名。荣誉陈列室里，奖杯映着冷光。你擦过它们，金属冰凉，没有温度。",
      "可只有你知道，每个深夜，膝盖的旧伤都在隐隐作痛。一场没踢好，质疑就铺天盖地：「他到顶了。」「伤仲永。」赞助商的通告排到深夜，你像被架在火上烤。",
      "巅峰之上，风很冷。伤病、名利、心魔，都在暗处等着。你知道，最难的那一关，来了。"
    ],
    system: "【第十七章·风暴·心魔 开启。真正的对手，是你自己。】",
    next: "ch17_injury"
  },

  // 伤病天劫（身体的警钟）
  {
    id: "ch17_injury",
    chapter: 17,
    text: [
      "赛季最激烈的阶段。一次拼抢后，你倒在草皮上。膝盖传来熟悉的剧痛——像有人拿锥子从里面顶。",
      "诊断室很白，很冷。医生把片子夹在灯箱上：半月板磨损，韧带劳损。他摘下眼镜：「再这样踢，最多三年。」",
      "窗外，球迷的欢呼声隐隐传来。你盯着那张片子，一夜未眠。心底有个声音很轻：「够了吧。你已经拥有够多了。」"
    ],
    system: "【天劫·伤病劫。身体的警钟，敲响了。】",
    choices: [
      { id: "A", text: "积极治疗，科学康复：我命由我不由天", check: { attrs: ["resolve", "stamina"], difficulty: 42, tag: "决断+耐力" }, next: "ch17_rehab",
        success: { text: "你配合治疗。每天冰敷四十分钟，康复训练两小时。三个月后，你重回赛场。膝盖不疼了，状态比伤前更好。", effects: { reputation: 5, attrs: { resolve: 2 }, demonValue: -8 } },
        fail: { text: "康复进程反复。膝盖消了又肿，肿了又消。你错过了关键比赛。", effects: { stamina: -10, demonValue: 5 } },
        critical: { text: "【灵光一闪】你不仅康复，还借机重塑了技术动作。因祸得福，境界更进一层。", effects: { reputation: 10, attrs: { resolve: 3, shooting: 2 }, demonValue: -12, flags: { keySuccess: true } } }
      },
      { id: "B", text: "带伤硬撑：只要还能跑，就绝不下场", check: { attrs: ["pressure", "hardness"], difficulty: 44, tag: "抗压+硬度" }, next: "ch17_rehab",
        success: { text: "你咬牙硬撑。每场比赛前吃两片止痛药，赛后冰敷到膝盖失去知觉。球迷为你落泪。你撑过了最艰难的赛季。", effects: { reputation: 8, attrs: { pressure: 2 }, stamina: -15, demonValue: 6 } },
        fail: { text: "硬撑的代价。第七十三分钟，膝盖彻底卡死了。你被担架抬下场，盯着天花板上的灯，一盏盏后退。", effects: { stamina: -25, demonValue: 12 } }
      },
      { id: "C", text: "听从身体：或许，是该慢下来了", effects: { demonValue: -5, attrs: { iq: 1 }, flags: { injuryDoubt: true } }, next: "ch17_rehab" }
    ]
  },

  // 复健（漫长的恢复期）
  {
    id: "ch17_rehab",
    chapter: 17,
    text: [
      "复健室成了你最常待的地方。每天冰敷，每天重复那些枯燥到令人发疯的动作：抬腿，弯曲，伸直，再抬腿。膝盖一次次肿起来，又一次次消下去。",
      "窗外就是训练场。队友们在阳光下奔跑、射门、大笑。你隔着玻璃看，手心发痒。复健师按住你的肩：「急不得。早一天，就可能晚一年。」",
      "夜里，你梦见自己又在踢球。醒来，膝盖隐隐作痛。你盯着天花板，数着还有多少天。"
    ],
    choices: [
      { id: "A", text: "严格遵医嘱，一步一步来", check: { attrs: ["resolve", "stamina"], difficulty: 42, tag: "决断+耐力" }, next: "ch17_demon_doubt",
        success: { text: "你压住性子，一天一天熬。复健师说可以加量了，你才加；说停，你就停。三个月后，膝盖的力气，一点点回来了。", effects: { reputation: 4, attrs: { resolve: 2, stamina: 1 }, demonValue: -6 } },
        fail: { text: "一次加量太急，膝盖又肿了。复健师叹了口气，进度推倒重来。你坐在复健床上，半天没说话。", effects: { stamina: -10, demonValue: 6 } },
        critical: { text: "【灵光一闪】你把复健当成另一种修炼。别人养伤，你养心。等膝盖好了，你的技术动作比伤前更合理，境界竟隐隐又进了一层。", effects: { reputation: 8, attrs: { resolve: 3, shooting: 2 }, demonValue: -10, flags: { keySuccess: true } } }
      },
      { id: "B", text: "偷偷加量：想快点回到球场", check: { attrs: ["pressure", "hardness"], difficulty: 44, tag: "抗压+硬度" }, next: "ch17_demon_doubt",
        success: { text: "你瞒着复健师加练。疼，就忍着。进度确实快了，你比预期早两周回到了训练场。代价是，膝盖从此落下了病根。", effects: { reputation: 5, attrs: { pressure: 2 }, stamina: -12, demonValue: 4 } },
        fail: { text: "加量的后果来了。一次发力，膝盖剧痛，你差点又伤一次。复健师发了火：「你想废了这条腿吗？」", effects: { stamina: -18, demonValue: 8 } }
      },
      { id: "C", text: "身体歇着，脑子不停：在复健中沉淀技术", check: { attrs: ["iq", "rhythm"], difficulty: 40, tag: "球商+节奏" }, next: "ch17_demon_doubt",
        success: { text: "腿动不了，你就看录像，研究战术，把从前没空想的东西想了个遍。等回到球场，你的阅读比赛能力，上了一个台阶。", effects: { reputation: 4, attrs: { iq: 2, rhythm: 1 }, demonValue: -5 } },
        fail: { text: "你想沉下心，可满脑子都是「什么时候能踢」。录像看了半小时，一个字没进脑子。", effects: { stamina: -4, demonValue: 3 } }
      }
    ]
  },

  // 心魔劫·第一层：质疑（纯选择）
  {
    id: "ch17_demon_doubt",
    chapter: 17,
    text: [
      "伤病的阴影里，心魔趁虚而入。深夜，你躺在床上，脑子里全是那些声音：质疑的、嘲笑的、惋惜的。「他到顶了。」「伤仲永。」「复出也只是下滑。」",
      "你梦见自己站在空荡荡的球场，球门很远，怎么射都射不进。看台上明明没人，却满是嘘声。醒来，凌晨三点，冷汗浸透了背。",
      "心底那个声音又来了，很轻，却很清晰：「够了吧。体面地退，总比摔下来强。」"
    ],
    system: "【天劫·心魔劫·第一层：质疑。】",
    choices: [
      { id: "A", text: "反驳它：我还没输", effects: { demonValue: -8, attrs: { resolve: 2 } }, next: "ch17_demon" },
      { id: "B", text: "承认恐惧：怕，是正常的", effects: { demonValue: -5, attrs: { iq: 1, pressure: 1 } }, next: "ch17_demon" },
      { id: "C", text: "起身去球场：睡不着，就去摸摸球", effects: { demonValue: -6, stamina: -5, attrs: { shooting: 1 } }, next: "ch17_demon" }
    ]
  },

  // 心魔劫·决战（纯选择·demonValue）
  {
    id: "ch17_demon",
    chapter: 17,
    text: [
      "你起身，走到镜前。镜子里的人，眼下是青黑，膝盖上还缠着护具。可那双眼睛，还亮着。",
      "你想起矿坑边那个下午。那个踢破布球的少年，没有灵根，没有球鞋，没有观众。他踢球，只是因为喜欢。他什么都不怕。",
      "心魔不可怕。可怕的是，你信了它的话。你看着镜子里的自己，一字一句：「我踢球，不是为了不摔。是为了，摔了还能站起来。」"
    ],
    system: "【天劫·心魔劫·决战。如何面对心魔，将决定你能走多远。】",
    choices: [
      { id: "A", text: "直面心魔：把恐惧摊开来看，它就没那么大了", effects: { demonValue: -15, attrs: { resolve: 2 } }, next: "ch17_return" },
      { id: "B", text: "用训练麻痹自己：不停下来，就不会去想", check: { attrs: ["stamina"], difficulty: 40, tag: "耐力" }, next: "ch17_return",
        success: { text: "你把所有不安都砸进训练里。每天加练到力竭，倒头就睡。心魔被压下去了，但你知道，它还在。", effects: { demonValue: -5, attrs: { shooting: 1 }, stamina: -10 } },
        fail: { text: "训练麻痹不了心魔。某个深夜，你坐在空球场里，第一次怀疑自己还能不能踢下去。", effects: { demonValue: 10, stamina: -12 } }
      },
      { id: "C", text: "找老友倾诉：有些坎，一个人跨不过去", effects: { demonValue: -10, bonds: { agui: 10, suwan: 6 }, attrs: { pressure: 1 } }, next: "ch17_return" }
    ]
  },

  // 复出之战（比赛·归来）
  {
    id: "ch17_return",
    chapter: 17,
    type: "match",
    text: [
      "复出那天。你在替补席坐了很久，久到膝盖都凉了。第七十分钟，教练终于点了你的名。",
      "你站起来，膝盖条件反射地紧了一下。你深吸一口气，活动了两下，那股紧张，慢慢松开了。球员通道里，阳光刺眼。",
      "踏上草皮的那一刻，看台上有人举起了你的球衣，喊你那个名字。你忽然有点想哭。这一刻，你等了太久。"
    ],
    opponent: { name: "职业联赛·复出之战对手", element: "火", strength: 58 },
    teamBase: 36,
    fallback_choices: [
      { id: "A", sit: "attack", text: "复出即亮剑：用一记进球宣告归来", check: { attrs: ["shooting", "resolve"], difficulty: 48, tag: "射门+决断" },
        success: { text: "第82分钟，球到了你脚下。你没有犹豫，{elementAdj}地起脚。球进了。整个球场站了起来，喊声震天。你跪在草皮上，仰起头。回来了。你真的回来了。", effects: { reputation: 16, goals: 1, attrs: { shooting: 1 }, demonValue: -8 } },
        fail: { text: "机会来了，你却犹豫了半拍——怕膝盖，怕再伤。球被后卫解围。你懊恼地捶了下草皮。心魔，还在。", effects: { stamina: -6, demonValue: 4 } },
        critical: { text: "【灵光一闪】复出首战，你轰出一记石破天惊的远射。球进的那一刻，全场高呼你的名字。你张开双臂，泪光里，是矿坑边那个什么都不怕的少年。", effects: { reputation: 26, goals: 1, attrs: { shooting: 2, resolve: 1 }, demonValue: -12, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "用传球找回节奏：慢慢来", check: { attrs: ["passing", "iq"], difficulty: 44, tag: "传球+球商" },
        success: { text: "你不急，先用传球找感觉。一脚，两脚，节奏回来了。一次助攻，队友破门。他冲你跑来，一把抱住你：「欢迎回来。」", effects: { reputation: 10, assists: 1, attrs: { passing: 1 }, demonValue: -5 } },
        fail: { text: "久疏战阵，传球生了。几脚都差了火候。你摇摇头，得慢慢找。", effects: { stamina: -5 } }
      },
      { id: "C", sit: "defense", text: "稳扎稳打：先证明自己还能踢满", check: { attrs: ["positioning", "pressure"], difficulty: 40, tag: "站位+抗压" },
        success: { text: "你不贪功，稳稳地踢，每一次跑位、对抗都咬住。终场哨响，你踢满了剩下的时间，膝盖，撑住了。这本身就是胜利。", effects: { reputation: 7, attrs: { positioning: 1 }, demonValue: -4 } },
        fail: { text: "一次对抗后，膝盖又隐隐作痛。你咬着牙坚持，心里却敲起了鼓。", effects: { stamina: -6, demonValue: 3 } }
      }
    ],
    result: {
      bigwin: { text: "复出之战，球队大胜。赛后记者围着你，问复出的感受。你笑了笑：「能踢球，真好。」简单的四个字，你等了太久。", effects: { reputation: 12, demonValue: -8, flags: { keySuccess: true } } },
      win:     { text: "赢了。你走在球员通道里，膝盖还在酸，但心是热的。回来了。", effects: { reputation: 8, demonValue: -5 } },
      draw:    { text: "战平。不算完美，但你踢下来了。复出的路，还长。", effects: { reputation: 4, demonValue: -3 } },
      lose:    { text: "输了。复出首战没能拿下。但你没沮丧——能重新站在这片草皮上，已经是赢了自己。", effects: { reputation: 1, stamina: -5, demonValue: 2 } }
    },
    next: "ch17_end"
  },

  // 章末 → 第十八章《传奇·序章》
  {
    id: "ch17_end",
    chapter: 17,
    text: [
      "风暴过境。你活下来了。膝盖还在隐隐作痛，心魔也还没完全散去，但你站住了。",
      "阿贵来看你，带了一瓶青云城的酒。他没说那些虚的，只是碰了碰你的杯：「能踢一天，就好好踢一天。想那么多干啥。」你笑了。是啊，想那么多干啥。",
      "二十二岁。你站在职业生涯的岔路口。前方有几条路，每一条，都通向不同的人生。该做选择了。"
    ],
    system: "【第十七章·风暴·心魔 完。接下来：第十八章·传奇·序章（终章）。】",
    effects: { chapter: 1, age: 1 },
    next: "ch18_opening"
  }

] };
