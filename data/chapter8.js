/* data/chapter8.js — 第八章《全国大赛》（设计稿第九章·18岁）
 * 事件链：联队集结 → 队长选举 → 小组赛×2 → 战术分歧 → 1/4决赛 → 半决赛(新宿敌·土灵根中锋) → 决赛(BOSS卫冕冠军) → 合同蜂拥 → 章末
 * 说明：天罡联队成军，姜太虚挂帅。决赛胜利设 nationalChamp 旗标（球圣封神结局前置）。
 *       半决赛引入新宿敌「不动如山」土灵根中锋·石破岳，克制冲击型打法。
 */
window.CHAPTER8 = { events: [

  // 开场：天罡联队集结
  {
    id: "ch8_opening",
    chapter: 8,
    text: [
      "帝都，天罡训练基地。六月的草皮散发着被太阳晒透的青涩气味，更衣室里战术板的马克笔味道还没散尽。十一个淬炼营幸存者重新站到同一片场地上，胸前多了一枚七星连珠的队徽——「天罡联队」。",
      "姜太虚负手立于阵前，沉默了很久。久到有人开始不安地换脚。他才开口，声音不大：「三十二支队。你们都是天才。天才凑一块儿，未必赢。」",
      "他目光最后落在你身上，停了两秒：「六周。十一块石头，一柄剑。就这些。」",
      "解散前，他补了最后一句：「全国大赛只是试金石。它背后是职业联赛、国家队，还有更大的世界。踢出来，天地任你们走。」"
    ],
    system: "【第八章·全国大赛 开启。天罡联队成军，目标——全国冠军。】",
    next: "ch8_captain"
  },

  // 队长选举（选择你的姿态）
  {
    id: "ch8_captain",
    chapter: 8,
    text: [
      "第一堂训练课。草皮上还挂着清晨的露水，球鞋踩上去有细微的吱嘎声。姜太虚把一只队长袖标扔在草地上：「自荐。出列。」",
      "没人动。武石抱臂，嘴角有一丝冷笑。内牛尔仰头看天。范志贵用胳膊肘捅了捅你的肋骨。",
      "姜太虚等了十秒，补了一句：「队长不是最强的。是最强的人愿意听他的。就这。」"
    ],
    choices: [
      { id: "A", text: "出列自荐：我来当这个队长", check: { attrs: ["resolve", "pressure"], difficulty: 44, tag: "决断+抗压" }, next: "ch8_group1",
        success: { text: "你往前迈了一步。草皮在鞋底发出轻微的声响。武石挑了下眉，没吭声。姜太虚看了你两秒，点了下头：「行。扛住了再说。」", effects: { reputation: 8, attrs: { resolve: 1 }, flags: { isCaptain: true } } },
        fail: { text: "你出列的瞬间，身后有人嗤地笑了一声。姜太虚没看你：「先证明。」", effects: { stamina: -4 } },
        critical: { text: "【灵光一闪】你出列，只说了四个字：「球给我。赢。」全场安静了三秒，然后有人鼓掌，接着是所有人。姜太虚嘴角动了一下，那大概是他最接近笑的表情。", effects: { reputation: 15, attrs: { resolve: 2 }, flags: { isCaptain: true, keySuccess: true } } }
      },
      { id: "B", text: "推举武石：让宿敌扛旗，你辅佐", check: { attrs: ["iq", "passing"], difficulty: 40, tag: "球商+传球" }, next: "ch8_group1",
        success: { text: "你朝武石努了努嘴。他愣了半秒，弯腰捡起袖标，什么都没说。但你看见他系袖标时手指收紧了一下。你退后半步，开始串联。", effects: { reputation: 5, bonds: { zhaolin: 12 }, attrs: { iq: 1 } } },
        fail: { text: "武石没接袖标，声音很平：「不用让。」空气冷了两秒。", effects: { stamina: -3 } }
      },
      { id: "C", text: "静观其变：让位置说话", check: { attrs: ["positioning", "rhythm"], difficulty: 36, tag: "站位+节奏" }, next: "ch8_group1",
        success: { text: "你没动。训练赛里你只是跑位、接应、把球送到该去的地方。姜太虚收训练日志时多看了你一眼：「沉得住。」", effects: { reputation: 4, attrs: { positioning: 1 } } },
        fail: { text: "你沉默太久。等训练赛结束，已经没人记得你站过哪个位置。", effects: { stamina: -3 } }
      }
    ]
  },

  // 小组赛第1场（以强打弱）
  {
    id: "ch8_group1",
    chapter: 8,
    type: "match",
    text: "小组赛首轮。对手是南岳选拔队，实力差了一截。更衣室里姜太虚只留了一句话：「虐菜也虐出章法。练战术，不是练比分。」然后他关了战术板，出去了。",
    opponent: { name: "南岳选拔队", element: "木", strength: 44 },
    teamBase: 34,
    fallback_choices: [
      { id: "A", sit: "attack", text: "高位逼抢，闪电战开局", check: { attrs: ["burst", "shooting"], difficulty: 42, tag: "爆发+射门" },
        success: { text: "开场五分钟，你{elementAdj}地前场断球，脚背吃准部位，皮球贴着草皮窜入网窝。闪电战。", effects: { reputation: 9, goals: 1, attrs: { burst: 1 } } },
        fail: { text: "逼抢太猛，阵型脱了节。对手一脚长传打穿你身后，反击来得又快又冷。", effects: { stamina: -5 } },
        critical: { text: "【灵光一闪】开场闪击破门，紧接着又是一脚直塞助攻。半场没踢完，胜负已定。", effects: { reputation: 16, goals: 1, assists: 1, attrs: { burst: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "演练传控，磨合阵容", check: { attrs: ["passing", "vision"], difficulty: 40, tag: "传球+视野" },
        success: { text: "你与内牛尔、苏雯连续三脚传递，球不落地，对手连球皮都摸不着。最后一脚直塞，队友推射空门。", effects: { reputation: 7, assists: 1, bonds: { linxiao: 8, suwan: 8 }, attrs: { passing: 1 } } },
        fail: { text: "传控配合还生，第二脚就被人断了。球权丢得太轻易。", effects: { stamina: -4 } }
      },
      { id: "C", sit: "defense", text: "稳守演练，试验新阵", check: { attrs: ["positioning", "tackle"], difficulty: 34, tag: "站位+铲断" },
        success: { text: "你坐镇后场，新阵型运转得比预想流畅。零封。姜太虚在场边记了点什么。", effects: { reputation: 5, attrs: { positioning: 1 } } },
        fail: { text: "新阵型磨合不够，肋部空当被对手偷了一个。", effects: { stamina: -4 } }
      }
    ],
    result: {
      bigwin: { text: "大胜。赛后混合采访区已经有记者举着录音笔等了。「天才之师」——第二天报纸的标题。", effects: { reputation: 9 } },
      win:     { text: "小胜。更衣室里姜太虚擦着战术板，头也不抬：「赢了。不够顺。」", effects: { reputation: 6 } },
      draw:    { text: "爆冷战平。更衣室安静得能听见淋浴间滴水。姜太虚把战术板摔在桌上，马克笔弹到地上。没人敢捡。", effects: { reputation: 1, demonValue: 3 } },
      lose:    { text: "首战告负。大巴车上没人说话。手机震动，全是质疑的消息。你关了屏幕，看窗外的路灯一盏盏后退。", effects: { reputation: -5, stamina: -6, demonValue: 5 } }
    },
    next: "ch8_group2"
  },

  // 小组赛第2场（势均力敌）
  {
    id: "ch8_group2",
    chapter: 8,
    type: "match",
    text: "小组赛次轮，出线关键战。对手「北境狼骑」——赛前热身时你就感觉到了，他们的对抗带着骨头碰骨头的闷响。金灵根后卫的肩膀像铁铸的。这是一场硬仗。",
    opponent: { name: "北境狼骑", element: "金", strength: 52 },
    teamBase: 34,
    fallback_choices: [
      { id: "A", sit: "attack", text: "以快制硬，用速度撕开铁壁", check: { attrs: ["speed", "dribble"], difficulty: 46, tag: "速度+盘带" },
        success: { text: "你{elementAdj}地连续变向，肩膀擦着金灵根后卫的胸口闪过，脚弓一推，球进了。肋下挨了一肘，但值。", effects: { reputation: 11, goals: 1, attrs: { speed: 1 } } },
        fail: { text: "对抗太硬。你被一肩膀撞在胸口上，踉跄两步，球丢了。肋骨隐隐发疼。", effects: { stamina: -6 } },
        critical: { text: "【灵光一闪】三人包夹，你从缝隙里挤过去，大腿肌肉绷到发酸，最后一脚捅射入网。看台炸了。", effects: { reputation: 18, goals: 1, attrs: { speed: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "避实击虚，打他们身后", check: { attrs: ["iq", "passing"], difficulty: 44, tag: "球商+传球" },
        success: { text: "你佯装强攻，吸引两人上抢，脚腕一抖，直塞从后卫裆下穿过。队友笑纳空门。", effects: { reputation: 8, assists: 1, attrs: { iq: 1 } } },
        fail: { text: "对手回防比你想的快，直塞被一脚铲出去。草皮溅了你一脸。", effects: { stamina: -5 } }
      },
      { id: "C", sit: "defense", text: "硬碰硬，用对抗回应", check: { attrs: ["strength", "pressure"], difficulty: 46, tag: "对抗+抗压" },
        success: { text: "你不躲。每次对抗都顶上去，肩膀对肩膀。全场五五开。赛后你的上臂多了两块淤青，但队伍稳住了。", effects: { reputation: 7, attrs: { strength: 1 } } },
        fail: { text: "对抗中被对手压制，你的重心一次次被撞偏。场面被动。", effects: { stamina: -6 } }
      }
    ],
    result: {
      bigwin: { text: "关键战大胜。终场哨响时，十一个人不约而同地吼了一声。小组头名，提前锁定。", effects: { reputation: 10, flags: { keySuccess: true } } },
      win:     { text: "险胜。更衣室里，十一个人把手叠在一起。掌心都是汗。没人松手。", effects: { reputation: 7 } },
      draw:    { text: "战平。凭净胜球勉强出线。姜太虚什么都没说，但训练量第二天加了一倍。", effects: { reputation: 3 } },
      lose:    { text: "关键战告负，小组出局。大巴上有人把毛巾盖在脸上。你盯着自己膝盖上的擦伤，一句话也说不出来。", effects: { reputation: -6, stamina: -6, demonValue: 6 } }
    },
    next: "ch8_split"
  },

  // 战术分歧（队内矛盾·选择站队）
  {
    id: "ch8_split",
    chapter: 8,
    text: [
      "淘汰赛前夜。战术会议室里弥漫着白板笔和速溶咖啡的味道。争执是从第三页战术图开始的。",
      "武石把笔往桌上一搁：「关键球，给我。一个人解决。」内牛尔猛地站起来，椅子刮过地板：「足球是十一个人的。」两个人对视，空气像绷紧的弦。",
      "姜太虚一直没说话。他合上战术本，看向你：「你说。怎么踢。」"
    ],
    choices: [
      { id: "A", text: "支持团队：足球是十一个人的", check: { attrs: ["iq", "passing"], difficulty: 42, tag: "球商+传球" }, next: "ch8_quarter",
        success: { text: "你把训练赛里那些跑通的配合一帧帧说给众人听。房间里慢慢安静下来。武石靠回椅背，沉默了很久，最后点了下头：「行。证明给我看。」", effects: { reputation: 6, bonds: { linxiao: 10 }, attrs: { iq: 1 }, flags: { teamFirst: true } } },
        fail: { text: "你说了，但声音被火药味盖过去了。椅子响，门响，人散了。", effects: { stamina: -4, demonValue: 2 } }
      },
      { id: "B", text: "支持武石：关键球就该交给最强的人", check: { attrs: ["resolve", "shooting"], difficulty: 42, tag: "决断+射门" }, next: "ch8_quarter",
        success: { text: "你看向武石：「关键球，给他。」武石没笑，只是把笔重新拿起来，在战术板上画了条线。你们之间不需要多余的话。", effects: { reputation: 5, bonds: { zhaolin: 12 }, attrs: { resolve: 1 } } },
        fail: { text: "内牛尔把椅子踢开，门摔得整面墙都在震。裂痕，已经在了。", effects: { stamina: -4, demonValue: 2 } }
      },
      { id: "C", text: "折中：常规时间团队，最后十分钟交给球星", check: { attrs: ["iq", "pressure"], difficulty: 46, tag: "球商+抗压" }, next: "ch8_quarter",
        success: { text: "你拿过笔，在战术板上画了两条线：「八十分钟，团队。最后十分钟，给他。」两个人都没说话，但都坐下了。姜太虚收战术本时嘴角微动：「和稀泥。也是本事。」", effects: { reputation: 7, bonds: { zhaolin: 6, linxiao: 6 }, attrs: { iq: 1 } } },
        fail: { text: "两边都不买账。会议散了，战术板上的线一条也没定下来。", effects: { stamina: -5, demonValue: 3 } }
      }
    ]
  },

  // 四分之一决赛
  {
    id: "ch8_quarter",
    chapter: 8,
    type: "match",
    text: "八强战。对手「东瀛海忍」——他们的传切像水，你追不上，也抓不住。赛前录像看了三遍，姜太虚只圈了一个时间点：「这里。他们换气。三秒。」",
    opponent: { name: "东瀛海忍", element: "水", strength: 54 },
    teamBase: 34,
    fallback_choices: [
      { id: "A", sit: "attack", text: "抢开局，打乱他们的节奏", check: { attrs: ["burst", "shooting"], difficulty: 46, tag: "爆发+射门" },
        success: { text: "开场你{elementAdj}地抢射破门，球还没沾露水就进了网。海忍的部署被打乱，他们的传球开始犹豫。", effects: { reputation: 11, goals: 1, attrs: { burst: 1 } } },
        fail: { text: "你扑上去逼抢，但对手传切如水，球从你脚边滑过去。扑了个空，肺里一阵发紧。", effects: { stamina: -5 } },
        critical: { text: "【灵光一闪】开场闪击，中场奔袭，梅开二度。海忍的流水阵被你一个人搅浑了。", effects: { reputation: 19, goals: 2, attrs: { burst: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "耐心周旋，等他们换气", check: { attrs: ["rhythm", "iq"], difficulty: 44, tag: "节奏+球商" },
        success: { text: "你压住节奏，等了六十三分钟。然后——他们换气了。三秒。你的直塞像手术刀，助攻破门。", effects: { reputation: 8, assists: 1, attrs: { rhythm: 1 } } },
        fail: { text: "对手的传切让你跑了整整半场，大腿开始发酸，还是没等到那个间隙。", effects: { stamina: -5 } }
      },
      { id: "C", sit: "defense", text: "冻结他们的核心组织者", check: { attrs: ["tackle", "intercept"], difficulty: 44, tag: "铲断+拦截" },
        success: { text: "你全场贴着对方核心，不给他转身的空间。海忍的传切体系像被掐住了喉咙，瘫痪了。", effects: { reputation: 7, attrs: { tackle: 1 } } },
        fail: { text: "对手核心一个变向，你的重心晃了。就那半步，杀机已至。", effects: { stamina: -6 } }
      }
    ],
    result: {
      bigwin: { text: "八强战大胜。赛后你坐在更衣室长凳上，小腿还在微微发颤。但四强，稳了。", effects: { reputation: 9 } },
      win:     { text: "小胜。看台上有人举起天罡联队的旗帜，风一吹，猎猎作响。四强。", effects: { reputation: 6 } },
      draw:    { text: "战平。加时赛你的小腿抽筋了两次。点球险胜。你扶着膝盖，汗滴在草皮上。", effects: { reputation: 4, stamina: -8 } },
      lose:    { text: "八强战折戟。你坐在草皮上，膝盖的擦伤渗着血。全国大赛，到此为止。", effects: { reputation: -5, stamina: -6, demonValue: 5 }, next: "ch8_eliminated" }
    },
    next: "ch8_semi"
  },

  // 半决赛·新宿敌（土灵根中锋·石破岳，"不动如山"克制冲击）
  {
    id: "ch8_semi",
    chapter: 8,
    type: "match",
    text: [
      "半决赛。你第一次见到石破岳，是在球员通道里。他比你高半个头，肩膀宽得像一堵墙。他看了你一眼，什么都没说。",
      "开场后你明白了什么叫「不动如山」。他往禁区一站，不追、不抢、不吼。你冲过去，就像撞在一座山上。解说在喊什么，你听不清。耳朵里全是自己的心跳。",
      "姜太虚在场边只说了四个字：「山，也能搬。」"
    ],
    opponent: { name: "西极磐石·石破岳", element: "土", strength: 58 },
    teamBase: 34,
    fallback_choices: [
      { id: "A", sit: "attack", text: "正面冲击，用爆发撼动山岳", check: { attrs: ["burst", "power"], difficulty: 48, tag: "爆发+力量" },
        success: { text: "你{elementAdj}地全力冲击，肩膀撞上他的胸口——这一次，山晃了。你从他身侧挤过去，推射入网。手臂发麻，但你笑了。", effects: { reputation: 14, goals: 1, attrs: { burst: 1 } } },
        fail: { text: "你冲上去。石破岳纹丝不动。你的肩膀撞在他身上，像撞在石壁上。球丢了，肩膀生疼。", effects: { stamina: -7 } },
        critical: { text: "【灵光一闪】你在石破岳头顶完成一记头槌。额头撞上皮球的瞬间，你听见全场起立的声音。山，被你搬动了。", effects: { reputation: 24, goals: 1, attrs: { burst: 2, power: 1 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "调虎离山，引他出击打身后", check: { attrs: ["iq", "passing"], difficulty: 44, tag: "球商+传球" },
        success: { text: "你佯装强突，石破岳终于动了——他迈出一步。就这一步。你分球，队友打空门。山离了位，就不是山了。", effects: { reputation: 10, assists: 1, attrs: { iq: 1 } } },
        fail: { text: "石破岳没动。你晃了两下，他连重心都没偏。计谋落空。", effects: { stamina: -5 } }
      },
      { id: "C", sit: "defense", text: "避开锋芒，用传控消耗他", check: { attrs: ["rhythm", "passing"], difficulty: 40, tag: "节奏+传球" },
        success: { text: "你不跟他正面碰。传控，拉扯，消耗。终场前他终于慢了半拍，你偷袭得手。", effects: { reputation: 8, goals: 1, attrs: { rhythm: 1 } } },
        fail: { text: "传控被对手的高压逼抢打断，球权丢了三次。节奏乱了。", effects: { stamina: -5 } }
      }
    ],
    result: {
      bigwin: { text: "大胜。终场后石破岳走过你身边，脚步没停，只侧了下头：「决赛。别输。」然后他走了。像一座山移过去。", effects: { reputation: 13, flags: { keySuccess: true } } },
      win:     { text: "险胜。你和石破岳的对抗上了当晚所有体育频道。你肩膀上多了一块淤青，形状像他的护腕。", effects: { reputation: 9 } },
      draw:    { text: "战平。加时，点球，险胜。你罚进最后一球时腿在抖。石破岳的影子，还没散。", effects: { reputation: 4, stamina: -8 } },
      lose:    { text: "你输了。石破岳从你身边走过，停了一秒：「山不是用来撼的。」然后他继续走，没回头。", effects: { reputation: -6, stamina: -6, demonValue: 6 }, next: "ch8_eliminated" }
    },
    next: "ch8_final"
  },

  // 决赛·BOSS（卫冕冠军·天阙皇朝，胜利设 nationalChamp）
  {
    id: "ch8_final",
    chapter: 8,
    type: "match",
    text: [
      "决赛之夜。天罡竞技场的灯光打在草皮上，白得发烫。六万人。你站在通道里，能听见看台的声浪像潮水一样拍过来。",
      "对手是卫冕冠军「天阙皇朝」。职业梯队精英，阵中三个通脉境。他们的热身动作都带着从容——那是赢过的人才有的松弛。",
      "姜太虚最后一次合上战术本。他没看战术板，看的是人：「六周。石头，剑。出鞘。」三个字，够了。",
      "武石活动手腕，骨节咔咔响。内牛尔弯腰系紧鞋带。范志贵闭眼深呼吸。你望向看台最高处——矿坑的方向。这一战，不为自己。"
    ],
    opponent: { name: "天阙皇朝·卫冕冠军", element: "火", strength: 62 },
    teamBase: 34,
    fallback_choices: [
      { id: "A", sit: "attack", text: "决胜时刻，一剑封喉", check: { attrs: ["shooting", "resolve"], difficulty: 50, tag: "射门+决断" },
        success: { text: "终场前，你{elementAdj}地一脚爆射。脚背传来扎实的触感，球进网的声音被六万人的吼声淹没。冠军。", effects: { reputation: 18, goals: 1, attrs: { shooting: 1 } } },
        fail: { text: "射门被对方门将扑出。你的脚背还残留着触球的震感，但球已经不在网里了。", effects: { stamina: -7 } },
        critical: { text: "【灵光一闪】你在决赛轰出一脚世界波。皮球划破夜空，直挂死角。六万人同时站起来。全国冠军。天罡联队。", effects: { reputation: 30, goals: 1, attrs: { shooting: 2, resolve: 1 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "团队配合，撕开王者防线", check: { attrs: ["passing", "vision"], difficulty: 46, tag: "传球+视野" },
        success: { text: "你与武石、内牛尔三角传递，三脚球，防线撕开。助攻队友推射入网。十一个人的剑，刺穿了王者的甲。", effects: { reputation: 12, assists: 1, bonds: { zhaolin: 10, linxiao: 10 }, attrs: { passing: 1 } } },
        fail: { text: "王者防线密不透风。你的直塞被断，球弹回来打在你脚面上。疼。", effects: { stamina: -6 } }
      },
      { id: "C", sit: "defense", text: "先稳住，把比赛拖入你的节奏", check: { attrs: ["pressure", "positioning"], difficulty: 42, tag: "抗压+站位" },
        success: { text: "你顶住卫冕冠军的狂攻，每一次对抗都咬住。大腿在发酸，但防线没退。反击的火种，保住了。", effects: { reputation: 8, attrs: { pressure: 1 } } },
        fail: { text: "卫冕冠军的攻势一浪接一浪。你的重心越来越低，防线在晃。", effects: { stamina: -7 } }
      }
    ],
    result: {
      bigwin: { text: "决赛大胜。你举起奖杯时，金属冰凉，手心全是汗。六万人在喊，你只听见自己的心跳。【全国冠军·达成】", effects: { reputation: 20, flags: { nationalChamp: true, keySuccess: true } } },
      win:     { text: "终场哨响。十一个人抱在一起。有人哭了，你不确定是不是自己。草皮上全是汗和泪的痕迹。全国冠军。【全国冠军·达成】", effects: { reputation: 15, flags: { nationalChamp: true } } },
      draw:    { text: "决赛战平，点球惜败。你站在中圈，膝盖弯了一下。冠军，差一步。那一步，像隔了一整个赛季。", effects: { reputation: 5, demonValue: 5 } },
      lose:    { text: "决赛告负。天阙皇朝在庆祝，你坐在草皮上，大腿抽筋了。没人来扶你。你也不需要。", effects: { reputation: -4, stamina: -8, demonValue: 8 } }
    },
    next: "ch8_contract"
  },

  // 合同蜂拥（名利场初现）
  {
    id: "ch8_contract",
    chapter: 8,
    text: [
      "夺冠之夜，手机震了四十七次。你数过。经纪人、俱乐部、赞助商，消息一条接一条，屏幕亮了又暗，暗了又亮。",
      "桌上摊着三份合同。纸张的触感各不相同——金阙皇朝的用铜版纸，烫金字；青云母队的还是普通A4；海外那份最薄，像一张机票。",
      "孙德斯摘下老花镜，用指节敲了敲桌面：「记住。合同签的不是钱。是你接下来五年，每天醒来要面对的东西。」"
    ],
    choices: [
      { id: "A", text: "先不急，听听所有报价再说", effects: { reputation: 3, spiritStones: 10 }, next: "ch8_end" },
      { id: "B", text: "婉拒所有邀约，先回母队", effects: { reputation: 2, bonds: { agui: 5 } }, next: "ch8_end" },
      { id: "C", text: "对海外试训邀请表现出兴趣", effects: { reputation: 4, flags: { overseasInterest: true } }, next: "ch8_end" }
    ]
  },

  // 淘汰赛出局（八强/半决赛输球 → 止步，不进入决赛）
  {
    id: "ch8_eliminated",
    chapter: 8,
    text: [
      "全国大赛，止步了。更衣室里没人说话，只有淋浴间的水声一阵一阵地响。你坐在长凳上，膝盖上的擦伤结了痂，绷带边缘翘起来，你伸手把它按下去，按了很久。",
      "姜太虚收战术本的时候从你面前经过，停了半步。他没安慰你，只说了一句：「山还在那儿。下次，你自己来搬。」然后他走了，背影跟来时一样直。",
      "夜里你独自走上天台。帝都的万家灯火在脚下铺展，风里有烧烤和啤酒的味道。手机亮了又暗——国家队的征召，迟早会来。你深吸一口气，夜风灌满肺。路，还长。"
    ],
    system: "【第八章·全国大赛 完（淘汰赛止步）。接下来：第九章·抉择·上（职业巅峰）。】",
    effects: { chapter: 1, age: 1 },
    next: "ch9_opening"
  },

  // 章末 → 第九章《抉择·上》
  {
    id: "ch8_end",
    chapter: 8,
    text: [
      "庆功宴散场。你独自走上天台。帝都的万家灯火在脚下铺展，风里有烧烤和啤酒的味道。",
      "你靠着栏杆，膝盖隐隐发酸。六周。十一块石头。一柄剑。手掌上还有奖杯留下的压痕。",
      "手机亮了。国家队征召。你看了三秒，锁屏，深吸一口气。夜风灌满肺。职业巅峰的门，开了。"
    ],
    system: "【第八章·全国大赛 完。天罡联队问鼎全国。接下来：第九章·抉择·上（职业巅峰）。】",
    effects: { chapter: 1, age: 1 },
    next: "ch9_opening"
  }

] };
