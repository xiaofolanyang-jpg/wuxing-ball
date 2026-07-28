/* data/chapter15.js — 第十五章《世青赛·决赛》（20岁·世青赛篇·巅峰）
 * 事件链：决赛日更衣室 → 决赛之夜(通道) → 决赛(BOSS·以弱打强) → 赛后(夺冠｜亚军分流) → 章末
 * 说明：世青赛决赛，BOSS战。bigwin/win 设 worldYouthChamp 旗标（世青赛冠军）并走 ch15_aftermath_champ；
 *       draw/lose 为亚军，走 ch15_aftermath_runner。决赛是最后一场，无淘汰分支，两条赛后线均汇入章末。
 *       章末仅 chapter+1（年龄保持20）。
 * 扩写记录（2026-07）：补「赛前框架」(ch15_pregame·决赛日更衣室·心态选择) 与「赛后框架」
 *       (ch15_aftermath_champ / ch15_aftermath_runner·按夺冠/亚军分流)。不加比赛数量。
 *       入口改动：ch14_end.next 由 ch15_opening 改为 ch15_pregame（跨章 next 指针，需程序同事知会）。
 */
window.CHAPTER15 = { events: [

  // 赛前框架（新增）：决赛日·更衣室·心态选择
  {
    id: "ch15_pregame",
    chapter: 15,
    text: [
      "决赛日。更衣室里的空气像是凝住了。离开场还有半小时，没人说话，只有鞋钉敲在地砖上的声响，一下，一下。",
      "你环顾四周。年轻的边锋系了三次鞋带都没系好，手指在抖；老将后腰坐在角落闭着眼，嘴唇微微发白。这支队伍里，有人踢了一辈子球，就为等这一个晚上。",
      "沈祥还没来。所有人的目光，有意无意，都往你这边飘。你知道，他们等的不是战术。他们等的是一个信号——等一个人告诉他们：我们能赢。"
    ],
    system: "【决赛日·更衣室。大战之前，先安顿好心。】",
    choices: [
      { id: "A", text: "站起来说几句话：把紧绷的弦，松一松", effects: { reputation: 3, demonValue: -3, bonds: { agui: 6, linxiao: 6 }, attrs: { pressure: 1 } }, next: "ch15_opening" },
      { id: "B", text: "什么也不说，第一个走出去：话没用，用脚说", effects: { reputation: 2, demonValue: 3, attrs: { resolve: 1, shooting: 1 } }, next: "ch15_opening" },
      { id: "C", text: "笑着拍拍手：享受比赛，其余的交给天", effects: { reputation: 2, demonValue: -6, attrs: { rhythm: 1, iq: 1 } }, next: "ch15_opening" }
    ]
  },

  // 开场：决赛之夜
  {
    id: "ch15_opening",
    chapter: 15,
    text: [
      "决赛之夜。球场的灯光打在草皮上，白得发烫。八万人。你站在球员通道里，能听见看台的声浪像潮水一样，一浪一浪拍过来。",
      "对手是卫冕冠军高卢雄鸡——阵中三个通脉境，热身动作都带着从容，那是赢过的人才有的松弛。赔率一边倒，没人看好你们。",
      "沈祥最后一次合上战术本。他没看战术板，看的是人：「走到这儿，你们已经赢了。但既然来了——就把冠军，带回去。」三个字，够了。"
    ],
    system: "【第十五章·世青赛·决赛 开启。世界冠军，一场定乾坤。】",
    next: "ch15_final"
  },

  // 决赛：卫冕冠军·高卢雄鸡（火灵根·以弱打强）
  {
    id: "ch15_final",
    chapter: 15,
    type: "match",
    text: "决赛。高卢雄鸡。开场他们就展现出卫冕冠军的统治力，控球、压迫、层层推进，像涨潮的海。你的队友们咬牙顶着，大腿很快就酸了。武石活动着手腕，骨节咔咔响。范志贵闭眼深呼吸。你望向看台最高处——那片红色。这一战，不为自己。",
    opponent: { name: "卫冕冠军·高卢雄鸡", element: "火", strength: 64 },
    teamBase: 36,
    fallback_choices: [
      { id: "A", sit: "attack", text: "决胜时刻，一剑封喉", check: { attrs: ["shooting", "resolve"], difficulty: 50, tag: "射门+决断" },
        success: { text: "终场前，你{elementAdj}地一脚爆射。脚背传来扎实的触感，球进网的声音被八万人的吼声淹没。冠军。", effects: { reputation: 20, goals: 1, attrs: { shooting: 1 } } },
        fail: { text: "射门被对方门将扑出。你的脚背还残留着触球的震感，但球已经不在网里了。", effects: { stamina: -7 } },
        critical: { text: "【灵光一闪】你在决赛轰出一脚世界波。皮球划破夜空，直挂死角。八万人同时站起来。世界冠军。", effects: { reputation: 32, goals: 1, attrs: { shooting: 2, resolve: 1 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "团队配合，撕开王者防线", check: { attrs: ["passing", "vision"], difficulty: 46, tag: "传球+视野" },
        success: { text: "你与武石、内牛尔三角传递，三脚球，防线撕开。助攻队友推射入网。二十多人的剑，刺穿了王者的甲。", effects: { reputation: 14, assists: 1, bonds: { zhaolin: 10, linxiao: 10 }, attrs: { passing: 1 } } },
        fail: { text: "王者防线密不透风。你的直塞被断，球弹回来打在你脚面上。疼。", effects: { stamina: -6 } }
      },
      { id: "C", sit: "defense", text: "先稳住，把比赛拖进你的节奏", check: { attrs: ["pressure", "positioning"], difficulty: 42, tag: "抗压+站位" },
        success: { text: "你顶住卫冕冠军的狂攻，每一次对抗都咬住。大腿在发酸，但防线没退。反击的火种，保住了。", effects: { reputation: 9, attrs: { pressure: 1 } } },
        fail: { text: "卫冕冠军的攻势一浪接一浪。你的重心越来越低，防线在晃。", effects: { stamina: -7 } }
      }
    ],
    result: {
      bigwin: { text: "决赛大胜。你举起奖杯时，金属冰凉，手心全是汗。八万人在喊，你只听见自己的心跳。世界冠军——东方古国，第一次。【世青赛冠军·达成】", effects: { reputation: 24, flags: { worldYouthChamp: true, keySuccess: true } }, next: "ch15_aftermath_champ" },
      win:     { text: "终场哨响。二十多个人抱在一起。有人哭了，你不确定是不是自己。草皮上全是汗和泪的痕迹。世界冠军。【世青赛冠军·达成】", effects: { reputation: 18, flags: { worldYouthChamp: true } }, next: "ch15_aftermath_champ" },
      draw:    { text: "决赛战平，点球惜败。你站在中圈，膝盖弯了一下。冠军，差一步。那一步，像隔了一整个世界。但亚军，也是你们拼出来的。", effects: { reputation: 8, demonValue: 5 }, next: "ch15_aftermath_runner" },
      lose:    { text: "决赛告负。高卢雄鸡在庆祝，你坐在草皮上，大腿抽筋了。范志贵过来扶你，没说话，只是把你搂得很紧。", effects: { reputation: 6, stamina: -8, demonValue: 6 }, next: "ch15_aftermath_runner" }
    },
    next: "ch15_aftermath_champ"
  },

  // 赛后框架（新增·夺冠）：游行·MVP·声望跃迁
  {
    id: "ch15_aftermath_champ",
    chapter: 15,
    text: [
      "冠军。接下来的几天，像一场没醒过来的梦。",
      "夺冠游行那天，敞篷大巴开过市中心，街道两边全是人。有人举着你的画像，有人把球衣扔上车。你站在车上扶着栏杆，忽然想起矿坑边那条土路——那条路上，从来没有过这么多人。",
      "媒体把最有价值球员的讨论推到你面前，标题一个比一个夸张：「世界级新星升起」「东方古国的第一个世界冠军」。孙德斯把一沓合同放在桌上，没说话，只是笑。你知道，从这一夜起，世界足坛记住的，不再只是那支球队，还有你的名字。"
    ],
    system: "【世界冠军。从这一夜起，你是世界级的名字。】",
    choices: [
      { id: "A", text: "把功劳归给队友：没有他们，就没有这个冠军", effects: { reputation: 6, bonds: { agui: 8, zhaolin: 6, linxiao: 6 }, attrs: { iq: 1 } }, next: "ch15_end" },
      { id: "B", text: "坦然享受：这是我拼来的，我值得", effects: { reputation: 12, spiritStones: 20, attrs: { resolve: 1 } }, next: "ch15_end" },
      { id: "C", text: "保持清醒：冠军只是开始，路还长", effects: { reputation: 8, demonValue: -6, attrs: { resolve: 2 } }, next: "ch15_end" }
    ]
  },

  // 赛后框架（新增·亚军）：不甘·立志·声望仍涨
  {
    id: "ch15_aftermath_runner",
    chapter: 15,
    text: [
      "亚军。颁奖时，你站在台下，看着高卢雄鸡举起奖杯。金属的反光刺了一下你的眼。你跟着鼓掌，手掌拍得生疼，脸上挂着笑，心里却空了一块。",
      "更衣室里很安静。沈祥走过来，没有安慰，只是说：「记住今晚。记住这种看着别人举杯的感觉。它会是你这辈子，最好的燃料。」",
      "回国的飞机上，媒体依然给了你整版的标题：「虽败犹荣」「世界级新星的未来」。你望着舷窗外的云，把那块空掉的地方，悄悄填进了两个字——下次。"
    ],
    system: "【亚军。不甘，是强者最好的燃料。】",
    choices: [
      { id: "A", text: "把不甘当燃料：下一次，我一定把奖杯拿回来", effects: { reputation: 6, demonValue: 4, attrs: { resolve: 2 } }, next: "ch15_end" },
      { id: "B", text: "为队友骄傲：能和这群人并肩，已经是幸事", effects: { reputation: 4, demonValue: -6, bonds: { agui: 8, zhaolin: 6 }, attrs: { pressure: 1 } }, next: "ch15_end" },
      { id: "C", text: "沉默立志：不说话，把今天刻进骨头里", effects: { reputation: 4, demonValue: 2, attrs: { resolve: 1, shooting: 1 } }, next: "ch15_end" }
    ]
  },

  // 章末 → 第十六章《巅峰·抉择》
  {
    id: "ch15_end",
    chapter: 15,
    text: [
      "世青赛结束了。回国的飞机上，奖杯就放在你脚边，金属外壳映着舷窗的云。你看了它很久。",
      "落地时，机场挤满了人。横幅、鲜花、闪光灯。有人喊你的名字，喊得声嘶力竭。你忽然有点不真实——一个月前，你还只是个在海外联赛里挣扎求存的年轻人。",
      "手机震个不停。豪门俱乐部的邀约、国家队的征召、赞助商的合同。孙德斯摘下老花镜，用指节敲了敲桌面：「记住。世青赛只是开始。真正的路，在你脚下。」"
    ],
    system: "【第十五章·世青赛·决赛 完。接下来：第十六章·巅峰·抉择。】",
    effects: { chapter: 1 },
    next: "ch16_opening"
  }

] };
