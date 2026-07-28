/* data/match_pools.js — 比赛事件池，按「位置_踢法」分类
 * 每场比赛从对应池中随机抽 3 个事件，玩家逐个选择+检定，累计成功数决定胜负
 * 文本中 {elementAdj} 由当前灵根替换演出风格
 * v2.0 扩充版：新增 ST_pivot 池，各池扩充至 5-7 事件，文本全面润色
 */
window.MATCH_POOLS = {

  // 中锋·冲击型（重排：每事件5选项=火木水土金各一）
  ST_impact: {
    desc: "反越位、单刀、暴力抽射",
    events: [
      {
        text: "中场一记过顶长传。你启动的瞬间，大腿肌肉像被电流贯穿，草腥味灌进鼻腔。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "不停球，直接凌空抽射", check: { attrs: ["shooting", "power"], difficulty: 39, tag: "射门+力量" },
            success: { text: "脚背吃准了部位。球带着灼热的弧线，直挂死角。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "凌空没吃准。脚背抽疼，球飞向看台第三排。", effects: { stamina: -3 } },
            critical: { text: "【灵光一闪】世界波。球带着{elementAdj}的尾迹砸进网窝，网绳还在颤。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "全速反越位，单刀赴会", check: { attrs: ["speed", "burst"], difficulty: 34, tag: "速度+爆发" },
            success: { text: "你{elementAdj}地甩开防线。单刀。门将出击，你推射远角。球进了。", effects: { reputation: 10, goals: 1, attrs: { speed: 1 } } },
            fail: { text: "边裁举旗。越位。你弯着腰喘气，鞋钉陷进泥里。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】反越位成功。你像一枚被弹射出去的钉子，单刀破门。", effects: { reputation: 18, goals: 1, attrs: { speed: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "背身拿球，吸引防守后分边", check: { attrs: ["passing", "iq"], difficulty: 28, tag: "传球+球商" },
            success: { text: "你背身护住球，突然分向弱侧。队友得球起脚，命中。", effects: { reputation: 7, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "分边的传球被预判了。对方后卫伸脚一挡。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "卡住位置，护球观察空当", check: { attrs: ["positioning", "balance"], difficulty: 26, tag: "站位+平衡" },
            success: { text: "你卡住位置，把后卫挡在身后。防线露出破绽，队友插上造险。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "你被挤开了。后背撞在广告牌上，铁皮冰凉。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "丢球就地反抢，掐断出球", check: { attrs: ["tackle", "intercept"], difficulty: 24, tag: "铲断+拦截" },
            success: { text: "你的反抢让对手慌了。传球失误，球权回归。肺部在灼烧。", effects: { reputation: 5, attrs: { tackle: 1 } } },
            fail: { text: "反抢扑空。对方顺势推进，你只能看着他们的背影。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "角球开出。前点一片混战，肘部、肩膀、后脑勺。你和对方中卫同时起跳。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "attack", text: "旱地拔葱，暴力头槌", check: { attrs: ["heading", "balance"], difficulty: 36, tag: "头球+平衡" },
            success: { text: "你拔地而起。额头撞上皮球的闷响。球砸入网窝。", effects: { reputation: 12, goals: 1, attrs: { heading: 1 } } },
            fail: { text: "起跳早了。皮球擦着发顶飞过，你落地时膝盖一阵钝痛。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】泰山压顶。门将目送皮球入网，连手都没伸。", effects: { reputation: 18, goals: 1, attrs: { heading: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "落地顺势一脚抽射", check: { attrs: ["shooting", "burst"], difficulty: 37, tag: "射门+爆发" },
            success: { text: "你落地不停球，顺势抽射。球从人缝里钻入网窝。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "落地没站稳。射门打飞了。你揉了揉脚踝。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "balanced", text: "头球摆渡给后点队友", check: { attrs: ["passing", "vision"], difficulty: 29, tag: "传球+视野" },
            success: { text: "你头球摆渡。力量弧度刚好。后点队友推射得手。", effects: { reputation: 8, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "摆渡力量大了。队友伸脚没够到。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "attack", text: "前插冲刺，抢在后卫身前捅射", check: { attrs: ["speed", "resolve"], difficulty: 32, tag: "速度+决断" },
            success: { text: "你突然前插，抢在后卫身前。脚尖一捅，皮球滚入远角。", effects: { reputation: 10, goals: 1, attrs: { speed: 1 } } },
            fail: { text: "前插慢了一步。皮球被后卫大脚解围。", effects: { stamina: -3 } },
            critical: { text: "【灵光一闪】你闪电前插，抢在所有人身前捅射。球进了。", effects: { reputation: 16, goals: 1, attrs: { speed: 2 }, flags: { keySuccess: true } } }
          },
          { id: "E", sit: "defense", text: "回撤，防备对方快反", check: { attrs: ["intercept", "speed"], difficulty: 24, tag: "拦截+速度" },
            success: { text: "角球被解围后对方快反。你提前回追，将球截下。", effects: { reputation: 6, attrs: { intercept: 1 } } },
            fail: { text: "回追慢了一步。对方反击造成险情。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "比赛进入尾声。你方落后一球。最后一次进攻机会，你在禁区前沿得球。汗水模糊了视线。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "拔脚怒射，搏一个", check: { attrs: ["shooting", "burst"], difficulty: 36, tag: "射门+爆发" },
            success: { text: "皮球带着{elementAdj}的劲道轰入球网。绝平。你跪在草皮上。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "射门被后卫用身体封堵。闷响。终场哨响。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】读秒绝杀。球进了。场边有人把外套扔上了天。", effects: { reputation: 22, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "带球突入禁区再起脚", check: { attrs: ["dribble", "resolve"], difficulty: 38, tag: "盘带+决断" },
            success: { text: "你连过两人。禁区内起脚。球进了。绝平。", effects: { reputation: 13, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "带球被围抢断下。三个人。你被挤在中间。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】单骑闯关。你撕碎了整条防线。球进了。所有人都站起来了。", effects: { reputation: 20, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "横传给位置更好的队友", check: { attrs: ["vision", "iq"], difficulty: 29, tag: "视野+球商" },
            success: { text: "你送出一记横传。队友推射空门得手。绝平。", effects: { reputation: 8, assists: 1, attrs: { vision: 1 } } },
            fail: { text: "横传被回追的后卫破坏。你听见了终场哨。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "卡住位置，护球等队友插上", check: { attrs: ["positioning", "strength"], difficulty: 26, tag: "站位+对抗" },
            success: { text: "你卡住位置。队友插上，你分球。还有机会。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "你被挤开。球权丢了。时间又少了几秒。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "先回防防止再丢球，保住火种", check: { attrs: ["tackle", "positioning"], difficulty: 22, tag: "铲断+站位" },
            success: { text: "你回追完成关键封堵。手掌擦破了皮。但火种还在。", effects: { reputation: 5, attrs: { tackle: 1 } } },
            fail: { text: "回防稍慢。对方一脚远射偏出。你喘了很久。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "对方反击。皮球打穿了整条防线，对方前锋单刀直入。你是距离最近的回追者。风灌进耳朵。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "全速回追，背后滑铲", check: { attrs: ["tackle", "speed"], difficulty: 32, tag: "铲断+速度" },
            success: { text: "你{elementAdj}地拍马赶到。一记干净的滑铲，球捅出底线。", effects: { reputation: 8, attrs: { tackle: 1 } } },
            fail: { text: "回追慢了一步。滑铲落空。对方晃过门将，得分。", effects: { stamina: -6 } },
            critical: { text: "【灵光一闪】铁壁回追。你的滑铲把球和人一起留在了底线外。", effects: { reputation: 14, attrs: { tackle: 2, speed: 1 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "defense", text: "拼命回追，用速度缠住他", check: { attrs: ["speed", "stamina"], difficulty: 30, tag: "速度+耐力" },
            success: { text: "你咬牙回追，死死缠住他。他甩不开你，只能减速。回追后卫赶到了。", effects: { reputation: 7, attrs: { speed: 1 } } },
            fail: { text: "你追了，但腿灌了铅。他一步抹过你。", effects: { stamina: -6 } }
          },
          { id: "C", sit: "balanced", text: "断球后直接长传发动反击", check: { attrs: ["passing", "vision"], difficulty: 27, tag: "传球+视野" },
            success: { text: "你断球后不停球，直接长传找前场。队友险些单刀。", effects: { reputation: 7, attrs: { passing: 1 } } },
            fail: { text: "断球后长传力量大了。球直接出了边线。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "defense", text: "卡住身位，封堵射门角度", check: { attrs: ["positioning", "balance"], difficulty: 28, tag: "站位+平衡" },
            success: { text: "你边退边卡住身位。对方被迫走外线，射门偏出。", effects: { reputation: 6, attrs: { positioning: 1 } } },
            fail: { text: "对方一个变向，你重心丢了。他推射得手。", effects: { stamina: -5 } }
          },
          { id: "E", sit: "defense", text: "赌一把，连人带球一起拦下", check: { attrs: ["resolve", "power"], difficulty: 33, tag: "决断+力量" },
            success: { text: "你豁出去了。一个肩撞把人球一起拦下。哨响了，但球权是你的。", effects: { reputation: 6, attrs: { resolve: 1 } } },
            fail: { text: "你扑得太凶。对方一晃，你摔在草皮上。", effects: { stamina: -6 } }
          }
        ]
      },
      {
        text: "反击。苏雯的直塞像一把手术刀，切开了整条防线。你高速前插，风把球衣吹得猎猎响。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "不停球，直接推射远角", check: { attrs: ["shooting", "speed"], difficulty: 36, tag: "射门+速度" },
            success: { text: "你{elementAdj}地迎球推射。球贴着草皮滚入远角。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "推射太正。门将伸腿挡出。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】单刀。你甚至没看门将，推射远角。球进了。苏雯在中场举了下拳头。", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "晃过门将，推空门", check: { attrs: ["dribble", "resolve"], difficulty: 38, tag: "盘带+决断" },
            success: { text: "你晃过门将。空门。推射。球滚进去。", effects: { reputation: 12, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "晃门将的时候球趟大了。你整个人摔了出去。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】你晃过门将，又晃过了回追的后卫。空门。你把球捡起来。", effects: { reputation: 19, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "横传给跟进的队友", check: { attrs: ["passing", "vision"], difficulty: 28, tag: "传球+视野" },
            success: { text: "你横传。队友跟进推射得手。他跑过来拍你的后脑勺。", effects: { reputation: 7, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "横传力量小了。对方后卫伸脚一挡。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "卡住回追后卫，护球等机会", check: { attrs: ["positioning", "balance"], difficulty: 25, tag: "站位+平衡" },
            success: { text: "你用身体卡住后卫。空间出来了，你从容分球。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "护球时被对方从身后捅掉。你转了个圈。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "回传稳住，卡断反抢线路", check: { attrs: ["intercept", "iq"], difficulty: 22, tag: "拦截+球商" },
            success: { text: "你回传稳住阵脚，顺手卡断了对方反抢的线路。", effects: { reputation: 4, attrs: { intercept: 1 } } },
            fail: { text: "回传力量轻了。对方前锋差点断球。你后颈发凉。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "禁区内混战。球弹来弹去，打在腿上、胸口上、门柱上。然后，它弹到了你脚下。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "不等了，直接起脚", check: { attrs: ["shooting", "burst"], difficulty: 34, tag: "射门+爆发" },
            success: { text: "你{elementAdj}地起脚。球从人缝里钻过去，进了。", effects: { reputation: 10, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "起脚太急，球打在对方后卫腿上弹回来。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】混战中你一脚抽射，球从三个人腿缝里穿过去，砸在门柱内侧弹进网窝。", effects: { reputation: 17, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "拨一下，调整角度再射", check: { attrs: ["dribble", "shooting"], difficulty: 37, tag: "盘带+射门" },
            success: { text: "你拨了一下。角度出来了。推射。球进了。", effects: { reputation: 11, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "拨球的时候被对方伸脚捅掉。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你拨球晃开角度，推射远角。球从他指尖下面钻过去了。", effects: { reputation: 18, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "回做给禁区外的队友", check: { attrs: ["passing", "vision"], difficulty: 27, tag: "传球+视野" },
            success: { text: "你回做。禁区外的队友迎球怒射，球进了。", effects: { reputation: 7, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "回做被对方拦截。混战又开始了。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "抢点卡位，把后卫挡在身后", check: { attrs: ["positioning", "balance"], difficulty: 25, tag: "站位+平衡" },
            success: { text: "你卡住位置。人散开了，空间出来了。你从容起脚。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "护球时被三个人挤倒了。你坐在草皮上。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "defense", text: "把球踢出禁区，先解围", check: { attrs: ["tackle", "resolve"], difficulty: 22, tag: "铲断+决断" },
            success: { text: "你大脚解围。球飞出去的时候，你松了口气。", effects: { reputation: 4, attrs: { tackle: 1 } } },
            fail: { text: "解围踢呲了。球弹到对方脚下，又是一阵混战。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "被对方后卫连续侵犯了三次。第四次，裁判终于吹了哨。任意球。你站在球前，深呼吸。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "attack", text: "自己来，直接攻门", check: { attrs: ["shooting", "power"], difficulty: 38, tag: "射门+力量" },
            success: { text: "你{elementAdj}地起脚。球越过人墙，砸入球网。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "球打在人墙上。弹回来。你的脚背还在发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】任意球直接攻门。球从人墙缝隙里穿过去，贴着门柱内侧入网。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "假射真突，带球杀入禁区", check: { attrs: ["dribble", "burst"], difficulty: 36, tag: "盘带+爆发" },
            success: { text: "你佯装起脚，突然带球突入禁区。射门。球进了。", effects: { reputation: 11, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "突破被对方预判。人墙散了，球权也丢了。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你假射真突，撕开人墙。单刀。球进了。", effects: { reputation: 18, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "传给跑位的队友，打配合", check: { attrs: ["passing", "iq"], difficulty: 30, tag: "传球+球商" },
            success: { text: "你传给跑位的队友。他回做，你迎球怒射。配合打出来了。", effects: { reputation: 9, goals: 1, attrs: { passing: 1 } } },
            fail: { text: "传球被对方预判。球权丢了。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "吊入禁区，争顶轰炸", check: { attrs: ["heading", "strength"], difficulty: 32, tag: "头球+对抗" },
            success: { text: "你吊入禁区。队友争顶成功，头球破门。", effects: { reputation: 8, assists: 1, attrs: { heading: 1 } } },
            fail: { text: "吊球力量大了。球直接飞出底线。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "短传控制，防对方反抢", check: { attrs: ["intercept", "rhythm"], difficulty: 23, tag: "拦截+节奏" },
            success: { text: "你短传稳住，顺势卡断了对方反抢的线路。节奏在你脚下。", effects: { reputation: 4, attrs: { intercept: 1 } } },
            fail: { text: "短传被对方逼抢破坏。你被推了一下。", effects: { stamina: -3 } }
          }
        ]
      },
{
        text: "点球。裁判的手臂指向十二码。你把球按在草皮上，指尖陷进湿泥。布澜门将贴着门线左右挪步，手套拍得啪啪响。看台静了一瞬。",
        sit: "attack",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "助跑三步，全力抽射死角",
            check: { attrs: ["shooting", "power"], difficulty: 38, tag: "射门+力量" },
            success: {
              text: "你{elementAdj}地抡圆了脚背。球像出膛的炮弹砸进网窝，门将连反应都没有。网绳剧烈地抖。",
              effects: {
                reputation: 13,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "脚背吃球太正。门将判断对了方向，一掌把球拍出底线。你的脚背还在发麻。",
              effects: { stamina: -5 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地爆射。球擦着门柱内侧钻入网窝，门将扑了个空，整个人撞在门柱上。全场炸了。",
              effects: {
                reputation: 20,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "假射真扣，晃倒门将再推空门",
            check: { attrs: ["dribble", "agility"], difficulty: 36, tag: "盘带+柔韧" },
            success: {
              text: "你{elementAdj}地一扣。门将整个人扑向左侧，你轻巧推射空门。球滚进网窝的那一刻，你听见看台的惊呼。",
              effects: {
                reputation: 12,
                goals: 1,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "扣球趟大了。门将没被骗到，伸脚把球挡下。你踩在球上踉跄了一步。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地连续假动作，把门将晃得坐倒在草皮上，才从容推射空门。看台全站起来了。",
              effects: {
                reputation: 19,
                goals: 1,
                attrs: { dribble: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "盯着门将的重心，等他先动",
            check: { attrs: ["iq", "rhythm"], difficulty: 27, tag: "球商+节奏" },
            success: {
              text: "你屏住呼吸，盯着门将的膝盖。他先动了。你{elementAdj}地把球推向反方向。冷静得像在训练。",
              effects: {
                reputation: 8,
                goals: 1,
                attrs: { iq: 1 }
              }
            },
            fail: {
              text: "你犹豫了半拍。门将看穿你的迟疑，扑出来把球压在身下。草皮的凉意贴上你的脸。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "预判门将扑救方向，卡住补射的位置",
            check: { attrs: ["positioning", "balance"], difficulty: 29, tag: "站位+平衡" },
            success: {
              text: "你{elementAdj}地预判了扑救方向。门将把球拍出，球正落在你卡好的位置上，顺势补射。球进了。",
              effects: {
                reputation: 9,
                goals: 1,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "你站位偏了半步。门将把球稳稳抱住，没给你任何机会。汗水顺着下巴滴在草皮上。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "扛开后卫卡住身位，护住补射的机会",
            check: { attrs: ["strength", "balance"], difficulty: 25, tag: "对抗+平衡" },
            success: {
              text: "你{elementAdj}地用后背顶住后卫。肩膀扛着肩膀，门将把球拍出，球权仍在你脚下，顺势补射。球进了。",
              effects: {
                reputation: 8,
                goals: 1,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "对抗中你被挤开。后卫抢先一步把球捅走，你撞在广告牌上，铁皮冰凉。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "边路传中。皮球带着旋转吊向后点，草腥味被风掀起。你和对方中卫同时启动，肩膀撞在一起，肘部发麻。落点在头顶上方。",
        sit: "attack",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "后点高高跃起，头球砸向地面",
            check: { attrs: ["heading", "balance"], difficulty: 36, tag: "头球+平衡" },
            success: {
              text: "你{elementAdj}地腾空。额头狠狠砸在球上，球弹地窜入网窝。落地时膝盖发软，但你笑了。",
              effects: {
                reputation: 12,
                goals: 1,
                attrs: { heading: 1 }
              }
            },
            fail: {
              text: "起跳早了半拍。球擦着你的头皮飞过去，砸在边网上。后脑勺还在发凉。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地力压中卫头槌。球像钉子一样钉进死角，门将连手都没抬。看台沸腾了。",
              effects: {
                reputation: 19,
                goals: 1,
                attrs: { heading: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "抢前点冲刺，甩开防守抢第一落点",
            check: { attrs: ["speed", "burst"], difficulty: 34, tag: "速度+爆发" },
            success: {
              text: "你{elementAdj}地一个箭步抢前点。后卫被你甩在身后，迎球一蹭，球变向钻入网窝。",
              effects: {
                reputation: 11,
                goals: 1,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "冲刺那一下被卡住身位。后卫抢先一步把球顶出。你的大腿还在发酸。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地反越位前插，抢在所有人之前迎球推射。门将只看见球进网。",
              effects: {
                reputation: 18,
                goals: 1,
                attrs: { speed: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "观察门将站位，吊一个反方向",
            check: { attrs: ["vision", "iq"], difficulty: 28, tag: "视野+球商" },
            success: {
              text: "你{elementAdj}地瞥见门将出击。脚弓一挑，球越过他指尖坠入网窝。轻巧。冷静。",
              effects: {
                reputation: 9,
                goals: 1,
                attrs: { vision: 1 }
              }
            },
            fail: {
              text: "挑射力量大了。球越过横梁飞出底线，门将回头看了一眼，松了口气。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "attack",
            text: "迎球凌空抽射，不等球落地",
            check: { attrs: ["shooting", "power"], difficulty: 39, tag: "射门+力量" },
            success: {
              text: "你{elementAdj}地抡脚怒射。球带着风声砸进网窝，网绳剧烈颤抖。整个禁区都安静了。",
              effects: {
                reputation: 13,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "凌空吃球部位不对。球高高飞上看台，脚背一阵刺痛。",
              effects: { stamina: -5 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地凌空爆射。球像炮弹一样轰入死角，门将扑到一半就放弃了。场边一片哗然。",
              effects: {
                reputation: 21,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "扛开后卫卡住身位，硬把球权护住",
            check: { attrs: ["hardness", "strength"], difficulty: 25, tag: "硬度+对抗" },
            success: {
              text: "你{elementAdj}地用后背顶住中卫。肩膀扛着肩膀，球权护住了，队友跟上接应。肋骨发疼，但值。",
              effects: {
                reputation: 6,
                attrs: { hardness: 1 }
              }
            },
            fail: {
              text: "对抗中你被挤开。后卫抢先一步把球捅走，你撞在广告牌上，铁皮冰凉。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "雨战。草皮积着水，球滚过来带着泥点。你方久攻不下，体能逼近极限。布澜防线缩在禁区里，密不透风。你在弧顶三十米外得球。",
        sit: "balanced",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "三十米外拔脚怒射，赌一个世界波",
            check: { attrs: ["shooting", "power"], difficulty: 38, tag: "射门+力量" },
            success: {
              text: "你{elementAdj}地远射。球划破雨幕，砸在门柱内侧弹进网窝。水花四溅。门将纹丝不动。",
              effects: {
                reputation: 13,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "支撑脚在积水里打滑。射门偏出立柱，你整个人摔在泥水里，膝盖发凉。",
              effects: { stamina: -5 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地轰出一脚世界波。球带着水雾直挂死角，门将回头望了三次。全场起立。",
              effects: {
                reputation: 22,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "带球强行推进，撕开防线缺口",
            check: { attrs: ["dribble", "agility"], difficulty: 35, tag: "盘带+柔韧" },
            success: {
              text: "你{elementAdj}地连续变向。湿滑的草皮没绊住你，后卫被你晃得重心全失。单刀。推射。进了。",
              effects: {
                reputation: 11,
                goals: 1,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "趟球那一下球滚进了水洼。球速骤降，后卫伸脚一捅，机会没了。脚踝发酸。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地连过两人杀入禁区，冷静推射。雨幕里，只有你一个人站着。",
              effects: {
                reputation: 18,
                goals: 1,
                attrs: { dribble: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "分给套上的边后卫，转移进攻方向",
            check: { attrs: ["passing", "vision"], difficulty: 27, tag: "传球+视野" },
            success: {
              text: "你{elementAdj}地一脚斜传。球越过积水，找到套边的队友。进攻方向打开了，布澜防线被迫横移。",
              effects: {
                reputation: 7,
                assists: 1,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "传球力量小了。球停在水洼里，被对方后腰顺势断走。你抹了一把脸上的雨水。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "扛住逼抢的后腰，护住球权",
            check: { attrs: ["strength", "balance"], difficulty: 26, tag: "对抗+平衡" },
            success: {
              text: "你{elementAdj}地卡住身位。后腰撞在你背上像撞上一堵墙，球权稳稳护住。队友有了接应时间。",
              effects: {
                reputation: 6,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "湿草皮上你脚下一滑。后腰顺势把你挤开，球丢了。后背一片冰凉。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "卡住身位，把球护在脚下等接应",
            check: { attrs: ["positioning", "balance"], difficulty: 24, tag: "站位+平衡" },
            success: {
              text: "你{elementAdj}地卡住身位。两人围抢上来，你提前站定把球护在脚下，等来队友接应。看台的嘘声里，你听不见自己的心跳。",
              effects: {
                reputation: 5,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "你站位偏了半步。围抢中球被捅走，布澜顺势打反击。后背一片冰凉。",
              effects: { stamina: -4 }
            }
          }
        ]
      },
{
        text: "后场。门将把球短传给你，布澜两名前锋立刻扑上来逼抢。草腥味呛进喉咙，出球线路被掐得死死的。看台在嘘。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "扛住逼抢，硬把球护住等接应",
            check: { attrs: ["strength", "hardness"], difficulty: 27, tag: "对抗+硬度" },
            success: {
              text: "你{elementAdj}地用后背顶住前锋。肩膀扛着肩膀，肋骨发疼，球权护住了。队友终于跑出了接应点。",
              effects: {
                reputation: 6,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "你被两人夹击挤倒。球被断下，布澜就地打反击。后脑勺磕在草皮上，一阵发凉。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "带球强行突围，趟过逼抢线",
            check: { attrs: ["speed", "burst"], difficulty: 32, tag: "速度+爆发" },
            success: {
              text: "你{elementAdj}地一个加速。球从两名前锋之间趟过，你抹过他们扬长而去。反击，从你脚下发起。",
              effects: {
                reputation: 9,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "突围那一下趟大了。前锋伸脚一捅，球出了边线。你的脚踝还在发酸。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "一脚出球，找到中场的接应点",
            check: { attrs: ["passing", "vision"], difficulty: 28, tag: "传球+视野" },
            success: {
              text: "你{elementAdj}地一脚直传。球穿过逼抢的缝隙，找到中场队友。压迫瞬间被化解。",
              effects: {
                reputation: 7,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "出球线路被预判。前锋伸脚把球拦下，布澜就地围攻。你抹了把汗。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "attack",
            text: "强行转身，趟过逼抢直面球门",
            check: { attrs: ["burst", "resolve"], difficulty: 33, tag: "爆发+决断" },
            success: {
              text: "你{elementAdj}地一个爆发转身。球从逼抢的缝隙里趟过，你抹过两人扬长而去，直面球门。",
              effects: {
                reputation: 9,
                attrs: { burst: 1 }
              }
            },
            fail: {
              text: "转身那一下脚底打滑。前锋伸脚一捅，球出了边线。脚踝发酸。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "卡住接应位置，把球护给插上的队友",
            check: { attrs: ["positioning", "balance"], difficulty: 24, tag: "站位+平衡" },
            success: {
              text: "逼抢太紧，你{elementAdj}地提前卡住身位。把球护给插上的队友，压迫瞬间被化解。肺里的灼烧慢慢平复。",
              effects: {
                reputation: 5,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "你站位偏了半步。前锋伸脚一捅，球丢了，布澜继续围攻。草皮的凉意透过球衣。",
              effects: { stamina: -4 }
            }
          }
        ]
      }
    ]
  },

  // 中锋·支点型（重排：每事件5选项=火木水土金各一）
  ST_pivot: {
    desc: "背身拿球、头球轰炸、做墙配合",
    events: [
      {
        text: "后场一记长传。球在空中划了很远。你背对球门，感受到后卫的胸口贴上来。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "attack", text: "背身直接转身射门", check: { attrs: ["shooting", "burst"], difficulty: 36, tag: "射门+爆发" },
            success: { text: "你背身直接转身。射门。球进了。后卫愣在原地。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "转身的时候被后卫拉了一下。射门偏出。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】背身转身射门。球带着{elementAdj}的弧线砸入死角。", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "拨球变向，抹过后卫", check: { attrs: ["dribble", "agility"], difficulty: 35, tag: "盘带+柔韧" },
            success: { text: "你肩膀一沉，拨球变向。后卫重心丢了。你杀入禁区。", effects: { reputation: 9, attrs: { dribble: 1 } } },
            fail: { text: "拨球趟大了。后卫伸脚一捅。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "balanced", text: "头球回做给中场队友", check: { attrs: ["passing", "vision"], difficulty: 27, tag: "传球+视野" },
            success: { text: "你头球回做。力量刚好，队友迎球推进。", effects: { reputation: 6, attrs: { passing: 1 } } },
            fail: { text: "头球回做力量大了。队友没接到。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "attack", text: "扛住他，把球卸下来转身", check: { attrs: ["balance", "strength"], difficulty: 30, tag: "平衡+对抗" },
            success: { text: "你{elementAdj}地扛住后卫。球卸在脚下，转身面对球门。", effects: { reputation: 8, attrs: { balance: 1 } } },
            fail: { text: "你被挤开了。球弹出去，后卫大脚解围。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你扛住后卫，卸球转身一气呵成。面对球门的那一刻，你甚至有时间调整呼吸。", effects: { reputation: 14, attrs: { balance: 2 }, flags: { keySuccess: true } } }
          },
          { id: "E", sit: "defense", text: "回传后卫，卡断反抢线路", check: { attrs: ["intercept", "iq"], difficulty: 22, tag: "拦截+球商" },
            success: { text: "你回传重新组织，顺势卡断了对方反抢的线路。", effects: { reputation: 4, attrs: { intercept: 1 } } },
            fail: { text: "回传被对方断球。你后颈发凉，赶紧回追。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "角球。你站在禁区里，身边是两个后卫。他们的手搭在你肩膀上，你的肩膀搭在他们胸口上。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "前点抢点，头球攻门", check: { attrs: ["heading", "positioning"], difficulty: 34, tag: "头球+站位" },
            success: { text: "你{elementAdj}地抢前点。额头撞上皮球，闷响。球砸入网窝。", effects: { reputation: 10, goals: 1, attrs: { heading: 1 } } },
            fail: { text: "前点被后卫卡住了。球飞过去了。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】前点抢点。你的头槌像一记重锤。门将连手都没伸。", effects: { reputation: 17, goals: 1, attrs: { heading: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "后点包抄，迎球推射", check: { attrs: ["shooting", "resolve"], difficulty: 35, tag: "射门+决断" },
            success: { text: "你绕到后点。球落下来。你迎球推射。球进了。", effects: { reputation: 9, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "后点被后卫挡住了。球弹到你膝盖上弹出去了。", effects: { stamina: -3 } },
            critical: { text: "【灵光一闪】后点包抄。推射。球进了。安静了一秒。", effects: { reputation: 16, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "头球摆渡给队友", check: { attrs: ["passing", "vision"], difficulty: 28, tag: "传球+视野" },
            success: { text: "你头球摆渡。队友迎球推射。球进了。", effects: { reputation: 7, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "摆渡力量大了。球飞出底线。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "attack", text: "前插冲刺，抢在后卫身前", check: { attrs: ["speed", "burst"], difficulty: 34, tag: "速度+爆发" },
            success: { text: "你突然前插，抢在后卫身前。球到人到。", effects: { reputation: 8, attrs: { speed: 1 } } },
            fail: { text: "前插早了。球从你身前飞过。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "defense", text: "回撤，防备对方快反", check: { attrs: ["intercept", "speed"], difficulty: 23, tag: "拦截+速度" },
            success: { text: "角球被解围后对方快反。你提前回追，将球截下。", effects: { reputation: 5, attrs: { intercept: 1 } } },
            fail: { text: "回追慢了一步。对方反击造险。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "禁区前沿。你背身拿球，后卫贴着你。队友在你身后五米，等着你的回做。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "attack", text: "不回做了，自己转身射门", check: { attrs: ["shooting", "burst"], difficulty: 37, tag: "射门+爆发" },
            success: { text: "你转身。射门。球进了。后卫愣在原地。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "转身的时候被后卫拉了一下。射门偏出。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你转身射门。球带着{elementAdj}的弧线砸入死角。", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "拨球变向，抹过后卫", check: { attrs: ["dribble", "agility"], difficulty: 35, tag: "盘带+柔韧" },
            success: { text: "你肩膀一沉，拨球变向。后卫重心丢了。你杀入禁区。", effects: { reputation: 9, attrs: { dribble: 1 } } },
            fail: { text: "拨球趟大了。后卫伸脚一捅。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "balanced", text: "回做，二过一", check: { attrs: ["passing", "iq"], difficulty: 28, tag: "传球+球商" },
            success: { text: "你{elementAdj}地回做。队友一脚出球，你转身。二过一。", effects: { reputation: 8, attrs: { passing: 1 } } },
            fail: { text: "回做力量小了。球被后卫捅走。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "卡住位置，护球等队友跑位", check: { attrs: ["positioning", "strength"], difficulty: 24, tag: "站位+对抗" },
            success: { text: "你卡住位置护住球。队友跑位，你分球。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "护球时被后卫从身后捅掉。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "回传中场，卡断反抢线路", check: { attrs: ["intercept", "iq"], difficulty: 22, tag: "拦截+球商" },
            success: { text: "你回传重新组织，顺势卡断了对方反抢的线路。", effects: { reputation: 4, attrs: { intercept: 1 } } },
            fail: { text: "回传被对方断球。你后颈发凉。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "对方后卫贴身肉搏。肘部、膝盖、肩膀。第四次，他把你拉倒了。裁判吹了哨。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "任意球，自己来", check: { attrs: ["shooting", "power"], difficulty: 36, tag: "射门+力量" },
            success: { text: "你{elementAdj}地起脚。球越过人墙，砸入球网。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "球打在人墙上。弹回来。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】任意球直接攻门。球从人墙缝隙里穿过去，贴着门柱入网。", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "快速发出，带球突入禁区", check: { attrs: ["dribble", "burst"], difficulty: 34, tag: "盘带+爆发" },
            success: { text: "你快速发出。对方人墙还没站稳。你带球突入禁区，射门。球进了。", effects: { reputation: 10, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "快速发出被对方回追破坏。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你快速发出，趁对方愣神带球突入禁区。射门。球进了。", effects: { reputation: 17, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "任意球吊入禁区，争顶", check: { attrs: ["passing", "heading"], difficulty: 30, tag: "传球+头球" },
            success: { text: "你吊入禁区。队友争顶，头球破门。", effects: { reputation: 8, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "吊球力量大了。球飞出底线。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "禁区里卡位，抢点准备", check: { attrs: ["positioning", "balance"], difficulty: 25, tag: "站位+平衡" },
            success: { text: "你卡住位置。球落下来，你从容处理。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "你被挤开了。球弹到别人脚下。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "短传稳住，防对方反抢", check: { attrs: ["intercept", "rhythm"], difficulty: 23, tag: "拦截+节奏" },
            success: { text: "你短传稳住节奏，顺势卡断了对方反抢的线路。", effects: { reputation: 4, attrs: { intercept: 1 } } },
            fail: { text: "短传被对方逼抢破坏。你被推了一下。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "对方反击。长传。你回撤到中场，和对方前锋争顶。风灌进耳朵，草腥味很浓。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "争顶解围", check: { attrs: ["heading", "strength"], difficulty: 30, tag: "头球+对抗" },
            success: { text: "你{elementAdj}地争顶。头球解围。球飞出去的时候，你松了口气。", effects: { reputation: 7, attrs: { heading: 1 } } },
            fail: { text: "争顶输了。对方前锋头球摆渡。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】你争顶成功，头球解围。你甚至有时间调整落地姿势。", effects: { reputation: 12, attrs: { heading: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "争顶后自己带球推进", check: { attrs: ["dribble", "burst"], difficulty: 34, tag: "盘带+爆发" },
            success: { text: "你争顶成功，球落在脚下。你带球推进。对方后卫愣在原地。", effects: { reputation: 8, attrs: { burst: 1 } } },
            fail: { text: "争顶后球弹远了。你追了两步，没追上。", effects: { stamina: -5 } }
          },
          { id: "C", sit: "balanced", text: "解围后直接长传反击", check: { attrs: ["passing", "vision"], difficulty: 28, tag: "传球+视野" },
            success: { text: "你解围后直接长传。前场队友拿到球，反击。", effects: { reputation: 6, attrs: { passing: 1 } } },
            fail: { text: "长传力量大了。球出了边线。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "defense", text: "不躲了，迎着球硬碰硬解围", check: { attrs: ["power", "resolve"], difficulty: 29, tag: "力量+决断" },
            success: { text: "你迎着对方前锋，硬碰硬把球顶出去。肩膀撞得生疼，但球权是你的。", effects: { reputation: 6, attrs: { power: 1 } } },
            fail: { text: "你被挤开了。对方前锋拿到球，转身。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "defense", text: "不跳了，等他落地再铲", check: { attrs: ["tackle", "iq"], difficulty: 26, tag: "铲断+球商" },
            success: { text: "你等他落地。他落地的瞬间，你伸脚。球断了。", effects: { reputation: 6, attrs: { tackle: 1 } } },
            fail: { text: "他落地的时候把球拨开了。你伸了个空。", effects: { stamina: -4 } }
          }
        ]
      },
{
        text: "禁区前沿，苏雯带球逼近。她和你对了个眼神。你心领神会，迎上去做墙。草皮上的鞋钉印交错，布澜中卫紧贴着你的后背。",
        sit: "attack",
        choices: [
          {
            id: "A",
            sit: "balanced",
            text: "一脚回做，给苏雯撞墙配合",
            check: { attrs: ["passing", "vision"], difficulty: 28, tag: "传球+视野" },
            success: {
              text: "你{elementAdj}地一脚回做。苏雯迎球直塞，球到人到。撞墙配合打穿了防线，她单刀推射。",
              effects: {
                reputation: 8,
                assists: 1,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "回做力量大了。苏雯没追上，球滚出底线。你肩膀还酸着。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "B",
            sit: "balanced",
            text: "做完墙反身插入禁区抢点",
            check: { attrs: ["positioning", "balance"], difficulty: 30, tag: "站位+平衡" },
            success: {
              text: "你{elementAdj}地反身前插。苏雯的直塞恰到好处，你迎球推射。球进了。配合得天衣无缝。",
              effects: {
                reputation: 10,
                goals: 1,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "反插那一下越位了。边裁的旗子举起，你白跑一趟。大腿发酸。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "C",
            sit: "attack",
            text: "回做后顺势转身，自己拔脚怒射",
            check: { attrs: ["shooting", "power"], difficulty: 37, tag: "射门+力量" },
            success: {
              text: "你{elementAdj}地转身抽射。球贴着门柱钻入网窝，门将的指尖差了两厘米。",
              effects: {
                reputation: 12,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "转身没晃开角度。射门被后卫用身体封堵，闷响。脚背还在发麻。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地转身爆射。球带着弧线砸入死角，场边教练把战术板摔了。",
              effects: {
                reputation: 20,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "D",
            sit: "attack",
            text: "背身拨球转身，抹过后卫单刀",
            check: { attrs: ["dribble", "agility"], difficulty: 35, tag: "盘带+柔韧" },
            success: {
              text: "你{elementAdj}地一拨一扣。后卫重心丢了，你抹进禁区单刀推射。球进了。",
              effects: {
                reputation: 11,
                goals: 1,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "拨球趟大了。后卫伸脚一捅，球弹出去老远。你踩在球上滑了一下。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地连晃两人抹进禁区，单刀推射。安静了一秒，然后所有人都站起来了。",
              effects: {
                reputation: 18,
                goals: 1,
                attrs: { dribble: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "扛住中卫护球，等队友跑位再分",
            check: { attrs: ["strength", "hardness"], difficulty: 26, tag: "对抗+硬度" },
            success: {
              text: "你{elementAdj}地像钉子一样卡住后卫。肩膀顶着肩膀，肋骨发疼。队友跑出空当，你分球。",
              effects: {
                reputation: 6,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "你被挤开了。后背撞在广告牌上，铁皮的凉意透过球衣。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "禁区外一片混战。布澜后卫把球顶出，皮球高高弹起，落在禁区弧顶。双方球员同时朝第二落点冲去，鞋钉刮着草皮。",
        sit: "balanced",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "抢第二落点，迎球凌空抽射",
            check: { attrs: ["shooting", "burst"], difficulty: 37, tag: "射门+爆发" },
            success: {
              text: "你{elementAdj}地抢到落点。不等球落地，抡脚怒射。球划破空气钻入网窝。门将连反应都没有。",
              effects: {
                reputation: 13,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "凌空吃球部位偏了。球飞上看台，脚背一阵刺痛。你甩了甩发麻的脚。",
              effects: { stamina: -5 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地凌空爆射。球像炮弹轰入死角，门将扑到一半就放弃了。全场哗然。",
              effects: {
                reputation: 21,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "带球推进，撕开防线缺口",
            check: { attrs: ["dribble", "agility"], difficulty: 34, tag: "盘带+柔韧" },
            success: {
              text: "你{elementAdj}地连续变向。后卫被你晃得重心全失，你抹进禁区单刀推射。球进了。",
              effects: {
                reputation: 11,
                goals: 1,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "趟球那一下趟大了。后卫伸脚一捅，球弹出去老远。脚踝发酸。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地连过两人杀入禁区，冷静推射。安静了一秒，然后所有人都站起来了。",
              effects: {
                reputation: 18,
                goals: 1,
                attrs: { dribble: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "头球摆渡，把球点给插上的队友",
            check: { attrs: ["heading", "balance"], difficulty: 29, tag: "头球+平衡" },
            success: {
              text: "你{elementAdj}地高高跃起。额头一蹭，球摆渡到空当，队友迎球怒射。配合打出来了。",
              effects: {
                reputation: 8,
                assists: 1,
                attrs: { heading: 1 }
              }
            },
            fail: {
              text: "摆渡方向偏了。球顶到对方脚下，布澜顺势打反击。后颈还在发凉。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "一脚分球，转移进攻方向",
            check: { attrs: ["passing", "vision"], difficulty: 27, tag: "传球+视野" },
            success: {
              text: "你{elementAdj}地一脚分球。球找到弱侧插上的队友，进攻方向打开了。布澜防线被迫横移。",
              effects: {
                reputation: 7,
                assists: 1,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "分球力量小了。队友没接住，球被后卫捅走。你抹了把汗。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "丢球就地反抢，掐断对方反击",
            check: { attrs: ["tackle", "intercept"], difficulty: 24, tag: "铲断+拦截" },
            success: {
              text: "球被捅走的瞬间你就地反抢。你{elementAdj}地一记铲断，球权夺回。肺部灼烧，但值得。",
              effects: {
                reputation: 5,
                attrs: { tackle: 1 }
              }
            },
            fail: {
              text: "反抢扑空。对方顺势推进，你只能看着他们的背影，大腿发酸。",
              effects: { stamina: -4 }
            }
          }
        ]
      },
{
        text: "边路传中。皮球带着旋转吊向后点，草腥味被风掀起。布澜两名中卫都被前点吸引，后点空了一片。你悄悄绕到他们身后。",
        sit: "attack",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "后点高高跃起，头球砸向地面",
            check: { attrs: ["heading", "balance"], difficulty: 36, tag: "头球+平衡" },
            success: {
              text: "你{elementAdj}地腾空。额头狠狠砸在球上，球弹地窜入网窝。落地时膝盖发软，但你笑了。",
              effects: {
                reputation: 12,
                goals: 1,
                attrs: { heading: 1 }
              }
            },
            fail: {
              text: "起跳早了半拍。球擦着你的头皮飞过去，砸在边网上。后脑勺还在发凉。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地力压所有人头槌。球像钉子一样钉进死角，门将连手都没抬。看台沸腾了。",
              effects: {
                reputation: 19,
                goals: 1,
                attrs: { heading: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "迎球怒射，不等它落地",
            check: { attrs: ["shooting", "power"], difficulty: 38, tag: "射门+力量" },
            success: {
              text: "你{elementAdj}地抡脚怒射。球带着风声砸进网窝，网绳剧烈颤抖。整个禁区都安静了。",
              effects: {
                reputation: 13,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "凌空吃球部位不对。球高高飞上看台，脚背一阵刺痛。",
              effects: { stamina: -5 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地凌空爆射。球像炮弹轰入死角，门将扑到一半就放弃了。场边一片哗然。",
              effects: {
                reputation: 21,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "C",
            sit: "attack",
            text: "抢前点冲刺，甩开防守抢第一落点",
            check: { attrs: ["speed", "burst"], difficulty: 34, tag: "速度+爆发" },
            success: {
              text: "你{elementAdj}地一个箭步抢前点。后卫被你甩在身后，迎球一蹭，球变向钻入网窝。",
              effects: {
                reputation: 11,
                goals: 1,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "冲刺那一下被卡住身位。后卫抢先一步把球顶出。大腿发酸。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地反越位前插，抢在所有人之前迎球推射。门将只看见球进网。",
              effects: {
                reputation: 18,
                goals: 1,
                attrs: { speed: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "头球回做，点给禁区里的队友",
            check: { attrs: ["passing", "vision"], difficulty: 28, tag: "传球+视野" },
            success: {
              text: "你{elementAdj}地一记头球摆渡。球点向禁区中央，队友迎球推射。助攻到手。",
              effects: {
                reputation: 8,
                assists: 1,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "摆渡力量大了。球顶过队友头顶，出了底线。你抹了把汗。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "扛住回追的后卫，硬把球权护住",
            check: { attrs: ["strength", "hardness"], difficulty: 25, tag: "对抗+硬度" },
            success: {
              text: "你{elementAdj}地用后背顶住后卫。肩膀扛着肩膀，球权护住，队友跟上接应。肋骨发疼，但值。",
              effects: {
                reputation: 6,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "对抗中你被挤开。后卫把球捅走，你撞在广告牌上，铁皮冰凉。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "你背身倚住中卫，球在脚下。苏雯从肋部悄悄插上，和你对了个眼神。布澜的防线正整体压上，身后空当一闪而过。汗水顺着下巴滴在草皮上。",
        sit: "balanced",
        choices: [
          {
            id: "A",
            sit: "balanced",
            text: "背身一脚直塞，找反越位的苏雯",
            check: { attrs: ["passing", "vision"], difficulty: 30, tag: "传球+视野" },
            success: {
              text: "你{elementAdj}地一脚直塞。球从中卫身边滚过，苏雯反越位成功，单刀推射。助攻到手。",
              effects: {
                reputation: 9,
                assists: 1,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "直塞力量大了。苏雯没追上，球滚出底线。你肩膀还酸着。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "B",
            sit: "balanced",
            text: "护住球，等队友跑出空当再分",
            check: { attrs: ["strength", "balance"], difficulty: 26, tag: "对抗+平衡" },
            success: {
              text: "你{elementAdj}地像钉子一样卡住后卫。肩膀顶着肩膀，肋骨发疼。队友跑出空当，你分球。",
              effects: {
                reputation: 6,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "你被挤开了。后背撞在广告牌上，铁皮的凉意透过球衣。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "回做后反身插入禁区抢点",
            check: { attrs: ["positioning", "balance"], difficulty: 30, tag: "站位+平衡" },
            success: {
              text: "你{elementAdj}地反身前插。队友的直塞恰到好处，你迎球推射。球进了。",
              effects: {
                reputation: 10,
                goals: 1,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "反插那一下越位了。边裁的旗子举起，你白跑一趟。大腿发酸。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "D",
            sit: "attack",
            text: "反身前插，高速冲刺抢点",
            check: { attrs: ["speed", "burst"], difficulty: 33, tag: "速度+爆发" },
            success: {
              text: "你{elementAdj}地一个箭步反插。队友的直塞恰到好处，你高速插上单刀推射。球进了。",
              effects: {
                reputation: 10,
                goals: 1,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "冲刺那一下越位了。边裁的旗子举起，你白跑一趟。大腿发酸。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地反越位前插，单刀推射。门将只看见球进网。看台沸腾了。",
              effects: {
                reputation: 18,
                goals: 1,
                attrs: { speed: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "回追到位，一脚把险情解围出去",
            check: { attrs: ["shooting", "power"], difficulty: 32, tag: "射门+力量" },
            success: {
              text: "对手顺势要打反击。你{elementAdj}地回追到位，抡脚一脚把球踢向中场。不漂亮，但险情解除了。肺里的灼烧慢慢平复。",
              effects: {
                reputation: 5,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "回追那一步没赶上。对手顺势推进，你只能看着他们的背影。大腿酸得发抖。",
              effects: { stamina: -4 }
            }
          }
        ]
      },
{
        text: "点球。裁判的手臂指向十二码。全队把球交给你这个支点中锋。你把球按在草皮上，布澜门将贴着门线高声喊话，手套拍得啪啪响。",
        sit: "attack",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "助跑三步，全力抽射死角",
            check: { attrs: ["shooting", "power"], difficulty: 38, tag: "射门+力量" },
            success: {
              text: "你{elementAdj}地抡圆了脚背。球像出膛的炮弹砸进网窝，门将连反应都没有。网绳剧烈地抖。",
              effects: {
                reputation: 13,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "脚背吃球太正。门将判断对了方向，一掌把球拍出底线。你的脚背还在发麻。",
              effects: { stamina: -5 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地爆射。球擦着门柱内侧钻入网窝，门将扑了个空。全场炸了。",
              effects: {
                reputation: 20,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "扛住门将扑救后的反扑，护住补射机会",
            check: { attrs: ["strength", "balance"], difficulty: 25, tag: "对抗+平衡" },
            success: {
              text: "你{elementAdj}地卡住身位。门将把球拍出，后卫撞上来被你扛开，球权护住。肋骨发疼，但值。",
              effects: {
                reputation: 6,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "你被后卫挤开。门将把球稳稳抱住，没给你任何机会。汗水顺着下巴滴在草皮上。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "盯着门将重心，等他先动再推反方向",
            check: { attrs: ["rhythm", "iq"], difficulty: 27, tag: "节奏+球商" },
            success: {
              text: "你屏住呼吸，盯着门将的膝盖。他先动了。你{elementAdj}地把球推向反方向。冷静得像在训练。",
              effects: {
                reputation: 8,
                goals: 1,
                attrs: { rhythm: 1 }
              }
            },
            fail: {
              text: "你犹豫了半拍。门将看穿你的迟疑，扑出来把球压在身下。草皮的凉意贴上你的脸。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "罚丢也无妨，卡住门将扑救后的二点",
            check: { attrs: ["positioning", "balance"], difficulty: 24, tag: "站位+平衡" },
            success: {
              text: "你{elementAdj}地预判了落点。门将把球拍出，球正落在你卡好的位置上。你顺势补射，球进了。",
              effects: {
                reputation: 7,
                goals: 1,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "你站位偏了半步。门将把球稳稳抱住，没给你任何机会。汗水顺着下巴滴在草皮上。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "attack",
            text: "爆发起步，抢在门将封角度前推射",
            check: { attrs: ["speed", "burst"], difficulty: 32, tag: "速度+爆发" },
            success: {
              text: "你{elementAdj}地蹬地启动。门将刚要下地，球已经从他指尖边滚进网窝。快。太快了。",
              effects: {
                reputation: 11,
                goals: 1,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "启动那一下脚底打滑。射门偏出立柱，门将轻松把球抱住。你的脚踝还在发酸。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地抢点推射。球贴着草皮窜入死角，门将的手套只差一层皮。教练在场边挥拳。",
              effects: {
                reputation: 18,
                goals: 1,
                attrs: { speed: 2 },
                flags: { keySuccess: true }
              }
            }
          }
        ]
      },
{
        text: "比赛末段，体能逼近极限。你背身倚住后卫，肺像被火烧。布澜全线退守，队友的接应点被盯死。球在你脚下，全队在等你这一下。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "balanced",
            text: "扛住后卫，硬把球护到队友插上",
            check: { attrs: ["strength", "hardness"], difficulty: 27, tag: "对抗+硬度" },
            success: {
              text: "你{elementAdj}地像钉子一样卡住后卫。肩膀顶着肩膀，肋骨发疼。队友终于跑出空当，你分球。",
              effects: {
                reputation: 6,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "体能到了极限，你被挤开。后背撞在广告牌上，铁皮的凉意透过球衣。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "B",
            sit: "balanced",
            text: "咬牙护球，多撑一秒是一秒",
            check: { attrs: ["stamina", "balance"], difficulty: 26, tag: "耐力+平衡" },
            success: {
              text: "你{elementAdj}地咬紧牙关。腿像灌了铅，但你撑住了。队友陆续压上，进攻重新组织。",
              effects: {
                reputation: 5,
                attrs: { stamina: 1 }
              }
            },
            fail: {
              text: "你撑不住了。脚下一软，球被后卫捅走。大腿酸得发抖。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "回做给插上的队友，自己前插",
            check: { attrs: ["passing", "vision"], difficulty: 28, tag: "传球+视野" },
            success: {
              text: "你{elementAdj}地一脚回做，反身插入禁区。队友直塞，球到人到，你迎球推射。配合打出来了。",
              effects: {
                reputation: 8,
                assists: 1,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "回做力量小了。队友没接住，球被后卫捅走。你肩膀还酸着。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "头球摆渡，把长传点给前插队友",
            check: { attrs: ["heading", "balance"], difficulty: 29, tag: "头球+平衡" },
            success: {
              text: "你{elementAdj}地高高跃起。额头一蹭，球摆渡到空当，队友迎球怒射。助攻到手。",
              effects: {
                reputation: 8,
                assists: 1,
                attrs: { heading: 1 }
              }
            },
            fail: {
              text: "摆渡方向偏了。球顶到对方脚下，布澜顺势打反击。后颈还在发凉。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "回追到位，一脚把险情解围出去",
            check: { attrs: ["shooting", "power"], difficulty: 32, tag: "射门+力量" },
            success: {
              text: "对手断球要打反击。你{elementAdj}地咬牙回追，抡脚一脚把球踢向中场。不漂亮，但险情解除了。肺里的灼烧慢慢平复。",
              effects: {
                reputation: 5,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "回追那一步没赶上。对手顺势推进，你只能看着他们的背影。大腿酸得发抖。",
              effects: { stamina: -4 }
            }
          }
        ]
      }
    ]
  },

  // 边锋·突破型（重排：每事件5选项=火木水土金各一）
  LW_break: {
    desc: "过人、下底传中",
    events: [
      {
        text: "边路一打一。你拿球面对对方边后卫。他压低重心，眼睛盯着你的脚。草皮上还有露水。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "attack", text: "内切一步，起脚抽射", check: { attrs: ["shooting", "burst"], difficulty: 36, tag: "射门+爆发" },
            success: { text: "你内切晃开角度。起脚。球带着{elementAdj}的弧线钻入远角。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "内切没晃开。射门被后卫封堵。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你内切兜射。球划过一道弧线，直挂死角。门将纹丝不动。", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "强行超车，下底", check: { attrs: ["speed", "dribble"], difficulty: 34, tag: "速度+盘带" },
            success: { text: "你把球一趟，全速超车。边后卫被你甩在身后。底线在眼前。", effects: { reputation: 9, attrs: { speed: 1 } } },
            fail: { text: "超车那一下球趟大了。出了底线。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你像一道残影掠过边后卫。他伸手都没碰到你的衣角。", effects: { reputation: 16, attrs: { speed: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "下底后倒三角传中", check: { attrs: ["passing", "vision"], difficulty: 29, tag: "传球+视野" },
            success: { text: "你下到底线，倒三角回传。队友迎球推射。球进了。", effects: { reputation: 8, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "传中力量大了。球飞向远门柱外。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "卡住身位，护球等接应", check: { attrs: ["positioning", "balance"], difficulty: 25, tag: "站位+平衡" },
            success: { text: "你用身体卡住边后卫。队友插上接应，进攻继续。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "你被挤开了。球出了边线。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "丢球就地反抢", check: { attrs: ["tackle", "intercept"], difficulty: 24, tag: "铲断+拦截" },
            success: { text: "丢球的瞬间你就地反抢。一脚铲断，球权夺回。", effects: { reputation: 5, attrs: { tackle: 1 } } },
            fail: { text: "反抢扑空。对方顺势推进。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "你沿边路高速推进，底线越来越近。对方中卫补到边路来堵你。禁区里，队友正在抢点。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "小角度直接抽射", check: { attrs: ["shooting", "power"], difficulty: 37, tag: "射门+力量" },
            success: { text: "你不传了。小角度起脚。球从门将腋下钻入网窝。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "角度太小。射门打在边网上。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】小角度爆射。球带着{elementAdj}的劲道砸进近角。门将反应不过来。", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "盘带晃过补防中卫", check: { attrs: ["dribble", "agility"], difficulty: 36, tag: "盘带+柔韧" },
            success: { text: "你一个变向，晃过补防的中卫。杀入禁区。", effects: { reputation: 9, attrs: { dribble: 1 } } },
            fail: { text: "变向被预判。中卫伸脚把球捅走。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "balanced", text: "精准传中找抢点队友", check: { attrs: ["passing", "vision"], difficulty: 30, tag: "传球+视野" },
            success: { text: "你一脚传中。弧线绕过中卫，正落在队友头顶。头球破门。", effects: { reputation: 9, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "传中被中卫顶出。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "attack", text: "抢前点，包抄到位", check: { attrs: ["positioning", "resolve"], difficulty: 32, tag: "站位+决断" },
            success: { text: "你绕到前点。球鬼使神差落到你脚下。推射。球进了。", effects: { reputation: 10, goals: 1, attrs: { positioning: 1 } } },
            fail: { text: "包抄慢了半拍。球从你身前划过。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "传完就回防，卡断反击", check: { attrs: ["intercept", "speed"], difficulty: 23, tag: "拦截+速度" },
            success: { text: "你传完立刻回防，卡断了对方反击的第一传。", effects: { reputation: 5, attrs: { intercept: 1 } } },
            fail: { text: "回防慢了。对方反击打成了。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "反击。后场断球，一脚长传找到边路的你。身前是大片空当，风在耳边呼啸。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "带球奔袭后推射", check: { attrs: ["shooting", "burst"], difficulty: 36, tag: "射门+爆发" },
            success: { text: "你一路奔袭，杀到禁区。推射远角。球进了。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "奔袭到最后，腿软了。推射偏出。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】你长途奔袭，单刀破门。整条防线被你甩在身后。", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "长途奔袭，生吃后卫", check: { attrs: ["speed", "stamina"], difficulty: 34, tag: "速度+耐力" },
            success: { text: "你全速冲刺。回追的后卫越追越远。你杀到底线。", effects: { reputation: 9, attrs: { speed: 1 } } },
            fail: { text: "冲刺到最后，体力见底。被回追的后卫赶上。", effects: { stamina: -6 } }
          },
          { id: "C", sit: "balanced", text: "分球给中路包抄的队友", check: { attrs: ["passing", "iq"], difficulty: 29, tag: "传球+球商" },
            success: { text: "你没贪功，分给中路包抄的队友。他推射空门。", effects: { reputation: 8, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "分球力量小了。被回追的后卫破坏。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "attack", text: "抢点包抄，等队友传中", check: { attrs: ["positioning", "resolve"], difficulty: 31, tag: "站位+决断" },
            success: { text: "你绕到后点抢点。队友传中到位，你迎球推射。", effects: { reputation: 9, goals: 1, attrs: { positioning: 1 } } },
            fail: { text: "抢点早了。球落到你身后。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "丢球反抢，掐断对方反击", check: { attrs: ["tackle", "intercept"], difficulty: 24, tag: "铲断+拦截" },
            success: { text: "丢球后你立刻反抢。一脚铲断，把反击扼杀在摇篮里。", effects: { reputation: 5, attrs: { tackle: 1 } } },
            fail: { text: "反抢扑空。对方反击打成了。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "前场任意球。你把球摆在边路，退后几步。对方人墙排好，门将指挥着防守。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "attack", text: "直接攻门，兜一个弧线", check: { attrs: ["shooting", "power"], difficulty: 38, tag: "射门+力量" },
            success: { text: "你起脚。球越过人墙，带着弧线砸入球网。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "球打在人墙上。弹回来。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】任意球直接破门。球从人墙缝隙钻过，贴着门柱入网。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "假射真突，带球杀入禁区", check: { attrs: ["dribble", "burst"], difficulty: 35, tag: "盘带+爆发" },
            success: { text: "你佯装起脚，突然带球突入禁区。射门。球进了。", effects: { reputation: 11, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "突破被预判。人墙散了，球权丢了。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "balanced", text: "吊入禁区，找抢点队友", check: { attrs: ["passing", "vision"], difficulty: 30, tag: "传球+视野" },
            success: { text: "你吊入禁区。队友争顶成功，头球破门。", effects: { reputation: 8, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "吊球力量大了。球飞出底线。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "attack", text: "禁区里抢点，争顶", check: { attrs: ["heading", "positioning"], difficulty: 32, tag: "头球+站位" },
            success: { text: "你绕到前点抢点。头球一蹭，球进了。", effects: { reputation: 9, goals: 1, attrs: { heading: 1 } } },
            fail: { text: "争顶输了。球被后卫顶出。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "短传控制，防对方反抢", check: { attrs: ["intercept", "rhythm"], difficulty: 23, tag: "拦截+节奏" },
            success: { text: "你短传稳住节奏，顺势卡断了对方反抢的线路。", effects: { reputation: 4, attrs: { intercept: 1 } } },
            fail: { text: "短传被对方逼抢破坏。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "对方两名球员把你夹在边线附近。空间越来越小。球在你脚下，对方的脚伸过来。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "attack", text: "强行起脚，搏一个", check: { attrs: ["shooting", "resolve"], difficulty: 36, tag: "射门+决断" },
            success: { text: "你抢在封堵前起脚。球从人缝里钻入球网。", effects: { reputation: 10, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "起脚被对方伸脚封堵。", effects: { stamina: -4 } }
          },
          { id: "B", sit: "attack", text: "盘带突围，从两人缝里钻", check: { attrs: ["dribble", "agility"], difficulty: 37, tag: "盘带+柔韧" },
            success: { text: "你连续两个变向，从两人夹缝里钻了出去。看台一片惊呼。", effects: { reputation: 10, attrs: { dribble: 1 } } },
            fail: { text: "盘带被两人合力断下。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你在两人包夹中连过两人，杀出重围。场边教练站了起来。", effects: { reputation: 17, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "分球转移给弱侧队友", check: { attrs: ["passing", "vision"], difficulty: 29, tag: "传球+视野" },
            success: { text: "你一脚长传转移到弱侧。队友大片空当，进攻打开。", effects: { reputation: 7, attrs: { passing: 1 } } },
            fail: { text: "转移被对方预判拦截。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "护球卡位，等队友接应", check: { attrs: ["positioning", "balance"], difficulty: 25, tag: "站位+平衡" },
            success: { text: "你用身体卡住位置，护住球。队友赶到接应。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "你被两人挤倒。球丢了。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "丢球反抢，绞杀", check: { attrs: ["tackle", "strength"], difficulty: 26, tag: "铲断+对抗" },
            success: { text: "丢球瞬间你一个肩撞加铲断，把球硬生生抢回。", effects: { reputation: 5, attrs: { tackle: 1 } } },
            fail: { text: "反抢扑空。你撞在对方身上，弹开了。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "比赛进入读秒。你方落后一球。最后一次机会，球到了边路的你脚下。汗水糊住了眼睛。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "内切兜射，绝杀", check: { attrs: ["shooting", "burst"], difficulty: 38, tag: "射门+爆发" },
            success: { text: "你内切，兜射远角。球进了。绝平。你跪在草皮上。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "兜射偏出。终场哨响。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】读秒绝杀。你的兜射划过弧线钻入死角。所有人都疯了。", effects: { reputation: 22, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "强行突破杀入禁区", check: { attrs: ["dribble", "speed"], difficulty: 37, tag: "盘带+速度" },
            success: { text: "你连过两人杀入禁区。射门。球进了。绝平。", effects: { reputation: 12, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "突破被围抢断下。", effects: { stamina: -5 } }
          },
          { id: "C", sit: "balanced", text: "横传给位置更好的队友", check: { attrs: ["vision", "iq"], difficulty: 29, tag: "视野+球商" },
            success: { text: "你横传。队友推射空门。绝平。", effects: { reputation: 8, assists: 1, attrs: { vision: 1 } } },
            fail: { text: "横传被回追后卫破坏。终场哨响。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "attack", text: "抢点包抄，搏一个落点", check: { attrs: ["positioning", "resolve"], difficulty: 32, tag: "站位+决断" },
            success: { text: "你抢到一个不可思议的落点。推射。球进了。", effects: { reputation: 10, goals: 1, attrs: { positioning: 1 } } },
            fail: { text: "抢点慢了。球被门将没收。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "先回防，保住翻盘火种", check: { attrs: ["tackle", "positioning"], difficulty: 22, tag: "铲断+站位" },
            success: { text: "你先回防完成关键封堵。火种还在。", effects: { reputation: 5, attrs: { tackle: 1 } } },
            fail: { text: "回防稍慢。对方远射偏出。你喘了很久。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "对方从你这一侧发动反击。边后卫还没回位，你得先顶上去。风灌进耳朵。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "回追铲抢", check: { attrs: ["tackle", "speed"], difficulty: 32, tag: "铲断+速度" },
            success: { text: "你回追到位，一记干净的铲断把球捅出底线。", effects: { reputation: 8, attrs: { tackle: 1 } } },
            fail: { text: "铲抢落空。对方下底传中。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】你回追到位，连人带球一起留在底线外。", effects: { reputation: 13, attrs: { tackle: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "defense", text: "全速回追，缠住他", check: { attrs: ["speed", "stamina"], difficulty: 30, tag: "速度+耐力" },
            success: { text: "你咬牙回追，死死缠住对方边锋。他甩不开你，只能减速。", effects: { reputation: 7, attrs: { speed: 1 } } },
            fail: { text: "你追了，但腿灌了铅。他一步抹过你。", effects: { stamina: -6 } }
          },
          { id: "C", sit: "balanced", text: "断球后直接长传反击", check: { attrs: ["passing", "vision"], difficulty: 27, tag: "传球+视野" },
            success: { text: "你断球后直接长传找前场。反击打成了。", effects: { reputation: 6, attrs: { passing: 1 } } },
            fail: { text: "长传力量大了。球出了边线。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "defense", text: "卡住身位，封堵传中线路", check: { attrs: ["positioning", "balance"], difficulty: 28, tag: "站位+平衡" },
            success: { text: "你卡住身位，把对方逼向底线。传中被你挡出。", effects: { reputation: 6, attrs: { positioning: 1 } } },
            fail: { text: "对方一个变向，你重心丢了。他下底了。", effects: { stamina: -5 } }
          },
          { id: "E", sit: "defense", text: "赌一把，奋力拦截", check: { attrs: ["resolve", "power"], difficulty: 33, tag: "决断+力量" },
            success: { text: "你豁出去了。一个肩撞把对方连人带球拦下。球权是你的。", effects: { reputation: 6, attrs: { resolve: 1 } } },
            fail: { text: "你扑得太凶。对方一晃，你摔在草皮上。", effects: { stamina: -6 } }
          }
        ]
      },
{
        text: "肋部。苏雯一脚回做，球滚到你脚下。面前只剩最后一名中卫，他压低重心，鞋钉碾着草皮。草腥味混着汗味，看台的声浪像潮水。",
        sit: "attack",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "连续变向晃过中卫，突入禁区",
            check: { attrs: ["dribble", "agility"], difficulty: 37, tag: "盘带+柔韧" },
            success: {
              text: "你左肩一沉，右脚拨球。中卫重心丢了。你抹进禁区，草皮在鞋钉下翻起。单刀。",
              effects: {
                reputation: 11,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "变向趟大了半步。中卫伸脚一捅，球弹出去。你的脚踝还在发酸。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地连晃两人，抹入禁区。全场站起来。后卫坐在草皮上，眼神空了。",
              effects: {
                reputation: 19,
                goals: 1,
                attrs: { dribble: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "不等他站稳，转身就射",
            check: { attrs: ["shooting", "burst"], difficulty: 38, tag: "射门+爆发" },
            success: {
              text: "你不给他反应时间。转身。起脚。球贴着门柱内侧钻入网窝。门将的手指尖差了两厘米。",
              effects: {
                reputation: 12,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "转身没晃开角度。射门被中卫用身体封堵，闷响。你的脚背还在发麻。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】转身抽射。球带着{elementAdj}的弧线砸入死角。场边教练把战术板摔了。",
              effects: {
                reputation: 20,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "回做给苏雯，自己前插跑位",
            check: { attrs: ["passing", "vision"], difficulty: 27, tag: "传球+视野" },
            success: {
              text: "你一脚回做，反身插入肋部。苏雯心领神会，直塞。球到人到。配合打出来了。",
              effects: {
                reputation: 7,
                assists: 1,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "回做力量轻了。苏雯没接住，球被后卫捅走。你肩膀还酸着。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "扛住中卫，护球等队友跑位",
            check: { attrs: ["strength", "balance"], difficulty: 26, tag: "对抗+平衡" },
            success: {
              text: "你像钉子一样卡住中卫。肩膀顶着肩膀，肋骨发疼。队友跑出空当，你分球。",
              effects: {
                reputation: 6,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "你被挤开了。后背撞在广告牌上，铁皮的凉意透过球衣。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "丢球就地反抢，卡住身位",
            check: { attrs: ["positioning", "intercept"], difficulty: 24, tag: "站位+拦截" },
            success: {
              text: "丢球的瞬间你卡住身位。一记干净的拦截，球权夺回。肺部在灼烧，但值得。",
              effects: {
                reputation: 5,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "反抢扑空。对方顺势推进，你只能看着背影，大腿发酸。",
              effects: { stamina: -4 }
            }
          }
        ]
      },
{
        text: "下半场第七十分钟。你的腿像灌了铅。对方刚换上生力军边后卫。他盯着你，鞋钉踩实了草皮。汗水糊住眼睛。",
        sit: "balanced",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "咬牙强突，用速度撕开他",
            check: { attrs: ["speed", "burst"], difficulty: 36, tag: "速度+爆发" },
            success: {
              text: "你把球往前一捅，整个人弹出去。生力军转身追，但已经晚了。风灌进耳朵。",
              effects: {
                reputation: 10,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "腿太沉了。启动那一下没蹬住，鞋钉刮着草皮打滑。他轻松卡住身位。你的膝盖在抖。",
              effects: { stamina: -5 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地弹射出去，三步甩开他。底线。传中。看台有人喊你的名字。",
              effects: {
                reputation: 18,
                assists: 1,
                attrs: { speed: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "balanced",
            text: "用节奏变化骗他，突然变向",
            check: { attrs: ["rhythm", "iq"], difficulty: 29, tag: "节奏+球商" },
            success: {
              text: "你放慢脚步，像散步。他松了半步。然后你弹射变向。他的影子被甩在身后。",
              effects: {
                reputation: 8,
                attrs: { rhythm: 1 }
              }
            },
            fail: {
              text: "节奏没骗到他。他纹丝不动。你加速那一下撞在他身上，肩膀发麻。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "C",
            sit: "attack",
            text: "硬扛他，用力量挤开空间下底",
            check: { attrs: ["power", "strength"], difficulty: 34, tag: "力量+对抗" },
            success: {
              text: "你肩膀一横，硬生生把他挤开半步。肋骨发疼，但底线就在前方。草腥味灌进鼻腔。",
              effects: {
                reputation: 9,
                attrs: { power: 1 }
              }
            },
            fail: {
              text: "你顶不动他。生力军的对抗太硬。你被挤出边线，膝盖磕在广告牌上。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "D",
            sit: "defense",
            text: "体能不够就先回防，保住身后",
            check: { attrs: ["tackle", "stamina"], difficulty: 23, tag: "铲断+耐力" },
            success: {
              text: "你退回来，卡住身位。肺在烧，但位置没丢。他过不了你。教练在场边点头。",
              effects: {
                reputation: 5,
                attrs: { tackle: 1 }
              }
            },
            fail: {
              text: "回防慢了半步。他从你身侧抹过去。你只能看着他的背影，大腿像灌了铅。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "E",
            sit: "balanced",
            text: "分球给套上的边后卫，自己内收抢点",
            check: { attrs: ["heading", "vision"], difficulty: 25, tag: "头球+视野" },
            success: {
              text: "你余光扫到边后卫套上。一脚分球，他下底传中。你内收抢点。额头撞上球。进了。",
              effects: {
                reputation: 7,
                attrs: { heading: 1 }
              }
            },
            fail: {
              text: "分球时机晚了。边后卫已经跑过，球传到空地上。你喘着粗气。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "角球。苏雯没有开到禁区，而是短传给你。你站在角旗区，面前是一片开阔的边路。对方人墙还没散。草皮上的白线在灯光下泛着冷光。",
        sit: "attack",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "沿边线强突下底，撕开防线",
            check: { attrs: ["agility", "speed"], difficulty: 36, tag: "柔韧+速度" },
            success: {
              text: "你沿着边线弹射出去。对方还没反应过来。风灌进耳朵，底线在眼前拉近。传中。球到人到。",
              effects: {
                reputation: 10,
                assists: 1,
                attrs: { agility: 1 }
              }
            },
            fail: {
              text: "启动那一下被补防的人卡住。鞋钉刮着草皮，你踉跄了一步。球出了底线。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地撕开整条边路。底线传中。球像长了眼睛。看台全站起来了。",
              effects: {
                reputation: 18,
                assists: 1,
                attrs: { agility: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "内切到肋部，远射",
            check: { attrs: ["shooting", "power"], difficulty: 38, tag: "射门+力量" },
            success: {
              text: "你内收，拨球变向。禁区前沿。起脚。球像炮弹砸向球门。门将扑了一下，没够到。",
              effects: {
                reputation: 12,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "内切那一下趟大了。后卫伸脚一捅，球弹出去。你的脚踝还在发麻。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地内切远射。球带着弧线砸入死角。安静了一秒，然后所有人都站起来了。",
              effects: {
                reputation: 20,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "横传给弧顶的队友，自己前插",
            check: { attrs: ["vision", "passing"], difficulty: 28, tag: "视野+传球" },
            success: {
              text: "你横传，反身前插。队友一脚直塞回来。配合打出来了。禁区前沿一片开阔。",
              effects: {
                reputation: 7,
                attrs: { vision: 1 }
              }
            },
            fail: {
              text: "横传力量大了。队友没接住，球滚出边线。你肩膀还酸着。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "defense",
            text: "角球战术失败，先回防落位",
            check: { attrs: ["intercept", "iq"], difficulty: 22, tag: "拦截+球商" },
            success: {
              text: "你果断放弃进攻，回防落位。对方反击打到你身侧时，你已经站好了。教练在场边喊，好。",
              effects: {
                reputation: 4,
                attrs: { intercept: 1 }
              }
            },
            fail: {
              text: "回防慢了。对方反击从你身侧打过去。你只能追，肺在烧。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "E",
            sit: "balanced",
            text: "护球等队友跑位，不急",
            check: { attrs: ["balance", "pressure"], difficulty: 24, tag: "平衡+抗压" },
            success: {
              text: "你背身护住球，肩膀顶着逼抢的人。等。队友跑出来了。你分球。节奏在你手里。",
              effects: {
                reputation: 5,
                attrs: { balance: 1 }
              }
            },
            fail: {
              text: "护球时被两人夹击。球被捅走。你的肋骨还在发疼。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "对方边后卫助攻上来，球传大了。你断下皮球，面前是大片空当。他的位置空了。风灌进耳朵，草腥味很浓。反击的机会。",
        sit: "attack",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "沿边路全速推进，下底传中",
            check: { attrs: ["stamina", "speed"], difficulty: 34, tag: "耐力+速度" },
            success: {
              text: "你沿着边线狂奔。肺在烧，但腿还在动。底线。传中。球划出一道弧线飞向禁区。",
              effects: {
                reputation: 10,
                assists: 1,
                attrs: { stamina: 1 }
              }
            },
            fail: {
              text: "跑到三十米时腿软了。传中绵软无力，被门将轻松摘下。你弯着腰喘气。",
              effects: { stamina: -5 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地撕开整条边路。底线传中。球像长了眼睛，砸在队友头上。网绳晃了。",
              effects: {
                reputation: 18,
                assists: 1,
                attrs: { stamina: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "带球推进到弧顶远射",
            check: { attrs: ["shooting", "burst"], difficulty: 36, tag: "射门+爆发" },
            success: {
              text: "你带球推进。二十米。起脚。球像炮弹一样砸向球门。门将扑了一下，没够到。网绳在晃。",
              effects: {
                reputation: 12,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "射门打偏了。球飞过横梁。你的脚背还在发麻。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地远射。球带着弧线砸入死角。门将纹丝不动。看台安静了一秒，然后炸了。",
              effects: {
                reputation: 20,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "分球给中路插上的队友",
            check: { attrs: ["iq", "passing"], difficulty: 29, tag: "球商+传球" },
            success: {
              text: "你抬头一扫。中路，队友正在前插。一脚直塞，球到人到。反击打出来了。",
              effects: {
                reputation: 8,
                assists: 1,
                attrs: { iq: 1 }
              }
            },
            fail: {
              text: "直塞力量大了。球从队友脚边滚过，出了底线。你喘着粗气。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "attack",
            text: "用身体平衡挤开空间，突入禁区",
            check: { attrs: ["balance", "agility"], difficulty: 37, tag: "平衡+柔韧" },
            success: {
              text: "你内收，肩膀一沉。补防的中卫扑过来，你重心没丢，抹过去了。禁区。草皮在鞋钉下翻起。",
              effects: {
                reputation: 11,
                attrs: { balance: 1 }
              }
            },
            fail: {
              text: "内切那一下被中卫卡住。球弹出去，你的脚踝还在发酸。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地连过两人杀入禁区。单刀。推射。安静了一秒，然后看台炸了。",
              effects: {
                reputation: 20,
                goals: 1,
                attrs: { balance: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "不冒险，回传稳住球权",
            check: { attrs: ["hardness", "pressure"], difficulty: 22, tag: "硬度+抗压" },
            success: {
              text: "你回传给后腰。不急。球权稳住了。教练在场边点头。有时候不冒险就是最好的选择。",
              effects: {
                reputation: 4,
                attrs: { hardness: 1 }
              }
            },
            fail: {
              text: "回传力量小了。对方前锋伸脚一捅。险些被断。你后背发凉。",
              effects: { stamina: -3 }
            }
          }
        ]
      }
    ]
  },

  // 前腰·古典十号（重排：每事件5选项=火木水土金各一）
  CAM_classic: {
    desc: "致命一传、控制节奏",
    events: [
      {
        text: "肋部。你在对方中场和后卫线之间拿到球。转身，面对球门。防线在你眼前铺开。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "attack", text: "突施冷箭，远射", check: { attrs: ["shooting", "power"], difficulty: 37, tag: "射门+力量" },
            success: { text: "你迎球远射。球带着{elementAdj}的劲道直挂死角。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "远射打高了。球飞向看台。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】禁区外一脚世界波。球划过弧线砸入网窝。门将纹丝不动。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "盘带推进，撕开防线", check: { attrs: ["dribble", "agility"], difficulty: 35, tag: "盘带+柔韧" },
            success: { text: "你带球推进，连续变向撕开防线。杀入禁区。", effects: { reputation: 9, attrs: { dribble: 1 } } },
            fail: { text: "盘带被对方后腰断下。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "balanced", text: "一脚致命直塞", check: { attrs: ["passing", "vision"], difficulty: 30, tag: "传球+视野" },
            success: { text: "你送出一记手术刀直塞。前锋单刀，推射得手。", effects: { reputation: 9, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "直塞被对方后卫预判拦截。", effects: { stamina: -3 } },
            critical: { text: "【灵光一闪】你的直塞切开了整条防线。前锋单刀破门。他朝你跑来，你只是抬了抬手。", effects: { reputation: 16, assists: 1, attrs: { passing: 2 }, flags: { keySuccess: true } } }
          },
          { id: "D", sit: "balanced", text: "护球观察，等队友跑位", check: { attrs: ["positioning", "balance"], difficulty: 25, tag: "站位+平衡" },
            success: { text: "你护住球，等队友跑出空当。分球。进攻继续。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "护球时被对方从身后捅掉。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "丢球就地反抢", check: { attrs: ["intercept", "tackle"], difficulty: 24, tag: "拦截+铲断" },
            success: { text: "丢球瞬间你就地反抢。一脚拦截，球权夺回。", effects: { reputation: 5, attrs: { intercept: 1 } } },
            fail: { text: "反抢扑空。对方顺势推进。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "反击。后场断球，球经过两脚传递到了你脚下。身前是开阔地，对方防线正在回退。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "后插上，迎球射门", check: { attrs: ["shooting", "burst"], difficulty: 36, tag: "射门+爆发" },
            success: { text: "你后插上，迎球一脚。球钻入网窝。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "插上稍慢。射门被后卫封堵。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你后插上迎球怒射。球带着{elementAdj}的劲道砸入死角。", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "带球推进，吸引防守", check: { attrs: ["dribble", "speed"], difficulty: 34, tag: "盘带+速度" },
            success: { text: "你带球推进，吸引了两名后卫。防线露出破绽。", effects: { reputation: 8, attrs: { dribble: 1 } } },
            fail: { text: "带球被回追的后腰断下。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "balanced", text: "直塞找单刀前锋", check: { attrs: ["passing", "vision"], difficulty: 30, tag: "传球+视野" },
            success: { text: "你一脚直塞。前锋心领神会，单刀破门。", effects: { reputation: 9, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "直塞力量大了。门将出击没收。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "attack", text: "插入禁区抢点", check: { attrs: ["positioning", "resolve"], difficulty: 32, tag: "站位+决断" },
            success: { text: "你插入禁区抢到落点。推射。球进了。", effects: { reputation: 10, goals: 1, attrs: { positioning: 1 } } },
            fail: { text: "抢点慢了。球被后卫解围。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "丢球反抢，掐断对方反击", check: { attrs: ["tackle", "intercept"], difficulty: 24, tag: "铲断+拦截" },
            success: { text: "丢球后你立刻反抢。一脚铲断，把对方反击扼杀。", effects: { reputation: 5, attrs: { tackle: 1 } } },
            fail: { text: "反抢扑空。对方反击打成了。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "前场任意球，正对球门。你把球摆好，退后几步。人墙排好，门将贴着门线指挥。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "attack", text: "直接攻门", check: { attrs: ["shooting", "power"], difficulty: 38, tag: "射门+力量" },
            success: { text: "你起脚。球越过人墙，砸入球网。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "球打在人墙上。弹回来。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】任意球直接破门。球从人墙缝隙钻过，贴着门柱入网。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "假射真突，带球杀入", check: { attrs: ["dribble", "burst"], difficulty: 35, tag: "盘带+爆发" },
            success: { text: "你佯装起脚，突然带球突入禁区。射门。球进了。", effects: { reputation: 11, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "突破被预判。球权丢了。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "balanced", text: "吊入禁区，找抢点队友", check: { attrs: ["passing", "vision"], difficulty: 30, tag: "传球+视野" },
            success: { text: "你吊入禁区。队友争顶成功，头球破门。", effects: { reputation: 8, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "吊球力量大了。球飞出底线。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "attack", text: "禁区里抢点争顶", check: { attrs: ["heading", "positioning"], difficulty: 32, tag: "头球+站位" },
            success: { text: "你绕到前点抢点。头球一蹭，球进了。", effects: { reputation: 9, goals: 1, attrs: { heading: 1 } } },
            fail: { text: "争顶输了。球被后卫顶出。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "短传控制，防对方反抢", check: { attrs: ["intercept", "rhythm"], difficulty: 23, tag: "拦截+节奏" },
            success: { text: "你短传稳住节奏，顺势卡断了对方反抢的线路。", effects: { reputation: 4, attrs: { intercept: 1 } } },
            fail: { text: "短传被对方逼抢破坏。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "对方后腰像影子一样跟着你。你拿球，他贴上来。你跑位，他跟着。你被重点盯防了。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "attack", text: "强行起脚远射", check: { attrs: ["shooting", "resolve"], difficulty: 36, tag: "射门+决断" },
            success: { text: "你抢在贴防前起脚。远射。球进了。", effects: { reputation: 10, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "起脚被他伸脚封堵。", effects: { stamina: -4 } }
          },
          { id: "B", sit: "attack", text: "盘带摆脱他的纠缠", check: { attrs: ["dribble", "agility"], difficulty: 35, tag: "盘带+柔韧" },
            success: { text: "你一个变向，把他甩在身后。空间出来了。", effects: { reputation: 8, attrs: { dribble: 1 } } },
            fail: { text: "盘带被他从身后捅掉。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "balanced", text: "一脚出球，不给他贴防机会", check: { attrs: ["passing", "iq"], difficulty: 30, tag: "传球+球商" },
            success: { text: "你一脚出球。他贴上来的时候球已经走了。", effects: { reputation: 7, attrs: { passing: 1 } } },
            fail: { text: "一脚出球力量小了。被他断球。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "护球卡位，把他挡在身后", check: { attrs: ["positioning", "balance"], difficulty: 25, tag: "站位+平衡" },
            success: { text: "你用身体卡住他，护住球。队友赶到接应。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "你被他挤倒。球丢了。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "丢球反抢，绞杀", check: { attrs: ["tackle", "strength"], difficulty: 26, tag: "铲断+对抗" },
            success: { text: "丢球瞬间你一个肩撞加铲断，把球硬生生抢回。", effects: { reputation: 5, attrs: { tackle: 1 } } },
            fail: { text: "反抢扑空。你撞在他身上，弹开了。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "你方控球，但攻不进去。对方缩在半场，密不透风。球在你脚下，全队在等你的调度。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "attack", text: "突施冷箭，远射破密集", check: { attrs: ["shooting", "burst"], difficulty: 37, tag: "射门+爆发" },
            success: { text: "你远射。球从人缝里钻入网窝。密集防守，被一脚打破。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "远射被后卫封堵。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】禁区外一脚世界波，撕开了铁桶阵。门将鞭长莫及。", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "带球推进，搅乱防线", check: { attrs: ["dribble", "speed"], difficulty: 34, tag: "盘带+速度" },
            success: { text: "你带球推进，把对方的防守阵型搅乱了。空当出来了。", effects: { reputation: 8, attrs: { dribble: 1 } } },
            fail: { text: "带球陷入重围。被断了。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "balanced", text: "长传转移，调动防线", check: { attrs: ["passing", "vision"], difficulty: 29, tag: "传球+视野" },
            success: { text: "你一脚长传转移到弱侧。对方防线被调动，露出破绽。", effects: { reputation: 7, attrs: { passing: 1 } } },
            fail: { text: "长传被对方预判拦截。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "控制节奏，等队友跑位", check: { attrs: ["positioning", "iq"], difficulty: 25, tag: "站位+球商" },
            success: { text: "你压住节奏，等队友跑出空当。分球。进攻重新组织。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "你犹豫了。球被对方逼抢破坏。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "拦截卡断，防对方反抢", check: { attrs: ["intercept", "rhythm"], difficulty: 24, tag: "拦截+节奏" },
            success: { text: "你预判到对方反抢的线路，一脚拦截把球卡下。", effects: { reputation: 5, attrs: { intercept: 1 } } },
            fail: { text: "拦截扑空。对方反击打成了。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "比赛进入读秒。你方落后一球。球到了你脚下，对方全线退守。最后一攻。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "远射绝杀", check: { attrs: ["shooting", "power"], difficulty: 38, tag: "射门+力量" },
            success: { text: "你迎球远射。球进了。绝平。你跪在草皮上。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "远射偏出。终场哨响。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】读秒阶段，你禁区外一脚世界波绝杀。所有人都疯了。", effects: { reputation: 22, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "带球突破，撕开防线", check: { attrs: ["dribble", "burst"], difficulty: 37, tag: "盘带+爆发" },
            success: { text: "你带球连过两人，杀入禁区。射门。球进了。绝平。", effects: { reputation: 12, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "突破被围抢断下。", effects: { stamina: -5 } }
          },
          { id: "C", sit: "balanced", text: "致命一传，找队友", check: { attrs: ["passing", "vision"], difficulty: 30, tag: "传球+视野" },
            success: { text: "你送出一记致命直塞。队友推射空门。绝平。", effects: { reputation: 9, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "直塞被后卫拦截。终场哨响。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "attack", text: "插入禁区抢点", check: { attrs: ["positioning", "resolve"], difficulty: 32, tag: "站位+决断" },
            success: { text: "你插入禁区抢到落点。推射。球进了。", effects: { reputation: 10, goals: 1, attrs: { positioning: 1 } } },
            fail: { text: "抢点慢了。球被门将没收。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "先回防，保住翻盘火种", check: { attrs: ["tackle", "positioning"], difficulty: 22, tag: "铲断+站位" },
            success: { text: "你先回防完成关键封堵。火种还在。", effects: { reputation: 5, attrs: { tackle: 1 } } },
            fail: { text: "回防稍慢。对方远射偏出。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "对方断球发动反击。中场就你一个回追的人。你得先顶上去，延缓这一下。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "拦截对方的第一传", check: { attrs: ["intercept", "iq"], difficulty: 30, tag: "拦截+球商" },
            success: { text: "你预判到传球线路，一脚拦截把球卡下。反击扼杀。", effects: { reputation: 7, attrs: { intercept: 1 } } },
            fail: { text: "拦截扑空。对方推进了。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】你精准预判，拦截了对方最致命的那脚传球。", effects: { reputation: 12, attrs: { intercept: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "defense", text: "全速回追，缠住持球人", check: { attrs: ["speed", "stamina"], difficulty: 30, tag: "速度+耐力" },
            success: { text: "你咬牙回追，死死缠住持球人。他减速了。回追后卫赶到。", effects: { reputation: 7, attrs: { speed: 1 } } },
            fail: { text: "你追了，但腿灌了铅。他抹过你。", effects: { stamina: -6 } }
          },
          { id: "C", sit: "balanced", text: "断下球，一脚长传打反击", check: { attrs: ["passing", "vision"], difficulty: 27, tag: "传球+视野" },
            success: { text: "你断球后直接长传找前场。反击打成了。", effects: { reputation: 6, attrs: { passing: 1 } } },
            fail: { text: "长传力量大了。球出了边线。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "defense", text: "卡住身位，延缓推进", check: { attrs: ["positioning", "balance"], difficulty: 28, tag: "站位+平衡" },
            success: { text: "你边退边卡住身位。对方推进被延缓，回追后卫赶到。", effects: { reputation: 6, attrs: { positioning: 1 } } },
            fail: { text: "对方一个变向，你重心丢了。", effects: { stamina: -5 } }
          },
          { id: "E", sit: "defense", text: "赌一把，奋力铲抢", check: { attrs: ["resolve", "power"], difficulty: 33, tag: "决断+力量" },
            success: { text: "你豁出去了。一个肩撞加铲断，把球连人带球拦下。", effects: { reputation: 6, attrs: { resolve: 1 } } },
            fail: { text: "你扑得太凶。对方一晃，你摔在草皮上。", effects: { stamina: -6 } }
          }
        ]
      },
{
        text: "角球。你站在角旗区，球摆在白线交叉点上。禁区里人挤人，肘部和肩膀绞在一起。你退后三步，深吸一口气。草腥味混着汗味，看台的声浪压下来。",
        sit: "balanced",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "弧线球吊向后点，找埋伏的队友",
            check: { attrs: ["passing", "vision"], difficulty: 29, tag: "传球+视野" },
            success: {
              text: "你{elementAdj}地搓出一道弧线。球越过所有人，精准落在后点。队友迎球一顶，网绳颤了。",
              effects: {
                reputation: 9,
                assists: 1,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "弧线太浅。前点后卫一甩头，球弹出去老远。你的脚背还在发酸。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "直接旋向球门，搏一个近角",
            check: { attrs: ["shooting", "burst"], difficulty: 36, tag: "射门+爆发" },
            success: {
              text: "你{elementAdj}地抽向近角。门将判断错了方向，球擦着门柱钻入网窝。全场安静了一秒。",
              effects: {
                reputation: 13,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "旋转不够。球打在门柱外侧弹出去，铁皮的震声还在耳朵里。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地旋出一道诡异弧线。球绕过人墙，砸入死角。门将连手都没伸。看台炸了。",
              effects: {
                reputation: 20,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "观察跑位，等队友卡住位置再开",
            check: { attrs: ["positioning", "pressure"], difficulty: 24, tag: "站位+抗压" },
            success: {
              text: "你等了。三秒。队友卡住了后卫的腰。你起脚。球到人到。配合像排练过一百遍。",
              effects: {
                reputation: 6,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "等太久了。裁判举旗示意延误。你被吹了。胸口闷了一下。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "attack",
            text: "短角球配合后带球内切",
            check: { attrs: ["dribble", "agility"], difficulty: 31, tag: "盘带+柔韧" },
            success: {
              text: "你短传给苏雯，她回做。你接球内切，拨球变向。后卫重心丢了。你抹进禁区。",
              effects: {
                reputation: 8,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "内切时被后卫卡住了。球弹走了。你的膝盖磕在草皮上。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "开出后迅速回位，防对方反击",
            check: { attrs: ["intercept", "tackle"], difficulty: 23, tag: "拦截+铲断" },
            success: {
              text: "角球被顶出来，对方要打反击。你已经回到中圈。一记干净的拦截，球权夺回。肺在烧，但值得。",
              effects: {
                reputation: 5,
                attrs: { intercept: 1 }
              }
            },
            fail: {
              text: "回位慢了半拍。对方后腰带球推进，你只能犯规。黄牌。大腿发酸。",
              effects: { stamina: -4 }
            }
          }
        ]
      },
{
        text: "肋部。你和前锋对了个眼神。他回撤，你前插。对方后卫犹豫了那零点几秒。草皮被鞋钉翻起，泥土的腥气钻进鼻腔。",
        sit: "attack",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "一脚直塞打穿防线，送前锋单刀",
            check: { attrs: ["passing", "vision"], difficulty: 34, tag: "传球+视野" },
            success: {
              text: "你{elementAdj}地送出一脚贴地直塞。球从两名后卫之间穿过，前锋迎球推射。网绳颤了。",
              effects: {
                reputation: 11,
                assists: 1,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "直塞力量小了。后卫伸脚一捅，球弹走了。你的脚踝还在发麻。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地送出一脚手术刀般的直塞。球贴着草皮，撕开整条防线。前锋单刀。全场起立。",
              effects: {
                reputation: 18,
                assists: 1,
                attrs: { passing: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "自己带球突入肋部空当",
            check: { attrs: ["dribble", "agility"], difficulty: 35, tag: "盘带+柔韧" },
            success: {
              text: "你肩膀一沉，拨球变向。后卫重心丢了。你抹进禁区，起脚。球进了。",
              effects: {
                reputation: 10,
                goals: 1,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "拨球趟大了。后卫伸脚一挡，球弹在你小腿上出底线。胫骨发疼。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "C",
            sit: "attack",
            text: "弧顶远射，打门将一个措手不及",
            check: { attrs: ["shooting", "power"], difficulty: 37, tag: "射门+力量" },
            success: {
              text: "你{elementAdj}地抡起脚背。球像炮弹一样砸向球门。门将扑了一下，没够着。网绳剧烈颤抖。",
              effects: {
                reputation: 12,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "射门打高了。球飞上看台，有人接住了。你的脚背还在发烫。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地抽出一脚世界波。球带着弧线砸入死角。门将纹丝不动。场边教练把战术板摔了。",
              effects: {
                reputation: 21,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "卡住身位护球，等队友跑出空当再分",
            check: { attrs: ["balance", "pressure"], difficulty: 27, tag: "平衡+抗压" },
            success: {
              text: "你像钉子一样卡住后卫。肩膀顶着肩膀，肋骨发疼。队友跑出空当，你分球。",
              effects: {
                reputation: 7,
                attrs: { balance: 1 }
              }
            },
            fail: {
              text: "你被挤开了。后背撞在广告牌上，铁皮的凉意透过球衣。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "丢球就地反抢，掐断反击线路",
            check: { attrs: ["tackle", "strength"], difficulty: 26, tag: "铲断+对抗" },
            success: {
              text: "丢球的瞬间你就地反抢。肩膀顶上去，一记干净的铲断。球权夺回。肺部灼烧。",
              effects: {
                reputation: 5,
                attrs: { tackle: 1 }
              }
            },
            fail: {
              text: "反抢扑空。对方顺势推进，你只能看着背影。大腿发酸。",
              effects: { stamina: -4 }
            }
          }
        ]
      },
{
        text: "后场。门将把球传给你，对方两名前锋立刻压上来逼抢。草腥味呛进喉咙。出球线路被掐得死死的。看台在嘘。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "冷静护球，等逼抢者失去重心再出球",
            check: { attrs: ["balance", "pressure"], difficulty: 27, tag: "平衡+抗压" },
            success: {
              text: "你像钉子一样卡住位置。肩膀顶着肩膀，肋骨发疼。逼抢者重心丢了。你从容出球。",
              effects: {
                reputation: 6,
                attrs: { balance: 1 }
              }
            },
            fail: {
              text: "你被挤开了。球被捅走，后背撞在广告牌上。铁皮的凉意透过球衣。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "B",
            sit: "balanced",
            text: "一脚长传转移到弱侧，撕开逼抢",
            check: { attrs: ["passing", "vision"], difficulty: 30, tag: "传球+视野" },
            success: {
              text: "你{elementAdj}地抡起脚背。球划过半场，精准落在弱侧队友脚下。逼抢白跑了。",
              effects: {
                reputation: 8,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "长传偏了。球飞出边线。对方掷界外球，你的脚踝还在发酸。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "带球摆脱，用盘带晃过逼抢者",
            check: { attrs: ["dribble", "agility"], difficulty: 31, tag: "盘带+柔韧" },
            success: {
              text: "你身体一沉，拨球变向。逼抢者扑空了。你带球推进到中场，肺在烧。",
              effects: {
                reputation: 7,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "拨球被断。对方顺势打反击，你只能回追。大腿肌肉在尖叫。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "D",
            sit: "defense",
            text: "硬扛逼抢者，用身体护住球权",
            check: { attrs: ["strength", "hardness"], difficulty: 28, tag: "对抗+硬度" },
            success: {
              text: "你像一堵墙。肩膀顶住对方胸口，肋骨在叫。球在你脚下，纹丝不动。逼抢者退了。",
              effects: {
                reputation: 5,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "你被顶开了。球弹出去，对方顺势推进。后背还在发麻。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "果断解围，大脚踢向前场",
            check: { attrs: ["power", "resolve"], difficulty: 24, tag: "力量+决断" },
            success: {
              text: "你没犹豫。抡脚。球飞出去了。三十米。逼抢者只能看着。你喘了口气。",
              effects: {
                reputation: 4,
                attrs: { power: 1 }
              }
            },
            fail: {
              text: "解围没踢远。球弹回来了。对方继续逼。你的脚背发麻。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "禁区外二十五米。对方防线收得很深，没有直塞的空间。球在你脚下，草腥味混着汗味。你抬头看了一眼球门。脚背发烫。",
        sit: "attack",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "拔脚怒射，打门将一个措手不及",
            check: { attrs: ["shooting", "power"], difficulty: 38, tag: "射门+力量" },
            success: {
              text: "你{elementAdj}地抡圆了脚背。球像出膛的炮弹。门将扑了一下，指尖差了三厘米。网绳剧烈颤抖。",
              effects: {
                reputation: 13,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "射门打偏了。球飞上看台第二层。你的脚背还在发麻。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地抽出一脚石破天惊的远射。球带着下坠砸入网窝。门将连反应都没有。全场沸腾。",
              effects: {
                reputation: 22,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "假射真传，直塞给反跑的前锋",
            check: { attrs: ["passing", "iq"], difficulty: 33, tag: "传球+球商" },
            success: {
              text: "你抡脚，后卫缩了。球却从人缝中穿过，前锋反跑到位。单刀。推射。进了。",
              effects: {
                reputation: 10,
                assists: 1,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "直塞被后卫预判了。他伸脚一挡，球弹走了。你的脚踝发酸。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "C",
            sit: "attack",
            text: "带球推进，拉开射门角度",
            check: { attrs: ["dribble", "speed"], difficulty: 34, tag: "盘带+速度" },
            success: {
              text: "你带球横移两步，拉开了角度。后卫没跟上。起脚。球贴着门柱内侧钻入。",
              effects: {
                reputation: 11,
                goals: 1,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "横移时被后卫卡住了。球被捅走，你踉跄了一步。膝盖发疼。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "分边给套上的边后卫，重新组织",
            check: { attrs: ["positioning", "rhythm"], difficulty: 26, tag: "站位+节奏" },
            success: {
              text: "你分边。边后卫套上，传中。禁区里一片混战。节奏重新活过来了。",
              effects: {
                reputation: 6,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "分边力量大了。球滚出边线。你甩了甩手。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "丢球后立刻反抢，不给对方反击空间",
            check: { attrs: ["intercept", "tackle"], difficulty: 25, tag: "拦截+铲断" },
            success: {
              text: "球被挡出来的瞬间你就压上去了。一记拦截，球权夺回。肺部灼烧，但节奏没断。",
              effects: {
                reputation: 5,
                attrs: { intercept: 1 }
              }
            },
            fail: {
              text: "反抢慢了。对方已经带球推进了十米。你只能回追，大腿在叫。",
              effects: { stamina: -4 }
            }
          }
        ]
      }
    ]
  },

  // 中后卫·上抢型（重排：每事件5选项=火木水土金各一）
  CB_stopper: {
    desc: "前顶拦截、回追铲球、凶狠绞杀",
    events: [
      {
        text: "对方前锋背身拿球，正在转身。你在他身后半步。这是你上抢的时机。草皮上还带着露水。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "前顶铲抢，掐死转身", check: { attrs: ["tackle", "intercept"], difficulty: 32, tag: "铲断+拦截" },
            success: { text: "你{elementAdj}地一个箭步上前。铲断。球捅出去了。干净利落。", effects: { reputation: 8, attrs: { tackle: 1 } } },
            fail: { text: "上抢早了。他顺势一抹，过了你。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】你精准上抢，连球带人一起留下。对方前锋愣在原地。", effects: { reputation: 13, attrs: { tackle: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "defense", text: "回追缠斗，不让他转身", check: { attrs: ["speed", "stamina"], difficulty: 30, tag: "速度+耐力" },
            success: { text: "你死死贴住他，不给他转身空间。他被迫回传。", effects: { reputation: 7, attrs: { speed: 1 } } },
            fail: { text: "你贴得太紧，被他一个变向甩开。", effects: { stamina: -5 } }
          },
          { id: "C", sit: "balanced", text: "抢下球权，长传找前场", check: { attrs: ["passing", "vision"], difficulty: 27, tag: "传球+视野" },
            success: { text: "你断球后不停球，直接长传找前场。反击打成了。", effects: { reputation: 6, attrs: { passing: 1 } } },
            fail: { text: "长传力量大了。球出了边线。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "defense", text: "卡住身位，封堵突破线路", check: { attrs: ["positioning", "balance"], difficulty: 28, tag: "站位+平衡" },
            success: { text: "你卡住身位，把他逼向边线。突破线路被你封死。", effects: { reputation: 6, attrs: { positioning: 1 } } },
            fail: { text: "他一个变向，你重心丢了。", effects: { stamina: -5 } }
          },
          { id: "E", sit: "defense", text: "凶狠绞杀，连人带球拦下", check: { attrs: ["power", "resolve"], difficulty: 33, tag: "力量+决断" },
            success: { text: "你豁出去了。一个肩撞加铲断，把球硬生生绞下。哨没响。", effects: { reputation: 7, attrs: { power: 1 } } },
            fail: { text: "你扑得太凶。对方一晃，你摔在草皮上。", effects: { stamina: -6 } }
          }
        ]
      },
      {
        text: "对方反击。前锋单刀直入，防线被打穿了。你是最后的回追者。风灌进耳朵。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "全速回追，背后滑铲", check: { attrs: ["tackle", "speed"], difficulty: 34, tag: "铲断+速度" },
            success: { text: "你{elementAdj}地拍马赶到。一记干净的滑铲，球捅出底线。", effects: { reputation: 9, attrs: { tackle: 1 } } },
            fail: { text: "回追慢了一步。滑铲落空。对方得分。", effects: { stamina: -6 } },
            critical: { text: "【灵光一闪】铁壁回追。你的滑铲把球和人一起留在了底线外。", effects: { reputation: 14, attrs: { tackle: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "defense", text: "拼命回追，缠住他", check: { attrs: ["speed", "stamina"], difficulty: 31, tag: "速度+耐力" },
            success: { text: "你咬牙回追，死死缠住他。他甩不开你，只能减速。门将出击了。", effects: { reputation: 7, attrs: { speed: 1 } } },
            fail: { text: "你追了，但腿灌了铅。他一步抹过你。", effects: { stamina: -6 } }
          },
          { id: "C", sit: "balanced", text: "断球转身，长传发动快反", check: { attrs: ["passing", "vision"], difficulty: 27, tag: "传球+视野" },
            success: { text: "你断球后直接长传找前场。反击打成了。", effects: { reputation: 6, attrs: { passing: 1 } } },
            fail: { text: "长传力量大了。球出了边线。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "defense", text: "且战且退，封堵射门角度", check: { attrs: ["positioning", "balance"], difficulty: 28, tag: "站位+平衡" },
            success: { text: "你边退边封堵角度。对方被迫走外线，射门偏出。", effects: { reputation: 6, attrs: { positioning: 1 } } },
            fail: { text: "对方一个变向，你重心丢了。他推射得手。", effects: { stamina: -5 } }
          },
          { id: "E", sit: "defense", text: "赌一把，奋力拦截", check: { attrs: ["resolve", "power"], difficulty: 33, tag: "决断+力量" },
            success: { text: "你豁出去了。一个肩撞把人球一起拦下。球权是你的。", effects: { reputation: 6, attrs: { resolve: 1 } } },
            fail: { text: "你扑得太凶。对方一晃，你摔在草皮上。", effects: { stamina: -6 } }
          }
        ]
      },
      {
        text: "后场。门将把球传给你。对方前锋立刻朝你扑来。你得在压迫下把球处理出去。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "attack", text: "带球长驱直入，杀过中场", check: { attrs: ["burst", "resolve"], difficulty: 34, tag: "爆发+决断" },
            success: { text: "你不慌，带球推进。对方前锋被你甩在身后。你杀过了中场。", effects: { reputation: 8, attrs: { burst: 1 } } },
            fail: { text: "带球被对方前锋回追断下。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】你带球长驱直入，连过两人杀到前场。带刀后卫。看台一片惊呼。", effects: { reputation: 14, attrs: { burst: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "带球推进，吸引逼抢", check: { attrs: ["dribble", "speed"], difficulty: 32, tag: "盘带+速度" },
            success: { text: "你带球推进，吸引了对方逼抢。中场露出空当。", effects: { reputation: 7, attrs: { dribble: 1 } } },
            fail: { text: "带球陷入围抢。被断了。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "balanced", text: "一脚长传，制导前场", check: { attrs: ["passing", "vision"], difficulty: 29, tag: "传球+视野" },
            success: { text: "你一脚长传，精准找到前场队友。进攻发动。", effects: { reputation: 7, attrs: { passing: 1 } } },
            fail: { text: "长传力量大了。球出了边线。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "稳健护球，等队友接应", check: { attrs: ["positioning", "balance"], difficulty: 24, tag: "站位+平衡" },
            success: { text: "你护住球，等队友跑出接应线路。分球。稳住。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "护球时被对方前锋捅掉。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "回传门将，反抢卡断线路", check: { attrs: ["intercept", "iq"], difficulty: 22, tag: "拦截+球商" },
            success: { text: "你回传门将稳住，顺势卡断了对方反抢的线路。", effects: { reputation: 4, attrs: { intercept: 1 } } },
            fail: { text: "回传力量轻了。对方前锋差点断球。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "角球。对方开出。禁区里一片混战，人挤人。你负责盯对方的高点。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "争顶解围", check: { attrs: ["heading", "positioning"], difficulty: 32, tag: "头球+站位" },
            success: { text: "你{elementAdj}地抢前点。头球解围。球飞出去了。", effects: { reputation: 8, attrs: { heading: 1 } } },
            fail: { text: "争顶输了。对方头球攻门。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】你力压对方高点，头球解围。球飞出去的时候，你甚至有时间调整落地。", effects: { reputation: 13, attrs: { heading: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "defense", text: "卡住对方高点，不让他起跳", check: { attrs: ["strength", "hardness"], difficulty: 29, tag: "对抗+硬度" },
            success: { text: "你用身体卡住对方高点。他跳不起来。球被门将没收。", effects: { reputation: 7, attrs: { strength: 1 } } },
            fail: { text: "你被挤开了。对方高点争顶成功。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "balanced", text: "解围顺势长传，打反击", check: { attrs: ["passing", "vision"], difficulty: 27, tag: "传球+视野" },
            success: { text: "你解围后直接长传找前场。反击打成了。", effects: { reputation: 6, attrs: { passing: 1 } } },
            fail: { text: "长传力量大了。球出了边线。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "defense", text: "回追第二落点", check: { attrs: ["speed", "stamina"], difficulty: 28, tag: "速度+耐力" },
            success: { text: "球被顶出来，你抢先一步回追到第二落点。解围。", effects: { reputation: 6, attrs: { speed: 1 } } },
            fail: { text: "第二落点被对方抢到。又是一波攻势。", effects: { stamina: -5 } }
          },
          { id: "E", sit: "defense", text: "奋力解围，把球踢远", check: { attrs: ["power", "resolve"], difficulty: 30, tag: "力量+决断" },
            success: { text: "你迎球一脚，把球狠狠踢出危险区。越远越好。", effects: { reputation: 6, attrs: { power: 1 } } },
            fail: { text: "解围踢呲了。球弹到对方脚下。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "对方核心在中场拿球，组织进攻。教练在场边喊：盯死他。你贴了上去。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "上抢铲断他的脚下球", check: { attrs: ["tackle", "intercept"], difficulty: 32, tag: "铲断+拦截" },
            success: { text: "你看准时机，一脚铲断。球捅出去了。核心愣了。", effects: { reputation: 8, attrs: { tackle: 1 } } },
            fail: { text: "上抢被对方核心一个变向晃过。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】你精准上抢，从对方核心脚下把球断下。场边教练攥紧了拳头。", effects: { reputation: 13, attrs: { tackle: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "defense", text: "全场回追，死死缠住", check: { attrs: ["speed", "stamina"], difficulty: 30, tag: "速度+耐力" },
            success: { text: "你像影子一样缠住他。他甩不开你，组织不起来。", effects: { reputation: 7, attrs: { speed: 1 } } },
            fail: { text: "你追了，但被他一个加速甩开。", effects: { stamina: -6 } }
          },
          { id: "C", sit: "balanced", text: "断球后发动反击", check: { attrs: ["passing", "iq"], difficulty: 27, tag: "传球+球商" },
            success: { text: "你断球后一脚出球，发动反击。前场队友拿球推进。", effects: { reputation: 6, attrs: { passing: 1 } } },
            fail: { text: "出球被对方拦截。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "defense", text: "卡住身位，逼他走外线", check: { attrs: ["positioning", "balance"], difficulty: 28, tag: "站位+平衡" },
            success: { text: "你卡住身位，把他逼向边线。他的威胁传球被封死。", effects: { reputation: 6, attrs: { positioning: 1 } } },
            fail: { text: "他一个变向，你重心丢了。", effects: { stamina: -5 } }
          },
          { id: "E", sit: "defense", text: "凶狠绞杀，连人带球", check: { attrs: ["power", "resolve"], difficulty: 33, tag: "力量+决断" },
            success: { text: "你豁出去了。一个肩撞加铲断，把核心连人带球拦下。", effects: { reputation: 7, attrs: { power: 1 } } },
            fail: { text: "你扑得太凶。对方核心一晃，你摔在草皮上。", effects: { stamina: -6 } }
          }
        ]
      },
      {
        text: "比赛进入读秒。你方领先一球。对方全线压上，狂攻。你得守住这最后一下。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "铲断解围，把球踢出去", check: { attrs: ["tackle", "intercept"], difficulty: 31, tag: "铲断+拦截" },
            success: { text: "你一脚铲断，把球捅出危险区。守住了。", effects: { reputation: 8, attrs: { tackle: 1 } } },
            fail: { text: "铲断落空。对方射门。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】读秒阶段，你关键铲断化解了对方最后一次进攻。终场哨响。", effects: { reputation: 13, attrs: { tackle: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "defense", text: "回追补防，缠住前锋", check: { attrs: ["speed", "stamina"], difficulty: 30, tag: "速度+耐力" },
            success: { text: "你咬牙回追，死死缠住对方前锋。他甩不开你。", effects: { reputation: 7, attrs: { speed: 1 } } },
            fail: { text: "你追了，但腿灌了铅。他抹过你。", effects: { stamina: -6 } }
          },
          { id: "C", sit: "balanced", text: "解围长传，耗掉时间", check: { attrs: ["passing", "rhythm"], difficulty: 26, tag: "传球+节奏" },
            success: { text: "你解围后一脚长传踢向前场。时间一秒一秒过去。", effects: { reputation: 5, attrs: { passing: 1 } } },
            fail: { text: "长传踢呲了。球权又丢了。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "defense", text: "卡住身位，封堵射门", check: { attrs: ["positioning", "balance"], difficulty: 28, tag: "站位+平衡" },
            success: { text: "你卡住身位，用身体封堵射门。球打在你身上弹出。", effects: { reputation: 7, attrs: { positioning: 1 } } },
            fail: { text: "封堵慢了。对方射门得分。", effects: { stamina: -5 } }
          },
          { id: "E", sit: "defense", text: "奋力封堵，豁出去了", check: { attrs: ["resolve", "power"], difficulty: 32, tag: "决断+力量" },
            success: { text: "你豁出去了。一个飞身封堵，把对方的射门挡出。", effects: { reputation: 7, attrs: { resolve: 1 } } },
            fail: { text: "封堵扑空。你摔在草皮上。", effects: { stamina: -6 } }
          }
        ]
      },
{
        text: "对方前锋在越位线附近来回游走，眼睛死死盯着持球人。你瞥了一眼边裁的位置，朝搭档打了个手势。草腥味混着汗味。整体前顶，就这一下。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "一声吼，指挥防线整体前压造越位",
            check: { attrs: ["intercept", "positioning"], difficulty: 26, tag: "拦截+站位" },
            success: {
              text: "你一声吼，整条防线齐齐前压。对方前锋启动早了半步，边裁举旗。越位。肺里的浊气一口吐出来。",
              effects: {
                reputation: 7,
                attrs: { intercept: 1 }
              }
            },
            fail: {
              text: "防线没压齐。对方前锋反越位成功，单刀。你后背发凉，鞋钉在草皮上打了个滑。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "造越位失败，全力回追卡住身位",
            check: { attrs: ["speed", "stamina"], difficulty: 29, tag: "速度+耐力" },
            success: {
              text: "你转身就追，两步抢回身位，肩膀一卡，把球护出底线。肺在烧，可你追上了。",
              effects: {
                reputation: 7,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "回追慢了半拍。对方一抹而过，你只能看着他的背影，大腿发酸。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "阅读对方传球路线，提前移动卡接球点",
            check: { attrs: ["iq", "positioning"], difficulty: 27, tag: "球商+站位" },
            success: {
              text: "你没看球，看的是他的眼神。传球刚起，你已经卡在接球点上。一伸脚，球断了。",
              effects: {
                reputation: 7,
                attrs: { iq: 1 }
              }
            },
            fail: {
              text: "判断错了路线。球从你身侧漏过，你扑了个空，腰还扭了一下。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "defense",
            text: "对方强行突破，果断放铲",
            check: { attrs: ["resolve", "tackle"], difficulty: 30, tag: "决断+铲断" },
            success: {
              text: "你毫不犹豫，倒地一铲。鞋钉先碰到球，连人带球铲出边线。看台一片惊呼。",
              effects: {
                reputation: 8,
                attrs: { resolve: 1 }
              }
            },
            fail: {
              text: "铲球铲空了。对方顺势抹过，你摔在草皮上，膝盖火辣辣地疼。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "E",
            sit: "balanced",
            text: "站位卡死内线，把对方逼向边路",
            check: { attrs: ["positioning", "balance"], difficulty: 24, tag: "站位+平衡" },
            success: {
              text: "你侧身一站，把内线堵死。对方只能往边路走，威胁小了。你稳稳卡住，没给一点缝隙。",
              effects: {
                reputation: 6,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "站位偏了半步。对方从内线抹过，你重心一歪，险些摔倒。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "雨越下越大，草皮上积起一层水。对方一记长传打身后，前锋顺势插上。你的球衣贴在身上，沉得像铅。回追。肺在烧。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "全力回追，抢在对方触球前卡住身位",
            check: { attrs: ["speed", "stamina"], difficulty: 29, tag: "速度+耐力" },
            success: {
              text: "你咬牙冲刺，水花在鞋钉下炸开。两步抢回身位，把球护出底线。肺像要炸开。",
              effects: {
                reputation: 7,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "湿滑的草皮让你打了个趔趄。对方一抹而过，单刀。你的腿像灌了铅。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "追上后一记滑铲，连人带球铲出底线",
            check: { attrs: ["tackle", "hardness"], difficulty: 31, tag: "铲断+硬度" },
            success: {
              text: "你贴地滑出去，水花溅起一人高。鞋钉先碰到球，连人带球铲出底线。干净。",
              effects: {
                reputation: 8,
                attrs: { tackle: 1 }
              }
            },
            fail: {
              text: "草皮太滑，铲球铲偏了。对方顺势突破，你趴在积水里，半边身子冰凉。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "湿滑草皮上稳住重心，贴身缠斗",
            check: { attrs: ["balance", "strength"], difficulty: 27, tag: "平衡+对抗" },
            success: {
              text: "你压低重心，肩膀顶住对方。雨水顺着下巴滴，你纹丝不动，把他逼向边线。",
              effects: {
                reputation: 6,
                attrs: { balance: 1 }
              }
            },
            fail: {
              text: "脚下一滑，你摔坐在积水里。对方扬长而去，凉意渗进球衣。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "雨战中冷静判断落点，提前卡住线路",
            check: { attrs: ["iq", "positioning"], difficulty: 26, tag: "球商+站位" },
            success: {
              text: "你没去追球，而是卡住接球点。球刚落地，你已经伸脚把它断下。脑子比腿快。",
              effects: {
                reputation: 6,
                attrs: { iq: 1 }
              }
            },
            fail: {
              text: "判断错了落点。球弹到另一边，你扑了个空，雨水糊住了眼睛。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "体能极限，咬牙奋力一搏把球捅走",
            check: { attrs: ["resolve", "stamina"], difficulty: 30, tag: "决断+耐力" },
            success: {
              text: "腿已经不听使唤，你还是奋力伸出一脚。球被捅出边线。你撑着膝盖，喘得像拉风箱。",
              effects: {
                reputation: 7,
                attrs: { resolve: 1 }
              }
            },
            fail: {
              text: "伸脚慢了一瞬。对方抹过，你再也追不动了，肺部一阵腥甜。",
              effects: { stamina: -5 }
            }
          }
        ]
      },
{
        text: "禁区前沿，对方的射门被后卫挡出。球弹起来，落到大禁区线附近。双方球员同时扑向那个落点。草皮被鞋钉翻得稀烂，泥土腥气直冲鼻腔。",
        sit: "balanced",
        choices: [
          {
            id: "A",
            sit: "balanced",
            text: "用身体扛开对方，把二点球护下来",
            check: { attrs: ["strength", "balance"], difficulty: 27, tag: "对抗+平衡" },
            success: {
              text: "你肩膀一沉，把对方后腰扛在身后。球护住了。肋骨发疼，可球权是你的。",
              effects: {
                reputation: 7,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "对抗中你被挤开，球被对方勾走。后背撞在人身上，闷响。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "B",
            sit: "balanced",
            text: "抢先一步，柔韧地伸脚把球勾走",
            check: { attrs: ["agility", "speed"], difficulty: 28, tag: "柔韧+速度" },
            success: {
              text: "你比所有人快半步，脚尖一勾，把球从人堆里勾了出来。轻巧，干净。",
              effects: {
                reputation: 7,
                attrs: { agility: 1 }
              }
            },
            fail: {
              text: "伸脚慢了一拍，球被对方先捅走。你的脚踝扭了一下，酸胀。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "抢到二点球，顺势一脚分给边路",
            check: { attrs: ["passing", "vision"], difficulty: 25, tag: "传球+视野" },
            success: {
              text: "你抢下落点，抬头一扫，一脚分边。球贴着草皮滑到队友脚下。反击打出来了。",
              effects: {
                reputation: 6,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "传球力量小了。球滚到半路被断，你的脚背还在发麻。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "attack",
            text: "二点球落地，迎球凌空抽射",
            check: { attrs: ["shooting", "burst"], difficulty: 37, tag: "射门+爆发" },
            success: {
              text: "你没等球落地，迎球就是一脚凌空。球带着风声砸向死角。门将指尖差了两厘米。",
              effects: {
                reputation: 12,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "凌空没吃准部位。球高高飞出看台，脚背震得发麻。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你迎球凌空怒射。球{elementAdj}地砸入网窝。全场静了一秒，然后炸了。",
              effects: {
                reputation: 20,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "卡住落点站位，把对方挡在身后",
            check: { attrs: ["positioning", "balance"], difficulty: 24, tag: "站位+平衡" },
            success: {
              text: "你提前卡住落点，背身把对方挡在身后。球稳稳落下，你护住了。",
              effects: {
                reputation: 6,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "站位偏了半步。对方从你身侧挤过，抢先捅走了球。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "门将果断出击，把对方的单刀扑了出去。可球没抱稳，弹向空门。对方前锋拍马赶到，准备补射。门线前，只剩你。雨水混着汗，糊住了眼睛。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "门线前奋力头球解围",
            check: { attrs: ["heading", "power"], difficulty: 30, tag: "头球+力量" },
            success: {
              text: "你退到门线，奋力一跃，额头狠狠砸在球上。球飞向中场。空门，保住了。",
              effects: {
                reputation: 9,
                attrs: { heading: 1 }
              }
            },
            fail: {
              text: "起跳晚了半拍。球擦着你的头皮滚进门窝。你跪在门线前，半天没起来。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "用身体堵枪眼，硬扛下补射",
            check: { attrs: ["hardness", "strength"], difficulty: 31, tag: "硬度+对抗" },
            success: {
              text: "你张开双臂堵在门线。对方的爆射砸在你胸口，闷响。球弹出去了。你疼得弯下腰，却笑了。",
              effects: {
                reputation: 9,
                attrs: { hardness: 1 }
              }
            },
            fail: {
              text: "你侧身让了半步。球从你身侧钻进门窝。胸口的闷痛还在，可球进了。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "抢先赶到落点，把球捅出底线",
            check: { attrs: ["speed", "agility"], difficulty: 29, tag: "速度+柔韧" },
            success: {
              text: "你比对方前锋快半步赶到，脚尖一捅，球擦着立柱出了底线。好险。",
              effects: {
                reputation: 8,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "你慢了一步。对方先碰到球，轻轻一推，球进了。你的腿还在发软。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "D",
            sit: "defense",
            text: "冷静判断球的反弹路线，提前移动",
            check: { attrs: ["iq", "positioning"], difficulty: 27, tag: "球商+站位" },
            success: {
              text: "你没看球，看的是它的旋转。反弹刚起，你已经站在门线上，伸脚把球挡出。",
              effects: {
                reputation: 7,
                attrs: { iq: 1 }
              }
            },
            fail: {
              text: "判断错了反弹方向。球从另一侧滚进门窝，你扑了个空。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "千钧一发，奋力飞身把球挡出",
            check: { attrs: ["resolve", "burst"], difficulty: 32, tag: "决断+爆发" },
            success: {
              text: "你什么都没想，整个人飞出去。手掌堪堪碰到球，把它托出横梁。落地时肩膀生疼。",
              effects: {
                reputation: 9,
                attrs: { resolve: 1 }
              }
            },
            fail: {
              text: "飞身慢了半拍。球从你指尖滑进门窝。你摔在门线里，望着天花板。",
              effects: { stamina: -5 }
            }
          }
        ]
      },
{
        text: "你前顶上抢，干净地把球从对方前锋脚下断下。抬头一看，对方半场只剩一名后卫。草腥味灌进鼻腔，看台的吼声压过来。带刀中卫的机会，就在眼前。",
        sit: "attack",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "带球压上，三十米外拔脚远射",
            check: { attrs: ["shooting", "power"], difficulty: 38, tag: "射门+力量" },
            success: {
              text: "你带了两步，脚背绷紧，拔脚就射。球像炮弹一样砸向死角。门将纹丝没动。",
              effects: {
                reputation: 13,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "发力太狠，球擦着立柱飞出底线。脚背震得发麻，你叹了口气。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你三十米外拔脚怒射。球{elementAdj}地砸入网窝。带刀中卫，名不虚传。",
              effects: {
                reputation: 21,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "带球长驱直入，抹过最后一名后卫",
            check: { attrs: ["dribble", "speed"], difficulty: 36, tag: "盘带+速度" },
            success: {
              text: "你一趟一拨，从后卫身侧抹过。单刀。推射。球进了。看台全站起来了。",
              effects: {
                reputation: 11,
                goals: 1,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "趟球大了半步。后卫伸脚一捅，球弹出去老远。你踩在球上滑了一下。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你连过两人杀进禁区，推射死角。一个中卫，干完了前锋的活。",
              effects: {
                reputation: 18,
                goals: 1,
                attrs: { dribble: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "分球给插上的队友，自己前插",
            check: { attrs: ["passing", "vision"], difficulty: 28, tag: "传球+视野" },
            success: {
              text: "你抬头一扫，一脚分球送到插上的队友脚下。他迎球推射。配合打出来了。",
              effects: {
                reputation: 8,
                assists: 1,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "分球力量大了。队友没接住，球出了边线。你的脚踝还酸着。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "扛住回追的后卫，护球等队友",
            check: { attrs: ["strength", "balance"], difficulty: 26, tag: "对抗+平衡" },
            success: {
              text: "你像钉子一样卡住后卫。肩膀顶着肩膀，肋骨发疼。队友跑出空当，你分球。",
              effects: {
                reputation: 6,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "你被挤开了。后背撞在草皮上，凉意渗进球衣。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "见好就收，回传重新组织",
            check: { attrs: ["positioning", "iq"], difficulty: 23, tag: "站位+球商" },
            success: {
              text: "你没贪功，回传给身后的搭档。球权稳住了，阵型也压上了。教练在场边点头。",
              effects: {
                reputation: 5,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "回传力量小了。队友没接稳，险些被断。你后背冒了层冷汗。",
              effects: { stamina: -3 }
            }
          }
        ]
      }
    ]
  },

  // 中后卫·拖后型（重排：每事件5选项=火木水土金各一）
  CB_cover: {
    desc: "站位补位、头球解围、指挥防线",
    events: [
      {
        text: "对方一个直塞，打穿了边后卫的身后。你的搭档扑出去了，身后空了一大片。你得补上去。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "补位卡位，堵住空当", check: { attrs: ["positioning", "balance"], difficulty: 30, tag: "站位+平衡" },
            success: { text: "你{elementAdj}地补到位置。卡住空当，把对方的突破线路堵死。", effects: { reputation: 8, attrs: { positioning: 1 } } },
            fail: { text: "补位慢了半拍。对方从空当钻了过去。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】你精准补位，把对方势在必得的突破卡死。搭档朝你竖了个大拇指。", effects: { reputation: 13, attrs: { positioning: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "defense", text: "拦截对方的直塞线路", check: { attrs: ["intercept", "tackle"], difficulty: 29, tag: "拦截+铲断" },
            success: { text: "你预判到传球线路，一脚拦截把球卡下。", effects: { reputation: 7, attrs: { intercept: 1 } } },
            fail: { text: "拦截扑空。球从你身边划过。", effects: { stamina: -5 } }
          },
          { id: "C", sit: "defense", text: "全速回追，补防到位", check: { attrs: ["speed", "stamina"], difficulty: 30, tag: "速度+耐力" },
            success: { text: "你咬牙回追，及时补防到位。对方没机会了。", effects: { reputation: 7, attrs: { speed: 1 } } },
            fail: { text: "你追了，但腿灌了铅。对方抹过你。", effects: { stamina: -6 } }
          },
          { id: "D", sit: "balanced", text: "断球后指挥防线压上", check: { attrs: ["passing", "iq"], difficulty: 26, tag: "传球+球商" },
            success: { text: "你断球后一脚出球，同时指挥防线整体压上。阵型稳了。", effects: { reputation: 6, attrs: { passing: 1 } } },
            fail: { text: "出球被对方拦截。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "奋力解围，把球踢远", check: { attrs: ["power", "resolve"], difficulty: 31, tag: "力量+决断" },
            success: { text: "你迎球一脚，把球狠狠踢出危险区。越远越好。", effects: { reputation: 6, attrs: { power: 1 } } },
            fail: { text: "解围踢呲了。球弹到对方脚下。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "对方一记长传，吊向禁区。你和对方高点同时启动。球在空中划出一道弧线。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "争顶头球解围", check: { attrs: ["heading", "positioning"], difficulty: 32, tag: "头球+站位" },
            success: { text: "你{elementAdj}地抢前点。头球解围。球飞出去了。", effects: { reputation: 8, attrs: { heading: 1 } } },
            fail: { text: "争顶输了。对方头球攻门。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】你力压对方高点，头球解围。落地时你甚至有时间调整姿势。", effects: { reputation: 13, attrs: { heading: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "defense", text: "卡住对方高点，不让他起跳", check: { attrs: ["strength", "hardness"], difficulty: 29, tag: "对抗+硬度" },
            success: { text: "你用身体卡住对方高点。他跳不起来。球被门将没收。", effects: { reputation: 7, attrs: { strength: 1 } } },
            fail: { text: "你被挤开了。对方高点争顶成功。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "defense", text: "回追第二落点", check: { attrs: ["speed", "stamina"], difficulty: 28, tag: "速度+耐力" },
            success: { text: "球被顶出来，你抢先一步回追到第二落点。解围。", effects: { reputation: 6, attrs: { speed: 1 } } },
            fail: { text: "第二落点被对方抢到。又是一波攻势。", effects: { stamina: -5 } }
          },
          { id: "D", sit: "balanced", text: "把球踢远，紧接长传快反", check: { attrs: ["passing", "vision"], difficulty: 27, tag: "传球+视野" },
            success: { text: "你解围后直接长传找前场。反击打成了。", effects: { reputation: 6, attrs: { passing: 1 } } },
            fail: { text: "长传力量大了。球出了边线。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "奋力一顶，硬碰硬", check: { attrs: ["power", "resolve"], difficulty: 31, tag: "力量+决断" },
            success: { text: "你迎着对方高点，硬碰硬把球顶出去。肩膀撞得生疼，但球权是你的。", effects: { reputation: 6, attrs: { power: 1 } } },
            fail: { text: "你被挤开了。对方高点争顶成功。", effects: { stamina: -5 } }
          }
        ]
      },
      {
        text: "后场。门将把球传给你。对方没有逼抢，防线在你眼前铺开。轮到你来组织这一下。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "balanced", text: "一脚长传，制导前场", check: { attrs: ["passing", "vision"], difficulty: 29, tag: "传球+视野" },
            success: { text: "你一脚长传，精准找到前场队友。进攻发动。", effects: { reputation: 7, attrs: { passing: 1 } } },
            fail: { text: "长传力量大了。球出了边线。", effects: { stamina: -3 } },
            critical: { text: "【灵光一闪】你一脚五十米长传，精准找到前场队友。组织型中卫。场边教练鼓了掌。", effects: { reputation: 13, attrs: { passing: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "带球推进，杀过中场", check: { attrs: ["burst", "resolve"], difficulty: 34, tag: "爆发+决断" },
            success: { text: "你带球推进，杀过中场。对方防线被你搅乱了。", effects: { reputation: 8, attrs: { burst: 1 } } },
            fail: { text: "带球被对方回追断下。", effects: { stamina: -5 } }
          },
          { id: "C", sit: "attack", text: "带球推进，吸引逼抢", check: { attrs: ["dribble", "speed"], difficulty: 32, tag: "盘带+速度" },
            success: { text: "你带球推进，吸引了对方逼抢。中场露出空当。", effects: { reputation: 7, attrs: { dribble: 1 } } },
            fail: { text: "带球陷入围抢。被断了。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "balanced", text: "稳健护球，等队友跑位", check: { attrs: ["positioning", "balance"], difficulty: 24, tag: "站位+平衡" },
            success: { text: "你护住球，等队友跑出接应线路。分球。稳住。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "护球时被对方前锋捅掉。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "回传门将，卡断反抢线路", check: { attrs: ["intercept", "iq"], difficulty: 22, tag: "拦截+球商" },
            success: { text: "你回传门将稳住，顺势卡断了对方反抢的线路。", effects: { reputation: 4, attrs: { intercept: 1 } } },
            fail: { text: "回传力量轻了。对方前锋差点断球。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "对方发动反击。三打二。你拖在最后，面前是两名对方球员。你得选对位置。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "站位封堵，兼顾两人", check: { attrs: ["positioning", "balance"], difficulty: 30, tag: "站位+平衡" },
            success: { text: "你{elementAdj}地选对位置，兼顾两名对方球员。他们传也不是，突也不是。", effects: { reputation: 8, attrs: { positioning: 1 } } },
            fail: { text: "你站位偏了。对方一个直塞打穿了你。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】你拖后选位堪称教科书，一个人化解了三打二。门将朝你吼了声好。", effects: { reputation: 13, attrs: { positioning: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "defense", text: "上抢铲断持球人", check: { attrs: ["tackle", "intercept"], difficulty: 32, tag: "铲断+拦截" },
            success: { text: "你看准时机，一脚铲断。球捅出去了。", effects: { reputation: 8, attrs: { tackle: 1 } } },
            fail: { text: "上抢被对方一个变向晃过。", effects: { stamina: -5 } }
          },
          { id: "C", sit: "defense", text: "全速回追，缠住一人", check: { attrs: ["speed", "stamina"], difficulty: 30, tag: "速度+耐力" },
            success: { text: "你咬牙回追，死死缠住一人。二打一变成了二打二。", effects: { reputation: 7, attrs: { speed: 1 } } },
            fail: { text: "你追了，但腿灌了铅。", effects: { stamina: -6 } }
          },
          { id: "D", sit: "balanced", text: "把球断下，直接长传找前锋", check: { attrs: ["passing", "vision"], difficulty: 27, tag: "传球+视野" },
            success: { text: "你断球后直接长传找前场。反击打成了。", effects: { reputation: 6, attrs: { passing: 1 } } },
            fail: { text: "长传力量大了。球出了边线。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "赌一把，奋力拦截", check: { attrs: ["resolve", "power"], difficulty: 33, tag: "决断+力量" },
            success: { text: "你豁出去了。一个飞身拦截，把球连人带球拦下。", effects: { reputation: 6, attrs: { resolve: 1 } } },
            fail: { text: "你扑得太凶。对方一晃，你摔在草皮上。", effects: { stamina: -6 } }
          }
        ]
      },
      {
        text: "角球。对方开出。你负责盯对方最高的那个点。他比你高半个头。球飞过来了。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "争顶头球解围", check: { attrs: ["heading", "positioning"], difficulty: 33, tag: "头球+站位" },
            success: { text: "你{elementAdj}地抢前点。头球解围。球飞出去了。", effects: { reputation: 8, attrs: { heading: 1 } } },
            fail: { text: "争顶输了。对方高点头球攻门。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】你力压比你高半个头的对方高点，头球解围。看台一片惊呼。", effects: { reputation: 13, attrs: { heading: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "defense", text: "卡住他，不让他起跳", check: { attrs: ["strength", "hardness"], difficulty: 30, tag: "对抗+硬度" },
            success: { text: "你用身体卡住对方高点。他跳不起来。球被门将没收。", effects: { reputation: 7, attrs: { strength: 1 } } },
            fail: { text: "你被挤开了。对方高点争顶成功。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "defense", text: "回追第二落点", check: { attrs: ["speed", "stamina"], difficulty: 28, tag: "速度+耐力" },
            success: { text: "球被顶出来，你抢先一步回追到第二落点。解围。", effects: { reputation: 6, attrs: { speed: 1 } } },
            fail: { text: "第二落点被对方抢到。又是一波攻势。", effects: { stamina: -5 } }
          },
          { id: "D", sit: "balanced", text: "解围落地，一脚长传找前场", check: { attrs: ["passing", "vision"], difficulty: 27, tag: "传球+视野" },
            success: { text: "你解围后直接长传找前场。反击打成了。", effects: { reputation: 6, attrs: { passing: 1 } } },
            fail: { text: "长传力量大了。球出了边线。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "奋力解围，把球踢远", check: { attrs: ["power", "resolve"], difficulty: 31, tag: "力量+决断" },
            success: { text: "你迎球一脚，把球狠狠踢出危险区。越远越好。", effects: { reputation: 6, attrs: { power: 1 } } },
            fail: { text: "解围踢呲了。球弹到对方脚下。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "比赛进入读秒。你方领先一球。对方狂攻。你站在防线最后，指挥着队友落位。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "指挥防线落位，造越位", check: { attrs: ["iq", "rhythm"], difficulty: 29, tag: "球商+节奏" },
            success: { text: "你大吼一声，指挥防线整体压上。对方前锋越位了。哨响。", effects: { reputation: 8, attrs: { iq: 1 } } },
            fail: { text: "防线没统一。造越位失败，对方反越位成功。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】读秒阶段，你指挥防线造越位成功，化解了对方最后一次进攻。终场哨响。", effects: { reputation: 13, attrs: { iq: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "defense", text: "站位卡位，封堵射门", check: { attrs: ["positioning", "balance"], difficulty: 28, tag: "站位+平衡" },
            success: { text: "你卡住身位，用身体封堵射门。球打在你身上弹出。", effects: { reputation: 7, attrs: { positioning: 1 } } },
            fail: { text: "封堵慢了。对方射门得分。", effects: { stamina: -5 } }
          },
          { id: "C", sit: "defense", text: "铲断解围", check: { attrs: ["intercept", "tackle"], difficulty: 30, tag: "拦截+铲断" },
            success: { text: "你一脚铲断，把球捅出危险区。守住了。", effects: { reputation: 7, attrs: { intercept: 1 } } },
            fail: { text: "铲断落空。对方射门。", effects: { stamina: -5 } }
          },
          { id: "D", sit: "defense", text: "回追补防，缠住前锋", check: { attrs: ["speed", "stamina"], difficulty: 30, tag: "速度+耐力" },
            success: { text: "你咬牙回追，死死缠住对方前锋。他甩不开你。", effects: { reputation: 7, attrs: { speed: 1 } } },
            fail: { text: "你追了，但腿灌了铅。他抹过你。", effects: { stamina: -6 } }
          },
          { id: "E", sit: "defense", text: "奋力封堵，豁出去了", check: { attrs: ["resolve", "power"], difficulty: 32, tag: "决断+力量" },
            success: { text: "你豁出去了。一个飞身封堵，把对方的射门挡出。", effects: { reputation: 7, attrs: { resolve: 1 } } },
            fail: { text: "封堵扑空。你摔在草皮上。", effects: { stamina: -6 } }
          }
        ]
      },
{
        text: "门将弃门出击，扑向对方的直塞球。可他被晃了一下，扑了个空。空门大开，对方前锋带球逼近。你是拖后的最后一人，门线就在身后。草腥味混着汗味。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "退守门线，卡住射门角度",
            check: { attrs: ["positioning", "balance"], difficulty: 26, tag: "站位+平衡" },
            success: {
              text: "你退到门线，侧身把角度卡死。对方起脚，球正砸在你身上弹出。空门，保住了。",
              effects: {
                reputation: 7,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "你站偏了半步。对方推射远角，球擦着立柱进了。你跪在门线前。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "看准时机上前拦截，把球断下",
            check: { attrs: ["intercept", "tackle"], difficulty: 29, tag: "拦截+铲断" },
            success: {
              text: "你没退，反而迎上去。对方触球大了一瞬，你伸脚一断，球权夺回。胆大，心细。",
              effects: {
                reputation: 8,
                attrs: { intercept: 1 }
              }
            },
            fail: {
              text: "上抢扑空了。对方一抹而过，推射空门。你回身只看到球在网窝里。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "飞速回追到门线，补上空当",
            check: { attrs: ["speed", "stamina"], difficulty: 28, tag: "速度+耐力" },
            success: {
              text: "你转身狂奔，赶在射门前滑回门线，伸脚把球挡出。肺在烧，可你赶上了。",
              effects: {
                reputation: 7,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "回追慢了一步。球已经滚进门窝。你扶着膝盖，喘不上气。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "D",
            sit: "defense",
            text: "冷静阅读对方意图，封堵传球线路",
            check: { attrs: ["iq", "vision"], difficulty: 27, tag: "球商+视野" },
            success: {
              text: "你瞥见他抬头的方向，提前横移一步，把传球线路堵死。对方只能硬射，被你挡出。",
              effects: {
                reputation: 7,
                attrs: { iq: 1 }
              }
            },
            fail: {
              text: "判断错了他的意图。球从你身侧漏过，进了门窝。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "奋力飞铲，把对方的射门挡出",
            check: { attrs: ["resolve", "hardness"], difficulty: 31, tag: "决断+硬度" },
            success: {
              text: "你整个人贴地滑出去，连人带球铲出底线。鞋钉刮着草皮，火星四溅。空门保住了。",
              effects: {
                reputation: 9,
                attrs: { resolve: 1 }
              }
            },
            fail: {
              text: "飞铲铲空了。对方推射空门。你摔在草皮上，半边身子发麻。",
              effects: { stamina: -5 }
            }
          }
        ]
      },
{
        text: "对方前锋在越位线上来回试探。你拖在防线最后，把整条后防看得一清二楚。草皮上的鞋钉印冒着热气。该整体前顶了。你扯着嗓子喊。",
        sit: "balanced",
        choices: [
          {
            id: "A",
            sit: "balanced",
            text: "阅读对方传球时机，指挥防线齐步前压",
            check: { attrs: ["iq", "rhythm"], difficulty: 27, tag: "球商+节奏" },
            success: {
              text: "你盯着对方后腰的脚，喊了一声。防线齐步前压，前锋反越位失败。边裁举旗。成了。",
              effects: {
                reputation: 8,
                attrs: { iq: 1 }
              }
            },
            fail: {
              text: "你喊晚了半拍。防线没压齐，对方反越位成功，单刀。你嗓子都喊劈了。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "B",
            sit: "balanced",
            text: "指挥队友站位，把越位线压到精确位置",
            check: { attrs: ["positioning", "pressure"], difficulty: 25, tag: "站位+抗压" },
            success: {
              text: "你一边喊一边比划，把整条防线捏成一条线。对方前锋被晾在越位位置。指挥若定。",
              effects: {
                reputation: 7,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "队友没领会你的意思。防线参差不齐，对方从缝隙里抹过。你急得直跺脚。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "对方强行直塞，你提前移动把球拦截",
            check: { attrs: ["intercept", "iq"], difficulty: 28, tag: "拦截+球商" },
            success: {
              text: "传球刚起，你已经横移到位，伸脚一断。球权夺回。整条防线松了口气。",
              effects: {
                reputation: 8,
                attrs: { intercept: 1 }
              }
            },
            fail: {
              text: "拦截慢了一瞬。球从你脚边漏过，对方前锋顺势插上。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "D",
            sit: "defense",
            text: "造越位失败，对方反插，你回追",
            check: { attrs: ["speed", "stamina"], difficulty: 29, tag: "速度+耐力" },
            success: {
              text: "你转身就追，两步抢回身位，把球护出底线。肺在烧，可你追上了。",
              effects: {
                reputation: 7,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "回追慢了半拍。对方单刀推射。你只能看着球进网，大腿发酸。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "E",
            sit: "balanced",
            text: "顶住对方箭头的冲击，奋力稳住防线",
            check: { attrs: ["resolve", "strength"], difficulty: 27, tag: "决断+对抗" },
            success: {
              text: "对方箭头反复冲击，你像礁石一样不动。肩膀顶着肩膀，你扛住了。防线稳了。",
              effects: {
                reputation: 7,
                attrs: { resolve: 1 }
              }
            },
            fail: {
              text: "对抗中你被挤开半步。对方顺势抹过，你后背冒了层冷汗。",
              effects: { stamina: -4 }
            }
          }
        ]
      },
{
        text: "对方一记远射，被你方后卫挡出。球弹到禁区前沿，第二落点。对方的后腰正高速插上，准备迎球补射。你拖在后面，得保护这个落点。草皮被鞋钉翻起。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "用身体扛开对方后腰，把落点护下",
            check: { attrs: ["strength", "balance"], difficulty: 27, tag: "对抗+平衡" },
            success: {
              text: "你肩膀一沉，把对方后腰扛在身后。落点护住了。肋骨发疼，可球权是你的。",
              effects: {
                reputation: 7,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "对抗中你被挤开。对方从你身侧挤过，迎球就是一脚。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "抢先把球顶出去，解围",
            check: { attrs: ["heading", "power"], difficulty: 27, tag: "头球+力量" },
            success: {
              text: "你抢在对方身前，奋力一跃，额头把球顶向中场。落点保护住了。",
              effects: {
                reputation: 7,
                attrs: { heading: 1 }
              }
            },
            fail: {
              text: "起跳晚了半拍。球擦着你的头皮落到对方脚下。你心头一沉。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "抢先一步伸脚把球勾走",
            check: { attrs: ["agility", "speed"], difficulty: 28, tag: "柔韧+速度" },
            success: {
              text: "你比对方快半步，脚尖一勾，把球从人堆里勾出来。轻巧，干净。",
              effects: {
                reputation: 7,
                attrs: { agility: 1 }
              }
            },
            fail: {
              text: "伸脚慢了一拍。对方先捅到球，迎球补射。你的脚踝扭了一下。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "拿下二点球，冷静分给边路",
            check: { attrs: ["passing", "vision"], difficulty: 24, tag: "传球+视野" },
            success: {
              text: "你护下落点，抬头一扫，一脚分边。球贴着草皮滑到队友脚下。由守转攻。",
              effects: {
                reputation: 6,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "分球力量小了。球滚到半路被断，你的脚背还在发麻。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "对方迎球补射，奋力用身体封堵",
            check: { attrs: ["resolve", "hardness"], difficulty: 30, tag: "决断+硬度" },
            success: {
              text: "你张开双臂扑上去。对方的爆射砸在你胸口，闷响。球弹出去了。你疼得弯腰，却值。",
              effects: {
                reputation: 8,
                attrs: { resolve: 1 }
              }
            },
            fail: {
              text: "你侧身让了半步。球从你身侧钻进门窝。胸口的闷痛还在。",
              effects: { stamina: -5 }
            }
          }
        ]
      },
{
        text: "大雨倾盆，草皮积起水洼。比赛到了最后，你的腿像灌了铅，每一次呼吸都带着血腥味。对方还在冲击。你拖在防线最后，必须撑住。雨水糊住了眼睛。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "咬紧牙关，靠耐力撑过这一波",
            check: { attrs: ["stamina", "resolve"], difficulty: 29, tag: "耐力+决断" },
            success: {
              text: "肺在烧，腿在抖，你还是顶住了。一波又一波，你像堤坝一样不退。哨响了。撑住了。",
              effects: {
                reputation: 8,
                attrs: { stamina: 1 }
              }
            },
            fail: {
              text: "你再也迈不动腿。对方从你身侧抹过，单刀。你跪在积水里。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "用硬度扛住对方前锋的冲击",
            check: { attrs: ["hardness", "strength"], difficulty: 30, tag: "硬度+对抗" },
            success: {
              text: "对方前锋反复冲击，你肩膀顶肩膀，寸步不让。肋骨发疼，可你扛住了。",
              effects: {
                reputation: 8,
                attrs: { hardness: 1 }
              }
            },
            fail: {
              text: "对抗中你被挤开。对方顺势抹过，推射。你后背一片冰凉。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "湿滑草皮上稳住重心，不被晃倒",
            check: { attrs: ["balance", "positioning"], difficulty: 27, tag: "平衡+站位" },
            success: {
              text: "草皮滑得像抹了油。你压低重心，对方一个变向，你纹丝不动。卡住了。",
              effects: {
                reputation: 7,
                attrs: { balance: 1 }
              }
            },
            fail: {
              text: "脚下一滑，你摔坐在积水里。对方扬长而去，凉意渗进球衣。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "雨战中稳住节奏，指挥队友落位",
            check: { attrs: ["rhythm", "iq"], difficulty: 26, tag: "节奏+球商" },
            success: {
              text: "你扯着嗓子喊，把慌乱的队友一个个喊回位置。防线重新站稳。嗓子都劈了。",
              effects: {
                reputation: 7,
                attrs: { rhythm: 1 }
              }
            },
            fail: {
              text: "雨声太大，队友没听见你的指挥。防线一片混乱，你急得直跺脚。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "体能极限，奋力把球大脚解围",
            check: { attrs: ["resolve", "power"], difficulty: 31, tag: "决断+力量" },
            success: {
              text: "你用尽最后的力气，一脚把球踢向看台。球飞得老高。看台一片惊呼。解围了。",
              effects: {
                reputation: 8,
                attrs: { resolve: 1 }
              }
            },
            fail: {
              text: "腿软了，解围踢呲了。球弹回禁区，落到对方脚下。你心头一沉。",
              effects: { stamina: -5 }
            }
          }
        ]
      },
{
        text: "你拖在后场，把对方压上的阵型看得清清楚楚。内牛尔正在反越位线上游走。草腥味混着汗味。一脚长传，就是反击。看台的吼声压过来。",
        sit: "attack",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "一脚过顶长传，精准找到反越位的内牛尔",
            check: { attrs: ["passing", "vision"], difficulty: 34, tag: "传球+视野" },
            success: {
              text: "你脚背一搓，球划过一道弧线，越过整条防线，落在内牛尔脚下。单刀。助攻到手。",
              effects: {
                reputation: 12,
                assists: 1,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "长传力量大了。球直接飞出底线。内牛尔回头看了你一眼，你脚背发麻。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "见对方门将站位靠前，吊射空门",
            check: { attrs: ["shooting", "power"], difficulty: 39, tag: "射门+力量" },
            success: {
              text: "你瞥见门将站在小禁区外，脚背一吊。球划过半场，坠入空门。门将回追不及。",
              effects: {
                reputation: 13,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "吊射高了。球越过横梁飞出底线。门将回头看了一眼，你脚背发烫。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你后场一脚吊射。球{elementAdj}地坠入空门。门将望球兴叹，全场沸腾。",
              effects: {
                reputation: 21,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "C",
            sit: "attack",
            text: "自己带球推进，撕开第一道防线",
            check: { attrs: ["dribble", "speed"], difficulty: 35, tag: "盘带+速度" },
            success: {
              text: "你带球长驱直入，抹过逼抢的前锋。防线被你一个人撕开。看台全站起来了。",
              effects: {
                reputation: 10,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "趟球大了半步。对方伸脚一捅，球丢了。你踩在球上滑了一下。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你后场带球连过三人，杀到禁区前沿。一个中卫，踢出了前腰的气势。",
              effects: {
                reputation: 17,
                attrs: { dribble: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "扛住逼抢的前锋，护住球再出球",
            check: { attrs: ["strength", "balance"], difficulty: 26, tag: "对抗+平衡" },
            success: {
              text: "你背身扛住逼抢的前锋，肩膀顶肩膀。等队友跑位，你从容分球。",
              effects: {
                reputation: 6,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "你被挤开了。球丢了，后背撞在草皮上，凉意渗进球衣。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "不急，回传重新组织，稳住阵型",
            check: { attrs: ["positioning", "iq"], difficulty: 23, tag: "站位+球商" },
            success: {
              text: "你没冒险，回传给搭档。球权稳住了，阵型也压上了。教练在场边点头。",
              effects: {
                reputation: 5,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "回传力量小了。队友没接稳，险些被断。你后背冒了层冷汗。",
              effects: { stamina: -3 }
            }
          }
        ]
      }
    ]
  },


  // ===== 位置×踢法专属池：24组合全覆盖（新增18个交叉组合池）=====
ST_classic: {
    desc: "回撤、直塞、终结",
    events: [
      {
        text: "禁区前沿，你背身接到分球。后卫的胸口贴上你的后背，草腥味混着汗味。看台的声浪压下来。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "半转身凌空抽射，搏一个死角", check: { attrs: ["shooting", "burst"], difficulty: 37, tag: "射门+爆发" },
            success: { text: "你{elementAdj}地半转身抽射。球贴着门柱内侧钻入网窝。门将指尖差了两厘米。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "转身没晃开角度。射门被后卫用身体封堵，闷响一声。你的脚背还在发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地转身抽射。球带着弧线砸入死角。场边教练把战术板摔在了地上。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "脚弓一抖，直塞打穿后卫身后", check: { attrs: ["passing", "vision"], difficulty: 34, tag: "传球+视野" },
            success: { text: "你{elementAdj}地一抖脚弓。直塞穿过两名后卫的缝隙。内牛尔心领神会，单刀推射得手。", effects: { reputation: 10, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "直塞力量大了。球从内牛尔脚前滑过，滚出底线。你甩了甩发酸的脚腕。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "attack", text: "扛住后卫，强行转身打门", check: { attrs: ["strength", "balance"], difficulty: 35, tag: "对抗+平衡" },
            success: { text: "你像钉子一样卡住后卫。肩膀顶着肩膀，肋骨发疼。你借势转身，一脚抽射破门。", effects: { reputation: 11, goals: 1, attrs: { strength: 1 } } },
            fail: { text: "你被后卫挤开，重心一歪。射门绵软无力，门将轻松抱住。后背还在隐隐作痛。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "balanced", text: "抢前点卡住身位，把球做给插上的队友", check: { attrs: ["positioning", "heading"], difficulty: 27, tag: "站位+头球" },
            success: { text: "你提前半步卡住身位，胸口把球卸下，顺势做给插上的苏雯。她迎球推射。配合打出来了。", effects: { reputation: 8, assists: 1, attrs: { positioning: 1 } } },
            fail: { text: "你卡位慢了一步。后卫抢先一脚把球捅走，你撞在他身上，胸口发闷。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "attack", text: "拨球变向，抹过后卫单刀", check: { attrs: ["dribble", "agility"], difficulty: 34, tag: "盘带+柔韧" },
            success: { text: "你{elementAdj}地肩膀一沉，拨球变向。后卫重心丢了。单刀。推射。球进了。", effects: { reputation: 11, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "拨球趟大了。后卫伸脚一捅，球弹出去老远。你踩在球上滑了一下。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "你回撤到中场要球，背身倚住对方后腰。草皮被鞋钉翻起，泥土的腥气钻进鼻腔。布澜的防线正整体压上。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "attack", text: "弧顶迎球怒射，敲山震虎", check: { attrs: ["shooting", "power"], difficulty: 36, tag: "射门+力量" },
            success: { text: "你{elementAdj}地在弧顶迎球怒射。球穿过人缝钻入死角。布澜门将扑救不及。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "远射没吃准部位。球高高飞上看台，你脚背一阵发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地拔脚怒射。球带着弧线砸入死角。整座球场安静了一秒，随即炸开。", effects: { reputation: 19, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "一脚贴地直塞，剖开整条防线", check: { attrs: ["passing", "vision"], difficulty: 35, tag: "传球+视野" },
            success: { text: "你{elementAdj}地送出一脚贴地直塞。球像手术刀一样剖开防线。内牛尔反越位成功，单刀破门。", effects: { reputation: 11, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "直塞线路被后腰伸脚挡了一下。球速一慢，门将出击把球没收。你脚弓还在发麻。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "balanced", text: "背身扛住后腰，护球等队友接应", check: { attrs: ["strength", "balance"], difficulty: 25, tag: "对抗+平衡" },
            success: { text: "你沉下重心，把后腰死死挡在身后。肋骨被顶得生疼，球却稳稳护住。队友接应到位，你顺势分球。", effects: { reputation: 6, attrs: { strength: 1 } } },
            fail: { text: "后腰从背后一挤，你重心一歪。球丢了，你踉跄两步才站稳。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "横向带球摆脱逼抢，再分边", check: { attrs: ["dribble", "agility"], difficulty: 27, tag: "盘带+柔韧" },
            success: { text: "你{elementAdj}地横向一拨，带球抹过逼抢的后腰。布澜的合围扑了个空，你顺势分边。", effects: { reputation: 7, attrs: { dribble: 1 } } },
            fail: { text: "你带球被后腰伸脚一捅。球弹走，你脚踝撞得生疼。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "balanced", text: "阅读防线，挪到空当处接球转身", check: { attrs: ["positioning", "iq"], difficulty: 27, tag: "站位+球商" },
            success: { text: "你早看穿了后卫的盯人。横向挪出半步空当，接球、转身、推进，一气呵成。布澜的逼抢扑了个空。", effects: { reputation: 7, attrs: { positioning: 1 } } },
            fail: { text: "你跑位慢了一拍。接球时被后卫贴身卡住，只能回传。肺里像灌了风。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "角球开出，禁区里人挤人。你被后卫拉扯着球衣，鞋钉在草皮上抠出深痕。布澜门将高声指挥着防线。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "后点起跳，甩头攻门", check: { attrs: ["heading", "positioning"], difficulty: 36, tag: "头球+站位" },
            success: { text: "你{elementAdj}地抢在后点起跳。额头狠狠砸中皮球，球砸地弹入网窝。门将扑错了方向。", effects: { reputation: 12, goals: 1, attrs: { heading: 1 } } },
            fail: { text: "你起跳早了半拍。头球蹭偏，球擦着门柱飞出底线。后脑勺还在嗡嗡作响。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地高高跃起，力压后卫甩头。球像炮弹一样砸入死角。网绳剧烈地颤抖。", effects: { reputation: 19, goals: 1, attrs: { heading: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "禁区弧顶迎球凌空抽射", check: { attrs: ["shooting", "power"], difficulty: 38, tag: "射门+力量" },
            success: { text: "你{elementAdj}地在弧顶迎球怒射。球穿过人缝，门将视线被挡，扑救不及。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "凌空没吃准部位。球高高飞上看台，你脚背一阵发麻。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "balanced", text: "和苏雯做短角球配合，重新组织", check: { attrs: ["passing", "rhythm"], difficulty: 27, tag: "传球+节奏" },
            success: { text: "你把角球短传给苏雯，自己反身插入禁区。她回做，你顺势分球，进攻重新铺开。", effects: { reputation: 7, attrs: { passing: 1 } } },
            fail: { text: "短传力量小了。苏雯没接住，球被对方断下打反击。你心头一紧。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "用身体卡住后卫，给队友腾出落点", check: { attrs: ["strength", "hardness"], difficulty: 26, tag: "对抗+硬度" },
            success: { text: "你像一堵墙一样卡住对方中卫。肩膀硬扛硬，肋骨生疼。范志贵在你身后抢到落点，头球破门。", effects: { reputation: 7, assists: 1, attrs: { strength: 1 } } },
            fail: { text: "你被后卫反挤开。落点丢了，球被对方顶出禁区。你后背撞得人发疼。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "attack", text: "前点虚晃跑位，突然变向甩开盯人", check: { attrs: ["agility", "speed"], difficulty: 33, tag: "柔韧+速度" },
            success: { text: "你{elementAdj}地一个虚晃，突然变向甩开盯人。后卫被你带乱，范志贵后点轻松头球破门。", effects: { reputation: 9, assists: 1, attrs: { agility: 1 } } },
            fail: { text: "你虚晃没骗过后卫。他寸步不离，你只能干瞪眼，胸口发闷。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "后场断球，反击。你回撤到中线附近接到长传，面前是大片空当。布澜的防线压得很高，回追的只有一个人。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "带球长途推进，直扑禁区", check: { attrs: ["dribble", "speed"], difficulty: 35, tag: "盘带+速度" },
            success: { text: "你{elementAdj}地带球狂奔。风灌进耳朵，草皮在鞋钉下飞退。杀到禁区，你冷静推射远角。", effects: { reputation: 11, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "你趟球大了。回追的后卫伸脚一捅，球弹走。你大腿一阵酸软。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】你{elementAdj}地连过两人，单骑闯关。面对门将，你轻巧一挑。球越过门将指尖坠入网窝。全场沸腾。", effects: { reputation: 19, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "一脚直塞，分给套边的内牛尔", check: { attrs: ["passing", "vision"], difficulty: 34, tag: "传球+视野" },
            success: { text: "你{elementAdj}地斜塞一脚。球精准找到套边的内牛尔，他下底传中，范志贵抢点破门。", effects: { reputation: 10, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "直塞线路被回追的后卫挡了一下。内牛尔没追上，球出了底线。你脚腕发酸。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "attack", text: "内切一步，直接起脚远射", check: { attrs: ["shooting", "burst"], difficulty: 37, tag: "射门+爆发" },
            success: { text: "你{elementAdj}地内切一步，拔脚怒射。球带着弧线钻入死角。门将鞭长莫及。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "远射打飞了。球擦着横梁飞出，你脚背一阵发麻。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "balanced", text: "扛住回追的后卫，护球等队友跟上", check: { attrs: ["strength", "balance"], difficulty: 27, tag: "对抗+平衡" },
            success: { text: "你沉肩把回追的后卫挡在身后，护住球。等队友跟上，再从容分球。反击的节奏稳住了。", effects: { reputation: 6, attrs: { strength: 1 } } },
            fail: { text: "你被后卫从背后一撞，重心丢了。球被断走，你踉跄着摔倒。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "balanced", text: "选准落点卡住身位，把球做给插上的队友", check: { attrs: ["positioning", "iq"], difficulty: 26, tag: "站位+球商" },
            success: { text: "你提前判断好落点，卡住身位把球卸下，顺势做给插上的苏雯。她带球推进，反击打出来了。", effects: { reputation: 7, attrs: { positioning: 1 } } },
            fail: { text: "你判断错了落点。球从身边弹开，被对方捡到。你懊恼地捶了下大腿。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "比赛末段，布澜禁区前沿堆起人墙。你在弧顶背身拿球，空间被压得很窄。汗水顺着下巴滴在草皮上。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "拨球转身，抹过中卫直接打门", check: { attrs: ["dribble", "agility"], difficulty: 36, tag: "盘带+柔韧" },
            success: { text: "你{elementAdj}地拨球转身，从两名后卫的缝隙里抹了过去。单刀。推射。球进了。", effects: { reputation: 11, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "你拨球趟大了。后卫伸脚一捅，球弹出去老远。你踩在球上滑了一下。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地连晃两人，杀入禁区。面对出击的门将，你冷静推射。整座球场为你站起来。", effects: { reputation: 18, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "脚弓搓出弧线球，找内切的内牛尔", check: { attrs: ["passing", "vision"], difficulty: 35, tag: "传球+视野" },
            success: { text: "你{elementAdj}地外脚背一搓。弧线球绕过人墙，正好落在内切的内牛尔脚下。他迎球推射破门。", effects: { reputation: 10, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "弧线球传大了。内牛尔没够着，球被门将没收。你脚弓还在发酸。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "balanced", text: "背身护住球，等队友跑出空当再分", check: { attrs: ["strength", "balance"], difficulty: 26, tag: "对抗+平衡" },
            success: { text: "你像钉子一样钉在弧顶，后背硬扛着中卫。等苏雯跑出空当，才不慌不忙地分球。进攻活了。", effects: { reputation: 6, attrs: { strength: 1 } } },
            fail: { text: "你被中卫一挤，护球失败。球被断走，你后背撞得生疼。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "在防线缝隙里挪出半步，接回做球顺势转身", check: { attrs: ["positioning", "iq"], difficulty: 28, tag: "站位+球商" },
            success: { text: "你早看准了防线的缝隙。横向挪出半步，接回做球顺势转身，正面面对球门。布澜的密集防守被你撕开一道口子。", effects: { reputation: 7, attrs: { positioning: 1 } } },
            fail: { text: "你挪位慢了一步。回做球被后卫抢先捅走，你扑了个空。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "attack", text: "横拨一步，拔脚抽射", check: { attrs: ["shooting", "power"], difficulty: 37, tag: "射门+力量" },
            success: { text: "你{elementAdj}地横拨一步，拔脚怒射。球穿过人墙缝隙钻入死角。门将鞭长莫及。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "射门打在人墙上。球弹回来，你脚背一阵发麻。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "补时第三分钟，比分还差一个。禁区前沿的任意球。你站在球前，人墙排好，布澜门将贴着门柱高声喊话。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "直接起脚，把球轰入死角", check: { attrs: ["shooting", "power"], difficulty: 39, tag: "射门+力量" },
            success: { text: "你{elementAdj}地拔脚怒射。球越过人墙，带着弧线钻入死角。门将鞭长莫及。绝杀。", effects: { reputation: 13, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "射门打在人墙上。球弹回来，你脚背一阵剧痛。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】你{elementAdj}地一脚重炮。球越过人墙砸入死角。读秒绝杀。整座球场炸开了。", effects: { reputation: 22, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "头球摆渡，做给卡住位置的范志贵", check: { attrs: ["passing", "vision"], difficulty: 34, tag: "传球+视野" },
            success: { text: "你{elementAdj}地头球一摆，把球蹭向身后。范志贵早已卡住位置，迎球补射空门。绝杀。", effects: { reputation: 11, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "摆渡力量小了。球没蹭到范志贵脚下，被门将没收。你后颈还在发凉。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "attack", text: "禁区内抢点起跳，甩头砸向地面", check: { attrs: ["heading", "positioning"], difficulty: 35, tag: "头球+站位" },
            success: { text: "你{elementAdj}地抢点起跳，额头狠狠砸中皮球。球砸地弹入网窝。门将扑错了方向。绝杀。", effects: { reputation: 12, goals: 1, attrs: { heading: 1 } } },
            fail: { text: "你起跳早了半拍。头球蹭偏，球擦柱而出。后脑勺还在嗡嗡作响。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "attack", text: "前点虚晃跑位，突然变向甩开盯人", check: { attrs: ["agility", "speed"], difficulty: 33, tag: "柔韧+速度" },
            success: { text: "你{elementAdj}地一个虚晃，突然变向甩开盯人。后卫被你带乱，范志贵后点轻松头球破门。绝杀。", effects: { reputation: 9, assists: 1, attrs: { agility: 1 } } },
            fail: { text: "你虚晃没骗过后卫。他寸步不离，你只能干瞪眼，胸口发闷。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "balanced", text: "用身体扛住后卫，给队友腾出落点", check: { attrs: ["strength", "hardness"], difficulty: 27, tag: "对抗+硬度" },
            success: { text: "你像一堵墙一样卡住对方中卫。肩膀硬扛硬，肋骨生疼。范志贵在你身后抢到落点，头球破门。绝杀。", effects: { reputation: 7, assists: 1, attrs: { strength: 1 } } },
            fail: { text: "你被后卫反挤开。落点丢了，球被顶出禁区。你后背撞得人发疼。", effects: { stamina: -3 } }
          }
        ]
      },
{
        text: "肋部。你在对方中场和后卫线之间拿到球，转身面对球门。布澜的防线在你眼前铺开，内牛尔正在反越位线上游走。草腥味钻进鼻子。",
        sit: "attack",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "一脚致命直塞，找反越位的内牛尔",
            check: { attrs: ["passing", "vision"], difficulty: 32, tag: "传球+视野" },
            success: {
              text: "你{elementAdj}地一脚直塞。球像手术刀切开防线，内牛尔反越位成功，单刀推射。助攻到手。",
              effects: {
                reputation: 11,
                assists: 1,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "直塞力量大了。内牛尔没追上，球滚出底线。你脚背还酸着。",
              effects: { stamina: -3 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地一脚直塞撕开整条防线。内牛尔单刀推射，全场起立。这一传，会被反复回放。",
              effects: {
                reputation: 18,
                assists: 1,
                attrs: { passing: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "balanced",
            text: "自己反越位前插，接应直塞",
            check: { attrs: ["positioning", "balance"], difficulty: 30, tag: "站位+平衡" },
            success: {
              text: "你{elementAdj}地反身前插。苏雯的直塞恰到好处，你迎球推射。球进了。",
              effects: {
                reputation: 10,
                goals: 1,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "反插那一下越位了。边裁的旗子举起，你白跑一趟。大腿发酸。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "C",
            sit: "attack",
            text: "弧顶拔脚怒射，赌一个死角",
            check: { attrs: ["shooting", "power"], difficulty: 37, tag: "射门+力量" },
            success: {
              text: "你{elementAdj}地远射。球贴着门柱钻入网窝，门将的指尖差了两厘米。",
              effects: {
                reputation: 12,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "射门被后卫封堵，闷响。脚背还在发麻。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地远射。球带着弧线砸入死角，场边教练把战术板摔了。",
              effects: {
                reputation: 20,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "D",
            sit: "attack",
            text: "拨球变向，抹过后卫单刀",
            check: { attrs: ["dribble", "agility"], difficulty: 35, tag: "盘带+柔韧" },
            success: {
              text: "你{elementAdj}地一拨一扣。后卫重心丢了，你抹进禁区单刀推射。球进了。",
              effects: {
                reputation: 11,
                goals: 1,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "拨球趟大了。后卫伸脚一捅，球弹出去老远。你踩在球上滑了一下。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地连晃两人抹进禁区，单刀推射。安静了一秒，然后所有人都站起来了。",
              effects: {
                reputation: 18,
                goals: 1,
                attrs: { dribble: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "扛住后腰逼抢，硬把球护住",
            check: { attrs: ["hardness", "strength"], difficulty: 25, tag: "硬度+对抗" },
            success: {
              text: "你{elementAdj}地用后背顶住后腰。肩膀扛着肩膀，球权护住，进攻重新组织。肋骨发疼，但值。",
              effects: {
                reputation: 6,
                attrs: { hardness: 1 }
              }
            },
            fail: {
              text: "你被后腰挤倒。球被断下，布澜就地打反击。后背一片冰凉。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "你回撤到中场要球，背身倚住对方后腰。布澜的防线压得很高，身后是大片空当。苏雯在肋部跑位，内牛尔在远端招手。汗水顺着下巴滴在草皮上。",
        sit: "balanced",
        choices: [
          {
            id: "A",
            sit: "balanced",
            text: "头球摆渡，把长传点给反越位的内牛尔",
            check: { attrs: ["heading", "balance"], difficulty: 29, tag: "头球+平衡" },
            success: {
              text: "你{elementAdj}地高高跃起。额头一蹭，球摆渡到防线身后，内牛尔反越位成功，单刀推射。反击打成。",
              effects: {
                reputation: 10,
                assists: 1,
                attrs: { heading: 1 }
              }
            },
            fail: {
              text: "摆渡方向偏了。球顶到对方脚下，布澜顺势打反击。后颈还在发凉。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "B",
            sit: "balanced",
            text: "扛住后腰，护住球再分球",
            check: { attrs: ["strength", "balance"], difficulty: 25, tag: "对抗+平衡" },
            success: {
              text: "你{elementAdj}地用后背顶住后腰。肩膀扛着肩膀，球权护住，再从容分球。布澜的逼抢扑了个空。",
              effects: {
                reputation: 6,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "你被后腰挤倒。球被断下，布澜就地打反击。后背一片冰凉。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "直塞肋部，找插上的苏雯",
            check: { attrs: ["passing", "vision"], difficulty: 31, tag: "传球+视野" },
            success: {
              text: "你{elementAdj}地一脚直塞。球从后卫身边滚过，苏雯插上单刀推射。助攻到手。",
              effects: {
                reputation: 10,
                assists: 1,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "直塞被预判。后卫伸脚一捅，布澜顺势打反击。你抹了把汗。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "attack",
            text: "带球推进，自己撕开防线",
            check: { attrs: ["speed", "burst"], difficulty: 33, tag: "速度+爆发" },
            success: {
              text: "你{elementAdj}地一个加速。球从后腰身边趟过，你抹过他扬长而去，直面球门。",
              effects: {
                reputation: 9,
                goals: 1,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "推进那一下趟大了。后卫伸脚一捅，球出了边线。你的脚踝还在发酸。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "回追到位，一脚把险情解围出去",
            check: { attrs: ["shooting", "power"], difficulty: 32, tag: "射门+力量" },
            success: {
              text: "对手断球要打反击。你{elementAdj}地回追到位，抡脚一脚把球踢向中场。不漂亮，但险情解除了。肺里的灼烧慢慢平复。",
              effects: {
                reputation: 5,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "回追那一步没赶上。对手顺势推进，你只能看着他们的背影。大腿酸得发抖。",
              effects: { stamina: -4 }
            }
          }
        ]
      },
{
        text: "布澜禁区前沿堆起人墙。你在弧顶背身拿球，空间被压得很窄。汗水顺着下巴滴在草皮上，看台的声浪压下来。",
        sit: "attack",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "弧顶拔脚怒射，赌一个世界波",
            check: { attrs: ["shooting", "power"], difficulty: 38, tag: "射门+力量" },
            success: {
              text: "你{elementAdj}地远射。球划破空气，砸在门柱内侧弹进网窝。门将纹丝不动。",
              effects: {
                reputation: 13,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "射门被后卫封堵，闷响。脚背还在发麻。",
              effects: { stamina: -5 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地轰出一脚世界波。球带着弧线直挂死角，门将回头望了三次。全场起立。",
              effects: {
                reputation: 22,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "拨球变向，晃开防守再打门",
            check: { attrs: ["dribble", "agility"], difficulty: 35, tag: "盘带+柔韧" },
            success: {
              text: "你{elementAdj}地一拨一扣。后卫重心丢了，你晃开角度推射。球进了。",
              effects: {
                reputation: 11,
                goals: 1,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "拨球趟大了。后卫伸脚一捅，球弹出去老远。你踩在球上滑了一下。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地连晃两人抹进禁区，单刀推射。安静了一秒，然后所有人都站起来了。",
              effects: {
                reputation: 18,
                goals: 1,
                attrs: { dribble: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "跑位扯动，扯开防线缺口再接球",
            check: { attrs: ["positioning", "balance"], difficulty: 29, tag: "站位+平衡" },
            success: {
              text: "你{elementAdj}地横向扯动。后卫被你带出位置，缺口一闪而过，你迎球推射。球进了。",
              effects: {
                reputation: 10,
                goals: 1,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "跑位被识破。后卫死死跟住，你接球转身，机会没了。大腿发酸。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "回做给插上的队友，重新组织",
            check: { attrs: ["passing", "vision"], difficulty: 27, tag: "传球+视野" },
            success: {
              text: "你{elementAdj}地一脚回做。球找到禁区外的苏雯，她迎球怒射。球进了。",
              effects: {
                reputation: 8,
                assists: 1,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "回做力量小了。球被后卫伸脚一捅，机会没了。你肩膀还酸着。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "丢球就地反抢，掐断对方反击",
            check: { attrs: ["tackle", "intercept"], difficulty: 24, tag: "铲断+拦截" },
            success: {
              text: "丢球的瞬间你就地反抢。你{elementAdj}地一记铲断，球权夺回。肺部灼烧，但值得。",
              effects: {
                reputation: 5,
                attrs: { tackle: 1 }
              }
            },
            fail: {
              text: "反抢扑空。对方顺势推进，你只能看着他们的背影，大腿发酸。",
              effects: { stamina: -4 }
            }
          }
        ]
      },
{
        text: "点球大战。裁判把手伸向十二码。你作为古典十号中锋，被全队推到了罚球点前。布澜门将贴着门线左右挪步，手套拍得啪啪响。看台静了一瞬。",
        sit: "balanced",
        choices: [
          {
            id: "A",
            sit: "balanced",
            text: "盯着门将重心，等他先动再推反方向",
            check: { attrs: ["rhythm", "iq"], difficulty: 27, tag: "节奏+球商" },
            success: {
              text: "你屏住呼吸，盯着门将的膝盖。他先动了。你{elementAdj}地把球推向反方向。冷静得像在训练。",
              effects: {
                reputation: 9,
                goals: 1,
                attrs: { rhythm: 1 }
              }
            },
            fail: {
              text: "你犹豫了半拍。门将看穿你的迟疑，扑出来把球压在身下。草皮的凉意贴上你的脸。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "助跑三步，全力抽射死角",
            check: { attrs: ["shooting", "power"], difficulty: 38, tag: "射门+力量" },
            success: {
              text: "你{elementAdj}地抡圆了脚背。球像出膛的炮弹砸进网窝，门将连反应都没有。网绳剧烈地抖。",
              effects: {
                reputation: 13,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "脚背吃球太正。门将判断对了方向，一掌把球拍出底线。你的脚背还在发麻。",
              effects: { stamina: -5 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地爆射。球擦着门柱内侧钻入网窝，门将扑了个空。全场炸了。",
              effects: {
                reputation: 20,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "C",
            sit: "attack",
            text: "假射真扣，晃倒门将再推空门",
            check: { attrs: ["dribble", "agility"], difficulty: 34, tag: "盘带+柔韧" },
            success: {
              text: "你{elementAdj}地一扣。门将整个人扑向左侧，你轻巧推射空门。球滚进网窝的那一刻，你听见看台的惊呼。",
              effects: {
                reputation: 11,
                goals: 1,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "扣球趟大了。门将没被骗到，伸脚把球挡下。你踩在球上踉跄了一步。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地连续假动作，把门将晃得坐倒在草皮上，才从容推射空门。看台全站起来了。",
              effects: {
                reputation: 18,
                goals: 1,
                attrs: { dribble: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "预判门将扑救方向，卡住补射的位置",
            check: { attrs: ["positioning", "balance"], difficulty: 29, tag: "站位+平衡" },
            success: {
              text: "你{elementAdj}地预判了扑救方向。门将把球拍出，球正落在你卡好的位置上，顺势补射。球进了。",
              effects: {
                reputation: 9,
                goals: 1,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "你站位偏了半步。门将把球稳稳抱住，没给你任何机会。汗水顺着下巴滴在草皮上。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "扛住门将扑救后的反扑，护住补射机会",
            check: { attrs: ["strength", "balance"], difficulty: 25, tag: "对抗+平衡" },
            success: {
              text: "你{elementAdj}地卡住身位。门将把球拍出，后卫撞上来被你扛开，球权护住。肋骨发疼，但值。",
              effects: {
                reputation: 6,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "你被后卫挤开。门将把球稳稳抱住，没给你任何机会。汗水顺着下巴滴在草皮上。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "补时第三分钟，比分还平着。你回撤到中线附近护球，布澜全线退守。队友的接应点被盯死，球在你脚下。汗水糊住了眼睛，看台全站起来了。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "扛住逼抢，硬把球护到队友插上",
            check: { attrs: ["pressure", "balance"], difficulty: 26, tag: "抗压+平衡" },
            success: {
              text: "你{elementAdj}地稳住重心。后腰撞在你背上像撞上一堵墙，球权护住，队友陆续压上。",
              effects: {
                reputation: 6,
                attrs: { pressure: 1 }
              }
            },
            fail: {
              text: "你被后腰挤倒。球被断下，布澜就地打反击。后背一片冰凉。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "B",
            sit: "balanced",
            text: "一脚长传，找前场的内牛尔",
            check: { attrs: ["passing", "vision"], difficulty: 29, tag: "传球+视野" },
            success: {
              text: "你{elementAdj}地一脚长传。球越过中场，内牛尔卸下球直面球门。最后一攻，发起在你脚下。",
              effects: {
                reputation: 8,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "长传力量大了。内牛尔没追上，球滚出底线。你脚背还酸着。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "咬牙护球，多撑一秒是一秒",
            check: { attrs: ["stamina", "balance"], difficulty: 25, tag: "耐力+平衡" },
            success: {
              text: "你{elementAdj}地咬紧牙关。腿像灌了铅，但你撑住了。队友陆续压上，进攻重新组织。",
              effects: {
                reputation: 5,
                attrs: { stamina: 1 }
              }
            },
            fail: {
              text: "你撑不住了。脚下一软，球被后卫捅走。大腿酸得发抖。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "D",
            sit: "attack",
            text: "转身拔脚怒射，赌一个世界波",
            check: { attrs: ["shooting", "power"], difficulty: 36, tag: "射门+力量" },
            success: {
              text: "你{elementAdj}地转身抽射。球划破空气，砸在门柱内侧弹进网窝。门将纹丝不动。",
              effects: {
                reputation: 12,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "转身没晃开角度。射门被后卫封堵，闷响。脚背还在发麻。",
              effects: { stamina: -5 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地转身爆射。球带着弧线砸入死角，场边教练把战术板摔了。",
              effects: {
                reputation: 20,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "丢球就地反抢，掐断对方反击",
            check: { attrs: ["intercept", "tackle"], difficulty: 24, tag: "拦截+铲断" },
            success: {
              text: "丢球的瞬间你就地反抢。你{elementAdj}地一记铲断，球权夺回。肺部灼烧，但值得。",
              effects: {
                reputation: 5,
                attrs: { intercept: 1 }
              }
            },
            fail: {
              text: "反抢扑空。对方顺势推进，你只能看着他们的背影，大腿发酸。",
              effects: { stamina: -4 }
            }
          }
        ]
      }
    ]
  },
  ST_break: {
    desc: "过人、突入、强突",
    events: [
      {
        text: "边路一对一。你接到分球，面前是布澜的边后卫。他压低重心，鞋钉抠进草皮。看台的声浪一阵高过一阵。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "踩单车变向，抹过他下底", check: { attrs: ["dribble", "agility"], difficulty: 36, tag: "盘带+柔韧" },
            success: { text: "你{elementAdj}地踩单车，肩膀一沉。后卫重心丢了。你抹过他下底，倒三角回传，范志贵抢点破门。", effects: { reputation: 11, assists: 1, attrs: { dribble: 1 } } },
            fail: { text: "踩单车没晃开。后卫伸脚一捅，球弹出去老远。你脚踝一阵发酸。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地连做两个假动作，把后卫晃得原地转身。下底，倒三角。范志贵推射空门。全场起立。", effects: { reputation: 18, assists: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "内切一步，直接起脚抽射", check: { attrs: ["shooting", "power"], difficulty: 37, tag: "射门+力量" },
            success: { text: "你{elementAdj}地内切一步，拔脚怒射。球带着弧线钻入远角。门将鞭长莫及。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "内切没晃开角度。射门被后卫用身体封堵，闷响。你脚背发麻。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "balanced", text: "下底后倒三角回传，找插上的队友", check: { attrs: ["passing", "vision"], difficulty: 29, tag: "传球+视野" },
            success: { text: "你{elementAdj}地下底后倒三角回传。苏雯插上迎球推射破门。边路的杀机被你撕开了。", effects: { reputation: 9, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "倒三角传大了。苏雯没够着，球被门将没收。你脚弓发酸。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "阅读防线，挪到空当处接球转身", check: { attrs: ["positioning", "iq"], difficulty: 27, tag: "站位+球商" },
            success: { text: "你早看穿了后卫的盯人。横向挪出半步空当，接球、转身、推进，一气呵成。布澜的逼抢扑了个空。", effects: { reputation: 7, attrs: { positioning: 1 } } },
            fail: { text: "你跑位慢了一拍。接球时被后卫贴身卡住，只能回传。肺里像灌了风。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "丢球就地反抢，掐断对方的边路反击", check: { attrs: ["tackle", "intercept"], difficulty: 24, tag: "铲断+拦截" },
            success: { text: "丢球的一瞬你就地反抢。一记干净的铲断，球权夺回。肺部在灼烧，但边路这道闸你守住了。", effects: { reputation: 5, attrs: { tackle: 1 } } },
            fail: { text: "反抢扑空。对方顺势沿边路推进，你只能回追，大腿发酸。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "你在禁区前沿拿球，面前是两名中卫。草腥味混着汗味。布澜的防线收缩得很紧，缝隙窄得几乎看不见。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "连续变向，从两人缝隙里抹进禁区", check: { attrs: ["dribble", "agility"], difficulty: 37, tag: "盘带+柔韧" },
            success: { text: "你{elementAdj}地左晃右拨，从两名中卫的缝隙里抹了进去。单刀。推射。球进了。", effects: { reputation: 12, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "你拨球趟大了。两名后卫关门一夹，球被断走。你脚踝撞得生疼。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】你{elementAdj}地连过三人，杀入禁区。面对门将，你冷静推射死角。整座球场为你沸腾。", effects: { reputation: 20, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "扛住后卫，强行转身抽射", check: { attrs: ["shooting", "burst"], difficulty: 36, tag: "射门+爆发" },
            success: { text: "你{elementAdj}地借势转身，一脚抽射破门。门将指尖差了两厘米。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "转身没晃开角度。射门被后卫用身体封堵，闷响一声。你的脚背还在发麻。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "attack", text: "突入后倒三角回传，找插上的队友", check: { attrs: ["passing", "vision"], difficulty: 34, tag: "传球+视野" },
            success: { text: "你{elementAdj}地突入禁区，吸引两人包夹，倒三角回传。苏雯插上迎球推射破门。", effects: { reputation: 10, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "倒三角传大了。苏雯没够着，球被门将没收。你脚弓发酸。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "attack", text: "扛住后卫，强行挤进禁区", check: { attrs: ["strength", "balance"], difficulty: 35, tag: "对抗+平衡" },
            success: { text: "你像钉子一样卡住后卫，肩膀硬扛硬。借势挤进禁区，迎球推射破门。肋骨还在隐隐作痛。", effects: { reputation: 11, goals: 1, attrs: { strength: 1 } } },
            fail: { text: "你被后卫挤开，重心一歪。球被断走，你踉跄两步。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "balanced", text: "阅读防线，挪到缝隙处接球转身", check: { attrs: ["positioning", "iq"], difficulty: 28, tag: "站位+球商" },
            success: { text: "你早看准了防线的缝隙。横向挪出半步，接球顺势转身，正面面对球门。布澜的密集防守被你撕开一道口子。", effects: { reputation: 7, attrs: { positioning: 1 } } },
            fail: { text: "你挪位慢了一步。接球时被后卫贴身卡住，只能回传。肺里像灌了风。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "反击。后场断球，长传找到你。面前是大片空当，布澜只有一名后卫回追。风灌进你的耳朵，草皮在鞋钉下飞退。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "全速冲刺，生吃后卫单刀", check: { attrs: ["speed", "burst"], difficulty: 36, tag: "速度+爆发" },
            success: { text: "你{elementAdj}地全速冲刺，把后卫甩在身后。单刀。面对门将，你冷静推射远角。", effects: { reputation: 11, goals: 1, attrs: { speed: 1 } } },
            fail: { text: "你趟球大了。门将出击把球没收，你刹不住脚撞在门将身上。肋骨生疼。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】你{elementAdj}地长途奔袭，生吃后卫。面对门将，你轻巧一挑。球越过门将指尖坠入网窝。全场沸腾。", effects: { reputation: 19, goals: 1, attrs: { speed: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "内切一步，直接起脚远射", check: { attrs: ["shooting", "power"], difficulty: 37, tag: "射门+力量" },
            success: { text: "你{elementAdj}地内切一步，拔脚怒射。球带着弧线钻入死角。门将鞭长莫及。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "远射打飞了。球擦着横梁飞出，你脚背一阵发麻。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "attack", text: "突入禁区，倒三角回传给内牛尔", check: { attrs: ["passing", "vision"], difficulty: 34, tag: "传球+视野" },
            success: { text: "你{elementAdj}地突入禁区，吸引门将出击，倒三角回传。内牛尔插上推射空门。", effects: { reputation: 10, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "倒三角传小了。内牛尔没追上，球被回追的后卫捅走。你脚弓发酸。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "用身体顶住后卫，护球等接应", check: { attrs: ["strength", "balance"], difficulty: 27, tag: "对抗+平衡" },
            success: { text: "你沉肩把回追的后卫挡在身后，护住球。等队友跟上，再从容分球。反击的节奏稳住了。", effects: { reputation: 6, attrs: { strength: 1 } } },
            fail: { text: "你被后卫从背后一撞，重心丢了。球被断走，你踉跄着摔倒。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "balanced", text: "选准落点卡住身位，把球做给插上的队友", check: { attrs: ["positioning", "iq"], difficulty: 26, tag: "站位+球商" },
            success: { text: "你提前判断好落点，卡住身位把球卸下，顺势做给插上的苏雯。她带球推进，反击打出来了。", effects: { reputation: 7, attrs: { positioning: 1 } } },
            fail: { text: "你判断错了落点。球从身边弹开，被对方捡到。你懊恼地捶了下大腿。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "禁区内一片混战。你在人堆里拿到球，身边全是腿。草皮被鞋钉翻得稀烂，泥土的腥气直冲鼻腔。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "小范围拨球变向，抹过两人打门", check: { attrs: ["dribble", "agility"], difficulty: 37, tag: "盘带+柔韧" },
            success: { text: "你{elementAdj}地在人缝里左拨右扣，抹过两人。迎球推射。球进了。", effects: { reputation: 12, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "你拨球被腿挡了一下。球弹开，被后卫大脚解围。你脚踝撞得生疼。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地在人堆里连过三人，杀出重围。面对门将，你冷静推射死角。整座球场炸开了。", effects: { reputation: 20, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "扛住后卫，强行转身抽射", check: { attrs: ["shooting", "burst"], difficulty: 36, tag: "射门+爆发" },
            success: { text: "你{elementAdj}地借势转身，一脚抽射破门。门将指尖差了两厘米。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "转身没晃开角度。射门被后卫用身体封堵，闷响一声。你的脚背还在发麻。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "balanced", text: "回做给禁区弧顶的队友，自己反插", check: { attrs: ["passing", "vision"], difficulty: 28, tag: "传球+视野" },
            success: { text: "你{elementAdj}地回做给弧顶的苏雯，自己反身插入禁区。她直塞，球到人到。你迎球推射。配合打出来了。", effects: { reputation: 8, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "回做力量小了。苏雯没接住，球被后卫捅走。你肩膀还酸着。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "attack", text: "用身体扛开后卫，挤出射门空间", check: { attrs: ["strength", "balance"], difficulty: 35, tag: "对抗+平衡" },
            success: { text: "你像钉子一样卡住后卫，肩膀硬扛硬。挤出半步空间，迎球抽射破门。肋骨还在隐隐作痛。", effects: { reputation: 11, goals: 1, attrs: { strength: 1 } } },
            fail: { text: "你被后卫挤开，重心一歪。球被断走，你踉跄两步。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "balanced", text: "护住球等队友跑出空当，再分球", check: { attrs: ["positioning", "balance"], difficulty: 26, tag: "站位+平衡" },
            success: { text: "你在人堆里护住球，等范志贵跑出空当，才从容分球。禁区的混战被你梳理出了头绪。", effects: { reputation: 6, attrs: { positioning: 1 } } },
            fail: { text: "你护球被两人一夹。球丢了，你被撞得踉跄两步。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "禁区前沿的定位球。你站在球前，人墙排好。布澜门将贴着门柱高声喊话。草皮上的白线在灯光下泛着冷光。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "拨球变向，抹过补防的后卫抽射", check: { attrs: ["dribble", "agility"], difficulty: 36, tag: "盘带+柔韧" },
            success: { text: "你{elementAdj}地拨球变向，抹过补防的后卫。迎球抽射。球贴着门柱内侧钻入网窝。", effects: { reputation: 11, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "你拨球趟大了。补防的后卫伸脚一捅，球弹走。你脚踝一阵发酸。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地连晃两人，杀入禁区。面对门将，你冷静推射死角。整座球场为你站起来。", effects: { reputation: 18, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "横拨一步，直接起脚抽射", check: { attrs: ["shooting", "burst"], difficulty: 37, tag: "射门+爆发" },
            success: { text: "你{elementAdj}地横拨一步，拔脚怒射。球穿过人墙缝隙，钻入死角。门将鞭长莫及。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "射门打在人墙上。球弹回来，你脚背一阵发麻。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "balanced", text: "假射真传，搓出弧线球找内牛尔", check: { attrs: ["passing", "vision"], difficulty: 29, tag: "传球+视野" },
            success: { text: "你{elementAdj}地假射真传，外脚背一搓。弧线球绕过人墙，正好落在内切的内牛尔脚下。他迎球推射破门。", effects: { reputation: 9, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "弧线球传大了。内牛尔没够着，球被门将没收。你脚弓发酸。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "attack", text: "带球压向人墙，造一个犯规", check: { attrs: ["pressure", "iq"], difficulty: 32, tag: "抗压+球商" },
            success: { text: "你{elementAdj}地带球压向人墙，逼得后卫伸手拉人。哨响。禁区前沿，任意球。你为球队搏下一个杀机。", effects: { reputation: 7, attrs: { pressure: 1 } } },
            fail: { text: "你带球撞上人墙。球被断走，裁判没吹。你懊恼地捶了下大腿。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "balanced", text: "在对抗中护住球，等队友到位再分", check: { attrs: ["strength", "balance"], difficulty: 26, tag: "对抗+平衡" },
            success: { text: "你沉肩把补防的后卫挡在身后，护住球。等队友到位，才从容分球。定位球的杀机被你重新铺开。", effects: { reputation: 6, attrs: { strength: 1 } } },
            fail: { text: "你被后卫一挤，护球失败。球被断走，你后背撞得生疼。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "补时最后一攻。你带球推进到布澜半场，面前是整条防线。看台的声浪压下来，汗水糊住了眼睛。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "连晃两人，杀入禁区推射", check: { attrs: ["dribble", "agility"], difficulty: 38, tag: "盘带+柔韧" },
            success: { text: "你{elementAdj}地连晃两人，杀入禁区。面对门将，你冷静推射远角。绝杀。", effects: { reputation: 13, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "你拨球趟大了。后卫伸脚一捅，球弹走。你脚踝撞得生疼。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】你{elementAdj}地连过三人，单骑闯关。面对门将，你轻巧一挑。球越过门将指尖坠入网窝。读秒绝杀。全场沸腾。", effects: { reputation: 22, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "内切一步，起脚兜远角", check: { attrs: ["shooting", "power"], difficulty: 39, tag: "射门+力量" },
            success: { text: "你{elementAdj}地内切一步，拔脚怒射。球带着弧线钻入远角。门将鞭长莫及。绝杀。", effects: { reputation: 13, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "远射打飞了。球擦着横梁飞出，你脚背一阵剧痛。", effects: { stamina: -5 } }
          },
          { id: "C", sit: "attack", text: "生吃后卫，下底倒三角回传", check: { attrs: ["passing", "vision"], difficulty: 35, tag: "传球+视野" },
            success: { text: "你{elementAdj}地生吃后卫，下底倒三角回传。范志贵插上推射空门。绝杀。", effects: { reputation: 11, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "你趟球大了。球先一步滚出底线，后卫卡住身位。你大腿一阵灼烧。", effects: { stamina: -5 } }
          },
          { id: "D", sit: "balanced", text: "扛住后卫护住球，等队友压上再分", check: { attrs: ["strength", "balance"], difficulty: 27, tag: "对抗+平衡" },
            success: { text: "你像钉子一样卡住后卫，护住球。等队友压上，才从容分球。最后一攻的节奏被你稳住了。", effects: { reputation: 6, attrs: { strength: 1 } } },
            fail: { text: "你被后卫一挤，护球失败。球被断走，你后背撞得生疼。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "attack", text: "抢点起跳，头球砸向球门", check: { attrs: ["heading", "positioning"], difficulty: 34, tag: "头球+站位" },
            success: { text: "你{elementAdj}地抢点起跳，额头狠狠砸中皮球。球砸地弹入网窝。绝杀。", effects: { reputation: 11, goals: 1, attrs: { heading: 1 } } },
            fail: { text: "你起跳早了半拍。头球蹭偏，球擦柱而出。后脑勺还在嗡嗡作响。", effects: { stamina: -4 } }
          }
        ]
      },
{
        text: "你沿边路带球杀到角旗区，布澜边后卫死死贴住你。底线就在前方，禁区里队友正在抢点。草腥味混着汗味，看台的声浪一阵高过一阵。",
        sit: "attack",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "底线连续变向，晃开角度传中",
            check: { attrs: ["dribble", "agility"], difficulty: 36, tag: "盘带+柔韧" },
            success: {
              text: "你{elementAdj}地连续变向。后卫重心丢了，你晃开角度传中，队友迎球推射。助攻到手。",
              effects: {
                reputation: 11,
                assists: 1,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "变向那一下趟大了。球出了底线，后卫松了口气。你的脚踝还在发酸。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地连晃两人下底传中。队友迎球推射，全场起立。这一突，会被反复回放。",
              effects: {
                reputation: 18,
                assists: 1,
                attrs: { dribble: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "balanced",
            text: "预判后卫身后的空当，跑位下底",
            check: { attrs: ["positioning", "balance"], difficulty: 30, tag: "站位+平衡" },
            success: {
              text: "你{elementAdj}地预判了后卫身后的空当。一个反跑卡住位置，下底传中，队友迎球推射。助攻到手。",
              effects: {
                reputation: 10,
                assists: 1,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "跑位被识破。后卫卡住身位，把球捅出底线。大腿发酸。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "倒三角回传，找禁区弧顶的队友",
            check: { attrs: ["passing", "vision"], difficulty: 28, tag: "传球+视野" },
            success: {
              text: "你{elementAdj}地一脚倒三角回传。球找到弧顶的苏雯，她迎球怒射。球进了。",
              effects: {
                reputation: 9,
                assists: 1,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "回传力量小了。球被后卫伸脚一捅，机会没了。你抹了把汗。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "attack",
            text: "内切抢点，迎球推射",
            check: { attrs: ["shooting", "burst"], difficulty: 37, tag: "射门+爆发" },
            success: {
              text: "你{elementAdj}地内切抢点。迎球推射，球贴着门柱钻入网窝。门将的指尖差了两厘米。",
              effects: {
                reputation: 12,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "内切那一下被卡住。射门被后卫封堵，闷响。脚背还在发麻。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地内切爆射。球带着弧线砸入死角，场边教练把战术板摔了。",
              effects: {
                reputation: 20,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "扛住后卫逼抢，硬把球护住",
            check: { attrs: ["strength", "balance"], difficulty: 25, tag: "对抗+平衡" },
            success: {
              text: "你{elementAdj}地用后背顶住后卫。肩膀扛着肩膀，球权护住，队友陆续压上。肋骨发疼，但值。",
              effects: {
                reputation: 6,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "你被后卫挤倒。球被断下，布澜就地打反击。后背一片冰凉。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "你在中圈附近接到长传，面前是大片开阔地。布澜的防线压得很高，回追的只有两名后卫。风灌进你的耳朵，草皮在鞋钉下飞退。",
        sit: "attack",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "连续变向，盘带过掉两名后卫",
            check: { attrs: ["dribble", "agility"], difficulty: 38, tag: "盘带+柔韧" },
            success: {
              text: "你{elementAdj}地连续变向。两名后卫被你晃得重心全失，你抹进禁区单刀推射。球进了。",
              effects: {
                reputation: 13,
                goals: 1,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "过人那一下趟大了。后卫伸脚一捅，球弹出去老远。你踩在球上滑了一下。",
              effects: { stamina: -5 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地连过两人杀入禁区，冷静推射。全场起立。这一突，会被反复回放。",
              effects: {
                reputation: 21,
                goals: 1,
                attrs: { dribble: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "扛住回追的后卫，强行突破",
            check: { attrs: ["strength", "hardness"], difficulty: 33, tag: "对抗+硬度" },
            success: {
              text: "你{elementAdj}地用后背顶住后卫。肩膀扛着肩膀，强行抹进禁区，单刀推射。球进了。",
              effects: {
                reputation: 10,
                goals: 1,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "对抗中你被挤倒。球被后卫捅走，你摔在草皮上，后背发凉。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地扛开后卫单刀推射。门将只看见球进网。看台沸腾了。",
              effects: {
                reputation: 17,
                goals: 1,
                attrs: { strength: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "变向节奏一晃，骗过后卫重心",
            check: { attrs: ["rhythm", "iq"], difficulty: 29, tag: "节奏+球商" },
            success: {
              text: "你{elementAdj}地一个停顿。后卫重心丢了，你顺势抹过他，单刀推射。球进了。",
              effects: {
                reputation: 10,
                goals: 1,
                attrs: { rhythm: 1 }
              }
            },
            fail: {
              text: "节奏没骗到。后卫死死跟住，你被卡在边线，机会没了。脚踝发酸。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "attack",
            text: "抢在后卫封堵前，迎球推射死角",
            check: { attrs: ["shooting", "power"], difficulty: 37, tag: "射门+力量" },
            success: {
              text: "你{elementAdj}地抢点推射。球贴着草皮窜入死角，门将的手套只差一层皮。",
              effects: {
                reputation: 12,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "起脚那一下被卡住。射门偏出立柱，门将轻松把球抱住。脚背发麻。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地抢点爆射。球擦着门柱内侧钻入网窝，门将扑了个空。教练在场边挥拳。",
              effects: {
                reputation: 20,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "顶住后卫逼抢，护住球权再组织",
            check: { attrs: ["pressure", "balance"], difficulty: 25, tag: "抗压+平衡" },
            success: {
              text: "你{elementAdj}地稳住重心。后卫撞在你背上像撞上一堵墙，球权护住，队友陆续压上。",
              effects: {
                reputation: 6,
                attrs: { pressure: 1 }
              }
            },
            fail: {
              text: "你被后卫挤倒。球被断下，布澜就地打反击。后背一片冰凉。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "边路。你拿球面对布澜边后卫，内线空了半步。草腥味钻进鼻子，鞋钉踩实了草皮。看台的声浪压下来，你脚尖一拨，准备内切。",
        sit: "attack",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "内切抢点，迎球推射死角",
            check: { attrs: ["shooting", "burst"], difficulty: 37, tag: "射门+爆发" },
            success: {
              text: "你{elementAdj}地内切抢点。迎球推射，球贴着门柱钻入网窝。门将的指尖差了两厘米。",
              effects: {
                reputation: 12,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "内切那一下被卡住。射门被后卫封堵，闷响。脚背还在发麻。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地内切爆射。球带着弧线砸入死角，场边教练把战术板摔了。",
              effects: {
                reputation: 20,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "连续变向，盘带抹过后卫单刀",
            check: { attrs: ["dribble", "agility"], difficulty: 36, tag: "盘带+柔韧" },
            success: {
              text: "你{elementAdj}地连续变向。后卫重心丢了，你抹进禁区单刀推射。球进了。",
              effects: {
                reputation: 11,
                goals: 1,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "变向那一下趟大了。球出了底线，后卫松了口气。你的脚踝还在发酸。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地连晃两人抹进禁区，单刀推射。安静了一秒，然后所有人都站起来了。",
              effects: {
                reputation: 18,
                goals: 1,
                attrs: { dribble: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "变向节奏一晃，骗过后卫重心",
            check: { attrs: ["rhythm", "iq"], difficulty: 29, tag: "节奏+球商" },
            success: {
              text: "你{elementAdj}地一个停顿。后卫重心丢了，你顺势抹过他，直面球门。",
              effects: {
                reputation: 9,
                attrs: { rhythm: 1 }
              }
            },
            fail: {
              text: "节奏没骗到。后卫死死跟住，你被卡在边线，机会没了。脚踝发酸。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "抢点跑位，甩开后卫迎球推射",
            check: { attrs: ["positioning", "balance"], difficulty: 30, tag: "站位+平衡" },
            success: {
              text: "你{elementAdj}地预判了落点。绕到后卫盲区，迎球推射。球进了。跑位教科书一般。",
              effects: {
                reputation: 10,
                goals: 1,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "跑位被识破。后卫死死跟住，你接球转身，机会没了。大腿发酸。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "扛住后卫逼抢，护住球权再组织",
            check: { attrs: ["strength", "balance"], difficulty: 25, tag: "对抗+平衡" },
            success: {
              text: "你{elementAdj}地用后背顶住后卫。肩膀扛着肩膀，球权护住，队友陆续压上。肋骨发疼，但值。",
              effects: {
                reputation: 6,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "你被后卫挤倒。球被断下，布澜就地打反击。后背一片冰凉。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "禁区内一片混战。球弹来弹去，打在腿上、胸口上、门柱上。你在人堆里抢到落点，身边全是腿。草皮被鞋钉翻得稀烂，泥土的腥气直冲鼻腔。",
        sit: "balanced",
        choices: [
          {
            id: "A",
            sit: "balanced",
            text: "抢点跑位，迎球推射空当",
            check: { attrs: ["positioning", "balance"], difficulty: 30, tag: "站位+平衡" },
            success: {
              text: "你{elementAdj}地预判了落点。绕到后卫盲区，迎球推射。球进了。跑位教科书一般。",
              effects: {
                reputation: 10,
                goals: 1,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "跑位被识破。后卫死死跟住，你接球转身，机会没了。大腿发酸。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "人堆里连续拨球，晃开角度射门",
            check: { attrs: ["dribble", "agility"], difficulty: 36, tag: "盘带+柔韧" },
            success: {
              text: "你{elementAdj}地连续拨球。在人堆里闪转腾挪，晃开角度推射。球进了。",
              effects: {
                reputation: 11,
                goals: 1,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "拨球那一下被伸脚一捅。球弹出去老远，你踩在球上滑了一下。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地在人堆里连晃三人，冷静推射。安静了一秒，然后所有人都站起来了。",
              effects: {
                reputation: 19,
                goals: 1,
                attrs: { dribble: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "回做给禁区外的队友，重新组织",
            check: { attrs: ["passing", "vision"], difficulty: 27, tag: "传球+视野" },
            success: {
              text: "你{elementAdj}地一脚回做。球找到禁区外的苏雯，她迎球怒射。球进了。",
              effects: {
                reputation: 8,
                assists: 1,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "回做力量小了。球被后卫伸脚一捅，机会没了。你肩膀还酸着。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "attack",
            text: "迎球怒射，赌一个死角",
            check: { attrs: ["shooting", "power"], difficulty: 38, tag: "射门+力量" },
            success: {
              text: "你{elementAdj}地抡脚怒射。球带着风声砸进网窝，网绳剧烈颤抖。整个禁区都安静了。",
              effects: {
                reputation: 13,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "射门被后卫封堵，闷响。脚背还在发麻。",
              effects: { stamina: -5 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地凌空爆射。球像炮弹轰入死角，门将扑到一半就放弃了。场边一片哗然。",
              effects: {
                reputation: 21,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "扛住后卫逼抢，护住球权再组织",
            check: { attrs: ["strength", "balance"], difficulty: 25, tag: "对抗+平衡" },
            success: {
              text: "你{elementAdj}地用后背顶住后卫。肩膀扛着肩膀，球权护住，队友陆续压上。肋骨发疼，但值。",
              effects: {
                reputation: 6,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "你被后卫挤倒。球被断下，布澜就地打反击。后背一片冰凉。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "前场丢球，布澜顺势要打反击。球从你脚边滚向中场，对方后腰已经准备接球推进。汗水糊住了眼睛，你的肺还在灼烧。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "就地反抢，一记铲断夺回球权",
            check: { attrs: ["tackle", "intercept"], difficulty: 26, tag: "铲断+拦截" },
            success: {
              text: "丢球的瞬间你就地反抢。你{elementAdj}地一记铲断，球权夺回。肺部灼烧，但值得。",
              effects: {
                reputation: 6,
                attrs: { tackle: 1 }
              }
            },
            fail: {
              text: "反抢扑空。对方顺势推进，你只能看着他们的背影，大腿发酸。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "高速回追，从身后追上持球人",
            check: { attrs: ["speed", "stamina"], difficulty: 29, tag: "速度+耐力" },
            success: {
              text: "你{elementAdj}地转身回追。肺在烧，但你追上了。一记干净的铲断，球权夺回。",
              effects: {
                reputation: 7,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "回追那一步没赶上。对方顺势推进，你只能看着他的背影。大腿酸得发抖。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "封堵传球线路，掐断反击第一传",
            check: { attrs: ["iq", "positioning"], difficulty: 27, tag: "球商+站位" },
            success: {
              text: "你{elementAdj}地预判了传球线路。横身一挡，把反击的第一传掐死。布澜的快攻胎死腹中。",
              effects: {
                reputation: 6,
                attrs: { iq: 1 }
              }
            },
            fail: {
              text: "你判断错了方向。对方传球绕过你，反击继续。你抹了把汗。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "defense",
            text: "顶住压力，把对方持球人逼向边线",
            check: { attrs: ["pressure", "balance"], difficulty: 24, tag: "抗压+平衡" },
            success: {
              text: "你{elementAdj}地稳住重心。不冒失出脚，把持球人一步步逼向边线。反击速度被拖慢，队友回防到位。",
              effects: {
                reputation: 5,
                attrs: { pressure: 1 }
              }
            },
            fail: {
              text: "你逼抢太急。对方一个变向把你晃过，反击继续。脚踝发酸。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "attack",
            text: "抢到落点，迎球凌空抽射",
            check: { attrs: ["shooting", "burst"], difficulty: 34, tag: "射门+爆发" },
            success: {
              text: "你{elementAdj}地抢到落点。不等球落地，抡脚怒射。球划破空气钻入网窝。门将连反应都没有。",
              effects: {
                reputation: 11,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "凌空吃球部位偏了。球飞上看台，脚背一阵刺痛。你甩了甩发麻的脚。",
              effects: { stamina: -5 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地凌空爆射。球像炮弹轰入死角，门将扑到一半就放弃了。全场哗然。",
              effects: {
                reputation: 19,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          }
        ]
      }
    ]
  },
  ST_stopper: {
    desc: "逼抢、反抢、绞杀",
    events: [
      {
        text: "布澜中卫在中路拿球，准备后场组织。你像闻到血腥味的狼，从锋线压了上去。草腥味混着汗味，鞋钉抠进草皮。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "正面逼抢，一记凶狠的铲断", check: { attrs: ["tackle", "hardness"], difficulty: 28, tag: "铲断+硬度" },
            success: { text: "你{elementAdj}地正面逼抢，一记凶狠的铲断。球权夺回，草屑飞溅。布澜的后场组织被你掐死。", effects: { reputation: 7, attrs: { tackle: 1 } } },
            fail: { text: "你铲抢扑空。中卫顺势把球拨开，你滑倒在草皮上，膝盖生疼。", effects: { stamina: -4 } }
          },
          { id: "B", sit: "defense", text: "卡住身位施压，逼他出球失误", check: { attrs: ["pressure", "iq"], difficulty: 26, tag: "抗压+球商" },
            success: { text: "你{elementAdj}地卡住身位，步步紧逼。中卫慌了神，传球失误。球权易主。你的逼抢奏效了。", effects: { reputation: 6, attrs: { pressure: 1 } } },
            fail: { text: "你施压不够。中卫从容出球，把你甩在身后。你懊恼地捶了下大腿。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "defense", text: "全速上抢，封住他的出球角度", check: { attrs: ["speed", "burst"], difficulty: 29, tag: "速度+爆发" },
            success: { text: "你{elementAdj}地全速上抢，封住中卫的出球角度。他被迫回传门将。布澜的后场组织被你逼停。", effects: { reputation: 6, attrs: { speed: 1 } } },
            fail: { text: "你上抢慢了半拍。中卫顺势把球分出，你扑了个空。大腿一阵酸软。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "defense", text: "阅读他的传球习惯，提前卡住线路", check: { attrs: ["iq", "intercept"], difficulty: 27, tag: "球商+拦截" },
            success: { text: "你{elementAdj}地看穿了中卫的传球习惯，提前移动。球刚出脚，已经被你拦下。布澜的后场出球被你读死了。", effects: { reputation: 7, attrs: { iq: 1 } } },
            fail: { text: "你判断错了线路。中卫把球分出，你扑了个空。肺里像灌了风。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "attack", text: "断球后顺势远射，敲山震虎", check: { attrs: ["shooting", "burst"], difficulty: 33, tag: "射门+爆发" },
            success: { text: "你{elementAdj}地断球后抬头一看，门将站位靠前。你拔脚远射，球越过门将指尖坠入网窝。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "远射力量大了。球飞过横梁，你脚背一阵发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地断球后直接吊射。球带着弧线越过门将，坠入网窝。整座球场炸开了。", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          }
        ]
      },
      {
        text: "布澜后腰背身拿球，准备转身组织。你从身后逼了上去，鞋钉在草皮上抠出深痕。看台的声浪压下来。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "伸脚一捅，把球从他脚下断走", check: { attrs: ["tackle", "intercept"], difficulty: 27, tag: "铲断+拦截" },
            success: { text: "你{elementAdj}地伸脚一捅，把球从后腰脚下断走。球权易主。布澜的进攻组织被你掐死在源头。", effects: { reputation: 7, attrs: { tackle: 1 } } },
            fail: { text: "你捅球扑空。后腰顺势转身，把你甩开。你脚踝一阵发酸。", effects: { stamina: -4 } }
          },
          { id: "B", sit: "defense", text: "贴身紧逼，用身体把他逼出边线", check: { attrs: ["pressure", "hardness"], difficulty: 26, tag: "抗压+硬度" },
            success: { text: "你{elementAdj}地贴身紧逼，用身体把后腰一步步逼向边线。他被迫把球带出界。球权易主。", effects: { reputation: 6, attrs: { pressure: 1 } } },
            fail: { text: "你逼抢不够紧。后腰从容转身，把你甩开。你懊恼地捶了下大腿。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "defense", text: "全速上抢，抢在他转身前把球捅走", check: { attrs: ["speed", "burst"], difficulty: 28, tag: "速度+爆发" },
            success: { text: "你{elementAdj}地全速上抢，抢在后腰转身前把球捅走。球权易主。布澜的进攻被你扼杀在萌芽。", effects: { reputation: 6, attrs: { speed: 1 } } },
            fail: { text: "你上抢慢了半拍。后腰转身把球分出，你扑了个空。大腿一阵灼烧。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "defense", text: "预判他的转身方向，提前卡住线路", check: { attrs: ["iq", "intercept"], difficulty: 27, tag: "球商+拦截" },
            success: { text: "你{elementAdj}地提前卡住后腰的转身线路。他刚转身，球已经被你断下。布澜的进攻组织被你读死了。", effects: { reputation: 7, attrs: { iq: 1 } } },
            fail: { text: "你判断错了线路。后腰从另一侧转身，把你甩开。肺里像灌了风。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "attack", text: "断球后直接起脚，吊射空门", check: { attrs: ["shooting", "burst"], difficulty: 34, tag: "射门+爆发" },
            success: { text: "你{elementAdj}地断球后抬头一看，门将站位靠前。你拔脚吊射，球越过门将指尖坠入网窝。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "吊射力量大了。球飞过横梁，你脚背一阵发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地断球后直接吊射。球带着弧线越过门将，坠入网窝。整座球场炸开了。", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          }
        ]
      },
      {
        text: "你前场丢球，布澜顺势要打反击。球从你脚边滚向中场，对方后腰已经准备接球推进。汗水糊住了眼睛。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "就地滑铲，把球权夺回来", check: { attrs: ["tackle", "hardness"], difficulty: 29, tag: "铲断+硬度" },
            success: { text: "你{elementAdj}地就地滑铲，鞋钉把球铲回。草屑飞溅，球权夺回。肺部在灼烧，但值得。", effects: { reputation: 7, attrs: { tackle: 1 } } },
            fail: { text: "你滑铲扑空。对方后腰顺势推进，你只能在草皮上看着他的背影。膝盖生疼。", effects: { stamina: -5 } }
          },
          { id: "B", sit: "defense", text: "卡住身位，逼他无法转身推进", check: { attrs: ["pressure", "iq"], difficulty: 25, tag: "抗压+球商" },
            success: { text: "你{elementAdj}地卡住身位，把后腰死死挡在身后。他无法转身，只能回传。反击被你逼停。", effects: { reputation: 6, attrs: { pressure: 1 } } },
            fail: { text: "你卡位慢了一步。后腰顺势转身推进，你只能回追。懊恼地捶了下大腿。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "defense", text: "全速回追，伸脚把球捅走", check: { attrs: ["speed", "stamina"], difficulty: 28, tag: "速度+耐力" },
            success: { text: "你{elementAdj}地全速回追，伸脚把球捅走。球权夺回。肺部像火烧，但你没给对手任何机会。", effects: { reputation: 6, attrs: { speed: 1 } } },
            fail: { text: "你回追慢了半拍。后腰顺势推进，你只能看着他的背影。大腿一阵酸软。", effects: { stamina: -5 } }
          },
          { id: "D", sit: "defense", text: "阅读他的推进路线，提前站住位置", check: { attrs: ["iq", "intercept"], difficulty: 26, tag: "球商+拦截" },
            success: { text: "你{elementAdj}地提前站住位置，把后腰的传球线路封死。他刚出球，球已经被你拦下。反击被你读死了。", effects: { reputation: 7, attrs: { iq: 1 } } },
            fail: { text: "你判断错了线路。后腰把球分出，你扑了个空。肺里像灌了风。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "attack", text: "断球后顺势吊射，打门将一个措手不及", check: { attrs: ["shooting", "burst"], difficulty: 33, tag: "射门+爆发" },
            success: { text: "你{elementAdj}地断球后顺势吊射。球越过回追的后卫，越过门将指尖坠入网窝。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "吊射力量大了。球飞过横梁，你脚背一阵发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地断球后直接吊射。球带着弧线越过门将，坠入网窝。整座球场炸开了。", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          }
        ]
      },
      {
        text: "角球。布澜开出角球，禁区里人挤人。你作为上抢型前锋，被安排在前点争顶。鞋钉在草皮上抠出深痕。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "前点起跳，把球顶出禁区", check: { attrs: ["heading", "positioning"], difficulty: 28, tag: "头球+站位" },
            success: { text: "你{elementAdj}地抢在前点起跳，把球狠狠顶出禁区。布澜的角球攻势被你化解。", effects: { reputation: 6, attrs: { heading: 1 } } },
            fail: { text: "你起跳早了半拍。球从你头顶飞过，落到后点。后脑勺还在嗡嗡作响。", effects: { stamina: -4 } }
          },
          { id: "B", sit: "defense", text: "卡住身位，用身体把对方中锋挤出落点", check: { attrs: ["strength", "hardness"], difficulty: 27, tag: "对抗+硬度" },
            success: { text: "你{elementAdj}地用身体把对方中锋挤出落点。他抢不到点，球被队友解围。禁区里的肉搏，你赢了。", effects: { reputation: 6, attrs: { strength: 1 } } },
            fail: { text: "你被对方中锋反挤开。他抢到落点，头球攻门。你后背撞得生疼。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "defense", text: "指挥防线整体前压，造一个越位", check: { attrs: ["iq", "pressure"], difficulty: 29, tag: "球商+抗压" },
            success: { text: "你{elementAdj}地高喊一声，指挥防线整体前压。布澜的接应球员越位。哨响。角球攻势被你化解。", effects: { reputation: 7, attrs: { iq: 1 } } },
            fail: { text: "你指挥慢了半拍。防线没压上，布澜的接应球员拿到球。你懊恼地捶了下大腿。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "defense", text: "落地后立刻回追，补防第二落点", check: { attrs: ["speed", "stamina"], difficulty: 27, tag: "速度+耐力" },
            success: { text: "你{elementAdj}地落地后立刻回追，补防第二落点。布澜的补射被你封堵。肺部在灼烧，但值得。", effects: { reputation: 6, attrs: { speed: 1 } } },
            fail: { text: "你回追慢了半拍。布澜的补射打偏，但你惊出一身冷汗。大腿一阵酸软。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "attack", text: "顶到球后顺势凌空抽射", check: { attrs: ["shooting", "power"], difficulty: 33, tag: "射门+力量" },
            success: { text: "你{elementAdj}地把球顶下，顺势凌空抽射。球带着弧线钻入死角。门将鞭长莫及。", effects: { reputation: 10, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "凌空没吃准部位。球飞上看台，你脚背一阵发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地顶下球后直接凌空。球像炮弹一样砸入死角。整座球场为你沸腾。", effects: { reputation: 17, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          }
        ]
      },
      {
        text: "断球成功，反击。球到了你脚下，面前是大片空当。布澜的防线压得很高，回追的只有一个人。风灌进你的耳朵。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "带球长途推进，直扑禁区", check: { attrs: ["dribble", "speed"], difficulty: 35, tag: "盘带+速度" },
            success: { text: "你{elementAdj}地带球狂奔。风灌进耳朵，草皮在鞋钉下飞退。杀到禁区，你冷静推射远角。", effects: { reputation: 11, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "你趟球大了。回追的后卫伸脚一捅，球弹走。你大腿一阵酸软。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】你{elementAdj}地连过两人，单骑闯关。面对门将，你轻巧一挑。球越过门将指尖坠入网窝。全场沸腾。", effects: { reputation: 19, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "一脚直塞，发动快速反击", check: { attrs: ["passing", "vision"], difficulty: 34, tag: "传球+视野" },
            success: { text: "你{elementAdj}地斜塞一脚。球精准找到套边的内牛尔，他下底传中，范志贵抢点破门。", effects: { reputation: 10, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "直塞线路被回追的后卫挡了一下。内牛尔没追上，球出了底线。你脚腕发酸。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "attack", text: "前点起跳，头球摆渡给范志贵", check: { attrs: ["heading", "positioning"], difficulty: 34, tag: "头球+站位" },
            success: { text: "你{elementAdj}地抢点起跳，头球一摆，把球蹭向身后。范志贵插上迎球推射破门。", effects: { reputation: 10, assists: 1, attrs: { heading: 1 } } },
            fail: { text: "你起跳早了半拍。头球蹭偏，球擦柱而出。后脑勺还在嗡嗡作响。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "attack", text: "禁区前沿直接起脚远射", check: { attrs: ["shooting", "power"], difficulty: 37, tag: "射门+力量" },
            success: { text: "你{elementAdj}地拔脚怒射。球带着弧线钻入死角。门将鞭长莫及。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "远射打飞了。球擦着横梁飞出，你脚背一阵发麻。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "balanced", text: "护住球等队友跟上，再从容分球", check: { attrs: ["strength", "balance"], difficulty: 26, tag: "对抗+平衡" },
            success: { text: "你沉肩把回追的后卫挡在身后，护住球。等队友跟上，再从容分球。反击的节奏稳住了。", effects: { reputation: 6, attrs: { strength: 1 } } },
            fail: { text: "你被后卫从背后一撞，重心丢了。球被断走，你踉跄着摔倒。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "布澜边后卫在边路拿球，想沿边路推进。你斜刺里杀到，鞋钉在草皮上抠出深痕。看台的声浪压下来。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "一记凶狠的铲断，把球留下", check: { attrs: ["tackle", "hardness"], difficulty: 28, tag: "铲断+硬度" },
            success: { text: "你{elementAdj}地一记铲断，鞋钉把球铲出边线。草屑飞溅。布澜的边路推进被你掐死。", effects: { reputation: 7, attrs: { tackle: 1 } } },
            fail: { text: "你铲抢扑空。边后卫顺势把球拨开，你滑倒在草皮上。膝盖生疼。", effects: { stamina: -4 } }
          },
          { id: "B", sit: "attack", text: "断球后直接远射，打门将一个措手不及", check: { attrs: ["shooting", "burst"], difficulty: 33, tag: "射门+爆发" },
            success: { text: "你{elementAdj}地断球后抬头一看，门将站位靠前。你拔脚远射，球越过门将指尖坠入网窝。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "远射力量大了。球飞过横梁，你脚背一阵发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地断球后直接吊射。球带着弧线越过门将，坠入网窝。整座球场炸开了。", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "defense", text: "全速回追，封住他的下底线路", check: { attrs: ["speed", "stamina"], difficulty: 28, tag: "速度+耐力" },
            success: { text: "你{elementAdj}地全速回追，封住边后卫的下底线路。他被迫回传。布澜的边路推进被你逼停。", effects: { reputation: 6, attrs: { speed: 1 } } },
            fail: { text: "你回追慢了半拍。边后卫下底传中，你只能看着球飞过禁区。大腿一阵酸软。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "defense", text: "阅读他的传中习惯，提前拦截", check: { attrs: ["iq", "intercept"], difficulty: 27, tag: "球商+拦截" },
            success: { text: "你{elementAdj}地看穿了边后卫的传中习惯，提前移动。一记拦截把球断下。布澜的边路攻势被你读死了。", effects: { reputation: 7, attrs: { iq: 1 } } },
            fail: { text: "你判断错了线路。边后卫把球传出，你扑了个空。肺里像灌了风。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "指挥队友合围，把边路锁死", check: { attrs: ["pressure", "iq"], difficulty: 26, tag: "抗压+球商" },
            success: { text: "你{elementAdj}地高喊一声，指挥队友合围。边后卫陷入两人夹击，球被断下。布澜的边路被你锁死了。", effects: { reputation: 6, attrs: { pressure: 1 } } },
            fail: { text: "你指挥慢了半拍。队友没合围到位，边后卫顺势突破。你懊恼地捶了下大腿。", effects: { stamina: -3 } }
          }
        ]
      },
{
        text: "布澜门将在禁区里拿球，准备短传出球。你像闻到血腥味的狼，从锋线压了上去。草腥味混着汗味，鞋钉抠进草皮。门将抬头看了一眼，眼神里闪过一丝慌乱。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "扑上去封堵出球线路，逼门将开大脚",
            check: { attrs: ["tackle", "intercept"], difficulty: 27, tag: "铲断+拦截" },
            success: {
              text: "你{elementAdj}地扑上去。出球线路被封死，门将只能仓促开大脚。球权回到你方。逼抢，从门将开始。",
              effects: {
                reputation: 7,
                attrs: { tackle: 1 }
              }
            },
            fail: {
              text: "你扑得太急。门将一个变向把你晃过，从容出球。脚踝发酸。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "高速冲刺，抢在门将出球前断下",
            check: { attrs: ["speed", "burst"], difficulty: 30, tag: "速度+爆发" },
            success: {
              text: "你{elementAdj}地一个箭步。门将刚要出球，球被你伸脚断下。空门。推射。球进了。",
              effects: {
                reputation: 11,
                goals: 1,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "冲刺那一下没赶上。门将把球开出，你扑了个空。大腿发酸。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地抢断门将，推射空门。全场起立。这一抢，会被反复回放。",
              effects: {
                reputation: 18,
                goals: 1,
                attrs: { speed: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "预判出球方向，提前卡住接应点",
            check: { attrs: ["iq", "positioning"], difficulty: 28, tag: "球商+站位" },
            success: {
              text: "你{elementAdj}地预判了出球方向。提前卡住接应点，门将的传球被你拦下。反击，从你脚下发起。",
              effects: {
                reputation: 7,
                attrs: { iq: 1 }
              }
            },
            fail: {
              text: "你判断错了方向。门将的传球绕过你，从容组织。你抹了把汗。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "defense",
            text: "持续施压，把门将逼到慌乱出错",
            check: { attrs: ["pressure", "resolve"], difficulty: 25, tag: "抗压+决断" },
            success: {
              text: "你{elementAdj}地步步紧逼。不冒失出脚，把门将逼到慌乱。他一脚踢呲，球权回到你方。",
              effects: {
                reputation: 6,
                attrs: { pressure: 1 }
              }
            },
            fail: {
              text: "你施压不够。门将从容出球，你的逼抢扑了个空。肺里的灼烧还在。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "attack",
            text: "断球后迎球抽射，赌一个空门",
            check: { attrs: ["shooting", "burst"], difficulty: 34, tag: "射门+爆发" },
            success: {
              text: "门将的出球被你断下。你{elementAdj}地迎球抽射，球砸进空门。网绳剧烈地抖。",
              effects: {
                reputation: 11,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "断球那一下趟大了。门将回身把球扑住，你扑了个空。脚背发麻。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地抢断门将，迎球爆射空门。全场起立。这一抢一射，会被反复回放。",
              effects: {
                reputation: 19,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          }
        ]
      },
{
        text: "禁区外一片混战。布澜后卫把球顶出，皮球高高弹起，落在禁区弧顶。双方球员同时朝第二落点冲去，鞋钉刮着草皮。这是你最喜欢的绞杀距离。",
        sit: "balanced",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "凶狠铲抢，把第二落点连人带球拿下",
            check: { attrs: ["tackle", "hardness"], difficulty: 28, tag: "铲断+硬度" },
            success: {
              text: "你{elementAdj}地一记凶狠铲抢。连人带球把第二落点拿下，球权夺回。看台一片惊呼。",
              effects: {
                reputation: 7,
                attrs: { tackle: 1 }
              }
            },
            fail: {
              text: "铲抢那一下扑空。对方顺势推进，你摔在草皮上，膝盖发凉。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "咬牙卡位，把对方后腰挤出落点",
            check: { attrs: ["stamina", "balance"], difficulty: 26, tag: "耐力+平衡" },
            success: {
              text: "你{elementAdj}地咬紧牙关。腿像灌了铅，但你卡住了身位，把后腰挤出落点。球权护住。",
              effects: {
                reputation: 6,
                attrs: { stamina: 1 }
              }
            },
            fail: {
              text: "你撑不住了。脚下一软，被后腰挤出落点，球丢了。大腿酸得发抖。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "预判落点，提前卡住第二落点",
            check: { attrs: ["iq", "positioning"], difficulty: 27, tag: "球商+站位" },
            success: {
              text: "你{elementAdj}地预判了落点。提前卡住位置，球正落在你脚下。反击，从你脚下发起。",
              effects: {
                reputation: 7,
                attrs: { iq: 1 }
              }
            },
            fail: {
              text: "落点判断偏了半步。后腰抢先一步把球捅走，你扑了个空。膝盖发酸。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "卡住身位，把第二落点护下来",
            check: { attrs: ["positioning", "balance"], difficulty: 27, tag: "站位+平衡" },
            success: {
              text: "你{elementAdj}地提前卡住身位。后背一顶，把后腰挡在身后，第二落点稳稳护下。反击，从你脚下发起。",
              effects: {
                reputation: 6,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "你站位偏了半步。后腰抢先一步把球捅走，你扑了个空。膝盖发酸。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "attack",
            text: "抢到落点，迎球凌空抽射",
            check: { attrs: ["shooting", "burst"], difficulty: 34, tag: "射门+爆发" },
            success: {
              text: "你{elementAdj}地抢到落点。不等球落地，抡脚怒射。球划破空气钻入网窝。门将连反应都没有。",
              effects: {
                reputation: 11,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "凌空吃球部位偏了。球飞上看台，脚背一阵刺痛。你甩了甩发麻的脚。",
              effects: { stamina: -5 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地凌空爆射。球像炮弹轰入死角，门将扑到一半就放弃了。全场哗然。",
              effects: {
                reputation: 19,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          }
        ]
      },
{
        text: "布澜断球发动反击，前锋单刀直入，防线被打穿了。你是距离最近的回追者。风灌进耳朵，草皮在鞋钉下飞退。心脏在胸腔里擂鼓。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "回追铲球，从身后干净地破坏",
            check: { attrs: ["tackle", "intercept"], difficulty: 30, tag: "铲断+拦截" },
            success: {
              text: "你{elementAdj}地回追到位。一记干净的铲断，球从对方脚下滚出。单刀，被你破坏了。",
              effects: {
                reputation: 8,
                attrs: { tackle: 1 }
              }
            },
            fail: {
              text: "铲球那一下扑空。对方顺势推射，球进了。你摔在草皮上，膝盖发凉。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "高速回追，从身后追上持球人",
            check: { attrs: ["speed", "stamina"], difficulty: 29, tag: "速度+耐力" },
            success: {
              text: "你{elementAdj}地转身回追。肺在烧，但你追上了。一记干净的铲断，球权夺回。",
              effects: {
                reputation: 7,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "回追那一步没赶上。对方顺势推射，球进了。大腿酸得发抖。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "预判射门角度，提前卡住身位",
            check: { attrs: ["iq", "positioning"], difficulty: 28, tag: "球商+站位" },
            success: {
              text: "你{elementAdj}地预判了射门角度。提前卡住身位，把对方逼向边线。射门角度被压窄，球偏出立柱。",
              effects: {
                reputation: 7,
                attrs: { iq: 1 }
              }
            },
            fail: {
              text: "你判断错了方向。对方一个变向把你晃过，单刀推射。脚踝发酸。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "D",
            sit: "defense",
            text: "头球解围，把传中顶出危险区",
            check: { attrs: ["heading", "balance"], difficulty: 26, tag: "头球+平衡" },
            success: {
              text: "对方一记传中吊向禁区。你{elementAdj}地高高跃起，额头一蹭，球顶出危险区。肺里的灼烧慢慢平复。",
              effects: {
                reputation: 6,
                attrs: { heading: 1 }
              }
            },
            fail: {
              text: "起跳早了半拍。球擦着你的头皮飞过去，落在对方脚下。后脑勺还在发凉。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "咬牙死磕，拼尽全力把单刀拦下",
            check: { attrs: ["resolve", "pressure"], difficulty: 25, tag: "决断+抗压" },
            success: {
              text: "你{elementAdj}地咬紧牙关。肺在烧，腿像灌了铅，但你没有放弃。最后一刻伸脚一挡，把单刀拦下。",
              effects: {
                reputation: 6,
                attrs: { resolve: 1 }
              }
            },
            fail: {
              text: "你慢了一拍。对方顺势推射，球进了。大腿酸得发抖，你跪在草皮上。",
              effects: { stamina: -5 }
            }
          }
        ]
      },
{
        text: "前场断球，反击。球到了你脚下，面前是大片空当。布澜的防线压得很高，回追的只有一个人。风灌进你的耳朵，草皮在鞋钉下飞退。",
        sit: "attack",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "迎球头球轰炸，砸向地面",
            check: { attrs: ["heading", "balance"], difficulty: 34, tag: "头球+平衡" },
            success: {
              text: "你{elementAdj}地腾空。额头狠狠砸在球上，球弹地窜入网窝。落地时膝盖发软，但你笑了。",
              effects: {
                reputation: 11,
                goals: 1,
                attrs: { heading: 1 }
              }
            },
            fail: {
              text: "起跳早了半拍。球擦着你的头皮飞过去，砸在边网上。后脑勺还在发凉。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地力压后卫头槌。球像钉子一样钉进死角，门将连手都没抬。看台沸腾了。",
              effects: {
                reputation: 18,
                goals: 1,
                attrs: { heading: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "扛住回追的后卫，强行突破",
            check: { attrs: ["strength", "hardness"], difficulty: 32, tag: "对抗+硬度" },
            success: {
              text: "你{elementAdj}地用后背顶住后卫。肩膀扛着肩膀，强行抹进禁区，单刀推射。球进了。",
              effects: {
                reputation: 10,
                goals: 1,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "对抗中你被挤倒。球被后卫捅走，你摔在草皮上，后背发凉。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地扛开后卫单刀推射。门将只看见球进网。看台沸腾了。",
              effects: {
                reputation: 17,
                goals: 1,
                attrs: { strength: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "C",
            sit: "attack",
            text: "强行加速，速度生吃后卫单刀",
            check: { attrs: ["speed", "burst"], difficulty: 34, tag: "速度+爆发" },
            success: {
              text: "你{elementAdj}地一个加速。球从后卫身边趟过，你抹过他单刀推射。球进了。",
              effects: {
                reputation: 11,
                goals: 1,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "加速那一下被卡住身位。后卫抢先一步把球捅出。大腿发酸。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地生吃后卫单刀推射。门将只看见球进网。看台沸腾了。",
              effects: {
                reputation: 18,
                goals: 1,
                attrs: { speed: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "D",
            sit: "defense",
            text: "回追拦截，掐断对手反击的第一传",
            check: { attrs: ["passing", "vision"], difficulty: 27, tag: "传球+视野" },
            success: {
              text: "对手断球要打反击。你{elementAdj}地回追到位，预判出传球线路，伸脚一挡把第一传掐死。快攻胎死腹中。",
              effects: {
                reputation: 6,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "你判断错了方向。对手传球绕过你，反击继续。你抹了把汗。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "attack",
            text: "抢在门将出击前，迎球推射死角",
            check: { attrs: ["shooting", "burst"], difficulty: 37, tag: "射门+爆发" },
            success: {
              text: "你{elementAdj}地抢点推射。球贴着草皮窜入死角，门将的手套只差一层皮。",
              effects: {
                reputation: 12,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "起脚那一下被卡住。射门偏出立柱，门将轻松把球抱住。脚背发麻。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地抢点爆射。球擦着门柱内侧钻入网窝，门将扑了个空。教练在场边挥拳。",
              effects: {
                reputation: 20,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          }
        ]
      },
{
        text: "读秒阶段，你方领先一球。布澜全线压上，把球吊进禁区。草腥味混着汗味，看台的吼声像潮水。守住这球，三分到手。你的腿像灌了铅。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "前点高高跃起，头球解围",
            check: { attrs: ["heading", "balance"], difficulty: 27, tag: "头球+平衡" },
            success: {
              text: "你{elementAdj}地高高跃起。额头狠狠砸在球上，球顶出危险区。落地时膝盖发软，但三分稳了。",
              effects: {
                reputation: 7,
                attrs: { heading: 1 }
              }
            },
            fail: {
              text: "起跳早了半拍。球擦着你的头皮飞过去，落在对方脚下。后脑勺还在发凉。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "凶狠铲抢，把传中破坏出底线",
            check: { attrs: ["tackle", "hardness"], difficulty: 28, tag: "铲断+硬度" },
            success: {
              text: "你{elementAdj}地一记凶狠铲抢。连人带球把传中破坏出底线。看台一片惊呼。",
              effects: {
                reputation: 7,
                attrs: { tackle: 1 }
              }
            },
            fail: {
              text: "铲抢那一下扑空。对方顺势推射，球进了。你摔在草皮上，膝盖发凉。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "咬牙卡位，把对方高点挤出落点",
            check: { attrs: ["stamina", "balance"], difficulty: 26, tag: "耐力+平衡" },
            success: {
              text: "你{elementAdj}地咬紧牙关。腿像灌了铅，但你卡住了身位，把高点挤出落点。球权护住。",
              effects: {
                reputation: 6,
                attrs: { stamina: 1 }
              }
            },
            fail: {
              text: "你撑不住了。脚下一软，被高点挤出落点，球顶向球门。大腿酸得发抖。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "D",
            sit: "defense",
            text: "预判落点，提前卡住第二落点",
            check: { attrs: ["iq", "positioning"], difficulty: 27, tag: "球商+站位" },
            success: {
              text: "你{elementAdj}地预判了落点。提前卡住位置，把第二落点保护下来。布澜的围攻被化解。",
              effects: {
                reputation: 6,
                attrs: { iq: 1 }
              }
            },
            fail: {
              text: "落点判断偏了半步。对方抢到第二落点，迎球怒射。你抹了把汗。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "attack",
            text: "抢到第二落点，迎球凌空抽射",
            check: { attrs: ["shooting", "burst"], difficulty: 34, tag: "射门+爆发" },
            success: {
              text: "你{elementAdj}地抢到落点。不等球落地，抡脚怒射。球划破空气钻入网窝。门将连反应都没有。",
              effects: {
                reputation: 11,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "凌空吃球部位偏了。球飞上看台，脚背一阵刺痛。你甩了甩发麻的脚。",
              effects: { stamina: -5 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地凌空爆射。球像炮弹轰入死角，门将扑到一半就放弃了。全场哗然。",
              effects: {
                reputation: 19,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          }
        ]
      }
    ]
  },
  ST_cover: {
    desc: "护球、接应、稳健",
    events: [
      {
        text: "你背身接到分球，后卫的胸口贴上你的后背。草腥味混着汗味。布澜的防线正整体压上，看台的声浪压下来。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "balanced", text: "背身护住球，等队友跑位再分", check: { attrs: ["strength", "balance"], difficulty: 26, tag: "对抗+平衡" },
            success: { text: "你像钉子一样卡住后卫，护住球。等范志贵跑出空当，才从容分球。进攻重新铺开。", effects: { reputation: 6, attrs: { strength: 1 } } },
            fail: { text: "你被后卫一挤，护球失败。球被断走，你后背撞得生疼。", effects: { stamina: -3 } }
          },
          { id: "B", sit: "balanced", text: "回做给插上的苏雯，自己反插", check: { attrs: ["passing", "vision"], difficulty: 27, tag: "传球+视野" },
            success: { text: "你{elementAdj}地回做给插上的苏雯，自己反身插入禁区。她直塞，球到人到。你迎球推射。配合打出来了。", effects: { reputation: 8, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "回做力量小了。苏雯没接住，球被后卫捅走。你肩膀还酸着。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "attack", text: "扛住后卫，强行转身抽射", check: { attrs: ["shooting", "burst"], difficulty: 35, tag: "射门+爆发" },
            success: { text: "你{elementAdj}地借势转身，一脚抽射破门。门将指尖差了两厘米。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "转身没晃开角度。射门被后卫用身体封堵，闷响一声。你的脚背还在发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地转身抽射。球带着弧线砸入死角。场边教练把战术板摔在了地上。", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "D", sit: "balanced", text: "在对抗中稳住重心，护球等队友到位", check: { attrs: ["balance", "pressure"], difficulty: 25, tag: "平衡+抗压" },
            success: { text: "你{elementAdj}地在对抗中稳住重心，护住球。等队友到位，才从容分球。布澜的逼抢扑了个空。", effects: { reputation: 6, attrs: { balance: 1 } } },
            fail: { text: "你重心一歪，护球失败。球被断走，你踉跄两步。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "丢球后全速回追，把球捅走", check: { attrs: ["speed", "stamina"], difficulty: 24, tag: "速度+耐力" },
            success: { text: "丢球的瞬间你全速回追。伸脚一捅，球权夺回。肺部在灼烧，但值得。", effects: { reputation: 5, attrs: { speed: 1 } } },
            fail: { text: "回追扑空。对方顺势推进，你只能看着他们的背影，大腿发酸。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "你回撤到中场要球，背身倚住对方后腰。中场被布澜压制，队友接应点被盯死。草皮被鞋钉翻起，泥土的腥气钻进鼻腔。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "balanced", text: "一脚直塞，找反越位的内牛尔", check: { attrs: ["passing", "vision"], difficulty: 29, tag: "传球+视野" },
            success: { text: "你{elementAdj}地送出一脚贴地直塞。球像手术刀一样剖开防线。内牛尔反越位成功，单刀破门。", effects: { reputation: 9, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "直塞线路被后腰伸脚挡了一下。球速一慢，门将出击把球没收。你脚弓还在发麻。", effects: { stamina: -3 } }
          },
          { id: "B", sit: "attack", text: "弧顶迎球远射，敲山震虎", check: { attrs: ["shooting", "power"], difficulty: 34, tag: "射门+力量" },
            success: { text: "你{elementAdj}地在弧顶迎球怒射。球穿过人缝钻入死角。布澜门将扑救不及。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "远射没吃准部位。球高高飞上看台，你脚背一阵发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地拔脚怒射。球带着弧线砸入死角。整座球场安静了一秒，随即炸开。", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "阅读防线，挪到空当处接球转身", check: { attrs: ["positioning", "iq"], difficulty: 27, tag: "站位+球商" },
            success: { text: "你早看穿了后卫的盯人。横向挪出半步空当，接球、转身、推进，一气呵成。布澜的逼抢扑了个空。", effects: { reputation: 7, attrs: { positioning: 1 } } },
            fail: { text: "你跑位慢了一拍。接球时被后卫贴身卡住，只能回传。肺里像灌了风。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "背身扛住后腰，护球摆脱逼抢", check: { attrs: ["strength", "balance"], difficulty: 26, tag: "对抗+平衡" },
            success: { text: "你沉下重心，把后腰死死挡在身后。肋骨被顶得生疼，球却稳稳护住。你顺势分球，摆脱了逼抢。", effects: { reputation: 6, attrs: { strength: 1 } } },
            fail: { text: "后腰从背后一挤，你重心一歪。球丢了，你踉跄两步才站稳。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "丢球后全速回追，把火苗掐灭在中场", check: { attrs: ["speed", "stamina"], difficulty: 24, tag: "速度+耐力" },
            success: { text: "丢球的一瞬你已经全速回追到位。伸脚一捅把球权夺回，草屑飞溅。中场这道闸，你守住了。", effects: { reputation: 5, attrs: { speed: 1 } } },
            fail: { text: "你回追慢了半步。对方顺势推进。大腿肌肉一阵灼烧。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "角球防守。布澜开出角球，禁区里人挤人。你作为拖后中锋，退到禁区前沿负责第二落点和防空。鞋钉在草皮上抠出深痕。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "迎球起跳，把球顶出禁区", check: { attrs: ["heading", "positioning"], difficulty: 27, tag: "头球+站位" },
            success: { text: "你{elementAdj}地迎球起跳，把球狠狠顶出禁区。布澜的角球攻势被你化解。", effects: { reputation: 6, attrs: { heading: 1 } } },
            fail: { text: "你起跳早了半拍。球从你头顶飞过，落到后点。后脑勺还在嗡嗡作响。", effects: { stamina: -4 } }
          },
          { id: "B", sit: "defense", text: "卡住身位，用身体把对方中锋挤出落点", check: { attrs: ["strength", "hardness"], difficulty: 26, tag: "对抗+硬度" },
            success: { text: "你{elementAdj}地用身体把对方中锋挤出落点。他抢不到点，球被队友解围。禁区里的肉搏，你赢了。", effects: { reputation: 6, attrs: { strength: 1 } } },
            fail: { text: "你被对方中锋反挤开。他抢到落点，头球攻门。你后背撞得生疼。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "defense", text: "落地后立刻回追，补防第二落点", check: { attrs: ["speed", "stamina"], difficulty: 27, tag: "速度+耐力" },
            success: { text: "你{elementAdj}地落地后立刻回追，补防第二落点。布澜的补射被你封堵。肺部在灼烧，但值得。", effects: { reputation: 6, attrs: { speed: 1 } } },
            fail: { text: "你回追慢了半拍。布澜的补射打偏，但你惊出一身冷汗。大腿一阵酸软。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "balanced", text: "解围后一脚长传，发动反击", check: { attrs: ["passing", "vision"], difficulty: 28, tag: "传球+视野" },
            success: { text: "你{elementAdj}地解围后顺势一脚长传。球精准找到前场的内牛尔，他带球推进。反击打出来了。", effects: { reputation: 7, attrs: { passing: 1 } } },
            fail: { text: "长传力量大了。球飞出边线，内牛尔没追上。你脚弓还在发酸。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "attack", text: "断下球后直接远射", check: { attrs: ["shooting", "burst"], difficulty: 32, tag: "射门+爆发" },
            success: { text: "你{elementAdj}地断下球后抬头一看，门将站位靠前。你拔脚远射，球越过门将指尖坠入网窝。", effects: { reputation: 10, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "远射力量大了。球飞过横梁，你脚背一阵发麻。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "比分胶着，比赛进入末段。你拖后站在中圈附近，负责接应和护球。布澜的前锋压得很凶，队友的接应点被盯死。汗水顺着下巴滴在草皮上。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "balanced", text: "背身护住球，等队友跑出空当再分", check: { attrs: ["strength", "balance"], difficulty: 26, tag: "对抗+平衡" },
            success: { text: "你像钉子一样卡住后卫，护住球。等队友跑出空当，才从容分球。进攻的节奏被你稳住了。", effects: { reputation: 6, attrs: { strength: 1 } } },
            fail: { text: "你被后卫一挤，护球失败。球被断走，你后背撞得生疼。", effects: { stamina: -3 } }
          },
          { id: "B", sit: "balanced", text: "控制节奏，横传转移调动防线", check: { attrs: ["rhythm", "iq"], difficulty: 25, tag: "节奏+球商" },
            success: { text: "你不慌不忙地把球踩在脚下，节奏一压。横传转移，布澜的防线被调动开。进攻重新铺开。", effects: { reputation: 6, attrs: { rhythm: 1 } } },
            fail: { text: "你停球拖了一拍。对方两人合围上来，球被断走。你后背全是冷汗。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "balanced", text: "横向带球摆脱逼抢，再分边", check: { attrs: ["dribble", "agility"], difficulty: 27, tag: "盘带+柔韧" },
            success: { text: "你{elementAdj}地横向一拨，带球抹过逼抢的后卫。布澜的合围扑了个空，你顺势分边。", effects: { reputation: 7, attrs: { dribble: 1 } } },
            fail: { text: "你带球被后卫伸脚一捅。球弹走，你脚踝撞得生疼。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "attack", text: "转身抽射，打门将一个措手不及", check: { attrs: ["shooting", "burst"], difficulty: 34, tag: "射门+爆发" },
            success: { text: "你{elementAdj}地突然转身，一脚抽射。球贴着门柱内侧钻入网窝。门将扑救不及。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "转身没晃开角度。射门被后卫封堵，闷响一声。你脚背还在发麻。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "balanced", text: "前点起跳争顶，把球做给队友", check: { attrs: ["heading", "positioning"], difficulty: 28, tag: "头球+站位" },
            success: { text: "你{elementAdj}地前点起跳，把球卸下做给插上的苏雯。她迎球推射。配合打出来了。", effects: { reputation: 7, assists: 1, attrs: { heading: 1 } } },
            fail: { text: "你起跳早了半拍。球从头顶飞过，落到对方脚下。后脑勺还在嗡嗡作响。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "布澜的防线压得很高，后卫身后是大片空当。你拖后站在中线附近，阅读着防线的移动。草腥味混着汗味，看台的声浪压下来。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "阅读防线，反越位插入禁区", check: { attrs: ["positioning", "iq"], difficulty: 34, tag: "站位+球商" },
            success: { text: "你{elementAdj}地看穿了防线的移动，反越位插入禁区。苏雯的直塞如期而至，你迎球推射破门。", effects: { reputation: 11, goals: 1, attrs: { positioning: 1 } } },
            fail: { text: "你启动早了半拍。边裁举旗，越位。你懊恼地捶了下大腿。", effects: { stamina: -3 } },
            critical: { text: "【灵光一闪】你{elementAdj}地反越位成功，单刀赴会。面对门将，你冷静推射死角。整座球场为你沸腾。", effects: { reputation: 18, goals: 1, attrs: { positioning: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "全速冲刺，反越位单刀", check: { attrs: ["speed", "burst"], difficulty: 35, tag: "速度+爆发" },
            success: { text: "你{elementAdj}地全速冲刺，反越位成功。单刀。面对门将，你冷静推射远角。", effects: { reputation: 11, goals: 1, attrs: { speed: 1 } } },
            fail: { text: "你趟球大了。门将出击把球没收，你刹不住脚撞在门将身上。肋骨生疼。", effects: { stamina: -5 } }
          },
          { id: "C", sit: "attack", text: "一脚直塞，找套边的内牛尔", check: { attrs: ["passing", "vision"], difficulty: 34, tag: "传球+视野" },
            success: { text: "你{elementAdj}地斜塞一脚。球精准找到套边的内牛尔，他下底传中，范志贵抢点破门。", effects: { reputation: 10, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "直塞线路被后卫挡了一下。内牛尔没追上，球出了底线。你脚腕发酸。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "背身护住球，等队友插上再分", check: { attrs: ["strength", "balance"], difficulty: 26, tag: "对抗+平衡" },
            success: { text: "你沉肩把后卫挡在身后，护住球。等队友插上，再从容分球。进攻的节奏被你稳住了。", effects: { reputation: 6, attrs: { strength: 1 } } },
            fail: { text: "你被后卫从背后一挤，护球失败。球被断走，你踉跄两步。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "attack", text: "接球后直接远射", check: { attrs: ["shooting", "power"], difficulty: 36, tag: "射门+力量" },
            success: { text: "你{elementAdj}地接球后拔脚怒射。球带着弧线钻入死角。门将鞭长莫及。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "远射打飞了。球擦着横梁飞出，你脚背一阵发麻。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "定位球进攻。布澜禁区里人挤人，你被安排在后点争顶。鞋钉在草皮上抠出深痕，汗水糊住了眼睛。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "后点起跳，甩头攻门", check: { attrs: ["heading", "positioning"], difficulty: 36, tag: "头球+站位" },
            success: { text: "你{elementAdj}地抢在后点起跳。额头狠狠砸中皮球，球砸地弹入网窝。门将扑错了方向。", effects: { reputation: 12, goals: 1, attrs: { heading: 1 } } },
            fail: { text: "你起跳早了半拍。头球蹭偏，球擦着门柱飞出底线。后脑勺还在嗡嗡作响。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地高高跃起，力压后卫甩头。球像炮弹一样砸入死角。网绳剧烈地颤抖。", effects: { reputation: 19, goals: 1, attrs: { heading: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "balanced", text: "头球摆渡，把球做给插上的队友", check: { attrs: ["passing", "vision"], difficulty: 27, tag: "传球+视野" },
            success: { text: "你提前半步卡住身位，头球一摆，把球做给插上的苏雯。她迎球推射。配合打出来了。", effects: { reputation: 8, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "摆渡力量小了。球没蹭到苏雯脚下，被后卫捅走。你后颈还在发凉。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "balanced", text: "用身体扛住后卫，给队友腾出落点", check: { attrs: ["strength", "hardness"], difficulty: 26, tag: "对抗+硬度" },
            success: { text: "你像一堵墙一样卡住对方中卫。肩膀硬扛硬，肋骨生疼。范志贵在你身后抢到落点，头球破门。", effects: { reputation: 7, assists: 1, attrs: { strength: 1 } } },
            fail: { text: "你被后卫反挤开。落点丢了，球被顶出禁区。你后背撞得人发疼。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "attack", text: "前点虚晃跑位，突然变向甩开盯人", check: { attrs: ["agility", "speed"], difficulty: 33, tag: "柔韧+速度" },
            success: { text: "你{elementAdj}地一个虚晃，突然变向甩开盯人。后卫被你带乱，范志贵后点轻松头球破门。", effects: { reputation: 9, assists: 1, attrs: { agility: 1 } } },
            fail: { text: "你虚晃没骗过后卫。他寸步不离，你只能干瞪眼，胸口发闷。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "attack", text: "禁区内迎球凌空抽射", check: { attrs: ["shooting", "power"], difficulty: 37, tag: "射门+力量" },
            success: { text: "你{elementAdj}地在禁区内迎球怒射。球穿过人缝钻入死角。门将鞭长莫及。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "凌空没吃准部位。球飞上看台，你脚背一阵发麻。", effects: { stamina: -4 } }
          }
        ]
      },
{
        text: "禁区前沿一片混战。布澜后卫把球顶出，皮球高高弹起，落在禁区弧顶。你作为拖后中锋，退到禁区前沿负责第二落点。鞋钉在草皮上抠出深痕。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "预判落点，提前卡住第二落点",
            check: { attrs: ["positioning", "iq"], difficulty: 26, tag: "站位+球商" },
            success: {
              text: "你{elementAdj}地预判了落点。提前卡住位置，球正落在你脚下。布澜的二次进攻被掐死。",
              effects: {
                reputation: 6,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "落点判断偏了半步。对方抢到第二落点，迎球怒射。你抹了把汗。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "快速回追，赶在对方身前破坏二次进攻",
            check: { attrs: ["speed", "stamina"], difficulty: 27, tag: "速度+耐力" },
            success: {
              text: "你{elementAdj}地转身回追。肺在烧，但你抢在对方身前，一记干净的铲断把二次进攻破坏。",
              effects: {
                reputation: 6,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "回追那一步没赶上。对方抢到第二落点，迎球怒射。大腿酸得发抖。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "凶狠铲抢，把第二落点连人带球拿下",
            check: { attrs: ["tackle", "hardness"], difficulty: 28, tag: "铲断+硬度" },
            success: {
              text: "你{elementAdj}地一记凶狠铲抢。连人带球把第二落点拿下，球权夺回。看台一片惊呼。",
              effects: {
                reputation: 7,
                attrs: { tackle: 1 }
              }
            },
            fail: {
              text: "铲抢那一下扑空。对方顺势推进，你摔在草皮上，膝盖发凉。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "护住第二落点，一脚出球发动反击",
            check: { attrs: ["passing", "vision"], difficulty: 28, tag: "传球+视野" },
            success: {
              text: "你{elementAdj}地护住落点。一脚长传找到前场的内牛尔，反击打成。稳健，从你脚下开始。",
              effects: {
                reputation: 8,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "出球线路被预判。对方伸脚一捅，球丢了。你抹了把汗。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "attack",
            text: "抢到落点，迎球凌空抽射",
            check: { attrs: ["shooting", "burst"], difficulty: 34, tag: "射门+爆发" },
            success: {
              text: "你{elementAdj}地抢到落点。不等球落地，抡脚怒射。球划破空气钻入网窝。门将连反应都没有。",
              effects: {
                reputation: 11,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "凌空吃球部位偏了。球飞上看台，脚背一阵刺痛。你甩了甩发麻的脚。",
              effects: { stamina: -5 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地凌空爆射。球像炮弹轰入死角，门将扑到一半就放弃了。全场哗然。",
              effects: {
                reputation: 19,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          }
        ]
      },
{
        text: "布澜一记直塞，打穿了边后卫的身后。你的搭档扑出去了，身后空了一大片。你作为拖后中锋，得补上去。草皮上的鞋钉印还冒着热气。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "提前站位，卡住对方前锋的突破线路",
            check: { attrs: ["positioning", "iq"], difficulty: 27, tag: "站位+球商" },
            success: {
              text: "你{elementAdj}地提前站位。卡住突破线路，把前锋逼向边线。射门角度被压窄，球偏出立柱。",
              effects: {
                reputation: 7,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "你站位偏了半步。前锋一个变向把你晃过，单刀推射。脚踝发酸。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "高速回追，从身后追上持球人",
            check: { attrs: ["speed", "stamina"], difficulty: 29, tag: "速度+耐力" },
            success: {
              text: "你{elementAdj}地转身回追。肺在烧，但你追上了。一记干净的铲断，球权夺回。",
              effects: {
                reputation: 7,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "回追那一步没赶上。对方顺势推射，球进了。大腿酸得发抖。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "干净铲断，把球从对方脚下破坏",
            check: { attrs: ["tackle", "intercept"], difficulty: 29, tag: "铲断+拦截" },
            success: {
              text: "你{elementAdj}地一记干净铲断。球从对方脚下滚出，单刀被你破坏了。",
              effects: {
                reputation: 7,
                attrs: { tackle: 1 }
              }
            },
            fail: {
              text: "铲球那一下扑空。对方顺势推射，球进了。你摔在草皮上，膝盖发凉。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "护住球，一脚出球发动反击",
            check: { attrs: ["passing", "vision"], difficulty: 28, tag: "传球+视野" },
            success: {
              text: "你{elementAdj}地护住球。一脚长传找到前场的内牛尔，反击打成。稳健，从你脚下开始。",
              effects: {
                reputation: 8,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "出球线路被预判。对方伸脚一捅，球丢了。你抹了把汗。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "attack",
            text: "抢到落点，迎球凌空抽射",
            check: { attrs: ["shooting", "burst"], difficulty: 34, tag: "射门+爆发" },
            success: {
              text: "你{elementAdj}地抢到落点。不等球落地，抡脚怒射。球划破空气钻入网窝。门将连反应都没有。",
              effects: {
                reputation: 11,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "凌空吃球部位偏了。球飞上看台，脚背一阵刺痛。你甩了甩发麻的脚。",
              effects: { stamina: -5 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地凌空爆射。球像炮弹轰入死角，门将扑到一半就放弃了。全场哗然。",
              effects: {
                reputation: 19,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          }
        ]
      },
{
        text: "后场。门将把球短传给你，布澜两名前锋立刻扑上来逼抢。草腥味呛进喉咙，出球线路被掐得死死的。你作为拖后中锋，得把这球护住。看台在嘘。",
        sit: "balanced",
        choices: [
          {
            id: "A",
            sit: "balanced",
            text: "扛住逼抢，硬把球护住等接应",
            check: { attrs: ["strength", "hardness"], difficulty: 27, tag: "对抗+硬度" },
            success: {
              text: "你{elementAdj}地用后背顶住前锋。肩膀扛着肩膀，肋骨发疼，球权护住了。队友终于跑出了接应点。",
              effects: {
                reputation: 6,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "你被两人夹击挤倒。球被断下，布澜就地打反击。后脑勺磕在草皮上，一阵发凉。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "B",
            sit: "balanced",
            text: "一脚出球，找到中场的接应点",
            check: { attrs: ["passing", "vision"], difficulty: 28, tag: "传球+视野" },
            success: {
              text: "你{elementAdj}地一脚直传。球穿过逼抢的缝隙，找到中场队友。压迫瞬间被化解。",
              effects: {
                reputation: 7,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "出球线路被预判。前锋伸脚把球拦下，布澜就地围攻。你抹了把汗。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "C",
            sit: "attack",
            text: "带球强行突围，趟过逼抢线",
            check: { attrs: ["dribble", "agility"], difficulty: 32, tag: "盘带+柔韧" },
            success: {
              text: "你{elementAdj}地一个变向。球从两名前锋之间趟过，你抹过他们扬长而去。反击，从你脚下发起。",
              effects: {
                reputation: 9,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "突围那一下趟大了。前锋伸脚一捅，球出了边线。你的脚踝还在发酸。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "D",
            sit: "defense",
            text: "头球摆渡，把长传点给前插队友",
            check: { attrs: ["heading", "balance"], difficulty: 27, tag: "头球+平衡" },
            success: {
              text: "你{elementAdj}地高高跃起。额头一蹭，球摆渡到空当，队友迎球推进。进攻方向打开了。",
              effects: {
                reputation: 7,
                attrs: { heading: 1 }
              }
            },
            fail: {
              text: "摆渡方向偏了。球顶到对方脚下，布澜顺势打反击。后颈还在发凉。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "attack",
            text: "突围后迎球抽射，赌一个死角",
            check: { attrs: ["shooting", "burst"], difficulty: 34, tag: "射门+爆发" },
            success: {
              text: "你{elementAdj}地趟过逼抢线。迎球抽射，球贴着门柱钻入网窝。门将的指尖差了两厘米。",
              effects: {
                reputation: 11,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "突围那一下趟大了。射门偏出立柱，门将轻松把球抱住。脚背发麻。",
              effects: { stamina: -5 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地趟过两人，迎球爆射死角。门将扑了个空。全场起立。",
              effects: {
                reputation: 19,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          }
        ]
      },
{
        text: "布澜前锋在越位线附近游走，伺机反越位。你作为拖后中锋，站在防线最后，指挥着队友落位。草腥味混着汗味，看台的吼声压过来。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "高声指挥防线，硬生生压上造越位",
            check: { attrs: ["hardness", "iq"], difficulty: 26, tag: "硬度+球商" },
            success: {
              text: "你{elementAdj}地一声高喊。防线集体压上，前锋反越位失败。边裁的旗子举起，越位。",
              effects: {
                reputation: 7,
                attrs: { hardness: 1 }
              }
            },
            fail: {
              text: "防线没压齐。前锋反越位成功，单刀推射。你抹了把汗。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "提前站位，卡住前锋的突破线路",
            check: { attrs: ["positioning", "iq"], difficulty: 27, tag: "站位+球商" },
            success: {
              text: "你{elementAdj}地提前站位。卡住突破线路，把前锋逼向边线。射门角度被压窄，球偏出立柱。",
              effects: {
                reputation: 7,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "你站位偏了半步。前锋一个变向把你晃过，单刀推射。脚踝发酸。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "高速回追，从身后追上持球人",
            check: { attrs: ["speed", "stamina"], difficulty: 28, tag: "速度+耐力" },
            success: {
              text: "你{elementAdj}地转身回追。肺在烧，但你追上了。一记干净的铲断，球权夺回。",
              effects: {
                reputation: 7,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "回追那一步没赶上。对方顺势推射，球进了。大腿酸得发抖。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "护住球，一脚长传发动反击",
            check: { attrs: ["passing", "vision"], difficulty: 28, tag: "传球+视野" },
            success: {
              text: "你{elementAdj}地护住球。一脚长传找到前场的内牛尔，反击打成。稳健，从你脚下开始。",
              effects: {
                reputation: 8,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "出球线路被预判。对方伸脚一捅，球丢了。你抹了把汗。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "attack",
            text: "抢到落点，迎球凌空抽射",
            check: { attrs: ["shooting", "burst"], difficulty: 34, tag: "射门+爆发" },
            success: {
              text: "你{elementAdj}地抢到落点。不等球落地，抡脚怒射。球划破空气钻入网窝。门将连反应都没有。",
              effects: {
                reputation: 11,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "凌空吃球部位偏了。球飞上看台，脚背一阵刺痛。你甩了甩发麻的脚。",
              effects: { stamina: -5 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地凌空爆射。球像炮弹轰入死角，门将扑到一半就放弃了。全场哗然。",
              effects: {
                reputation: 19,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          }
        ]
      },
{
        text: "读秒阶段，你方领先一球。布澜全线压上，狂攻。你站在防线最后，指挥着队友落位。草腥味混着汗味，看台的吼声像潮水。守住这球，三分到手。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "提前站位，卡住对方前锋的抢点线路",
            check: { attrs: ["positioning", "iq"], difficulty: 26, tag: "站位+球商" },
            success: {
              text: "你{elementAdj}地提前站位。卡住抢点线路，把前锋逼向边线。传中被你预判，球权夺回。三分，到手了。",
              effects: {
                reputation: 7,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "你站位偏了半步。前锋抢到落点，迎球推射。脚踝发酸。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "快速回追，赶在对方身前破坏传中",
            check: { attrs: ["speed", "stamina"], difficulty: 27, tag: "速度+耐力" },
            success: {
              text: "你{elementAdj}地转身回追。肺在烧，但你抢在对方身前，一记干净的铲断把传中破坏出底线。",
              effects: {
                reputation: 7,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "回追那一步没赶上。对方抢到落点，迎球推射。大腿酸得发抖。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "护住球，一脚出球转移压力",
            check: { attrs: ["passing", "vision"], difficulty: 27, tag: "传球+视野" },
            success: {
              text: "你{elementAdj}地护住球。一脚长传找到前场的内牛尔，把战火引向对方半场。压力，瞬间转移。",
              effects: {
                reputation: 7,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "出球线路被预判。对方伸脚一捅，球丢了。你抹了把汗。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "defense",
            text: "凶狠铲抢，把传中破坏出底线",
            check: { attrs: ["tackle", "hardness"], difficulty: 28, tag: "铲断+硬度" },
            success: {
              text: "你{elementAdj}地一记凶狠铲抢。连人带球把传中破坏出底线。看台一片惊呼。",
              effects: {
                reputation: 7,
                attrs: { tackle: 1 }
              }
            },
            fail: {
              text: "铲抢那一下扑空。对方顺势推射，球进了。你摔在草皮上，膝盖发凉。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "E",
            sit: "attack",
            text: "抢到第二落点，迎球凌空抽射",
            check: { attrs: ["shooting", "burst"], difficulty: 34, tag: "射门+爆发" },
            success: {
              text: "你{elementAdj}地抢到落点。不等球落地，抡脚怒射。球划破空气钻入网窝。门将连反应都没有。",
              effects: {
                reputation: 11,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "凌空吃球部位偏了。球飞上看台，脚背一阵刺痛。你甩了甩发麻的脚。",
              effects: { stamina: -5 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地凌空爆射。球像炮弹轰入死角，门将扑到一半就放弃了。全场哗然。",
              effects: {
                reputation: 19,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          }
        ]
      }
    ]
  },
LW_impact: {
    desc: "内切、抽射、前插",
    events: [
      {
        text: "左边路，你拿球面对边后卫。内线空了半步，草腥味钻进鼻子。看台的声浪压下来，你脚尖一拨，准备内切。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "内切一步，抡脚抽射远角", check: { attrs: ["shooting", "burst"], difficulty: 37, tag: "射门+爆发" },
            success: { text: "你{elementAdj}地内切抽射。球贴着草皮窜向远角，门将扑救慢了半拍。网绳一颤。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "内切没晃开角度。射门被后卫伸脚一挡，闷响。你的脚背还在发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】内切，抽射。球带着{elementAdj}的弧线砸入死角。布澜门将愣在原地，场边教练把战术板摔了。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "连续拨球，晃开后卫内切", check: { attrs: ["dribble", "agility"], difficulty: 35, tag: "盘带+柔韧" },
            success: { text: "你肩膀一沉，连续拨球。后卫重心丢了，你抹进禁区推射。球进了。", effects: { reputation: 11, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "拨球趟大了。后卫一捅，球弹出去老远。你踩在球上滑了一下。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你连晃两人，{elementAdj}地抹进禁区。单刀，推射。安静了一秒，然后所有人都站起来了。", effects: { reputation: 18, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "内切吸引防守，分给套边队友", check: { attrs: ["passing", "vision"], difficulty: 27, tag: "传球+视野" },
            success: { text: "你内切带走两人，脚腕一抖分给套边的范志贵。他下底传中，配合打活了。", effects: { reputation: 8, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "分球力量大了。范志贵没追上，球出了底线。你肩膀还酸着。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "急停卡住身位，护球等队友插上", check: { attrs: ["balance", "strength"], difficulty: 26, tag: "平衡+对抗" },
            success: { text: "你急停卡住身位，肩膀顶着后卫。肋骨发疼，但球护住了。队友插上，你分球。", effects: { reputation: 6, attrs: { balance: 1 } } },
            fail: { text: "急停没站稳。后卫顺势一挤，你踉跄出边线。脚踝发酸。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "丢球就地反抢，掐断反击", check: { attrs: ["tackle", "intercept"], difficulty: 24, tag: "铲断+拦截" },
            success: { text: "丢球的瞬间你就地反抢。一记干净的铲断，球权夺回。肺在灼烧，但值得。", effects: { reputation: 5, attrs: { tackle: 1 } } },
            fail: { text: "反抢扑空。对方顺势推进，你只能看着背影，大腿发酸。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "中场断球，对方防线压得很高。你瞥见身后那片空当，心跳骤然加快。范志贵在身后扯着嗓子喊：跑！",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "反越位高速前插，单刀赴会", check: { attrs: ["speed", "burst"], difficulty: 36, tag: "速度+爆发" },
            success: { text: "你{elementAdj}地启动，反越位成功。单刀，推射远角。球进了，边裁的旗子没举。", effects: { reputation: 12, goals: 1, attrs: { speed: 1 } } },
            fail: { text: "启动慢了半拍。越位旗举起，单刀成了空欢喜。你喘着粗气。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】你{elementAdj}地反越位前插，甩开整条防线。单刀推射，门将连反应都没有。看台炸了。", effects: { reputation: 19, goals: 1, attrs: { speed: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "插上后迎球直接抽射", check: { attrs: ["shooting", "power"], difficulty: 38, tag: "射门+力量" },
            success: { text: "传球到位，你迎球就是一脚抽射。球应声入网，门将指尖差了半寸。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "迎球没吃正部位。射门高高飞出横梁，脚背一阵发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地迎球怒射。球像炮弹一样砸进网窝，网绳剧烈一颤。所有人都抱住了头。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "看穿造越位陷阱，假跑后再分球", check: { attrs: ["iq", "vision"], difficulty: 29, tag: "球商+视野" },
            success: { text: "你识破了越位陷阱，一个假跑带走后卫，回做给插上的队友。机会出来了。", effects: { reputation: 8, assists: 1, attrs: { iq: 1 } } },
            fail: { text: "假跑没骗过后卫。传球线路被封死，球被断下。你皱着眉。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "卡住越位线，等传球到位再启动", check: { attrs: ["positioning", "balance"], difficulty: 27, tag: "站位+平衡" },
            success: { text: "你踩着越位线，等传球到位才启动。时机拿捏得刚好，单刀形成。", effects: { reputation: 7, attrs: { positioning: 1 } } },
            fail: { text: "启动早了一瞬。越位旗举起，你白跑一趟。膝盖发酸。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "前插未果，回身拦截对方转移", check: { attrs: ["intercept", "tackle"], difficulty: 25, tag: "拦截+铲断" },
            success: { text: "前插没拿到球，你立刻回身。一记拦截断下对方转移球，反击被掐灭。", effects: { reputation: 5, attrs: { intercept: 1 } } },
            fail: { text: "回身慢了。对方转移成功，你只能回追，肺部灼烧。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "边路三十米，你带球内收。后卫退得太深，给了你起脚的空间。你抬头看了一眼球门，脚背已经绷紧。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "抡圆了，暴力抽射", check: { attrs: ["power", "shooting"], difficulty: 39, tag: "力量+射门" },
            success: { text: "你{elementAdj}地抡圆脚背。球带着风声砸向球门，门将脱手，球弹进网窝。", effects: { reputation: 13, goals: 1, attrs: { power: 1 } } },
            fail: { text: "发力过猛。球高出横梁一大截，腰腹一阵酸胀。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】你{elementAdj}地暴力抽射。球像出膛的炮弹，门将扑到也只能目送。网绳被砸得剧烈晃动。", effects: { reputation: 21, goals: 1, attrs: { power: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "拨球变向，抹进禁区再射", check: { attrs: ["dribble", "agility"], difficulty: 34, tag: "盘带+柔韧" },
            success: { text: "你拨球变向，晃过后卫抹进禁区。低射，球钻入近角。", effects: { reputation: 11, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "变向被识破。后卫伸脚一捅，球丢了。你大腿发酸。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地连过两人，抹进禁区推射。安静了一秒，全场起立。", effects: { reputation: 18, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "横敲给中路插上的队友", check: { attrs: ["passing", "vision"], difficulty: 26, tag: "传球+视野" },
            success: { text: "你横敲一脚，球找到中路插上的队友。他迎球推射，配合成了。", effects: { reputation: 8, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "横敲被预判。后卫提前卡断，球权易手。你脚腕发酸。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "顶住后卫贴身，护住球等机会", check: { attrs: ["pressure", "balance"], difficulty: 28, tag: "抗压+平衡" },
            success: { text: "后卫贴身紧逼，你顶住压力护住球。等他失了重心，你才分球。", effects: { reputation: 6, attrs: { pressure: 1 } } },
            fail: { text: "抗压没扛住。后卫一挤，你失了重心，球被捅走。肋骨发疼。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "丢球后贴身绞杀，硬扛断球", check: { attrs: ["hardness", "strength"], difficulty: 27, tag: "硬度+对抗" },
            success: { text: "丢球你不退，贴身绞杀。一记硬扛把球夺回，肩膀撞得生疼。", effects: { reputation: 5, attrs: { hardness: 1 } } },
            fail: { text: "绞杀扑空。对方顺势推进，你被撞开半步。后背发酸。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "边线附近，你和边后卫一对一。他压低重心，鞋钉碾着草皮。你听见自己的呼吸，看台的声音远了。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "趟球强行超车下底", check: { attrs: ["speed", "dribble"], difficulty: 35, tag: "速度+盘带" },
            success: { text: "你{elementAdj}地趟球超车，一步甩开后卫下底。传中，中路包抄到位。", effects: { reputation: 11, assists: 1, attrs: { speed: 1 } } },
            fail: { text: "超车趟大了。球出了底线，你刹不住撞在广告牌上。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地强行超车，整条边路被你撕开。下底倒三角，队友推射空门。全场沸腾。", effects: { reputation: 18, goals: 1, attrs: { speed: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "内切闪出角度，起脚抽射", check: { attrs: ["shooting", "burst"], difficulty: 37, tag: "射门+爆发" },
            success: { text: "你内切闪出角度，起脚抽射。球贴柱而入，门将鞭长莫及。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "内切没晃开空间。射门被后卫封堵，闷响。脚背发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地内切抽射。球划出弧线钻入死角，布澜门将一动不动。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "用节奏变化骗过对手再分球", check: { attrs: ["rhythm", "iq"], difficulty: 28, tag: "节奏+球商" },
            success: { text: "你一快一慢，节奏骗过后卫。趁机分球给插上的队友，机会出来了。", effects: { reputation: 7, assists: 1, attrs: { rhythm: 1 } } },
            fail: { text: "节奏没骗到人。后卫不吃晃，球被卡断。你皱着眉。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "抗住对抗，稳住重心护球", check: { attrs: ["balance", "strength"], difficulty: 25, tag: "平衡+对抗" },
            success: { text: "后卫上抢，你稳住重心扛住对抗。护住球，等队友跑位再分。", effects: { reputation: 6, attrs: { balance: 1 } } },
            fail: { text: "对抗没站稳。你一踉跄，球被捅走。脚踝发酸。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "被断瞬间反铲，夺回球权", check: { attrs: ["tackle", "intercept"], difficulty: 24, tag: "铲断+拦截" },
            success: { text: "被断的瞬间你反铲。一记干净铲断，球权夺回。草屑溅起。", effects: { reputation: 5, attrs: { tackle: 1 } } },
            fail: { text: "反铲扑空。对方顺势推进，你滑倒在草皮上。膝盖发疼。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "断球反击，对方半场一片开阔。你沿边线狂奔，肺在烧，风灌进耳朵。底线在前方一点点拉近。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "长途奔袭，内切抽射", check: { attrs: ["stamina", "speed"], difficulty: 35, tag: "耐力+速度" },
            success: { text: "你{elementAdj}地一路狂奔，甩开回追。内切，抽射，球进了。肺部灼烧，但你笑了。", effects: { reputation: 12, goals: 1, attrs: { stamina: 1 } } },
            fail: { text: "奔袭到最后没了力。射门软绵无力，门将轻松没收。大腿灌了铅。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】你{elementAdj}地长途奔袭，整条边路只剩你的脚步声。内切怒射，球砸入网窝。全场都站起来了。", effects: { reputation: 19, goals: 1, attrs: { stamina: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "接应分球，禁区角上直接抽射", check: { attrs: ["shooting", "burst"], difficulty: 37, tag: "射门+爆发" },
            success: { text: "分球到位，你在禁区角上直接抽射。球钻入远角，门将扑救不及。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "抽射没吃正。球偏出立柱，脚背发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地迎球怒射。球带着弧线砸入死角，网绳剧烈一颤。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "下底倒三角，回做给插上队友", check: { attrs: ["passing", "vision"], difficulty: 27, tag: "传球+视野" },
            success: { text: "你下底后倒三角回做。插上的队友迎球推射，配合打成了。", effects: { reputation: 8, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "倒三角传大了。队友没接住，球被后卫捅走。你脚腕发酸。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "抢前点包抄，卡住接应位置", check: { attrs: ["positioning", "balance"], difficulty: 26, tag: "站位+平衡" },
            success: { text: "你抢前点包抄，卡住位置。传球到位，你顺势做给中路。", effects: { reputation: 6, attrs: { positioning: 1 } } },
            fail: { text: "包抄慢了一步。传球被后卫先一步解围。你喘着气。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "奔袭被阻，就地反抢", check: { attrs: ["tackle", "intercept"], difficulty: 24, tag: "铲断+拦截" },
            success: { text: "奔袭被阻，你就地反抢。一记铲断夺回球权，肺在烧。", effects: { reputation: 5, attrs: { tackle: 1 } } },
            fail: { text: "反抢扑空。对方反击打回来，你只能回追。大腿发酸。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "补时最后一分钟，比分还平着。边路传中飞来，禁区里人挤人。汗水糊住眼睛，全场都站了起来。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "抢点凌空抽射", check: { attrs: ["shooting", "burst"], difficulty: 39, tag: "射门+爆发" },
            success: { text: "你{elementAdj}地抢点凌空。球应声入网，门将毫无反应。绝杀。", effects: { reputation: 13, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "凌空没踢正。球飞出横梁，你抱头跪地。脚背发麻。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】你{elementAdj}地凌空抽射。球砸入死角，时间仿佛停了一秒。然后整座球场炸开。", effects: { reputation: 22, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "后点高高跃起，头球砸地", check: { attrs: ["heading", "balance"], difficulty: 36, tag: "头球+平衡" },
            success: { text: "你后点起跳，力压后卫甩头。球砸地弹入网窝，门将扑救不及。", effects: { reputation: 12, goals: 1, attrs: { heading: 1 } } },
            fail: { text: "起跳被卡住。头球顶偏，球擦柱而出。脖子发酸。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地高高跃起，一记头槌砸向地面。球弹入网窝，全场沸腾。", effects: { reputation: 19, goals: 1, attrs: { heading: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "attack", text: "抢前点甩开后卫，捅射", check: { attrs: ["agility", "dribble"], difficulty: 34, tag: "柔韧+盘带" },
            success: { text: "你抢前点，柔韧地甩开后卫。一脚捅射，球钻入近角。", effects: { reputation: 11, goals: 1, attrs: { agility: 1 } } },
            fail: { text: "抢点慢了半拍。后卫先一步解围，你扑了个空。腰腹发酸。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地抢前点，灵巧一抹。球改变方向钻入网窝，门将愣在原地。", effects: { reputation: 18, goals: 1, attrs: { agility: 2 }, flags: { keySuccess: true } } }
          },
          { id: "D", sit: "balanced", text: "抢点后回做，给位置更好的队友", check: { attrs: ["passing", "iq"], difficulty: 28, tag: "传球+球商" },
            success: { text: "你抢点回做，球给到位置更好的队友。他推射空门，绝杀。", effects: { reputation: 9, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "回做力量小了。队友没接住，球被后卫捅走。你肩膀发酸。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "进攻未果，回追铲断对方反击", check: { attrs: ["tackle", "intercept"], difficulty: 25, tag: "铲断+拦截" },
            success: { text: "进攻未果，对方反击。你回追一记铲断，把危险掐灭。肺在灼烧。", effects: { reputation: 5, attrs: { tackle: 1 } } },
            fail: { text: "回追慢了。对方反击打穿，你只能目送。大腿灌铅。", effects: { stamina: -5 } }
          }
        ]
      },
      {
        text: "对方边锋在你这侧突破，后卫线被打穿。你回追，鞋钉刮着草皮，肺部灼烧。底线越来越近。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "飞身铲断，掐断突破", check: { attrs: ["tackle", "intercept"], difficulty: 27, tag: "铲断+拦截" },
            success: { text: "你看准时机飞身铲断。球被你捅出边线，化解单刀。草屑溅了一脸。", effects: { reputation: 6, attrs: { tackle: 1 } } },
            fail: { text: "铲断扑空。对方抹过你下底传中，你滑倒在草皮上。膝盖发疼。", effects: { stamina: -5 } }
          },
          { id: "B", sit: "defense", text: "高速回追，卡住身位", check: { attrs: ["speed", "stamina"], difficulty: 29, tag: "速度+耐力" },
            success: { text: "你{elementAdj}地高速回追，硬是卡住身位。把对方挤出边线，球权夺回。", effects: { reputation: 6, attrs: { speed: 1 } } },
            fail: { text: "回追差了一步。对方抢先卡住身位，你只能犯规。大腿发酸。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "defense", text: "卡住内线，封堵突破路线", check: { attrs: ["positioning", "balance"], difficulty: 26, tag: "站位+平衡" },
            success: { text: "你卡住内线，封死突破路线。对方被迫回传，威胁化解。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "站位偏了半步。对方从内线抹过，你扑了个空。脚踝发酸。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "阅读对手意图，提前卡断传球", check: { attrs: ["iq", "vision"], difficulty: 28, tag: "球商+视野" },
            success: { text: "你读懂了对方的传球意图，提前卡断。反击被你掐灭在萌芽。", effects: { reputation: 6, attrs: { iq: 1 } } },
            fail: { text: "判断错了。对方变向突破，你扑空。皱着眉回追。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "咬牙回追，决断下脚解围", check: { attrs: ["resolve", "hardness"], difficulty: 30, tag: "决断+硬度" },
            success: { text: "你咬牙回追，关键时刻决断下脚。一脚把球捅出底线，化解危机。", effects: { reputation: 6, attrs: { resolve: 1 } } },
            fail: { text: "下脚犹豫了。对方抹过你，威胁还在。你懊恼地捶了下草皮。", effects: { stamina: -4 } }
          }
        ]
      },
{
        text: "角球被顶出来。第二落点弹到禁区前沿。你正好在那里。球还在弹跳，草腥味混着汗味。对方后卫还没转身。",
        sit: "attack",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "不等球落地，凌空抽射",
            check: { attrs: ["shooting", "burst"], difficulty: 39, tag: "射门+爆发" },
            success: {
              text: "你脚背绷紧，迎球就抽。砰。闷响。球像炮弹一样砸向球门。门将扑了一下，没够到。网绳在晃。",
              effects: {
                reputation: 13,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "球弹得太高。你抽了个空，脚背刮在草皮上。膝盖磕在地上，疼。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地凌空抽射。球带着弧线砸入死角。门将纹丝不动。看台安静了一秒，然后炸了。",
              effects: {
                reputation: 22,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "停球转身，突入禁区再射",
            check: { attrs: ["dribble", "agility"], difficulty: 36, tag: "盘带+柔韧" },
            success: {
              text: "你胸口停球，转身。后卫扑过来，你拨球变向。禁区。起脚。球贴着门柱钻进去。",
              effects: {
                reputation: 11,
                goals: 1,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "停球弹远了。后卫伸脚一捅，球滚出去。你的脚踝还在发麻。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地停球转身，抹过两人。单刀。推射。网绳晃了一下。全场站起来。",
              effects: {
                reputation: 19,
                goals: 1,
                attrs: { dribble: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "分给位置更好的队友",
            check: { attrs: ["passing", "vision"], difficulty: 27, tag: "传球+视野" },
            success: {
              text: "你余光扫到右侧。队友空了。一脚横传，他迎球推射。配合打出来了。",
              effects: {
                reputation: 8,
                assists: 1,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "横传被后卫伸脚挡了。球弹出去老远。你肩膀还酸着。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "attack",
            text: "用身体扛开后卫，强行起脚",
            check: { attrs: ["strength", "power"], difficulty: 35, tag: "对抗+力量" },
            success: {
              text: "你肩膀一横，硬生生把后卫挤开半步。肋骨发疼。起脚。球砸向球门。进了。",
              effects: {
                reputation: 10,
                goals: 1,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "你顶不动他。后卫纹丝不动。你被挤出射门角度，脚背刮在草皮上。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "不冒险，回传重新组织",
            check: { attrs: ["positioning", "iq"], difficulty: 23, tag: "站位+球商" },
            success: {
              text: "你回传给后腰。不急。球权稳住了。对方防线还没落位，下一次机会会来。",
              effects: {
                reputation: 4,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "回传力量小了。对方前锋伸脚一捅，险些被断。你后背发凉。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "对方安排了一个人专门盯你。你走到哪他跟到哪。像影子。草腥味混着汗味，看台的嘘声压下来。你拿球，他贴上来。",
        sit: "balanced",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "突然反跑，甩开他接球射门",
            check: { attrs: ["burst", "shooting"], difficulty: 37, tag: "爆发+射门" },
            success: {
              text: "你先往回走两步。他跟。然后你弹射反跑。他愣了半步。够了。球到了。起脚。进了。",
              effects: {
                reputation: 12,
                goals: 1,
                attrs: { burst: 1 }
              }
            },
            fail: {
              text: "反跑那一下他没被骗到。他卡住了身位。你撞在他背上，胸口发闷。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地反跑甩开他。接球。转身。抽射。球砸入死角。盯你的人坐在草皮上，眼神空了。",
              effects: {
                reputation: 20,
                goals: 1,
                attrs: { burst: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "balanced",
            text: "回撤到中场拿球，把他带离防线",
            check: { attrs: ["speed", "stamina"], difficulty: 28, tag: "速度+耐力" },
            success: {
              text: "你回撤到中场。他跟不跟？他跟了。防线少了一个人。队友的空间出来了。",
              effects: {
                reputation: 7,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "你回撤了，但他没跟。你白跑了三十米。肺在烧，腿在酸。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "用跑位牵扯他，给队友创造空间",
            check: { attrs: ["iq", "vision"], difficulty: 26, tag: "球商+视野" },
            success: {
              text: "你往边线走。他跟。肋部空了。苏雯插入。你分球。配合打出来了。",
              effects: {
                reputation: 8,
                assists: 1,
                attrs: { iq: 1 }
              }
            },
            fail: {
              text: "你跑位了，但分球时机晚了。苏雯已经越位。裁判举旗。你喘着粗气。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "attack",
            text: "硬扛他，用身体挤开空间",
            check: { attrs: ["tackle", "strength"], difficulty: 33, tag: "铲断+对抗" },
            success: {
              text: "你肩膀一横，硬生生把他挤开。肋骨发疼，但空间出来了。你带球突入禁区。",
              effects: {
                reputation: 9,
                attrs: { tackle: 1 }
              }
            },
            fail: {
              text: "你顶不动他。他像一堵墙。你被挤出边线，膝盖磕在广告牌上。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "先回防，不给他反击的机会",
            check: { attrs: ["heading", "positioning"], difficulty: 24, tag: "头球+站位" },
            success: {
              text: "你放弃进攻，回防落位。他拿球想反击，你已经卡住了身位。球权夺回。",
              effects: {
                reputation: 5,
                attrs: { heading: 1 }
              }
            },
            fail: {
              text: "回防慢了半步。他从你身侧抹过去。你只能追，肺在烧。",
              effects: { stamina: -4 }
            }
          }
        ]
      },
{
        text: "苏雯的直塞像一把手术刀。球打穿了防线。你高速前插，门将出击了。他张开双臂，鞋钉刮着草皮。球在你和门将之间。",
        sit: "attack",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "抢在门将之前捅射",
            check: { attrs: ["power", "shooting"], difficulty: 38, tag: "力量+射门" },
            success: {
              text: "你脚尖一捅。球从门将手边滚过。他扑了个空。球滚进网窝。草腥味混着汗味。你滑跪。",
              effects: {
                reputation: 13,
                goals: 1,
                attrs: { power: 1 }
              }
            },
            fail: {
              text: "你慢了半步。门将先到了。他一把把球抱住。你的脚尖磕在草皮上，疼。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地抢在门将之前。挑射。球从他头顶划过，落入网窝。他回头看了一眼，没说话。",
              effects: {
                reputation: 21,
                goals: 1,
                attrs: { power: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "拨球晃过门将，推空门",
            check: { attrs: ["agility", "dribble"], difficulty: 37, tag: "柔韧+盘带" },
            success: {
              text: "你拨球变向。门将扑过来，扑空了。空门。你推射。球滚进网窝。简单。",
              effects: {
                reputation: 12,
                goals: 1,
                attrs: { agility: 1 }
              }
            },
            fail: {
              text: "拨球那一下被门将伸脚挡了。球弹出去。你的脚踝还在发麻。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地晃过门将。空门。你甚至有时间看一眼看台，然后推射。全场疯了。",
              effects: {
                reputation: 19,
                goals: 1,
                attrs: { agility: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "横传给跟进的队友",
            check: { attrs: ["vision", "passing"], difficulty: 30, tag: "视野+传球" },
            success: {
              text: "你余光扫到右侧。队友跟进。横传。他推空门。配合打出来了。",
              effects: {
                reputation: 9,
                assists: 1,
                attrs: { vision: 1 }
              }
            },
            fail: {
              text: "横传被回追的后卫伸脚挡了。球弹出去。你喘着粗气。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "attack",
            text: "卡住身位抢在门将前面",
            check: { attrs: ["positioning", "burst"], difficulty: 35, tag: "站位+爆发" },
            success: {
              text: "你卡住身位。门将犹豫了半步。够了。你抢到他前面，脚尖一捅。球进了。风还在耳边。",
              effects: {
                reputation: 11,
                goals: 1,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "门将比你快。他先到了，把球抱住。你的肩膀撞在他身上，胸口发闷。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "射门角度太小，回传重新组织",
            check: { attrs: ["intercept", "iq"], difficulty: 24, tag: "拦截+球商" },
            success: {
              text: "你冷静回传。不急。球权稳住了。下一次机会会来。教练在场边点头。",
              effects: {
                reputation: 4,
                attrs: { intercept: 1 }
              }
            },
            fail: {
              text: "回传力量小了。对方后卫伸脚一捅，险些被断。你后背发凉。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "队友被红牌罚下。少打一人。教练在场边喊：你回来！你回撤到边后卫的位置。草腥味混着汗味。对方边锋正盯着你。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "贴住他，不给他转身空间",
            check: { attrs: ["tackle", "strength"], difficulty: 30, tag: "铲断+对抗" },
            success: {
              text: "你贴上去。肩膀顶着肩膀。他转身，你卡住。他再转，你再卡。他过不了你。",
              effects: {
                reputation: 7,
                attrs: { tackle: 1 }
              }
            },
            fail: {
              text: "他一个变向，你重心丢了。他从你身侧抹过去。你只能追，大腿在发酸。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "卡住内线，逼他走外线",
            check: { attrs: ["positioning", "iq"], difficulty: 27, tag: "站位+球商" },
            success: {
              text: "你卡住内线。他只能走外线。外线没有威胁。传中被中卫顶出去。你松了口气。",
              effects: {
                reputation: 6,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "你卡位慢了半步。他从内线抹过去。传中。禁区里一片混乱。你的心脏在擂鼓。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "断球后沿边路反击",
            check: { attrs: ["speed", "stamina"], difficulty: 31, tag: "速度+耐力" },
            success: {
              text: "你断下球，沿边路狂奔。少打一人又怎样。风灌进耳朵，肺在烧。你杀到对方半场。",
              effects: {
                reputation: 8,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "你跑了二十米，腿软了。少打一人的消耗太大。球被回追的人捅走。你弯着腰喘气。",
              effects: { stamina: -6 }
            }
          },
          {
            id: "D",
            sit: "defense",
            text: "果断放铲，哪怕犯规也要停下",
            check: { attrs: ["resolve", "hardness"], difficulty: 32, tag: "决断+硬度" },
            success: {
              text: "你放铲。鞋钉刮过草皮。球和人一起倒了。裁判吹了哨。犯规。但球停了。值得。",
              effects: {
                reputation: 6,
                attrs: { resolve: 1 }
              }
            },
            fail: {
              text: "你铲空了。他从你头顶跳过去。你趴在草皮上，膝盖磕在地上。疼。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "E",
            sit: "balanced",
            text: "回传给门将，先稳住",
            check: { attrs: ["rhythm", "pressure"], difficulty: 23, tag: "节奏+抗压" },
            success: {
              text: "你回传给门将。不急。先稳住。少打一人不能乱。教练在场边喊，好。",
              effects: {
                reputation: 4,
                attrs: { rhythm: 1 }
              }
            },
            fail: {
              text: "回传力量小了。对方前锋伸脚一捅。险些被断。你后背发凉。",
              effects: { stamina: -4 }
            }
          }
        ]
      }
    ]
  },
  LW_pivot: {
    desc: "背身、争顶、做墙",
    events: [
      {
        text: "边路，你背对边线接到长传。后卫的胸口顶在你后背，草腥味混着汗味。看台的声浪压下来。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "balanced", text: "背身扛住后卫，护球等队友", check: { attrs: ["strength", "balance"], difficulty: 27, tag: "对抗+平衡" },
            success: { text: "你像钉子一样背身卡住后卫。肩膀顶着肩膀，肋骨发疼。队友跑出空当，你分球。", effects: { reputation: 7, attrs: { strength: 1 } } },
            fail: { text: "你被挤开了。后背撞在广告牌上，铁皮的凉意透过球衣。", effects: { stamina: -3 } }
          },
          { id: "B", sit: "balanced", text: "扎稳下盘，转身抹过对手", check: { attrs: ["balance", "agility"], difficulty: 29, tag: "平衡+柔韧" },
            success: { text: "你扎稳下盘，扛住对抗转身。一抹而过，球护住了。", effects: { reputation: 7, attrs: { balance: 1 } } },
            fail: { text: "转身没站稳。后卫顺势一捅，球丢了。脚踝发酸。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "balanced", text: "背身回做，给套边插上的队友", check: { attrs: ["passing", "vision"], difficulty: 26, tag: "传球+视野" },
            success: { text: "你背身回做一脚，球找到套边的范志贵。他下底，配合打活了。", effects: { reputation: 8, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "回做力量小了。范志贵没接住，球被后卫捅走。你肩膀发酸。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "attack", text: "转身闪出角度，直接抽射", check: { attrs: ["shooting", "power"], difficulty: 36, tag: "射门+力量" },
            success: { text: "你转身闪出角度，直接抽射。球贴柱而入，门将扑救不及。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "转身没晃开角度。射门被后卫封堵，闷响。脚背发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地转身抽射。球带着弧线砸入死角，布澜门将愣在原地。", effects: { reputation: 19, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "E", sit: "attack", text: "突然转身拨球，突破下底", check: { attrs: ["dribble", "speed"], difficulty: 34, tag: "盘带+速度" },
            success: { text: "你突然转身拨球，晃过后卫下底。传中找中路，机会出来了。", effects: { reputation: 9, assists: 1, attrs: { dribble: 1 } } },
            fail: { text: "转身拨球趟大。后卫一捅，球出了边线。你大腿发酸。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "后场长传吊向边路。你和高大后卫同时起跳，肩膀撞在一起，肘部发麻。球在最高点等着。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "高高跃起，头球摆渡攻门", check: { attrs: ["heading", "balance"], difficulty: 35, tag: "头球+平衡" },
            success: { text: "你{elementAdj}地高高跃起，力压后卫甩头。球砸向球门，门将脱手弹进网窝。", effects: { reputation: 12, goals: 1, attrs: { heading: 1 } } },
            fail: { text: "起跳被卡住。头球顶偏，球擦柱而出。脖子发酸。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地跃起，一记头槌砸向地面。球弹入网窝，全场起立。", effects: { reputation: 19, goals: 1, attrs: { heading: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "卡住身位，扛开对手争顶", check: { attrs: ["strength", "hardness"], difficulty: 32, tag: "对抗+硬度" },
            success: { text: "你卡住身位，硬扛开后卫起跳。头球点给插上的队友，机会出来了。", effects: { reputation: 8, assists: 1, attrs: { strength: 1 } } },
            fail: { text: "对抗没扛住。后卫把你挤出落点，球被顶走。肋骨发疼。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "attack", text: "顶下来后，迎球抽射", check: { attrs: ["shooting", "burst"], difficulty: 37, tag: "射门+爆发" },
            success: { text: "你把球顶下来，迎球就是一脚抽射。球钻入网窝，门将鞭长莫及。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "顶下来没接好。射门踢呲，球偏出立柱。脚背发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地头球一蹭，迎球怒射。球砸入死角，网绳剧烈一颤。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "D", sit: "balanced", text: "抢点甩头一蹭，顺势前插", check: { attrs: ["agility", "speed"], difficulty: 29, tag: "柔韧+速度" },
            success: { text: "你柔韧地甩头一蹭，球改变方向。顺势前插，单刀形成。", effects: { reputation: 8, attrs: { agility: 1 } } },
            fail: { text: "甩头没蹭正。球顶飞了，你扑了个空。腰腹发酸。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "balanced", text: "头球点给插上队友，做配合", check: { attrs: ["passing", "vision"], difficulty: 27, tag: "传球+视野" },
            success: { text: "你头球点给插上的队友。他迎球推进，配合打成了。", effects: { reputation: 8, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "头球点偏了。队友没接到，球被后卫断下。你脖子发酸。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "边路，你拿球面对防守。苏雯在肋部要球，你和她对了个眼神。风把草腥味送过来。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "balanced", text: "做墙一脚回做，反身前插", check: { attrs: ["passing", "iq"], difficulty: 27, tag: "传球+球商" },
            success: { text: "你做墙回做，反身前插。苏雯一脚直塞，球到人到。配合打出来了。", effects: { reputation: 8, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "回做力量大了。苏雯没接住，球被后卫捅走。你脚腕发酸。", effects: { stamina: -3 } }
          },
          { id: "B", sit: "balanced", text: "背身做墙，扛住后卫卡位", check: { attrs: ["strength", "balance"], difficulty: 26, tag: "对抗+平衡" },
            success: { text: "你背身做墙，扛住后卫卡位。肋骨发疼，但球护住了，配合成了。", effects: { reputation: 7, attrs: { strength: 1 } } },
            fail: { text: "做墙被挤开。后卫一捅，球丢了。你肩膀发酸。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "attack", text: "撞墙后高速前插下底", check: { attrs: ["speed", "stamina"], difficulty: 34, tag: "速度+耐力" },
            success: { text: "撞墙后你{elementAdj}地高速前插。甩开后卫下底，倒三角回做。", effects: { reputation: 9, assists: 1, attrs: { speed: 1 } } },
            fail: { text: "前插慢了半拍。传球被后卫先一步断下。大腿发酸。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】撞墙后你{elementAdj}地前插，整条边路只剩你的脚步声。下底倒三角，队友推射空门。", effects: { reputation: 18, goals: 1, attrs: { speed: 2 }, flags: { keySuccess: true } } }
          },
          { id: "D", sit: "balanced", text: "卡住接应位置，等二过一到位", check: { attrs: ["positioning", "balance"], difficulty: 25, tag: "站位+平衡" },
            success: { text: "你卡住接应位置，等二过一到位。传球舒服，配合打成了。", effects: { reputation: 6, attrs: { positioning: 1 } } },
            fail: { text: "接应位置偏了。传球不到位，配合断了。你皱着眉。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "attack", text: "撞墙闪出空当，直接起脚", check: { attrs: ["shooting", "burst"], difficulty: 36, tag: "射门+爆发" },
            success: { text: "撞墙闪出空当，你直接起脚抽射。球钻入近角，门将扑救不及。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "起脚被堵。射门被后卫封堵，闷响。脚背发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】撞墙后你{elementAdj}地起脚。球划出弧线钻入死角，布澜门将一动不动。", effects: { reputation: 19, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          }
        ]
      },
      {
        text: "你背身护住球，对方两人围抢。肋部队友正悄悄插上。汗水滴在草皮上，你听见自己的心跳。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "balanced", text: "不看人，背身直塞肋部", check: { attrs: ["vision", "passing"], difficulty: 29, tag: "视野+传球" },
            success: { text: "你不看人，背身一脚直塞肋部。插上的队友单刀，机会出来了。", effects: { reputation: 9, assists: 1, attrs: { vision: 1 } } },
            fail: { text: "直塞被预判。后卫提前卡断，球权易手。你脚腕发酸。", effects: { stamina: -3 } }
          },
          { id: "B", sit: "balanced", text: "硬扛两人围抢，护住球权", check: { attrs: ["hardness", "strength"], difficulty: 28, tag: "硬度+对抗" },
            success: { text: "两人围抢，你硬扛着护住球。肩膀撞得生疼，球权没丢。", effects: { reputation: 7, attrs: { hardness: 1 } } },
            fail: { text: "硬扛没扛住。两人一夹，球被捅走。肋骨发疼。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "balanced", text: "稳住重心，转身摆脱围抢", check: { attrs: ["balance", "agility"], difficulty: 27, tag: "平衡+柔韧" },
            success: { text: "你稳住重心，转身摆脱围抢。一抹而出，球护住了。", effects: { reputation: 7, attrs: { balance: 1 } } },
            fail: { text: "转身没站稳。一踉跄，球被断下。脚踝发酸。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "attack", text: "突然拨球，从两人缝隙钻出", check: { attrs: ["dribble", "agility"], difficulty: 34, tag: "盘带+柔韧" },
            success: { text: "你突然拨球，从两人缝隙钻出。一抹而过，单刀形成。", effects: { reputation: 11, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "拨球趟大。两人一夹，球丢了。你大腿发酸。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地从两人缝隙抹过，单刀推射。安静了一秒，全场起立。", effects: { reputation: 18, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "E", sit: "attack", text: "转身远射，解围式抽射", check: { attrs: ["shooting", "power"], difficulty: 37, tag: "射门+力量" },
            success: { text: "你转身抡脚远射。球带着风声砸向球门，门将脱手弹进。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "远射发力过猛。球高出横梁，腰腹酸胀。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地转身怒射。球像炮弹砸入网窝，网绳剧烈一颤。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          }
        ]
      },
      {
        text: "边线附近，后卫贴身紧逼。你像一堵墙一样顶住他，鞋钉碾进草皮。底线就在前方。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "扛开后卫，强行下底", check: { attrs: ["strength", "hardness"], difficulty: 34, tag: "对抗+硬度" },
            success: { text: "你{elementAdj}地扛开后卫，强行下底。肩膀撞得生疼，传中找中路。", effects: { reputation: 10, assists: 1, attrs: { strength: 1 } } },
            fail: { text: "扛不开。后卫死死贴住，你被挤出边线。肋骨发疼。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地扛开后卫，整条边路被你碾开。下底倒三角，队友推射空门。全场沸腾。", effects: { reputation: 18, goals: 1, attrs: { strength: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "一步趟球超车，冲到底线", check: { attrs: ["speed", "burst"], difficulty: 35, tag: "速度+爆发" },
            success: { text: "你{elementAdj}地趟球超车，一步甩开后卫冲到底线。下底传中。", effects: { reputation: 10, assists: 1, attrs: { speed: 1 } } },
            fail: { text: "超车趟大。球出了底线，你刹不住脚。大腿发酸。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地超车下底，倒三角回做。队友推射，球进了。看台炸了。", effects: { reputation: 18, goals: 1, attrs: { speed: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "attack", text: "下底内切，小角度抽射", check: { attrs: ["shooting", "power"], difficulty: 38, tag: "射门+力量" },
            success: { text: "你下底内切，小角度抽射。球钻入近角，门将封堵不及。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "小角度没打出。射门被门将用腿挡出。脚背发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地小角度怒射。球从门将腋下钻入网窝，全场抱头。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "D", sit: "balanced", text: "下底后倒三角回做", check: { attrs: ["passing", "vision"], difficulty: 27, tag: "传球+视野" },
            success: { text: "你下底后倒三角回做。插上的队友迎球推射，配合成了。", effects: { reputation: 8, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "倒三角传大。队友没接住，球被后卫捅走。脚腕发酸。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "balanced", text: "卡住身位，护球等接应", check: { attrs: ["positioning", "balance"], difficulty: 26, tag: "站位+平衡" },
            success: { text: "你卡住身位护住球，等接应到位。分球，机会出来了。", effects: { reputation: 6, attrs: { positioning: 1 } } },
            fail: { text: "身位被抢。后卫先一步卡住，球被断。你肩膀发酸。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "角球。你站在前点，对方中锋贴着你的后背。发球助跑的声音响起，全场屏息。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "抢前点，甩头攻门", check: { attrs: ["heading", "balance"], difficulty: 36, tag: "头球+平衡" },
            success: { text: "你{elementAdj}地抢前点甩头。球砸地弹入网窝，门将扑救不及。", effects: { reputation: 12, goals: 1, attrs: { heading: 1 } } },
            fail: { text: "抢点被卡住。头球顶偏，球擦柱而出。脖子发酸。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地抢前点，一记头槌砸向地面。球弹入网窝，全场起立。", effects: { reputation: 19, goals: 1, attrs: { heading: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "卡住身位，扛开对手起跳", check: { attrs: ["strength", "hardness"], difficulty: 33, tag: "对抗+硬度" },
            success: { text: "你卡住身位，扛开中锋起跳。头球蹭到后点，队友补射。", effects: { reputation: 8, assists: 1, attrs: { strength: 1 } } },
            fail: { text: "扛不开。中锋把你挤出落点，球被顶走。肋骨发疼。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "attack", text: "头球蹭到后点，凌空补射", check: { attrs: ["shooting", "burst"], difficulty: 38, tag: "射门+爆发" },
            success: { text: "头球蹭到后点，你凌空补射。球钻入网窝，门将鞭长莫及。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "补射踢呲。球偏出立柱，脚背发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地凌空补射。球砸入死角，网绳剧烈一颤。所有人都站起来了。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "D", sit: "balanced", text: "灵活跑位，晃开盯防抢点", check: { attrs: ["agility", "speed"], difficulty: 29, tag: "柔韧+速度" },
            success: { text: "你灵活跑位，晃开盯防抢点。头球一蹭，球改变方向。", effects: { reputation: 8, attrs: { agility: 1 } } },
            fail: { text: "跑位被识破。盯防跟住了你，抢点落空。腰腹发酸。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "balanced", text: "佯攻前点，做球给后点队友", check: { attrs: ["iq", "passing"], difficulty: 28, tag: "球商+传球" },
            success: { text: "你佯攻前点，做球给后点队友。他迎球推射，配合成了。", effects: { reputation: 8, assists: 1, attrs: { iq: 1 } } },
            fail: { text: "佯攻被看穿。后点队友被盯死，球被断。你皱着眉。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "对方角球吊进禁区。你回防到后点，对方高中锋正卡着你。草皮湿滑，鞋钉打滑。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "高高跃起，头球解围", check: { attrs: ["heading", "balance"], difficulty: 28, tag: "头球+平衡" },
            success: { text: "你{elementAdj}地高高跃起，力压中锋头球解围。球被顶出禁区，威胁化解。", effects: { reputation: 6, attrs: { heading: 1 } } },
            fail: { text: "起跳被卡住。头球没顶到，球漏到后点。脖子发酸。", effects: { stamina: -4 } }
          },
          { id: "B", sit: "defense", text: "卡住身位，扛开对手顶出", check: { attrs: ["strength", "hardness"], difficulty: 27, tag: "对抗+硬度" },
            success: { text: "你卡住身位，硬扛开中锋。头球顶出禁区，化解危机。", effects: { reputation: 6, attrs: { strength: 1 } } },
            fail: { text: "扛不开。中锋把你挤出落点，球漏了。肋骨发疼。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "defense", text: "回追卡住第二落点", check: { attrs: ["speed", "stamina"], difficulty: 29, tag: "速度+耐力" },
            success: { text: "你{elementAdj}地回追，卡住第二落点。把球捅出边线，威胁解除。", effects: { reputation: 5, attrs: { speed: 1 } } },
            fail: { text: "回追慢了一步。第二落点被对方拿到，险情还在。大腿发酸。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "balanced", text: "阅读落点，提前卡断二点球", check: { attrs: ["iq", "vision"], difficulty: 28, tag: "球商+视野" },
            success: { text: "你读懂了落点，提前卡断二点球。一脚解围，化解危机。", effects: { reputation: 6, attrs: { iq: 1 } } },
            fail: { text: "判断错了。二点球被对方拿到，射门擦柱而出。你皱着眉。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "咬牙硬顶，决断出击解围", check: { attrs: ["resolve", "hardness"], difficulty: 30, tag: "决断+硬度" },
            success: { text: "你咬牙硬顶，关键时刻决断出击。一脚把球捅出底线，化解危机。", effects: { reputation: 6, attrs: { resolve: 1 } } },
            fail: { text: "出击犹豫了。球漏过去，险情还在。你懊恼地捶了下草皮。", effects: { stamina: -4 } }
          }
        ]
      },
{
        text: "边线附近。界外球掷过来，球砸在你胸口上。你背对球门，后卫的胸口贴上你的后背。草腥味混着汗味。苏雯在肋部要球。",
        sit: "balanced",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "背身做墙，回做给苏雯后前插",
            check: { attrs: ["passing", "vision"], difficulty: 28, tag: "传球+视野" },
            success: {
              text: "你一脚回做，反身前插。苏雯心领神会，直塞。球到人到。配合打出来了。",
              effects: {
                reputation: 8,
                assists: 1,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "回做力量轻了。苏雯没接住，球被后卫捅走。你肩膀还酸着。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "转身强突，用身体挤开后卫",
            check: { attrs: ["strength", "balance"], difficulty: 33, tag: "对抗+平衡" },
            success: {
              text: "你肩膀一横，硬生生把后卫挤开。肋骨发疼。转身。底线就在前方。草皮在鞋钉下翻起。",
              effects: {
                reputation: 9,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "你顶不动他。后卫纹丝不动。你被挤出边线，膝盖磕在广告牌上。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "C",
            sit: "attack",
            text: "头球摆渡给插上的队友",
            check: { attrs: ["heading", "positioning"], difficulty: 32, tag: "头球+站位" },
            success: {
              text: "你迎着来球起跳。额头撞上皮球，闷响。球飞向禁区。队友抢到了。头球攻门。",
              effects: {
                reputation: 9,
                assists: 1,
                attrs: { heading: 1 }
              }
            },
            fail: {
              text: "起跳时机差了。球从你头顶飞过。你的脖子还在发酸。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "护球等队友跑位，不急",
            check: { attrs: ["speed", "stamina"], difficulty: 25, tag: "速度+耐力" },
            success: {
              text: "你背身护住球。肩膀顶着肩膀。等。队友跑出来了。你分球。节奏在你手里。",
              effects: {
                reputation: 5,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "护球时被两人夹击。球被捅走。你的肋骨还在发疼。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "丢球就地反抢，果断出脚",
            check: { attrs: ["shooting", "resolve"], difficulty: 24, tag: "射门+决断" },
            success: {
              text: "丢球的瞬间你就地反抢。球权夺回。你顺势一脚远射。门将扑了一下。肺部在灼烧，但值得。",
              effects: {
                reputation: 5,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "反抢扑空。对方顺势推进，你只能看着背影，大腿发酸。",
              effects: { stamina: -4 }
            }
          }
        ]
      },
{
        text: "对方高位逼抢。后场出球困难。你回撤到中场，背身要球。草皮被鞋钉翻起，泥土的腥气钻进鼻腔。队友的长传飞过来。",
        sit: "balanced",
        choices: [
          {
            id: "A",
            sit: "balanced",
            text: "背身停球，扛住逼抢后分球",
            check: { attrs: ["strength", "balance"], difficulty: 29, tag: "对抗+平衡" },
            success: {
              text: "你背身停球。肩膀顶着逼抢的人。肋骨发疼。但你扛住了。分球。球权稳住了。",
              effects: {
                reputation: 7,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "停球弹远了。逼抢的人伸脚一捅。球丢了。你的后背还在发麻。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "头球摆渡，直接找前插的队友",
            check: { attrs: ["heading", "vision"], difficulty: 31, tag: "头球+视野" },
            success: {
              text: "你迎着来球起跳。额头撞上皮球。球飞向禁区前沿。队友抢到了。反击打出来了。",
              effects: {
                reputation: 8,
                assists: 1,
                attrs: { heading: 1 }
              }
            },
            fail: {
              text: "起跳时机差了。球从你头顶飞过。你的脖子还在发酸。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "一脚出球，快速转移给弱侧",
            check: { attrs: ["passing", "iq"], difficulty: 27, tag: "传球+球商" },
            success: {
              text: "你不停球，一脚转移。球飞过中场，到了弱侧。对方逼抢扑空了。空间出来了。",
              effects: {
                reputation: 7,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "转移力量大了。球飞出边线。你喘着粗气。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "attack",
            text: "转身带球推进，撕开逼抢",
            check: { attrs: ["dribble", "agility"], difficulty: 34, tag: "盘带+柔韧" },
            success: {
              text: "你停球转身。逼抢的人扑过来，你拨球变向。抹过去了。面前一片开阔。",
              effects: {
                reputation: 9,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "转身那一下被卡住。球弹出去。你的脚踝还在发麻。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "回传给门将，先稳住不丢球",
            check: { attrs: ["shooting", "resolve"], difficulty: 22, tag: "射门+决断" },
            success: {
              text: "你回传给门将。不急。先稳住。对方逼抢扑空了。教练在场边喊，好。",
              effects: {
                reputation: 4,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "回传力量小了。对方前锋伸脚一捅。险些被断。你后背发凉。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "后场长传。球在空中划了很远。你和对方后卫同时起跳。肩膀撞在一起，肘部发麻。球在最高点等着。草腥味灌进鼻腔。",
        sit: "attack",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "争顶摆渡，头球找插上的队友",
            check: { attrs: ["heading", "positioning"], difficulty: 36, tag: "头球+站位" },
            success: {
              text: "你额头撞上皮球。闷响。球飞向禁区。队友抢到了。头球攻门。进了。",
              effects: {
                reputation: 11,
                assists: 1,
                attrs: { heading: 1 }
              }
            },
            fail: {
              text: "起跳时机差了。球从你头顶飞过。你的脖子还在发酸。肩膀还在疼。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地力压后卫。头球摆渡。球像长了眼睛，砸在队友头上。网绳晃了。全场站起来。",
              effects: {
                reputation: 18,
                assists: 1,
                attrs: { heading: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "落地后直接带球突入禁区",
            check: { attrs: ["dribble", "speed"], difficulty: 35, tag: "盘带+速度" },
            success: {
              text: "你落地，球在脚下。后卫还没转身。你带球突入禁区。草皮在鞋钉下翻起。",
              effects: {
                reputation: 10,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "落地那一下没站稳。球弹远了。后卫回身把球捅走。你的膝盖还在发酸。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地落地带球。三步甩开后卫。单刀。推射。网绳晃了一下。",
              effects: {
                reputation: 19,
                goals: 1,
                attrs: { dribble: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "背身护球，等队友跑位再分",
            check: { attrs: ["strength", "pressure"], difficulty: 27, tag: "对抗+抗压" },
            success: {
              text: "你背身护住球。肩膀顶着后卫。等。队友跑出来了。你分球。节奏在你手里。",
              effects: {
                reputation: 6,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "护球时被两人夹击。球被捅走。你的肋骨还在发疼。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "D",
            sit: "attack",
            text: "凌空抽射，搏一个远射",
            check: { attrs: ["shooting", "power"], difficulty: 38, tag: "射门+力量" },
            success: {
              text: "你迎球就抽。砰。闷响。球像炮弹一样砸向球门。门将扑了一下，没够到。",
              effects: {
                reputation: 12,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "球弹得太高。你抽了个空，脚背刮在草皮上。膝盖磕在地上。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地凌空抽射。球带着弧线砸入死角。门将纹丝不动。看台炸了。",
              effects: {
                reputation: 21,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "不冒险，回传重新组织",
            check: { attrs: ["rhythm", "iq"], difficulty: 23, tag: "节奏+球商" },
            success: {
              text: "你回传给后腰。不急。球权稳住了。下一次机会会来。",
              effects: {
                reputation: 4,
                attrs: { rhythm: 1 }
              }
            },
            fail: {
              text: "回传力量小了。对方前锋伸脚一捅。险些被断。你后背发凉。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "对方边路传中。球吊进禁区。你回防到后点，对方高中锋正卡着你。草皮湿滑，鞋钉打滑。汗珠滴进眼睛。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "卡住身位，头球解围",
            check: { attrs: ["heading", "positioning"], difficulty: 30, tag: "头球+站位" },
            success: {
              text: "你卡住身位。起跳。额头撞上皮球。闷响。球飞出去了。解围。你松了口气。",
              effects: {
                reputation: 7,
                attrs: { heading: 1 }
              }
            },
            fail: {
              text: "起跳时机差了。球从你头顶飞过。对方中锋头球攻门。你的心脏在擂鼓。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "用身体扛住他，不让他起跳",
            check: { attrs: ["strength", "hardness"], difficulty: 28, tag: "对抗+硬度" },
            success: {
              text: "你肩膀一横，硬生生把他卡住。他起不了跳。球飞过去了。解围。肋骨发疼，但值得。",
              effects: {
                reputation: 6,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "你顶不住他。他硬生生把你挤开。起跳。头球。你的心脏在擂鼓。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "解围后分球给队友，稳住节奏",
            check: { attrs: ["passing", "iq"], difficulty: 29, tag: "传球+球商" },
            success: {
              text: "你解围后拿球。抬头。后腰在要球。一脚分球。球权稳住了。教练在场边点头。",
              effects: {
                reputation: 6,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "分球力量小了。对方伸脚一捅。险些被断。你后背发凉。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "解围后沿边路反击",
            check: { attrs: ["speed", "stamina"], difficulty: 31, tag: "速度+耐力" },
            success: {
              text: "你解围后沿边路狂奔。肺在烧，但腿还在动。反击。风灌进耳朵。",
              effects: {
                reputation: 7,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "你跑了二十米，腿软了。球被回追的人捅走。你弯着腰喘气。",
              effects: { stamina: -6 }
            }
          },
          {
            id: "E",
            sit: "balanced",
            text: "解围后拿球，果断吊射",
            check: { attrs: ["shooting", "resolve"], difficulty: 24, tag: "射门+决断" },
            success: {
              text: "你解围后拿球。抬头。对方门将站位靠前。你一脚吊射。球划过弧线。进了。",
              effects: {
                reputation: 8,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "吊射力量大了。球飞过横梁。你喘着粗气。",
              effects: { stamina: -3 }
            }
          }
        ]
      }
    ]
  },
  LW_classic: {
    desc: "调度、传中、节奏",
    events: [
      {
        text: "你在边路拿球，对方逼抢压上。你抬头一扫，弱侧大片空当。草腥味里，你的呼吸很稳。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "balanced", text: "一脚长传，转移到弱侧", check: { attrs: ["vision", "passing"], difficulty: 29, tag: "视野+传球" },
            success: { text: "你{elementAdj}地一脚长传，球划过半场转移到弱侧。队友大片空当，机会出来了。", effects: { reputation: 9, assists: 1, attrs: { vision: 1 } } },
            fail: { text: "长传力量大了。球飞出边线，转移失败。你脚腕发酸。", effects: { stamina: -3 } }
          },
          { id: "B", sit: "balanced", text: "顶住逼抢，护住球再调度", check: { attrs: ["strength", "balance"], difficulty: 26, tag: "对抗+平衡" },
            success: { text: "你顶住逼抢，护住球。肩膀撞得发疼，等对手失了重心，再调度。", effects: { reputation: 7, attrs: { strength: 1 } } },
            fail: { text: "顶不住。后卫一挤，球被捅走。你肩膀发酸。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "balanced", text: "卡住接应位置，稳住球权", check: { attrs: ["positioning", "balance"], difficulty: 25, tag: "站位+平衡" },
            success: { text: "你卡住接应位置，稳住球权。等队友跑位到位，再分球。", effects: { reputation: 6, attrs: { positioning: 1 } } },
            fail: { text: "接应位置偏了。传球不到位，球被断。你皱着眉。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "attack", text: "拨球摆脱逼抢，向前推进", check: { attrs: ["dribble", "agility"], difficulty: 34, tag: "盘带+柔韧" },
            success: { text: "你拨球摆脱逼抢，向前推进。一抹而过，撕开了防线。", effects: { reputation: 10, attrs: { dribble: 1 } } },
            fail: { text: "拨球趟大。后卫一捅，球丢了。大腿发酸。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地连过两人，撕开整条防线。直塞，队友单刀推射。全场起立。", effects: { reputation: 18, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "E", sit: "attack", text: "调度后突然内切远射", check: { attrs: ["shooting", "power"], difficulty: 37, tag: "射门+力量" },
            success: { text: "调度后你突然内切远射。球带着风声钻入网窝，门将扑救不及。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "远射发力过猛。球高出横梁，腰腹酸胀。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地内切怒射。球像炮弹砸入死角，网绳剧烈一颤。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          }
        ]
      },
      {
        text: "你下底到边线，禁区内队友正在抢点。后卫封堵你的传中线路。网绳在风里晃。",
        sit: "attack",
        choices: [
          { id: "A", sit: "balanced", text: "一脚精准传中，找前点队友", check: { attrs: ["passing", "vision"], difficulty: 30, tag: "传球+视野" },
            success: { text: "你{elementAdj}地一脚传中，球划过弧线找到前点。队友甩头攻门，球进了。", effects: { reputation: 9, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "传中被封堵。球弹回，后卫解围。你脚腕发酸。", effects: { stamina: -3 } }
          },
          { id: "B", sit: "attack", text: "不传了，内切直接抽射近角", check: { attrs: ["shooting", "burst"], difficulty: 37, tag: "射门+爆发" },
            success: { text: "你不传了，内切直接抽射近角。球钻入网窝，门将封堵不及。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "内切没晃开角度。射门被后卫封堵，闷响。脚背发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地内切抽射。球划出弧线钻入死角，布澜门将一动不动。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "attack", text: "拨球抹过封堵后卫，下底", check: { attrs: ["dribble", "agility"], difficulty: 35, tag: "盘带+柔韧" },
            success: { text: "你拨球抹过封堵的后卫，下底。倒三角回做，机会出来了。", effects: { reputation: 10, assists: 1, attrs: { dribble: 1 } } },
            fail: { text: "抹过失败。后卫伸脚一捅，球丢了。大腿发酸。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地抹过后卫下底，倒三角回做。队友推射空门，全场沸腾。", effects: { reputation: 18, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "D", sit: "balanced", text: "卡住传中位置，等队友跑位到位", check: { attrs: ["positioning", "balance"], difficulty: 27, tag: "站位+平衡" },
            success: { text: "你卡住传中位置，等队友跑位到位。一脚传中，配合成了。", effects: { reputation: 7, attrs: { positioning: 1 } } },
            fail: { text: "传中位置被堵。线路被封死，球被断。你皱着眉。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "被断就地反抢，掐断反击", check: { attrs: ["tackle", "intercept"], difficulty: 24, tag: "铲断+拦截" },
            success: { text: "被断的瞬间你就地反抢。一记铲断夺回球权，肺在灼烧。", effects: { reputation: 5, attrs: { tackle: 1 } } },
            fail: { text: "反抢扑空。对方反击打回来，你只能回追。大腿发酸。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "比赛进入相持，你边路持球。对方想提速，你偏要压住节奏。看台的嘘声压下来，你不为所动。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "balanced", text: "用节奏变化，掌控球权", check: { attrs: ["rhythm", "iq"], difficulty: 27, tag: "节奏+球商" },
            success: { text: "你一快一慢，节奏尽在掌握。对方抢不到球，只能跟着你跑。", effects: { reputation: 7, attrs: { rhythm: 1 } } },
            fail: { text: "节奏被识破。对方突然上抢，球被断。你皱着眉。", effects: { stamina: -3 } }
          },
          { id: "B", sit: "balanced", text: "顶住逼抢，稳稳护球", check: { attrs: ["pressure", "balance"], difficulty: 26, tag: "抗压+平衡" },
            success: { text: "你顶住逼抢，稳稳护球。等对手急躁失位，再分球。", effects: { reputation: 6, attrs: { pressure: 1 } } },
            fail: { text: "抗压没扛住。后卫一挤，球被捅走。肋骨发疼。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "balanced", text: "扛住对手贴身，护住球", check: { attrs: ["strength", "hardness"], difficulty: 27, tag: "对抗+硬度" },
            success: { text: "你扛住对手贴身，护住球。肩膀撞得发疼，球权没丢。", effects: { reputation: 6, attrs: { strength: 1 } } },
            fail: { text: "扛不住。对手一夹，球丢了。你肩膀发酸。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "attack", text: "突然提速，拨球突破", check: { attrs: ["dribble", "speed"], difficulty: 34, tag: "盘带+速度" },
            success: { text: "你突然提速，拨球突破。一抹而过，撕开了防线。", effects: { reputation: 10, attrs: { dribble: 1 } } },
            fail: { text: "提速趟大。后卫一捅，球出了边线。大腿发酸。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地突然提速，连过两人撕开防线。直塞，队友单刀。全场起立。", effects: { reputation: 18, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "E", sit: "attack", text: "节奏一顿，内切远射", check: { attrs: ["shooting", "burst"], difficulty: 37, tag: "射门+爆发" },
            success: { text: "节奏一顿，你内切远射。球钻入网窝，门将扑救不及。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "远射被堵。射门被后卫封堵，闷响。脚背发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地内切怒射。球划出弧线砸入死角，网绳剧烈一颤。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          }
        ]
      },
      {
        text: "你在边路肋部拿球，对方防线压上。你瞥见中锋反越位的那一瞬。汗水顺着下巴滴落。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "一脚直塞，打穿防线", check: { attrs: ["vision", "passing"], difficulty: 34, tag: "视野+传球" },
            success: { text: "你{elementAdj}地一脚直塞，球打穿防线。中锋反越位单刀，推射入网。", effects: { reputation: 10, assists: 1, attrs: { vision: 1 } } },
            fail: { text: "直塞被预判。后卫提前卡断，球权易手。你脚腕发酸。", effects: { stamina: -3 } }
          },
          { id: "B", sit: "attack", text: "直塞未果，自己内切抽射", check: { attrs: ["shooting", "burst"], difficulty: 37, tag: "射门+爆发" },
            success: { text: "直塞线路被封，你内切抽射。球钻入近角，门将扑救不及。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "内切没晃开角度。射门被后卫封堵，闷响。脚背发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地内切怒射。球划出弧线砸入死角，布澜门将愣在原地。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "attack", text: "直塞后高速前插，接应单刀", check: { attrs: ["speed", "burst"], difficulty: 35, tag: "速度+爆发" },
            success: { text: "直塞后你{elementAdj}地高速前插。接应到位，单刀推射入网。", effects: { reputation: 11, goals: 1, attrs: { speed: 1 } } },
            fail: { text: "前插慢了半拍。越位旗举起，单刀成空。大腿发酸。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】你{elementAdj}地前插，甩开整条防线。单刀推射，门将连反应都没有。全场炸了。", effects: { reputation: 19, goals: 1, attrs: { speed: 2 }, flags: { keySuccess: true } } }
          },
          { id: "D", sit: "balanced", text: "卡住肋部位置，等反越位时机", check: { attrs: ["positioning", "balance"], difficulty: 27, tag: "站位+平衡" },
            success: { text: "你卡住肋部位置，等反越位时机。传球到位，单刀形成。", effects: { reputation: 7, attrs: { positioning: 1 } } },
            fail: { text: "时机没拿捏好。越位旗举起，白跑一趟。膝盖发酸。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "传球被断，回身拦截反击", check: { attrs: ["intercept", "tackle"], difficulty: 25, tag: "拦截+铲断" },
            success: { text: "传球被断，你立刻回身拦截。一脚断下对方反击，化解危机。", effects: { reputation: 5, attrs: { intercept: 1 } } },
            fail: { text: "回身慢了。对方反击打穿，你只能目送。肺部灼烧。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "你在边路内收，对方后腰贴上来。中路空当一闪而过。你脚背绷紧，眼神却看向远端。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "内切后突施冷箭，远射", check: { attrs: ["shooting", "power"], difficulty: 39, tag: "射门+力量" },
            success: { text: "你{elementAdj}地突施冷箭。远射带着风声砸入网窝，门将毫无反应。", effects: { reputation: 13, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "远射发力过猛。球高出横梁，腰腹酸胀。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】你{elementAdj}地冷箭远射。球像炮弹砸入死角，网绳剧烈一颤。全场抱头。", effects: { reputation: 21, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "佯射实传，直塞插上队友", check: { attrs: ["passing", "iq"], difficulty: 32, tag: "传球+球商" },
            success: { text: "你佯射实传，一脚直塞。插上的队友单刀推射，球进了。", effects: { reputation: 10, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "佯传被识破。后卫卡断线路，球被断。你脚腕发酸。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "attack", text: "连续拨球，晃过后腰内切", check: { attrs: ["dribble", "agility"], difficulty: 35, tag: "盘带+柔韧" },
            success: { text: "你连续拨球，晃过后腰内切。低射，球钻入近角。", effects: { reputation: 11, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "拨球被识破。后腰伸脚一捅，球丢了。大腿发酸。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地连过两人内切，推射死角。安静了一秒，全场起立。", effects: { reputation: 18, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "D", sit: "balanced", text: "抗住对抗，稳住重心再分球", check: { attrs: ["balance", "strength"], difficulty: 27, tag: "平衡+对抗" },
            success: { text: "你抗住对抗，稳住重心。护住球，等队友跑位再分。", effects: { reputation: 6, attrs: { balance: 1 } } },
            fail: { text: "对抗没站稳。一踉跄，球被捅走。脚踝发酸。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "丢球就地反抢，掐断反击", check: { attrs: ["tackle", "intercept"], difficulty: 24, tag: "铲断+拦截" },
            success: { text: "丢球你就地反抢。一记铲断夺回球权，肺在灼烧。", effects: { reputation: 5, attrs: { tackle: 1 } } },
            fail: { text: "反抢扑空。对方反击打回来，你只能回追。大腿发酸。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "边路任意球。你把球摆好，退后三步。禁区内双方绞在一起。布澜门将在门线上吼叫着指挥。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "主罚精准传中，找后点", check: { attrs: ["passing", "vision"], difficulty: 34, tag: "传球+视野" },
            success: { text: "你{elementAdj}地主罚传中，球划过弧线找到后点。队友甩头攻门，球进了。", effects: { reputation: 10, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "传中质量差了。球被门将出击摘下，机会没了。你脚腕发酸。", effects: { stamina: -3 } }
          },
          { id: "B", sit: "attack", text: "直接任意球，旋向球门死角", check: { attrs: ["shooting", "burst"], difficulty: 39, tag: "射门+爆发" },
            success: { text: "你直接任意球，球旋向死角。门将扑救不及，球钻入网窝。", effects: { reputation: 13, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "任意球打在人墙上。球弹回，机会没了。脚背发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地主罚任意球。球划出弧线绕过人墙，砸入死角。全场起立。", effects: { reputation: 21, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "attack", text: "自己抢前点，甩头攻门", check: { attrs: ["heading", "balance"], difficulty: 36, tag: "头球+平衡" },
            success: { text: "你抢前点甩头攻门。球砸地弹入网窝，门将扑救不及。", effects: { reputation: 12, goals: 1, attrs: { heading: 1 } } },
            fail: { text: "抢点被卡住。头球顶偏，球擦柱而出。脖子发酸。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地抢前点，一记头槌砸向地面。球弹入网窝，全场沸腾。", effects: { reputation: 19, goals: 1, attrs: { heading: 2 }, flags: { keySuccess: true } } }
          },
          { id: "D", sit: "balanced", text: "佯装传中，拨球变向内切", check: { attrs: ["agility", "dribble"], difficulty: 29, tag: "柔韧+盘带" },
            success: { text: "你佯装传中，拨球变向内切。一抹而过，闪出空当。", effects: { reputation: 8, attrs: { agility: 1 } } },
            fail: { text: "变向被识破。后卫卡住内线，球被断。腰腹发酸。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "balanced", text: "禁区内卡住身位，扛开对手抢点", check: { attrs: ["strength", "hardness"], difficulty: 28, tag: "对抗+硬度" },
            success: { text: "你卡住身位，扛开对手抢点。头球一蹭，球改变方向。", effects: { reputation: 7, attrs: { strength: 1 } } },
            fail: { text: "扛不开。对手把你挤出落点，抢点落空。肋骨发疼。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "传球被断，对方顺势打反击。你这侧的边路空了。你回追，肺在烧，鞋钉刮着草皮。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "飞身铲断，掐断反击", check: { attrs: ["tackle", "intercept"], difficulty: 27, tag: "铲断+拦截" },
            success: { text: "你看准时机飞身铲断。球被捅出边线，反击被掐灭。草屑溅了一脸。", effects: { reputation: 6, attrs: { tackle: 1 } } },
            fail: { text: "铲断扑空。对方抹过你推进，你滑倒在草皮上。膝盖发疼。", effects: { stamina: -5 } }
          },
          { id: "B", sit: "defense", text: "高速回追，卡住身位", check: { attrs: ["speed", "stamina"], difficulty: 29, tag: "速度+耐力" },
            success: { text: "你{elementAdj}地高速回追，硬是卡住身位。把对方挤出边线，球权夺回。", effects: { reputation: 6, attrs: { speed: 1 } } },
            fail: { text: "回追差了一步。对方抢先卡住身位，你只能犯规。大腿发酸。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "defense", text: "卡住内线，封堵突破路线", check: { attrs: ["positioning", "balance"], difficulty: 26, tag: "站位+平衡" },
            success: { text: "你卡住内线，封死突破路线。对方被迫回传，威胁化解。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "站位偏了半步。对方从内线抹过，你扑了个空。脚踝发酸。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "阅读对手意图，提前卡断传球", check: { attrs: ["iq", "vision"], difficulty: 28, tag: "球商+视野" },
            success: { text: "你读懂了对方的传球意图，提前卡断。反击被你掐灭在萌芽。", effects: { reputation: 6, attrs: { iq: 1 } } },
            fail: { text: "判断错了。对方变向突破，你扑空。皱着眉回追。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "咬牙回追，决断下脚解围", check: { attrs: ["resolve", "hardness"], difficulty: 30, tag: "决断+硬度" },
            success: { text: "你咬牙回追，关键时刻决断下脚。一脚把球捅出底线，化解危机。", effects: { reputation: 6, attrs: { resolve: 1 } } },
            fail: { text: "下脚犹豫了。对方抹过你，威胁还在。你懊恼地捶了下草皮。", effects: { stamina: -4 } }
          }
        ]
      },
{
        text: "对方安排了一个人专门盯你。你走到哪他跟到哪。你回撤到中场要球。草皮被鞋钉翻起，泥土的腥气钻进鼻腔。苏雯在肋部跑位。",
        sit: "balanced",
        choices: [
          {
            id: "A",
            sit: "balanced",
            text: "一脚直塞，找苏雯的反越位",
            check: { attrs: ["passing", "vision"], difficulty: 30, tag: "传球+视野" },
            success: {
              text: "你余光扫到苏雯的跑位。一脚直塞。球从后卫脚边滚过。她接到了。单刀。",
              effects: {
                reputation: 10,
                assists: 1,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "直塞力量大了。球从苏雯脚边滚过。越位。裁判举旗。你喘着粗气。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "B",
            sit: "balanced",
            text: "用身体卡住盯防者，护球转身",
            check: { attrs: ["pressure", "balance"], difficulty: 27, tag: "抗压+平衡" },
            success: {
              text: "你背身卡住他。肩膀顶着肩膀。他推不动你。你转身。空间出来了。你分球。",
              effects: {
                reputation: 7,
                attrs: { pressure: 1 }
              }
            },
            fail: {
              text: "你扛不住他。他把你挤开了。球丢了。你的肩膀还在发麻。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "C",
            sit: "attack",
            text: "带球推进，撕开中场",
            check: { attrs: ["dribble", "agility"], difficulty: 34, tag: "盘带+柔韧" },
            success: {
              text: "你带球推进。盯防者扑过来，你拨球变向。抹过去了。面前一片开阔。",
              effects: {
                reputation: 9,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "带球多趟了一步。对方回防到位。机会没了。你的脚踝还在发酸。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "D",
            sit: "attack",
            text: "远射，搏一个死角",
            check: { attrs: ["shooting", "burst"], difficulty: 36, tag: "射门+爆发" },
            success: {
              text: "你脚背绷紧。三十米。起脚。球带着弧线飞向球门。门将扑了一下，没够到。",
              effects: {
                reputation: 11,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "射门打偏了。球飞过横梁。你的脚背还在发麻。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地远射。球带着弧线砸入死角。门将纹丝不动。看台安静了一秒，然后炸了。",
              effects: {
                reputation: 20,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "回传给后腰，先稳住球权",
            check: { attrs: ["tackle", "iq"], difficulty: 22, tag: "铲断+球商" },
            success: {
              text: "你回传给后腰。不急。先稳住。对方逼抢扑空了。教练在场边点头。",
              effects: {
                reputation: 4,
                attrs: { tackle: 1 }
              }
            },
            fail: {
              text: "回传力量小了。对方前锋伸脚一捅。险些被断。你后背发凉。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "反击。后场断球，球到了你脚下。面前是大片空当。对方只有一名后卫回追。风灌进耳朵，草皮在鞋钉下飞退。禁区在前方。",
        sit: "attack",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "内切射门，直接终结",
            check: { attrs: ["shooting", "burst"], difficulty: 37, tag: "射门+爆发" },
            success: {
              text: "你内收。后卫退得太深。起脚。球贴着门柱钻进去。网绳在晃。",
              effects: {
                reputation: 12,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "射门被后卫伸脚挡了。球弹出去。你的脚背还在发麻。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地内切抽射。球带着弧线砸入死角。门将纹丝不动。全场站起来。",
              effects: {
                reputation: 21,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "下底传中，找禁区的队友",
            check: { attrs: ["passing", "vision"], difficulty: 32, tag: "传球+视野" },
            success: {
              text: "你沿边线推进。底线。传中。球划出一道弧线飞向禁区。队友抢到了。头球。进了。",
              effects: {
                reputation: 10,
                assists: 1,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "传中被后卫伸脚挡了。球弹出底线。你喘着粗气。",
              effects: { stamina: -3 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地下底传中。球像长了眼睛，砸在队友头上。网绳晃了。看台炸了。",
              effects: {
                reputation: 18,
                assists: 1,
                attrs: { passing: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "C",
            sit: "attack",
            text: "盘带过掉回追的后卫",
            check: { attrs: ["dribble", "agility"], difficulty: 35, tag: "盘带+柔韧" },
            success: {
              text: "你拨球变向。后卫重心丢了。你抹过去了。禁区。单刀。",
              effects: {
                reputation: 10,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "变向趟大了。后卫伸脚一捅。球弹出去。你的脚踝还在发酸。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "减速扛住后卫，等队友插上",
            check: { attrs: ["strength", "balance"], difficulty: 26, tag: "对抗+平衡" },
            success: {
              text: "你减速。扛住回追的后卫。等。队友插上来了。你分球。配合打出来了。",
              effects: {
                reputation: 6,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "你减速了，但队友没跟上。机会没了。对方回防到位。你喘着粗气。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "不冒险，回传稳住球权",
            check: { attrs: ["positioning", "pressure"], difficulty: 22, tag: "站位+抗压" },
            success: {
              text: "你回传给后腰。不急。球权稳住了。教练在场边点头。",
              effects: {
                reputation: 4,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "回传力量小了。对方前锋伸脚一捅。险些被断。你后背发凉。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "比赛末段。你方领先一球。球到了你脚下的边路。对方不紧不慢地逼上来。看台有人喊，稳住。草腥味混着汗味。",
        sit: "balanced",
        choices: [
          {
            id: "A",
            sit: "balanced",
            text: "护球消耗时间，不冒险",
            check: { attrs: ["pressure", "stamina"], difficulty: 24, tag: "抗压+耐力" },
            success: {
              text: "你背身护住球。肩膀顶着逼抢的人。等。时间在一秒一秒过去。球权在你手里。",
              effects: {
                reputation: 5,
                attrs: { pressure: 1 }
              }
            },
            fail: {
              text: "护球时被两人夹击。球被捅走。你的肋骨还在发疼。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "B",
            sit: "balanced",
            text: "用节奏控制比赛，慢下来",
            check: { attrs: ["rhythm", "iq"], difficulty: 25, tag: "节奏+球商" },
            success: {
              text: "你放慢节奏。带球。不急。对方想提速，你偏不。看台的嘘声压下来。你不为所动。",
              effects: {
                reputation: 6,
                attrs: { rhythm: 1 }
              }
            },
            fail: {
              text: "你太慢了。对方逼抢到位。球被断了。你的脚背还在发麻。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "C",
            sit: "attack",
            text: "果断加速，打对方一个措手不及",
            check: { attrs: ["resolve", "burst"], difficulty: 33, tag: "决断+爆发" },
            success: {
              text: "你突然加速。对方愣了。你沿边线推进。底线。传中。反击打出来了。",
              effects: {
                reputation: 8,
                attrs: { resolve: 1 }
              }
            },
            fail: {
              text: "加速那一下被卡住。对方回防到位。机会没了。你的大腿在发酸。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "分球给队友，转移压力",
            check: { attrs: ["speed", "vision"], difficulty: 26, tag: "速度+视野" },
            success: {
              text: "你分球给后腰。压力转移了。对方逼抢扑空。球权稳住了。",
              effects: {
                reputation: 5,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "分球力量小了。对方伸脚一捅。险些被断。你后背发凉。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "回传给后卫，彻底稳住",
            check: { attrs: ["tackle", "hardness"], difficulty: 22, tag: "铲断+硬度" },
            success: {
              text: "你回传给后卫。彻底稳住。对方逼抢扑空了。教练在场边喊，好。",
              effects: {
                reputation: 4,
                attrs: { tackle: 1 }
              }
            },
            fail: {
              text: "回传力量小了。对方前锋伸脚一捅。险些被断。你后背发凉。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "对方边锋从你这侧突破。后卫线被打穿了。你回追。鞋钉刮着草皮，肺部灼烧。底线越来越近。草腥味灌进鼻腔。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "铲断他，哪怕犯规",
            check: { attrs: ["tackle", "hardness"], difficulty: 31, tag: "铲断+硬度" },
            success: {
              text: "你放铲。鞋钉刮过草皮。球和人一起倒了。裁判吹了哨。犯规。但球停了。值得。",
              effects: {
                reputation: 6,
                attrs: { tackle: 1 }
              }
            },
            fail: {
              text: "你铲空了。他从你头顶跳过去。你趴在草皮上。膝盖磕在地上。疼。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "卡住内线，逼他走外",
            check: { attrs: ["positioning", "iq"], difficulty: 27, tag: "站位+球商" },
            success: {
              text: "你卡住内线。他只能走外线。外线没有威胁。传中被中卫顶出去。你松了口气。",
              effects: {
                reputation: 6,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "你卡位慢了半步。他从内线抹过去。传中。禁区里一片混乱。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "用速度回追，从身后断球",
            check: { attrs: ["speed", "stamina"], difficulty: 30, tag: "速度+耐力" },
            success: {
              text: "你加速。肺在烧。三步。两步。你追上了。伸脚。球被你捅出去了。",
              effects: {
                reputation: 7,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "你追不上。腿太沉了。他抹进禁区。你只能看着他的背影。",
              effects: { stamina: -6 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "延缓他，等队友回防",
            check: { attrs: ["passing", "balance"], difficulty: 25, tag: "传球+平衡" },
            success: {
              text: "你不扑。跟着他。延缓。等。队友回防了。二打一。球权夺回。你分球。",
              effects: {
                reputation: 5,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "你延缓了，但队友没回来。他一个变向，你重心丢了。他抹过去了。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "E",
            sit: "balanced",
            text: "断球后直接发动反击",
            check: { attrs: ["shooting", "resolve"], difficulty: 29, tag: "射门+决断" },
            success: {
              text: "你断下球。抬头。门将站位靠前。你一脚吊射。球划过弧线。进了。",
              effects: {
                reputation: 9,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "吊射力量大了。球飞过横梁。你喘着粗气。",
              effects: { stamina: -3 }
            }
          }
        ]
      }
    ]
  },
LW_stopper: {
    desc: "逼抢、回追、铲抢",
    events: [
      {
        text: "对方中卫在后场拿球，犹豫了一下。草皮上还沾着露水。你从边路斜插上去，鞋钉刮过草皮。看台有人喊，抢他。",
        sit: "defense",
        choices: [
          { id: "A", sit: "attack", text: "预判他出球慢，上抢断球顺势内切抽射", check: { attrs: ["shooting", "burst"], difficulty: 36, tag: "射门+爆发" },
            success: { text: "你一个箭步上抢，球断在脚下，顺势内切拔脚。你{elementAdj}地抽射，球擦着近门柱钻进网窝。布澜门将扑了个空。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "断球那下趟大了。射门角度被封，球闷在后卫腿上，你的脚背还在发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】断球、内切、抽射一气呵成。球带着{elementAdj}的弧线砸进死角。对方后卫愣在原地。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "断球瞬间不调整，趟球走外线用速度强吃边后卫", check: { attrs: ["speed", "dribble"], difficulty: 34, tag: "速度+盘带" },
            success: { text: "你{elementAdj}地一趟，球从边后卫身侧滚过。你比他快半个身位，下底。", effects: { reputation: 9, attrs: { speed: 1 } } },
            fail: { text: "趟球那下没压住。球出了底线，你刹不住，肩膀撞在广告牌上。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "balanced", text: "不扑球，斜身卡住他给后腰的传球线路", check: { attrs: ["iq", "vision"], difficulty: 27, tag: "球商+视野" },
            success: { text: "你{elementAdj}地卡住线路。他被迫仓促长传，球速过快，直接出了边线。", effects: { reputation: 6, attrs: { iq: 1 } } },
            fail: { text: "你站位偏了半步。他一脚直塞从你身侧穿过，反击起来了。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "defense", text: "看准他停球大了，整个人放铲，鞋钉朝球去", check: { attrs: ["tackle", "hardness"], difficulty: 26, tag: "铲断+硬度" },
            success: { text: "你{elementAdj}地一记贴地铲。球被你捅出边线，草屑飞溅。", effects: { reputation: 6, attrs: { tackle: 1 } } },
            fail: { text: "铲抢扑空。他从你身上跨过去，你的大腿在草皮上蹭出一道火辣。", effects: { stamina: -5 } }
          },
          { id: "E", sit: "defense", text: "不伸脚，用肩膀和身位把他一点点挤向边线", check: { attrs: ["positioning", "balance"], difficulty: 24, tag: "站位+平衡" },
            success: { text: "你{elementAdj}地卡住身位。他被你逼到边线，球出了界。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "你重心没压住。他一个变向抹过，你踉跄两步才站稳。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "你压得太靠上，对方边锋断球反击。他沿着你身后的边路狂奔。风灌进耳朵。你转身回追，肺在烧。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "咬牙回追，看准他趟球那一下从侧后方放铲", check: { attrs: ["tackle", "intercept"], difficulty: 28, tag: "铲断+拦截" },
            success: { text: "你{elementAdj}地一记回追铲。球被你从脚下捅走，他摔在草皮上。", effects: { reputation: 7, attrs: { tackle: 1 } } },
            fail: { text: "你回追慢了半拍。铲抢扑空，他从你身上抹过，单刀了。", effects: { stamina: -6 } }
          },
          { id: "B", sit: "defense", text: "不放铲，靠速度硬生生追上，肩膀贴上他", check: { attrs: ["speed", "stamina"], difficulty: 32, tag: "速度+耐力" },
            success: { text: "你{elementAdj}地追平了他。肩膀一靠，他失了重心，球出了底线。", effects: { reputation: 7, attrs: { speed: 1 } } },
            fail: { text: "你追到一半腿软了。他加速甩开你，草腥味呛进喉咙。", effects: { stamina: -5 } }
          },
          { id: "C", sit: "balanced", text: "边回追边大声招呼后腰补位，自己只延误不冒进", check: { attrs: ["iq", "rhythm"], difficulty: 25, tag: "球商+节奏" },
            success: { text: "你{elementAdj}地延误住他。后腰及时到位，把球断下。", effects: { reputation: 5, attrs: { iq: 1 } } },
            fail: { text: "你喊晚了。后腰没补上，他内切进了禁区。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "attack", text: "预判他要回传，提前伸脚断球，抬头吊射出击的门将", check: { attrs: ["shooting", "power"], difficulty: 34, tag: "射门+力量" },
            success: { text: "你{elementAdj}地一脚吊射。球越过门将指尖坠入网窝。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "断球那下没断干净。吊射偏出，球砸在边网上。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】断球、抬头、吊射。球划出{elementAdj}的弧线坠入空门。全场沸腾。", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "E", sit: "defense", text: "回追中死死卡住内线，不给他内切的角度", check: { attrs: ["positioning", "balance"], difficulty: 23, tag: "站位+平衡" },
            success: { text: "你{elementAdj}地卡死内线。他只能走外，传中被中卫顶出。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "你内线让了半步。他内切抹进禁区，你只能拉人，吃了黄牌。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "中场边线附近，对方边前卫背身拿球。你贴上去，能闻到他球衣上的汗味。球在他脚下还没停稳。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "defense", text: "盯住他停球那一下，伸脚把球捅走", check: { attrs: ["intercept", "tackle"], difficulty: 24, tag: "拦截+铲断" },
            success: { text: "你{elementAdj}地一捅。球从他脚下滚走，你顺势带球推进。", effects: { reputation: 6, attrs: { intercept: 1 } } },
            fail: { text: "你伸脚慢了。他把球护住，反身把你撞开。", effects: { stamina: -3 } }
          },
          { id: "B", sit: "attack", text: "断球后不传，沿边线一路盘带连过两人", check: { attrs: ["dribble", "agility"], difficulty: 34, tag: "盘带+柔韧" },
            success: { text: "你{elementAdj}地连续变向。两名防守队员被你甩在身后，下底。", effects: { reputation: 9, attrs: { dribble: 1 } } },
            fail: { text: "盘带趟大了。补防的后卫把球捅走，你脚下一空。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "balanced", text: "不扑抢，斜身封住他向前传球的线路", check: { attrs: ["vision", "iq"], difficulty: 26, tag: "视野+球商" },
            success: { text: "你{elementAdj}地封住线路。他无奈回传，进攻被掐断。", effects: { reputation: 5, attrs: { vision: 1 } } },
            fail: { text: "你封错了方向。他一记直塞从你身后穿过。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "attack", text: "强硬夺下球，内切两步拔脚远射", check: { attrs: ["shooting", "power"], difficulty: 35, tag: "射门+力量" },
            success: { text: "你{elementAdj}地内切抽射。球贴着草皮窜入近角。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "内切没晃开角度。远射被封堵，球弹回来砸在你腿上。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】夺球、内切、抽射。球带着{elementAdj}的力量砸进死角。门将纹丝不动。", effects: { reputation: 19, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "E", sit: "balanced", text: "不急出脚，用身体扛住他，把球护在脚下等接应", check: { attrs: ["balance", "strength"], difficulty: 26, tag: "平衡+对抗" },
            success: { text: "你{elementAdj}地稳住重心。他撞不动你，队友到位接应。", effects: { reputation: 5, attrs: { balance: 1 } } },
            fail: { text: "你重心一晃。他趁机把球捅走，你踉跄倒地。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "对方开出角球，禁区里人挤人。你回防到后点，肩膀顶着对方的高中锋。汗珠滴进眼睛。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "卡住后点，迎着来球高高跃起头球解围", check: { attrs: ["heading", "positioning"], difficulty: 27, tag: "头球+站位" },
            success: { text: "你{elementAdj}地一记头槌。球被你顶出禁区，化解险情。", effects: { reputation: 6, attrs: { heading: 1 } } },
            fail: { text: "你起跳晚了。球从你头顶漏过，对方差点抢到。", effects: { stamina: -4 } }
          },
          { id: "B", sit: "defense", text: "球被顶到外围，对方迎球要射，你冲上去放铲封堵", check: { attrs: ["tackle", "hardness"], difficulty: 25, tag: "铲断+硬度" },
            success: { text: "你{elementAdj}地一记飞铲。球被你连人带球铲出底线。", effects: { reputation: 6, attrs: { tackle: 1 } } },
            fail: { text: "铲抢没铲到球。他扣过你，重新组织。", effects: { stamina: -5 } }
          },
          { id: "C", sit: "balanced", text: "抢到落点后不慌，把球分给边路插上的队友", check: { attrs: ["passing", "vision"], difficulty: 27, tag: "传球+视野" },
            success: { text: "你{elementAdj}地一脚分球。球精准找到队友，反击打出来了。", effects: { reputation: 6, attrs: { passing: 1 } } },
            fail: { text: "分球力量大了。球出了边线，队友摊手。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "attack", text: "解围球落到你脚下，带球长驱直入禁区外拔脚", check: { attrs: ["shooting", "burst"], difficulty: 35, tag: "射门+爆发" },
            success: { text: "你{elementAdj}地一脚远射。球应声入网，门将扑救不及。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "带球趟大了。远射偏出立柱，你大口喘气。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你带球狂奔半场，一脚{elementAdj}的远射轰入死角。看台炸了。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "E", sit: "defense", text: "解围后发现边路空了，转身狂奔回补位", check: { attrs: ["speed", "stamina"], difficulty: 29, tag: "速度+耐力" },
            success: { text: "你{elementAdj}地回追到位。对方边锋刚要拿球，你已经卡住。", effects: { reputation: 5, attrs: { speed: 1 } } },
            fail: { text: "你回追到一半抽筋了。空当被利用，传中进来。", effects: { stamina: -5 } }
          }
        ]
      },
      {
        text: "对方后腰在中圈带球推进。你从边路斜插回来，草皮被鞋钉掀起。这是你最喜欢的绞杀距离。",
        sit: "attack",
        choices: [
          { id: "A", sit: "defense", text: "看准他带球的节奏，伸脚把球拦下", check: { attrs: ["intercept", "tackle"], difficulty: 25, tag: "拦截+铲断" },
            success: { text: "你{elementAdj}地一记拦截。球被你断在脚下，他扑了个空。", effects: { reputation: 6, attrs: { intercept: 1 } } },
            fail: { text: "你伸脚早了。他变向抹过，你重心丢了。", effects: { stamina: -4 } }
          },
          { id: "B", sit: "attack", text: "断球瞬间提速，沿边路一路狂奔下底", check: { attrs: ["speed", "dribble"], difficulty: 34, tag: "速度+盘带" },
            success: { text: "你{elementAdj}地高速推进。防守队员追不上你，下底成功。", effects: { reputation: 9, attrs: { speed: 1 } } },
            fail: { text: "带球速度太快没压住。球出了底线，你刹不住脚。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "balanced", text: "断球抬头，一脚直塞找前插的队友", check: { attrs: ["passing", "vision"], difficulty: 28, tag: "传球+视野" },
            success: { text: "你{elementAdj}地一记直塞。球撕开防线，队友形成单刀。", effects: { reputation: 8, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "直塞力量小了。后卫抢先一步把球断走。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "attack", text: "断球后不传，内切两步直接拔脚抽射", check: { attrs: ["shooting", "power"], difficulty: 36, tag: "射门+力量" },
            success: { text: "你{elementAdj}地内切抽射。球钻入网窝，门将扑错了方向。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "内切角度太小。射门被门将封出，球弹在你身上。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】断球、内切、爆射。球带着{elementAdj}的弧线砸进死角。教练挥拳怒吼。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "E", sit: "defense", text: "不伸脚，卡住身位把他逼向边线", check: { attrs: ["positioning", "iq"], difficulty: 23, tag: "站位+球商" },
            success: { text: "你{elementAdj}地卡住位置。他无路可走，只能回传。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "你站位偏了。他一脚直塞打穿，反击起来。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "补时最后一分钟，你队领先一球。对方全线压上，边路传中吊进禁区。你的腿像灌了铅，汗水糊住眼睛。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "回防到禁区，卡住对方前锋迎球争顶", check: { attrs: ["heading", "balance"], difficulty: 28, tag: "头球+平衡" },
            success: { text: "你{elementAdj}地一记头槌。球被你顶出危险区，时间到了。", effects: { reputation: 7, attrs: { heading: 1 } } },
            fail: { text: "你被卡在身后。对方抢到点，幸好顶偏了。", effects: { stamina: -5 } }
          },
          { id: "B", sit: "defense", text: "第二落点落到对方脚下，你拼尽最后力气放铲", check: { attrs: ["tackle", "hardness"], difficulty: 27, tag: "铲断+硬度" },
            success: { text: "你{elementAdj}地一记飞铲。球被你铲出边线，全场欢呼。", effects: { reputation: 7, attrs: { tackle: 1 } } },
            fail: { text: "你腿已经没力了。铲抢扑空，他扣过你。", effects: { stamina: -6 } }
          },
          { id: "C", sit: "balanced", text: "球到脚下不急，控住往角旗区带，耗时间", check: { attrs: ["rhythm", "iq"], difficulty: 24, tag: "节奏+球商" },
            success: { text: "你{elementAdj}地控住节奏。对方抢不下球，哨声响起。", effects: { reputation: 6, attrs: { rhythm: 1 } } },
            fail: { text: "你护球大意了。对方捅走球，险些被绝平。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "attack", text: "解围球到脚下，见门将压上，带球狂奔射空门", check: { attrs: ["shooting", "burst"], difficulty: 34, tag: "射门+爆发" },
            success: { text: "你{elementAdj}地推射空门。球滚入网窝，锁定胜局。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "你带球到一半被回追的后卫追上，球被捅走。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】你带球狂奔整条边路，{elementAdj}地推射空门。绝杀。所有人都冲向你。", effects: { reputation: 21, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "E", sit: "defense", text: "对方边锋突破，你拖着抽筋的腿回追", check: { attrs: ["stamina", "speed"], difficulty: 30, tag: "耐力+速度" },
            success: { text: "你{elementAdj}地咬牙追上。肩膀一靠，把球挤出底线。", effects: { reputation: 6, attrs: { stamina: 1 } } },
            fail: { text: "你腿一软摔倒了。对方下底传中，禁区一片混乱。", effects: { stamina: -6 } }
          }
        ]
      },
{
        text: "对方边后卫在后场拿球，准备出球。你从边路压上去。草皮上还沾着露水。鞋钉刮过草皮。看台有人喊，抢他。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "正面逼抢，不给他出球空间",
            check: { attrs: ["tackle", "strength"], difficulty: 29, tag: "铲断+对抗" },
            success: {
              text: "你贴上去。肩膀顶着肩膀。他出不了球。慌乱中一脚长传，出了边线。球权是你的。",
              effects: {
                reputation: 7,
                attrs: { tackle: 1 }
              }
            },
            fail: {
              text: "你扑太猛了。他一个变向，你重心丢了。他从你身侧抹过去。你的膝盖在发酸。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "用速度追上他，从身后铲断",
            check: { attrs: ["speed", "stamina"], difficulty: 30, tag: "速度+耐力" },
            success: {
              text: "你加速。三步。两步。追上了。放铲。鞋钉刮过草皮。球被你捅出去了。干净。",
              effects: {
                reputation: 7,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "你追不上。腿太沉了。他从容出球。你只能看着球飞走。肺在烧。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "逼抢后断球，直接发动反击",
            check: { attrs: ["passing", "vision"], difficulty: 28, tag: "传球+视野" },
            success: {
              text: "你断下球。抬头。前场有空当。一脚长传。反击打出来了。",
              effects: {
                reputation: 8,
                assists: 1,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "长传力量大了。球飞出边线。你喘着粗气。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "attack",
            text: "断球后带球突入禁区",
            check: { attrs: ["shooting", "burst"], difficulty: 34, tag: "射门+爆发" },
            success: {
              text: "你断下球。面前一片开阔。带球。突入禁区。起脚。球贴着门柱钻进去。",
              effects: {
                reputation: 11,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "带球多趟了一步。后卫回防到位。射门被挡。你的脚背还在发麻。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地断球突入禁区。抽射。球砸入死角。门将纹丝不动。看台炸了。",
              effects: {
                reputation: 19,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "卡住传球线路，逼他犯错",
            check: { attrs: ["heading", "iq"], difficulty: 27, tag: "头球+球商" },
            success: {
              text: "你不扑。卡住线路。他犹豫了。传球。你伸脚。断了。球权夺回。",
              effects: {
                reputation: 7,
                attrs: { heading: 1 }
              }
            },
            fail: {
              text: "你卡位了，但他传了另一条线。你扑空了。球从你脚边滚过。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "对方边锋内切。他从你身侧抹过去。草皮被鞋钉翻起。你的心脏在擂鼓。不能让他进禁区。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "从身后放铲，连人带球",
            check: { attrs: ["tackle", "hardness"], difficulty: 32, tag: "铲断+硬度" },
            success: {
              text: "你放铲。鞋钉刮过草皮。球和人一起倒了。裁判吹了哨。犯规。但球停了。值得。",
              effects: {
                reputation: 6,
                attrs: { tackle: 1 }
              }
            },
            fail: {
              text: "你铲空了。他从你头顶跳过去。你趴在草皮上。膝盖磕在地上。疼。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "卡住内线，不给他射门角度",
            check: { attrs: ["positioning", "iq"], difficulty: 26, tag: "站位+球商" },
            success: {
              text: "你卡住内线。他只能走外线。射门角度没了。他犹豫了。你伸脚。断了。",
              effects: {
                reputation: 6,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "你卡位慢了。他从内线抹过去。起脚。射门。你的心脏在擂鼓。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "用速度回追，从身后断球",
            check: { attrs: ["speed", "stamina"], difficulty: 30, tag: "速度+耐力" },
            success: {
              text: "你加速回追。三步。两步。追上了。伸脚。球被你捅出去了。干净。",
              effects: {
                reputation: 7,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "你追不上。腿太沉了。他抹进禁区。你只能看着他的背影。肺在烧。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "延缓他，等队友回防包夹",
            check: { attrs: ["rhythm", "pressure"], difficulty: 25, tag: "节奏+抗压" },
            success: {
              text: "你不扑。跟着他。延缓。等。队友回防了。二打一。球权夺回。",
              effects: {
                reputation: 5,
                attrs: { rhythm: 1 }
              }
            },
            fail: {
              text: "你延缓了，但队友没回来。他一个变向抹过去了。你只能追。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "E",
            sit: "attack",
            text: "断球后沿边路快速反击射门",
            check: { attrs: ["shooting", "resolve"], difficulty: 31, tag: "射门+决断" },
            success: {
              text: "你断下球。沿边路狂奔。风灌进耳朵。肺在烧。你杀到对方半场。起脚。进了。",
              effects: {
                reputation: 10,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "你跑了二十米，腿软了。射门绵软无力。被门将轻松摘下。你弯着腰喘气。",
              effects: { stamina: -5 }
            }
          }
        ]
      },
{
        text: "中场边线附近。球弹来弹去。二点球。你和对方同时伸脚。草皮被鞋钉翻得稀烂。泥土的腥气直冲鼻腔。",
        sit: "balanced",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "伸脚捅球，抢先一步",
            check: { attrs: ["intercept", "iq"], difficulty: 27, tag: "拦截+球商" },
            success: {
              text: "你伸脚。快了半步。球被你捅到了。球权夺回。草皮上的鞋钉印还冒着热气。",
              effects: {
                reputation: 6,
                attrs: { intercept: 1 }
              }
            },
            fail: {
              text: "你慢了半步。他先捅到了。球弹出去。你的脚踝还在发麻。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "抢到球后带球推进",
            check: { attrs: ["dribble", "speed"], difficulty: 31, tag: "盘带+速度" },
            success: {
              text: "你抢到球。带球推进。面前一片开阔。风灌进耳朵。你杀到前场。",
              effects: {
                reputation: 8,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "带球多趟了一步。对方回防到位。球被断了。你的脚踝还在发酸。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "抢到球后快速分球转移",
            check: { attrs: ["passing", "vision"], difficulty: 26, tag: "传球+视野" },
            success: {
              text: "你抢到球。抬头。弱侧有空当。一脚转移。球飞过去了。空间出来了。",
              effects: {
                reputation: 7,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "转移力量大了。球飞出边线。你喘着粗气。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "attack",
            text: "抢到球后直接远射",
            check: { attrs: ["shooting", "power"], difficulty: 33, tag: "射门+力量" },
            success: {
              text: "你抢到球。抬头。门将站位靠前。起脚。球像炮弹砸向球门。进了。",
              effects: {
                reputation: 10,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "射门打偏了。球飞过横梁。你的脚背还在发麻。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "抢不到就用身体卡住他",
            check: { attrs: ["heading", "pressure"], difficulty: 24, tag: "头球+抗压" },
            success: {
              text: "你卡住身位。他挤不过你。球弹出去了。你的。草皮上的鞋钉印还冒着热气。",
              effects: {
                reputation: 4,
                attrs: { heading: 1 }
              }
            },
            fail: {
              text: "你卡位了，但他比你壮。他把你挤开了。球到了他脚下。你的肩膀还在发麻。",
              effects: { stamina: -4 }
            }
          }
        ]
      },
{
        text: "断球了。球到了你脚下。面前是大片空当。对方防线压得很高，回追的只有一个人。风灌进耳朵。草腥味混着汗味。",
        sit: "attack",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "沿边路全速推进，下底传中",
            check: { attrs: ["speed", "stamina"], difficulty: 34, tag: "速度+耐力" },
            success: {
              text: "你沿边线狂奔。肺在烧，但腿还在动。底线。传中。球划出一道弧线飞向禁区。",
              effects: {
                reputation: 10,
                assists: 1,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "跑到三十米时腿软了。传中绵软无力。被门将轻松摘下。你弯着腰喘气。",
              effects: { stamina: -5 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地撕开整条边路。底线传中。球像长了眼睛。看台全站起来了。",
              effects: {
                reputation: 18,
                assists: 1,
                attrs: { speed: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "内切射门，直接终结",
            check: { attrs: ["shooting", "burst"], difficulty: 36, tag: "射门+爆发" },
            success: {
              text: "你内收。后卫退得太深。起脚。球贴着门柱钻进去。网绳在晃。",
              effects: {
                reputation: 12,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "射门被后卫伸脚挡了。球弹出去。你的脚背还在发麻。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地内切抽射。球带着弧线砸入死角。门将纹丝不动。全场站起来。",
              effects: {
                reputation: 20,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "分球给中路插上的队友",
            check: { attrs: ["passing", "vision"], difficulty: 29, tag: "传球+视野" },
            success: {
              text: "你抬头一扫。中路，队友正在前插。一脚直塞。球到人到。反击打出来了。",
              effects: {
                reputation: 8,
                assists: 1,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "直塞力量大了。球从队友脚边滚过。出了底线。你喘着粗气。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "attack",
            text: "卡住身位护球，等队友插上",
            check: { attrs: ["positioning", "balance"], difficulty: 35, tag: "站位+平衡" },
            success: {
              text: "你卡住身位。后卫撞上来，你纹丝不动。队友插上来了。你分球。单刀。",
              effects: {
                reputation: 10,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "你卡位了，但后卫把你挤开了。球弹出去。你的肩膀还在发麻。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "不冒险，回传稳住球权",
            check: { attrs: ["strength", "pressure"], difficulty: 22, tag: "对抗+抗压" },
            success: {
              text: "你回传给后腰。不急。球权稳住了。教练在场边点头。",
              effects: {
                reputation: 4,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "回传力量小了。对方前锋伸脚一捅。险些被断。你后背发凉。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "对方边路套上配合。边后卫和边锋二过一。球从你脚边滚过。他们沿边线推进。草皮被鞋钉翻起。底线越来越近。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "回追边锋，从身后铲断",
            check: { attrs: ["tackle", "speed"], difficulty: 31, tag: "铲断+速度" },
            success: {
              text: "你加速回追。三步。两步。追上了。放铲。鞋钉刮过草皮。球被你捅出去了。",
              effects: {
                reputation: 7,
                attrs: { tackle: 1 }
              }
            },
            fail: {
              text: "你追不上。腿太沉了。他抹进禁区。你只能看着他的背影。肺在烧。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "卡住传中线路，封堵出球",
            check: { attrs: ["positioning", "iq"], difficulty: 27, tag: "站位+球商" },
            success: {
              text: "你不追人。卡住线路。他传中。你伸脚。球被你挡出去了。解围。",
              effects: {
                reputation: 6,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "你卡位了，但他传了另一条线。球从你脚边飞过。禁区里一片混乱。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "用速度追上他，挤他出边线",
            check: { attrs: ["speed", "stamina"], difficulty: 29, tag: "速度+耐力" },
            success: {
              text: "你加速。追上他。肩膀一横。硬生生把他挤向边线。他出不了。球出了边线。你的。",
              effects: {
                reputation: 6,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "你追不上。他一个变向，你重心丢了。他抹进禁区。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "延缓他，等队友回防包夹",
            check: { attrs: ["rhythm", "pressure"], difficulty: 25, tag: "节奏+抗压" },
            success: {
              text: "你不扑。跟着他。延缓。等。队友回防了。二打一。球权夺回。",
              effects: {
                reputation: 5,
                attrs: { rhythm: 1 }
              }
            },
            fail: {
              text: "你延缓了，但队友没回来。他一个变向抹过去了。你只能追。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "E",
            sit: "balanced",
            text: "断球后果断吊射",
            check: { attrs: ["shooting", "resolve"], difficulty: 28, tag: "射门+决断" },
            success: {
              text: "你断下球。抬头。门将站位靠前。你一脚吊射。球划过弧线。进了。",
              effects: {
                reputation: 9,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "吊射力量大了。球飞过横梁。你喘着粗气。",
              effects: { stamina: -3 }
            }
          }
        ]
      }
    ]
  },
  LW_cover: {
    desc: "补位、稳健、控制",
    events: [
      {
        text: "你队边后卫助攻上去回不来，边路留下一大片空当。对方边锋正盯着这块空地。你不动声色地往回收。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "预判传球路线，提前站到位卡住他接球", check: { attrs: ["positioning", "iq"], difficulty: 24, tag: "站位+球商" },
            success: { text: "你{elementAdj}地卡住位置。球传过来，你抢先一步把球拿下。", effects: { reputation: 6, attrs: { positioning: 1 } } },
            fail: { text: "你站位慢了半步。他接到球，已经面对球门。", effects: { stamina: -3 } }
          },
          { id: "B", sit: "defense", text: "等他停球，不慌不忙伸脚把球捅走", check: { attrs: ["intercept", "tackle"], difficulty: 25, tag: "拦截+铲断" },
            success: { text: "你{elementAdj}地一记拦截。球被你稳稳断下，没有犯规。", effects: { reputation: 6, attrs: { intercept: 1 } } },
            fail: { text: "你伸脚急了。他扣过你，下底传中。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "balanced", text: "断球后不冒进，回做给后腰重新组织", check: { attrs: ["passing", "rhythm"], difficulty: 26, tag: "传球+节奏" },
            success: { text: "你{elementAdj}地一记回做。球权稳住，进攻重新铺开。", effects: { reputation: 5, attrs: { passing: 1 } } },
            fail: { text: "回做力量小了。对方上抢，险些断走。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "attack", text: "断球后顺势沿边路盘带推进过一人", check: { attrs: ["dribble", "speed"], difficulty: 33, tag: "盘带+速度" },
            success: { text: "你{elementAdj}地盘带推进。一名防守队员被你晃过，进攻打开。", effects: { reputation: 8, attrs: { dribble: 1 } } },
            fail: { text: "盘带被断。对方反抢，你脚下丢球。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "attack", text: "对方压上后防线空虚，内切一步拔脚远射", check: { attrs: ["shooting", "power"], difficulty: 34, tag: "射门+力量" },
            success: { text: "你{elementAdj}地一脚远射。球擦着立柱入网。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "远射发力过猛。球高出横梁，你摇头。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你内切爆射。球带着{elementAdj}的弧线砸进死角。门将目送。", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          }
        ]
      },
      {
        text: "对方在中场倒脚，看似漫无目的。你站在边路，眼睛却盯着他们后腰的脚。你闻到了危险的味道。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "defense", text: "读懂他的眼神，提前移动把传球拦下", check: { attrs: ["iq", "vision"], difficulty: 27, tag: "球商+视野" },
            success: { text: "你{elementAdj}地一记预判拦截。球正落在你脚下，反击机会。", effects: { reputation: 7, attrs: { iq: 1 } } },
            fail: { text: "你判断错了方向。球从另一侧传出去。", effects: { stamina: -3 } }
          },
          { id: "B", sit: "attack", text: "断球瞬间提速，沿边路一路狂奔", check: { attrs: ["speed", "dribble"], difficulty: 34, tag: "速度+盘带" },
            success: { text: "你{elementAdj}地高速推进。防守队员被你甩开，下底。", effects: { reputation: 9, attrs: { speed: 1 } } },
            fail: { text: "提速那下没压住球。球出了边线。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "balanced", text: "断球后对方反抢，你用身体扛住护球", check: { attrs: ["strength", "balance"], difficulty: 26, tag: "对抗+平衡" },
            success: { text: "你{elementAdj}地扛住对抗。球稳稳护在脚下，等队友跑位。", effects: { reputation: 5, attrs: { strength: 1 } } },
            fail: { text: "你被挤开了。球丢了，对方反抢成功。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "attack", text: "断球后内切，禁区外拔脚远射", check: { attrs: ["shooting", "burst"], difficulty: 35, tag: "射门+爆发" },
            success: { text: "你{elementAdj}地一脚远射。球应声入网。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "远射被后卫封堵。球闷回来，你脚背发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你内切爆射。球带着{elementAdj}的力量轰入死角。全场起立。", effects: { reputation: 19, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "E", sit: "defense", text: "不急上抢，站住位置封住边路通道", check: { attrs: ["positioning", "balance"], difficulty: 23, tag: "站位+平衡" },
            success: { text: "你{elementAdj}地卡住通道。对方边锋无从突破，只能回传。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "你站位偏了。他抹过你，下底。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "你队领先，比赛进入相持。球到了你脚下的边路。对方不紧不慢地逼上来。看台有人喊，稳住。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "balanced", text: "不急，控住球回做给后腰重新组织", check: { attrs: ["rhythm", "passing"], difficulty: 24, tag: "节奏+传球" },
            success: { text: "你{elementAdj}地控住节奏。球权稳住，对方扑空。", effects: { reputation: 5, attrs: { rhythm: 1 } } },
            fail: { text: "你控球大意。对方上抢，险些丢球。", effects: { stamina: -3 } }
          },
          { id: "B", sit: "balanced", text: "对方贴身逼抢，你用身体护住球稳稳不丢", check: { attrs: ["balance", "strength"], difficulty: 25, tag: "平衡+对抗" },
            success: { text: "你{elementAdj}地稳住重心。他抢不下球，只能犯规。", effects: { reputation: 5, attrs: { balance: 1 } } },
            fail: { text: "你重心一晃。球被捅走，对方反击。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "attack", text: "假装回做，突然提速盘带抹过逼抢的对手", check: { attrs: ["dribble", "agility"], difficulty: 34, tag: "盘带+柔韧" },
            success: { text: "你{elementAdj}地盘带突破。对手被你晃过，下底成功。", effects: { reputation: 9, attrs: { dribble: 1 } } },
            fail: { text: "突破趟大了。补防的后卫把球断走。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "attack", text: "控住球，对方以为你要回做，你却内切拔脚", check: { attrs: ["shooting", "power"], difficulty: 35, tag: "射门+力量" },
            success: { text: "你{elementAdj}地内切抽射。球钻入近角。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "内切没晃开角度。射门被封堵。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你假传真射，{elementAdj}地爆射死角。门将扑了个空。", effects: { reputation: 19, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "E", sit: "defense", text: "万一丢球，立刻就地反抢", check: { attrs: ["tackle", "intercept"], difficulty: 24, tag: "铲断+拦截" },
            success: { text: "你{elementAdj}地反抢成功。一记干净铲断，球权夺回。", effects: { reputation: 5, attrs: { tackle: 1 } } },
            fail: { text: "反抢扑空。对方顺势推进，你回追。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "中卫被对方前锋带出位置，肋部露出空当。你从边路收回来补位。草皮上的鞋钉印还冒着热气。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "补到肋部站住位置，卡住对方前锋的接球", check: { attrs: ["positioning", "balance"], difficulty: 25, tag: "站位+平衡" },
            success: { text: "你{elementAdj}地卡住肋部。前锋接不到球，进攻停滞。", effects: { reputation: 6, attrs: { positioning: 1 } } },
            fail: { text: "你补位慢了。前锋接到球，已经转身面对球门。", effects: { stamina: -4 } }
          },
          { id: "B", sit: "defense", text: "前锋硬突，你看准时机伸脚把球断下", check: { attrs: ["tackle", "strength"], difficulty: 27, tag: "铲断+对抗" },
            success: { text: "你{elementAdj}地一记铲断。球被你捅走，化解单刀。", effects: { reputation: 7, attrs: { tackle: 1 } } },
            fail: { text: "你铲抢扑空。他抹过你，射门。", effects: { stamina: -5 } }
          },
          { id: "C", sit: "balanced", text: "断球后不慌，把球回给门将重新组织", check: { attrs: ["passing", "iq"], difficulty: 26, tag: "传球+球商" },
            success: { text: "你{elementAdj}地一记回传。球权稳住，防线松了口气。", effects: { reputation: 5, attrs: { passing: 1 } } },
            fail: { text: "回传力量小了。对方上抢，门将险象环生。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "attack", text: "断球后顺势带球推进，沿边路反击", check: { attrs: ["speed", "dribble"], difficulty: 33, tag: "速度+盘带" },
            success: { text: "你{elementAdj}地带球推进。防守没追上，反击打出。", effects: { reputation: 8, attrs: { speed: 1 } } },
            fail: { text: "带球被断。对方反抢，你脚下丢球。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "attack", text: "断球抬头见门将站位靠前，拔脚吊射", check: { attrs: ["shooting", "power"], difficulty: 35, tag: "射门+力量" },
            success: { text: "你{elementAdj}地一脚吊射。球越过门将坠入网窝。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "吊射力量大了。球越过横梁，你叹气。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你后场吊射。球划出{elementAdj}的弧线坠入空门。门将回追不及。", effects: { reputation: 19, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          }
        ]
      },
      {
        text: "对方前场任意球。你站在人墙边，眼睛盯着罚球点。汗顺着下巴滴下。你负责盯后点插上的那个人。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "球开到后点，你卡住对方迎球争顶", check: { attrs: ["heading", "positioning"], difficulty: 27, tag: "头球+站位" },
            success: { text: "你{elementAdj}地一记头槌。球被你顶出禁区。", effects: { reputation: 6, attrs: { heading: 1 } } },
            fail: { text: "你被卡在身后。对方抢到点，顶偏了。", effects: { stamina: -4 } }
          },
          { id: "B", sit: "defense", text: "球被顶到外围，对方迎球要射，你冲上去封堵", check: { attrs: ["intercept", "tackle"], difficulty: 25, tag: "拦截+铲断" },
            success: { text: "你{elementAdj}地一记封堵。球被你挡出底线。", effects: { reputation: 6, attrs: { intercept: 1 } } },
            fail: { text: "你封堵慢了。他扣过你，重新组织。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "balanced", text: "球到脚下，控住往边路带，耗时间", check: { attrs: ["rhythm", "passing"], difficulty: 24, tag: "节奏+传球" },
            success: { text: "你{elementAdj}地控住节奏。对方抢不下，时间流逝。", effects: { reputation: 5, attrs: { rhythm: 1 } } },
            fail: { text: "你护球大意。对方捅走，险情再起。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "attack", text: "解围球到脚下，顺势盘带推进反击", check: { attrs: ["dribble", "speed"], difficulty: 33, tag: "盘带+速度" },
            success: { text: "你{elementAdj}地盘带推进。两名对手被你甩开。", effects: { reputation: 8, attrs: { dribble: 1 } } },
            fail: { text: "盘带被断。对方反抢成功。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "attack", text: "解围后带球推进，禁区外拔脚远射", check: { attrs: ["shooting", "burst"], difficulty: 34, tag: "射门+爆发" },
            success: { text: "你{elementAdj}地一脚远射。球擦柱入网。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "远射偏出。球砸在边网上。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你解围后长途奔袭，{elementAdj}地爆射破门。绝处逢生。", effects: { reputation: 19, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          }
        ]
      },
      {
        text: "对方边后卫助攻上来，与你形成一对一。他不紧不慢地带球逼近。你能听见自己的呼吸。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "defense", text: "不冒进，且战且退卡住内线等他出错", check: { attrs: ["positioning", "balance"], difficulty: 24, tag: "站位+平衡" },
            success: { text: "你{elementAdj}地稳住。他久攻不下，传球失误。", effects: { reputation: 6, attrs: { positioning: 1 } } },
            fail: { text: "你退得太多。他内切进了禁区。", effects: { stamina: -3 } }
          },
          { id: "B", sit: "defense", text: "他趟球大了，你果断伸脚把球断下", check: { attrs: ["tackle", "intercept"], difficulty: 26, tag: "铲断+拦截" },
            success: { text: "你{elementAdj}地一记断球。球被你捅走，反击机会。", effects: { reputation: 6, attrs: { tackle: 1 } } },
            fail: { text: "你伸脚急了。他扣过你，下底。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "balanced", text: "断球后抬头，一脚分球找中路的队友", check: { attrs: ["passing", "vision"], difficulty: 27, tag: "传球+视野" },
            success: { text: "你{elementAdj}地一记分球。球精准到位，进攻铺开。", effects: { reputation: 6, attrs: { passing: 1 } } },
            fail: { text: "分球被断。对方反抢，你回追。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "attack", text: "断球后顺势盘带，抹过补防的对手下底", check: { attrs: ["dribble", "agility"], difficulty: 34, tag: "盘带+柔韧" },
            success: { text: "你{elementAdj}地盘带突破。对手被你晃过，传中。", effects: { reputation: 9, attrs: { dribble: 1 } } },
            fail: { text: "盘带趟大。球出了底线。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "attack", text: "假意下底，突然内切拔脚抽射", check: { attrs: ["shooting", "power"], difficulty: 36, tag: "射门+力量" },
            success: { text: "你{elementAdj}地内切抽射。球钻入远角。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "内切角度小。射门被门将封出。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你内切爆射。球带着{elementAdj}的弧线砸进死角。门将纹丝不动。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          }
        ]
      },
{
        text: "对方一记长传，打向边路身后。你提前判断到了。草腥味混着汗味。你往回收了两步。球飞过来了。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "提前卡位，头球解围",
            check: { attrs: ["heading", "positioning"], difficulty: 29, tag: "头球+站位" },
            success: {
              text: "你卡住身位。起跳。额头撞上皮球。闷响。球飞出去了。解围。你松了口气。",
              effects: {
                reputation: 7,
                attrs: { heading: 1 }
              }
            },
            fail: {
              text: "起跳时机差了。球从你头顶飞过。对方边锋抢到了。你的心脏在擂鼓。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "卡住身位，用身体挡住对方",
            check: { attrs: ["strength", "balance"], difficulty: 27, tag: "对抗+平衡" },
            success: {
              text: "你肩膀一横。卡住身位。他挤不过你。球弹出去了。你的。",
              effects: {
                reputation: 6,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "你被挤开了。他从你身侧抹过去。球到了他脚下。你的肩膀还在发麻。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "果断出脚，把球捅出去",
            check: { attrs: ["resolve", "iq"], difficulty: 26, tag: "决断+球商" },
            success: {
              text: "你果断伸脚。快了半步。球被你捅出去了。解围。草皮上的鞋钉印还冒着热气。",
              effects: {
                reputation: 6,
                attrs: { resolve: 1 }
              }
            },
            fail: {
              text: "你慢了半步。球从你脚边滚过。对方边锋抢到了。你的脚踝还在发麻。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "解围后分球，发动反击",
            check: { attrs: ["passing", "vision"], difficulty: 27, tag: "传球+视野" },
            success: {
              text: "你解围。抬头。前场有空当。一脚长传。反击打出来了。",
              effects: {
                reputation: 7,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "长传力量大了。球飞出边线。你喘着粗气。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "balanced",
            text: "解围后带球推进",
            check: { attrs: ["dribble", "speed"], difficulty: 30, tag: "盘带+速度" },
            success: {
              text: "你解围后带球推进。面前一片开阔。风灌进耳朵。你杀到前场。",
              effects: {
                reputation: 7,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "带球多趟了一步。对方回防到位。球被断了。你的脚踝还在发酸。",
              effects: { stamina: -4 }
            }
          }
        ]
      },
{
        text: "后场出球被压迫。门将把球传给你。对方两名前锋逼上来。草腥味呛进喉咙。看台在嘘。出球线路被掐得死死的。",
        sit: "balanced",
        choices: [
          {
            id: "A",
            sit: "balanced",
            text: "背身护球，等队友跑位",
            check: { attrs: ["strength", "pressure"], difficulty: 26, tag: "对抗+抗压" },
            success: {
              text: "你背身护住球。肩膀顶着逼抢的人。等。队友跑出来了。你分球。球权稳住了。",
              effects: {
                reputation: 6,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "护球时被两人夹击。球被捅走。你的肋骨还在发疼。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "B",
            sit: "balanced",
            text: "一脚出球，快速转移给弱侧",
            check: { attrs: ["passing", "vision"], difficulty: 28, tag: "传球+视野" },
            success: {
              text: "你不停球。一脚转移。球飞过中场。到了弱侧。对方逼抢扑空了。",
              effects: {
                reputation: 7,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "转移力量大了。球飞出边线。你喘着粗气。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "用站位骗过逼抢，转身出球",
            check: { attrs: ["positioning", "iq"], difficulty: 25, tag: "站位+球商" },
            success: {
              text: "你侧身站位。他们以为你要回传。你突然转身。抹过去了。面前一片开阔。",
              effects: {
                reputation: 6,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "他们没被骗到。纹丝不动。你被围住了。球被断了。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "D",
            sit: "attack",
            text: "带球突破，撕开逼抢",
            check: { attrs: ["dribble", "agility"], difficulty: 33, tag: "盘带+柔韧" },
            success: {
              text: "你拨球变向。第一个人被晃过。第二个人伸脚，你挑球越过。抹过去了。",
              effects: {
                reputation: 9,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "带球那一下被卡住。球弹出去。你的脚踝还在发麻。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "回传给门将，先稳住",
            check: { attrs: ["shooting", "resolve"], difficulty: 22, tag: "射门+决断" },
            success: {
              text: "你回传给门将。不急。先稳住。对方逼抢扑空了。教练在场边喊，好。",
              effects: {
                reputation: 4,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "回传力量小了。对方前锋伸脚一捅。险些被断。你后背发凉。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "对方边路二过一。球从你脚边滚过。边后卫被过了。你补上去。草皮被鞋钉翻起。底线越来越近。汗珠滴进眼睛。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "卡住传中线路，封堵出球",
            check: { attrs: ["intercept", "positioning"], difficulty: 28, tag: "拦截+站位" },
            success: {
              text: "你不追人。卡住线路。他传中。你伸脚。球被你挡出去了。解围。",
              effects: {
                reputation: 7,
                attrs: { intercept: 1 }
              }
            },
            fail: {
              text: "你卡位了，但他传了另一条线。球从你脚边飞过。禁区里一片混乱。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "用身体扛住他，挤他出边线",
            check: { attrs: ["pressure", "hardness"], difficulty: 31, tag: "抗压+硬度" },
            success: {
              text: "你肩膀一横。硬生生把他挤向边线。他出不了。球出了边线。你的。",
              effects: {
                reputation: 6,
                attrs: { pressure: 1 }
              }
            },
            fail: {
              text: "你顶不动他。他一个变向，你重心丢了。他抹进禁区。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "用速度回追，从身后断球",
            check: { attrs: ["speed", "stamina"], difficulty: 30, tag: "速度+耐力" },
            success: {
              text: "你加速回追。三步。两步。追上了。伸脚。球被你捅出去了。",
              effects: {
                reputation: 7,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "你追不上。腿太沉了。他抹进禁区。你只能看着他的背影。肺在烧。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "延缓他，等队友回防",
            check: { attrs: ["rhythm", "iq"], difficulty: 24, tag: "节奏+球商" },
            success: {
              text: "你不扑。跟着他。延缓。等。队友回防了。二打一。球权夺回。",
              effects: {
                reputation: 5,
                attrs: { rhythm: 1 }
              }
            },
            fail: {
              text: "你延缓了，但队友没回来。他一个变向抹过去了。你只能追。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "E",
            sit: "balanced",
            text: "断球后果断吊射",
            check: { attrs: ["shooting", "resolve"], difficulty: 27, tag: "射门+决断" },
            success: {
              text: "你断下球。抬头。门将站位靠前。你一脚吊射。球划过弧线。进了。",
              effects: {
                reputation: 9,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "吊射力量大了。球飞过横梁。你喘着粗气。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "比赛末段。你方领先一球。你站在边路，指挥队友落位。草腥味混着汗味。看台的声浪压下来。对方全线压上。",
        sit: "balanced",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "指挥防线造越位",
            check: { attrs: ["iq", "positioning"], difficulty: 28, tag: "球商+站位" },
            success: {
              text: "你喊了一声。防线整体前移。对方前锋越位了。裁判举旗。你松了口气。",
              effects: {
                reputation: 7,
                attrs: { iq: 1 }
              }
            },
            fail: {
              text: "你喊了，但后卫没跟上。越位没造成功。对方前锋单刀。你的心脏在擂鼓。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "回防落位，卡住边路",
            check: { attrs: ["heading", "balance"], difficulty: 24, tag: "头球+平衡" },
            success: {
              text: "你回防落位。卡住边路。对方过不了你。时间在一秒一秒过去。",
              effects: {
                reputation: 5,
                attrs: { heading: 1 }
              }
            },
            fail: {
              text: "你落位了，但对方从另一侧打过去了。你只能看着。大腿在发酸。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "拿球消耗时间，用速度拖住",
            check: { attrs: ["speed", "stamina"], difficulty: 25, tag: "速度+耐力" },
            success: {
              text: "你拿球。不急。带球。沿边线慢跑。对方想提速，你偏不。时间在你手里。",
              effects: {
                reputation: 6,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "你太慢了。对方逼抢到位。球被断了。你的脚背还在发麻。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "果断远射，搏一个",
            check: { attrs: ["shooting", "burst"], difficulty: 26, tag: "射门+爆发" },
            success: {
              text: "你拿球。对方逼上来。你脚背绷紧。三十米。起脚。球带着弧线飞向球门。进了。",
              effects: {
                reputation: 8,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "射门打偏了。球飞过横梁。你的脚背还在发麻。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "铲断对方推进，停下这一下",
            check: { attrs: ["tackle", "hardness"], difficulty: 29, tag: "铲断+硬度" },
            success: {
              text: "你放铲。鞋钉刮过草皮。球被你捅出去了。解围。干净。",
              effects: {
                reputation: 6,
                attrs: { tackle: 1 }
              }
            },
            fail: {
              text: "你铲空了。他从你脚边抹过去。你趴在草皮上。膝盖磕在地上。",
              effects: { stamina: -5 }
            }
          }
        ]
      },
{
        text: "对方角球。你站在前点。球飞过来了。草腥味混着汗味。对方高中锋在你身后。汗珠滴进眼睛。全场屏息。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "抢前点，头球解围",
            check: { attrs: ["heading", "positioning"], difficulty: 30, tag: "头球+站位" },
            success: {
              text: "你抢前点。起跳。额头撞上皮球。闷响。球飞出去了。解围。你松了口气。",
              effects: {
                reputation: 7,
                attrs: { heading: 1 }
              }
            },
            fail: {
              text: "起跳时机差了。球从你头顶飞过。对方中锋抢到了。你的心脏在擂鼓。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "卡住身位，不让中锋起跳",
            check: { attrs: ["strength", "hardness"], difficulty: 28, tag: "对抗+硬度" },
            success: {
              text: "你肩膀一横。卡住身位。他起不了跳。球飞过去了。解围。肋骨发疼，但值得。",
              effects: {
                reputation: 6,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "你顶不住他。他硬生生把你挤开。起跳。头球。你的心脏在擂鼓。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "解围后分球，稳住节奏",
            check: { attrs: ["passing", "iq"], difficulty: 26, tag: "传球+球商" },
            success: {
              text: "你解围后拿球。抬头。后腰在要球。一脚分球。球权稳住了。教练在场边点头。",
              effects: {
                reputation: 6,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "分球力量小了。对方伸脚一捅。险些被断。你后背发凉。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "解围后沿边路反击",
            check: { attrs: ["speed", "stamina"], difficulty: 30, tag: "速度+耐力" },
            success: {
              text: "你解围后沿边路狂奔。肺在烧，但腿还在动。反击。风灌进耳朵。",
              effects: {
                reputation: 7,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "你跑了二十米，腿软了。球被回追的人捅走。你弯着腰喘气。",
              effects: { stamina: -6 }
            }
          },
          {
            id: "E",
            sit: "balanced",
            text: "解围后拿球，果断吊射",
            check: { attrs: ["shooting", "resolve"], difficulty: 23, tag: "射门+决断" },
            success: {
              text: "你解围后拿球。抬头。对方门将还没回位。你一脚吊射。球划过弧线。进了。",
              effects: {
                reputation: 8,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "吊射力量大了。球飞过横梁。你喘着粗气。",
              effects: { stamina: -3 }
            }
          }
        ]
      }
    ]
  },
  CAM_impact: {
    desc: "后插上、远射、抽射",
    events: [
      {
        text: "前锋背身拿球，吸引了两名后卫。你从中场悄悄插上，禁区前沿一片空地。草腥味钻进鼻子。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "前锋回做，你迎球不停直接拔脚抽射", check: { attrs: ["shooting", "burst"], difficulty: 37, tag: "射门+爆发" },
            success: { text: "你{elementAdj}地迎球抽射。球贴着草皮窜入死角。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "你插上慢了半拍。射门被后卫封堵，闷响。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你后插上爆射。球带着{elementAdj}的力量轰入网窝。门将扑了个空。", effects: { reputation: 21, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "插上接直塞，盘带晃过出击的门将", check: { attrs: ["dribble", "speed"], difficulty: 35, tag: "盘带+速度" },
            success: { text: "你{elementAdj}地晃过门将。推射空门，球进了。", effects: { reputation: 11, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "盘带趟大了。门将把球扑出，你扑空。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "balanced", text: "插上吸引防守，横传给位置更好的队友", check: { attrs: ["passing", "vision"], difficulty: 28, tag: "传球+视野" },
            success: { text: "你{elementAdj}地一记横传。队友轻松推射破门。", effects: { reputation: 8, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "横传力量大了。球出了底线。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "defense", text: "传球被断，你立刻就地反抢", check: { attrs: ["tackle", "intercept"], difficulty: 24, tag: "铲断+拦截" },
            success: { text: "你{elementAdj}地反抢成功。一记铲断，球权夺回。", effects: { reputation: 5, attrs: { tackle: 1 } } },
            fail: { text: "反抢扑空。对方反击，你回追。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "balanced", text: "不急着射，卡住后卫等第二落点", check: { attrs: ["positioning", "balance"], difficulty: 29, tag: "站位+平衡" },
            success: { text: "你{elementAdj}地卡住位置。第二落点到你脚下，你顺势分球。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "你被后卫挤出位置。球丢了。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "对方防线收得很深，禁区前挤满了人。你在中场拿球，抬头看了一眼球门。三十米。你的脚背发烫。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "带球推进两步，禁区外拔脚怒射", check: { attrs: ["shooting", "power"], difficulty: 38, tag: "射门+力量" },
            success: { text: "你{elementAdj}地一脚怒射。球如炮弹砸入网窝。", effects: { reputation: 13, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "远射发力过猛。球高出横梁，你甩手。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你禁区外爆射。球带着{elementAdj}的弧线轰入死角。门将连反应都没有。", effects: { reputation: 22, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "假装远射，扣球晃过封堵的后卫突入禁区", check: { attrs: ["dribble", "agility"], difficulty: 35, tag: "盘带+柔韧" },
            success: { text: "你{elementAdj}地扣球突破。后卫被你晃倒，单刀。", effects: { reputation: 10, attrs: { dribble: 1 } } },
            fail: { text: "扣球趟大了。门将出击把球没收。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "balanced", text: "假射真传，一脚直塞撕开肋部防线", check: { attrs: ["passing", "vision"], difficulty: 29, tag: "传球+视野" },
            success: { text: "你{elementAdj}地一记直塞。队友插上单刀破门。", effects: { reputation: 9, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "直塞被后卫预判，球丢了。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "远射被封堵，你冲上去抢第二落点护住", check: { attrs: ["balance", "strength"], difficulty: 27, tag: "平衡+对抗" },
            success: { text: "你{elementAdj}地护住第二落点。重新组织进攻。", effects: { reputation: 5, attrs: { balance: 1 } } },
            fail: { text: "你没抢到落点。对方解围。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "球被断，你立刻回追反抢", check: { attrs: ["tackle", "intercept"], difficulty: 24, tag: "铲断+拦截" },
            success: { text: "你{elementAdj}地反抢成功。铲断夺回球权。", effects: { reputation: 5, attrs: { tackle: 1 } } },
            fail: { text: "反抢扑空。对方反击，你只能追。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "你与前锋在肋部连续撞墙配合。对方后卫被扯得七零八落。禁区角上，你接到了回做球。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "接回做内切一步，拔脚抽射远角", check: { attrs: ["shooting", "burst"], difficulty: 37, tag: "射门+爆发" },
            success: { text: "你{elementAdj}地内切抽射。球擦着远门柱入网。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "内切没晃开角度。射门被门将封出。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你肋部内切爆射。球带着{elementAdj}的弧线钻入死角。全场沸腾。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "不射，顺势盘带突入禁区抹过后卫", check: { attrs: ["dribble", "speed"], difficulty: 34, tag: "盘带+速度" },
            success: { text: "你{elementAdj}地盘带突破。后卫被你甩开，传中。", effects: { reputation: 9, attrs: { dribble: 1 } } },
            fail: { text: "盘带被断。对方解围。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "balanced", text: "与前锋再做撞墙，直塞禁区", check: { attrs: ["passing", "iq"], difficulty: 29, tag: "传球+球商" },
            success: { text: "你{elementAdj}地一记直塞。前锋插上破门。", effects: { reputation: 9, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "撞墙配合失误。球被后卫断走。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "defense", text: "配合失误丢球，你立刻反抢", check: { attrs: ["tackle", "intercept"], difficulty: 24, tag: "铲断+拦截" },
            success: { text: "你{elementAdj}地反抢成功。铲断夺回球权。", effects: { reputation: 5, attrs: { tackle: 1 } } },
            fail: { text: "反抢扑空。对方反击。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "balanced", text: "接球后背身卡住后卫，护球等队友跑位", check: { attrs: ["positioning", "balance"], difficulty: 27, tag: "站位+平衡" },
            success: { text: "你{elementAdj}地卡住后卫。队友跑出空当，你分球。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "你被后卫挤出位置。球丢了。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "对方角球被解围，反击瞬间打响。你从中场启动，前方一片开阔。风在耳边呼啸。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "全速插上，接长传形成单刀", check: { attrs: ["speed", "dribble"], difficulty: 35, tag: "速度+盘带" },
            success: { text: "你{elementAdj}地高速插上。单刀推射，球进了。", effects: { reputation: 11, goals: 1, attrs: { speed: 1 } } },
            fail: { text: "你插上越位了。单刀无效，你摊手。", effects: { stamina: -4 } }
          },
          { id: "B", sit: "attack", text: "反击中带球推进，禁区外拔脚远射", check: { attrs: ["shooting", "burst"], difficulty: 36, tag: "射门+爆发" },
            success: { text: "你{elementAdj}地一脚远射。球应声入网。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "远射偏出立柱。你大口喘气。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你反击中爆射。球带着{elementAdj}的力量轰入死角。门将目送。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "带球吸引防守，直塞给插上的边锋", check: { attrs: ["passing", "vision"], difficulty: 29, tag: "传球+视野" },
            success: { text: "你{elementAdj}地一记直塞。边锋单刀破门。", effects: { reputation: 9, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "直塞力量大了。球出了底线。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "带球到前场，护球等队友跟上", check: { attrs: ["balance", "strength"], difficulty: 27, tag: "平衡+对抗" },
            success: { text: "你{elementAdj}地护住球。队友到位，进攻铺开。", effects: { reputation: 5, attrs: { balance: 1 } } },
            fail: { text: "你护球被断。对方反抢。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "反击被断，你回追反抢", check: { attrs: ["tackle", "intercept"], difficulty: 24, tag: "铲断+拦截" },
            success: { text: "你{elementAdj}地反抢成功。铲断化解反击。", effects: { reputation: 5, attrs: { tackle: 1 } } },
            fail: { text: "反抢扑空。对方长驱直入。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "你队前场任意球。苏雯站在球前，眼神冷静。你站在禁区弧顶，盯着人墙。第二落点会是你的。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "任意球被挡出落到弧顶，你迎球怒射", check: { attrs: ["shooting", "power"], difficulty: 37, tag: "射门+力量" },
            success: { text: "你{elementAdj}地迎球怒射。球砸入网窝。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "二点球没停好。射门打飞，你懊恼。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你二点球爆射。球带着{elementAdj}的弧线轰入死角。门将无能为力。", effects: { reputation: 21, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "苏雯假射真传，你插上盘带突入禁区", check: { attrs: ["dribble", "agility"], difficulty: 34, tag: "盘带+柔韧" },
            success: { text: "你{elementAdj}地盘带突破。后卫被你晃过，射门。", effects: { reputation: 10, attrs: { dribble: 1 } } },
            fail: { text: "盘带被断。对方解围。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "balanced", text: "你不抢射，把球分给边路插上的队友", check: { attrs: ["passing", "vision"], difficulty: 28, tag: "传球+视野" },
            success: { text: "你{elementAdj}地一记分球。队友下底传中。", effects: { reputation: 6, attrs: { passing: 1 } } },
            fail: { text: "分球被断。对方反击。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "你卡住后卫，争抢任意球的落点", check: { attrs: ["positioning", "heading"], difficulty: 28, tag: "站位+头球" },
            success: { text: "你{elementAdj}地抢到落点。头球摆渡给队友。", effects: { reputation: 6, attrs: { positioning: 1 } } },
            fail: { text: "你被后卫卡住。没抢到点。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "任意球被解围，你就地反抢", check: { attrs: ["tackle", "intercept"], difficulty: 24, tag: "铲断+拦截" },
            success: { text: "你{elementAdj}地反抢成功。铲断夺回球权。", effects: { reputation: 5, attrs: { tackle: 1 } } },
            fail: { text: "反抢扑空。对方反击。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "苏雯在中场拿球，与你眼神交汇。对方后卫线压得很高。你心领神会，开始启动。草皮在鞋钉下翻起。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "反越位启动，接苏雯直塞单刀赴会", check: { attrs: ["speed", "dribble"], difficulty: 36, tag: "速度+盘带" },
            success: { text: "你{elementAdj}地反越位成功。单刀推射，球进了。", effects: { reputation: 11, goals: 1, attrs: { speed: 1 } } },
            fail: { text: "你启动早了半步。越位，单刀无效。", effects: { stamina: -4 } }
          },
          { id: "B", sit: "attack", text: "接直塞不停球，迎球暴力抽射", check: { attrs: ["shooting", "burst"], difficulty: 38, tag: "射门+爆发" },
            success: { text: "你{elementAdj}地迎球爆射。球砸入网窝。", effects: { reputation: 13, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "抽射发力过猛。球高出横梁。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你后插上爆射。球带着{elementAdj}的力量轰入死角。门将纹丝不动。", effects: { reputation: 22, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "插上吸引防守，回做给苏雯远射", check: { attrs: ["passing", "iq"], difficulty: 28, tag: "传球+球商" },
            success: { text: "你{elementAdj}地一记回做。苏雯远射破门。", effects: { reputation: 8, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "回做力量小了。被后卫断走。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "接球后背身护球，等队友跑位", check: { attrs: ["balance", "strength"], difficulty: 27, tag: "平衡+对抗" },
            success: { text: "你{elementAdj}地护住球。队友到位，你分球。", effects: { reputation: 5, attrs: { balance: 1 } } },
            fail: { text: "你被后卫挤出。球丢了。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "直塞被断，你立刻反抢", check: { attrs: ["tackle", "intercept"], difficulty: 24, tag: "铲断+拦截" },
            success: { text: "你{elementAdj}地反抢成功。铲断夺回球权。", effects: { reputation: 5, attrs: { tackle: 1 } } },
            fail: { text: "反抢扑空。对方反击。", effects: { stamina: -4 } }
          }
        ]
      },
{
        text: "角球开出。你从禁区弧顶启动，像一支离弦的箭。前点一片混战，球被顶向后点。你已经在跑了。风灌进耳朵，草腥味呛进喉咙。",
        sit: "attack",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "迎球冲顶，砸向球门",
            check: { attrs: ["heading", "power"], difficulty: 36, tag: "头球+力量" },
            success: {
              text: "你{elementAdj}地跃起。额头撞上皮球，闷响。球砸向地面弹入网窝。门将的手还在半空。",
              effects: {
                reputation: 12,
                goals: 1,
                attrs: { heading: 1 }
              }
            },
            fail: {
              text: "起跳早了。球从你头顶飞过，后脑勺一阵凉。你落地时脚踝扭了一下。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地冲顶。球像炮弹一样砸入网窝。网绳剧烈颤抖。全场起立。",
              effects: {
                reputation: 19,
                goals: 1,
                attrs: { heading: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "胸部停球，转身抽射",
            check: { attrs: ["shooting", "burst"], difficulty: 38, tag: "射门+爆发" },
            success: {
              text: "球砸在你胸口，肋骨发疼。你转身，抡脚。球贴着草皮钻入死角。",
              effects: {
                reputation: 12,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "停球弹远了。后卫伸脚一捅，球出了底线。你的胸口还在发闷。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地胸部停球转身。一脚抽射。球带着弧线砸入网窝。门将纹丝不动。",
              effects: {
                reputation: 20,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "C",
            sit: "attack",
            text: "抢在后卫身前，用速度卡住身位",
            check: { attrs: ["speed", "agility"], difficulty: 34, tag: "速度+柔韧" },
            success: {
              text: "你比后卫快了一步。肩膀卡住他的胸口，球到了你脚下。推射。进了。",
              effects: {
                reputation: 10,
                goals: 1,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "启动慢了半拍。后卫把球顶走了。你的大腿肌肉在抽搐。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "让过第一落点，等二点球",
            check: { attrs: ["iq", "positioning"], difficulty: 27, tag: "球商+站位" },
            success: {
              text: "你没跳。球从头顶飞过，弹在草皮上。你迎上去，一脚推射。门将没反应过来。",
              effects: {
                reputation: 8,
                goals: 1,
                attrs: { iq: 1 }
              }
            },
            fail: {
              text: "二点球弹向了另一个方向。你扑了个空，膝盖磕在草皮上。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "争顶失败后立刻回位，防对方反击",
            check: { attrs: ["intercept", "stamina"], difficulty: 24, tag: "拦截+耐力" },
            success: {
              text: "球被对方顶出去，反击要打。你已经回到中圈。一记拦截，球权夺回。肺在烧。",
              effects: {
                reputation: 5,
                attrs: { intercept: 1 }
              }
            },
            fail: {
              text: "回位慢了。对方已经推进到三十米区域。你只能犯规，大腿发酸。",
              effects: { stamina: -5 }
            }
          }
        ]
      },
{
        text: "禁区内一片混战。球弹来弹去，打在腿上、胸口上、门柱上。然后，它弹到了你脚下。三米之内没有人。草腥味混着汗味。",
        sit: "attack",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "不等球落地，凌空抽射",
            check: { attrs: ["shooting", "power"], difficulty: 39, tag: "射门+力量" },
            success: {
              text: "你{elementAdj}地抡起脚背。球还没落地就被你抽出去了。闷响。网绳剧烈颤抖。门将的手还在半空。",
              effects: {
                reputation: 13,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "抽空了。脚背刮在草皮上，疼。球弹走了。你的脚踝在发麻。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地凌空抽射。球像炮弹一样砸入网窝。全场安静了一秒，然后炸了。",
              effects: {
                reputation: 22,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "拨球晃开角度，推射远角",
            check: { attrs: ["dribble", "agility"], difficulty: 35, tag: "盘带+柔韧" },
            success: {
              text: "你拨球，晃开半步。推射。球贴着门柱内侧滚入网窝。安静。然后所有人都站起来了。",
              effects: {
                reputation: 11,
                goals: 1,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "拨球被后卫挡了。球弹在你小腿上出底线。胫骨发疼。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "C",
            sit: "attack",
            text: "抢在后卫封堵前，扛开空间起脚",
            check: { attrs: ["balance", "strength"], difficulty: 34, tag: "平衡+对抗" },
            success: {
              text: "你{elementAdj}地扛住后卫。肩膀顶着肩膀。空间出来了。起脚。球进了。",
              effects: {
                reputation: 10,
                goals: 1,
                attrs: { balance: 1 }
              }
            },
            fail: {
              text: "没扛住。后卫把你挤开了。球弹走了。你的肋骨在叫。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "回做给位置更好的队友",
            check: { attrs: ["passing", "vision"], difficulty: 28, tag: "传球+视野" },
            success: {
              text: "你没贪。回做。队友迎球推射。球进了。他跑过来抱你。配合打出来了。",
              effects: {
                reputation: 8,
                assists: 1,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "回做力量小了。队友没接住，球被后卫捅走。你肩膀还酸着。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "射门被封堵后就地反抢",
            check: { attrs: ["tackle", "intercept"], difficulty: 26, tag: "铲断+拦截" },
            success: {
              text: "球被挡出来，对方要打反击。你就地反抢，肩膀顶上去。球权夺回。肺在烧。",
              effects: {
                reputation: 5,
                attrs: { tackle: 1 }
              }
            },
            fail: {
              text: "反抢扑空。对方顺势推进，你只能看着背影。大腿发酸。",
              effects: { stamina: -4 }
            }
          }
        ]
      },
{
        text: "反击。后场断球，一脚长传找到你。面前是大片空当，对方只有一名后卫回追。风灌进耳朵，草皮在鞋钉下飞退。心跳很快。",
        sit: "attack",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "全速冲刺，甩开后卫单刀",
            check: { attrs: ["speed", "stamina"], difficulty: 36, tag: "速度+耐力" },
            success: {
              text: "你{elementAdj}地加速。后卫被甩开了。单刀。推射。球进了。风还在耳边。",
              effects: {
                reputation: 11,
                goals: 1,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "冲刺时腿软了。后卫追上来把球捅走。你的大腿在抽搐。",
              effects: { stamina: -5 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地爆发。后卫连你的衣角都没碰到。单刀。推射。全场起立。",
              effects: {
                reputation: 18,
                goals: 1,
                attrs: { speed: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "不减速直接抽射，打门将一个措手不及",
            check: { attrs: ["shooting", "burst"], difficulty: 38, tag: "射门+爆发" },
            success: {
              text: "你{elementAdj}地抡脚。球还在弹跳中就被你抽出去了。门将没站稳。球进了。",
              effects: {
                reputation: 12,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "射门打飞了。球飞上看台。你的脚背还在发烫。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地在高速中抽射。球带着弧线砸入死角。门将连手都没伸。",
              effects: {
                reputation: 21,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "C",
            sit: "attack",
            text: "抢在后卫身前卡住身位，迎球推射",
            check: { attrs: ["positioning", "speed"], difficulty: 35, tag: "站位+速度" },
            success: {
              text: "你卡住身位。后卫被挡在身后。推射。球滚入网窝。",
              effects: {
                reputation: 10,
                goals: 1,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "卡位慢了一步。后卫把球捅走了。你的膝盖磕在草皮上。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "等队友插上，分球配合",
            check: { attrs: ["passing", "iq"], difficulty: 29, tag: "传球+球商" },
            success: {
              text: "你没贪。分球给插上的队友。他推射。球进了。配合打出来了。",
              effects: {
                reputation: 8,
                assists: 1,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "分球力量大了。队友没追上，球出了底线。你甩了甩手。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "被后卫追上后护球，等队友接应",
            check: { attrs: ["strength", "balance"], difficulty: 27, tag: "对抗+平衡" },
            success: {
              text: "后卫追上来了。你卡住身位，肩膀顶着他。队友到了。你分球。反击没断。",
              effects: {
                reputation: 5,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "你被挤开了。球弹出去，反击终结。后背撞在广告牌上。",
              effects: { stamina: -4 }
            }
          }
        ]
      },
{
        text: "对方后卫连续侵犯了苏雯三次。第四次，裁判吹了哨。任意球。禁区前沿二十米。苏雯看了你一眼。你站在球前，深呼吸。草皮上的白线在灯光下泛着冷光。",
        sit: "balanced",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "直接攻门，打人墙上方",
            check: { attrs: ["shooting", "power"], difficulty: 37, tag: "射门+力量" },
            success: {
              text: "你{elementAdj}地抡脚。球越过人墙，带着下坠砸入网窝。门将扑了一下，指尖差了两厘米。",
              effects: {
                reputation: 12,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "球打在人墙上。闷响。弹回来砸在你小腿上。胫骨发疼。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地抽出一脚弧线球。球绕过人墙，砸入死角。门将纹丝不动。全场沸腾。",
              effects: {
                reputation: 20,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "假射真传，直塞给绕人墙的队友",
            check: { attrs: ["passing", "vision"], difficulty: 31, tag: "传球+视野" },
            success: {
              text: "你抡脚，人墙跳了。球却从人墙脚下穿过。队友迎球推射。进了。",
              effects: {
                reputation: 9,
                assists: 1,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "直塞被后卫预判了。他伸脚一挡，球弹走了。你的脚踝发酸。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "C",
            sit: "attack",
            text: "带球横移拉开角度，再找人",
            check: { attrs: ["dribble", "agility"], difficulty: 30, tag: "盘带+柔韧" },
            success: {
              text: "你没急着开。带球横移两步。角度大了。你搓出一道弧线。球落在后点。",
              effects: {
                reputation: 7,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "横移时被对方断球了。你的脚踝发酸。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "attack",
            text: "吊入禁区，找高点争顶",
            check: { attrs: ["heading", "positioning"], difficulty: 30, tag: "头球+站位" },
            success: {
              text: "你搓出一道弧线。球落在后点。队友迎球一顶。网绳颤了。",
              effects: {
                reputation: 8,
                assists: 1,
                attrs: { heading: 1 }
              }
            },
            fail: {
              text: "弧线太浅。前点后卫一甩头，球弹出去老远。你的脚背发酸。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "开出后迅速回位，防对方快发反击",
            check: { attrs: ["intercept", "stamina"], difficulty: 23, tag: "拦截+耐力" },
            success: {
              text: "任意球被解围，对方要打反击。你已经回到中圈。一记拦截，球权夺回。肺在烧。",
              effects: {
                reputation: 5,
                attrs: { intercept: 1 }
              }
            },
            fail: {
              text: "回位慢了。对方已经推进了。你只能犯规。黄牌。大腿发酸。",
              effects: { stamina: -4 }
            }
          }
        ]
      },
{
        text: "补时第三分钟。比分还平着。最后一次进攻。你在中场拿球，对方全线退守。汗水糊住了眼睛。看台全站起来了。",
        sit: "attack",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "后插上禁区前沿，迎球怒射",
            check: { attrs: ["shooting", "burst"], difficulty: 39, tag: "射门+爆发" },
            success: {
              text: "你{elementAdj}地后插上。球到了你脚下。抡脚。球砸入网窝。全场炸了。",
              effects: {
                reputation: 13,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "射门被后卫封堵了。闷响。球弹走了。你的脚背在发麻。",
              effects: { stamina: -5 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地后插上。一脚怒射。球带着弧线砸入死角。绝杀。全场疯了。",
              effects: {
                reputation: 22,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "带球强突，撕开防线",
            check: { attrs: ["dribble", "speed"], difficulty: 37, tag: "盘带+速度" },
            success: {
              text: "你{elementAdj}地带球强突。后卫被晃开了。单刀。推射。绝杀。",
              effects: {
                reputation: 12,
                goals: 1,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "突破被后卫卡住了。球弹走了。你的膝盖磕在草皮上。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "C",
            sit: "attack",
            text: "直塞给反跑的前锋，送他单刀",
            check: { attrs: ["passing", "vision"], difficulty: 35, tag: "传球+视野" },
            success: {
              text: "你{elementAdj}地送出一脚直塞。球从人缝中穿过。前锋单刀。推射。绝杀。",
              effects: {
                reputation: 11,
                assists: 1,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "直塞被后卫挡了。球弹走了。你的脚踝发酸。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "控住节奏，等队友跑位再出球",
            check: { attrs: ["positioning", "iq"], difficulty: 29, tag: "站位+球商" },
            success: {
              text: "你没急。控了两秒。队友跑出空当。你分球。配合打出来了。",
              effects: {
                reputation: 7,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "控太久了。对方回防到位。机会没了。你甩了甩手。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "丢球后拼命回追，不给对方反击",
            check: { attrs: ["tackle", "stamina"], difficulty: 28, tag: "铲断+耐力" },
            success: {
              text: "球被断了。你拼命回追。一记铲断，球权夺回。肺在烧。大腿在叫。但值得。",
              effects: {
                reputation: 5,
                attrs: { tackle: 1 }
              }
            },
            fail: {
              text: "回追时腿软了。对方带球推进。你只能看着。大腿在抽搐。",
              effects: { stamina: -6 }
            }
          }
        ]
      }
    ]
  },
  CAM_pivot: {
    desc: "背身、做墙、护球",
    events: [
      {
        text: "中场长传吊到你脚下，你背对球门。后卫的胸口贴上你的后背，肋骨发疼。草腥味混着汗味。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "balanced", text: "像钉子一样卡住后卫，护住球", check: { attrs: ["balance", "strength"], difficulty: 27, tag: "平衡+对抗" },
            success: { text: "你{elementAdj}地稳住重心。后卫撞不动你，球护住了。", effects: { reputation: 6, attrs: { balance: 1 } } },
            fail: { text: "你被挤开了。后背撞在草皮上，球丢了。", effects: { stamina: -3 } }
          },
          { id: "B", sit: "balanced", text: "背身一脚分球，找插上的队友", check: { attrs: ["passing", "vision"], difficulty: 28, tag: "传球+视野" },
            success: { text: "你{elementAdj}地一记分球。球精准到位，进攻打开。", effects: { reputation: 7, attrs: { passing: 1 } } },
            fail: { text: "分球被预判。后卫抢先断走。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "attack", text: "背身突然转身，盘带抹过后卫", check: { attrs: ["dribble", "agility"], difficulty: 34, tag: "盘带+柔韧" },
            success: { text: "你{elementAdj}地转身突破。后卫被你甩开，推进。", effects: { reputation: 9, attrs: { dribble: 1 } } },
            fail: { text: "转身趟大了。球被后卫捅走。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "attack", text: "背身突然转身，拔脚抽射", check: { attrs: ["shooting", "burst"], difficulty: 36, tag: "射门+爆发" },
            success: { text: "你{elementAdj}地转身抽射。球钻入网窝。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "转身没晃开角度。射门被封堵。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你背身转身爆射。球带着{elementAdj}的弧线砸进死角。门将扑了个空。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "E", sit: "defense", text: "护球被断，你立刻就地反抢", check: { attrs: ["tackle", "intercept"], difficulty: 24, tag: "铲断+拦截" },
            success: { text: "你{elementAdj}地反抢成功。铲断夺回球权。", effects: { reputation: 5, attrs: { tackle: 1 } } },
            fail: { text: "反抢扑空。对方反击。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "苏雯带球逼近禁区，与你眼神交汇。你心领神会，迎上去做墙。草皮上的鞋钉印交错。",
        sit: "attack",
        choices: [
          { id: "A", sit: "balanced", text: "迎球一脚回做，给苏雯做墙", check: { attrs: ["passing", "iq"], difficulty: 27, tag: "传球+球商" },
            success: { text: "你{elementAdj}地一记回做。苏雯插上射门。", effects: { reputation: 7, attrs: { passing: 1 } } },
            fail: { text: "回做力量大了。苏雯没接住。", effects: { stamina: -3 } }
          },
          { id: "B", sit: "attack", text: "做完墙反插，盘带突入禁区", check: { attrs: ["dribble", "speed"], difficulty: 34, tag: "盘带+速度" },
            success: { text: "你{elementAdj}地盘带突破。后卫被你甩开，单刀。", effects: { reputation: 10, attrs: { dribble: 1 } } },
            fail: { text: "反插越位了。单刀无效。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "attack", text: "做墙后插上，接回做拔脚抽射", check: { attrs: ["shooting", "burst"], difficulty: 36, tag: "射门+爆发" },
            success: { text: "你{elementAdj}地迎球抽射。球钻入网窝。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "插上慢了。射门被门将封出。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你做墙后插上爆射。球带着{elementAdj}的力量轰入死角。全场起立。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "D", sit: "balanced", text: "做墙时卡住后卫，护住接球路线", check: { attrs: ["positioning", "balance"], difficulty: 26, tag: "站位+平衡" },
            success: { text: "你{elementAdj}地卡住后卫。配合打出来了。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "你被后卫挤出。配合失误。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "做墙失误丢球，你立刻反抢", check: { attrs: ["tackle", "intercept"], difficulty: 24, tag: "铲断+拦截" },
            success: { text: "你{elementAdj}地反抢成功。铲断夺回球权。", effects: { reputation: 5, attrs: { tackle: 1 } } },
            fail: { text: "反抢扑空。对方反击。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "对方两名后腰夹击你，肩膀顶肩膀。汗水滴进眼睛。你必须把球护住，等队友跑位。看台有人喊，扛住。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "balanced", text: "压低重心，扛住两人的对抗护住球", check: { attrs: ["balance", "pressure"], difficulty: 27, tag: "平衡+抗压" },
            success: { text: "你{elementAdj}地稳住重心。两人撞不动你，球护住了。", effects: { reputation: 6, attrs: { balance: 1 } } },
            fail: { text: "你被挤倒了。球丢了，肋骨发疼。", effects: { stamina: -4 } }
          },
          { id: "B", sit: "balanced", text: "护住球，一脚分球突围", check: { attrs: ["passing", "vision"], difficulty: 28, tag: "传球+视野" },
            success: { text: "你{elementAdj}地一记分球。球找到空当的队友。", effects: { reputation: 7, attrs: { passing: 1 } } },
            fail: { text: "分球被断。对方反抢。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "attack", text: "护住球，突然盘带从两人缝隙中突围", check: { attrs: ["dribble", "agility"], difficulty: 34, tag: "盘带+柔韧" },
            success: { text: "你{elementAdj}地盘带突围。两人被你甩开。", effects: { reputation: 9, attrs: { dribble: 1 } } },
            fail: { text: "盘带被夹断。球丢了。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "attack", text: "护住球，突然转身拔脚远射", check: { attrs: ["shooting", "power"], difficulty: 36, tag: "射门+力量" },
            success: { text: "你{elementAdj}地转身远射。球砸入网窝。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "转身没角度。射门被封堵。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你护球转身爆射。球带着{elementAdj}的弧线轰入死角。门将无能为力。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "E", sit: "defense", text: "球被捅走，你立刻反抢", check: { attrs: ["tackle", "strength"], difficulty: 25, tag: "铲断+对抗" },
            success: { text: "你{elementAdj}地反抢成功。一记铲断夺回球权。", effects: { reputation: 5, attrs: { tackle: 1 } } },
            fail: { text: "反抢扑空。对方反击。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "你在肋部背身拿球，对方后卫死死贴住。禁区里队友正在跑位。你能感觉到他的呼吸喷在你后颈。",
        sit: "attack",
        choices: [
          { id: "A", sit: "balanced", text: "背身一脚摆渡，直塞禁区", check: { attrs: ["passing", "vision"], difficulty: 29, tag: "传球+视野" },
            success: { text: "你{elementAdj}地一记摆渡。队友插上单刀破门。", effects: { reputation: 9, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "摆渡力量大了。球出了底线。", effects: { stamina: -3 } }
          },
          { id: "B", sit: "attack", text: "背身突然转身，拔脚抽射", check: { attrs: ["shooting", "burst"], difficulty: 36, tag: "射门+爆发" },
            success: { text: "你{elementAdj}地转身抽射。球钻入远角。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "转身被卡住。射门偏出。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你支点转身爆射。球带着{elementAdj}的力量轰入死角。门将扑了个空。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "attack", text: "背身转身盘带，抹过后卫下底", check: { attrs: ["dribble", "speed"], difficulty: 34, tag: "盘带+速度" },
            success: { text: "你{elementAdj}地盘带突破。后卫被你甩开，传中。", effects: { reputation: 9, attrs: { dribble: 1 } } },
            fail: { text: "盘带被断。对方解围。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "balanced", text: "背身扛住后卫，护球等队友跑位", check: { attrs: ["balance", "strength"], difficulty: 27, tag: "平衡+对抗" },
            success: { text: "你{elementAdj}地扛住对抗。队友跑出空当，你分球。", effects: { reputation: 5, attrs: { balance: 1 } } },
            fail: { text: "你被挤出位置。球丢了。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "摆渡被断，你立刻反抢", check: { attrs: ["tackle", "intercept"], difficulty: 24, tag: "铲断+拦截" },
            success: { text: "你{elementAdj}地反抢成功。铲断夺回球权。", effects: { reputation: 5, attrs: { tackle: 1 } } },
            fail: { text: "反抢扑空。对方反击。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "你队前场任意球。苏雯主罚，球吊进禁区。你卡住对方中卫，准备争顶摆渡。汗珠顺着下巴滴下。",
        sit: "attack",
        choices: [
          { id: "A", sit: "balanced", text: "卡住中卫，迎球争顶摆渡", check: { attrs: ["heading", "positioning"], difficulty: 29, tag: "头球+站位" },
            success: { text: "你{elementAdj}地一记头槌摆渡。队友抢点破门。", effects: { reputation: 8, assists: 1, attrs: { heading: 1 } } },
            fail: { text: "你被卡住。没顶到球。", effects: { stamina: -3 } }
          },
          { id: "B", sit: "attack", text: "任意球被顶出落到你脚下，你迎球抽射", check: { attrs: ["shooting", "power"], difficulty: 37, tag: "射门+力量" },
            success: { text: "你{elementAdj}地迎球抽射。球砸入网窝。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "二点球没停好。射门打飞。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你二点球爆射。球带着{elementAdj}的弧线轰入死角。门将无能为力。", effects: { reputation: 21, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "你不抢点，把球分给边路插上的队友", check: { attrs: ["passing", "vision"], difficulty: 28, tag: "传球+视野" },
            success: { text: "你{elementAdj}地一记分球。队友下底传中。", effects: { reputation: 6, attrs: { passing: 1 } } },
            fail: { text: "分球被断。对方反击。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "attack", text: "苏雯假射真传，你插上盘带突入禁区", check: { attrs: ["dribble", "agility"], difficulty: 34, tag: "盘带+柔韧" },
            success: { text: "你{elementAdj}地盘带突破。后卫被你晃过。", effects: { reputation: 9, attrs: { dribble: 1 } } },
            fail: { text: "盘带被断。对方解围。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "defense", text: "任意球被解围，你就地反抢", check: { attrs: ["tackle", "intercept"], difficulty: 24, tag: "铲断+拦截" },
            success: { text: "你{elementAdj}地反抢成功。铲断夺回球权。", effects: { reputation: 5, attrs: { tackle: 1 } } },
            fail: { text: "反抢扑空。对方反击。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "对方角球被解围，反击打响。球到了你脚下，对方后卫还没回位。你背身护球，等队友插上。风灌进耳朵。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "balanced", text: "背身护球，扛住回追的后卫", check: { attrs: ["balance", "pressure"], difficulty: 27, tag: "平衡+抗压" },
            success: { text: "你{elementAdj}地扛住对抗。队友插上，你分球。", effects: { reputation: 6, attrs: { balance: 1 } } },
            fail: { text: "你被回追的后卫捅走球。反击夭折。", effects: { stamina: -4 } }
          },
          { id: "B", sit: "balanced", text: "护住球，一脚直塞找插上的队友", check: { attrs: ["passing", "vision"], difficulty: 29, tag: "传球+视野" },
            success: { text: "你{elementAdj}地一记直塞。队友单刀破门。", effects: { reputation: 9, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "直塞力量大了。球出了底线。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "attack", text: "护住球，转身盘带推进反击", check: { attrs: ["dribble", "speed"], difficulty: 34, tag: "盘带+速度" },
            success: { text: "你{elementAdj}地盘带推进。后卫追不上你。", effects: { reputation: 9, attrs: { dribble: 1 } } },
            fail: { text: "盘带被断。对方反抢。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "attack", text: "护球转身，禁区外拔脚远射", check: { attrs: ["shooting", "power"], difficulty: 36, tag: "射门+力量" },
            success: { text: "你{elementAdj}地一脚远射。球应声入网。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "远射偏出。球砸在边网上。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你护球转身爆射。球带着{elementAdj}的力量轰入死角。门将目送。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "E", sit: "defense", text: "护球被断，你立刻反抢", check: { attrs: ["tackle", "intercept"], difficulty: 24, tag: "铲断+拦截" },
            success: { text: "你{elementAdj}地反抢成功。铲断夺回球权。", effects: { reputation: 5, attrs: { tackle: 1 } } },
            fail: { text: "反抢扑空。对方反击。", effects: { stamina: -4 } }
          }
        ]
      },
{
        text: "后场一记长传。球在空中划了很远。你背对球门，感受到后卫的胸口贴上来。草腥味混着汗味。球在最高点等着。",
        sit: "balanced",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "头球摆渡给插上的队友",
            check: { attrs: ["heading", "power"], difficulty: 32, tag: "头球+力量" },
            success: {
              text: "你{elementAdj}地跃起。额头撞上皮球，闷响。球飞向身后。队友迎球推射。进了。",
              effects: {
                reputation: 9,
                assists: 1,
                attrs: { heading: 1 }
              }
            },
            fail: {
              text: "起跳早了。球从头顶飞过。你落地时脚踝扭了一下。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地头球摆渡。球精准落在队友脚下。单刀。推射。全场起立。",
              effects: {
                reputation: 16,
                assists: 1,
                attrs: { heading: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "balanced",
            text: "胸部停球，背身护住等队友",
            check: { attrs: ["strength", "balance"], difficulty: 27, tag: "对抗+平衡" },
            success: {
              text: "球砸在胸口，肋骨发疼。你卡住后卫，像一堵墙。队友到了。你分球。",
              effects: {
                reputation: 6,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "停球弹远了。后卫伸脚一捅，球权丢了。你的胸口还在发闷。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "一脚回做给后插上的中场",
            check: { attrs: ["passing", "iq"], difficulty: 26, tag: "传球+球商" },
            success: {
              text: "你没转身。一脚回做。队友迎球推进。节奏没断。",
              effects: {
                reputation: 6,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "回做力量小了。队友没接住，球被后卫捅走。你肩膀还酸着。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "attack",
            text: "转身强突，带球推进",
            check: { attrs: ["dribble", "agility"], difficulty: 33, tag: "盘带+柔韧" },
            success: {
              text: "你转身，拨球变向。后卫重心丢了。你带球推进到禁区前沿。",
              effects: {
                reputation: 8,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "转身时被后卫卡住了。球弹走了。你的膝盖磕在草皮上。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "丢球后就地反抢，延缓对方推进",
            check: { attrs: ["resolve", "tackle"], difficulty: 24, tag: "决断+铲断" },
            success: {
              text: "球被断了。你没犹豫。就地反抢。一记干净的铲断，球权夺回。肺在烧。",
              effects: {
                reputation: 5,
                attrs: { resolve: 1 }
              }
            },
            fail: {
              text: "反抢扑空。对方顺势推进。你只能回追。大腿发酸。",
              effects: { stamina: -4 }
            }
          }
        ]
      },
{
        text: "比赛第七十分钟。你的大腿像灌了铅。每一次呼吸都带着铁锈味。球又到了你脚下，后卫贴上来。草腥味混着汗味。你得撑住。",
        sit: "balanced",
        choices: [
          {
            id: "A",
            sit: "balanced",
            text: "咬牙护球，用身体扛住后卫",
            check: { attrs: ["stamina", "strength"], difficulty: 29, tag: "耐力+对抗" },
            success: {
              text: "你{elementAdj}地扛住了。肩膀顶着肩膀，肋骨在叫。后卫退了。你分球。肺在烧，但你还在。",
              effects: {
                reputation: 7,
                attrs: { stamina: 1 }
              }
            },
            fail: {
              text: "你扛不住了。被挤开。球弹走了。大腿在抽搐。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "B",
            sit: "balanced",
            text: "一脚出球，不恋战",
            check: { attrs: ["passing", "iq"], difficulty: 24, tag: "传球+球商" },
            success: {
              text: "你没硬撑。一脚出球。队友接住了。节奏没断。你喘了口气。",
              effects: {
                reputation: 5,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "出球力量小了。队友没接住。球被断了。你的脚踝发酸。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "C",
            sit: "attack",
            text: "强行转身，用最后的力气突一下",
            check: { attrs: ["burst", "resolve"], difficulty: 34, tag: "爆发+决断" },
            success: {
              text: "你{elementAdj}地爆发。转身。后卫没料到。你突入禁区。推射。进了。",
              effects: {
                reputation: 10,
                goals: 1,
                attrs: { burst: 1 }
              }
            },
            fail: {
              text: "爆发到一半腿软了。后卫把球捅走。你跪在草皮上。",
              effects: { stamina: -6 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "背身做墙，让队友撞墙配合",
            check: { attrs: ["positioning", "balance"], difficulty: 26, tag: "站位+平衡" },
            success: {
              text: "你卡住位置。队友撞墙。你回做。他前插。配合打出来了。",
              effects: {
                reputation: 6,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "站位偏了。撞墙没接上。球弹走了。你的膝盖发酸。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "护球失败后回追，用最后的力气铲断",
            check: { attrs: ["tackle", "hardness"], difficulty: 27, tag: "铲断+硬度" },
            success: {
              text: "球被断了。你拼命回追。一记铲断。球权夺回。你趴在草皮上，肺在烧。",
              effects: {
                reputation: 5,
                attrs: { tackle: 1 }
              }
            },
            fail: {
              text: "回追时腿彻底软了。你摔倒了。对方带球推进。大腿在抽搐。",
              effects: { stamina: -6 }
            }
          }
        ]
      },
{
        text: "对方反击。长传打穿了中场。对方前锋带球推进，面前只有你和两名后卫。草皮被鞋钉翻起。风灌进耳朵。你得延缓这一下。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "正面迎上去，用身体卡住推进路线",
            check: { attrs: ["strength", "hardness"], difficulty: 29, tag: "对抗+硬度" },
            success: {
              text: "你{elementAdj}地迎上去。肩膀顶住对方胸口。他停了。后卫回位了。你的肋骨在叫。",
              effects: {
                reputation: 6,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "你被晃开了。对方变向。你扑了个空。膝盖发疼。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "卡住传球线路，逼他走边路",
            check: { attrs: ["positioning", "iq"], difficulty: 26, tag: "站位+球商" },
            success: {
              text: "你没扑。你卡住中路。对方只能走边。速度降了。后卫回位了。",
              effects: {
                reputation: 6,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "站位偏了。对方从中路突过去了。你只能回追。大腿发酸。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "看准时机，果断出脚铲断",
            check: { attrs: ["resolve", "tackle"], difficulty: 30, tag: "决断+铲断" },
            success: {
              text: "你等了。对方触球的那一瞬。你伸脚。干净的铲断。球权夺回。",
              effects: {
                reputation: 7,
                attrs: { resolve: 1 }
              }
            },
            fail: {
              text: "铲空了。你滑出去两米。对方带球继续推进。草皮刮着你的小腿。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "D",
            sit: "defense",
            text: "延缓推进，等队友回防",
            check: { attrs: ["stamina", "agility"], difficulty: 25, tag: "耐力+柔韧" },
            success: {
              text: "你没扑。你跟着。一步。两步。队友回来了。对方被围住了。你的肺在烧。",
              effects: {
                reputation: 5,
                attrs: { stamina: 1 }
              }
            },
            fail: {
              text: "你跟不住了。对方加速。你被甩开了。大腿在叫。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "E",
            sit: "balanced",
            text: "断球后立刻长传发动反击",
            check: { attrs: ["passing", "vision"], difficulty: 28, tag: "传球+视野" },
            success: {
              text: "你断下球。抬头。一脚长传。球划过半场，找到前锋。反击打出来了。",
              effects: {
                reputation: 8,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "长传偏了。球飞出边线。你的脚踝发酸。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "角球。你站在禁区里，身边是两个后卫。他们的手搭在你肩膀上，你的肩膀搭在他们胸口上。球在角旗区等着。草腥味混着汗味。",
        sit: "attack",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "抢前点，头球攻门",
            check: { attrs: ["heading", "power"], difficulty: 36, tag: "头球+力量" },
            success: {
              text: "你{elementAdj}地抢前点。额头撞上皮球。闷响。球砸入网窝。门将的手还在半空。",
              effects: {
                reputation: 12,
                goals: 1,
                attrs: { heading: 1 }
              }
            },
            fail: {
              text: "前点被后卫卡住了。你跳起来只碰到空气。落地时脚踝扭了。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地冲顶。球像炮弹一样砸入网窝。网绳剧烈颤抖。全场起立。",
              effects: {
                reputation: 19,
                goals: 1,
                attrs: { heading: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "卡住后卫，给队友做掩护",
            check: { attrs: ["strength", "balance"], difficulty: 28, tag: "对抗+平衡" },
            success: {
              text: "你像一堵墙。卡住两个后卫。队友空了。头球。进了。他跑过来抱你。",
              effects: {
                reputation: 7,
                assists: 1,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "你被挤开了。后卫挣脱了。队友被盯死。球被顶出去了。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "让过第一落点，等二点球",
            check: { attrs: ["iq", "positioning"], difficulty: 27, tag: "球商+站位" },
            success: {
              text: "你没跳。球从头顶飞过。弹在草皮上。你迎上去。推射。进了。",
              effects: {
                reputation: 8,
                goals: 1,
                attrs: { iq: 1 }
              }
            },
            fail: {
              text: "二点球弹向了另一个方向。你扑了个空。膝盖磕在草皮上。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "attack",
            text: "胸部停球后转身抽射",
            check: { attrs: ["shooting", "burst"], difficulty: 37, tag: "射门+爆发" },
            success: {
              text: "球砸在胸口。你转身。抡脚。球贴着草皮钻入死角。",
              effects: {
                reputation: 11,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "停球弹远了。后卫伸脚一捅。球出了底线。你的胸口发闷。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "角球被解围后回位，防反击",
            check: { attrs: ["stamina", "intercept"], difficulty: 24, tag: "耐力+拦截" },
            success: {
              text: "球被顶出去。对方要打反击。你已经回到中圈。一记拦截。球权夺回。",
              effects: {
                reputation: 5,
                attrs: { stamina: 1 }
              }
            },
            fail: {
              text: "回位慢了。对方已经推进了。你只能犯规。大腿发酸。",
              effects: { stamina: -4 }
            }
          }
        ]
      },
{
        text: "少打一人。队友被红牌罚下了。教练在场边喊：稳住。你站在中圈，球在你脚下。对方压上来了。草腥味混着汗味。看台的嘘声压下来。",
        sit: "balanced",
        choices: [
          {
            id: "A",
            sit: "balanced",
            text: "背身护球，用身体扛住逼抢",
            check: { attrs: ["strength", "hardness"], difficulty: 30, tag: "对抗+硬度" },
            success: {
              text: "你{elementAdj}地扛住了。肩膀顶着肩膀。两个人围你。你不动。队友跑出空当。你分球。",
              effects: {
                reputation: 7,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "你被两人挤开了。球弹走了。后背撞在广告牌上。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "B",
            sit: "balanced",
            text: "一脚长传转移，拉开空间",
            check: { attrs: ["passing", "vision"], difficulty: 29, tag: "传球+视野" },
            success: {
              text: "你{elementAdj}地抡脚。球划过半场。弱侧队友接住了。空间拉开了。",
              effects: {
                reputation: 7,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "长传偏了。球飞出边线。对方掷界外球。你的脚踝发酸。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "突然加速带球推进，打乱对方节奏",
            check: { attrs: ["burst", "iq"], difficulty: 31, tag: "爆发+球商" },
            success: {
              text: "你{elementAdj}地加速。对方没想到你会突。你带球推进了十米。队友落位了。",
              effects: {
                reputation: 7,
                attrs: { burst: 1 }
              }
            },
            fail: {
              text: "加速到一半腿软了。球趟大了。对方断球。大腿在抽搐。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "D",
            sit: "defense",
            text: "回传给后卫，重新组织防线",
            check: { attrs: ["positioning", "pressure"], difficulty: 23, tag: "站位+抗压" },
            success: {
              text: "你回传。后卫接住了。防线重新落位。你喘了口气。少一人，但没乱。",
              effects: {
                reputation: 5,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "回传力量小了。后卫差点没接住。你心里一紧。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "丢球后拼命反抢，弥补人数劣势",
            check: { attrs: ["stamina", "tackle"], difficulty: 28, tag: "耐力+铲断" },
            success: {
              text: "球被断了。你拼命回追。一记铲断。球权夺回。你趴在草皮上。肺在烧。",
              effects: {
                reputation: 6,
                attrs: { stamina: 1 }
              }
            },
            fail: {
              text: "回追时腿软了。你摔倒了。对方带球推进。大腿在抽搐。",
              effects: { stamina: -6 }
            }
          }
        ]
      }
    ]
  },
CAM_break: {
    desc: "盘带、肋部、突破",
    events: [
      {
        text: "中路拿球，对方后腰横在身前。草腥味钻进鼻腔，鞋钉踩实了草皮。看台的声浪压下来。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "沉肩拨球，从后腰身侧抹过去", check: { attrs: ["dribble", "agility"], difficulty: 36, tag: "盘带+柔韧" },
            success: { text: "你肩膀一沉，球从后腰裆下穿过。他转身时你已经趟出三步。面前是一片开阔。", effects: { reputation: 9, attrs: { dribble: 1 } } },
            fail: { text: "拨球趟大了。后腰伸脚一捅，球弹出去老远。你脚踝还在发酸。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你连晃两人，{elementAdj}地抹进禁区。后卫只看见你的背影。看台炸了。", effects: { reputation: 18, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "一脚直塞，撕开防线找前锋", check: { attrs: ["passing", "vision"], difficulty: 34, tag: "传球+视野" },
            success: { text: "你脚腕一抖，球从两名后卫中间钻过去。前锋心领神会，单刀。配合成了。", effects: { reputation: 10, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "直塞力量大了。球从前锋脚边滑过去，被门将没收。你脚背还在发麻。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "attack", text: "晃开半步，抡脚远射打死角", check: { attrs: ["shooting", "burst"], difficulty: 38, tag: "射门+爆发" },
            success: { text: "你晃开半步，抡起就是一脚。球带着风声砸向死角。门将指尖差了两厘米。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "射门打偏了。球擦着立柱飞出底线。你脚背还在发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地一脚远射，球划出弧线挂入死角。门将纹丝不动。球场炸了。", effects: { reputation: 21, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "D", sit: "balanced", text: "护球等队友跑位，再分球", check: { attrs: ["strength", "balance"], difficulty: 27, tag: "对抗+平衡" },
            success: { text: "你后背顶住后腰，肩膀卡死。他推不动你。队友插上，你分球。节奏稳住了。", effects: { reputation: 6, attrs: { strength: 1 } } },
            fail: { text: "你被挤开了。后背撞在对手膝盖上，肋骨发疼。球丢了。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "卡住身位，把对手逼向边线", check: { attrs: ["positioning", "balance"], difficulty: 25, tag: "站位+平衡" },
            success: { text: "你卡住身位，把对手逼向边线。他出球角度没了，只能回传。威胁解除。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "卡位慢了。对手从你身侧抹过，继续推进。你大腿还在发酸。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "肋部空当，你接到分球。后卫和中卫之间的缝隙就在眼前。汗水顺着下巴滴在草皮上。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "直塞肋部，让前锋反越位", check: { attrs: ["passing", "vision"], difficulty: 35, tag: "传球+视野" },
            success: { text: "你脚弓一推，球贴着草皮钻进肋部。前锋反越位成功，单刀推射。网绳晃了一下。", effects: { reputation: 11, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "直塞力量小了。后卫回追把球捅走。你脚底还在发麻。", effects: { stamina: -3 } },
            critical: { text: "【灵光一闪】你{elementAdj}地一脚直塞，撕开整条防线。前锋单刀破门。教练把战术板摔了。", effects: { reputation: 19, assists: 1, attrs: { passing: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "自己转身抹进肋部，突破渗透", check: { attrs: ["dribble", "agility"], difficulty: 37, tag: "盘带+柔韧" },
            success: { text: "你转身抹进肋部，肩膀晃开后卫。禁区就在脚下。推射。球进了。", effects: { reputation: 12, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "转身没抹开。后卫和中卫夹击，球被堵死。你脚踝还在发疼。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】你{elementAdj}地连过两人，抹进禁区推射死角。全场安静了一秒，然后沸腾了。", effects: { reputation: 20, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "attack", text: "抹进禁区，迎球低射", check: { attrs: ["shooting", "power"], difficulty: 38, tag: "射门+力量" },
            success: { text: "你抹进禁区，迎球就是一脚低射。球贴着草皮钻进远角。门将扑了个空。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "射门打高了。球飞过横梁，砸在看台上。你脚背还在发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地迎球抽射，球砸入死角。门将纹丝不动。看台全站起来了。", effects: { reputation: 21, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "D", sit: "balanced", text: "卡住身位护球，等队友插上再做墙", check: { attrs: ["positioning", "balance"], difficulty: 27, tag: "站位+平衡" },
            success: { text: "你卡住身位护住球，后卫顶不动你。队友插上，你做墙回做。配合打出来了。", effects: { reputation: 7, attrs: { positioning: 1 } } },
            fail: { text: "卡位慢了半拍。后卫伸脚把球捅走。你肋骨还在发酸。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "丢球就地反抢，伸脚截下回传", check: { attrs: ["intercept", "positioning"], difficulty: 24, tag: "拦截+站位" },
            success: { text: "丢球瞬间你卡住身位，把对手逼向边线。他传球被你伸脚截下。球权夺回。", effects: { reputation: 5, attrs: { intercept: 1 } } },
            fail: { text: "卡位慢了半拍。对手从你身侧抹过，推进。你大腿还在发酸。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "禁区弧顶，你接到回做。面前空了一片。后腰在回追，鞋钉刮起草屑。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "抡起远射，打一个死角", check: { attrs: ["shooting", "burst"], difficulty: 38, tag: "射门+爆发" },
            success: { text: "你抡起就是一脚。球带着风声砸向死角。门将指尖差了两厘米。网绳晃了。", effects: { reputation: 13, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "射门打偏了。球擦着立柱飞出底线。你脚背还在发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地一脚远射，球划出弧线挂入死角。门将纹丝不动。球场炸了。", effects: { reputation: 21, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "直塞禁区，找插入的队友", check: { attrs: ["passing", "vision"], difficulty: 33, tag: "传球+视野" },
            success: { text: "你脚腕一抖，球钻进禁区。队友插上迎球推射。配合打出来了。", effects: { reputation: 10, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "直塞力量小了。后卫伸脚把球截走。你脚底还在发酸。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "attack", text: "盘带晃开角度，再打门", check: { attrs: ["dribble", "agility"], difficulty: 36, tag: "盘带+柔韧" },
            success: { text: "你拨球晃开后腰，闪出角度。起脚。球贴着门柱钻入网窝。", effects: { reputation: 11, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "拨球没晃开。后腰伸脚把球捅走。你脚踝还在发疼。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地晃过两人，起脚抽射。球砸入死角。场边所有人都站起来了。", effects: { reputation: 19, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "D", sit: "balanced", text: "护球等队友跑位，稳住节奏", check: { attrs: ["strength", "balance"], difficulty: 26, tag: "对抗+平衡" },
            success: { text: "你后背顶住后腰，卡住身位。队友跑出空当，你分球。节奏稳住了。", effects: { reputation: 6, attrs: { strength: 1 } } },
            fail: { text: "你被挤开了。后背撞在对手身上，球丢了。肩膀还在发酸。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "丢球就地反抢，卡住身位", check: { attrs: ["positioning", "balance"], difficulty: 25, tag: "站位+平衡" },
            success: { text: "丢球瞬间你卡住身位，把对手逼向边线。他出球角度没了，只能回传。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "卡位慢了。对手从你身侧抹过，继续推进。你大腿还在发酸。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "边路内切，内牛尔在远端要球。你面前只有一个后卫。草皮被鞋钉翻起一块。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "内切变向，晃开角度打门", check: { attrs: ["dribble", "agility"], difficulty: 37, tag: "盘带+柔韧" },
            success: { text: "你肩膀一沉，内切。后卫重心丢了。你起脚打近角。球进了。", effects: { reputation: 12, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "内切没晃开角度。后卫伸脚把球封堵。你脚踝还在发疼。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地内切晃过后卫，抽射死角。门将扑了个空。看台沸腾了。", effects: { reputation: 20, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "balanced", text: "护住球卡住身位，等队友接应", check: { attrs: ["positioning", "balance"], difficulty: 27, tag: "站位+平衡" },
            success: { text: "你护住球，肩膀顶住后卫。他推不动你。队友插上接应，你分球。节奏稳住了。", effects: { reputation: 6, attrs: { positioning: 1 } } },
            fail: { text: "你被挤开了。后背撞在对手身上，球丢了。肩膀还在发酸。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "attack", text: "直塞肋部，找插上的队友", check: { attrs: ["passing", "vision"], difficulty: 34, tag: "传球+视野" },
            success: { text: "你脚腕一抖，球钻进肋部。队友插上，迎球推射。配合成了。", effects: { reputation: 10, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "直塞力量小了。后卫回追把球捅走。你脚底还在发麻。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "attack", text: "内切后远射，轰向球门", check: { attrs: ["shooting", "power"], difficulty: 38, tag: "射门+力量" },
            success: { text: "你内切一步，抡起就射。球带着风声砸向球门。门将扑了一下，没扑住。球进了。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "射门打高了。球飞过横梁，砸在看台上。你脚背还在发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地内切抽射，球划出弧线挂入死角。门将纹丝不动。", effects: { reputation: 21, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "E", sit: "balanced", text: "扛住后卫，强行护球转身", check: { attrs: ["strength", "balance"], difficulty: 28, tag: "对抗+平衡" },
            success: { text: "你肩膀顶住后卫，硬生生扛开半个身位。转身。面前空了。", effects: { reputation: 7, attrs: { strength: 1 } } },
            fail: { text: "你没扛动他。后背撞在对手胸口，球丢了。肋骨还在发酸。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "前场丢球，对方后腰拿球推进。你的肺还在灼烧。回追的路线就在眼前。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "就地铲断，把球权夺回来", check: { attrs: ["tackle", "hardness"], difficulty: 27, tag: "铲断+硬度" },
            success: { text: "你滑铲过去，鞋钉刮起草皮。球被你捅走。膝盖磕在草皮上，火辣辣的。", effects: { reputation: 6, attrs: { tackle: 1 } } },
            fail: { text: "铲空了。你整个人滑出去，膝盖磕在草皮上。对方推进了。", effects: { stamina: -5 } }
          },
          { id: "B", sit: "defense", text: "高速回追，从身后把球捅走", check: { attrs: ["speed", "stamina"], difficulty: 29, tag: "速度+耐力" },
            success: { text: "你转身就追。风灌进耳朵。三步之后你追上对手，伸脚把球捅走。肺部在灼烧。", effects: { reputation: 6, attrs: { speed: 1 } } },
            fail: { text: "回追慢了半拍。对手已经分球。你大腿肌肉还在发酸。", effects: { stamina: -5 } }
          },
          { id: "C", sit: "defense", text: "预判出球线路，提前移动卡断", check: { attrs: ["iq", "intercept"], difficulty: 24, tag: "球商+拦截" },
            success: { text: "你预判到对手的出球线路，提前移动。球刚传出，你就伸脚卡断。球权夺回。", effects: { reputation: 5, attrs: { iq: 1 } } },
            fail: { text: "预判错了。球从你身侧穿过，对手推进。你脚踝还在发酸。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "defense", text: "突然爆发回追，扑向持球人", check: { attrs: ["burst", "power"], difficulty: 30, tag: "爆发+力量" },
            success: { text: "你突然爆发，三步追上对手。贴身一挤，球被你捅走。肺部在灼烧。", effects: { reputation: 7, attrs: { burst: 1 } } },
            fail: { text: "扑抢太急。你刹不住脚，撞在对手身上。犯规了。肩膀还在发疼。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "balanced", text: "提前卡位，把对手挤向边路", check: { attrs: ["positioning", "balance"], difficulty: 25, tag: "站位+平衡" },
            success: { text: "你卡住身位，把对手逼向边线。他出球角度没了，只能回传。威胁解除。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "卡位慢了。对手从你身侧抹过，继续推进。你大腿还在发酸。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "反击机会，你断球后面前一片开阔。苏雯在肋部跑位，范志贵在远端招手。草腥味混着汗味。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "直塞肋部，让苏雯单刀", check: { attrs: ["passing", "vision"], difficulty: 35, tag: "传球+视野" },
            success: { text: "你脚腕一抖，球钻进肋部。苏雯心领神会，单刀推射。网绳晃了一下。", effects: { reputation: 11, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "直塞力量大了。球从苏雯脚边滑过，被门将没收。你脚背还在发麻。", effects: { stamina: -3 } },
            critical: { text: "【灵光一闪】你{elementAdj}地一脚直塞，撕开整条防线。苏雯单刀破门。教练站起来了。", effects: { reputation: 19, assists: 1, attrs: { passing: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "自己盘带推进，杀向禁区", check: { attrs: ["dribble", "agility"], difficulty: 36, tag: "盘带+柔韧" },
            success: { text: "你带球推进，晃开回追的后腰。禁区在望。你低射。球进了。", effects: { reputation: 12, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "盘带趟大了。后卫回追把球捅走。你脚踝还在发疼。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】你{elementAdj}地连过两人，杀入禁区推射死角。全场沸腾了。", effects: { reputation: 20, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "扛住回追的后卫，护球等接应", check: { attrs: ["strength", "balance"], difficulty: 27, tag: "对抗+平衡" },
            success: { text: "你后背顶住回追的后卫，卡住身位。队友跑出空当，你分球。节奏稳住了。", effects: { reputation: 6, attrs: { strength: 1 } } },
            fail: { text: "你被挤开了。后背撞在对手身上，球丢了。肩膀还在发酸。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "attack", text: "远射，打门将一个措手不及", check: { attrs: ["shooting", "burst"], difficulty: 38, tag: "射门+爆发" },
            success: { text: "你抡起就是一脚。球带着风声砸向球门。门将扑了一下，没扑住。球进了。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "射门打偏了。球擦着立柱飞出底线。你脚背还在发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地一脚远射，球划出弧线挂入死角。门将纹丝不动。", effects: { reputation: 21, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "E", sit: "balanced", text: "护球卡位，等队友跑位再分球", check: { attrs: ["positioning", "balance"], difficulty: 26, tag: "站位+平衡" },
            success: { text: "你护住球，卡住身位。队友跑出空当，你分球。节奏稳住了。", effects: { reputation: 6, attrs: { positioning: 1 } } },
            fail: { text: "你被挤开了。后背撞在对手身上，球丢了。肩膀还在发酸。", effects: { stamina: -3 } }
          }
        ]
      },
{
        text: "中路。你拿球，面前是三个人。后腰、前卫、回追的后卫。草腥味钻进鼻腔。鞋钉踩实了草皮。缝隙很窄。但你看见了。",
        sit: "attack",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "连续变向，从三人缝隙中穿过",
            check: { attrs: ["dribble", "agility"], difficulty: 38, tag: "盘带+柔韧" },
            success: {
              text: "你{elementAdj}地连续变向。左。右。再左。三个人都被晃开了。你突入禁区。",
              effects: {
                reputation: 12,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "第二次变向时被卡住了。球弹走了。你的膝盖磕在草皮上。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地连过三人。球像粘在脚上。突入禁区。推射。全场起立。",
              effects: {
                reputation: 20,
                goals: 1,
                attrs: { dribble: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "用身体扛开缝隙，强行挤过去",
            check: { attrs: ["balance", "burst"], difficulty: 36, tag: "平衡+爆发" },
            success: {
              text: "你{elementAdj}地扛住两人。肩膀顶着肩膀。缝隙出来了。你挤过去了。",
              effects: {
                reputation: 11,
                attrs: { balance: 1 }
              }
            },
            fail: {
              text: "没扛住。被两人夹住了。球弹走了。你的肋骨在叫。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "C",
            sit: "attack",
            text: "突入后分球给位置更好的队友",
            check: { attrs: ["passing", "vision"], difficulty: 32, tag: "传球+视野" },
            success: {
              text: "你突进去了。后卫收缩。你分球。队友空了。推射。进了。",
              effects: {
                reputation: 9,
                assists: 1,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "分球被后卫挡了。球弹走了。你的脚踝发酸。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "attack",
            text: "突破后直接起脚射门",
            check: { attrs: ["shooting", "power"], difficulty: 37, tag: "射门+力量" },
            success: {
              text: "你{elementAdj}地突入。抡脚。球贴着门柱内侧钻入网窝。",
              effects: {
                reputation: 12,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "射门被门将扑了。球弹出去。你的脚背发麻。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地突入禁区。一脚抽射。球砸入死角。门将纹丝不动。",
              effects: {
                reputation: 21,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "突破被断后立刻反抢",
            check: { attrs: ["tackle", "intercept"], difficulty: 25, tag: "铲断+拦截" },
            success: {
              text: "球被断了。你就地反抢。一记铲断。球权夺回。肺在烧。",
              effects: {
                reputation: 5,
                attrs: { tackle: 1 }
              }
            },
            fail: {
              text: "反抢扑空。对方顺势反击。你只能回追。大腿发酸。",
              effects: { stamina: -4 }
            }
          }
        ]
      },
{
        text: "边路。两名对方球员把你夹在边线附近。空间越来越小。球在你脚下，对方的脚伸过来。草皮被鞋钉翻得稀烂。汗水滴在草皮上。",
        sit: "balanced",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "用盘带从两人之间挤出去",
            check: { attrs: ["dribble", "agility"], difficulty: 35, tag: "盘带+柔韧" },
            success: {
              text: "你{elementAdj}地拨球。身体一沉。从两人之间挤出去了。草皮在鞋钉下飞退。",
              effects: {
                reputation: 9,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "被夹住了。球弹出去了。你的小腿被踢了一脚。疼。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "B",
            sit: "balanced",
            text: "用身体护住球，等队友接应",
            check: { attrs: ["strength", "balance"], difficulty: 27, tag: "对抗+平衡" },
            success: {
              text: "你像钉子一样卡住。肩膀顶着两个人。队友到了。你分球。",
              effects: {
                reputation: 6,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "你被挤开了。球弹出去。后背撞在广告牌上。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "一脚出球，传给远处的队友",
            check: { attrs: ["passing", "vision"], difficulty: 28, tag: "传球+视野" },
            success: {
              text: "你没恋战。一脚长传。球划过半场。弱侧队友接住了。包夹白做了。",
              effects: {
                reputation: 7,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "长传被拦截了。对方顺势反击。你的脚踝发酸。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "attack",
            text: "用爆发力强行突破边线封锁",
            check: { attrs: ["burst", "speed"], difficulty: 34, tag: "爆发+速度" },
            success: {
              text: "你{elementAdj}地爆发。球趟出去。你追上了。边路打开了。",
              effects: {
                reputation: 8,
                attrs: { burst: 1 }
              }
            },
            fail: {
              text: "爆发时被拉住了。你摔倒了。裁判没吹。你的膝盖发疼。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "丢球后回追，不让对方打反击",
            check: { attrs: ["positioning", "stamina"], difficulty: 24, tag: "站位+耐力" },
            success: {
              text: "球被断了。你拼命回追。卡住位置。对方被迫走边。后卫回位了。",
              effects: {
                reputation: 5,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "回追时腿软了。对方带球推进。你只能看着。大腿在叫。",
              effects: { stamina: -5 }
            }
          }
        ]
      },
{
        text: "前场任意球。苏雯把球吊进禁区。一片混战。球被顶出来，弹在禁区前沿。你在那里。草腥味混着汗味。球在弹跳。",
        sit: "attack",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "迎球凌空抽射",
            check: { attrs: ["shooting", "power"], difficulty: 38, tag: "射门+力量" },
            success: {
              text: "你{elementAdj}地抡脚。球还没落地就被你抽出去了。闷响。网绳剧烈颤抖。",
              effects: {
                reputation: 13,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "抽空了。脚背刮在草皮上。球弹走了。你的脚踝在发麻。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地凌空抽射。球像炮弹一样砸入网窝。全场安静了一秒，然后炸了。",
              effects: {
                reputation: 22,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "停球后带球突入禁区",
            check: { attrs: ["dribble", "agility"], difficulty: 35, tag: "盘带+柔韧" },
            success: {
              text: "你停球。拨球。变向。后卫被晃开了。你突入禁区。",
              effects: {
                reputation: 10,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "停球弹远了。后卫伸脚一捅。球出了底线。你的小腿发疼。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "C",
            sit: "attack",
            text: "分球给位置更好的队友",
            check: { attrs: ["passing", "iq"], difficulty: 29, tag: "传球+球商" },
            success: {
              text: "你没贪。分球。队友迎球推射。进了。配合打出来了。",
              effects: {
                reputation: 8,
                assists: 1,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "分球力量大了。队友没追上。球出了底线。你甩了甩手。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "attack",
            text: "抢在后卫封堵前，扛开空间起脚",
            check: { attrs: ["balance", "strength"], difficulty: 34, tag: "平衡+对抗" },
            success: {
              text: "你{elementAdj}地扛住后卫。肩膀顶着肩膀。空间出来了。起脚。球进了。",
              effects: {
                reputation: 10,
                goals: 1,
                attrs: { balance: 1 }
              }
            },
            fail: {
              text: "没扛住。后卫把你挤开了。球弹走了。你的肋骨在叫。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "射门被封堵后就地反抢",
            check: { attrs: ["tackle", "intercept"], difficulty: 26, tag: "铲断+拦截" },
            success: {
              text: "球被挡出来。你就地反抢。肩膀顶上去。球权夺回。肺在烧。",
              effects: {
                reputation: 5,
                attrs: { tackle: 1 }
              }
            },
            fail: {
              text: "反抢扑空。对方顺势反击。你只能回追。大腿发酸。",
              effects: { stamina: -4 }
            }
          }
        ]
      },
{
        text: "你突入了。但后卫从身后伸脚。球被捅走了。对方顺势要打反击。你的肺还在灼烧。草皮在鞋钉下翻飞。回追的路线就在眼前。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "全速回追，从身后铲断",
            check: { attrs: ["tackle", "speed"], difficulty: 30, tag: "铲断+速度" },
            success: {
              text: "你{elementAdj}地回追。风灌进耳朵。一记干净的铲断。球权夺回。你趴在草皮上。",
              effects: {
                reputation: 7,
                attrs: { tackle: 1 }
              }
            },
            fail: {
              text: "铲空了。你滑出去两米。对方带球继续推进。草皮刮着你的小腿。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "卡住传球线路，逼对方走边",
            check: { attrs: ["positioning", "iq"], difficulty: 26, tag: "站位+球商" },
            success: {
              text: "你没扑。你卡住中路。对方只能走边。速度降了。后卫回位了。",
              effects: {
                reputation: 6,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "站位偏了。对方从中路突过去了。你只能回追。大腿发酸。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "果断出脚，不惜代价延缓推进",
            check: { attrs: ["resolve", "hardness"], difficulty: 28, tag: "决断+硬度" },
            success: {
              text: "你没犹豫。迎上去。肩膀顶住对方。他停了。后卫回位了。你的肋骨在叫。",
              effects: {
                reputation: 6,
                attrs: { resolve: 1 }
              }
            },
            fail: {
              text: "你被晃开了。对方变向。你扑了个空。膝盖发疼。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "D",
            sit: "defense",
            text: "延缓推进，等队友回防到位",
            check: { attrs: ["stamina", "agility"], difficulty: 25, tag: "耐力+柔韧" },
            success: {
              text: "你跟着。一步。两步。队友回来了。对方被围住了。你的肺在烧。",
              effects: {
                reputation: 5,
                attrs: { stamina: 1 }
              }
            },
            fail: {
              text: "你跟不住了。对方加速。你被甩开了。大腿在叫。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "E",
            sit: "balanced",
            text: "断球后立刻长传发动反击",
            check: { attrs: ["passing", "vision"], difficulty: 29, tag: "传球+视野" },
            success: {
              text: "你断下球。抬头。一脚长传。球划过半场。反击打出来了。",
              effects: {
                reputation: 8,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "长传偏了。球飞出边线。你的脚踝发酸。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "补时最后一攻。你带球推进到对方半场。面前是整条防线。看台的声浪压下来。汗水糊住了眼睛。草腥味混着汗味。最后一次了。",
        sit: "attack",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "强行突破，撕开防线",
            check: { attrs: ["dribble", "agility"], difficulty: 39, tag: "盘带+柔韧" },
            success: {
              text: "你{elementAdj}地强突。左。右。后卫被晃开了。你突入禁区。推射。绝杀。",
              effects: {
                reputation: 13,
                goals: 1,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "突破被后卫卡住了。球弹走了。你跪在草皮上。膝盖发疼。",
              effects: { stamina: -5 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地连过两人。突入禁区。推射。绝杀。全场疯了。",
              effects: {
                reputation: 22,
                goals: 1,
                attrs: { dribble: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "弧顶远射，搏一个死角",
            check: { attrs: ["shooting", "power"], difficulty: 38, tag: "射门+力量" },
            success: {
              text: "你{elementAdj}地抡脚。球带着弧线砸入死角。门将纹丝不动。",
              effects: {
                reputation: 12,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "射门打高了。球飞上看台。你的脚背发烫。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你{elementAdj}地抽出一脚世界波。球砸入网窝。绝杀。全场沸腾。",
              effects: {
                reputation: 21,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "C",
            sit: "attack",
            text: "直塞给反跑的前锋",
            check: { attrs: ["passing", "vision"], difficulty: 35, tag: "传球+视野" },
            success: {
              text: "你{elementAdj}地送出直塞。球从人缝中穿过。前锋单刀。推射。绝杀。",
              effects: {
                reputation: 11,
                assists: 1,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "直塞被后卫挡了。球弹走了。你的脚踝发酸。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "D",
            sit: "attack",
            text: "扛开后卫，强行起脚",
            check: { attrs: ["balance", "strength"], difficulty: 36, tag: "平衡+对抗" },
            success: {
              text: "你{elementAdj}地扛住后卫。肩膀顶着肩膀。空间出来了。起脚。球进了。",
              effects: {
                reputation: 11,
                goals: 1,
                attrs: { balance: 1 }
              }
            },
            fail: {
              text: "没扛住。后卫把你挤开了。球弹走了。你的肋骨在叫。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "丢球后拼命回追，不给对方反击",
            check: { attrs: ["intercept", "stamina"], difficulty: 27, tag: "拦截+耐力" },
            success: {
              text: "球被断了。你拼命回追。一记拦截。球权夺回。肺在烧。大腿在叫。",
              effects: {
                reputation: 5,
                attrs: { intercept: 1 }
              }
            },
            fail: {
              text: "回追时腿彻底软了。你摔倒了。对方带球推进。大腿在抽搐。",
              effects: { stamina: -6 }
            }
          }
        ]
      }
    ]
  },
  CAM_stopper: {
    desc: "逼抢、拦截、绞杀",
    events: [
      {
        text: "对方后腰拿球，背对你。草腥味钻进鼻腔。你闻到了机会。鞋钉踩实了草皮。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "凶狠上抢，一脚把球铲走", check: { attrs: ["tackle", "hardness"], difficulty: 28, tag: "铲断+硬度" },
            success: { text: "你扑上去，鞋钉刮起草皮。一记凶狠铲断，球被你捅走。对手摔在草皮上。", effects: { reputation: 7, attrs: { tackle: 1 } } },
            fail: { text: "铲空了。你整个人滑出去，膝盖磕在草皮上。对手推进了。", effects: { stamina: -5 } }
          },
          { id: "B", sit: "defense", text: "高速追抢，从身后把球捅走", check: { attrs: ["speed", "stamina"], difficulty: 29, tag: "速度+耐力" },
            success: { text: "你转身就追。风灌进耳朵。三步之后你追上对手，伸脚把球捅走。肺部在灼烧。", effects: { reputation: 6, attrs: { speed: 1 } } },
            fail: { text: "回追慢了半拍。对手已经分球。你大腿肌肉还在发酸。", effects: { stamina: -5 } }
          },
          { id: "C", sit: "defense", text: "预判出球线路，提前移动卡断", check: { attrs: ["iq", "intercept"], difficulty: 25, tag: "球商+拦截" },
            success: { text: "你预判到对手的出球线路，提前移动。球刚传出，你就伸脚卡断。球权夺回。", effects: { reputation: 6, attrs: { iq: 1 } } },
            fail: { text: "预判错了。球从你身侧穿过。你脚踝还在发酸。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "defense", text: "突然启动扑抢，打对手一个措手不及", check: { attrs: ["burst", "power"], difficulty: 30, tag: "爆发+力量" },
            success: { text: "你突然启动，像猎豹扑食。对手还没反应过来，球已经被你断下。", effects: { reputation: 7, attrs: { burst: 1 } } },
            fail: { text: "扑抢太急。你刹不住脚，撞在对手身上。犯规了。肩膀还在发疼。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "balanced", text: "站住内线，逼对手只能走外线", check: { attrs: ["positioning", "balance"], difficulty: 24, tag: "站位+平衡" },
            success: { text: "你卡住身位，把对手逼向边线。他出球角度没了，只能回传。威胁解除。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "卡位慢了。对手转身抹过你，推进。你大腿还在发酸。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "断球了。面前一片开阔。苏雯在肋部跑位，范志贵在远端招手。你的肺还在灼烧。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "直塞肋部，让苏雯单刀", check: { attrs: ["passing", "vision"], difficulty: 34, tag: "传球+视野" },
            success: { text: "你脚腕一抖，球钻进肋部。苏雯心领神会，单刀推射。网绳晃了一下。", effects: { reputation: 11, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "直塞力量大了。球从苏雯脚边滑过，被门将没收。你脚背还在发麻。", effects: { stamina: -3 } },
            critical: { text: "【灵光一闪】你{elementAdj}地一脚直塞，撕开整条防线。苏雯单刀破门。教练站起来了。", effects: { reputation: 18, assists: 1, attrs: { passing: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "自己盘带推进，杀向禁区", check: { attrs: ["dribble", "agility"], difficulty: 35, tag: "盘带+柔韧" },
            success: { text: "你带球推进，晃开回追的后腰。禁区在望。你低射。球进了。", effects: { reputation: 11, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "盘带趟大了。后卫回追把球捅走。你脚踝还在发疼。", effects: { stamina: -5 } }
          },
          { id: "C", sit: "attack", text: "突然起脚远射，赌门将反应不及", check: { attrs: ["shooting", "burst"], difficulty: 37, tag: "射门+爆发" },
            success: { text: "你抡起就是一脚。球带着风声砸向球门。门将扑了一下，没扑住。球进了。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "射门打偏了。球擦着立柱飞出底线。你脚背还在发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地一脚远射，球划出弧线挂入死角。门将纹丝不动。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "D", sit: "balanced", text: "护球等队友跑位，稳住节奏", check: { attrs: ["strength", "balance"], difficulty: 27, tag: "对抗+平衡" },
            success: { text: "你后背顶住回追的后卫，卡住身位。队友跑出空当，你分球。节奏稳住了。", effects: { reputation: 6, attrs: { strength: 1 } } },
            fail: { text: "你被挤开了。后背撞在对手身上，球丢了。肩膀还在发酸。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "丢球就地反抢，卡住身位", check: { attrs: ["positioning", "balance"], difficulty: 26, tag: "站位+平衡" },
            success: { text: "丢球瞬间你卡住身位，把对手逼向边线。他出球角度没了，只能回传。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "卡位慢了。对手从你身侧抹过，继续推进。你大腿还在发酸。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "对方后腰接球转身。你在他身后两步。草皮被鞋钉翻起一块。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "凶狠上抢，把球铲走", check: { attrs: ["tackle", "hardness"], difficulty: 29, tag: "铲断+硬度" },
            success: { text: "你扑上去，鞋钉刮起草皮。一记凶狠铲断，球被你捅走。对手摔在草皮上。", effects: { reputation: 7, attrs: { tackle: 1 } } },
            fail: { text: "铲空了。你整个人滑出去，膝盖磕在草皮上。对手推进了。", effects: { stamina: -5 } }
          },
          { id: "B", sit: "defense", text: "高速追抢，从身后把球捅走", check: { attrs: ["speed", "stamina"], difficulty: 28, tag: "速度+耐力" },
            success: { text: "你加速追上，伸脚把球捅走。肺部在灼烧。球权夺回。", effects: { reputation: 6, attrs: { speed: 1 } } },
            fail: { text: "回追慢了半拍。对手已经分球。你大腿肌肉还在发酸。", effects: { stamina: -5 } }
          },
          { id: "C", sit: "defense", text: "预判转身方向，提前卡断出球", check: { attrs: ["iq", "intercept"], difficulty: 24, tag: "球商+拦截" },
            success: { text: "你预判到他转身的方向，提前卡住。球刚拨出，你就伸脚截下。球权夺回。", effects: { reputation: 6, attrs: { iq: 1 } } },
            fail: { text: "预判错了。球从你身侧穿过。你脚踝还在发酸。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "defense", text: "突然启动扑抢，打对手一个措手不及", check: { attrs: ["burst", "power"], difficulty: 30, tag: "爆发+力量" },
            success: { text: "你突然启动，像猎豹扑食。对手还没反应过来，球已经被你断下。", effects: { reputation: 7, attrs: { burst: 1 } } },
            fail: { text: "扑抢太急。你刹不住脚，撞在对手身上。犯规了。肩膀还在发疼。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "balanced", text: "贴身施压，把对手逼向边线", check: { attrs: ["pressure", "balance"], difficulty: 23, tag: "抗压+平衡" },
            success: { text: "你贴上对手，肩膀顶肩膀。他扛不住你，只能回传。威胁解除。", effects: { reputation: 5, attrs: { pressure: 1 } } },
            fail: { text: "你没贴住。对手转身抹过你，推进。你肋骨还在发酸。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "对方中卫推进到中线。后卫线在后退。你从前场就开始施压。汗水顺着下巴滴下来。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "前顶对抗，用身体把他顶回去", check: { attrs: ["strength", "hardness"], difficulty: 30, tag: "对抗+硬度" },
            success: { text: "你前顶，肩膀撞上对手胸口。他扛不住，回传了。肋骨发疼，但值了。", effects: { reputation: 7, attrs: { strength: 1 } } },
            fail: { text: "你没顶动他。对手扛着你推进。你肩膀还在发酸。", effects: { stamina: -4 } }
          },
          { id: "B", sit: "defense", text: "回追跟防，卡住身位", check: { attrs: ["speed", "stamina"], difficulty: 28, tag: "速度+耐力" },
            success: { text: "你转身回追，卡住身位。对手推进路线被你堵死。他只能分球。", effects: { reputation: 6, attrs: { speed: 1 } } },
            fail: { text: "回追慢了。对手从你身侧抹过，继续推进。你大腿还在发酸。", effects: { stamina: -5 } }
          },
          { id: "C", sit: "defense", text: "预判传球线路，提前移动卡断", check: { attrs: ["iq", "vision"], difficulty: 25, tag: "球商+视野" },
            success: { text: "你预判到他的传球线路，提前移动。球刚出脚，你就伸脚卡断。球权夺回。", effects: { reputation: 6, attrs: { iq: 1 } } },
            fail: { text: "预判错了。球从你身侧穿过。你脚踝还在发酸。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "defense", text: "突然上抢，打乱对手节奏", check: { attrs: ["burst", "resolve"], difficulty: 31, tag: "爆发+决断" },
            success: { text: "你突然上抢，对手慌乱中把球踢出边线。界外球。威胁解除。", effects: { reputation: 7, attrs: { burst: 1 } } },
            fail: { text: "上抢太急。你扑空了，对手顺势推进。你膝盖还在发疼。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "balanced", text: "卡住身位，切断推进路线", check: { attrs: ["positioning", "balance"], difficulty: 24, tag: "站位+平衡" },
            success: { text: "你卡住身位，把对手逼向边线。他推进路线没了，只能回传。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "卡位慢了。对手从你身侧抹过，继续推进。你大腿还在发酸。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "对方后场倒脚。你指挥队友一起压上。草腥味混着汗味。看台的声浪压下来。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "看准时机出脚，把球断下来", check: { attrs: ["tackle", "hardness"], difficulty: 28, tag: "铲断+硬度" },
            success: { text: "你看准时机，出脚。一记干净铲断，球权夺回。对手摔在草皮上。", effects: { reputation: 7, attrs: { tackle: 1 } } },
            fail: { text: "出脚慢了。对手把球传走。你脚踝还在发酸。", effects: { stamina: -4 } }
          },
          { id: "B", sit: "defense", text: "持续追抢，不给对手喘息", check: { attrs: ["speed", "stamina"], difficulty: 29, tag: "速度+耐力" },
            success: { text: "你持续追抢，对手慌乱中把球踢出边线。肺部在灼烧，但值了。", effects: { reputation: 6, attrs: { speed: 1 } } },
            fail: { text: "追抢太急。你刹不住脚，撞在对手身上。犯规了。肩膀还在发疼。", effects: { stamina: -5 } }
          },
          { id: "C", sit: "defense", text: "预判倒脚线路，提前移动卡断", check: { attrs: ["iq", "intercept"], difficulty: 25, tag: "球商+拦截" },
            success: { text: "你预判到他们的倒脚线路，提前移动。球刚转移，你就伸脚卡断。球权夺回。", effects: { reputation: 6, attrs: { iq: 1 } } },
            fail: { text: "预判错了。球从你身侧穿过。你脚踝还在发酸。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "defense", text: "突然爆发冲刺，扑向持球人", check: { attrs: ["burst", "power"], difficulty: 30, tag: "爆发+力量" },
            success: { text: "你突然爆发，像猎豹扑食。对手还没反应过来，球已经被你断下。", effects: { reputation: 7, attrs: { burst: 1 } } },
            fail: { text: "扑抢太急。你刹不住脚，撞在对手身上。犯规了。肩膀还在发疼。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "balanced", text: "指挥队友保持阵型，整体前压", check: { attrs: ["positioning", "pressure"], difficulty: 24, tag: "站位+抗压" },
            success: { text: "你指挥队友保持阵型，整体前压。对手出球线路被堵死，只能回传。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "指挥慢了。队友没跟上，对手从空当推进。你大腿还在发酸。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "对方边后卫拿球推进。内牛尔被过了。你内收协防。草皮被鞋钉翻起一块。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "凶狠铲断，把球留在边路", check: { attrs: ["tackle", "hardness"], difficulty: 29, tag: "铲断+硬度" },
            success: { text: "你扑上去，鞋钉刮起草皮。一记凶狠铲断，球被你捅出边线。膝盖磕在草皮上。", effects: { reputation: 7, attrs: { tackle: 1 } } },
            fail: { text: "铲空了。你整个人滑出去，膝盖磕在草皮上。对手继续推进。", effects: { stamina: -5 } }
          },
          { id: "B", sit: "defense", text: "高速回追，卡住身位", check: { attrs: ["speed", "stamina"], difficulty: 28, tag: "速度+耐力" },
            success: { text: "你转身回追，卡住身位。对手推进路线被你堵死。他只能回传。", effects: { reputation: 6, attrs: { speed: 1 } } },
            fail: { text: "回追慢了。对手从你身侧抹过，继续推进。你大腿还在发酸。", effects: { stamina: -5 } }
          },
          { id: "C", sit: "defense", text: "预判传中线路，提前伸脚卡断", check: { attrs: ["iq", "positioning"], difficulty: 25, tag: "球商+站位" },
            success: { text: "你预判到他要传中，提前卡住线路。球刚起脚，你就伸脚挡出去。威胁解除。", effects: { reputation: 6, attrs: { iq: 1 } } },
            fail: { text: "预判慢了。球从你头顶飞过，落到禁区。你脚踝还在发酸。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "defense", text: "爆发冲刺，贴身逼抢", check: { attrs: ["burst", "agility"], difficulty: 30, tag: "爆发+柔韧" },
            success: { text: "你突然爆发，贴上对手。他扛不住你，球被你捅走。肺部在灼烧。", effects: { reputation: 7, attrs: { burst: 1 } } },
            fail: { text: "扑抢太急。你刹不住脚，撞在对手身上。犯规了。肩膀还在发疼。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "balanced", text: "用身位卡死他，把他逼到边线", check: { attrs: ["positioning", "balance"], difficulty: 26, tag: "站位+平衡" },
            success: { text: "你卡住身位，把对手逼向边线。他出球角度没了，只能回传。威胁解除。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "卡位慢了。对手转身抹过你，推进。你大腿还在发酸。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "对方前腰在弧顶接球。你贴上去。他触球的一瞬，你闻到了紧张。草腥味钻进鼻腔。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "凶狠上抢，把球铲走", check: { attrs: ["tackle", "hardness"], difficulty: 29, tag: "铲断+硬度" },
            success: { text: "你扑上去，鞋钉刮起草皮。一记凶狠铲断，球被你捅走。对手摔在草皮上。", effects: { reputation: 7, attrs: { tackle: 1 } } },
            fail: { text: "铲空了。你整个人滑出去，膝盖磕在草皮上。对手推进了。", effects: { stamina: -5 } }
          },
          { id: "B", sit: "defense", text: "高速追抢，从身后把球捅走", check: { attrs: ["speed", "stamina"], difficulty: 28, tag: "速度+耐力" },
            success: { text: "你加速追上，伸脚把球捅走。肺部在灼烧。球权夺回。", effects: { reputation: 6, attrs: { speed: 1 } } },
            fail: { text: "回追慢了半拍。对手已经分球。你大腿肌肉还在发酸。", effects: { stamina: -5 } }
          },
          { id: "C", sit: "defense", text: "突然启动扑抢，打对手一个措手不及", check: { attrs: ["burst", "power"], difficulty: 30, tag: "爆发+力量" },
            success: { text: "你突然启动，像猎豹扑食。对手还没反应过来，球已经被你断下。", effects: { reputation: 7, attrs: { burst: 1 } } },
            fail: { text: "扑抢太急。你刹不住脚，撞在对手身上。犯规了。肩膀还在发疼。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "defense", text: "预判出球线路，提前伸脚卡断", check: { attrs: ["iq", "intercept"], difficulty: 25, tag: "球商+拦截" },
            success: { text: "你预判到他的出球线路，提前移动。球刚拨出，你就伸脚卡断。球权夺回。", effects: { reputation: 6, attrs: { iq: 1 } } },
            fail: { text: "预判错了。球从你身侧穿过。你脚踝还在发酸。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "balanced", text: "抢占有利位置，把对手压向边路", check: { attrs: ["positioning", "balance"], difficulty: 24, tag: "站位+平衡" },
            success: { text: "你卡住身位，把对手逼向边线。他出球角度没了，只能回传。威胁解除。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "卡位慢了。对手从你身侧抹过，继续推进。你大腿还在发酸。", effects: { stamina: -3 } }
          }
        ]
      },
{
        text: "角球。对方开出。禁区里人挤人。你被安排在前点。球飞过来了。草腥味混着汗味。鞋钉在草皮上抠出深痕。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "前顶拦截，把球顶出去",
            check: { attrs: ["intercept", "heading"], difficulty: 29, tag: "拦截+头球" },
            success: {
              text: "你{elementAdj}地前顶。额头撞上皮球。闷响。球飞出去了。危险解除。",
              effects: {
                reputation: 6,
                attrs: { intercept: 1 }
              }
            },
            fail: {
              text: "你跳早了。球从头顶飞过。后点空了。你心里一紧。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "用弹跳卡住对方高点，不让他舒服起跳",
            check: { attrs: ["agility", "hardness"], difficulty: 28, tag: "柔韧+硬度" },
            success: {
              text: "你像一堵墙。身体挤住对方。他跳不起来。球被队友顶出去了。",
              effects: {
                reputation: 6,
                attrs: { agility: 1 }
              }
            },
            fail: {
              text: "你被挤开了。对方高高跃起。头球。你的肋骨在叫。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "判断落点，抢在所有人前面解围",
            check: { attrs: ["positioning", "iq"], difficulty: 27, tag: "站位+球商" },
            success: {
              text: "你读对了落点。抢在所有人前面。一脚解围。球飞出去了。",
              effects: {
                reputation: 6,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "判断错了。球落在你身后。对方射门。你的膝盖发软。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "D",
            sit: "defense",
            text: "解围后立刻压上，发动反击",
            check: { attrs: ["passing", "vision"], difficulty: 30, tag: "传球+视野" },
            success: {
              text: "你顶出去。抬头。一脚长传。球找到前锋。反击打出来了。",
              effects: {
                reputation: 8,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "长传偏了。球飞出边线。你的脚踝发酸。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "二点球争夺，果断出脚铲断",
            check: { attrs: ["resolve", "tackle"], difficulty: 26, tag: "决断+铲断" },
            success: {
              text: "球被顶出来。弹在禁区前沿。你没犹豫。冲上去。一记铲断。球权夺回。",
              effects: {
                reputation: 5,
                attrs: { resolve: 1 }
              }
            },
            fail: {
              text: "铲空了。你滑出去。对方二点球射门。草皮刮着你的小腿。",
              effects: { stamina: -5 }
            }
          }
        ]
      },
{
        text: "对方门将准备开球门球。你站在中圈附近，眼睛盯着他。草腥味混着汗味。看台的声浪压下来。你闻到了机会。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "指挥队友一起压上，封死出球线路",
            check: { attrs: ["iq", "pressure"], difficulty: 27, tag: "球商+抗压" },
            success: {
              text: "你喊了。队友压上了。出球线路全被封死。门将犹豫了。球被断下。",
              effects: {
                reputation: 7,
                attrs: { iq: 1 }
              }
            },
            fail: {
              text: "队友没跟上。逼抢脱节了。门将从容出球。你甩了甩手。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "直接冲向接球的后卫，前顶逼抢",
            check: { attrs: ["intercept", "tackle"], difficulty: 30, tag: "拦截+铲断" },
            success: {
              text: "你{elementAdj}地冲上去。后卫慌了。停球大了。你断下。球权夺回。",
              effects: {
                reputation: 7,
                attrs: { intercept: 1 }
              }
            },
            fail: {
              text: "你扑空了。后卫从容出球。你多跑了两步。大腿发酸。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "果断上抢，用侵略性卡住接球者",
            check: { attrs: ["resolve", "hardness"], difficulty: 28, tag: "决断+硬度" },
            success: {
              text: "你没犹豫。贴上去。肩膀顶住对方。他转不了身。球被队友断下了。",
              effects: {
                reputation: 6,
                attrs: { resolve: 1 }
              }
            },
            fail: {
              text: "你被晃开了。对方转身出球。你的膝盖发疼。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "断球后找准位置，直塞发动快攻",
            check: { attrs: ["positioning", "vision"], difficulty: 31, tag: "站位+视野" },
            success: {
              text: "你断下球。抬头。一脚直塞。球找到前锋。快攻打出来了。",
              effects: {
                reputation: 8,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "直塞被后卫挡了。球弹走了。你的脚踝发酸。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "保持阵型，用跑动持续施压",
            check: { attrs: ["stamina", "positioning"], difficulty: 24, tag: "耐力+站位" },
            success: {
              text: "你没急。你压着。十秒。二十秒。对方出球失误了。球权夺回。",
              effects: {
                reputation: 5,
                attrs: { stamina: 1 }
              }
            },
            fail: {
              text: "你压太久了。对方一脚长传打穿了你身后。你只能回追。大腿在叫。",
              effects: { stamina: -4 }
            }
          }
        ]
      },
{
        text: "少打一人。队友被红牌罚下了。对方在中场倒脚，寻找空当。你站在中圈，肺在烧。草腥味混着汗味。看台的嘘声压下来。你得加大绞杀。",
        sit: "balanced",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "前顶逼抢对方持球者，不给他从容出球",
            check: { attrs: ["intercept", "tackle"], difficulty: 31, tag: "拦截+铲断" },
            success: {
              text: "你{elementAdj}地前顶。对方慌了。出球失误。你断下。球权夺回。",
              effects: {
                reputation: 7,
                attrs: { intercept: 1 }
              }
            },
            fail: {
              text: "你扑空了。对方从容出球。你多跑了两步。大腿发酸。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "凶狠绞杀对方核心，不惜犯规",
            check: { attrs: ["resolve", "hardness"], difficulty: 30, tag: "决断+硬度" },
            success: {
              text: "你贴上去。肩膀顶住对方。他转不了身。球被队友断下了。",
              effects: {
                reputation: 6,
                attrs: { resolve: 1 }
              }
            },
            fail: {
              text: "你被晃开了。对方转身出球。你的膝盖发疼。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "卡住传球线路，用站位切断配合",
            check: { attrs: ["positioning", "iq"], difficulty: 27, tag: "站位+球商" },
            success: {
              text: "你没扑。你卡住线路。对方传不出去了。犹豫了。球被断了。",
              effects: {
                reputation: 6,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "站位偏了。对方从你身后传过去了。你只能看着。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "断球后长传找前锋，打反击",
            check: { attrs: ["passing", "vision"], difficulty: 30, tag: "传球+视野" },
            success: {
              text: "你断下球。抬头。一脚长传。球找到前锋。反击打出来了。",
              effects: {
                reputation: 8,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "长传偏了。球飞出边线。你的脚踝发酸。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "用跑动和爆发弥补人数劣势",
            check: { attrs: ["stamina", "agility"], difficulty: 28, tag: "耐力+柔韧" },
            success: {
              text: "你跑。左。右。前。后。你一个人顶两个人。对方传不出去了。",
              effects: {
                reputation: 6,
                attrs: { stamina: 1 }
              }
            },
            fail: {
              text: "你跑不动了。腿像灌了铅。对方从你面前传过去了。大腿在抽搐。",
              effects: { stamina: -6 }
            }
          }
        ]
      },
{
        text: "读秒阶段。你们一球领先。对方全线压上。球到了对方后腰脚下。他抬头看了一眼。草腥味混着汗味。看台全站起来了。你得守住这最后一下。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "前顶拦截，把球断下来",
            check: { attrs: ["intercept", "tackle"], difficulty: 32, tag: "拦截+铲断" },
            success: {
              text: "你{elementAdj}地前顶。一记干净的拦截。球权夺回。比赛结束了。你跪在草皮上。",
              effects: {
                reputation: 8,
                attrs: { intercept: 1 }
              }
            },
            fail: {
              text: "你扑空了。对方带球推进。你只能回追。大腿在叫。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "用最后的体力卡住对方推进",
            check: { attrs: ["stamina", "hardness"], difficulty: 30, tag: "耐力+硬度" },
            success: {
              text: "你迎上去。肩膀顶住对方。他停了。后卫回位了。你的肋骨在叫。",
              effects: {
                reputation: 7,
                attrs: { stamina: 1 }
              }
            },
            fail: {
              text: "你被晃开了。对方变向。你扑了个空。膝盖发疼。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "卡住传球线路，逼对方走边",
            check: { attrs: ["positioning", "iq"], difficulty: 28, tag: "站位+球商" },
            success: {
              text: "你没扑。你卡住中路。对方只能走边。速度降了。时间到了。",
              effects: {
                reputation: 6,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "站位偏了。对方从中路传过去了。你心里一紧。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "defense",
            text: "断球后大脚解围，把球踢出边线",
            check: { attrs: ["power", "resolve"], difficulty: 26, tag: "力量+决断" },
            success: {
              text: "你断下球。抡脚。球飞出去了。边线。时间到了。你喘了口气。",
              effects: {
                reputation: 5,
                attrs: { power: 1 }
              }
            },
            fail: {
              text: "解围没踢远。球弹回来了。对方继续进攻。你的脚背发麻。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "读懂对方意图，提前卡位断球",
            check: { attrs: ["iq", "tackle"], difficulty: 31, tag: "球商+铲断" },
            success: {
              text: "你读对了。对方要直塞。你提前一步。断下了。比赛结束了。你跪在草皮上。",
              effects: {
                reputation: 7,
                attrs: { iq: 1 }
              }
            },
            fail: {
              text: "判断错了。对方变向。你扑了个空。大腿在抽搐。",
              effects: { stamina: -6 }
            }
          }
        ]
      }
    ]
  },
  CAM_cover: {
    desc: "调度、节奏、稳健",
    events: [
      {
        text: "后场接球，对方前锋逼上来。草腥味钻进鼻腔。你抬头看了一眼。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "balanced", text: "长传转移，打到弱侧", check: { attrs: ["passing", "vision"], difficulty: 29, tag: "传球+视野" },
            success: { text: "你脚弓一推，球划过半场。弱侧队友接球，面前一片开阔。转移成了。", effects: { reputation: 8, attrs: { passing: 1 } } },
            fail: { text: "长传力量大了。球飞出边线。你脚背还在发麻。", effects: { stamina: -3 } }
          },
          { id: "B", sit: "balanced", text: "盘带摆脱，晃开逼抢", check: { attrs: ["dribble", "agility"], difficulty: 28, tag: "盘带+柔韧" },
            success: { text: "你拨球变向，晃开逼抢的前锋。面前空了。你抬头，继续推进。", effects: { reputation: 7, attrs: { dribble: 1 } } },
            fail: { text: "拨球趟大了。前锋伸脚把球捅走。你脚踝还在发疼。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "attack", text: "突然起脚远射，打一个措手不及", check: { attrs: ["shooting", "burst"], difficulty: 36, tag: "射门+爆发" },
            success: { text: "你突然起脚。球带着风声砸向球门。门将扑了一下，没扑住。球进了。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "射门打偏了。球擦着立柱飞出底线。你脚背还在发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地一脚远射，球划出弧线挂入死角。门将纹丝不动。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "D", sit: "balanced", text: "护球转身，稳住节奏", check: { attrs: ["strength", "balance"], difficulty: 25, tag: "对抗+平衡" },
            success: { text: "你后背顶住前锋，卡住身位。他推不动你。你转身，分球。节奏稳住了。", effects: { reputation: 6, attrs: { strength: 1 } } },
            fail: { text: "你被挤开了。后背撞在对手身上，球丢了。肩膀还在发酸。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "回传门将，重新组织", check: { attrs: ["positioning", "iq"], difficulty: 22, tag: "站位+球商" },
            success: { text: "你回传门将，自己跑位。进攻重新组织。节奏在你手里。", effects: { reputation: 4, attrs: { positioning: 1 } } },
            fail: { text: "回传力量小了。门将差点没接住。你脚底还在发麻。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "中圈附近，你接到分球。苏雯在肋部跑位，范志贵在远端招手。汗水顺着下巴滴下来。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "attack", text: "直塞肋部，撕开防线", check: { attrs: ["passing", "vision"], difficulty: 35, tag: "传球+视野" },
            success: { text: "你脚腕一抖，球钻进肋部。苏雯心领神会，单刀推射。网绳晃了一下。", effects: { reputation: 11, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "直塞力量大了。球从苏雯脚边滑过，被门将没收。你脚背还在发麻。", effects: { stamina: -3 } },
            critical: { text: "【灵光一闪】你{elementAdj}地一脚直塞，撕开整条防线。苏雯单刀破门。教练把战术板摔了。", effects: { reputation: 19, assists: 1, attrs: { passing: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "balanced", text: "盘带摆脱，晃开逼抢再分球", check: { attrs: ["dribble", "agility"], difficulty: 28, tag: "盘带+柔韧" },
            success: { text: "你拨球变向，晃开逼抢的对手。面前空了。你分球。进攻拉开了。", effects: { reputation: 7, attrs: { dribble: 1 } } },
            fail: { text: "拨球趟大了。对手伸脚把球捅走。你脚踝还在发疼。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "attack", text: "拔脚就射，远射偷袭门将", check: { attrs: ["shooting", "burst"], difficulty: 37, tag: "射门+爆发" },
            success: { text: "你抡起就是一脚。球带着风声砸向球门。门将扑了一下，没扑住。球进了。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "射门打偏了。球擦着立柱飞出底线。你脚背还在发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地一脚远射，球划出弧线挂入死角。门将纹丝不动。球场炸了。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "D", sit: "balanced", text: "护球等队友跑位，稳住节奏", check: { attrs: ["strength", "balance"], difficulty: 26, tag: "对抗+平衡" },
            success: { text: "你后背顶住后腰，卡住身位。队友跑出空当，你分球。节奏稳住了。", effects: { reputation: 6, attrs: { strength: 1 } } },
            fail: { text: "你被挤开了。后背撞在对手身上，球丢了。肩膀还在发酸。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "卡住身位，堵住对手推进路线", check: { attrs: ["positioning", "iq"], difficulty: 24, tag: "站位+球商" },
            success: { text: "你卡住身位，把对手逼向边线。他推进路线没了，只能回传。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "卡位慢了。对手从你身侧抹过，推进。你大腿还在发酸。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "中场拿球，对方在逼抢。草腥味混着汗味。你抬头看了一眼。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "balanced", text: "直塞肋部，找反越位的前锋", check: { attrs: ["passing", "vision"], difficulty: 30, tag: "传球+视野" },
            success: { text: "你脚腕一抖，球钻进肋部。前锋反越位成功，单刀。配合成了。", effects: { reputation: 9, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "直塞力量小了。后卫回追把球捅走。你脚底还在发麻。", effects: { stamina: -3 } }
          },
          { id: "B", sit: "balanced", text: "盘带摆脱，晃开逼抢", check: { attrs: ["dribble", "agility"], difficulty: 29, tag: "盘带+柔韧" },
            success: { text: "你拨球变向，晃开逼抢的对手。面前空了。你抬头，继续推进。", effects: { reputation: 7, attrs: { dribble: 1 } } },
            fail: { text: "拨球趟大了。对手伸脚把球捅走。你脚踝还在发疼。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "attack", text: "冷不丁一脚远射，打门将个愣神", check: { attrs: ["shooting", "burst"], difficulty: 36, tag: "射门+爆发" },
            success: { text: "你抡起就是一脚。球带着风声砸向球门。门将扑了一下，没扑住。球进了。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "射门打偏了。球擦着立柱飞出底线。你脚背还在发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地一脚远射，球划出弧线挂入死角。门将纹丝不动。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "D", sit: "defense", text: "丢球就地反抢，掐断反击", check: { attrs: ["tackle", "intercept"], difficulty: 25, tag: "铲断+拦截" },
            success: { text: "丢球瞬间你就地反抢。一记干净铲断，球权夺回。肺部在灼烧，但值得。", effects: { reputation: 5, attrs: { tackle: 1 } } },
            fail: { text: "反抢扑空。对方顺势推进。你只能看着他们背影，大腿发酸。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "defense", text: "站住位置，堵住对手推进路线", check: { attrs: ["positioning", "pressure"], difficulty: 24, tag: "站位+抗压" },
            success: { text: "你站住位置，对手推进路线被你堵死。他只能回传。威胁解除。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "站位偏了。对手从你身侧抹过，推进。你大腿还在发酸。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "对方发动快速反击。你是最后一道屏障。草皮被鞋钉翻起一块。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "拦截直塞球，切断反击", check: { attrs: ["intercept", "iq"], difficulty: 26, tag: "拦截+球商" },
            success: { text: "你卡住传球线路。对手直塞的一瞬，你伸脚把球截下。反击被掐断。", effects: { reputation: 6, attrs: { intercept: 1 } } },
            fail: { text: "预判错了。球从你身侧穿过，对手单刀。你脚踝还在发酸。", effects: { stamina: -5 } }
          },
          { id: "B", sit: "defense", text: "回追对方前锋，从身后把球捅走", check: { attrs: ["speed", "stamina"], difficulty: 29, tag: "速度+耐力" },
            success: { text: "你转身就追。风灌进耳朵。三步之后你追上对手，伸脚把球捅走。肺部在灼烧。", effects: { reputation: 6, attrs: { speed: 1 } } },
            fail: { text: "回追慢了半拍。对手已经射门。你大腿肌肉还在发酸。", effects: { stamina: -5 } }
          },
          { id: "C", sit: "defense", text: "卡住身位，堵住突破路线", check: { attrs: ["positioning", "balance"], difficulty: 24, tag: "站位+平衡" },
            success: { text: "你卡住身位，把对手逼向边线。他突破路线没了，只能回传。威胁解除。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "卡位慢了。对手从你身侧抹过，继续推进。你大腿还在发酸。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "defense", text: "爆发冲刺，追上对手贴身逼抢", check: { attrs: ["burst", "resolve"], difficulty: 30, tag: "爆发+决断" },
            success: { text: "你突然爆发，追上对手。贴身逼抢。他扛不住你，球被你捅走。", effects: { reputation: 7, attrs: { burst: 1 } } },
            fail: { text: "扑抢太急。你刹不住脚，撞在对手身上。犯规了。肩膀还在发疼。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "balanced", text: "断球后快速转移，发动反击", check: { attrs: ["passing", "vision"], difficulty: 29, tag: "传球+视野" },
            success: { text: "你断下球，一脚长传转移。反击发动了。队友面前一片开阔。", effects: { reputation: 8, attrs: { passing: 1 } } },
            fail: { text: "转移力量大了。球飞出边线。你脚背还在发麻。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "角旗区，你主罚角球。禁区里人挤人。草腥味混着汗味。看台的声浪压下来。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "弧线球传前点，找队友头球", check: { attrs: ["passing", "vision"], difficulty: 34, tag: "传球+视野" },
            success: { text: "你开出弧线球。前点队友甩头攻门。球进了。配合成了。", effects: { reputation: 10, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "传中力量大了。球从队友头顶飞过，被门将没收。你脚背还在发麻。", effects: { stamina: -3 } },
            critical: { text: "【灵光一闪】你{elementAdj}地开出弧线球，精准找到队友。头球破门。教练站起来了。", effects: { reputation: 18, assists: 1, attrs: { passing: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "balanced", text: "盘带拉开角度，再传中", check: { attrs: ["dribble", "agility"], difficulty: 29, tag: "盘带+柔韧" },
            success: { text: "你拨球拉开角度，晃开逼抢的对手。传中。球落到禁区。", effects: { reputation: 7, attrs: { dribble: 1 } } },
            fail: { text: "拨球趟大了。对手伸脚把球捅走。你脚踝还在发疼。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "attack", text: "前点抢点，头球攻门", check: { attrs: ["heading", "strength"], difficulty: 35, tag: "头球+对抗" },
            success: { text: "你突然前插到前点，甩开后卫。队友把球做过来，你甩头攻门。球进了。", effects: { reputation: 11, goals: 1, attrs: { heading: 1 } } },
            fail: { text: "起跳晚了。后卫卡住身位，球被解围。你脖子还在发酸。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地前插甩头，球砸入死角。门将纹丝不动。全场沸腾了。", effects: { reputation: 19, goals: 1, attrs: { heading: 2 }, flags: { keySuccess: true } } }
          },
          { id: "D", sit: "attack", text: "直接轰门，打一个死角", check: { attrs: ["shooting", "power"], difficulty: 38, tag: "射门+力量" },
            success: { text: "你直接轰门。球带着风声砸向死角。门将扑了一下，没扑住。球进了。", effects: { reputation: 13, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "射门打偏了。球擦着立柱飞出底线。你脚背还在发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你{elementAdj}地直接轰门，球划出弧线挂入死角。门将纹丝不动。球场炸了。", effects: { reputation: 21, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "E", sit: "balanced", text: "扛住对手护住球，稳住节奏", check: { attrs: ["strength", "balance"], difficulty: 26, tag: "对抗+平衡" },
            success: { text: "你后背顶住逼抢的对手，卡住身位。他推不动你。队友跑出空当，你分球。节奏稳住了。", effects: { reputation: 6, attrs: { strength: 1 } } },
            fail: { text: "你被挤开了。后背撞在对手身上，球丢了。肩膀还在发酸。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "对方长传冲吊。你是拖后中场。草皮被鞋钉翻起一块。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "争顶头球，把球顶远", check: { attrs: ["heading", "strength"], difficulty: 27, tag: "头球+对抗" },
            success: { text: "你起跳争顶，额头撞上球。球被你顶远。威胁解除。脖子还在发酸。", effects: { reputation: 6, attrs: { heading: 1 } } },
            fail: { text: "争顶没顶到。球从你头顶飞过，落到禁区。你脚踝还在发酸。", effects: { stamina: -4 } }
          },
          { id: "B", sit: "defense", text: "回追护住第二落点", check: { attrs: ["speed", "stamina"], difficulty: 28, tag: "速度+耐力" },
            success: { text: "你转身回追，抢先卡住第二落点。球落地，你一脚解围。威胁解除。肺部在灼烧。", effects: { reputation: 6, attrs: { speed: 1 } } },
            fail: { text: "回追慢了。对手抢到第二落点，射门。你大腿肌肉还在发酸。", effects: { stamina: -5 } }
          },
          { id: "C", sit: "balanced", text: "护住落点，快速转移发动反击", check: { attrs: ["passing", "vision"], difficulty: 29, tag: "传球+视野" },
            success: { text: "你护住落点，一脚长传转移。反击发动了。队友面前一片开阔。", effects: { reputation: 8, attrs: { passing: 1 } } },
            fail: { text: "长传力量大了。球飞出边线。你脚背还在发麻。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "defense", text: "贴身对抗，把对方前锋挤出禁区", check: { attrs: ["strength", "balance"], difficulty: 27, tag: "对抗+平衡" },
            success: { text: "你贴上对手，肩膀顶肩膀。他扛不住你，被挤出禁区。威胁解除。", effects: { reputation: 6, attrs: { strength: 1 } } },
            fail: { text: "你没挤动他。对手扛着你射门。你肩膀还在发酸。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "defense", text: "爆发冲刺，抢先拿到第二落点", check: { attrs: ["burst", "speed"], difficulty: 29, tag: "爆发+速度" },
            success: { text: "你突然爆发，抢先拿到第二落点。一脚解围。威胁解除。肺部在灼烧。", effects: { reputation: 6, attrs: { burst: 1 } } },
            fail: { text: "启动慢了。对手抢先拿到球，射门。你大腿肌肉还在发酸。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "读秒阶段。你们一球领先。对方全线压上。草腥味混着汗味。后场一片开阔。",
        sit: "defense",
        choices: [
          { id: "A", sit: "balanced", text: "长传转移，发动反击", check: { attrs: ["passing", "vision"], difficulty: 30, tag: "传球+视野" },
            success: { text: "你一脚长传转移。队友面前一片开阔。反击发动了。", effects: { reputation: 8, attrs: { passing: 1 } } },
            fail: { text: "长传力量大了。球飞出边线。你脚背还在发麻。", effects: { stamina: -3 } }
          },
          { id: "B", sit: "balanced", text: "盘带摆脱，晃开逼抢", check: { attrs: ["dribble", "agility"], difficulty: 28, tag: "盘带+柔韧" },
            success: { text: "你拨球变向，晃开逼抢的对手。面前空了。你继续推进。", effects: { reputation: 7, attrs: { dribble: 1 } } },
            fail: { text: "拨球趟大了。对手伸脚把球捅走。你脚踝还在发疼。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "defense", text: "死死卡住内线，逼他往边线走", check: { attrs: ["positioning", "iq"], difficulty: 24, tag: "站位+球商" },
            success: { text: "你卡住身位，把对手逼向边线。他出球角度没了，只能回传。时间耗掉了。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "卡位慢了。对手从你身侧抹过，推进。你大腿还在发酸。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "defense", text: "果断解围，把球踢出危险区域", check: { attrs: ["resolve", "power"], difficulty: 28, tag: "决断+力量" },
            success: { text: "你果断解围，一脚把球踢出危险区域。看台松了口气。", effects: { reputation: 5, attrs: { resolve: 1 } } },
            fail: { text: "解围踢呲了。球没踢远，对手继续进攻。你脚背还在发麻。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "defense", text: "贴身对抗，扛住对手护住球", check: { attrs: ["strength", "balance"], difficulty: 27, tag: "对抗+平衡" },
            success: { text: "你贴上对手，肩膀顶肩膀。他扛不动你，球被你护住。时间一秒一秒耗掉。", effects: { reputation: 6, attrs: { strength: 1 } } },
            fail: { text: "你被挤开了。球丢了。对手发动最后一攻。你肩膀还在发酸。", effects: { stamina: -3 } }
          }
        ]
      },
{
        text: "对方在肋部连续配合。你的队友被扯开了。空当露出来了。草皮被鞋钉翻起。你不动声色地往回收。草腥味混着汗味。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "补位封堵，卡住对方的传球线路",
            check: { attrs: ["positioning", "iq"], difficulty: 28, tag: "站位+球商" },
            success: {
              text: "你{elementAdj}地补上了。对方传不出去了。犹豫了。球被断了。",
              effects: {
                reputation: 7,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "你补慢了。对方已经传过去了。你只能看着。膝盖发软。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "正面迎上去，用身体对抗延缓",
            check: { attrs: ["strength", "hardness"], difficulty: 29, tag: "对抗+硬度" },
            success: {
              text: "你迎上去。肩膀顶住对方。他停了。后卫回位了。你的肋骨在叫。",
              effects: {
                reputation: 6,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "你被晃开了。对方变向。你扑了个空。膝盖发疼。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "看准时机，果断出脚铲断",
            check: { attrs: ["resolve", "tackle"], difficulty: 30, tag: "决断+铲断" },
            success: {
              text: "你等了。对方触球的那一瞬。你伸脚。干净的铲断。球权夺回。",
              effects: {
                reputation: 7,
                attrs: { resolve: 1 }
              }
            },
            fail: {
              text: "铲空了。你滑出去两米。对方带球继续推进。草皮刮着你的小腿。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "D",
            sit: "defense",
            text: "延缓推进，等队友回防落位",
            check: { attrs: ["stamina", "agility"], difficulty: 25, tag: "耐力+柔韧" },
            success: {
              text: "你没扑。你跟着。一步。两步。队友回来了。对方被围住了。",
              effects: {
                reputation: 5,
                attrs: { stamina: 1 }
              }
            },
            fail: {
              text: "你跟不住了。对方加速。你被甩开了。大腿在叫。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "E",
            sit: "balanced",
            text: "断球后从容出球，重新组织",
            check: { attrs: ["passing", "vision"], difficulty: 27, tag: "传球+视野" },
            success: {
              text: "你断下球。抬头。一脚分球。节奏稳住了。你喘了口气。",
              effects: {
                reputation: 6,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "出球被断了。对方继续进攻。你的脚踝发酸。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "对方换人了。一个速度型边锋上场了。你看见他站在边线，做着拉伸。草腥味混着汗味。你得调整。教练在场边喊了什么。",
        sit: "balanced",
        choices: [
          {
            id: "A",
            sit: "balanced",
            text: "调整站位，偏向对方新上场的一侧",
            check: { attrs: ["positioning", "iq"], difficulty: 26, tag: "站位+球商" },
            success: {
              text: "你{elementAdj}地调整了。偏向左路。对方边锋拿球时，你已经在那里了。他停了。",
              effects: {
                reputation: 6,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "你调得太慢了。对方边锋已经突过去了。你只能回追。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "B",
            sit: "balanced",
            text: "指挥队友落位，重新布置防线",
            check: { attrs: ["rhythm", "pressure"], difficulty: 24, tag: "节奏+抗压" },
            success: {
              text: "你喊了。队友落位了。防线重新紧凑了。对方边锋拿球时，面前是两个人。",
              effects: {
                reputation: 6,
                attrs: { rhythm: 1 }
              }
            },
            fail: {
              text: "队友没听见。防线还是散的。对方边锋突过去了。你甩了甩手。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "主动迎上去，用对抗压制对方边锋",
            check: { attrs: ["strength", "hardness"], difficulty: 29, tag: "对抗+硬度" },
            success: {
              text: "你迎上去。肩膀顶住对方。他停了。速度起不来。你的肋骨在叫。",
              effects: {
                reputation: 6,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "你被速度晃开了。对方变向。你扑了个空。膝盖发疼。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "D",
            sit: "defense",
            text: "用速度回追，卡住对方突破路线",
            check: { attrs: ["speed", "agility"], difficulty: 30, tag: "速度+柔韧" },
            success: {
              text: "对方边锋启动了。你回追。一步。两步。你卡住了。他被迫走边。",
              effects: {
                reputation: 7,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "你追不上。对方已经突过去了。你的大腿在叫。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "E",
            sit: "balanced",
            text: "断球后大脚长传，把压力甩回去",
            check: { attrs: ["power", "vision"], difficulty: 28, tag: "力量+视野" },
            success: {
              text: "你断下球。抡脚。球划过半场。压力甩回去了。",
              effects: {
                reputation: 7,
                attrs: { power: 1 }
              }
            },
            fail: {
              text: "长传偏了。球飞出边线。你的脚踝发酸。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "对方边路传中。球划出一道弧线，吊向禁区。你站在禁区前沿。草腥味混着汗味。第二落点。那是你的区域。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "判断落点，抢下第二落点",
            check: { attrs: ["positioning", "iq"], difficulty: 27, tag: "站位+球商" },
            success: {
              text: "你{elementAdj}地读对了落点。球弹出来。你在那里。一脚解围。危险解除。",
              effects: {
                reputation: 6,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "判断错了。球落在你身后。对方射门。你的膝盖发软。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "用身体卡住对方插上的球员",
            check: { attrs: ["strength", "balance"], difficulty: 28, tag: "对抗+平衡" },
            success: {
              text: "你像一堵墙。卡住对方。他抢不到二点球。队友解围了。",
              effects: {
                reputation: 6,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "你被挤开了。对方抢到二点球。射门。你的肋骨在叫。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "迎球解围，把球踢远",
            check: { attrs: ["power", "resolve"], difficulty: 26, tag: "力量+决断" },
            success: {
              text: "你迎上去。抡脚。球飞出去了。三十米。危险解除。",
              effects: {
                reputation: 5,
                attrs: { power: 1 }
              }
            },
            fail: {
              text: "解围没踢远。球弹回来了。对方继续进攻。你的脚背发麻。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "defense",
            text: "跃起解围，用弹跳抢在对方前面",
            check: { attrs: ["agility", "heading"], difficulty: 29, tag: "柔韧+头球" },
            success: {
              text: "你跃起。额头撞上皮球。闷响。球飞出去了。你落地时喘了口气。",
              effects: {
                reputation: 6,
                attrs: { agility: 1 }
              }
            },
            fail: {
              text: "你跳早了。球从头顶飞过。后点空了。你心里一紧。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "E",
            sit: "balanced",
            text: "解围后从容出球，发动反击",
            check: { attrs: ["passing", "vision"], difficulty: 29, tag: "传球+视野" },
            success: {
              text: "你解围了。抬头。一脚长传。球找到前锋。反击打出来了。",
              effects: {
                reputation: 8,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "长传偏了。球飞出边线。你的脚踝发酸。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "比赛第八十分钟。你的大腿像灌了铅。每一次呼吸都带着铁锈味。对方还在压。草腥味混着汗味。你得撑住。队友在看你。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "咬牙站住位置，用最后的力气指挥防线",
            check: { attrs: ["pressure", "iq"], difficulty: 28, tag: "抗压+球商" },
            success: {
              text: "你{elementAdj}地站住了。你喊了。队友落位了。对方传不进去。你喘了口气。",
              effects: {
                reputation: 7,
                attrs: { pressure: 1 }
              }
            },
            fail: {
              text: "你喊不动了。嗓子哑了。防线散了。对方突进去了。大腿在抽搐。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "用身体对抗扛住对方最后一波冲击",
            check: { attrs: ["strength", "hardness"], difficulty: 30, tag: "对抗+硬度" },
            success: {
              text: "你迎上去。肩膀顶住对方。他停了。你的肋骨在叫。但你还在。",
              effects: {
                reputation: 6,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "你扛不住了。被挤开。对方突过去了。后背撞在广告牌上。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "看准时机，果断出脚铲断",
            check: { attrs: ["resolve", "tackle"], difficulty: 31, tag: "决断+铲断" },
            success: {
              text: "你等了。对方触球的那一瞬。你伸脚。干净的铲断。你趴在草皮上。",
              effects: {
                reputation: 7,
                attrs: { resolve: 1 }
              }
            },
            fail: {
              text: "铲空了。你滑出去。腿彻底软了。对方带球推进。",
              effects: { stamina: -6 }
            }
          },
          {
            id: "D",
            sit: "defense",
            text: "用耐力撑住，跟着对方跑",
            check: { attrs: ["stamina", "agility"], difficulty: 27, tag: "耐力+柔韧" },
            success: {
              text: "你跟着。一步。两步。你没掉。对方传不出去了。时间到了。",
              effects: {
                reputation: 6,
                attrs: { stamina: 1 }
              }
            },
            fail: {
              text: "你跟不住了。腿像灌了铅。对方从你面前突过去了。大腿在抽搐。",
              effects: { stamina: -6 }
            }
          },
          {
            id: "E",
            sit: "balanced",
            text: "断球后一脚长传，把压力甩出去",
            check: { attrs: ["passing", "vision"], difficulty: 28, tag: "传球+视野" },
            success: {
              text: "你断下球。抡脚。球划过半场。压力甩出去了。你喘了口气。",
              effects: {
                reputation: 6,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "长传没力气了。球只飞了十米。对方又压回来了。你的脚踝发酸。",
              effects: { stamina: -4 }
            }
          }
        ]
      }
    ]
  },
CB_impact: {
    desc: "上抢、推进、带刀",
    events: [
      {
        text: "对手中场带球推进，草皮被鞋钉掀起。你从中卫位置迎球上抢，汗水顺着下巴往下滴。看台的吼声压过来。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "看准时机一记凶狠铲断，连人带球留下", check: { attrs: ["tackle", "hardness"], difficulty: 28, tag: "铲断+硬度" },
            success: { text: "你{elementAdj}地下脚，鞋钉贴着草皮铲过去。球和人一起被你留下。对手坐在草上发愣。", effects: { reputation: 9, attrs: { tackle: 1 } } },
            fail: { text: "下脚慢了半拍。对手拨球晃过，你的膝盖磕在草皮上，火辣辣地疼。", effects: { stamina: -4 } }
          },
          { id: "B", sit: "defense", text: "全速回追，用速度卡死他的推进线路", check: { attrs: ["speed", "stamina"], difficulty: 26, tag: "速度+耐力" },
            success: { text: "你转身就追，肺在烧，腿在酸。两步并一步，你卡到他身前，把球护出底线。", effects: { reputation: 7, attrs: { speed: 1 } } },
            fail: { text: "回追慢了一拍。对手顺势抹过，你只能拽住他的衣角，球衣被扯得老长。", effects: { stamina: -5 } }
          },
          { id: "C", sit: "balanced", text: "抬头一脚出球，把球分到弱侧化解推进", check: { attrs: ["passing", "vision"], difficulty: 27, tag: "传球+视野" },
            success: { text: "你不硬碰，先把球摘下来，一脚分到弱侧。对手的推进势头，被你这一传化掉了。", effects: { reputation: 7, attrs: { passing: 1 } } },
            fail: { text: "出球力量小了。对手半路把球截下，顺势反击。你的脚踝还在发麻。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "defense", text: "果断上抢，用身体把他撞离皮球", check: { attrs: ["resolve", "strength"], difficulty: 29, tag: "决断+对抗" },
            success: { text: "你毫不犹豫，肩膀一沉撞上去。对手重心丢了，球权易主。这一下够硬。", effects: { reputation: 8, attrs: { resolve: 1 } } },
            fail: { text: "上抢犹豫了半拍。对手扛住你，顺势推进。你的肩膀还在发麻。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "defense", text: "站住位置，把他往边路逼，封死出球空间", check: { attrs: ["positioning", "balance"], difficulty: 23, tag: "站位+平衡" },
            success: { text: "你不抢，只卡。一步步把他逼向边线。他抬头一看，传球线路全没了。", effects: { reputation: 6, attrs: { positioning: 1 } } },
            fail: { text: "站位偏了半步。对手从你身侧抹过，你重心一歪，差点摔倒。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "你断下皮球，抬头一看，对手半场只剩两名后卫。范志贵在边上挥手要球。草腥味混着汗味，反击的机会就在眼前。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "带球长驱直入，强行抹过后卫", check: { attrs: ["dribble", "agility"], difficulty: 35, tag: "盘带+柔韧" },
            success: { text: "你肩膀一沉，拨球变向。后卫重心丢了。你{elementAdj}地抹进禁区，迎球推射。球进了。", effects: { reputation: 11, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "拨球趟大了。后卫伸脚一捅，球弹出去老远。你踩在球上滑了一下。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你连晃两人抹进禁区，{elementAdj}地推射死角。安静了一秒，然后所有人都站起来了。", effects: { reputation: 18, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "带球杀到禁区前沿，起脚远射", check: { attrs: ["shooting", "power"], difficulty: 37, tag: "射门+力量" },
            success: { text: "你带球推进到弧顶，{elementAdj}地拔脚怒射。球像炮弹一样砸进网窝。门将的手指尖都没碰到。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "射门发力过猛。球高出横梁，飞向看台。你的脚背还在发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你带球长驱直入，{elementAdj}地在禁区外拔脚。球带着弧线钻入死角。带刀后卫的世界波。教练把战术板摔了。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "一脚直塞，打穿对手防线", check: { attrs: ["passing", "vision"], difficulty: 28, tag: "传球+视野" },
            success: { text: "你一脚直塞打穿防线。内牛尔心领神会，反身插上。球到人到。这球传得漂亮。", effects: { reputation: 8, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "直塞力量大了。球滚出底线，内牛尔摊手看着你。你的脚踝还在发酸。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "背身扛住后卫，把球护住", check: { attrs: ["strength", "balance"], difficulty: 26, tag: "对抗+平衡" },
            success: { text: "你像钉子一样卡住后卫。肩膀顶着肩膀，肋骨发疼。队友跑出空当，你分球。", effects: { reputation: 6, attrs: { strength: 1 } } },
            fail: { text: "你被挤开了。后背撞在广告牌上，铁皮的凉意透过球衣。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "balanced", text: "抢点甩头，把球蹭给插上的队友", check: { attrs: ["heading", "positioning"], difficulty: 27, tag: "头球+站位" },
            success: { text: "长传过来，你抢点甩头一蹭。球落到队友脚下。你反身插入禁区，配合打出来了。", effects: { reputation: 7, attrs: { heading: 1 } } },
            fail: { text: "起跳晚了。球从你头顶飞过，你落地时脚踝一软。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "角球开出，你从后点冲进禁区。对方后卫贴上来，肘部顶着你的腰。草腥味、汗味、还有网绳被风吹动的声音。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "抢前点，一记暴力头槌砸向球门", check: { attrs: ["heading", "power"], difficulty: 36, tag: "头球+力量" },
            success: { text: "你抢在前点，{elementAdj}地一记头槌。球砸在地上弹入网窝。门将扑救不及。", effects: { reputation: 12, goals: 1, attrs: { heading: 1 } } },
            fail: { text: "头槌顶偏了。球擦着立柱飞出底线。你的额头还在发疼。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你抢前点高高跃起，{elementAdj}地把球砸进网窝。门将连反应都没有。带刀后卫的头槌轰炸。", effects: { reputation: 19, goals: 1, attrs: { heading: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "后点插上，迎球凌空抽射", check: { attrs: ["shooting", "burst"], difficulty: 38, tag: "射门+爆发" },
            success: { text: "球漏到后点。你迎球就是一脚凌空。球{elementAdj}地钻入网窝。门将扑了个空。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "凌空没吃准部位。球飞向角旗区。你的脚背一阵发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】球漏到后点，你迎球怒射。球{elementAdj}地砸入死角。整个禁区都安静了。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "短角球配合，回做给队友重新组织", check: { attrs: ["passing", "rhythm"], difficulty: 24, tag: "传球+节奏" },
            success: { text: "你没硬抢，回做给外围队友。节奏一缓，对手防线乱了。重新组织的机会来了。", effects: { reputation: 5, attrs: { passing: 1 } } },
            fail: { text: "回做力量小了。队友没接住，球被对方捅走。你的肩膀还酸着。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "卡住身位，把后卫挡在身后争点", check: { attrs: ["strength", "balance"], difficulty: 27, tag: "对抗+平衡" },
            success: { text: "你用后背顶住后卫，胳膊卡住身位。球落下来，你稳稳争到。对手只能看着。", effects: { reputation: 6, attrs: { strength: 1 } } },
            fail: { text: "卡位没卡住。后卫从你身侧挤过，抢先解围。你的肋骨还在发疼。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "attack", text: "胸部停球，拨球转身抹进禁区", check: { attrs: ["dribble", "agility"], difficulty: 33, tag: "盘带+柔韧" },
            success: { text: "球落到你胸前。你一停一拨，转身抹进禁区。后卫重心丢了。你{elementAdj}地推射。球进了。", effects: { reputation: 11, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "停球没卸好。球弹出去老远，被后卫一脚解围。你的胸口还在发闷。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你胸部停球转身，{elementAdj}地抹进禁区推射死角。门将连反应都没有。整个禁区都安静了。", effects: { reputation: 18, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          }
        ]
      },
      {
        text: "队友上抢被过，对手前锋单刀直入。你从后场回追，草皮在鞋钉下翻飞。心脏在胸腔里擂鼓。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "倒地铲抢，把球连人一起留下", check: { attrs: ["tackle", "hardness"], difficulty: 30, tag: "铲断+硬度" },
            success: { text: "你{elementAdj}地倒地一铲。鞋钉贴着草皮，球被你铲出底线。对手前锋坐在地上发愣。", effects: { reputation: 10, attrs: { tackle: 1 } } },
            fail: { text: "铲抢扑空。对手拨球晃过，你整个人滑出去老远。膝盖火辣辣地疼。", effects: { stamina: -5 } }
          },
          { id: "B", sit: "defense", text: "全速回追，用速度卡住他射门的角度", check: { attrs: ["speed", "stamina"], difficulty: 28, tag: "速度+耐力" },
            success: { text: "你玩命回追，肺在烧。两步并一步，你卡到他身侧。射门角度被你封死了。", effects: { reputation: 8, attrs: { speed: 1 } } },
            fail: { text: "回追慢了半拍。对手抢先一步推射。你只能看着球滚向球门。大腿酸得发抖。", effects: { stamina: -5 } }
          },
          { id: "C", sit: "defense", text: "冷静把球摘下，顺势分边解围", check: { attrs: ["passing", "vision"], difficulty: 26, tag: "传球+视野" },
            success: { text: "你没乱。先把球摘下来，一脚分到边路。单刀的险情，被你这一传化掉了。", effects: { reputation: 7, attrs: { passing: 1 } } },
            fail: { text: "摘球拖了。对手顺势一捅，球权丢了。你的脚踝还在发麻。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "defense", text: "大吼一声，奋力把球顶向中场", check: { attrs: ["power", "resolve"], difficulty: 29, tag: "力量+决断" },
            success: { text: "你大吼一声，奋力起跳。一记头球把球顶到中场。落地时脚踝一软，但球安全了。", effects: { reputation: 7, attrs: { power: 1 } } },
            fail: { text: "起跳时机错了。球从你头顶飞过，对手顺势拿下。你的脖子还在发酸。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "defense", text: "提前站位，封堵他最可能的射门线路", check: { attrs: ["positioning", "iq"], difficulty: 25, tag: "站位+球商" },
            success: { text: "你没扑人，扑的是线路。提前一步站到射门线上。对手一脚抽射，正砸在你身上。闷响。", effects: { reputation: 8, attrs: { positioning: 1 } } },
            fail: { text: "站位偏了。对手从你身侧抹过，单刀推射。你扑了个空。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "后场拿球，对手两名前锋高位逼抢。汗水滴在草皮上，看台的嘘声压下来。出球线路被掐得死死的。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "attack", text: "拨球变向，强行带球摆脱逼抢", check: { attrs: ["dribble", "agility"], difficulty: 33, tag: "盘带+柔韧" },
            success: { text: "你肩膀一沉，拨球变向。两名前锋被你晃开。你{elementAdj}地带球杀出包围圈。", effects: { reputation: 9, attrs: { dribble: 1 } } },
            fail: { text: "拨球趟大了。前锋伸脚一捅，球权丢了。你的脚踝还在发酸。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你连晃两名逼抢的前锋，{elementAdj}地带球杀过中线。全场都站起来了。", effects: { reputation: 16, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "balanced", text: "一脚直塞，打穿对手的高位防线", check: { attrs: ["passing", "vision"], difficulty: 29, tag: "传球+视野" },
            success: { text: "你抬头一扫，一脚直塞打穿两名前锋身后。队友顺势插上。这球传得漂亮。", effects: { reputation: 8, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "直塞被识破。前锋半路把球截下。你的脚踝还在发麻。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "balanced", text: "抢点头球，绕过逼抢点给中场", check: { attrs: ["heading", "iq"], difficulty: 26, tag: "头球+球商" },
            success: { text: "长传过来，你抢点头球一蹭。球绕过逼抢，落到中场队友脚下。干净。", effects: { reputation: 6, attrs: { heading: 1 } } },
            fail: { text: "摆渡顶偏了。球落到对手脚下。你的额头还在发疼。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "扛住逼抢，护球等队友回接", check: { attrs: ["strength", "balance"], difficulty: 25, tag: "对抗+平衡" },
            success: { text: "你像钉子一样卡住身位。肩膀顶着肩膀，肋骨发疼。队友回接，球权稳住。", effects: { reputation: 5, attrs: { strength: 1 } } },
            fail: { text: "你被挤开了。球被前锋捅走。后背撞在草皮上，凉意透过来。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "attack", text: "果断起脚，一记远射直奔球门", check: { attrs: ["shooting", "resolve"], difficulty: 34, tag: "射门+决断" },
            success: { text: "你毫不犹豫，起脚就是一记远射。球{elementAdj}地钻入网窝。门将扑了个空。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "远射发力过猛。球高出横梁，飞向看台。你的脚背还在发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你后场果断起脚，球{elementAdj}地划过半场砸入死角。门将连反应都没有。带刀后卫的远程冷箭。", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          }
        ]
      },
      {
        text: "读秒阶段，领先一球。对手把球吊进禁区，草腥味混着汗味。看台的吼声像潮水。守住这球，三分到手。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "上抢铲断，把球连人一起留下", check: { attrs: ["tackle", "intercept"], difficulty: 29, tag: "铲断+拦截" },
            success: { text: "你{elementAdj}地下脚，一记干净铲断。球被你铲出禁区。对手的最后一攻没了。", effects: { reputation: 9, attrs: { tackle: 1 } } },
            fail: { text: "下脚慢了。对手拨球晃过，起脚抽射。你的膝盖磕在草皮上，火辣辣地疼。", effects: { stamina: -5 } }
          },
          { id: "B", sit: "defense", text: "回追卡住内线，封死他的射门角度", check: { attrs: ["speed", "stamina"], difficulty: 27, tag: "速度+耐力" },
            success: { text: "你玩命回追，肺在烧。两步并一步，你卡到内线。射门角度没了。对手只能回传。", effects: { reputation: 7, attrs: { speed: 1 } } },
            fail: { text: "回追慢了半拍。对手抢先推射。你只能看着球滚向球门。大腿酸得发抖。", effects: { stamina: -5 } }
          },
          { id: "C", sit: "defense", text: "不慌不忙，把球摘下来控住节奏分边解围", check: { attrs: ["rhythm", "iq"], difficulty: 24, tag: "节奏+球商" },
            success: { text: "你没乱。把球摘下来，控住节奏，一脚分到边路。对手的最后一攻，被你这一缓化掉了。", effects: { reputation: 7, attrs: { rhythm: 1 } } },
            fail: { text: "处理球拖了。对手顺势逼抢，球差点被断。你的小腿还在发酸。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "defense", text: "憋足一口气，头球狠狠顶出去", check: { attrs: ["power", "resolve"], difficulty: 29, tag: "力量+决断" },
            success: { text: "你大吼一声，奋力起跳。一记头球把球顶到中场。落地时脚踝一软，但球安全了。三分到手。", effects: { reputation: 7, attrs: { power: 1 } } },
            fail: { text: "起跳时机错了。球从你头顶飞过，对手顺势拿下。你的脖子还在发酸。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "defense", text: "站住位置，把禁区前沿堵死", check: { attrs: ["positioning", "balance"], difficulty: 23, tag: "站位+平衡" },
            success: { text: "你不抢，只卡。站住位置，把禁区前沿堵得死死的。对手的最后一攻没了空间。三分到手。", effects: { reputation: 6, attrs: { positioning: 1 } } },
            fail: { text: "站位偏了半步。对手从你身侧抹过，起脚射门。你重心一歪，差点摔倒。", effects: { stamina: -3 } }
          }
        ]
      },
{
        text: "你从中卫位置一路带球压上，到了禁区弧顶。对方没人贴上来。三十米。你的脚背发烫。草腥味混着汗味，看台全站起来了。带刀中卫，就该在这一脚。",
        sit: "attack",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "拔脚怒射，直奔死角",
            check: { attrs: ["shooting", "power"], difficulty: 39, tag: "射门+力量" },
            success: {
              text: "你脚背绷紧，拔脚就射。球像炮弹一样砸向死角。门将指尖差了三厘米。",
              effects: {
                reputation: 13,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "发力太狠，球擦着立柱飞出底线。脚背震得发麻，你叹了口气。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你弧顶拔脚怒射。球{elementAdj}地砸入网窝。带刀中卫，一剑封喉。",
              effects: {
                reputation: 22,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "再带一步，晃开角度后起脚",
            check: { attrs: ["dribble", "burst"], difficulty: 36, tag: "盘带+爆发" },
            success: {
              text: "你一个变向晃开半步空间，起脚抽射。球贴着草皮钻入远角。门将扑反了方向。",
              effects: {
                reputation: 11,
                goals: 1,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "变向趟大了。后卫伸脚一捅，球丢了。你的脚踝扭了一下。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你连晃两人，杀进禁区推射死角。全场都站了起来。",
              effects: {
                reputation: 18,
                goals: 1,
                attrs: { dribble: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "分给位置更好的队友",
            check: { attrs: ["passing", "vision"], difficulty: 27, tag: "传球+视野" },
            success: {
              text: "你抬头一扫，一脚分球送到空当里的队友脚下。他迎球推射。配合打出来了。",
              effects: {
                reputation: 8,
                assists: 1,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "分球力量大了。队友没接住，球出了边线。你的脚背还在发麻。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "扛住回追的后腰，护球再起脚",
            check: { attrs: ["strength", "balance"], difficulty: 27, tag: "对抗+平衡" },
            success: {
              text: "你背身扛住回追的后腰，肩膀顶肩膀。等他失了重心，你转身起脚。",
              effects: {
                reputation: 7,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "你被挤开了。球丢了，后背撞在草皮上，肋骨发疼。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "见好就收，回传稳住球权",
            check: { attrs: ["positioning", "iq"], difficulty: 23, tag: "站位+球商" },
            success: {
              text: "你没贪功，回传给身后的搭档。球权稳住了。教练在场边点头。",
              effects: {
                reputation: 5,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "回传力量小了。队友没接稳，险些被断。你后背冒了层冷汗。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "边路传中飞来，禁区里人挤人。你从中卫位置一路前插，杀到后点。对方后卫贴着你的后背，肘部顶着你的腰。草腥味、汗味，还有网绳被风吹动的声音。",
        sit: "attack",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "高高跃起，头球砸向球门",
            check: { attrs: ["heading", "power"], difficulty: 37, tag: "头球+力量" },
            success: {
              text: "你抢在后卫身前，奋力一跃，额头狠狠砸在球上。球砸向远角。门将鞭长莫及。",
              effects: {
                reputation: 12,
                goals: 1,
                attrs: { heading: 1 }
              }
            },
            fail: {
              text: "起跳晚了半拍。球擦着你的头皮飞过。你落地时脚踝一软。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你后点高高跃起，一记头槌砸入网窝。一个中卫，抢了前锋的风头。",
              effects: {
                reputation: 20,
                goals: 1,
                attrs: { heading: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "抢在后卫身前，奋力冲顶",
            check: { attrs: ["burst", "shooting"], difficulty: 36, tag: "爆发+射门" },
            success: {
              text: "你一个爆发抢出身位，迎球冲顶。球弹地钻入网窝。门将扑救不及。",
              effects: {
                reputation: 11,
                goals: 1,
                attrs: { burst: 1 }
              }
            },
            fail: {
              text: "冲顶没顶正部位。球偏出立柱。你的额头还在发麻。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你前点奋力冲顶。球{elementAdj}地弹入网窝。看台瞬间炸了。",
              effects: {
                reputation: 18,
                goals: 1,
                attrs: { burst: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "C",
            sit: "attack",
            text: "灵巧地一蹭，把球蹭向远角",
            check: { attrs: ["agility", "balance"], difficulty: 34, tag: "柔韧+平衡" },
            success: {
              text: "你没硬顶，而是侧身一蹭。球改了方向，滑向远角。门将扑了个空。",
              effects: {
                reputation: 10,
                goals: 1,
                attrs: { agility: 1 }
              }
            },
            fail: {
              text: "蹭球没蹭正。球偏出底线。你的腰扭了一下。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "D",
            sit: "defense",
            text: "卡住后卫身位，护住这个点",
            check: { attrs: ["strength", "balance"], difficulty: 27, tag: "对抗+平衡" },
            success: {
              text: "你背身卡住后卫，肩膀顶肩膀，把他挡在身后。落点是你的。肋发疼，可你卡住了。",
              effects: {
                reputation: 7,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "对抗中你被挤开。后卫抢先解围。你后背撞在人身上，闷响。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "attack",
            text: "让过前点，后点冷静推射",
            check: { attrs: ["iq", "positioning"], difficulty: 32, tag: "球商+站位" },
            success: {
              text: "你没去抢前点，而是绕到后点。球漏过来，你冷静推射。门将判断错了方向。",
              effects: {
                reputation: 10,
                goals: 1,
                attrs: { iq: 1 }
              }
            },
            fail: {
              text: "跑位慢了一步。球被前点后卫解围。你扑了个空。",
              effects: { stamina: -4 }
            }
          }
        ]
      },
{
        text: "禁区前沿一片混战。对方的解围球弹出来，落到大禁区线。双方球员同时扑向那个落点。草皮被鞋钉翻得稀烂，泥土腥气直冲鼻腔。",
        sit: "balanced",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "迎球凌空抽射",
            check: { attrs: ["shooting", "burst"], difficulty: 37, tag: "射门+爆发" },
            success: {
              text: "你没等球落地，迎球就是一脚凌空。球带着风声砸向死角。门将指尖差了两厘米。",
              effects: {
                reputation: 12,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "凌空没吃准部位。球高高飞出看台，脚背震得发麻。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你迎球凌空怒射。球{elementAdj}地砸入网窝。带刀中卫，名不虚传。",
              effects: {
                reputation: 20,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "balanced",
            text: "用身体扛开对方，把球护下",
            check: { attrs: ["strength", "balance"], difficulty: 27, tag: "对抗+平衡" },
            success: {
              text: "你肩膀一沉，把对方后腰扛在身后。球护住了。肋骨发疼，可球权是你的。",
              effects: {
                reputation: 7,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "对抗中你被挤开。球被对方勾走。后背撞在人身上，闷响。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "抢先伸脚把球勾走",
            check: { attrs: ["agility", "speed"], difficulty: 28, tag: "柔韧+速度" },
            success: {
              text: "你比所有人快半步，脚尖一勾，把球从人堆里勾了出来。轻巧，干净。",
              effects: {
                reputation: 7,
                attrs: { agility: 1 }
              }
            },
            fail: {
              text: "伸脚慢了一拍。球被对方先捅走。你的脚踝扭了一下。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "拿下球顺势分边",
            check: { attrs: ["passing", "vision"], difficulty: 25, tag: "传球+视野" },
            success: {
              text: "你抢下落点，抬头一扫，一脚分边。球贴着草皮滑到队友脚下。",
              effects: {
                reputation: 6,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "分球力量小了。球滚到半路被断。你的脚背还在发麻。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "卡住落点站位，把对方挡在身后",
            check: { attrs: ["positioning", "balance"], difficulty: 24, tag: "站位+平衡" },
            success: {
              text: "你提前卡住落点，背身把对方挡在身后。球稳稳落下，你护住了。",
              effects: {
                reputation: 6,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "站位偏了半步。对方从你身侧挤过，抢先捅走了球。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "对方前锋在越位线附近游走，伺机反越位。你压上一步，朝搭档打了个手势。草腥味混着汗味。整体前顶，把这一下造出来。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "指挥防线前顶，把前锋晾在越位位置",
            check: { attrs: ["intercept", "positioning"], difficulty: 26, tag: "拦截+站位" },
            success: {
              text: "你一声吼，整条防线齐齐前压。对方前锋启动早了半步，边裁举旗。越位。",
              effects: {
                reputation: 7,
                attrs: { intercept: 1 }
              }
            },
            fail: {
              text: "防线没压齐。对方反越位成功，单刀。你后背发凉。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "阅读传球时机，提前移动卡线",
            check: { attrs: ["iq", "positioning"], difficulty: 27, tag: "球商+站位" },
            success: {
              text: "你没看球，看的是他的眼神。传球刚起，你已经卡在接球点上。一伸脚，球断了。",
              effects: {
                reputation: 7,
                attrs: { iq: 1 }
              }
            },
            fail: {
              text: "判断错了路线。球从你身侧漏过，你扑了个空。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "造越位失败，对方反插，你回追",
            check: { attrs: ["speed", "stamina"], difficulty: 29, tag: "速度+耐力" },
            success: {
              text: "你转身就追，两步抢回身位，把球护出底线。肺在烧，可你追上了。",
              effects: {
                reputation: 7,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "回追慢了半拍。对方单刀推射。你只能看着球进网。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "D",
            sit: "defense",
            text: "对方强行突破，果断放铲",
            check: { attrs: ["resolve", "tackle"], difficulty: 30, tag: "决断+铲断" },
            success: {
              text: "你毫不犹豫，倒地一铲。鞋钉先碰到球，连人带球铲出边线。",
              effects: {
                reputation: 8,
                attrs: { resolve: 1 }
              }
            },
            fail: {
              text: "铲球铲空了。对方顺势抹过，你摔在草皮上，膝盖火辣辣地疼。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "E",
            sit: "balanced",
            text: "站位卡死内线，把对方逼向边路",
            check: { attrs: ["positioning", "balance"], difficulty: 24, tag: "站位+平衡" },
            success: {
              text: "你侧身一站，把内线堵死。对方只能往边路走，威胁小了。",
              effects: {
                reputation: 6,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "站位偏了半步。对方从内线抹过，你重心一歪。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "门将果断出击，却扑了个空。球弹向空门，对方前锋拍马补射。门线前，只剩你这个中卫。雨水混着汗，糊住了眼睛。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "门线前奋力头球解围",
            check: { attrs: ["heading", "power"], difficulty: 30, tag: "头球+力量" },
            success: {
              text: "你退到门线，奋力一跃，额头狠狠砸在球上。球飞向中场。空门，保住了。",
              effects: {
                reputation: 9,
                attrs: { heading: 1 }
              }
            },
            fail: {
              text: "起跳晚了半拍。球擦着你的头皮滚进门窝。你跪在门线前。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "用身体堵枪眼，硬扛下补射",
            check: { attrs: ["hardness", "strength"], difficulty: 31, tag: "硬度+对抗" },
            success: {
              text: "你张开双臂堵在门线。对方的爆射砸在你胸口，闷响。球弹出去了。你疼得弯腰，却笑了。",
              effects: {
                reputation: 9,
                attrs: { hardness: 1 }
              }
            },
            fail: {
              text: "你侧身让了半步。球从你身侧钻进门窝。胸口的闷痛还在。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "抢先赶到落点，把球捅出底线",
            check: { attrs: ["speed", "agility"], difficulty: 29, tag: "速度+柔韧" },
            success: {
              text: "你比对方前锋快半步赶到，脚尖一捅，球擦着立柱出了底线。好险。",
              effects: {
                reputation: 8,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "你慢了一步。对方先碰到球，轻轻一推，球进了。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "D",
            sit: "defense",
            text: "判断球的反弹路线，提前移动",
            check: { attrs: ["iq", "positioning"], difficulty: 27, tag: "球商+站位" },
            success: {
              text: "你没看球，看的是它的旋转。反弹刚起，你已经站在门线上，伸脚把球挡出。",
              effects: {
                reputation: 7,
                attrs: { iq: 1 }
              }
            },
            fail: {
              text: "判断错了反弹方向。球从另一侧滚进门窝，你扑了个空。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "奋力飞身把球挡出",
            check: { attrs: ["resolve", "burst"], difficulty: 32, tag: "决断+爆发" },
            success: {
              text: "你什么都没想，整个人飞出去。手掌堪堪碰到球，把它托出横梁。肩膀生疼。",
              effects: {
                reputation: 9,
                attrs: { resolve: 1 }
              }
            },
            fail: {
              text: "飞身慢了半拍。球从你指尖滑进门窝。你摔在门线里。",
              effects: { stamina: -5 }
            }
          }
        ]
      }
    ]
  },
  CB_pivot: {
    desc: "争顶、对抗、轰炸",
    events: [
      {
        text: "角球开出，你在禁区里抢点。对方后卫贴上来，肘部顶着你的腰。草腥味、汗味、还有网绳被风吹动的声音。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "原地起跳，硬扛着后卫甩头攻门", check: { attrs: ["heading", "power"], difficulty: 36, tag: "头球+力量" },
            success: { text: "你扛着后卫起跳，{elementAdj}地一记甩头。球砸在地上弹入网窝。门将扑救不及。", effects: { reputation: 12, goals: 1, attrs: { heading: 1 } } },
            fail: { text: "头槌顶偏了。球擦着立柱飞出底线。你的额头还在发疼。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你扛着后卫高高跃起，{elementAdj}地把球砸进网窝。门将连反应都没有。支点中卫的头槌轰炸。", effects: { reputation: 19, goals: 1, attrs: { heading: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "抢前点，鱼跃冲顶把球砸向球门", check: { attrs: ["burst", "heading"], difficulty: 35, tag: "爆发+头球" },
            success: { text: "你抢在前点，{elementAdj}地一记冲顶。球砸入网窝。门将扑了个空。", effects: { reputation: 11, goals: 1, attrs: { burst: 1 } } },
            fail: { text: "冲顶没顶正。球擦着横梁飞出底线。你的脖子还在发酸。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你抢前点鱼跃冲顶，{elementAdj}地把球砸进死角。整个禁区都安静了。", effects: { reputation: 18, goals: 1, attrs: { burst: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "短角球配合，回做给队友重新组织", check: { attrs: ["passing", "rhythm"], difficulty: 24, tag: "传球+节奏" },
            success: { text: "你没硬抢，回做给外围队友。节奏一缓，对手防线乱了。重新组织的机会来了。", effects: { reputation: 5, attrs: { passing: 1 } } },
            fail: { text: "回做力量小了。队友没接住，球被对方捅走。你的肩膀还酸着。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "attack", text: "胸部停球，拨球转身抹进禁区", check: { attrs: ["dribble", "agility"], difficulty: 33, tag: "盘带+柔韧" },
            success: { text: "球落到你胸前。你一停一拨，转身抹进禁区。后卫重心丢了。你{elementAdj}地推射。球进了。", effects: { reputation: 11, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "停球没卸好。球弹出去老远，被后卫一脚解围。你的胸口还在发闷。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你胸部停球转身，{elementAdj}地抹进禁区推射死角。门将连反应都没有。整个禁区都安静了。", effects: { reputation: 18, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "E", sit: "balanced", text: "卡住身位，把后卫挡在身后争点", check: { attrs: ["strength", "balance"], difficulty: 27, tag: "对抗+平衡" },
            success: { text: "你用后背顶住后卫，胳膊卡住身位。球落下来，你稳稳争到。对手只能看着。", effects: { reputation: 6, attrs: { strength: 1 } } },
            fail: { text: "卡位没卡住。后卫从你身侧挤过，抢先解围。你的肋骨还在发疼。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "后场长传过来，你背身扛住对方后卫。汗水顺着下巴滴在草皮上，鞋钉陷进泥土。支点的作用就在这一刻。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "balanced", text: "背身硬扛后卫，把球做给插上的队友", check: { attrs: ["strength", "balance"], difficulty: 28, tag: "对抗+平衡" },
            success: { text: "你像钉子一样卡住后卫。肩膀顶着肩膀，肋骨发疼。球蹭给插上的队友。支点的作用出来了。", effects: { reputation: 8, assists: 1, attrs: { strength: 1 } } },
            fail: { text: "你被挤开了。球被后卫捅走。后背撞在草皮上，凉意透过来。", effects: { stamina: -4 } }
          },
          { id: "B", sit: "balanced", text: "起跳争顶，把球点给身边的队友", check: { attrs: ["heading", "vision"], difficulty: 27, tag: "头球+视野" },
            success: { text: "你抢点起跳，一记头球把球点给队友。他顺势插上。这球争得漂亮。", effects: { reputation: 7, attrs: { heading: 1 } } },
            fail: { text: "起跳晚了。球被对方后卫抢先顶走。你的脖子还在发酸。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "balanced", text: "回做给插上的中场，自己前插接应", check: { attrs: ["passing", "rhythm"], difficulty: 24, tag: "传球+节奏" },
            success: { text: "你回做给中场，反身插入禁区。队友一脚直塞，球到人到。配合打出来了。", effects: { reputation: 6, attrs: { passing: 1 } } },
            fail: { text: "回做力量小了。队友没接住，球被后卫捅走。你的肩膀还酸着。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "attack", text: "胸部卸球转身，带球推进", check: { attrs: ["dribble", "agility"], difficulty: 32, tag: "盘带+柔韧" },
            success: { text: "你胸部卸球，顺势转身。后卫被你抹过。你{elementAdj}地带球杀向中场。", effects: { reputation: 9, attrs: { dribble: 1 } } },
            fail: { text: "卸球没卸好。球弹出去老远。后卫伸脚一捅，球权丢了。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你胸部卸球转身，{elementAdj}地连过两人杀到禁区。一脚抽射，球砸进网窝。", effects: { reputation: 16, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "E", sit: "attack", text: "果断转身，迎球一脚抽射", check: { attrs: ["shooting", "resolve"], difficulty: 34, tag: "射门+决断" },
            success: { text: "你毫不犹豫，转身迎球就是一脚。球{elementAdj}地钻入网窝。门将扑了个空。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "转身没晃开角度。射门被后卫用身体封堵。闷响。你的脚背还在发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你转身迎球怒射，球{elementAdj}地砸入死角。门将连反应都没有。支点中卫的暴力抽射。", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          }
        ]
      },
      {
        text: "对方角球开到后点，你盯的是对方的高点中锋。草腥味混着汗味，看台的吼声压下来。这球必须顶出去。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "抢先起跳，一记头球把球顶出危险区", check: { attrs: ["heading", "power"], difficulty: 28, tag: "头球+力量" },
            success: { text: "你抢在前点，{elementAdj}地一记头球。球被你顶出禁区。对手的角球进攻没了。", effects: { reputation: 8, attrs: { heading: 1 } } },
            fail: { text: "起跳晚了。球从你头顶飞过，对手顺势头球攻门。你的脖子还在发酸。", effects: { stamina: -4 } }
          },
          { id: "B", sit: "defense", text: "扛住对方中锋，把他卡在身位后面", check: { attrs: ["strength", "balance"], difficulty: 27, tag: "对抗+平衡" },
            success: { text: "你用后背顶住对方中锋。肩膀顶着肩膀，肋骨发疼。他起跳没争到。球被门将没收。", effects: { reputation: 7, attrs: { strength: 1 } } },
            fail: { text: "卡位没卡住。对方中锋从你身侧挤过，抢先头球。你的肋骨还在发疼。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "defense", text: "稳稳把球摘下来，一脚分到边路", check: { attrs: ["passing", "vision"], difficulty: 26, tag: "传球+视野" },
            success: { text: "你没硬抢。先把球摘下来，一脚分到边路。对手的角球进攻，被你这一传化掉了。", effects: { reputation: 7, attrs: { passing: 1 } } },
            fail: { text: "摘球拖了。对手顺势一捅，球权丢了。你的脚踝还在发麻。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "defense", text: "迎着来球，一记头球顶出老远", check: { attrs: ["power", "resolve"], difficulty: 29, tag: "力量+决断" },
            success: { text: "你大吼一声，奋力起跳。一记头球把球顶到中场。落地时脚踝一软，但球安全了。", effects: { reputation: 7, attrs: { power: 1 } } },
            fail: { text: "起跳时机错了。球从你头顶飞过，对手顺势拿下。你的脖子还在发酸。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "defense", text: "迅速回身，用速度抢在对手身前把球护出去", check: { attrs: ["speed", "stamina"], difficulty: 26, tag: "速度+耐力" },
            success: { text: "你转身就追，肺在烧。两步并一步，你抢在对手身前把球护出底线。对手的角球进攻没了。", effects: { reputation: 7, attrs: { speed: 1 } } },
            fail: { text: "回身慢了半拍。对手抢先一步把球蹭走。你大腿酸得发抖。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "你在后场背身拿球，对方前锋贴上来逼抢。汗水滴在草皮上，看台的嘘声压下来。护球，还是出球。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "balanced", text: "背身扛住他，护球等队友回接", check: { attrs: ["strength", "balance"], difficulty: 26, tag: "对抗+平衡" },
            success: { text: "你像钉子一样卡住身位。肩膀顶着肩膀，肋骨发疼。队友回接，球权稳住。", effects: { reputation: 6, attrs: { strength: 1 } } },
            fail: { text: "你被挤开了。球被前锋捅走。后背撞在草皮上，凉意透过来。", effects: { stamina: -3 } }
          },
          { id: "B", sit: "attack", text: "拨球转身，强行带球推进", check: { attrs: ["dribble", "agility"], difficulty: 33, tag: "盘带+柔韧" },
            success: { text: "你肩膀一沉，拨球转身。前锋被你抹过。你{elementAdj}地带球杀向中场。", effects: { reputation: 9, attrs: { dribble: 1 } } },
            fail: { text: "拨球趟大了。前锋伸脚一捅，球权丢了。你的脚踝还在发酸。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你拨球转身，{elementAdj}地连过两人杀到禁区。一脚抽射，球砸进网窝。", effects: { reputation: 16, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "一脚分边，给插上的边后卫", check: { attrs: ["passing", "vision"], difficulty: 27, tag: "传球+视野" },
            success: { text: "你抬头一扫，一脚分边。边后卫顺势插上。这球传得漂亮。", effects: { reputation: 7, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "分边力量大了。球滚出边线。边后卫摊手看着你。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "抢点头球，点给插上的中场", check: { attrs: ["heading", "iq"], difficulty: 25, tag: "头球+球商" },
            success: { text: "长传过来，你抢点头球一蹭。球绕过逼抢，落到中场队友脚下。干净。", effects: { reputation: 6, attrs: { heading: 1 } } },
            fail: { text: "摆渡顶偏了。球落到对手脚下。你的额头还在发疼。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "attack", text: "果断转身，迎球一脚抽射", check: { attrs: ["shooting", "resolve"], difficulty: 34, tag: "射门+决断" },
            success: { text: "你毫不犹豫，转身迎球就是一脚。球{elementAdj}地钻入网窝。门将扑了个空。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "转身没晃开角度。射门被后卫用身体封堵。闷响。你的脚背还在发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你转身迎球怒射，球{elementAdj}地砸入死角。门将连反应都没有。支点中卫的暴力抽射。", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          }
        ]
      },
      {
        text: "前场任意球开到禁区，你从中路插上抢前点。对方后卫贴上来，肘部顶着你的腰。草腥味、汗味、还有网绳被风吹动的声音。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "抢前点，甩头攻门", check: { attrs: ["heading", "power"], difficulty: 36, tag: "头球+力量" },
            success: { text: "你抢在前点，{elementAdj}地一记甩头。球砸在地上弹入网窝。门将扑救不及。", effects: { reputation: 12, goals: 1, attrs: { heading: 1 } } },
            fail: { text: "头槌顶偏了。球擦着立柱飞出底线。你的额头还在发疼。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你抢前点高高跃起，{elementAdj}地把球砸进网窝。门将连反应都没有。支点中卫的头槌轰炸。", effects: { reputation: 19, goals: 1, attrs: { heading: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "鱼跃冲顶，把球砸向球门", check: { attrs: ["burst", "heading"], difficulty: 35, tag: "爆发+头球" },
            success: { text: "你抢在前点，{elementAdj}地一记冲顶。球砸入网窝。门将扑了个空。", effects: { reputation: 11, goals: 1, attrs: { burst: 1 } } },
            fail: { text: "冲顶没顶正。球擦着横梁飞出底线。你的脖子还在发酸。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你抢前点鱼跃冲顶，{elementAdj}地把球砸进死角。整个禁区都安静了。", effects: { reputation: 18, goals: 1, attrs: { burst: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "战术任意球，回做给队友重新组织", check: { attrs: ["passing", "rhythm"], difficulty: 24, tag: "传球+节奏" },
            success: { text: "你没急着抢点，回做给外围队友。节奏一缓，对手防线乱了。重新组织的机会来了。", effects: { reputation: 5, attrs: { passing: 1 } } },
            fail: { text: "回做力量小了。队友没接住，球被对方捅走。你的肩膀还酸着。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "attack", text: "胸部停球，拨球抹进禁区", check: { attrs: ["dribble", "agility"], difficulty: 33, tag: "盘带+柔韧" },
            success: { text: "球落到你胸前。你一停一拨，抹进禁区。后卫重心丢了。你{elementAdj}地推射。球进了。", effects: { reputation: 11, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "停球没卸好。球弹出去老远，被后卫一脚解围。你的胸口还在发闷。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你胸部停球转身，{elementAdj}地抹进禁区推射死角。门将连反应都没有。整个禁区都安静了。", effects: { reputation: 18, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "E", sit: "balanced", text: "卡住后卫身位，把球争下来", check: { attrs: ["strength", "balance"], difficulty: 27, tag: "对抗+平衡" },
            success: { text: "你用后背顶住后卫，胳膊卡住身位。球落下来，你稳稳争到。对手只能看着。", effects: { reputation: 6, attrs: { strength: 1 } } },
            fail: { text: "卡位没卡住。后卫从你身侧挤过，抢先解围。你的肋骨还在发疼。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "对手长传打身后，对方前锋顺势插上。你回追中，草皮在鞋钉下翻飞。心脏在胸腔里擂鼓。这球必须扛下来。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "一个滑铲，连人带球留下", check: { attrs: ["tackle", "hardness"], difficulty: 29, tag: "铲断+硬度" },
            success: { text: "你{elementAdj}地倒地一铲。鞋钉贴着草皮，球被你铲出底线。对手前锋坐在地上发愣。", effects: { reputation: 9, attrs: { tackle: 1 } } },
            fail: { text: "铲抢扑空。对手拨球晃过，你整个人滑出去老远。膝盖火辣辣地疼。", effects: { stamina: -5 } }
          },
          { id: "B", sit: "defense", text: "加速回追，用速度卡住他射门的角度", check: { attrs: ["speed", "stamina"], difficulty: 27, tag: "速度+耐力" },
            success: { text: "你玩命回追，肺在烧。两步并一步，你卡到他身侧。射门角度被你封死了。", effects: { reputation: 8, attrs: { speed: 1 } } },
            fail: { text: "回追慢了半拍。对手抢先一步推射。你只能看着球滚向球门。大腿酸得发抖。", effects: { stamina: -5 } }
          },
          { id: "C", sit: "defense", text: "不慌不忙摘下球，顺势分边", check: { attrs: ["passing", "vision"], difficulty: 26, tag: "传球+视野" },
            success: { text: "你没乱。先把球摘下来，一脚分到边路。反击的险情，被你这一传化掉了。", effects: { reputation: 7, attrs: { passing: 1 } } },
            fail: { text: "摘球拖了。对手顺势一捅，球权丢了。你的脚踝还在发麻。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "defense", text: "全力起跳，把球顶向中场", check: { attrs: ["power", "resolve"], difficulty: 29, tag: "力量+决断" },
            success: { text: "你大吼一声，奋力起跳。一记头球把球顶到中场。落地时脚踝一软，但球安全了。", effects: { reputation: 7, attrs: { power: 1 } } },
            fail: { text: "起跳时机错了。球从你头顶飞过，对手顺势拿下。你的脖子还在发酸。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "defense", text: "提前站位，卡住身位把传球线路堵死", check: { attrs: ["positioning", "iq"], difficulty: 24, tag: "站位+球商" },
            success: { text: "你没扑人，扑的是位置。提前一步卡住身位。对手的传球，正砸在你身上。闷响。", effects: { reputation: 7, attrs: { positioning: 1 } } },
            fail: { text: "站位偏了半步。对手从你身侧抹过，顺势推进。你扑了个空。", effects: { stamina: -3 } }
          }
        ]
      },
{
        text: "你在后场拿球，对方压上进攻，身后留出大片空当。内牛尔正在反越位线上启动。草腥味混着汗味。一脚长传制导，就是反击。看台的吼声压过来。",
        sit: "attack",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "一脚过顶长传，精准找到内牛尔",
            check: { attrs: ["passing", "vision"], difficulty: 34, tag: "传球+视野" },
            success: {
              text: "你脚背一搓，球划过一道弧线，越过整条防线，落在内牛尔脚下。单刀。助攻到手。",
              effects: {
                reputation: 12,
                assists: 1,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "长传力量大了。球直接飞出底线。内牛尔回头看了你一眼。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "见门将站位靠前，吊射空门",
            check: { attrs: ["shooting", "power"], difficulty: 39, tag: "射门+力量" },
            success: {
              text: "你瞥见门将站在小禁区外，脚背一吊。球划过半场，坠入空门。门将回追不及。",
              effects: {
                reputation: 13,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "吊射高了。球越过横梁飞出底线。门将回头看了一眼。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你后场一脚吊射。球{elementAdj}地坠入空门。门将望球兴叹，全场沸腾。",
              effects: {
                reputation: 21,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "C",
            sit: "attack",
            text: "自己带球推进，撕开第一道防线",
            check: { attrs: ["dribble", "speed"], difficulty: 35, tag: "盘带+速度" },
            success: {
              text: "你带球长驱直入，抹过逼抢的前锋。防线被你一个人撕开。",
              effects: {
                reputation: 10,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "趟球大了半步。对方伸脚一捅，球丢了。你踩在球上滑了一下。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你后场带球连过三人，杀到禁区前沿。支点中卫，也能踢出前锋的气势。",
              effects: {
                reputation: 17,
                attrs: { dribble: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "扛住逼抢的前锋，护住球再出球",
            check: { attrs: ["strength", "balance"], difficulty: 26, tag: "对抗+平衡" },
            success: {
              text: "你背身扛住逼抢的前锋，肩膀顶肩膀。等队友跑位，你从容分球。",
              effects: {
                reputation: 6,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "你被挤开了。球丢了，后背撞在草皮上，凉意渗进球衣。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "回传重新组织，稳住阵型",
            check: { attrs: ["positioning", "iq"], difficulty: 23, tag: "站位+球商" },
            success: {
              text: "你没冒险，回传给搭档。球权稳住了，阵型也压上了。教练在场边点头。",
              effects: {
                reputation: 5,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "回传力量小了。队友没接稳，险些被断。你后背冒了层冷汗。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "门将把球交到你脚下。对方没有急于逼抢，防线在你眼前铺开。你是这支球队后场的发牌人。草腥味混着汗味。节奏，由你来定。",
        sit: "balanced",
        choices: [
          {
            id: "A",
            sit: "balanced",
            text: "控住节奏，等队友跑出空当再分球",
            check: { attrs: ["rhythm", "passing"], difficulty: 25, tag: "节奏+传球" },
            success: {
              text: "你不慌不忙，把球踩在脚下。等队友跑出空当，你一脚分球。节奏，在你手里。",
              effects: {
                reputation: 7,
                attrs: { rhythm: 1 }
              }
            },
            fail: {
              text: "你控球久了。对方突然上抢，球被断下。你的脚背还在发麻。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "先指挥防线落位，把阵型站稳",
            check: { attrs: ["positioning", "iq"], difficulty: 24, tag: "站位+球商" },
            success: {
              text: "你一边比划一边喊，把队友一个个喊回位置。阵型站稳了，逼抢自解。",
              effects: {
                reputation: 6,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "队友没领会你的意思。阵型没站稳，你只能回传。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "对方前锋逼上来，你扛住护球",
            check: { attrs: ["strength", "balance"], difficulty: 27, tag: "对抗+平衡" },
            success: {
              text: "你背身扛住逼抢的前锋，肩膀顶肩膀，寸步不让。等他失了重心，你转身分球。",
              effects: {
                reputation: 7,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "你被挤开了。球丢了，后背撞在草皮上，肋骨发疼。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "一个转身晃开逼抢，带球推进",
            check: { attrs: ["agility", "dribble"], difficulty: 28, tag: "柔韧+盘带" },
            success: {
              text: "你一个转身，把逼抢的前锋晃在身后。带球推进，防线被你撕开一道口子。",
              effects: {
                reputation: 8,
                attrs: { agility: 1 }
              }
            },
            fail: {
              text: "转身没晃开。球被对方捅走，你的脚踝扭了一下。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "E",
            sit: "attack",
            text: "果断一脚直塞，打穿对方中场",
            check: { attrs: ["resolve", "passing"], difficulty: 33, tag: "决断+传球" },
            success: {
              text: "你瞥见对方中场身后的空当，一脚直塞。球穿过两人，落到队友脚下。反击打出来了。",
              effects: {
                reputation: 9,
                attrs: { resolve: 1 }
              }
            },
            fail: {
              text: "直塞力量大了。球直接滚出底线。你的脚背还在发烫。",
              effects: { stamina: -4 }
            }
          }
        ]
      },
{
        text: "对方一记远射被你方后卫挡出，球弹到禁区前沿。第二落点。对方后腰高速插上准备补射。你拖在后面，得保护这个点。草皮被鞋钉翻起。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "用身体扛开对方后腰，把落点护下",
            check: { attrs: ["strength", "balance"], difficulty: 27, tag: "对抗+平衡" },
            success: {
              text: "你肩膀一沉，把对方后腰扛在身后。落点护住了。肋骨发疼，可球权是你的。",
              effects: {
                reputation: 7,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "对抗中你被挤开。对方从你身侧挤过，迎球就是一脚。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "抢先把球顶出去，解围",
            check: { attrs: ["heading", "power"], difficulty: 27, tag: "头球+力量" },
            success: {
              text: "你抢在对方身前，奋力一跃，额头把球顶向中场。落点保护住了。",
              effects: {
                reputation: 7,
                attrs: { heading: 1 }
              }
            },
            fail: {
              text: "起跳晚了半拍。球擦着你的头皮落到对方脚下。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "抢先一步伸脚把球勾走",
            check: { attrs: ["agility", "speed"], difficulty: 28, tag: "柔韧+速度" },
            success: {
              text: "你比对方快半步，脚尖一勾，把球从人堆里勾出来。轻巧，干净。",
              effects: {
                reputation: 7,
                attrs: { agility: 1 }
              }
            },
            fail: {
              text: "伸脚慢了一拍。对方先捅到球，迎球补射。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "拿下球，冷静分给边路",
            check: { attrs: ["passing", "vision"], difficulty: 24, tag: "传球+视野" },
            success: {
              text: "你护下落点，抬头一扫，一脚分边。球贴着草皮滑到队友脚下。由守转攻。",
              effects: {
                reputation: 6,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "分球力量小了。球滚到半路被断。你的脚背还在发麻。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "对方迎球补射，奋力用身体封堵",
            check: { attrs: ["resolve", "hardness"], difficulty: 30, tag: "决断+硬度" },
            success: {
              text: "你张开双臂扑上去。对方的爆射砸在你胸口，闷响。球弹出去了。你疼得弯腰，却值。",
              effects: {
                reputation: 8,
                attrs: { resolve: 1 }
              }
            },
            fail: {
              text: "你侧身让了半步。球从你身侧钻进门窝。胸口的闷痛还在。",
              effects: { stamina: -5 }
            }
          }
        ]
      },
{
        text: "对方箭头在越位线上来回试探。你站在防线最后，把整条后防看在眼里。草皮上的鞋钉印冒着热气。该整体前顶了。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "指挥防线前顶，造越位",
            check: { attrs: ["intercept", "positioning"], difficulty: 26, tag: "拦截+站位" },
            success: {
              text: "你一声吼，整条防线齐齐前压。对方前锋启动早了半步，边裁举旗。越位。",
              effects: {
                reputation: 7,
                attrs: { intercept: 1 }
              }
            },
            fail: {
              text: "防线没压齐。对方反越位成功，单刀。你后背发凉。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "阅读传球时机，提前移动卡线",
            check: { attrs: ["iq", "positioning"], difficulty: 27, tag: "球商+站位" },
            success: {
              text: "你没看球，看的是他的眼神。传球刚起，你已经卡在接球点上。一伸脚，球断了。",
              effects: {
                reputation: 7,
                attrs: { iq: 1 }
              }
            },
            fail: {
              text: "判断错了路线。球从你身侧漏过，你扑了个空。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "造越位失败，对方反插，你回追",
            check: { attrs: ["speed", "stamina"], difficulty: 29, tag: "速度+耐力" },
            success: {
              text: "你转身就追，两步抢回身位，把球护出底线。肺在烧，可你追上了。",
              effects: {
                reputation: 7,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "回追慢了半拍。对方单刀推射。你只能看着球进网。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "D",
            sit: "defense",
            text: "对方强行突破，你果断放铲",
            check: { attrs: ["resolve", "tackle"], difficulty: 30, tag: "决断+铲断" },
            success: {
              text: "你毫不犹豫，倒地一铲。鞋钉先碰到球，连人带球铲出边线。",
              effects: {
                reputation: 8,
                attrs: { resolve: 1 }
              }
            },
            fail: {
              text: "铲球铲空了。对方顺势抹过，你摔在草皮上，膝盖火辣辣地疼。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "E",
            sit: "balanced",
            text: "站位卡死内线，把对方逼向边路",
            check: { attrs: ["positioning", "balance"], difficulty: 24, tag: "站位+平衡" },
            success: {
              text: "你侧身一站，把内线堵死。对方只能往边路走，威胁小了。",
              effects: {
                reputation: 6,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "站位偏了半步。对方从内线抹过，你重心一歪。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "大雨倾盆，草皮积起水洼。比赛到了最后，你的腿像灌了铅。对方还在冲击你的防区。你必须撑住这一下。雨水糊住了眼睛。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "咬紧牙关，靠耐力撑过这一波",
            check: { attrs: ["stamina", "resolve"], difficulty: 29, tag: "耐力+决断" },
            success: {
              text: "肺在烧，腿在抖，你还是顶住了。一波又一波，你像堤坝一样不退。哨响了。撑住了。",
              effects: {
                reputation: 8,
                attrs: { stamina: 1 }
              }
            },
            fail: {
              text: "你再也迈不动腿。对方从你身侧抹过，单刀。你跪在积水里。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "用硬度扛住对方前锋的冲击",
            check: { attrs: ["hardness", "strength"], difficulty: 30, tag: "硬度+对抗" },
            success: {
              text: "对方前锋反复冲击，你肩膀顶肩膀，寸步不让。肋骨发疼，可你扛住了。",
              effects: {
                reputation: 8,
                attrs: { hardness: 1 }
              }
            },
            fail: {
              text: "对抗中你被挤开。对方顺势抹过，推射。你后背一片冰凉。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "雨战中奋力头球解围",
            check: { attrs: ["heading", "power"], difficulty: 29, tag: "头球+力量" },
            success: {
              text: "对方一记长传吊进禁区。你奋力一跃，额头把球顶出危险区。雨水顺着下巴滴。",
              effects: {
                reputation: 8,
                attrs: { heading: 1 }
              }
            },
            fail: {
              text: "起跳晚了半拍。球擦着你的头皮落到对方脚下。你心头一沉。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "稳住节奏，指挥队友落位",
            check: { attrs: ["rhythm", "iq"], difficulty: 26, tag: "节奏+球商" },
            success: {
              text: "你扯着嗓子喊，把慌乱的队友一个个喊回位置。防线重新站稳。嗓子都劈了。",
              effects: {
                reputation: 7,
                attrs: { rhythm: 1 }
              }
            },
            fail: {
              text: "雨声太大，队友没听见你的指挥。防线一片混乱。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "体能极限，奋力把球大脚解围",
            check: { attrs: ["resolve", "power"], difficulty: 31, tag: "决断+力量" },
            success: {
              text: "你用尽最后的力气，一脚把球踢向看台。球飞得老高。解围了。",
              effects: {
                reputation: 8,
                attrs: { resolve: 1 }
              }
            },
            fail: {
              text: "腿软了，解围踢呲了。球弹回禁区，落到对方脚下。",
              effects: { stamina: -5 }
            }
          }
        ]
      }
    ]
  },
  CB_break: {
    desc: "带球、推进、出球",
    events: [
      {
        text: "你在后场断下皮球，对手的高位逼抢还没收回去。前面一片开阔地，草腥味混着汗味。带刀中卫的机会来了。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "带球长驱直入，杀向对手半场", check: { attrs: ["dribble", "speed"], difficulty: 34, tag: "盘带+速度" },
            success: { text: "你断球顺势一趟，{elementAdj}地杀过中线。对手回追的脚步乱了。自由人式推进。", effects: { reputation: 10, attrs: { dribble: 1 } } },
            fail: { text: "推进趟大了。对手回身一捅，球弹出去老远。你的大腿还在发酸。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你断球长驱直入，{elementAdj}地连过两人杀到禁区。一脚抽射，球砸进网窝。带刀后卫。全场炸了。", effects: { reputation: 18, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "带球杀到禁区前沿，起脚远射", check: { attrs: ["shooting", "burst"], difficulty: 37, tag: "射门+爆发" },
            success: { text: "你带球推进到弧顶，{elementAdj}地拔脚怒射。球像炮弹一样砸进网窝。门将的手指尖都没碰到。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "射门发力过猛。球高出横梁，飞向看台。你的脚背还在发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你带球长驱直入，{elementAdj}地在禁区外拔脚。球带着弧线钻入死角。带刀后卫的世界波。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "一脚直塞，打穿对手的高位防线", check: { attrs: ["passing", "vision"], difficulty: 29, tag: "传球+视野" },
            success: { text: "你抬头一扫，一脚直塞打穿两名后卫身后。内牛尔顺势插上。这球传得漂亮。", effects: { reputation: 8, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "直塞被识破。后卫半路把球截下。你的脚踝还在发麻。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "死死卡住身位，护球等队友", check: { attrs: ["strength", "balance"], difficulty: 26, tag: "对抗+平衡" },
            success: { text: "你像钉子一样卡住后卫。肩膀顶着肩膀，肋骨发疼。队友跑出空当，你分球。", effects: { reputation: 6, attrs: { strength: 1 } } },
            fail: { text: "你被挤开了。后背撞在广告牌上，铁皮的凉意透过球衣。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "balanced", text: "抢点甩头，把球蹭给插上的队友", check: { attrs: ["heading", "positioning"], difficulty: 27, tag: "头球+站位" },
            success: { text: "长传过来，你抢点甩头一蹭。球落到队友脚下。你反身插入禁区，配合打出来了。", effects: { reputation: 7, attrs: { heading: 1 } } },
            fail: { text: "起跳晚了。球从你头顶飞过，你落地时脚踝一软。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "对手压上进攻，后场留出大片空当。你带球推进，前面只有两名后卫。草皮在鞋钉下翻飞，看台的吼声压过来。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "连续变向，带球强行抹过后卫", check: { attrs: ["dribble", "agility"], difficulty: 35, tag: "盘带+柔韧" },
            success: { text: "你肩膀一沉，连续变向。两名后卫重心全丢了。你{elementAdj}地抹进禁区，迎球推射。球进了。", effects: { reputation: 11, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "变向趟大了。后卫伸脚一捅，球弹出去老远。你踩在球上滑了一下。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你连晃两人抹进禁区，{elementAdj}地推射死角。安静了一秒，然后所有人都站起来了。", effects: { reputation: 18, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "带球杀到禁区前沿，起脚远射", check: { attrs: ["shooting", "power"], difficulty: 37, tag: "射门+力量" },
            success: { text: "你带球推进到弧顶，{elementAdj}地拔脚怒射。球像炮弹一样砸进网窝。门将的手指尖都没碰到。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "射门发力过猛。球高出横梁，飞向看台。你的脚背还在发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你带球长驱直入，{elementAdj}地在禁区外拔脚。球带着弧线钻入死角。带刀后卫的世界波。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "分球给插上的边锋，自己继续前插", check: { attrs: ["passing", "vision"], difficulty: 28, tag: "传球+视野" },
            success: { text: "你一脚分边。内牛尔心领神会，反身插上。球到人到。这球传得漂亮。", effects: { reputation: 8, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "分球力量大了。球滚出底线，内牛尔摊手看着你。你的脚踝还在发酸。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "抢点头球，蹭给插上的队友", check: { attrs: ["heading", "iq"], difficulty: 27, tag: "头球+球商" },
            success: { text: "长传过来，你抢点头球一蹭。球绕过对方后卫，落到队友脚下。干净。", effects: { reputation: 7, attrs: { heading: 1 } } },
            fail: { text: "摆渡顶偏了。球落到对手脚下。你的额头还在发疼。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "balanced", text: "用后背顶住后卫，护球不丢", check: { attrs: ["strength", "hardness"], difficulty: 26, tag: "对抗+硬度" },
            success: { text: "你像钉子一样卡住后卫。肩膀顶着肩膀，肋骨发疼。队友跑出空当，你分球。", effects: { reputation: 6, attrs: { strength: 1 } } },
            fail: { text: "你被挤开了。后背撞在广告牌上，铁皮的凉意透过球衣。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "门将把球短传给你。你一停球，两名前锋已经扑到脸上。草腥味呛进喉咙。看台在嘘。出球线路全被封死。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "attack", text: "拨球变向，强行带球摆脱逼抢", check: { attrs: ["dribble", "agility"], difficulty: 33, tag: "盘带+柔韧" },
            success: { text: "你肩膀一沉，拨球变向。两名前锋被你晃开。你{elementAdj}地带球杀出包围圈。", effects: { reputation: 9, attrs: { dribble: 1 } } },
            fail: { text: "拨球趟大了。前锋伸脚一捅，球权丢了。你的脚踝还在发酸。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你连晃两名逼抢的前锋，{elementAdj}地带球杀过中线。全场都站起来了。", effects: { reputation: 16, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "balanced", text: "一脚直塞，打穿对手的高位防线", check: { attrs: ["passing", "vision"], difficulty: 29, tag: "传球+视野" },
            success: { text: "你抬头一扫，一脚直塞打穿两名前锋身后。队友顺势插上。这球传得漂亮。", effects: { reputation: 8, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "直塞被识破。前锋半路把球截下。你的脚踝还在发麻。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "balanced", text: "抢点头球，绕过逼抢点给中场", check: { attrs: ["heading", "balance"], difficulty: 26, tag: "头球+平衡" },
            success: { text: "长传过来，你抢点头球一蹭。球绕过逼抢，落到中场队友脚下。干净。", effects: { reputation: 6, attrs: { heading: 1 } } },
            fail: { text: "摆渡顶偏了。球落到对手脚下。你的额头还在发疼。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "扛住逼抢，护球等队友回接", check: { attrs: ["strength", "balance"], difficulty: 25, tag: "对抗+平衡" },
            success: { text: "你像钉子一样卡住身位。肩膀顶着肩膀，肋骨发疼。队友回接，球权稳住。", effects: { reputation: 5, attrs: { strength: 1 } } },
            fail: { text: "你被挤开了。球被前锋捅走。后背撞在草皮上，凉意透过来。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "attack", text: "毫不犹豫，起脚就是一记远射", check: { attrs: ["shooting", "resolve"], difficulty: 34, tag: "射门+决断" },
            success: { text: "你毫不犹豫，起脚就是一记远射。球{elementAdj}地钻入网窝。门将扑了个空。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "远射发力过猛。球高出横梁，飞向看台。你的脚背还在发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你后场果断起脚，球{elementAdj}地划过半场砸入死角。门将连反应都没有。带刀后卫的远程冷箭。", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          }
        ]
      },
      {
        text: "对方角球开到禁区，你盯的是对方的高点中锋。草腥味混着汗味，看台的吼声压下来。这球必须顶出去。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "抢先起跳，一记头球把球顶出危险区", check: { attrs: ["heading", "power"], difficulty: 28, tag: "头球+力量" },
            success: { text: "你抢在前点，{elementAdj}地一记头球。球被你顶出禁区。对手的角球进攻没了。", effects: { reputation: 8, attrs: { heading: 1 } } },
            fail: { text: "起跳晚了。球从你头顶飞过，对手顺势头球攻门。你的脖子还在发酸。", effects: { stamina: -4 } }
          },
          { id: "B", sit: "defense", text: "扛住对方中锋，把他卡在身位后面", check: { attrs: ["strength", "balance"], difficulty: 27, tag: "对抗+平衡" },
            success: { text: "你用后背顶住对方中锋。肩膀顶着肩膀，肋骨发疼。他起跳没争到。球被门将没收。", effects: { reputation: 7, attrs: { strength: 1 } } },
            fail: { text: "卡位没卡住。对方中锋从你身侧挤过，抢先头球。你的肋骨还在发疼。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "defense", text: "把球摘下来，冷静分到边路解围", check: { attrs: ["passing", "vision"], difficulty: 26, tag: "传球+视野" },
            success: { text: "你没硬抢。先把球摘下来，一脚分到边路。对手的角球进攻，被你这一传化掉了。", effects: { reputation: 7, attrs: { passing: 1 } } },
            fail: { text: "摘球拖了。对手顺势一捅，球权丢了。你的脚踝还在发麻。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "defense", text: "闷吼一声，头球解围顶到前场", check: { attrs: ["power", "resolve"], difficulty: 29, tag: "力量+决断" },
            success: { text: "你大吼一声，奋力起跳。一记头球把球顶到中场。落地时脚踝一软，但球安全了。", effects: { reputation: 7, attrs: { power: 1 } } },
            fail: { text: "起跳时机错了。球从你头顶飞过，对手顺势拿下。你的脖子还在发酸。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "defense", text: "迅速回身，用速度抢在对手身前把球护出去", check: { attrs: ["speed", "stamina"], difficulty: 26, tag: "速度+耐力" },
            success: { text: "你转身就追，肺在烧。两步并一步，你抢在对手身前把球护出底线。对手的角球进攻没了。", effects: { reputation: 7, attrs: { speed: 1 } } },
            fail: { text: "回身慢了半拍。对手抢先一步把球蹭走。你大腿酸得发抖。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "对方前锋单刀直入，冲向你把守的禁区。草皮在鞋钉下翻飞，心脏在胸腔里擂鼓。回追，还是上抢。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "果断倒地铲球，把球铲走", check: { attrs: ["tackle", "hardness"], difficulty: 30, tag: "铲断+硬度" },
            success: { text: "你{elementAdj}地倒地一铲。鞋钉贴着草皮，球被你铲出底线。对手前锋坐在地上发愣。", effects: { reputation: 10, attrs: { tackle: 1 } } },
            fail: { text: "铲抢扑空。对手拨球晃过，你整个人滑出去老远。膝盖火辣辣地疼。", effects: { stamina: -5 } }
          },
          { id: "B", sit: "defense", text: "拼命回追，用速度封住射门角度", check: { attrs: ["speed", "stamina"], difficulty: 28, tag: "速度+耐力" },
            success: { text: "你玩命回追，肺在烧。两步并一步，你卡到他身侧。射门角度被你封死了。", effects: { reputation: 8, attrs: { speed: 1 } } },
            fail: { text: "回追慢了半拍。对手抢先一步推射。你只能看着球滚向球门。大腿酸得发抖。", effects: { stamina: -5 } }
          },
          { id: "C", sit: "defense", text: "先摘稳球，再一脚分边化解", check: { attrs: ["passing", "vision"], difficulty: 26, tag: "传球+视野" },
            success: { text: "你没乱。先把球摘下来，一脚分到边路。单刀的险情，被你这一传化掉了。", effects: { reputation: 7, attrs: { passing: 1 } } },
            fail: { text: "摘球拖了。对手顺势一捅，球权丢了。你的脚踝还在发麻。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "defense", text: "用尽全力，一记头球把球砸向中场", check: { attrs: ["power", "resolve"], difficulty: 29, tag: "力量+决断" },
            success: { text: "你大吼一声，奋力起跳。一记头球把球顶到中场。落地时脚踝一软，但球安全了。", effects: { reputation: 7, attrs: { power: 1 } } },
            fail: { text: "起跳时机错了。球从你头顶飞过，对手顺势拿下。你的脖子还在发酸。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "defense", text: "提前站位，封堵他最可能的射门线路", check: { attrs: ["positioning", "iq"], difficulty: 25, tag: "站位+球商" },
            success: { text: "你没扑人，扑的是线路。提前一步站到射门线上。对手一脚抽射，正砸在你身上。闷响。", effects: { reputation: 8, attrs: { positioning: 1 } } },
            fail: { text: "站位偏了。对手从你身侧抹过，单刀推射。你扑了个空。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "读秒阶段，领先一球。对手全线压上，把球吊进禁区。草腥味混着汗味，看台的吼声像潮水。守住这球，三分到手。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "上抢铲断，把球连人一起留下", check: { attrs: ["tackle", "intercept"], difficulty: 29, tag: "铲断+拦截" },
            success: { text: "你{elementAdj}地下脚，一记干净铲断。球被你铲出禁区。对手的最后一攻没了。", effects: { reputation: 9, attrs: { tackle: 1 } } },
            fail: { text: "下脚慢了。对手拨球晃过，起脚抽射。你的膝盖磕在草皮上，火辣辣地疼。", effects: { stamina: -5 } }
          },
          { id: "B", sit: "defense", text: "回追卡住内线，封死他的射门角度", check: { attrs: ["speed", "stamina"], difficulty: 27, tag: "速度+耐力" },
            success: { text: "你玩命回追，肺在烧。两步并一步，你卡到内线。射门角度没了。对手只能回传。", effects: { reputation: 7, attrs: { speed: 1 } } },
            fail: { text: "回追慢了半拍。对手抢先推射。你只能看着球滚向球门。大腿酸得发抖。", effects: { stamina: -5 } }
          },
          { id: "C", sit: "defense", text: "不慌不忙，把球摘下来控住节奏分边解围", check: { attrs: ["rhythm", "iq"], difficulty: 24, tag: "节奏+球商" },
            success: { text: "你没乱。把球摘下来，控住节奏，一脚分到边路。对手的最后一攻，被你这一缓化掉了。", effects: { reputation: 7, attrs: { rhythm: 1 } } },
            fail: { text: "处理球拖了。对手顺势逼抢，球差点被断。你的小腿还在发酸。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "defense", text: "怒吼着起跳，头球重重顶出", check: { attrs: ["power", "resolve"], difficulty: 29, tag: "力量+决断" },
            success: { text: "你大吼一声，奋力起跳。一记头球把球顶到中场。落地时脚踝一软，但球安全了。三分到手。", effects: { reputation: 7, attrs: { power: 1 } } },
            fail: { text: "起跳时机错了。球从你头顶飞过，对手顺势拿下。你的脖子还在发酸。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "defense", text: "站住位置，把禁区前沿堵死", check: { attrs: ["positioning", "balance"], difficulty: 23, tag: "站位+平衡" },
            success: { text: "你不抢，只卡。站住位置，把禁区前沿堵得死死的。对手的最后一攻没了空间。三分到手。", effects: { reputation: 6, attrs: { positioning: 1 } } },
            fail: { text: "站位偏了半步。对手从你身侧抹过，起脚射门。你重心一歪，差点摔倒。", effects: { stamina: -3 } }
          }
        ]
      },
{
        text: "你在后场断下皮球，对方两名前锋扑上来逼抢。可你脚下生风，一个变向就抹过了第一个。前面是开阔地。草腥味混着汗味，看台的吼声压过来。带球推进，是你的本能。",
        sit: "attack",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "连续变向，盘带过掉两人",
            check: { attrs: ["dribble", "agility"], difficulty: 37, tag: "盘带+柔韧" },
            success: {
              text: "你左晃右拨，从两人中间穿了过去。风灌进耳朵，草皮在鞋钉下飞退。看台全站起来了。",
              effects: {
                reputation: 12,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "变向趟大了。后卫伸脚一捅，球丢了。你踩在球上滑了一下。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你后场连过三人，杀到禁区前沿。一个中卫，踢出了边锋的华丽。",
              effects: {
                reputation: 19,
                attrs: { dribble: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "一个加速爆发，强行超车",
            check: { attrs: ["burst", "speed"], difficulty: 36, tag: "爆发+速度" },
            success: {
              text: "你一个爆发，从后卫身侧强行超车。两步甩开，面前一片开阔。",
              effects: {
                reputation: 11,
                attrs: { burst: 1 }
              }
            },
            fail: {
              text: "爆发后趟球大了。后卫回追把球捅走。你的大腿还在发酸。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你一个爆发连超两人，杀入禁区。带刀中卫，名不虚传。",
              effects: {
                reputation: 18,
                attrs: { burst: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "推进后分球给插上的队友",
            check: { attrs: ["passing", "vision"], difficulty: 27, tag: "传球+视野" },
            success: {
              text: "你带球吸引防守，抬头一扫，一脚分球送到插上的队友脚下。他迎球推射。",
              effects: {
                reputation: 8,
                assists: 1,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "分球力量大了。队友没接住，球出了边线。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "扛住贴身逼抢，护球推进",
            check: { attrs: ["strength", "balance"], difficulty: 27, tag: "对抗+平衡" },
            success: {
              text: "你背身扛住逼抢的后卫，肩膀顶肩膀，硬生生护球推进。肋发疼，可你过去了。",
              effects: {
                reputation: 7,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "你被挤开了。球丢了，后背撞在草皮上，凉意渗进球衣。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "见好就收，回传稳住球权",
            check: { attrs: ["positioning", "iq"], difficulty: 23, tag: "站位+球商" },
            success: {
              text: "你没贪功，回传给身后的搭档。球权稳住了，阵型也压上了。",
              effects: {
                reputation: 5,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "回传力量小了。队友没接稳，险些被断。你后背冒了层冷汗。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "你一路带球推进到禁区弧顶。对方后卫退得太深，给了你起脚的空间。三十米。脚背绷紧。草腥味混着汗味，看台全站起来了。",
        sit: "attack",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "拔脚怒射，直奔死角",
            check: { attrs: ["shooting", "power"], difficulty: 39, tag: "射门+力量" },
            success: {
              text: "你脚背绷紧，拔脚就射。球像炮弹一样砸向死角。门将指尖差了三厘米。",
              effects: {
                reputation: 13,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "发力太狠，球擦着立柱飞出底线。脚背震得发麻。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你弧顶拔脚怒射。球{elementAdj}地砸入网窝。带刀中卫，一剑封喉。",
              effects: {
                reputation: 22,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "再带一步，晃开角度后起脚",
            check: { attrs: ["dribble", "burst"], difficulty: 36, tag: "盘带+爆发" },
            success: {
              text: "你一个变向晃开半步空间，起脚抽射。球贴着草皮钻入远角。",
              effects: {
                reputation: 11,
                goals: 1,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "变向趟大了。后卫伸脚一捅，球丢了。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你连晃两人，杀进禁区推射死角。全场都站了起来。",
              effects: {
                reputation: 18,
                goals: 1,
                attrs: { dribble: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "分给位置更好的队友",
            check: { attrs: ["passing", "vision"], difficulty: 27, tag: "传球+视野" },
            success: {
              text: "你抬头一扫，一脚分球送到空当里的队友脚下。他迎球推射。配合打出来了。",
              effects: {
                reputation: 8,
                assists: 1,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "分球力量大了。队友没接住，球出了边线。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "扛住回追的后腰，护球再起脚",
            check: { attrs: ["strength", "balance"], difficulty: 27, tag: "对抗+平衡" },
            success: {
              text: "你背身扛住回追的后腰，肩膀顶肩膀。等他失了重心，你转身起脚。",
              effects: {
                reputation: 7,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "你被挤开了。球丢了，后背撞在草皮上，肋骨发疼。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "回传稳住球权",
            check: { attrs: ["positioning", "iq"], difficulty: 23, tag: "站位+球商" },
            success: {
              text: "你没贪功，回传给身后的搭档。球权稳住了。教练在场边点头。",
              effects: {
                reputation: 5,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "回传力量小了。队友没接稳，险些被断。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "禁区前沿一片混战。解围球弹出来，落到大禁区线。双方同时扑向落点。草皮被鞋钉翻得稀烂，泥土腥气直冲鼻腔。",
        sit: "balanced",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "迎球凌空抽射",
            check: { attrs: ["shooting", "burst"], difficulty: 37, tag: "射门+爆发" },
            success: {
              text: "你没等球落地，迎球就是一脚凌空。球带着风声砸向死角。门将指尖差了两厘米。",
              effects: {
                reputation: 12,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "凌空没吃准部位。球高高飞出看台，脚背震得发麻。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你迎球凌空怒射。球{elementAdj}地砸入网窝。带刀中卫，名不虚传。",
              effects: {
                reputation: 20,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "balanced",
            text: "用身体扛开对方，把球护下",
            check: { attrs: ["strength", "balance"], difficulty: 27, tag: "对抗+平衡" },
            success: {
              text: "你肩膀一沉，把对方后腰扛在身后。球护住了。肋骨发疼，可球权是你的。",
              effects: {
                reputation: 7,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "对抗中你被挤开。球被对方勾走。后背撞在人身上，闷响。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "抢先伸脚把球勾走",
            check: { attrs: ["agility", "speed"], difficulty: 28, tag: "柔韧+速度" },
            success: {
              text: "你比所有人快半步，脚尖一勾，把球从人堆里勾了出来。轻巧，干净。",
              effects: {
                reputation: 7,
                attrs: { agility: 1 }
              }
            },
            fail: {
              text: "伸脚慢了一拍。球被对方先捅走。你的脚踝扭了一下。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "拿下球顺势分边",
            check: { attrs: ["passing", "vision"], difficulty: 25, tag: "传球+视野" },
            success: {
              text: "你抢下落点，抬头一扫，一脚分边。球贴着草皮滑到队友脚下。",
              effects: {
                reputation: 6,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "分球力量小了。球滚到半路被断。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "卡住落点站位，把对方挡在身后",
            check: { attrs: ["positioning", "balance"], difficulty: 24, tag: "站位+平衡" },
            success: {
              text: "你提前卡住落点，背身把对方挡在身后。球稳稳落下，你护住了。",
              effects: {
                reputation: 6,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "站位偏了半步。对方从你身侧挤过，抢先捅走了球。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "对方前锋在越位线附近游走。你压上一步，朝搭档打了个手势。草腥味混着汗味。整体前顶，就这一下。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "指挥防线前顶，造越位",
            check: { attrs: ["intercept", "positioning"], difficulty: 26, tag: "拦截+站位" },
            success: {
              text: "你一声吼，整条防线齐齐前压。对方前锋启动早了半步，边裁举旗。越位。",
              effects: {
                reputation: 7,
                attrs: { intercept: 1 }
              }
            },
            fail: {
              text: "防线没压齐。对方反越位成功，单刀。你后背发凉。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "阅读传球时机，提前移动卡线",
            check: { attrs: ["iq", "positioning"], difficulty: 27, tag: "球商+站位" },
            success: {
              text: "你没看球，看的是他的眼神。传球刚起，你已经卡在接球点上。一伸脚，球断了。",
              effects: {
                reputation: 7,
                attrs: { iq: 1 }
              }
            },
            fail: {
              text: "判断错了路线。球从你身侧漏过，你扑了个空。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "造越位失败，对方反插，你回追",
            check: { attrs: ["speed", "stamina"], difficulty: 29, tag: "速度+耐力" },
            success: {
              text: "你转身就追，两步抢回身位，把球护出底线。肺在烧，可你追上了。",
              effects: {
                reputation: 7,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "回追慢了半拍。对方单刀推射。你只能看着球进网。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "D",
            sit: "defense",
            text: "对方强行突破，你果断放铲",
            check: { attrs: ["resolve", "tackle"], difficulty: 30, tag: "决断+铲断" },
            success: {
              text: "你毫不犹豫，倒地一铲。鞋钉先碰到球，连人带球铲出边线。",
              effects: {
                reputation: 8,
                attrs: { resolve: 1 }
              }
            },
            fail: {
              text: "铲球铲空了。对方顺势抹过，你摔在草皮上，膝盖火辣辣地疼。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "E",
            sit: "balanced",
            text: "站位卡死内线，把对方逼向边路",
            check: { attrs: ["positioning", "balance"], difficulty: 24, tag: "站位+平衡" },
            success: {
              text: "你侧身一站，把内线堵死。对方只能往边路走，威胁小了。",
              effects: {
                reputation: 6,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "站位偏了半步。对方从内线抹过，你重心一歪。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "门将弃门出击，扑了个空。球弹向空门，对方前锋补射。门线前只剩你。雨水混着汗，糊住了眼睛。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "门线前奋力头球解围",
            check: { attrs: ["heading", "power"], difficulty: 30, tag: "头球+力量" },
            success: {
              text: "你退到门线，奋力一跃，额头狠狠砸在球上。球飞向中场。空门，保住了。",
              effects: {
                reputation: 9,
                attrs: { heading: 1 }
              }
            },
            fail: {
              text: "起跳晚了半拍。球擦着你的头皮滚进门窝。你跪在门线前。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "用身体堵枪眼，硬扛下补射",
            check: { attrs: ["hardness", "strength"], difficulty: 31, tag: "硬度+对抗" },
            success: {
              text: "你张开双臂堵在门线。对方的爆射砸在你胸口，闷响。球弹出去了。你疼得弯腰，却笑了。",
              effects: {
                reputation: 9,
                attrs: { hardness: 1 }
              }
            },
            fail: {
              text: "你侧身让了半步。球从你身侧钻进门窝。胸口的闷痛还在。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "抢先赶到落点，把球捅出底线",
            check: { attrs: ["speed", "agility"], difficulty: 29, tag: "速度+柔韧" },
            success: {
              text: "你比对方前锋快半步赶到，脚尖一捅，球擦着立柱出了底线。好险。",
              effects: {
                reputation: 8,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "你慢了一步。对方先碰到球，轻轻一推，球进了。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "D",
            sit: "defense",
            text: "判断球的反弹路线，提前移动",
            check: { attrs: ["iq", "positioning"], difficulty: 27, tag: "球商+站位" },
            success: {
              text: "你没看球，看的是它的旋转。反弹刚起，你已经站在门线上，伸脚把球挡出。",
              effects: {
                reputation: 7,
                attrs: { iq: 1 }
              }
            },
            fail: {
              text: "判断错了反弹方向。球从另一侧滚进门窝，你扑了个空。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "奋力飞身把球挡出",
            check: { attrs: ["resolve", "burst"], difficulty: 32, tag: "决断+爆发" },
            success: {
              text: "你什么都没想，整个人飞出去。手掌堪堪碰到球，把它托出横梁。肩膀生疼。",
              effects: {
                reputation: 9,
                attrs: { resolve: 1 }
              }
            },
            fail: {
              text: "飞身慢了半拍。球从你指尖滑进门窝。你摔在门线里。",
              effects: { stamina: -5 }
            }
          }
        ]
      }
    ]
  },
  CB_classic: {
    desc: "调度、长传、指挥",
    events: [
      {
        text: "你在后场拿球，对手的逼抢还没压上来。草腥味混着汗味，看台的吼声压过来。组织进攻，从你脚下开始。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "balanced", text: "一脚长传转移，打给弱侧的边锋", check: { attrs: ["passing", "vision"], difficulty: 29, tag: "传球+视野" },
            success: { text: "你抬头一扫，一脚长传转移。球划过半场，落到弱侧边锋脚下。这球传得漂亮。", effects: { reputation: 9, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "长传力量大了。球滚出边线。边锋摊手看着你。你的脚踝还在发麻。", effects: { stamina: -3 } }
          },
          { id: "B", sit: "attack", text: "迎球就射，远射直奔球门", check: { attrs: ["shooting", "resolve"], difficulty: 34, tag: "射门+决断" },
            success: { text: "你毫不犹豫，起脚就是一记远射。球{elementAdj}地钻入网窝。门将扑了个空。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "远射发力过猛。球高出横梁，飞向看台。你的脚背还在发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你后场果断起脚，球{elementAdj}地划过半场砸入死角。门将连反应都没有。组织型中卫的远程制导。", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "attack", text: "带球推进，杀向中场再分球", check: { attrs: ["dribble", "speed"], difficulty: 32, tag: "盘带+速度" },
            success: { text: "你带球推进，{elementAdj}地杀过中线。对手回追的脚步乱了。你一脚分球，进攻打出来了。", effects: { reputation: 9, attrs: { dribble: 1 } } },
            fail: { text: "推进趟大了。对手回身一捅，球弹出去老远。你的大腿还在发酸。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你带球长驱直入，{elementAdj}地连过两人杀到禁区。一脚抽射，球砸进网窝。组织型中卫的带刀。", effects: { reputation: 17, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "D", sit: "balanced", text: "抢点头球，点给插上的中场", check: { attrs: ["heading", "iq"], difficulty: 26, tag: "头球+球商" },
            success: { text: "长传过来，你抢点头球一蹭。球绕过对方逼抢，落到中场队友脚下。干净。", effects: { reputation: 6, attrs: { heading: 1 } } },
            fail: { text: "摆渡顶偏了。球落到对手脚下。你的额头还在发疼。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "balanced", text: "扛住逼抢，护球等队友回接", check: { attrs: ["strength", "balance"], difficulty: 25, tag: "对抗+平衡" },
            success: { text: "你像钉子一样卡住身位。肩膀顶着肩膀，肋骨发疼。队友回接，球权稳住。", effects: { reputation: 5, attrs: { strength: 1 } } },
            fail: { text: "你被挤开了。球被对手捅走。后背撞在草皮上，凉意透过来。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "对手压上进攻，后场留出大片空当。你抬头一看，内牛尔正在反越位线上游走。草皮在鞋钉下翻飞。一脚长传，就是反击。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "一脚精准长传，制导反击", check: { attrs: ["passing", "vision"], difficulty: 34, tag: "传球+视野" },
            success: { text: "你抬头一扫，一脚长传划过半场。球{elementAdj}地落到内牛尔脚下。单刀。推射。球进了。", effects: { reputation: 11, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "长传力量大了。球滚出底线。内牛尔摊手看着你。你的脚踝还在发麻。", effects: { stamina: -3 } },
            critical: { text: "【灵光一闪】你一脚长传制导，球{elementAdj}地划过半场。内牛尔心领神会，单刀推射。组织型中卫的致命一传。", effects: { reputation: 18, assists: 1, attrs: { passing: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "带球推进，自己杀向中场", check: { attrs: ["dribble", "speed"], difficulty: 32, tag: "盘带+速度" },
            success: { text: "你带球推进，{elementAdj}地杀过中线。对手回追的脚步乱了。你一脚分球，进攻打出来了。", effects: { reputation: 9, attrs: { dribble: 1 } } },
            fail: { text: "推进趟大了。对手回身一捅，球弹出去老远。你的大腿还在发酸。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你带球长驱直入，{elementAdj}地连过两人杀到禁区。一脚抽射，球砸进网窝。", effects: { reputation: 16, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "抢点头球，蹭给插上的中场", check: { attrs: ["heading", "balance"], difficulty: 27, tag: "头球+平衡" },
            success: { text: "长传过来，你抢点头球一蹭。球绕过对方逼抢，落到中场队友脚下。干净。", effects: { reputation: 7, attrs: { heading: 1 } } },
            fail: { text: "摆渡顶偏了。球落到对手脚下。你的额头还在发疼。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "扛住逼抢，护球等队友跑位", check: { attrs: ["strength", "balance"], difficulty: 25, tag: "对抗+平衡" },
            success: { text: "你像钉子一样卡住身位。肩膀顶着肩膀，肋骨发疼。队友跑出空当，你分球。", effects: { reputation: 5, attrs: { strength: 1 } } },
            fail: { text: "你被挤开了。球被对手捅走。后背撞在草皮上，凉意透过来。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "attack", text: "抬脚便射，一记远射砸向球门", check: { attrs: ["shooting", "resolve"], difficulty: 36, tag: "射门+决断" },
            success: { text: "你毫不犹豫，起脚就是一记远射。球{elementAdj}地钻入网窝。门将扑了个空。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "远射发力过猛。球高出横梁，飞向看台。你的脚背还在发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你后场果断起脚，球{elementAdj}地划过半场砸入死角。门将连反应都没有。组织型中卫的远程制导。", effects: { reputation: 19, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          }
        ]
      },
      {
        text: "对手前锋在越位线附近游走，伺机反越位。草腥味混着汗味，看台的吼声压过来。指挥防线，就在这一刻。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "提前预判，把传球线路掐死", check: { attrs: ["intercept", "iq"], difficulty: 25, tag: "拦截+球商" },
            success: { text: "你没扑人，预判的是传球线路。脚尖一伸，球半路改道。对手前锋还没反应过来。", effects: { reputation: 8, attrs: { intercept: 1 } } },
            fail: { text: "预判错了方向。球从你身侧滚过，对手顺势插上。你扑了个空。", effects: { stamina: -3 } }
          },
          { id: "B", sit: "defense", text: "指挥防线压上造越位，顺势把球摘下分边", check: { attrs: ["passing", "iq"], difficulty: 25, tag: "传球+球商" },
            success: { text: "你扯着嗓子喊了一声，防线齐刷刷压上。顺势把球摘下，一脚分到边路。对手的攻势被你这一传化掉了。", effects: { reputation: 8, attrs: { passing: 1 } } },
            fail: { text: "处理球拖了。对手顺势逼抢，球差点被断。你的脚踝还在发麻。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "defense", text: "全力回追，抢在他射门前卡住角度", check: { attrs: ["speed", "stamina"], difficulty: 27, tag: "速度+耐力" },
            success: { text: "你玩命回追，肺在烧。两步并一步，你卡到他身侧。射门角度被你封死了。", effects: { reputation: 7, attrs: { speed: 1 } } },
            fail: { text: "回追慢了半拍。对手抢先一步推射。你只能看着球滚向球门。大腿酸得发抖。", effects: { stamina: -5 } }
          },
          { id: "D", sit: "defense", text: "绷紧脖子，奋力把头球顶远", check: { attrs: ["power", "resolve"], difficulty: 29, tag: "力量+决断" },
            success: { text: "你大吼一声，奋力起跳。一记头球把球顶到中场。落地时脚踝一软，但球安全了。", effects: { reputation: 7, attrs: { power: 1 } } },
            fail: { text: "起跳时机错了。球从你头顶飞过，对手顺势拿下。你的脖子还在发酸。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "defense", text: "提前站位，卡住身位把前锋挡在身后", check: { attrs: ["positioning", "balance"], difficulty: 23, tag: "站位+平衡" },
            success: { text: "你不抢，只卡。提前一步卡住身位，把前锋挡在身后。他抬头一看，传球线路全没了。", effects: { reputation: 6, attrs: { positioning: 1 } } },
            fail: { text: "站位偏了半步。对手从你身侧抹过，你重心一歪，差点摔倒。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "角球开出，你跑到禁区抢点。对方后卫贴上来，肘部顶着你的腰。草腥味、汗味、还有网绳被风吹动的声音。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "看准落点，一记甩头攻门", check: { attrs: ["heading", "power"], difficulty: 36, tag: "头球+力量" },
            success: { text: "你看准落点，{elementAdj}地一记甩头。球砸在地上弹入网窝。门将扑救不及。", effects: { reputation: 12, goals: 1, attrs: { heading: 1 } } },
            fail: { text: "头槌顶偏了。球擦着立柱飞出底线。你的额头还在发疼。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你看准落点高高跃起，{elementAdj}地把球砸进网窝。门将连反应都没有。组织型中卫的头槌。", effects: { reputation: 19, goals: 1, attrs: { heading: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "抢前点，冲顶把球砸向球门", check: { attrs: ["burst", "heading"], difficulty: 35, tag: "爆发+头球" },
            success: { text: "你抢在前点，{elementAdj}地一记冲顶。球砸入网窝。门将扑了个空。", effects: { reputation: 11, goals: 1, attrs: { burst: 1 } } },
            fail: { text: "冲顶没顶正。球擦着横梁飞出底线。你的脖子还在发酸。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你抢前点鱼跃冲顶，{elementAdj}地把球砸进死角。整个禁区都安静了。", effects: { reputation: 18, goals: 1, attrs: { burst: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "短角球配合，回做给队友重新组织", check: { attrs: ["passing", "rhythm"], difficulty: 24, tag: "传球+节奏" },
            success: { text: "你没硬抢，回做给外围队友。节奏一缓，对手防线乱了。重新组织的机会来了。", effects: { reputation: 5, attrs: { passing: 1 } } },
            fail: { text: "回做力量小了。队友没接住，球被对方捅走。你的肩膀还酸着。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "attack", text: "胸部停球，拨球转身抹进禁区", check: { attrs: ["dribble", "agility"], difficulty: 33, tag: "盘带+柔韧" },
            success: { text: "球落到你胸前。你一停一拨，转身抹进禁区。后卫重心丢了。你{elementAdj}地推射。球进了。", effects: { reputation: 11, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "停球没卸好。球弹出去老远，被后卫一脚解围。你的胸口还在发闷。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你胸部停球转身，{elementAdj}地抹进禁区推射死角。门将连反应都没有。整个禁区都安静了。", effects: { reputation: 18, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "E", sit: "balanced", text: "卡住后卫身位，把球争下来", check: { attrs: ["strength", "balance"], difficulty: 27, tag: "对抗+平衡" },
            success: { text: "你用后背顶住后卫，胳膊卡住身位。球落下来，你稳稳争到。对手只能看着。", effects: { reputation: 6, attrs: { strength: 1 } } },
            fail: { text: "卡位没卡住。后卫从你身侧挤过，抢先解围。你的肋骨还在发疼。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "对手反击，直塞打穿你身边的防线。队友失位了，草皮在鞋钉下翻飞。补位，就在这一刻。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "飞身滑铲，把球连人一起拦下", check: { attrs: ["tackle", "hardness"], difficulty: 29, tag: "铲断+硬度" },
            success: { text: "你{elementAdj}地倒地一铲。鞋钉贴着草皮，球被你铲出底线。对手前锋坐在地上发愣。", effects: { reputation: 9, attrs: { tackle: 1 } } },
            fail: { text: "铲抢扑空。对手拨球晃过，你整个人滑出去老远。膝盖火辣辣地疼。", effects: { stamina: -5 } }
          },
          { id: "B", sit: "defense", text: "加速回追，用速度堵死他的射门线路", check: { attrs: ["speed", "stamina"], difficulty: 27, tag: "速度+耐力" },
            success: { text: "你玩命回追，肺在烧。两步并一步，你卡到他身侧。射门角度被你封死了。", effects: { reputation: 8, attrs: { speed: 1 } } },
            fail: { text: "回追慢了半拍。对手抢先一步推射。你只能看着球滚向球门。大腿酸得发抖。", effects: { stamina: -5 } }
          },
          { id: "C", sit: "defense", text: "沉着把球控下，顺势分边解围", check: { attrs: ["passing", "vision"], difficulty: 26, tag: "传球+视野" },
            success: { text: "你没乱。先把球摘下来，一脚分到边路。反击的险情，被你这一传化掉了。", effects: { reputation: 7, attrs: { passing: 1 } } },
            fail: { text: "摘球拖了。对手顺势一捅，球权丢了。你的脚踝还在发麻。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "defense", text: "大喝一声，头球解围顶过中线", check: { attrs: ["power", "resolve"], difficulty: 29, tag: "力量+决断" },
            success: { text: "你大吼一声，奋力起跳。一记头球把球顶到中场。落地时脚踝一软，但球安全了。", effects: { reputation: 7, attrs: { power: 1 } } },
            fail: { text: "起跳时机错了。球从你头顶飞过，对手顺势拿下。你的脖子还在发酸。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "defense", text: "提前站位，封堵他最可能的射门线路", check: { attrs: ["positioning", "iq"], difficulty: 25, tag: "站位+球商" },
            success: { text: "你没扑人，扑的是线路。提前一步站到射门线上。对手一脚抽射，正砸在你身上。闷响。", effects: { reputation: 8, attrs: { positioning: 1 } } },
            fail: { text: "站位偏了。对手从你身侧抹过，单刀推射。你扑了个空。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "补时最后一分钟，领先一球。对手连门将都压上来了，角球开到禁区。草腥味混着汗味。看台全站起来了。守住，就是三分。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "咬紧牙关，一记头球顶出危险区", check: { attrs: ["power", "resolve"], difficulty: 29, tag: "力量+决断" },
            success: { text: "你大吼一声，奋力起跳。一记头球把球顶到中场。落地时脚踝一软，但球安全了。三分到手。", effects: { reputation: 7, attrs: { power: 1 } } },
            fail: { text: "起跳时机错了。球从你头顶飞过，对手顺势拿下。你的脖子还在发酸。", effects: { stamina: -4 } }
          },
          { id: "B", sit: "defense", text: "全速回追，把漏过去的球追回来", check: { attrs: ["speed", "stamina"], difficulty: 27, tag: "速度+耐力" },
            success: { text: "你转身就追，肺在烧。两步并一步，你把漏过去的球追了回来。球权夺回。三分到手。", effects: { reputation: 7, attrs: { speed: 1 } } },
            fail: { text: "回追慢了一拍。对手顺势推进，你只能看着他的背影。大腿酸得发抖。", effects: { stamina: -5 } }
          },
          { id: "C", sit: "defense", text: "预判落点，提前移动把球摘下", check: { attrs: ["intercept", "iq"], difficulty: 25, tag: "拦截+球商" },
            success: { text: "你没硬抢，预判的是落点。提前一步站到位置上，把球稳稳摘下。三分到手。", effects: { reputation: 8, attrs: { intercept: 1 } } },
            fail: { text: "预判错了方向。球落到对手脚下，起脚抽射。你扑了个空。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "defense", text: "不慌不忙，把球摘下来控住节奏分边解围", check: { attrs: ["rhythm", "iq"], difficulty: 24, tag: "节奏+球商" },
            success: { text: "你没乱。把球摘下来，控住节奏，一脚分到边路。对手的最后一攻，被你这一缓化掉了。三分到手。", effects: { reputation: 7, attrs: { rhythm: 1 } } },
            fail: { text: "处理球拖了。对手顺势逼抢，球差点被断。你的小腿还在发酸。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "defense", text: "站住位置，把禁区前沿堵死", check: { attrs: ["positioning", "balance"], difficulty: 24, tag: "站位+平衡" },
            success: { text: "你不抢，只卡。站住位置，把禁区前沿堵得死死的。对手的最后一攻没了空间。三分到手。", effects: { reputation: 6, attrs: { positioning: 1 } } },
            fail: { text: "站位偏了半步。对手从你身侧抹过，起脚射门。你重心一歪，差点摔倒。", effects: { stamina: -3 } }
          }
        ]
      },
{
        text: "门将把球交到你脚下。对方两名前锋高位逼抢，出球线路被封得死死的。可你眼里看到的是另一条缝。草腥味混着汗味。出球型中卫，靠的是脑子。",
        sit: "balanced",
        choices: [
          {
            id: "A",
            sit: "balanced",
            text: "一脚贴地短传，从逼抢的缝隙里穿过去",
            check: { attrs: ["passing", "vision"], difficulty: 28, tag: "传球+视野" },
            success: {
              text: "你瞥见两人之间的缝隙，一脚贴地短传。球从他们脚边穿过，落到队友脚下。漂亮。",
              effects: {
                reputation: 9,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "短传力量小了。球被对方伸脚一断。你的脚背还在发麻。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "先指挥防线落位，把阵型站稳",
            check: { attrs: ["positioning", "iq"], difficulty: 24, tag: "站位+球商" },
            success: {
              text: "你朝队友一挥手，整条防线齐齐落位。阵型站稳了，逼抢自解。",
              effects: {
                reputation: 6,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "队友没领会你的意思。阵型没站稳，你只能回传。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "扛住逼抢的前锋，护住球",
            check: { attrs: ["strength", "balance"], difficulty: 27, tag: "对抗+平衡" },
            success: {
              text: "你背身扛住逼抢的前锋，肩膀顶肩膀，寸步不让。等他失了重心，你转身分球。",
              effects: {
                reputation: 7,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "你被挤开了。球丢了，后背撞在草皮上，肋骨发疼。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "一个转身晃开逼抢，带球推进",
            check: { attrs: ["agility", "dribble"], difficulty: 28, tag: "柔韧+盘带" },
            success: {
              text: "你一个转身，把逼抢的前锋晃在身后。带球推进，防线被你撕开一道口子。",
              effects: {
                reputation: 8,
                attrs: { agility: 1 }
              }
            },
            fail: {
              text: "转身没晃开。球被对方捅走，你的脚踝扭了一下。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "E",
            sit: "attack",
            text: "果断一脚长传打身后",
            check: { attrs: ["resolve", "passing"], difficulty: 33, tag: "决断+传球" },
            success: {
              text: "你瞥见对方防线身后的空当，一脚长传。球越过整条防线，落到队友脚下。反击打出来了。",
              effects: {
                reputation: 9,
                attrs: { resolve: 1 }
              }
            },
            fail: {
              text: "长传力量大了。球直接飞出底线。你的脚背还在发烫。",
              effects: { stamina: -4 }
            }
          }
        ]
      },
{
        text: "你在后场拿球，对方防线压得很高。内牛尔一个反跑，撕开了后卫身后的空当。草腥味混着汗味。这一脚直塞，就是单刀。看台的吼声压过来。",
        sit: "attack",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "一脚贴地直塞，精准送到内牛尔脚下",
            check: { attrs: ["passing", "vision"], difficulty: 35, tag: "传球+视野" },
            success: {
              text: "你脚弓一推，球贴着草皮穿过两人，落到内牛尔脚下。单刀。助攻到手。",
              effects: {
                reputation: 12,
                assists: 1,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "直塞力量大了。球直接滚出底线。内牛尔回头看了你一眼。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "见门将站位靠前，吊射空门",
            check: { attrs: ["shooting", "power"], difficulty: 39, tag: "射门+力量" },
            success: {
              text: "你瞥见门将站在小禁区外，脚背一吊。球划过半场，坠入空门。门将回追不及。",
              effects: {
                reputation: 13,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "吊射高了。球越过横梁飞出底线。门将回头看了一眼。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你后场一脚吊射。球{elementAdj}地坠入空门。门将望球兴叹，全场沸腾。",
              effects: {
                reputation: 21,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "C",
            sit: "attack",
            text: "自己带球推进，撕开防线",
            check: { attrs: ["dribble", "speed"], difficulty: 35, tag: "盘带+速度" },
            success: {
              text: "你带球长驱直入，抹过逼抢的前锋。防线被你一个人撕开。",
              effects: {
                reputation: 10,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "趟球大了半步。对方伸脚一捅，球丢了。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你后场带球连过三人，杀到禁区前沿。出球型中卫，也能踢出前锋的气势。",
              effects: {
                reputation: 17,
                attrs: { dribble: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "扛住逼抢的前锋，护住球",
            check: { attrs: ["strength", "balance"], difficulty: 26, tag: "对抗+平衡" },
            success: {
              text: "你背身扛住逼抢的前锋，肩膀顶肩膀。等队友跑位，你从容分球。",
              effects: {
                reputation: 6,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "你被挤开了。球丢了，后背撞在草皮上，凉意渗进球衣。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "回传重新组织，稳住阵型",
            check: { attrs: ["positioning", "iq"], difficulty: 23, tag: "站位+球商" },
            success: {
              text: "你没冒险，回传给搭档。球权稳住了，阵型也压上了。教练在场边点头。",
              effects: {
                reputation: 5,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "回传力量小了。队友没接稳，险些被断。你后背冒了层冷汗。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "对方一记远射被你方后卫挡出，球弹到禁区前沿。第二落点。对方后腰插上准备补射。你拖在后面，得保护这个点。草皮被鞋钉翻起。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "用身体扛开对方后腰，把落点护下",
            check: { attrs: ["strength", "balance"], difficulty: 27, tag: "对抗+平衡" },
            success: {
              text: "你肩膀一沉，把对方后腰扛在身后。落点护住了。肋骨发疼，可球权是你的。",
              effects: {
                reputation: 7,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "对抗中你被挤开。对方从你身侧挤过，迎球就是一脚。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "抢先把球顶出去，解围",
            check: { attrs: ["heading", "power"], difficulty: 27, tag: "头球+力量" },
            success: {
              text: "你抢在对方身前，奋力一跃，额头把球顶向中场。落点保护住了。",
              effects: {
                reputation: 7,
                attrs: { heading: 1 }
              }
            },
            fail: {
              text: "起跳晚了半拍。球擦着你的头皮落到对方脚下。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "抢先一步伸脚把球勾走",
            check: { attrs: ["agility", "speed"], difficulty: 28, tag: "柔韧+速度" },
            success: {
              text: "你比对方快半步，脚尖一勾，把球从人堆里勾出来。轻巧，干净。",
              effects: {
                reputation: 7,
                attrs: { agility: 1 }
              }
            },
            fail: {
              text: "伸脚慢了一拍。对方先捅到球，迎球补射。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "拿下球，冷静分给边路",
            check: { attrs: ["passing", "vision"], difficulty: 24, tag: "传球+视野" },
            success: {
              text: "你护下落点，抬头一扫，一脚分边。球贴着草皮滑到队友脚下。由守转攻。",
              effects: {
                reputation: 6,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "分球力量小了。球滚到半路被断。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "对方迎球补射，奋力用身体封堵",
            check: { attrs: ["resolve", "hardness"], difficulty: 30, tag: "决断+硬度" },
            success: {
              text: "你张开双臂扑上去。对方的爆射砸在你胸口，闷响。球弹出去了。你疼得弯腰，却值。",
              effects: {
                reputation: 8,
                attrs: { resolve: 1 }
              }
            },
            fail: {
              text: "你侧身让了半步。球从你身侧钻进门窝。胸口的闷痛还在。",
              effects: { stamina: -5 }
            }
          }
        ]
      },
{
        text: "大雨倾盆，草皮积起水洼。比赛到了最后，你的腿像灌了铅。对方还在冲击。你拖在防线最后，必须撑住。雨水糊住了眼睛。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "咬紧牙关，靠耐力撑过这一波",
            check: { attrs: ["stamina", "resolve"], difficulty: 29, tag: "耐力+决断" },
            success: {
              text: "肺在烧，腿在抖，你还是顶住了。一波又一波，你像堤坝一样不退。哨响了。撑住了。",
              effects: {
                reputation: 8,
                attrs: { stamina: 1 }
              }
            },
            fail: {
              text: "你再也迈不动腿。对方从你身侧抹过，单刀。你跪在积水里。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "用硬度扛住对方前锋的冲击",
            check: { attrs: ["hardness", "strength"], difficulty: 30, tag: "硬度+对抗" },
            success: {
              text: "对方前锋反复冲击，你肩膀顶肩膀，寸步不让。肋骨发疼，可你扛住了。",
              effects: {
                reputation: 8,
                attrs: { hardness: 1 }
              }
            },
            fail: {
              text: "对抗中你被挤开。对方顺势抹过，推射。你后背一片冰凉。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "湿滑草皮上稳住重心，不被晃倒",
            check: { attrs: ["balance", "positioning"], difficulty: 27, tag: "平衡+站位" },
            success: {
              text: "草皮滑得像抹了油。你压低重心，对方一个变向，你纹丝不动。卡住了。",
              effects: {
                reputation: 7,
                attrs: { balance: 1 }
              }
            },
            fail: {
              text: "脚下一滑，你摔坐在积水里。对方扬长而去，凉意渗进球衣。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "稳住节奏，指挥队友落位",
            check: { attrs: ["rhythm", "iq"], difficulty: 26, tag: "节奏+球商" },
            success: {
              text: "你扯着嗓子喊，把慌乱的队友一个个喊回位置。防线重新站稳。嗓子都劈了。",
              effects: {
                reputation: 7,
                attrs: { rhythm: 1 }
              }
            },
            fail: {
              text: "雨声太大，队友没听见你的指挥。防线一片混乱。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "体能极限，奋力把球大脚解围",
            check: { attrs: ["resolve", "power"], difficulty: 31, tag: "决断+力量" },
            success: {
              text: "你用尽最后的力气，一脚把球踢向看台。球飞得老高。解围了。",
              effects: {
                reputation: 8,
                attrs: { resolve: 1 }
              }
            },
            fail: {
              text: "腿软了，解围踢呲了。球弹回禁区，落到对方脚下。",
              effects: { stamina: -5 }
            }
          }
        ]
      },
{
        text: "教练在场边喊：盯死那个九号。对方箭头中锋在你身边来回游走，鞋钉抠进草皮。草腥味混着汗味。整场比赛，你就像他的影子。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "贴身肉搏，用对抗把他扛开",
            check: { attrs: ["strength", "hardness"], difficulty: 29, tag: "对抗+硬度" },
            success: {
              text: "你贴上去，肩膀顶肩膀，寸步不让。他每一次接球都被你扛开。整场，他没脾气。",
              effects: {
                reputation: 8,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "对抗中你被挤开。他顺势抹过，起脚。你后背冒了层冷汗。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "卡住身位，把他逼向边路",
            check: { attrs: ["positioning", "balance"], difficulty: 25, tag: "站位+平衡" },
            success: {
              text: "你侧身卡住内线，把他一点点逼向边路。威胁小了。你像影子一样跟着他。",
              effects: {
                reputation: 7,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "站位偏了半步。他从内线抹过，你重心一歪。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "C",
            sit: "defense",
            text: "他反跑前插，你回追跟上",
            check: { attrs: ["speed", "stamina"], difficulty: 29, tag: "速度+耐力" },
            success: {
              text: "他突然反跑前插。你转身就追，两步跟上，把球护出底线。肺在烧，可你跟住了。",
              effects: {
                reputation: 7,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "回追慢了半拍。他单刀推射。你只能看着球进网。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "D",
            sit: "defense",
            text: "阅读他的跑位，提前卡住接球点",
            check: { attrs: ["iq", "positioning"], difficulty: 27, tag: "球商+站位" },
            success: {
              text: "你没看球，看的是他的眼神。传球刚起，你已经卡在接球点上。一伸脚，球断了。",
              effects: {
                reputation: 7,
                attrs: { iq: 1 }
              }
            },
            fail: {
              text: "判断错了他的跑位。球从你身侧漏过，你扑了个空。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "他强行转身，你果断放铲",
            check: { attrs: ["resolve", "tackle"], difficulty: 30, tag: "决断+铲断" },
            success: {
              text: "他强行转身，你毫不犹豫倒地一铲。鞋钉先碰到球，连人带球铲出边线。",
              effects: {
                reputation: 8,
                attrs: { resolve: 1 }
              }
            },
            fail: {
              text: "铲球铲空了。他顺势抹过，你摔在草皮上，膝盖火辣辣地疼。",
              effects: { stamina: -5 }
            }
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
        text: "前场混战。球弹到你脚下。你抬头一看，禁区间隙是一道缝。心跳很快。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "把握机会，起脚射门", check: { attrs: ["shooting", "burst"], difficulty: 24, tag: "射门+爆发" },
            success: { text: "皮球带着{elementAdj}的劲道钻入死角。球进了。你愣了一秒，然后跑了。", effects: { reputation: 8, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "射门偏出。你撞了下草皮，手掌擦破了皮。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】青训赛首球。球进了。场边有人喊了声好。你甚至没来得及举手。", effects: { reputation: 14, goals: 1, attrs: { shooting: 2 } } }
          },
          { id: "B", sit: "balanced", text: "横传给位置更好的队友", check: { attrs: ["passing", "vision"], difficulty: 22, tag: "传球+视野" },
            success: { text: "你一记{elementAdj}的横传。队友推射空门。他朝你跑了过来。", effects: { reputation: 6, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "横传被回追的后卫破坏。你的脚背还在发麻。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "attack", text: "带球突入禁区，再寻机会", check: { attrs: ["dribble", "resolve"], difficulty: 27, tag: "盘带+决断" },
            success: { text: "你带球抹入禁区。晃开角度。推射得手。", effects: { reputation: 9, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "带球被后卫伸腿捅掉。你踩了个空。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】连过两人。冷静推射。球进了。你的腿在抖。", effects: { reputation: 15, goals: 1, attrs: { dribble: 2 } } }
          },
          { id: "D", sit: "balanced", text: "回敲队友，重新组织", check: { attrs: ["positioning", "passing"], difficulty: 19, tag: "站位+传球" },
            success: { text: "你回敲后前插。队友直塞找回你。配合打出威胁。", effects: { reputation: 4, attrs: { positioning: 1 } } },
            fail: { text: "回敲被对方预判拦截。你甩了甩脚。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "先回防，防止对方打反击", check: { attrs: ["tackle", "speed"], difficulty: 19, tag: "铲断+速度" },
            success: { text: "你提前回追。化解了对方一次快速反击。肺部在灼烧。", effects: { reputation: 4, attrs: { tackle: 1 } } },
            fail: { text: "回防慢了一步。对方反击造险。你弯着腰喘气。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "对方反击。你方后场吃紧。教头在场边喊：\"都给我回防！\"声音都劈了。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "回追铲断，化解危机", check: { attrs: ["tackle", "speed"], difficulty: 22, tag: "铲断+速度" },
            success: { text: "你一记干净铲断。草皮擦过小腿，火辣辣的。看台上有人喊了声好。", effects: { reputation: 5, attrs: { tackle: 1 } } },
            fail: { text: "铲断失误。送给对方一个任意球。你低头看了眼球鞋。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】铁壁封堵。你的铲球干净利落。球和人一起留在了底线外。", effects: { reputation: 10, attrs: { tackle: 2 } } }
          },
          { id: "B", sit: "defense", text: "全速回追，卡住身位堵他", check: { attrs: ["speed", "positioning"], difficulty: 20, tag: "速度+站位" },
            success: { text: "你全速回追。卡住身位。对方被迫减速，反击没打起来。", effects: { reputation: 5, attrs: { speed: 1 } } },
            fail: { text: "回追慢了半步。被对手过掉。你站在原地。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "balanced", text: "断球后迅速长传发动反击", check: { attrs: ["passing", "vision"], difficulty: 24, tag: "传球+视野" },
            success: { text: "你断球后一脚长传找到前场队友。反击打出威胁。", effects: { reputation: 6, attrs: { passing: 1 } } },
            fail: { text: "长传力量大了。直接出了边线。你甩了甩脚。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "defense", text: "退守禁区，不轻易出脚", check: { attrs: ["positioning", "balance"], difficulty: 18, tag: "站位+平衡" },
            success: { text: "你且战且退。卡住身位。对方只能回传。", effects: { reputation: 4, attrs: { positioning: 1 } } },
            fail: { text: "退守中被对方晃开角度。你后颈发凉。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "balanced", text: "战术犯规，打断对方节奏", check: { attrs: ["resolve", "strength"], difficulty: 21, tag: "决断+对抗" },
            success: { text: "你一次合理的战术犯规。打断了对方反击节奏。裁判没掏牌。", effects: { reputation: 3, attrs: { resolve: 1 } } },
            fail: { text: "犯规动作大了。黄牌。你低头看了眼裁判手里的牌。", effects: { stamina: -3, reputation: -2 } }
          }
        ]
      },
      {
        text: "比赛进入尾声。比分胶着。最后一次进攻，球权在你脚下。汗水滴在草皮上。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "attack", text: "禁区外起脚，搏一个世界波", check: { attrs: ["shooting", "power"], difficulty: 30, tag: "射门+力量" },
            success: { text: "皮球带着{elementAdj}的弧线轰入球网。绝杀。你跪在草皮上。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "射门被后卫封堵。终场哨响。你躺在草皮上，盯着天。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】读秒绝杀。球进了。场边有人把外套扔上了天。你甚至没跑，只是站在原地。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "balanced", text: "控制节奏，等队友跑位", check: { attrs: ["vision", "rhythm"], difficulty: 24, tag: "视野+节奏" },
            success: { text: "你冷静控球。送出一记{elementAdj}的直塞。队友破门。", effects: { reputation: 9, assists: 1, attrs: { vision: 1 } } },
            fail: { text: "犹豫间被对方拼抢断下。你肩膀撞在草皮上。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "attack", text: "带球突破，撕开防线", check: { attrs: ["dribble", "burst"], difficulty: 32, tag: "盘带+爆发" },
            success: { text: "你带球强突。晃过门将推射空门。绝杀。你的腿在抖。", effects: { reputation: 13, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "突破被回追的后卫破坏。你弯着腰喘气。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】单骑闯关。你撕碎了整条防线。球进了。安静了一秒。然后所有人都站起来了。", effects: { reputation: 21, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "D", sit: "attack", text: "插入禁区抢点，等队友传中", check: { attrs: ["positioning", "heading"], difficulty: 28, tag: "站位+头球" },
            success: { text: "你卡住身位插入禁区。队友传中。你抢点甩头。球进了。", effects: { reputation: 10, goals: 1, attrs: { positioning: 1 } } },
            fail: { text: "抢点慢了半步。球从头顶飞过。你甩了甩脚。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "balanced", text: "扛住后卫，护球等队友插上", check: { attrs: ["strength", "balance"], difficulty: 24, tag: "对抗+平衡" },
            success: { text: "你用身体扛住后卫。护住球。队友插上接应。威胁打出来了。", effects: { reputation: 5, attrs: { strength: 1 } } },
            fail: { text: "对抗中被后卫挤开。你踉跄了两步。球丢了。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "第一次在正式比赛触球。球传过来的时候，你的脚在抖。草腥味很浓。看台上有人在喊。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "attack", text: "深呼吸，接球转身", check: { attrs: ["dribble", "resolve"], difficulty: 22, tag: "盘带+决断" },
            success: { text: "你{elementAdj}地接球。转身。球在脚下，沉实。心跳慢下来了。", effects: { reputation: 5, attrs: { dribble: 1 } } },
            fail: { text: "接球的时候脚软了。球弹出去老远。你的脸在发烫。", effects: { stamina: -3 } }
          },
          { id: "B", sit: "balanced", text: "一脚出球，不粘球", check: { attrs: ["passing", "iq"], difficulty: 20, tag: "传球+球商" },
            success: { text: "你一脚出球。队友拿球，推进。简单，但有效。", effects: { reputation: 4, attrs: { passing: 1 } } },
            fail: { text: "一脚出球力量小了。被对方断球。你后颈发凉。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "attack", text: "咬牙带球推进，豁出去了", check: { attrs: ["resolve", "dribble"], difficulty: 26, tag: "决断+盘带" },
            success: { text: "你咬牙带球推进。过了一个人。心跳很快，但腿不抖了。", effects: { reputation: 6, attrs: { resolve: 1 } } },
            fail: { text: "带球被断了。你站在原地，脸在发烫。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你带球推进，连过两人。第一次触球，就像踢了一百场。场边有人喊了声好。", effects: { reputation: 12, attrs: { resolve: 2 } } }
          },
          { id: "D", sit: "balanced", text: "回传，先稳住", check: { attrs: ["positioning", "passing"], difficulty: 18, tag: "站位+传球" },
            success: { text: "你回传。先稳住。不是每次都要冒险。", effects: { reputation: 3, attrs: { positioning: 1 } } },
            fail: { text: "回传力量轻了。险些被断。你后颈发凉。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "回防，先做好防守", check: { attrs: ["tackle", "positioning"], difficulty: 19, tag: "铲断+站位" },
            success: { text: "你回防。做好防守。教练在场边点了下头。", effects: { reputation: 4, attrs: { tackle: 1 } } },
            fail: { text: "回防慢了一步。你弯着腰喘气。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "队友受伤下场。少打一人。教头在场边喊：\"顶住！\"你的大腿在发酸。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "多跑一步，补上缺口", check: { attrs: ["stamina", "speed"], difficulty: 24, tag: "耐力+速度" },
            success: { text: "你{elementAdj}地多跑一步。补上缺口。肺部在灼烧，但顶住了。", effects: { reputation: 6, attrs: { stamina: 1 } } },
            fail: { text: "跑不动了。大腿像灌了铅。对方从缺口打进来。", effects: { stamina: -5 } }
          },
          { id: "B", sit: "defense", text: "收缩防线，不给他们空间", check: { attrs: ["positioning", "iq"], difficulty: 22, tag: "站位+球商" },
            success: { text: "你收缩防线。不给对方空间。他们只能回传。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "收缩太慢了。对方从边路打进来。你后颈发凉。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "balanced", text: "断球后长传，打反击", check: { attrs: ["passing", "vision"], difficulty: 26, tag: "传球+视野" },
            success: { text: "你断球后长传。前场队友拿到球。反击。", effects: { reputation: 6, attrs: { passing: 1 } } },
            fail: { text: "长传力量大了。球出了边线。你甩了甩脚。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "defense", text: "战术犯规，打断节奏", check: { attrs: ["strength", "resolve"], difficulty: 21, tag: "对抗+决断" },
            success: { text: "你战术犯规。打断了对方节奏。裁判没掏牌。", effects: { reputation: 4, attrs: { strength: 1 } } },
            fail: { text: "犯规动作大了。黄牌。你低头看了眼裁判手里的牌。", effects: { stamina: -3, reputation: -2 } }
          },
          { id: "E", sit: "attack", text: "自己带球推进，减轻防守压力", check: { attrs: ["resolve", "dribble"], difficulty: 28, tag: "决断+盘带" },
            success: { text: "你带球推进。把对方压回去。防守压力小了。", effects: { reputation: 6, attrs: { resolve: 1 } } },
            fail: { text: "带球被断了。对方反击。你弯着腰喘气。", effects: { stamina: -5 } }
          }
        ]
      },
{
        text: "首发名单念到你的名字。你站起来，球衣号码还带着折痕。草腥味扑面而来，看台比训练场大得多。教头拍了拍你的肩：去吧，别怂。",
        sit: "balanced",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "拿球就起脚远射，先给自己壮胆",
            check: { attrs: ["shooting", "power"], difficulty: 30, tag: "射门+力量" },
            success: {
              text: "你迎球就是一脚。球带着风声砸向球门，门将扑救脱手。看台轰的一声。你的脚背还在发烫。",
              effects: {
                reputation: 9,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "发力太狠，球高出了横梁。脚背震得发麻，你听见有人叹气。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你迎球怒射。球{elementAdj}地砸入网窝。替补席全站了起来，教头攥紧了拳头。",
              effects: {
                reputation: 16,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "带球往前趟，用速度撕开一道口子",
            check: { attrs: ["speed", "dribble"], difficulty: 28, tag: "速度+盘带" },
            success: {
              text: "你一趟一拨，从两人中间穿了过去。风灌进耳朵，草皮在鞋钉下飞退。第一次突破，成了。",
              effects: {
                reputation: 8,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "趟球大了半步。后卫伸脚一捅，你踉跄着冲出边线，膝盖磕在草皮上。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "稳稳把球分给空当里的队友",
            check: { attrs: ["passing", "vision"], difficulty: 22, tag: "传球+视野" },
            success: {
              text: "你抬头一扫，一脚推传送到队友脚下。简单，干净。教头在场边点了点头。",
              effects: {
                reputation: 5,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "传球力量轻了。球滚到半路被断下，你的脚踝还酸着。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "背身护住球，等队友上来接应",
            check: { attrs: ["strength", "balance"], difficulty: 24, tag: "对抗+平衡" },
            success: {
              text: "你像木桩一样卡住后卫。肩膀顶着肩膀，肋骨发酸。队友接应到位，你顺势分球。",
              effects: {
                reputation: 5,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "你被挤了个趔趄，球丢了。后背撞在草皮上，凉意渗进球衣。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "先卡住自己的位置，把防线站稳",
            check: { attrs: ["positioning", "iq"], difficulty: 22, tag: "站位+球商" },
            success: {
              text: "你不慌不乱，退到该站的位置。对方传球刚起，你就把线路卡死。肺在烧，可你站住了。",
              effects: {
                reputation: 5,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "你站错了位置。对方从你身边的空当抹过，你只能回追，大腿发酸。",
              effects: { stamina: -4 }
            }
          }
        ]
      },
{
        text: "哨响。点球。队友把球塞进你怀里：你来。你站在罚球点，草皮被鞋钉踩出一个坑。布澜门将在门线上拍手，喊你抬头看他。",
        sit: "attack",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "抡圆了爆射，用力量砸进去",
            check: { attrs: ["strength", "power"], difficulty: 30, tag: "对抗+力量" },
            success: {
              text: "你助跑，发力。球像炮弹一样撞进网窝，门将判断对了方向也扑不到。网绳还在颤。",
              effects: {
                reputation: 11,
                goals: 1,
                attrs: { strength: 1 }
              }
            },
            fail: {
              text: "发力过猛，球擦着立柱飞出底线。脚背震得生疼，你不敢回头看队友。",
              effects: { stamina: -5 }
            },
            critical: {
              text: "【灵光一闪】你一脚把球轰进死角。球{elementAdj}地砸在网窝上弹起。门将纹丝没动。",
              effects: {
                reputation: 18,
                goals: 1,
                attrs: { strength: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "推射死角，用脚法骗过门将",
            check: { attrs: ["shooting", "burst"], difficulty: 32, tag: "射门+爆发" },
            success: {
              text: "你屏住呼吸，脚弓一推。球贴着草皮滑向远角，门将扑反了方向。进了。",
              effects: {
                reputation: 11,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "推射角度太正。门将伸腿一挡，球弹了出来。你的脚趾在球鞋里发凉。",
              effects: { stamina: -5 }
            },
            critical: {
              text: "【灵光一闪】你轻巧一推。球{elementAdj}地钻进网窝底角。全场静了一秒，然后炸开。",
              effects: {
                reputation: 18,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "助跑顿一下，骗门将先动",
            check: { attrs: ["rhythm", "iq"], difficulty: 26, tag: "节奏+球商" },
            success: {
              text: "你助跑，停顿。门将先扑向一边，你才出脚。球滚进空门。心跳还没平复。",
              effects: {
                reputation: 8,
                goals: 1,
                attrs: { rhythm: 1 }
              }
            },
            fail: {
              text: "停顿过了头。门将看穿了你，原地没动，把球抱在怀里。你的喉咙发干。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "D",
            sit: "attack",
            text: "脚腕一抖，假射真扣晃开角度",
            check: { attrs: ["dribble", "agility"], difficulty: 28, tag: "盘带+柔韧" },
            success: {
              text: "你作势要打，脚腕却一扣。门将扑了个空，你拨球入网。手心全是汗，可你做到了。",
              effects: {
                reputation: 9,
                goals: 1,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "扣球那一下没晃开。门将纹丝没动，伸脚把球挡下。你的腿在抖。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "无论进没进，罚完立刻回位防反击",
            check: { attrs: ["pressure", "resolve"], difficulty: 22, tag: "抗压+决断" },
            success: {
              text: "球一离脚你就转身回跑。对方门将刚想快发反击，你已经落位。教头在场边喊了一声好。",
              effects: {
                reputation: 5,
                attrs: { pressure: 1 }
              }
            },
            fail: {
              text: "你罚完愣在原地。对方门将快发球发动反击，你回追时大腿像灌了铅。",
              effects: { stamina: -4 }
            }
          }
        ]
      },
{
        text: "范志贵后场传球失误，球直接送到了对方脚下。对方前锋顺势推进，防线撕开一道口子。范志贵愣在原地，脸都白了。教头在场边吼：补上去！你的心跳骤然加快。",
        sit: "defense",
        choices: [
          {
            id: "A",
            sit: "defense",
            text: "冲上去一记铲断，把球夺回来",
            check: { attrs: ["tackle", "hardness"], difficulty: 28, tag: "铲断+硬度" },
            success: {
              text: "你咬着牙冲上去，鞋钉刮着草皮。一记干净的铲断，球弹回自己人脚下。范志贵朝你竖了个大拇指。",
              effects: {
                reputation: 7,
                attrs: { tackle: 1 }
              }
            },
            fail: {
              text: "你铲晚了半步。对方拨球晃过，你整个人滑出去两米。膝盖火辣辣地疼。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "B",
            sit: "defense",
            text: "全速回追，用速度卡住他身位",
            check: { attrs: ["speed", "stamina"], difficulty: 26, tag: "速度+耐力" },
            success: {
              text: "你转身就追，风灌进耳朵。三步，两步，你抢到他身前，把球护出底线。肺在烧，但值了。",
              effects: {
                reputation: 6,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "你追了，可腿像灌了铅。对方快你半步，抹过你杀向球门。你只能看着他的背影。",
              effects: { stamina: -5 }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "不急着上抢，先封堵他的传球线路",
            check: { attrs: ["passing", "iq"], difficulty: 22, tag: "传球+球商" },
            success: {
              text: "你没扑上去，而是卡住他分球的线路。他犹豫了，带球慢了一拍。队友回防到位，危机化解。",
              effects: {
                reputation: 5,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "你封错了方向。他一脚直塞从你身侧穿过，队友还在身后。你懊恼地捶了下大腿。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "defense",
            text: "咬牙顶上去，用身体扛住他",
            check: { attrs: ["resolve", "power"], difficulty: 26, tag: "决断+力量" },
            success: {
              text: "你心一横，肩膀撞上去。他踉跄了一下，球趟大了。你顺势把球捅走。肋骨发酸，但你顶住了。",
              effects: {
                reputation: 6,
                attrs: { resolve: 1 }
              }
            },
            fail: {
              text: "你冲上去扛他，却被他一个转身甩开。你扑了个空，重心全丢。草腥味呛进喉咙。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "冷静选位，堵住他射门的角度",
            check: { attrs: ["positioning", "balance"], difficulty: 22, tag: "站位+平衡" },
            success: {
              text: "你不追球，追位置。你站到他和球门之间，角度封死了。他被迫分球，威胁全无。教头点了点头。",
              effects: {
                reputation: 5,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "你站位偏了半步。他起脚远射，球擦着门柱飞出。你后背全是冷汗。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "下半场过半。你的腿像灌了铅，肺里像塞了砂纸。每一次呼吸都带着血腥味。草腥味变得刺鼻。比分还咬着，你不能倒。",
        sit: "balanced",
        choices: [
          {
            id: "A",
            sit: "balanced",
            text: "调整呼吸，把节奏压下来分配体力",
            check: { attrs: ["stamina", "rhythm"], difficulty: 24, tag: "耐力+节奏" },
            success: {
              text: "你放慢脚步，深吸，慢吐。心跳一点点平下来。腿还在，比赛也还在。",
              effects: {
                reputation: 5,
                attrs: { stamina: 1 }
              }
            },
            fail: {
              text: "你想压节奏，可身体不听使唤。一个踉跄，你扶着膝盖喘气。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "B",
            sit: "balanced",
            text: "把球简单交给队友，自己缓一口气",
            check: { attrs: ["passing", "vision"], difficulty: 20, tag: "传球+视野" },
            success: {
              text: "你不粘球，一脚出球交给队友。趁这空当，你弯腰喘了两口。腿又有了点劲。",
              effects: {
                reputation: 4,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "传球绵软无力。球滚到半路被断，你连回追的力气都快没了。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "C",
            sit: "attack",
            text: "咬牙再冲一次，靠意志顶过去",
            check: { attrs: ["resolve", "burst"], difficulty: 30, tag: "决断+爆发" },
            success: {
              text: "你一咬牙，硬是冲了出去。腿在抖，可你过了人。看台的喊声把你往前推。",
              effects: {
                reputation: 8,
                attrs: { resolve: 1 }
              }
            },
            fail: {
              text: "你冲了半步，腿一软，球丢了。胸口像要炸开，眼前发花。",
              effects: { stamina: -5 }
            },
            critical: {
              text: "【灵光一闪】你不知哪来的劲，连过两人杀到禁区。那一瞬间，疲惫全没了。",
              effects: {
                reputation: 15,
                attrs: { resolve: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "D",
            sit: "defense",
            text: "拖着发酸的腿回防，先把位置站住",
            check: { attrs: ["intercept", "iq"], difficulty: 24, tag: "拦截+球商" },
            success: {
              text: "你拖着腿往回跑，提前卡住线路。对方传球被你伸脚一挡。汗水滴进眼睛，你眨都没眨。",
              effects: {
                reputation: 5,
                attrs: { intercept: 1 }
              }
            },
            fail: {
              text: "你回追慢了半拍。对方从你身边抹过，你只能看着他的背影喘气。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "省着跑，靠站位接应而不是硬拼",
            check: { attrs: ["positioning", "balance"], difficulty: 22, tag: "站位+平衡" },
            success: {
              text: "你不再瞎跑，站到该站的位置。球一来，你顺势接住分走。力气省下来了。",
              effects: {
                reputation: 5,
                attrs: { positioning: 1 }
              }
            },
            fail: {
              text: "你站错了位置，球从你身边漏过。你想补，腿却迈不开。",
              effects: { stamina: -3 }
            }
          }
        ]
      },
{
        text: "雨下大了。草皮泛着水光，球滚过来带着泥点。鞋钉踩上去打滑，看台模糊成一片灰。雨砸在脸上，眼睛睁不太开。",
        sit: "balanced",
        choices: [
          {
            id: "A",
            sit: "balanced",
            text: "用贴地短传，避开湿滑的长传",
            check: { attrs: ["passing", "iq"], difficulty: 24, tag: "传球+球商" },
            success: {
              text: "你不吊高球，一脚贴地推传。球在水膜上滑得又快又稳，队友轻松接住。雨幕里，这球很清醒。",
              effects: {
                reputation: 6,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "传球力量没算准水滑。球速太快，队友一脚停出了边线。雨水顺着脖子往下灌。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "趁门将视线受阻，远射一脚",
            check: { attrs: ["shooting", "power"], difficulty: 32, tag: "射门+力量" },
            success: {
              text: "你迎球抽射。球带着水花砸向球门，门将视线被雨挡住，扑救慢了半拍。球进了。",
              effects: {
                reputation: 11,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "支撑脚一滑，射门踢呲了。球偏出老远，你摔坐在泥水里，膝盖冰凉。",
              effects: { stamina: -5 }
            },
            critical: {
              text: "【灵光一闪】你一脚怒射。球{elementAdj}地穿过雨幕砸入网窝。门将连反应都没有。",
              effects: {
                reputation: 18,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "小步盘带护球，重心压低防滑",
            check: { attrs: ["dribble", "balance"], difficulty: 26, tag: "盘带+平衡" },
            success: {
              text: "你压低重心，小步拨球。别人都在打滑，你却稳稳趟过了人。雨水从发梢甩出去。",
              effects: {
                reputation: 7,
                attrs: { dribble: 1 }
              }
            },
            fail: {
              text: "球在水膜上滑得比你快。你一脚踏空，连人带球冲出边线。",
              effects: { stamina: -4 }
            }
          },
          {
            id: "D",
            sit: "balanced",
            text: "压低重心稳住脚下，抢第二落点",
            check: { attrs: ["balance", "iq"], difficulty: 26, tag: "平衡+球商" },
            success: {
              text: "雨天的球落地就窜。你压低重心，脚下站得稳稳的，把第二落点收进怀里。别人还在打滑。",
              effects: {
                reputation: 6,
                attrs: { balance: 1 }
              }
            },
            fail: {
              text: "你判断错了弹跳方向。脚下一滑，球从你身边漏过，你扑了个空。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "对方推进，滑铲把球破坏出边线",
            check: { attrs: ["tackle", "hardness"], difficulty: 28, tag: "铲断+硬度" },
            success: {
              text: "对方带球压上。你迎着泥水一记滑铲，连人带球把球铲出边线。草皮和泥糊了半条腿。",
              effects: {
                reputation: 6,
                attrs: { tackle: 1 }
              }
            },
            fail: {
              text: "草皮太滑，你铲空了。对方顺势抹过，你趴在泥水里看着他的背影。",
              effects: { stamina: -5 }
            }
          }
        ]
      },
{
        text: "补时最后一分钟，你们还差一个球。教头在场边喊：都压上去！角旗区的草皮被踩烂了。汗水混着雨水，全场都站了起来。",
        sit: "attack",
        choices: [
          {
            id: "A",
            sit: "attack",
            text: "冲进禁区抢点，头球砸向球门",
            check: { attrs: ["heading", "positioning"], difficulty: 32, tag: "头球+站位" },
            success: {
              text: "你抢前点，迎着传中一头砸下。球弹地入网。你跪在草皮上，吼声卡在喉咙里。",
              effects: {
                reputation: 12,
                goals: 1,
                attrs: { heading: 1 }
              }
            },
            fail: {
              text: "你顶偏了。球擦着门柱飞出，你重重摔在草皮上，肩膀发麻。",
              effects: { stamina: -5 }
            },
            critical: {
              text: "【灵光一闪】你高高跃起，一记{elementAdj}的头槌砸入死角。整座球场都炸了。",
              effects: {
                reputation: 20,
                goals: 1,
                attrs: { heading: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "B",
            sit: "attack",
            text: "禁区前沿迎球凌空抽射",
            check: { attrs: ["shooting", "burst"], difficulty: 34, tag: "射门+爆发" },
            success: {
              text: "球弹到禁区前沿。你迎球凌空一抽，球带着风声钻入网窝。门将扑了个空。",
              effects: {
                reputation: 12,
                goals: 1,
                attrs: { shooting: 1 }
              }
            },
            fail: {
              text: "你没吃准部位。球高高飞上看台，脚背震得发疼。",
              effects: { stamina: -5 }
            },
            critical: {
              text: "【灵光一闪】你凌空怒射。球{elementAdj}地砸入网窝。队友全扑上来把你压在底下。",
              effects: {
                reputation: 20,
                goals: 1,
                attrs: { shooting: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "C",
            sit: "balanced",
            text: "回做给位置更好的队友，成全他",
            check: { attrs: ["passing", "vision"], difficulty: 26, tag: "传球+视野" },
            success: {
              text: "你没贪功，回做给空当里的队友。他迎球推射，球进了。你们抱在一起。",
              effects: {
                reputation: 8,
                assists: 1,
                attrs: { passing: 1 }
              }
            },
            fail: {
              text: "回做力量轻了。队友没接稳，球被后卫捅走。你懊恼地捶了下草皮。",
              effects: { stamina: -3 }
            }
          },
          {
            id: "D",
            sit: "attack",
            text: "抢前点卡住身位，把球捅进网窝",
            check: { attrs: ["speed", "agility"], difficulty: 30, tag: "速度+柔韧" },
            success: {
              text: "你比后卫快半步，脚尖一捅。球从门将手边滚进网窝。整个看台站了起来。",
              effects: {
                reputation: 11,
                goals: 1,
                attrs: { speed: 1 }
              }
            },
            fail: {
              text: "你启动慢了半拍。后卫抢先一步把球解围，你扑倒在门线前。",
              effects: { stamina: -4 }
            },
            critical: {
              text: "【灵光一闪】你像泥鳅一样钻过后卫，{elementAdj}地把球捅进网窝。绝杀。",
              effects: {
                reputation: 18,
                goals: 1,
                attrs: { speed: 2 },
                flags: { keySuccess: true }
              }
            }
          },
          {
            id: "E",
            sit: "defense",
            text: "压上之余留神身后，防对方反击",
            check: { attrs: ["intercept", "iq"], difficulty: 24, tag: "拦截+球商" },
            success: {
              text: "全线压上，你没忘身后。对方刚想反击，你提前卡住线路，把球断下。进攻还在继续。",
              effects: {
                reputation: 6,
                attrs: { intercept: 1 }
              }
            },
            fail: {
              text: "你压得太靠上。对方一脚长传打你身后，你回追时腿已经迈不动了。",
              effects: { stamina: -4 }
            }
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

  // 通用队友事件池（问题4：按实际阵容过滤）
  // who 字段标记事件主角：agui=发小（默认在场）；laozhou/linxiao/suwan 依赖第四章选人旗标；无 who=通用事件（始终可用）
  teammate: [
    {
      who: "agui",
      text: "范志贵在前场不知疲倦地奔跑拉扯。他的球衣湿透了，但还在跑。硬生生拽开了对方防线的空当。",
      auto: { difficultyMod: -5 },
      result: "【队友拉扯】范志贵扯出空当，你下次检定难度-5。"
    },
    {
      who: "agui",
      text: "范志贵回防冲刺。他用身体封堵了对手的射门。球砸在他胸口上，闷响。他愣了一下，继续跑。",
      auto: { oppThreat: -1 },
      result: "【队友封堵】范志贵奋不顾身化解险情，对方威胁值-1。"
    },
    {
      who: "agui",
      text: "范志贵在前场反抢。他扑上去的时候腿都在抖，但球断了。他弯着腰喘气，朝你喊了声：\"上！\"",
      auto: { threat: 1 },
      result: "【队友反抢】范志贵前场断球策动进攻，我方威胁值+1。"
    },
    {
      who: "agui",
      text: "范志贵体力透支了。他的步伐慢了，但还在跑。肺在灼烧，大腿在发酸。他还在跑。",
      auto: { difficultyMod: -3 },
      result: "【队友坚持】范志贵咬牙坚持扯动防线，你下次检定难度-3。"
    },
    {
      who: "laozhou",
      text: "对方发动快速反击。老周拍马赶到，一记干净利落的滑铲将球断下。草皮擦过他的小腿。",
      auto: { oppThreat: -1 },
      result: "【队友拦截】老周化解了对方攻势，对方威胁值-1。"
    },
    {
      who: "laozhou",
      text: "老周一脚长传找到你。场边他的呐喊清晰可闻：\"上！别怂！\"",
      auto: { threat: 1, stamina: 5 },
      result: "【队友士气】老哥的支援让你士气大振，威胁值+1，体力+5。"
    },
    {
      who: "linxiao",
      text: "边路的内牛尔拿球。一个假动作，晃开防守。起脚传中。皮球划过门前——",
      auto: { threat: 1 },
      result: "【队友支援】内牛尔的传中制造杀机，我方威胁值+1。"
    },
    {
      who: "linxiao",
      text: "内牛尔连过两人。吸引整条防线后把球分给了你。他的呼吸很重，但眼睛很亮。",
      auto: { threat: 1 },
      result: "【队友突破】内牛尔的个人能力扯开空当，我方威胁值+1。"
    },
    {
      who: "linxiao",
      text: "内牛尔边路1v1。他沉肩，变向，过去了。下底传中。球划过门前，带着弧线。",
      auto: { threat: 1 },
      result: "【队友过人】内牛尔边路突破传中，我方威胁值+1。"
    },
    {
      who: "suwan",
      text: "苏雯在中场从容调度。突然送出一记手术刀般的直塞。球从人缝里穿过去。",
      auto: { threat: 1 },
      result: "【队友直塞】苏雯的传球撕开防线，我方威胁值+1。"
    },
    {
      who: "suwan",
      text: "苏雯提前预判了对手的传球路线。伸脚一挡，顺势发动反击。他甚至没转头看。",
      auto: { oppThreat: -1, threat: 1 },
      result: "【队友阅读】苏雯的拦截策动反击，对方威胁值-1，我方威胁值+1。"
    },
    {
      who: "suwan",
      text: "苏雯阅读比赛。他提前跑位，出现在你最需要的位置。你传球的时候，他已经在那里了。",
      auto: { difficultyMod: -4 },
      result: "【队友跑位】苏雯提前接应，你下次检定难度-4。"
    },
    {
      text: "队友积极回防。用身体对抗延缓了对手的进攻节奏。肩膀撞在草皮上，他爬起来继续跑。",
      auto: { oppThreat: -1 },
      result: "【队友协防】全队的防守努力让对方威胁值-1。"
    },
    {
      text: "队友在前场灵巧地无球跑动。拉走了对方防守注意力。空间出来了。",
      auto: { threat: 1 },
      result: "【队友跑位】队友的跑动扯出空间，我方威胁值+1。"
    },
    {
      text: "门将神勇扑救。对方射门的时候，他飞出去了。指尖碰到了球。球弹在门柱上，飞出去了。他趴在地上，喘了很久。",
      auto: { oppThreat: -1 },
      result: "【门将扑救】门将化解必进球，对方威胁值-1。"
    }
  ],

  // 关键时刻池（按局面抽取，权重×2）
  key: {
    k1: {
      leading: {
        text: "比分领先。对方全线压上试图扳平，后场露出大片空当。风灌进耳朵。",
        choices: [
          { id: "A", text: "前插反击，扩大领先", check: { attrs: ["speed", "burst"], difficulty: 34, tag: "速度+爆发" },
            success: { text: "你抓住空当高速前插。单刀推射扩大领先。你的大腿在抽搐。", effects: { reputation: 10, goals: 1, attrs: { speed: 1 } } },
            fail: { text: "反击被回追后卫破坏。险些被打了个回头。你弯着腰喘气。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】反击一击致命。你像一枚被弹射出去的钉子。球进了。", effects: { reputation: 16, goals: 1, attrs: { speed: 2 } } } },
          { id: "B", text: "控制节奏，消耗时间", check: { attrs: ["vision", "rhythm"], difficulty: 26, tag: "视野+节奏" },
            success: { text: "你冷静控球。把节奏牢牢握在脚下。", effects: { reputation: 5, attrs: { rhythm: 1 } } },
            fail: { text: "控球被断。对方顺势发动攻势。你后颈发凉。", effects: { stamina: -3 } } }
        ]
      },
      level: {
        text: "比分胶着。每一次球权都可能决定胜负。中场绞杀愈发激烈。汗水滴在草皮上。",
        choices: [
          { id: "A", text: "主动要球，撕开防线", check: { attrs: ["passing", "vision"], difficulty: 36, tag: "传球+视野" },
            success: { text: "你送出关键一传。队友破门打破僵局。", effects: { reputation: 10, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "传球被预判。球权易手。你甩了甩脚。", effects: { stamina: -3 } },
            critical: { text: "【灵光一闪】致命一传。球从人缝里穿过去。队友推射。进了。", effects: { reputation: 16, assists: 1, attrs: { passing: 2 } } } },
          { id: "B", text: "自己带球突入禁区", check: { attrs: ["dribble", "resolve"], difficulty: 38, tag: "盘带+决断" },
            success: { text: "你连过两人。禁区内起脚命中。", effects: { reputation: 12, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "带球被围抢断下。你被挤在中间。", effects: { stamina: -4 } } }
        ]
      },
      trailing: {
        text: "比分落后。时间一分一秒流逝。必须做点什么。肺部在灼烧。",
        choices: [
          { id: "A", text: "全力压上，搏命进攻", check: { attrs: ["shooting", "burst"], difficulty: 39, tag: "射门+爆发" },
            success: { text: "你抓住稍纵即逝的机会。起脚扳平比分。你的腿在抖。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "射门偏出。浪费了宝贵的时间。你弯着腰喘气。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】绝境爆发。球进了。你跪在草皮上，草腥味灌满鼻腔。", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 } } } },
          { id: "B", text: "稳住阵脚，寻找更好的机会", check: { attrs: ["iq", "rhythm"], difficulty: 29, tag: "球商+节奏" },
            success: { text: "你冷静组织。为队友创造出绝佳机会。", effects: { reputation: 8, assists: 1, attrs: { iq: 1 } } },
            fail: { text: "组织被对方识破。无功而返。你甩了甩脚。", effects: { stamina: -3 } } }
        ]
      }
    },
    k2: {
      leading: {
        text: "领先优势在手。对方门将都冲到了前场参与进攻。最后一搏。",
        choices: [
          { id: "A", text: "吊射空门，锁定胜局", check: { attrs: ["shooting", "iq"], difficulty: 36, tag: "射门+球商" },
            success: { text: "你一脚超远吊射。皮球坠入空门。你甚至没看球。", effects: { reputation: 14, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "吊射力量不足。被回追的后卫解围。你甩了甩脚。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】半场吊射。球带着弧线坠入空门。技惊四座。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 } } } },
          { id: "B", text: "回防稳住，保住胜果", check: { attrs: ["positioning", "resolve"], difficulty: 24, tag: "站位+决断" },
            success: { text: "你回防到位。协助队友守住胜果。", effects: { reputation: 6, attrs: { positioning: 1 } } },
            fail: { text: "回防稍慢。对方制造了一次险情。你后颈发凉。", effects: { stamina: -3 } } }
        ]
      },
      level: {
        text: "平局僵持到最后一刻。体能接近极限。谁先犯错谁就输。大腿在发酸。",
        choices: [
          { id: "A", text: "咬牙冲刺，最后一击", check: { attrs: ["burst", "resolve"], difficulty: 38, tag: "爆发+决断" },
            success: { text: "你榨干最后一丝力气。完成致命一击。你的腿在抖。", effects: { reputation: 12, goals: 1, attrs: { burst: 1 } } },
            fail: { text: "体力透支。动作变形。射门偏出。你跪在草皮上。", effects: { stamina: -6 } },
            critical: { text: "【灵光一闪】读秒绝杀。球进了。你甚至没力气庆祝。", effects: { reputation: 18, goals: 1, attrs: { burst: 2 } } } },
          { id: "B", text: "保存体力，拖入加时", check: { attrs: ["stamina", "iq"], difficulty: 24, tag: "耐力+球商" },
            success: { text: "你合理分配体力。把比赛拖入加时。", effects: { reputation: 4, stamina: 5, attrs: { stamina: 1 } } },
            fail: { text: "节奏被对方掌控。防线被撕开。对方再下一城。", effects: { stamina: -3 } } }
        ]
      },
      trailing: {
        text: "落后的局面下。对方反击如潮水般涌来。是搏命还是止损……",
        choices: [
          { id: "A", text: "全线压上，最后一搏", check: { attrs: ["shooting", "power"], difficulty: 40, tag: "射门+力量" },
            success: { text: "乱战中你抢射破门。保留翻盘希望。你的大腿在抽搐。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "压上后防线空虚。对方再下一城。你弯着腰喘气。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】绝境中的惊天逆转序幕。球进了。你跪在草皮上。", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 } } } },
          { id: "B", text: "回防防止再丢球", effects: { stamina: 5 } }
        ]
      }
    },
    k3: {
      leading: {
        text: "领先两球。对方孤注一掷，后场只剩两名后卫。反击的机会像一道裂缝。",
        choices: [
          { id: "A", text: "高速前插，打穿身后", check: { attrs: ["speed", "positioning"], difficulty: 37, tag: "速度+站位" },
            success: { text: "你{elementAdj}地前插。球到人到。单刀。推射。球进了。", effects: { reputation: 12, goals: 1, attrs: { speed: 1 } } },
            fail: { text: "前插越位了。边裁举旗。你弯着腰喘气。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你前插的时机像一把手术刀。单刀。推射。球进了。对方后卫还在转身。", effects: { reputation: 18, goals: 1, attrs: { speed: 2 } } } },
          { id: "B", text: "控住球，把时间耗完", check: { attrs: ["rhythm", "iq"], difficulty: 28, tag: "节奏+球商" },
            success: { text: "你控住球。时间一秒一秒过去。够了。", effects: { reputation: 6, attrs: { rhythm: 1 } } },
            fail: { text: "控球被断。对方反击。你后颈发凉。", effects: { stamina: -3 } } }
        ]
      },
      level: {
        text: "平局。比赛进入最后十分钟。双方体力都到了极限。每一次触球都可能是最后一次。",
        choices: [
          { id: "A", text: "致命直塞，一锤定音", check: { attrs: ["passing", "vision"], difficulty: 39, tag: "传球+视野" },
            success: { text: "你{elementAdj}地一脚直塞。球从人缝里穿过去。前锋推射。球进了。", effects: { reputation: 13, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "直塞被拦截。球权易手。你甩了甩脚。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】致命一传。球从三个人腿缝里穿过去。前锋推射。进了。安静了一秒。", effects: { reputation: 19, assists: 1, attrs: { passing: 2 } } } },
          { id: "B", text: "自己来，禁区前沿起脚", check: { attrs: ["shooting", "resolve"], difficulty: 40, tag: "射门+决断" },
            success: { text: "你拔脚。球带着弧线砸入死角。球进了。你的腿在抖。", effects: { reputation: 14, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "射门偏出。你的脚背抽疼。时间不多了。", effects: { stamina: -5 } } }
        ]
      },
      trailing: {
        text: "落后一球。时间只剩五分钟。对方开始拖延。你必须做点什么。肺部在灼烧。",
        choices: [
          { id: "A", text: "远射，搏一个", check: { attrs: ["shooting", "power"], difficulty: 40, tag: "射门+力量" },
            success: { text: "你{elementAdj}地拔脚。球带着弧线砸入球网。扳平。你跪在草皮上。", effects: { reputation: 14, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "远射高出横梁。你的脚背抽疼。时间不多了。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】绝境远射。球带着{elementAdj}的弧线，砸入死角。你甚至没力气庆祝。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 } } } },
          { id: "B", text: "组织进攻，找队友", check: { attrs: ["passing", "iq"], difficulty: 32, tag: "传球+球商" },
            success: { text: "你冷静组织。送出关键一传。队友破门。扳平。", effects: { reputation: 10, assists: 1, attrs: { iq: 1 } } },
            fail: { text: "组织被对方识破。无功而返。你弯着腰喘气。", effects: { stamina: -4 } } }
        ]
      }
    },
    k4: {
      leading: {
        text: "决赛。领先一球。最后三分钟。对方全线压上，门将都冲到了中场。你的大腿在抽搐。",
        choices: [
          { id: "A", text: "断球后吊射空门", check: { attrs: ["shooting", "iq"], difficulty: 40, tag: "射门+球商" },
            success: { text: "你{elementAdj}地断球。抬头。门将不在。吊射。球坠入空门。你甚至没看球。", effects: { reputation: 16, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "吊射力量不足。被回追的后卫解围。你甩了甩脚。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】半场吊射。球带着弧线坠入空门。决赛。锁定胜局。你站在原地，腿在抖。", effects: { reputation: 22, goals: 1, attrs: { shooting: 2 } } } },
          { id: "B", text: "死守，把胜果守到最后一秒", check: { attrs: ["tackle", "resolve"], difficulty: 30, tag: "铲断+决断" },
            success: { text: "你死守。用身体封堵。用腿拦截。终场哨响了。你跪在草皮上。", effects: { reputation: 8, attrs: { tackle: 1 } } },
            fail: { text: "防守被突破。对方扳回一球。你后颈发凉。", effects: { stamina: -5 } } }
        ]
      },
      level: {
        text: "决赛。平局。补时最后一分钟。球权在你脚下。汗水模糊了视线。这是最后一次机会。",
        choices: [
          { id: "A", text: "致命一传，撕开防线", check: { attrs: ["passing", "vision"], difficulty: 42, tag: "传球+视野" },
            success: { text: "你{elementAdj}地一脚直塞。球从人缝里穿过去。前锋推射。球进了。决赛。绝杀。", effects: { reputation: 16, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "直塞被拦截。终场哨响了。你站在原地。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】决赛最后一传。球从三个人腿缝里穿过去。前锋推射。进了。你跪在草皮上，草腥味灌满鼻腔。", effects: { reputation: 22, assists: 1, attrs: { passing: 2 } } } },
          { id: "B", text: "自己来，远射", check: { attrs: ["shooting", "resolve"], difficulty: 42, tag: "射门+决断" },
            success: { text: "你拔脚。球带着弧线砸入死角。决赛。绝杀。你的腿在抖。", effects: { reputation: 16, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "远射偏出。你的脚背抽疼。终场哨响了。", effects: { stamina: -6 } },
            critical: { text: "【灵光一闪】决赛最后一脚。球带着{elementAdj}的弧线，砸入死角。你甚至没力气庆祝。安静了一秒。然后所有人都站起来了。", effects: { reputation: 24, goals: 1, attrs: { shooting: 2 } } } }
        ]
      },
      trailing: {
        text: "决赛。落后一球。补时。最后一次进攻。你的大腿在发酸，肺部在灼烧。这是最后的机会。",
        choices: [
          { id: "A", text: "全力一击，搏命", check: { attrs: ["shooting", "burst"], difficulty: 42, tag: "射门+爆发" },
            success: { text: "你{elementAdj}地拔脚。球带着弧线砸入球网。扳平。决赛。你跪在草皮上。", effects: { reputation: 16, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "射门偏出。终场哨响了。你躺在草皮上，盯着天。", effects: { stamina: -6 } },
            critical: { text: "【灵光一闪】决赛绝境。球带着{elementAdj}的弧线，砸入死角。扳平。你甚至没力气站起来。", effects: { reputation: 24, goals: 1, attrs: { shooting: 2 } } } },
          { id: "B", text: "冷静组织，找队友", check: { attrs: ["passing", "vision"], difficulty: 38, tag: "传球+视野" },
            success: { text: "你冷静组织。送出关键一传。队友破门。扳平。决赛。", effects: { reputation: 12, assists: 1, attrs: { vision: 1 } } },
            fail: { text: "传球被拦截。终场哨响了。你站在原地。", effects: { stamina: -5 } } }
        ]
      }
    }
  }
};
