/* ============================================================
   companions.js — 开局世界生成 + 成长型传奇队友生成器（v3.0 五人制·学院·联赛）
   职责：随机生成大洲 / 学院 / 成长型队友（2-4名）/ 对手学院
   依赖：window.CONFIG（取 elementOrder / sheng）
   暴露：window.GameSetup
   说明：队友描写含「原型」字段，仅作内部参照（设计稿 13.0.4），
         玩家可见文本只显示「代号·绰号」式姓名，不出现真实球员名。
   ============================================================ */
(function (global) {
  "use strict";

  /* ---------- 大洲 + 学院名池（设计稿 9.1 / 12.1） ---------- */
  // 每个大洲：五行偏向 + 洲内国家 + 学院名意象池
  const CONTINENTS = {
    "铸铁洲": {
      element: "金",
      academy: "金阙院",
      nations: ["霜壁联邦", "钟鸣公国", "北港王国", "铁脊共和国"],
      namePool: ["铁砧社", "灰港堂", "北壁营", "锈钉院", "寒铁堂", "炉灰社", "断剑营", "铁棘院"]
    },
    "青岚洲": {
      element: "木",
      academy: "青木院",
      nations: ["竹云国", "风铃岛", "草原汗庭", "翠谷联邦"],
      namePool: ["竹溪院", "青石堂", "风铃社", "云岭营", "藤影院", "松涛堂", "新芽社", "林梢营"]
    },
    "潮音洲": {
      element: "水",
      academy: "布澜院",
      nations: ["浪鼓联邦", "铜岸共和国", "银河自由邦", "珊瑚岛链"],
      namePool: ["沙岸社", "浪声堂", "铜鼓营", "椰影院", "潮汐院", "礁石堂", "浅湾社", "海雾营"]
    },
    "烈原洲": {
      element: "火",
      academy: "赤焰院",
      nations: ["炎角部落", "红土联邦", "矿脉联盟", "焦原城邦"],
      namePool: ["红土院", "烈阳堂", "鼓声社", "矿脉营", "焦石院", "焰心堂", "灰烬社", "熔岩营"]
    },
    "磐石洲": {
      element: "土",
      academy: "厚土院",
      nations: ["铁原联邦", "冻土自治领", "钢梁城", "岩脊王国"],
      namePool: ["铁原院", "石墙堂", "冻土社", "钢梁营", "岩脊院", "厚土堂", "磐石社", "山垒营"]
    }
  };
  const CONTINENT_KEYS = Object.keys(CONTINENTS);

  /* ---------- 队友名字池（前缀 × 后缀随机组合，不用真实姓名） ---------- */
  const NAME_PREFIX = ["阿", "小", "铁", "石", "风", "雷", "云", "川", "山", "江", "野", "原", "朔", "烈", "青", "白"];
  const NAME_SUFFIX = ["野", "川", "雷", "锋", "驰", "燃", "岳", "涛", "岚", "峥", "啸", "磐", "熠", "凛", "旷", "擎"];

  /* ---------- 位置池（五人制：ST/MF/WING/DF/GK） ---------- */
  const POSITIONS = ["ST", "MF", "WING", "DF", "GK"];
  const POS_NAME = { ST: "前锋", MF: "中场", WING: "边锋", DF: "后卫", GK: "门将" };

  // 各位置可选踢法（设计稿 3.1 第三层）
  const PLAYSTYLES = {
    ST:   ["冲击型", "支点型", "伪九型"],
    MF:   ["绞杀型", "节拍器", "攻击型"],
    WING: ["突破型", "内切型"],
    DF:   ["上抢型", "拖后型", "带刀型"],
    GK:   ["门线型", "出击型"]
  };

  /* ---------- 性格互补表（设计稿 9.2：按玩家灵根选互补性格） ---------- */
  const PERSONALITY_BY_ROOT = {
    "火": ["沉默", "冷静"],
    "水": ["暴烈", "痞气"],
    "木": ["精准", "老成"],
    "金": ["话多", "热血"],
    "土": ["锋利", "天才"]
  };

  /* ---------- 灵根相生优先表（设计稿 9.2） ---------- */
  // 玩家灵根 → 队友优先灵根（相生）
  const SHENG_PREFER = {
    "火": ["木", "土"],
    "水": ["金", "木"],
    "木": ["水", "火"],
    "金": ["土", "水"],
    "土": ["火", "金"]
  };

  /* ---------- 成长型队友原型库（内部参照，按灵根分组） ----------
     每名队友的性格/技术/弱点参照真实历史球员（设计稿 13.0.4），
     但生成时只取「风格标签」，玩家看到的姓名来自名字池随机组合。 */
  const COMPANION_ARCHETYPES = {
    "金": [
      { style: "铁壁型后卫", prototype: "卡纳瓦罗", trait: "阅读比赛、弹射式铲球、暴烈", weak: "身高" },
      { style: "出球型后卫", prototype: "博努奇", trait: "长传调度、冷静、领袖", weak: "速度" }
    ],
    "木": [
      { style: "突破型边锋", prototype: "吉格斯", trait: "长途奔袭、变向、耐力", weak: "终结" },
      { style: "全能中场", prototype: "朴智星", trait: "不知疲倦、覆盖全场、谦逊", weak: "创造力" }
    ],
    "水": [
      { style: "组织型前腰", prototype: "皮尔洛", trait: "手术刀直塞、节奏大师、慵懒", weak: "对抗" },
      { style: "古典十号", prototype: "里克尔梅", trait: "致命一传、视野、固执", weak: "速度" }
    ],
    "火": [
      { style: "暴力前锋", prototype: "巴蒂斯图塔", trait: "重炮射门、霸气、忠诚", weak: "盘带" },
      { style: "猎豹前锋", prototype: "埃托奥", trait: "速度、爆发、跑位、好胜", weak: "情绪" }
    ],
    "土": [
      { style: "支点中锋", prototype: "维埃里", trait: "背身拿球、头球、对抗", weak: "机动" },
      { style: "带刀后卫", prototype: "拉莫斯", trait: "定位球、头球、好斗", weak: "纪律" }
    ]
  };

  /* ---------- 工具函数 ---------- */
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function pickIndex(arr) { return Math.floor(Math.random() * arr.length); }
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function rollName(usedNames) {
    let name, guard = 0;
    do {
      name = pick(NAME_PREFIX) + pick(NAME_SUFFIX);
      guard++;
    } while (usedNames.indexOf(name) >= 0 && guard < 50);
    usedNames.push(name);
    return name;
  }

  /* ---------- 生成大洲 + 学院（开局调用，与灵根无关） ---------- */
  function generateAcademy(st) {
    const contKey = pick(CONTINENT_KEYS);
    const cont = CONTINENTS[contKey];
    const academyName = pick(cont.namePool);
    const nation = pick(cont.nations);
    // 对手学院：同洲内另一个名字
    let rival = pick(cont.namePool);
    if (rival === academyName) rival = pick(cont.namePool.filter(n => n !== academyName));

    st.continent = contKey;
    st.continentElement = cont.element;
    st.homeAcademy = cont.academy;       // 本洲五院（终极目标）
    st.academyName = academyName;        // 玩家起始小学院
    st.nationality = nation;             // 玩家国籍（洲内随机）
    st.rivalAcademy = rival;             // 同级对手学院
    st.academyGrade = "D";               // 初始评级
    return {
      continent: contKey, element: cont.element, academy: academyName,
      nation: nation, rival: rival, homeAcademy: cont.academy
    };
  }

  /* ---------- 生成成长型队友（灵根觉醒后调用，2-4名） ---------- */
  // 规则（设计稿 9.2）：灵根互补（相生优先）/ 位置互补（与玩家不同且互不重复）/ 性格互补
  function generateCompanions(st) {
    const count = 2 + Math.floor(Math.random() * 3); // 2-4 名
    const playerRoot = st.rootType || pick(global.CONFIG.elementOrder);
    const playerPos = st.position || "ST";

    const usedNames = [];
    const usedPos = [playerPos];
    const preferRoots = SHENG_PREFER[playerRoot] || global.CONFIG.elementOrder;
    const personalities = PERSONALITY_BY_ROOT[playerRoot] || ["冷静", "热血"];

    const companions = [];
    for (let i = 0; i < count; i++) {
      // 位置：优先选未占用位置
      let posPool = POSITIONS.filter(p => usedPos.indexOf(p) < 0);
      if (!posPool.length) posPool = POSITIONS.slice();
      const pos = pick(posPool);
      usedPos.push(pos);

      // 灵根：相生优先（70%），否则随机
      let element;
      if (Math.random() < 0.7 && preferRoots.length) element = pick(preferRoots);
      else element = pick(global.CONFIG.elementOrder);

      // 原型（按灵根取一个未被用过的风格）
      const archPool = COMPANION_ARCHETYPES[element] || COMPANION_ARCHETYPES["火"];
      const arch = pick(archPool);

      const name = rollName(usedNames);
      companions.push({
        id: "companion" + (i + 1),
        name: name,
        element: element,
        position: pos,
        posName: POS_NAME[pos],
        playstyle: pick(PLAYSTYLES[pos]),
        personality: pick(personalities),
        archetype: arch.style,
        prototype: arch.prototype,   // 内部参照，不显示给玩家
        trait: arch.trait,
        weak: arch.weak,
        bond: 0,                     // 与玩家的羁绊进度
        growthTier: "前期",          // 前期/中期/后期
        // 成长倍率（隐藏天赋，设计稿 9.2：专属领域 ×1.8）
        talentMult: 1.8
      });
    }

    st.companions = companions;
    // 便捷插值字段：companion1Name / companion1Element ...
    companions.forEach((c, i) => {
      st["companion" + (i + 1) + "Name"] = c.name;
      st["companion" + (i + 1) + "Element"] = c.element;
    });
    st.companionCount = companions.length;
    return companions;
  }

  /* ---------- 一次性生成全部（startNew 时调用学院，灵根后调用队友） ---------- */
  function generateWorld(st) {
    return generateAcademy(st);
  }

  // 供 interpolate / 调试查看
  function describeCompanion(c) {
    return c.name + "（" + c.element + "灵根·" + c.posName + "·" + c.playstyle + "·" + c.personality + "）";
  }

  global.GameSetup = {
    CONTINENTS: CONTINENTS,
    CONTINENT_KEYS: CONTINENT_KEYS,
    POS_NAME: POS_NAME,
    generateAcademy: generateAcademy,
    generateCompanions: generateCompanions,
    generateWorld: generateWorld,
    describeCompanion: describeCompanion
  };
})(window);
