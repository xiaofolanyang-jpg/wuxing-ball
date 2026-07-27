/* data/chapter2.js — 第二章《崭露》职业初期 17-19岁
 * 事件链：一线队报到 → 首秀 → 联赛 → 转会抉择 → 天劫(连续3检定) → 结局判定
 */
window.CHAPTER2 = { events: [

  // 开场
  {
    id: "ch2_opening",
    chapter: 2,
    text: [
      "三年。青云城的雪化了又落，落了又化。",
      "你站在一线队更衣室门口，号衣上的号码比青训时沉。教练拍你肩：「今天大名单有你。首发还是替补，看你的造化。」",
      "更衣室里，老队员打量着你这个新丁，目光里有审视，也有期待。"
    ],
    system: "【第二章·崭露 开启。职业联赛的淬炼，从这里真正开始。】",
    next: "ch2_debut"
  },

  // 首秀（比赛，fallback 简化）
  {
    id: "ch2_debut",
    chapter: 2,
    type: "match",
    text: "首秀。对手是同城的中游球队「沧澜竞技」二队。你被列入替补，下半场教练拍你：「上去，让他们记住你的名字。」",
    opponent: { name: "沧澜竞技B队", element: "水", strength: 42 },
    pool: null,
    fallback_choices: [
      { id: "A", sit: "attack", text: "拿球后内切起脚", check: { attrs: ["shooting", "burst"], difficulty: 38, tag: "射门+爆发" },
        success: { text: "首秀即进球！皮球带着{elementAdj}的劲道轰入网窝，看台记住了你。", effects: { reputation: 10, goals: 1, attrs: { shooting: 1 } } },
        fail: { text: "射门被门将神勇扑出，你错过了首秀破门。", effects: { stamina: -5 } },
        critical: { text: "【灵光一闪】首秀世界波！解说：「一颗新星，正在升起！」", effects: { reputation: 18, goals: 1, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "为队友做球", check: { attrs: ["passing", "vision"], difficulty: 36, tag: "传球+视野" },
        success: { text: "你送出一记{elementAdj}的直塞，队友破门。首秀助攻。", effects: { reputation: 7, assists: 1, attrs: { passing: 1 } } },
        fail: { text: "传球被识破，无功而返。", effects: { stamina: -4 } }
      }
    ],
    result: {
      bigwin: { text: "首秀大胜！赛后采访话筒递到你嘴边。你火了。", effects: { reputation: 10 } },
      win:     { text: "首秀小胜，表现尚可。教练点头：「有点意思。」", effects: { reputation: 5 } },
      draw:    { text: "平局。首秀中规中矩，至少没丢人。", effects: { reputation: 2 } },
      lose:    { text: "输了首秀。你坐在更衣室，听老队员叹气。", effects: { reputation: -2, stamina: -5 } }
    },
    next: "ch2_sub_bench"
  },

  // 替补席煎熬
  {
    id: "ch2_sub_bench",
    chapter: 2,
    text: [
      "首秀之后，你并没站稳主力。替补席的木板比草皮凉，你数着看台上的灯一盏盏亮起。",
      "赵凛在一线队混得风生水起，每场必发。你咬牙加练，把不甘咽进肚里。"
    ],
    choices: [
      { id: "A", text: "加练，用汗水换机会", effects: { stamina: -10, attrs: { resolve: 2 }, reputation: 3 }, next: "ch2_league" },
      { id: "B", text: "找教练理论，要出场时间", check: { attrs: ["resolve", "iq"], difficulty: 30, tag: "决断+球商" },
        success: { text: "教练被你说动，许你下一场首发。", effects: { reputation: 4, flags: { startingSpot: true } } },
        fail: { text: "教练冷脸：「上场靠表现，不靠嘴。」你碰了一鼻子灰。", effects: { reputation: -2 } },
        critical: { text: "【灵光一闪】你一番话点醒教练，当场敲定首发。", effects: { reputation: 8, flags: { startingSpot: true } } },
        next: "ch2_league"
      }
    ]
  },

  // 正式联赛（使用踢法池）
  {
    id: "ch2_league",
    chapter: 2,
    type: "match",
    text: "正式联赛首发。对手是联赛榜首的豪门「金阙FC」二队，以钢铁防线著称。你深吸一口气，踏上草皮。",
    opponent: { name: "金阙FC二队", element: "金", strength: 48 },
    fallback_choices: [
      { id: "A", sit: "attack", text: "禁区前沿起脚远射", check: { attrs: ["shooting", "power"], difficulty: 44, tag: "射门+力量" },
        success: { text: "皮球带着{elementAdj}的弧线轰穿铁壁防线！", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
        fail: { text: "金阙的链式防守封堵了你的射门。", effects: { stamina: -5 } },
        critical: { text: "【灵光一闪】轰碎铁壁！解说：「连金阙的防线都挡不住这一脚！」", effects: { reputation: 20, goals: 1, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "肋部直塞找前锋", check: { attrs: ["passing", "vision"], difficulty: 40, tag: "传球+视野" },
        success: { text: "你一脚{elementAdj}的直塞撕开防线，前锋破门！", effects: { reputation: 9, assists: 1, attrs: { passing: 1 } } },
        fail: { text: "传球被金阙后腰拦截。", effects: { stamina: -4 } }
      },
      { id: "C", sit: "defense", text: "回防协助，先稳后场", check: { attrs: ["tackle", "intercept"], difficulty: 42, tag: "铲断+拦截" },
        success: { text: "你回防一记干净铲断，赢得满堂彩。", effects: { reputation: 6, attrs: { tackle: 1 } } },
        fail: { text: "回防中被对抗撞开。", effects: { stamina: -6 } }
      }
    ],
    result: {
      bigwin: { text: "掀翻榜首豪门！赛后你登上体育版头条，名字第一次传遍联赛。", effects: { reputation: 14, flags: { keySuccess: true } } },
      win:     { text: "小胜豪门。球探们开始频繁出现在你的比赛里。", effects: { reputation: 8 } },
      draw:    { text: "逼平豪门，表现亮眼。", effects: { reputation: 4 } },
      lose:    { text: "完败。金阙的防线把你锁死了。", effects: { reputation: -4, stamina: -6 } }
    },
    next: "ch2_transfer"
  },

  // 转会抉择
  {
    id: "ch2_transfer",
    chapter: 2,
    text: [
      "赛季中窗，一份来自海外豪门的邀约放在你面前——天罡联赛的「赤焰皇家」想签你。",
      "经纪人把合同推到你面前：「签字，名利双收。但那边天才如云，你可能只是个号码。」",
      "母队教练也来了：「留下，你是核心。走了，你是谁？」"
    ],
    choices: [
      { id: "A", text: "留守母队，做核心", effects: { flags: { transfer: "stay" }, reputation: 5, attrs: { resolve: 2 } }, next: "ch2_tribulation" },
      { id: "B", text: "远赴赤焰皇家，搏一把", effects: { flags: { transfer: "capital" }, reputation: 15, stamina: -15, spiritStones: 50 }, next: "ch2_tribulation" }
    ]
  },

  // 天劫·引入
  {
    id: "ch2_tribulation",
    chapter: 2,
    text: [
      "转会风波未平，一场重伤猝不及防。",
      "训练中你落地姿势不对，膝盖传来一声脆响。诊断书上写着：韧带撕裂，赛季报销。",
      "队医面色凝重：「这一关，是修途上的天劫。熬过去，境界更进；熬不过，球路可能就断了。」"
    ],
    system: "【天劫降临。连续三道关卡，以心志与属性对抗。失败越多，前程越黯淡。】",
    next: "ch2_trib_1"
  },

  // 天劫·第一关：心志
  {
    id: "ch2_trib_1",
    chapter: 2,
    text: "伤床之上，你望着天花板。剧痛之外，更难捱的是「还能不能踢球」的自我怀疑。心魔在耳边低语：退役吧，何必受这苦。",
    choices: [
      { id: "A", text: "咬牙对抗心魔，决意归来", check: { attrs: ["resolve", "pressure"], difficulty: 38, tag: "决断+抗压" },
        success: { text: "你把心魔压了下去。康复师说你恢复得比常人快——心志，是最大的药。", effects: { reputation: 5, attrs: { resolve: 2 } } },
        fail: { text: "心魔缠住你不放。康复进度迟缓，状态下滑。", effects: { reputation: -8, attrs: { pressure: -1 }, stamina: -10 } },
        critical: { text: "【灵光一闪】你以痛为引，竟摸到「不动如山」的门槛！心志大进。", effects: { reputation: 12, attrs: { resolve: 3, pressure: 2 }, flags: { keySuccess: true } } },
        next: "ch2_trib_2"
      },
      { id: "B", text: "闭目静养，避其锋芒", effects: { reputation: -3, attrs: { resolve: 1 }, demonValue: -5, stamina: 5 }, next: "ch2_trib_2" }
    ]
  },

  // 天劫·第二关：舆论
  {
    id: "ch2_trib_2",
    chapter: 2,
    text: "伤病期间，媒体开始质疑你「昙花一现」。有人翻出你青训时的旧账，有人说你被豪门拒之门外是因伤退货。舆论如潮水。",
    choices: [
      { id: "A", text: "召开发布会，正面回应", check: { attrs: ["pressure", "iq"], difficulty: 40, tag: "抗压+球商" },
        success: { text: "你一番话得体有力，舆论转向。开始有人为你叫好。", effects: { reputation: 8, attrs: { pressure: 1 } } },
        fail: { text: "发布会上你被问得语塞，舆论愈演愈烈。", effects: { reputation: -10, attrs: { pressure: -1 } } },
        critical: { text: "【灵光一闪】你的回应成为赛季金句，转危为机。", effects: { reputation: 15, flags: { keySuccess: true } } },
        next: "ch2_demon"
      },
      { id: "B", text: "沉默以对，用脚说话", effects: { reputation: -2, attrs: { resolve: 1 }, demonValue: -3, flags: { silentAnswer: true } }, next: "ch2_demon" }
    ]
  },

  // 天劫·心魔劫（设计稿第八章·天劫第二劫：纯选择，无检定）
  {
    id: "ch2_demon",
    chapter: 2,
    text: [
      "夜里。你梦见矿坑。梦见老陈。梦见那个用破布球踢墙的下午。",
      "心底深处，有个声音轻轻问你——「你踢球，是为了什么？」"
    ],
    system: "【心魔劫降临。此关纯淬炼心境，无检定。你的回答，将决定心魔值的去留。】",
    choices: [
      { id: "A", text: "为了赢。", effects: { attrs: { resolve: 5 }, demonValue: 10 }, next: "ch2_trib_3" },
      { id: "B", text: "为了快乐。", effects: { demonValue: -20, reputation: 2 }, next: "ch2_trib_3" },
      { id: "C", text: "为了证明他们错了。", effects: { allAttrsPercent: 3, demonValue: 15 }, next: "ch2_trib_3" },
      { id: "D", text: "……我不知道。", effects: { demonValue: -999, stamina: -15 }, next: "ch2_demon_hidden" }
    ]
  },

  // 心魔劫·隐藏对话（选项D触发）
  {
    id: "ch2_demon_hidden",
    chapter: 2,
    text: [
      "你沉默了。心魔也沉默了。",
      "你不知道。从矿坑边第一次踢起破布球的那天起，你就从没真正想过这个问题。好像只是……喜欢。喜欢到说不出为什么。",
      "当你不再执着于答案的那一刻，心魔竟自行消散。梦醒时分，你神台清明，仿佛卸下了千斤重担。"
    ],
    system: "【触发隐藏对话：心魔值清零。你失去了一夜安眠，却换来一次难得的通透。】",
    next: "ch2_trib_3"
  },

  // 天劫·第三关：复出
  {
    id: "ch2_trib_3",
    chapter: 2,
    text: "伤愈复出首战。对手是联赛保级队，但你的腿还在发抖。这是天劫最后一关——能不能重新站在草皮上，全看这一场。",
    choices: [
      { id: "A", text: "复出即拼命，证明自己", check: { attrs: ["resolve", "burst"], difficulty: 42, tag: "决断+爆发" },
        success: { text: "你咬牙踢满全场，最后一分钟还贡献关键传球。天劫，过了。", effects: { reputation: 10, attrs: { resolve: 1, burst: 1 } } },
        fail: { text: "你明显跟不上节奏，半场被换下。天劫留了道疤。", effects: { reputation: -8, stamina: -8 } },
        critical: { text: "【灵光一闪】复出即绝杀！你伤愈首战读秒破门，天劫彻底渡过，境界大进！", effects: { reputation: 22, goals: 1, attrs: { resolve: 2, burst: 2 }, flags: { keySuccess: true } } },
        next: "ch2_end"
      },
      { id: "B", text: "稳着踢，保命要紧", effects: { reputation: -3, attrs: { positioning: 1, pressure: 1 }, demonValue: -4 }, next: "ch2_end" }
    ]
  },

  // 章末 → 跳转第三章《省赛》（职业线延续）
  {
    id: "ch2_end",
    chapter: 2,
    text: "赛季落幕。你站在更衣室，窗外是另一片天空。但你知道，这不是终点——更大的舞台，正在等着你。",
    system: "【第二章·崭露 完。接下来：第三章·省赛。】",
    effects: { chapter: 1, age: 2 },
    next: "ch3_opening"
  }

] };
