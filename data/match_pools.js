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
          { id: "A", sit: "attack", text: "全速反越位，单刀赴会！", check: { attrs: ["speed", "burst"], difficulty: 40, tag: "速度+爆发" },
            success: { text: "你{elementAdj}地甩开防线，单刀面对门将，冷静推射得手！", effects: { reputation: 10, goals: 1, attrs: { speed: 1 } } },
            fail: { text: "边裁举旗——越位。你懊恼地锤了下草皮。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】反越位成功！解说：「这一启动，像点着了的火药桶！」单刀破门。", effects: { reputation: 18, goals: 1, attrs: { speed: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "不停球直接凌空抽射", check: { attrs: ["shooting", "power"], difficulty: 45, tag: "射门+力量" },
            success: { text: "皮球如流星划破夜空，带着灼热的弧线直挂死角！", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "凌空没吃准部位，皮球飞向看台。", effects: { stamina: -3 } },
            critical: { text: "【灵光一闪】世界波！解说嘶吼：「这脚凌空带着火焰的尾迹！」", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "背身拿球，吸引防守后分边", check: { attrs: ["passing", "iq"], difficulty: 34, tag: "传球+球商" },
            success: { text: "你背身护住球，突然分向弱侧，队友得球起脚命中！", effects: { reputation: 7, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "分边传球被对方后卫预判拦截。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "不急，先护住球观察防线空当", check: { attrs: ["dribble", "positioning"], difficulty: 32, tag: "盘带+站位" },
            success: { text: "你稳住节奏，防线露出破绽——队友心领神会插上造险！", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "你犹豫了一瞬，皮球被后卫捅走。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "先高位逼抢，掐断对手出球", check: { attrs: ["intercept", "speed"], difficulty: 30, tag: "拦截+速度" },
            success: { text: "你的逼抢迫使对方传球失误，球权回归！", effects: { reputation: 5, attrs: { intercept: 1 } } },
            fail: { text: "逼抢扑空，对方顺势推进。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "角球开出，前点一片混战。你和对方中卫同时启动争顶。",
        choices: [
          { id: "A", sit: "attack", text: "前点抢点，脚尖一捅", check: { attrs: ["positioning", "resolve"], difficulty: 38, tag: "站位+决断" },
            success: { text: "你鬼魅般出现在前点，脚尖一捅，皮球滚入远角！", effects: { reputation: 10, goals: 1, attrs: { positioning: 1 } } },
            fail: { text: "慢了半拍，皮球被后卫解围。", effects: { stamina: -3 } },
            critical: { text: "【灵光一闪】门前嗅觉！解说：「这抢点，像闻着血腥味的鲨鱼！」", effects: { reputation: 16, goals: 1, attrs: { positioning: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "旱地拔葱，暴力头槌", check: { attrs: ["heading", "balance"], difficulty: 42, tag: "头球+平衡" },
            success: { text: "你像一座山岳拔地而起，额头撞上皮球的闷响传遍全场，球砸入网窝！", effects: { reputation: 12, goals: 1, attrs: { heading: 1 } } },
            fail: { text: "起跳早了，皮球擦顶而过。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】泰山压顶！门将目送入网。", effects: { reputation: 18, goals: 1, attrs: { heading: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "头球摆渡给后点队友", check: { attrs: ["heading", "vision"], difficulty: 35, tag: "头球+视野" },
            success: { text: "你头球摆渡恰到好处，后点队友轻松推射得手！", effects: { reputation: 8, assists: 1, attrs: { heading: 1 } } },
            fail: { text: "摆渡力量大了些，队友没能够到。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "卡住身位，为队友做嫁衣", check: { attrs: ["strength", "positioning"], difficulty: 32, tag: "对抗+站位" },
            success: { text: "你像钉子一样卡住两名后卫，队友无人盯防头球破门！", effects: { reputation: 6, attrs: { strength: 1 } } },
            fail: { text: "你被对方挤开了位置。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "回撤防备对方快反", check: { attrs: ["speed", "intercept"], difficulty: 30, tag: "速度+拦截" },
            success: { text: "角球被解围后对方果然快反，你提前回追将球截下！", effects: { reputation: 6, attrs: { speed: 1 } } },
            fail: { text: "回追慢了一步，对方反击造成险情。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "比赛进入尾声，你方落后一球。最后一次进攻机会，你在禁区前沿得球。",
        choices: [
          { id: "A", sit: "attack", text: "拔脚怒射，搏一个", check: { attrs: ["shooting", "burst"], difficulty: 42, tag: "射门+爆发" },
            success: { text: "皮球带着{elementAdj}的劲道轰入球网！绝平！", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "射门被后卫用身体封堵。终场哨响，败局已定。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】读秒绝杀！解说：「起于微末，成于燎原，一脚定乾坤！」", effects: { reputation: 22, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "balanced", text: "横传给位置更好的队友", check: { attrs: ["vision", "iq"], difficulty: 35, tag: "视野+球商" },
            success: { text: "你送出一记{elementAdj}的横传，队友推射空门得手！绝平！", effects: { reputation: 8, assists: 1, attrs: { vision: 1 } } },
            fail: { text: "横传被回追的后卫破坏。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "attack", text: "带球突入禁区，吸引防守后起脚", check: { attrs: ["dribble", "resolve"], difficulty: 44, tag: "盘带+决断" },
            success: { text: "你连过两人，禁区内起脚命中！绝平！", effects: { reputation: 13, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "带球被围抢断下。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】单骑闯关，撕碎整条防线！", effects: { reputation: 20, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "D", sit: "balanced", text: "回敲重新组织，再找机会", check: { attrs: ["passing", "positioning"], difficulty: 30, tag: "传球+站位" },
            success: { text: "你冷静回敲，队友转移找到防线缺口，传中造险！", effects: { reputation: 5, attrs: { passing: 1 } } },
            fail: { text: "回敲被拦截，浪费了时间。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "先回防防止再丢球，保住翻盘火种", check: { attrs: ["tackle", "positioning"], difficulty: 28, tag: "铲断+站位" },
            success: { text: "你回追完成关键封堵，保住了最后进攻的火种！", effects: { reputation: 5, attrs: { tackle: 1 } } },
            fail: { text: "回防稍慢，对方一脚远射偏出。", effects: { stamina: -4 } }
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
          { id: "A", sit: "attack", text: "人球分过，硬吃他", check: { attrs: ["dribble", "speed"], difficulty: 40, tag: "盘带+速度" },
            success: { text: "你{elementAdj}地一趟一加速，把对手甩在身后，杀入禁区！", effects: { reputation: 10, attrs: { dribble: 1 } } },
            fail: { text: "趟大了，球出了底线。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】变向过人！解说：「这变向，像枯枝发新芽！」杀入禁区。", effects: { reputation: 16, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "balanced", text: "下底传中找中锋", check: { attrs: ["passing", "vision"], difficulty: 36, tag: "传球+视野" },
            success: { text: "你起脚传中，皮球{elementAdj}地绕过门将，中锋头球破门！", effects: { reputation: 8, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "传中被前点解围。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "attack", text: "内切一步，直接起脚远射", check: { attrs: ["shooting", "burst"], difficulty: 42, tag: "射门+爆发" },
            success: { text: "你内切后拔脚怒射，皮球直挂远角！", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "内切射门被后卫封堵。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】招牌内切远射！解说：「这脚，像弯刀出鞘！」", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "D", sit: "balanced", text: "回敲队友，转移进攻方向", check: { attrs: ["passing", "positioning"], difficulty: 30, tag: "传球+站位" },
            success: { text: "你回敲后迅速前插，队友转移弱侧打出配合！", effects: { reputation: 5, attrs: { passing: 1 } } },
            fail: { text: "回敲力量小了，险些被断。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "先回追，防止对方边路突击", check: { attrs: ["tackle", "stamina"], difficulty: 28, tag: "铲断+耐力" },
            success: { text: "你回追及时，一记干净铲断化解对方边路攻势！", effects: { reputation: 5, attrs: { tackle: 1 } } },
            fail: { text: "回追中体力不支，被对方突破。", effects: { stamina: -5 } }
          }
        ]
      },
      {
        text: "反击机会，你沿边路长途奔袭。对方两名后卫回追包夹。",
        choices: [
          { id: "A", sit: "attack", text: "一鼓作气杀入禁区", check: { attrs: ["speed", "stamina"], difficulty: 42, tag: "速度+耐力" },
            success: { text: "你长途奔袭，{elementAdj}地摆脱包夹，小角度推射得手！", effects: { reputation: 12, goals: 1, attrs: { speed: 1 } } },
            fail: { text: "体力不支，被回追后卫破坏。", effects: { stamina: -6 } },
            critical: { text: "【灵光一闪】千里走单骑！解说：「这奔袭，像疾风掠原！」", effects: { reputation: 20, goals: 1, attrs: { speed: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "内切后起脚兜远角", check: { attrs: ["shooting", "resolve"], difficulty: 43, tag: "射门+决断" },
            success: { text: "你内切后兜出一记弧线，皮球挂入远角！", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "兜射偏出立柱。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】奔袭内切一条龙！", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "下底传中找包抄队友", check: { attrs: ["passing", "vision"], difficulty: 36, tag: "传球+视野" },
            success: { text: "你吸引包夹后低平球扫到门前，队友包抄破门！", effects: { reputation: 8, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "传中被回追的后卫挡出。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "balanced", text: "降速护球，等队友接应", check: { attrs: ["dribble", "positioning"], difficulty: 31, tag: "盘带+站位" },
            success: { text: "你护住球权，队友跟进接应，进攻重新组织。", effects: { reputation: 4, attrs: { dribble: 1 } } },
            fail: { text: "护球中被对方捅掉。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "回传中场，防止反击被打回头", check: { attrs: ["passing", "iq"], difficulty: 28, tag: "传球+球商" },
            success: { text: "你冷静回传，球队稳住阵脚，避免被打反击。", effects: { reputation: 4, attrs: { passing: 1 } } },
            fail: { text: "回传力量轻了，险些被断。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "禁区前沿，你内切后获得起脚空间。",
        choices: [
          { id: "A", sit: "attack", text: "内切后起脚兜远角", check: { attrs: ["shooting", "resolve"], difficulty: 40, tag: "射门+决断" },
            success: { text: "皮球带着{elementAdj}的弧线挂入远角！", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "兜射偏出立柱。", effects: { stamina: -3 } },
            critical: { text: "【灵光一闪】招牌内切远射！解说：「这脚，像弯刀出鞘！」", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "继续突破，杀入禁区", check: { attrs: ["dribble", "burst"], difficulty: 43, tag: "盘带+爆发" },
            success: { text: "你内切后再加速，抹过补防的后卫推射入网！", effects: { reputation: 12, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "突破被补防的后卫拦截。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】连过三人，如入无人之境！", effects: { reputation: 19, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "直塞给插上的队友", check: { attrs: ["passing", "vision"], difficulty: 35, tag: "传球+视野" },
            success: { text: "你吸引防守后直塞，队友插上单刀破门！", effects: { reputation: 8, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "直塞被中卫拦截。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "横传控制节奏", check: { attrs: ["vision", "positioning"], difficulty: 30, tag: "视野+站位" },
            success: { text: "你横传转移，球队重新调度，防线被扯动。", effects: { reputation: 4, attrs: { vision: 1 } } },
            fail: { text: "横传被对方预判。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "回撤参与防守", check: { attrs: ["tackle", "positioning"], difficulty: 28, tag: "铲断+站位" },
            success: { text: "你积极回撤，协助边后卫完成一次关键防守。", effects: { reputation: 5, attrs: { tackle: 1 } } },
            fail: { text: "回撤稍慢，防守到位时球已转移。", effects: { stamina: -4 } }
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
          { id: "A", sit: "attack", text: "一脚直塞撕开防线", check: { attrs: ["passing", "vision"], difficulty: 42, tag: "传球+视野" },
            success: { text: "皮球像一尾游鱼{elementAdj}地穿过三名后卫缝隙，前锋单刀破门！", effects: { reputation: 10, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "直塞力量小了，被断。", effects: { stamina: -3 } },
            critical: { text: "【灵光一闪】手术刀直塞！解说：「水银泻地，润物无声。」", effects: { reputation: 16, assists: 1, attrs: { passing: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "balanced", text: "控制节奏，横传转移弱侧", check: { attrs: ["vision", "rhythm"], difficulty: 35, tag: "视野+节奏" },
            success: { text: "你{elementAdj}地一记斜长传转移，弱侧空档被利用，队友传中造点！", effects: { reputation: 7, assists: 1, attrs: { vision: 1 } } },
            fail: { text: "转移被预判，断球。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "attack", text: "转身直接起脚远射", check: { attrs: ["shooting", "power"], difficulty: 44, tag: "射门+力量" },
            success: { text: "你转身摆脱贴防，拔脚怒射，皮球轰入球门！", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "转身射门被后卫封堵。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】十号位的暴力美学！", effects: { reputation: 19, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "D", sit: "balanced", text: "带球推进，吸引防守再分球", check: { attrs: ["dribble", "resolve"], difficulty: 37, tag: "盘带+决断" },
            success: { text: "你带球推进吸引两人包夹，分球后队友获得空位！", effects: { reputation: 6, attrs: { dribble: 1 } } },
            fail: { text: "带球被后腰从身后捅掉。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "defense", text: "回传稳住，先化解对方逼抢", check: { attrs: ["passing", "positioning"], difficulty: 28, tag: "传球+站位" },
            success: { text: "你冷静回传化解逼抢，球队重新掌控节奏。", effects: { reputation: 4, attrs: { passing: 1 } } },
            fail: { text: "回传险些被对方前锋拦截。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "反击三打三，你中路持球推进，两翼齐飞。",
        choices: [
          { id: "A", sit: "balanced", text: "分边给高速插上的边锋", check: { attrs: ["passing", "iq"], difficulty: 38, tag: "传球+球商" },
            success: { text: "你一脚{elementAdj}的分边，边锋推射破门！", effects: { reputation: 9, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "分边时机晚了，越位。", effects: { stamina: -2 } }
          },
          { id: "B", sit: "attack", text: "自己来，禁区前沿起脚", check: { attrs: ["shooting", "resolve"], difficulty: 44, tag: "射门+决断" },
            success: { text: "你突然起脚，皮球贴地钻入死角！", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "射门被门将扑出。", effects: { stamina: -3 } },
            critical: { text: "【灵光一闪】后插上远射！解说：「这脚，是十号位的杀招！」", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "attack", text: "直塞找前锋，打穿中路", check: { attrs: ["passing", "vision"], difficulty: 41, tag: "传球+视野" },
            success: { text: "你直塞打穿中路，前锋单刀推射得手！", effects: { reputation: 10, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "直塞被中卫伸腿挡出。", effects: { stamina: -3 } },
            critical: { text: "【灵光一闪】撕裂防线的一传！", effects: { reputation: 16, assists: 1, attrs: { passing: 2 }, flags: { keySuccess: true } } }
          },
          { id: "D", sit: "balanced", text: "降速控球，等对方防线落位再打", check: { attrs: ["dribble", "positioning"], difficulty: 32, tag: "盘带+站位" },
            success: { text: "你护住球权，反击转为阵地战，球队稳住攻势。", effects: { reputation: 4, attrs: { dribble: 1 } } },
            fail: { text: "降速后被对方回追破坏。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "回传后卫，防止反击被打回头", check: { attrs: ["passing", "iq"], difficulty: 28, tag: "传球+球商" },
            success: { text: "你回传稳住节奏，避免了一次危险的球权丢失。", effects: { reputation: 4, attrs: { passing: 1 } } },
            fail: { text: "回传力量轻了，险些被断。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "比赛胶着，球权在你脚下。是该稳一稳，还是冒险一击？",
        choices: [
          { id: "A", sit: "attack", text: "致命一传，赌这把", check: { attrs: ["vision", "resolve"], difficulty: 45, tag: "视野+决断" },
            success: { text: "你看见了一道常人看不见的线，一脚{elementAdj}的过顶，前锋凌空垫射入网！", effects: { reputation: 14, assists: 1, attrs: { vision: 1 }, flags: { keySuccess: true } } },
            fail: { text: "传球意图太明显，被门将出击没收。", effects: { stamina: -3 } }
          },
          { id: "B", sit: "balanced", text: "稳住，回敲重新组织", effects: { attrs: { rhythm: 1 }, stamina: 2 } },
          { id: "C", sit: "attack", text: "禁区前沿直接起脚", check: { attrs: ["shooting", "power"], difficulty: 43, tag: "射门+力量" },
            success: { text: "你出其不意的远射，皮球应声入网！", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "远射高出横梁。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】石破天惊的远射！", effects: { reputation: 19, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "D", sit: "balanced", text: "传给队友后前插，寻求二过一", check: { attrs: ["passing", "positioning"], difficulty: 34, tag: "传球+站位" },
            success: { text: "你传球后迅速前插，二过一打穿防线，创造杀机！", effects: { reputation: 6, attrs: { passing: 1 } } },
            fail: { text: "前插跑位被对方识破。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "护球消耗时间，保住平局", check: { attrs: ["dribble", "rhythm"], difficulty: 30, tag: "盘带+节奏" },
            success: { text: "你护球消耗时间，把平局保持到最后。", effects: { reputation: 3, attrs: { rhythm: 1 } } },
            fail: { text: "护球时被对方抢下，险些被打反击。", effects: { stamina: -4 } }
          }
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
          { id: "A", sit: "attack", text: "把握机会，起脚射门", check: { attrs: ["shooting", "burst"], difficulty: 30, tag: "射门+爆发" },
            success: { text: "皮球带着{elementAdj}的劲道钻入死角！看台沸腾。", effects: { reputation: 8, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "射门偏出，你撞了下草皮。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】青训赛首球！解说：“这小子，有点东西！”", effects: { reputation: 14, goals: 1, attrs: { shooting: 2 } } }
          },
          { id: "B", sit: "balanced", text: "横传给位置更好的队友", check: { attrs: ["passing", "vision"], difficulty: 28, tag: "传球+视野" },
            success: { text: "你一记{elementAdj}的横传，队友推射空门！", effects: { reputation: 6, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "横传被回追的后卫破坏。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "attack", text: "带球突入禁区，再寻机会", check: { attrs: ["dribble", "resolve"], difficulty: 33, tag: "盘带+决断" },
            success: { text: "你带球抹入禁区，晃开角度推射得手！", effects: { reputation: 9, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "带球被后卫伸腿捅掉。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】连过两人，冷静推射！", effects: { reputation: 15, goals: 1, attrs: { dribble: 2 } } }
          },
          { id: "D", sit: "balanced", text: "回敲队友，重新组织", check: { attrs: ["passing", "positioning"], difficulty: 25, tag: "传球+站位" },
            success: { text: "你回敲后前插，队友直塞找回你，配合打出威胁！", effects: { reputation: 4, attrs: { passing: 1 } } },
            fail: { text: "回敲被对方预判拦截。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "先回防，防止对方打反击", check: { attrs: ["tackle", "speed"], difficulty: 25, tag: "铲断+速度" },
            success: { text: "你提前回追，化解了对方一次快速反击！", effects: { reputation: 4, attrs: { tackle: 1 } } },
            fail: { text: "回防慢了一步，对方反击造险。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "对方反击，你方后场吃紧。教头在场边吼：“都给我回防！”",
        choices: [
          { id: "A", sit: "defense", text: "回追铲断，化解危机", check: { attrs: ["tackle", "speed"], difficulty: 28, tag: "铲断+速度" },
            success: { text: "你一记干净铲断，赢得满堂喝彩。", effects: { reputation: 5, attrs: { tackle: 1 } } },
            fail: { text: "铲断失误，送给对方一个任意球。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】铁壁封堵！解说：“这铲球，干净利落！”", effects: { reputation: 10, attrs: { tackle: 2 } } }
          },
          { id: "B", sit: "defense", text: "卡住位置，阻断传球路线", check: { attrs: ["intercept", "positioning"], difficulty: 26, tag: "拦截+站位" },
            success: { text: "你预判到传球路线，中途截下！反击发动。", effects: { reputation: 5, attrs: { intercept: 1 } } },
            fail: { text: "判断错了方向，被对手过掉。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "balanced", text: "断球后迅速长传发动反击", check: { attrs: ["passing", "vision"], difficulty: 30, tag: "传球+视野" },
            success: { text: "你断球后一脚长传找到前场队友，反击打出威胁！", effects: { reputation: 6, attrs: { passing: 1 } } },
            fail: { text: "长传力量大了，直接出了边线。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "defense", text: "退守禁区，不轻易出脚", check: { attrs: ["positioning", "balance"], difficulty: 24, tag: "站位+平衡" },
            success: { text: "你且战且退，卡住身位，对方只能回传。", effects: { reputation: 4, attrs: { positioning: 1 } } },
            fail: { text: "退守中被对方晃开角度。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "balanced", text: "战术犯规，打断对方节奏", check: { attrs: ["strength", "resolve"], difficulty: 27, tag: "对抗+决断" },
            success: { text: "你一次合理的战术犯规，打断了对方反击节奏。", effects: { reputation: 3, attrs: { strength: 1 } } },
            fail: { text: "犯规动作大了，吃到黄牌。", effects: { stamina: -3, reputation: -2 } }
          }
        ]
      },
      {
        text: "比赛进入尾声，比分胶着。最后一次进攻，球权在你脚下。",
        choices: [
          { id: "A", sit: "attack", text: "禁区外起脚，搏一个世界波", check: { attrs: ["shooting", "power"], difficulty: 36, tag: "射门+力量" },
            success: { text: "皮球带着{elementAdj}的弧线轰入球网！绝杀！", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "射门被后卫封堵，终场哨响。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】读秒绝杀！解说：“起于微末，成于燎原！”", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "balanced", text: "控制节奏，等队友跑位", check: { attrs: ["vision", "rhythm"], difficulty: 30, tag: "视野+节奏" },
            success: { text: "你冷静控球，送出一记{elementAdj}的直塞，队友破门！", effects: { reputation: 9, assists: 1, attrs: { vision: 1 } } },
            fail: { text: "犹豫间被对方拼抢断下。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "attack", text: "带球突破，撕开防线", check: { attrs: ["dribble", "burst"], difficulty: 38, tag: "盘带+爆发" },
            success: { text: "你带球强突，晃过门将推射空门！绝杀！", effects: { reputation: 13, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "突破被回追的后卫破坏。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】单骑闯关，一锤定音！", effects: { reputation: 21, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "D", sit: "balanced", text: "横传队友，寻找更好机会", check: { attrs: ["passing", "vision"], difficulty: 28, tag: "传球+视野" },
            success: { text: "你横传转移，队友起脚造险，角球！", effects: { reputation: 5, attrs: { passing: 1 } } },
            fail: { text: "横传被对方拦截。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "回传控节奏，至少不输", check: { attrs: ["passing", "positioning"], difficulty: 24, tag: "传球+站位" },
            success: { text: "你回传稳住节奏，把平局保持到终场。", effects: { reputation: 3, attrs: { passing: 1 } } },
            fail: { text: "回传险些被断，好在门将出击化解。", effects: { stamina: -4 } }
          }
        ]
      }
    ]
  }

};

/* ============================================================
   增强版比赛（设计稿第五章）：队友事件池 + 关键时刻池
   - teammate: 通用队友事件（纯演出，无选项，auto 效果自动结算）
   - key: 关键时刻（按局面 leading/level/trailing 抽取，权重×2）
   ============================================================ */
window.MATCH_EXTRA = {

  // 通用队友事件池（不绑位置，纯演出）
  teammate: [
    {
      text: "边路的小林拿球，一个假动作晃开防守，起脚传中！皮球划过门前——",
      auto: { threat: 1 },
      result: "【队友支援】小林的传中制造杀机，我方威胁值+1。"
    },
    {
      text: "对方发动快速反击，老周拍马赶到，一记干净利落的滑铲将球断下！",
      auto: { oppThreat: -1 },
      result: "【队友拦截】老周化解了对方攻势，对方威胁值-1。"
    },
    {
      text: "阿贵在前场不知疲倦地奔跑拉扯，硬生生拽开了对方防线的空当！",
      auto: { difficultyMod: -5 },
      result: "【队友拉扯】阿贵扯出空当，你下次检定难度-5。"
    },
    {
      text: "小张后场玩火，停球失误被对方断下，形势瞬间危急！",
      auto: { oppThreat: 1 },
      result: "【队友失误】小张送礼，对方威胁值+1。"
    },
    {
      text: "老周一脚长传找到你，场边他的呐喊清晰可闻：「上！别怂！」",
      auto: { threat: 1, stamina: 5 },
      result: "【队友士气】老哥的支援让你士气大振，威胁值+1，体力+5。"
    }
  ],

  // 关键时刻池（按局面抽取，权重×2）
  key: {
    k1: {
      leading: {
        text: "比分领先，对方全线压上试图扳平，后场露出大片空当——",
        choices: [
          { id: "A", text: "前插反击，扩大领先", check: { attrs: ["speed", "burst"], difficulty: 40, tag: "速度+爆发" },
            success: { text: "你抓住空当高速前插，单刀推射扩大领先！", effects: { reputation: 10, goals: 1, attrs: { speed: 1 } } },
            fail: { text: "反击被回追后卫破坏，险些被打了个回头。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】反击一击致命！解说：「这速度，像离弦之箭！」", effects: { reputation: 16, goals: 1, attrs: { speed: 2 } } } },
          { id: "B", text: "控制节奏，消耗时间", check: { attrs: ["vision", "rhythm"], difficulty: 32, tag: "视野+节奏" },
            success: { text: "你冷静控球，把节奏牢牢握在脚下。", effects: { reputation: 5, attrs: { rhythm: 1 } } },
            fail: { text: "控球被断，对方顺势发动攻势。", effects: { stamina: -3 } } }
        ]
      },
      level: {
        text: "比分胶着，每一次球权都可能决定胜负，中场绞杀愈发激烈——",
        choices: [
          { id: "A", text: "主动要球，撕开防线", check: { attrs: ["passing", "vision"], difficulty: 42, tag: "传球+视野" },
            success: { text: "你送出关键一传，队友破门打破僵局！", effects: { reputation: 10, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "传球被预判，球权易手。", effects: { stamina: -3 } },
            critical: { text: "【灵光一闪】致命一传，石破天惊！", effects: { reputation: 16, assists: 1, attrs: { passing: 2 } } } },
          { id: "B", text: "自己带球突入禁区", check: { attrs: ["dribble", "resolve"], difficulty: 44, tag: "盘带+决断" },
            success: { text: "你连过两人，禁区内起脚命中！", effects: { reputation: 12, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "带球被围抢断下。", effects: { stamina: -4 } } }
        ]
      },
      trailing: {
        text: "比分落后，时间一分一秒流逝，必须做点什么——",
        choices: [
          { id: "A", text: "全力压上，搏命进攻", check: { attrs: ["shooting", "burst"], difficulty: 45, tag: "射门+爆发" },
            success: { text: "你抓住稍纵即逝的机会，起脚扳平比分！", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "射门偏出，浪费了宝贵的时间。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】绝境爆发，一锤定音！", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 } } } },
          { id: "B", text: "稳住阵脚，寻找更好的机会", check: { attrs: ["iq", "rhythm"], difficulty: 35, tag: "球商+节奏" },
            success: { text: "你冷静组织，为队友创造出绝佳机会！", effects: { reputation: 8, assists: 1, attrs: { iq: 1 } } },
            fail: { text: "组织被对方识破，无功而返。", effects: { stamina: -3 } } }
        ]
      }
    },
    k2: {
      leading: {
        text: "领先优势在手，对方门将都冲到了前场参与进攻，最后一搏——",
        choices: [
          { id: "A", text: "吊射空门，锁定胜局", check: { attrs: ["shooting", "iq"], difficulty: 42, tag: "射门+球商" },
            success: { text: "你一脚超远吊射，皮球坠入空门！", effects: { reputation: 14, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "吊射力量不足，被回追的后卫解围。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】半场吊射，技惊四座！", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 } } } },
          { id: "B", text: "回防稳住，保住胜果", check: { attrs: ["positioning", "resolve"], difficulty: 30, tag: "站位+决断" },
            success: { text: "你回防到位，协助队友守住胜果。", effects: { reputation: 6, attrs: { positioning: 1 } } },
            fail: { text: "回防稍慢，对方制造了一次险情。", effects: { stamina: -3 } } }
        ]
      },
      level: {
        text: "平局僵持到最后一刻，体能接近极限，谁先犯错谁就输——",
        choices: [
          { id: "A", text: "咬牙冲刺，最后一击", check: { attrs: ["burst", "resolve"], difficulty: 44, tag: "爆发+决断" },
            success: { text: "你榨干最后一丝力气，完成致命一击！", effects: { reputation: 12, goals: 1, attrs: { burst: 1 } } },
            fail: { text: "体力透支，动作变形，射门偏出。", effects: { stamina: -6 } },
            critical: { text: "【灵光一闪】读秒绝杀！全场沸腾！", effects: { reputation: 18, goals: 1, attrs: { burst: 2 } } } },
          { id: "B", text: "保存体力，拖入加时", check: { attrs: ["stamina", "iq"], difficulty: 30, tag: "耐力+球商" },
            success: { text: "你合理分配体力，把比赛拖入加时。", effects: { reputation: 4, stamina: 5, attrs: { stamina: 1 } } },
            fail: { text: "节奏被对方掌控，险些被绝杀。", effects: { stamina: -3 } } }
        ]
      },
      trailing: {
        text: "落后的局面下，对方反击如潮水般涌来，是搏命还是止损——",
        choices: [
          { id: "A", text: "全线压上，最后一搏", check: { attrs: ["shooting", "power"], difficulty: 46, tag: "射门+力量" },
            success: { text: "乱战中你抢射破门，保留翻盘希望！", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "压上后防线空虚，对方再下一城。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】绝境中的惊天逆转序幕！", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 } } } },
          { id: "B", text: "回防防止再丢球", effects: { stamina: 5 } }
        ]
      }
    }
  }
};
