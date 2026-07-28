/* data/chapter16.js — 第十六章《巅峰·抉择》（20-21岁·职业巅峰）
 * 事件链：声名大噪 → 去向抉择 → 商业与训练(抉择) → 境界突破(通脉→化域) → 巅峰联赛(比赛) → 宿敌终极对决(武石·羁绊圆满) → 章末
 * 说明：世青赛后职业巅峰。境界突破给予大幅属性跃升，为"化域/天人合一"判定铺路。
 *       宿敌对决推进武石羁绊至满。章末 age+1（20→21）。
 *       扩写：补商业代言vs专注训练线、巅峰联赛一场（展示统治力）。
 *       注：淘汰赛出局者经 ch13/ch14_eliminated 直达本章 opening。
 */
window.CHAPTER16 = { events: [

  // 开场：声名大噪
  {
    id: "ch16_opening",
    chapter: 16,
    text: [
      "世青赛归来，你成了整个东方古国最炙手可热的名字。机场的闪光灯，街头的广告牌，电视里循环播放的进球集锦——一夜之间，全世界都知道了你。",
      "桌上摊着十几份邀约。顶级豪门的转会函，国家队的长期征召，赞助商的代言合同。孙德斯戴着老花镜一封封看，剥薄荷糖的手都慢了半拍。",
      "「世青赛冠军，」他摘下眼镜，看着你，「这是你最大的筹码。但记住，筹码不是用来挥霍的。下一步走对了，你才是真的强。」"
    ],
    system: "【第十六章·巅峰·抉择 开启。巅峰之上，每一步都是抉择。】",
    next: "ch16_contract"
  },

  // 去向抉择（职业生涯下一步）
  {
    id: "ch16_contract",
    chapter: 16,
    text: [
      "三份邀约，三条路。你一份份翻过：",
      "顶级豪门·星辉联——天价转会费，铜版纸烫金字。世界足坛最高的舞台，巨星云集，但主力位置要自己抢；",
      "留队冲冠——现俱乐部开出的续约合同，承诺以你为核心，冲击联赛冠军。稳定，熟悉，卢卡他们都在；",
      "回国效力——母队青云竞技的召唤，A4纸，打印的。球迷在官网留言：回家。一城一队，一生。"
    ],
    choices: [
      { id: "A", text: "转会星辉联：去最高的舞台，跟最强的过招", effects: { reputation: 12, spiritStones: 40, attrs: { resolve: 1 }, flags: { clubStar: true } }, next: "ch16_commercial" },
      { id: "B", text: "留队冲冠：把熟悉的球队，带成冠军", effects: { reputation: 8, spiritStones: 25, bonds: { agui: 5 }, attrs: { iq: 1 } }, next: "ch16_commercial" },
      { id: "C", text: "回国效力：把最好的年华，留给家乡", effects: { reputation: 5, bonds: { agui: 12 }, attrs: { pressure: 1 } }, next: "ch16_commercial" }
    ]
  },

  // 商业与训练（名利与专注的抉择）
  {
    id: "ch16_commercial",
    chapter: 16,
    text: [
      "名气带来的不只是合同，还有代言。孙德斯拿来一份天价代言——拍广告，走通告，出席活动。灵石管够，数字看得人心跳。",
      "代价写在日程表上：训练时间被切成碎片，上午片场，下午发布会，留给球场的，只剩清晨和深夜。镜子里的你，眼下已经有了青黑。",
      "孙德斯把笔递给你：「接不接，你定。钱是好东西，但你的脚，比钱金贵。」"
    ],
    system: "【名利与专注。你选的，不只是钱。】",
    choices: [
      { id: "A", text: "接下代言：商业价值，也是实力的一部分", effects: { spiritStones: 50, reputation: 6, stamina: -8, demonValue: 4 }, next: "ch16_breakthrough" },
      { id: "B", text: "只留一个，其余婉拒：球场才是根本", check: { attrs: ["resolve", "pressure"], difficulty: 42, tag: "决断+抗压" }, next: "ch16_breakthrough",
        success: { text: "你推掉了大半通告，只留了一个不影响训练的代言。经纪人起初不满，后来也服了——你的状态，比什么都硬。自律，本身就是一种强大。", effects: { reputation: 5, attrs: { resolve: 2, shooting: 1 }, demonValue: -4 } },
        fail: { text: "你婉拒得太急，得罪了几家赞助商。舆论说你「耍大牌」。你笑笑，没解释。", effects: { reputation: -2, demonValue: 3 } }
      },
      { id: "C", text: "全推掉：眼里，只有球", effects: { attrs: { shooting: 2, resolve: 1 }, reputation: -2, demonValue: -6 }, next: "ch16_breakthrough" }
    ]
  },

  // 境界突破（通脉→化域，属性跃升）
  {
    id: "ch16_breakthrough",
    chapter: 16,
    text: [
      "某个深夜。加练到力竭。你仰面倒在草皮上，后背贴着冰凉的露水，胸腔像风箱一样起伏。",
      "恍惚间，体内有什么东西在动。金木水火土，五行之力在四肢百骸中奔流、碰撞。世青赛那些生死时刻攒下的东西，正在经脉里发酵。",
      "你听见了「脉」的声音。像冰层下的河水，在松动。通脉境的壁垒之上，化域的门，露出了一道光。"
    ],
    system: "【境界突破契机：通脉→化域。你的选择，将决定突破的方向。】",
    choices: [
      { id: "A", text: "孤注一掷：冲击最强一项，直叩化域", check: { attrs: ["resolve"], difficulty: 46, tag: "决断" }, next: "ch16_league",
        success: { text: "你引灵力冲击最强一脉。疼。像有人拿锤子从里面敲你的骨头。然后——通了。化域境。你的招牌技艺，从此登峰造极。", effects: { reputation: 12, attrs: { shooting: 8, resolve: 3 } } },
        fail: { text: "冲击过猛。灵力反噬，你嘴角溢出血丝，倒在草皮上。没通。但化域的门槛，你摸到了。", effects: { stamina: -15, attrs: { shooting: 3 }, demonValue: 5 } },
        critical: { text: "【灵光一闪】五行之力如江河归海，一脉贯通，百脉俱开。你从草皮上坐起来时，浑身在发抖。不只是化域——你隐隐触到了天人合一的边缘。", effects: { reputation: 22, attrs: { shooting: 10, resolve: 5, speed: 3 }, flags: { keySuccess: true } } }
      },
      { id: "B", text: "水到渠成：五行均衡，缓缓图之", check: { attrs: ["iq", "rhythm"], difficulty: 42, tag: "球商+节奏" }, next: "ch16_league",
        success: { text: "你不急。五行相生，一点一点引导。像溪水绕石头，不急，但不停。某天清晨醒来，经脉通了。化域境。稳。", effects: { reputation: 9, attrs: { passing: 5, iq: 3, rhythm: 3 } } },
        fail: { text: "进境慢。差一口气。那口气，怎么都咽不下去。", effects: { attrs: { passing: 2, iq: 1 } } }
      },
      { id: "C", text: "以战代练：把突破留到赛场上", check: { attrs: ["pressure", "stamina"], difficulty: 44, tag: "抗压+耐力" }, next: "ch16_league",
        success: { text: "你把突破的渴望压进每一场比赛。高压之下，经脉在实战中轰然贯通。化域境。", effects: { reputation: 10, attrs: { pressure: 4, shooting: 4 } } },
        fail: { text: "以战代练，风险极大。一场硬仗后膝盖旧伤复发，你咬着牙踢完了最后十分钟。", effects: { stamina: -12, demonValue: 4 } }
      }
    ]
  },

  // 巅峰联赛（比赛·统治力展示）
  {
    id: "ch16_league",
    chapter: 16,
    type: "match",
    text: [
      "化域境之后，联赛忽然变得不一样了。从前要拼尽全力的球，如今游刃有余。你的跑位、起脚、阅读比赛，都上了一个台阶。",
      "这场联赛，对手是支劲旅，赛前放话要给你好看。可开场二十分钟，他们发现，今天的你，跟传闻里那个世青赛冠军，又不是一个级别了。",
      "看台上，球迷举着你的球衣。你站在中圈，环顾四周。巅峰的感觉，原来是这样——风很大，但站得很稳。"
    ],
    opponent: { name: "职业联赛·挑战者", element: "木", strength: 60 },
    teamBase: 38,
    fallback_choices: [
      { id: "A", sit: "attack", text: "用一记世界波，宣告巅峰", check: { attrs: ["shooting", "resolve"], difficulty: 50, tag: "射门+决断" },
        success: { text: "禁区外，你{elementAdj}地起脚。球划出一道弧线，越过门将的指尖，砸进死角。世界波。全场沸腾。你张开双臂，享受这一刻。", effects: { reputation: 16, goals: 1, attrs: { shooting: 1 } } },
        fail: { text: "射门擦着立柱飞出。差了一点。你笑了笑，巅峰也有失手的时候。", effects: { stamina: -5 } },
        critical: { text: "【灵光一闪】你上演帽子戏法，每一球都进得无可挑剔。第三个球进的时候，对手门将摇了摇头，笑了——那是心服口服的笑。", effects: { reputation: 26, goals: 3, attrs: { shooting: 2, resolve: 1 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "用传球调度，掌控全场", check: { attrs: ["passing", "vision"], difficulty: 46, tag: "传球+视野" },
        success: { text: "你回撤拿球，一脚长传转移，一脚直塞穿透。整个进攻由你调度。两个助攻，队友吃饼吃到饱。这才是化域境的视野。", effects: { reputation: 11, assists: 2, attrs: { passing: 1 } } },
        fail: { text: "一脚直塞被对手预判拦截。巅峰的你，偶尔也会被人读懂。", effects: { stamina: -4 } }
      },
      { id: "C", sit: "defense", text: "收着踢，把胜利稳稳拿在手里", check: { attrs: ["positioning", "pressure"], difficulty: 42, tag: "站位+抗压" },
        success: { text: "大局已定，你收着踢，控制节奏，没给对手任何翻盘的机会。终场哨响，一场兵不血刃的胜利。", effects: { reputation: 8, attrs: { positioning: 1 } } },
        fail: { text: "收得太松，对手扳回一球。教练在场边喊你集中。你点点头，重新绷紧。", effects: { stamina: -4 } }
      }
    ],
    result: {
      bigwin: { text: "一场大胜。赛后评分，你拿了满分。记者问你怎么做到的。你想了想：「就是……踢得明白了。」巅峰之上，你看得更远了。", effects: { reputation: 13, flags: { keySuccess: true } } },
      win:     { text: "赢了。你走在球员通道里，掌声还没停。这就是巅峰的日常。", effects: { reputation: 9 } },
      draw:    { text: "战平。不算你最好的发挥。但你清楚，状态这东西，有起伏。", effects: { reputation: 4 } },
      lose:    { text: "爆了个冷门，输了。舆论立刻有了声音：「他是不是到顶了？」你关掉手机，没理会。", effects: { reputation: -3, stamina: -5, demonValue: 4 } }
    },
    next: "ch16_rival"
  },

  // 宿敌终极对决（武石·羁绊圆满）
  {
    id: "ch16_rival",
    chapter: 16,
    type: "match",
    text: [
      "职业联赛，天王山之战。你与武石，终于在职业赛场上正面相遇。从青训到省赛，从大比到世青赛，你们纠缠了太多年。",
      "赛前通道里，你们并肩站着。谁都没说话。不需要。该说的，早就说完了。",
      "他忽然开口，声音很轻，像是说给自己听：「赢的人，才有资格说最强。」然后他走了。你看着他的背影，系紧了鞋带。"
    ],
    opponent: { name: "职业联赛·武石", element: "水", strength: 64 },
    teamBase: 37,
    fallback_choices: [
      { id: "A", sit: "attack", text: "巅峰对决，一剑封喉", check: { attrs: ["shooting", "resolve"], difficulty: 50, tag: "射门+决断" },
        success: { text: "决胜时刻，你{elementAdj}地一脚爆射。武石扑了，指尖擦过球皮。没够到。球进了。他跪在草皮上，看了你一眼。没说话。", effects: { reputation: 16, goals: 1, bonds: { zhaolin: 20 }, attrs: { shooting: 1 } } },
        fail: { text: "武石预判了你的射门方向。球被他一掌拍出去。他站起来，拍了拍手套上的草屑。", effects: { stamina: -7 } },
        critical: { text: "【灵光一闪】你在武石面前轰出职业生涯最伟大的一球。他望着网窝里的球，笑了。第一次在赛场上对你笑：「不愧是你。暂时——是你。」", effects: { reputation: 28, goals: 1, bonds: { zhaolin: 25 }, attrs: { shooting: 2, resolve: 1 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "用团队碾过他", check: { attrs: ["passing", "vision"], difficulty: 46, tag: "传球+视野" },
        success: { text: "你串联全队，三脚传递撕开武石的防线。助攻队友推射入网。武石站在门线前，看着球滚过去，没动。", effects: { reputation: 11, assists: 1, bonds: { zhaolin: 15 }, attrs: { passing: 1 } } },
        fail: { text: "武石看穿你的意图，提前半步拦截。他断球后看了你一眼，那眼神像在说：我认识你。", effects: { stamina: -6 } }
      },
      { id: "C", sit: "defense", text: "冻结他，让他尝尝被支配的滋味", check: { attrs: ["tackle", "pressure"], difficulty: 48, tag: "铲断+抗压" },
        success: { text: "你全场贴着武石，不给他转身的空间。终场时他弯着腰喘气，第一次在赛场上这么狼狈。", effects: { reputation: 9, bonds: { zhaolin: 12 }, attrs: { tackle: 1 } } },
        fail: { text: "武石一个变向晃开你。你的脚踝扭了一下，他已经在三米外了。", effects: { stamina: -7 } }
      }
    ],
    result: {
      bigwin: { text: "天王山之战大胜。赛后武石走过来，脱下球衣递给你。你接过。他说了两个字：「下次。」然后转身走了。【宿敌羁绊·圆满】", effects: { reputation: 14, bonds: { zhaolin: 20 }, flags: { keySuccess: true } } },
      win:     { text: "险胜。武石与你交换球衣。一言不发。但他递球衣时，手指停了一秒。那是敬意。【宿敌羁绊·圆满】", effects: { reputation: 10, bonds: { zhaolin: 15 } } },
      draw:    { text: "鏖战成和。武石冷笑了一下：「下次。」他总说下次。你们交换球衣，谁也没服谁。", effects: { reputation: 4, bonds: { zhaolin: 10 } } },
      lose:    { text: "你输了。武石从你身边走过，没停。只留下一句：「最强。是我。」", effects: { reputation: -5, stamina: -7, demonValue: 6 } }
    },
    next: "ch16_end"
  },

  // 章末 → 第十七章《风暴·心魔》
  {
    id: "ch16_end",
    chapter: 16,
    text: [
      "巅峰之上，风更冷。你站在职业生涯的最高处，奖杯、鲜花、掌声，应有尽有。可只有你知道，每个深夜，膝盖的旧伤都在隐隐作痛。",
      "舆论开始盯着你的一举一动。一场没踢好，质疑就铺天盖地。赞助商的通告排到深夜。你像被架在火上烤。",
      "二十一岁。你站在命运最大的岔路口。伤病、名利、心魔，都在暗处等着。下一步，是登顶，还是坠落。"
    ],
    system: "【第十六章·巅峰·抉择 完。接下来：第十七章·风暴·心魔。】",
    effects: { chapter: 1, age: 1 },
    next: "ch17_opening"
  }

] };
