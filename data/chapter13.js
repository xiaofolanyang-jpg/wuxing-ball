/* data/chapter13.js — 第十三章《世青赛·淘汰赛》（20岁·世青赛篇·单败）
 * 事件链：淘汰赛开场 → 1/8决赛 → 1/4决赛 → 章末(晋级) ｜ 输球 → ch13_eliminated → 第十六章
 * 说明：单败淘汰赛（1/8决赛、1/4决赛）。result.lose 设分支级 next 指向 ch13_eliminated（输球即回家）；
 *       draw 文案为"点球险胜"故仍晋级（不设分支 next，走事件级 next）。
 *       ch13_eliminated 补偿跳过的 ch13_end/ch14_end/ch15_end 三次 chapter 递增（effects.chapter:3），直达第十六章。
 */
window.CHAPTER13 = { events: [

  // 开场：单败淘汰
  {
    id: "ch13_opening",
    chapter: 13,
    text: [
      "淘汰赛。从这一轮起，没有积分，没有净胜球，没有侥幸。九十分钟，赢的留下，输的回家。",
      "更衣室里的气氛跟小组赛时不一样了。没人再说笑。范志贵系鞋带的手都绷着青筋。沈祥站在中央，声音不高：「记住，你们身后，是几万万双眼睛。别让他们失望。」",
      "你望向球员通道的光。那光的尽头，是草皮，是对手，是赢或者回家。你深吸一口气，跟了上去。"
    ],
    system: "【第十三章·世青赛·淘汰赛 开启。单败淘汰，输球即回家。】",
    next: "ch13_r16"
  },

  // 1/8决赛：东欧铁骑（土灵根·铁桶阵）
  {
    id: "ch13_r16",
    chapter: 13,
    type: "match",
    text: "十六强战，东欧铁骑。土灵根铁桶阵，后防线跟城墙似的，九个人缩在半场，就等一个反击的机会。沈祥赛前布置：「别急。用耐心，磨他们的耐心。铁桶阵最怕的，是先丢球。」",
    opponent: { name: "东欧铁骑", element: "土", strength: 56 },
    teamBase: 36,
    fallback_choices: [
      { id: "A", sit: "attack", text: "定位球抢点，头槌砸开铁桶", check: { attrs: ["heading", "positioning"], difficulty: 44, tag: "头球+站位" },
        success: { text: "角球开出来，你卡住位置，旱地拔葱，额头砸实了。球弹地入网。铁桶，裂了第一道缝。", effects: { reputation: 11, goals: 1, attrs: { heading: 1 } } },
        fail: { text: "起跳的时候被人顶了一下腰，头球顶偏了。对方门将稳稳没收。", effects: { stamina: -4 } },
        critical: { text: "【灵光一闪】那个头球你后来想了很久，起跳那一下整个人像悬在空中停了一秒。铁桶阵，被你一头砸穿。", effects: { reputation: 18, goals: 1, attrs: { heading: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "肋部直塞，打他们身后", check: { attrs: ["passing", "vision"], difficulty: 42, tag: "传球+视野" },
        success: { text: "你{elementAdj}的直塞从两个后卫中间穿过去，内牛尔的速度这时候就是武器，他插上就是一脚。", effects: { reputation: 9, assists: 1, bonds: { linxiao: 6 }, attrs: { passing: 1 } } },
        fail: { text: "直塞被土灵根后卫预判了，伸脚一挡。人家的站位确实老到。", effects: { stamina: -4 } }
      },
      { id: "C", sit: "defense", text: "不急，等他们先犯错", check: { attrs: ["rhythm", "pressure"], difficulty: 36, tag: "节奏+抗压" },
        success: { text: "你稳住节奏，不紧不慢。对方久攻不下，自己先急了，传球开始失误。机会，来了。", effects: { reputation: 6, attrs: { pressure: 1 } } },
        fail: { text: "等了太久，自己先躁了。大腿发酸，注意力开始涣散。", effects: { stamina: -4, demonValue: 2 } }
      }
    ],
    result: {
      bigwin: { text: "大胜铁骑，挺进八强。终场哨响，范志贵把毛巾甩得跟直升机似的。", effects: { reputation: 10, flags: { keySuccess: true } } },
      win:     { text: "小胜，晋级八强。更衣室里沈祥点点头：「下一场，更难。」", effects: { reputation: 7 } },
      draw:    { text: "战平，加时，点球。你罚进制胜一球时腿在抖。赢是赢了，但腿已经不是自己的了。", effects: { reputation: 4, stamina: -8 } },
      lose:    { text: "十六强，到头了。你坐在草皮上，膝盖的擦伤渗着血。世青赛，到此为止。", effects: { reputation: -5, stamina: -6, demonValue: 6 }, next: "ch13_eliminated" }
    },
    next: "ch13_qf"
  },

  // 1/4决赛：中东新月（水灵根·技术流·触发布澜羁绊）
  {
    id: "ch13_qf",
    chapter: 13,
    type: "match",
    text: "八强战，中东新月。水灵根中场组织得像流水，传球路线刁钻得很。他们阵中那个门将，是当年布澜青训出来的老熟人——扑救动作还是那么舒展。赛前你活动脚踝时看见他在对面热身，他朝你笑了笑，没说话。",
    opponent: { name: "中东新月", element: "水", strength: 58 },
    teamBase: 36,
    fallback_choices: [
      { id: "A", sit: "attack", text: "不绕弯子，正面抽射", check: { attrs: ["shooting", "power"], difficulty: 46, tag: "射门+力量" },
        success: { text: "你{elementAdj}地抡了一脚，球速太快，门将指尖蹭到了但没挡住。网窝颤了一下。", effects: { reputation: 12, goals: 1, bonds: { canglan: 10 }, attrs: { shooting: 1 } } },
        fail: { text: "门将判断对了方向，双拳把球击出去。他落地的时候看了你一眼，没表情。", effects: { stamina: -5 } },
        critical: { text: "【灵光一闪】那脚远射后来你回看了很多遍。球从门将手边飞过去的时候，他连反应都没来得及做。", effects: { reputation: 20, goals: 1, bonds: { canglan: 15 }, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "佯装传中，搓射远角", check: { attrs: ["shooting", "iq"], difficulty: 42, tag: "射门+球商" },
        success: { text: "你做了个传中的假动作，门将重心移了半步，你搓了个远角。他扑了，差两指。", effects: { reputation: 10, goals: 1, attrs: { shooting: 1 } } },
        fail: { text: "搓射角度太正，门将站住了，轻松没收。他朝你摇了摇头，像在说：还是老样子。", effects: { stamina: -4 } }
      },
      { id: "C", sit: "defense", text: "先冻结他们的核心，再想办法", check: { attrs: ["tackle", "iq"], difficulty: 40, tag: "铲断+球商" },
        success: { text: "你全场贴着对方核心，不让他舒服转身。新月的进攻像被掐住了喉咙。", effects: { reputation: 8, attrs: { tackle: 1 } } },
        fail: { text: "对方核心一个变向把你过了，好在队友补了过来。你喘了口气，肺里火辣辣的。", effects: { stamina: -5 } }
      }
    ],
    result: {
      bigwin: { text: "大胜新月，闯入四强。那个门将走过你身边，拍了拍你的肩：「决赛见。」语气里没有不服，只有敬意。", effects: { reputation: 12, bonds: { canglan: 12 }, flags: { keySuccess: true } } },
      win:     { text: "险胜，晋级四强。更衣室里二十多个人吼成一团。范志贵把你抱起来，差点摔了。", effects: { reputation: 8 } },
      draw:    { text: "战平，加时，点球大战。你顶着压力罚进关键一球，赢了。腿软得几乎站不住。", effects: { reputation: 5, stamina: -8 } },
      lose:    { text: "八强，到头了。那个门将走过来，把你扶起来，什么都没说，只是拍了拍你的背。", effects: { reputation: -5, stamina: -6, demonValue: 6 }, next: "ch13_eliminated" }
    },
    next: "ch13_end"
  },

  // 淘汰赛出局（1/8或1/4决赛输球 → 止步，不进入半决赛）
  {
    id: "ch13_eliminated",
    chapter: 13,
    text: [
      "世青赛，止步了。更衣室里没人说话，只有淋浴间的水声一阵一阵地响。你坐在长凳上，球衣湿透了，贴在背上，凉得发抖。",
      "沈祥收战术本的时候从你面前经过，停了半步。他没安慰你，只说了一句：「记住今天这个滋味。下次，别让自己再尝一遍。」然后他走了。",
      "回程的飞机上，你望着舷窗外的云海，很久没说话。世青赛的草皮，对手的庆祝，自己膝盖上的擦伤——这些都会记很久。但路还长。下一站，是职业赛场更高的山。"
    ],
    system: "【世青赛·淘汰赛止步。接下来：第十六章·巅峰·抉择。】",
    effects: { chapter: 3 },
    next: "ch16_opening"
  },

  // 章末 → 第十四章《世青赛·半决赛》
  {
    id: "ch13_end",
    chapter: 13,
    text: [
      "四强了。你站在球场中央，向看台上那片红色鞠躬。他们喊你的名字，喊得声嘶力竭。",
      "更衣室里，沈祥难得地让人放了音乐。范志贵跟着节奏扭，扭得很难看，大家都笑了。笑着笑着，有人眼眶红了。",
      "下一场，是半决赛。再赢两场，就是世界冠军。你握了握拳，掌心里全是汗。"
    ],
    system: "【第十三章·世青赛·淘汰赛 完。晋级四强。接下来：第十四章·世青赛·半决赛。】",
    effects: { chapter: 1 },
    next: "ch14_opening"
  }

] };
