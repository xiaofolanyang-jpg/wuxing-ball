/* data/chapter5.js — 第五章《学院大比·征战》（设计稿第六章·16岁下半年）
 * 事件链：大比开幕 → 小组赛×2 → 1/4决赛 → 半决赛(宿敌赵凛) → 决赛前夜 → 决赛(BOSS) → MVP结算 → 合同抉择 → 章末
 * 说明：5v5团队赛，个人影响力极大。选人结果影响难度，羁绊密集推进。
 *       半决赛触发"既生瑜何生亮"(赵凛)；决赛以弱打强。大比排名决定声望。
 */
window.CHAPTER5 = { events: [

  // 开场：大比开幕
  {
    id: "ch5_opening",
    chapter: 5,
    text: [
      "帝都，天罡竞技场。你从球员通道出来的时候，看台上的声浪像一堵墙拍过来。三十二支队伍列在绿茵上，旌旗被风吹得猎猎响，空气里全是新剪草皮和防晒霜的味道。",
      "开幕式上主持人扯着嗓子念规则：「五人制，小组循环加单败淘汰。冠军直通职业青训。」你其实没怎么听进去，因为你在找一个人。",
      "找到了。赵凛站在对面那支队伍的阵前，隔着半个球场。他也在看你。嘴唇动了一下，没出声，但你读出来了：「决赛见。」"
    ],
    system: "【第五章·学院大比·征战 开启。5v5团队赛，每一场都是生死战。】\n【大比排名：冠军声望+30，四强+15，小组出局+5。】",
    next: "ch5_group1"
  },

  // 小组赛第1场（以强打弱）
  {
    id: "ch5_group1",
    chapter: 5,
    type: "match",
    text: "小组赛首轮，南疆学院。实力不算强，但孙先生赛前还是叮嘱了句：「大比没有弱队，别松。」他说完就坐回折叠椅上去了。",
    opponent: { name: "南疆学院", element: "木", strength: 40 },
    fallback_choices: [
      { id: "A", sit: "attack", text: "开场就抢，不给他们站稳", check: { attrs: ["shooting", "burst"], difficulty: 38, tag: "射门+爆发" },
        success: { text: "开场三分钟，对方后场还没倒开，你{elementAdj}地一脚冷射，门将手都没伸出来。", effects: { reputation: 9, goals: 1, attrs: { shooting: 1 } } },
        fail: { text: "太急了，脚背没吃准部位，球偏了半米。", effects: { stamina: -4 } },
        critical: { text: "【灵光一闪】开场闪击。解说喊了句什么你没听清，只记得球进网那一下的声音。", effects: { reputation: 15, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "跟苏晚打传控，慢慢撕", check: { attrs: ["passing", "vision"], difficulty: 36, tag: "传球+视野" },
        success: { text: "你和苏晚连续三脚传递，防线被扯开了，队友插上笑纳。苏晚连庆祝都省了，直接跑回中圈。", effects: { reputation: 7, assists: 1, bonds: { suwan: 8 }, attrs: { passing: 1 } } },
        fail: { text: "第四脚传大了，被断。对方直接打反击，你回追了三十米。", effects: { stamina: -4 } }
      },
      { id: "C", sit: "defense", text: "不急，先把节奏控住", check: { attrs: ["rhythm", "positioning"], difficulty: 30, tag: "节奏+站位" },
        success: { text: "你把球控在脚下，快慢全由你定。对方跑了九十分钟，大部分时间在追球。", effects: { reputation: 5, attrs: { rhythm: 1 } } },
        fail: { text: "对方突然提速，节奏被冲了一下。好在没丢球。", effects: { stamina: -4 } }
      }
    ],
    result: {
      bigwin: { text: "大胜。看台上已经有人拿本子记你的名字了。你假装没看见。", effects: { reputation: 8 } },
      win:     { text: "小胜。大比第一场，有惊无险。够了。", effects: { reputation: 5 } },
      draw:    { text: "平了。孙先生从折叠椅上站起来，脸色不太好看：「我说了，大比没有弱队。」", effects: { reputation: 1 } },
      lose:    { text: "输了。出线形势一下子紧了。更衣室里阿贵把水瓶摔了，没人怪他。", effects: { reputation: -4, stamina: -5, demonValue: 4 } }
    },
    next: "ch5_group2"
  },

  // 小组赛第2场·出线关键战（势均力敌，关键时刻×2）
  {
    id: "ch5_group2",
    chapter: 5,
    type: "match",
    text: "小组赛次轮，出线关键战。东海学院，实力跟你队差不多，阵中那个水灵根门将是老熟人——当年沧澜青训出来的。赛前你活动脚踝的时候看见他在对面热身，扑救动作还是那么舒展。",
    opponent: { name: "东海学院", element: "水", strength: 48 },
    fallback_choices: [
      { id: "A", sit: "attack", text: "不绕弯子，正面抽射", check: { attrs: ["shooting", "power"], difficulty: 44, tag: "射门+力量" },
        success: { text: "你{elementAdj}地抡了一脚，球速太快，门将指尖蹭到了但没挡住。网窝颤了一下。", effects: { reputation: 11, goals: 1, bonds: { canglan: 10 }, attrs: { shooting: 1 } } },
        fail: { text: "门将判断对了方向，双拳把球击出去。他落地的时候看了你一眼，没表情。", effects: { stamina: -5 } },
        critical: { text: "【灵光一闪】那脚远射后来你回看了很多遍。球从门将手边飞过去的时候，他连反应都没来得及做。", effects: { reputation: 18, goals: 1, bonds: { canglan: 15 }, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "佯装传中，搓射远角", check: { attrs: ["shooting", "iq"], difficulty: 40, tag: "射门+球商" },
        success: { text: "你做了个传中的假动作，门将重心移了半步，你搓了个远角。他扑了，差两指。", effects: { reputation: 9, goals: 1, attrs: { shooting: 1 } } },
        fail: { text: "搓射角度太正，门将站住了，轻松没收。", effects: { stamina: -4 } }
      },
      { id: "C", sit: "defense", text: "先冻结他们的核心，再想办法", check: { attrs: ["tackle", "iq"], difficulty: 38, tag: "铲断+球商" },
        success: { text: "你全场贴着对方核心，不让他舒服转身。东海的进攻像被掐住了喉咙。", effects: { reputation: 7, attrs: { tackle: 1 } } },
        fail: { text: "对方核心一个变向把你过了，好在队友补了过来。你喘了口气，肺里火辣辣的。", effects: { stamina: -5 } }
      }
    ],
    result: {
      bigwin: { text: "大胜。出线名额提前锁了。终场哨响的时候你弯腰撑着膝盖，大腿酸得发抖，但嘴角是翘的。", effects: { reputation: 10, flags: { keySuccess: true } } },
      win:     { text: "险胜。终场哨响，五个人抱在一起。阿贵喊得最大声。", effects: { reputation: 7 } },
      draw:    { text: "平了，靠净胜球勉强出线。悬。", effects: { reputation: 3 } },
      lose:    { text: "输了。小组出局。你站在场上没动，腿像灌了铅。大比就这么结束了。", effects: { reputation: -5, stamina: -6, demonValue: 6 } }
    },
    next: "ch5_quarter"
  },

  // 四分之一决赛
  {
    id: "ch5_quarter",
    chapter: 5,
    type: "match",
    text: "八强战，西岭学院。土灵根铁桶阵，后防线跟城墙似的。孙先生赛前布置的时候说了句：「别急。用耐心磨他们的耐心。」",
    opponent: { name: "西岭学院", element: "土", strength: 50 },
    fallback_choices: [
      { id: "A", sit: "attack", text: "定位球抢点，头槌砸", check: { attrs: ["heading", "positioning"], difficulty: 42, tag: "头球+站位" },
        success: { text: "角球开出来，你卡住位置，旱地拔葱，额头砸实了。球弹地入网。", effects: { reputation: 10, goals: 1, attrs: { heading: 1 } } },
        fail: { text: "起跳的时候被人顶了一下腰，头球顶偏了。", effects: { stamina: -4 } },
        critical: { text: "【灵光一闪】那个头球你后来想了很久，起跳那一下整个人像悬在空中停了一秒。", effects: { reputation: 16, goals: 1, attrs: { heading: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "肋部直塞，打身后", check: { attrs: ["passing", "vision"], difficulty: 40, tag: "传球+视野" },
        success: { text: "你{elementAdj}的直塞从两个后卫中间穿过去，林啸的速度这时候就是武器，他插上就是一脚。", effects: { reputation: 8, assists: 1, bonds: { linxiao: 8 }, attrs: { passing: 1 } } },
        fail: { text: "直塞被土灵根后卫预判了，伸脚一挡。人家的站位确实老到。", effects: { stamina: -4 } }
      },
      { id: "C", sit: "defense", text: "不急，等他们先犯错", check: { attrs: ["rhythm", "pressure"], difficulty: 34, tag: "节奏+抗压" },
        success: { text: "你稳住节奏，不紧不慢。对方久攻不下，自己先急了，传球开始失误。", effects: { reputation: 5, attrs: { pressure: 1 } } },
        fail: { text: "等了太久，自己先躁了。大腿发酸，注意力开始涣散。", effects: { stamina: -4, demonValue: 2 } }
      }
    ],
    result: {
      bigwin: { text: "大胜。四强了。MVP榜单上你的名字往上窜了几位，你没去看。", effects: { reputation: 9 } },
      win:     { text: "小胜，晋级四强。更衣室里阿贵把毛巾甩得跟直升机似的。", effects: { reputation: 6 } },
      draw:    { text: "平了，加时赛，点球。赢是赢了，但腿已经不是自己的了。", effects: { reputation: 4, stamina: -8 } },
      lose:    { text: "八强，到头了。你坐在更衣室的长凳上，盯着鞋钉上的泥看了很久。", effects: { reputation: -4, stamina: -6, demonValue: 5 } }
    },
    next: "ch5_semi"
  },

  // 半决赛·宿敌对决（赵凛的队，"既生瑜何生亮"触发）
  {
    id: "ch5_semi",
    chapter: 5,
    type: "match",
    text: [
      "半决赛。北都书院，赵凛的队。你们一路横扫进来的，气势正盛。",
      "赛前握手的时候，赵凛的手掌很干，握力很大。他活动着手腕，水灵力在指尖流转，语气很平：「从青训到省赛，再到大比。该有个了断了。」",
      "解说席上有人感慨：「这一代最好的两个，偏偏赶上了同一届。」你听见了，没当回事。哨响了。"
    ],
    opponent: { name: "北都书院·赵凛", element: "水", strength: 54 },
    fallback_choices: [
      { id: "A", sit: "attack", text: "正面来，用最强的一脚回应", check: { attrs: ["shooting", "resolve"], difficulty: 46, tag: "射门+决断" },
        success: { text: "你{elementAdj}地拔脚，球从赵凛伸出的腿边擦过去。进了。他站在原地没动，肩膀绷得很紧。", effects: { reputation: 13, goals: 1, bonds: { zhaolin: 15 }, attrs: { shooting: 1 } } },
        fail: { text: "赵凛的预判又快了半步。他挡完球之后看了你一眼，那眼神说不上是轻蔑还是认真。", effects: { stamina: -6 } },
        critical: { text: "【灵光一闪】那脚球后来被叫作世界波。你只记得触球那一下脚背发麻，然后全场站起来了。赵凛鼓了两下掌。", effects: { reputation: 22, goals: 1, bonds: { zhaolin: 20 }, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "把赵凛引过来，给队友做嫁衣", check: { attrs: ["passing", "iq"], difficulty: 42, tag: "传球+球商" },
        success: { text: "赵凛果然包夹过来了。你等的就是这个，脚腕一抖，球到了空位队友脚下。他笑纳了。", effects: { reputation: 9, assists: 1, bonds: { zhaolin: 10 }, attrs: { passing: 1 } } },
        fail: { text: "赵凛没上抢。他卡住了线路，像早就知道你要往哪送。", effects: { stamina: -5 } }
      },
      { id: "C", sit: "defense", text: "贴住他，不让他舒服拿球", check: { attrs: ["tackle", "strength"], difficulty: 44, tag: "铲断+对抗" },
        success: { text: "你全场贴着赵凛，肩膀挨着肩膀。他越踢越躁，有一次甚至朝裁判吼了两句。", effects: { reputation: 8, bonds: { zhaolin: 10 }, attrs: { tackle: 1 } } },
        fail: { text: "赵凛一个沉肩变向，你重心跟丢了。他往前带的时候头也没回。", effects: { stamina: -6 } }
      }
    ],
    result: {
      bigwin: { text: "大胜。赵凛走过来的时候你以为他要握手。他没有。他只是盯着你看了两秒，一字一句：「决赛，或者下一次。我不会再输。」", effects: { reputation: 14, bonds: { zhaolin: 15 }, flags: { keySuccess: true } } },
      win:     { text: "赢了。赵凛一句话没说，把护腿板塞进包里。他离场的时候背影很直，但步子很快。", effects: { reputation: 10, bonds: { zhaolin: 10 } } },
      draw:    { text: "平了，点球输了。赵凛擦着汗经过你身边：「你还是赢不了我。」语气很平，像在陈述事实。", effects: { reputation: 3, demonValue: 4 } },
      lose:    { text: "输了。赵凛没有庆祝，只是走过你身边时停了半步：「决赛的门票，我收下了。」", effects: { reputation: -6, stamina: -6, demonValue: 6 } }
    },
    next: "ch5_final_eve"
  },

  // 决赛前夜·队友夜谈（羁绊大推进）
  {
    id: "ch5_final_eve",
    chapter: 5,
    text: [
      "决赛前夜。不知道谁提议上天台看看，五个人就爬上去了。帝都的夜风比球场上的凉，带着点烧烤摊的烟火气。",
      "林啸靠着栏杆，难得地先开了口：「以前我觉得踢球是一个人的事。」阿贵接话：「现在呢？」林啸没马上回答，瞥了你一眼，过了几秒才说：「……五个人的。」",
      "苏晚坐在地上，膝盖抱着，轻声说了句：「明天不管输赢，咱们踢的是自己的球。」没人接话。夜风把阿贵的头发吹乱了，他也没去拨。五个人就这么坐着，谁也没走。"
    ],
    system: "【羁绊大推进：与全体队友的羁绊进度+10。】",
    choices: [
      { id: "A", text: "举起手里的矿泉水瓶：「明天，一块把冠军带回去。」", effects: { bonds: { linxiao: 10, suwan: 10, agui: 10 }, reputation: 3, attrs: { resolve: 1 } }, next: "ch5_final" },
      { id: "B", text: "没说话，看着远处的灯火，把决心咽进肚子里", effects: { bonds: { linxiao: 10, suwan: 10, agui: 10 }, attrs: { pressure: 1 }, demonValue: -2 }, next: "ch5_final" }
    ]
  },

  // 决赛（BOSS战，以弱打强）
  {
    id: "ch5_final",
    chapter: 5,
    type: "match",
    text: "决赛。金阙皇朝，卫冕冠军，全员凝形境以上。赛前没有一个人看好你们，赔率一边倒。孙先生倒是不在乎，他靠在更衣室的柜子上，剥了颗薄荷糖：「光脚的不怕穿鞋的。去，把他们的王座掀了。」语气跟说「去食堂吃饭」似的。",
    opponent: { name: "金阙皇朝", element: "金", strength: 60 },
    fallback_choices: [
      { id: "A", sit: "attack", text: "反击中自己带，单骑闯关", check: { attrs: ["dribble", "burst"], difficulty: 48, tag: "盘带+爆发" },
        success: { text: "你{elementAdj}地连过两人，大腿已经酸了，但禁区内那一下推射，脚是稳的。", effects: { reputation: 14, goals: 1, attrs: { dribble: 1 } } },
        fail: { text: "金阙的链式防守把你绞住了，第三个人伸脚的时候你已经没力气变向了。", effects: { stamina: -6 } },
        critical: { text: "【灵光一闪】你后来回看录像，觉得自己那几十米跑得不太真实。解说在喊什么你没听见，只记得球进网那一下，腿软了。", effects: { reputation: 24, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "五个人一起打，层层渗透", check: { attrs: ["passing", "vision"], difficulty: 44, tag: "传球+视野" },
        success: { text: "五个人连续传递，球像长了眼睛。冠军的防线被扯开一条缝，队友插上，进了。五个人抱在一起。", effects: { reputation: 10, assists: 1, bonds: { suwan: 8 }, attrs: { passing: 1 } } },
        fail: { text: "渗透到第四脚的时候被金阙的铁腰拦截了。人家的身体对抗确实强。", effects: { stamina: -5 } }
      },
      { id: "C", sit: "defense", text: "先守住，拖到点球再说", check: { attrs: ["tackle", "pressure"], difficulty: 40, tag: "铲断+抗压" },
        success: { text: "你和队友把防线扎紧了，肩膀挨着肩膀。冠军狂攻了九十分钟，颗粒无收。", effects: { reputation: 8, attrs: { pressure: 1 } } },
        fail: { text: "防线被持续施压，第七十分钟的时候终于被凿穿了。腿已经不听使唤了。", effects: { stamina: -6 } }
      }
    ],
    result: {
      bigwin: { text: "冠军。卫冕冠军被掀翻了。你们五个人的名字，一夜之间传遍了全国。你站在场上，腿在抖，但嘴角压不住。", effects: { reputation: 30, flags: { keySuccess: true, dabiChamp: true } } },
      win:     { text: "绝杀。终场哨响的时候你直接坐在了草皮上，眼泪和汗混在一起，也分不清是哪个。", effects: { reputation: 25, flags: { dabiChamp: true } } },
      draw:    { text: "点球输了。亚军。但你以弱旅之姿杀进了决赛，虽败犹荣这四个字，你受得起。", effects: { reputation: 15 } },
      lose:    { text: "决赛输了。亚军。你坐在草皮上没起来，膝盖上的擦伤火辣辣的。但你们走到这里，已经够了。", effects: { reputation: 12, stamina: -6 } }
    },
    next: "ch5_mvp"
  },

  // MVP结算 + 合同抉择
  {
    id: "ch5_mvp",
    chapter: 5,
    text: [
      "大比结束了。MVP评选揭晓那天你正在宿舍泡脚，手机震了一下——最佳阵容候选名单上有你的名字。你看了两秒，把手机扣回去了。",
      "第二天，职业球探蜂拥而至。三份青训合同摆在桌上：豪门金阙FC的替补席、中游青木联的核心位、家乡青云FC的主力承诺。你盯着那三张纸看了很久。",
      "孙先生靠在门框上，剥了颗薄荷糖：「还有条路。」他顿了顿，「下个月，淬炼营选拔。三十六人进，十一人出。那才是通往天罡联队的独木桥。」他说这话的时候语气很平，但你听出了底下的意思。"
    ],
    choices: [
      { id: "A", text: "签金阙FC，哪怕从替补坐起", effects: { flags: { contract: "jinqve" }, reputation: 10, spiritStones: 40 }, next: "ch5_end" },
      { id: "B", text: "签青木联，做一支球队的核心", effects: { flags: { contract: "qingmu" }, reputation: 8, spiritStones: 30 }, next: "ch5_end" },
      { id: "C", text: "先不签，等淬炼营", effects: { flags: { contract: "camp" }, reputation: 5, attrs: { resolve: 2 } }, next: "ch5_end" }
    ]
  },

  // 章末 → 第六章《淬炼营·入营》
  {
    id: "ch5_end",
    chapter: 5,
    text: [
      "大比结束了，但日子还得过。你收拾行李的时候在包底翻出了第一场比赛的护腿板，上面还有干了的泥。",
      "深夜，手机震了一下。一封没有署名的消息，就一行字：「昆仑山腹，淬炼营。强者，来。」",
      "你关了手机，望向窗外。月光把远处的山脊照得发白。你看了很久，然后拉上了窗帘。明天还得早起。"
    ],
    system: "【第五章·学院大比·征战 完。接下来：第六章·淬炼营·入营。】",
    effects: { chapter: 1, age: 1 },
    next: "ch6_opening"
  }

] };
