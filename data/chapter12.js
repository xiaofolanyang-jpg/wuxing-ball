/* data/chapter12.js — 第十二章《世青赛·小组赛》（20岁·世青赛篇·正赛）
 * 事件链：开幕 → 小组赛×3（北欧海盗/南美桑巴/非洲雄狮）→ 出线 → 章末
 * 说明：世青赛小组赛，3场比赛。小组赛非单败，输球不立即出局（靠积分/净胜球），故各场
 *       result 不设分支级 next，统一顺序推进；末战为出线关键战。章末仅 chapter+1（年龄保持20）。
 */
window.CHAPTER12 = { events: [

  // 开场：世青赛开幕
  {
    id: "ch12_opening",
    chapter: 12,
    text: [
      "世界青年锦标赛，开幕。开幕式上，几十面旗帜在球场中央一字排开，被风吹得猎猎作响。看台上来自世界各地的球迷，喊着各自的语言，汇成一片嗡嗡的声浪。",
      "你站在球员通道里，前面是范志贵宽厚的后背。他回头冲你咧嘴一笑：「紧张？」你摇摇头。其实手心全是汗。",
      "广播里念到东方古国的名字时，看台上一小片红色站了起来。你深吸一口气，鞋钉踩上草皮的那一刻，心反而静了。"
    ],
    system: "【第十二章·世青赛·小组赛 开启。世界舞台，三场小组赛，抢一个出线名额。】",
    next: "ch12_g1"
  },

  // 小组赛第1场：北欧海盗（金灵根·身体对抗）
  {
    id: "ch12_g1",
    chapter: 12,
    type: "match",
    text: "小组赛首轮，北欧海盗。赛前热身时你就感觉到了——这帮人高马大的家伙，对抗起来带着骨头碰骨头的闷响。金灵根后卫的肩膀像铁铸的，撞一下，半边身子都发麻。沈祥赛前只叮嘱了一句：「别跟他们拼身体，拼脑子。」",
    opponent: { name: "北欧海盗", element: "金", strength: 52 },
    teamBase: 36,
    fallback_choices: [
      { id: "A", sit: "attack", text: "以快制硬，用速度绕开他们的铁壁", check: { attrs: ["speed", "dribble"], difficulty: 44, tag: "速度+盘带" },
        success: { text: "你{elementAdj}地连续变向，肩膀擦着金灵根后卫的胸口闪过，脚弓一推，球进了。肋下挨了一肘，但值。", effects: { reputation: 11, goals: 1, attrs: { speed: 1 } } },
        fail: { text: "对抗太硬。你被一肩膀撞在胸口上，踉跄两步，球丢了。肋骨隐隐发疼。", effects: { stamina: -6 } },
        critical: { text: "【灵光一闪】三人包夹，你从缝隙里挤过去，大腿肌肉绷到发酸，最后一脚捅射入网。看台上那片红色炸了。", effects: { reputation: 18, goals: 1, attrs: { speed: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "避实击虚，用传球调动他们", check: { attrs: ["passing", "iq"], difficulty: 42, tag: "传球+球商" },
        success: { text: "你佯装强攻，吸引两人上抢，脚腕一抖，直塞从后卫裆下穿过。范志贵笑纳空门，他冲你挥了挥拳头。", effects: { reputation: 8, assists: 1, bonds: { agui: 6 }, attrs: { iq: 1 } } },
        fail: { text: "对手回防比你想的快，直塞被一脚铲出去。草皮溅了你一脸。", effects: { stamina: -5 } }
      },
      { id: "C", sit: "defense", text: "硬碰硬，用对抗回应", check: { attrs: ["strength", "pressure"], difficulty: 44, tag: "对抗+抗压" },
        success: { text: "你不躲。每次对抗都顶上去，肩膀对肩膀。全场五五开。赛后你的上臂多了两块淤青，但队伍稳住了。", effects: { reputation: 7, attrs: { strength: 1 } } },
        fail: { text: "对抗中被对手压制，你的重心一次次被撞偏。场面被动。", effects: { stamina: -6 } }
      }
    ],
    result: {
      bigwin: { text: "首战大胜。终场哨响，范志贵把你抱起来转了一圈。看台上那片红色，唱起了你听不懂却跟着哼的歌。", effects: { reputation: 10, flags: { keySuccess: true } } },
      win:     { text: "开门红。更衣室里沈祥难得地笑了：「方向对了。下一场。」", effects: { reputation: 6 } },
      draw:    { text: "战平。北欧人的身体确实硬。你擦了把汗，心里有数了：这届比赛，没有软柿子。", effects: { reputation: 2 } },
      lose:    { text: "首战告负。更衣室有点闷。沈祥没发火，只在战术板上画了几条线：「输一场，天塌不下来。后面两场，拿回来。」", effects: { reputation: -4, stamina: -6, demonValue: 4 } }
    },
    next: "ch12_g2"
  },

  // 小组赛第2场：南美桑巴（木灵根·技术流）
  {
    id: "ch12_g2",
    chapter: 12,
    type: "match",
    text: "小组赛次轮，南美桑巴。这帮人踢球像跳舞，脚底下黏着球，节奏忽快忽慢，看得人眼花缭乱。木灵根中场扭起来像水蛇，你伸脚去抢，他轻轻一拨就过去了。沈祥皱着眉：「别被他们带着跑。把节奏，攥在自己手里。」",
    opponent: { name: "南美桑巴", element: "木", strength: 54 },
    teamBase: 36,
    fallback_choices: [
      { id: "A", sit: "attack", text: "用更细的技术回应：以巧破巧", check: { attrs: ["dribble", "agility"], difficulty: 46, tag: "盘带+敏捷" },
        success: { text: "你{elementAdj}地连续踩单车，晃开防守，禁区内一脚巧射。球贴着门柱内侧滚进去。连对手都鼓了下掌。", effects: { reputation: 12, goals: 1, attrs: { dribble: 1 } } },
        fail: { text: "你想玩花活，结果玩砸了。对方一个反抢，球丢了。沈祥在场边直摇头。", effects: { stamina: -5, demonValue: 2 } },
        critical: { text: "【灵光一闪】你连过三人，最后一脚挑射越过门将。整个球场都站了起来。解说用你听不懂的语言喊了很长一串。", effects: { reputation: 20, goals: 1, attrs: { dribble: 2, agility: 1 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "压住节奏，把球控在脚下", check: { attrs: ["rhythm", "passing"], difficulty: 42, tag: "节奏+传球" },
        success: { text: "你不急，把球牢牢控住，快慢全由你定。桑巴军团跑了大半场，大部分时间在追球。节奏，被你攥住了。", effects: { reputation: 8, attrs: { rhythm: 1, passing: 1 } } },
        fail: { text: "对方突然提速，节奏被冲了一下。你回追了三十米，肺里火辣辣的。", effects: { stamina: -5 } }
      },
      { id: "C", sit: "defense", text: "冻结他们的核心：掐住蛇头", check: { attrs: ["tackle", "iq"], difficulty: 44, tag: "铲断+球商" },
        success: { text: "你全场贴着桑巴的核心中场，不让他舒服转身。他们的进攻像被掐住了喉咙，瘫痪了。", effects: { reputation: 7, attrs: { tackle: 1 } } },
        fail: { text: "核心一个变向把你过了，好在苏雯补了过来。你喘了口气，后背全是汗。", effects: { stamina: -5 } }
      }
    ],
    result: {
      bigwin: { text: "大胜桑巴。终场时连对手都过来跟你交换球衣。范志贵嚷嚷着：「这下出线稳了！」你笑了笑，没敢松劲。", effects: { reputation: 11, flags: { keySuccess: true } } },
      win:     { text: "赢了。更衣室里气氛松快了不少。沈祥却还在敲战术板：「最后一场，别松。」", effects: { reputation: 7 } },
      draw:    { text: "战平。出线形势还悬着，最后一场成了生死战。你盯着积分榜看了很久。", effects: { reputation: 3 } },
      lose:    { text: "输了。桑巴人跳着舞庆祝。你坐在更衣室，膝盖发酸。最后一场，没有退路了。", effects: { reputation: -4, stamina: -6, demonValue: 5 } }
    },
    next: "ch12_g3"
  },

  // 小组赛第3场：非洲雄狮（火灵根·速度爆发·出线关键战）
  {
    id: "ch12_g3",
    chapter: 12,
    type: "match",
    text: "小组赛末轮，出线关键战。非洲雄狮，火灵根前锋的速度快得吓人，启动那一下像猎豹扑食。赛前录像里，他们的反击进球一个比一个干脆。沈祥把防线往前推了五米：「压上。把战火烧在他们半场。守，是守不出线的。」",
    opponent: { name: "非洲雄狮", element: "火", strength: 56 },
    teamBase: 36,
    fallback_choices: [
      { id: "A", sit: "attack", text: "抢开局，用进攻压制他们的速度", check: { attrs: ["burst", "shooting"], difficulty: 46, tag: "爆发+射门" },
        success: { text: "开场你{elementAdj}地抢射破门，球还没沾露水就进了网。雄狮的部署被打乱，他们的速度优势没了用武之地。", effects: { reputation: 12, goals: 1, attrs: { burst: 1 } } },
        fail: { text: "你扑上去逼抢，但对手一个长传打穿你身后，反击来得又快又冷。", effects: { stamina: -5 } },
        critical: { text: "【灵光一闪】开场闪击，中场奔袭，梅开二度。雄狮的防线被你一个人搅得天翻地覆。", effects: { reputation: 20, goals: 2, attrs: { burst: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "控住球权，让他们的速度无从发挥", check: { attrs: ["passing", "rhythm"], difficulty: 44, tag: "传球+节奏" },
        success: { text: "你和苏雯把球牢牢控在脚下，连续传递。雄狮抢不到球，速度再快也只能干瞪眼。机会，慢慢出来了。", effects: { reputation: 9, assists: 1, bonds: { suwan: 6 }, attrs: { passing: 1 } } },
        fail: { text: "传控被对手的高压逼抢打断，球权丢了三次。节奏有点乱。", effects: { stamina: -5 } }
      },
      { id: "C", sit: "defense", text: "造越位，用防线困住他们的猎豹", check: { attrs: ["positioning", "iq"], difficulty: 42, tag: "站位+球商" },
        success: { text: "你指挥防线整齐划一地压上，雄狮前锋三次单刀两次越位。他们的速度，被你算计死了。", effects: { reputation: 8, attrs: { positioning: 1, iq: 1 } } },
        fail: { text: "造越位失败一次，对方前锋差点单刀。你惊出一身冷汗，赶紧回追。", effects: { stamina: -6 } }
      }
    ],
    result: {
      bigwin: { text: "大胜雄狮，小组头名出线。终场哨响，二十多个人冲进场内抱成一团。范志贵吼得最大声。", effects: { reputation: 12, flags: { keySuccess: true, groupFirst: true } } },
      win:     { text: "赢了，出线。更衣室里沈祥难得地鼓了掌：「淘汰赛，才是真正的开始。」", effects: { reputation: 8 } },
      draw:    { text: "战平，靠净胜球勉强出线。悬。你坐在更衣室，腿还在抖。下一场，再没有侥幸了。", effects: { reputation: 4, stamina: -6 } },
      lose:    { text: "输了，但凭借前两场攒下的家底，还是有惊无险地以小组第二出线。沈祥脸色不好看：「这样的状态，淘汰赛走不远。」", effects: { reputation: -3, stamina: -6, demonValue: 5 } }
    },
    next: "ch12_end"
  },

  // 章末 → 第十三章《世青赛·淘汰赛》
  {
    id: "ch12_end",
    chapter: 12,
    text: [
      "小组赛三场打完，国青有惊无险地出了线。你坐在回程的大巴上，膝盖隐隐发酸，但心里是热的。",
      "窗外的城市灯火后退。手机震了一下，是卢卡发来的消息——他守着时差看了你的比赛：「踢得漂亮。继续。」你笑了笑，回了个握拳的表情。",
      "前方，是单败淘汰赛。十六强，八强，半决赛，决赛。一场都输不起。输了，就回家。你闭上眼，把这句话在心里默念了一遍。"
    ],
    system: "【第十二章·世青赛·小组赛 完。出线。接下来：第十三章·世青赛·淘汰赛（输球即回家）。】",
    effects: { chapter: 1 },
    next: "ch13_opening"
  }

] };
