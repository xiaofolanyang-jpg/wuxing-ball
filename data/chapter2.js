/* data/chapter2.js — 第二章《崭露》职业初期 17-19岁
 * 事件链：一线队报到 → 首秀 → 联赛 → 转会抉择 → 天劫(连续3检定) → 结局判定
 */
window.CHAPTER2 = { events: [

  // 开场
  {
    id: "ch2_opening",
    chapter: 2,
    text: [
      "三年。青云城的雪化了又落，落了又化。你膝盖上的疤叠了三层。",
      "你站在一线队更衣室门口，手搭在门把上，没马上推。里头一股子汗味、膏药味、湿球衣沤在一起的酸味。号衣上的号码比青训时沉——不是重量，是分量。教练路过，拍了下你后脑勺：「今天大名单有你。首发还是替补……看你造化。」",
      "你推门进去。几个老队员扭头看了你一眼，目光不重，但你接住了。有审视，也有那么点……期待。"
    ],
    system: "【第二章·崭露 开启。职业联赛的淬炼，从这里真正开始。】",
    next: "ch2_debut"
  },

  // 首秀（比赛，fallback 简化）
  {
    id: "ch2_debut",
    chapter: 2,
    type: "match",
    text: "首秀。对手是同城中游球队「沧澜竞技」二队。你坐在替补席上，屁股底下的塑料椅冰凉的。下半场第三十分钟，教练走过来，手搭你肩上，捏了捏：「上去。让他们记住你。」你站起来，腿有点僵。",
    opponent: { name: "沧澜竞技B队", element: "水", strength: 42 },
    pool: null,
    fallback_choices: [
      { id: "A", sit: "attack", text: "拿球，内切，起脚", check: { attrs: ["shooting", "burst"], difficulty: 38, tag: "射门+爆发" },
        success: { text: "你接球那一下，脚背触到皮球的触感跟青训时不一样——沉，实。你内切一步，抡腿。{elementAdj}的劲道从脚背传过去，球轰进网窝。看台上有人喊了声什么。你愣了两秒才反应过来——进了。首秀。", effects: { reputation: 10, goals: 1, attrs: { shooting: 1 } } },
        fail: { text: "你内切起脚，脚背吃准了，可门将反应更快，指尖一拨，球擦着横梁飞了。你站在原地，胸口起伏，手心全是汗。", effects: { stamina: -5 } },
        critical: { text: "【灵光一闪】你接球，没停，直接内切一步抡腿。皮球带着{elementAdj}的弧线，从门将指尖上方钻进去。世界波。解说席上有人站起来了：「一颗新星……正在升起。」", effects: { reputation: 18, goals: 1, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "为队友做球", check: { attrs: ["passing", "vision"], difficulty: 36, tag: "传球+视野" },
        success: { text: "你没贪。余光扫到队友的跑位，脚弓一推，{elementAdj}的直塞贴着草皮穿过去。队友迎球推射，进了。他跑过来搂你脖子——首秀，助攻。", effects: { reputation: 7, assists: 1, attrs: { passing: 1 } } },
        fail: { text: "你想塞个直塞，可线路太正，对方后腰伸脚一挡。球断了。你咬了咬牙，回追。", effects: { stamina: -4 } }
      }
    ],
    result: {
      bigwin: { text: "首秀，大胜。赛后话筒怼到你嘴边，你说了句什么，自己都没听清。第二天体育版有你名字。", effects: { reputation: 10 } },
      win:     { text: "首秀，小胜。你坐在更衣室拆绷带，教练路过，点了下头：「有点意思。」就走了。你笑了。", effects: { reputation: 5 } },
      draw:    { text: "平局。首秀中规中矩，没丢人。你冲完澡，水还是热的，心里说不上什么滋味。", effects: { reputation: 2 } },
      lose:    { text: "输了。你坐在更衣室，鞋带都没解。旁边老队员叹了口气，拍了拍你后背，没说话。", effects: { reputation: -2, stamina: -5 } }
    },
    next: "ch2_sub_bench"
  },

  // 替补席煎熬
  {
    id: "ch2_sub_bench",
    chapter: 2,
    text: [
      "首秀之后，你并没站稳。替补席的木板比草皮凉，你坐着，看场上的人跑。看台上的灯一盏盏亮起来，不是为你亮的。",
      "赵凛在一线队混得风生水起，场场首发。你坐在场边看他进球，看全队围上去。你把水瓶盖拧开又拧上，拧开又拧上。然后起身，去加练。"
    ],
    choices: [
      { id: "A", text: "加练，用汗水换机会", effects: { stamina: -10, attrs: { resolve: 2 }, reputation: 3 }, next: "ch2_league" },
      { id: "B", text: "找教练理论，要出场时间", check: { attrs: ["resolve", "iq"], difficulty: 30, tag: "决断+球商" },
        success: { text: "你敲了教练办公室的门。说了什么你自己都记不全了，反正说完他看了你半天，点了下头：「下一场，首发。」", effects: { reputation: 4, flags: { startingSpot: true } } },
        fail: { text: "教练连头都没抬：「上场靠表现，不靠嘴。」你站在门口，嘴张了张，没再说话。门带上了。", effects: { reputation: -2 } },
        critical: { text: "【灵光一闪】你没喊，没闹。你拿数据说话——跑动距离、传球成功率、对抗胜率。教练翻着翻着，笔停了。他抬头看你：「下一场，你上。」", effects: { reputation: 8, flags: { startingSpot: true } } },
        next: "ch2_league"
      }
    ]
  },

  // 正式联赛（使用踢法池）
  {
    id: "ch2_league",
    chapter: 2,
    type: "match",
    text: "正式联赛，首发。对手是联赛榜首豪门「金阙FC」二队，钢铁防线，联赛失球最少。你踩上草皮的那一刻，鞋底陷进去半寸，湿的。对面后卫线站成一排，肩膀都比你宽。你咽了口唾沫。",
    opponent: { name: "金阙FC二队", element: "金", strength: 48 },
    fallback_choices: [
      { id: "A", sit: "attack", text: "禁区前沿，抡腿远射", check: { attrs: ["shooting", "power"], difficulty: 44, tag: "射门+力量" },
        success: { text: "你带了两步，抬头看了一眼——防线密得像墙。你没犹豫，抡腿。脚背撞上皮球那一下，震得脚踝发麻。{elementAdj}的弧线从人缝里钻过去，轰穿了。铁壁。你愣了一秒，然后跑。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
        fail: { text: "你起脚了，可金阙的后卫像长了预判，伸脚一挡，球弹回来砸在你小腿上。疼。链式防守，名不虚传。", effects: { stamina: -5 } },
        critical: { text: "【灵光一闪】你带了两步，没看，直接抡。脚背吃准了部位，{elementAdj}的力道全灌进去了。球从三个人中间穿过去，门将扑了个空。解说席炸了：「连金阙的防线都挡不住！」", effects: { reputation: 20, goals: 1, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "肋部直塞，找前锋", check: { attrs: ["passing", "vision"], difficulty: 40, tag: "传球+视野" },
        success: { text: "你看到了。肋部，后卫和中卫之间，半米宽的缝。你脚弓一推，{elementAdj}的直塞贴着草皮穿过去。前锋心领神会，迎球推射。进了。他朝你指了指。", effects: { reputation: 9, assists: 1, attrs: { passing: 1 } } },
        fail: { text: "你塞了，可金阙后腰像蹲在那儿等你似的，伸脚一拦。球断了。他连看都没看你一眼。", effects: { stamina: -4 } }
      },
      { id: "C", sit: "defense", text: "回防协助，先稳后场", check: { attrs: ["tackle", "intercept"], difficulty: 42, tag: "铲断+拦截" },
        success: { text: "你回追了三十米，肺在烧。卡住身位，肩膀顶上去，脚下一勾——断了。干净。你趴在地上喘了半天，看台上有人鼓掌。", effects: { reputation: 6, attrs: { tackle: 1 } } },
        fail: { text: "你回防，可对方前锋壮你一圈，肩膀一撞，你飞了。球没断着，人先倒了。", effects: { stamina: -6 } }
      }
    ],
    result: {
      bigwin: { text: "掀翻榜首。终场哨响的时候你腿都软了，蹲在草皮上。第二天体育版头条，你的名字。第一次。", effects: { reputation: 14, flags: { keySuccess: true } } },
      win:     { text: "小胜豪门。你冲完澡出来，发现更衣室门口多了两个陌生面孔——球探。他们朝你点了点头。", effects: { reputation: 8 } },
      draw:    { text: "逼平豪门。不算赢，但你踢得不差。回去的大巴上，有人拍你肩膀说了句「不错」。", effects: { reputation: 4 } },
      lose:    { text: "完败。金阙的防线把你锁死了，全场你碰球不超过十次。你坐在大巴最后一排，看着窗外，什么也不想说。", effects: { reputation: -4, stamina: -6 } }
    },
    next: "ch2_transfer"
  },

  // 转会抉择
  {
    id: "ch2_transfer",
    chapter: 2,
    text: [
      "赛季中窗。一份邀约搁在你面前——天罡联赛的「赤焰皇家」。合同纸很厚，你翻了翻，数字后头好多零。",
      "经纪人把笔递过来，指甲修得很干净：「签字，名利双收。」他顿了顿，语气松了点，「不过……那边天才如云。你去了，可能就是个号码。」",
      "母队教练也来了。他没坐，站着，手抄兜里：「留下，你是核心。」他看着你，「走了……你是谁？」"
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
      "转会风波还没落定。训练里，你落地的时候姿势歪了。膝盖传来一声脆响——不大，但你听见了。然后就站不住了。",
      "医院。消毒水味。诊断书上的字你看了三遍：韧带撕裂，赛季报销。你盯着那几行字，脑子里嗡嗡的。",
      "队医坐在旁边，面色不好看。他斟酌了半天，说了句：「这一关……熬过去，境界更进。熬不过——」他没说完，但你懂了。"
    ],
    system: "【天劫降临。连续三道关卡，以心志与属性对抗。失败越多，前程越黯淡。】",
    next: "ch2_trib_1"
  },

  // 天劫·第一关：心志
  {
    id: "ch2_trib_1",
    chapter: 2,
    text: "伤床上。你盯着天花板，数上面的裂缝。三条。膝盖裹着绷带，隐隐地疼，不是最疼的那种，是磨人的那种。夜里最难受。不是疼——是那个念头：还能不能踢了。它不喊，它就那么蹲在角落里，等你关灯。",
    choices: [
      { id: "A", text: "咬牙对抗，决意归来", check: { attrs: ["resolve", "pressure"], difficulty: 38, tag: "决断+抗压" },
        success: { text: "你没让那个念头赢。每天早起做康复，疼得冒汗，咬着毛巾不出声。康复师说你恢复得比常人快。他知道为什么——心志这东西，比药管用。", effects: { reputation: 5, attrs: { resolve: 2 } } },
        fail: { text: "那个念头赢了几天。你躺在床上一动不动，饭也不吃。康复进度落了一大截。等你再动起来的时候，腿已经僵了。", effects: { reputation: -8, attrs: { pressure: -1 }, stamina: -10 } },
        critical: { text: "【灵光一闪】你把疼当引子。每一次弯曲膝盖，每一次咬牙站起来，你都在跟那个念头说：不。有一天你忽然发现，它不说话了。你摸到了「不动如山」的门槛。", effects: { reputation: 12, attrs: { resolve: 3, pressure: 2 }, flags: { keySuccess: true } } },
        next: "ch2_trib_2"
      },
      { id: "B", text: "闭目静养，避其锋芒", effects: { reputation: -3, attrs: { resolve: 1 }, demonValue: -5, stamina: 5 }, next: "ch2_trib_2" }
    ]
  },

  // 天劫·第二关：舆论
  {
    id: "ch2_trib_2",
    chapter: 2,
    text: "伤病期间，你刷了不该刷的东西。手机屏幕上：「昙花一现？」「青训旧账翻出」「豪门退货」。评论区有人把你的名字编成了段子。你把手机扣在床头柜上，屏幕朝下。可那些字已经进去了。",
    choices: [
      { id: "A", text: "召开发布会，正面回应", check: { attrs: ["pressure", "iq"], difficulty: 40, tag: "抗压+球商" },
        success: { text: "你坐在发布会台上，话筒怼着脸。你没急，没喊，就那么平平静静地说了几句。说完，底下安静了两秒，然后有人鼓掌。风向转了。", effects: { reputation: 8, attrs: { pressure: 1 } } },
        fail: { text: "你上了台，可第三个问题就把你问住了。你嘴张了张，没说出来。第二天标题：「语塞」。评论区更热闹了。", effects: { reputation: -10, attrs: { pressure: -1 } } },
        critical: { text: "【灵光一闪】你没背稿。有人问你「是不是废了」，你笑了下，说了句话。第二天那句话被转了几万次。赛季金句。", effects: { reputation: 15, flags: { keySuccess: true } } },
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
      "夜里。你梦见矿坑了。梦见灰扑扑的土路，梦见老陈蹲在坑口抽烟的背影。梦见那个下午——破布球，土墙，你踢了一下午，天黑了都不知道。",
      "梦里头，有个声音轻轻问你。不是心魔，也不是谁。就是你自己——「你踢球，是为了什么？」"
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
      "你沉默了。那个声音也沉默了。",
      "你不知道。从矿坑边第一次踢起破布球的那天起，你就没想过这个问题。好像只是……喜欢。脚碰到球的那种喜欢。说不出为什么，也不需要为什么。",
      "你不再想了。就那么躺着，听窗外的风。不知什么时候，胸口那块堵着的东西松了。梦醒的时候，天刚亮。你神台清明，像卸了副担子。"
    ],
    system: "【触发隐藏对话：心魔值清零。你失去了一夜安眠，却换来一次难得的通透。】",
    next: "ch2_trib_3"
  },

  // 天劫·第三关：复出
  {
    id: "ch2_trib_3",
    chapter: 2,
    text: "伤愈复出。首战。对手是联赛保级队，不强。可你站在通道里，腿在抖。不是冷。是怕。膝盖上那道疤隔着绷带都在提醒你——它断过。草皮的味道飘过来，你深吸一口，踏上去了。",
    choices: [
      { id: "A", text: "复出即拼命，证明自己", check: { attrs: ["resolve", "burst"], difficulty: 42, tag: "决断+爆发" },
        success: { text: "你咬牙踢满了全场。膝盖疼，但你没停。最后一分钟，你送出一脚关键传球，队友进了。哨响的时候你蹲在地上，不是累——是如释重负。过了。", effects: { reputation: 10, attrs: { resolve: 1, burst: 1 } } },
        fail: { text: "你跟不上。节奏太快了，腿像灌了铅。半场，教练把你换下来了。你坐在替补席上，膝盖隐隐地疼。那道疤还在。", effects: { reputation: -8, stamina: -8 } },
        critical: { text: "【灵光一闪】读秒。你接到球，没想，抡腿。脚背吃准了部位，膝盖没疼——那一瞬间你忘了它断过。球进了。绝杀。你站在场上，风把汗吹凉了，你笑了。", effects: { reputation: 22, goals: 1, attrs: { resolve: 2, burst: 2 }, flags: { keySuccess: true } } },
        next: "ch2_end"
      },
      { id: "B", text: "稳着踢，保命要紧", effects: { reputation: -3, attrs: { positioning: 1, pressure: 1 }, demonValue: -4 }, next: "ch2_end" }
    ]
  },

  // 章末 → 跳转第三章《省赛》（职业线延续）
  {
    id: "ch2_end",
    chapter: 2,
    text: "赛季落幕。更衣室里人走光了，你坐在自己的位子上，鞋带还没解。窗外是另一片天，晚霞烧得通红。你膝盖上的疤还在，但你不看它了。更大的场子在等着。你知道。",
    system: "【第二章·崭露 完。接下来：第三章·省赛。】",
    effects: { chapter: 1, age: 2 },
    next: "ch3_opening"
  }

] };
