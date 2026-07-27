/* data/chapter1.js — 第一章《觉醒》青训期 14-16岁
 * 事件链：开场觉醒 → 选足校 → 位置测试 → 修炼 → 宿敌 → 机缘 → 比赛 → 选踢法 → 冲突 → 选拔赛 → 结算
 */
window.CHAPTER1 = { events: [

  // 1. 序幕·五行球经 + 觉醒日荒球场
  {
    id: "ch1_opening",
    chapter: 1,
    text: [
      "大晋永和十四年，立秋。青云城蹴鞠庙。",
      "你蹲在供桌前擦香灰，指腹蹭过积了半寸的灰垢，涩的，带一股陈年檀香的苦味。庙祝老头一早就出门打酒了，临走时趿拉着布鞋，嘟囔了句「看着门」，连眼皮都没抬。庙里只剩你，和檐角滴水的声响。",
      "墙上那幅壁画，你看了十四年。颜料早褪成了灰扑扑的影子，可今天不知怎的——立秋的风从门缝灌进来，吹得烛火一歪——你忽然觉得那五个人像活了过来。",
      "最左那人铁臂横张，一脚铲出去，草皮连着泥翻起来。脚下刻一个字：金。金者，刚也。铲断、拦截、对抗、硬度。得金根的人，你跟他肩膀一碰就知道——像撞了根铁桩子。",
      "第二人身形如柳，球黏在脚背上，过五关斩六将，脚下生风。木。木者，生也。盘带、速度、耐力、柔韧。得木根的人跑起来没有声音，等你反应过来，他已经过去了两个身位。",
      "第三人闭着眼。指尖一引，球像被线牵着，从三个人裆下穿过去，不偏不倚落在队友脚前。水。水者，智也。传球、视野、球商、节奏。得水根的人，球还没到脚下，他已经想好了下三步。",
      "第四人怒目圆睁，抡腿就是一脚。球带着灼热的尾迹轰进去，网窝抖了三抖。火。火者，烈也。射门、爆发、力量、决断。得火根的人，你站他三米远都能感觉到那股热气。",
      "最后一人纹丝不动。三个人撞他，他晃都不晃，只管卡住位置，一头把球砸进网窝。土。土者，厚也。站位、头球、平衡、抗压。得土根的人往禁区里一站，就像地上长了根。",
      "壁画最底下一行小字，叫香灰糊了大半。你用袖子使劲蹭了蹭，灰呛得你咳了一声——「五行无高下，灵根不锁命。金可破门，火可筑墙，水可冲阵，土可穿针。唯心之所向，方为球道。」",
      "庙祝不知什么时候回来的，酒气先于人到了。他斜你一眼，把酒壶往供桌上一墩：「又看。看了十四年，看出花来了？」他拿袖子抹了抹嘴，「三天后觉醒日，往石头上一按，金木水火土，老天爷给什么就是什么。急也没用。」",
      "他又灌了口酒，喉结滚了滚，忽然补了句：「不过……灵根只管你练什么快，不管你踢什么位置。火根的后卫、水根的前锋，老夫都见过，踢得都不赖。别叫五行把你框死喽。」"
    ],
    next: "ch1_awakening_day"
  },

  // 1b. 觉醒日·荒球场与测灵石
  {
    id: "ch1_awakening_day",
    chapter: 1,
    text: [
      "立秋。天没亮你就醒了。窗外的蛐蛐还在叫，叫了一宿，嗓子该哑了吧。",
      "青云城外的荒球场。露水挂在草尖上，你一踩，鞋面就洇湿了，凉意顺着脚趾往上爬。你把皮球踢向那面斑驳的土墙——砰，弹回来；砰，弹回来。墙皮剥落的地方，露出先人刻的一行字，笔画被风雨磨得快没了：「球之道，通五行」。",
      "今天，城里所有十四岁的少年都得去蹴鞠庙。把手按在测灵石上，灵根觉醒，一辈子就这一次。成了，往后吃这碗饭；不成，一辈子也就是个野球场踢着玩的命。",
      "有人说你爹当年是矿队蹴鞠冠军，一脚能踢裂门板。也有人说，冠军的儿子多了去了，有几个踢出来的。",
      "你排在长队末尾。前头的少年一个个上前——有人按下去，石头亮了，金光刺眼，人群嗷地一嗓子；有人按下去，什么也没有。那人愣在原地，手还贴着石头，半天没松开。",
      "轮到你了。掌心贴上去。凉的，像贴了块冬天的铁。一秒。两秒。三秒。石头没有亮。你听见自己的心跳，咚、咚、咚，闷得像隔着层棉被。",
      "身后有人笑了一声，不大，但你听见了。庙祝摇了摇头，酒壶在手里晃了晃。你松开手，指尖是麻的。转身——"
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
        text: "轰。不是亮——是炸。赤红色的光从石心迸出来，一股热浪拍在你脸上，像开了窑门。供桌上的香炉叫气浪掀翻了，铜的，砸在地上咣当响。你手心烫得发疼。",
        system: "【灵根觉醒！你获得：{rootDisplay}】\n人群散去后，庙祝把你拉到后堂，从柜里翻出一卷泛黄册子，翻到「火」字页。\n「火主射门、爆发、力量、决断。往后修炼这四样，一点能当别人{affinityMult}点用。但其余属性——传球、盘带、铲断那些——你练起来不但没有捷径，反而比常人还慢。」\n「火根灵性纯厚，亲和属性成长飞快。但代价是偏科——其余属性练起来比常人还慢，是天才的宿命。」\n「火根不锁位置，但老夫给你几条路参考：\n其一，中锋·冲击型——反越位、爆射，最纯粹的火根踢法；\n其二，中锋·抢点型——不靠带球，靠跑位和一脚终结；\n其三，边锋·内切型——边路内切后远射；\n其四，前腰·攻击型——后插上远射、禁区前沿发炮。」\n「当然，你偏踢后卫、踢组织也不是不行，只是同样修炼点，别人水根练传球涨1.5，你只涨{nonAffinityMult}。慢，但不封死你的路。现在你只需要决定一件事——」"
      },
      "金": {
        text: "石头骤亮。金芒刺得你眯了眼，像有柄无形的剑从石心里抽出来，嗡的一声，你牙根发酸，骨头缝里都在震。",
        system: "【灵根觉醒！你获得：{rootDisplay}】\n庙祝翻到「金」字页。\n「金主铲断、拦截、对抗、硬度。往后修炼这四样，一点能当别人{affinityMult}点用。筋骨如铁，一夫当关万夫莫开。」\n「金根不锁位置，但老夫给你几条路参考：\n其一，中后卫·上抢型——前顶拦截、回追铲球；\n其二，后腰·绞杀型——铲断+对抗，中场扫荡；\n其三，边后卫·防守型——1v1铁闸；\n其四，中后卫·带刀型——逆玩法，靠头球和远射硬堆进攻。」\n「进了足校慢慢试。现在你只需要决定一件事——」"
      },
      "木": {
        text: "石头泛起一层翠绿的光，柔柔的，像开春头一茬草芽顶开冻土。你手心痒酥酥的，像有根藤蔓从掌纹里往外抽。",
        system: "【灵根觉醒！你获得：{rootDisplay}】\n庙祝翻到「木」字页。\n「木主盘带、速度、耐力、柔韧。往后修炼这四样，一点能当别人{affinityMult}点用。身轻如燕，动若脱兔，长途奔袭不知疲倦。」\n「木根不锁位置，但老夫给你几条路参考：\n其一，边锋·突破型——盘带+速度，1v1过人；\n其二，边后卫·进攻型——速度+耐力，套边插上；\n其三，中锋·冲击型——速度流前锋，反越位；\n其四，中场·全能型——逆玩法，靠耐力覆盖全场。」\n「进了足校慢慢试。现在你只需要决定一件事——」"
      },
      "水": {
        text: "石头亮起幽蓝的光，不刺眼，凉丝丝的，像大冬天捧了把井水。你脑子里忽然安静了，连庙外头麻雀叫了几声都数得清。",
        system: "【灵根觉醒！你获得：{rootDisplay}】\n庙祝翻到「水」字页。\n「水主传球、视野、球商、节奏。往后修炼这四样，一点能当别人{affinityMult}点用。心如明镜，一脚出球便知三步之后。」\n「水根不锁位置，但老夫给你几条路参考：\n其一，前腰·古典十号——传球+视野，致命一传；\n其二，中锋·伪九型——回撤组织，助攻王；\n其三，后腰·节拍器——长传调度，由守转攻第一脚；\n其四，边锋·组织型——逆玩法，边路调度、斜长传转移。」\n「进了足校慢慢试。现在你只需要决定一件事——」"
      },
      "土": {
        text: "石头泛起赭黄的光，沉，厚，不张扬。你脚底下的地砖微微一颤，像有什么东西从地底顶上来。你的重心忽然稳了，扎在地上，拔不动。",
        system: "【灵根觉醒！你获得：{rootDisplay}】\n庙祝翻到「土」字页。\n「土主站位、头球、平衡、抗压。往后修炼这四样，一点能当别人{affinityMult}点用。稳如泰山，任尔东西南北风。」\n「土根不锁位置，但老夫给你几条路参考：\n其一，中锋·支点型——头球+对抗，背身拿球；\n其二，中后卫·拖后型——站位+平衡，防线定海针；\n其三，中锋·抢点型——站位+跑位，门前嗅觉；\n其四，后腰·防守型——逆玩法，靠抗压和平衡做中场屏障。」\n「进了足校慢慢试。现在你只需要决定一件事——」"
      },
      "杂": {
        text: "石头忽明忽暗。金、木、水、火、土——五色轮着闪，像走马灯似的，哪个也不肯让哪个。你手心一会儿烫一会儿凉，脑子嗡嗡的。半晌，五色一齐暗下去了。什么也没剩下。",
        system: "【灵根觉醒！你获得：{rootDisplay}】\n庙祝沉默了很久。\n「……四属亲和。他们管这叫『杂根』。能练的比别人多，亲和的四行都快那么一点（×{affinityMult}），唯独无缘的那一行，练起来反倒比常人还慢（×{nonAffinityMult}）。」\n他灌了口酒。\n「但老夫活了七十年，见过一个杂灵根的老家伙。他练了三十年，五行全部到了化域。别人一辈子只能精通一两样，他样样通。」\n「位置？踢法？对你来说没有建议。你什么都能练，只是广而不精。选什么全看你自己。」\n「——别放弃就行。现在你只需要决定一件事——」"
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
      "庙祝把那卷泛黄的册子合上，塞回柜里，柜门吱呀一声。他拿手背蹭了蹭鼻子上的酒糟，看着你，看了好一会儿。",
      "「灵根定了。往后的路……是你自己的。」他把酒壶往腰间一别，「说吧，去哪儿。」"
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
      "你拱手别过庙祝，先回了家。巷子里有股子炊烟味，谁家灶上炖着萝卜。",
      "娘正在灶前纳鞋底，针脚密得很。见你回来，她把针线往膝上一搁，没问，就那么看着你。你把觉醒的事一五一十说了。她听着，手里的鞋底攥紧了些。",
      "她没说好，也没说不好。沉默了半天，弯腰从柜底摸出个布包，灰扑扑的，塞到你怀里：「你爹留下的护膝。还有……娘攒的几两碎银，不多。」她顿了顿，拿手背抹了下眼角，「无论去哪儿，脚跟要稳。踢球跟做人一个道理。」",
      "布包里一副旧护膝，皮子都磨白了，还有十枚灵石，用红绳穿着。你攥着布包，手心热热的，心里有个地方踏实了。"
    ],
    system: "【获得：父亲的旧护膝（决断+2）】\n【获得：灵石×10】\n【家庭支线已开启——娘的嘱托，是你往后心志的一块基石。】",
    next: "ch1_choice_school"
  },

  // 2d. 回家后回到足校二选一
  {
    id: "ch1_choice_school",
    chapter: 1,
    text: "觉醒日过了三天了。该上路了。你站在巷口，风把衣角吹得啪啪响——是留在青云，还是去帝都？",
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
      "你摇了摇头：「不走了。青云就是我的根。」",
      "庙祝哼了一声，也不知是叹气还是笑。他拿酒壶朝你点了点：「行。脚跟扎得稳，球才踢得远……三日后足校有人来接你，别迟到。」",
      "回去的路上，秋风卷着梧桐叶子打旋儿。你攥了攥拳头，掌心微微发烫——灵根在血脉里头，像颗刚醒的种子，拱了拱。"
    ],
    next: "ch1_local_arrival"
  },

  // 4a-2. 本地线专属际遇（问题4：双路线差异化——父亲的荒球场、庙祝的人脉）
  {
    id: "ch1_local_arrival",
    chapter: 1,
    text: [
      "三日后。你没走远——从青云城东头到西头，从蹴鞠庙到足校，一炷香的脚程。路上经过卖豆腐脑的摊子，你买了碗甜的，边走边吃。",
      "青云足校的教头姓周，庙祝的远房侄子。他接过荐书，拿拇指搓了搓上头的印，咧嘴一笑：「庙祝老人家的眼光，错不了。」他上下打量你一眼，「你爹老陈当年在矿队，一脚抽射踢裂过门板，人称『铁腿陈』。他留下的荒球场还在城外呢，墙都没塌。」",
      "当晚你去了。月亮很白，荒球场上的草长到了脚踝。土墙还在，墙皮剥落处，坑坑洼洼的球痕叠着球痕，新的盖着旧的。你捡起个半瘪的球，对着墙踢。砰。砰。砰。风把声音送出去很远。你忽然觉得，隔着十几年，有人在那头接着你的球。"
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
      "你深吸一口气。肺里灌满了庙里的檀香味。「庙祝大人……修书吧。我去帝都。」",
      "老人没马上应。他铺纸研墨，朱砂在烛火里泛着暗红的光，像一簇烧不尽的小火苗。笔搁在砚台上，他拿指头弹了弹：「赤焰书院……卧虎藏龙。路远，且苦。你想清楚了？」",
      "三日后你背上行囊，天不亮就出了城门。官道上的土还是凉的。身后是青云城灰蒙蒙的轮廓，前头是看不见尽头的路。你没回头。"
    ],
    next: "ch1_capital_arrival"
  },

  // 4b-2. 帝都线专属际遇（问题4：双路线差异化——天才云集的下马威、异乡磨砺）
  {
    id: "ch1_capital_arrival",
    chapter: 1,
    text: [
      "一个月的舟车。你瘦了一圈，脚底磨出两个茧。然后帝都赤焰书院的朱红大门就杵在眼前了——高得你仰脖子才看见顶。",
      "训练场铺的是聚灵沙，踩上去沙沙响，脚感跟青云城的泥地完全两回事。练习用的灵皮球会发光，来往学子随手一脚，那弧线、那力道，搁青云城够人看傻半天的。你报出青云城的名号时，旁边有人嗤了一声，不大，但够你听见：「小地方来的……也配？」",
      "入学头一天，教头瞥了眼你的荐书，拿指头夹着翻了翻，搁下了。「青云城。」他连语气都懒得变，「这儿每年收三百个新人，最后留下的不到十个。别给家乡丢人就行。」",
      "当夜你躺在宿舍的硬板床上，翻来覆去。帝都的更鼓跟青云城的不一样，沉，远，一下一下像敲在胸口上。你想家。也想证明点什么。两股劲儿拧在一块儿，堵得慌。"
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
      "报到那天，你拎着行囊找宿舍。走廊里一股子新被褥的浆洗味，混着谁的臭袜子。还没推门呢，里头就炸开一嗓子——",
      "门从里头猛地拉开，差点怼你脸上。黑壮少年，一脸横肉挤成笑：「我操！你也来了！」阿贵。当年荒球场上一起踢破布球的发小，如今铺盖就摆你对床。",
      "他照你肩膀就是一拳，劲儿大得你踉跄半步。「太好了太好了！」他搓着手，笑得眼睛眯成一条缝，「往后咱哥俩有个照应。你负责进球，我负责给你跑位、拉扯——我这体力，全宿舍你找不出第二个！」他拍着胸脯，砰砰响。"
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
      "入校第一日，位置测试。铁叔把一筐皮球踢到场地中央，球滚得到处都是。他站在边线上，手抄兜里，下巴朝球场一扬：「想站哪儿，自己用脚说话。」",
      "你望着那片绿茵。草皮是新修的，有股子青涩的草腥味。风把球门上的网吹得一鼓一鼓。你心跳得厉害，嗓子发干。站的位置，定了，就是一辈子的事。"
    ],
    choices: [
      { id: "A", text: "冲到最前头——我要当前锋，把球送进对方大门", effects: { position: "ST" }, next: "ch1_first_train" },
      { id: "B", text: "在两翼游走——边路才是我的天地", effects: { position: "LW" }, next: "ch1_first_train" },
      { id: "C", text: "退居中路调度——我要做那个传球的人", effects: { position: "CAM" }, next: "ch1_first_train" },
      { id: "D", text: "退到最后——我要做那道墙，谁也别想过去", effects: { position: "CB" }, next: "ch1_first_train" }
    ]
  },

  // 6. 第一次修炼（教学）
  {
    id: "ch1_first_train",
    chapter: 1,
    type: "train",
    text: "入队第一月。铁叔领你进修炼房，里头五行灵光流转，空气都是温的。他拿指头敲了敲墙上的经脉图：「灵根是顺风，不是锁。亲和的练得快，不亲和的也能练——慢些罢了。每月3点修炼点，爱点哪儿点哪儿。去吧。」",
    next: "ch1_rival_intro"
  },

  // 7. 宿敌登场
  {
    id: "ch1_rival_intro",
    chapter: 1,
    text: [
      "第二个月，队内对抗。你撞上了一个硬茬。",
      "那人比同龄人高半头，肩膀宽，眼神带着刺。你一个变向还没做完，他一脚铲过来——连人带球。你后脑勺磕在草皮上，嘴里全是土腥味。他俯下身，影子罩住你，嘴角一挑：「天品？灵根克你，就是废物。」语气不重，像在说个事实。",
      "铁叔把你拽起来，拍了拍你后背的草屑。他声音压得很低：「赵凛。{elementAdj}的性子，专挑你灵根克。记住今天。」他顿了顿，「往后你俩还要碰。不止一次。」"
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
      "一个落雨的黄昏。你独自加练，球鞋踩在湿草皮上打滑，裤腿全是泥点子。场边不知什么时候多了个拄杖的老头，蓑衣都没穿，就那么淋着，看了也不知多久。",
      "他忽然开口，嗓子哑得像砂纸：「野路子。」顿了顿，拐杖在地上笃了笃，「根基不稳。再练十年，也是花架子。」他随手扔来一本发黄的小册子，你差点没接住。「老夫姓沈。年轻时也踢过几年……跟青云城蹴鞠庙有些旧交。这册子你拿去，前人怎么借五行之力，里头记着。能不能悟，看你自己。」"
    ],
    choices: [
      { id: "A", when: { flag: "school_local" }, text: "恭敬接过，拜谢前辈指点", check: { attrs: ["iq", "vision"], difficulty: 25, tag: "球商+视野" }, next: "ch1_train_02",
        success: { text: "老人是庙祝的旧识，退役名宿老沈。他听你是庙祝作保的孩子，拿拐杖点了点你：「行，坐下。」那夜你挑灯翻《球经残卷》，纸页脆得一碰就掉渣。看着看着，忽然摸到点灵力流转的门道——说不清，但身上几处经脉确实松快了。", effects: { flags: { metMentor: true }, attrs: { vision: 2, iq: 2 }, reputation: 3 } },
        fail: { text: "残卷字迹漫漶，墨迹洇成一团一团的。你看了半宿，眼睛酸得流泪，什么也没悟出来。老沈站在门口叹了口气，没说话，拄着杖走了。雨还在下。", effects: { flags: { metMentor: true } } },
        critical: { text: "【灵光一闪】翻到末页，纸角卷着一行小字，你拿指甲刮开灰——「五行相生，球道通焉。」脑子里嗡的一声，像有人把一扇门踹开了。周身灵脉一齐通了。老沈拐杖掉在地上，他愣了半天：「……此子根骨，百年一遇。」", effects: { flags: { metMentor: true, insight: true }, attrs: { vision: 3, iq: 3, rhythm: 2 }, reputation: 6 } }
      },
      { id: "B", when: { flag: "school_local" }, text: "婉拒——我自己摸索出来的路才走得踏实", effects: { flags: { refusedMentor: true }, stamina: -5, attrs: { resolve: 1 } }, next: "ch1_train_02" },
      { id: "C", when: { flag: "school_capital" }, text: "恭敬接过，拜谢前辈指点", check: { attrs: ["iq", "vision"], difficulty: 28, tag: "球商+视野" }, next: "ch1_train_02",
        success: { text: "老人竟是书院退役的老教头。他早看出你是野路子出身，没点破，只是把《赤焰训录》递过来时多看了你一眼。你日夜研读，那些帝都正统的灵力运用之法，起初像天书，后来慢慢有了头绪。几项属性确实精进了。", effects: { flags: { metMentor: true }, attrs: { vision: 2, iq: 2 }, reputation: 4 } },
        fail: { text: "《赤焰训录》满篇官话和灵诀术语，你看了半宿，字都认识，连一块儿就不认识了。老教头第二天来收册子，翻了翻你画的笔记，摇摇头：「野路子……终究是野路子。」语气平淡，比骂你还难受。", effects: { flags: { metMentor: true }, demonValue: 2 } },
        critical: { text: "【灵光一闪】训录末页有幅灵力流转图，你盯着盯着，那图忽然在脑子里活了——经脉里的灵力自己动了起来。「五行相生，球道通焉。」你周身灵脉一齐贯通。老教头手里的茶盏啪地搁下：「此子……竟无师自通。」", effects: { flags: { metMentor: true, insight: true }, attrs: { vision: 3, iq: 3, rhythm: 2 }, reputation: 8 } }
      },
      { id: "D", when: { flag: "school_capital" }, text: "婉拒——在帝都，我只信自己的踢法", effects: { flags: { refusedMentor: true }, stamina: -5, attrs: { resolve: 1 } }, next: "ch1_train_02" }
    ]
  },

  // 9. 日常修炼
  {
    id: "ch1_train_02",
    chapter: 1,
    type: "train",
    text: "又是修炼的一月。天不亮起来练气，呼出的白雾散在修炼房的灵光里。日暮练球，球鞋里的袜子湿了又干，干了又湿。五行灵光在经脉里流转，你按灵根所近，将气力一丝一丝压进去。枯燥。但枯燥本身就是路。",
    next: "ch1_youth_match"
  },

  // 10. 青训队内赛（第一场比赛，用 fallback 简化）
  {
    id: "ch1_youth_match",
    chapter: 1,
    type: "match",
    text: "铁叔站在中圈，哨子叼嘴里，含糊地说了句：「今日队内赛，{position}组全员上。」你套上号衣，布料粗粝，蹭着后背的汗。看台上有人喊了声你的名字——嗓子哑，是庙祝那把破锣嗓。你胃里紧了紧。",
    opponent: { name: "青训B队", element: "水", strength: 22 },
    pool: "youth",
    fallback_choices: [
      { id: "A", text: "前场得球，抡腿就是一脚", check: { attrs: ["shooting", "burst"], difficulty: 30, tag: "射门+爆发" },
        success: { text: "脚背吃准了部位，皮球带着{elementAdj}的弧线往死角钻。进了。网窝一抖，看台上嗷地一嗓子。你大腿肌肉还在发颤。", effects: { reputation: 8, attrs: { shooting: 1 } } },
        fail: { text: "脚背蹭偏了。皮球擦着门柱飞出去，带起一阵风。你懊恼地捶了下草皮，掌心扎了根草茎。", effects: { stamina: -5 } },
        critical: { text: "【灵光一闪】世界波。球带着{elementAdj}的尾迹，像颗炮弹砸进网窝，门将连手都没抬。看台上有人站起来了。", effects: { reputation: 15, attrs: { shooting: 2 } } }
      },
      { id: "B", text: "接应队友，送一脚直塞", check: { attrs: ["passing", "vision"], difficulty: 28, tag: "传球+视野" },
        success: { text: "你余光扫到队友的跑位，脚弓一推，皮球贴着草皮从两人缝隙里穿过去。队友迎球推射，进了。他跑过来拍你后脑勺——助攻到手。", effects: { reputation: 6, assists: 1, attrs: { passing: 1 } } },
        fail: { text: "传球意图太明显，对方后腰伸脚一挡，球断了。人家直接打反击，你回追得肺都要炸了。", effects: { stamina: -4 } },
        critical: { text: "【灵光一闪】手术刀。皮球从三个人中间穿过去，线路刁钻得像量过的。队友单刀推射。看台上有人嘀咕：「这球……水银泻地。」", effects: { reputation: 12, assists: 1, attrs: { passing: 2 } } }
      },
      { id: "C", text: "回防拼抢，先稳住后场", check: { attrs: ["tackle", "strength"], difficulty: 26, tag: "铲断+对抗" },
        success: { text: "你卡住身位，肩膀顶上去，脚下一勾——干净。球断了，人没倒。对方前锋愣在原地。看台上有人鼓掌。", effects: { reputation: 5, attrs: { tackle: 1 } } },
        fail: { text: "你冲上去，人家一个变向，你刹不住，肩膀撞了个空。球丢了。你趴在地上，嘴里全是草腥味。", effects: { stamina: -6 } },
        critical: { text: "【灵光一闪】铁壁。对方前锋连变两次向，你纹丝不动，等他露出破绽，一脚铲断连球带人。他爬起来直摇头。", effects: { reputation: 10, attrs: { tackle: 2 } } }
      }
    ],
    result: {
      bigwin: { text: "终场哨响。大胜。你弯着腰喘气，汗滴在草皮上。铁叔走过来，拍了下你肩膀，不重：「有点意思。」就这四个字，但你听出来了——他满意。", effects: { reputation: 8 } },
      win:     { text: "终场哨响，小胜一球。你拿袖子抹了把脸上的汗，咸的。腿酸，但心里踏实了点。", effects: { reputation: 4 } },
      draw:    { text: "平局。不算出彩，也不丢人。你坐在场边喝水，水顺着下巴滴在号衣上。", effects: { reputation: 1 } },
      lose:    { text: "输了。你低着头走下场，耳朵里嗡嗡的。听见赵凛在笑，不大声，但就是让你听见了。", effects: { reputation: -3, stamina: -5 } }
    },
    next: "ch1_playstyle"
  },

  // 11. 选择踢法
  {
    id: "ch1_playstyle",
    chapter: 1,
    text: [
      "赛季过半。铁叔把你叫到场边，递给你半瓶水。他蹲下来，拿树枝在地上划拉：「位置定了。可同位置也有不同踢法……你想走哪条路？」",
      "踢法定了，往后球场上碰到的关键时刻就不一样。你接过水，没急着喝，想了想。"
    ],
    choices: [
      { id: "A", text: "中锋·冲击型：反越位、单刀、暴力抽射", effects: { playstyle: "impact" }, next: "ch1_conflict" },
      { id: "B", text: "中锋·支点型：背身拿球、头球轰炸", effects: { playstyle: "pivot" }, next: "ch1_conflict" },
      { id: "C", text: "边锋·突破型：过人、下底传中", effects: { playstyle: "break" }, next: "ch1_conflict" },
      { id: "D", text: "前腰·古典十号：致命一传、控制节奏", effects: { playstyle: "classic" }, next: "ch1_conflict" },
      { id: "E", text: "中后卫·上抢型：前顶拦截、回追铲球、凶狠绞杀", effects: { playstyle: "stopper" }, next: "ch1_conflict" },
      { id: "F", text: "中后卫·拖后型：站位补位、头球解围、指挥防线", effects: { playstyle: "cover" }, next: "ch1_conflict" }
    ]
  },

  // 12. 冲突事件
  {
    id: "ch1_conflict",
    chapter: 1,
    text: [
      "选拔在即。训练场上，赵凛一个肩膀把你队友撞翻在地，人仰马翻的。他没道歉，扭头看你，嘴角带着点意思。",
      "铁叔不在。四周围了一圈人，没人吭声，都等着看你怎么接。风把草皮上的土吹起来，迷了眼。"
    ],
    choices: [
      { id: "A", text: "当面理论，不怵他", check: { attrs: ["resolve", "strength"], difficulty: 30, tag: "决断+对抗" }, next: "ch1_train_05",
        success: { text: "你往前走了一步。没喊，没骂，就那么看着他。赵凛嘴角的笑收了。他又看了你两秒，哼了一声，转身走了。你队友从地上爬起来，拍了拍屁股上的土，看你的眼神不一样了。", effects: { reputation: 6, relationships: { rival: -5 }, flags: { conflictWin: true } } },
        fail: { text: "你上前理论，他伸手一推，你踉跄两步，屁股坐在地上。周围有人笑了一声。赵凛没再看你，大步走了。你坐在地上，手心撑着草皮，指甲掐进泥里。", effects: { reputation: -4, relationships: { rival: -10 }, flags: { conflictLose: true } } },
        critical: { text: "【灵光一闪】你没动。你弯腰把你队友拉起来，拍了拍他后背，然后才看向赵凛。就这一弯腰一拉，四周围的人全站你这边了。赵凛脸色变了变，没说话，走了。", effects: { reputation: 12, flags: { conflictWin: true } } }
      },
      { id: "B", text: "忍下，把劲头留到选拔赛", effects: { flags: { conflictBide: true }, attrs: { resolve: 1 } }, next: "ch1_train_05" }
    ]
  },

  // 13. 选拔前修炼
  {
    id: "ch1_train_05",
    chapter: 1,
    type: "train",
    text: "选拔赛前最后一月。你把自己关在修炼房里，灵力一丝一丝往经脉里压，压到太阳穴突突跳。窗外的蝉不知什么时候不叫了，风里有了凉意。你揉了揉酸胀的眼，继续。",
    next: "ch1_selection"
  },

  // 14. 选拔赛（使用踢法事件池）
  {
    id: "ch1_selection",
    chapter: 1,
    type: "match",
    text: "选拔赛。对手是赵凛领衔的青训A队。你看台角落里有几个人低头写着什么——球探。你认得那种姿势。你深吸一口气，草皮的青涩味灌进肺里，踏上去了。",
    opponent: { name: "青训A队·赵凛", element: "水", strength: 38 },
    fallback_choices: [
      { id: "A", text: "接直塞，单刀", check: { attrs: ["speed", "burst"], difficulty: 38, tag: "速度+爆发" },
        success: { text: "球从身后塞过来，你{elementAdj}地一趟，后卫被你甩了半个身位。风灌进耳朵，什么都听不见了。面对门将，你推了个远角。进了。大腿酸得发抖。", effects: { reputation: 10, goals: 1, attrs: { speed: 1 } } },
        fail: { text: "你趟大了。后卫回追，一脚铲过来，连球带你铲出底线。你翻了个滚，肩膀磕在边线上，疼得龇牙。", effects: { stamina: -6 } },
        critical: { text: "【灵光一闪】反越位。你启动的那一瞬，后卫线还在往前压。单刀。你甚至有时间看一眼门将的重心，然后推了个反方向。全场站起来了。", effects: { reputation: 18, goals: 1, flags: { keySuccess: true } } }
      },
      { id: "B", text: "角球前点，抢位头槌", check: { attrs: ["positioning", "heading"], difficulty: 33, tag: "站位+头球" },
        success: { text: "角球开出来，你卡住前点，脚下一蹬，整个人拔起来。额头撞上皮球的那一刻，脖子震得发麻。球砸进网窝。你落地时膝盖一软，差点跪了。", effects: { reputation: 9, goals: 1, attrs: { heading: 1 } } },
        fail: { text: "起跳早了。你跳在空气里，皮球从头顶擦过去，后点的人也没接到。你落地时脚崴了一下。", effects: { stamina: -4 } },
        critical: { text: "【灵光一闪】你卡住位置，脚下一蹬，旱地拔葱。额头正正撞上皮球，力道大得你自己都吓了一跳。门将目送。网窝抖了半天。", effects: { reputation: 16, goals: 1, flags: { keySuccess: true } } }
      },
      { id: "C", text: "回撤做墙，分边助攻", check: { attrs: ["passing", "vision"], difficulty: 35, tag: "传球+视野" },
        success: { text: "你回撤两步，背身接球，肩膀扛住后卫。余光一扫，脚弓一推——斜塞。皮球从防线缝隙里穿过去，队友迎球单刀，推射。进了。他朝你跑过来，你俩撞了个胸。", effects: { reputation: 8, assists: 1, attrs: { passing: 1 } } },
        fail: { text: "你回撤接球，转身那一下被对方后腰卡住了。球断了。你伸手想拉，拉了个空。", effects: { stamina: -5 } },
        critical: { text: "【灵光一闪】你回撤接球，没转身，脚后跟一磕——球从你两腿中间穿过去，线路刁钻得不像话。队友单刀。看台上有人站起来鼓掌。", effects: { reputation: 14, assists: 1, flags: { keySuccess: true } } }
      }
    ],
    result: {
      bigwin: { text: "终场哨响。大胜。你弯着腰，手撑膝盖，喘得说不出话。抬头看，球探们凑在一块儿嘀咕。赵凛站在中圈，脸铁青，一句话没有。你听见了什么在靠近——一线队的门。", effects: { reputation: 12, flags: { selected: true, keySuccess: true } } },
      win:     { text: "小胜一球。你拿袖子擦汗，眯着眼往看台角落瞅——球探点了点头，笔在名册上圈了个什么。你心里咯噔一下。", effects: { reputation: 6, flags: { selected: true } } },
      draw:    { text: "平局。你踢得不差，但也不够好。球探收了本子，没什么表情。你站在场上，风把汗吹凉了。", effects: { reputation: 2, flags: { selected: false } } },
      lose:    { text: "输了。赵凛终场前一脚绝杀。你站在中圈，腿软得走不动道。看台角落空了——球探走了。", effects: { reputation: -5, stamina: -8, flags: { selected: false } } }
    },
    next: "ch1_end"
  },

  // 15. 第一章结算
  {
    id: "ch1_end",
    chapter: 1,
    text: [
      "赛季落幕。输也好赢也好，这一年烙在骨头里了。你膝盖上有三块新疤，脚底的老茧厚了一层。",
      "铁叔把你叫到办公室。屋里一股子茶叶和膏药混在一起的味道。他从抽屉里抽出一张纸，搁桌上，拿指头推过来：「一线队看上你了。收拾收拾。」他顿了顿，「该去更大的场子了。」",
      "你出来的时候，外头下雪了。青云城的雪，碎碎的，落在肩上就化了。你想起蹴鞠庙那块石头——掌心贴上去，凉的。然后亮了。一切从那儿开始的。"
    ],
    system: "【第一章·觉醒 完。你的灵根已成形，接下来，是职业联赛的淬炼。】",
    effects: { chapter: 1, age: 3 },
    next: "ch2_opening"
  }

] };
