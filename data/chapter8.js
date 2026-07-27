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
      "帝都，天罡训练基地。十一个淬炼营幸存者再度集结，胸前的队徽是一枚七星连珠——「天罡联队」。",
      "姜太虚负手立于阵前：「全国U20大赛，三十二支豪强。你们个人都是天才，但天才凑在一起，未必是强队。」",
      "他目光扫过众人，最后落在你身上：「六周之内，我要把你们十一块棱角分明的石头，锻成一柄剑。剑成之日，就是问鼎之时。」"
    ],
    system: "【第八章·全国大赛 开启。天罡联队成军，目标——全国冠军。】",
    next: "ch8_captain"
  },

  // 队长选举（选择你的姿态）
  {
    id: "ch8_captain",
    chapter: 8,
    text: [
      "第一堂训练课，姜太虚宣布：「队长一职，不设投票，自荐者出列。」",
      "人群一阵骚动。赵凛抱臂冷笑，林啸望天，阿贵用胳膊肘捅你。",
      "姜太虚的目光意味深长：「队长，不是最强的那个，是让最强的人愿意听他的那个。」"
    ],
    choices: [
      { id: "A", text: "出列自荐：我来当这个队长", check: { attrs: ["resolve", "pressure"], difficulty: 42, tag: "决断+抗压" }, next: "ch8_group1",
        success: { text: "你出列，目光扫过全场。赵凛挑眉，却没有反对。姜太虚颔首：「勇气可嘉。队长，从扛住压力开始。」", effects: { reputation: 8, attrs: { resolve: 1 }, flags: { isCaptain: true } } },
        fail: { text: "你出列的瞬间，有人嗤笑出声。姜太虚淡淡道：「先证明，再说话。」", effects: { stamina: -4 } },
        critical: { text: "【灵光一闪】你出列，只说了一句：「球给我，赢下来。」全场寂静，随即爆发出喝彩。姜太虚笑了：「有点球圣的样子了。」", effects: { reputation: 15, attrs: { resolve: 2 }, flags: { isCaptain: true, keySuccess: true } } }
      },
      { id: "B", text: "推举赵凛：让宿敌扛旗，你辅佐", check: { attrs: ["iq", "passing"], difficulty: 38, tag: "球商+传球" }, next: "ch8_group1",
        success: { text: "你推举赵凛，他意外地看你一眼，接过袖标。你甘当绿叶，串联全队。", effects: { reputation: 5, bonds: { zhaolin: 12 }, attrs: { iq: 1 } } },
        fail: { text: "赵凛冷哼：「不需要让。」气氛一时僵硬。", effects: { stamina: -3 } }
      },
      { id: "C", text: "静观其变：让位置说话", check: { attrs: ["positioning", "rhythm"], difficulty: 34, tag: "站位+节奏" }, next: "ch8_group1",
        success: { text: "你不争不抢，用训练赛的表现说话。姜太虚看在眼里：「沉得住气。」", effects: { reputation: 4, attrs: { positioning: 1 } } },
        fail: { text: "你沉默太久，存在感被稀释。", effects: { stamina: -3 } }
      }
    ]
  },

  // 小组赛第1场（以强打弱）
  {
    id: "ch8_group1",
    chapter: 8,
    type: "match",
    text: "小组赛首轮。天罡联队对阵一支地方选拔队，实力差距明显。姜太虚提醒：「虐菜，也要虐出章法。大胜不是目的，演练战术才是。」",
    opponent: { name: "南岳选拔队", element: "木", strength: 44 },
    teamBase: 34,
    fallback_choices: [
      { id: "A", sit: "attack", text: "高位逼抢，闪电战开局", check: { attrs: ["burst", "shooting"], difficulty: 40, tag: "爆发+射门" },
        success: { text: "开场五分钟，你{elementAdj}地前场断球，单刀破门！闪电战奏效。", effects: { reputation: 9, goals: 1, attrs: { burst: 1 } } },
        fail: { text: "逼抢过猛，阵型脱节，被对手打反击。", effects: { stamina: -5 } },
        critical: { text: "【灵光一闪】你开场闪击破门，随后又助攻一次，半场就锁定胜局！", effects: { reputation: 16, goals: 1, assists: 1, attrs: { burst: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "演练传控，磨合阵容", check: { attrs: ["passing", "vision"], difficulty: 38, tag: "传球+视野" },
        success: { text: "你与林啸、苏晚连续传递，把对手遛得团团转，助攻队友破门。", effects: { reputation: 7, assists: 1, bonds: { linxiao: 8, suwan: 8 }, attrs: { passing: 1 } } },
        fail: { text: "传控配合生疏，被对手断球。", effects: { stamina: -4 } }
      },
      { id: "C", sit: "defense", text: "稳守演练，试验新阵", check: { attrs: ["positioning", "tackle"], difficulty: 32, tag: "站位+铲断" },
        success: { text: "你坐镇后场，新阵型运转流畅，零封对手。", effects: { reputation: 5, attrs: { positioning: 1 } } },
        fail: { text: "新阵型磨合不足，被对手偷一个。", effects: { stamina: -4 } }
      }
    ],
    result: {
      bigwin: { text: "小组赛首战大胜！天罡联队锋芒初露，媒体开始关注这支「天才之师」。", effects: { reputation: 9 } },
      win:     { text: "小胜。姜太虚点评：「赢了，但不够流畅。」", effects: { reputation: 6 } },
      draw:    { text: "爆冷战平。更衣室里一片死寂，姜太虚摔了战术板。", effects: { reputation: 1, demonValue: 3 } },
      lose:    { text: "首战告负，舆论哗然。「天才之师」成了笑话。", effects: { reputation: -5, stamina: -6, demonValue: 5 } }
    },
    next: "ch8_group2"
  },

  // 小组赛第2场（势均力敌）
  {
    id: "ch8_group2",
    chapter: 8,
    type: "match",
    text: "小组赛次轮，出线关键战。对手「北境狼骑」作风彪悍，以高强度对抗著称，与天罡联队实力在伯仲之间。",
    opponent: { name: "北境狼骑", element: "金", strength: 52 },
    teamBase: 34,
    fallback_choices: [
      { id: "A", sit: "attack", text: "以快制硬，用速度撕开铁壁", check: { attrs: ["speed", "dribble"], difficulty: 44, tag: "速度+盘带" },
        success: { text: "你{elementAdj}地连续变向，晃开金灵根后卫，推射入网！", effects: { reputation: 11, goals: 1, attrs: { speed: 1 } } },
        fail: { text: "对抗太硬，你被撞得失去平衡。", effects: { stamina: -6 } },
        critical: { text: "【灵光一闪】你在三人包夹中强行突破破门！解说：「这就是天才的含金量！」", effects: { reputation: 18, goals: 1, attrs: { speed: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "避实击虚，打他们身后", check: { attrs: ["iq", "passing"], difficulty: 42, tag: "球商+传球" },
        success: { text: "你佯装强攻，一记直塞打穿身后，队友轻松破门。", effects: { reputation: 8, assists: 1, attrs: { iq: 1 } } },
        fail: { text: "对手回防及时，直塞被拦截。", effects: { stamina: -5 } }
      },
      { id: "C", sit: "defense", text: "硬碰硬，用对抗回应", check: { attrs: ["strength", "pressure"], difficulty: 44, tag: "对抗+抗压" },
        success: { text: "你不落下风，全场对抗五五开，稳住军心。", effects: { reputation: 7, attrs: { strength: 1 } } },
        fail: { text: "对抗中被对手压制，场面被动。", effects: { stamina: -6 } }
      }
    ],
    result: {
      bigwin: { text: "关键战大胜！天罡联队提前锁定小组头名。", effects: { reputation: 10, flags: { keySuccess: true } } },
      win:     { text: "险胜出线！更衣室里，十一个人的手叠在一起。", effects: { reputation: 7 } },
      draw:    { text: "战平，凭净胜球勉强出线。", effects: { reputation: 3 } },
      lose:    { text: "关键战告负，小组出局。天罡联队沦为笑柄。", effects: { reputation: -6, stamina: -6, demonValue: 6 } }
    },
    next: "ch8_split"
  },

  // 战术分歧（队内矛盾·选择站队）
  {
    id: "ch8_split",
    chapter: 8,
    text: [
      "淘汰赛前夜，战术会议上爆发激烈争执。",
      "赵凛主张「球星战术」：把球交给最强的他，单打解决问题。林啸拍案而起：「足球是十一个人的！」两人针锋相对，更衣室几乎炸锅。",
      "姜太虚不发一言，只看向你：「你是核心。你说，怎么踢？」"
    ],
    choices: [
      { id: "A", text: "支持团队：足球是十一个人的", check: { attrs: ["iq", "passing"], difficulty: 40, tag: "球商+传球" }, next: "ch8_quarter",
        success: { text: "你力主团队足球，用训练赛的默契说服众人。赵凛沉默良久，最终点头：「那就证明给我看。」", effects: { reputation: 6, bonds: { linxiao: 10 }, attrs: { iq: 1 }, flags: { teamFirst: true } } },
        fail: { text: "你的话没能压住火药味，会议不欢而散。", effects: { stamina: -4, demonValue: 2 } }
      },
      { id: "B", text: "支持赵凛：关键球就该交给最强的人", check: { attrs: ["resolve", "shooting"], difficulty: 40, tag: "决断+射门" }, next: "ch8_quarter",
        success: { text: "你支持球星战术，赵凛眼中燃起战意：「算你识货。」你与他的默契，又近一步。", effects: { reputation: 5, bonds: { zhaolin: 12 }, attrs: { resolve: 1 } } },
        fail: { text: "林啸摔门而去，队伍出现裂痕。", effects: { stamina: -4, demonValue: 2 } }
      },
      { id: "C", text: "折中：常规时间团队，最后十分钟交给球星", check: { attrs: ["iq", "pressure"], difficulty: 44, tag: "球商+抗压" }, next: "ch8_quarter",
        success: { text: "你提出折中方案，两人都勉强接受。姜太虚眼中闪过一丝赞许：「和稀泥，也是本事。」", effects: { reputation: 7, bonds: { zhaolin: 6, linxiao: 6 }, attrs: { iq: 1 } } },
        fail: { text: "两边不讨好，会议陷入僵局。", effects: { stamina: -5, demonValue: 3 } }
      }
    ]
  },

  // 四分之一决赛
  {
    id: "ch8_quarter",
    chapter: 8,
    type: "match",
    text: "八强战。对手「东瀛海忍」以诡谲多变的传切著称，防守如流水，进攻如暗潮。姜太虚布置：「以不变应万变，抓住他们换气的瞬间。」",
    opponent: { name: "东瀛海忍", element: "水", strength: 54 },
    teamBase: 34,
    fallback_choices: [
      { id: "A", sit: "attack", text: "抢开局，打乱他们的节奏", check: { attrs: ["burst", "shooting"], difficulty: 44, tag: "爆发+射门" },
        success: { text: "开场闪电战，你{elementAdj}地抢射破门，打乱对手部署！", effects: { reputation: 11, goals: 1, attrs: { burst: 1 } } },
        fail: { text: "对手传切如水，你的逼抢扑了空。", effects: { stamina: -5 } },
        critical: { text: "【灵光一闪】你开场闪击+中场奔袭梅开二度！海忍的流水阵被你一人搅浑。", effects: { reputation: 19, goals: 2, attrs: { burst: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "耐心周旋，等他们换气", check: { attrs: ["rhythm", "iq"], difficulty: 42, tag: "节奏+球商" },
        success: { text: "你稳住节奏，在对手换气的瞬间送出致命直塞，助攻破门！", effects: { reputation: 8, assists: 1, attrs: { rhythm: 1 } } },
        fail: { text: "对手的传切让你疲于奔命。", effects: { stamina: -5 } }
      },
      { id: "C", sit: "defense", text: "冻结他们的核心组织者", check: { attrs: ["tackle", "intercept"], difficulty: 44, tag: "铲断+拦截" },
        success: { text: "你全场冻结对方核心，海忍的传切体系瘫痪。", effects: { reputation: 7, attrs: { tackle: 1 } } },
        fail: { text: "对手核心一个变向，制造杀机。", effects: { stamina: -6 } }
      }
    ],
    result: {
      bigwin: { text: "八强战大胜！天罡联队气势如虹，四强在望。", effects: { reputation: 9 } },
      win:     { text: "小胜晋级四强！看台上，天罡联队的旗帜开始飘扬。", effects: { reputation: 6 } },
      draw:    { text: "战平，加时苦战后点球险胜。", effects: { reputation: 4, stamina: -8 } },
      lose:    { text: "八强战折戟，全国大赛止步。", effects: { reputation: -5, stamina: -6, demonValue: 5 } }
    },
    next: "ch8_semi"
  },

  // 半决赛·新宿敌（土灵根中锋·石破岳，"不动如山"克制冲击）
  {
    id: "ch8_semi",
    chapter: 8,
    type: "match",
    text: [
      "半决赛。对手「西极磐石」的核心，是一名你从未见过的怪物——土灵根中锋，石破岳。",
      "他身高体壮，往禁区一站，便如一座山岳。解说惊叹：「不动如山！他的防守，是所有冲击型前锋的噩梦！」",
      "姜太虚看向你：「你的冲击，遇上他的山。是山崩，还是石碎，场上见分晓。」"
    ],
    opponent: { name: "西极磐石·石破岳", element: "土", strength: 58 },
    teamBase: 34,
    fallback_choices: [
      { id: "A", sit: "attack", text: "正面冲击，用爆发撼动山岳", check: { attrs: ["burst", "power"], difficulty: 48, tag: "爆发+力量" },
        success: { text: "你{elementAdj}地全力冲击，硬生生从石破岳身边挤过，推射入网！山，被你撼动了！", effects: { reputation: 14, goals: 1, attrs: { burst: 1 } } },
        fail: { text: "石破岳纹丝不动，你的冲击撞上了铁壁。", effects: { stamina: -7 } },
        critical: { text: "【灵光一闪】你在石破岳头顶完成一记惊天头槌！这座山，被你搬动了！全场起立！", effects: { reputation: 24, goals: 1, attrs: { burst: 2, power: 1 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "调虎离山，引他出击打身后", check: { attrs: ["iq", "passing"], difficulty: 44, tag: "球商+传球" },
        success: { text: "你佯装强突，引石破岳出击后突然分球，队友打空门得手！", effects: { reputation: 10, assists: 1, attrs: { iq: 1 } } },
        fail: { text: "石破岳不为所动，你的计谋落空。", effects: { stamina: -5 } }
      },
      { id: "C", sit: "defense", text: "避开锋芒，用传控消耗他", check: { attrs: ["rhythm", "passing"], difficulty: 40, tag: "节奏+传球" },
        success: { text: "你避开石破岳的防区，用传控消耗对手体能，终场前偷袭得手。", effects: { reputation: 8, goals: 1, attrs: { rhythm: 1 } } },
        fail: { text: "传控被对手的高压逼抢打断。", effects: { stamina: -5 } }
      }
    ],
    result: {
      bigwin: { text: "大胜！石破岳走过你身边，第一次正眼看你：「决赛，别输。」", effects: { reputation: 13, flags: { keySuccess: true } } },
      win:     { text: "险胜晋级决赛！你与石破岳的对抗，成为本届大赛最经典的画面。", effects: { reputation: 9 } },
      draw:    { text: "战平，加时苦战后点球险胜。石破岳的阴影，仍未散去。", effects: { reputation: 4, stamina: -8 } },
      lose:    { text: "你输给了石破岳。他淡淡道：「山，不是你想撼就能撼的。」", effects: { reputation: -6, stamina: -6, demonValue: 6 } }
    },
    next: "ch8_final"
  },

  // 决赛·BOSS（卫冕冠军·天阙皇朝，胜利设 nationalChamp）
  {
    id: "ch8_final",
    chapter: 8,
    type: "match",
    text: [
      "决赛之夜。天罡竞技场座无虚席，灯火如昼。",
      "对手是卫冕冠军「天阙皇朝」——一支由职业梯队精英组成的王者之师，阵中三名球员已达通脉境。",
      "姜太虚最后一次布置战术，目光扫过你们每一个人：「六周前，你们是十一块石头。现在，你们是一柄剑。出鞘吧。」",
      "赵凛活动着手腕，林啸系紧鞋带，阿贵深呼吸。你望向看台——矿坑的方向。这一战，为所有相信过你的人。"
    ],
    opponent: { name: "天阙皇朝·卫冕冠军", element: "火", strength: 62 },
    teamBase: 34,
    fallback_choices: [
      { id: "A", sit: "attack", text: "决胜时刻，一剑封喉", check: { attrs: ["shooting", "resolve"], difficulty: 50, tag: "射门+决断" },
        success: { text: "终场前，你{elementAdj}地一脚爆射洞穿十指关！天罡联队，冠军！", effects: { reputation: 18, goals: 1, attrs: { shooting: 1 } } },
        fail: { text: "射门被对方门将神勇扑出。", effects: { stamina: -7 } },
        critical: { text: "【灵光一闪】你在决赛轰出惊世世界波！皮球划破夜空，直挂死角！全国冠军，属于天罡联队！", effects: { reputation: 30, goals: 1, attrs: { shooting: 2, resolve: 1 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "团队配合，撕开王者防线", check: { attrs: ["passing", "vision"], difficulty: 46, tag: "传球+视野" },
        success: { text: "你与赵凛、林啸打出教科书般的三角配合，助攻队友打进制胜球！", effects: { reputation: 12, assists: 1, bonds: { zhaolin: 10, linxiao: 10 }, attrs: { passing: 1 } } },
        fail: { text: "王者防线密不透风，配合被断。", effects: { stamina: -6 } }
      },
      { id: "C", sit: "defense", text: "先稳住，把比赛拖入你的节奏", check: { attrs: ["pressure", "positioning"], difficulty: 42, tag: "抗压+站位" },
        success: { text: "你顶住卫冕冠军的狂攻，稳住军心，为反击保留火种。", effects: { reputation: 8, attrs: { pressure: 1 } } },
        fail: { text: "卫冕冠军的攻势如潮，防线摇摇欲坠。", effects: { stamina: -7 } }
      }
    ],
    result: {
      bigwin: { text: "决赛大胜！天罡联队问鼎全国！你举起奖杯的那一刻，全场高呼你的名字。【全国冠军·达成】", effects: { reputation: 20, flags: { nationalChamp: true, keySuccess: true } } },
      win:     { text: "决赛险胜！终场哨响，十一个少年相拥而泣。全国冠军，属于天罡联队！【全国冠军·达成】", effects: { reputation: 15, flags: { nationalChamp: true } } },
      draw:    { text: "决赛战平，点球惜败。冠军，差一步。", effects: { reputation: 5, demonValue: 5 } },
      lose:    { text: "决赛告负。天阙皇朝卫冕成功，你们倒在最后一关。", effects: { reputation: -4, stamina: -8, demonValue: 8 } }
    },
    next: "ch8_contract"
  },

  // 合同蜂拥（名利场初现）
  {
    id: "ch8_contract",
    chapter: 8,
    text: [
      "夺冠之夜，你的电话被打爆。经纪人、俱乐部、赞助商，如潮水般涌来。",
      "桌上摆着三份合同：金阙皇朝的天价邀约、青云母队的续约、以及一份来自海外「五洲天罡联赛」豪门的试训邀请。",
      "孙先生提醒：「记住，合同签的不是钱，是未来。」"
    ],
    choices: [
      { id: "A", text: "先不急，听听所有报价再说", effects: { reputation: 3, spiritStones: 10 }, next: "ch8_end" },
      { id: "B", text: "婉拒所有邀约，先回母队", effects: { reputation: 2, bonds: { agui: 5 } }, next: "ch8_end" },
      { id: "C", text: "对海外试训邀请表现出兴趣", effects: { reputation: 4, flags: { overseasInterest: true } }, next: "ch8_end" }
    ]
  },

  // 章末 → 第九章《抉择·上》
  {
    id: "ch8_end",
    chapter: 8,
    text: [
      "庆功宴散场，你独自走上天台。帝都的万家灯火在脚下铺展，一如当年学院大比决赛前的那个夜晚。",
      "只是这一次，站在你身边的，不再是五个少年，而是整个时代的聚光灯。",
      "手机亮起，是国家队的征召短信。你深吸一口气——职业巅峰的大门，已经敞开。"
    ],
    system: "【第八章·全国大赛 完。天罡联队问鼎全国。接下来：第九章·抉择·上（职业巅峰）。】",
    effects: { chapter: 1, age: 1 },
    next: "ch9_opening"
  }

] };
