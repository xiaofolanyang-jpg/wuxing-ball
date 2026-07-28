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
    heaven: { name: "天品", mult: 2,     prob: 0.05, nonAffinityCap: 55 },
    dual:   { name: "双灵根", mult: 1.5,   prob: 0.30, nonAffinityCap: 65 },
    triple: { name: "三灵根", mult: 1.333, prob: 0.40, nonAffinityCap: 75 },
    mixed:  { name: "杂灵根", mult: 1.2,   prob: 0.25, nonAffinityCap: 100 }
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
  // 五行共鸣（杂灵根后期核心机制：多属性达到高境界时触发检定加成）
  resonance: [
    { realmMin: 45, countMin: 8,  bonus: 0.04, label: "五行初通" },
    { realmMin: 45, countMin: 16, bonus: 0.08, label: "五行流转" },
    { realmMin: 70, countMin: 12, bonus: 0.12, label: "五行归一" },
    { realmMin: 90, countMin: 8,  bonus: 0.15, label: "天人合道" }
  ],
  baseTrainPoints: 4,
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
  rootRerollHint: "庙祝看出你的迟疑，从袖中摸出三枚古铜钱，摆在供桌上：「测灵石认主之前，灵力还能再灌两次。三枚铜钱，三次机会。按下去，石头会重新给你答案。但三次之后，灵力耗尽，结果就定死了。」他拈起酒壶，又补了一句：「想好了再按。」",
  // 灵根对应的演出形容词，用于比赛文本替换 {elementAdj}
  elementAdj: {
    "火": "灼热爆裂",
    "水": "柔和流转",
    "金": "刚猛铁壁",
    "木": "灵动疾风",
    "土": "沉稳如山"
  },
  // 羁绊系统（设计稿第五章·羁绊与技能系统）
  // threshold: 解锁所需进度值；bonus: 解锁后比赛检定成功率加成
  // bondBonusCap: 羁绊总加成上限，防止后期叠加后检定失去悬念
  bondBonusCap: 0.20,
  bonds: {
    agui: {
      name: "金兰之交", type: "队友羁绊", target: "范志贵",
      threshold: 30, bonus: 0.05,
      effect: "范志贵在场时，比赛检定+5%（发小默认在场）",
      story: "当年荒球场上一起踢破布球的发小，如今铺盖就摆在你对床。有他在身后，你什么都不怕。"
    },
    zhaolin: {
      name: "既生瑜何生亮", type: "宿敌羁绊", target: "武石",
      threshold: 30, bonus: 0.10,
      effect: "与武石交锋时，关键检定+10%",
      story: "你们是天生的对手。有他没你，有你没他。每次碰面，都逼出更强的自己。"
    },
    canglan: {
      name: "水火不容", type: "宿敌羁绊", target: "布澜门将",
      threshold: 20, bonus: 0.10,
      effect: "面对水灵根对手时，检定+10%（愤怒加成）",
      story: "又是他。上次那脚扑救，你记了整整三个月。"
    },
    linxiao: {
      name: "风火连城", type: "队友羁绊", target: "内牛尔·边锋",
      threshold: 30, bonus: 0.08,
      effect: "与内牛尔同场时，比赛检定+8%",
      story: "他孤傲，但他的脚不会说谎。两道残影掠过中场，对方后卫只看到背影。"
    },
    suwan: {
      name: "心有灵犀", type: "队友羁绊", target: "苏雯·前腰",
      threshold: 30, bonus: 0.08,
      effect: "苏雯在场时，比赛检定+8%",
      story: "她不用看就知道你在哪。球到人到。"
    }
  },
  // 灵石商店（设计稿第七章·资源系统：灵石购买丹药/功法）
  shopItems: [
    { id: "pill_qi", name: "聚气丹", cost: 20, desc: "恢复体力30点", type: "丹药" },
    { id: "pill_body", name: "淬体散", cost: 30, desc: "随机一项亲和属性+2", type: "丹药" },
    { id: "manual_ball", name: "球经残篇", cost: 50, desc: "本回合修炼点+1", type: "功法" }
  ]
};
