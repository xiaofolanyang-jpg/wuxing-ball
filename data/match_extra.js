/* data/match_extra.js — 比赛扩展池（v3.0）
 * window.MATCH_EXTRA.teammate — 队友演出池（每场随机抽2个，纯演出+auto效果）
 * window.MATCH_EXTRA.key — 关键时刻池（每场抽2个，按局面leading/level/trailing呈现）
 *
 * teammate 字段：
 *   who   — 可选，限定角色（"agui"默认在场；"laozhou"/"linxiao"/"suwan"需旗标）；无who=通用
 *   text  — 叙事文本（支持插值）
 *   auto  — { threat, oppThreat, difficultyMod, stamina }
 *   result — 系统提示文本
 *
 * key 字段：
 *   每个key ID下按局面分：leading / level / trailing（或 level 做兜底）
 *   每个局面：{ text, choices: [{id, text, check:{attrs,difficulty,tag}, success/fail/critical:{text,effects}}] }
 */
window.MATCH_EXTRA = {

/* ============================================================
   队友演出池（20条）
   ============================================================ */
teammate: [

  // --- 通用·正面（threat+） ---
  { text: "边路起球，弧线精准。你后点的队友高高跃起——头槌！砸在横梁上弹出来。",
    auto: { threat: 1 }, result: "【队友威胁+1】差一点就进了。" },

  { text: "后腰断球，抬头，一脚长传撕开整条防线。你的队友反越位成功——单刀！",
    auto: { threat: 2 }, result: "【队友威胁+2】漂亮的反击！" },

  { text: "角球。你队友抢前点，蹭了一下。球变向——门将扑了个空。进了！",
    auto: { threat: 3 }, result: "【队友进球！威胁+3】" },

  { text: "你的队友在中场连过两人，分球，肋部，直塞。穿透了。",
    auto: { threat: 1, difficultyMod: -3 }, result: "【队友威胁+1，下一检定难度-3】他帮你拉开了空间。" },

  { text: "队友在禁区前沿拿球，假射，晃开了，横传。空门。另一个队友推了，进了。",
    auto: { threat: 3 }, result: "【队友进球！威胁+3】团队配合。" },

  // --- 通用·负面（oppThreat+） ---
  { text: "后防失误，你的队友回传太轻。对方前锋断了——单刀！射了——进了。",
    auto: { oppThreat: 3 }, result: "【对手进球！对手威胁+3】" },

  { text: "你的队友被过了，干干净净。对方起脚，远射，砸在立柱上，弹出来了。好险。",
    auto: { oppThreat: 1 }, result: "【对手威胁+1】差点丢球。" },

  { text: "中场丢球，对方反击，三打二。你的队友回追——没追上。传中，头球，偏了。",
    auto: { oppThreat: 2 }, result: "【对手威胁+2】防线被打穿了。" },

  { text: "你的队友犯规了，禁区前沿，任意球。对方主罚——人墙弹了。角球。",
    auto: { oppThreat: 1, difficultyMod: 2 }, result: "【对手威胁+1，下一检定难度+2】位置很危险。" },

  // --- 通用·中性（节奏/恢复） ---
  { text: "你的队友拿球，不急。横传，回传，控制，再控制。全场在嘘，他不在乎。",
    auto: { stamina: 5 }, result: "【体力+5】节奏稳住了。" },

  { text: "队友冲你喊：「跑！我给你传！」你跑了，他传了，球到人到。",
    auto: { threat: 1 }, result: "【队友威胁+1】默契。" },

  { text: "你的队友被铲了。他站起来，拍了拍土，冲你笑了一下。「没事。」",
    auto: { difficultyMod: -2 }, result: "【下一检定难度-2】他的拼劲感染了你。" },

  { text: "对方全力压上，你的队友在后场死守。铲，挡，堵，解围，再解围。",
    auto: { oppThreat: -1 }, result: "【对手威胁-1】防线扛住了。" },

  // --- 角色专属·agui（成长型队友，默认在场） ---
  { who: "agui", text: "{companion1Name}拿球，他看了你一眼，你懂了。你跑，他传，球从人缝里穿过来。",
    auto: { threat: 2, difficultyMod: -3 }, result: "【{companion1Name}配合！威胁+2，难度-3】" },

  { who: "agui", text: "{companion1Name}在你身后。你丢球了，他补了，断回来了。「别慌。」他说。",
    auto: { oppThreat: -1, stamina: 3 }, result: "【{companion1Name}补位！对手威胁-1，体力+3】" },

  { who: "agui", text: "{companion1Name}在边路。他冲了，过了一个，过了两个。传中！球到了你面前。",
    auto: { threat: 2 }, result: "【{companion1Name}突破传中！威胁+2】" },

  // --- 角色专属·laozhou ---
  { who: "laozhou", text: "老周在中场。他不动，等，等对方露出破绽。然后——一脚，五十米长传。精准。",
    auto: { threat: 2, difficultyMod: -2 }, result: "【老周长传！威胁+2，难度-2】" },

  { who: "laozhou", text: "老周飞铲，球断了，对方倒了，裁判没吹。老周站起来，冲你吼：「快跑！」",
    auto: { oppThreat: -1, threat: 1 }, result: "【老周断球！对手威胁-1，我方威胁+1】" },

  // --- 角色专属·linxiao ---
  { who: "linxiao", text: "林晓在禁区前沿。她不动，等。然后——一脚直塞，手术刀。防线碎了。",
    auto: { threat: 2, difficultyMod: -4 }, result: "【林晓直塞！威胁+2，难度-4】水灵根的视野。" },

  // --- 角色专属·suwan ---
  { who: "suwan", text: "苏雯拿球，她看了全场，三秒。然后一脚转移，六十米，精准到厘米。",
    auto: { threat: 1, stamina: 3 }, result: "【苏雯转移！威胁+1，体力+3】节奏大师。" }

],

/* ============================================================
   关键时刻池（10个，每个按 leading/level/trailing 三局面）
   选择三选一：吞噬(高难高回报) / 共鸣(中难·羁绊) / 享受(低难·稳定)
   ============================================================ */
key: {

  // 1. 单刀
  key_breakaway: {
    leading: {
      text: "反击。你面前只有门将。领先，不急。",
      choices: [
        { id: "A", text: "推射远角。稳。", check: { attrs: ["resolve"], difficulty: 26, tag: "单刀" },
          success: { text: "进了。你推了远角，门将扑了方向。", effects: { goals: 1, reputation: 5 } },
          fail: { text: "偏了。擦着立柱。你领先，没关系。", effects: {} } },
        { id: "B", text: "过门将。", check: { attrs: ["dribble", "speed"], difficulty: 34, tag: "单刀" },
          success: { text: "你晃了，门将倒了。空门，推了。", effects: { goals: 1, reputation: 8 } },
          fail: { text: "门将没吃晃，他抱住了。", effects: { stamina: -3 } } },
        { id: "C", text: "分给队友。", check: { attrs: ["passing", "vision"], difficulty: 22, tag: "单刀" },
          success: { text: "你传了，队友推了空门。助攻。", effects: { assists: 1, reputation: 5 } },
          fail: { text: "传球被断了。可惜。", effects: {} } }
      ]
    },
    level: {
      text: "反击，单刀。你面前只有门将。平局。这一脚，可能决定一切。",
      choices: [
        { id: "A", text: "爆射。力量。", check: { attrs: ["shooting", "power"], difficulty: 38, tag: "单刀" },
          success: { text: "你抽了，球带着风声，砸入网窝。门将没反应过来。", effects: { goals: 1, reputation: 10 } },
          critical: { text: "【灵光一闪】你抽了，球带着火焰的弧线。死角。世界安静了。", effects: { goals: 1, reputation: 15 } },
          fail: { text: "高了，飞了。你跪在地上。", effects: { demonValue: 3 } } },
        { id: "B", text: "推射。冷静。", check: { attrs: ["resolve", "shooting"], difficulty: 32, tag: "单刀" },
          success: { text: "你推了，远角，进了。你握拳。", effects: { goals: 1, reputation: 8 } },
          fail: { text: "门将扑了，他猜对了方向。", effects: { demonValue: 2 } } },
        { id: "C", text: "享受这一刻。", check: { attrs: ["resolve"], difficulty: 26, tag: "单刀" },
          success: { text: "你笑了，你不在乎。你推了，进了。你笑了。", effects: { goals: 1, reputation: 8, demonValue: -3 } },
          fail: { text: "你享受了，但球偏了。你笑了。没关系。", effects: { demonValue: -2 } } }
      ]
    },
    trailing: {
      text: "反击，单刀。你面前只有门将。落后。你必须进。",
      choices: [
        { id: "A", text: "全力。爆射。赌了。", check: { attrs: ["shooting", "power", "resolve"], difficulty: 42, tag: "单刀" },
          success: { text: "你抽了，球像炮弹。门将碰了，没挡住。进了！", effects: { goals: 1, reputation: 12 } },
          critical: { text: "【灵光一闪】你抽了，球带着你的全部。网窝碎了。你吼了。", effects: { goals: 1, reputation: 18 } },
          fail: { text: "门将扑了，他用了脸。球弹了。你完了。", effects: { demonValue: 5, stamina: -5 } } },
        { id: "B", text: "冷静。推射。", check: { attrs: ["resolve", "shooting"], difficulty: 36, tag: "单刀" },
          success: { text: "你深吸一口气，推了，远角，进了。你还有希望。", effects: { goals: 1, reputation: 10 } },
          fail: { text: "你推了，门将扑了。你跪了。", effects: { demonValue: 4 } } },
        { id: "C", text: "传给队友。一起。", check: { attrs: ["passing", "vision"], difficulty: 30, tag: "单刀" },
          success: { text: "你没贪，你传了，队友射了，进了。你们抱在一起。", effects: { assists: 1, reputation: 10 } },
          fail: { text: "传球被断了，队友没跑到。", effects: { demonValue: 3 } } }
      ]
    }
  },

  // 2. 远射
  key_longshot: {
    leading: {
      text: "三十米。你拿球，空间很大。领先。试试？",
      choices: [
        { id: "A", text: "远射。试试脚感。", check: { attrs: ["shooting", "power"], difficulty: 30, tag: "远射" },
          success: { text: "你射了，弧线，进了。锦上添花。", effects: { goals: 1, reputation: 8 } },
          fail: { text: "高了。没关系，你领先。", effects: {} } },
        { id: "B", text: "带球推进。", check: { attrs: ["dribble", "speed"], difficulty: 28, tag: "远射" },
          success: { text: "你带了，冲了，射了，进了。", effects: { goals: 1, reputation: 6 } },
          fail: { text: "被断了。但没关系。", effects: {} } },
        { id: "C", text: "控制节奏。", check: { attrs: ["passing", "resolve"], difficulty: 22, tag: "远射" },
          success: { text: "你传了，控制了。时间在你这边。", effects: { stamina: 5 } },
          fail: { text: "传球失误。但无伤大雅。", effects: {} } }
      ]
    },
    level: {
      text: "三十米。你拿球。平局。空间。一脚？",
      choices: [
        { id: "A", text: "远射。世界波。", check: { attrs: ["shooting", "power"], difficulty: 40, tag: "远射" },
          success: { text: "你射了，球带着弧线，砸入死角。世界波。", effects: { goals: 1, reputation: 12 } },
          critical: { text: "【灵光一闪】你射了，球带着火焰。三十米，死角。全场起立。", effects: { goals: 1, reputation: 18 } },
          fail: { text: "偏了，擦着横梁。你叹了口气。", effects: { demonValue: 2 } } },
        { id: "B", text: "配合。做墙。", check: { attrs: ["passing", "vision"], difficulty: 32, tag: "远射" },
          success: { text: "你传了，墙做了，球回来了。你射了，进了。", effects: { goals: 1, reputation: 10 } },
          fail: { text: "墙没做好，球丢了。", effects: { demonValue: 2 } } },
        { id: "C", text: "享受。不在乎。", check: { attrs: ["resolve"], difficulty: 28, tag: "远射" },
          success: { text: "你笑了，你射了，进了。你笑了。", effects: { goals: 1, reputation: 8, demonValue: -3 } },
          fail: { text: "你享受了，球偏了。你笑了。", effects: { demonValue: -2 } } }
      ]
    },
    trailing: {
      text: "三十米。你拿球。落后。你必须做点什么。",
      choices: [
        { id: "A", text: "远射。赌了。全力。", check: { attrs: ["shooting", "power", "resolve"], difficulty: 44, tag: "远射" },
          success: { text: "你射了，球像炮弹。门将碰了，没挡住。进了！", effects: { goals: 1, reputation: 15 } },
          critical: { text: "【灵光一闪】你射了，球带着火，带着你的全部。网窝碎了。", effects: { goals: 1, reputation: 20 } },
          fail: { text: "高了，飞了。你跪了。", effects: { demonValue: 5, stamina: -5 } } },
        { id: "B", text: "带球冲。一个人。", check: { attrs: ["dribble", "speed", "resolve"], difficulty: 40, tag: "远射" },
          success: { text: "你冲了，过了一个，过了两个，射了，进了。", effects: { goals: 1, reputation: 15 } },
          fail: { text: "第三个把你铲了。你倒了。没吹。", effects: { demonValue: 4, stamina: -5 } } },
        { id: "C", text: "传给队友。相信。", check: { attrs: ["passing", "vision"], difficulty: 32, tag: "远射" },
          success: { text: "你传了，队友射了，进了。你们抱在一起。", effects: { assists: 1, reputation: 12 } },
          fail: { text: "传球被断了。", effects: { demonValue: 3 } } }
      ]
    }
  },

  // 3. 定位球
  key_setpiece: {
    leading: {
      text: "角球。领先，不急。但机会来了。",
      choices: [
        { id: "A", text: "抢前点。头球。", check: { attrs: ["heading", "positioning"], difficulty: 28, tag: "定位球" },
          success: { text: "你抢了，蹭了，进了。", effects: { goals: 1, reputation: 6 } },
          fail: { text: "没抢到，被解围了。没关系。", effects: {} } },
        { id: "B", text: "后点等摆渡。", check: { attrs: ["positioning", "resolve"], difficulty: 24, tag: "定位球" },
          success: { text: "球摆渡了，你射了，进了。", effects: { goals: 1, reputation: 6 } },
          fail: { text: "摆渡没到。", effects: {} } },
        { id: "C", text: "禁区外等二点。", check: { attrs: ["shooting", "resolve"], difficulty: 26, tag: "定位球" },
          success: { text: "球弹出来了，你射了，进了。", effects: { goals: 1, reputation: 8 } },
          fail: { text: "球没弹到你这边。", effects: {} } }
      ]
    },
    level: {
      text: "任意球。禁区前沿。平局。这一脚，可能决定一切。",
      choices: [
        { id: "A", text: "直接射。弧线。", check: { attrs: ["shooting", "power"], difficulty: 40, tag: "定位球" },
          success: { text: "你射了，球绕过人墙，砸入死角。", effects: { goals: 1, reputation: 12 } },
          critical: { text: "【灵光一闪】你射了，球带着完美的弧线。门将没动。世界波。", effects: { goals: 1, reputation: 18 } },
          fail: { text: "砸在人墙上了。", effects: { demonValue: 2 } } },
        { id: "B", text: "传中。找队友。", check: { attrs: ["passing", "vision"], difficulty: 32, tag: "定位球" },
          success: { text: "你传了，队友头球，进了。", effects: { assists: 1, reputation: 10 } },
          fail: { text: "传中太深，门将抱了。", effects: {} } },
        { id: "C", text: "短传。重新组织。", check: { attrs: ["passing", "resolve"], difficulty: 26, tag: "定位球" },
          success: { text: "你传了，重新组织，找到了空间。射了，进了。", effects: { goals: 1, reputation: 8 } },
          fail: { text: "组织被断了。", effects: {} } }
      ]
    },
    trailing: {
      text: "任意球。禁区前沿。落后。最后的机会。",
      choices: [
        { id: "A", text: "全力。爆射。", check: { attrs: ["shooting", "power", "resolve"], difficulty: 44, tag: "定位球" },
          success: { text: "你射了，球像炮弹。人墙碎了，门将碰了，没挡住。进了！", effects: { goals: 1, reputation: 15 } },
          critical: { text: "【灵光一闪】你射了，球带着火。人墙跳了，没用。网窝碎了。", effects: { goals: 1, reputation: 20 } },
          fail: { text: "砸在人墙上了，弹了。你跪了。", effects: { demonValue: 5 } } },
        { id: "B", text: "弧线。死角。", check: { attrs: ["shooting", "resolve"], difficulty: 40, tag: "定位球" },
          success: { text: "你射了，弧线，绕过人墙，死角，进了。", effects: { goals: 1, reputation: 15 } },
          fail: { text: "偏了，擦着立柱。", effects: { demonValue: 4 } } },
        { id: "C", text: "传中。所有人压上。", check: { attrs: ["passing", "vision"], difficulty: 34, tag: "定位球" },
          success: { text: "你传了，所有人冲了。混乱中，球进了。", effects: { goals: 1, reputation: 12 } },
          fail: { text: "被解围了。反击。", effects: { demonValue: 3, oppThreat: 1 } } }
      ]
    }
  },

  // 4. 防守关键时刻
  key_defense: {
    leading: {
      text: "对方反击。你领先。守住。",
      choices: [
        { id: "A", text: "飞铲。", check: { attrs: ["tackle", "resolve"], difficulty: 30, tag: "防守" },
          success: { text: "你铲了，球断了。干净。", effects: { reputation: 5 } },
          fail: { text: "没铲到，犯规了。黄牌。", effects: { stamina: -3 } } },
        { id: "B", text: "卡位。不伸脚。", check: { attrs: ["positioning", "resolve"], difficulty: 26, tag: "防守" },
          success: { text: "你卡住了，他过不去，回传了。", effects: { reputation: 4 } },
          fail: { text: "他变向了，过了你。", effects: { oppThreat: 1 } } },
        { id: "C", text: "呼叫队友协防。", check: { attrs: ["vision", "resolve"], difficulty: 22, tag: "防守" },
          success: { text: "队友来了，夹击，断了。", effects: { reputation: 4 } },
          fail: { text: "队友没到。他射了，偏了。好险。", effects: { oppThreat: 1 } } }
      ]
    },
    level: {
      text: "对方反击，三打二。平局。你不能让他过去。",
      choices: [
        { id: "A", text: "飞铲。赌了。", check: { attrs: ["tackle", "resolve"], difficulty: 38, tag: "防守" },
          success: { text: "你铲了，球断了。全场鼓掌。", effects: { reputation: 8 } },
          critical: { text: "【灵光一闪】你铲了，球和人一起断了。干净，漂亮。全场起立。", effects: { reputation: 12 } },
          fail: { text: "没铲到。他过了，射了，进了。", effects: { oppThreat: 3, demonValue: 3 } } },
        { id: "B", text: "延缓。等队友。", check: { attrs: ["positioning", "resolve"], difficulty: 32, tag: "防守" },
          success: { text: "你延缓了，队友回来了，断了。", effects: { reputation: 6 } },
          fail: { text: "他没等你。他射了，门将扑了。好险。", effects: { oppThreat: 1 } } },
        { id: "C", text: "犯规。战术犯规。", check: { attrs: ["resolve"], difficulty: 24, tag: "防守" },
          success: { text: "你拉了，犯规了。黄牌。但阻止了。", effects: { reputation: 3 } },
          fail: { text: "没拉住。他过了，射了，偏了。", effects: { oppThreat: 1 } } }
      ]
    },
    trailing: {
      text: "对方反击。你落后。如果丢了这一球，就结束了。",
      choices: [
        { id: "A", text: "飞铲。必须断。", check: { attrs: ["tackle", "resolve", "power"], difficulty: 42, tag: "防守" },
          success: { text: "你铲了，球断了。你吼了。还有希望。", effects: { reputation: 10 } },
          critical: { text: "【灵光一闪】你铲了，球断了。你站起来。全场在喊你的名字。", effects: { reputation: 15 } },
          fail: { text: "没铲到。他过了，射了，进了。结束了。", effects: { oppThreat: 3, demonValue: 5 } } },
        { id: "B", text: "用身体挡。", check: { attrs: ["balance", "resolve"], difficulty: 36, tag: "防守" },
          success: { text: "你挡了，球砸在你身上，弹了。你倒了，但球没进。", effects: { reputation: 8, stamina: -5 } },
          fail: { text: "没挡住。球从你身边过了，射了，进了。", effects: { oppThreat: 3, demonValue: 4 } } },
        { id: "C", text: "赌他射偏。封堵角度。", check: { attrs: ["positioning", "resolve"], difficulty: 32, tag: "防守" },
          success: { text: "你封了。他射了，砸在你身上，弹了。", effects: { reputation: 8 } },
          fail: { text: "他变了向，过了你，射了，进了。", effects: { oppThreat: 3, demonValue: 4 } } }
      ]
    }
  },

  // 5. 最后三分钟
  key_lastminute: {
    leading: {
      text: "最后三分钟。你领先。守住。",
      choices: [
        { id: "A", text: "控球。不给他们。", check: { attrs: ["passing", "resolve"], difficulty: 26, tag: "关键时刻" },
          success: { text: "你控了，他们抢不到。哨响了。赢了。", effects: { reputation: 5 } },
          fail: { text: "丢了。他们反击，射了，偏了。好险。哨响了。", effects: {} } },
        { id: "B", text: "反击。再进一个。", check: { attrs: ["speed", "shooting"], difficulty: 32, tag: "关键时刻" },
          success: { text: "你冲了，射了，进了。杀死比赛。", effects: { goals: 1, reputation: 8 } },
          fail: { text: "没进。但没关系。哨响了。赢了。", effects: {} } },
        { id: "C", text: "享受。", check: { attrs: ["resolve"], difficulty: 20, tag: "关键时刻" },
          success: { text: "你笑了，你享受了。哨响了。赢了。", effects: { reputation: 5, demonValue: -3 } },
          fail: { text: "你享受了。哨响了。赢了。", effects: { demonValue: -2 } } }
      ]
    },
    level: {
      text: "最后三分钟。平局。谁先进谁赢。",
      choices: [
        { id: "A", text: "冲。一个人。", check: { attrs: ["dribble", "shooting", "resolve"], difficulty: 44, tag: "关键时刻" },
          success: { text: "你冲了，过了，射了，进了。绝杀。你跪了。全场疯了。", effects: { goals: 1, reputation: 18 } },
          critical: { text: "【灵光一闪】你冲了，你看到了，你射了，球带着光。进了。世界安静了。然后——轰。", effects: { goals: 1, reputation: 25 } },
          fail: { text: "你冲了，被断了。反击，射了，进了。你输了。", effects: { oppThreat: 3, demonValue: 5 } } },
        { id: "B", text: "配合。一起。", check: { attrs: ["passing", "vision"], difficulty: 36, tag: "关键时刻" },
          success: { text: "你传了，墙做了，球回来了。射了，进了。绝杀。", effects: { goals: 1, reputation: 15 } },
          fail: { text: "传球被断了。哨响了。平了。", effects: { demonValue: 2 } } },
        { id: "C", text: "享受。不在乎。", check: { attrs: ["resolve"], difficulty: 30, tag: "关键时刻" },
          success: { text: "你笑了，你射了，进了。你笑了。绝杀。", effects: { goals: 1, reputation: 12, demonValue: -5 } },
          fail: { text: "你享受了，球偏了。哨响了。你笑了。平了。", effects: { demonValue: -3 } } }
      ]
    },
    trailing: {
      text: "最后三分钟。你落后。这是最后的机会。",
      choices: [
        { id: "A", text: "全力。一个人。赌了。", check: { attrs: ["shooting", "power", "resolve"], difficulty: 48, tag: "关键时刻" },
          success: { text: "你冲了，你射了，球带着你的全部。进了。绝平。你吼了。", effects: { goals: 1, reputation: 20 } },
          critical: { text: "【灵光一闪】你冲了，你看到了光，你射了，球带着火，带着六年。进了。世界碎了。", effects: { goals: 1, reputation: 30 } },
          fail: { text: "你射了，偏了。哨响了。你跪了。结束了。", effects: { demonValue: 8, stamina: -5 } } },
        { id: "B", text: "传中。所有人压上。", check: { attrs: ["passing", "vision", "resolve"], difficulty: 40, tag: "关键时刻" },
          success: { text: "你传了，所有人冲了。混乱。球进了。绝平。", effects: { goals: 1, reputation: 15 } },
          fail: { text: "传中被解围了。哨响了。结束了。", effects: { demonValue: 5 } } },
        { id: "C", text: "享受。最后一脚。", check: { attrs: ["resolve", "shooting"], difficulty: 34, tag: "关键时刻" },
          success: { text: "你笑了，你射了，进了。你笑了。绝平。", effects: { goals: 1, reputation: 15, demonValue: -5 } },
          fail: { text: "你享受了，球偏了。你笑了。哨响了。", effects: { demonValue: -3 } } }
      ]
    }
  },

  // 6. 门将对决
  key_keeper: {
    leading: {
      text: "你面对门将。领先，不急。",
      choices: [
        { id: "A", text: "推射。", check: { attrs: ["shooting", "resolve"], difficulty: 28, tag: "射门" },
          success: { text: "你推了，进了。", effects: { goals: 1, reputation: 5 } },
          fail: { text: "扑了。没关系。", effects: {} } },
        { id: "B", text: "挑射。", check: { attrs: ["shooting", "resolve"], difficulty: 34, tag: "射门" },
          success: { text: "你挑了，球过了门将，进了。漂亮。", effects: { goals: 1, reputation: 8 } },
          fail: { text: "高了，飞了。", effects: {} } },
        { id: "C", text: "假射真传。", check: { attrs: ["passing", "resolve"], difficulty: 26, tag: "射门" },
          success: { text: "你假射了，门将倒了。你传了，队友推了。", effects: { assists: 1, reputation: 6 } },
          fail: { text: "门将没倒，他抱了。", effects: {} } }
      ]
    },
    level: {
      text: "你面对门将。平局。他看着你，你看着他。",
      choices: [
        { id: "A", text: "爆射。力量。", check: { attrs: ["shooting", "power"], difficulty: 38, tag: "射门" },
          success: { text: "你射了，他碰了，没挡住。进了。", effects: { goals: 1, reputation: 10 } },
          critical: { text: "【灵光一闪】你射了，球带着火。他扑了，球从他手里钻过去了。进了。", effects: { goals: 1, reputation: 15 } },
          fail: { text: "他扑了，他用了脸。球弹了。", effects: { demonValue: 2 } } },
        { id: "B", text: "推射。角度。", check: { attrs: ["shooting", "resolve"], difficulty: 34, tag: "射门" },
          success: { text: "你推了，远角，他扑了方向。进了。", effects: { goals: 1, reputation: 10 } },
          fail: { text: "他猜对了，扑了。", effects: { demonValue: 2 } } },
        { id: "C", text: "享受。", check: { attrs: ["resolve"], difficulty: 28, tag: "射门" },
          success: { text: "你笑了，你推了，进了。你笑了。", effects: { goals: 1, reputation: 8, demonValue: -3 } },
          fail: { text: "你享受了，偏了。你笑了。", effects: { demonValue: -2 } } }
      ]
    },
    trailing: {
      text: "你面对门将。落后。他很大，你很小。但你不在乎。",
      choices: [
        { id: "A", text: "全力。爆射。", check: { attrs: ["shooting", "power", "resolve"], difficulty: 44, tag: "射门" },
          success: { text: "你射了，球像炮弹。他碰了，没挡住。进了！", effects: { goals: 1, reputation: 15 } },
          critical: { text: "【灵光一闪】你射了，球带着你的全部。他扑了，球从他指尖飞过去了。进了。你吼了。", effects: { goals: 1, reputation: 20 } },
          fail: { text: "他扑了。他很大。你跪了。", effects: { demonValue: 5, stamina: -5 } } },
        { id: "B", text: "冷静。推射。", check: { attrs: ["resolve", "shooting"], difficulty: 38, tag: "射门" },
          success: { text: "你推了，远角，进了。你还有希望。", effects: { goals: 1, reputation: 12 } },
          fail: { text: "他扑了，他猜对了。", effects: { demonValue: 4 } } },
        { id: "C", text: "享受。最后一脚。", check: { attrs: ["resolve", "shooting"], difficulty: 32, tag: "射门" },
          success: { text: "你笑了，你射了，进了。你笑了。", effects: { goals: 1, reputation: 12, demonValue: -5 } },
          fail: { text: "你享受了，偏了。你笑了。", effects: { demonValue: -3 } } }
      ]
    }
  },

  // 7. 中场绞杀
  key_midfield: {
    leading: {
      text: "中场。你拿球。领先。控制。",
      choices: [
        { id: "A", text: "长传。找前锋。", check: { attrs: ["passing", "vision"], difficulty: 26, tag: "中场" },
          success: { text: "你传了，五十米，精准。前锋射了，进了。", effects: { assists: 1, reputation: 6 } },
          fail: { text: "传大了，出界了。", effects: {} } },
        { id: "B", text: "带球推进。", check: { attrs: ["dribble", "speed"], difficulty: 28, tag: "中场" },
          success: { text: "你带了，冲了，分球了。射了，进了。", effects: { threat: 1, reputation: 5 } },
          fail: { text: "被断了。但没关系。", effects: {} } },
        { id: "C", text: "控制。回传。", check: { attrs: ["resolve", "passing"], difficulty: 20, tag: "中场" },
          success: { text: "你控了。时间在你这边。", effects: { stamina: 5 } },
          fail: { text: "回传失误。但无伤大雅。", effects: {} } }
      ]
    },
    level: {
      text: "中场。你拿球。平局。对方逼上来了。",
      choices: [
        { id: "A", text: "直塞。撕开。", check: { attrs: ["passing", "vision"], difficulty: 36, tag: "中场" },
          success: { text: "你传了，手术刀。防线碎了。前锋射了，进了。", effects: { assists: 1, reputation: 10 } },
          critical: { text: "【灵光一闪】你传了，球从五个人中间穿过去了。前锋射了，进了。全场起立。", effects: { assists: 1, reputation: 15 } },
          fail: { text: "被断了。反击。", effects: { oppThreat: 1 } } },
        { id: "B", text: "远射。", check: { attrs: ["shooting", "power"], difficulty: 38, tag: "中场" },
          success: { text: "你射了，三十米，进了。世界波。", effects: { goals: 1, reputation: 12 } },
          fail: { text: "高了。", effects: { demonValue: 2 } } },
        { id: "C", text: "享受。", check: { attrs: ["resolve"], difficulty: 28, tag: "中场" },
          success: { text: "你笑了，你传了，进了。你笑了。", effects: { assists: 1, reputation: 8, demonValue: -3 } },
          fail: { text: "你享受了，球丢了。你笑了。", effects: { demonValue: -2 } } }
      ]
    },
    trailing: {
      text: "中场。你拿球。落后。你必须做点什么。",
      choices: [
        { id: "A", text: "一个人。带球冲。", check: { attrs: ["dribble", "speed", "resolve"], difficulty: 42, tag: "中场" },
          success: { text: "你冲了，过了一个，过了两个，射了，进了。", effects: { goals: 1, reputation: 15 } },
          critical: { text: "【灵光一闪】你冲了，你过了五个人，你射了，进了。全场疯了。", effects: { goals: 1, reputation: 20 } },
          fail: { text: "第三个把你铲了。你倒了。", effects: { demonValue: 4, stamina: -5 } } },
        { id: "B", text: "长传。找前锋。赌了。", check: { attrs: ["passing", "vision"], difficulty: 36, tag: "中场" },
          success: { text: "你传了，六十米。前锋射了，进了。", effects: { assists: 1, reputation: 12 } },
          fail: { text: "传大了，出界了。", effects: { demonValue: 3 } } },
        { id: "C", text: "享受。不在乎。", check: { attrs: ["resolve", "passing"], difficulty: 30, tag: "中场" },
          success: { text: "你笑了，你传了，进了。你笑了。", effects: { assists: 1, reputation: 10, demonValue: -5 } },
          fail: { text: "你享受了，球丢了。你笑了。", effects: { demonValue: -3 } } }
      ]
    }
  },

  // 8. 头球
  key_header: {
    leading: {
      text: "传中。你在禁区里。领先。",
      choices: [
        { id: "A", text: "抢点。头球。", check: { attrs: ["heading", "positioning"], difficulty: 28, tag: "头球" },
          success: { text: "你抢了，顶了，进了。", effects: { goals: 1, reputation: 6 } },
          fail: { text: "没顶到，被解围了。", effects: {} } },
        { id: "B", text: "摆渡。给队友。", check: { attrs: ["heading", "vision"], difficulty: 26, tag: "头球" },
          success: { text: "你蹭了，队友射了，进了。", effects: { assists: 1, reputation: 5 } },
          fail: { text: "蹭偏了。", effects: {} } },
        { id: "C", text: "让给队友。", check: { attrs: ["resolve"], difficulty: 20, tag: "头球" },
          success: { text: "你让了，队友顶了，进了。", effects: { reputation: 4 } },
          fail: { text: "队友也没顶到。", effects: {} } }
      ]
    },
    level: {
      text: "传中。你在禁区里。平局。球来了。",
      choices: [
        { id: "A", text: "暴力头槌。", check: { attrs: ["heading", "power"], difficulty: 38, tag: "头球" },
          success: { text: "你跳了，你顶了，球砸入网窝。门将没反应。", effects: { goals: 1, reputation: 10 } },
          critical: { text: "【灵光一闪】你跳了，你像一座山，你顶了。球碎了，网窝碎了。全场起立。", effects: { goals: 1, reputation: 15 } },
          fail: { text: "顶偏了，擦着立柱。", effects: { demonValue: 2 } } },
        { id: "B", text: "巧顶。角度。", check: { attrs: ["heading", "resolve"], difficulty: 34, tag: "头球" },
          success: { text: "你蹭了，远角，进了。", effects: { goals: 1, reputation: 10 } },
          fail: { text: "蹭偏了，门将抱了。", effects: { demonValue: 2 } } },
        { id: "C", text: "享受。", check: { attrs: ["resolve"], difficulty: 28, tag: "头球" },
          success: { text: "你笑了，你顶了，进了。你笑了。", effects: { goals: 1, reputation: 8, demonValue: -3 } },
          fail: { text: "你享受了，没顶到。你笑了。", effects: { demonValue: -2 } } }
      ]
    },
    trailing: {
      text: "传中。你在禁区里。落后。你必须顶进。",
      choices: [
        { id: "A", text: "全力。泰山压顶。", check: { attrs: ["heading", "power", "resolve"], difficulty: 44, tag: "头球" },
          success: { text: "你跳了，你顶了，球像炮弹。进了。你吼了。", effects: { goals: 1, reputation: 15 } },
          critical: { text: "【灵光一闪】你跳了，你比所有人都高，你顶了。球碎了，门将碎了，全场碎了。", effects: { goals: 1, reputation: 20 } },
          fail: { text: "你顶了，偏了。你跪了。", effects: { demonValue: 5, stamina: -5 } } },
        { id: "B", text: "抢点。嗅觉。", check: { attrs: ["positioning", "heading"], difficulty: 38, tag: "头球" },
          success: { text: "你抢了，你顶了，进了。你还有希望。", effects: { goals: 1, reputation: 12 } },
          fail: { text: "没抢到，被解围了。", effects: { demonValue: 4 } } },
        { id: "C", text: "享受。最后一顶。", check: { attrs: ["resolve", "heading"], difficulty: 32, tag: "头球" },
          success: { text: "你笑了，你顶了，进了。你笑了。", effects: { goals: 1, reputation: 12, demonValue: -5 } },
          fail: { text: "你享受了，没顶到。你笑了。", effects: { demonValue: -3 } } }
      ]
    }
  },

  // 9. 点球
  key_penalty: {
    leading: {
      text: "点球。领先。扩大优势。",
      choices: [
        { id: "A", text: "推射。稳。", check: { attrs: ["resolve", "shooting"], difficulty: 26, tag: "点球" },
          success: { text: "你推了，进了。", effects: { goals: 1, reputation: 5 } },
          fail: { text: "扑了。没关系，你领先。", effects: {} } },
        { id: "B", text: "爆射。", check: { attrs: ["shooting", "power"], difficulty: 30, tag: "点球" },
          success: { text: "你射了，球砸入网窝。", effects: { goals: 1, reputation: 6 } },
          fail: { text: "高了，飞了。没关系。", effects: {} } },
        { id: "C", text: "勺子。", check: { attrs: ["resolve", "shooting"], difficulty: 34, tag: "点球" },
          success: { text: "你挑了，门将扑了方向，球滚进去了。漂亮。", effects: { goals: 1, reputation: 8 } },
          fail: { text: "门将没扑，他抱了。", effects: {} } }
      ]
    },
    level: {
      text: "点球。平局。五万人安静了。",
      choices: [
        { id: "A", text: "全力。右上角。", check: { attrs: ["shooting", "power"], difficulty: 38, tag: "点球" },
          success: { text: "你射了，球砸入死角。门将扑了方向。进了。", effects: { goals: 1, reputation: 12 } },
          critical: { text: "【灵光一闪】你射了，球带着火。网窝碎了。全场疯了。", effects: { goals: 1, reputation: 18 } },
          fail: { text: "偏了，擦着立柱。你跪了。", effects: { demonValue: 3 } } },
        { id: "B", text: "推射。中路。赌他扑。", check: { attrs: ["resolve"], difficulty: 32, tag: "点球" },
          success: { text: "他扑了。你推了中路，球滚进去了。", effects: { goals: 1, reputation: 10 } },
          fail: { text: "他没扑，他站在中路，抱住了。", effects: { demonValue: 3 } } },
        { id: "C", text: "享受。", check: { attrs: ["resolve"], difficulty: 28, tag: "点球" },
          success: { text: "你笑了，你推了，进了。你笑了。", effects: { goals: 1, reputation: 8, demonValue: -3 } },
          fail: { text: "你享受了，偏了。你笑了。", effects: { demonValue: -2 } } }
      ]
    },
    trailing: {
      text: "点球。落后。你必须进。",
      choices: [
        { id: "A", text: "全力。爆射。", check: { attrs: ["shooting", "power", "resolve"], difficulty: 42, tag: "点球" },
          success: { text: "你射了，球像炮弹。门将碰了，没挡住。进了！", effects: { goals: 1, reputation: 15 } },
          critical: { text: "【灵光一闪】你射了，球带着你的全部。网窝碎了。你吼了。", effects: { goals: 1, reputation: 20 } },
          fail: { text: "扑了。他扑了。你跪了。", effects: { demonValue: 5, stamina: -5 } } },
        { id: "B", text: "推射。冷静。", check: { attrs: ["resolve", "shooting"], difficulty: 36, tag: "点球" },
          success: { text: "你推了，远角，进了。你还有希望。", effects: { goals: 1, reputation: 12 } },
          fail: { text: "他猜对了，扑了。", effects: { demonValue: 4 } } },
        { id: "C", text: "享受。", check: { attrs: ["resolve"], difficulty: 30, tag: "点球" },
          success: { text: "你笑了，你推了，进了。你笑了。", effects: { goals: 1, reputation: 12, demonValue: -5 } },
          fail: { text: "你享受了，偏了。你笑了。", effects: { demonValue: -3 } } }
      ]
    }
  },

  // 10. 领域碰撞（高难度·后期）
  key_domain: {
    leading: {
      text: "他展开了领域。化域的领域。你领先。但空气变了。",
      choices: [
        { id: "A", text: "冲。用力量碎了他的领域。", check: { attrs: ["power", "resolve"], difficulty: 36, tag: "领域" },
          success: { text: "你冲了，他的领域碎了。你射了，进了。", effects: { goals: 1, reputation: 10 } },
          fail: { text: "他的领域没碎，你被弹了。", effects: { stamina: -5 } } },
        { id: "B", text: "用技术。绕过。", check: { attrs: ["dribble", "resolve"], difficulty: 34, tag: "领域" },
          success: { text: "你绕了，他的领域碰不到你。你射了，进了。", effects: { goals: 1, reputation: 10 } },
          fail: { text: "你绕了，但他预判了。断了。", effects: { demonValue: 2 } } },
        { id: "C", text: "享受。", check: { attrs: ["resolve"], difficulty: 28, tag: "领域" },
          success: { text: "你笑了，你不在乎他的领域。你射了，进了。你笑了。", effects: { goals: 1, reputation: 8, demonValue: -3 } },
          fail: { text: "你享受了，球偏了。你笑了。", effects: { demonValue: -2 } } }
      ]
    },
    level: {
      text: "他展开了领域。化域的领域。平局。空气在压你。",
      choices: [
        { id: "A", text: "吞噬。用你的领域对抗。", check: { attrs: ["resolve", "power"], difficulty: 44, tag: "领域" },
          success: { text: "你的领域，展开了。碰撞。他的碎了。你射了，进了。", effects: { goals: 1, reputation: 15 } },
          critical: { text: "【灵光一闪】你的领域，展开了。不是化域，是——天人合一。他的领域碎了。世界安静了。", effects: { goals: 1, reputation: 25 } },
          fail: { text: "你的领域碎了，你被弹了。你跪了。", effects: { demonValue: 5, stamina: -5 } } },
        { id: "B", text: "共鸣。和队友一起。", check: { attrs: ["passing", "vision"], difficulty: 36, tag: "领域" },
          success: { text: "你传了，队友射了，进了。两个人的力量。", effects: { assists: 1, reputation: 12 } },
          fail: { text: "传球被他的领域断了。", effects: { demonValue: 3 } } },
        { id: "C", text: "享受。不在乎。", check: { attrs: ["resolve"], difficulty: 30, tag: "领域" },
          success: { text: "你笑了，你不在乎。你射了，进了。你笑了。", effects: { goals: 1, reputation: 10, demonValue: -5 } },
          fail: { text: "你享受了，球偏了。你笑了。", effects: { demonValue: -3 } } }
      ]
    },
    trailing: {
      text: "他展开了领域。天人合一的领域。你落后。你喘不过气。",
      choices: [
        { id: "A", text: "吞噬。用全部。", check: { attrs: ["resolve", "power", "shooting"], difficulty: 50, tag: "领域" },
          success: { text: "你冲了。你的领域，展开了。碰撞。他的——裂了。你射了，进了。你吼了。", effects: { goals: 1, reputation: 20 } },
          critical: { text: "【灵光一闪】你的领域，展开了。天人合一。你突破了。他的领域碎了，球进了。世界碎了。", effects: { goals: 1, reputation: 30 } },
          fail: { text: "你的领域碎了，你被弹了，你倒了。结束了。", effects: { demonValue: 8, stamina: -8 } } },
        { id: "B", text: "共鸣。一起。", check: { attrs: ["passing", "vision", "resolve"], difficulty: 42, tag: "领域" },
          success: { text: "你传了，队友射了，进了。两个人的力量。够了。", effects: { assists: 1, reputation: 15 } },
          fail: { text: "传球被断了。他的领域太强了。", effects: { demonValue: 5 } } },
        { id: "C", text: "享受。最后一脚。", check: { attrs: ["resolve", "shooting"], difficulty: 36, tag: "领域" },
          success: { text: "你笑了，你不在乎。你射了，进了。你笑了。他的领域，碰不到你。", effects: { goals: 1, reputation: 15, demonValue: -8 } },
          fail: { text: "你享受了，球偏了。你笑了。没关系。", effects: { demonValue: -5 } } }
      ]
    }
  }

}

};
