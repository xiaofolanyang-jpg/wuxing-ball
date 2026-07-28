/* data/chapter10.js — 第十章《异乡·扎根》（19岁·留洋篇·下）
 * 事件链：第二年开场 → 替补登场(比赛) → 位置竞争 → 争夺主力 → 关键战(比赛·首粒正式进球) → 异乡挚友 → 卢卡配合(比赛) → 更衣室归属 → 国青征召 → 章末
 * 说明：留洋第二年，从替补到主力。关键战奠定队内地位；国青征召引出世青赛（第十一章）。
 *       扩写：补替补登场、位置竞争、与卢卡配合赛（呼应"心有灵犀"）、更衣室归属仪式。
 *       章末仅 chapter+1（年龄保持19，世青赛跨年在第十一章末推进）。
 */
window.CHAPTER10 = { events: [

  // 开场：留洋第二年
  {
    id: "ch10_opening",
    chapter: 10,
    text: [
      "留洋第二年。你已经能用当地话点餐、能听懂大半战术会议，却还没能在这支球队里，真正占到一块属于自己的草皮。",
      "替补席的塑料座椅是凉的。每场比赛前，教练念首发名单，念到第七个名字的时候，你都会不自觉地屏住呼吸。多数时候，那第七个名字不是你。",
      "夜里加练，球场空了。你一个人对着球门踢，砰，砰。守门员早走了，球网自己晃。你跟自己说：再踢一组。声音很轻，像是怕被谁听见。"
    ],
    system: "【第十章·异乡·扎根 开启。主力位置，从来不是别人给的。】",
    next: "ch10_sub"
  },

  // 替补登场（比赛·零星机会里的挣扎）
  {
    id: "ch10_sub",
    chapter: 10,
    type: "match",
    text: [
      "赛季初，你的位置在替补席。某场比赛，第七十分钟，比分胶着。教练终于朝你招了招手。",
      "你脱掉外套，腿却是凉的。热身时你就在想：二十分钟，可能就一次机会。踢好了，教练会多看你一眼；踢砸了，下一场你还是坐穿板凳。",
      "第四官员举起换人牌。你跑进场内，草腥味扑面。看台上没人为这次换人鼓掌——一个替补而已。"
    ],
    opponent: { name: "五洲天罡·联赛对手", element: "土", strength: 56 },
    teamBase: 35,
    fallback_choices: [
      { id: "A", sit: "attack", text: "二十分钟，赌一次机会", check: { attrs: ["shooting", "burst"], difficulty: 48, tag: "射门+爆发" },
        success: { text: "第84分钟，一次混战，球弹到你面前。你没多想，{elementAdj}地一脚抽射。球进了。替补席全跳了起来。教练在场边鼓了两下掌——你抓住了。", effects: { reputation: 13, goals: 1, attrs: { shooting: 1 } } },
        fail: { text: "机会来得太突然，你停球大了半步，被后卫抢先解围。二十分钟，就这么过去了。你低着头走回替补席。", effects: { stamina: -6, demonValue: 3 } },
        critical: { text: "【灵光一闪】替补登场，一球定乾坤。终场哨响，队友们冲过来把你压在身下。教练赛后只说了句：「下次，首发。」", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "用跑动和拼抢留下印象", check: { attrs: ["stamina", "pressure"], difficulty: 45, tag: "耐力+抗压" },
        success: { text: "你没有球，就不停地跑、逼抢、回防。二十分钟，你的跑动距离全队前列。教练赛后记了点什么。数据不会说谎。", effects: { reputation: 8, attrs: { stamina: 1, pressure: 1 } } },
        fail: { text: "拼得太急，一次铲抢犯规，吃了张黄牌。教练皱了皱眉。", effects: { stamina: -7, demonValue: 2 } }
      },
      { id: "C", sit: "defense", text: "先稳住，别出错", check: { attrs: ["positioning", "balance"], difficulty: 41, tag: "站位+平衡" },
        success: { text: "你踢得稳，没给对手任何机会。二十分钟，零失误。不算出彩，但教练要的就是不出错。", effects: { reputation: 5, attrs: { positioning: 1 } } },
        fail: { text: "太想稳住，反而缩手缩脚。一次该上抢的球你犹豫了，被对手推进。", effects: { stamina: -5 } }
      }
    ],
    result: {
      bigwin: { text: "球队大胜，你也在最后时刻刷了个脸。回程大巴上，有队友主动跟你击掌。这是个好的开始。", effects: { reputation: 8 } },
      win:     { text: "球队赢了。你坐在角落，膝盖发酸，但心里有了一点底。", effects: { reputation: 5 } },
      draw:    { text: "战平。你的二十分钟，没掀起什么波澜。还得等。", effects: { reputation: 2 } },
      lose:    { text: "球队输了，你这点出场时间更没人记得。替补席的椅子，还是凉的。", effects: { reputation: -2, stamina: -4, demonValue: 3 } }
    },
    next: "ch10_rivalry"
  },

  // 位置竞争（更衣室的暗流）
  {
    id: "ch10_rivalry",
    chapter: 10,
    text: [
      "队里还有一个前锋。老将，三十岁，在这支队踢了八年，球迷喊他的名字喊了八年。他不服你这个外来户——一个亚洲小子，凭什么跟他抢位置。",
      "训练里的对抗，他下脚很重。一次争顶，他肘部顶在你后背上，落地时你踉跄了两步。他瞥了你一眼，没说话，那眼神很清楚：这是我的地盘。",
      "主力位置就一个。你们俩，都盯着。"
    ],
    choices: [
      { id: "A", text: "用训练表现压过他：场上见真章", check: { attrs: ["shooting", "burst"], difficulty: 44, tag: "射门+爆发" }, next: "ch10_bench",
        success: { text: "你没回嘴，只是把每一次训练都当比赛踢。分组对抗，你连进三个。结束后，老将看了你一眼，那眼神里的轻视，少了几分。", effects: { reputation: 7, attrs: { shooting: 1, burst: 1 } } },
        fail: { text: "你太想压过他，动作变形，几次射门都偏了。他在旁边冷笑了一下。你的脸发烫。", effects: { stamina: -7, demonValue: 4 } }
      },
      { id: "B", text: "尊重他，向他学：老将的经验是宝", check: { attrs: ["iq", "pressure"], difficulty: 40, tag: "球商+抗压" }, next: "ch10_bench",
        success: { text: "你主动找他，请教他跑位的诀窍。他愣了一下，慢慢讲了起来。八年的经验，不是白给的。渐渐地，他不再对你下狠脚了。", effects: { reputation: 5, attrs: { iq: 2, positioning: 1 } } },
        fail: { text: "他爱答不理，丢给你一句：「自己悟。」你笑了笑，没往心里去。", effects: { stamina: -3 } }
      },
      { id: "C", text: "不理会，专注自己：位置是踢出来的，不是吵出来的", effects: { attrs: { resolve: 1, pressure: 1 }, demonValue: -3 }, next: "ch10_bench" }
    ]
  },

  // 争夺主力（选择 + 检定）
  {
    id: "ch10_bench",
    chapter: 10,
    text: [
      "机会来得很突然。主力前锋训练里拉伤了大腿，至少要歇三周。教练在战术室里点了你的名，发音还是有点别扭，但你听清了。",
      "「下一场，你上。」他说完就低头看战术板，像是说了件再平常不过的事。你站起来，椅子在地上刮出一声响。整个战术室的目光都扫过来——有好奇，有怀疑，也有等着看笑话的。",
      "你知道，这不是一场普通的联赛。踢好了，主力是你的；踢砸了，替补席的冷板凳还得坐穿。"
    ],
    choices: [
      { id: "A", text: "用进球说话：前锋就该把球送进网窝", check: { attrs: ["shooting", "burst"], difficulty: 49, tag: "射门+爆发" }, next: "ch10_goal",
        success: { text: "你把这三周加练的所有东西都带上了场。跑位、抢点、起脚。教练在场边记了点什么。赛后他没夸你，只是把你叫去看了二十分钟录像——那是他愿意教你的信号。", effects: { reputation: 8, attrs: { shooting: 1, burst: 1 } } },
        fail: { text: "太想证明自己，反而紧了。三次单刀进了一个，另外两次脚都软了。下场时你低着头，不敢看教练。", effects: { stamina: -8, demonValue: 4 } },
        critical: { text: "【灵光一闪】你上演了帽子戏法。第三个球进的时候，整个球场都在喊你那个曾经被写错拼音的名字。教练在场边鼓了两下掌——那是他最接近激动的表情。", effects: { reputation: 16, attrs: { shooting: 2, burst: 1 }, flags: { keySuccess: true } } }
      },
      { id: "B", text: "用跑动和拼抢赢得信任：脏活累活我先来", check: { attrs: ["stamina", "pressure"], difficulty: 47, tag: "耐力+抗压" }, next: "ch10_goal",
        success: { text: "你全场不知疲倦地奔跑、逼抢、回防。数据栏里你的跑动距离全队第一。教练赛后拍了拍你的背：「球队需要你这样的。」主力位置，渐渐稳了。", effects: { reputation: 6, attrs: { stamina: 1, pressure: 1 } } },
        fail: { text: "拼得太凶，第七十分钟体力透支，被对手一个变向就过了。你扶着膝盖喘气，腿像灌了铅。", effects: { stamina: -10, demonValue: 3 } }
      },
      { id: "C", text: "用传球串联全队：让队友因我而更强", check: { attrs: ["passing", "iq"], difficulty: 45, tag: "传球+球商" }, next: "ch10_goal",
        success: { text: "你不贪功，把球一次次送到位置更好的队友脚下。两个助攻。更衣室里，开始有人主动跟你击掌了。", effects: { reputation: 7, assists: 1, attrs: { passing: 1, iq: 1 } } },
        fail: { text: "传了一脚威胁球，可惜队友没领会，球出了底线。他摊了摊手，你笑了笑，心里却有点凉。", effects: { stamina: -5 } }
      }
    ]
  },

  // 关键战（比赛·奠定队内地位）
  {
    id: "ch10_goal",
    chapter: 10,
    type: "match",
    text: [
      "赛季最关键的一场。对手是联赛领头羊，后防线全是成名已久的老将。赛前更衣室里，队长把大家召集到一起，用你如今能听懂的话说：「赢了这场，我们就能往上走一截。」",
      "教练走到你面前，停了一下。他没说什么豪言壮语，只是把你的球衣号码拍了拍：「今天，看你的了。」",
      "球员通道里，你深吸一口气。一年前你刚来时，连这里的草腥味都觉得陌生。现在，它闻起来像战场。"
    ],
    opponent: { name: "五洲天罡·联赛领头羊", element: "金", strength: 60 },
    teamBase: 35,
    fallback_choices: [
      { id: "A", sit: "attack", text: "禁区前沿，抡一脚定乾坤", check: { attrs: ["shooting", "power"], difficulty: 53, tag: "射门+力量" },
        success: { text: "脚背抽实了，{elementAdj}的远射从人缝里钻过去，门将扑了个空。球进网的那一刻，你听见看台上有人用蹩脚的中文喊了句什么——大概是「好球」。", effects: { reputation: 14, goals: 1, attrs: { shooting: 1 } } },
        fail: { text: "球打在防守队员身上，弹了出去。领头羊的链式防守，不是白叫的。", effects: { stamina: -5 } },
        critical: { text: "【灵光一闪】那脚远射后来被剪进了赛季集锦。你只记得触球那一下，脚背发麻，然后全场站了起来。", effects: { reputation: 22, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "不急，跟队友打配合渗透", check: { attrs: ["passing", "vision"], difficulty: 49, tag: "传球+视野" },
        success: { text: "三传两倒，防线被扯开一条缝。你心领神会插上去，队友的直塞刚好到位，推射入网。整个教练席都跳了起来。", effects: { reputation: 10, goals: 1, assists: 1, attrs: { passing: 1 } } },
        fail: { text: "传了四脚，第五脚被断了。人家的站位确实密。", effects: { stamina: -4 } }
      },
      { id: "C", sit: "defense", text: "先守住，机会总会来的", check: { attrs: ["positioning", "balance"], difficulty: 43, tag: "站位+平衡" },
        success: { text: "你指挥防线保持间距，没给对方任何舒服的起脚空间。零封。反击的火种，保住了。", effects: { reputation: 7, attrs: { positioning: 1 } } },
        fail: { text: "走神了一瞬，对方前锋差点捅到球。你骂了自己一句，赶紧回位。", effects: { stamina: -5 } }
      }
    ],
    result: {
      bigwin: { text: "大胜领头羊。终场哨响，队友们把你围在中间。队长揉着你的头发，说了句你听懂的话：「现在，你是我们的人了。」", effects: { reputation: 14, flags: { keySuccess: true } } },
      win:     { text: "赢了。更衣室里音乐放得很大声。你坐在自己的位置上——那个位置，再没人会随便坐了。", effects: { reputation: 9 } },
      draw:    { text: "战平。不算坏。教练点点头：「方向对了。」你擦了把汗，心里清楚，主力位置还得一场场踢出来。", effects: { reputation: 4 } },
      lose:    { text: "输了。领头羊就是领头羊。你坐在更衣室，膝盖隐隐发酸。但教练路过时说了句：「下次。」这两个字，你听懂了。", effects: { reputation: -3, stamina: -6, demonValue: 4 } }
    },
    next: "ch10_comrade"
  },

  // 异乡挚友（新羁绊·纯演出）
  {
    id: "ch10_comrade",
    chapter: 10,
    text: [
      "也是在更衣室里，你渐渐跟一个人熟了起来。他叫卢卡，本地人，踢中场，话很多，笑起来露出一口白牙。他是第一个主动教你当地俚语的队友，也是第一个在你进球后冲过来抱你的人。",
      "有天训练后，他开车带你去了海边。异国的海，跟青云城外的矿坑完全是两个样子。他指着浪说了一长串，你只听懂一半，大意是：「足球这东西，哪儿都一样。踢得开心，最重要。」",
      "你笑了笑，没接话。海风很大，带着咸味。你忽然觉得，一万公里外这个地方，好像也没那么陌生了。"
    ],
    choices: [
      { id: "A", text: "请卢卡吃顿中餐：礼尚往来，朋友是处出来的", effects: { reputation: 3, stamina: 5, demonValue: -5, attrs: { iq: 1 } }, next: "ch10_luca_combo" },
      { id: "B", text: "把训练心得分享给卢卡：一起变强", effects: { reputation: 4, attrs: { passing: 1, iq: 1 } }, next: "ch10_luca_combo" }
    ]
  },

  // 卢卡配合（比赛·心有灵犀雏形）
  {
    id: "ch10_luca_combo",
    chapter: 10,
    type: "match",
    text: [
      "你和卢卡越来越默契。训练里一个眼神，他就知道你要往哪跑；比赛中你一个手势，他就把球送到你脚下。教练干脆把你俩排进了同一套首发。",
      "这场球，对手盯你盯得很死。但你身边多了个卢卡。他总能在你被包夹前，把球分出去，再跑回来接应。两个人，像一个人。",
      "赛前，卢卡撞了撞你的肩：「今天，咱俩给他们表演个配合。」你笑了。"
    ],
    opponent: { name: "五洲天罡·联赛劲敌", element: "水", strength: 59 },
    teamBase: 36,
    fallback_choices: [
      { id: "A", sit: "attack", text: "卢卡助攻，你抢点终结", check: { attrs: ["shooting", "burst"], difficulty: 50, tag: "射门+爆发" },
        success: { text: "卢卡禁区前沿一脚直塞，球从两名后卫中间穿过。你心领神会插上，{elementAdj}地推射远角。球进了。卢卡冲过来，一把抱住你。这球，是两个人的。", effects: { reputation: 14, goals: 1, attrs: { shooting: 1 } } },
        fail: { text: "卢卡的传球到位了，你却启动慢了半拍，球被门将没收。他摊手笑了笑，你懊恼地拍了下草皮。", effects: { stamina: -5 } },
        critical: { text: "【灵光一闪】你和卢卡连续三脚撞墙配合，撕开整条防线，最后由你推射空门。全场起立。解说喊破了音——这配合，水银泻地。", effects: { reputation: 22, goals: 1, assists: 1, attrs: { shooting: 2, passing: 1 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "你做墙，卢卡终结", check: { attrs: ["passing", "vision"], difficulty: 46, tag: "传球+视野" },
        success: { text: "这次换你回撤做墙，一脚回做，卢卡插上远射破门。他冲你指了指，意思是：传得好。助攻算你的。", effects: { reputation: 10, assists: 1, attrs: { passing: 1 } } },
        fail: { text: "你的回做力量大了，卢卡没接舒服，射门打偏。他摇摇头，你递过去一瓶水。", effects: { stamina: -4 } }
      },
      { id: "C", sit: "defense", text: "稳住中场，给卢卡兜底", check: { attrs: ["positioning", "pressure"], difficulty: 42, tag: "站位+抗压" },
        success: { text: "卢卡压上组织，你在身后替他补位、拦截。他敢往前传，因为知道身后有你。零封。这份信任，是配合的根。", effects: { reputation: 8, attrs: { positioning: 1 } } },
        fail: { text: "一次补位慢了，对手打穿你这一侧。卢卡回追犯规，吃了张黄牌。他朝你喊了句什么，是提醒，不是责怪。", effects: { stamina: -5 } }
      }
    ],
    result: {
      bigwin: { text: "大胜。你和卢卡各进一球，还互相助攻。赛后记者围着你们问配合的秘诀。卢卡搂着你的肩，用当地话开玩笑：「秘诀就是，他听得懂我说话了。」", effects: { reputation: 13, flags: { keySuccess: true } } },
      win:     { text: "赢了。卢卡在场边跟你击了个掌：「越来越有默契了。」你点头。这份默契，是一天天磨出来的。", effects: { reputation: 9 } },
      draw:    { text: "战平。你俩的配合被对手研究透了。卢卡皱着眉：「下次，换个套路。」", effects: { reputation: 4 } },
      lose:    { text: "输了。你俩都被盯死，配合打不出来。回程路上，卢卡拍拍你：「没事，下场找回来。」", effects: { reputation: -2, stamina: -5, demonValue: 3 } }
    },
    next: "ch10_dressingroom"
  },

  // 更衣室归属（成为"自己人"·纯演出）
  {
    id: "ch10_dressingroom",
    chapter: 10,
    text: [
      "某个客场比赛后，回程的大巴上。卢卡起了个头，唱起一首当地的歌。慢慢的，全车人都跟着唱了起来。有人把你也拉了进去。",
      "你五音不全，歌词也只记得一半，磕磕绊绊地跟着哼。唱到副歌，所有人都笑了，有人拍你的背，有人揉你的头发。那一刻，没有「亚洲来的」，没有外来户。",
      "窗外的夜灯一盏盏后退。你忽然明白，你不只是在这支球队踢球——你是这支队的人了。"
    ],
    choices: [
      { id: "A", text: "融进这份热闹：把这里当家", effects: { demonValue: -8, reputation: 4, stamina: 5 }, next: "ch10_callup" },
      { id: "B", text: "改天请全队吃一顿中餐：用家乡味交朋友", effects: { reputation: 5, demonValue: -6, attrs: { iq: 1 } }, next: "ch10_callup" },
      { id: "C", text: "安静地笑：有些归属，不必说出口", effects: { demonValue: -5, attrs: { pressure: 1 } }, next: "ch10_callup" }
    ]
  },

  // 国青征召（世青赛集结预告）
  {
    id: "ch10_callup",
    chapter: 10,
    text: [
      "赛季末，一封盖着红章的征召函寄到了俱乐部。国家青年队。世界青年锦标赛。信封很厚，你摸了两遍才拆开。",
      "消息传开那天，卢卡拍着你的肩膀，用他那口你如今能全听懂的话说：「去吧。替我们踢给他们看看。」",
      "你站在公寓窗前，望着异国的夜景。一年前你看这片灯火时，心里全是孤独。现在，你想的是另一件事——那些散落在国内各地的老朋友，范志贵、武石、内牛尔、苏雯。又要并肩了。"
    ],
    choices: [
      { id: "A", text: "郑重应召：为国出征，是球员最高的荣誉", effects: { reputation: 6, attrs: { resolve: 2 }, flags: { nationalTeam: true } }, next: "ch10_end" },
      { id: "B", text: "平静赴约：把每一场，都当最后一场踢", effects: { reputation: 4, attrs: { pressure: 2 }, flags: { nationalTeam: true } }, next: "ch10_end" }
    ]
  },

  // 章末 → 第十一章《世青赛·集结》
  {
    id: "ch10_end",
    chapter: 10,
    text: [
      "你收拾行李，飞回国内。舷窗外，云海翻涌。一年前你从这片云海上飞出去，是个忐忑的少年；现在飞回来，已经在世界的联赛里站稳了脚跟。",
      "手机里，范志贵发来一条消息，还是那个大嗓门的语气：「可算把你盼回来了！世青赛，咱们再一块儿干一场！」",
      "你回了两个字：「来了。」然后锁屏，闭上眼。世青赛。世界之巅的青年战场。下一程，从集结开始。"
    ],
    system: "【第十章·异乡·扎根 完。接下来：第十一章·世青赛·集结。】",
    effects: { chapter: 1 },
    next: "ch11_opening"
  }

] };
