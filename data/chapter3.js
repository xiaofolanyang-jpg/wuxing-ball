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
      "伤愈复出三个月。这三个月里你每天最早到训练场，草皮上还挂着露水的时候就开始颠球，直到脚背磨出新的茧。",
      "教练办公室的门没关严，里头飘出茶叶和旧球鞋混在一起的气味。他把你叫进去，没急着说话，先给你倒了杯水。",
      "「省赛的通知下来了。」他把报名名单推过来，手指点了点其中一个名字，「赵凛，东城实验。」顿了一下，又补了句，「你俩那笔账……该上球场算了。」"
    ],
    system: "【第三章·省赛 开启。有些账，只能在草皮上算清。】",
    next: "ch3_league_1"
  },

  // 小组赛首战（比赛）
  {
    id: "ch3_league_1",
    chapter: 3,
    type: "match",
    text: "省赛小组赛首轮，城南体校。更衣室里弥漫着跌打酒的味道，教练把首发名单往墙上一拍：「开门红，别想太多，把平时练的拿出来就行。」你系紧鞋带，脚背上的伤疤隐隐发痒。",
    opponent: { name: "城南体校", element: "水", strength: 32 },
    fallback_choices: [
      { id: "A", sit: "attack", text: "接球转身，不犹豫，直接起脚", check: { attrs: ["shooting", "burst"], difficulty: 38, tag: "射门+爆发" },
        success: { text: "转身那一下脚背吃准了部位，{elementAdj}的抽射带着草皮碎屑飞进球网。干脆。", effects: { reputation: 10, goals: 1, attrs: { shooting: 1 } } },
        fail: { text: "起脚慢了半拍，回防的后卫把身体横过来，球砸在他小腿上弹出去。", effects: { stamina: -5 } },
        critical: { text: "【灵光一闪】省赛第一脚就进了。看台上的声浪涌过来，你只是攥了攥拳头。", effects: { reputation: 16, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "不贪功，直塞找插上的队友", check: { attrs: ["passing", "vision"], difficulty: 35, tag: "传球+视野" },
        success: { text: "你余光扫到队友的跑位，{elementAdj}的直塞从两人缝隙里穿过去，他单刀，没浪费。", effects: { reputation: 8, assists: 1, attrs: { passing: 1 } } },
        fail: { text: "传球线路太直，对方后腰伸脚一挡，球权易手。", effects: { stamina: -4 } }
      },
      { id: "C", sit: "defense", text: "先落位回防，把后场站稳", check: { attrs: ["tackle", "positioning"], difficulty: 30, tag: "铲断+站位" },
        success: { text: "禁区前沿，你卡住身位，一脚干净的铲断把球捅出去。没有多余动作。", effects: { reputation: 5, attrs: { tackle: 1 } } },
        fail: { text: "回防时重心偏高，对方一个沉肩就把你晃开了半个身位。", effects: { stamina: -5 } }
      }
    ],
    result: {
      bigwin: { text: "大胜。终场哨响的时候看台上已经有人在喊你的名字了。你假装没听见，去跟队友击掌。", effects: { reputation: 10 } },
      win:     { text: "小胜。教练在场边点了点头，没多说什么。这就够了。", effects: { reputation: 6 } },
      draw:    { text: "平局。下场的时候腿有点沉，配合还是生涩，得磨。", effects: { reputation: 2 } },
      lose:    { text: "首战输了。更衣室安静得只剩拧毛巾的声音。没人说话，也不需要说话。", effects: { reputation: -3, stamina: -5 } }
    },
    next: "ch3_train"
  },

  // 赛前集训（修炼）
  {
    id: "ch3_train",
    chapter: 3,
    type: "train",
    text: "宿敌对决前两天，球队封闭集训。傍晚的球场灯光把影子拉得很长，你一个人留在训练场加练任意球，脚背抽了又抽，直到小腿肌肉开始发酸。赵凛不好对付，你心里清楚。多练一脚，到时候就多一分底气。夜里回到宿舍，你把灵力一遍遍压进经脉，窗外有虫鸣。",
    next: "ch3_rival_match"
  },

  // 宿敌对决（比赛·赵凛·水灵根 → 触发既生瑜何生亮+水火不容羁绊）
  {
    id: "ch3_rival_match",
    chapter: 3,
    type: "match",
    text: "省赛半决赛。你站在中圈等开球的时候，隔着四十米看见赵凛在对面活动脚踝。他没看你，但你知道他在看你。三个月了。他嘴角动了一下，像是说了句什么。后来你才知道那是：「等你很久了。」哨响。",
    opponent: { name: "东城实验·赵凛", element: "水", strength: 48 },
    fallback_choices: [
      { id: "A", sit: "attack", text: "不绕路，正面起脚", check: { attrs: ["shooting", "resolve"], difficulty: 45, tag: "射门+决断" },
        success: { text: "你{elementAdj}地拔脚，球从赵凛伸出的腿边擦过去，砸进网窝。他没回头，但你看见他肩膀绷紧了。", effects: { reputation: 14, goals: 1, attrs: { shooting: 1 } } },
        fail: { text: "赵凛的预判比你快半步，腿一伸，球弹出去。他甚至没看你一眼。", effects: { stamina: -6 } },
        critical: { text: "【灵光一闪】球进了。全场炸了。赵凛站在原地，脸色很难看，但他鼓了两下掌。", effects: { reputation: 22, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "把赵凛引过来，分球给空位的队友", check: { attrs: ["passing", "vision"], difficulty: 40, tag: "传球+视野" },
        success: { text: "赵凛果然上抢，你等的就是这个。脚腕一抖，球到了无人盯防的队友脚下，他笑纳了。", effects: { reputation: 10, assists: 1, attrs: { passing: 1 } } },
        fail: { text: "赵凛没上抢。他卡住了传球线路，像早就知道你要往哪送。", effects: { stamina: -5 } }
      },
      { id: "C", sit: "defense", text: "贴住赵凛，不让他舒服拿球", check: { attrs: ["tackle", "strength"], difficulty: 42, tag: "铲断+对抗" },
        success: { text: "你全场贴着赵凛，肩膀挨着肩膀。他拿不到舒服的球，越踢越躁。", effects: { reputation: 8, attrs: { tackle: 1 } } },
        fail: { text: "赵凛一个沉肩变向，你重心跟丢了。他头也不回地往前带。", effects: { stamina: -6 } }
      }
    ],
    result: {
      bigwin: { text: "大胜。赵凛走过来的时候你以为他要握手，他只是盯着你看了两秒：「没完。」然后转身走了。", effects: { reputation: 16, flags: { keySuccess: true } } },
      win:     { text: "赢了。赵凛一句话没说，把护腿板塞进包里，拉链拉得很快。", effects: { reputation: 10 } },
      draw:    { text: "平局。赵凛擦着汗经过你身边，语气很平：「你还是赢不了我。」", effects: { reputation: 4 } },
      lose:    { text: "输了。赵凛没有庆祝，只是走过你身边时停了半步：「你变弱了。」那三个字比输球本身更扎人。", effects: { reputation: -5, stamina: -6, demonValue: 5 } }
    },
    next: "ch3_coach_talk"
  },

  // 队长袖标（选择）
  {
    id: "ch3_coach_talk",
    chapter: 3,
    text: [
      "决赛前夜。教练办公室的灯亮到很晚，你路过的时候他把你叫住了。桌上摊着明天的战术图，茶杯里的水已经凉透。",
      "他没绕弯子：「袖标的事，我想了很久。」停了一下，像是在斟酌措辞，「我想给你。但你别急着答应，先告诉我你自己怎么想。」"
    ],
    choices: [
      { id: "A", text: "接过来。这帮人，我来带", effects: { reputation: 8, attrs: { resolve: 2 }, flags: { captain: true } }, next: "ch3_exam" },
      { id: "B", text: "算了，我就想安心踢球", effects: { reputation: 3, attrs: { iq: 2 } }, next: "ch3_exam" }
    ]
  },

  // 决赛（比赛）
  {
    id: "ch3_exam",
    chapter: 3,
    type: "match",
    text: "省赛决赛，北门体校。卫冕冠军，后防线跟铁浇的似的。你站在球员通道里，前面是队友的后脑勺，空气里全是汗味和草皮被太阳晒过的气息。看台上各地球探的笔记本已经翻开了。你深吸一口气，鞋钉踩上草皮的那一刻，心反而静了。",
    opponent: { name: "北门体校", element: "金", strength: 44 },
    fallback_choices: [
      { id: "A", sit: "attack", text: "禁区前沿，抡一脚", check: { attrs: ["shooting", "power"], difficulty: 43, tag: "射门+力量" },
        success: { text: "脚背抽实了，{elementAdj}的远射从人缝里钻过去，门将扑了个空。", effects: { reputation: 13, goals: 1, attrs: { shooting: 1 } } },
        fail: { text: "球打在防守队员身上，链式防守不是白叫的。", effects: { stamina: -5 } },
        critical: { text: "【灵光一闪】那脚远射后来被剪进了集锦。你只记得触球那一下，脚背发麻。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "不急，跟队友打配合渗透", check: { attrs: ["passing", "iq"], difficulty: 38, tag: "传球+球商" },
        success: { text: "三传两倒，防线被扯开一条缝，队友心领神会插上去，进了。", effects: { reputation: 9, assists: 1, attrs: { passing: 1 } } },
        fail: { text: "传了四脚，第五脚被断了。人家的站位确实密。", effects: { stamina: -4 } }
      },
      { id: "C", sit: "defense", text: "先守住，机会会来的", check: { attrs: ["positioning", "balance"], difficulty: 32, tag: "站位+平衡" },
        success: { text: "你指挥后防线保持间距，没给对方任何舒服的起脚空间。稳。", effects: { reputation: 6, attrs: { positioning: 1 } } },
        fail: { text: "走神了一瞬，对方前锋差点捅到球。你骂了自己一句。", effects: { stamina: -5 } }
      }
    ],
    result: {
      bigwin: { text: "大胜卫冕冠军。颁奖的时候你站在台上，腿还在抖，但嘴角压不住。MVP，实至名归。", effects: { reputation: 18, flags: { keySuccess: true, provincialChamp: true } } },
      win:     { text: "冠军。奖杯递到手里的时候你愣了一下，比想象中沉。", effects: { reputation: 12, flags: { provincialChamp: true } } },
      draw:    { text: "平局。冠军归属还没定，你坐在更衣室里盯着鞋钉上的泥发呆。", effects: { reputation: 6 } },
      lose:    { text: "决赛输了。你坐在草皮上没起来，膝盖上的擦伤火辣辣的。差一口气。", effects: { reputation: -4, stamina: -6 } }
    },
    next: "ch3_vacation"
  },

  // 假期抉择（选择）
  {
    id: "ch3_vacation",
    chapter: 3,
    text: "赛季结束了。训练场空下来之后反而不习惯，耳朵里少了哨声和喊叫声，安静得有点慌。假期不长，你打算怎么过。",
    choices: [
      { id: "A", text: "哪也不去，留在俱乐部加练", effects: { stamina: -15, attrs: { resolve: 2, shooting: 1 } }, next: "ch3_end" },
      { id: "B", text: "回青云城，去蹴鞠庙坐坐", effects: { stamina: 20, attrs: { pressure: 2 }, demonValue: -10 }, next: "ch3_end" },
      { id: "C", text: "找份短工，赚点灵石寄回家", effects: { spiritStones: 30, stamina: -10, attrs: { pressure: 1 } }, next: "ch3_end" }
    ]
  },

  // 章末结算 → 跳转第四章《学院大比·组队》
  {
    id: "ch3_end",
    chapter: 3,
    text: [
      "省赛结束了。领奖台上的照片后来你看了很多遍，每次都觉得自己的表情有点傻。",
      "回到更衣室，教练从抽屉里摸出一份烫金请柬，随手递给你，语气跟递瓶水似的：「学院大比，全国八所学院的尖子都去。那才是真正踢球的地方。」他顿了顿，「去吧。」"
    ],
    system: "【第三章·省赛 完。接下来：第四章·学院大比·组队。】",
    effects: { chapter: 1, age: 1 },
    next: "ch4_opening"
  }

] };
