/* data/chapter9.js — 第九章《抉择·上》（设计稿第十章上半·19-20岁·职业巅峰）
 * 事件链：职业抉择(3俱乐部) → 职业首秀(通脉境对手) → 代言vs训练 → 境界突破(凝形→通脉) → 宿敌终极对决(赵凛) → 国家队征召 → 章末
 * 说明：职业联赛开启。境界突破事件给予属性跃升，为"通脉"判定(任一属性≥45)铺路。
 *       宿敌对决推进赵凛羁绊至满，国家队征召设 nationalTeam 旗标。
 */
window.CHAPTER9 = { events: [

  // 开场：职业大门敞开
  {
    id: "ch9_opening",
    chapter: 9,
    text: [
      "十九岁。全国冠军的光环还未褪去，职业联赛的战鼓已经擂响。",
      "国家队的征召短信之后，是雪片般的俱乐部邀约。你站在职业生涯的十字路口，每一步都通向不同的未来。",
      "孙先生把三份合同摊在桌上：「选吧。记住，你签的不是俱乐部，是你想成为的那种球员。」"
    ],
    system: "【第九章·抉择·上 开启。职业巅峰，从一份合同开始。】",
    next: "ch9_contract_choice"
  },

  // 职业抉择（3俱乐部）
  {
    id: "ch9_contract_choice",
    chapter: 9,
    text: [
      "三份合同，三条路：",
      "金阙皇朝——国内豪门，天价年薪，但巨星云集，你只是众多天才之一；",
      "青云竞技——母队续约，薪资平平，但你是绝对核心，球迷视你为城市之子；",
      "五洲天罡·星辉队——海外豪门试训，风险最大，但那是世界之巅的入场券。"
    ],
    choices: [
      { id: "A", text: "加盟金阙皇朝：去豪门，抢冠军", effects: { reputation: 8, spiritStones: 30, flags: { clubJinque: true } }, next: "ch9_debut" },
      { id: "B", text: "留守青云竞技：一城一队，一生一芯", effects: { reputation: 5, bonds: { agui: 10 }, flags: { clubQingmu: true, choiceStay: true } }, next: "ch9_debut" },
      { id: "C", text: "远赴五洲试训：世界那么大，我想去看看", effects: { reputation: 10, flags: { clubOverseas: true, choiceTianguang: true } }, next: "ch9_debut" }
    ]
  },

  // 职业首秀（通脉境对手，职业联赛的洗礼）
  {
    id: "ch9_debut",
    chapter: 9,
    type: "match",
    text: [
      "职业联赛首轮，你的首秀。看台上座无虚席，无数双眼睛盯着这个全国冠军队的核心。",
      "对手阵中，一名通脉境的老将前锋放话：「全国冠军？在职业联赛，那只是起点。让我来教教新人，什么叫职业。」",
      "更衣室里，教练拍拍你的肩：「别怂。把你的球，踢出来。」"
    ],
    opponent: { name: "职业联赛·通脉境老将", element: "火", strength: 60 },
    teamBase: 36,
    fallback_choices: [
      { id: "A", sit: "attack", text: "首秀即爆发，用进球说话", check: { attrs: ["shooting", "burst"], difficulty: 48, tag: "射门+爆发" },
        success: { text: "首秀第30分钟，你{elementAdj}地一脚爆射洞穿十指关！职业联赛处子球，诞生！", effects: { reputation: 15, goals: 1, attrs: { shooting: 1 } } },
        fail: { text: "老将的防守老辣，你的射门被封堵。", effects: { stamina: -6 } },
        critical: { text: "【灵光一闪】首秀梅开二度！解说嘶吼：「天才！这是天才的处子秀！」那个放话的老将，沉默了。", effects: { reputation: 25, goals: 2, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "用传球串联，适应职业节奏", check: { attrs: ["passing", "iq"], difficulty: 44, tag: "传球+球商" },
        success: { text: "你快速适应职业节奏，一记手术刀直塞助攻队友破门！", effects: { reputation: 10, assists: 1, attrs: { passing: 1 } } },
        fail: { text: "职业联赛的逼抢强度，让你传球失误。", effects: { stamina: -5 } }
      },
      { id: "C", sit: "defense", text: "先立足防守，稳住首秀", check: { attrs: ["positioning", "pressure"], difficulty: 40, tag: "站位+抗压" },
        success: { text: "你顶住职业联赛的强度，首秀踢满全场，表现稳健。", effects: { reputation: 7, attrs: { positioning: 1 } } },
        fail: { text: "通脉境老将的冲击，让你疲于应付。", effects: { stamina: -6 } }
      }
    ],
    result: {
      bigwin: { text: "首秀大胜！你一战成名，职业联赛记住了你的名字。", effects: { reputation: 12, flags: { keySuccess: true } } },
      win:     { text: "首秀获胜。教练赛后点评：「他适应得比谁都快。」", effects: { reputation: 8 } },
      draw:    { text: "首秀战平。中规中矩，但你知道，自己能做得更好。", effects: { reputation: 3 } },
      lose:    { text: "首秀告负。职业联赛给你上了第一课：这里没有天才，只有强者。", effects: { reputation: -4, stamina: -6, demonValue: 5 } }
    },
    next: "ch9_agent"
  },

  // 代言vs训练（名利与初心的拉扯）
  {
    id: "ch9_agent",
    chapter: 9,
    text: [
      "成名之后，经纪人推来一沓代言合同：球鞋、饮料、综艺……片约不断，通告排到了深夜。",
      "深夜加练时，你看着空荡荡的球场，忽然想起矿坑边踢破布球的自己。",
      "经纪人催促：「趁热打铁！现在不赚，过了这村没这店。」心底却有个声音说：「你的球，还没踢到最高处。」"
    ],
    choices: [
      { id: "A", text: "全部推掉：球场才是我的主场", check: { attrs: ["resolve", "stamina"], difficulty: 40, tag: "决断+耐力" }, next: "ch9_breakthrough",
        success: { text: "你推掉所有通告，一头扎进训练场。一个月后，你的技术又精进一层。", effects: { reputation: 2, attrs: { resolve: 2, shooting: 1 }, demonValue: -5 } },
        fail: { text: "推掉代言得罪了人，舆论开始唱衰。", effects: { reputation: -3, demonValue: 3 } },
        critical: { text: "【灵光一闪】你不仅推掉代言，还把训练心得写成笔记。教练惊叹：「这份专注，百年一遇。」", effects: { reputation: 5, attrs: { resolve: 3, shooting: 1 }, demonValue: -8, flags: { keySuccess: true } } }
      },
      { id: "B", text: "有选择地接几个：名利双收，何乐不为", check: { attrs: ["iq", "rhythm"], difficulty: 38, tag: "球商+节奏" }, next: "ch9_breakthrough",
        success: { text: "你精选代言，既赚了灵石，又没耽误训练。经纪人直呼内行。", effects: { spiritStones: 25, reputation: 3, attrs: { iq: 1 } } },
        fail: { text: "通告太多，训练质量下滑，状态起伏。", effects: { spiritStones: 15, stamina: -8, demonValue: 4 } }
      },
      { id: "C", text: "来者不拒：趁年轻，多赚点", check: { attrs: ["stamina", "pressure"], difficulty: 42, tag: "耐力+抗压" }, next: "ch9_breakthrough",
        success: { text: "你连轴转却撑住了，灵石赚得盆满钵满。", effects: { spiritStones: 40, stamina: -10, attrs: { pressure: 1 } } },
        fail: { text: "过度劳累，你在训练中拉伤了肌肉。", effects: { spiritStones: 20, stamina: -20, demonValue: 8 } }
      }
    ]
  },

  // 境界突破（凝形→通脉，属性跃升）
  {
    id: "ch9_breakthrough",
    chapter: 9,
    text: [
      "某个深夜，加练到力竭的你瘫倒在草皮上，望着漫天星斗。",
      "恍惚间，体内灵力如潮水般涌动——金木水火土，五行之力在四肢百骸中奔流、碰撞、交融。",
      "那一刻，你听见了「脉」的声音。凝形境的壁垒，在松动。"
    ],
    system: "【境界突破契机：凝形→通脉。你的选择，将决定突破的方向。】",
    choices: [
      { id: "A", text: "孤注一掷：冲击最强一项，直达通脉", check: { attrs: ["resolve"], difficulty: 45, tag: "决断" }, next: "ch9_rival",
        success: { text: "你引灵力冲击最强一脉，轰然贯通！通脉境，成！你的招牌技艺，臻至化境。", effects: { reputation: 10, attrs: { shooting: 8, resolve: 3 } } },
        fail: { text: "冲击过猛，灵力反噬，你吐血倒地。虽未突破，却摸到了门槛。", effects: { stamina: -15, attrs: { shooting: 3 }, demonValue: 5 } },
        critical: { text: "【灵光一闪】五行之力如江河归海，一脉贯通，百脉俱开！你不仅突破通脉，更隐隐触到了化域的边缘！", effects: { reputation: 20, attrs: { shooting: 10, resolve: 5, speed: 3 }, flags: { keySuccess: true } } }
      },
      { id: "B", text: "水到渠成：五行均衡，缓缓图之", check: { attrs: ["iq", "rhythm"], difficulty: 40, tag: "球商+节奏" }, next: "ch9_rival",
        success: { text: "你以五行相生之理缓缓引导，灵力水到渠成地贯通经脉。通脉境，稳了。", effects: { reputation: 8, attrs: { passing: 5, iq: 3, rhythm: 3 } } },
        fail: { text: "进境缓慢，突破差了一口气。", effects: { attrs: { passing: 2, iq: 1 } } }
      },
      { id: "C", text: "以战代练：把突破留到赛场上", check: { attrs: ["pressure", "stamina"], difficulty: 42, tag: "抗压+耐力" }, next: "ch9_rival",
        success: { text: "你把突破的渴望压进每一场比赛。高压之下，经脉在实战中轰然贯通！", effects: { reputation: 9, attrs: { pressure: 4, shooting: 4 } } },
        fail: { text: "以战代练风险极大，你旧伤复发。", effects: { stamina: -12, demonValue: 4 } }
      }
    ]
  },

  // 宿敌终极对决（赵凛，羁绊满）
  {
    id: "ch9_rival",
    chapter: 9,
    type: "match",
    text: [
      "职业联赛，天王山之战。你与赵凛，终于在职业赛场上正面相遇。",
      "赛前通道里，赵凛与你并肩而立，谁都没有说话。多年的宿敌，早已不需要言语。",
      "他忽然开口，声音很轻：「从青训到大比，从淬炼营到职业。你是我唯一承认的对手。今天——」他顿了顿，「赢的人，才有资格说『最强』。」"
    ],
    opponent: { name: "职业联赛·赵凛", element: "水", strength: 62 },
    teamBase: 36,
    fallback_choices: [
      { id: "A", sit: "attack", text: "巅峰对决，一剑封喉", check: { attrs: ["shooting", "resolve"], difficulty: 50, tag: "射门+决断" },
        success: { text: "决胜时刻，你{elementAdj}地一脚爆射，洞穿赵凛的十指关！宿敌之战，你笑到了最后！", effects: { reputation: 16, goals: 1, bonds: { zhaolin: 20 }, attrs: { shooting: 1 } } },
        fail: { text: "赵凛预判了你的射门，将球扑出。", effects: { stamina: -7 } },
        critical: { text: "【灵光一闪】你在赵凛面前轰出职业生涯最伟大的一球！他望着滚入网窝的皮球，笑了：「不愧是你。最强——暂时是你。」", effects: { reputation: 28, goals: 1, bonds: { zhaolin: 25 }, attrs: { shooting: 2, resolve: 1 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "用团队碾过他", check: { attrs: ["passing", "vision"], difficulty: 46, tag: "传球+视野" },
        success: { text: "你串联全队，用行云流水的配合撕开赵凛的防线，助攻队友打进制胜球！", effects: { reputation: 11, assists: 1, bonds: { zhaolin: 15 }, attrs: { passing: 1 } } },
        fail: { text: "赵凛看穿你的意图，提前拦截。", effects: { stamina: -6 } }
      },
      { id: "C", sit: "defense", text: "冻结他，让他尝尝被支配的滋味", check: { attrs: ["tackle", "pressure"], difficulty: 48, tag: "铲断+抗压" },
        success: { text: "你全场冻结赵凛，这位宿敌第一次在赛场上如此狼狈。", effects: { reputation: 9, bonds: { zhaolin: 12 }, attrs: { tackle: 1 } } },
        fail: { text: "赵凛一个变向晃开你，制造杀机。", effects: { stamina: -7 } }
      }
    ],
    result: {
      bigwin: { text: "天王山之战大胜！赛后，赵凛与你交换球衣：「下次，我不会输。」【宿敌羁绊·圆满】", effects: { reputation: 14, bonds: { zhaolin: 20 }, flags: { keySuccess: true } } },
      win:     { text: "险胜宿敌！赵凛与你交换球衣，一言不发，但眼中有了敬意。", effects: { reputation: 10, bonds: { zhaolin: 15 } } },
      draw:    { text: "鏖战成和。赵凛冷笑：「不分胜负？那就下次再战。」", effects: { reputation: 4, bonds: { zhaolin: 10 } } },
      lose:    { text: "你输给了赵凛。他走过你身边：「最强，是我。」", effects: { reputation: -5, stamina: -7, demonValue: 6 } }
    },
    next: "ch9_national"
  },

  // 国家队征召（为国出征）
  {
    id: "ch9_national",
    chapter: 9,
    text: [
      "赛季末，国家队的正式征召函送达。你将身披国字号战袍，出战洲际大赛。",
      "消息传来那天，你回到了青云城，回到矿坑边。老陈的坟前，你放下一瓶酒。",
      "「老陈，我踢出来了。」你望着远处的夕阳，「接下来，我要替所有人，踢到世界之巅。」"
    ],
    choices: [
      { id: "A", text: "郑重宣誓：为国争光，万死不辞", effects: { reputation: 8, attrs: { resolve: 2 }, flags: { nationalTeam: true } }, next: "ch9_end" },
      { id: "B", text: "平静接受：把每一场都当最后一场踢", effects: { reputation: 6, attrs: { pressure: 2 }, flags: { nationalTeam: true } }, next: "ch9_end" }
    ]
  },

  // 章末 → 第十章《抉择·下》
  {
    id: "ch9_end",
    chapter: 9,
    text: [
      "洲际大赛的烽火燃起，你在国家队的表现惊艳四座。世界足坛，开始流传一个来自东方的名字。",
      "然而，巅峰之上，寒风更烈。伤病的阴影、舆论的漩涡、心魔的低语，都在暗处蛰伏。",
      "二十岁的你，站在了命运最大的岔路口。接下来的每一步，都将写进历史。"
    ],
    system: "【第九章·抉择·上 完。职业巅峰已至。接下来：第十章·抉择·下（终章）。】",
    effects: { chapter: 1, age: 1 },
    next: "ch10_opening"
  }

] };
