/* data/chapter14.js — 第十四章《世青赛·半决赛》（20岁·世青赛篇·四强）
 * 事件链：半决赛前夜 → 半决赛(单败) → 章末(晋级决赛) ｜ 输球 → ch14_eliminated → 第十六章
 * 说明：半决赛，单败。result.lose 设分支级 next 指向 ch14_eliminated；draw 文案"点球险胜"仍晋级。
 *       ch14_eliminated 补偿跳过的 ch14_end/ch15_end 两次 chapter 递增（effects.chapter:2），直达第十六章。
 */
window.CHAPTER14 = { events: [

  // 开场：半决赛前夜
  {
    id: "ch14_opening",
    chapter: 14,
    text: [
      "半决赛前夜。酒店房间里，你睡不着，索性坐起来看窗外的夜景。异国的月亮，跟青云城的是同一个，却好像隔着一层什么。",
      "手机震了一下。是武石发来的，就一个字：「赢。」你回了个握拳的表情。又一下，阿贵的语音，大嗓门：「明天干翻他们！」你笑了笑，把手机扣在床头。",
      "对手是日耳曼战车——纪律严明得像一台机器，全场九十分钟不犯一个错误的那种。沈祥说：「机器也有螺丝松的时候。耐心，等那一下。」"
    ],
    system: "【第十四章·世青赛·半决赛 开启。再赢一场，就是决赛。】",
    next: "ch14_semi"
  },

  // 半决赛：日耳曼战车（金灵根·纪律机器）
  {
    id: "ch14_semi",
    chapter: 14,
    type: "match",
    text: "半决赛，日耳曼战车。开场你就明白了什么叫纪律——他们的跑位像用尺子量过，传球像钟表齿轮，咬合得严丝合缝。金灵根后腰全场不知疲倦地扫荡，你拿球的空间被压缩到极限。看台上，两片球迷的声浪此起彼伏，像两军对垒。",
    opponent: { name: "日耳曼战车", element: "金", strength: 60 },
    teamBase: 36,
    fallback_choices: [
      { id: "A", sit: "attack", text: "用个人能力撕开机器的缝隙", check: { attrs: ["dribble", "burst"], difficulty: 48, tag: "盘带+爆发" },
        success: { text: "你{elementAdj}地连续变向，硬是从两台机器的夹缝里挤过去，禁区内一脚低射。球进了。机器，也会卡壳。", effects: { reputation: 14, goals: 1, attrs: { dribble: 1 } } },
        fail: { text: "机器的防守密不透风。你第三下变向时被人精准地卡住，球丢了。他们的回防快得像上了发条。", effects: { stamina: -6 } },
        critical: { text: "【灵光一闪】你连过三人，在禁区前沿轰出一脚世界波。皮球直挂死角。看台上那片红色，疯了。", effects: { reputation: 24, goals: 1, attrs: { dribble: 2, burst: 1 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "用更快的传递，抢在机器咬合之前", check: { attrs: ["passing", "vision"], difficulty: 44, tag: "传球+视野" },
        success: { text: "你加快出球节奏，一脚出球，两脚出球。机器的逼抢还没合围，球已经转移到了弱侧。武石插上，推射入网。", effects: { reputation: 10, assists: 1, bonds: { zhaolin: 8 }, attrs: { passing: 1 } } },
        fail: { text: "传递稍慢半拍，被机器的中场拦截了。他们的反抢，又快又准。", effects: { stamina: -5 } }
      },
      { id: "C", sit: "defense", text: "先咬住，等机器自己松动", check: { attrs: ["pressure", "positioning"], difficulty: 42, tag: "抗压+站位" },
        success: { text: "你顶住机器的层层推进，每一次对抗都咬住。第七十分钟，对方传接第一次出现失误——机会来了。", effects: { reputation: 8, attrs: { pressure: 1, positioning: 1 } } },
        fail: { text: "机器的攻势一浪接一浪。你的重心越来越低，防线在晃。", effects: { stamina: -6 } }
      }
    ],
    result: {
      bigwin: { text: "大胜战车，挺进决赛。终场哨响，机器的零件们愣在原地，不敢相信。你和队友们抱成一团，吼得嗓子都哑了。", effects: { reputation: 14, flags: { keySuccess: true } } },
      win:     { text: "险胜，进决赛。更衣室里沈祥的手都在抖：「孩子们，你们创造了历史。」", effects: { reputation: 10 } },
      draw:    { text: "战平，加时，点球。你罚进最后一球时，整个球场都安静了，然后——炸了。赢了。决赛。", effects: { reputation: 6, stamina: -8 } },
      lose:    { text: "半决赛，倒下了。机器的球员们冷静地庆祝，像完成了一道工序。你坐在草皮上，半天没起来。", effects: { reputation: -5, stamina: -7, demonValue: 7 }, next: "ch14_eliminated" }
    },
    next: "ch14_end"
  },

  // 半决赛出局（输球 → 止步，不进入决赛）
  {
    id: "ch14_eliminated",
    chapter: 14,
    text: [
      "世青赛，止步四强。距离决赛，只差一场。你坐在更衣室的长凳上，盯着鞋钉上的泥，看了很久。",
      "阿贵坐到你旁边，没说话，只是把一瓶水递给你。你接过来，拧开，没喝，又拧上了。",
      "沈祥走过来，拍了拍你的肩：「四强，已经很好了。但我知道，你不满足。」他顿了顿，「记住这种不甘心。它会推着你，走到决赛，走到更远的地方。」你抬起头，点了点头。"
    ],
    system: "【世青赛·止步半决赛（季军）。接下来：第十六章·巅峰·抉择。】",
    effects: { chapter: 2 },
    next: "ch16_opening"
  },

  // 章末 → 第十五章《世青赛·决赛》
  {
    id: "ch14_end",
    chapter: 14,
    text: [
      "决赛。你们真的踢进了世青赛的决赛。消息传回国内，整个青云城都沸腾了——阿贵他妈在电话里哭得说不出话。",
      "决赛前夜，全队聚在一起。沈祥举起水杯：「明天，不管对面是谁，把你们的球，踢给全世界看。」二十多个杯子碰在一起，水花四溅。",
      "你站在窗前，望着异国的夜空。从矿坑边的破布球，到世青赛的决赛。这一步，你走了很多年。明天，该把冠军带回家了。"
    ],
    system: "【第十四章·世青赛·半决赛 完。晋级决赛。接下来：第十五章·世青赛·决赛。】",
    effects: { chapter: 1 },
    next: "ch15_pregame"
  }

] };
