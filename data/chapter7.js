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
      "第7周开始，淬炼营的空气愈发凝重。二十二人的名单，每周都在缩短。",
      "你亲眼看着一个个名字被念出，一个个天才黯然下山。有人崩溃大哭，有人沉默离场。",
      "深夜，你躺在硬板床上，听着窗外的风声。姜太虚的话在耳边回响：「真正的淬炼，现在才开始。」"
    ],
    system: "【第七章·淬炼营·存活 开启。22人→11人，每一步都是悬崖。】",
    next: "ch7_ladder"
  },

  // 天梯赛（挑战排名高于你的人，以弱打强）
  {
    id: "ch7_ladder",
    chapter: 7,
    type: "match",
    text: "第8周，1v1天梯赛——挑战排名高于你的人。你的目标是当前排名第三的强者，一名化域境边缘的土灵根中卫，绰号「山岳」。",
    opponent: { name: "淬炼营·山岳", element: "土", strength: 58 },
    fallback_choices: [
      { id: "A", sit: "attack", text: "正面挑战，用速度撕开山岳", check: { attrs: ["speed", "burst"], difficulty: 48, tag: "速度+爆发" },
        success: { text: "你{elementAdj}地高速变向，硬生生从山岳身边抹过，推射入网！", effects: { reputation: 12, goals: 1, attrs: { speed: 1 } } },
        fail: { text: "山岳稳如泰山，你的突破撞上了铁壁。", effects: { stamina: -6 } },
        critical: { text: "【灵光一闪】你晃倒了山岳！全场哗然——这座山，被你搬动了！", effects: { reputation: 20, goals: 1, attrs: { speed: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "调虎离山，引他出击再打身后", check: { attrs: ["iq", "passing"], difficulty: 44, tag: "球商+传球" },
        success: { text: "你佯装强突，引山岳出击后突然变向，打他身后破门！", effects: { reputation: 10, goals: 1, attrs: { iq: 1 } } },
        fail: { text: "山岳不为所动，你的计谋落空。", effects: { stamina: -5 } }
      },
      { id: "C", sit: "defense", text: "稳守反击，等他露出破绽", check: { attrs: ["positioning", "pressure"], difficulty: 38, tag: "站位+抗压" },
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
    text: "第9周，5v5团队赛——二十二人被随机分成四队。讽刺的是，你的队里，竟有之前1v1淘汰过你的对手。姜太虚冷笑：「学会和敌人并肩，是成为强者的第一课。」",
    opponent: { name: "淬炼营·玄武队", element: "水", strength: 55 },
    fallback_choices: [
      { id: "A", sit: "attack", text: "与昔日对手配合，化敌为友", check: { attrs: ["passing", "iq"], difficulty: 44, tag: "传球+球商" },
        success: { text: "你与昔日对手打出精妙配合，他破门后与你击掌。恩怨，在胜利面前烟消云散。", effects: { reputation: 9, assists: 1, attrs: { passing: 1 } } },
        fail: { text: "配合生疏，传球被断。", effects: { stamina: -5 } },
        critical: { text: "【灵光一闪】你与对手心意相通，一记撞墙配合洞穿防线！化敌为友，不过一脚球。", effects: { reputation: 16, assists: 1, attrs: { passing: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "扛起进攻核心，个人爆破", check: { attrs: ["shooting", "resolve"], difficulty: 46, tag: "射门+决断" },
        success: { text: "你{elementAdj}地连续突破，禁区内冷静施射破门！", effects: { reputation: 10, goals: 1, attrs: { shooting: 1 } } },
        fail: { text: "独木难支，你被围抢断球。", effects: { stamina: -6 } }
      },
      { id: "C", sit: "defense", text: "指挥防线，稳住军心", check: { attrs: ["positioning", "pressure"], difficulty: 38, tag: "站位+抗压" },
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
      "第10周。你已经淘汰了别人，也被别人淘汰过友谊。",
      "夜里，你梦见矿坑。梦见老陈。梦见那个用破布球踢墙的下午。",
      "心底深处，那个声音再次响起——「你踢球，是为了什么？」"
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
      "你沉默了。心魔也沉默了。",
      "你不知道。从矿坑边第一次踢起破布球的那天起，你就从没真正想过这个问题。好像只是……喜欢。喜欢到说不出为什么。",
      "当你不再执着于答案的那一刻，心魔竟自行消散。梦醒时分，你神台清明，仿佛卸下了千斤重担。窗外，昆仑的晨曦正穿透云海。"
    ],
    system: "【触发隐藏对话：心魔值清零。你失去了一夜安眠，却换来一次难得的通透。】",
    next: "ch7_final_duel"
  },

  // 终极1v1·天梯赛（最后2人争夺排名）
  {
    id: "ch7_final_duel",
    chapter: 7,
    text: [
      "第11周，终极天梯——最后两人争夺营中排名第一的宝座。",
      "站在你对面的，赫然是赵凛。他一路过关斩将，与你双双杀到了最后。",
      "「又是你。」赵凛活动着手腕，眼中燃烧着战意，「也好。就让所有人看看，谁才是这一代的最强。」"
    ],
    choices: [
      { id: "A", text: "全力以赴，正面击溃他", check: { attrs: ["shooting", "burst"], difficulty: 50, tag: "射门+爆发" }, next: "ch7_master",
        success: { text: "决胜回合，你{elementAdj}地一脚爆射洞穿十指关！营中第一，是你！", effects: { reputation: 14, goals: 1, bonds: { zhaolin: 15 }, attrs: { shooting: 1 } } },
        fail: { text: "赵凛技高一筹，你惜败。他伸出手：「下次。」", effects: { stamina: -6, demonValue: 5 } },
        critical: { text: "【灵光一闪】你在赵凛面前轰出惊世一击！他望着滚入网窝的皮球，久久无言，最终笑了：「不愧是你。」", effects: { reputation: 24, goals: 1, bonds: { zhaolin: 20 }, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", text: "以守为攻，拖垮他的锐气", check: { attrs: ["tackle", "pressure"], difficulty: 46, tag: "铲断+抗压" }, next: "ch7_master",
        success: { text: "你全场缠斗，赵凛锐气渐消，你抓住破绽一击制胜！", effects: { reputation: 12, goals: 1, bonds: { zhaolin: 12 }, attrs: { tackle: 1 } } },
        fail: { text: "赵凛看穿你的意图，一记冷射破门。", effects: { stamina: -6 } }
      }
    ]
  },

  // 营主·姜太虚·指点赛（BOSS，"撑住几回合"）
  {
    id: "ch7_master",
    chapter: 7,
    text: [
      "第12周。姜太虚选了你。",
      "他缓步走上球场，周身灵力如渊似海：「让我看看，你能在我面前撑几个回合。」",
      "这不是胜负判定，是「撑住几回合」——三回合为优秀，五回合为天才，七回合……是球圣之资。"
    ],
    choices: [
      { id: "A", text: "毫无保留，向最强者亮剑", check: { attrs: ["resolve", "shooting"], difficulty: 55, tag: "决断+射门" }, next: "ch7_photo",
        success: { text: "你撑过了五个回合！姜太虚收手，眼中罕见地露出一丝赞许：「天才。」", effects: { reputation: 20, attrs: { resolve: 2, shooting: 1 } } },
        fail: { text: "你撑过了三个回合，已是极限。姜太虚淡淡道：「优秀。但还不够。」", effects: { reputation: 10, stamina: -10 } },
        critical: { text: "【灵光一闪】你竟撑过了七个回合！姜太虚周身灵力一收，深深看你一眼：「球圣之资。记住今天的感觉——那叫『天人感应』。」", effects: { reputation: 30, attrs: { resolve: 3, shooting: 2 }, flags: { tianrenGanying: true, keySuccess: true } } }
      },
      { id: "B", text: "以守为盾，尽量拖延回合", check: { attrs: ["positioning", "pressure"], difficulty: 50, tag: "站位+抗压" }, next: "ch7_photo",
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
      "六周淬炼，尘埃落定。十一个名字，被刻在淬炼营的石碑上。",
      "姜太虚让人取来一台老式相机：「合个影吧。从今往后，你们就是『天罡联队』的雏形。将来在更大的赛场上，你们会再次并肩——或者，再次为敌。」",
      "十一个少年在悬空球场前站成一排。快门按下的一瞬，云海翻涌，阳光正好。"
    ],
    system: "【幸存者合影：11人。天罡联队的羁绊，就此结下。】",
    next: "ch7_leave"
  },

  // 离营·索道下降（回望昆仑，独白）
  {
    id: "ch7_leave",
    chapter: 7,
    text: [
      "索道缓缓下降，昆仑雪峰在身后渐渐远去。你回望那座悬空球场，六周的汗水与泪水，都留在了云海之上。",
      "身边的赵凛忽然开口，声音低得只有你能听见：「全国大赛，天罡联队。别拖后腿。」",
      "你笑了。这个家伙，连告别都要挑衅。但你心里清楚——这，就是你们之间独有的默契。"
    ],
    next: "ch7_end"
  },

  // 章末 → 第八章《全国大赛》
  {
    id: "ch7_end",
    chapter: 7,
    text: [
      "山脚下，孙先生早已等候多时。他递来一份文件：「全国U20大赛，天罡亚洲联队正式成军。姜太虚亲自挂帅，你们十一个淬炼营幸存者，就是这支队伍的核心。」",
      "你接过文件，指尖微微发烫。从矿坑少年到淬炼营幸存者，再到国字号联队——这条路，你走了整整七年。",
      "而全国大赛的烽火，已经点燃。"
    ],
    system: "【第七章·淬炼营·存活 完。22人→11人。接下来：第八章·全国大赛。】",
    effects: { chapter: 1, age: 1 },
    next: "ch8_opening"
  }

] };
