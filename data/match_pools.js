/* data/match_pools.js — 比赛事件池，按「位置_踢法」分类
 * 每场比赛从对应池中随机抽 3 个事件，玩家逐个选择+检定，累计成功数决定胜负
 * 文本中 {elementAdj} 由当前灵根替换演出风格
 */
window.MATCH_POOLS = {

  // 中锋·冲击型
  ST_impact: {
    desc: "反越位、单刀、暴力抽射",
    events: [
      {
        text: "中场一记过顶长传，你启动的瞬间，体内灵力炸裂——双腿像被点燃。",
        choices: [
          { id: "A", text: "全速反越位，单刀赴会！", check: { attrs: ["speed", "burst"], difficulty: 40, tag: "速度+爆发" },
            success: { text: "你{elementAdj}地甩开防线，单刀面对门将，冷静推射得手！", effects: { reputation: 10, goals: 1, attrs: { speed: 1 } } },
            fail: { text: "边裁举旗——越位。你懊恼地锤了下草皮。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】反越位成功！解说：「这一启动，像点着了的火药桶！」单刀破门。", effects: { reputation: 18, goals: 1, attrs: { speed: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", text: "不停球直接凌空抽射", check: { attrs: ["shooting", "power"], difficulty: 45, tag: "射门+力量" },
            success: { text: "皮球如流星划破夜空，带着灼热的弧线直挂死角！", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "凌空没吃准部位，皮球飞向看台。", effects: { stamina: -3 } },
            critical: { text: "【灵光一闪】世界波！解说嘶吼：「这脚凌空带着火焰的尾迹！」", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          }
        ]
      },
      {
        text: "角球开出，前点一片混战。你和对方中卫同时启动争顶。",
        choices: [
          { id: "A", text: "前点抢点，脚尖一捅", check: { attrs: ["positioning", "resolve"], difficulty: 38, tag: "站位+决断" },
            success: { text: "你鬼魅般出现在前点，脚尖一捅，皮球滚入远角！", effects: { reputation: 10, goals: 1, attrs: { positioning: 1 } } },
            fail: { text: "慢了半拍，皮球被后卫解围。", effects: { stamina: -3 } },
            critical: { text: "【灵光一闪】门前嗅觉！解说：「这抢点，像闻着血腥味的鲨鱼！」", effects: { reputation: 16, goals: 1, attrs: { positioning: 2 }, flags: { keySuccess: true } } }
          }
        ]
      },
      {
        text: "比赛进入尾声，你方落后一球。最后一次进攻机会，你在禁区前沿得球。",
        choices: [
          { id: "A", text: "拔脚怒射，搏一个", check: { attrs: ["shooting", "burst"], difficulty: 42, tag: "射门+爆发" },
            success: { text: "皮球带着{elementAdj}的劲道轰入球网！绝平！", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "射门被后卫用身体封堵。终场哨响，败局已定。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】读秒绝杀！解说：「起于微末，成于燎原，一脚定乾坤！」", effects: { reputation: 22, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", text: "横传给位置更好的队友", check: { attrs: ["vision", "iq"], difficulty: 35, tag: "视野+球商" },
            success: { text: "你送出一记{elementAdj}的横传，队友推射空门得手！绝平！", effects: { reputation: 8, assists: 1, attrs: { vision: 1 } } },
            fail: { text: "横传被回追的后卫破坏。", effects: { stamina: -3 } }
          }
        ]
      }
    ]
  },

  // 边锋·突破型
  LW_break: {
    desc: "过人、下底传中",
    events: [
      {
        text: "边路一打一，你拿球面对对方边后卫。他压低重心，等着你出招。",
        choices: [
          { id: "A", text: "人球分过，硬吃他", check: { attrs: ["dribble", "speed"], difficulty: 40, tag: "盘带+速度" },
            success: { text: "你{elementAdj}地一趟一加速，把对手甩在身后，杀入禁区！", effects: { reputation: 10, attrs: { dribble: 1 } } },
            fail: { text: "趟大了，球出了底线。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】变向过人！解说：「这变向，像枯枝发新芽！」杀入禁区。", effects: { reputation: 16, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", text: "下底传中找中锋", check: { attrs: ["passing", "vision"], difficulty: 36, tag: "传球+视野" },
            success: { text: "你起脚传中，皮球{elementAdj}地绕过门将，中锋头球破门！", effects: { reputation: 8, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "传中被前点解围。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "反击机会，你沿边路长途奔袭。对方两名后卫回追包夹。",
        choices: [
          { id: "A", text: "一鼓作气杀入禁区", check: { attrs: ["speed", "stamina"], difficulty: 42, tag: "速度+耐力" },
            success: { text: "你长途奔袭，{elementAdj}地摆脱包夹，小角度推射得手！", effects: { reputation: 12, goals: 1, attrs: { speed: 1 } } },
            fail: { text: "体力不支，被回追后卫破坏。", effects: { stamina: -6 } },
            critical: { text: "【灵光一闪】千里走单骑！解说：「这奔袭，像疾风掠原！」", effects: { reputation: 20, goals: 1, attrs: { speed: 2 }, flags: { keySuccess: true } } }
          }
        ]
      },
      {
        text: "禁区前沿，你内切后获得起脚空间。",
        choices: [
          { id: "A", text: "内切后起脚兜远角", check: { attrs: ["shooting", "resolve"], difficulty: 40, tag: "射门+决断" },
            success: { text: "皮球带着{elementAdj}的弧线挂入远角！", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "兜射偏出立柱。", effects: { stamina: -3 } },
            critical: { text: "【灵光一闪】招牌内切远射！解说：「这脚，像弯刀出鞘！」", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          }
        ]
      }
    ]
  },

  // 前腰·古典十号
  CAM_classic: {
    desc: "致命一传、控制节奏",
    events: [
      {
        text: "你在禁区前沿拿球，背身有后腰贴防。余光里，你看见了空当。",
        choices: [
          { id: "A", text: "一脚直塞撕开防线", check: { attrs: ["passing", "vision"], difficulty: 42, tag: "传球+视野" },
            success: { text: "皮球像一尾游鱼{elementAdj}地穿过三名后卫缝隙，前锋单刀破门！", effects: { reputation: 10, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "直塞力量小了，被断。", effects: { stamina: -3 } },
            critical: { text: "【灵光一闪】手术刀直塞！解说：「水银泻地，润物无声。」", effects: { reputation: 16, assists: 1, attrs: { passing: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", text: "控制节奏，横传转移弱侧", check: { attrs: ["vision", "rhythm"], difficulty: 35, tag: "视野+节奏" },
            success: { text: "你{elementAdj}地一记斜长传转移，弱侧空档被利用，队友传中造点！", effects: { reputation: 7, assists: 1, attrs: { vision: 1 } } },
            fail: { text: "转移被预判，断球。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "反击三打三，你中路持球推进，两翼齐飞。",
        choices: [
          { id: "A", text: "分边给高速插上的边锋", check: { attrs: ["passing", "iq"], difficulty: 38, tag: "传球+球商" },
            success: { text: "你一脚{elementAdj}的分边，边锋推射破门！", effects: { reputation: 9, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "分边时机晚了，越位。", effects: { stamina: -2 } }
          },
          { id: "B", text: "自己来，禁区前沿起脚", check: { attrs: ["shooting", "resolve"], difficulty: 44, tag: "射门+决断" },
            success: { text: "你突然起脚，皮球贴地钻入死角！", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "射门被门将扑出。", effects: { stamina: -3 } },
            critical: { text: "【灵光一闪】后插上远射！解说：「这脚，是十号位的杀招！」", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          }
        ]
      },
      {
        text: "比赛胶着，球权在你脚下。是该稳一稳，还是冒险一击？",
        choices: [
          { id: "A", text: "致命一传，赌这把", check: { attrs: ["vision", "resolve"], difficulty: 45, tag: "视野+决断" },
            success: { text: "你看见了一道常人看不见的线，一脚{elementAdj}的过顶，前锋凌空垫射入网！", effects: { reputation: 14, assists: 1, attrs: { vision: 1 }, flags: { keySuccess: true } } },
            fail: { text: "传球意图太明显，被门将出击没收。", effects: { stamina: -3 } }
          },
          { id: "B", text: "稳住，回敲重新组织", effects: { attrs: { rhythm: 1 }, stamina: 2 } }
        ]
      }
    ]
  },

  // 青训赛通用池（不绑位置，新手第一场用）
  youth: {
    desc: "青训试炼",
    events: [
      {
        text: "前场混战，球弹到你脚下。你抬头一看，禁区间隙是一道缝。",
        choices: [
          { id: "A", text: "把握机会，起脚射门", check: { attrs: ["shooting", "burst"], difficulty: 30, tag: "射门+爆发" },
            success: { text: "皮球带着{elementAdj}的劲道钻入死角！看台沸膊。", effects: { reputation: 8, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "射门偏出，你撞了下草皮。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】青训赛首球！解说：“这小子，有点东西！”", effects: { reputation: 14, goals: 1, attrs: { shooting: 2 } } }
          },
          { id: "B", text: "横传给位置更好的队友", check: { attrs: ["passing", "vision"], difficulty: 28, tag: "传球+视野" },
            success: { text: "你一记{elementAdj}的横传，队友推射空门！", effects: { reputation: 6, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "横传被回追的后卫破坏。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "对方反击，你方后场吃紧。教头在场边吼：“都给我回防！”",
        choices: [
          { id: "A", text: "回追铲断，化解危机", check: { attrs: ["tackle", "speed"], difficulty: 28, tag: "铲断+速度" },
            success: { text: "你一记干净铲断，赢得满堂喝彩。", effects: { reputation: 5, attrs: { tackle: 1 } } },
            fail: { text: "铲断失误，送给对方一个任意球。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】铁壁封堵！解说：“这铲球，干净利落！”", effects: { reputation: 10, attrs: { tackle: 2 } } }
          },
          { id: "B", text: "卡住位置，阻抬传球路线", check: { attrs: ["intercept", "positioning"], difficulty: 26, tag: "拦截+站位" },
            success: { text: "你预判到传球路线，中途截下！反击发动。", effects: { reputation: 5, attrs: { intercept: 1 } } },
            fail: { text: "判断错了方向，被对手过掉。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "比赛进入尾声，比分胶着。最后一次进攻，球权在你脚下。",
        choices: [
          { id: "A", text: "禁区外起脚，搏一个世界波", check: { attrs: ["shooting", "power"], difficulty: 36, tag: "射门+力量" },
            success: { text: "皮球带着{elementAdj}的弧线轰入球网！绝杀！", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "射门被后卫封堵，终场哨响。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】读秒绝杀！解说：“起于微末，成于燎原！”", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", text: "控制节奏，等队友跑位", check: { attrs: ["vision", "rhythm"], difficulty: 30, tag: "视野+节奏" },
            success: { text: "你冷静控球，送出一记{elementAdj}的直塞，队友破门！", effects: { reputation: 9, assists: 1, attrs: { vision: 1 } } },
            fail: { text: "犹豫间被对方拼抢断下。", effects: { stamina: -3 } }
          }
        ]
      }
    ]
  }

};
