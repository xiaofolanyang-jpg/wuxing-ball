/* data/chapter7.js — 第七章《淬炼营·存活》（设计稿第八章·17-18岁后6周）
 * 事件链：天梯赛(以弱打强) → 5v5团队赛 → 天劫·心魔劫 → 终极1v1 → 营主指点赛(BOSS) → 幸存者合影 → 离营 → 章末
 * 说明：淘汰加速，22人→11人。天劫·第二劫（心魔劫）为纯选择无检定。
 *       营主·姜太虚指点赛采用"撑住几回合"简化判定（critical=7回合/success=5回合/fail=3回合）。
 */
window.CHAPTER7 = { events: [

  // 开场：后6周，淘汰加速
  {
    id: "ch7_opening",
    chapter: 7,
    text: [
      "第7周。食堂的桌子空了一半，不用收，也没人坐。打饭的师傅还是盛那么多菜，但倒掉的越来越多了。澡堂里不用再抢位置，水龙头滴水的声音变得很清楚。",
      "每周日晚上名单会更新。你不再去看了。但声音会自己传过来——拉链拉上的声音，鞋底蹭过走廊的声音，偶尔有人把门带得很轻，像是怕吵醒谁。",
      "夜里你躺在硬板床上，褥子薄得能摸到床板的木纹。窗外的风整夜不停地刮，像有人拿指甲划铁皮。你翻了个身，姜太虚那句话又冒出来了：「还站着呢。行。」你盯着天花板，很久没睡着。"
    ],
    system: "【第七章·淬炼营·存活 开启。22人→11人，每一步都是悬崖。】",
    next: "ch7_ladder"
  },

  // 天梯赛（挑战排名高于你的人，以弱打强）
  {
    id: "ch7_ladder",
    chapter: 7,
    type: "match",
    text: "第8周，天梯赛。规则：挑排名比你高的人打。你抽到的是第三名，绰号「山岳」。土灵根，中卫，化域境边缘。他比你高一个头，肩宽得像一扇门板，站在禁区里不用动，你就觉得传球线路全被堵死了。他热身的方式是原地跺脚，你隔着十米都能感觉到草皮在颤。",
    opponent: { name: "淬炼营·山岳", element: "土", strength: 58 },
    fallback_choices: [
      { id: "A", sit: "attack", text: "正面挑战，用速度撕开山岳", check: { attrs: ["speed", "burst"], difficulty: 46, tag: "速度+爆发" },
        success: { text: "你{elementAdj}地高速变向，硬生生从山岳身边抹过，推射入网！", effects: { reputation: 12, goals: 1, attrs: { speed: 1 } } },
        fail: { text: "山岳稳如泰山，你的突破撞上了铁壁。", effects: { stamina: -6 } },
        critical: { text: "【灵光一闪】你晃倒了山岳！全场哗然——这座山，被你搬动了！", effects: { reputation: 20, goals: 1, attrs: { speed: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "调虎离山，引他出击再打身后", check: { attrs: ["iq", "passing"], difficulty: 42, tag: "球商+传球" },
        success: { text: "你佯装强突，引山岳出击后突然变向，打他身后破门！", effects: { reputation: 10, goals: 1, attrs: { iq: 1 } } },
        fail: { text: "山岳不为所动，你的计谋落空。", effects: { stamina: -5 } }
      },
      { id: "C", sit: "defense", text: "稳守反击，等他露出破绽", check: { attrs: ["positioning", "pressure"], difficulty: 36, tag: "站位+抗压" },
        success: { text: "你耐心周旋，终于等到山岳一次走神，反击破门！", effects: { reputation: 8, goals: 1, attrs: { positioning: 1 } } },
        fail: { text: "山岳的压迫感让你喘不过气。", effects: { stamina: -6 } }
      }
    ],
    result: {
      bigwin: { text: "天梯赛大胜！你踩着山岳的肩膀，排名飙升。", effects: { reputation: 12, flags: { keySuccess: true } } },
      win:     { text: "险胜强者！你的名字，开始被营中众人敬畏。", effects: { reputation: 9 } },
      draw:    { text: "战平强者，虽未登顶，却赢得了尊重。", effects: { reputation: 5 } },
      lose:    { text: "挑战失败。山岳走过你身边：「再来。」", effects: { reputation: -3, stamina: -6, demonValue: 4 } }
    },
    next: "ch7_5v5"
  },

  // 5v5团队赛（22人分4队，队内有之前的对手）
  {
    id: "ch7_5v5",
    chapter: 7,
    type: "match",
    text: "第9周，5v5。二十二个人分四队，抽签。你低头看自己的分组，然后抬头——对面站着上周1v1把你铲翻的那个人。他也看见你了。两个人都没说话。他冲你点了一下头，很轻，像是说「行吧」，又像是说「别拖后腿」。姜太虚在场边嗑瓜子，头都没抬：「跟仇人不会踢球？那下山去。」",
    opponent: { name: "淬炼营·玄武队", element: "水", strength: 55 },
    fallback_choices: [
      { id: "A", sit: "attack", text: "与昔日对手配合，化敌为友", check: { attrs: ["passing", "iq"], difficulty: 42, tag: "传球+球商" },
        success: { text: "你与昔日对手打出精妙配合，他破门后与你击掌。恩怨，在胜利面前烟消云散。", effects: { reputation: 9, assists: 1, attrs: { passing: 1 } } },
        fail: { text: "配合生疏，传球被断。", effects: { stamina: -5 } },
        critical: { text: "【灵光一闪】你与对手心意相通，一记撞墙配合洞穿防线！化敌为友，不过一脚球。", effects: { reputation: 16, assists: 1, attrs: { passing: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "扛起进攻核心，个人爆破", check: { attrs: ["shooting", "resolve"], difficulty: 44, tag: "射门+决断" },
        success: { text: "你{elementAdj}地连续突破，禁区内冷静施射破门！", effects: { reputation: 10, goals: 1, attrs: { shooting: 1 } } },
        fail: { text: "独木难支，你被围抢断球。", effects: { stamina: -6 } }
      },
      { id: "C", sit: "defense", text: "指挥防线，稳住军心", check: { attrs: ["positioning", "pressure"], difficulty: 36, tag: "站位+抗压" },
        success: { text: "你指挥若定，防线固若金汤。", effects: { reputation: 6, attrs: { positioning: 1 } } },
        fail: { text: "防线被对手打穿。", effects: { stamina: -5 } }
      }
    ],
    result: {
      bigwin: { text: "团队赛大胜！你的队伍以头名晋级。", effects: { reputation: 10 } },
      win:     { text: "险胜。团队的力量，让你走得更远。", effects: { reputation: 7 } },
      draw:    { text: "战平，凭积分勉强晋级。", effects: { reputation: 3 } },
      lose:    { text: "团队赛告负，你的队伍被淘汰两人。", effects: { reputation: -4, stamina: -6, demonValue: 5 } }
    },
    next: "ch7_demon"
  },

  // 天劫·第二劫·心魔劫（纯选择，无检定）
  {
    id: "ch7_demon",
    chapter: 7,
    text: [
      "第10周。你记不清自己淘汰了几个人，也记不清被谁淘汰过。名字混在一起，脸也混在一起。",
      "那天夜里你做了个梦。不是完整的梦，是碎片。矿坑的铁锈味。老陈拿搪瓷缸子喝茶，缸子上印着「安全生产」。一面土墙。破布球弹回来砸在脚背上，不疼。你一直在踢，一直在踢，天黑了还在踢。",
      "然后你醒了。凌晨三点，风停了，安静得不正常。你盯着天花板，脑子里冒出一个问题，没头没尾的：你踢球，到底是为了什么？你翻了个身，想把它按下去。按不住。"
    ],
    system: "【天劫·第二劫·心魔劫降临。此关纯淬炼心境，无检定。你的回答，将决定心魔值的去留。】",
    choices: [
      { id: "A", text: "为了赢。", effects: { attrs: { resolve: 5 }, demonValue: 10 }, next: "ch7_final_duel" },
      { id: "B", text: "为了快乐。", effects: { demonValue: -20, reputation: 2 }, next: "ch7_final_duel" },
      { id: "C", text: "为了证明他们错了。", effects: { allAttrsPercent: 3, demonValue: 15 }, next: "ch7_final_duel" },
      { id: "D", text: "……我不知道。", effects: { demonValue: -999, stamina: -15 }, next: "ch7_demon_hidden" }
    ]
  },

  // 心魔劫·隐藏对话（选项D触发）
  {
    id: "ch7_demon_hidden",
    chapter: 7,
    text: [
      "你没回答。那个问题就悬在那儿，你也没去赶它。",
      "你不知道。从矿坑边第一次把破布球踢出去的那天起，你就没想过「为了什么」。好像没有为什么。脚碰到球，球滚出去，你就想再踢一脚。就这么简单。简单到你说不出口，觉得它不像一个答案。",
      "但你不再较劲了。那个问题还在，只是不扎人了。你闭上眼，不知道什么时候睡着的。再睁眼的时候，窗玻璃上有一层薄霜，霜后面透出灰白色的光。天亮了。你坐起来，脖子有点僵，但脑子很轻。"
    ],
    system: "【触发隐藏对话：心魔值清零。你失去了一夜安眠，却换来一次难得的通透。】",
    next: "ch7_final_duel"
  },

  // 终极1v1·天梯赛（最后2人争夺排名）
  {
    id: "ch7_final_duel",
    chapter: 7,
    text: [
      "第11周。终极天梯。最后两个人，争第一。",
      "你走到球场中央的时候，对面已经有人了。武石。他的球鞋上全是草渍和擦痕，护腿板歪着，显然一路打上来没顾上换。他看见你，没笑，但肩膀松了一下，像是等了很久终于等到了。",
      "「又是你。」他把手腕转了两圈，骨节咔嗒响，「行。」就一个字。然后他弯下腰，双手撑在膝盖上，抬起头来看你。那个眼神你认识——不是恨，是饿。"
    ],
    choices: [
      { id: "A", text: "全力以赴，正面击溃他", check: { attrs: ["shooting", "burst"], difficulty: 48, tag: "射门+爆发" }, next: "ch7_master",
        success: { text: "决胜回合，你{elementAdj}地一脚爆射洞穿十指关！营中第一，是你！", effects: { reputation: 14, goals: 1, bonds: { zhaolin: 15 }, attrs: { shooting: 1 } } },
        fail: { text: "武石技高一筹，你惜败。他伸出手：「下次。」", effects: { stamina: -6, demonValue: 5 } },
        critical: { text: "【灵光一闪】你在武石面前轰出惊世一击！他望着滚入网窝的皮球，久久无言，最终笑了：「不愧是你。」", effects: { reputation: 24, goals: 1, bonds: { zhaolin: 20 }, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", text: "以守为攻，拖垮他的锐气", check: { attrs: ["tackle", "pressure"], difficulty: 44, tag: "铲断+抗压" }, next: "ch7_master",
        success: { text: "你全场缠斗，武石锐气渐消，你抓住破绽一击制胜！", effects: { reputation: 12, goals: 1, bonds: { zhaolin: 12 }, attrs: { tackle: 1 } } },
        fail: { text: "武石看穿你的意图，一记冷射破门。", effects: { stamina: -6 } }
      }
    ]
  },

  // 营主·姜太虚·指点赛（BOSS，"撑住几回合"）
  {
    id: "ch7_master",
    chapter: 7,
    text: [
      "第12周。姜太虚点了你的名。没原因，没解释。他嗑完最后一颗瓜子，把壳往兜里一揣，朝球场走了两步，回头看你：「来。」",
      "他站在中圈，手还是背在身后。你踏上球场的那一刻，腿突然沉了。不是紧张。是他身上的灵力在压你，像走进了深水里，每抬一下膝盖都要跟那股劲较劲。风停了。或者说，风不敢吹了。",
      "「不用赢。」他说，语气像在说今天食堂吃什么，「撑住就行。三回合，及格。五回合——」他想了想，「算你有点东西。七回合……」他没往下说。你咽了口唾沫。"
    ],
    choices: [
      { id: "A", text: "毫无保留，向最强者亮剑", check: { attrs: ["resolve", "shooting"], difficulty: 53, tag: "决断+射门" }, next: "ch7_photo",
        success: { text: "你撑过了五个回合！姜太虚收手，眼中罕见地露出一丝赞许：「天才。」", effects: { reputation: 20, attrs: { resolve: 2, shooting: 1 } } },
        fail: { text: "你撑过了三个回合，已是极限。姜太虚淡淡道：「优秀。但还不够。」", effects: { reputation: 10, stamina: -10 } },
        critical: { text: "【灵光一闪】你竟撑过了七个回合！姜太虚周身灵力一收，深深看你一眼：「球圣之资。记住今天的感觉——那叫『天人感应』。」", effects: { reputation: 30, attrs: { resolve: 3, shooting: 2 }, flags: { tianrenGanying: true, keySuccess: true } } }
      },
      { id: "B", text: "以守为盾，尽量拖延回合", check: { attrs: ["positioning", "pressure"], difficulty: 48, tag: "站位+抗压" }, next: "ch7_photo",
        success: { text: "你以守为盾，撑过五个回合。姜太虚点头：「韧性可嘉。」", effects: { reputation: 18, attrs: { positioning: 2 } } },
        fail: { text: "你撑过三个回合。姜太虚：「防守不错，但强者，要有獠牙。」", effects: { reputation: 9, stamina: -8 } }
      }
    ]
  },

  // 幸存者合影（11人，建立天罡联队关系）
  {
    id: "ch7_photo",
    chapter: 7,
    text: [
      "六周。十一个人。名单不再变了。",
      "姜太虚不知道从哪儿翻出一台海鸥牌相机，三角架缺了一条腿，拿砖头垫着。「站好。」他说。十一个人挤在球场门口，范志贵非要站你旁边，内牛尔被挤到最边上，武石双手插兜，下巴抬得老高。风把所有人的头发吹得乱七八糟，有人喊了三次「别动」都没用。",
      "快门按下去的时候，你眨了一下眼。后来洗出来的照片上，你是闭着眼的。但十一个人都在。都在就够了。"
    ],
    system: "【幸存者合影：11人。天罡联队的羁绊，就此结下。】",
    next: "ch7_leave"
  },

  // 离营·索道下降（回望昆仑，独白）
  {
    id: "ch7_leave",
    chapter: 7,
    text: [
      "索道往下走的时候，耳朵会嗡。你咽了两下口水才缓过来。悬空球场在头顶越来越小，最后被云盖住了。你没什么特别的感觉。就是觉得风小了，空气暖了，能闻到泥土味了。",
      "武石站在你旁边，手扶着吊厢的铁栏杆，指节发白。他忽然偏过头，声音压得很低，低到像是说给自己听的：「全国大赛。别让我等太久。」",
      "你没看他。但嘴角动了一下。这个人。你把手插进兜里，没接话。不用接。他也不需要你接。"
    ],
    next: "ch7_end"
  },

  // 章末 → 第八章《全国大赛》
  {
    id: "ch7_end",
    chapter: 7,
    text: [
      "山脚下有个停车场，孙德斯靠在一辆面包车旁边，手里夹着烟，看见你下来就把烟掐了，在鞋底上蹭了蹭。「等着呢。」他从副驾驶座上抽出一个牛皮纸袋，拍在你胸口，「全国U20，天罡联队。姜太虚挂帅。你们十一个人，是底子。」",
      "你翻开纸袋，里面是报名表、体检单、还有一张合影的位。孙德斯又点了根烟：「别当是青年赛糊弄。看台上坐的是职业队球探、国家队教练。踢好了，一步登天。踢砸了——」他吐了口烟，「也没关系，反正姜太虚不会让你们踢砸。」",
      "你站在停车场边上，风从山口灌出来，吹得纸袋哗哗响。七年了。你低头看了看自己的手，指节粗了，虎口有茧，小拇指歪过一次没正过来。你上了车。车发动的时候，你回头看了一眼山。云把什么都盖住了。你转回头，系好安全带。"
    ],
    system: "【第七章·淬炼营·存活 完。22人→11人。接下来：第八章·全国大赛。】",
    effects: { chapter: 1, age: 1 },
    next: "ch8_opening"
  }

] };
