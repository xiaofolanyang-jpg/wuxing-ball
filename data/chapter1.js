/* data/chapter1.js — 第一章《觉醒》（v3.0 剧本版·五人制·随机小学院·成长型队友）
 * 依据《五行球圣-全十八章剧本.md》第一章（12事件）重写。
 * 事件链：矿坑开场 → 测灵石(灵根觉醒) → 三次机会(重roll) → 铁叔的话 → 入学(学院生成)
 *        → 成长型队友(生成) → 位置测试(五人制) → 踢法确立 → 第一次修炼 → 土场第一课
 *        → 夜谈 → 第一次正式比赛(教学3节点) → 结算 → ch2
 * 说明：
 *  - 灵根重选教学（剧本事件3）由引擎 root_awaken 自动提示（CONFIG.rootRerollHint·白袍人）承载，
 *    重roll选项内嵌于 ch1_root_result（沿用成熟模式）。
 *  - 教学比赛（剧本事件12）按剧本“简化3节点”实现为链式检定选项事件，而非 type:"match" 六节点。
 *  - 队友羁绊统一计入动态羁绊「同袍」(tongpao)。
 */
window.CHAPTER1 = { events: [

  // ── 事件1：矿坑边的球（开场·纯叙事）────────────────────
  {
    id: "ch1_opening",
    chapter: 1,
    text: [
      "天黑了，矿坑的灯还亮着。",
      "你蹲在废石堆旁边，用脚颠一只破布球。球是拿旧衣服裹的，外面缠了三圈麻绳。颠一下。两下。三下。第四下的时候球散了，麻绳断了，碎布飞了一地。",
      "你盯着地上的碎布，没动。",
      "远处有人喊你名字。是铁叔，矿上的工头。他喊你回去吃饭。",
      "你没应。你在想一件事。今天镇上来了人，穿白袍的，说是「球院」的招生。十四岁，测灵根，过了就能去踢球，不用挖矿。",
      "你十四了。",
      "你站起来，拍了拍膝盖上的灰，朝镇上的方向看了一眼。明天。"
    ],
    next: "ch1_test"
  },

  // ── 事件2（上）：测灵石·祠堂考场（纯叙事，铺垫觉醒）────────
  {
    id: "ch1_test",
    chapter: 1,
    text: [
      "镇上的祠堂改成了临时考场。二十多个少年排成两排。你站在最后面，衣服上还有矿灰。",
      "前面的人一个个走上去，把手按在那块石头上。石头亮一下。有的亮金色，有的亮绿色，有的——不亮。",
      "不亮的那个少年被带走了。他妈在外面哭。",
      "轮到你了。白袍人看了你一眼，没说话，朝石头努了努嘴。",
      "你把手按上去。石头是凉的。然后——"
    ],
    next: "ch1_root_result"
  },

  // ── 事件2（下）：灵根觉醒（核心机制·按灵根动态演出）────────
  {
    id: "ch1_root_result",
    chapter: 1,
    type: "root_awaken",
    byRoot: {
      "火": {
        text: "轰。不是亮——是炸。赤红色的光从石心迸出来，一股热浪拍在你脸上，像开了窑门。你手心烫得发疼。祠堂里所有人都扭头看你。白袍人的眉毛动了一下。",
        system: "【灵根觉醒】灵根：{rootDisplay}｜品质：{qualityDisplay}\n白袍人在册子上记了一笔，抬头看你：「名字。」你报了。「去那边等。」"
      },
      "金": {
        text: "石头骤亮。金芒刺得你眯了眼，像有柄无形的剑从石心里抽出来，嗡的一声，你牙根发酸，骨头缝里都在震。白袍人的眉毛动了一下。",
        system: "【灵根觉醒】灵根：{rootDisplay}｜品质：{qualityDisplay}\n白袍人在册子上记了一笔，抬头看你：「名字。」你报了。「去那边等。」"
      },
      "木": {
        text: "石头泛起一层翠绿的光，柔柔的，像开春头一茬草芽顶开冻土。你手心痒酥酥的，像有根藤蔓从掌纹里往外抽。白袍人的眉毛动了一下。",
        system: "【灵根觉醒】灵根：{rootDisplay}｜品质：{qualityDisplay}\n白袍人在册子上记了一笔，抬头看你：「名字。」你报了。「去那边等。」"
      },
      "水": {
        text: "石头亮起幽蓝的光，不刺眼，凉丝丝的，像大冬天捧了把井水。你脑子里忽然安静了，连祠堂外头麻雀叫了几声都数得清。白袍人的眉毛动了一下。",
        system: "【灵根觉醒】灵根：{rootDisplay}｜品质：{qualityDisplay}\n白袍人在册子上记了一笔，抬头看你：「名字。」你报了。「去那边等。」"
      },
      "土": {
        text: "石头泛起赭黄的光，沉，厚，不张扬。你脚底下的地砖微微一颤，像有什么东西从地底顶上来。你的重心忽然稳了，扎在地上，拔不动。白袍人的眉毛动了一下。",
        system: "【灵根觉醒】灵根：{rootDisplay}｜品质：{qualityDisplay}\n白袍人在册子上记了一笔，抬头看你：「名字。」你报了。「去那边等。」"
      },
      "杂": {
        text: "石头忽明忽暗。金、木、水、火、土——五色轮着闪，像走马灯似的，哪个也不肯让哪个。你手心一会儿烫一会儿凉，脑子嗡嗡的。忽然，五色灵光猛地一缩，像五条溪流撞进同一个漩涡——轰，拧成一道，没入你掌心。石头归于沉寂。手心酥酥麻麻的，像攥了把碎星。白袍人端着茶碗的手，停在半空。",
        system: "【灵根觉醒】灵根：{rootDisplay}｜品质：{qualityDisplay}\n白袍人沉默了很久，才在册子上记了一笔。他抬头看你，眼神不一样了：「名字。」你报了。「……去那边等。」"
      }
    },
    choices: [
      { id: "A", text: "确认灵根，上路", next: "ch1_tieshu" },
      { id: "B", text: "重新觉醒（剩余{rerollLeft}次）", reroll: true, when: { rerollLeft: true }, next: "ch1_root_result" }
    ]
  },

  // ── 事件4：铁叔的话（剧情·角色建立）────────────────────
  {
    id: "ch1_tieshu",
    chapter: 1,
    text: [
      "晚上，矿坑边的棚子里，铁叔把一碗面推到你面前。",
      "「真要去？」你点头。",
      "铁叔沉默了一会儿。他是个粗人，手上全是疤。他不懂什么灵根，不懂什么球院。但他懂一件事。",
      "「去了就别回来。」他说，声音很平。「这矿坑，吃人。你爹在里面待了二十年，出来的时候腰是弯的。我不想你也弯。」",
      "你吃面。面很咸。「踢不出来呢？」你问。",
      "「踢不出来。」铁叔想了想。「那就去干别的。反正别回来挖矿。」",
      "他站起来，走到门口，背对着你。「明天我送你。」"
    ],
    effects: { flags: { tieshuBond: true } },
    next: "ch1_enroll"
  },

  // ── 事件5：入学（剧情·学院生成，世界已在开局生成）────────
  {
    id: "ch1_enroll",
    chapter: 1,
    text: [
      "三天后，你站在{academyName}的门口。",
      "说是「门口」，其实就是一扇铁门。漆掉了大半。门柱上挂着一块木牌，字是手写的，歪的。",
      "里面是一块土场，没有草皮，地上全是脚印和球印。球门是两根铁棍焊的，网是麻绳编的，有几个洞。",
      "一个老头坐在场边的石头上，手里拿着旱烟。他看见你，没站起来。「新来的？」「嗯。」「去那边，找李教习。」他朝最里面的一排平房努了努嘴。「他管分房。」",
      "你走进去。土场边上有人在颠球，三四个，技术一般，球老掉。",
      "这就是你的起点了。{continent}，D级，土场，铁门，歪牌子。"
    ],
    next: "ch1_companion"
  },

  // ── 事件6：成长型队友·初遇（核心机制·队友生成）────────────
  {
    id: "ch1_companion",
    chapter: 1,
    type: "gen_companions",
    text: [
      "分房的时候你遇到了他。",
      "他站在走廊里，背着一个比他还大的包，包上全是灰。他正盯着门牌号看，歪着头，嘴里念叨着什么。",
      "「你也住这间？」他转头看你。你点头。",
      "他把包往地上一扔。「我叫{companion1Name}，{companion1Element}灵根。你呢？」你说了名字，说了灵根。",
      "他眼睛亮了一下。「{playerElement}？不错。咱俩正好互补。」",
      "他说话很快，手也多，一边说一边比划。「我看了，这破地方，土场，铁门，连个像样的球都没有。」他朝窗外看了一眼。「但是。」",
      "「但是什么？」「但是咱俩要是踢出来了，这地方，以后就是圣地。」他笑了，露出一口白牙。"
    ],
    system: "【成长型队友·{companion1Name}（{companion1Element}灵根）加入了你的岁月。往后他会随你一同成长，灵根互补，位置互补。】",
    effects: { bonds: { tongpao: 1 } },
    next: "ch1_position"
  },

  // ── 事件7：位置测试（机制教学·五人制位置选择）────────────
  {
    id: "ch1_position",
    chapter: 1,
    text: [
      "第二天，土场。李教习吹了声哨，二十个新生站成两排。他扔了一堆背心出来。「穿上，今天测位置。」",
      "测试很简单——五对五，二十分钟。他站在场边看，不说话，只在本子上写。",
      "你踢了二十分钟，球碰了不到十次。土场的地面不平，球弹得到处跑。但你感觉到了——你站在某个位置的时候，最舒服。",
      "结束后，李教习把你叫过去。「你。」他拿笔点了点你。「你觉得自己该站哪？」"
    ],
    choices: [
      { id: "A", text: "前锋（ST）——你想进球，每一个球都想。", effects: { position: "ST", flags: { pos_ST: true } }, next: "ch1_playstyle" },
      { id: "B", text: "中场（MF）——你想控制。球在你脚下，比赛就在你手里。", effects: { position: "MF", flags: { pos_MF: true } }, next: "ch1_playstyle" },
      { id: "C", text: "边锋（WING）——你想跑，从这头跑到那头，风在耳朵边。", effects: { position: "WING", flags: { pos_WING: true } }, next: "ch1_playstyle" },
      { id: "D", text: "后卫（DF）——你想守住，不让任何人过去。", effects: { position: "DF", flags: { pos_DF: true } }, next: "ch1_playstyle" },
      { id: "E", text: "门将（GK）——你想当最后一道墙。所有人倒了，你还在。", effects: { position: "GK", flags: { pos_GK: true } }, next: "ch1_playstyle" }
    ]
  },

  // ── 事件8：踢法确立（机制教学·按位置动态显示踢法）────────
  {
    id: "ch1_playstyle",
    chapter: 1,
    text: [
      "李教习点了点头。「行，那你的踢法呢？」",
      "他解释了一下。同一个位置，不同的踢法，完全不同的活法。「你想怎么踢？」"
    ],
    choices: [
      // 前锋
      { id: "A", when: { flag: "pos_ST" }, text: "冲击型——反越位、单刀、暴力抽射", effects: { playstyle: "冲击型" }, next: "ch1_train1" },
      { id: "B", when: { flag: "pos_ST" }, text: "支点型——背身拿球、头球轰炸", effects: { playstyle: "支点型" }, next: "ch1_train1" },
      { id: "C", when: { flag: "pos_ST" }, text: "伪九型——回撤组织、串联进攻", effects: { playstyle: "伪九型" }, next: "ch1_train1" },
      // 中场
      { id: "D", when: { flag: "pos_MF" }, text: "绞杀型——铲断拦截、中场扫荡", effects: { playstyle: "绞杀型" }, next: "ch1_train1" },
      { id: "E", when: { flag: "pos_MF" }, text: "节拍器——长传调度、控制节奏", effects: { playstyle: "节拍器" }, next: "ch1_train1" },
      { id: "F", when: { flag: "pos_MF" }, text: "攻击型——后插上、禁区前沿发炮", effects: { playstyle: "攻击型" }, next: "ch1_train1" },
      // 边锋
      { id: "G", when: { flag: "pos_WING" }, text: "突破型——下底传中、1v1过人", effects: { playstyle: "突破型" }, next: "ch1_train1" },
      { id: "H", when: { flag: "pos_WING" }, text: "内切型——边路内切、远射破门", effects: { playstyle: "内切型" }, next: "ch1_train1" },
      // 后卫
      { id: "I", when: { flag: "pos_DF" }, text: "上抢型——前顶拦截、回追铲球", effects: { playstyle: "上抢型" }, next: "ch1_train1" },
      { id: "J", when: { flag: "pos_DF" }, text: "拖后型——站位补位、指挥防线", effects: { playstyle: "拖后型" }, next: "ch1_train1" },
      { id: "K", when: { flag: "pos_DF" }, text: "带刀型——头球远射、攻防一体", effects: { playstyle: "带刀型" }, next: "ch1_train1" },
      // 门将
      { id: "L", when: { flag: "pos_GK" }, text: "门线型——反应扑救、稳如磐石", effects: { playstyle: "门线型" }, next: "ch1_train1" },
      { id: "M", when: { flag: "pos_GK" }, text: "出击型——出击解围、清道夫门将", effects: { playstyle: "出击型" }, next: "ch1_train1" }
    ]
  },

  // ── 事件9：第一次修炼（机制教学·修炼点分配）────────────
  {
    id: "ch1_train1",
    chapter: 1,
    type: "train",
    text: [
      "晚上，宿舍。{companion1Name}已经睡了，打呼，很响。",
      "你睡不着，盯着天花板，脑子里全是白天的画面——土场，铁门，李教习的哨声。",
      "你现在有{trainPoints}个修炼点。每回合都有。你可以把它们分配到任何属性上。灵根亲和的属性，成长更快；非亲和的，慢，而且有个上限，你过不去。",
      "你闭上眼，在心里把点分好了。明天开始，正式练。"
    ],
    next: "ch1_lesson"
  },

  // ── 事件10：土场上的第一课（修炼·叙事）────────────────
  {
    id: "ch1_lesson",
    chapter: 1,
    text: [
      "早上六点。哨响。",
      "你跑到土场上的时候，{companion1Name}已经在了。他在颠球，球老掉，他骂了一句，捡起来，继续。",
      "李教习站在中间，手里拿着球。「今天，基本功。」他把球扔给你。「接，停，传，来回，一百组。」",
      "你接，停，传。{companion1Name}接，停，传。球在两个人之间滚。土场的地面不平，球弹，你得用脚底去够，去压，去控制。",
      "五十组的时候，你的脚踝开始酸。八十组的时候，{companion1Name}的传球开始歪。一百组，李教习吹哨。「行了，喝水。」",
      "你弯腰，手撑着膝盖，喘。土腥味钻进鼻子。「明天，二百组。」"
    ],
    effects: { attrs: { dribble: 1, passing: 1 }, stamina: -10 },
    next: "ch1_nighttalk"
  },

  // ── 事件11：夜谈（剧情·羁绊积累）────────────────────
  {
    id: "ch1_nighttalk",
    chapter: 1,
    text: [
      "晚上，宿舍。{companion1Name}没睡，他坐在床上，抱着球。",
      "「你说。」他突然开口。「咱们能踢出来吗？」你没回答。",
      "「我今天看了，这二十个人，」他说，「没一个灵根比咱俩好的。但是，这地方，太破了，没有五行室，没有灵脉，连个像样的教练都没有。」",
      "他沉默了一会儿。「但是。」他又说了这个词，他好像很喜欢这个词。「但是，破地方出来的，才狠。」",
      "他把球往地上一拍。「睡吧，明天二百组。」"
    ],
    choices: [
      { id: "A", text: "「能。」", effects: { bonds: { tongpao: 2 }, flags: { promise: true } }, next: "ch1_match_n1" },
      { id: "B", text: "不说话。关灯。", effects: { bonds: { tongpao: 1 } }, next: "ch1_match_n1" }
    ]
  },

  // ── 事件12：第一次正式比赛（教学战·简化3节点）────────────
  // 节点1·你的回合
  {
    id: "ch1_match_n1",
    chapter: 1,
    text: [
      "一周后，李教习宣布：「明天，和隔壁{rivalAcademy}踢一场，正式的。」",
      "{rivalAcademy}，也是D级，土场，铁门，和你们一样破。",
      "第二天，下午，两块土场之间的空地。没有看台，没有解说，只有二十个人和两个教练。哨响。",
      "球来了。你第一次在正式比赛里触球，心跳很快，腿有点软。但你动了。"
    ],
    choices: [
      { id: "A", text: "按训练时的方式来", check: { attrs: ["dribble", "shooting"], difficulty: 18, tag: "基本功" }, next: "ch1_match_n2",
        success: { text: "你{elementAdj}地完成动作。球到了该去的地方。李教习在场边点了点头。", effects: { reputation: 2 } },
        fail: { text: "动作变形了，球飞了，对方笑了。你的脸烫。", effects: { stamina: -3 } }
      },
      { id: "B", text: "不管了。凭本能", check: { attrs: ["burst", "resolve"], difficulty: 20, tag: "爆发+决断" }, next: "ch1_match_n2",
        success: { text: "你没想，身体自己动了。球进了！所有人都愣了，包括你自己。", effects: { reputation: 5, goals: 1, attrs: { burst: 1 } } },
        fail: { text: "你冲了，但方向不对，球丢了。李教习在场边叹了口气。", effects: { demonValue: 2 } }
      }
    ]
  },

  // 节点2·对手反击
  {
    id: "ch1_match_n2",
    chapter: 1,
    text: [
      "对方反击了，一个高球，你的队友没顶到，球落在对方前锋脚下。他朝你冲过来。"
    ],
    choices: [
      { id: "A", text: "正面拦截", check: { attrs: ["tackle", "intercept"], difficulty: 18, tag: "铲断+拦截" }, next: "ch1_match_n3",
        success: { text: "你伸脚，球断了，干净利落。对方前锋愣了。", effects: { reputation: 2 } },
        fail: { text: "你伸脚，慢了。他抹过去了，你摔在土里，嘴里全是灰。", effects: { stamina: -5 } }
      },
      { id: "B", text: "卡位置，不伸脚", check: { attrs: ["positioning", "balance"], difficulty: 16, tag: "站位+平衡" }, next: "ch1_match_n3",
        success: { text: "你没动，你只是站在那里。他过不去，他急了，传球了。危机解除。", effects: { reputation: 1, attrs: { positioning: 1 } } },
        fail: { text: "你卡了，但他比你快，一个变向，你被过了。", effects: { stamina: -3 } }
      }
    ]
  },

  // 节点3·最后一击
  {
    id: "ch1_match_n3",
    chapter: 1,
    text: [
      "最后五分钟，0-0。你拿到球，面前只有一个人。"
    ],
    choices: [
      { id: "A", text: "自己来", check: { attrs: ["shooting", "burst"], difficulty: 22, tag: "射门+爆发" }, next: "ch1_match_after",
        success: { text: "你过了他，射门，球进了！麻绳网晃了三下。你跪在土场上，吼了一声。", effects: { reputation: 8, goals: 1, attrs: { shooting: 1 } } },
        critical: { text: "【灵光一闪】你甚至没看清自己做了什么。球已经在网里了！{companion1Name}冲过来，把你扑倒。「你他妈！」", effects: { reputation: 12, goals: 1, attrs: { shooting: 1, burst: 1 } } },
        fail: { text: "你射了，偏了。球飞过了铁门，飞进了旁边的荒地。哨响了，{lastScore}。", effects: { demonValue: 2, stamina: -5 } }
      },
      { id: "B", text: "传给{companion1Name}", check: { attrs: ["passing", "vision"], difficulty: 18, tag: "传球+视野" }, next: "ch1_match_after",
        success: { text: "你没贪，你传了。{companion1Name}接球，转身，射，进了！他朝你跑过来，你们撞了一下胸。", effects: { reputation: 5, assists: 1, bonds: { tongpao: 2 } } },
        fail: { text: "传球力量大了，{companion1Name}没追上，球出了底线。他朝你摊了摊手。", effects: { stamina: -3 } }
      }
    ]
  },

  // 赛后·结算
  {
    id: "ch1_match_after",
    chapter: 1,
    text: [
      "哨响。1-0。赢了。",
      "李教习走过来，脸上没什么表情。「还行。」他说，然后转身走了。",
      "{companion1Name}搂着你的肩膀。「第一场，赢了。」他笑。「以后会赢更多。」",
      "你看着那块土场。铁门，麻绳网，歪牌子。以后。"
    ],
    effects: { reputation: 3, matches: 1, wins: 1, chapter: 1, age: 1 },
    next: "ch2_opening"
  }

] };
