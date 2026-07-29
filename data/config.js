/* 全局配置：倍率、境界阈值、概率、五行映射。集中管理数值，调平衡只改此处。 */
window.CONFIG = {
  attrs: {
    "金": ["tackle", "intercept", "strength", "hardness"],
    "木": ["dribble", "speed", "stamina", "agility"],
    "水": ["passing", "vision", "iq", "rhythm"],
    "火": ["shooting", "burst", "power", "resolve"],
    "土": ["positioning", "heading", "balance", "pressure"]
  },
  attrNames: {
    "tackle": "铲断", "intercept": "拦截", "strength": "对抗", "hardness": "硬度",
    "dribble": "盘带", "speed": "速度", "stamina": "耐力", "agility": "柔韧",
    "passing": "传球", "vision": "视野", "iq": "球商", "rhythm": "节奏",
    "shooting": "射门", "burst": "爆发", "power": "力量", "resolve": "决断",
    "positioning": "站位", "heading": "头球", "balance": "平衡", "pressure": "抗压"
  },
  elements: {
    "金": { name: "金", skill: "金戈铁马", desc: "铁壁封堵、凶狠滑铲" },
    "木": { name: "木", skill: "枯木逢春", desc: "变向过人、长途奔袭" },
    "水": { name: "水", skill: "上善若水", desc: "手术刀直塞、四两拨千斤" },
    "火": { name: "火", skill: "燎原烈火", desc: "世界波、暴力抽射" },
    "土": { name: "土", skill: "不动如山", desc: "抢点嗅觉、定位球轰炸" }
  },
  quality: {
    heaven: { name: "天品", mult: 2.5,   prob: 0.15, nonAffinityCap: 55 },
    dual:   { name: "双灵根", mult: 2,     prob: 0.80, nonAffinityCap: 65 },
    full:   { name: "全灵根", mult: 1.5,   prob: 0.05, nonAffinityCap: 100 }
  },
  // 非亲和属性加点倍率（灵根是“顺风”而非“锁死”）
  nonAffinityMult: 0.8,
  // 属性全局上限（灵根锁：非亲和属性受 quality.nonAffinityCap 约束）
  attrMax: 100,
  elementOrder: ["金", "木", "水", "火", "土"],
  elementEn: { "金": "metal", "木": "wood", "水": "water", "火": "fire", "土": "earth" },
  realm: [
    { name: "感气", min: 0,  max: 19 },
    { name: "凝形", min: 20, max: 44 },
    { name: "通脉", min: 45, max: 69 },
    { name: "化域", min: 70, max: 89 },
    { name: "天人合一", min: 90, max: 100 }
  ],
  // 五行共鸣（全灵根后期核心机制：多属性达到高境界时触发检定加成）
  resonance: [
    { realmMin: 45, countMin: 8,  bonus: 0.04, label: "五行初通" },
    { realmMin: 45, countMin: 16, bonus: 0.08, label: "五行流转" },
    { realmMin: 70, countMin: 12, bonus: 0.12, label: "五行归一" },
    { realmMin: 90, countMin: 8,  bonus: 0.15, label: "天人合道" }
  ],
  baseTrainPoints: 5,
  baseCheckChance: 0.55,
  checkSlope: 0.015,
  // 暴击概率 = critBase + 成功率 × critScale（成长越高暴击越多）
  critBase: 0.02,
  critScale: 0.06,
  clampMin: 0.08,
  clampMax: 0.95,
  // 心魔值系统（梯度惩罚 + 坏结局触发）
  demonBadEndThreshold: 60,   // 心魔值≥此值触发坏结局
  demonDecayPerRound: 1,      // 每回合自然衰减
  demonOnD: 12,               // D评级增量
  demonOnLose: 4,             // 输球增量
  demonOnDraw: 2,             // 平局增量
  demonOnKeyFail: 2,          // 关键时刻失败增量
  demonThresholds: [
    { min: 45, penalty: 0.10, label: "心魔噬心" },
    { min: 30, penalty: 0.06, label: "心魔侵蚀" },
    { min: 15, penalty: 0.03, label: "心魔低语" }
  ],
  // 体力约束系统（梯度惩罚 + 强制休息）
  staminaRegenPerRound: 10,   // 每回合自动恢复
  staminaCollapseThreshold: 10, // 低于此值强制休息
  staminaCollapseRecover: 40,   // 强制休息后恢复到此值
  staminaThresholds: [
    { max: 10, penalty: 0.12, label: "强弩之末" },
    { max: 30, penalty: 0.07, label: "体力告急" },
    { max: 50, penalty: 0.03, label: "略显疲态" }
  ],
  sheng: { "水": "木", "木": "火", "火": "土", "土": "金", "金": "水" },
  ke:   { "水": "火", "火": "金", "金": "木", "木": "土", "土": "水" },
  typeSpeed: 32,
  saveKey: "wuxing_ball_save_v1",
  // 灵根重选机制（设计稿 3.2）：觉醒后可重新觉醒，共 3 次机会（含首次）
  maxRerolls: 3,
  rootRerollHint: "白袍人走过来，手里端着茶碗。他看了你一眼：「不满意？」他从袖子里摸出三枚铜钱，摆在凳面上。「测灵石认主之前，灵力还能再灌两次。三枚铜钱，三次机会。按下去，石头会重新给你答案。但三次之后，灵力耗尽，结果就定死了。」他拈起茶碗喝了一口：「想好了再按。」",
  // 灵根对应的演出形容词，用于比赛文本替换 {elementAdj}
  elementAdj: {
    "火": "灼热爆裂",
    "水": "柔和流转",
    "金": "刚猛铁壁",
    "木": "灵动疾风",
    "土": "沉稳如山"
  },
  // 灵根对应的测灵石发光颜色，用于剧本插值 {elementColor}
  elementColor: {
    "金": "刺目金白",
    "木": "翠绿",
    "水": "幽蓝",
    "火": "赤红",
    "土": "赭黄"
  },
  // 羁绊系统（设计稿第五章·羁绊与技能系统）
  // threshold: 解锁所需进度值；bonus: 解锁后比赛检定成功率加成
  // bondBonusCap: 羁绊总加成上限，防止后期叠加后检定失去悬念
  bondBonusCap: 0.20,
  bonds: {
    tongpao: {
      name: "同袍", type: "队友羁绊", target: "成长型队友",
      threshold: 30, bonus: 0.05,
      effect: "与队友同场≥3场后解锁，同场比赛检定+5%",
      story: "一起从土场踢出来的兄弟。一个眼神，他就知道你要往哪跑。"
    },
    moqi: {
      name: "默契", type: "队友羁绊", target: "成长型队友",
      threshold: 80, bonus: 0.08,
      effect: "同场≥8场且多次配合后解锁，检定+8%、暴击+5%",
      story: "你们的跑位像一个人。球到人到，不用回头。"
    },
    jinlan: {
      name: "金兰", type: "队友羁绊", target: "成长型队友",
      threshold: 150, bonus: 0.12,
      effect: "同场≥15场并经历剧情考验后解锁，检定+12%",
      story: "生死之交。他在身后，你就敢把后背交出去。"
    },
    sudi: {
      name: "宿敌", type: "宿敌羁绊", target: "宿敌球员",
      threshold: 30, bonus: 0.10,
      effect: "与同一对手交锋≥3场且互有胜负后解锁，关键检定+10%",
      story: "天生的对手。有他没你，有你没他。每次碰面都逼出更强的自己。"
    },
    chuanqi: {
      name: "传奇之交", type: "传奇羁绊", target: "传奇球员",
      threshold: 50, bonus: 0.08,
      effect: "多次交锋并获传奇认可后解锁，面对强敌检定+8%",
      story: "他曾是你仰望的人。如今他记住了你的名字。"
    },
    chuancheng: {
      name: "传承", type: "传奇羁绊", target: "传奇球员",
      threshold: 40, bonus: 0.06,
      effect: "触发老传奇带新传奇的传承对话后解锁，境界成长+20%、检定+6%",
      story: "他把衣钵递给了你。下一代传奇，从你开始。"
    },
    shuangzi: {
      name: "双子星", type: "隐藏羁绊", target: "成长型队友",
      threshold: 100, bonus: 0.10, hidden: true,
      effect: "与成长型队友同时入选五行大会最佳阵容后解锁，全属性检定+10%（永久）",
      story: "两颗星，同一片天。你们的名字，注定要一起被提起。"
    }
  },
  // 灵石商店（设计稿第七章·资源系统：灵石购买丹药/功法）
  shopItems: [
    { id: "pill_qi", name: "聚气丹", cost: 20, desc: "恢复体力30点", type: "丹药" },
    { id: "pill_body", name: "淬体散", cost: 30, desc: "随机一项亲和属性+2", type: "丹药" },
    { id: "manual_ball", name: "球经残篇", cost: 50, desc: "本回合修炼点+1", type: "功法" }
  ],

  /* ===== 传奇球员系统（球队群像设计稿） ===== */
  // 键名用拼音缩写，attrs 按五行分组：金[tackle,intercept,strength,hardness] 木[dribble,speed,stamina,agility]
  // 水[passing,vision,iq,rhythm] 火[shooting,burst,power,resolve] 土[positioning,heading,balance,pressure]
  legends: {
    // —— 金阙FC（金）——
    maerdi: { name:"马尔蒂尼·铁壁", team:"jinqve", pos:"CB", root:"金", quality:"heaven",
      attrs:{tackle:95,intercept:97,strength:88,hardness:92,dribble:62,speed:78,stamina:80,agility:75,passing:76,vision:74,iq:85,rhythm:70,shooting:38,burst:55,power:72,resolve:88,positioning:93,heading:82,balance:90,pressure:95} },
    balei: { name:"巴雷西·锁链", team:"jinqve", pos:"SW", root:"金", quality:"dual",
      attrs:{tackle:90,intercept:94,strength:86,hardness:88,dribble:58,speed:70,stamina:78,agility:68,passing:82,vision:85,iq:90,rhythm:80,shooting:35,burst:50,power:74,resolve:85,positioning:96,heading:84,balance:92,pressure:94} },
    guli: { name:"古利特·全能", team:"jinqve", pos:"MF", root:"金", quality:"dual", prob:true,
      attrs:{tackle:82,intercept:80,strength:93,hardness:88,dribble:86,speed:84,stamina:85,agility:80,passing:85,vision:82,iq:84,rhythm:82,shooting:90,burst:88,power:94,resolve:87,positioning:84,heading:92,balance:88,pressure:86} },
    // —— 青木联（木）——
    zhongtian: { name:"中田·枯荣", team:"qingmu", pos:"CAM", root:"木", quality:"heaven",
      attrs:{tackle:45,intercept:50,strength:58,hardness:52,dribble:88,speed:80,stamina:86,agility:84,passing:96,vision:95,iq:94,rhythm:92,shooting:82,burst:75,power:60,resolve:80,positioning:72,heading:55,balance:74,pressure:78} },
    puzhi: { name:"朴智星·永动", team:"qingmu", pos:"LM", root:"木", quality:"dual",
      attrs:{tackle:72,intercept:74,strength:70,hardness:68,dribble:80,speed:86,stamina:97,agility:82,passing:82,vision:78,iq:80,rhythm:78,shooting:70,burst:76,power:68,resolve:74,positioning:75,heading:65,balance:76,pressure:82} },
    bentian: { name:"本田·鬼才", team:"qingmu", pos:"CAM", root:"木", quality:"dual", prob:true,
      attrs:{tackle:40,intercept:42,strength:60,hardness:55,dribble:85,speed:76,stamina:78,agility:80,passing:88,vision:86,iq:88,rhythm:84,shooting:92,burst:82,power:78,resolve:86,positioning:70,heading:62,balance:72,pressure:80} },
    // —— 布澜竞技（水）——
    canglan: { name:"布澜门将·深海", team:"bulan", pos:"GK", root:"水", quality:"heaven",
      attrs:{tackle:30,intercept:55,strength:75,hardness:70,dribble:45,speed:60,stamina:72,agility:80,passing:72,vision:88,iq:92,rhythm:85,shooting:20,burst:70,power:72,resolve:90,positioning:95,heading:65,balance:94,pressure:97} },
    jialin: { name:"加林查·醉蝶", team:"bulan", pos:"RW", root:"水", quality:"dual",
      attrs:{tackle:25,intercept:30,strength:50,hardness:42,dribble:97,speed:93,stamina:75,agility:95,passing:84,vision:80,iq:76,rhythm:90,shooting:78,burst:88,power:55,resolve:72,positioning:55,heading:40,balance:82,pressure:68} },
    suge: { name:"苏格拉底·哲人", team:"bulan", pos:"CM", root:"水", quality:"heaven", prob:true,
      attrs:{tackle:38,intercept:42,strength:62,hardness:55,dribble:82,speed:72,stamina:74,agility:78,passing:94,vision:92,iq:95,rhythm:90,shooting:85,burst:70,power:65,resolve:82,positioning:70,heading:72,balance:75,pressure:78} },
    // —— 赤焰皇家（火）——
    deluo: { name:"德罗巴·焚天", team:"chiyan", pos:"ST", root:"火", quality:"heaven",
      attrs:{tackle:45,intercept:48,strength:96,hardness:90,dribble:78,speed:82,stamina:84,agility:72,passing:70,vision:68,iq:72,rhythm:70,shooting:95,burst:93,power:97,resolve:92,positioning:88,heading:94,balance:90,pressure:92} },
    aituo: { name:"埃托奥·猎豹", team:"chiyan", pos:"LW", root:"火", quality:"dual",
      attrs:{tackle:35,intercept:38,strength:72,hardness:65,dribble:88,speed:95,stamina:85,agility:88,passing:72,vision:70,iq:76,rhythm:80,shooting:92,burst:94,power:78,resolve:90,positioning:86,heading:68,balance:80,pressure:82} },
    aokq: { name:"奥科查·魔术师", team:"chiyan", pos:"CAM", root:"火", quality:"dual", prob:true,
      attrs:{tackle:28,intercept:30,strength:52,hardness:45,dribble:96,speed:90,stamina:72,agility:94,passing:80,vision:78,iq:80,rhythm:88,shooting:84,burst:90,power:58,resolve:78,positioning:58,heading:42,balance:85,pressure:72} },
    // —— 厚土城（土）——
    bati: { name:"巴蒂斯图塔·裂地", team:"houtu", pos:"ST", root:"土", quality:"dual",
      attrs:{tackle:35,intercept:38,strength:92,hardness:88,dribble:72,speed:80,stamina:78,agility:70,passing:65,vision:62,iq:68,rhythm:65,shooting:97,burst:92,power:96,resolve:94,positioning:90,heading:92,balance:93,pressure:90} },
    mate: { name:"马特乌斯·铁锤", team:"houtu", pos:"CDM", root:"土", quality:"dual",
      attrs:{tackle:86,intercept:88,strength:90,hardness:92,dribble:78,speed:78,stamina:88,agility:75,passing:90,vision:86,iq:88,rhythm:84,shooting:88,burst:82,power:88,resolve:90,positioning:88,heading:82,balance:90,pressure:92} },
    kelin: { name:"克林斯曼·金色", team:"houtu", pos:"ST", root:"土", quality:"dual", prob:true,
      attrs:{tackle:32,intercept:35,strength:82,hardness:78,dribble:75,speed:85,stamina:80,agility:76,passing:70,vision:68,iq:74,rhythm:72,shooting:92,burst:88,power:85,resolve:88,positioning:90,heading:93,balance:86,pressure:85} },
    // —— 世青赛对手（ch12-15）——
    lagn: { name:"拉格纳·铁潮", team:"nordic", pos:"CB", root:"金", quality:"heaven",
      attrs:{tackle:92,intercept:94,strength:88,hardness:85,dribble:55,speed:72,stamina:78,agility:65,passing:70,vision:68,iq:82,rhythm:66,shooting:35,burst:50,power:75,resolve:84,positioning:93,heading:80,balance:86,pressure:88} },
    luona: { name:"罗纳尔迪尼奥·笑蝶", team:"samba", pos:"CAM", root:"水", quality:"heaven",
      attrs:{tackle:30,intercept:35,strength:55,hardness:48,dribble:97,speed:88,stamina:72,agility:95,passing:90,vision:88,iq:85,rhythm:93,shooting:85,burst:86,power:60,resolve:78,positioning:60,heading:45,balance:82,pressure:72} },
    weiya: { name:"维阿·黑风", team:"africa", pos:"ST", root:"火", quality:"dual",
      attrs:{tackle:32,intercept:35,strength:78,hardness:70,dribble:88,speed:96,stamina:88,agility:85,passing:70,vision:68,iq:72,rhythm:76,shooting:90,burst:94,power:82,resolve:86,positioning:82,heading:70,balance:78,pressure:80} },
    beike: { name:"贝肯鲍尔·皇帝", team:"german", pos:"SW", root:"金", quality:"dual",
      attrs:{tackle:88,intercept:92,strength:85,hardness:86,dribble:78,speed:78,stamina:84,agility:76,passing:92,vision:90,iq:94,rhythm:82,shooting:82,burst:72,power:78,resolve:90,positioning:90,heading:78,balance:86,pressure:90} },
    qida: { name:"齐达内·天舞", team:"gaolu", pos:"CAM", root:"水", quality:"heaven",
      attrs:{tackle:42,intercept:48,strength:68,hardness:62,dribble:96,speed:82,stamina:80,agility:90,passing:95,vision:94,iq:96,rhythm:92,shooting:88,burst:78,power:72,resolve:92,positioning:78,heading:68,balance:90,pressure:88} },
    hengli: { name:"亨利·疾风", team:"gaolu", pos:"ST", root:"火", quality:"dual",
      attrs:{tackle:30,intercept:35,strength:72,hardness:65,dribble:90,speed:95,stamina:82,agility:88,passing:78,vision:76,iq:80,rhythm:82,shooting:92,burst:90,power:78,resolve:88,positioning:86,heading:72,balance:82,pressure:82} }
  },

  // 概率传奇触发规则（第60分钟后每回合检测）
  legendSpawn: {
    baseMinute: 60,
    baseProb: 0.20,
    modifiers: {
      "jinqve_guli":    { condKey: "reputation", condMin: 60, condKey2: "consecutiveFails", condMin2: 2, bonus: 0.10 },
      "qingmu_bentian": { condKey: "hasFreeKick", condVal: true, condKey2: "rootNotWood", condVal2: true, bonus: 0.05 },
      "bulan_suge":     { condKey: "extraTime", condVal: true, bonus: 0.10 },
      "chiyan_aokq":    { condKey: "consecutiveFails", condMin: 2, bonus: 0.05 },
      "houtu_kelin":    { condKey: "setPieceCount", condMin: 3, bonus: 0.10 }
    },
    effects: { strengthBonus: 8, keyDiffBonus: 5, flag: "legendAwakened" }
  },

  legendEncounter: {
    jinqve: "通道里。你看到了他。马尔蒂尼·铁壁。他靠在墙上，闭着眼。像睡着了。但你经过的时候，他睁开了。看了你一眼。然后闭上了。那一眼很轻。但你记住了。",
    bulan: "通道里。布澜门将·深海朝你挥手：「朋友！又见面了！」他笑得很开心。像老朋友重逢。你知道他等会儿会扑你所有的射门。但他现在真的很开心。",
    gaolu: "通道尽头。齐达内·天舞站在那里。他没有看你。他在看天。通道上方有一小片天空。他看了很久。然后他低下头，朝你笑了一下。很轻。像老师看学生。"
  },
  legendRespect: {
    maerdi: "终场。马尔蒂尼·铁壁走过来。他伸出手。你握住了。他的手很干，很热。「你让我动了。」他说。「很久没有人让我动了。」然后他走了。",
    deluo: "德罗巴·焚天朝你走过来。你以为他要说什么。他只是拍了拍你的肩。力气很大。你差点跪下去。然后他走了。没说话。但够了。",
    qida: "齐达内·天舞走过来。他朝你点了点头。「你还差一步。」他说。然后他想了想，补了一句：「但那一步，是最难的。」他走了。你站在原地。风很大。"
  },

  /* ===== 比赛风格系统（比赛内容大纲） ===== */
  styleEvents: {
    triggerNodes: [2, 4],
    triggerProb: 0.30,
    scoreModifier: { lead2: 0.20, trail2: 0.20, close: 0.15 },
    timeModifier: { last5: 0.25 }
  },

  // 关键时刻三选一框架（吞噬/共鸣/享受）
  keyMomentTypes: {
    devour:    { label: "吞噬", diffBase: 40, failDemon: 10, critRep: 25 },
    resonance: { label: "共鸣", diffBase: 32, failDemon: 0, bondGain: 5 },
    enjoy:     { label: "享受", diffBase: 28, failDemon: -3, critBonus: 10 }
  },

  // 五行相克难度修正（比赛中应用）：克方检定难度降低，被克方检定难度升高
  elementClash: {
    "金克木": { keMod: -4, beiMod: 4 },
    "木克土": { keMod: -4, beiMod: 4 },
    "土克水": { keMod: -4, beiMod: 4 },
    "水克火": { keMod: -4, beiMod: 4 },
    "火克金": { keMod: -4, beiMod: 4 }
  },

  // 比分动态叙事（引擎按当前比分状态调用）
  scoreNarrative: {
    lead2: "你领先了。但他们没有慌。这才是最可怕的。",
    lead1: "一球。只有一球。什么都可能发生。",
    draw: "谁先动？谁先犯错？",
    trail1: "你追了。你一直在追。但差一步。总是差一步。",
    trail2: "你输了。你知道你输了。但你的腿还在动。为什么？",
    last5: "五分钟。三百秒。你还有三百秒。"
  },

  /* ===== 淬炼营系统（淬炼营比赛大纲） ===== */
  campConfig: {
    totalPlayers: 100,
    eliminateLine: 50,
    phase1Weeks: 4,
    matchesPerPlayer: 6,
    safeWins: 4,
    teamSize: 5,
    teamCount: 10,
    leagueRounds: 9,
    rankingWeights: { record: 0.4, coach: 0.3, balance: 0.2, awakening: 0.1 },
    rankTiers: [
      { max: 10, color: "金" }, { max: 30, color: "银" },
      { max: 60, color: "铜" }, { max: 100, color: "灰" }
    ]
  },

  campObservation: {
    favorThreshold: 85,
    favorProb: 0.40,
    masterFavorRank: 10,
    masterFavorProb: 0.20
  },

  // 被动技能定义（教练开小灶解锁）
  passiveSkills: {
    tiebi:    { name: "铁壁意识", desc: "防守检定暴击率+5%", critBonus: 0.05, checkType: "defense" },
    yongdong: { name: "永动", desc: "下半场检定难度-2", diffMod: -2, condition: "secondHalf" },
    shuigan:  { name: "水感", desc: "盘带检定暴击率+8%", critBonus: 0.08, checkType: "dribble" },
    fentian:  { name: "焚天", desc: "射门检定暴击伤害+3", critDmgBonus: 3, checkType: "shooting" },
    shanyue:  { name: "山岳", desc: "对抗检定失败时50%不丢球", retainProb: 0.5, checkType: "strength" }
  }
};
