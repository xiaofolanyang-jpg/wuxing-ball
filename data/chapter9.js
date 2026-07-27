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
      "十九岁。全国冠军的奖杯还在宿舍落灰，职业联赛的赛程表已经贴上了更衣室的墙。",
      "手机里存着十几条未读消息，全是俱乐部发来的。你删了又删，删不干净。",
      "孙先生把三份合同摊在桌上，用茶杯压住角：「选吧。你签的不是俱乐部。是你接下来想成为的那种人。」"
    ],
    system: "【第九章·抉择·上 开启。职业巅峰，从一份合同开始。】",
    next: "ch9_contract_choice"
  },

  // 职业抉择（3俱乐部）
  {
    id: "ch9_contract_choice",
    chapter: 9,
    text: [
      "三份合同，三条路。你用手摸过每一张纸的边角：",
      "金阙皇朝——铜版纸，烫金字，年薪后面的零让你多看了两遍。巨星云集。你只是其中之一；",
      "青云竞技——普通A4纸，打印的。薪资平平。但你是绝对核心，球迷喊你的名字时带着口音；",
      "五洲天罡·星辉队——最薄的一张，像登机牌。风险最大。但那是世界之巅。"
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
      "职业联赛首轮。你的首秀。更衣室的灯光比青年赛亮三倍，照得每个人脸上的汗都反光。看台上四万人，声浪从四面八方压过来，胸腔跟着震。",
      "对手阵中，一名通脉境老将热身时从你身边跑过，带起一阵风。他头也没回：「全国冠军？这儿只是起点。」",
      "教练拍拍你的肩，手掌很沉：「别怂。把你的球踢出来。」"
    ],
    opponent: { name: "职业联赛·通脉境老将", element: "火", strength: 60 },
    teamBase: 36,
    fallback_choices: [
      { id: "A", sit: "attack", text: "首秀即爆发，用进球说话", check: { attrs: ["shooting", "burst"], difficulty: 48, tag: "射门+爆发" },
        success: { text: "第30分钟，你{elementAdj}地一脚爆射。脚背传来职业联赛草皮特有的弹性，球进了。处子球。看台的声浪像一堵墙拍过来。", effects: { reputation: 15, goals: 1, attrs: { shooting: 1 } } },
        fail: { text: "老将的卡位老辣，你的射门角度被封死。球打在他小腿上弹出去。这就是职业。", effects: { stamina: -6 } },
        critical: { text: "【灵光一闪】首秀梅开二度。那个放话的老将站在中圈，没再说话。解说在喊什么你已经听不清了，耳朵里全是心跳。", effects: { reputation: 25, goals: 2, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "用传球串联，适应职业节奏", check: { attrs: ["passing", "iq"], difficulty: 44, tag: "传球+球商" },
        success: { text: "你压住节奏，感受职业联赛的逼抢速度——比青年赛快半拍。适应了。一记直塞，助攻破门。", effects: { reputation: 10, assists: 1, attrs: { passing: 1 } } },
        fail: { text: "职业联赛的逼抢强度超出预期。你出球慢了零点几秒，被断了。", effects: { stamina: -5 } }
      },
      { id: "C", sit: "defense", text: "先立足防守，稳住首秀", check: { attrs: ["positioning", "pressure"], difficulty: 40, tag: "站位+抗压" },
        success: { text: "你顶住了。九十分钟，每一次对抗都咬住。赛后大腿内侧多了两块淤青，但你踢满了全场。", effects: { reputation: 7, attrs: { positioning: 1 } } },
        fail: { text: "通脉境老将的冲击像卡车。你的重心一次次被撞偏，肺里像灌了铅。", effects: { stamina: -6 } }
      }
    ],
    result: {
      bigwin: { text: "首秀大胜。赛后你坐在更衣室里，膝盖上敷着冰袋，手指还在微微发颤。但职业联赛，记住你了。", effects: { reputation: 12, flags: { keySuccess: true } } },
      win:     { text: "首秀获胜。教练在新闻发布会上只说了一句：「他适应得比谁都快。」你在更衣室听见了，没笑。", effects: { reputation: 8 } },
      draw:    { text: "首秀战平。中规中矩。你坐在大巴上，膝盖隐隐发酸。你知道自己能做得更好。", effects: { reputation: 3 } },
      lose:    { text: "首秀告负。更衣室里没人说话。你盯着鞋带上沾的草屑，明白了一件事：这里没有天才。只有强者。", effects: { reputation: -4, stamina: -6, demonValue: 5 } }
    },
    next: "ch9_agent"
  },

  // 代言vs训练（名利与初心的拉扯）
  {
    id: "ch9_agent",
    chapter: 9,
    text: [
      "成名之后，经纪人推来一沓代言合同，摞起来有半指厚。球鞋、饮料、综艺。通告排到深夜十一点。",
      "凌晨加练。球场空了，只有你和一盏没关的灯。皮球砸在脚背上，闷响。你忽然想起矿坑边那个踢破布球的下午。",
      "经纪人发消息：「趁热打铁。过了这村没这店。」你锁了屏。心底有个声音很轻：「你的球，还没到顶。」"
    ],
    choices: [
      { id: "A", text: "全部推掉：球场才是我的主场", check: { attrs: ["resolve", "stamina"], difficulty: 40, tag: "决断+耐力" }, next: "ch9_breakthrough",
        success: { text: "你推掉所有通告。一个月。每天凌晨五点的球场，草皮上只有你一个人的鞋印。技术又精进了一层。", effects: { reputation: 2, attrs: { resolve: 2, shooting: 1 }, demonValue: -5 } },
        fail: { text: "推掉代言得罪了人。第二天体育版面的标题不太好看。", effects: { reputation: -3, demonValue: 3 } },
        critical: { text: "【灵光一闪】你不仅推掉代言，还把每天的训练心得写进一本笔记本。教练翻了几页，合上，看了你很久：「这份专注。少见。」", effects: { reputation: 5, attrs: { resolve: 3, shooting: 1 }, demonValue: -8, flags: { keySuccess: true } } }
      },
      { id: "B", text: "有选择地接几个：名利双收，何乐不为", check: { attrs: ["iq", "rhythm"], difficulty: 38, tag: "球商+节奏" }, next: "ch9_breakthrough",
        success: { text: "你挑了三个代言，拍摄控制在半天内。灵石到账，训练没落。经纪人竖了个大拇指。", effects: { spiritStones: 25, reputation: 3, attrs: { iq: 1 } } },
        fail: { text: "通告比你想的多。连续三天没碰球，第四天训练时脚感全丢了。", effects: { spiritStones: 15, stamina: -8, demonValue: 4 } }
      },
      { id: "C", text: "来者不拒：趁年轻，多赚点", check: { attrs: ["stamina", "pressure"], difficulty: 42, tag: "耐力+抗压" }, next: "ch9_breakthrough",
        success: { text: "你连轴转了两个月。通告、训练、比赛。撑住了。灵石赚得多，黑眼圈也深了。", effects: { spiritStones: 40, stamina: -10, attrs: { pressure: 1 } } },
        fail: { text: "过度劳累。一次冲刺时大腿后侧猛地一紧——拉伤了。你倒在草皮上，天花板上的灯刺眼。", effects: { spiritStones: 20, stamina: -20, demonValue: 8 } }
      }
    ]
  },

  // 境界突破（凝形→通脉，属性跃升）
  {
    id: "ch9_breakthrough",
    chapter: 9,
    text: [
      "某个深夜。加练到力竭。你仰面倒在草皮上，后背贴着冰凉的露水，胸腔像风箱一样起伏。",
      "恍惚间，体内有什么东西在动。金木水火土，五行之力在四肢百骸中奔流、碰撞。膝盖的旧伤隐隐发热。",
      "你听见了「脉」的声音。像冰层下的河水，在松动。凝形境的壁垒，裂了一条缝。"
    ],
    system: "【境界突破契机：凝形→通脉。你的选择，将决定突破的方向。】",
    choices: [
      { id: "A", text: "孤注一掷：冲击最强一项，直达通脉", check: { attrs: ["resolve"], difficulty: 45, tag: "决断" }, next: "ch9_rival",
        success: { text: "你引灵力冲击最强一脉。疼。像有人拿锤子从里面敲你的骨头。然后——通了。通脉境。你的招牌技艺，从此不同。", effects: { reputation: 10, attrs: { shooting: 8, resolve: 3 } } },
        fail: { text: "冲击过猛。灵力反噬，你嘴角溢出血丝，倒在草皮上。没通。但门槛，你摸到了。", effects: { stamina: -15, attrs: { shooting: 3 }, demonValue: 5 } },
        critical: { text: "【灵光一闪】五行之力如江河归海，一脉贯通，百脉俱开。你从草皮上坐起来时，浑身在发抖。不只是通脉——你隐隐触到了化域的边缘。", effects: { reputation: 20, attrs: { shooting: 10, resolve: 5, speed: 3 }, flags: { keySuccess: true } } }
      },
      { id: "B", text: "水到渠成：五行均衡，缓缓图之", check: { attrs: ["iq", "rhythm"], difficulty: 40, tag: "球商+节奏" }, next: "ch9_rival",
        success: { text: "你不急。五行相生，一点一点引导。像溪水绕石头，不急，但不停。某天清晨醒来，经脉通了。通脉境。稳。", effects: { reputation: 8, attrs: { passing: 5, iq: 3, rhythm: 3 } } },
        fail: { text: "进境慢。差一口气。那口气，怎么都咽不下去。", effects: { attrs: { passing: 2, iq: 1 } } }
      },
      { id: "C", text: "以战代练：把突破留到赛场上", check: { attrs: ["pressure", "stamina"], difficulty: 42, tag: "抗压+耐力" }, next: "ch9_rival",
        success: { text: "你把突破的渴望压进每一场比赛。第七场，第八场，第九场——高压之下，经脉在实战中轰然贯通。", effects: { reputation: 9, attrs: { pressure: 4, shooting: 4 } } },
        fail: { text: "以战代练，风险极大。第九场时膝盖旧伤复发，你咬着牙踢完了最后十分钟。", effects: { stamina: -12, demonValue: 4 } }
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
      "赛前通道里，你们并肩站着。谁都没说话。不需要。从青训到职业，该说的早就说完了。",
      "他忽然开口，声音很轻，像是说给自己听：「赢的人，才有资格说最强。」然后他走了。你看着他的背影，系紧了鞋带。"
    ],
    opponent: { name: "职业联赛·赵凛", element: "水", strength: 62 },
    teamBase: 36,
    fallback_choices: [
      { id: "A", sit: "attack", text: "巅峰对决，一剑封喉", check: { attrs: ["shooting", "resolve"], difficulty: 50, tag: "射门+决断" },
        success: { text: "决胜时刻，你{elementAdj}地一脚爆射。赵凛扑了，指尖擦过球皮。没够到。球进了。他跪在草皮上，看了你一眼。没说话。", effects: { reputation: 16, goals: 1, bonds: { zhaolin: 20 }, attrs: { shooting: 1 } } },
        fail: { text: "赵凛预判了你的射门方向。球被他一掌拍出去。他站起来，拍了拍手套上的草屑。", effects: { stamina: -7 } },
        critical: { text: "【灵光一闪】你在赵凛面前轰出职业生涯最伟大的一球。他望着网窝里的球，笑了。第一次在赛场上对你笑：「不愧是你。暂时——是你。」", effects: { reputation: 28, goals: 1, bonds: { zhaolin: 25 }, attrs: { shooting: 2, resolve: 1 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "用团队碾过他", check: { attrs: ["passing", "vision"], difficulty: 46, tag: "传球+视野" },
        success: { text: "你串联全队，三脚传递撕开赵凛的防线。助攻队友推射入网。赵凛站在门线前，看着球滚过去，没动。", effects: { reputation: 11, assists: 1, bonds: { zhaolin: 15 }, attrs: { passing: 1 } } },
        fail: { text: "赵凛看穿你的意图，提前半步拦截。他断球后看了你一眼，那眼神像在说：我认识你。", effects: { stamina: -6 } }
      },
      { id: "C", sit: "defense", text: "冻结他，让他尝尝被支配的滋味", check: { attrs: ["tackle", "pressure"], difficulty: 48, tag: "铲断+抗压" },
        success: { text: "你全场贴着赵凛，不给他转身的空间。终场时他弯着腰喘气，第一次在赛场上这么狼狈。", effects: { reputation: 9, bonds: { zhaolin: 12 }, attrs: { tackle: 1 } } },
        fail: { text: "赵凛一个变向晃开你。你的脚踝扭了一下，他已经在三米外了。", effects: { stamina: -7 } }
      }
    ],
    result: {
      bigwin: { text: "天王山之战大胜。赛后赵凛走过来，脱下球衣递给你。你接过。他说了两个字：「下次。」然后转身走了。【宿敌羁绊·圆满】", effects: { reputation: 14, bonds: { zhaolin: 20 }, flags: { keySuccess: true } } },
      win:     { text: "险胜。赵凛与你交换球衣。一言不发。但他递球衣时，手指停了一秒。那是敬意。", effects: { reputation: 10, bonds: { zhaolin: 15 } } },
      draw:    { text: "鏖战成和。赵凛冷笑了一下：「下次。」他总说下次。", effects: { reputation: 4, bonds: { zhaolin: 10 } } },
      lose:    { text: "你输了。赵凛从你身边走过，没停。只留下一句：「最强。是我。」", effects: { reputation: -5, stamina: -7, demonValue: 6 } }
    },
    next: "ch9_national"
  },

  // 国家队征召（为国出征）
  {
    id: "ch9_national",
    chapter: 9,
    text: [
      "赛季末，国家队的正式征召函送达。信封很厚，盖着红章。你摸了两遍才拆开。",
      "消息传来那天，你回了趟青云城。矿坑边的路还是土路。老陈坟前，你放下一瓶酒，蹲了很久。",
      "「老陈。我踢出来了。」你站起来，膝盖咔嗒响了一声。夕阳把矿坑染成金色。你没再说话。该说的，都在酒里。"
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
      "洲际大赛。你身披国字号战袍，站在异国的球场上。世界足坛开始流传一个来自东方的名字。",
      "但巅峰之上，风更冷。膝盖的隐痛在赛后越来越久才消退。舆论、伤病、心魔。都在暗处等着。",
      "二十岁。你站在命运最大的岔路口。下一步，写进历史。"
    ],
    system: "【第九章·抉择·上 完。职业巅峰已至。接下来：第十章·抉择·下（终章）。】",
    effects: { chapter: 1, age: 1 },
    next: "ch10_opening"
  }

] };
