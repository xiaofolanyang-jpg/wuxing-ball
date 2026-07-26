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
    heaven: { name: "天品", mult: 2,   prob: 0.05 },
    dual:   { name: "双灵根", mult: 1.5, prob: 0.30 },
    triple: { name: "三灵根", mult: 1.2, prob: 0.40 },
    mixed:  { name: "杂灵根", mult: 1,   prob: 0.25 }
  },
  elementOrder: ["金", "木", "水", "火", "土"],
  elementEn: { "金": "metal", "木": "wood", "水": "water", "火": "fire", "土": "earth" },
  realm: [
    { name: "感气", min: 0,  max: 19 },
    { name: "凝形", min: 20, max: 44 },
    { name: "通脉", min: 45, max: 69 },
    { name: "化域", min: 70, max: 89 },
    { name: "天人合一", min: 90, max: 999 }
  ],
  baseTrainPoints: 3,
  baseCheckChance: 0.5,
  checkSlope: 0.01,
  critChance: 0.05,
  clampMin: 0.05,
  clampMax: 0.95,
  sheng: { "水": "木", "木": "火", "火": "土", "土": "金", "金": "水" },
  ke:   { "水": "火", "火": "金", "金": "木", "木": "土", "土": "水" },
  typeSpeed: 32,
  saveKey: "wuxing_ball_save_v1",
  // 灵根对应的演出形容词，用于比赛文本替换 {elementAdj}
  elementAdj: {
    "火": "灼热爆裂",
    "水": "柔和流转",
    "金": "刚猛铁壁",
    "木": "灵动疾风",
    "土": "沉稳如山"
  }
};
