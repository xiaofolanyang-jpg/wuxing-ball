/* data/chapter2.js — 第二章《崭露》v3.0 剧本版
 * 主题：基础修炼，学院内选拔，第一次正式联赛。从"能踢"到"踢得好"。
 * 年龄：14-15岁 | 时间跨度：半年 | 事件数：10
 * 事件链：修炼蒙太奇 → 选拔 → 资格赛(6节点) → 连胜 → 凝形 → 学院升级 → 新设施 → 邀请 → 铁叔来信 → 挑战者联赛首战(6节点)
 */
window.CHAPTER2 = { events: [

  // ===== 事件1：三个月后（时间跳跃·修炼蒙太奇） =====
  {
    id: "ch2_opening",
    chapter: 2,
    text: [
      "三个月。",
      "二百组变成了五百组。土场上的脚印越来越深。你的脚踝不再酸了。你的停球不再弹了。你的传球开始有了方向。",
      "{companion1Name}进步更快。他的灵根亲和属性像吹气球一样涨。有时候你看着他训练，会觉得——这小子，不是普通人。",
      "李教习还是那副样子。旱烟。石头。本子。他很少夸人。偶尔说一句「还行」，就是最高评价。",
      "你的境界：感气。属性在涨。但离「凝形」还远。"
    ],
    system: "【第二章·崭露 开启。从「能踢」到「踢得好」，中间隔着五百组枯燥的重复。】",
    effects: { coreAttrs: 3 },
    next: "ch2_selection"
  },

  // ===== 事件2：学院内选拔（竞争·位置确认） =====
  {
    id: "ch2_selection",
    chapter: 2,
    text: [
      "半年了。学院要组队，参加「挑战者联赛」的资格赛。",
      "二十个人。只能上五个。",
      "李教习把名单贴在墙上。你挤过去看。",
      "你的名字在。{companion1Name}的名字也在。",
      "「首发五人和替补五人。」李教习说。「剩下的，看台。」",
      "有人骂了一声。摔了水瓶。走了。",
      "你看着名单。五个首发。你是其中之一。"
    ],
    choices: [
      { id: "A", text: "找落选的人说句话", next: "ch2_selection_a" },
      { id: "B", text: "什么都不说。去训练。", next: "ch2_selection_b" }
    ]
  },
  {
    id: "ch2_selection_a",
    chapter: 2,
    text: "你走到那个摔水瓶的人旁边。没说话。递了瓶水。他看了你一眼。接了。「踢好。」他说。声音哑的。",
    effects: { flags: { humble: true }, reputation: 1 },
    next: "ch2_qualifier"
  },
  {
    id: "ch2_selection_b",
    chapter: 2,
    text: "你转身走了。土场在等你。",
    effects: { coreAttrs: 1 },
    next: "ch2_qualifier"
  },

  // ===== 事件3：资格赛·第一场（比赛·6节点） =====
  {
    id: "ch2_qualifier",
    chapter: 2,
    type: "match",
    text: [
      "资格赛。对手：{rivalAcademy}。也是D级学院。",
      "这是你第一次踢完整的六节点比赛。",
      "开场。球在你脚下。对方五个人站在对面。没有看台。没有解说。只有风。和土腥味。",
      "你深吸一口气。动了。"
    ],
    opponent: { name: "邻院选拔队", element: null, strength: 28 },
    teamBase: 30,
    result: {
      bigwin: { text: "大胜。终场哨响的时候，对方五个人坐在地上没起来。你站在土场中央，风把汗吹凉了。李教习在场边点了下头。", effects: { reputation: 8 } },
      win:     { text: "赢了。不算轻松。你弯着腰喘气，鞋钉陷在泥里。{companion1Name}跑过来拍你后脑勺：「还行。」他学李教习。", effects: { reputation: 5 } },
      draw:    { text: "平了。不算好。但也不算坏。第一次。你们没输。", effects: { reputation: 2 } },
      lose:    { text: "输了。你坐在场边，盯着自己的鞋钉。泥巴糊了一坨。李教习走过来，旱烟味很重。「记住这滋味。」他说。", effects: { reputation: -2, demonValue: 4 } }
    },
    next: "ch2_streak"
  },

  // ===== 事件4：资格赛·连胜（蒙太奇·时间推进） =====
  {
    id: "ch2_streak",
    chapter: 2,
    text: [
      "第二场。赢了。",
      "第三场。平了。",
      "第四场。赢了。",
      "你的名气开始在D级学院之间传开。「那个{academyName}的{position}。挺猛。」",
      "{companion1Name}也在涨。他的灵根属性已经快到凝形了。比你快。",
      "李教习还是那句话：「还行。」"
    ],
    effects: { reputation: 10, coreAttrs: 2, matches: 3, wins: 2 },
    next: "ch2_realm"
  },

  // ===== 事件5：凝形（境界突破·叙事） =====
  {
    id: "ch2_realm",
    chapter: 2,
    text: [
      "那天晚上。你在土场上加练。",
      "月亮很亮。球在脚下。你突然觉得——不一样了。",
      "球好像变轻了。你的脚好像变快了。你能感觉到球滚动的方向。不用看。用脚底。用脚踝。用某种说不清的东西。",
      "你停住了。站在月光里。",
      "凝形。",
      "你的灵根，从「感气」跨入了「凝形」。你能感觉到灵力在经脉里流动了。不再是散的。是成形的。",
      "{companion1Name}不知道什么时候站在了场边。",
      "「突破了？」他问。",
      "你点头。",
      "「我上周就突破了。」他说。然后笑了。「别急。你也会到的。」"
    ],
    system: "【境界突破：感气 → 凝形。灵力成形，修炼效率提升。】",
    effects: { allAttrsFlat: 2, flags: { realmBreakthrough: "凝形" } },
    next: "ch2_upgrade"
  },

  // ===== 事件6：学院升级·D→C（养成·里程碑） =====
  {
    id: "ch2_upgrade",
    chapter: 2,
    text: [
      "赛季结束。{academyName}在D级联赛中排名第三。",
      "不够升级。但够「升级附加赛」。",
      "附加赛。一场定生死。",
      "你赢了。2-1。{companion1Name}进了一个。你助攻了一个。",
      "学院升级。D→C。",
      "李教习站在场边。旱烟灭了。他没点。他看着那块土场。看了很久。",
      "「明天。」他说。「我去申请硬地场。」",
      "这是他说过最长的一句话。"
    ],
    effects: { academyGrade: "C", reputation: 5, flags: { academyUpgrade: true }, assists: 1 },
    next: "ch2_facility"
  },

  // ===== 事件7：新设施（养成·资源提升） =====
  {
    id: "ch2_facility",
    chapter: 2,
    text: [
      "一个月后。硬地场铺好了。",
      "不是草皮。是硬地。但比土场强。球不弹了。地面平了。",
      "角落里多了一间小屋。「五行修炼室」。里面有一块灵脉碎片。很小。但够用。",
      "你第一次走进去。灵力像温水一样泡着你。舒服。你的修炼速度，快了。"
    ],
    system: "【设施升级：硬地场 + 五行修炼室解锁。修炼加成 ×1.1。】",
    effects: { flags: { fiveElementRoom: true, hardGround: true } },
    next: "ch2_invite"
  },

  // ===== 事件8：挑战者联赛·邀请（剧情转折） =====
  {
    id: "ch2_invite",
    chapter: 2,
    text: [
      "一封信。盖着「五洲球院联盟」的章。",
      "「兹邀请{academyName}参加本届挑战者联赛。赛季为期六个月。八队循环。前三名获升级附加赛资格。」",
      "{companion1Name}把信看了三遍。",
      "「挑战者联赛。」他说。声音有点抖。「那是——」",
      "「那是真正的联赛。」你说。",
      "他看着你。眼睛亮了。「走。」"
    ],
    effects: { flags: { challengerLeague: true } },
    next: "ch2_letter"
  },

  // ===== 事件9：赛前·铁叔来信（剧情·情感） =====
  {
    id: "ch2_letter",
    chapter: 2,
    text: [
      "铁叔来信了。不是电子邮件。是手写的。纸是矿上的工单纸。背面印着「安全生产第X天」。",
      "「小子。听说你要去打联赛了。好。别受伤。别跟人打架。吃饱了再踢。矿上今年又走了两个人。腰。你记得。别弯。」",
      "没有署名。你认得他的字。歪的。和门牌上的一样。",
      "你把信折好。放在枕头底下。"
    ],
    effects: { demonValue: -3, flags: { tieshuLetter: true } },
    next: "ch2_challenger"
  },

  // ===== 事件10：挑战者联赛·首战（比赛·6节点） =====
  {
    id: "ch2_challenger",
    chapter: 2,
    type: "match",
    text: [
      "挑战者联赛。第一轮。",
      "对手是C级学院。比你们高一级。",
      "更衣室。说是更衣室，其实就是一间平房。里面五条板凳。",
      "{companion1Name}坐在你旁边。他在抖。不是怕。是兴奋。",
      "「走。」他站起来。",
      "你走出去。",
      "硬地场。比土场大。有白线。有角旗。甚至——有一个看台。三排。坐了二十几个人。",
      "够了。",
      "哨响。"
    ],
    opponent: { name: "C级挑战者", element: "金", strength: 38 },
    teamBase: 30,
    result: {
      bigwin: { text: "大胜C级对手。终场哨响，看台上那二十几个人全站起来了。{companion1Name}冲过来把你扑倒。「我就说！」他吼。「我就说能赢！」", effects: { reputation: 10 } },
      win:     { text: "赢了。第一次踢C级。你们赢了。{companion1Name}坐在场边喘，笑了。「下次。」他说。「还赢。」", effects: { reputation: 6 } },
      draw:    { text: "1-1。平了。不算好。但也不算坏。第一次。C级对手。你们没输。{companion1Name}坐在场边。喘。「下次。」他说。「赢。」", effects: { reputation: 3 } },
      lose:    { text: "输了。C级就是C级。你们被压着打了大半场。{companion1Name}坐在场边，一句话不说。你坐在他旁边。也不说。风把汗吹凉了。", effects: { reputation: -2, demonValue: 4 } }
    },
    effects: { chapter: 1, matches: 1 },
    next: "ch3_opening"
  }

] };
