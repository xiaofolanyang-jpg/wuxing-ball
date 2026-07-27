/* data/match_pools.js — 比赛事件池，按「位置_踢法」分类
 * 每场比赛从对应池中随机抽 3 个事件，玩家逐个选择+检定，累计成功数决定胜负
 * 文本中 {elementAdj} 由当前灵根替换演出风格
 * v2.0 扩充版：新增 ST_pivot 池，各池扩充至 5-7 事件，文本全面润色
 */
window.MATCH_POOLS = {

  // 中锋·冲击型
  ST_impact: {
    desc: "反越位、单刀、暴力抽射",
    events: [
      {
        text: "中场一记过顶长传。你启动的瞬间，大腿肌肉像被电流贯穿，草腥味灌进鼻腔。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "全速反越位，单刀赴会", check: { attrs: ["speed", "burst"], difficulty: 40, tag: "速度+爆发" },
            success: { text: "你{elementAdj}地甩开防线。单刀。门将出击，你推射远角。球进了。你甚至没来得及举手庆祝。", effects: { reputation: 10, goals: 1, attrs: { speed: 1 } } },
            fail: { text: "边裁举旗。越位。你弯着腰喘气，汗水滴在草皮上，鞋钉陷进泥里。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】反越位成功。你像一枚被弹射出去的钉子，单刀破门。看台上有人站起来喊了声好。", effects: { reputation: 18, goals: 1, attrs: { speed: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "不停球，直接凌空抽射", check: { attrs: ["shooting", "power"], difficulty: 45, tag: "射门+力量" },
            success: { text: "脚背吃准了部位。那种沉实的触感从鞋面传到脚踝——球带着灼热的弧线，直挂死角。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "凌空没吃准。脚背抽疼，球飞向看台第三排。你低头看了眼球鞋，鞋带松了。", effects: { stamina: -3 } },
            critical: { text: "【灵光一闪】世界波。球带着{elementAdj}的尾迹砸进网窝，网绳还在颤。场边教练把战术板摔了。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "背身拿球，吸引防守后分边", check: { attrs: ["passing", "iq"], difficulty: 34, tag: "传球+球商" },
            success: { text: "你背身护住球，后背感受到后卫的体重压上来。突然分向弱侧——队友得球，起脚，命中。", effects: { reputation: 7, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "分边的传球被预判了。对方后卫伸脚一挡，球弹出去老远。你肩膀还酸着。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "不急，先护住球，观察防线空当", check: { attrs: ["dribble", "positioning"], difficulty: 32, tag: "盘带+站位" },
            success: { text: "你稳住节奏，用身体把后卫挡在身后。防线露出破绽的那一秒，队友心领神会，插上造险。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "你犹豫了一瞬。就一瞬。皮球被后卫从脚下捅走，你踩了个空，膝盖磕在草皮上。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "先高位逼抢，掐断对手出球线路", check: { attrs: ["intercept", "speed"], difficulty: 30, tag: "拦截+速度" },
            success: { text: "你的逼抢让对手慌了。传球失误，球权回归。肺部在灼烧，但值得。", effects: { reputation: 5, attrs: { intercept: 1 } } },
            fail: { text: "逼抢扑空。对方顺势推进，你只能看着他们的背影，大腿发酸。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "角球开出。前点一片混战，肘部、肩膀、后脑勺。你和对方中卫同时起跳。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "attack", text: "前点抢点，脚尖一捅", check: { attrs: ["positioning", "resolve"], difficulty: 38, tag: "站位+决断" },
            success: { text: "你鬼魅般出现在前点。脚尖一捅，皮球滚入远角。门将扑了个空，手掌拍在草皮上。", effects: { reputation: 10, goals: 1, attrs: { positioning: 1 } } },
            fail: { text: "慢了半拍。皮球被后卫大脚解围，你落地时脚踝崴了一下。", effects: { stamina: -3 } },
            critical: { text: "【灵光一闪】门前嗅觉。你像闻着血腥味的东西，出现在最该出现的位置。球进了。", effects: { reputation: 16, goals: 1, attrs: { positioning: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "旱地拔葱，暴力头槌", check: { attrs: ["heading", "balance"], difficulty: 42, tag: "头球+平衡" },
            success: { text: "你拔地而起。额头撞上皮球的闷响，像拳头砸在沙袋上。球砸入网窝。", effects: { reputation: 12, goals: 1, attrs: { heading: 1 } } },
            fail: { text: "起跳早了。皮球擦着发顶飞过去，你落地时膝盖一阵钝痛。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】泰山压顶。门将目送皮球入网，连手都没伸。第三排那个戴鸭舌帽的老头把矿泉水瓶捏扁了。", effects: { reputation: 18, goals: 1, attrs: { heading: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "头球摆渡给后点队友", check: { attrs: ["heading", "vision"], difficulty: 35, tag: "头球+视野" },
            success: { text: "你头球摆渡。力量刚好，弧度刚好。后点队友轻松推射得手，朝你跑了过来。", effects: { reputation: 8, assists: 1, attrs: { heading: 1 } } },
            fail: { text: "摆渡力量大了些。队友伸脚没够到，球滚出底线。你揉了揉后颈。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "卡住身位，为队友做嫁衣", check: { attrs: ["strength", "positioning"], difficulty: 32, tag: "对抗+站位" },
            success: { text: "你像钉子一样卡住两名后卫。肩膀顶着肩膀，肋骨隐隐发疼。队友无人盯防，头球破门。", effects: { reputation: 6, attrs: { strength: 1 } } },
            fail: { text: "你被对方挤开了位置。后背撞在广告牌上，铁皮的凉意透过球衣。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "回撤，防备对方快反", check: { attrs: ["speed", "intercept"], difficulty: 30, tag: "速度+拦截" },
            success: { text: "角球被解围后对方果然快反。你提前回追，将球截下。肺部像着了火，但球权是你的。", effects: { reputation: 6, attrs: { speed: 1 } } },
            fail: { text: "回追慢了一步。对方反击造成险情，你只能弯腰撑着膝盖喘气。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "比赛进入尾声。你方落后一球。最后一次进攻机会，你在禁区前沿得球。汗水模糊了视线。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "拔脚怒射，搏一个", check: { attrs: ["shooting", "burst"], difficulty: 42, tag: "射门+爆发" },
            success: { text: "皮球带着{elementAdj}的劲道轰入球网。绝平。你跪在草皮上，草腥味灌满鼻腔。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "射门被后卫用身体封堵。闷响。终场哨响。你躺在草皮上，盯着天。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】读秒绝杀。球进了。场边有人把外套扔上了天。你甚至没跑，只是站在原地，腿在抖。", effects: { reputation: 22, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "balanced", text: "横传给位置更好的队友", check: { attrs: ["vision", "iq"], difficulty: 35, tag: "视野+球商" },
            success: { text: "你送出一记{elementAdj}的横传。队友推射空门得手。绝平。他朝你冲过来，你差点被撞倒。", effects: { reputation: 8, assists: 1, attrs: { vision: 1 } } },
            fail: { text: "横传被回追的后卫破坏。球弹出去的时候，你听见了终场哨。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "attack", text: "带球突入禁区，吸引防守后起脚", check: { attrs: ["dribble", "resolve"], difficulty: 44, tag: "盘带+决断" },
            success: { text: "你连过两人。禁区内起脚。球进了。绝平。你的大腿在抽搐，但你笑了。", effects: { reputation: 13, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "带球被围抢断下。三个人。你被挤在中间，肩膀撞得生疼。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】单骑闯关。你撕碎了整条防线，像一把刀切过黄油。球进了。安静了一秒，然后所有人都站起来了。", effects: { reputation: 20, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "D", sit: "balanced", text: "回敲重新组织，再找机会", check: { attrs: ["passing", "positioning"], difficulty: 30, tag: "传球+站位" },
            success: { text: "你冷静回敲。队友转移，找到防线缺口，传中造险。还有机会。", effects: { reputation: 5, attrs: { passing: 1 } } },
            fail: { text: "回敲被拦截。时间又少了几秒。你咬了咬牙。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "先回防防止再丢球，保住翻盘火种", check: { attrs: ["tackle", "positioning"], difficulty: 28, tag: "铲断+站位" },
            success: { text: "你回追完成关键封堵。球弹出去的时候，你滑倒在草皮上，手掌擦破了皮。但火种还在。", effects: { reputation: 5, attrs: { tackle: 1 } } },
            fail: { text: "回防稍慢。对方一脚远射偏出。你弯着腰，手撑在膝盖上，喘了很久。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "对方反击。皮球打穿了整条防线，对方前锋单刀直入。你是距离最近的回追者。风灌进耳朵。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "全速回追，背后滑铲", check: { attrs: ["speed", "tackle"], difficulty: 38, tag: "速度+铲断" },
            success: { text: "你{elementAdj}地拍马赶到。一记干净的滑铲，球捅出底线。草皮擦过小腿，火辣辣的疼。看台上有人喊了声好。", effects: { reputation: 8, attrs: { tackle: 1 } } },
            fail: { text: "回追慢了一步。滑铲落空，你整个人摔在草皮上。对方晃过门将，得分。你趴着没起来。", effects: { stamina: -6 } },
            critical: { text: "【灵光一闪】铁壁回追。你的滑铲把球和人一起留在了底线外。场边教练攥紧了拳头，没说话。", effects: { reputation: 14, attrs: { tackle: 2, speed: 1 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "defense", text: "且战且退，延缓等他失误", check: { attrs: ["positioning", "iq"], difficulty: 34, tag: "站位+球商" },
            success: { text: "你边退边封堵角度。对方犹豫了。回追的后卫赶到，将球解围。你长出一口气。", effects: { reputation: 6, attrs: { positioning: 1 } } },
            fail: { text: "对方前锋太老练。一个变向，你重心丢了。他推射得手。你站在原地，膝盖发软。", effects: { stamina: -5 } }
          },
          { id: "C", sit: "defense", text: "封堵射门角度，逼他走外线", check: { attrs: ["intercept", "balance"], difficulty: 32, tag: "拦截+平衡" },
            success: { text: "你死死卡住近角。对方被迫走外线，射门偏出远门柱。你攥了下拳头。", effects: { reputation: 6, attrs: { intercept: 1 } } },
            fail: { text: "对方一个挑球过顶。你仰头看着球飞过去，脚够不到。", effects: { stamina: -5 } }
          },
          { id: "D", sit: "balanced", text: "断球后直接长传发动反击", check: { attrs: ["passing", "vision"], difficulty: 33, tag: "传球+视野" },
            success: { text: "你断球后不停球，直接长传找前场。队友险些形成单刀。脚背还在发麻。", effects: { reputation: 7, attrs: { passing: 1 } } },
            fail: { text: "断球后长传力量大了。球直接出了边线。你甩了甩脚，脚背抽疼。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "attack", text: "赌一把，强行抢断自己推进", check: { attrs: ["strength", "resolve"], difficulty: 40, tag: "对抗+决断" },
            success: { text: "你{elementAdj}地一个肩撞，把球硬生生抢下。顺势带球推进。对方后卫愣在原地。", effects: { reputation: 8, attrs: { strength: 1 } } },
            fail: { text: "抢断扑空。对方顺势抹过你，肩膀撞在你胸口。你踉跄了两步。", effects: { stamina: -6 } }
          }
        ]
      },
      {
        text: "反击。苏晚的直塞像一把手术刀，切开了整条防线。你高速前插，风把球衣吹得猎猎响。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "不停球，直接推射远角", check: { attrs: ["shooting", "speed"], difficulty: 42, tag: "射门+速度" },
            success: { text: "你{elementAdj}地迎球推射。球贴着草皮滚入远角。门将的手指尖差了两厘米。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "推射太正。门将伸腿挡出。你的脚背还在发麻，鞋钉上沾着泥。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】单刀。你甚至没看门将，推射远角。球进了。苏晚在中场举了下拳头，很轻。", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "晃过门将，推空门", check: { attrs: ["dribble", "resolve"], difficulty: 44, tag: "盘带+决断" },
            success: { text: "你晃过门将。空门。推射。球滚进去的时候，你听见了网绳的声响。", effects: { reputation: 12, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "晃门将的时候球趟大了。你伸脚去够，脚尖蹭到草皮，整个人摔了出去。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】你晃过门将，又晃过了回追的后卫。空门。你站在门线里，把球捡起来。", effects: { reputation: 19, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "横传给跟进的队友", check: { attrs: ["passing", "vision"], difficulty: 34, tag: "传球+视野" },
            success: { text: "你横传。队友跟进推射得手。他跑过来拍你的后脑勺，你躲了一下。", effects: { reputation: 7, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "横传力量小了。对方后卫伸脚一挡。你弯着腰喘气，汗水滴在草皮上。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "降速护球，等队友跟上", check: { attrs: ["dribble", "positioning"], difficulty: 30, tag: "盘带+站位" },
            success: { text: "你护住球，等队友跟上。进攻重新组织。节奏在你脚下。", effects: { reputation: 4, attrs: { positioning: 1 } } },
            fail: { text: "护球时被对方从身后捅掉。你转了个圈，差点摔倒。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "回传稳住，防止被打回头", check: { attrs: ["passing", "iq"], difficulty: 28, tag: "传球+球商" },
            success: { text: "你回传。球队稳住阵脚。不是每次都要冒险。", effects: { reputation: 4, attrs: { passing: 1 } } },
            fail: { text: "回传力量轻了。对方前锋差点 intercept。你后颈发凉。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "禁区内混战。球弹来弹去，打在腿上、胸口上、门柱上。然后，它弹到了你脚下。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "不等了，直接起脚", check: { attrs: ["shooting", "burst"], difficulty: 40, tag: "射门+爆发" },
            success: { text: "你{elementAdj}地起脚。球从人缝里钻过去，进了。你甚至没看清它是怎么进的。", effects: { reputation: 10, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "起脚太急，球打在对方后卫腿上弹回来。你的脚趾在鞋里撞了一下，生疼。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】混战中你一脚抽射，球从三个人腿缝里穿过去，砸在门柱内侧弹进网窝。运气？也许。但你站对了位置。", effects: { reputation: 17, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "拨一下，调整角度再射", check: { attrs: ["dribble", "shooting"], difficulty: 43, tag: "盘带+射门" },
            success: { text: "你拨了一下。就一下。角度出来了。推射。球进了。", effects: { reputation: 11, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "拨球的时候被对方伸脚捅掉。你踩在球上滑了一下，膝盖磕在草皮上。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你拨球晃开角度，推射远角。门将扑对了方向，但球从他指尖下面钻过去了。", effects: { reputation: 18, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "回做给禁区外的队友", check: { attrs: ["passing", "vision"], difficulty: 33, tag: "传球+视野" },
            success: { text: "你回做。禁区外的队友迎球怒射，球进了。他朝你竖了个大拇指。", effects: { reputation: 7, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "回做被对方拦截。混战又开始了，你被挤在人堆里，肋骨发疼。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "护住球，等混乱平息", check: { attrs: ["strength", "balance"], difficulty: 31, tag: "对抗+平衡" },
            success: { text: "你用身体护住球。人散开了，空间出来了。你从容分球，进攻继续。", effects: { reputation: 5, attrs: { strength: 1 } } },
            fail: { text: "护球时被三个人挤倒了。你坐在草皮上，手掌擦破了皮。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "defense", text: "把球踢出禁区，先解围", check: { attrs: ["tackle", "resolve"], difficulty: 28, tag: "铲断+决断" },
            success: { text: "你大脚解围。球飞出去的时候，你松了口气。不是每次都要当英雄。", effects: { reputation: 4, attrs: { tackle: 1 } } },
            fail: { text: "解围踢呲了。球弹到对方脚下，又是一阵混战。你骂了句脏话。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "被对方后卫连续侵犯了三次。第四次，裁判终于吹了哨。任意球。你站在球前，深呼吸。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "attack", text: "自己来，直接攻门", check: { attrs: ["shooting", "power"], difficulty: 44, tag: "射门+力量" },
            success: { text: "你{elementAdj}地起脚。球越过人墙，带着下坠砸入球网。门将扑了，但没够到。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "球打在人墙上。弹回来。你的脚背还在发麻。对方后卫朝你笑了一下。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】任意球直接攻门。球从人墙缝隙里穿过去，贴着门柱内侧入网。门将连反应都没有。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "balanced", text: "传给跑位的队友，打配合", check: { attrs: ["passing", "iq"], difficulty: 36, tag: "传球+球商" },
            success: { text: "你传给跑位的队友。他回做，你迎球怒射。球进了。配合打出来了。", effects: { reputation: 9, goals: 1, attrs: { passing: 1 } } },
            fail: { text: "传球被对方预判。人墙散了，球权也丢了。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "attack", text: "吊入禁区，争顶", check: { attrs: ["passing", "vision"], difficulty: 38, tag: "传球+视野" },
            success: { text: "你吊入禁区。队友争顶成功，头球破门。你攥了下拳头。", effects: { reputation: 8, assists: 1, attrs: { vision: 1 } } },
            fail: { text: "吊球力量大了。球直接飞出底线。你甩了甩脚。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "短传控制，重新组织", check: { attrs: ["passing", "rhythm"], difficulty: 30, tag: "传球+节奏" },
            success: { text: "你短传给队友。球队重新组织，节奏稳下来了。", effects: { reputation: 4, attrs: { rhythm: 1 } } },
            fail: { text: "短传被对方逼抢破坏。你被推了一下，肩膀撞在草皮上。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "回传后卫，先稳住", check: { attrs: ["passing", "positioning"], difficulty: 28, tag: "传球+站位" },
            success: { text: "你回传。球队稳住。不是每个任意球都要冒险。", effects: { reputation: 3, attrs: { passing: 1 } } },
            fail: { text: "回传被对方前锋 intercept。你后颈发凉，赶紧回追。", effects: { stamina: -4 } }
          }
        ]
      }
    ]
  },

  // 中锋·支点型
  ST_pivot: {
    desc: "背身拿球、头球轰炸、做墙配合",
    events: [
      {
        text: "后场一记长传。球在空中划了很远。你背对球门，感受到后卫的胸口贴上来。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "attack", text: "扛住他，把球卸下来", check: { attrs: ["strength", "balance"], difficulty: 36, tag: "对抗+平衡" },
            success: { text: "你{elementAdj}地扛住后卫。球卸在脚下，沉实。你转身，面对球门。", effects: { reputation: 8, attrs: { strength: 1 } } },
            fail: { text: "你被挤开了。球弹出去，后卫大脚解围。你的肋骨还在隐隐发疼。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你扛住后卫，卸球，转身，一气呵成。面对球门的那一刻，你甚至有时间调整呼吸。", effects: { reputation: 14, attrs: { strength: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "balanced", text: "头球回做给中场队友", check: { attrs: ["heading", "passing"], difficulty: 33, tag: "头球+传球" },
            success: { text: "你头球回做。力量刚好，队友迎球推进。进攻重新组织。", effects: { reputation: 6, attrs: { heading: 1 } } },
            fail: { text: "头球回做力量大了。球弹出去老远，队友没接到。你揉了揉后颈。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "attack", text: "背身直接转身射门", check: { attrs: ["shooting", "burst"], difficulty: 42, tag: "射门+爆发" },
            success: { text: "你背身直接转身。射门。球进了。后卫愣在原地。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "转身的时候被后卫拉了一下。射门偏出。你朝裁判看了一眼，裁判没吹。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】背身转身射门。球带着{elementAdj}的弧线砸入死角。你甚至没看球，转身的时候就知道进了。", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "D", sit: "balanced", text: "护住球，等队友插上", check: { attrs: ["strength", "positioning"], difficulty: 30, tag: "对抗+站位" },
            success: { text: "你护住球。后背感受到后卫的体重。队友插上，你分球。进攻继续。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "护球时被后卫从身后捅掉。你踉跄了一步，膝盖磕在草皮上。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "回传后卫，重新组织", check: { attrs: ["passing", "iq"], difficulty: 28, tag: "传球+球商" },
            success: { text: "你回传。球队重新组织。不是每次长传都要冒险。", effects: { reputation: 4, attrs: { passing: 1 } } },
            fail: { text: "回传被对方 intercept。你后颈发凉，赶紧回追。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "角球。你站在禁区里，身边是两个后卫。他们的手搭在你肩膀上，你的肩膀搭在他们胸口上。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "前点抢点，头球攻门", check: { attrs: ["heading", "positioning"], difficulty: 40, tag: "头球+站位" },
            success: { text: "你{elementAdj}地抢前点。额头撞上皮球，闷响。球砸入网窝。", effects: { reputation: 10, goals: 1, attrs: { heading: 1 } } },
            fail: { text: "前点被后卫卡住了。你跳起来的时候肩膀撞在他后脑勺上。球飞过去了。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】前点抢点。你的头槌像一记重锤。球砸在草皮上弹入网窝。门将连手都没伸。", effects: { reputation: 17, goals: 1, attrs: { heading: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "后点包抄，等球落下来", check: { attrs: ["positioning", "resolve"], difficulty: 38, tag: "站位+决断" },
            success: { text: "你绕到后点。球落下来。你迎球推射。球进了。", effects: { reputation: 9, goals: 1, attrs: { positioning: 1 } } },
            fail: { text: "后点被后卫挡住了。球弹到你膝盖上，弹出去了。", effects: { stamina: -3 } },
            critical: { text: "【灵光一闪】后点包抄。球落下来的时候，你甚至有时间调整步伐。推射。球进了。安静了一秒。", effects: { reputation: 16, goals: 1, attrs: { positioning: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "头球摆渡给队友", check: { attrs: ["heading", "vision"], difficulty: 34, tag: "头球+视野" },
            success: { text: "你头球摆渡。队友迎球推射。球进了。他朝你跑过来。", effects: { reputation: 7, assists: 1, attrs: { heading: 1 } } },
            fail: { text: "摆渡力量大了。球飞出底线。你揉了揉太阳穴。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "卡住后卫，给队友做墙", check: { attrs: ["strength", "positioning"], difficulty: 31, tag: "对抗+站位" },
            success: { text: "你卡住两个后卫。肩膀顶着肩膀。队友无人盯防，头球破门。", effects: { reputation: 6, attrs: { strength: 1 } } },
            fail: { text: "你被挤开了。后背撞在门柱上，铁皮的凉意透过球衣。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "回撤，防备对方快反", check: { attrs: ["speed", "intercept"], difficulty: 29, tag: "速度+拦截" },
            success: { text: "角球被解围后对方快反。你提前回追，将球截下。肺部在灼烧。", effects: { reputation: 5, attrs: { speed: 1 } } },
            fail: { text: "回追慢了一步。对方反击造险。你弯着腰喘气。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "禁区前沿。你背身拿球，后卫贴着你。队友在你身后五米，等着你的回做。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "balanced", text: "回做，二过一", check: { attrs: ["passing", "iq"], difficulty: 34, tag: "传球+球商" },
            success: { text: "你{elementAdj}地回做。队友一脚出球，你转身。二过一。面对球门。", effects: { reputation: 8, attrs: { passing: 1 } } },
            fail: { text: "回做力量小了。队友没接到，球被后卫捅走。你肩膀还酸着。", effects: { stamina: -3 } }
          },
          { id: "B", sit: "attack", text: "不回做了，自己转身射门", check: { attrs: ["shooting", "burst"], difficulty: 43, tag: "射门+爆发" },
            success: { text: "你转身。射门。球进了。后卫愣在原地。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "转身的时候被后卫拉了一下。射门偏出。你朝裁判看了一眼。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你转身射门。球带着{elementAdj}的弧线砸入死角。你甚至没看球。", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "分边给插上的边锋", check: { attrs: ["passing", "vision"], difficulty: 35, tag: "传球+视野" },
            success: { text: "你分边。边锋插上，传中。禁区内一片混乱。", effects: { reputation: 6, attrs: { vision: 1 } } },
            fail: { text: "分边被对方预判。球弹出去，你被后卫撞了一下。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "护住球，等队友跑位", check: { attrs: ["strength", "positioning"], difficulty: 30, tag: "对抗+站位" },
            success: { text: "你护住球。后背感受到后卫的体重。队友跑位，你分球。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "护球时被后卫从身后捅掉。你踉跄了一步。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "回传中场，重新组织", check: { attrs: ["passing", "iq"], difficulty: 28, tag: "传球+球商" },
            success: { text: "你回传。球队重新组织。节奏稳下来了。", effects: { reputation: 4, attrs: { passing: 1 } } },
            fail: { text: "回传被对方 intercept。你后颈发凉。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "对方后卫贴身肉搏。肘部、膝盖、肩膀。第四次，他把你拉倒了。裁判吹了哨。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "任意球，自己来", check: { attrs: ["shooting", "power"], difficulty: 42, tag: "射门+力量" },
            success: { text: "你{elementAdj}地起脚。球越过人墙，砸入球网。门将扑了，没够到。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "球打在人墙上。弹回来。你的脚背还在发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】任意球直接攻门。球从人墙缝隙里穿过去，贴着门柱入网。", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "balanced", text: "任意球吊入禁区，争顶", check: { attrs: ["passing", "heading"], difficulty: 36, tag: "传球+头球" },
            success: { text: "你吊入禁区。队友争顶，头球破门。你攥了下拳头。", effects: { reputation: 8, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "吊球力量大了。球飞出底线。你甩了甩脚。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "attack", text: "快速发出，趁对方没站稳", check: { attrs: ["iq", "burst"], difficulty: 40, tag: "球商+爆发" },
            success: { text: "你快速发出。对方人墙还没站稳。你带球突入禁区，射门。球进了。", effects: { reputation: 10, goals: 1, attrs: { iq: 1 } } },
            fail: { text: "快速发出被对方回追破坏。你弯着腰喘气。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你快速发出，趁对方愣神，带球突入禁区。射门。球进了。对方后卫还在摆人墙。", effects: { reputation: 17, goals: 1, attrs: { iq: 2 }, flags: { keySuccess: true } } }
          },
          { id: "D", sit: "balanced", text: "短传配合，重新组织", check: { attrs: ["passing", "rhythm"], difficulty: 30, tag: "传球+节奏" },
            success: { text: "你短传。球队重新组织。节奏稳下来了。", effects: { reputation: 4, attrs: { rhythm: 1 } } },
            fail: { text: "短传被对方逼抢破坏。你被推了一下。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "回传后卫，先稳住", check: { attrs: ["passing", "positioning"], difficulty: 28, tag: "传球+站位" },
            success: { text: "你回传。球队稳住。不是每个任意球都要冒险。", effects: { reputation: 3, attrs: { passing: 1 } } },
            fail: { text: "回传被对方前锋 intercept。你后颈发凉。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "对方反击。长传。你回撤到中场，和对方前锋争顶。风灌进耳朵，草腥味很浓。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "争顶解围", check: { attrs: ["heading", "strength"], difficulty: 36, tag: "头球+对抗" },
            success: { text: "你{elementAdj}地争顶。头球解围。球飞出去的时候，你松了口气。", effects: { reputation: 7, attrs: { heading: 1 } } },
            fail: { text: "争顶输了。对方前锋头球摆渡，队友跟进。你落地时膝盖一阵钝痛。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】你争顶成功，头球解围。球飞出去的时候，你甚至有时间调整落地姿势。", effects: { reputation: 12, attrs: { heading: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "defense", text: "卡住身位，让他拿不到球", check: { attrs: ["positioning", "strength"], difficulty: 33, tag: "站位+对抗" },
            success: { text: "你卡住身位。对方前锋拿不到球，只能回传。你长出一口气。", effects: { reputation: 6, attrs: { positioning: 1 } } },
            fail: { text: "你被挤开了。对方前锋拿到球，转身。你肩膀撞在草皮上。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "defense", text: "不跳了，等他落地再抢", check: { attrs: ["tackle", "iq"], difficulty: 32, tag: "铲断+球商" },
            success: { text: "你等他落地。他落地的瞬间，你伸脚。球断了。", effects: { reputation: 6, attrs: { tackle: 1 } } },
            fail: { text: "他落地的时候把球拨开了。你伸了个空。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "balanced", text: "解围后直接长传反击", check: { attrs: ["passing", "vision"], difficulty: 34, tag: "传球+视野" },
            success: { text: "你解围后直接长传。前场队友拿到球，反击。", effects: { reputation: 6, attrs: { passing: 1 } } },
            fail: { text: "长传力量大了。球出了边线。你甩了甩脚。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "attack", text: "争顶后自己带球推进", check: { attrs: ["heading", "burst"], difficulty: 40, tag: "头球+爆发" },
            success: { text: "你争顶成功，球落在脚下。你带球推进。对方后卫愣在原地。", effects: { reputation: 8, attrs: { burst: 1 } } },
            fail: { text: "争顶后球弹远了。你追了两步，没追上。大腿发酸。", effects: { stamina: -5 } }
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
        text: "边路一打一。你拿球面对对方边后卫。他压低重心，眼睛盯着你的脚。草皮上还有露水。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "attack", text: "人球分过，硬吃他", check: { attrs: ["dribble", "speed"], difficulty: 40, tag: "盘带+速度" },
            success: { text: "你{elementAdj}地一趟一加速。他转身的时候你已经过去了。杀入禁区。", effects: { reputation: 10, attrs: { dribble: 1 } } },
            fail: { text: "趟大了。球出了底线。你刹不住脚，滑了两步。鞋钉上沾着泥。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】变向过人。你的重心像水一样流过去。杀入禁区。场边有人站起来。", effects: { reputation: 16, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "balanced", text: "下底传中找中锋", check: { attrs: ["passing", "vision"], difficulty: 36, tag: "传球+视野" },
            success: { text: "你起脚传中。皮球{elementAdj}地绕过门将。中锋头球破门。", effects: { reputation: 8, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "传中被前点解围。你的脚背还在发麻。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "attack", text: "内切一步，直接起脚远射", check: { attrs: ["shooting", "burst"], difficulty: 42, tag: "射门+爆发" },
            success: { text: "你内切。拔脚。球带着弧线挂入远角。门将的手指尖差了三厘米。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "内切射门被后卫封堵。球弹在你腿上，弹出去了。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】招牌内切远射。球带着{elementAdj}的弧线，像一把弯刀。进了。你甚至没举手。", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "D", sit: "balanced", text: "回敲队友，转移进攻方向", check: { attrs: ["passing", "positioning"], difficulty: 30, tag: "传球+站位" },
            success: { text: "你回敲后迅速前插。队友转移弱侧，配合打出来了。", effects: { reputation: 5, attrs: { passing: 1 } } },
            fail: { text: "回敲力量小了。险些被断。你后颈发凉。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "先回追，防止对方边路突击", check: { attrs: ["tackle", "stamina"], difficulty: 28, tag: "铲断+耐力" },
            success: { text: "你回追及时。一记干净铲断。草皮擦过小腿，火辣辣的。", effects: { reputation: 5, attrs: { tackle: 1 } } },
            fail: { text: "回追中体力不支。大腿像灌了铅。对方突破。", effects: { stamina: -5 } }
          }
        ]
      },
      {
        text: "反击机会。你沿边路长途奔袭。风灌进耳朵，肺部在灼烧。对方两名后卫回追包夹。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "一鼓作气杀入禁区", check: { attrs: ["speed", "stamina"], difficulty: 42, tag: "速度+耐力" },
            success: { text: "你{elementAdj}地摆脱包夹。小角度推射得手。你的大腿在抽搐。", effects: { reputation: 12, goals: 1, attrs: { speed: 1 } } },
            fail: { text: "体力不支。被回追后卫破坏。你弯着腰，手撑在膝盖上。", effects: { stamina: -6 } },
            critical: { text: "【灵光一闪】千里走单骑。你像一阵风掠过原野。球进了。你跪在草皮上，草腥味灌满鼻腔。", effects: { reputation: 20, goals: 1, attrs: { speed: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "内切后起脚兜远角", check: { attrs: ["shooting", "resolve"], difficulty: 43, tag: "射门+决断" },
            success: { text: "你内切。兜出一记弧线。球挂入远角。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "兜射偏出立柱。你的脚背抽疼。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】奔袭内切一条龙。球进了。你站在禁区里，腿在抖。", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "下底传中找包抄队友", check: { attrs: ["passing", "vision"], difficulty: 36, tag: "传球+视野" },
            success: { text: "你吸引包夹后低平球扫到门前。队友包抄破门。", effects: { reputation: 8, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "传中被回追的后卫挡出。你的脚踝崴了一下。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "balanced", text: "降速护球，等队友接应", check: { attrs: ["dribble", "positioning"], difficulty: 31, tag: "盘带+站位" },
            success: { text: "你护住球权。队友跟进接应。进攻重新组织。", effects: { reputation: 4, attrs: { dribble: 1 } } },
            fail: { text: "护球中被对方捅掉。你转了个圈。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "回传中场，防止反击被打回头", check: { attrs: ["passing", "iq"], difficulty: 28, tag: "传球+球商" },
            success: { text: "你冷静回传。球队稳住阵脚。", effects: { reputation: 4, attrs: { passing: 1 } } },
            fail: { text: "回传力量轻了。险些被断。你后颈发凉。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "禁区前沿。你内切后获得起脚空间。后卫的重心还在外线。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "内切后起脚兜远角", check: { attrs: ["shooting", "resolve"], difficulty: 40, tag: "射门+决断" },
            success: { text: "皮球带着{elementAdj}的弧线挂入远角。门将扑了，没够到。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "兜射偏出立柱。你的脚背抽疼。", effects: { stamina: -3 } },
            critical: { text: "【灵光一闪】招牌内切远射。球带着{elementAdj}的弧线，像一把弯刀出鞘。进了。", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "继续突破，杀入禁区", check: { attrs: ["dribble", "burst"], difficulty: 43, tag: "盘带+爆发" },
            success: { text: "你内切后再加速。抹过补防的后卫，推射入网。", effects: { reputation: 12, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "突破被补防的后卫拦截。你肩膀撞在他胸口上。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】连过三人。你像一把刀切过黄油。球进了。安静了一秒。", effects: { reputation: 19, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "直塞给插上的队友", check: { attrs: ["passing", "vision"], difficulty: 35, tag: "传球+视野" },
            success: { text: "你吸引防守后直塞。队友插上单刀破门。", effects: { reputation: 8, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "直塞被中卫拦截。球弹出去老远。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "横传控制节奏", check: { attrs: ["vision", "positioning"], difficulty: 30, tag: "视野+站位" },
            success: { text: "你横传转移。球队重新调度。防线被扯动。", effects: { reputation: 4, attrs: { vision: 1 } } },
            fail: { text: "横传被对方预判。你甩了甩脚。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "回撤参与防守", check: { attrs: ["tackle", "positioning"], difficulty: 28, tag: "铲断+站位" },
            success: { text: "你积极回撤。协助边后卫完成一次关键防守。肺部在灼烧。", effects: { reputation: 5, attrs: { tackle: 1 } } },
            fail: { text: "回撤稍慢。防守到位时球已转移。你弯着腰喘气。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "对方边锋在你这一侧肆虐。本队边后卫助攻未归。你必须回防补位。汗水模糊了视线。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "回追贴防，不让他起脚传中", check: { attrs: ["speed", "stamina"], difficulty: 36, tag: "速度+耐力" },
            success: { text: "你{elementAdj}地回追到位。用身体卡住传中线路。对方只能无奈回传。", effects: { reputation: 7, attrs: { speed: 1 } } },
            fail: { text: "体力不支。大腿像灌了铅。对方强行起脚传中。", effects: { stamina: -6 } },
            critical: { text: "【灵光一闪】追防到底。你的回追像一堵墙。对方边锋看了你一眼，回传了。", effects: { reputation: 12, attrs: { speed: 1, tackle: 1 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "defense", text: "预判内切线路，提前出脚", check: { attrs: ["intercept", "iq"], difficulty: 35, tag: "拦截+球商" },
            success: { text: "你精准预判到他的内切意图。提前出脚，球捅掉了。", effects: { reputation: 6, attrs: { intercept: 1 } } },
            fail: { text: "判断失误。对方走外线突破成功。你站在原地。", effects: { stamina: -5 } }
          },
          { id: "C", sit: "defense", text: "退守禁区，协助盯防后点", check: { attrs: ["positioning", "balance"], difficulty: 30, tag: "站位+平衡" },
            success: { text: "你及时退入禁区。抢在对方包抄球员之前，头球顶出。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "头球解围慢了一拍。对方获得射门机会。你后颈发凉。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "balanced", text: "战术犯规，掐断这波攻势", check: { attrs: ["strength", "resolve"], difficulty: 30, tag: "对抗+决断" },
            success: { text: "一次合理的战术犯规。对方攻势胎死腹中。裁判没掏牌。", effects: { reputation: 4, attrs: { strength: 1 } } },
            fail: { text: "犯规动作大了。黄牌。你低头看了眼裁判手里的牌。", effects: { stamina: -3, reputation: -2 } }
          },
          { id: "E", sit: "attack", text: "断球后直接边路反击", check: { attrs: ["tackle", "burst"], difficulty: 40, tag: "铲断+爆发" },
            success: { text: "你{elementAdj}地断球后直接转身狂奔。打对方一个立足未稳。", effects: { reputation: 8, attrs: { tackle: 1 } } },
            fail: { text: "抢断失误。反被对方打了个反击。你踉跄了两步。", effects: { stamina: -6 } }
          }
        ]
      },
      {
        text: "角球。你来主罚。球摆在角球弧里，草皮上还有露水。禁区内一片人。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "balanced", text: "传中找中锋，弧线球", check: { attrs: ["passing", "vision"], difficulty: 36, tag: "传球+视野" },
            success: { text: "你{elementAdj}地起脚。球划过一道弧线，绕过门将。中锋头球破门。", effects: { reputation: 8, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "传中被前点解围。你的脚背还在发麻。", effects: { stamina: -3 } }
          },
          { id: "B", sit: "attack", text: "直接旋向球门", check: { attrs: ["shooting", "power"], difficulty: 42, tag: "射门+力量" },
            success: { text: "你直接旋向球门。球带着弧线砸入远角。门将扑了，没够到。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "球旋出了底线。你甩了甩脚。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】角球直接攻门。球带着{elementAdj}的弧线，从门将指尖上面旋进去。进了。", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "短传配合，打战术角球", check: { attrs: ["passing", "iq"], difficulty: 33, tag: "传球+球商" },
            success: { text: "你短传给队友。战术角球打出来了，传中造险。", effects: { reputation: 6, attrs: { iq: 1 } } },
            fail: { text: "短传被对方预判。球权丢了。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "传后点，找高个队友", check: { attrs: ["passing", "vision"], difficulty: 34, tag: "传球+视野" },
            success: { text: "你传后点。高个队友争顶成功，头球摆渡，队友推射。", effects: { reputation: 7, assists: 1, attrs: { vision: 1 } } },
            fail: { text: "传后点力量大了。球飞出底线。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "回传重新组织，不冒险", check: { attrs: ["passing", "positioning"], difficulty: 28, tag: "传球+站位" },
            success: { text: "你回传。球队重新组织。不是每次角球都要冒险。", effects: { reputation: 3, attrs: { passing: 1 } } },
            fail: { text: "回传被对方 intercept。你后颈发凉。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "边路二过一。你传给队友，前插。他一脚出球。你拿球的时候，底线就在眼前。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "下底传中，低平球扫门前", check: { attrs: ["passing", "vision"], difficulty: 38, tag: "传球+视野" },
            success: { text: "你{elementAdj}地低平球扫门前。队友包抄推射。球进了。", effects: { reputation: 9, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "传中被后卫挡出。你的脚踝崴了一下。", effects: { stamina: -4 } }
          },
          { id: "B", sit: "attack", text: "内切射门", check: { attrs: ["shooting", "burst"], difficulty: 43, tag: "射门+爆发" },
            success: { text: "你内切。射门。球进了。门将的手指尖差了两厘米。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "内切射门被后卫封堵。球弹在你腿上。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】二过一后内切射门。球带着{elementAdj}的弧线，砸入死角。你甚至没看球。", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "倒三角回传给禁区外队友", check: { attrs: ["passing", "iq"], difficulty: 35, tag: "传球+球商" },
            success: { text: "你倒三角回传。禁区外队友迎球怒射。球进了。", effects: { reputation: 8, assists: 1, attrs: { iq: 1 } } },
            fail: { text: "倒三角回传被拦截。你肩膀撞在草皮上。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "护住球，等队友跑位", check: { attrs: ["dribble", "positioning"], difficulty: 30, tag: "盘带+站位" },
            success: { text: "你护住球。队友跑位，你分球。进攻继续。", effects: { reputation: 4, attrs: { positioning: 1 } } },
            fail: { text: "护球时被后卫捅掉。你转了个圈。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "回传稳住，防止被打反击", check: { attrs: ["passing", "iq"], difficulty: 28, tag: "传球+球商" },
            success: { text: "你回传。球队稳住。不是每次下底都要冒险。", effects: { reputation: 3, attrs: { passing: 1 } } },
            fail: { text: "回传力量轻了。险些被断。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "比赛末段。你的大腿像灌了铅，肺部在灼烧。最后一次突破机会。边路一打一。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "咬牙突破，杀入禁区", check: { attrs: ["dribble", "stamina"], difficulty: 44, tag: "盘带+耐力" },
            success: { text: "你{elementAdj}地突破。大腿在抽搐，但你过去了。杀入禁区。", effects: { reputation: 11, attrs: { dribble: 1 } } },
            fail: { text: "体力透支。趟大了。你弯着腰，手撑在膝盖上。", effects: { stamina: -6 } },
            critical: { text: "【灵光一闪】你榨干最后一丝力气。突破。杀入禁区。射门。球进了。你跪在草皮上，草腥味灌满鼻腔。", effects: { reputation: 19, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "内切射门，最后一脚", check: { attrs: ["shooting", "resolve"], difficulty: 43, tag: "射门+决断" },
            success: { text: "你内切。射门。球进了。你的腿在抖。", effects: { reputation: 11, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "射门偏出。你的脚背抽疼。终场哨快响了。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】最后一脚。球带着{elementAdj}的弧线，砸入死角。你甚至没力气庆祝。", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "传中，让队友来", check: { attrs: ["passing", "vision"], difficulty: 35, tag: "传球+视野" },
            success: { text: "你传中。队友头球破门。你弯着腰喘气，他朝你跑过来。", effects: { reputation: 8, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "传中被解围。你的脚踝崴了一下。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "balanced", text: "护住球，消耗时间", check: { attrs: ["dribble", "rhythm"], difficulty: 30, tag: "盘带+节奏" },
            success: { text: "你护住球。时间一秒一秒过去。够了。", effects: { reputation: 4, attrs: { rhythm: 1 } } },
            fail: { text: "护球时被对方抢下。你踉跄了一步。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "defense", text: "回传，先稳住", check: { attrs: ["passing", "positioning"], difficulty: 28, tag: "传球+站位" },
            success: { text: "你回传。球队稳住。不是每次都要冒险。", effects: { reputation: 3, attrs: { passing: 1 } } },
            fail: { text: "回传被 intercept。你后颈发凉。", effects: { stamina: -4 } }
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
        text: "你在禁区前沿拿球。背身有后腰贴防，他的呼吸喷在你后颈上。余光里，你看见了空当。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "attack", text: "一脚直塞撕开防线", check: { attrs: ["passing", "vision"], difficulty: 42, tag: "传球+视野" },
            success: { text: "皮球像一尾游鱼{elementAdj}地穿过三名后卫缝隙。前锋单刀破门。你甚至没转头看。", effects: { reputation: 10, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "直塞力量小了。被断。你的脚背还在发麻。", effects: { stamina: -3 } },
            critical: { text: "【灵光一闪】手术刀直塞。球从人缝里穿过去，像水银泻地。前锋推射。进了。场边教练没说话，只是点了下头。", effects: { reputation: 16, assists: 1, attrs: { passing: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "balanced", text: "控制节奏，横传转移弱侧", check: { attrs: ["vision", "rhythm"], difficulty: 35, tag: "视野+节奏" },
            success: { text: "你{elementAdj}地一记斜长传转移。弱侧空档被利用，队友传中造点。", effects: { reputation: 7, assists: 1, attrs: { vision: 1 } } },
            fail: { text: "转移被预判。断球。你甩了甩脚。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "attack", text: "转身直接起脚远射", check: { attrs: ["shooting", "power"], difficulty: 44, tag: "射门+力量" },
            success: { text: "你转身摆脱贴防。拔脚。球轰入球门。后腰愣在原地。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "转身射门被后卫封堵。球弹在你腿上。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】十号位的暴力美学。你转身，拔脚，球带着{elementAdj}的弧线砸入死角。安静了一秒。", effects: { reputation: 19, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "D", sit: "balanced", text: "带球推进，吸引防守再分球", check: { attrs: ["dribble", "resolve"], difficulty: 37, tag: "盘带+决断" },
            success: { text: "你带球推进吸引两人包夹。分球。队友获得空位。", effects: { reputation: 6, attrs: { dribble: 1 } } },
            fail: { text: "带球被后腰从身后捅掉。你踉跄了一步。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "defense", text: "回传稳住，先化解对方逼抢", check: { attrs: ["passing", "positioning"], difficulty: 28, tag: "传球+站位" },
            success: { text: "你冷静回传化解逼抢。球队重新掌控节奏。", effects: { reputation: 4, attrs: { passing: 1 } } },
            fail: { text: "回传险些被对方前锋拦截。你后颈发凉。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "反击三打三。你中路持球推进，两翼齐飞。风灌进耳朵，草皮在脚下飞速后退。",
        sit: "attack",
        choices: [
          { id: "A", sit: "balanced", text: "分边给高速插上的边锋", check: { attrs: ["passing", "iq"], difficulty: 38, tag: "传球+球商" },
            success: { text: "你一脚{elementAdj}的分边。边锋推射破门。他朝你跑了过来。", effects: { reputation: 9, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "分边时机晚了。越位。边裁举旗。", effects: { stamina: -2 } }
          },
          { id: "B", sit: "attack", text: "自己来，禁区前沿起脚", check: { attrs: ["shooting", "resolve"], difficulty: 44, tag: "射门+决断" },
            success: { text: "你突然起脚。皮球贴地钻入死角。门将扑了，没够到。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "射门被门将扑出。你的脚背抽疼。", effects: { stamina: -3 } },
            critical: { text: "【灵光一闪】后插上远射。球带着{elementAdj}的弧线，砸入死角。这是十号位的杀招。", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "attack", text: "直塞找前锋，打穿中路", check: { attrs: ["passing", "vision"], difficulty: 41, tag: "传球+视野" },
            success: { text: "你直塞打穿中路。前锋单刀推射得手。", effects: { reputation: 10, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "直塞被中卫伸腿挡出。球弹出去老远。", effects: { stamina: -3 } },
            critical: { text: "【灵光一闪】撕裂防线的一传。球从两个人腿缝里穿过去。前锋推射。进了。", effects: { reputation: 16, assists: 1, attrs: { passing: 2 }, flags: { keySuccess: true } } }
          },
          { id: "D", sit: "balanced", text: "降速控球，等对方防线落位再打", check: { attrs: ["dribble", "positioning"], difficulty: 32, tag: "盘带+站位" },
            success: { text: "你护住球权。反击转为阵地战。球队稳住攻势。", effects: { reputation: 4, attrs: { dribble: 1 } } },
            fail: { text: "降速后被对方回追破坏。你肩膀撞在草皮上。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "回传后卫，防止反击被打回头", check: { attrs: ["passing", "iq"], difficulty: 28, tag: "传球+球商" },
            success: { text: "你回传稳住节奏。避免了一次危险的球权丢失。", effects: { reputation: 4, attrs: { passing: 1 } } },
            fail: { text: "回传力量轻了。险些被断。你后颈发凉。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "比赛胶着。球权在你脚下。汗水滴在草皮上。是该稳一稳，还是冒险一击……",
        sit: "balanced",
        choices: [
          { id: "A", sit: "attack", text: "致命一传，赌这把", check: { attrs: ["vision", "resolve"], difficulty: 45, tag: "视野+决断" },
            success: { text: "你看见了一道常人看不见的线。一脚{elementAdj}的过顶。前锋凌空垫射入网。", effects: { reputation: 14, assists: 1, attrs: { vision: 1 }, flags: { keySuccess: true } } },
            fail: { text: "传球意图太明显。被门将出击没收。你甩了甩脚。", effects: { stamina: -3 } }
          },
          { id: "B", sit: "balanced", text: "稳住，回敲重新组织", effects: { attrs: { rhythm: 1 }, stamina: 2 } },
          { id: "C", sit: "attack", text: "禁区前沿直接起脚", check: { attrs: ["shooting", "power"], difficulty: 43, tag: "射门+力量" },
            success: { text: "你出其不意的远射。皮球应声入网。你甚至没举手。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "远射高出横梁。你的脚背抽疼。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】石破天惊的远射。球带着{elementAdj}的弧线，砸入死角。安静了一秒。然后所有人都站起来了。", effects: { reputation: 19, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "D", sit: "balanced", text: "传给队友后前插，寻求二过一", check: { attrs: ["passing", "positioning"], difficulty: 34, tag: "传球+站位" },
            success: { text: "你传球后迅速前插。二过一打穿防线。创造杀机。", effects: { reputation: 6, attrs: { passing: 1 } } },
            fail: { text: "前插跑位被对方识破。你站在越位位置。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "护球消耗时间，保住平局", check: { attrs: ["dribble", "rhythm"], difficulty: 30, tag: "盘带+节奏" },
            success: { text: "你护球消耗时间。把平局保持到最后。", effects: { reputation: 3, attrs: { rhythm: 1 } } },
            fail: { text: "护球时被对方抢下。险些被打反击。你后颈发凉。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "对方大举压上。本队中场组织屡次被断。作为前腰，你需要在防守端站出来。肺部在灼烧。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "高位逼抢对方核心", check: { attrs: ["intercept", "speed"], difficulty: 36, tag: "拦截+速度" },
            success: { text: "你的高位逼抢迫使对方核心传球失误。就地夺回球权。", effects: { reputation: 7, attrs: { intercept: 1 } } },
            fail: { text: "逼抢扑空。对方从容转移。你弯着腰喘气。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】抢断就发生在对方最危险的地带。反击险些直接得分。场边教练攥紧了拳头。", effects: { reputation: 12, attrs: { intercept: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "defense", text: "切断对方前锋的接球线路", check: { attrs: ["positioning", "iq"], difficulty: 34, tag: "站位+球商" },
            success: { text: "你预判到传球线路。中途将球截下。对方攻势胎死腹中。", effects: { reputation: 6, attrs: { positioning: 1 } } },
            fail: { text: "判断失误。被对方轻松打穿。你站在原地。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "defense", text: "回撤保护后卫线", check: { attrs: ["tackle", "balance"], difficulty: 31, tag: "铲断+平衡" },
            success: { text: "你回撤及时。在禁区前沿完成关键拦截。", effects: { reputation: 5, attrs: { tackle: 1 } } },
            fail: { text: "回防中被对方变向晃开。起脚射门。你后颈发凉。", effects: { stamina: -5 } }
          },
          { id: "D", sit: "balanced", text: "断球后快速分边转移", check: { attrs: ["passing", "vision"], difficulty: 32, tag: "传球+视野" },
            success: { text: "你断球后一脚长传转移弱侧。球队进攻重新盘活。", effects: { reputation: 6, attrs: { passing: 1 } } },
            fail: { text: "断球后传球仓促。被对方拦截。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "attack", text: "自己带球推进，吸引防守", check: { attrs: ["dribble", "resolve"], difficulty: 39, tag: "盘带+决断" },
            success: { text: "你{elementAdj}地过掉逼抢者。带球推进。把对方防守阵型搅得天翻地覆。", effects: { reputation: 7, attrs: { dribble: 1 } } },
            fail: { text: "带球被两人包夹。丢掉了球权。你肩膀撞在草皮上。", effects: { stamina: -5 } }
          }
        ]
      },
      {
        text: "定位球。你来主罚。球摆在禁区前沿，草皮上还有露水。人墙站好了，门将弯着腰。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "attack", text: "直接攻门，弧线球", check: { attrs: ["shooting", "power"], difficulty: 44, tag: "射门+力量" },
            success: { text: "你{elementAdj}地起脚。球越过人墙，带着下坠砸入球网。门将扑了，没够到。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "球打在人墙上。弹回来。你的脚背还在发麻。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】任意球直接攻门。球从人墙缝隙里穿过去，贴着门柱入网。门将连反应都没有。", effects: { reputation: 19, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "balanced", text: "传给跑位的队友，打配合", check: { attrs: ["passing", "iq"], difficulty: 36, tag: "传球+球商" },
            success: { text: "你传给跑位的队友。他回做，你迎球怒射。球进了。", effects: { reputation: 9, goals: 1, attrs: { passing: 1 } } },
            fail: { text: "传球被对方预判。人墙散了，球权也丢了。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "balanced", text: "吊入禁区，争顶", check: { attrs: ["passing", "vision"], difficulty: 37, tag: "传球+视野" },
            success: { text: "你吊入禁区。队友争顶成功，头球破门。", effects: { reputation: 8, assists: 1, attrs: { vision: 1 } } },
            fail: { text: "吊球力量大了。球飞出底线。你甩了甩脚。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "balanced", text: "短传控制，重新组织", check: { attrs: ["passing", "rhythm"], difficulty: 30, tag: "传球+节奏" },
            success: { text: "你短传给队友。球队重新组织。节奏稳下来了。", effects: { reputation: 4, attrs: { rhythm: 1 } } },
            fail: { text: "短传被对方逼抢破坏。你被推了一下。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "回传后卫，先稳住", check: { attrs: ["passing", "positioning"], difficulty: 28, tag: "传球+站位" },
            success: { text: "你回传。球队稳住。不是每个定位球都要冒险。", effects: { reputation: 3, attrs: { passing: 1 } } },
            fail: { text: "回传被对方前锋 intercept。你后颈发凉。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "被对方后腰重点盯防。他跟着你，像影子。你拿球，他贴上来。你跑位，他跟着。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "attack", text: "突然变向，甩开他", check: { attrs: ["dribble", "burst"], difficulty: 40, tag: "盘带+爆发" },
            success: { text: "你{elementAdj}地突然变向。他重心丢了。你拿球，面对球门。", effects: { reputation: 9, attrs: { dribble: 1 } } },
            fail: { text: "变向的时候被他拉了一下。你踉跄了一步。裁判没吹。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你突然变向，又突然停。他冲过去了。你拿球，面对球门。安静了一秒。", effects: { reputation: 15, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "balanced", text: "回撤拿球，把他带出来", check: { attrs: ["positioning", "iq"], difficulty: 34, tag: "站位+球商" },
            success: { text: "你回撤拿球。他跟出来了。身后空了。队友插上。", effects: { reputation: 6, attrs: { iq: 1 } } },
            fail: { text: "回撤的时候被他从身后捅掉。你肩膀撞在草皮上。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "balanced", text: "一脚出球，不给他贴防机会", check: { attrs: ["passing", "vision"], difficulty: 36, tag: "传球+视野" },
            success: { text: "你一脚出球。他贴上来的时候球已经走了。队友拿球，推进。", effects: { reputation: 7, attrs: { passing: 1 } } },
            fail: { text: "一脚出球力量小了。被他 intercept。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "attack", text: "强行转身，面对球门", check: { attrs: ["strength", "resolve"], difficulty: 41, tag: "对抗+决断" },
            success: { text: "你强行转身。肩膀撞开他。面对球门。起脚。", effects: { reputation: 10, attrs: { strength: 1 } } },
            fail: { text: "转身的时候被他拉倒了。你坐在草皮上。裁判没吹。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你强行转身，肩膀撞开他。面对球门。起脚。球进了。他坐在草皮上看着你。", effects: { reputation: 17, goals: 1, attrs: { strength: 2 }, flags: { keySuccess: true } } }
          },
          { id: "E", sit: "defense", text: "回传，先摆脱盯防", check: { attrs: ["passing", "positioning"], difficulty: 28, tag: "传球+站位" },
            success: { text: "你回传。先摆脱盯防。不是每次都要硬来。", effects: { reputation: 3, attrs: { passing: 1 } } },
            fail: { text: "回传被他 intercept。你后颈发凉。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "补时阶段。最后一脚传球的机会。你拿球，面对球门。汗水模糊了视线。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "致命一传，撕开防线", check: { attrs: ["passing", "vision"], difficulty: 45, tag: "传球+视野" },
            success: { text: "你{elementAdj}地一脚直塞。球从人缝里穿过去。前锋推射。球进了。", effects: { reputation: 14, assists: 1, attrs: { passing: 1 }, flags: { keySuccess: true } } },
            fail: { text: "直塞被拦截。终场哨响了。你站在原地。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】最后一传。球从三个人腿缝里穿过去。前锋推射。进了。你跪在草皮上，草腥味灌满鼻腔。", effects: { reputation: 20, assists: 1, attrs: { passing: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "自己来，远射", check: { attrs: ["shooting", "resolve"], difficulty: 44, tag: "射门+决断" },
            success: { text: "你拔脚。球带着弧线砸入死角。球进了。你的腿在抖。", effects: { reputation: 13, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "远射偏出。你的脚背抽疼。终场哨响了。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】最后一脚。球带着{elementAdj}的弧线，砸入死角。你甚至没力气庆祝。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "横传给位置更好的队友", check: { attrs: ["vision", "iq"], difficulty: 36, tag: "视野+球商" },
            success: { text: "你横传。队友推射。球进了。他朝你跑过来。", effects: { reputation: 9, assists: 1, attrs: { vision: 1 } } },
            fail: { text: "横传被回追的后卫破坏。终场哨响了。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "balanced", text: "带球突入禁区", check: { attrs: ["dribble", "burst"], difficulty: 43, tag: "盘带+爆发" },
            success: { text: "你带球突入禁区。射门。球进了。你的大腿在抽搐。", effects: { reputation: 12, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "带球被围抢断下。你被挤在中间。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】你带球突入禁区，连过两人。射门。球进了。安静了一秒。然后所有人都站起来了。", effects: { reputation: 19, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "E", sit: "defense", text: "回传，至少不输", check: { attrs: ["passing", "positioning"], difficulty: 28, tag: "传球+站位" },
            success: { text: "你回传。球队稳住。至少不输。", effects: { reputation: 3, attrs: { passing: 1 } } },
            fail: { text: "回传被 intercept。你后颈发凉。", effects: { stamina: -4 } }
          }
        ]
      }
    ]
  },

  // 中后卫·上抢型
  CB_stopper: {
    desc: "前顶拦截、回追铲球、凶狠绞杀",
    events: [
      {
        text: "对方前锋背身拿球，正在转身。你闻到了机会的味道——他重心还没稳。你的腿已经先于脑子动了。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "前顶出脚，抢在他转身之前", check: { attrs: ["tackle", "burst"], difficulty: 40, tag: "铲断+爆发" },
            success: { text: "你{elementAdj}地一脚捅掉皮球。球从两腿之间穿过去，你人已经绕到前面了。干净。", effects: { reputation: 10, attrs: { tackle: 1 } } },
            fail: { text: "出脚早了半拍。他转身抹过你，肩膀撞在你胸口上，闷疼。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】你前顶断球，顺势带球推进十米。看台上有人站起来喊了声好。后卫带球，像一把刀插出去。", effects: { reputation: 16, attrs: { tackle: 2, speed: 1 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "defense", text: "贴身卡位，不让他舒服转身", check: { attrs: ["strength", "positioning"], difficulty: 36, tag: "对抗+站位" },
            success: { text: "你把肩膀顶上去，卡住他转身的线路。他挣了两下没挣开，只能回传。你赢了。", effects: { reputation: 7, attrs: { strength: 1 } } },
            fail: { text: "他肘子顶在你肋骨上，趁你吸气的时候转过去了。你弯着腰，肋下火辣辣的。", effects: { stamina: -5 } }
          },
          { id: "C", sit: "balanced", text: "不急着出脚，等他露出破绽", check: { attrs: ["iq", "positioning"], difficulty: 34, tag: "球商+站位" },
            success: { text: "你等了半秒。就半秒。他触球大了，你伸脚一拨，球权易手。", effects: { reputation: 6, attrs: { iq: 1 } } },
            fail: { text: "等太久了。他已经转过来面对你了，你被迫后退。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "defense", text: "招呼队友夹抢，两人合围", check: { attrs: ["iq", "passing"], difficulty: 32, tag: "球商+传球" },
            success: { text: "你喊了一声。后腰心领神会，两人一夹，球断了。他朝你竖了下拇指。", effects: { reputation: 5, attrs: { iq: 1 } } },
            fail: { text: "队友没跟上。你一个人扑出去，身后空了。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "attack", text: "断球后直接长传找前锋", check: { attrs: ["passing", "vision"], difficulty: 36, tag: "传球+视野" },
            success: { text: "你断球后没停，一脚长传找前场。前锋拿住了，反击打出来了。", effects: { reputation: 7, attrs: { passing: 1 } } },
            fail: { text: "长传力量大了，直接飞出了边线。前锋朝你摊了摊手。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "对方反击。三打二。皮球打穿了中场，对方前锋趟球狂奔。你是最后一个回追的人。风灌进耳朵，草皮在鞋底打滑。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "全速回追，背后滑铲", check: { attrs: ["speed", "tackle"], difficulty: 42, tag: "速度+铲断" },
            success: { text: "你{elementAdj}地拍马赶到，一脚滑铲。草皮蹭着大腿外侧，火辣辣的。但球捅出去了。你趴在草皮上喘气，听见看台的欢呼。", effects: { reputation: 12, attrs: { tackle: 1 } } },
            fail: { text: "慢了。你铲了个空，整个人滑出去两米。爬起来的时候，球已经在网窝里了。", effects: { stamina: -6 } },
            critical: { text: "【灵光一闪】你回追铲断，球弹起来你顺势一脚长传发动反击。从防守到进攻，一脚球的事。场边教练把战术板摔了——高兴的。", effects: { reputation: 18, attrs: { tackle: 2, speed: 1 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "defense", text: "且战且退，延缓等他失误", check: { attrs: ["positioning", "iq"], difficulty: 36, tag: "站位+球商" },
            success: { text: "你边退边封堵角度。他犹豫了，趟大了一步。你伸脚一拨，化解了。", effects: { reputation: 8, attrs: { positioning: 1 } } },
            fail: { text: "他太老练了。一个变向晃开你，推射远角。你回头看了一眼球网，没说话。", effects: { stamina: -5 } }
          },
          { id: "C", sit: "defense", text: "封堵射门角度，逼他走外线", check: { attrs: ["intercept", "balance"], difficulty: 38, tag: "拦截+平衡" },
            success: { text: "你死死卡住近角。他被迫走外线，射门角度没了，只能传中。被你赌对了。", effects: { reputation: 7, attrs: { intercept: 1 } } },
            fail: { text: "他挑球过顶。你仰头看着球飞过去，腿像灌了铅。", effects: { stamina: -5 } }
          },
          { id: "D", sit: "defense", text: "战术犯规，拉倒他", check: { attrs: ["strength", "resolve"], difficulty: 30, tag: "对抗+决断" },
            success: { text: "你一把拽住他球衣。哨响了。黄牌。但你不在乎。单刀被扼杀了。", effects: { reputation: 5, attrs: { strength: 1 } } },
            fail: { text: "没拉住。他挣开了，还造了你一个犯规。黄牌。你低着头往回走。", effects: { stamina: -4, reputation: -2 } }
          },
          { id: "E", sit: "balanced", text: "呼喊门将出击，自己补位", check: { attrs: ["iq", "passing"], difficulty: 34, tag: "球商+传球" },
            success: { text: "你喊了一声「我的！」门将缩回去了，你卡住身位，把球护出底线。", effects: { reputation: 6, attrs: { iq: 1 } } },
            fail: { text: "门将没听见。你俩让了一下，球从中间漏过去了。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "你断球了。对方还在往前压。面前是三十米的开阔地。后卫带球推进，像一把刀插出去。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "attack", text: "带球推进，直插对方腹地", check: { attrs: ["dribble", "speed"], difficulty: 40, tag: "盘带+速度" },
            success: { text: "你{elementAdj}地带球推进。对方中场回追，但你已经过了中线。分球。前锋拿住了。", effects: { reputation: 9, attrs: { dribble: 1 } } },
            fail: { text: "带球趟大了。对方前锋反抢，你被迫回传。白跑一趟，大腿发酸。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】你带球推进三十米，吸引三人回追后一脚直塞撕开防线。前锋单刀。后卫助攻，比前锋进球还让人兴奋。", effects: { reputation: 16, assists: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "balanced", text: "一脚长传找前场", check: { attrs: ["passing", "vision"], difficulty: 38, tag: "传球+视野" },
            success: { text: "你抡起右脚。球在空中划了一道弧线，落在前锋脚下。他拿住了。", effects: { reputation: 7, attrs: { passing: 1 } } },
            fail: { text: "长传偏了。球落在无人区，对方轻松拿回球权。你的脚背还在发麻。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "balanced", text: "短传给后腰，稳妥出球", check: { attrs: ["passing", "iq"], difficulty: 30, tag: "传球+球商" },
            success: { text: "你短传给后腰。他接应转身，进攻组织起来了。不花哨，但稳。", effects: { reputation: 5, attrs: { passing: 1 } } },
            fail: { text: "短传力量小了。对方前锋差点 intercept。你后颈发凉。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "defense", text: "不冒险，回传门将重新组织", check: { attrs: ["positioning", "iq"], difficulty: 26, tag: "站位+球商" },
            success: { text: "你回传门将。球队重新落位。不是每次都要冒险。", effects: { reputation: 4, attrs: { positioning: 1 } } },
            fail: { text: "回传力量轻了。门将冲出来拿球，差点被对方前锋抢到。他朝你吼了一声。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "角球。你冲到对方禁区里。身边全是人，胳膊肘、肩膀、膝盖。有人拽你球衣，你甩了一下没甩开。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "前点抢位，头球攻门", check: { attrs: ["heading", "positioning"], difficulty: 40, tag: "头球+站位" },
            success: { text: "你{elementAdj}地旱地拔葱。额头撞上皮球，闷响。球砸向球门。进了。你落地的时候踩到别人脚，差点崴了。", effects: { reputation: 11, goals: 1, attrs: { heading: 1 } } },
            fail: { text: "起跳被身后的人拉了一下。没顶到。你摔在人堆里，后背磕在草皮上。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你在人堆里拔地而起，头槌砸地弹入网窝。门将连反应都没有。后卫进球，比前锋还解气。", effects: { reputation: 18, goals: 1, attrs: { heading: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "后点包抄，捡漏", check: { attrs: ["positioning", "resolve"], difficulty: 36, tag: "站位+决断" },
            success: { text: "球从前点漏过来。你在后点等着。伸脚一捅。球滚进去了。", effects: { reputation: 9, goals: 1, attrs: { positioning: 1 } } },
            fail: { text: "球没漏过来。你在后点白等了，腿都站酸了。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "balanced", text: "头球摆渡给队友", check: { attrs: ["heading", "vision"], difficulty: 35, tag: "头球+视野" },
            success: { text: "你头球摆渡。后点的队友迎球推射。进了。他跑过来拍你后脑勺。", effects: { reputation: 7, assists: 1, attrs: { heading: 1 } } },
            fail: { text: "摆渡方向偏了。队友没够到。你落地的时候膝盖咔嗒响了一声。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "defense", text: "不争顶，守在禁区外防反击", check: { attrs: ["positioning", "iq"], difficulty: 28, tag: "站位+球商" },
            success: { text: "你守在弧顶。角球被解围出来，对方想反击，你一脚把球拦下了。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "角球被对方顶出来，你站位偏了，球从你身边飞过去。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "对方前锋单刀了。门将出击被晃过。球门空了。他是你面前的最后一道关。不，你是他面前的最后一道关。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "正面封堵，用身体挡射门", check: { attrs: ["balance", "resolve"], difficulty: 42, tag: "平衡+决断" },
            success: { text: "你张开双臂，降低重心。他起脚了。球打在你大腿上，弹出去了。疼。但你笑了。", effects: { reputation: 12, attrs: { balance: 1 } } },
            fail: { text: "他晃了一下。你重心丢了。球从你身边滚过去，滚进了空门。你跪在草皮上，手掌撑着地。", effects: { stamina: -6 } },
            critical: { text: "【灵光一闪】你正面封堵，球打在你身上弹出去。你爬起来，又是一脚大脚解围。看台上的欢呼声比进球还响。", effects: { reputation: 18, attrs: { balance: 2, resolve: 1 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "defense", text: "滑铲，把球铲出底线", check: { attrs: ["tackle", "speed"], difficulty: 44, tag: "铲断+速度" },
            success: { text: "你{elementAdj}地滑出去。草皮蹭着整条大腿。球被你铲出了底线。你趴在地上，喘得像拉风箱。", effects: { reputation: 11, attrs: { tackle: 1 } } },
            fail: { text: "铲空了。你整个人滑出去，看着他推射空门。草皮的味道很近，很青。", effects: { stamina: -6 } }
          },
          { id: "C", sit: "defense", text: "延缓他，等门将回位", check: { attrs: ["positioning", "pressure"], difficulty: 38, tag: "站位+抗压" },
            success: { text: "你且战且退，不让他舒服起脚。门将爬起来了，回位了。他被迫传球。化解了。", effects: { reputation: 8, attrs: { positioning: 1 } } },
            fail: { text: "他太冷静了。你退，他不急。等你退到门线了，他轻轻推射。进了。", effects: { stamina: -5 } }
          },
          { id: "D", sit: "defense", text: "赌他射门方向，提前移动", check: { attrs: ["iq", "intercept"], difficulty: 40, tag: "球商+拦截" },
            success: { text: "你赌对了。他推射远角，你已经等在那里了。伸脚一挡。球弹出去了。", effects: { reputation: 10, attrs: { iq: 1 } } },
            fail: { text: "赌错了。你扑向远角，他推了近角。你回头看了一眼，球在网窝里晃。", effects: { stamina: -5 } }
          }
        ]
      },
      {
        text: "中场绞杀。你和对方后腰撞在一起，肩膀碰肩膀，谁也不让。球在两人脚下弹来弹去。他的呼吸喷在你脸上，有股子铁锈味。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "defense", text: "硬碰硬，用对抗把球抢下来", check: { attrs: ["strength", "tackle"], difficulty: 40, tag: "对抗+铲断" },
            success: { text: "你{elementAdj}地一个肩撞。他踉跄了。球到了你脚下。你赢了这一下。", effects: { reputation: 8, attrs: { strength: 1 } } },
            fail: { text: "他比你壮。你被撞开了，球丢了。肩膀钝疼，像被人拿锤子敲了一下。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】你硬生生把球从他脚下绞下来，顺势推进。他坐在草皮上看着你，眼神里有不服，也有服。", effects: { reputation: 14, attrs: { strength: 2, tackle: 1 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "defense", text: "不跟他缠，绕前拦截传球线路", check: { attrs: ["intercept", "iq"], difficulty: 36, tag: "拦截+球商" },
            success: { text: "你不跟他纠缠了。绕到前面，卡住他的传球线路。他被迫回传。你赢了。", effects: { reputation: 6, attrs: { intercept: 1 } } },
            fail: { text: "他看穿了你的意图，一个变向抹过去了。你扑了个空。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "balanced", text: "犯规打断他，重新落位", check: { attrs: ["strength", "resolve"], difficulty: 30, tag: "对抗+决断" },
            success: { text: "你伸脚一绊。哨响了。任意球。但你的防线落位了。值。", effects: { reputation: 4, attrs: { strength: 1 } } },
            fail: { text: "犯规动作大了。黄牌。你朝裁判摊手，没用。", effects: { stamina: -3, reputation: -2 } }
          },
          { id: "D", sit: "balanced", text: "让队友来处理，自己回防落位", check: { attrs: ["positioning", "iq"], difficulty: 28, tag: "站位+球商" },
            success: { text: "你喊了一声，后腰上来接应。你回撤落位。防线稳了。", effects: { reputation: 4, attrs: { positioning: 1 } } },
            fail: { text: "你撤了，但队友没接住。中场空了，对方直接面对你的防线。", effects: { stamina: -4 } }
          }
        ]
      }
    ]
  },

  // 中后卫·拖后型
  CB_cover: {
    desc: "站位补位、头球解围、指挥防线",
    events: [
      {
        text: "对方一脚直塞。球从你的搭档身边穿过去了。他愣了半秒。你没有愣。你的腿已经在跑了。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "补位拦截，抢在对方前锋之前", check: { attrs: ["speed", "intercept"], difficulty: 40, tag: "速度+拦截" },
            success: { text: "你{elementAdj}地斜插过去，抢在他之前把球捅走了。他愣了一下。你已经在喊队友落位了。", effects: { reputation: 10, attrs: { intercept: 1 } } },
            fail: { text: "你跑了，但慢了半步。他先碰到了球。你刹不住，撞在他背上。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】你补位断球，抬头一看，对方防线还没落位。一脚长传。前锋单刀。从防守到进攻，你只用了两秒。", effects: { reputation: 16, assists: 1, attrs: { intercept: 2, speed: 1 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "defense", text: "不追球，卡住他接球后的射门线路", check: { attrs: ["positioning", "iq"], difficulty: 38, tag: "站位+球商" },
            success: { text: "你没追球。你卡住了他拿球后唯一的角度。他被迫横传。威胁没了。", effects: { reputation: 8, attrs: { positioning: 1 } } },
            fail: { text: "他直接射门了。角度比你预想的大。球擦着门柱出去了。你后背全是冷汗。", effects: { stamina: -5 } }
          },
          { id: "C", sit: "defense", text: "呼喊搭档回追，自己补他的位", check: { attrs: ["iq", "passing"], difficulty: 34, tag: "球商+传球" },
            success: { text: "你喊了一声。搭档醒了，回追。你补到他的位置上。防线没散。", effects: { reputation: 6, attrs: { iq: 1 } } },
            fail: { text: "搭档没听见。你补了他的位，但你的位空了。对方转移，打你身后。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "defense", text: "造越位，举手示意", check: { attrs: ["iq", "positioning"], difficulty: 36, tag: "球商+站位" },
            success: { text: "你举手了。整条防线同时压上。边裁举旗。越位。你松了口气。", effects: { reputation: 7, attrs: { iq: 1 } } },
            fail: { text: "搭档没压上。越位没造成。他单刀了。你回头看了一眼，心沉下去了。", effects: { stamina: -5 } }
          }
        ]
      },
      {
        text: "对方边锋拿球，内切。你的搭档被过了。现在是你和他，一对一。他比你快，你知道。但他不一定比你聪明。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "退守，不轻易出脚，等他犯错", check: { attrs: ["positioning", "pressure"], difficulty: 38, tag: "站位+抗压" },
            success: { text: "你退。他进。你退。他急了，趟大了。你伸脚。球断了。", effects: { reputation: 9, attrs: { positioning: 1 } } },
            fail: { text: "你退得太多了。他到了禁区线，起脚了。球擦着门柱进去的。你连伸脚的机会都没有。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】你且战且退，他急了，一个变向。你等的就是这个。伸脚。断了。你抬头，一脚长传找前场。看台上有人鼓掌。", effects: { reputation: 15, attrs: { positioning: 2, iq: 1 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "defense", text: "主动出脚，抢在他内切之前", check: { attrs: ["tackle", "burst"], difficulty: 42, tag: "铲断+爆发" },
            success: { text: "你出脚了。快。准。球被你捅出去了。他愣在原地。", effects: { reputation: 10, attrs: { tackle: 1 } } },
            fail: { text: "他等你出脚呢。你伸腿的瞬间他变向了。你劈了个叉。大腿内侧拉了一下。", effects: { stamina: -6 } }
          },
          { id: "C", sit: "defense", text: "封堵内切线路，逼他走外线", check: { attrs: ["positioning", "balance"], difficulty: 36, tag: "站位+平衡" },
            success: { text: "你卡住内线。他被迫走外。角度没了。他只能传中。被你赌对了。", effects: { reputation: 7, attrs: { positioning: 1 } } },
            fail: { text: "他外线也能打。一个变向走外，起脚传中。你回头看了一眼，球已经飞进去了。", effects: { stamina: -5 } }
          },
          { id: "D", sit: "balanced", text: "犯规，不让他起脚", check: { attrs: ["strength", "resolve"], difficulty: 30, tag: "对抗+决断" },
            success: { text: "你肩膀顶上去。哨响了。任意球。但他在三十米外，威胁不大。", effects: { reputation: 4, attrs: { strength: 1 } } },
            fail: { text: "犯规位置不好。禁区前沿。你给了他们一个危险的任意球。", effects: { stamina: -3, reputation: -2 } }
          }
        ]
      },
      {
        text: "对方传中。球在空中划了一道弧线，带着旋转。你仰头看着它，判断落点。身后有人推你。你扎稳了。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "头球解围，顶远", check: { attrs: ["heading", "strength"], difficulty: 38, tag: "头球+对抗" },
            success: { text: "你{elementAdj}地起跳。额头撞上皮球。顶远了。你落地的时候踩到别人脚，晃了一下。", effects: { reputation: 8, attrs: { heading: 1 } } },
            fail: { text: "没顶到。球从你头顶飞过去了。你仰头看着它落在身后，心沉了。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】你头球解围，球顶得又高又远。对方二次进攻的机会没了。你落地，喊了一声「落位」。防线稳了。", effects: { reputation: 13, attrs: { heading: 2, strength: 1 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "defense", text: "不跳，卡住身位让球出底线", check: { attrs: ["positioning", "balance"], difficulty: 34, tag: "站位+平衡" },
            success: { text: "你没跳。你卡住了身后的人。球飞出了底线。门球。简单，但有效。", effects: { reputation: 6, attrs: { positioning: 1 } } },
            fail: { text: "身后的人比你高。他越过你顶到了球。你仰头看着，够不着。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "balanced", text: "头球顶给后腰，组织反击", check: { attrs: ["heading", "vision"], difficulty: 36, tag: "头球+视野" },
            success: { text: "你头球顶给弧顶的后腰。他接球转身，反击打出来了。", effects: { reputation: 7, attrs: { heading: 1 } } },
            fail: { text: "顶的方向不对。球落在对方脚下。二次进攻。你又得防一轮。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "defense", text: "让门将来处理，自己盯人", check: { attrs: ["iq", "positioning"], difficulty: 30, tag: "球商+站位" },
            success: { text: "你喊了一声「门将的！」然后死死盯住身边的人。门将出击把球摘了。", effects: { reputation: 5, attrs: { iq: 1 } } },
            fail: { text: "门将没出来。你让了，他也没接。球落在对方脚下。你骂了句脏话。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "你断球了。面前没有人逼抢。你有时间。有空间。后卫拿球，最忌讳的是慌。你不慌。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "balanced", text: "从容短传，层层推进", check: { attrs: ["passing", "iq"], difficulty: 32, tag: "传球+球商" },
            success: { text: "你短传给后腰。他回做。你再传。球从后场一层层推上去了。像水一样。", effects: { reputation: 6, attrs: { passing: 1 } } },
            fail: { text: "短传被对方前锋拦截了。他直接面对你的搭档。你回追。腿发酸。", effects: { stamina: -4 } }
          },
          { id: "B", sit: "attack", text: "一脚长传，直接找前锋", check: { attrs: ["passing", "vision"], difficulty: 38, tag: "传球+视野" },
            success: { text: "你抡起右脚。球在空中飞了四十米。前锋拿住了。你听到他喊了声「好球」。", effects: { reputation: 8, attrs: { passing: 1 } } },
            fail: { text: "长传偏了。球飞出了边线。你的脚背抽疼。对方球权。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你一脚长传，球越过整条中场线，精准落在前锋脚下。他单刀了。后卫的助攻，比中场还致命。", effects: { reputation: 15, assists: 1, attrs: { passing: 2 }, flags: { keySuccess: true } } }
          },
          { id: "C", sit: "balanced", text: "带球推进，吸引对方压上", check: { attrs: ["dribble", "resolve"], difficulty: 36, tag: "盘带+决断" },
            success: { text: "你带球推进了五米。对方前锋来抢了。你分球。空间出来了。", effects: { reputation: 6, attrs: { dribble: 1 } } },
            fail: { text: "带球被断了。你回追。大腿在发酸。不该冒险的。", effects: { stamina: -5 } }
          },
          { id: "D", sit: "defense", text: "回传门将，重新组织", check: { attrs: ["positioning", "iq"], difficulty: 26, tag: "站位+球商" },
            success: { text: "你回传。门将接球。球队重新落位。不急。", effects: { reputation: 4, attrs: { positioning: 1 } } },
            fail: { text: "回传力量轻了。门将冲出来拿。你捏了把汗。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "定位球。你方的角球。你站在对方禁区里，身边是两个比你高半头的中卫。他们的手搭在你肩膀上。你深吸一口气。",
        sit: "attack",
        choices: [
          { id: "A", sit: "attack", text: "后点包抄，等球漏过来", check: { attrs: ["positioning", "heading"], difficulty: 38, tag: "站位+头球" },
            success: { text: "球从前点漏过来了。你在后点等着。起跳。额头撞上皮球。砸进去了。", effects: { reputation: 10, goals: 1, attrs: { heading: 1 } } },
            fail: { text: "球没漏过来。你在后点白跳了。落地的时候膝盖咔嗒响了一声。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你在后点无人盯防。球来了。你起跳。时间好像慢了。额头撞上皮球。砸地弹入网窝。门将没动。", effects: { reputation: 17, goals: 1, attrs: { heading: 2, positioning: 1 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "attack", text: "前点抢位，主动争顶", check: { attrs: ["heading", "strength"], difficulty: 42, tag: "头球+对抗" },
            success: { text: "你{elementAdj}地挤开身边的人，前点起跳。顶到了。球飞向球门。", effects: { reputation: 9, goals: 1, attrs: { heading: 1 } } },
            fail: { text: "你被两个人夹住了。跳不起来。球从你头顶飞过去了。", effects: { stamina: -5 } }
          },
          { id: "C", sit: "balanced", text: "不进去，守在弧顶防反击", check: { attrs: ["positioning", "iq"], difficulty: 28, tag: "站位+球商" },
            success: { text: "你守在弧顶。角球被顶出来，落在你脚下。你一脚长传发动反击。", effects: { reputation: 6, attrs: { positioning: 1 } } },
            fail: { text: "角球被对方解围，你站位偏了，球从你身边飞过去。对方反击。", effects: { stamina: -4 } }
          },
          { id: "D", sit: "balanced", text: "头球摆渡给后点队友", check: { attrs: ["heading", "vision"], difficulty: 36, tag: "头球+视野" },
            success: { text: "你顶到了。没攻门，摆渡。后点的队友推射空门。他跑过来拍你后脑勺。", effects: { reputation: 7, assists: 1, attrs: { heading: 1 } } },
            fail: { text: "摆渡力量大了。球飞出了底线。你落地的时候叹了口气。", effects: { stamina: -3 } }
          }
        ]
      },
      {
        text: "比赛末段。对方全线压上。你的禁区前沿全是人。球在空中飞来飞去。你的大腿在发抖，但你的眼睛没有。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "指挥防线，保持阵型不乱", check: { attrs: ["iq", "pressure"], difficulty: 38, tag: "球商+抗压" },
            success: { text: "你喊。一直在喊。「左！」「压上！」「盯人！」防线没散。球被解围了。你嗓子哑了。", effects: { reputation: 9, attrs: { pressure: 1 } } },
            fail: { text: "你喊了，但声音被看台的噪音淹没了。防线乱了。球进了。你站在原地，手撑着膝盖。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】你指挥防线造越位。整条线同时压上。边裁举旗。对方前锋愣在原地。你朝他点了下头。不是挑衅。是礼貌。", effects: { reputation: 15, attrs: { iq: 2, pressure: 1 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "defense", text: "大脚解围，先把球踢出去", check: { attrs: ["strength", "resolve"], difficulty: 34, tag: "力量+决断" },
            success: { text: "你抡起右脚。球飞出去了。飞得很远。你不在乎它落在哪。只要不在禁区里。", effects: { reputation: 6, attrs: { strength: 1 } } },
            fail: { text: "踢呲了。球弹到对方脚下。又是一轮进攻。你弯着腰喘气。", effects: { stamina: -5 } }
          },
          { id: "C", sit: "defense", text: "贴身盯住对方中锋，不让他转身", check: { attrs: ["strength", "positioning"], difficulty: 40, tag: "对抗+站位" },
            success: { text: "你贴着他。他动你动。他停你停。他拿不到球。他急了，推了你一把。哨响了。你赢了。", effects: { reputation: 8, attrs: { strength: 1 } } },
            fail: { text: "他一个反跑把你甩开了。球到了他脚下。你回追。腿像灌了铅。", effects: { stamina: -6 } }
          },
          { id: "D", sit: "defense", text: "封堵射门，用身体挡", check: { attrs: ["balance", "hardness"], difficulty: 42, tag: "平衡+硬度" },
            success: { text: "他起脚了。你转身。球打在你后背上。闷疼。但球弹出去了。你跪在草皮上，喘了半天。", effects: { reputation: 10, attrs: { hardness: 1 } } },
            fail: { text: "你转身慢了。球从你身边飞过去了。你听见了球网的声音。", effects: { stamina: -6 } }
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
          { id: "A", sit: "attack", text: "把握机会，起脚射门", check: { attrs: ["shooting", "burst"], difficulty: 30, tag: "射门+爆发" },
            success: { text: "皮球带着{elementAdj}的劲道钻入死角。球进了。你愣了一秒，然后跑了。", effects: { reputation: 8, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "射门偏出。你撞了下草皮，手掌擦破了皮。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】青训赛首球。球进了。场边有人喊了声好。你甚至没来得及举手。", effects: { reputation: 14, goals: 1, attrs: { shooting: 2 } } }
          },
          { id: "B", sit: "balanced", text: "横传给位置更好的队友", check: { attrs: ["passing", "vision"], difficulty: 28, tag: "传球+视野" },
            success: { text: "你一记{elementAdj}的横传。队友推射空门。他朝你跑了过来。", effects: { reputation: 6, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "横传被回追的后卫破坏。你的脚背还在发麻。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "attack", text: "带球突入禁区，再寻机会", check: { attrs: ["dribble", "resolve"], difficulty: 33, tag: "盘带+决断" },
            success: { text: "你带球抹入禁区。晃开角度。推射得手。", effects: { reputation: 9, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "带球被后卫伸腿捅掉。你踩了个空。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】连过两人。冷静推射。球进了。你的腿在抖。", effects: { reputation: 15, goals: 1, attrs: { dribble: 2 } } }
          },
          { id: "D", sit: "balanced", text: "回敲队友，重新组织", check: { attrs: ["passing", "positioning"], difficulty: 25, tag: "传球+站位" },
            success: { text: "你回敲后前插。队友直塞找回你。配合打出威胁。", effects: { reputation: 4, attrs: { passing: 1 } } },
            fail: { text: "回敲被对方预判拦截。你甩了甩脚。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "先回防，防止对方打反击", check: { attrs: ["tackle", "speed"], difficulty: 25, tag: "铲断+速度" },
            success: { text: "你提前回追。化解了对方一次快速反击。肺部在灼烧。", effects: { reputation: 4, attrs: { tackle: 1 } } },
            fail: { text: "回防慢了一步。对方反击造险。你弯着腰喘气。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "对方反击。你方后场吃紧。教头在场边喊：\"都给我回防！\"声音都劈了。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "回追铲断，化解危机", check: { attrs: ["tackle", "speed"], difficulty: 28, tag: "铲断+速度" },
            success: { text: "你一记干净铲断。草皮擦过小腿，火辣辣的。看台上有人喊了声好。", effects: { reputation: 5, attrs: { tackle: 1 } } },
            fail: { text: "铲断失误。送给对方一个任意球。你低头看了眼球鞋。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】铁壁封堵。你的铲球干净利落。球和人一起留在了底线外。", effects: { reputation: 10, attrs: { tackle: 2 } } }
          },
          { id: "B", sit: "defense", text: "卡住位置，阻断传球路线", check: { attrs: ["intercept", "positioning"], difficulty: 26, tag: "拦截+站位" },
            success: { text: "你预判到传球路线。中途截下。反击发动。", effects: { reputation: 5, attrs: { intercept: 1 } } },
            fail: { text: "判断错了方向。被对手过掉。你站在原地。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "balanced", text: "断球后迅速长传发动反击", check: { attrs: ["passing", "vision"], difficulty: 30, tag: "传球+视野" },
            success: { text: "你断球后一脚长传找到前场队友。反击打出威胁。", effects: { reputation: 6, attrs: { passing: 1 } } },
            fail: { text: "长传力量大了。直接出了边线。你甩了甩脚。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "defense", text: "退守禁区，不轻易出脚", check: { attrs: ["positioning", "balance"], difficulty: 24, tag: "站位+平衡" },
            success: { text: "你且战且退。卡住身位。对方只能回传。", effects: { reputation: 4, attrs: { positioning: 1 } } },
            fail: { text: "退守中被对方晃开角度。你后颈发凉。", effects: { stamina: -4 } }
          },
          { id: "E", sit: "balanced", text: "战术犯规，打断对方节奏", check: { attrs: ["strength", "resolve"], difficulty: 27, tag: "对抗+决断" },
            success: { text: "你一次合理的战术犯规。打断了对方反击节奏。裁判没掏牌。", effects: { reputation: 3, attrs: { strength: 1 } } },
            fail: { text: "犯规动作大了。黄牌。你低头看了眼裁判手里的牌。", effects: { stamina: -3, reputation: -2 } }
          }
        ]
      },
      {
        text: "比赛进入尾声。比分胶着。最后一次进攻，球权在你脚下。汗水滴在草皮上。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "attack", text: "禁区外起脚，搏一个世界波", check: { attrs: ["shooting", "power"], difficulty: 36, tag: "射门+力量" },
            success: { text: "皮球带着{elementAdj}的弧线轰入球网。绝杀。你跪在草皮上。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "射门被后卫封堵。终场哨响。你躺在草皮上，盯着天。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】读秒绝杀。球进了。场边有人把外套扔上了天。你甚至没跑，只是站在原地。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 }, flags: { keySuccess: true } } }
          },
          { id: "B", sit: "balanced", text: "控制节奏，等队友跑位", check: { attrs: ["vision", "rhythm"], difficulty: 30, tag: "视野+节奏" },
            success: { text: "你冷静控球。送出一记{elementAdj}的直塞。队友破门。", effects: { reputation: 9, assists: 1, attrs: { vision: 1 } } },
            fail: { text: "犹豫间被对方拼抢断下。你肩膀撞在草皮上。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "attack", text: "带球突破，撕开防线", check: { attrs: ["dribble", "burst"], difficulty: 38, tag: "盘带+爆发" },
            success: { text: "你带球强突。晃过门将推射空门。绝杀。你的腿在抖。", effects: { reputation: 13, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "突破被回追的后卫破坏。你弯着腰喘气。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】单骑闯关。你撕碎了整条防线。球进了。安静了一秒。然后所有人都站起来了。", effects: { reputation: 21, goals: 1, attrs: { dribble: 2 }, flags: { keySuccess: true } } }
          },
          { id: "D", sit: "balanced", text: "横传队友，寻找更好机会", check: { attrs: ["passing", "vision"], difficulty: 28, tag: "传球+视野" },
            success: { text: "你横传转移。队友起脚造险。角球。", effects: { reputation: 5, attrs: { passing: 1 } } },
            fail: { text: "横传被对方拦截。你甩了甩脚。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "回传控节奏，至少不输", check: { attrs: ["passing", "positioning"], difficulty: 24, tag: "传球+站位" },
            success: { text: "你回传稳住节奏。把平局保持到终场。", effects: { reputation: 3, attrs: { passing: 1 } } },
            fail: { text: "回传险些被断。好在门将出击化解。你后颈发凉。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "第一次在正式比赛触球。球传过来的时候，你的脚在抖。草腥味很浓。看台上有人在喊。",
        sit: "balanced",
        choices: [
          { id: "A", sit: "attack", text: "深呼吸，接球转身", check: { attrs: ["dribble", "resolve"], difficulty: 28, tag: "盘带+决断" },
            success: { text: "你{elementAdj}地接球。转身。球在脚下，沉实。心跳慢下来了。", effects: { reputation: 5, attrs: { dribble: 1 } } },
            fail: { text: "接球的时候脚软了。球弹出去老远。你的脸在发烫。", effects: { stamina: -3 } }
          },
          { id: "B", sit: "balanced", text: "一脚出球，不粘球", check: { attrs: ["passing", "iq"], difficulty: 26, tag: "传球+球商" },
            success: { text: "你一脚出球。队友拿球，推进。简单，但有效。", effects: { reputation: 4, attrs: { passing: 1 } } },
            fail: { text: "一脚出球力量小了。被对方 intercept。你后颈发凉。", effects: { stamina: -3 } }
          },
          { id: "C", sit: "attack", text: "带球推进，相信自己", check: { attrs: ["dribble", "burst"], difficulty: 32, tag: "盘带+爆发" },
            success: { text: "你带球推进。过了一个人。心跳很快，但腿不抖了。", effects: { reputation: 6, attrs: { burst: 1 } } },
            fail: { text: "带球被断了。你站在原地，脸在发烫。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你带球推进，连过两人。第一次触球，就像踢了一百场。场边有人喊了声好。", effects: { reputation: 12, attrs: { dribble: 2 } } }
          },
          { id: "D", sit: "balanced", text: "回传，先稳住", check: { attrs: ["passing", "positioning"], difficulty: 24, tag: "传球+站位" },
            success: { text: "你回传。先稳住。不是每次都要冒险。", effects: { reputation: 3, attrs: { passing: 1 } } },
            fail: { text: "回传力量轻了。险些被断。你后颈发凉。", effects: { stamina: -3 } }
          },
          { id: "E", sit: "defense", text: "回防，先做好防守", check: { attrs: ["tackle", "positioning"], difficulty: 25, tag: "铲断+站位" },
            success: { text: "你回防。做好防守。教练在场边点了下头。", effects: { reputation: 4, attrs: { tackle: 1 } } },
            fail: { text: "回防慢了一步。你弯着腰喘气。", effects: { stamina: -4 } }
          }
        ]
      },
      {
        text: "队友受伤下场。少打一人。教头在场边喊：\"顶住！\"你的大腿在发酸。",
        sit: "defense",
        choices: [
          { id: "A", sit: "defense", text: "多跑一步，补上缺口", check: { attrs: ["stamina", "speed"], difficulty: 30, tag: "耐力+速度" },
            success: { text: "你{elementAdj}地多跑一步。补上缺口。肺部在灼烧，但顶住了。", effects: { reputation: 6, attrs: { stamina: 1 } } },
            fail: { text: "跑不动了。大腿像灌了铅。对方从缺口打进来。", effects: { stamina: -5 } }
          },
          { id: "B", sit: "defense", text: "收缩防线，不给他们空间", check: { attrs: ["positioning", "iq"], difficulty: 28, tag: "站位+球商" },
            success: { text: "你收缩防线。不给对方空间。他们只能回传。", effects: { reputation: 5, attrs: { positioning: 1 } } },
            fail: { text: "收缩太慢了。对方从边路打进来。你后颈发凉。", effects: { stamina: -4 } }
          },
          { id: "C", sit: "balanced", text: "断球后长传，打反击", check: { attrs: ["passing", "vision"], difficulty: 32, tag: "传球+视野" },
            success: { text: "你断球后长传。前场队友拿到球。反击。", effects: { reputation: 6, attrs: { passing: 1 } } },
            fail: { text: "长传力量大了。球出了边线。你甩了甩脚。", effects: { stamina: -3 } }
          },
          { id: "D", sit: "defense", text: "战术犯规，打断节奏", check: { attrs: ["strength", "resolve"], difficulty: 27, tag: "对抗+决断" },
            success: { text: "你战术犯规。打断了对方节奏。裁判没掏牌。", effects: { reputation: 4, attrs: { strength: 1 } } },
            fail: { text: "犯规动作大了。黄牌。你低头看了眼裁判手里的牌。", effects: { stamina: -3, reputation: -2 } }
          },
          { id: "E", sit: "attack", text: "自己带球推进，减轻防守压力", check: { attrs: ["dribble", "resolve"], difficulty: 34, tag: "盘带+决断" },
            success: { text: "你带球推进。把对方压回去。防守压力小了。", effects: { reputation: 6, attrs: { dribble: 1 } } },
            fail: { text: "带球被断了。对方反击。你弯着腰喘气。", effects: { stamina: -5 } }
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
      text: "阿贵在前场不知疲倦地奔跑拉扯。他的球衣湿透了，但还在跑。硬生生拽开了对方防线的空当。",
      auto: { difficultyMod: -5 },
      result: "【队友拉扯】阿贵扯出空当，你下次检定难度-5。"
    },
    {
      who: "agui",
      text: "阿贵回防冲刺。他用身体封堵了对手的射门。球砸在他胸口上，闷响。他愣了一下，继续跑。",
      auto: { oppThreat: -1 },
      result: "【队友封堵】阿贵奋不顾身化解险情，对方威胁值-1。"
    },
    {
      who: "agui",
      text: "阿贵在前场反抢。他扑上去的时候腿都在抖，但球断了。他弯着腰喘气，朝你喊了声：\"上！\"",
      auto: { threat: 1 },
      result: "【队友反抢】阿贵前场断球策动进攻，我方威胁值+1。"
    },
    {
      who: "agui",
      text: "阿贵体力透支了。他的步伐慢了，但还在跑。 lungs 在灼烧，大腿在发酸。他还在跑。",
      auto: { difficultyMod: -3 },
      result: "【队友坚持】阿贵咬牙坚持扯动防线，你下次检定难度-3。"
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
      text: "边路的林啸拿球。一个假动作，晃开防守。起脚传中。皮球划过门前——",
      auto: { threat: 1 },
      result: "【队友支援】林啸的传中制造杀机，我方威胁值+1。"
    },
    {
      who: "linxiao",
      text: "林啸连过两人。吸引整条防线后把球分给了你。他的呼吸很重，但眼睛很亮。",
      auto: { threat: 1 },
      result: "【队友突破】林啸的个人能力扯开空当，我方威胁值+1。"
    },
    {
      who: "linxiao",
      text: "林啸边路1v1。他沉肩，变向，过去了。下底传中。球划过门前，带着弧线。",
      auto: { threat: 1 },
      result: "【队友过人】林啸边路突破传中，我方威胁值+1。"
    },
    {
      who: "suwan",
      text: "苏晚在中场从容调度。突然送出一记手术刀般的直塞。球从人缝里穿过去。",
      auto: { threat: 1 },
      result: "【队友直塞】苏晚的传球撕开防线，我方威胁值+1。"
    },
    {
      who: "suwan",
      text: "苏晚提前预判了对手的传球路线。伸脚一挡，顺势发动反击。他甚至没转头看。",
      auto: { oppThreat: -1, threat: 1 },
      result: "【队友阅读】苏晚的拦截策动反击，对方威胁值-1，我方威胁值+1。"
    },
    {
      who: "suwan",
      text: "苏晚阅读比赛。他提前跑位，出现在你最需要的位置。你传球的时候，他已经在那里了。",
      auto: { difficultyMod: -4 },
      result: "【队友跑位】苏晚提前接应，你下次检定难度-4。"
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
          { id: "A", text: "前插反击，扩大领先", check: { attrs: ["speed", "burst"], difficulty: 40, tag: "速度+爆发" },
            success: { text: "你抓住空当高速前插。单刀推射扩大领先。你的大腿在抽搐。", effects: { reputation: 10, goals: 1, attrs: { speed: 1 } } },
            fail: { text: "反击被回追后卫破坏。险些被打了个回头。你弯着腰喘气。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】反击一击致命。你像一枚被弹射出去的钉子。球进了。", effects: { reputation: 16, goals: 1, attrs: { speed: 2 } } } },
          { id: "B", text: "控制节奏，消耗时间", check: { attrs: ["vision", "rhythm"], difficulty: 32, tag: "视野+节奏" },
            success: { text: "你冷静控球。把节奏牢牢握在脚下。", effects: { reputation: 5, attrs: { rhythm: 1 } } },
            fail: { text: "控球被断。对方顺势发动攻势。你后颈发凉。", effects: { stamina: -3 } } }
        ]
      },
      level: {
        text: "比分胶着。每一次球权都可能决定胜负。中场绞杀愈发激烈。汗水滴在草皮上。",
        choices: [
          { id: "A", text: "主动要球，撕开防线", check: { attrs: ["passing", "vision"], difficulty: 42, tag: "传球+视野" },
            success: { text: "你送出关键一传。队友破门打破僵局。", effects: { reputation: 10, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "传球被预判。球权易手。你甩了甩脚。", effects: { stamina: -3 } },
            critical: { text: "【灵光一闪】致命一传。球从人缝里穿过去。队友推射。进了。", effects: { reputation: 16, assists: 1, attrs: { passing: 2 } } } },
          { id: "B", text: "自己带球突入禁区", check: { attrs: ["dribble", "resolve"], difficulty: 44, tag: "盘带+决断" },
            success: { text: "你连过两人。禁区内起脚命中。", effects: { reputation: 12, goals: 1, attrs: { dribble: 1 } } },
            fail: { text: "带球被围抢断下。你被挤在中间。", effects: { stamina: -4 } } }
        ]
      },
      trailing: {
        text: "比分落后。时间一分一秒流逝。必须做点什么。肺部在灼烧。",
        choices: [
          { id: "A", text: "全力压上，搏命进攻", check: { attrs: ["shooting", "burst"], difficulty: 45, tag: "射门+爆发" },
            success: { text: "你抓住稍纵即逝的机会。起脚扳平比分。你的腿在抖。", effects: { reputation: 12, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "射门偏出。浪费了宝贵的时间。你弯着腰喘气。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】绝境爆发。球进了。你跪在草皮上，草腥味灌满鼻腔。", effects: { reputation: 18, goals: 1, attrs: { shooting: 2 } } } },
          { id: "B", text: "稳住阵脚，寻找更好的机会", check: { attrs: ["iq", "rhythm"], difficulty: 35, tag: "球商+节奏" },
            success: { text: "你冷静组织。为队友创造出绝佳机会。", effects: { reputation: 8, assists: 1, attrs: { iq: 1 } } },
            fail: { text: "组织被对方识破。无功而返。你甩了甩脚。", effects: { stamina: -3 } } }
        ]
      }
    },
    k2: {
      leading: {
        text: "领先优势在手。对方门将都冲到了前场参与进攻。最后一搏。",
        choices: [
          { id: "A", text: "吊射空门，锁定胜局", check: { attrs: ["shooting", "iq"], difficulty: 42, tag: "射门+球商" },
            success: { text: "你一脚超远吊射。皮球坠入空门。你甚至没看球。", effects: { reputation: 14, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "吊射力量不足。被回追的后卫解围。你甩了甩脚。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】半场吊射。球带着弧线坠入空门。技惊四座。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 } } } },
          { id: "B", text: "回防稳住，保住胜果", check: { attrs: ["positioning", "resolve"], difficulty: 30, tag: "站位+决断" },
            success: { text: "你回防到位。协助队友守住胜果。", effects: { reputation: 6, attrs: { positioning: 1 } } },
            fail: { text: "回防稍慢。对方制造了一次险情。你后颈发凉。", effects: { stamina: -3 } } }
        ]
      },
      level: {
        text: "平局僵持到最后一刻。体能接近极限。谁先犯错谁就输。大腿在发酸。",
        choices: [
          { id: "A", text: "咬牙冲刺，最后一击", check: { attrs: ["burst", "resolve"], difficulty: 44, tag: "爆发+决断" },
            success: { text: "你榨干最后一丝力气。完成致命一击。你的腿在抖。", effects: { reputation: 12, goals: 1, attrs: { burst: 1 } } },
            fail: { text: "体力透支。动作变形。射门偏出。你跪在草皮上。", effects: { stamina: -6 } },
            critical: { text: "【灵光一闪】读秒绝杀。球进了。你甚至没力气庆祝。", effects: { reputation: 18, goals: 1, attrs: { burst: 2 } } } },
          { id: "B", text: "保存体力，拖入加时", check: { attrs: ["stamina", "iq"], difficulty: 30, tag: "耐力+球商" },
            success: { text: "你合理分配体力。把比赛拖入加时。", effects: { reputation: 4, stamina: 5, attrs: { stamina: 1 } } },
            fail: { text: "节奏被对方掌控。防线被撕开。对方再下一城。", effects: { stamina: -3 } } }
        ]
      },
      trailing: {
        text: "落后的局面下。对方反击如潮水般涌来。是搏命还是止损……",
        choices: [
          { id: "A", text: "全线压上，最后一搏", check: { attrs: ["shooting", "power"], difficulty: 46, tag: "射门+力量" },
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
          { id: "A", text: "高速前插，打穿身后", check: { attrs: ["speed", "positioning"], difficulty: 43, tag: "速度+站位" },
            success: { text: "你{elementAdj}地前插。球到人到。单刀。推射。球进了。", effects: { reputation: 12, goals: 1, attrs: { speed: 1 } } },
            fail: { text: "前插越位了。边裁举旗。你弯着腰喘气。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】你前插的时机像一把手术刀。单刀。推射。球进了。对方后卫还在转身。", effects: { reputation: 18, goals: 1, attrs: { speed: 2 } } } },
          { id: "B", text: "控住球，把时间耗完", check: { attrs: ["rhythm", "iq"], difficulty: 34, tag: "节奏+球商" },
            success: { text: "你控住球。时间一秒一秒过去。够了。", effects: { reputation: 6, attrs: { rhythm: 1 } } },
            fail: { text: "控球被断。对方反击。你后颈发凉。", effects: { stamina: -3 } } }
        ]
      },
      level: {
        text: "平局。比赛进入最后十分钟。双方体力都到了极限。每一次触球都可能是最后一次。",
        choices: [
          { id: "A", text: "致命直塞，一锤定音", check: { attrs: ["passing", "vision"], difficulty: 45, tag: "传球+视野" },
            success: { text: "你{elementAdj}地一脚直塞。球从人缝里穿过去。前锋推射。球进了。", effects: { reputation: 13, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "直塞被拦截。球权易手。你甩了甩脚。", effects: { stamina: -4 } },
            critical: { text: "【灵光一闪】致命一传。球从三个人腿缝里穿过去。前锋推射。进了。安静了一秒。", effects: { reputation: 19, assists: 1, attrs: { passing: 2 } } } },
          { id: "B", text: "自己来，禁区前沿起脚", check: { attrs: ["shooting", "resolve"], difficulty: 46, tag: "射门+决断" },
            success: { text: "你拔脚。球带着弧线砸入死角。球进了。你的腿在抖。", effects: { reputation: 14, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "射门偏出。你的脚背抽疼。时间不多了。", effects: { stamina: -5 } } }
        ]
      },
      trailing: {
        text: "落后一球。时间只剩五分钟。对方开始拖延。你必须做点什么。肺部在灼烧。",
        choices: [
          { id: "A", text: "远射，搏一个", check: { attrs: ["shooting", "power"], difficulty: 46, tag: "射门+力量" },
            success: { text: "你{elementAdj}地拔脚。球带着弧线砸入球网。扳平。你跪在草皮上。", effects: { reputation: 14, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "远射高出横梁。你的脚背抽疼。时间不多了。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】绝境远射。球带着{elementAdj}的弧线，砸入死角。你甚至没力气庆祝。", effects: { reputation: 20, goals: 1, attrs: { shooting: 2 } } } },
          { id: "B", text: "组织进攻，找队友", check: { attrs: ["passing", "iq"], difficulty: 38, tag: "传球+球商" },
            success: { text: "你冷静组织。送出关键一传。队友破门。扳平。", effects: { reputation: 10, assists: 1, attrs: { iq: 1 } } },
            fail: { text: "组织被对方识破。无功而返。你弯着腰喘气。", effects: { stamina: -4 } } }
        ]
      }
    },
    k4: {
      leading: {
        text: "决赛。领先一球。最后三分钟。对方全线压上，门将都冲到了中场。你的大腿在抽搐。",
        choices: [
          { id: "A", text: "断球后吊射空门", check: { attrs: ["shooting", "iq"], difficulty: 46, tag: "射门+球商" },
            success: { text: "你{elementAdj}地断球。抬头。门将不在。吊射。球坠入空门。你甚至没看球。", effects: { reputation: 16, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "吊射力量不足。被回追的后卫解围。你甩了甩脚。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】半场吊射。球带着弧线坠入空门。决赛。锁定胜局。你站在原地，腿在抖。", effects: { reputation: 22, goals: 1, attrs: { shooting: 2 } } } },
          { id: "B", text: "死守，把胜果守到最后一秒", check: { attrs: ["tackle", "resolve"], difficulty: 36, tag: "铲断+决断" },
            success: { text: "你死守。用身体封堵。用腿拦截。终场哨响了。你跪在草皮上。", effects: { reputation: 8, attrs: { tackle: 1 } } },
            fail: { text: "防守被突破。对方扳回一球。你后颈发凉。", effects: { stamina: -5 } } }
        ]
      },
      level: {
        text: "决赛。平局。补时最后一分钟。球权在你脚下。汗水模糊了视线。这是最后一次机会。",
        choices: [
          { id: "A", text: "致命一传，撕开防线", check: { attrs: ["passing", "vision"], difficulty: 48, tag: "传球+视野" },
            success: { text: "你{elementAdj}地一脚直塞。球从人缝里穿过去。前锋推射。球进了。决赛。绝杀。", effects: { reputation: 16, assists: 1, attrs: { passing: 1 } } },
            fail: { text: "直塞被拦截。终场哨响了。你站在原地。", effects: { stamina: -5 } },
            critical: { text: "【灵光一闪】决赛最后一传。球从三个人腿缝里穿过去。前锋推射。进了。你跪在草皮上，草腥味灌满鼻腔。", effects: { reputation: 22, assists: 1, attrs: { passing: 2 } } } },
          { id: "B", text: "自己来，远射", check: { attrs: ["shooting", "resolve"], difficulty: 48, tag: "射门+决断" },
            success: { text: "你拔脚。球带着弧线砸入死角。决赛。绝杀。你的腿在抖。", effects: { reputation: 16, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "远射偏出。你的脚背抽疼。终场哨响了。", effects: { stamina: -6 } },
            critical: { text: "【灵光一闪】决赛最后一脚。球带着{elementAdj}的弧线，砸入死角。你甚至没力气庆祝。安静了一秒。然后所有人都站起来了。", effects: { reputation: 24, goals: 1, attrs: { shooting: 2 } } } }
        ]
      },
      trailing: {
        text: "决赛。落后一球。补时。最后一次进攻。你的大腿在发酸，肺部在灼烧。这是最后的机会。",
        choices: [
          { id: "A", text: "全力一击，搏命", check: { attrs: ["shooting", "burst"], difficulty: 48, tag: "射门+爆发" },
            success: { text: "你{elementAdj}地拔脚。球带着弧线砸入球网。扳平。决赛。你跪在草皮上。", effects: { reputation: 16, goals: 1, attrs: { shooting: 1 } } },
            fail: { text: "射门偏出。终场哨响了。你躺在草皮上，盯着天。", effects: { stamina: -6 } },
            critical: { text: "【灵光一闪】决赛绝境。球带着{elementAdj}的弧线，砸入死角。扳平。你甚至没力气站起来。", effects: { reputation: 24, goals: 1, attrs: { shooting: 2 } } } },
          { id: "B", text: "冷静组织，找队友", check: { attrs: ["passing", "vision"], difficulty: 44, tag: "传球+视野" },
            success: { text: "你冷静组织。送出关键一传。队友破门。扳平。决赛。", effects: { reputation: 12, assists: 1, attrs: { vision: 1 } } },
            fail: { text: "传球被拦截。终场哨响了。你站在原地。", effects: { stamina: -5 } } }
        ]
      }
    }
  }
};
