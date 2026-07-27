/* data/chapter1.js — 第一章《觉醒》青训期 14-16岁
 * 事件链：开场觉醒 → 选足校 → 位置测试 → 修炼 → 宿敌 → 机缘 → 比赛 → 选踢法 → 冲突 → 选拔赛 → 结算
 */
window.CHAPTER1 = { events: [

  // 1. 序幕·五行球经 + 觉醒日荒球场
  {
    id: "ch1_opening",
    chapter: 1,
    text: [
      "大晋永和十四年，立秋。青云城蹴鞠庙里，你擦着供桌上的香灰。庙祝老头出门买酒去了，留你一个人看庙。",
      "你盯着墙上那幅褪色壁画看了十四年，今天却像头一回看见——五个古人各持一球，姿态迥异，脚下各刻一字：金、木、水、火、土。",
      "最左那人铁臂横张，一脚铲飞，脚下是「金」。金者，刚也，主铲断、拦截、对抗、硬度，得金根者筋骨如铁，一夫当关。",
      "第二人身形如柳，带球过五关斩六将，脚下是「木」。木者，生也，主盘带、速度、耐力、柔韧，得木根者身轻如燕，动若脱兔。",
      "第三人闭目而立，指尖引球如牵丝，球从三人裆下穿过，精准送到队友脚下，脚下是「水」。水者，智也，主传球、视野、球商、节奏，得水根者心如明镜，一脚出球便知三步之后。",
      "第四人怒目圆睁，一脚抽射，球带着火焰拖尾轰入球门，脚下是「火」。火者，烈也，主射门、爆发、力量、决断，得火根者血热如沸，一击致命。",
      "最后一人纹丝不动，任凭三人冲撞，他只管卡住位置，一头将球砸入网窝，脚下是「土」。土者，厚也，主站位、头球、平衡、抗压，得土根者稳如泰山，任尔东西南北风。",
      "壁画最下方还有一行字，被香灰糊住大半。你用袖子擦了擦——「五行无高下，灵根不锁命。金可破门，火可筑墙，水可冲阵，土可穿针。唯心之所向，方为球道。」",
      "庙祝拎着酒壶回来，斜你一眼：「又看壁画？三天后就是觉醒日。往测灵石上一按，金木水火土，老天爷给你什么就是什么。」",
      "他灌了口酒，补了一句：「但记住——灵根只决定你练什么快，不决定你踢什么位置。火根的后卫、水根的前锋，老夫都见过。别被五行框死了。」"
    ],
    next: "ch1_awakening_day"
  },

  // 1b. 觉醒日·荒球场与测灵石
  {
    id: "ch1_awakening_day",
    chapter: 1,
    text: [
      "立秋。天没亮你就醒了。",
      "青云城外的荒球场上，露水还挂在草尖。你第无数次把皮球踢向那面斑驳的土墙。墙皮剥落处，露出先人刻下的一行字——「球之道，通五行」。",
      "今天，城里所有十四岁的少年都要去蹴鞠庙，把手按在测灵石上。灵根觉醒，一生只此一次。",
      "有人说你爹当年是矿队蹴鞠冠军，也有人说你不过是捡球童的命。",
      "你排在长队末尾，看着前面的少年一个个上前——有人按下去，石头亮起金光，人群欢呼；有人按下去，石头纹丝不动，终生只能做凡人球员。",
      "轮到你了。掌心贴上石头。凉的。一秒。两秒。三秒。石头没有亮。",
      "身后有人开始窃笑。庙祝摇了摇头。你松开手，转身——"
    ],
    choices: [
      { id: "A", text: "不管了，转身就走", effects: { attrs: { resolve: 1 } }, next: "ch1_root_result" },
      { id: "B", text: "回头再看一眼石头", effects: { attrs: { iq: 1 } }, next: "ch1_root_result" }
    ]
  },

  // 2. 灵根觉醒结果（随机）+ 庙祝按灵根动态点评
  {
    id: "ch1_root_result",
    chapter: 1,
    type: "root_awaken",
    byRoot: {
      "火": {
        text: "轰。石头炸了。不是亮，是炸——赤红色的光从石心迸裂而出，热浪掀翻了供桌上的香炉。",
        system: "【灵根觉醒！你获得：{rootDisplay}】\n人群散去后，庙祝把你拉到后堂，从柜里翻出一卷泛黄册子，翻到「火」字页。\n「火主射门、爆发、力量、决断。往后修炼这四样，一点顶别人两点。但其余属性——传球、盘带、铲断那些——你练起来和常人无异，没有捷径。」\n「火根灵性纯厚，亲和属性成长飞快。但代价是偏科——其余属性练起来和常人无异，是天才的宿命。」\n「火根不锁位置，但老夫给你几条路参考：\n其一，中锋·冲击型——反越位、爆射，最纯粹的火根踢法；\n其二，中锋·抢点型——不靠带球，靠跑位和一脚终结；\n其三，边锋·内切型——边路内切后远射；\n其四，前腰·攻击型——后插上远射、禁区前沿发炮。」\n「当然，你偏踢后卫、踢组织也不是不行，只是同样修炼点，别人水根练传球涨1.5，你只涨1。慢，但不封死你的路。现在你只需要决定一件事——」"
      },
      "金": {
        text: "石头骤亮金芒，像一柄无形的剑自石心出鞘，铮然作鸣。",
        system: "【灵根觉醒！你获得：{rootDisplay}】\n庙祝翻到「金」字页。\n「金主铲断、拦截、对抗、硬度。往后修炼这四样，一点顶别人两点。筋骨如铁，一夫当关万夫莫开。」\n「金根不锁位置，但老夫给你几条路参考：\n其一，中后卫·上抢型——前顶拦截、回追铲球；\n其二，后腰·绞杀型——铲断+对抗，中场扫荡；\n其三，边后卫·防守型——1v1铁闸；\n其四，中后卫·带刀型——逆玩法，靠头球和远射硬堆进攻。」\n「进了足校慢慢试。现在你只需要决定一件事——」"
      },
      "木": {
        text: "石头泛起翠绿光，像一芽春草破石而出，生机盎然。",
        system: "【灵根觉醒！你获得：{rootDisplay}】\n庙祝翻到「木」字页。\n「木主盘带、速度、耐力、柔韧。往后修炼这四样，一点顶别人两点。身轻如燕，动若脱兔，长途奔袭不知疲倦。」\n「木根不锁位置，但老夫给你几条路参考：\n其一，边锋·突破型——盘带+速度，1v1过人；\n其二，边后卫·进攻型——速度+耐力，套边插上；\n其三，中锋·冲击型——速度流前锋，反越位；\n其四，中场·全能型——逆玩法，靠耐力覆盖全场。」\n「进了足校慢慢试。现在你只需要决定一件事——」"
      },
      "水": {
        text: "石头亮起幽蓝光，如一汪清泉在石心流转，无声而凉。",
        system: "【灵根觉醒！你获得：{rootDisplay}】\n庙祝翻到「水」字页。\n「水主传球、视野、球商、节奏。往后修炼这四样，一点顶别人两点。心如明镜，一脚出球便知三步之后。」\n「水根不锁位置，但老夫给你几条路参考：\n其一，前腰·古典十号——传球+视野，致命一传；\n其二，中锋·伪九型——回撤组织，助攻王；\n其三，后腰·节拍器——长传调度，由守转攻第一脚；\n其四，边锋·组织型——逆玩法，边路调度、斜长传转移。」\n「进了足校慢慢试。现在你只需要决定一件事——」"
      },
      "土": {
        text: "石头泛起赭黄光，沉稳厚重，连地面都微微一颤。",
        system: "【灵根觉醒！你获得：{rootDisplay}】\n庙祝翻到「土」字页。\n「土主站位、头球、平衡、抗压。往后修炼这四样，一点顶别人两点。稳如泰山，任尔东西南北风。」\n「土根不锁位置，但老夫给你几条路参考：\n其一，中锋·支点型——头球+对抗，背身拿球；\n其二，中后卫·拖后型——站位+平衡，防线定海针；\n其三，中锋·抢点型——站位+跑位，门前嗅觉；\n其四，后腰·防守型——逆玩法，靠抗压和平衡做中场屏障。」\n「进了足校慢慢试。现在你只需要决定一件事——」"
      },
      "杂": {
        text: "石头忽明忽暗——金、木、水、火、土五色交替闪烁，迟迟不定。半晌，五色竟一齐黯淡下去，没有一色占上风。",
        system: "【灵根觉醒！你获得：{rootDisplay}】\n庙祝沉默了很久。\n「……四属以上。他们管这叫『废根』。没有倍率加成，练什么都和常人一样。」\n他灌了口酒。\n「但老夫活了七十年，见过一个杂灵根的老家伙。他练了三十年，五行全部到了化域。别人一辈子只能精通一两样，他样样通。」\n「位置？踢法？对你来说没有建议。你什么都能练，只是比别人慢。选什么全看你自己。」\n「——别放弃就行。现在你只需要决定一件事——」"
      }
    },
    choices: [
      { id: "A", text: "确认灵根，上路", next: "ch1_school_choice" },
      { id: "B", text: "重新觉醒（剩余{rerollLeft}次）", reroll: true, when: { rerollLeft: true }, next: "ch1_root_result" }
    ]
  },

  // 2b. 确认灵根后·选择去向（三选一）
  {
    id: "ch1_school_choice",
    chapter: 1,
    text: [
      "庙祝合上那卷泛黄的册子，收回柜中，看着你问：",
      "「灵根定了，往后的路是你自己的。说吧——去哪儿？」"
    ],
    choices: [
      { id: "A", text: "留在青云足校，从家门口开始证明自己", effects: { flags: { school: "local", school_local: true }, reputation: 5 }, next: "ch1_enter_school_local" },
      { id: "B", text: "远赴帝都赤焰书院，天才就该去天才堆里", effects: { flags: { school: "capital", school_capital: true }, stamina: -10, reputation: 8 }, next: "ch1_enter_school_capital" },
      { id: "C", text: "先回家问问娘的意见", effects: { attrs: { resolve: 2 }, spiritStones: 10, flags: { familyLine: true } }, next: "ch1_ask_mother" }
    ]
  },

  // 2c. 家庭支线·回家问娘（初始道具）
  {
    id: "ch1_ask_mother",
    chapter: 1,
    text: [
      "你拱手别过庙祝，先回了家。",
      "娘正在灶前纳鞋底，见你回来，放下针线。你把觉醒之事一五一十说了。",
      "她沉默半晌，从柜底摸出一个布包，塞到你怀里：「这是你爹当年留下的护膝，还有娘攒的几两碎银。无论你去哪儿，记得——踢球如做人，脚跟要稳。」",
      "布包里除了一副旧护膝，还有十枚灵石。你攥着布包，心里某个地方踏实了些。"
    ],
    system: "【获得：父亲的旧护膝（决断+2）】\n【获得：灵石×10】\n【家庭支线已开启——娘的嘱托，是你往后心志的一块基石。】",
    next: "ch1_choice_school"
  },

  // 2d. 回家后回到足校二选一
  {
    id: "ch1_choice_school",
    chapter: 1,
    text: "觉醒日已过，该上路了——是留在青云，还是远赴帝都？",
    choices: [
      { id: "A", text: "留在青云足校，从家门口开始证明自己", effects: { flags: { school: "local", school_local: true }, reputation: 5 }, next: "ch1_enter_school_local" },
      { id: "B", text: "远赴帝都赤焰书院，天才就该去天才堆里", effects: { flags: { school: "capital", school_capital: true }, stamina: -10, reputation: 8 }, next: "ch1_enter_school_capital" }
    ]
  },

  // 4a. 入学（本地）
  {
    id: "ch1_enter_school_local",
    chapter: 1,
    text: [
      "你摇了摇头：「庙祝大人，我不走了。青云就是我的根。」",
      "老人叹气，却也露出赞许：「好。脚跟扎得稳，球才踢得远。三日后，足校有人来接你。」",
      "回程的秋风卷起落叶，你攥紧拳头，掌心微微发烫——那是灵根在血脉里第一次苏醒的征兆。"
    ],
    next: "ch1_local_arrival"
  },

  // 4a-2. 本地线专属际遇（问题4：双路线差异化——父亲的荒球场、庙祝的人脉）
  {
    id: "ch1_local_arrival",
    chapter: 1,
    text: [
      "三日后，你没走远——从青云城东头到西头，从蹴鞠庙到足校，不过一炷香的脚程。",
      "青云足校的教头是庙祝的远房侄子，听说你是庙祝亲自作保的孩子，咧嘴一笑：「庙祝老人家的眼光，错不了。你爹老陈当年在矿队，一脚抽射能踢裂门板，人称『铁腿陈』。他留下的荒球场，如今还在城外呢。」",
      "当晚，你独自去了城外的荒球场。土墙还在，墙皮剥落处，父亲当年踢出的球痕依稀可辨。你对着墙一脚一脚地踢，仿佛隔着十几年光阴，与什么人对话。"
    ],
    system: "【本地线·青云足校】熟悉的土地，父亲的遗泽，庙祝的人脉——你的根在这里。",
    choices: [
      { id: "A", text: "每日清晨去荒球场，对墙苦练基本功", effects: { attrs: { shooting: 1, dribble: 1 }, flags: { localPitch: true } }, next: "ch1_roommate" },
      { id: "B", text: "常去庙里帮庙祝打理香火，听他讲《球经》旧事", effects: { attrs: { iq: 1, vision: 1 }, spiritStones: 5, flags: { templeHelp: true } }, next: "ch1_roommate" }
    ]
  },

  // 4b. 入学（帝都）
  {
    id: "ch1_enter_school_capital",
    chapter: 1,
    text: [
      "你深吸一口气：「庙祝大人，修书吧。我去帝都。」",
      "老人铺纸研墨，朱砂在烛火里像一簇小火苗：「赤焰书院卧虎藏龙，天才在那儿不会被埋没。路远，且苦——你可要想清楚。」",
      "三日后，你背上行囊，踏上北上帝都的官道。身后是生养你的青云城，前方是未知的修途。"
    ],
    next: "ch1_capital_arrival"
  },

  // 4b-2. 帝都线专属际遇（问题4：双路线差异化——天才云集的下马威、异乡磨砺）
  {
    id: "ch1_capital_arrival",
    chapter: 1,
    text: [
      "一个月的舟车劳顿后，帝都赤焰书院的朱红大门终于出现在眼前——比你想象的还要气派十倍。",
      "训练场铺的是聚灵沙，练习用的是会发光的灵皮球。来往学子随手一脚，都是青云城足以惊掉下巴的技巧。你报出青云城的名号时，有人嗤笑：「小地方来的，也配进赤焰？」",
      "入学第一天，教头瞥了眼你的荐书，淡淡道：「青云城……呵。这里每年收三百个新人，最后能留下的不到十个。别给家乡丢人。」",
      "当夜，你躺在异乡的床板上，听着帝都遥远的更鼓。想家的念头和不服输的劲头，一起在胸口翻涌。"
    ],
    system: "【帝都线·赤焰书院】天才云集，强者为尊。在这里，你只能用脚说话。",
    choices: [
      { id: "A", text: "埋头苦练，先忍下这口气", effects: { attrs: { resolve: 1, pressure: 1 }, flags: { capitalGrind: true } }, next: "ch1_roommate" },
      { id: "B", text: "主动结交各地学子，取长补短", effects: { attrs: { passing: 1 }, reputation: 3, flags: { capitalFriends: true } }, next: "ch1_roommate" }
    ]
  },

  // 4c. 入学·认识室友阿贵（设计稿第二章事件4：阿贵同校自动同宿舍）
  {
    id: "ch1_roommate",
    chapter: 1,
    text: [
      "报到那天，你拎着行囊找到宿舍。还没推门，就听见里面传来一个熟悉的大嗓门。",
      "开门的是个黑壮少年——阿贵！当年荒球场上一起踢破布球的发小，如今铺盖就摆在你对床。",
      "「你也来了？！」阿贵蹦起来，照你肩膀就是一拳，笑得眼睛眯成缝：「太好了！往后咱哥俩有个照应。你负责进球，我负责给你传球、跑位——我这体力和跑动，全宿舍没人比得上！」"
    ],
    system: "【室友·阿贵 加入你的青训岁月。往后的比赛里，他会不知疲倦地为你奔跑拉扯。】",
    choices: [
      { id: "A", text: "笑着锤他胸口：「行，以后咱俩互相照应！」", effects: { relationships: { agui: 20 }, bonds: { agui: 20 }, flags: { aguiRoommate: true }, reputation: 2 }, next: "ch1_position_test" },
      { id: "B", text: "翻个白眼：「少来，跟我一个宿舍，打呼噜都嫌你吵。」", effects: { relationships: { agui: 15 }, bonds: { agui: 15 }, flags: { aguiRoommate: true }, attrs: { resolve: 1 } }, next: "ch1_position_test" }
    ]
  },

  // 5. 位置测试
  {
    id: "ch1_position_test",
    chapter: 1,
    text: [
      "入校第一日，便是位置测试。铁叔把一筐皮球踢到场地中央：「想站哪儿，自己用脚说话。」",
      "你望着那片绿茵，心跳如鼓。站的位置，将决定你这辈子在球场上干什么。"
    ],
    choices: [
      { id: "A", text: "冲到最前头——我要当前锋，把球送进对方大门", effects: { position: "ST" }, next: "ch1_first_train" },
      { id: "B", text: "在两翼游走——边路才是我的天地", effects: { position: "LW" }, next: "ch1_first_train" },
      { id: "C", text: "退居中路调度——我要做那个传球的人", effects: { position: "CAM" }, next: "ch1_first_train" }
    ]
  },

  // 6. 第一次修炼（教学）
  {
    id: "ch1_first_train",
    chapter: 1,
    type: "train",
    text: "入队第一月，铁叔把你领进修炼房：「灵根是顺风，不是锁死。亲和属性练得快，非亲和属性也能练——只是慢些。你每月有3点修炼点，爱点哪儿点哪儿。」",
    next: "ch1_rival_intro"
  },

  // 7. 宿敌登场
  {
    id: "ch1_rival_intro",
    chapter: 1,
    text: [
      "第二个月的队内对抗，你撞上了一个硬茬。",
      "那人比同龄人高半头，眼里带着刺。一记铲断把你连人带球放翻，他俯身冷笑：「天品？哼，灵根克你，就是废物。」",
      "铁叔拉起你，低声道：「这是赵凛，{elementAdj}的性子，专挑你的灵根克。记住这天——五年后，你俩还要在更大的场子上碰。」"
    ],
    system: "【宿敌·赵凛 已记入名册。灵根相克：他被你克，或你被他克，赛场相见见真章。】",
    choices: [
      { id: "A", text: "咬牙咽下，记仇——来日方长", effects: { relationships: { rival: -20 }, flags: { rivalGrudge: true } }, next: "ch1_mentor_event" },
      { id: "B", text: "当场约战，三个月后再分高下", effects: { relationships: { rival: -10 }, flags: { rivalChallenge: true }, reputation: 5 }, next: "ch1_mentor_event" }
    ]
  },

  // 8. 机缘：退役名宿
  {
    id: "ch1_mentor_event",
    chapter: 1,
    text: [
      "一个落雨的黄昏，你独自加练。场边不知何时多了个拄杖老人，看了一会儿，忽然开口：「你这脚法，是野路子。可根基不稳，再练十年也是花架子。」",
      "他扔来一本发黄的小册子：「老夫姓沈，年轻时也踢过几年，与青云城蹴鞠庙有些旧交。这本小册子你拿去——里头记着前人如何借五行之力。能不能悟，看造化。」"
    ],
    choices: [
      { id: "A", when: { flag: "school_local" }, text: "恭敬接过，拜谢前辈指点", check: { attrs: ["iq", "vision"], difficulty: 25, tag: "球商+视野" }, next: "ch1_train_02",
        success: { text: "原来老人是庙祝的旧识、退役名宿老沈，听闻你是庙祝作保的孩子，抚须而笑：「好苗子。」那夜你挑灯翻阅《球经残卷》，隐隐摸到灵力流转的门径——几项属性竟有所精进。", effects: { flags: { metMentor: true }, attrs: { vision: 2, iq: 2 }, reputation: 3 } },
        fail: { text: "残卷字迹漫漶，你看了半宿也没悟出什么。老沈叹气，拂袖而去。", effects: { flags: { metMentor: true } } },
        critical: { text: "【灵光一闪】残卷末页忽现金光，一行字钻进你脑海：「五行相生，球道通焉。」你顿悟般通了周身灵脉！老沈惊呼：「此子根骨，百年一遇！」", effects: { flags: { metMentor: true, insight: true }, attrs: { vision: 3, iq: 3, rhythm: 2 }, reputation: 6 } }
      },
      { id: "B", when: { flag: "school_local" }, text: "婉拒——我自己摸索出来的路才走得踏实", effects: { flags: { refusedMentor: true }, stamina: -5, attrs: { resolve: 1 } }, next: "ch1_train_02" },
      { id: "C", when: { flag: "school_capital" }, text: "恭敬接过，拜谢前辈指点", check: { attrs: ["iq", "vision"], difficulty: 28, tag: "球商+视野" }, next: "ch1_train_02",
        success: { text: "原来老人竟是书院退役的老教头，早就看出你是野路子出身。他递来的《赤焰训录》里，记着帝都最正统的灵力运用之法。你日夜研读，几项属性竟有所精进。", effects: { flags: { metMentor: true }, attrs: { vision: 2, iq: 2 }, reputation: 4 } },
        fail: { text: "《赤焰训录》满篇帝都官话与灵诀术语，你看了半宿也没悟出什么。老教头摇头而去：「野路子，终究是野路子。」", effects: { flags: { metMentor: true }, demonValue: 2 } },
        critical: { text: "【灵光一闪】训录末页一幅灵力流转图在你脑中活了过来：「五行相生，球道通焉。」你顿悟般通了周身灵脉！老教头失声道：「此子……竟无师自通！」", effects: { flags: { metMentor: true, insight: true }, attrs: { vision: 3, iq: 3, rhythm: 2 }, reputation: 8 } }
      },
      { id: "D", when: { flag: "school_capital" }, text: "婉拒——在帝都，我只信自己的踢法", effects: { flags: { refusedMentor: true }, stamina: -5, attrs: { resolve: 1 } }, next: "ch1_train_02" }
    ]
  },

  // 9. 日常修炼
  {
    id: "ch1_train_02",
    chapter: 1,
    type: "train",
    text: "又是修炼的一月。晨起练气，日暮练球。修炼房里五行灵光流转，你按灵根所近，将气力分注入各脉。前路漫漫，唯练不破。",
    next: "ch1_youth_match"
  },

  // 10. 青训队内赛（第一场比赛，用 fallback 简化）
  {
    id: "ch1_youth_match",
    chapter: 1,
    type: "match",
    text: "铁叔宣布：今日队内赛，{position}组的全员上阵。你换上号衣，听见看台上有人在喊你的名字——许是庙祝老人来了。",
    opponent: { name: "青训B队", element: "水", strength: 22 },
    pool: "youth",
    fallback_choices: [
      { id: "A", text: "前场得球，起脚远射！", check: { attrs: ["shooting", "burst"], difficulty: 30, tag: "射门+爆发" },
        success: { text: "皮球带着{elementAdj}的弧线钻入死角！看台沸腾。", effects: { reputation: 8, attrs: { shooting: 1 } } },
        fail: { text: "皮球擦柱而出，你懊恼捶地。", effects: { stamina: -5 } },
        critical: { text: "【灵光一闪】世界波！解说嘶吼：「这一脚带着火焰的尾迹！」", effects: { reputation: 15, attrs: { shooting: 2 } } }
      },
      { id: "B", text: "接应队友，送出一记直塞", check: { attrs: ["passing", "vision"], difficulty: 28, tag: "传球+视野" },
        success: { text: "皮球像一尾游鱼穿过缝隙，队友推射得手！你收获一记助攻。", effects: { reputation: 6, assists: 1, attrs: { passing: 1 } } },
        fail: { text: "传球被断，对方打起反击。", effects: { stamina: -4 } },
        critical: { text: "【灵光一闪】手术刀直塞！解说：「水银泻地，润物无声。」", effects: { reputation: 12, assists: 1, attrs: { passing: 2 } } }
      },
      { id: "C", text: "回防拼抢，先稳住后场", check: { attrs: ["tackle", "strength"], difficulty: 26, tag: "铲断+对抗" },
        success: { text: "你一记干净铲断，赢得满堂喝彩。", effects: { reputation: 5, attrs: { tackle: 1 } } },
        fail: { text: "拼抢中你被撞开，球丢了。", effects: { stamina: -6 } },
        critical: { text: "【灵光一闪】铁壁封堵！对方前锋被你铲得直摇头。", effects: { reputation: 10, attrs: { tackle: 2 } } }
      }
    ],
    result: {
      bigwin: { text: "终场哨响，你方大胜。铁叔拍你肩膀：「有点意思。」", effects: { reputation: 8 } },
      win:     { text: "终场哨响，小胜一球。你抹了把汗，心里踏实了些。", effects: { reputation: 4 } },
      draw:    { text: "平局收场。不算出彩，也不丢人。", effects: { reputation: 1 } },
      lose:    { text: "输了。你低着头走下场，听见赵凛在笑。", effects: { reputation: -3, stamina: -5 } }
    },
    next: "ch1_playstyle"
  },

  // 11. 选择踢法
  {
    id: "ch1_playstyle",
    chapter: 1,
    text: [
      "赛季过半，铁叔把你叫到跟前：「位置定了，可同位置也有不同踢法。你想走哪条路？」",
      "踢法决定你日后在球场上遇到什么样的关键时刻。"
    ],
    choices: [
      { id: "A", text: "中锋·冲击型：反越位、单刀、暴力抽射", effects: { playstyle: "impact" }, next: "ch1_conflict" },
      { id: "B", text: "中锋·支点型：背身拿球、头球轰炸", effects: { playstyle: "pivot" }, next: "ch1_conflict" },
      { id: "C", text: "边锋·突破型：过人、下底传中", effects: { playstyle: "break" }, next: "ch1_conflict" },
      { id: "D", text: "前腰·古典十号：致命一传、控制节奏", effects: { playstyle: "classic" }, next: "ch1_conflict" }
    ]
  },

  // 12. 冲突事件
  {
    id: "ch1_conflict",
    chapter: 1,
    text: [
      "选拔在即，你与赵凛的矛盾激化。训练场上，他故意撞翻你的队友，还挑衅地望着你。",
      "铁叔不在。四周都是等着看戏的眼睛。"
    ],
    choices: [
      { id: "A", text: "当面理论，不怵他", check: { attrs: ["resolve", "strength"], difficulty: 30, tag: "决断+对抗" }, next: "ch1_train_05",
        success: { text: "你一步不退，赵凛反倒被你的气势压住，悻悻走开。队友们眼中有了光。", effects: { reputation: 6, relationships: { rival: -5 }, flags: { conflictWin: true } } },
        fail: { text: "争执中你被推了个趔趄，颜面尽失。赵凛大笑离去。", effects: { reputation: -4, relationships: { rival: -10 }, flags: { conflictLose: true } } },
        critical: { text: "【灵光一闪】你一言定风波，全队为你站台。赵凛脸色铁青。", effects: { reputation: 12, flags: { conflictWin: true } } }
      },
      { id: "B", text: "忍下，把劲头留到选拔赛", effects: { flags: { conflictBide: true }, attrs: { resolve: 1 } }, next: "ch1_train_05" }
    ]
  },

  // 13. 选拔前修炼
  {
    id: "ch1_train_05",
    chapter: 1,
    type: "train",
    text: "选拔赛前最后一月。你闭关修炼房，将灵力尽数压进经脉。窗外蝉鸣渐歇，秋风里有了肃杀之意。",
    next: "ch1_selection"
  },

  // 14. 选拔赛（使用踢法事件池）
  {
    id: "ch1_selection",
    chapter: 1,
    type: "match",
    text: "选拔赛。对手是宿敌赵凛领衔的青训A队。看台上，几名一线队球探正低头记录。你深吸一口气，踏上绿茵。",
    opponent: { name: "青训A队·赵凛", element: "水", strength: 38 },
    fallback_choices: [
      { id: "A", text: "接直塞单刀赴会", check: { attrs: ["speed", "burst"], difficulty: 38, tag: "速度+爆发" },
        success: { text: "你{elementAdj}地甩开后卫，面对门将推射得手！", effects: { reputation: 10, goals: 1, attrs: { speed: 1 } } },
        fail: { text: "后卫回追，把你连人带球铲出底线。", effects: { stamina: -6 } },
        critical: { text: "【灵光一闪】反越位成功！单刀破门，全场起立。", effects: { reputation: 18, goals: 1, flags: { keySuccess: true } } }
      },
      { id: "B", text: "角球前点抢位头槌", check: { attrs: ["positioning", "heading"], difficulty: 33, tag: "站位+头球" },
        success: { text: "你旱地拔葱，头槌破网！解说：「泰山压顶！」", effects: { reputation: 9, goals: 1, attrs: { heading: 1 } } },
        fail: { text: "起跳早了，皮球擦顶而过。", effects: { stamina: -4 } },
        critical: { text: "【灵光一闪】旱地拔葱，暴力头槌！门将目送入网。", effects: { reputation: 16, goals: 1, flags: { keySuccess: true } } }
      },
      { id: "C", text: "回撤做墙，分边助攻", check: { attrs: ["passing", "vision"], difficulty: 35, tag: "传球+视野" },
        success: { text: "你一脚斜塞撕裂防线，队友单刀破门。", effects: { reputation: 8, assists: 1, attrs: { passing: 1 } } },
        fail: { text: "传球意图被识破，被断。", effects: { stamina: -5 } },
        critical: { text: "【灵光一闪】手术刀直塞！解说：「水银泻地。」", effects: { reputation: 14, assists: 1, flags: { keySuccess: true } } }
      }
    ],
    result: {
      bigwin: { text: "终场哨响，大胜！球探们交头接耳，赵凛铁青着脸不发一言。你听见一线队的召唤近了。", effects: { reputation: 12, flags: { selected: true, keySuccess: true } } },
      win:     { text: "小胜一球。球探点了点头，在名册上圈了你的名字。", effects: { reputation: 6, flags: { selected: true } } },
      draw:    { text: "平局。你表现中规中矩，球探没有特别记下你。", effects: { reputation: 2, flags: { selected: false } } },
      lose:    { text: "输了。赵凛在终场前绝杀了你方。球探摇头离席。", effects: { reputation: -5, stamina: -8, flags: { selected: false } } }
    },
    next: "ch1_end"
  },

  // 15. 第一章结算
  {
    id: "ch1_end",
    chapter: 1,
    text: [
      "赛季落幕。无论输赢，青训的这一年都烙进了你的骨头。",
      "铁叔把你叫到办公室，递来一份名单：「一线队看上你了。收拾收拾，该去更大的场子了。」",
      "窗外，青云城的雪落了下来。你想起蹴鞠庙那块亮起的测灵石——一切，都从那一道光开始。"
    ],
    system: "【第一章·觉醒 完。你的灵根已成形，接下来，是职业联赛的淬炼。】",
    effects: { chapter: 1, age: 3 },
    next: "ch2_opening"
  }

] };
