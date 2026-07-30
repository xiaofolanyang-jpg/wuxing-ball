/* data/chapter3.js — 第三章《淬炼营·入营》v3.0 剧本版
 * 主题：淬炼营第一阶段。100人→50人。1v1淘汰。残酷。
 * 年龄：15岁 | 时间跨度：6周（前3周） | 事件数：11
 * 事件链：通知 → 报到 → 1v1(3节点) → 连胜蒙太奇 → 教练选择 → 地狱周 → 觉醒 → 营主注视 → 淘汰日 → 组队 → 联赛前两场
 */
window.CHAPTER3 = { events: [

  // ===== 事件1：通知（剧情·转折） =====
  {
    id: "ch3_opening",
    chapter: 3,
    text: [
      "赛季中段。一封信，不是给学院的，是给你的。",
      "「兹通知：经挑战者联赛表现评估，你已获得'淬炼营'入营资格。报到日期：X月X日。地点：洲内中心城。」",
      "淬炼营。",
      "你听过这个名字。所有踢球的人都听过。",
      "一百个人进去，五十个人出来，剩下的，回家。",
      "{companion1Name}也收到了。他看着信，沉默了很久。",
      "「一百个人。」他说。「五十个出来。」",
      "「嗯。」",
      "「那我们。」他看着你。「都得出来。」"
    ],
    system: "【第三章·淬炼营·入营 开启。一百条命，收五十条。】",
    effects: { flags: { campInvited: true } },
    next: "ch3_arrival"
  },

  // ===== 事件2：报到（环境·压迫感） =====
  {
    id: "ch3_arrival",
    chapter: 3,
    text: [
      "中心城。训练基地。",
      "你到的时候，已经有人在了。很多，到处都是人，穿着不同学院的队服。有的你认识，有的不认识。",
      "一百个人。",
      "训练场是标准的。草皮，灯光，五行修炼室，灵脉接入。你从来没见过这么好的设施。",
      "一个老头站在场中央，很高，很瘦，背着手。",
      "「我是营主。」他说，声音不大，但所有人都安静了。「接下来六周，你们的一百条命，我收五十条。剩下的，滚。」",
      "没人笑。",
      "「明天，1v1，第一场。」"
    ],
    effects: { demonValue: 3, flags: { campStart: true } },
    next: "ch3_1v1_n1"
  },

  // ===== 事件3：1v1·第一场（3节点·淘汰赛） =====
  // 节点1·你攻他守
  {
    id: "ch3_1v1_n1",
    chapter: 3,
    text: [
      "你的第一个对手，比你高半头。金灵根，后卫。",
      "他看着你，没说话。",
      "哨响。你攻他守。十米乘二十米的场地，一米宽的小球门。",
      "球在你脚下。"
    ],
    system: "【1v1淘汰赛·第一场。三局两胜制。】",
    choices: [
      {
        id: "A", text: "正面突破",
        check: { attrs: ["dribble", "speed"], difficulty: 28, tag: "盘带+速度" },
        success: { text: "你变了向，他重心丢了，你过了。射门，球滚进小球门。进了！", effects: { reputation: 3 } },
        fail: { text: "你冲了，他伸脚，球断了。你摔在地上，膝盖磕在草皮上。", effects: { stamina: -4 } },
        next: "ch3_1v1_n2"
      },
      {
        id: "B", text: "假动作晃他",
        check: { attrs: ["dribble", "agility"], difficulty: 26, tag: "盘带+柔韧" },
        success: { text: "你晃了，他吃了，重心偏了半寸。够了。你射了，进了！", effects: { reputation: 3 } },
        fail: { text: "他不吃。你晃了个寂寞，球丢了。他看着你，眼神很平。", effects: { stamina: -3 } },
        next: "ch3_1v1_n2"
      }
    ]
  },
  // 节点2·他攻你守
  {
    id: "ch3_1v1_n2",
    chapter: 3,
    text: [
      "换边。他攻你守。",
      "他带球过来了，不快，但很稳。金灵根的后卫，脚下像生了根。"
    ],
    choices: [
      {
        id: "A", text: "正面拦截",
        check: { attrs: ["tackle", "intercept"], difficulty: 28, tag: "铲断+拦截" },
        success: { text: "你断了，干净。球弹出去，他愣了一下。", effects: { reputation: 3 } },
        fail: { text: "他过了你，一个变向，你重心丢了。他射了，进了。", effects: { stamina: -4 } },
        next: "ch3_1v1_n3"
      },
      {
        id: "B", text: "卡位置逼他失误",
        check: { attrs: ["positioning", "pressure"], difficulty: 26, tag: "站位+抗压" },
        success: { text: "你没动。他急了，传球出界。你赢了这一局。", effects: { reputation: 3 } },
        fail: { text: "他不在乎，硬突，肩膀撞上来，你退了半步。够了。他射了，进了。", effects: { stamina: -4 } },
        next: "ch3_1v1_n3"
      }
    ]
  },
  // 节点3·决胜
  {
    id: "ch3_1v1_n3",
    chapter: 3,
    text: [
      "最后一球。决胜。",
      "你们对视了一眼。都喘，都出汗了。小球门在十米外。",
      "哨响。"
    ],
    choices: [
      {
        id: "A", text: "全力一搏",
        check: { attrs: ["shooting", "burst"], difficulty: 30, tag: "射门+爆发" },
        success: { text: "最后一球。你不管了，冲，射！{elementAdj}的劲道灌进球里。进了！你赢了！", effects: { reputation: 5 } },
        fail: { text: "你射了，他扑了，指尖碰到了。球弹在门柱上。你输了。", effects: { demonValue: 4, stamina: -5 } },
        critical: { text: "【灵光一闪】你甚至没想，身体自己动了。{elementAdj}的弧线，球进了！他愣了，你也愣了。", effects: { reputation: 8, coreAttrs: 1, flags: { keySuccess: true } } },
        next: "ch3_1v1_after"
      },
      {
        id: "B", text: "冷静等他失误",
        check: { attrs: ["iq", "resolve"], difficulty: 28, tag: "球商+决断" },
        success: { text: "你等了。他急了，他先动了。你看到了空当，你动了，进了！你赢了！", effects: { reputation: 5 } },
        fail: { text: "你等太久了。他看穿了，他先动了。你反应慢了半拍，球进了。你输了。", effects: { demonValue: 4, stamina: -4 } },
        next: "ch3_1v1_after"
      }
    ]
  },
  // 1v1赛后
  {
    id: "ch3_1v1_after",
    chapter: 3,
    text: [
      "哨响。结束了。",
      "你弯着腰喘气。他走过来，伸了只手。你握了。他的手很硬，金灵根的手。",
      "「不错。」他说，然后走了。",
      "你看着他的背影。一百个人里的一个。你赢了，但还有九十九个。"
    ],
    effects: { reputation: 2, matches: 1, wins: 1 },
    next: "ch3_streak"
  },

  // ===== 事件4：1v1·连胜/连败（蒙太奇·排名变化） =====
  {
    id: "ch3_streak",
    chapter: 3,
    text: [
      "第二场。赢了。",
      "第三场。输了。对方是水灵根，克你的火。你被节奏拖死了。",
      "第四场。赢了。",
      "第五场。赢了。",
      "四胜一负。安全区。",
      "{companion1Name}也在。他的战绩比你还好，五连胜，排名前十。",
      "「你太急了。」他晚上跟你说。「第三场，你被克了，但你没调整。」",
      "你没说话。他说得对。"
    ],
    effects: { reputation: 6, coreAttrs: 1, matches: 4, wins: 3 },
    next: "ch3_coach"
  },

  // ===== 事件5：教练训练·选择（修炼·分支） =====
  {
    id: "ch3_coach",
    chapter: 3,
    text: [
      "第三周。1v1阶段结束，50人淘汰，剩下50人。",
      "接下来是教练训练。五个教习，五行。你选一个。"
    ],
    choices: [
      { id: "A", text: "金教习——铲断、拦截、硬度", effects: { attrs: { tackle: 3, intercept: 2, hardness: 2 }, flags: { coach_jin: true, passive_tiebi: true } }, next: "ch3_hellweek" },
      { id: "B", text: "木教习——耐力、速度、柔韧", effects: { attrs: { stamina: 4, speed: 2, agility: 1 }, flags: { coach_mu: true, passive_yongdong: true } }, next: "ch3_hellweek" },
      { id: "C", text: "水教习——盘带、传球、柔韧", effects: { attrs: { dribble: 3, passing: 2, agility: 3 }, flags: { coach_shui: true, passive_shuigan: true } }, next: "ch3_hellweek" },
      { id: "D", text: "火教习——射门、力量、决断", effects: { attrs: { shooting: 4, power: 2, resolve: 2 }, flags: { coach_huo: true, passive_fentian: true } }, next: "ch3_hellweek" },
      { id: "E", text: "土教习——平衡、抗压、头球", effects: { attrs: { balance: 3, pressure: 3, heading: 2 }, flags: { coach_tu: true, passive_shanyue: true } }, next: "ch3_hellweek" }
    ]
  },

  // ===== 事件6：训练·地狱周（修炼·叙事） =====
  {
    id: "ch3_hellweek",
    chapter: 3,
    text: [
      "教习的训练。比李教习狠十倍。",
      "金教习让你铲球。一天三百次。铲到膝盖出血。「再来。」",
      "木教习让你跑。不停。跑到吐。「吐完了？继续。」",
      "水教习让你传球。蒙着眼。「用脚感觉。不要看。」",
      "火教习让你射门。从三十米。一百脚。「不够重。再来。」",
      "土教习让你顶球。对着墙。五百个。「额头是第五只脚。」",
      "一周后。你变了。"
    ],
    effects: { coreAttrs: 3, stamina: -20 },
    next: "ch3_awaken"
  },

  // ===== 事件7：觉醒事件（检定触发） =====
  {
    id: "ch3_awaken",
    chapter: 3,
    text: [
      "那天晚上，你在五行室里修炼。",
      "突然，灵脉碎片亮了。不是正常的亮，是刺眼的亮。",
      "你的灵根在共鸣。你感觉到了，灵力在经脉里冲，像洪水，像岩浆，像——",
      "你咬住牙，没叫出来。",
      "三秒。五秒。十秒。"
    ],
    system: "【灵脉共鸣。你的灵根正在尝试突破深层。能否抓住这一瞬间？】",
    choices: [
      {
        id: "A", text: "咬牙引导灵力冲关",
        check: { attrs: ["resolve", "pressure"], difficulty: 30, tag: "决断+抗压" },
        success: { text: "光了，暗了。你睁开眼。不一样了，你的灵根，深了一层。", effects: { coreAttrs: 3, flags: { awakened: true } }, next: "ch3_master_gate" },
        fail: { text: "灵力冲了一下，散了。你睁开眼，什么都没变。但你记住了那个感觉。下次。", effects: { stamina: -5 }, next: "ch3_elimination" },
        critical: { text: "【灵光一闪】灵力不是冲过去的，是你带着它走过去的，像呼吸一样自然。你的灵根深了两层。", effects: { coreAttrs: 4, flags: { awakened: true, deepAwaken: true } }, next: "ch3_master_gate" }
      },
      {
        id: "B", text: "放松，让灵力自己流动",
        check: { attrs: ["iq", "rhythm"], difficulty: 28, tag: "球商+节奏" },
        success: { text: "你没抗，你松了。灵力像水一样流过去了。光了，暗了。你睁开眼。深了。", effects: { coreAttrs: 3, flags: { awakened: true } }, next: "ch3_master_gate" },
        fail: { text: "你松了，但灵力也散了，什么都没抓住。你叹了口气。", effects: { stamina: -3 }, next: "ch3_elimination" }
      }
    ]
  },

  // ===== 事件8：营主注视（觉醒后触发） =====
  {
    id: "ch3_master_gate",
    chapter: 3,
    text: [
      "训练结束后，所有人都走了。你还在场边坐着。",
      "脚步声。",
      "营主。他站在你面前，背着手，看着你。",
      "「你。」他说。「明天，早一个小时来。」",
      "然后他走了。"
    ],
    next: "ch3_master_train"
  },
  {
    id: "ch3_master_train",
    chapter: 3,
    text: [
      "第二天，你早到了。他已经在了。",
      "「我教你一个东西。」他说。「只教一次。看好了。」",
      "他动了。",
      "你看到了。那不是踢球。那是——道。",
      "球在他脚下像活的。不是快，不是花，是……对。每一个动作都是对的，像水往低处流，像石头往下落。",
      "他停了。球定在脚底。",
      "「记住。」他说，然后走了。"
    ],
    system: "【营主注视：关键时刻检定难度永久-3。】",
    effects: { allAttrsFlat: 1, demonValue: -10, flags: { masterDisciple: true } },
    next: "ch3_elimination"
  },

  // ===== 事件9：淘汰日（剧情·高潮） =====
  {
    id: "ch3_elimination",
    chapter: 3,
    text: [
      "第四周。淘汰日。",
      "五十个人站在场中央。营主站在前面，手里拿着一张纸。",
      "「念到名字的，留下。没念到的，走。」",
      "他开始念。",
      "第一个。第二个。第三个。",
      "你听着。心跳很快。",
      "{companion1Name}的名字，念了。他松了口气。",
      "你的。",
      "「……{name}。」",
      "你呼了一口气。",
      "旁边有人哭了，有人摔了水瓶，有人站在原地，一动不动。",
      "五十个人，留下来了。"
    ],
    effects: { flags: { campSurvived: true }, demonValue: 2 },
    next: "ch3_team"
  },

  // ===== 事件10：组队（机制·组队联赛准备） =====
  {
    id: "ch3_team",
    chapter: 3,
    text: [
      "「接下来。」营主说。「组队，联赛。十队，单循环，九场。前四进半决赛，末两位，淘汰。」",
      "五十人，十队，每队五人。要求至少三种灵根，至少一后卫、一前锋。",
      "{companion1Name}站在你旁边。你们可以选在一起。也可以分开。"
    ],
    choices: [
      { id: "A", text: "和{companion1Name}一队", next: "ch3_team_a" },
      { id: "B", text: "分开，各自被选", next: "ch3_team_b" }
    ]
  },
  {
    id: "ch3_team_a",
    chapter: 3,
    text: "你看了他一眼，他点头。你们站在一起。",
    effects: { bonds: { tongpao: 3 }, flags: { sameTeam: true } },
    next: "ch3_league"
  },
  {
    id: "ch3_team_b",
    chapter: 3,
    text: "你们对视了一下，没说话，各自站到了不同的队伍里。",
    effects: { bonds: { tongpao: 1 }, flags: { separated: true } },
    next: "ch3_league"
  },

  // ===== 事件11：循环赛（tournament·引擎自动模拟+3场关键比赛） =====
  {
    id: "ch3_league",
    chapter: 3,
    type: "tournament",
    text: [
      "循环赛开始了。十支队伍，单循环，九场定排名。",
      "前几场，你们踢得像散沙。五个人，五种想法，球传到一半就丢。",
      "{companion1Name}在更衣室里拍了桌子。「你们在踢什么？！」",
      "没人说话。",
      "「明天。」他说。「谁再各踢各的，我铲他。」",
      "慢慢地，好了。不是突然好的，是一脚一脚磨出来的。",
      "三场关键比赛，你记住了。"
    ],
    system: "【淬炼营循环赛。十队单循环，九场。引擎模拟全部比赛，玩家操作三场关键战。】",
    keyMatches: [
      {
        label: "优势战",
        opponent: { name: "循环赛·优势战", element: "土", strength: 35 },
        teamBase: 30,
        result: {
          bigwin: { text: "你们碾过去了。五个人，第一次，像一个人。球进了三个，对面一个没进。{companion1Name}笑了，「这才对。」", effects: { reputation: 5 } },
          win: { text: "赢了。不算轻松，但你们控制住了。球在你们脚下转，他们追不上。", effects: { reputation: 4 } },
          draw: { text: "平了。明明该赢的。你射了两次，都偏了。赛后你坐在场边，想了很久。", effects: { reputation: 2, demonValue: 1 } },
          lose: { text: "输了。不该输的。你们轻敌了，他们不轻敌。{lastScore}，你站在原地，喘。", effects: { demonValue: 3 } }
        }
      },
      {
        label: "均势战",
        opponent: { name: "循环赛·均势战", element: "金", strength: 45 },
        teamBase: 30,
        result: {
          bigwin: { text: "你没想到会赢这么多。对面很强，但你们更强。{companion1Name}进了两个，你进了一个。全场最佳。", effects: { reputation: 8, goals: 1 } },
          win: { text: "赢了。最后十分钟，你断了球，反击，{companion1Name}接了，射了，进了。你们抱在一起。", effects: { reputation: 6, assists: 1 } },
          draw: { text: "平了。{lastScore}。谁都没犯错，谁都没让步。赛后对面队长走过来，「下一场，还这样。」", effects: { reputation: 4 } },
          lose: { text: "输了。差一点。你的射门砸在横梁上，弹出来。他们反击，进了。你看着那个球，看了很久。", effects: { reputation: 3, demonValue: 2 } }
        }
      },
      {
        label: "劣势战",
        opponent: { name: "循环赛·劣势战", element: "水", strength: 55 },
        teamBase: 30,
        result: {
          bigwin: { text: "你赢了。不该赢的。但你赢了。{companion1Name}在更衣室里吼了一声，所有人都吼了。", effects: { reputation: 12, coreAttrs: 1 } },
          win: { text: "赢了。最后三分钟，你拿球，面前三个人。你没想，你射了。进了。全场安静了一秒，然后——轰。", effects: { reputation: 10, goals: 1, coreAttrs: 1 } },
          draw: { text: "平了。{lastScore}。你们守了九十分钟。五个人，像一堵墙。他们射了十七脚，没进。你弯着腰喘，但你在笑。", effects: { reputation: 8 } },
          lose: { text: "输了。{lastScore}。他们太强了。你被过了三次，每次都没反应过来。赛后你坐在场边，看着他们庆祝。你记住了。", effects: { reputation: 5, demonValue: 3 } }
        }
      }
    ],
    effects: { matches: 9, chapter: 1 },
    next: "ch4_opening"
  }

] };
