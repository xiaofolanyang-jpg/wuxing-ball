/* data/chapter9.js — 第九章《出海·留洋》（18岁·留洋篇·上）
 * 事件链：签约送别 → 选择俱乐部 → 抵达异国 → 思乡电话 → 战术课 → 海外首秀(比赛) → 客场之旅(比赛) → 适应挣扎 → 卢卡初遇 → 章末
 * 说明：全国大赛后出海留洋，登陆五洲天罡联赛。三条俱乐部路线均设 choiceTianguang/overseasClub
 *       旗标（球圣/天罡之星结局前置）。海外首秀强度远超国内（化域境对手），奠定"世界之巅"基调。
 *       扩写：补思乡/文化冲突、战术语言关、客场第二场（木灵根相克）、卢卡初遇铺垫。
 *       章末 age+1（18→19）。
 */
window.CHAPTER9 = { events: [

  // 开场：签约送别
  {
    id: "ch9_opening",
    chapter: 9,
    text: [
      "十八岁那年的夏天，全国冠军的奖杯还没在陈列柜里落稳，海外俱乐部的邀请函已经堆满了孙德斯的桌面。他戴着老花镜一封封拆，拆到第三封的时候，剥薄荷糖的手停了一下。",
      "「五洲天罡联赛。」他把最薄的那张纸推过来，纸边锋利得像登机牌，「世界足坛最高的地方。三家想要你——豪门、中游、还有一支保级队。」",
      "姜太虚负手立在窗边，背对着你。良久，他只说了四个字：「出去。别回头。」"
    ],
    system: "【第九章·出海·留洋 开启。世界之巅，从一张登机牌开始。】",
    next: "ch9_contract"
  },

  // 选择俱乐部（三条留洋路线，均设 choiceTianguang/overseasClub）
  {
    id: "ch9_contract",
    chapter: 9,
    text: [
      "三份合同摊在桌上，纸张的触感各不相同：",
      "星辉联——豪门。铜版纸，烫金字。巨星云集，你只是替补席末端的一个名字。但那里的草皮，是世界上修剪得最齐的；",
      "铁岸竞技——中游。普通A4纸。薪资平平，但承诺主力位置。教练在电话里说：「来这儿，你能踢上球。」；",
      "海崖FC——保级队。最薄的一张。绝对核心，球权管够。只是球队年年为保级挣扎，更衣室里全是三十岁的老将。"
    ],
    system: "【留洋抉择。你选的俱乐部，将决定你留洋第一年的处境。】",
    choices: [
      { id: "A", text: "加盟星辉联：去豪门，哪怕从替补席坐起", effects: { reputation: 10, spiritStones: 40, flags: { choiceTianguang: true, overseasClub: true, clubStar: true } }, next: "ch9_arrive" },
      { id: "B", text: "签约铁岸竞技：要主力位置，先踢上球再说", effects: { reputation: 6, spiritStones: 25, attrs: { iq: 1 }, flags: { choiceTianguang: true, overseasClub: true, clubIron: true } }, next: "ch9_arrive" },
      { id: "C", text: "落脚海崖FC：做绝对核心，把一支队扛在肩上", effects: { reputation: 3, spiritStones: 15, attrs: { resolve: 2 }, flags: { choiceTianguang: true, overseasClub: true, clubCliff: true } }, next: "ch9_arrive" }
    ]
  },

  // 抵达异国（文化冲击）
  {
    id: "ch9_arrive",
    chapter: 9,
    text: [
      "飞机落地的时候是当地凌晨三点。舷窗外下着雨，停机坪的灯晕成一团一团。你拖着行李箱走出廊桥，冷气扑面，带着一种陌生的、潮湿的草腥味。",
      "俱乐部派来的翻译是个三十出头的华人，姓周，接机牌上写错了你名字的拼音。他歉意地笑：「先将就。这儿的中餐馆，八点就关门了。」",
      "公寓在一栋老楼的四层，没电梯。窗外是陌生的街道，路牌一个汉字也没有。你把行李放下，坐在床沿，忽然听见自己的心跳——很响。矿坑边那个踢破布球的少年，从没想过会睡在离家乡一万公里的地方。"
    ],
    choices: [
      { id: "A", text: "倒时差，先把作息掰过来", effects: { stamina: 10, attrs: { pressure: 1 } }, next: "ch9_homesick" },
      { id: "B", text: "连夜看对手录像，笨鸟先飞", effects: { stamina: -8, attrs: { iq: 2 } }, next: "ch9_homesick" },
      { id: "C", text: "给阿贵打个电话，听听乡音", effects: { stamina: 5, bonds: { agui: 8 }, demonValue: -3 }, next: "ch9_homesick" }
    ]
  },

  // 思乡电话（文化冲突日常·情感锚点）
  {
    id: "ch9_homesick",
    chapter: 9,
    text: [
      "第一周最难熬的不是训练，是安静。训练场上至少还有事做，回到公寓，四面墙一关，一万公里的距离就压下来了。",
      "超市里的标签一个汉字也没有。你买了一盒以为是酱油的东西，回去一尝，是醋。奶酪、半生的牛排、冷掉的面包，你的胃抗议了整整一周。",
      "夜里，母亲打来电话。她问吃得好不好，住得惯不惯。你张了张嘴，喉咙发紧。窗外是异国的月亮，跟青云城的是同一个，却照着不一样的街。"
    ],
    system: "【留洋第一课，不在球场，在生活。】",
    choices: [
      { id: "A", text: "报喜不报忧：电话里只说「一切都好」", effects: { demonValue: 3, attrs: { pressure: 1 } }, next: "ch9_training" },
      { id: "B", text: "跟母亲实话实说：撑不住的时候，承认也不丢人", effects: { demonValue: -6, stamina: 5, bonds: { agui: 3 } }, next: "ch9_training" },
      { id: "C", text: "把孤独写进日记：写下来，就没那么重了", effects: { demonValue: -4, attrs: { iq: 1 } }, next: "ch9_training" }
    ]
  },

  // 战术课（语言关·训练场难堪）
  {
    id: "ch9_training",
    chapter: 9,
    text: [
      "战术演练课。教练在战术板前讲高位逼抢的轮转，语速飞快，术语全是缩写。你只听懂三个词，剩下的像隔着一层水。",
      "哨响，开始跑位。教练冲你喊了一句什么，你听岔了方向，往左跑，队友全往右。整条防线因为你一个人塌了。哨声又响，教练摊开手，队友叹了口气。",
      "那声叹息很轻，却比骂你还难受。你站在草皮上，脸发烫。翻译老周在场边，想帮腔，又插不上话。"
    ],
    choices: [
      { id: "A", text: "当场请教练再讲一遍：丢脸一次，总比错一赛季强", check: { attrs: ["iq", "resolve"], difficulty: 41, tag: "球商+决断" }, next: "ch9_debut",
        success: { text: "你硬着头皮走上前，用磕巴的当地话请他再说一遍。教练愣了一下，放慢了语速，还用手比划。课后他拍拍你：「敢问，就不怕。」", effects: { reputation: 5, attrs: { iq: 2, resolve: 1 }, demonValue: -4 } },
        fail: { text: "你开了口，可那几个关键词怎么都拼不顺。教练皱了皱眉，转身走了。你站在原地，恨不得钻进草皮里。", effects: { stamina: -5, demonValue: 4 } },
        critical: { text: "【灵光一闪】你不仅问懂了，还掏出那本中文笔记，把整套轮转画了下来。教练翻了几页，眼神变了：「这份用心，我记住了。」从那以后，他愿意多教你一点。", effects: { reputation: 9, attrs: { iq: 3, resolve: 2 }, demonValue: -7, flags: { keySuccess: true } } }
      },
      { id: "B", text: "默默加练：把这套跑位练到不用过脑子", check: { attrs: ["stamina", "dribble"], difficulty: 40, tag: "耐力+盘带" }, next: "ch9_debut",
        success: { text: "你没解释，只是每天多留两小时，把这套跑位重复上百遍，直到身体自己记得方向。一周后，同样的哨声，你跑得比谁都准。", effects: { reputation: 4, attrs: { stamina: 1, dribble: 1 }, demonValue: -3 } },
        fail: { text: "加练太狠，脚背旧伤隐隐作痛。跑位是熟了，可语言还是半懂不懂。你坐在更衣室，第一次怀疑自己是不是来错了。", effects: { stamina: -9, demonValue: 5 } }
      },
      { id: "C", text: "找老周补课：把每个术语都吃透", check: { attrs: ["iq", "rhythm"], difficulty: 38, tag: "球商+节奏" }, next: "ch9_debut",
        success: { text: "你拉着老周，把战术板上每个缩写都抄下来，一个个问清楚。夜里背到凌晨。再上课时，你终于能跟上教练的节奏了。", effects: { reputation: 3, attrs: { iq: 1, rhythm: 1 }, demonValue: -3 } },
        fail: { text: "术语太多，记了后面忘前面。老周安慰你：「慢慢来。」可你心里急。", effects: { stamina: -4 } }
      }
    ]
  },

  // 海外职业首秀（比赛·化域境对手）
  {
    id: "ch9_debut",
    chapter: 9,
    type: "match",
    text: [
      "留洋首秀。更衣室的灯比国内亮三倍，照得每个人脸上的汗都反光。队友们说着你只能听懂一半的话，战术板上的术语全是缩写。教练拍拍你的肩，语速很快，你只听懂一个词，发音像是「证明」。",
      "对手阵中，一名化域境老将热身时从你身边跑过，带起一阵风。他的护腿板上刻着冠军年份，密密麻麻。他头也没回：「亚洲来的？这儿可不是青训。」",
      "你系紧鞋带，脚背上的旧疤隐隐发痒。看台上四万人，没有一个人喊你的名字。"
    ],
    opponent: { name: "五洲天罡·化域境老将", element: "火", strength: 62 },
    teamBase: 34,
    fallback_choices: [
      { id: "A", sit: "attack", text: "首秀即亮剑，用进球说话", check: { attrs: ["shooting", "burst"], difficulty: 52, tag: "射门+爆发" },
        success: { text: "第30分钟，你{elementAdj}地一脚爆射。脚背传来天罡联赛草皮特有的弹性，球进了。处子球。看台的声浪像一堵墙拍过来——这一次，有人开始喊你那个被写错过拼音的名字。", effects: { reputation: 16, goals: 1, attrs: { shooting: 1 } } },
        fail: { text: "老将的卡位老辣得像一堵墙。你的射门角度被封死，球打在他小腿上弹出去。这就是世界之巅。", effects: { stamina: -6 } },
        critical: { text: "【灵光一闪】首秀梅开二度。那个放话的老将站在中圈，没再说话。解说在喊什么你听不太懂，但你能听出那语气里的惊讶。", effects: { reputation: 26, goals: 2, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "用传球串联，先适应这天罡节奏", check: { attrs: ["passing", "iq"], difficulty: 48, tag: "传球+球商" },
        success: { text: "你压住节奏，感受天罡联赛的逼抢速度——比国内快整整一拍。适应了。一记直塞，助攻队友破门。他冲你竖起大拇指。", effects: { reputation: 10, assists: 1, attrs: { passing: 1 } } },
        fail: { text: "天罡联赛的逼抢强度超出想象。你出球慢了零点几秒，球被断得干干净净。", effects: { stamina: -5 } }
      },
      { id: "C", sit: "defense", text: "先立足防守，把首秀踢满", check: { attrs: ["positioning", "pressure"], difficulty: 44, tag: "站位+抗压" },
        success: { text: "你顶住了。九十分钟，每一次对抗都咬住。赛后大腿内侧多了两块淤青，但你踢满了全场——这本身就是回答。", effects: { reputation: 7, attrs: { positioning: 1 } } },
        fail: { text: "化域境老将的冲击像卡车。你的重心一次次被撞偏，肺里像灌了铅。", effects: { stamina: -6 } }
      }
    ],
    result: {
      bigwin: { text: "首秀大胜。赛后你坐在更衣室里，膝盖上敷着冰袋，手指还在微微发颤。但天罡联赛，记住你了。", effects: { reputation: 12, flags: { keySuccess: true } } },
      win:     { text: "首秀获胜。教练在发布会上只说了一句：「他适应得比谁都快。」翻译转述给你时，你没笑。你知道自己还能更好。", effects: { reputation: 8 } },
      draw:    { text: "首秀战平。中规中矩。你坐在大巴上，膝盖隐隐发酸。窗外的雨还没停。", effects: { reputation: 3 } },
      lose:    { text: "首秀告负。更衣室里没人说话。你盯着鞋带上沾的草屑，明白了一件事：这里没有天才，只有强者。", effects: { reputation: -4, stamina: -6, demonValue: 5 } }
    },
    next: "ch9_away"
  },

  // 客场之旅（比赛·木灵根相克·赛季磨砺）
  {
    id: "ch9_away",
    chapter: 9,
    type: "match",
    text: [
      "首秀过后，是漫长的赛季。第一个客场，球队坐了三个小时大巴，又换乘飞机。落地时天已经黑了，你腿都是僵的。",
      "客场更衣室狭小，墙皮剥落。看台上全是主队球迷，嘘声从你热身时就压下来，像下不完的雨。对手以快速反击著称，阵中几名木灵根球员，启动那一下快得离谱。",
      "教练在战术板上画了又画，反复强调一个字，你听懂了——「稳」。"
    ],
    opponent: { name: "五洲天罡·客场劲旅", element: "木", strength: 58 },
    teamBase: 34,
    fallback_choices: [
      { id: "A", sit: "attack", text: "抓住一次反击，一剑封喉", check: { attrs: ["shooting", "power"], difficulty: 50, tag: "射门+力量" },
        success: { text: "客队的机会本就稀少。第64分钟，一次反击，球到了你脚下。你{elementAdj}地起脚，球穿过雨幕钻进网窝。整个客队看台疯了——那一小撮人，喊出了千军万马的声势。", effects: { reputation: 14, goals: 1, attrs: { shooting: 1 } } },
        fail: { text: "对手的边后卫回追奇快，你刚起脚，球就被他飞身堵了出去。木灵根的速度，名不虚传。", effects: { stamina: -6 } },
        critical: { text: "【灵光一闪】你在客场轰出一脚石破天惊的远射。雨珠被球风震散。主队教练在场边愣了三秒。这一球，够主队球迷记一个赛季。", effects: { reputation: 22, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "稳住节奏，把球权拿在脚下", check: { attrs: ["passing", "vision"], difficulty: 46, tag: "传球+视野" },
        success: { text: "你压住节奏，不与对手拼速度，而是用传递消耗他们。几次转移调度，主队的逼抢渐渐散了。教练在场边点头：「稳」字，你做到了。", effects: { reputation: 9, assists: 1, attrs: { passing: 1 } } },
        fail: { text: "客场的嘘声让你出球发紧，一脚传球力量小了，被对手断下打反击。门将救险，你惊出一身冷汗。", effects: { stamina: -5 } }
      },
      { id: "C", sit: "defense", text: "顶住主队的猛攻，先求不输", check: { attrs: ["positioning", "pressure"], difficulty: 42, tag: "站位+抗压" },
        success: { text: "主队攻势如潮。你一次次卡住位置，把对手的快攻化解在禁区外。终场哨响，零封。客场拿一分，不丢人。", effects: { reputation: 7, attrs: { positioning: 1 } } },
        fail: { text: "主队的冲击一浪高过一浪。你被一个变向晃开，险些丢球。肺里的空气像被抽干了。", effects: { stamina: -6 } }
      }
    ],
    result: {
      bigwin: { text: "客场大胜。回程的大巴上，队友们唱着歌。你靠在窗边，看着异国的夜景倒退。第一次，你觉得这片陌生的土地，也有了一点温度。", effects: { reputation: 11, flags: { keySuccess: true } } },
      win:     { text: "客场取胜。更衣室里，队长拍了拍你的背。三个小时的回程，你睡得很沉。", effects: { reputation: 8 } },
      draw:    { text: "客场战平。不算坏。你坐在大巴上，膝盖发酸，但心里踏实了一点。", effects: { reputation: 3 } },
      lose:    { text: "客场告负。嘘声跟了你一整场。回程没人说话，只有引擎的轰鸣。你盯着窗外，把这场失利记在了心里。", effects: { reputation: -3, stamina: -6, demonValue: 4 } }
    },
    next: "ch9_struggle"
  },

  // 适应挣扎（留洋第一年的坎）
  {
    id: "ch9_struggle",
    chapter: 9,
    text: [
      "首秀过后，新鲜劲儿退了，难熬的才刚开始。训练里的指令听不全，战术会议像听天书。食堂的奶酪和半生牛排，你吃了三周还是反胃。",
      "夜里最难熬。公寓安静得能听见水管的响声。手机里是青云城的白天，阿贵发来的消息你看了又看，回得越来越少——不是不想回，是不知道怎么说。说想家？太轻。说撑不住？不像话。",
      "某个加练后的深夜，你坐在空荡荡的球场边，草皮上只有你一个人的鞋印。你忽然想起庙祝那句话：「球之道，通五行。」你深吸一口气，凉意灌满肺。"
    ],
    choices: [
      { id: "A", text: "死磕语言和技术：球场上的事，用脚解决", check: { attrs: ["resolve", "stamina"], difficulty: 44, tag: "决断+耐力" }, next: "ch9_luca_first",
        success: { text: "你每天多留两小时。背术语，加练触球。一个月后，你能听懂大半战术布置了。教练在训练赛里开始朝你喊具体的指令，而不是只会比划。", effects: { reputation: 4, attrs: { resolve: 2, shooting: 1 }, demonValue: -5 } },
        fail: { text: "加练太狠，脚背旧伤隐隐作痛。语言还是半懂不懂。你坐在更衣室，第一次怀疑自己是不是来错了。", effects: { stamina: -10, demonValue: 5 } },
        critical: { text: "【灵光一闪】你把每天的训练心得写进一本笔记本，中文记，再翻译成当地话。教练翻了几页，合上，看了你很久：「这份专注，少见。」从那以后，他愿意多教你一点。", effects: { reputation: 8, attrs: { resolve: 3, shooting: 1 }, demonValue: -8, flags: { keySuccess: true } } }
      },
      { id: "B", text: "主动融入更衣室：先做人，再踢球", check: { attrs: ["iq", "rhythm"], difficulty: 42, tag: "球商+节奏" }, next: "ch9_luca_first",
        success: { text: "你硬着头皮学几句当地的俏皮话，训练后主动留下帮队友收器材。渐渐地，更衣室有人愿意跟你开玩笑了。传球的时候，队友开始信任你。", effects: { reputation: 5, attrs: { iq: 1, passing: 1 }, bonds: { agui: 3 } } },
        fail: { text: "语言不通，你的玩笑没人接得住，空气冷了两秒。你笑了笑，低头系鞋带，掩饰尴尬。", effects: { stamina: -4, demonValue: 2 } }
      },
      { id: "C", text: "找老周多聊聊：异乡的乡音，是根绳子", effects: { stamina: 6, demonValue: -6, attrs: { pressure: 1 } }, next: "ch9_luca_first" }
    ]
  },

  // 卢卡初遇（异乡挚友铺垫·纯演出）
  {
    id: "ch9_luca_first",
    chapter: 9,
    text: [
      "赛季过半。某个训练后，更衣室的人走得差不多了。你低头收拾球鞋，听见有人用那口你如今能听懂大半的话，朝你搭腔。",
      "他叫卢卡，本地人，踢中场，话很多，笑起来露出一口白牙。「你一个人加练，我都看见了。」他一边系鞋带一边说，「踢得不错。就是太闷了。」",
      "你愣了一下。来这儿这么久，除了老周，还没人主动跟你聊球以外的话。他站起身，拍了拍你的肩：「走，我带你去吃点本地东西。别老吃那盒错当成酱油的醋了。」——他居然知道那件事。"
    ],
    choices: [
      { id: "A", text: "用蹩脚的当地话答应他：努力融入", effects: { reputation: 3, demonValue: -4, attrs: { iq: 1 } }, next: "ch9_end" },
      { id: "B", text: "笑着比划：语言不通，但笑意相通", effects: { demonValue: -5, stamina: 4 }, next: "ch9_end" },
      { id: "C", text: "请他教你几句俚语：朋友，从一句玩笑开始", effects: { reputation: 2, demonValue: -4, attrs: { passing: 1 } }, next: "ch9_end" }
    ]
  },

  // 章末 → 第十章《异乡·扎根》
  {
    id: "ch9_end",
    chapter: 9,
    text: [
      "留洋第一年，就这么磕磕绊绊地过来了。你学会了几句当地话，学会了吃半生的牛排，学会了在凌晨三点不哭。",
      "赛季末，你回了一趟青云城。矿坑边的路还是土路。老陈坟前，你放下一瓶酒：「老陈，我踢到国外来了。」夕阳把矿坑染成金色。风很大，你没待太久。",
      "回程的飞机上，你望着舷窗外的云海。一万公里。下一步，是在这片陌生的草皮上，真正扎下根。"
    ],
    system: "【第九章·出海·留洋 完。接下来：第十章·异乡·扎根。】",
    effects: { chapter: 1, age: 1 },
    next: "ch10_opening"
  }

] };
