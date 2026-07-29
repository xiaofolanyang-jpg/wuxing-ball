/* data/match_pools.js — v3.0 五人制位置/踢法事件池（由 gen_match_pools.js 生成）
 * 键名：位置_踢法（ST_冲击型 等），与 buildPoolId 的 st.position+"_"+st.playstyle 对应。
 * 每池含5个场景事件，每事件5个局面选项（attack/balanced/defense），供 runMatch 抽取。
 * 重新生成请运行工作区脚本 gen_match_pools.js，勿手改本文件。
 */
window.MATCH_POOLS = {

  "ST_冲击型": {
    desc: "反越位、单刀、暴力抽射",
    events: [
      {
        text: "你是箭头。你的活法只有一个字：冲。反越位。单刀。暴力抽射。后卫看见你就头疼。",
        sit: "attack",
        choices: [
          {"id":"A","sit":"attack","text":"暴力抽射，不讲道理","check":{"attrs":["shooting","power"],"difficulty":37,"tag":"射门+力量"},"success":{"text":"你抡圆了。一脚爆射。球像炮弹砸进网窝。门将的手套都在冒烟。","effects":{"reputation":13,"goals":1,"attrs":{"shooting":1}}},"fail":{"text":"发力过猛。球高出了横梁。","effects":{"stamina":-4}},"critical":{"text":"【灵光一闪】石破天惊。三十米外一脚轰门。球进了。全场炸了。","effects":{"reputation":22,"goals":1,"attrs":{"shooting":2,"power":1},"flags":{"keySuccess":true}}}},
          {"id":"B","sit":"attack","text":"反越位冲刺","check":{"attrs":["speed","burst"],"difficulty":34,"tag":"速度+爆发"},"success":{"text":"你启动。反越位。单刀。推射。进了。","effects":{"reputation":11,"goals":1,"attrs":{"speed":1}}},"fail":{"text":"越位了。边裁举旗。","effects":{"stamina":-4}}},
          {"id":"C","sit":"balanced","text":"冲击后回做","check":{"attrs":["passing","strength"],"difficulty":28,"tag":"传球+对抗"},"success":{"text":"你扛开后卫，回做。队友插上破门。","effects":{"reputation":8,"assists":1,"attrs":{"passing":1}}},"fail":{"text":"回做被断。","effects":{"stamina":-3}}},
          {"id":"D","sit":"balanced","text":"护球等插上","check":{"attrs":["positioning","strength"],"difficulty":27,"tag":"站位+对抗"},"success":{"text":"你护住球。等队友。再分。","effects":{"reputation":5,"attrs":{"positioning":1}}},"fail":{"text":"被挤开。球丢了。","effects":{"stamina":-3}}},
          {"id":"E","sit":"defense","text":"丢球反抢","check":{"attrs":["tackle","speed"],"difficulty":25,"tag":"铲断+速度"},"success":{"text":"你丢球反抢。掐断出球。","effects":{"reputation":5,"attrs":{"tackle":1}}},"fail":{"text":"反抢扑空。","effects":{"stamina":-4}}}
        ]
      },
      {
        text: "中场一记过顶长传。你启动的瞬间，大腿肌肉像被电流贯穿。防线在你身后。",
        sit: "attack",
        choices: [
          {"id":"F","sit":"attack","text":"全速反越位，单刀赴会","check":{"attrs":["speed","burst"],"difficulty":34,"tag":"速度+爆发"},"success":{"text":"你{elementAdj}地甩开防线。单刀。门将出击，你推射远角。进了。","effects":{"reputation":10,"goals":1,"attrs":{"speed":1}}},"fail":{"text":"边裁举旗。越位。你弯着腰喘气，鞋钉陷进泥里。","effects":{"stamina":-4}},"critical":{"text":"【灵光一闪】反越位成功。你像一枚被弹射出去的钉子，单刀破门。","effects":{"reputation":18,"goals":1,"attrs":{"speed":2},"flags":{"keySuccess":true}}}},
          {"id":"G","sit":"attack","text":"趟过门将，推空门","check":{"attrs":["dribble","resolve"],"difficulty":36,"tag":"盘带+决断"},"success":{"text":"你连门将都晃过了。推空门。球进了。","effects":{"reputation":12,"goals":1,"attrs":{"dribble":1}}},"fail":{"text":"趟大了。门将把球扑出。你懊恼地抱头。","effects":{"stamina":-4}}},
          {"id":"H","sit":"balanced","text":"回做给跟进的队友","check":{"attrs":["passing","vision"],"difficulty":28,"tag":"传球+视野"},"success":{"text":"你没单干。回做。跟进的队友推射得手。","effects":{"reputation":8,"assists":1,"attrs":{"passing":1}}},"fail":{"text":"回做力量小了。被回追的后卫破坏。","effects":{"stamina":-3}}},
          {"id":"I","sit":"balanced","text":"减速护球，等支援","check":{"attrs":["positioning","balance"],"difficulty":26,"tag":"站位+平衡"},"success":{"text":"你减速护球，等队友插上。机会还在。","effects":{"reputation":5,"attrs":{"positioning":1}}},"fail":{"text":"你一犹豫。后卫回追到位。球丢了。","effects":{"stamina":-3}}},
          {"id":"J","sit":"defense","text":"丢球反抢，掐断反击","check":{"attrs":["tackle","speed"],"difficulty":25,"tag":"铲断+速度"},"success":{"text":"单刀被扑后你反抢，没让对方打出反击。","effects":{"reputation":5,"attrs":{"tackle":1}}},"fail":{"text":"反抢扑空。对方长传反击。你回追得肺都要炸了。","effects":{"stamina":-5}}}
        ]
      },
      {
        text: "禁区前沿。你背身接到分球，转身的一瞬，面前只有半步空间。汗水顺着眉骨滑下来。",
        sit: "attack",
        choices: [
          {"id":"K","sit":"attack","text":"拔脚怒射，轰向死角","check":{"attrs":["shooting","power"],"difficulty":36,"tag":"射门+力量"},"success":{"text":"脚背吃准了部位。球带着{elementAdj}的弧线，直挂死角。门将连手都没伸。","effects":{"reputation":12,"goals":1,"attrs":{"shooting":1}}},"fail":{"text":"射门没压住。球高出横梁，飞进了后排看台。你懊恼地捶了下大腿。","effects":{"stamina":-3}},"critical":{"text":"【灵光一闪】世界波。球像一颗出膛的炮弹，砸进网窝，网绳还在颤。全场站起来。","effects":{"reputation":20,"goals":1,"attrs":{"shooting":2},"flags":{"keySuccess":true}}}},
          {"id":"L","sit":"attack","text":"调整一步，推射远角","check":{"attrs":["shooting","resolve"],"difficulty":32,"tag":"射门+决断"},"success":{"text":"你多调整了一步。推射。球贴着草皮滚入远角。稳。","effects":{"reputation":10,"goals":1,"attrs":{"shooting":1}}},"fail":{"text":"调整慢了。后卫伸脚一挡。球弹走了。","effects":{"stamina":-3}}},
          {"id":"M","sit":"balanced","text":"分给位置更好的队友","check":{"attrs":["passing","vision"],"difficulty":28,"tag":"传球+视野"},"success":{"text":"你没贪。横传。队友推射空门得手。他朝你指了指。","effects":{"reputation":7,"assists":1,"attrs":{"passing":1}}},"fail":{"text":"横传力量大了。队友没追上。球出了底线。","effects":{"stamina":-3}}},
          {"id":"N","sit":"balanced","text":"护球观察，等空当","check":{"attrs":["positioning","balance"],"difficulty":26,"tag":"站位+平衡"},"success":{"text":"你护住球，等防线露出破绽。一记直塞，队友插上造险。","effects":{"reputation":5,"attrs":{"positioning":1}}},"fail":{"text":"你被挤开了。后背撞在广告牌上，铁皮冰凉。","effects":{"stamina":-3}}},
          {"id":"O","sit":"defense","text":"丢球就地反抢","check":{"attrs":["tackle","intercept"],"difficulty":24,"tag":"铲断+拦截"},"success":{"text":"射门被封堵后你就地反抢，掐断了对方的出球。肺在灼烧。","effects":{"reputation":5,"attrs":{"tackle":1}}},"fail":{"text":"反抢扑空。对方顺势推进。你只能看着他们的背影。","effects":{"stamina":-4}}}
        ]
      },
      {
        text: "传中球划过门前。禁区里一片人仰马翻。你嗅到了落点——那是前锋的直觉。",
        sit: "attack",
        choices: [
          {"id":"P","sit":"attack","text":"抢前点，一脚捅射","check":{"attrs":["positioning","shooting"],"difficulty":33,"tag":"站位+射门"},"success":{"text":"你抢在所有人身前。脚尖一捅。球滚入近角。门将措手不及。","effects":{"reputation":11,"goals":1,"attrs":{"positioning":1}}},"fail":{"text":"你慢了一步。球被后卫先一步解围。","effects":{"stamina":-3}},"critical":{"text":"【灵光一闪】鬼魅跑位。你像从地里冒出来的，轻松推射空门。","effects":{"reputation":18,"goals":1,"attrs":{"positioning":2},"flags":{"keySuccess":true}}}},
          {"id":"Q","sit":"attack","text":"旱地拔葱，暴力头槌","check":{"attrs":["heading","balance"],"difficulty":35,"tag":"头球+平衡"},"success":{"text":"你拔地而起。额头撞上皮球的闷响。球砸入网窝。","effects":{"reputation":12,"goals":1,"attrs":{"heading":1}}},"fail":{"text":"起跳早了。皮球擦着发顶飞过。你落地时膝盖一阵钝痛。","effects":{"stamina":-4}}},
          {"id":"R","sit":"balanced","text":"头球摆渡给后点","check":{"attrs":["heading","passing"],"difficulty":29,"tag":"头球+传球"},"success":{"text":"你没贪功。头球摆渡。后点队友推射得手。","effects":{"reputation":8,"assists":1,"attrs":{"heading":1}}},"fail":{"text":"摆渡力量不对。队友伸脚没够到。","effects":{"stamina":-3}}},
          {"id":"S","sit":"balanced","text":"卡住身位，护住第二落点","check":{"attrs":["positioning","strength"],"difficulty":27,"tag":"站位+对抗"},"success":{"text":"你卡住身位，把后卫挡在身后。第二落点是你的。防线慌了。","effects":{"reputation":5,"attrs":{"positioning":1}}},"fail":{"text":"你被挤开了。球权丢了。","effects":{"stamina":-3}}},
          {"id":"T","sit":"defense","text":"回撤防备快反","check":{"attrs":["intercept","speed"],"difficulty":24,"tag":"拦截+速度"},"success":{"text":"传中被解围后对方快反。你提前回追，将球截下。","effects":{"reputation":6,"attrs":{"intercept":1}}},"fail":{"text":"回追慢了一步。对方反击造成险情。","effects":{"stamina":-4}}}
        ]
      },
      {
        text: "断球。抬头。对方全线压上，身后是一片开阔地。机会。只有三秒。",
        sit: "attack",
        choices: [
          {"id":"U","sit":"attack","text":"长途奔袭，一条龙","check":{"attrs":["speed","stamina"],"difficulty":35,"tag":"速度+耐力"},"success":{"text":"你{elementAdj}地从中场杀到禁区。过人。射门。进了。全场沸腾。","effects":{"reputation":13,"goals":1,"attrs":{"speed":1}}},"fail":{"text":"奔袭到最后，腿软了。射门偏出。","effects":{"stamina":-6}},"critical":{"text":"【灵光一闪】单骑闯关。你撕碎了整条防线。所有人都站起来了。","effects":{"reputation":20,"goals":1,"attrs":{"speed":2,"stamina":1},"flags":{"keySuccess":true}}}},
          {"id":"V","sit":"attack","text":"分球给位置更好的队友","check":{"attrs":["passing","vision"],"difficulty":29,"tag":"传球+视野"},"success":{"text":"你没贪功。分球。队友推射空门。","effects":{"reputation":9,"assists":1,"attrs":{"passing":1}}},"fail":{"text":"分球力量大了。队友没追上。","effects":{"stamina":-3}}},
          {"id":"W","sit":"balanced","text":"带球推进，吸引防守再分","check":{"attrs":["dribble","iq"],"difficulty":31,"tag":"盘带+球商"},"success":{"text":"你带球推进，吸引两人包夹，分球。队友空位破门。","effects":{"reputation":9,"assists":1,"attrs":{"dribble":1}}},"fail":{"text":"带球被断。反击夭折。","effects":{"stamina":-4}}},
          {"id":"X","sit":"balanced","text":"减速控球，稳住节奏","check":{"attrs":["rhythm","iq"],"difficulty":27,"tag":"节奏+球商"},"success":{"text":"你没急。减速控球。等队友落位。重新组织。","effects":{"reputation":5,"attrs":{"rhythm":1}}},"fail":{"text":"你一减速。对方回防到位。机会没了。","effects":{"stamina":-3}}},
          {"id":"Y","sit":"defense","text":"回追防备对方反抢","check":{"attrs":["tackle","speed"],"difficulty":25,"tag":"铲断+速度"},"success":{"text":"反击被断后你反抢，没让对方打二次反击。","effects":{"reputation":5,"attrs":{"tackle":1}}},"fail":{"text":"反抢扑空。对方长传。你回追得很狼狈。","effects":{"stamina":-5}}}
        ]
      }
    ]
  },

  "ST_支点型": {
    desc: "背身拿球、头球轰炸、做墙",
    events: [
      {
        text: "你是支点。背身。拿球。做墙。头球轰炸。你往禁区里一站，就像地上长了根。",
        sit: "balanced",
        choices: [
          {"id":"A","sit":"attack","text":"背身拿球，转身攻门","check":{"attrs":["strength","shooting"],"difficulty":34,"tag":"对抗+射门"},"success":{"text":"你背身扛住后卫。转身。抽射。球进了。","effects":{"reputation":12,"goals":1,"attrs":{"strength":1}}},"fail":{"text":"转身被卡住。球丢了。","effects":{"stamina":-4}},"critical":{"text":"【灵光一闪】你扛开两人转身爆射。球进了。后卫拿你毫无办法。","effects":{"reputation":20,"goals":1,"attrs":{"strength":2,"shooting":1},"flags":{"keySuccess":true}}}},
          {"id":"B","sit":"attack","text":"头球轰炸","check":{"attrs":["heading","balance"],"difficulty":35,"tag":"头球+平衡"},"success":{"text":"传中。你拔地而起。头槌。球砸进网窝。","effects":{"reputation":12,"goals":1,"attrs":{"heading":1}}},"fail":{"text":"头球顶偏。","effects":{"stamina":-4}}},
          {"id":"C","sit":"balanced","text":"做墙回做","check":{"attrs":["passing","strength"],"difficulty":28,"tag":"传球+对抗"},"success":{"text":"你做墙。回做。队友插上破门。","effects":{"reputation":8,"assists":1,"attrs":{"passing":1}}},"fail":{"text":"回做力量不对。","effects":{"stamina":-3}}},
          {"id":"D","sit":"balanced","text":"卡位护球","check":{"attrs":["positioning","strength"],"difficulty":27,"tag":"站位+对抗"},"success":{"text":"你卡住位置。后卫拿你没办法。","effects":{"reputation":5,"attrs":{"positioning":1}}},"fail":{"text":"被挤开。","effects":{"stamina":-3}}},
          {"id":"E","sit":"defense","text":"回防争顶解围","check":{"attrs":["heading","positioning"],"difficulty":26,"tag":"头球+站位"},"success":{"text":"对方传中。你回防头球解围。","effects":{"reputation":6,"attrs":{"heading":1}}},"fail":{"text":"没顶到。对方攻门。","effects":{"stamina":-4}}}
        ]
      },
      {
        text: "传中球划过门前。禁区里一片人仰马翻。你嗅到了落点——那是前锋的直觉。",
        sit: "attack",
        choices: [
          {"id":"F","sit":"attack","text":"抢前点，一脚捅射","check":{"attrs":["positioning","shooting"],"difficulty":33,"tag":"站位+射门"},"success":{"text":"你抢在所有人身前。脚尖一捅。球滚入近角。门将措手不及。","effects":{"reputation":11,"goals":1,"attrs":{"positioning":1}}},"fail":{"text":"你慢了一步。球被后卫先一步解围。","effects":{"stamina":-3}},"critical":{"text":"【灵光一闪】鬼魅跑位。你像从地里冒出来的，轻松推射空门。","effects":{"reputation":18,"goals":1,"attrs":{"positioning":2},"flags":{"keySuccess":true}}}},
          {"id":"G","sit":"attack","text":"旱地拔葱，暴力头槌","check":{"attrs":["heading","balance"],"difficulty":35,"tag":"头球+平衡"},"success":{"text":"你拔地而起。额头撞上皮球的闷响。球砸入网窝。","effects":{"reputation":12,"goals":1,"attrs":{"heading":1}}},"fail":{"text":"起跳早了。皮球擦着发顶飞过。你落地时膝盖一阵钝痛。","effects":{"stamina":-4}}},
          {"id":"H","sit":"balanced","text":"头球摆渡给后点","check":{"attrs":["heading","passing"],"difficulty":29,"tag":"头球+传球"},"success":{"text":"你没贪功。头球摆渡。后点队友推射得手。","effects":{"reputation":8,"assists":1,"attrs":{"heading":1}}},"fail":{"text":"摆渡力量不对。队友伸脚没够到。","effects":{"stamina":-3}}},
          {"id":"I","sit":"balanced","text":"卡住身位，护住第二落点","check":{"attrs":["positioning","strength"],"difficulty":27,"tag":"站位+对抗"},"success":{"text":"你卡住身位，把后卫挡在身后。第二落点是你的。防线慌了。","effects":{"reputation":5,"attrs":{"positioning":1}}},"fail":{"text":"你被挤开了。球权丢了。","effects":{"stamina":-3}}},
          {"id":"J","sit":"defense","text":"回撤防备快反","check":{"attrs":["intercept","speed"],"difficulty":24,"tag":"拦截+速度"},"success":{"text":"传中被解围后对方快反。你提前回追，将球截下。","effects":{"reputation":6,"attrs":{"intercept":1}}},"fail":{"text":"回追慢了一步。对方反击造成险情。","effects":{"stamina":-4}}}
        ]
      },
      {
        text: "角球。你站在禁区里。两个人夹着你。球还没开出，肘部和肩膀已经开始较劲。",
        sit: "balanced",
        choices: [
          {"id":"K","sit":"attack","text":"旱地拔葱，抢点攻门","check":{"attrs":["heading","balance"],"difficulty":34,"tag":"头球+平衡"},"success":{"text":"你拔地而起。额头闷响。球砸进网窝。两个人还挂在你身上。","effects":{"reputation":12,"goals":1,"attrs":{"heading":1}}},"fail":{"text":"起跳被干扰。头球顶偏。","effects":{"stamina":-4}},"critical":{"text":"【灵光一闪】泰山压顶。你带着两个人升空，把球砸进网窝。网绳断了三根。","effects":{"reputation":18,"goals":1,"attrs":{"heading":2},"flags":{"keySuccess":true}}}},
          {"id":"L","sit":"attack","text":"后插上，抢第二落点","check":{"attrs":["positioning","shooting"],"difficulty":31,"tag":"站位+射门"},"success":{"text":"第一点被顶出。你抢到第二落点。凌空。进了。","effects":{"reputation":11,"goals":1,"attrs":{"positioning":1}}},"fail":{"text":"第二落点没抢到。被解围。","effects":{"stamina":-3}}},
          {"id":"M","sit":"balanced","text":"头球摆渡找队友","check":{"attrs":["heading","passing"],"difficulty":29,"tag":"头球+传球"},"success":{"text":"你头球摆渡。后点队友推射得手。","effects":{"reputation":8,"assists":1,"attrs":{"heading":1}}},"fail":{"text":"摆渡力量不对。队友没够到。","effects":{"stamina":-3}}},
          {"id":"N","sit":"balanced","text":"卡住身位护球","check":{"attrs":["positioning","strength"],"difficulty":27,"tag":"站位+对抗"},"success":{"text":"你卡住身位。第二落点是你的。还有机会。","effects":{"reputation":5,"attrs":{"positioning":1}}},"fail":{"text":"你被挤开。球权丢了。","effects":{"stamina":-3}}},
          {"id":"O","sit":"defense","text":"回防防备快反","check":{"attrs":["intercept","speed"],"difficulty":24,"tag":"拦截+速度"},"success":{"text":"角球被解围后对方快反。你提前回追截下。","effects":{"reputation":6,"attrs":{"intercept":1}}},"fail":{"text":"回追慢了一步。对方反击造险。","effects":{"stamina":-4}}}
        ]
      },
      {
        text: "禁区前沿。你背身接到分球，转身的一瞬，面前只有半步空间。汗水顺着眉骨滑下来。",
        sit: "attack",
        choices: [
          {"id":"P","sit":"attack","text":"拔脚怒射，轰向死角","check":{"attrs":["shooting","power"],"difficulty":36,"tag":"射门+力量"},"success":{"text":"脚背吃准了部位。球带着{elementAdj}的弧线，直挂死角。门将连手都没伸。","effects":{"reputation":12,"goals":1,"attrs":{"shooting":1}}},"fail":{"text":"射门没压住。球高出横梁，飞进了后排看台。你懊恼地捶了下大腿。","effects":{"stamina":-3}},"critical":{"text":"【灵光一闪】世界波。球像一颗出膛的炮弹，砸进网窝，网绳还在颤。全场站起来。","effects":{"reputation":20,"goals":1,"attrs":{"shooting":2},"flags":{"keySuccess":true}}}},
          {"id":"Q","sit":"attack","text":"调整一步，推射远角","check":{"attrs":["shooting","resolve"],"difficulty":32,"tag":"射门+决断"},"success":{"text":"你多调整了一步。推射。球贴着草皮滚入远角。稳。","effects":{"reputation":10,"goals":1,"attrs":{"shooting":1}}},"fail":{"text":"调整慢了。后卫伸脚一挡。球弹走了。","effects":{"stamina":-3}}},
          {"id":"R","sit":"balanced","text":"分给位置更好的队友","check":{"attrs":["passing","vision"],"difficulty":28,"tag":"传球+视野"},"success":{"text":"你没贪。横传。队友推射空门得手。他朝你指了指。","effects":{"reputation":7,"assists":1,"attrs":{"passing":1}}},"fail":{"text":"横传力量大了。队友没追上。球出了底线。","effects":{"stamina":-3}}},
          {"id":"S","sit":"balanced","text":"护球观察，等空当","check":{"attrs":["positioning","balance"],"difficulty":26,"tag":"站位+平衡"},"success":{"text":"你护住球，等防线露出破绽。一记直塞，队友插上造险。","effects":{"reputation":5,"attrs":{"positioning":1}}},"fail":{"text":"你被挤开了。后背撞在广告牌上，铁皮冰凉。","effects":{"stamina":-3}}},
          {"id":"T","sit":"defense","text":"丢球就地反抢","check":{"attrs":["tackle","intercept"],"difficulty":24,"tag":"铲断+拦截"},"success":{"text":"射门被封堵后你就地反抢，掐断了对方的出球。肺在灼烧。","effects":{"reputation":5,"attrs":{"tackle":1}}},"fail":{"text":"反抢扑空。对方顺势推进。你只能看着他们的背影。","effects":{"stamina":-4}}}
        ]
      },
      {
        text: "对方反击。皮球打穿了整条防线，对方前锋单刀直入。你是最近的回追者。风灌进耳朵。",
        sit: "defense",
        choices: [
          {"id":"U","sit":"defense","text":"全速回追，背后滑铲","check":{"attrs":["tackle","speed"],"difficulty":33,"tag":"铲断+速度"},"success":{"text":"你{elementAdj}地拍马赶到。一记干净的滑铲，球捅出底线。","effects":{"reputation":8,"attrs":{"tackle":1}}},"fail":{"text":"回追慢了一步。滑铲落空。对方晃过门将得分。","effects":{"stamina":-6}},"critical":{"text":"【灵光一闪】铁壁回追。你的滑铲把球和人一起留在了底线外。","effects":{"reputation":14,"attrs":{"tackle":2,"speed":1},"flags":{"keySuccess":true}}}},
          {"id":"V","sit":"defense","text":"用速度缠住他","check":{"attrs":["speed","stamina"],"difficulty":30,"tag":"速度+耐力"},"success":{"text":"你咬牙回追，死死缠住他。他甩不开你，只能减速。","effects":{"reputation":7,"attrs":{"speed":1}}},"fail":{"text":"你追了，但腿灌了铅。他一步抹过你。","effects":{"stamina":-6}}},
          {"id":"W","sit":"defense","text":"卡住身位，封射门角度","check":{"attrs":["positioning","balance"],"difficulty":29,"tag":"站位+平衡"},"success":{"text":"你边退边卡住身位。对方被迫走外线，射门偏出。","effects":{"reputation":6,"attrs":{"positioning":1}}},"fail":{"text":"对方一个变向，你重心丢了。他推射得手。","effects":{"stamina":-5}}},
          {"id":"X","sit":"balanced","text":"断球后长传反击","check":{"attrs":["passing","vision"],"difficulty":28,"tag":"传球+视野"},"success":{"text":"你断球后直接长传找前场。化守为攻。","effects":{"reputation":7,"attrs":{"passing":1}}},"fail":{"text":"长传力量大了。出了边线。","effects":{"stamina":-4}}},
          {"id":"Y","sit":"defense","text":"赌一把，连人带球拦下","check":{"attrs":["resolve","power"],"difficulty":33,"tag":"决断+力量"},"success":{"text":"你豁出去了。一个肩撞把人球一起拦下。球权是你的。","effects":{"reputation":6,"attrs":{"resolve":1}}},"fail":{"text":"你扑得太凶。对方一晃，你摔在草皮上。","effects":{"stamina":-6}}}
        ]
      }
    ]
  },

  "ST_伪九型": {
    desc: "回撤组织、致命一传、后插上",
    events: [
      {
        text: "你是伪九。名义上是中锋，实际回撤组织。你不在禁区里等球——你到中场拿球，把防线扯出来。",
        sit: "balanced",
        choices: [
          {"id":"A","sit":"balanced","text":"回撤拿球，致命直塞","check":{"attrs":["passing","vision"],"difficulty":33,"tag":"传球+视野"},"success":{"text":"你回撤到中场。拿球。一记直塞。队友单刀破门。","effects":{"reputation":10,"assists":1,"attrs":{"passing":1}}},"fail":{"text":"直塞被断。","effects":{"stamina":-3}},"critical":{"text":"【灵光一闪】你回撤扯出空间，一记手术刀直塞撕碎防线。","effects":{"reputation":18,"assists":1,"attrs":{"passing":2,"vision":1},"flags":{"keySuccess":true}}}},
          {"id":"B","sit":"attack","text":"后插上攻门","check":{"attrs":["shooting","positioning"],"difficulty":32,"tag":"射门+站位"},"success":{"text":"你回撤后再插上。接球。射门。进了。","effects":{"reputation":11,"goals":1,"attrs":{"shooting":1}}},"fail":{"text":"插上慢了。球被解围。","effects":{"stamina":-4}}},
          {"id":"C","sit":"balanced","text":"调度转移","check":{"attrs":["passing","rhythm"],"difficulty":29,"tag":"传球+节奏"},"success":{"text":"你调度。转移弱侧。队友内切破门。","effects":{"reputation":8,"assists":1,"attrs":{"passing":1}}},"fail":{"text":"转移出界。","effects":{"stamina":-3}}},
          {"id":"D","sit":"balanced","text":"带球推进","check":{"attrs":["dribble","iq"],"difficulty":30,"tag":"盘带+球商"},"success":{"text":"你带球推进。撕开防线。分球造险。","effects":{"reputation":7,"attrs":{"dribble":1}}},"fail":{"text":"带球被断。","effects":{"stamina":-4}}},
          {"id":"E","sit":"defense","text":"丢球反抢","check":{"attrs":["tackle","iq"],"difficulty":25,"tag":"铲断+球商"},"success":{"text":"你丢球反抢。扼杀反击。","effects":{"reputation":5,"attrs":{"tackle":1}}},"fail":{"text":"反抢扑空。","effects":{"stamina":-4}}}
        ]
      },
      {
        text: "中场。你拿球。抬头的瞬间，你看见了——防线身后那道稍纵即逝的缝隙。",
        sit: "balanced",
        choices: [
          {"id":"F","sit":"attack","text":"一记手术刀直塞","check":{"attrs":["passing","vision"],"difficulty":33,"tag":"传球+视野"},"success":{"text":"你脚弓一推。球从三人缝隙里穿过。队友单刀。进了。","effects":{"reputation":10,"assists":1,"attrs":{"passing":1}}},"fail":{"text":"直塞意图太明显。被后腰伸脚挡下。","effects":{"stamina":-3}},"critical":{"text":"【灵光一闪】水银泻地。皮球划出一道不可思议的弧线，队友轻松推射。","effects":{"reputation":18,"assists":1,"attrs":{"passing":2,"vision":1},"flags":{"keySuccess":true}}}},
          {"id":"G","sit":"attack","text":"斜长传转移弱侧","check":{"attrs":["passing","rhythm"],"difficulty":30,"tag":"传球+节奏"},"success":{"text":"你一记斜长传。弱侧队友得球，内切破门。","effects":{"reputation":9,"assists":1,"attrs":{"passing":1}}},"fail":{"text":"长传力量大了。直接出了边线。","effects":{"stamina":-3}}},
          {"id":"H","sit":"balanced","text":"横传调度，扯动防线","check":{"attrs":["passing","iq"],"difficulty":27,"tag":"传球+球商"},"success":{"text":"你不急。横传调度。防线被来回扯动，露出空当。","effects":{"reputation":6,"attrs":{"iq":1}}},"fail":{"text":"横传被预判。对方断球反击。","effects":{"stamina":-3}}},
          {"id":"I","sit":"balanced","text":"自己带球推进","check":{"attrs":["dribble","resolve"],"difficulty":30,"tag":"盘带+决断"},"success":{"text":"你突然带球推进。撕开防线。分球。队友造险。","effects":{"reputation":7,"attrs":{"dribble":1}}},"fail":{"text":"带球被围抢。三人包夹。球丢了。","effects":{"stamina":-4}}},
          {"id":"J","sit":"defense","text":"丢球反抢，扼杀反击","check":{"attrs":["tackle","iq"],"difficulty":25,"tag":"铲断+球商"},"success":{"text":"传球被断后你反抢，扼杀了对方的反击。","effects":{"reputation":5,"attrs":{"tackle":1}}},"fail":{"text":"反抢扑空。对方推进。你回追得很狼狈。","effects":{"stamina":-4}}}
        ]
      },
      {
        text: "禁区前沿。你背身接到分球，转身的一瞬，面前只有半步空间。汗水顺着眉骨滑下来。",
        sit: "attack",
        choices: [
          {"id":"K","sit":"attack","text":"拔脚怒射，轰向死角","check":{"attrs":["shooting","power"],"difficulty":36,"tag":"射门+力量"},"success":{"text":"脚背吃准了部位。球带着{elementAdj}的弧线，直挂死角。门将连手都没伸。","effects":{"reputation":12,"goals":1,"attrs":{"shooting":1}}},"fail":{"text":"射门没压住。球高出横梁，飞进了后排看台。你懊恼地捶了下大腿。","effects":{"stamina":-3}},"critical":{"text":"【灵光一闪】世界波。球像一颗出膛的炮弹，砸进网窝，网绳还在颤。全场站起来。","effects":{"reputation":20,"goals":1,"attrs":{"shooting":2},"flags":{"keySuccess":true}}}},
          {"id":"L","sit":"attack","text":"调整一步，推射远角","check":{"attrs":["shooting","resolve"],"difficulty":32,"tag":"射门+决断"},"success":{"text":"你多调整了一步。推射。球贴着草皮滚入远角。稳。","effects":{"reputation":10,"goals":1,"attrs":{"shooting":1}}},"fail":{"text":"调整慢了。后卫伸脚一挡。球弹走了。","effects":{"stamina":-3}}},
          {"id":"M","sit":"balanced","text":"分给位置更好的队友","check":{"attrs":["passing","vision"],"difficulty":28,"tag":"传球+视野"},"success":{"text":"你没贪。横传。队友推射空门得手。他朝你指了指。","effects":{"reputation":7,"assists":1,"attrs":{"passing":1}}},"fail":{"text":"横传力量大了。队友没追上。球出了底线。","effects":{"stamina":-3}}},
          {"id":"N","sit":"balanced","text":"护球观察，等空当","check":{"attrs":["positioning","balance"],"difficulty":26,"tag":"站位+平衡"},"success":{"text":"你护住球，等防线露出破绽。一记直塞，队友插上造险。","effects":{"reputation":5,"attrs":{"positioning":1}}},"fail":{"text":"你被挤开了。后背撞在广告牌上，铁皮冰凉。","effects":{"stamina":-3}}},
          {"id":"O","sit":"defense","text":"丢球就地反抢","check":{"attrs":["tackle","intercept"],"difficulty":24,"tag":"铲断+拦截"},"success":{"text":"射门被封堵后你就地反抢，掐断了对方的出球。肺在灼烧。","effects":{"reputation":5,"attrs":{"tackle":1}}},"fail":{"text":"反抢扑空。对方顺势推进。你只能看着他们的背影。","effects":{"stamina":-4}}}
        ]
      },
      {
        text: "断球。抬头。对方全线压上，身后是一片开阔地。机会。只有三秒。",
        sit: "attack",
        choices: [
          {"id":"P","sit":"attack","text":"长途奔袭，一条龙","check":{"attrs":["speed","stamina"],"difficulty":35,"tag":"速度+耐力"},"success":{"text":"你{elementAdj}地从中场杀到禁区。过人。射门。进了。全场沸腾。","effects":{"reputation":13,"goals":1,"attrs":{"speed":1}}},"fail":{"text":"奔袭到最后，腿软了。射门偏出。","effects":{"stamina":-6}},"critical":{"text":"【灵光一闪】单骑闯关。你撕碎了整条防线。所有人都站起来了。","effects":{"reputation":20,"goals":1,"attrs":{"speed":2,"stamina":1},"flags":{"keySuccess":true}}}},
          {"id":"Q","sit":"attack","text":"分球给位置更好的队友","check":{"attrs":["passing","vision"],"difficulty":29,"tag":"传球+视野"},"success":{"text":"你没贪功。分球。队友推射空门。","effects":{"reputation":9,"assists":1,"attrs":{"passing":1}}},"fail":{"text":"分球力量大了。队友没追上。","effects":{"stamina":-3}}},
          {"id":"R","sit":"balanced","text":"带球推进，吸引防守再分","check":{"attrs":["dribble","iq"],"difficulty":31,"tag":"盘带+球商"},"success":{"text":"你带球推进，吸引两人包夹，分球。队友空位破门。","effects":{"reputation":9,"assists":1,"attrs":{"dribble":1}}},"fail":{"text":"带球被断。反击夭折。","effects":{"stamina":-4}}},
          {"id":"S","sit":"balanced","text":"减速控球，稳住节奏","check":{"attrs":["rhythm","iq"],"difficulty":27,"tag":"节奏+球商"},"success":{"text":"你没急。减速控球。等队友落位。重新组织。","effects":{"reputation":5,"attrs":{"rhythm":1}}},"fail":{"text":"你一减速。对方回防到位。机会没了。","effects":{"stamina":-3}}},
          {"id":"T","sit":"defense","text":"回追防备对方反抢","check":{"attrs":["tackle","speed"],"difficulty":25,"tag":"铲断+速度"},"success":{"text":"反击被断后你反抢，没让对方打二次反击。","effects":{"reputation":5,"attrs":{"tackle":1}}},"fail":{"text":"反抢扑空。对方长传。你回追得很狼狈。","effects":{"stamina":-5}}}
        ]
      },
      {
        text: "传中球划过门前。禁区里一片人仰马翻。你嗅到了落点——那是前锋的直觉。",
        sit: "attack",
        choices: [
          {"id":"U","sit":"attack","text":"抢前点，一脚捅射","check":{"attrs":["positioning","shooting"],"difficulty":33,"tag":"站位+射门"},"success":{"text":"你抢在所有人身前。脚尖一捅。球滚入近角。门将措手不及。","effects":{"reputation":11,"goals":1,"attrs":{"positioning":1}}},"fail":{"text":"你慢了一步。球被后卫先一步解围。","effects":{"stamina":-3}},"critical":{"text":"【灵光一闪】鬼魅跑位。你像从地里冒出来的，轻松推射空门。","effects":{"reputation":18,"goals":1,"attrs":{"positioning":2},"flags":{"keySuccess":true}}}},
          {"id":"V","sit":"attack","text":"旱地拔葱，暴力头槌","check":{"attrs":["heading","balance"],"difficulty":35,"tag":"头球+平衡"},"success":{"text":"你拔地而起。额头撞上皮球的闷响。球砸入网窝。","effects":{"reputation":12,"goals":1,"attrs":{"heading":1}}},"fail":{"text":"起跳早了。皮球擦着发顶飞过。你落地时膝盖一阵钝痛。","effects":{"stamina":-4}}},
          {"id":"W","sit":"balanced","text":"头球摆渡给后点","check":{"attrs":["heading","passing"],"difficulty":29,"tag":"头球+传球"},"success":{"text":"你没贪功。头球摆渡。后点队友推射得手。","effects":{"reputation":8,"assists":1,"attrs":{"heading":1}}},"fail":{"text":"摆渡力量不对。队友伸脚没够到。","effects":{"stamina":-3}}},
          {"id":"X","sit":"balanced","text":"卡住身位，护住第二落点","check":{"attrs":["positioning","strength"],"difficulty":27,"tag":"站位+对抗"},"success":{"text":"你卡住身位，把后卫挡在身后。第二落点是你的。防线慌了。","effects":{"reputation":5,"attrs":{"positioning":1}}},"fail":{"text":"你被挤开了。球权丢了。","effects":{"stamina":-3}}},
          {"id":"Y","sit":"defense","text":"回撤防备快反","check":{"attrs":["intercept","speed"],"difficulty":24,"tag":"拦截+速度"},"success":{"text":"传中被解围后对方快反。你提前回追，将球截下。","effects":{"reputation":6,"attrs":{"intercept":1}}},"fail":{"text":"回追慢了一步。对方反击造成险情。","effects":{"stamina":-4}}}
        ]
      }
    ]
  },

  "MF_绞杀型": {
    desc: "铲断拦截、中场扫荡",
    events: [
      {
        text: "你是中场的绞肉机。铲断。拦截。扫荡。对方的组织核心看见你就发怵。",
        sit: "defense",
        choices: [
          {"id":"A","sit":"defense","text":"凶狠铲断","check":{"attrs":["tackle","strength"],"difficulty":34,"tag":"铲断+对抗"},"success":{"text":"你一脚凶狠的铲断。连球带人。对方核心倒在地上。球权回来。","effects":{"reputation":9,"attrs":{"tackle":1}}},"fail":{"text":"铲空了。他抹过去了。","effects":{"stamina":-5}},"critical":{"text":"【灵光一闪】你像一道铁闸，把对方核心盯得全场隐身。","effects":{"reputation":15,"attrs":{"tackle":2,"strength":1},"flags":{"keySuccess":true}}}},
          {"id":"B","sit":"defense","text":"贴身盯防核心","check":{"attrs":["strength","pressure"],"difficulty":31,"tag":"对抗+抗压"},"success":{"text":"你贴住对方核心。他转不了身。组织瘫痪。","effects":{"reputation":7,"attrs":{"strength":1}}},"fail":{"text":"被他摆脱。","effects":{"stamina":-5}}},
          {"id":"C","sit":"balanced","text":"断球后长传反击","check":{"attrs":["passing","vision"],"difficulty":29,"tag":"传球+视野"},"success":{"text":"你断球后长传。发动快反。","effects":{"reputation":7,"attrs":{"passing":1}}},"fail":{"text":"长传出界。","effects":{"stamina":-4}}},
          {"id":"D","sit":"defense","text":"卡住传球线路","check":{"attrs":["positioning","iq"],"difficulty":28,"tag":"站位+球商"},"success":{"text":"你卡住线路。对方被迫回传。","effects":{"reputation":6,"attrs":{"positioning":1}}},"fail":{"text":"卡错位置。被打穿。","effects":{"stamina":-4}}},
          {"id":"E","sit":"attack","text":"断球后插上远射","check":{"attrs":["shooting","resolve"],"difficulty":31,"tag":"射门+决断"},"success":{"text":"你断球后插上。远射。球进了。","effects":{"reputation":10,"goals":1,"attrs":{"shooting":1}}},"fail":{"text":"远射打飞。","effects":{"stamina":-4}}}
        ]
      },
      {
        text: "对方推进。皮球经过中场。你是那道闸。对手的十号正带球逼近。",
        sit: "defense",
        choices: [
          {"id":"F","sit":"defense","text":"正面铲断","check":{"attrs":["tackle","strength"],"difficulty":32,"tag":"铲断+对抗"},"success":{"text":"你{elementAdj}地一脚铲断。连球带人。干净。球权回来了。","effects":{"reputation":8,"attrs":{"tackle":1}}},"fail":{"text":"铲空了。他抹过去了。你摔在草皮上。","effects":{"stamina":-5}},"critical":{"text":"【灵光一闪】铁壁。他连变两次向，你纹丝不动，看准时机一脚断球。","effects":{"reputation":14,"attrs":{"tackle":2},"flags":{"keySuccess":true}}}},
          {"id":"G","sit":"defense","text":"卡住线路，逼他回传","check":{"attrs":["positioning","iq"],"difficulty":28,"tag":"站位+球商"},"success":{"text":"你没贸然出脚。卡住传球线路。他被迫回传。危机解除。","effects":{"reputation":6,"attrs":{"positioning":1}}},"fail":{"text":"你卡错了位置。他直塞打穿。","effects":{"stamina":-4}}},
          {"id":"H","sit":"balanced","text":"断球后直接发动反击","check":{"attrs":["passing","vision"],"difficulty":29,"tag":"传球+视野"},"success":{"text":"你断球后不停球，直接长传找前场。队友险些单刀。","effects":{"reputation":7,"attrs":{"passing":1}}},"fail":{"text":"断球后长传力量大了。出了边线。","effects":{"stamina":-4}}},
          {"id":"I","sit":"defense","text":"贴身缠斗，不让他转身","check":{"attrs":["strength","pressure"],"difficulty":30,"tag":"对抗+抗压"},"success":{"text":"你贴住他。用身体。他转不了身。只能回传。","effects":{"reputation":6,"attrs":{"strength":1}}},"fail":{"text":"你贴得太紧。他一个转身把你过了。","effects":{"stamina":-5}}},
          {"id":"J","sit":"attack","text":"断球后自己带球推进","check":{"attrs":["dribble","resolve"],"difficulty":30,"tag":"盘带+决断"},"success":{"text":"你断球后带球推进。杀到前场。分球。造险。","effects":{"reputation":7,"attrs":{"dribble":1}}},"fail":{"text":"带球推进被断。对方反抢。","effects":{"stamina":-4}}}
        ]
      },
      {
        text: "对方反击。皮球打穿了整条防线，对方前锋单刀直入。你是最近的回追者。风灌进耳朵。",
        sit: "defense",
        choices: [
          {"id":"K","sit":"defense","text":"全速回追，背后滑铲","check":{"attrs":["tackle","speed"],"difficulty":33,"tag":"铲断+速度"},"success":{"text":"你{elementAdj}地拍马赶到。一记干净的滑铲，球捅出底线。","effects":{"reputation":8,"attrs":{"tackle":1}}},"fail":{"text":"回追慢了一步。滑铲落空。对方晃过门将得分。","effects":{"stamina":-6}},"critical":{"text":"【灵光一闪】铁壁回追。你的滑铲把球和人一起留在了底线外。","effects":{"reputation":14,"attrs":{"tackle":2,"speed":1},"flags":{"keySuccess":true}}}},
          {"id":"L","sit":"defense","text":"用速度缠住他","check":{"attrs":["speed","stamina"],"difficulty":30,"tag":"速度+耐力"},"success":{"text":"你咬牙回追，死死缠住他。他甩不开你，只能减速。","effects":{"reputation":7,"attrs":{"speed":1}}},"fail":{"text":"你追了，但腿灌了铅。他一步抹过你。","effects":{"stamina":-6}}},
          {"id":"M","sit":"defense","text":"卡住身位，封射门角度","check":{"attrs":["positioning","balance"],"difficulty":29,"tag":"站位+平衡"},"success":{"text":"你边退边卡住身位。对方被迫走外线，射门偏出。","effects":{"reputation":6,"attrs":{"positioning":1}}},"fail":{"text":"对方一个变向，你重心丢了。他推射得手。","effects":{"stamina":-5}}},
          {"id":"N","sit":"balanced","text":"断球后长传反击","check":{"attrs":["passing","vision"],"difficulty":28,"tag":"传球+视野"},"success":{"text":"你断球后直接长传找前场。化守为攻。","effects":{"reputation":7,"attrs":{"passing":1}}},"fail":{"text":"长传力量大了。出了边线。","effects":{"stamina":-4}}},
          {"id":"O","sit":"defense","text":"赌一把，连人带球拦下","check":{"attrs":["resolve","power"],"difficulty":33,"tag":"决断+力量"},"success":{"text":"你豁出去了。一个肩撞把人球一起拦下。球权是你的。","effects":{"reputation":6,"attrs":{"resolve":1}}},"fail":{"text":"你扑得太凶。对方一晃，你摔在草皮上。","effects":{"stamina":-6}}}
        ]
      },
      {
        text: "中场。你拿球。抬头的瞬间，你看见了——防线身后那道稍纵即逝的缝隙。",
        sit: "balanced",
        choices: [
          {"id":"P","sit":"attack","text":"一记手术刀直塞","check":{"attrs":["passing","vision"],"difficulty":33,"tag":"传球+视野"},"success":{"text":"你脚弓一推。球从三人缝隙里穿过。队友单刀。进了。","effects":{"reputation":10,"assists":1,"attrs":{"passing":1}}},"fail":{"text":"直塞意图太明显。被后腰伸脚挡下。","effects":{"stamina":-3}},"critical":{"text":"【灵光一闪】水银泻地。皮球划出一道不可思议的弧线，队友轻松推射。","effects":{"reputation":18,"assists":1,"attrs":{"passing":2,"vision":1},"flags":{"keySuccess":true}}}},
          {"id":"Q","sit":"attack","text":"斜长传转移弱侧","check":{"attrs":["passing","rhythm"],"difficulty":30,"tag":"传球+节奏"},"success":{"text":"你一记斜长传。弱侧队友得球，内切破门。","effects":{"reputation":9,"assists":1,"attrs":{"passing":1}}},"fail":{"text":"长传力量大了。直接出了边线。","effects":{"stamina":-3}}},
          {"id":"R","sit":"balanced","text":"横传调度，扯动防线","check":{"attrs":["passing","iq"],"difficulty":27,"tag":"传球+球商"},"success":{"text":"你不急。横传调度。防线被来回扯动，露出空当。","effects":{"reputation":6,"attrs":{"iq":1}}},"fail":{"text":"横传被预判。对方断球反击。","effects":{"stamina":-3}}},
          {"id":"S","sit":"balanced","text":"自己带球推进","check":{"attrs":["dribble","resolve"],"difficulty":30,"tag":"盘带+决断"},"success":{"text":"你突然带球推进。撕开防线。分球。队友造险。","effects":{"reputation":7,"attrs":{"dribble":1}}},"fail":{"text":"带球被围抢。三人包夹。球丢了。","effects":{"stamina":-4}}},
          {"id":"T","sit":"defense","text":"丢球反抢，扼杀反击","check":{"attrs":["tackle","iq"],"difficulty":25,"tag":"铲断+球商"},"success":{"text":"传球被断后你反抢，扼杀了对方的反击。","effects":{"reputation":5,"attrs":{"tackle":1}}},"fail":{"text":"反抢扑空。对方推进。你回追得很狼狈。","effects":{"stamina":-4}}}
        ]
      },
      {
        text: "断球。抬头。对方全线压上，身后是一片开阔地。机会。只有三秒。",
        sit: "attack",
        choices: [
          {"id":"U","sit":"attack","text":"长途奔袭，一条龙","check":{"attrs":["speed","stamina"],"difficulty":35,"tag":"速度+耐力"},"success":{"text":"你{elementAdj}地从中场杀到禁区。过人。射门。进了。全场沸腾。","effects":{"reputation":13,"goals":1,"attrs":{"speed":1}}},"fail":{"text":"奔袭到最后，腿软了。射门偏出。","effects":{"stamina":-6}},"critical":{"text":"【灵光一闪】单骑闯关。你撕碎了整条防线。所有人都站起来了。","effects":{"reputation":20,"goals":1,"attrs":{"speed":2,"stamina":1},"flags":{"keySuccess":true}}}},
          {"id":"V","sit":"attack","text":"分球给位置更好的队友","check":{"attrs":["passing","vision"],"difficulty":29,"tag":"传球+视野"},"success":{"text":"你没贪功。分球。队友推射空门。","effects":{"reputation":9,"assists":1,"attrs":{"passing":1}}},"fail":{"text":"分球力量大了。队友没追上。","effects":{"stamina":-3}}},
          {"id":"W","sit":"balanced","text":"带球推进，吸引防守再分","check":{"attrs":["dribble","iq"],"difficulty":31,"tag":"盘带+球商"},"success":{"text":"你带球推进，吸引两人包夹，分球。队友空位破门。","effects":{"reputation":9,"assists":1,"attrs":{"dribble":1}}},"fail":{"text":"带球被断。反击夭折。","effects":{"stamina":-4}}},
          {"id":"X","sit":"balanced","text":"减速控球，稳住节奏","check":{"attrs":["rhythm","iq"],"difficulty":27,"tag":"节奏+球商"},"success":{"text":"你没急。减速控球。等队友落位。重新组织。","effects":{"reputation":5,"attrs":{"rhythm":1}}},"fail":{"text":"你一减速。对方回防到位。机会没了。","effects":{"stamina":-3}}},
          {"id":"Y","sit":"defense","text":"回追防备对方反抢","check":{"attrs":["tackle","speed"],"difficulty":25,"tag":"铲断+速度"},"success":{"text":"反击被断后你反抢，没让对方打二次反击。","effects":{"reputation":5,"attrs":{"tackle":1}}},"fail":{"text":"反抢扑空。对方长传。你回追得很狼狈。","effects":{"stamina":-5}}}
        ]
      }
    ]
  },

  "MF_节拍器": {
    desc: "长传调度、控制节奏",
    events: [
      {
        text: "你是节拍器。长传调度。控制节奏。球在你脚下，比赛的快慢由你说了算。",
        sit: "balanced",
        choices: [
          {"id":"A","sit":"balanced","text":"长传调度，转移弱侧","check":{"attrs":["passing","vision"],"difficulty":32,"tag":"传球+视野"},"success":{"text":"你一记长传。精准转移弱侧。队友内切破门。","effects":{"reputation":9,"assists":1,"attrs":{"passing":1}}},"fail":{"text":"长传力量大了。出界。","effects":{"stamina":-3}},"critical":{"text":"【灵光一闪】你的长传像装了导航，每一次转移都恰到好处。","effects":{"reputation":16,"assists":1,"attrs":{"passing":2,"vision":1},"flags":{"keySuccess":true}}}},
          {"id":"B","sit":"balanced","text":"控制节奏，突然提速","check":{"attrs":["rhythm","iq"],"difficulty":30,"tag":"节奏+球商"},"success":{"text":"你控住节奏。突然提速。一记直塞。队友单刀。","effects":{"reputation":9,"assists":1,"attrs":{"rhythm":1}}},"fail":{"text":"提速被预判。被断。","effects":{"stamina":-3}}},
          {"id":"C","sit":"attack","text":"后插上远射","check":{"attrs":["shooting","resolve"],"difficulty":31,"tag":"射门+决断"},"success":{"text":"你后插上。禁区前沿远射。球进了。","effects":{"reputation":10,"goals":1,"attrs":{"shooting":1}}},"fail":{"text":"远射打偏。","effects":{"stamina":-4}}},
          {"id":"D","sit":"balanced","text":"横传扯动防线","check":{"attrs":["passing","iq"],"difficulty":27,"tag":"传球+球商"},"success":{"text":"你横传调度。防线被扯动。露出空当。","effects":{"reputation":6,"attrs":{"iq":1}}},"fail":{"text":"横传被断。","effects":{"stamina":-3}}},
          {"id":"E","sit":"defense","text":"丢球反抢","check":{"attrs":["tackle","iq"],"difficulty":25,"tag":"铲断+球商"},"success":{"text":"你丢球反抢。扼杀反击。","effects":{"reputation":5,"attrs":{"tackle":1}}},"fail":{"text":"反抢扑空。","effects":{"stamina":-4}}}
        ]
      },
      {
        text: "中场。你拿球。抬头的瞬间，你看见了——防线身后那道稍纵即逝的缝隙。",
        sit: "balanced",
        choices: [
          {"id":"F","sit":"attack","text":"一记手术刀直塞","check":{"attrs":["passing","vision"],"difficulty":33,"tag":"传球+视野"},"success":{"text":"你脚弓一推。球从三人缝隙里穿过。队友单刀。进了。","effects":{"reputation":10,"assists":1,"attrs":{"passing":1}}},"fail":{"text":"直塞意图太明显。被后腰伸脚挡下。","effects":{"stamina":-3}},"critical":{"text":"【灵光一闪】水银泻地。皮球划出一道不可思议的弧线，队友轻松推射。","effects":{"reputation":18,"assists":1,"attrs":{"passing":2,"vision":1},"flags":{"keySuccess":true}}}},
          {"id":"G","sit":"attack","text":"斜长传转移弱侧","check":{"attrs":["passing","rhythm"],"difficulty":30,"tag":"传球+节奏"},"success":{"text":"你一记斜长传。弱侧队友得球，内切破门。","effects":{"reputation":9,"assists":1,"attrs":{"passing":1}}},"fail":{"text":"长传力量大了。直接出了边线。","effects":{"stamina":-3}}},
          {"id":"H","sit":"balanced","text":"横传调度，扯动防线","check":{"attrs":["passing","iq"],"difficulty":27,"tag":"传球+球商"},"success":{"text":"你不急。横传调度。防线被来回扯动，露出空当。","effects":{"reputation":6,"attrs":{"iq":1}}},"fail":{"text":"横传被预判。对方断球反击。","effects":{"stamina":-3}}},
          {"id":"I","sit":"balanced","text":"自己带球推进","check":{"attrs":["dribble","resolve"],"difficulty":30,"tag":"盘带+决断"},"success":{"text":"你突然带球推进。撕开防线。分球。队友造险。","effects":{"reputation":7,"attrs":{"dribble":1}}},"fail":{"text":"带球被围抢。三人包夹。球丢了。","effects":{"stamina":-4}}},
          {"id":"J","sit":"defense","text":"丢球反抢，扼杀反击","check":{"attrs":["tackle","iq"],"difficulty":25,"tag":"铲断+球商"},"success":{"text":"传球被断后你反抢，扼杀了对方的反击。","effects":{"reputation":5,"attrs":{"tackle":1}}},"fail":{"text":"反抢扑空。对方推进。你回追得很狼狈。","effects":{"stamina":-4}}}
        ]
      },
      {
        text: "对方推进。皮球经过中场。你是那道闸。对手的十号正带球逼近。",
        sit: "defense",
        choices: [
          {"id":"K","sit":"defense","text":"正面铲断","check":{"attrs":["tackle","strength"],"difficulty":32,"tag":"铲断+对抗"},"success":{"text":"你{elementAdj}地一脚铲断。连球带人。干净。球权回来了。","effects":{"reputation":8,"attrs":{"tackle":1}}},"fail":{"text":"铲空了。他抹过去了。你摔在草皮上。","effects":{"stamina":-5}},"critical":{"text":"【灵光一闪】铁壁。他连变两次向，你纹丝不动，看准时机一脚断球。","effects":{"reputation":14,"attrs":{"tackle":2},"flags":{"keySuccess":true}}}},
          {"id":"L","sit":"defense","text":"卡住线路，逼他回传","check":{"attrs":["positioning","iq"],"difficulty":28,"tag":"站位+球商"},"success":{"text":"你没贸然出脚。卡住传球线路。他被迫回传。危机解除。","effects":{"reputation":6,"attrs":{"positioning":1}}},"fail":{"text":"你卡错了位置。他直塞打穿。","effects":{"stamina":-4}}},
          {"id":"M","sit":"balanced","text":"断球后直接发动反击","check":{"attrs":["passing","vision"],"difficulty":29,"tag":"传球+视野"},"success":{"text":"你断球后不停球，直接长传找前场。队友险些单刀。","effects":{"reputation":7,"attrs":{"passing":1}}},"fail":{"text":"断球后长传力量大了。出了边线。","effects":{"stamina":-4}}},
          {"id":"N","sit":"defense","text":"贴身缠斗，不让他转身","check":{"attrs":["strength","pressure"],"difficulty":30,"tag":"对抗+抗压"},"success":{"text":"你贴住他。用身体。他转不了身。只能回传。","effects":{"reputation":6,"attrs":{"strength":1}}},"fail":{"text":"你贴得太紧。他一个转身把你过了。","effects":{"stamina":-5}}},
          {"id":"O","sit":"attack","text":"断球后自己带球推进","check":{"attrs":["dribble","resolve"],"difficulty":30,"tag":"盘带+决断"},"success":{"text":"你断球后带球推进。杀到前场。分球。造险。","effects":{"reputation":7,"attrs":{"dribble":1}}},"fail":{"text":"带球推进被断。对方反抢。","effects":{"stamina":-4}}}
        ]
      },
      {
        text: "禁区前沿。你背身接到分球，转身的一瞬，面前只有半步空间。汗水顺着眉骨滑下来。",
        sit: "attack",
        choices: [
          {"id":"P","sit":"attack","text":"拔脚怒射，轰向死角","check":{"attrs":["shooting","power"],"difficulty":36,"tag":"射门+力量"},"success":{"text":"脚背吃准了部位。球带着{elementAdj}的弧线，直挂死角。门将连手都没伸。","effects":{"reputation":12,"goals":1,"attrs":{"shooting":1}}},"fail":{"text":"射门没压住。球高出横梁，飞进了后排看台。你懊恼地捶了下大腿。","effects":{"stamina":-3}},"critical":{"text":"【灵光一闪】世界波。球像一颗出膛的炮弹，砸进网窝，网绳还在颤。全场站起来。","effects":{"reputation":20,"goals":1,"attrs":{"shooting":2},"flags":{"keySuccess":true}}}},
          {"id":"Q","sit":"attack","text":"调整一步，推射远角","check":{"attrs":["shooting","resolve"],"difficulty":32,"tag":"射门+决断"},"success":{"text":"你多调整了一步。推射。球贴着草皮滚入远角。稳。","effects":{"reputation":10,"goals":1,"attrs":{"shooting":1}}},"fail":{"text":"调整慢了。后卫伸脚一挡。球弹走了。","effects":{"stamina":-3}}},
          {"id":"R","sit":"balanced","text":"分给位置更好的队友","check":{"attrs":["passing","vision"],"difficulty":28,"tag":"传球+视野"},"success":{"text":"你没贪。横传。队友推射空门得手。他朝你指了指。","effects":{"reputation":7,"assists":1,"attrs":{"passing":1}}},"fail":{"text":"横传力量大了。队友没追上。球出了底线。","effects":{"stamina":-3}}},
          {"id":"S","sit":"balanced","text":"护球观察，等空当","check":{"attrs":["positioning","balance"],"difficulty":26,"tag":"站位+平衡"},"success":{"text":"你护住球，等防线露出破绽。一记直塞，队友插上造险。","effects":{"reputation":5,"attrs":{"positioning":1}}},"fail":{"text":"你被挤开了。后背撞在广告牌上，铁皮冰凉。","effects":{"stamina":-3}}},
          {"id":"T","sit":"defense","text":"丢球就地反抢","check":{"attrs":["tackle","intercept"],"difficulty":24,"tag":"铲断+拦截"},"success":{"text":"射门被封堵后你就地反抢，掐断了对方的出球。肺在灼烧。","effects":{"reputation":5,"attrs":{"tackle":1}}},"fail":{"text":"反抢扑空。对方顺势推进。你只能看着他们的背影。","effects":{"stamina":-4}}}
        ]
      },
      {
        text: "断球。抬头。对方全线压上，身后是一片开阔地。机会。只有三秒。",
        sit: "attack",
        choices: [
          {"id":"U","sit":"attack","text":"长途奔袭，一条龙","check":{"attrs":["speed","stamina"],"difficulty":35,"tag":"速度+耐力"},"success":{"text":"你{elementAdj}地从中场杀到禁区。过人。射门。进了。全场沸腾。","effects":{"reputation":13,"goals":1,"attrs":{"speed":1}}},"fail":{"text":"奔袭到最后，腿软了。射门偏出。","effects":{"stamina":-6}},"critical":{"text":"【灵光一闪】单骑闯关。你撕碎了整条防线。所有人都站起来了。","effects":{"reputation":20,"goals":1,"attrs":{"speed":2,"stamina":1},"flags":{"keySuccess":true}}}},
          {"id":"V","sit":"attack","text":"分球给位置更好的队友","check":{"attrs":["passing","vision"],"difficulty":29,"tag":"传球+视野"},"success":{"text":"你没贪功。分球。队友推射空门。","effects":{"reputation":9,"assists":1,"attrs":{"passing":1}}},"fail":{"text":"分球力量大了。队友没追上。","effects":{"stamina":-3}}},
          {"id":"W","sit":"balanced","text":"带球推进，吸引防守再分","check":{"attrs":["dribble","iq"],"difficulty":31,"tag":"盘带+球商"},"success":{"text":"你带球推进，吸引两人包夹，分球。队友空位破门。","effects":{"reputation":9,"assists":1,"attrs":{"dribble":1}}},"fail":{"text":"带球被断。反击夭折。","effects":{"stamina":-4}}},
          {"id":"X","sit":"balanced","text":"减速控球，稳住节奏","check":{"attrs":["rhythm","iq"],"difficulty":27,"tag":"节奏+球商"},"success":{"text":"你没急。减速控球。等队友落位。重新组织。","effects":{"reputation":5,"attrs":{"rhythm":1}}},"fail":{"text":"你一减速。对方回防到位。机会没了。","effects":{"stamina":-3}}},
          {"id":"Y","sit":"defense","text":"回追防备对方反抢","check":{"attrs":["tackle","speed"],"difficulty":25,"tag":"铲断+速度"},"success":{"text":"反击被断后你反抢，没让对方打二次反击。","effects":{"reputation":5,"attrs":{"tackle":1}}},"fail":{"text":"反抢扑空。对方长传。你回追得很狼狈。","effects":{"stamina":-5}}}
        ]
      }
    ]
  },

  "MF_攻击型": {
    desc: "后插上、禁区前沿发炮",
    events: [
      {
        text: "你是攻击型中场。后插上。禁区前沿发炮。你的远射，是球队的杀手锏。",
        sit: "attack",
        choices: [
          {"id":"A","sit":"attack","text":"禁区前沿远射","check":{"attrs":["shooting","power"],"difficulty":35,"tag":"射门+力量"},"success":{"text":"你在禁区前沿起脚。远射。球带着{elementAdj}的劲道砸进网窝。","effects":{"reputation":12,"goals":1,"attrs":{"shooting":1}}},"fail":{"text":"远射被封堵。","effects":{"stamina":-4}},"critical":{"text":"【灵光一闪】三十米外一脚世界波。球进了。门将纹丝不动。","effects":{"reputation":20,"goals":1,"attrs":{"shooting":2,"power":1},"flags":{"keySuccess":true}}}},
          {"id":"B","sit":"attack","text":"后插上抢点","check":{"attrs":["positioning","shooting"],"difficulty":32,"tag":"站位+射门"},"success":{"text":"你后插上。抢到落点。推射。进了。","effects":{"reputation":11,"goals":1,"attrs":{"positioning":1}}},"fail":{"text":"插上慢了。","effects":{"stamina":-4}}},
          {"id":"C","sit":"balanced","text":"致命直塞","check":{"attrs":["passing","vision"],"difficulty":31,"tag":"传球+视野"},"success":{"text":"你一记直塞。队友单刀破门。","effects":{"reputation":9,"assists":1,"attrs":{"passing":1}}},"fail":{"text":"直塞被断。","effects":{"stamina":-3}}},
          {"id":"D","sit":"balanced","text":"带球推进","check":{"attrs":["dribble","resolve"],"difficulty":31,"tag":"盘带+决断"},"success":{"text":"你带球推进。撕开防线。射门造险。","effects":{"reputation":7,"attrs":{"dribble":1}}},"fail":{"text":"带球被断。","effects":{"stamina":-4}}},
          {"id":"E","sit":"defense","text":"丢球反抢","check":{"attrs":["tackle","speed"],"difficulty":25,"tag":"铲断+速度"},"success":{"text":"你丢球反抢。掐断出球。","effects":{"reputation":5,"attrs":{"tackle":1}}},"fail":{"text":"反抢扑空。","effects":{"stamina":-4}}}
        ]
      },
      {
        text: "禁区前沿。你背身接到分球，转身的一瞬，面前只有半步空间。汗水顺着眉骨滑下来。",
        sit: "attack",
        choices: [
          {"id":"F","sit":"attack","text":"拔脚怒射，轰向死角","check":{"attrs":["shooting","power"],"difficulty":36,"tag":"射门+力量"},"success":{"text":"脚背吃准了部位。球带着{elementAdj}的弧线，直挂死角。门将连手都没伸。","effects":{"reputation":12,"goals":1,"attrs":{"shooting":1}}},"fail":{"text":"射门没压住。球高出横梁，飞进了后排看台。你懊恼地捶了下大腿。","effects":{"stamina":-3}},"critical":{"text":"【灵光一闪】世界波。球像一颗出膛的炮弹，砸进网窝，网绳还在颤。全场站起来。","effects":{"reputation":20,"goals":1,"attrs":{"shooting":2},"flags":{"keySuccess":true}}}},
          {"id":"G","sit":"attack","text":"调整一步，推射远角","check":{"attrs":["shooting","resolve"],"difficulty":32,"tag":"射门+决断"},"success":{"text":"你多调整了一步。推射。球贴着草皮滚入远角。稳。","effects":{"reputation":10,"goals":1,"attrs":{"shooting":1}}},"fail":{"text":"调整慢了。后卫伸脚一挡。球弹走了。","effects":{"stamina":-3}}},
          {"id":"H","sit":"balanced","text":"分给位置更好的队友","check":{"attrs":["passing","vision"],"difficulty":28,"tag":"传球+视野"},"success":{"text":"你没贪。横传。队友推射空门得手。他朝你指了指。","effects":{"reputation":7,"assists":1,"attrs":{"passing":1}}},"fail":{"text":"横传力量大了。队友没追上。球出了底线。","effects":{"stamina":-3}}},
          {"id":"I","sit":"balanced","text":"护球观察，等空当","check":{"attrs":["positioning","balance"],"difficulty":26,"tag":"站位+平衡"},"success":{"text":"你护住球，等防线露出破绽。一记直塞，队友插上造险。","effects":{"reputation":5,"attrs":{"positioning":1}}},"fail":{"text":"你被挤开了。后背撞在广告牌上，铁皮冰凉。","effects":{"stamina":-3}}},
          {"id":"J","sit":"defense","text":"丢球就地反抢","check":{"attrs":["tackle","intercept"],"difficulty":24,"tag":"铲断+拦截"},"success":{"text":"射门被封堵后你就地反抢，掐断了对方的出球。肺在灼烧。","effects":{"reputation":5,"attrs":{"tackle":1}}},"fail":{"text":"反抢扑空。对方顺势推进。你只能看着他们的背影。","effects":{"stamina":-4}}}
        ]
      },
      {
        text: "中场。你拿球。抬头的瞬间，你看见了——防线身后那道稍纵即逝的缝隙。",
        sit: "balanced",
        choices: [
          {"id":"K","sit":"attack","text":"一记手术刀直塞","check":{"attrs":["passing","vision"],"difficulty":33,"tag":"传球+视野"},"success":{"text":"你脚弓一推。球从三人缝隙里穿过。队友单刀。进了。","effects":{"reputation":10,"assists":1,"attrs":{"passing":1}}},"fail":{"text":"直塞意图太明显。被后腰伸脚挡下。","effects":{"stamina":-3}},"critical":{"text":"【灵光一闪】水银泻地。皮球划出一道不可思议的弧线，队友轻松推射。","effects":{"reputation":18,"assists":1,"attrs":{"passing":2,"vision":1},"flags":{"keySuccess":true}}}},
          {"id":"L","sit":"attack","text":"斜长传转移弱侧","check":{"attrs":["passing","rhythm"],"difficulty":30,"tag":"传球+节奏"},"success":{"text":"你一记斜长传。弱侧队友得球，内切破门。","effects":{"reputation":9,"assists":1,"attrs":{"passing":1}}},"fail":{"text":"长传力量大了。直接出了边线。","effects":{"stamina":-3}}},
          {"id":"M","sit":"balanced","text":"横传调度，扯动防线","check":{"attrs":["passing","iq"],"difficulty":27,"tag":"传球+球商"},"success":{"text":"你不急。横传调度。防线被来回扯动，露出空当。","effects":{"reputation":6,"attrs":{"iq":1}}},"fail":{"text":"横传被预判。对方断球反击。","effects":{"stamina":-3}}},
          {"id":"N","sit":"balanced","text":"自己带球推进","check":{"attrs":["dribble","resolve"],"difficulty":30,"tag":"盘带+决断"},"success":{"text":"你突然带球推进。撕开防线。分球。队友造险。","effects":{"reputation":7,"attrs":{"dribble":1}}},"fail":{"text":"带球被围抢。三人包夹。球丢了。","effects":{"stamina":-4}}},
          {"id":"O","sit":"defense","text":"丢球反抢，扼杀反击","check":{"attrs":["tackle","iq"],"difficulty":25,"tag":"铲断+球商"},"success":{"text":"传球被断后你反抢，扼杀了对方的反击。","effects":{"reputation":5,"attrs":{"tackle":1}}},"fail":{"text":"反抢扑空。对方推进。你回追得很狼狈。","effects":{"stamina":-4}}}
        ]
      },
      {
        text: "传中球划过门前。禁区里一片人仰马翻。你嗅到了落点——那是前锋的直觉。",
        sit: "attack",
        choices: [
          {"id":"P","sit":"attack","text":"抢前点，一脚捅射","check":{"attrs":["positioning","shooting"],"difficulty":33,"tag":"站位+射门"},"success":{"text":"你抢在所有人身前。脚尖一捅。球滚入近角。门将措手不及。","effects":{"reputation":11,"goals":1,"attrs":{"positioning":1}}},"fail":{"text":"你慢了一步。球被后卫先一步解围。","effects":{"stamina":-3}},"critical":{"text":"【灵光一闪】鬼魅跑位。你像从地里冒出来的，轻松推射空门。","effects":{"reputation":18,"goals":1,"attrs":{"positioning":2},"flags":{"keySuccess":true}}}},
          {"id":"Q","sit":"attack","text":"旱地拔葱，暴力头槌","check":{"attrs":["heading","balance"],"difficulty":35,"tag":"头球+平衡"},"success":{"text":"你拔地而起。额头撞上皮球的闷响。球砸入网窝。","effects":{"reputation":12,"goals":1,"attrs":{"heading":1}}},"fail":{"text":"起跳早了。皮球擦着发顶飞过。你落地时膝盖一阵钝痛。","effects":{"stamina":-4}}},
          {"id":"R","sit":"balanced","text":"头球摆渡给后点","check":{"attrs":["heading","passing"],"difficulty":29,"tag":"头球+传球"},"success":{"text":"你没贪功。头球摆渡。后点队友推射得手。","effects":{"reputation":8,"assists":1,"attrs":{"heading":1}}},"fail":{"text":"摆渡力量不对。队友伸脚没够到。","effects":{"stamina":-3}}},
          {"id":"S","sit":"balanced","text":"卡住身位，护住第二落点","check":{"attrs":["positioning","strength"],"difficulty":27,"tag":"站位+对抗"},"success":{"text":"你卡住身位，把后卫挡在身后。第二落点是你的。防线慌了。","effects":{"reputation":5,"attrs":{"positioning":1}}},"fail":{"text":"你被挤开了。球权丢了。","effects":{"stamina":-3}}},
          {"id":"T","sit":"defense","text":"回撤防备快反","check":{"attrs":["intercept","speed"],"difficulty":24,"tag":"拦截+速度"},"success":{"text":"传中被解围后对方快反。你提前回追，将球截下。","effects":{"reputation":6,"attrs":{"intercept":1}}},"fail":{"text":"回追慢了一步。对方反击造成险情。","effects":{"stamina":-4}}}
        ]
      },
      {
        text: "断球。抬头。对方全线压上，身后是一片开阔地。机会。只有三秒。",
        sit: "attack",
        choices: [
          {"id":"U","sit":"attack","text":"长途奔袭，一条龙","check":{"attrs":["speed","stamina"],"difficulty":35,"tag":"速度+耐力"},"success":{"text":"你{elementAdj}地从中场杀到禁区。过人。射门。进了。全场沸腾。","effects":{"reputation":13,"goals":1,"attrs":{"speed":1}}},"fail":{"text":"奔袭到最后，腿软了。射门偏出。","effects":{"stamina":-6}},"critical":{"text":"【灵光一闪】单骑闯关。你撕碎了整条防线。所有人都站起来了。","effects":{"reputation":20,"goals":1,"attrs":{"speed":2,"stamina":1},"flags":{"keySuccess":true}}}},
          {"id":"V","sit":"attack","text":"分球给位置更好的队友","check":{"attrs":["passing","vision"],"difficulty":29,"tag":"传球+视野"},"success":{"text":"你没贪功。分球。队友推射空门。","effects":{"reputation":9,"assists":1,"attrs":{"passing":1}}},"fail":{"text":"分球力量大了。队友没追上。","effects":{"stamina":-3}}},
          {"id":"W","sit":"balanced","text":"带球推进，吸引防守再分","check":{"attrs":["dribble","iq"],"difficulty":31,"tag":"盘带+球商"},"success":{"text":"你带球推进，吸引两人包夹，分球。队友空位破门。","effects":{"reputation":9,"assists":1,"attrs":{"dribble":1}}},"fail":{"text":"带球被断。反击夭折。","effects":{"stamina":-4}}},
          {"id":"X","sit":"balanced","text":"减速控球，稳住节奏","check":{"attrs":["rhythm","iq"],"difficulty":27,"tag":"节奏+球商"},"success":{"text":"你没急。减速控球。等队友落位。重新组织。","effects":{"reputation":5,"attrs":{"rhythm":1}}},"fail":{"text":"你一减速。对方回防到位。机会没了。","effects":{"stamina":-3}}},
          {"id":"Y","sit":"defense","text":"回追防备对方反抢","check":{"attrs":["tackle","speed"],"difficulty":25,"tag":"铲断+速度"},"success":{"text":"反击被断后你反抢，没让对方打二次反击。","effects":{"reputation":5,"attrs":{"tackle":1}}},"fail":{"text":"反抢扑空。对方长传。你回追得很狼狈。","effects":{"stamina":-5}}}
        ]
      }
    ]
  },

  "WING_突破型": {
    desc: "过人、下底传中",
    events: [
      {
        text: "你是边路尖刀。过人。下底。传中。你的盘带，是对方边后卫的噩梦。",
        sit: "attack",
        choices: [
          {"id":"A","sit":"attack","text":"连续过人，下底传中","check":{"attrs":["dribble","speed"],"difficulty":34,"tag":"盘带+速度"},"success":{"text":"你连过两人。下底。传中。后点队友头球破门。","effects":{"reputation":10,"assists":1,"attrs":{"dribble":1}}},"fail":{"text":"过人失败。被断。","effects":{"stamina":-4}},"critical":{"text":"【灵光一闪】你像一阵风掠过整条边路。传中。队友轻松推射。","effects":{"reputation":17,"assists":1,"attrs":{"dribble":2,"speed":1},"flags":{"keySuccess":true}}}},
          {"id":"B","sit":"attack","text":"内切射门","check":{"attrs":["dribble","shooting"],"difficulty":33,"tag":"盘带+射门"},"success":{"text":"你内切。晃出空间。射门。球进了。","effects":{"reputation":11,"goals":1,"attrs":{"shooting":1}}},"fail":{"text":"内切被包夹。","effects":{"stamina":-4}}},
          {"id":"C","sit":"balanced","text":"回传重新组织","check":{"attrs":["passing","iq"],"difficulty":26,"tag":"传球+球商"},"success":{"text":"你没硬来。回传。重新组织。","effects":{"reputation":5,"attrs":{"passing":1}}},"fail":{"text":"回传被断。","effects":{"stamina":-3}}},
          {"id":"D","sit":"balanced","text":"护球等套边","check":{"attrs":["positioning","balance"],"difficulty":26,"tag":"站位+平衡"},"success":{"text":"你护球。等队友套边。分球。","effects":{"reputation":5,"attrs":{"positioning":1}}},"fail":{"text":"被挤开。","effects":{"stamina":-3}}},
          {"id":"E","sit":"defense","text":"丢球反抢","check":{"attrs":["tackle","speed"],"difficulty":25,"tag":"铲断+速度"},"success":{"text":"你丢球反抢。没让对方起球。","effects":{"reputation":5,"attrs":{"tackle":1}}},"fail":{"text":"反抢扑空。","effects":{"stamina":-4}}}
        ]
      },
      {
        text: "边路。你面朝对方边后卫。他压低重心，盯着你的脚。风把边旗吹得啪啪响。",
        sit: "attack",
        choices: [
          {"id":"F","sit":"attack","text":"一个变向，强行超车","check":{"attrs":["dribble","speed"],"difficulty":34,"tag":"盘带+速度"},"success":{"text":"你{elementAdj}地一个变向。他重心丢了。你过去了。风在耳边。","effects":{"reputation":10,"attrs":{"dribble":1}}},"fail":{"text":"变向没晃开。他伸脚把球捅出边线。","effects":{"stamina":-4}},"critical":{"text":"【灵光一闪】人球分过。你像一阵风掠过他。看台上有人惊呼。","effects":{"reputation":16,"attrs":{"dribble":2,"speed":1},"flags":{"keySuccess":true}}}},
          {"id":"G","sit":"attack","text":"下底传中","check":{"attrs":["dribble","passing"],"difficulty":31,"tag":"盘带+传球"},"success":{"text":"你杀到底线。一记传中。后点队友头球破门。","effects":{"reputation":9,"assists":1,"attrs":{"passing":1}}},"fail":{"text":"传中弧线不对。被门将摘了。","effects":{"stamina":-3}}},
          {"id":"H","sit":"balanced","text":"内切，寻找射门空间","check":{"attrs":["dribble","shooting"],"difficulty":33,"tag":"盘带+射门"},"success":{"text":"你内切。晃出空间。起脚。球进了。","effects":{"reputation":11,"goals":1,"attrs":{"shooting":1}}},"fail":{"text":"内切被预判。两人包夹。球丢了。","effects":{"stamina":-4}}},
          {"id":"I","sit":"balanced","text":"回传重新组织","check":{"attrs":["passing","iq"],"difficulty":26,"tag":"传球+球商"},"success":{"text":"你没硬来。回传。重新组织。防线被你扯动了。","effects":{"reputation":5,"attrs":{"passing":1}}},"fail":{"text":"回传太随意。被断。对方反击。","effects":{"stamina":-3}}},
          {"id":"J","sit":"defense","text":"丢球反抢，不让对方起球","check":{"attrs":["tackle","speed"],"difficulty":25,"tag":"铲断+速度"},"success":{"text":"你丢球就地反抢。对方边后卫没法舒服起球。","effects":{"reputation":5,"attrs":{"tackle":1}}},"fail":{"text":"反抢慢了。对方长传转移。你白跑了。","effects":{"stamina":-4}}}
        ]
      },
      {
        text: "断球。抬头。对方全线压上，身后是一片开阔地。机会。只有三秒。",
        sit: "attack",
        choices: [
          {"id":"K","sit":"attack","text":"长途奔袭，一条龙","check":{"attrs":["speed","stamina"],"difficulty":35,"tag":"速度+耐力"},"success":{"text":"你{elementAdj}地从中场杀到禁区。过人。射门。进了。全场沸腾。","effects":{"reputation":13,"goals":1,"attrs":{"speed":1}}},"fail":{"text":"奔袭到最后，腿软了。射门偏出。","effects":{"stamina":-6}},"critical":{"text":"【灵光一闪】单骑闯关。你撕碎了整条防线。所有人都站起来了。","effects":{"reputation":20,"goals":1,"attrs":{"speed":2,"stamina":1},"flags":{"keySuccess":true}}}},
          {"id":"L","sit":"attack","text":"分球给位置更好的队友","check":{"attrs":["passing","vision"],"difficulty":29,"tag":"传球+视野"},"success":{"text":"你没贪功。分球。队友推射空门。","effects":{"reputation":9,"assists":1,"attrs":{"passing":1}}},"fail":{"text":"分球力量大了。队友没追上。","effects":{"stamina":-3}}},
          {"id":"M","sit":"balanced","text":"带球推进，吸引防守再分","check":{"attrs":["dribble","iq"],"difficulty":31,"tag":"盘带+球商"},"success":{"text":"你带球推进，吸引两人包夹，分球。队友空位破门。","effects":{"reputation":9,"assists":1,"attrs":{"dribble":1}}},"fail":{"text":"带球被断。反击夭折。","effects":{"stamina":-4}}},
          {"id":"N","sit":"balanced","text":"减速控球，稳住节奏","check":{"attrs":["rhythm","iq"],"difficulty":27,"tag":"节奏+球商"},"success":{"text":"你没急。减速控球。等队友落位。重新组织。","effects":{"reputation":5,"attrs":{"rhythm":1}}},"fail":{"text":"你一减速。对方回防到位。机会没了。","effects":{"stamina":-3}}},
          {"id":"O","sit":"defense","text":"回追防备对方反抢","check":{"attrs":["tackle","speed"],"difficulty":25,"tag":"铲断+速度"},"success":{"text":"反击被断后你反抢，没让对方打二次反击。","effects":{"reputation":5,"attrs":{"tackle":1}}},"fail":{"text":"反抢扑空。对方长传。你回追得很狼狈。","effects":{"stamina":-5}}}
        ]
      },
      {
        text: "中场。你拿球。抬头的瞬间，你看见了——防线身后那道稍纵即逝的缝隙。",
        sit: "balanced",
        choices: [
          {"id":"P","sit":"attack","text":"一记手术刀直塞","check":{"attrs":["passing","vision"],"difficulty":33,"tag":"传球+视野"},"success":{"text":"你脚弓一推。球从三人缝隙里穿过。队友单刀。进了。","effects":{"reputation":10,"assists":1,"attrs":{"passing":1}}},"fail":{"text":"直塞意图太明显。被后腰伸脚挡下。","effects":{"stamina":-3}},"critical":{"text":"【灵光一闪】水银泻地。皮球划出一道不可思议的弧线，队友轻松推射。","effects":{"reputation":18,"assists":1,"attrs":{"passing":2,"vision":1},"flags":{"keySuccess":true}}}},
          {"id":"Q","sit":"attack","text":"斜长传转移弱侧","check":{"attrs":["passing","rhythm"],"difficulty":30,"tag":"传球+节奏"},"success":{"text":"你一记斜长传。弱侧队友得球，内切破门。","effects":{"reputation":9,"assists":1,"attrs":{"passing":1}}},"fail":{"text":"长传力量大了。直接出了边线。","effects":{"stamina":-3}}},
          {"id":"R","sit":"balanced","text":"横传调度，扯动防线","check":{"attrs":["passing","iq"],"difficulty":27,"tag":"传球+球商"},"success":{"text":"你不急。横传调度。防线被来回扯动，露出空当。","effects":{"reputation":6,"attrs":{"iq":1}}},"fail":{"text":"横传被预判。对方断球反击。","effects":{"stamina":-3}}},
          {"id":"S","sit":"balanced","text":"自己带球推进","check":{"attrs":["dribble","resolve"],"difficulty":30,"tag":"盘带+决断"},"success":{"text":"你突然带球推进。撕开防线。分球。队友造险。","effects":{"reputation":7,"attrs":{"dribble":1}}},"fail":{"text":"带球被围抢。三人包夹。球丢了。","effects":{"stamina":-4}}},
          {"id":"T","sit":"defense","text":"丢球反抢，扼杀反击","check":{"attrs":["tackle","iq"],"difficulty":25,"tag":"铲断+球商"},"success":{"text":"传球被断后你反抢，扼杀了对方的反击。","effects":{"reputation":5,"attrs":{"tackle":1}}},"fail":{"text":"反抢扑空。对方推进。你回追得很狼狈。","effects":{"stamina":-4}}}
        ]
      },
      {
        text: "对方反击。皮球打穿了整条防线，对方前锋单刀直入。你是最近的回追者。风灌进耳朵。",
        sit: "defense",
        choices: [
          {"id":"U","sit":"defense","text":"全速回追，背后滑铲","check":{"attrs":["tackle","speed"],"difficulty":33,"tag":"铲断+速度"},"success":{"text":"你{elementAdj}地拍马赶到。一记干净的滑铲，球捅出底线。","effects":{"reputation":8,"attrs":{"tackle":1}}},"fail":{"text":"回追慢了一步。滑铲落空。对方晃过门将得分。","effects":{"stamina":-6}},"critical":{"text":"【灵光一闪】铁壁回追。你的滑铲把球和人一起留在了底线外。","effects":{"reputation":14,"attrs":{"tackle":2,"speed":1},"flags":{"keySuccess":true}}}},
          {"id":"V","sit":"defense","text":"用速度缠住他","check":{"attrs":["speed","stamina"],"difficulty":30,"tag":"速度+耐力"},"success":{"text":"你咬牙回追，死死缠住他。他甩不开你，只能减速。","effects":{"reputation":7,"attrs":{"speed":1}}},"fail":{"text":"你追了，但腿灌了铅。他一步抹过你。","effects":{"stamina":-6}}},
          {"id":"W","sit":"defense","text":"卡住身位，封射门角度","check":{"attrs":["positioning","balance"],"difficulty":29,"tag":"站位+平衡"},"success":{"text":"你边退边卡住身位。对方被迫走外线，射门偏出。","effects":{"reputation":6,"attrs":{"positioning":1}}},"fail":{"text":"对方一个变向，你重心丢了。他推射得手。","effects":{"stamina":-5}}},
          {"id":"X","sit":"balanced","text":"断球后长传反击","check":{"attrs":["passing","vision"],"difficulty":28,"tag":"传球+视野"},"success":{"text":"你断球后直接长传找前场。化守为攻。","effects":{"reputation":7,"attrs":{"passing":1}}},"fail":{"text":"长传力量大了。出了边线。","effects":{"stamina":-4}}},
          {"id":"Y","sit":"defense","text":"赌一把，连人带球拦下","check":{"attrs":["resolve","power"],"difficulty":33,"tag":"决断+力量"},"success":{"text":"你豁出去了。一个肩撞把人球一起拦下。球权是你的。","effects":{"reputation":6,"attrs":{"resolve":1}}},"fail":{"text":"你扑得太凶。对方一晃，你摔在草皮上。","effects":{"stamina":-6}}}
        ]
      }
    ]
  },

  "WING_内切型": {
    desc: "边路内切、远射破门",
    events: [
      {
        text: "你是内切型边锋。从边路杀向中路。内切。远射。你的左脚（或右脚），是禁区前沿的杀器。",
        sit: "attack",
        choices: [
          {"id":"A","sit":"attack","text":"内切远射","check":{"attrs":["dribble","shooting"],"difficulty":35,"tag":"盘带+射门"},"success":{"text":"你从边路内切。晃出空间。远射。球进了。","effects":{"reputation":12,"goals":1,"attrs":{"shooting":1}}},"fail":{"text":"内切被预判。被包夹。","effects":{"stamina":-4}},"critical":{"text":"【灵光一闪】你内切后一脚弧线球。球直挂死角。门将望球兴叹。","effects":{"reputation":20,"goals":1,"attrs":{"shooting":2,"dribble":1},"flags":{"keySuccess":true}}}},
          {"id":"B","sit":"attack","text":"内切后直塞","check":{"attrs":["passing","vision"],"difficulty":31,"tag":"传球+视野"},"success":{"text":"你内切吸引防守。直塞。队友单刀破门。","effects":{"reputation":9,"assists":1,"attrs":{"passing":1}}},"fail":{"text":"直塞被断。","effects":{"stamina":-3}}},
          {"id":"C","sit":"balanced","text":"下底传中","check":{"attrs":["dribble","passing"],"difficulty":30,"tag":"盘带+传球"},"success":{"text":"你下底。传中。后点队友破门。","effects":{"reputation":8,"assists":1,"attrs":{"passing":1}}},"fail":{"text":"传中被挡。","effects":{"stamina":-3}}},
          {"id":"D","sit":"balanced","text":"回传组织","check":{"attrs":["passing","iq"],"difficulty":26,"tag":"传球+球商"},"success":{"text":"你回传。重新组织。","effects":{"reputation":5,"attrs":{"passing":1}}},"fail":{"text":"回传被断。","effects":{"stamina":-3}}},
          {"id":"E","sit":"defense","text":"丢球反抢","check":{"attrs":["tackle","speed"],"difficulty":25,"tag":"铲断+速度"},"success":{"text":"你丢球反抢。掐断出球。","effects":{"reputation":5,"attrs":{"tackle":1}}},"fail":{"text":"反抢扑空。","effects":{"stamina":-4}}}
        ]
      },
      {
        text: "边路。你面朝对方边后卫。他压低重心，盯着你的脚。风把边旗吹得啪啪响。",
        sit: "attack",
        choices: [
          {"id":"F","sit":"attack","text":"一个变向，强行超车","check":{"attrs":["dribble","speed"],"difficulty":34,"tag":"盘带+速度"},"success":{"text":"你{elementAdj}地一个变向。他重心丢了。你过去了。风在耳边。","effects":{"reputation":10,"attrs":{"dribble":1}}},"fail":{"text":"变向没晃开。他伸脚把球捅出边线。","effects":{"stamina":-4}},"critical":{"text":"【灵光一闪】人球分过。你像一阵风掠过他。看台上有人惊呼。","effects":{"reputation":16,"attrs":{"dribble":2,"speed":1},"flags":{"keySuccess":true}}}},
          {"id":"G","sit":"attack","text":"下底传中","check":{"attrs":["dribble","passing"],"difficulty":31,"tag":"盘带+传球"},"success":{"text":"你杀到底线。一记传中。后点队友头球破门。","effects":{"reputation":9,"assists":1,"attrs":{"passing":1}}},"fail":{"text":"传中弧线不对。被门将摘了。","effects":{"stamina":-3}}},
          {"id":"H","sit":"balanced","text":"内切，寻找射门空间","check":{"attrs":["dribble","shooting"],"difficulty":33,"tag":"盘带+射门"},"success":{"text":"你内切。晃出空间。起脚。球进了。","effects":{"reputation":11,"goals":1,"attrs":{"shooting":1}}},"fail":{"text":"内切被预判。两人包夹。球丢了。","effects":{"stamina":-4}}},
          {"id":"I","sit":"balanced","text":"回传重新组织","check":{"attrs":["passing","iq"],"difficulty":26,"tag":"传球+球商"},"success":{"text":"你没硬来。回传。重新组织。防线被你扯动了。","effects":{"reputation":5,"attrs":{"passing":1}}},"fail":{"text":"回传太随意。被断。对方反击。","effects":{"stamina":-3}}},
          {"id":"J","sit":"defense","text":"丢球反抢，不让对方起球","check":{"attrs":["tackle","speed"],"difficulty":25,"tag":"铲断+速度"},"success":{"text":"你丢球就地反抢。对方边后卫没法舒服起球。","effects":{"reputation":5,"attrs":{"tackle":1}}},"fail":{"text":"反抢慢了。对方长传转移。你白跑了。","effects":{"stamina":-4}}}
        ]
      },
      {
        text: "禁区前沿。你背身接到分球，转身的一瞬，面前只有半步空间。汗水顺着眉骨滑下来。",
        sit: "attack",
        choices: [
          {"id":"K","sit":"attack","text":"拔脚怒射，轰向死角","check":{"attrs":["shooting","power"],"difficulty":36,"tag":"射门+力量"},"success":{"text":"脚背吃准了部位。球带着{elementAdj}的弧线，直挂死角。门将连手都没伸。","effects":{"reputation":12,"goals":1,"attrs":{"shooting":1}}},"fail":{"text":"射门没压住。球高出横梁，飞进了后排看台。你懊恼地捶了下大腿。","effects":{"stamina":-3}},"critical":{"text":"【灵光一闪】世界波。球像一颗出膛的炮弹，砸进网窝，网绳还在颤。全场站起来。","effects":{"reputation":20,"goals":1,"attrs":{"shooting":2},"flags":{"keySuccess":true}}}},
          {"id":"L","sit":"attack","text":"调整一步，推射远角","check":{"attrs":["shooting","resolve"],"difficulty":32,"tag":"射门+决断"},"success":{"text":"你多调整了一步。推射。球贴着草皮滚入远角。稳。","effects":{"reputation":10,"goals":1,"attrs":{"shooting":1}}},"fail":{"text":"调整慢了。后卫伸脚一挡。球弹走了。","effects":{"stamina":-3}}},
          {"id":"M","sit":"balanced","text":"分给位置更好的队友","check":{"attrs":["passing","vision"],"difficulty":28,"tag":"传球+视野"},"success":{"text":"你没贪。横传。队友推射空门得手。他朝你指了指。","effects":{"reputation":7,"assists":1,"attrs":{"passing":1}}},"fail":{"text":"横传力量大了。队友没追上。球出了底线。","effects":{"stamina":-3}}},
          {"id":"N","sit":"balanced","text":"护球观察，等空当","check":{"attrs":["positioning","balance"],"difficulty":26,"tag":"站位+平衡"},"success":{"text":"你护住球，等防线露出破绽。一记直塞，队友插上造险。","effects":{"reputation":5,"attrs":{"positioning":1}}},"fail":{"text":"你被挤开了。后背撞在广告牌上，铁皮冰凉。","effects":{"stamina":-3}}},
          {"id":"O","sit":"defense","text":"丢球就地反抢","check":{"attrs":["tackle","intercept"],"difficulty":24,"tag":"铲断+拦截"},"success":{"text":"射门被封堵后你就地反抢，掐断了对方的出球。肺在灼烧。","effects":{"reputation":5,"attrs":{"tackle":1}}},"fail":{"text":"反抢扑空。对方顺势推进。你只能看着他们的背影。","effects":{"stamina":-4}}}
        ]
      },
      {
        text: "断球。抬头。对方全线压上，身后是一片开阔地。机会。只有三秒。",
        sit: "attack",
        choices: [
          {"id":"P","sit":"attack","text":"长途奔袭，一条龙","check":{"attrs":["speed","stamina"],"difficulty":35,"tag":"速度+耐力"},"success":{"text":"你{elementAdj}地从中场杀到禁区。过人。射门。进了。全场沸腾。","effects":{"reputation":13,"goals":1,"attrs":{"speed":1}}},"fail":{"text":"奔袭到最后，腿软了。射门偏出。","effects":{"stamina":-6}},"critical":{"text":"【灵光一闪】单骑闯关。你撕碎了整条防线。所有人都站起来了。","effects":{"reputation":20,"goals":1,"attrs":{"speed":2,"stamina":1},"flags":{"keySuccess":true}}}},
          {"id":"Q","sit":"attack","text":"分球给位置更好的队友","check":{"attrs":["passing","vision"],"difficulty":29,"tag":"传球+视野"},"success":{"text":"你没贪功。分球。队友推射空门。","effects":{"reputation":9,"assists":1,"attrs":{"passing":1}}},"fail":{"text":"分球力量大了。队友没追上。","effects":{"stamina":-3}}},
          {"id":"R","sit":"balanced","text":"带球推进，吸引防守再分","check":{"attrs":["dribble","iq"],"difficulty":31,"tag":"盘带+球商"},"success":{"text":"你带球推进，吸引两人包夹，分球。队友空位破门。","effects":{"reputation":9,"assists":1,"attrs":{"dribble":1}}},"fail":{"text":"带球被断。反击夭折。","effects":{"stamina":-4}}},
          {"id":"S","sit":"balanced","text":"减速控球，稳住节奏","check":{"attrs":["rhythm","iq"],"difficulty":27,"tag":"节奏+球商"},"success":{"text":"你没急。减速控球。等队友落位。重新组织。","effects":{"reputation":5,"attrs":{"rhythm":1}}},"fail":{"text":"你一减速。对方回防到位。机会没了。","effects":{"stamina":-3}}},
          {"id":"T","sit":"defense","text":"回追防备对方反抢","check":{"attrs":["tackle","speed"],"difficulty":25,"tag":"铲断+速度"},"success":{"text":"反击被断后你反抢，没让对方打二次反击。","effects":{"reputation":5,"attrs":{"tackle":1}}},"fail":{"text":"反抢扑空。对方长传。你回追得很狼狈。","effects":{"stamina":-5}}}
        ]
      },
      {
        text: "中场。你拿球。抬头的瞬间，你看见了——防线身后那道稍纵即逝的缝隙。",
        sit: "balanced",
        choices: [
          {"id":"U","sit":"attack","text":"一记手术刀直塞","check":{"attrs":["passing","vision"],"difficulty":33,"tag":"传球+视野"},"success":{"text":"你脚弓一推。球从三人缝隙里穿过。队友单刀。进了。","effects":{"reputation":10,"assists":1,"attrs":{"passing":1}}},"fail":{"text":"直塞意图太明显。被后腰伸脚挡下。","effects":{"stamina":-3}},"critical":{"text":"【灵光一闪】水银泻地。皮球划出一道不可思议的弧线，队友轻松推射。","effects":{"reputation":18,"assists":1,"attrs":{"passing":2,"vision":1},"flags":{"keySuccess":true}}}},
          {"id":"V","sit":"attack","text":"斜长传转移弱侧","check":{"attrs":["passing","rhythm"],"difficulty":30,"tag":"传球+节奏"},"success":{"text":"你一记斜长传。弱侧队友得球，内切破门。","effects":{"reputation":9,"assists":1,"attrs":{"passing":1}}},"fail":{"text":"长传力量大了。直接出了边线。","effects":{"stamina":-3}}},
          {"id":"W","sit":"balanced","text":"横传调度，扯动防线","check":{"attrs":["passing","iq"],"difficulty":27,"tag":"传球+球商"},"success":{"text":"你不急。横传调度。防线被来回扯动，露出空当。","effects":{"reputation":6,"attrs":{"iq":1}}},"fail":{"text":"横传被预判。对方断球反击。","effects":{"stamina":-3}}},
          {"id":"X","sit":"balanced","text":"自己带球推进","check":{"attrs":["dribble","resolve"],"difficulty":30,"tag":"盘带+决断"},"success":{"text":"你突然带球推进。撕开防线。分球。队友造险。","effects":{"reputation":7,"attrs":{"dribble":1}}},"fail":{"text":"带球被围抢。三人包夹。球丢了。","effects":{"stamina":-4}}},
          {"id":"Y","sit":"defense","text":"丢球反抢，扼杀反击","check":{"attrs":["tackle","iq"],"difficulty":25,"tag":"铲断+球商"},"success":{"text":"传球被断后你反抢，扼杀了对方的反击。","effects":{"reputation":5,"attrs":{"tackle":1}}},"fail":{"text":"反抢扑空。对方推进。你回追得很狼狈。","effects":{"stamina":-4}}}
        ]
      }
    ]
  },

  "DF_上抢型": {
    desc: "前顶拦截、回追铲球、凶狠绞杀",
    events: [
      {
        text: "你是上抢型后卫。前顶。拦截。回追。凶狠绞杀。你不等对方组织——你主动出击。",
        sit: "defense",
        choices: [
          {"id":"A","sit":"defense","text":"前顶拦截","check":{"attrs":["intercept","tackle"],"difficulty":33,"tag":"拦截+铲断"},"success":{"text":"你前顶。预判了传球。一脚拦截。球权回来。","effects":{"reputation":8,"attrs":{"intercept":1}}},"fail":{"text":"前顶扑空。被打身后。","effects":{"stamina":-5}},"critical":{"text":"【灵光一闪】你像一道铁闸，每一次前顶都精准掐断对方传球。","effects":{"reputation":14,"attrs":{"intercept":2,"tackle":1},"flags":{"keySuccess":true}}}},
          {"id":"B","sit":"defense","text":"凶狠铲断","check":{"attrs":["tackle","strength"],"difficulty":33,"tag":"铲断+对抗"},"success":{"text":"你一脚凶狠的铲断。连球带人。干净。","effects":{"reputation":8,"attrs":{"tackle":1}}},"fail":{"text":"铲空了。被过。","effects":{"stamina":-5}}},
          {"id":"C","sit":"defense","text":"回追铲球","check":{"attrs":["tackle","speed"],"difficulty":32,"tag":"铲断+速度"},"success":{"text":"对方反击。你全速回追。滑铲。球出底线。","effects":{"reputation":8,"attrs":{"tackle":1}}},"fail":{"text":"回追慢了。被过。","effects":{"stamina":-6}}},
          {"id":"D","sit":"balanced","text":"断球后长传发动","check":{"attrs":["passing","vision"],"difficulty":28,"tag":"传球+视野"},"success":{"text":"你断球后长传。发动反击。","effects":{"reputation":7,"attrs":{"passing":1}}},"fail":{"text":"长传出界。","effects":{"stamina":-4}}},
          {"id":"E","sit":"defense","text":"贴身缠斗","check":{"attrs":["strength","pressure"],"difficulty":30,"tag":"对抗+抗压"},"success":{"text":"你贴住对方前锋。他转不了身。","effects":{"reputation":6,"attrs":{"strength":1}}},"fail":{"text":"被摆脱。","effects":{"stamina":-5}}}
        ]
      },
      {
        text: "对方推进。皮球经过中场。你是那道闸。对手的十号正带球逼近。",
        sit: "defense",
        choices: [
          {"id":"F","sit":"defense","text":"正面铲断","check":{"attrs":["tackle","strength"],"difficulty":32,"tag":"铲断+对抗"},"success":{"text":"你{elementAdj}地一脚铲断。连球带人。干净。球权回来了。","effects":{"reputation":8,"attrs":{"tackle":1}}},"fail":{"text":"铲空了。他抹过去了。你摔在草皮上。","effects":{"stamina":-5}},"critical":{"text":"【灵光一闪】铁壁。他连变两次向，你纹丝不动，看准时机一脚断球。","effects":{"reputation":14,"attrs":{"tackle":2},"flags":{"keySuccess":true}}}},
          {"id":"G","sit":"defense","text":"卡住线路，逼他回传","check":{"attrs":["positioning","iq"],"difficulty":28,"tag":"站位+球商"},"success":{"text":"你没贸然出脚。卡住传球线路。他被迫回传。危机解除。","effects":{"reputation":6,"attrs":{"positioning":1}}},"fail":{"text":"你卡错了位置。他直塞打穿。","effects":{"stamina":-4}}},
          {"id":"H","sit":"balanced","text":"断球后直接发动反击","check":{"attrs":["passing","vision"],"difficulty":29,"tag":"传球+视野"},"success":{"text":"你断球后不停球，直接长传找前场。队友险些单刀。","effects":{"reputation":7,"attrs":{"passing":1}}},"fail":{"text":"断球后长传力量大了。出了边线。","effects":{"stamina":-4}}},
          {"id":"I","sit":"defense","text":"贴身缠斗，不让他转身","check":{"attrs":["strength","pressure"],"difficulty":30,"tag":"对抗+抗压"},"success":{"text":"你贴住他。用身体。他转不了身。只能回传。","effects":{"reputation":6,"attrs":{"strength":1}}},"fail":{"text":"你贴得太紧。他一个转身把你过了。","effects":{"stamina":-5}}},
          {"id":"J","sit":"attack","text":"断球后自己带球推进","check":{"attrs":["dribble","resolve"],"difficulty":30,"tag":"盘带+决断"},"success":{"text":"你断球后带球推进。杀到前场。分球。造险。","effects":{"reputation":7,"attrs":{"dribble":1}}},"fail":{"text":"带球推进被断。对方反抢。","effects":{"stamina":-4}}}
        ]
      },
      {
        text: "对方反击。皮球打穿了整条防线，对方前锋单刀直入。你是最近的回追者。风灌进耳朵。",
        sit: "defense",
        choices: [
          {"id":"K","sit":"defense","text":"全速回追，背后滑铲","check":{"attrs":["tackle","speed"],"difficulty":33,"tag":"铲断+速度"},"success":{"text":"你{elementAdj}地拍马赶到。一记干净的滑铲，球捅出底线。","effects":{"reputation":8,"attrs":{"tackle":1}}},"fail":{"text":"回追慢了一步。滑铲落空。对方晃过门将得分。","effects":{"stamina":-6}},"critical":{"text":"【灵光一闪】铁壁回追。你的滑铲把球和人一起留在了底线外。","effects":{"reputation":14,"attrs":{"tackle":2,"speed":1},"flags":{"keySuccess":true}}}},
          {"id":"L","sit":"defense","text":"用速度缠住他","check":{"attrs":["speed","stamina"],"difficulty":30,"tag":"速度+耐力"},"success":{"text":"你咬牙回追，死死缠住他。他甩不开你，只能减速。","effects":{"reputation":7,"attrs":{"speed":1}}},"fail":{"text":"你追了，但腿灌了铅。他一步抹过你。","effects":{"stamina":-6}}},
          {"id":"M","sit":"defense","text":"卡住身位，封射门角度","check":{"attrs":["positioning","balance"],"difficulty":29,"tag":"站位+平衡"},"success":{"text":"你边退边卡住身位。对方被迫走外线，射门偏出。","effects":{"reputation":6,"attrs":{"positioning":1}}},"fail":{"text":"对方一个变向，你重心丢了。他推射得手。","effects":{"stamina":-5}}},
          {"id":"N","sit":"balanced","text":"断球后长传反击","check":{"attrs":["passing","vision"],"difficulty":28,"tag":"传球+视野"},"success":{"text":"你断球后直接长传找前场。化守为攻。","effects":{"reputation":7,"attrs":{"passing":1}}},"fail":{"text":"长传力量大了。出了边线。","effects":{"stamina":-4}}},
          {"id":"O","sit":"defense","text":"赌一把，连人带球拦下","check":{"attrs":["resolve","power"],"difficulty":33,"tag":"决断+力量"},"success":{"text":"你豁出去了。一个肩撞把人球一起拦下。球权是你的。","effects":{"reputation":6,"attrs":{"resolve":1}}},"fail":{"text":"你扑得太凶。对方一晃，你摔在草皮上。","effects":{"stamina":-6}}}
        ]
      },
      {
        text: "对方围攻。皮球在禁区前沿倒来倒去。你是防线最后一块砖。每个空当都得有人补。",
        sit: "defense",
        choices: [
          {"id":"P","sit":"defense","text":"提前预判，卡住空当","check":{"attrs":["positioning","iq"],"difficulty":30,"tag":"站位+球商"},"success":{"text":"你提前半步卡住空当。对方的直塞被你 intercept 下来。","effects":{"reputation":7,"attrs":{"positioning":1}}},"fail":{"text":"你判断错了方向。空当被打穿。","effects":{"stamina":-4}},"critical":{"text":"【灵光一闪】定海神针。你像能预知未来，每一次补位都恰到好处。","effects":{"reputation":13,"attrs":{"positioning":2,"iq":1},"flags":{"keySuccess":true}}}},
          {"id":"Q","sit":"defense","text":"头球解围","check":{"attrs":["heading","balance"],"difficulty":29,"tag":"头球+平衡"},"success":{"text":"传中飞来。你一头把它顶出禁区。干脆。","effects":{"reputation":6,"attrs":{"heading":1}}},"fail":{"text":"头球顶呲了。球落在对方脚下。又是一脚射门。","effects":{"stamina":-4}}},
          {"id":"R","sit":"defense","text":"封堵射门","check":{"attrs":["positioning","pressure"],"difficulty":31,"tag":"站位+抗压"},"success":{"text":"对方起脚。你伸腿封堵。球打在你腿上弹出。疼。但值。","effects":{"reputation":7,"attrs":{"pressure":1}}},"fail":{"text":"你封晚了。球从你身边飞过。进了。","effects":{"stamina":-5}}},
          {"id":"S","sit":"balanced","text":"解围后组织出球","check":{"attrs":["passing","vision"],"difficulty":28,"tag":"传球+视野"},"success":{"text":"你断球后冷静出球。后场组织。没盲目开大脚。","effects":{"reputation":6,"attrs":{"passing":1}}},"fail":{"text":"出球被断。对方二次进攻。","effects":{"stamina":-4}}},
          {"id":"T","sit":"defense","text":"指挥防线整体前压造越位","check":{"attrs":["iq","pressure"],"difficulty":30,"tag":"球商+抗压"},"success":{"text":"你一声喊。防线整体前压。对方越位。战术成功。","effects":{"reputation":7,"attrs":{"iq":1}}},"fail":{"text":"防线没统一。造越位失败。对方单刀。","effects":{"stamina":-5}}}
        ]
      },
      {
        text: "断球。抬头。对方全线压上，身后是一片开阔地。机会。只有三秒。",
        sit: "attack",
        choices: [
          {"id":"U","sit":"attack","text":"长途奔袭，一条龙","check":{"attrs":["speed","stamina"],"difficulty":35,"tag":"速度+耐力"},"success":{"text":"你{elementAdj}地从中场杀到禁区。过人。射门。进了。全场沸腾。","effects":{"reputation":13,"goals":1,"attrs":{"speed":1}}},"fail":{"text":"奔袭到最后，腿软了。射门偏出。","effects":{"stamina":-6}},"critical":{"text":"【灵光一闪】单骑闯关。你撕碎了整条防线。所有人都站起来了。","effects":{"reputation":20,"goals":1,"attrs":{"speed":2,"stamina":1},"flags":{"keySuccess":true}}}},
          {"id":"V","sit":"attack","text":"分球给位置更好的队友","check":{"attrs":["passing","vision"],"difficulty":29,"tag":"传球+视野"},"success":{"text":"你没贪功。分球。队友推射空门。","effects":{"reputation":9,"assists":1,"attrs":{"passing":1}}},"fail":{"text":"分球力量大了。队友没追上。","effects":{"stamina":-3}}},
          {"id":"W","sit":"balanced","text":"带球推进，吸引防守再分","check":{"attrs":["dribble","iq"],"difficulty":31,"tag":"盘带+球商"},"success":{"text":"你带球推进，吸引两人包夹，分球。队友空位破门。","effects":{"reputation":9,"assists":1,"attrs":{"dribble":1}}},"fail":{"text":"带球被断。反击夭折。","effects":{"stamina":-4}}},
          {"id":"X","sit":"balanced","text":"减速控球，稳住节奏","check":{"attrs":["rhythm","iq"],"difficulty":27,"tag":"节奏+球商"},"success":{"text":"你没急。减速控球。等队友落位。重新组织。","effects":{"reputation":5,"attrs":{"rhythm":1}}},"fail":{"text":"你一减速。对方回防到位。机会没了。","effects":{"stamina":-3}}},
          {"id":"Y","sit":"defense","text":"回追防备对方反抢","check":{"attrs":["tackle","speed"],"difficulty":25,"tag":"铲断+速度"},"success":{"text":"反击被断后你反抢，没让对方打二次反击。","effects":{"reputation":5,"attrs":{"tackle":1}}},"fail":{"text":"反抢扑空。对方长传。你回追得很狼狈。","effects":{"stamina":-5}}}
        ]
      }
    ]
  },

  "DF_拖后型": {
    desc: "站位补位、头球解围、指挥防线",
    events: [
      {
        text: "你是拖后中卫。站位。补位。指挥防线。你不靠速度——你靠脑子。你永远在正确的位置。",
        sit: "defense",
        choices: [
          {"id":"A","sit":"defense","text":"预判站位，拦截直塞","check":{"attrs":["positioning","iq"],"difficulty":32,"tag":"站位+球商"},"success":{"text":"你提前半步卡住位置。对方的直塞被你 intercept。","effects":{"reputation":8,"attrs":{"positioning":1}}},"fail":{"text":"判断错了。被打穿。","effects":{"stamina":-4}},"critical":{"text":"【灵光一闪】你像能预知未来，每一次补位都恰到好处。对方前锋全场隐身。","effects":{"reputation":14,"attrs":{"positioning":2,"iq":1},"flags":{"keySuccess":true}}}},
          {"id":"B","sit":"defense","text":"指挥防线造越位","check":{"attrs":["iq","pressure"],"difficulty":31,"tag":"球商+抗压"},"success":{"text":"你一声喊。防线整体前压。对方越位。","effects":{"reputation":7,"attrs":{"iq":1}}},"fail":{"text":"防线没统一。造越位失败。","effects":{"stamina":-5}}},
          {"id":"C","sit":"defense","text":"头球解围","check":{"attrs":["heading","balance"],"difficulty":29,"tag":"头球+平衡"},"success":{"text":"传中飞来。你一头顶出禁区。","effects":{"reputation":6,"attrs":{"heading":1}}},"fail":{"text":"顶呲了。落在对方脚下。","effects":{"stamina":-4}}},
          {"id":"D","sit":"defense","text":"封堵射门","check":{"attrs":["positioning","pressure"],"difficulty":30,"tag":"站位+抗压"},"success":{"text":"对方起脚。你伸腿封堵。球弹出。","effects":{"reputation":7,"attrs":{"pressure":1}}},"fail":{"text":"封晚了。球进了。","effects":{"stamina":-5}}},
          {"id":"E","sit":"balanced","text":"解围后冷静出球","check":{"attrs":["passing","vision"],"difficulty":28,"tag":"传球+视野"},"success":{"text":"你断球后冷静出球。后场组织。","effects":{"reputation":6,"attrs":{"passing":1}}},"fail":{"text":"出球被断。","effects":{"stamina":-4}}}
        ]
      },
      {
        text: "对方围攻。皮球在禁区前沿倒来倒去。你是防线最后一块砖。每个空当都得有人补。",
        sit: "defense",
        choices: [
          {"id":"F","sit":"defense","text":"提前预判，卡住空当","check":{"attrs":["positioning","iq"],"difficulty":30,"tag":"站位+球商"},"success":{"text":"你提前半步卡住空当。对方的直塞被你 intercept 下来。","effects":{"reputation":7,"attrs":{"positioning":1}}},"fail":{"text":"你判断错了方向。空当被打穿。","effects":{"stamina":-4}},"critical":{"text":"【灵光一闪】定海神针。你像能预知未来，每一次补位都恰到好处。","effects":{"reputation":13,"attrs":{"positioning":2,"iq":1},"flags":{"keySuccess":true}}}},
          {"id":"G","sit":"defense","text":"头球解围","check":{"attrs":["heading","balance"],"difficulty":29,"tag":"头球+平衡"},"success":{"text":"传中飞来。你一头把它顶出禁区。干脆。","effects":{"reputation":6,"attrs":{"heading":1}}},"fail":{"text":"头球顶呲了。球落在对方脚下。又是一脚射门。","effects":{"stamina":-4}}},
          {"id":"H","sit":"defense","text":"封堵射门","check":{"attrs":["positioning","pressure"],"difficulty":31,"tag":"站位+抗压"},"success":{"text":"对方起脚。你伸腿封堵。球打在你腿上弹出。疼。但值。","effects":{"reputation":7,"attrs":{"pressure":1}}},"fail":{"text":"你封晚了。球从你身边飞过。进了。","effects":{"stamina":-5}}},
          {"id":"I","sit":"balanced","text":"解围后组织出球","check":{"attrs":["passing","vision"],"difficulty":28,"tag":"传球+视野"},"success":{"text":"你断球后冷静出球。后场组织。没盲目开大脚。","effects":{"reputation":6,"attrs":{"passing":1}}},"fail":{"text":"出球被断。对方二次进攻。","effects":{"stamina":-4}}},
          {"id":"J","sit":"defense","text":"指挥防线整体前压造越位","check":{"attrs":["iq","pressure"],"difficulty":30,"tag":"球商+抗压"},"success":{"text":"你一声喊。防线整体前压。对方越位。战术成功。","effects":{"reputation":7,"attrs":{"iq":1}}},"fail":{"text":"防线没统一。造越位失败。对方单刀。","effects":{"stamina":-5}}}
        ]
      },
      {
        text: "对方反击。皮球打穿了整条防线，对方前锋单刀直入。你是最近的回追者。风灌进耳朵。",
        sit: "defense",
        choices: [
          {"id":"K","sit":"defense","text":"全速回追，背后滑铲","check":{"attrs":["tackle","speed"],"difficulty":33,"tag":"铲断+速度"},"success":{"text":"你{elementAdj}地拍马赶到。一记干净的滑铲，球捅出底线。","effects":{"reputation":8,"attrs":{"tackle":1}}},"fail":{"text":"回追慢了一步。滑铲落空。对方晃过门将得分。","effects":{"stamina":-6}},"critical":{"text":"【灵光一闪】铁壁回追。你的滑铲把球和人一起留在了底线外。","effects":{"reputation":14,"attrs":{"tackle":2,"speed":1},"flags":{"keySuccess":true}}}},
          {"id":"L","sit":"defense","text":"用速度缠住他","check":{"attrs":["speed","stamina"],"difficulty":30,"tag":"速度+耐力"},"success":{"text":"你咬牙回追，死死缠住他。他甩不开你，只能减速。","effects":{"reputation":7,"attrs":{"speed":1}}},"fail":{"text":"你追了，但腿灌了铅。他一步抹过你。","effects":{"stamina":-6}}},
          {"id":"M","sit":"defense","text":"卡住身位，封射门角度","check":{"attrs":["positioning","balance"],"difficulty":29,"tag":"站位+平衡"},"success":{"text":"你边退边卡住身位。对方被迫走外线，射门偏出。","effects":{"reputation":6,"attrs":{"positioning":1}}},"fail":{"text":"对方一个变向，你重心丢了。他推射得手。","effects":{"stamina":-5}}},
          {"id":"N","sit":"balanced","text":"断球后长传反击","check":{"attrs":["passing","vision"],"difficulty":28,"tag":"传球+视野"},"success":{"text":"你断球后直接长传找前场。化守为攻。","effects":{"reputation":7,"attrs":{"passing":1}}},"fail":{"text":"长传力量大了。出了边线。","effects":{"stamina":-4}}},
          {"id":"O","sit":"defense","text":"赌一把，连人带球拦下","check":{"attrs":["resolve","power"],"difficulty":33,"tag":"决断+力量"},"success":{"text":"你豁出去了。一个肩撞把人球一起拦下。球权是你的。","effects":{"reputation":6,"attrs":{"resolve":1}}},"fail":{"text":"你扑得太凶。对方一晃，你摔在草皮上。","effects":{"stamina":-6}}}
        ]
      },
      {
        text: "角球。你站在禁区里。两个人夹着你。球还没开出，肘部和肩膀已经开始较劲。",
        sit: "balanced",
        choices: [
          {"id":"P","sit":"attack","text":"旱地拔葱，抢点攻门","check":{"attrs":["heading","balance"],"difficulty":34,"tag":"头球+平衡"},"success":{"text":"你拔地而起。额头闷响。球砸进网窝。两个人还挂在你身上。","effects":{"reputation":12,"goals":1,"attrs":{"heading":1}}},"fail":{"text":"起跳被干扰。头球顶偏。","effects":{"stamina":-4}},"critical":{"text":"【灵光一闪】泰山压顶。你带着两个人升空，把球砸进网窝。网绳断了三根。","effects":{"reputation":18,"goals":1,"attrs":{"heading":2},"flags":{"keySuccess":true}}}},
          {"id":"Q","sit":"attack","text":"后插上，抢第二落点","check":{"attrs":["positioning","shooting"],"difficulty":31,"tag":"站位+射门"},"success":{"text":"第一点被顶出。你抢到第二落点。凌空。进了。","effects":{"reputation":11,"goals":1,"attrs":{"positioning":1}}},"fail":{"text":"第二落点没抢到。被解围。","effects":{"stamina":-3}}},
          {"id":"R","sit":"balanced","text":"头球摆渡找队友","check":{"attrs":["heading","passing"],"difficulty":29,"tag":"头球+传球"},"success":{"text":"你头球摆渡。后点队友推射得手。","effects":{"reputation":8,"assists":1,"attrs":{"heading":1}}},"fail":{"text":"摆渡力量不对。队友没够到。","effects":{"stamina":-3}}},
          {"id":"S","sit":"balanced","text":"卡住身位护球","check":{"attrs":["positioning","strength"],"difficulty":27,"tag":"站位+对抗"},"success":{"text":"你卡住身位。第二落点是你的。还有机会。","effects":{"reputation":5,"attrs":{"positioning":1}}},"fail":{"text":"你被挤开。球权丢了。","effects":{"stamina":-3}}},
          {"id":"T","sit":"defense","text":"回防防备快反","check":{"attrs":["intercept","speed"],"difficulty":24,"tag":"拦截+速度"},"success":{"text":"角球被解围后对方快反。你提前回追截下。","effects":{"reputation":6,"attrs":{"intercept":1}}},"fail":{"text":"回追慢了一步。对方反击造险。","effects":{"stamina":-4}}}
        ]
      },
      {
        text: "对方推进。皮球经过中场。你是那道闸。对手的十号正带球逼近。",
        sit: "defense",
        choices: [
          {"id":"U","sit":"defense","text":"正面铲断","check":{"attrs":["tackle","strength"],"difficulty":32,"tag":"铲断+对抗"},"success":{"text":"你{elementAdj}地一脚铲断。连球带人。干净。球权回来了。","effects":{"reputation":8,"attrs":{"tackle":1}}},"fail":{"text":"铲空了。他抹过去了。你摔在草皮上。","effects":{"stamina":-5}},"critical":{"text":"【灵光一闪】铁壁。他连变两次向，你纹丝不动，看准时机一脚断球。","effects":{"reputation":14,"attrs":{"tackle":2},"flags":{"keySuccess":true}}}},
          {"id":"V","sit":"defense","text":"卡住线路，逼他回传","check":{"attrs":["positioning","iq"],"difficulty":28,"tag":"站位+球商"},"success":{"text":"你没贸然出脚。卡住传球线路。他被迫回传。危机解除。","effects":{"reputation":6,"attrs":{"positioning":1}}},"fail":{"text":"你卡错了位置。他直塞打穿。","effects":{"stamina":-4}}},
          {"id":"W","sit":"balanced","text":"断球后直接发动反击","check":{"attrs":["passing","vision"],"difficulty":29,"tag":"传球+视野"},"success":{"text":"你断球后不停球，直接长传找前场。队友险些单刀。","effects":{"reputation":7,"attrs":{"passing":1}}},"fail":{"text":"断球后长传力量大了。出了边线。","effects":{"stamina":-4}}},
          {"id":"X","sit":"defense","text":"贴身缠斗，不让他转身","check":{"attrs":["strength","pressure"],"difficulty":30,"tag":"对抗+抗压"},"success":{"text":"你贴住他。用身体。他转不了身。只能回传。","effects":{"reputation":6,"attrs":{"strength":1}}},"fail":{"text":"你贴得太紧。他一个转身把你过了。","effects":{"stamina":-5}}},
          {"id":"Y","sit":"attack","text":"断球后自己带球推进","check":{"attrs":["dribble","resolve"],"difficulty":30,"tag":"盘带+决断"},"success":{"text":"你断球后带球推进。杀到前场。分球。造险。","effects":{"reputation":7,"attrs":{"dribble":1}}},"fail":{"text":"带球推进被断。对方反抢。","effects":{"stamina":-4}}}
        ]
      }
    ]
  },

  "DF_带刀型": {
    desc: "头球远射、攻防一体",
    events: [
      {
        text: "你是带刀后卫。防守之外，你还有进攻的野心。头球。远射。定位球。你是后场的隐藏杀器。",
        sit: "balanced",
        choices: [
          {"id":"A","sit":"attack","text":"定位球头球攻门","check":{"attrs":["heading","balance"],"difficulty":34,"tag":"头球+平衡"},"success":{"text":"角球。你前插。拔地而起。头槌。球进了。","effects":{"reputation":12,"goals":1,"attrs":{"heading":1}}},"fail":{"text":"头球顶偏。","effects":{"stamina":-4}},"critical":{"text":"【灵光一闪】你定位球抢点。带着两人升空。头槌破门。后卫里的杀手。","effects":{"reputation":19,"goals":1,"attrs":{"heading":2,"balance":1},"flags":{"keySuccess":true}}}},
          {"id":"B","sit":"attack","text":"后场长传制导","check":{"attrs":["passing","vision"],"difficulty":31,"tag":"传球+视野"},"success":{"text":"你后场一记长传。精准找到前锋。单刀破门。","effects":{"reputation":9,"assists":1,"attrs":{"passing":1}}},"fail":{"text":"长传出界。","effects":{"stamina":-3}}},
          {"id":"C","sit":"attack","text":"远射","check":{"attrs":["shooting","power"],"difficulty":33,"tag":"射门+力量"},"success":{"text":"你后场插上。远射。球进了。","effects":{"reputation":11,"goals":1,"attrs":{"shooting":1}}},"fail":{"text":"远射打飞。","effects":{"stamina":-4}}},
          {"id":"D","sit":"defense","text":"回防铲断","check":{"attrs":["tackle","speed"],"difficulty":30,"tag":"铲断+速度"},"success":{"text":"你回防。一脚铲断。化解反击。","effects":{"reputation":7,"attrs":{"tackle":1}}},"fail":{"text":"回防慢了。被过。","effects":{"stamina":-5}}},
          {"id":"E","sit":"defense","text":"站位防守","check":{"attrs":["positioning","balance"],"difficulty":28,"tag":"站位+平衡"},"success":{"text":"你卡住位置。对方过不去。","effects":{"reputation":6,"attrs":{"positioning":1}}},"fail":{"text":"被过。","effects":{"stamina":-4}}}
        ]
      },
      {
        text: "角球。你站在禁区里。两个人夹着你。球还没开出，肘部和肩膀已经开始较劲。",
        sit: "balanced",
        choices: [
          {"id":"F","sit":"attack","text":"旱地拔葱，抢点攻门","check":{"attrs":["heading","balance"],"difficulty":34,"tag":"头球+平衡"},"success":{"text":"你拔地而起。额头闷响。球砸进网窝。两个人还挂在你身上。","effects":{"reputation":12,"goals":1,"attrs":{"heading":1}}},"fail":{"text":"起跳被干扰。头球顶偏。","effects":{"stamina":-4}},"critical":{"text":"【灵光一闪】泰山压顶。你带着两个人升空，把球砸进网窝。网绳断了三根。","effects":{"reputation":18,"goals":1,"attrs":{"heading":2},"flags":{"keySuccess":true}}}},
          {"id":"G","sit":"attack","text":"后插上，抢第二落点","check":{"attrs":["positioning","shooting"],"difficulty":31,"tag":"站位+射门"},"success":{"text":"第一点被顶出。你抢到第二落点。凌空。进了。","effects":{"reputation":11,"goals":1,"attrs":{"positioning":1}}},"fail":{"text":"第二落点没抢到。被解围。","effects":{"stamina":-3}}},
          {"id":"H","sit":"balanced","text":"头球摆渡找队友","check":{"attrs":["heading","passing"],"difficulty":29,"tag":"头球+传球"},"success":{"text":"你头球摆渡。后点队友推射得手。","effects":{"reputation":8,"assists":1,"attrs":{"heading":1}}},"fail":{"text":"摆渡力量不对。队友没够到。","effects":{"stamina":-3}}},
          {"id":"I","sit":"balanced","text":"卡住身位护球","check":{"attrs":["positioning","strength"],"difficulty":27,"tag":"站位+对抗"},"success":{"text":"你卡住身位。第二落点是你的。还有机会。","effects":{"reputation":5,"attrs":{"positioning":1}}},"fail":{"text":"你被挤开。球权丢了。","effects":{"stamina":-3}}},
          {"id":"J","sit":"defense","text":"回防防备快反","check":{"attrs":["intercept","speed"],"difficulty":24,"tag":"拦截+速度"},"success":{"text":"角球被解围后对方快反。你提前回追截下。","effects":{"reputation":6,"attrs":{"intercept":1}}},"fail":{"text":"回追慢了一步。对方反击造险。","effects":{"stamina":-4}}}
        ]
      },
      {
        text: "对方围攻。皮球在禁区前沿倒来倒去。你是防线最后一块砖。每个空当都得有人补。",
        sit: "defense",
        choices: [
          {"id":"K","sit":"defense","text":"提前预判，卡住空当","check":{"attrs":["positioning","iq"],"difficulty":30,"tag":"站位+球商"},"success":{"text":"你提前半步卡住空当。对方的直塞被你 intercept 下来。","effects":{"reputation":7,"attrs":{"positioning":1}}},"fail":{"text":"你判断错了方向。空当被打穿。","effects":{"stamina":-4}},"critical":{"text":"【灵光一闪】定海神针。你像能预知未来，每一次补位都恰到好处。","effects":{"reputation":13,"attrs":{"positioning":2,"iq":1},"flags":{"keySuccess":true}}}},
          {"id":"L","sit":"defense","text":"头球解围","check":{"attrs":["heading","balance"],"difficulty":29,"tag":"头球+平衡"},"success":{"text":"传中飞来。你一头把它顶出禁区。干脆。","effects":{"reputation":6,"attrs":{"heading":1}}},"fail":{"text":"头球顶呲了。球落在对方脚下。又是一脚射门。","effects":{"stamina":-4}}},
          {"id":"M","sit":"defense","text":"封堵射门","check":{"attrs":["positioning","pressure"],"difficulty":31,"tag":"站位+抗压"},"success":{"text":"对方起脚。你伸腿封堵。球打在你腿上弹出。疼。但值。","effects":{"reputation":7,"attrs":{"pressure":1}}},"fail":{"text":"你封晚了。球从你身边飞过。进了。","effects":{"stamina":-5}}},
          {"id":"N","sit":"balanced","text":"解围后组织出球","check":{"attrs":["passing","vision"],"difficulty":28,"tag":"传球+视野"},"success":{"text":"你断球后冷静出球。后场组织。没盲目开大脚。","effects":{"reputation":6,"attrs":{"passing":1}}},"fail":{"text":"出球被断。对方二次进攻。","effects":{"stamina":-4}}},
          {"id":"O","sit":"defense","text":"指挥防线整体前压造越位","check":{"attrs":["iq","pressure"],"difficulty":30,"tag":"球商+抗压"},"success":{"text":"你一声喊。防线整体前压。对方越位。战术成功。","effects":{"reputation":7,"attrs":{"iq":1}}},"fail":{"text":"防线没统一。造越位失败。对方单刀。","effects":{"stamina":-5}}}
        ]
      },
      {
        text: "禁区前沿。你背身接到分球，转身的一瞬，面前只有半步空间。汗水顺着眉骨滑下来。",
        sit: "attack",
        choices: [
          {"id":"P","sit":"attack","text":"拔脚怒射，轰向死角","check":{"attrs":["shooting","power"],"difficulty":36,"tag":"射门+力量"},"success":{"text":"脚背吃准了部位。球带着{elementAdj}的弧线，直挂死角。门将连手都没伸。","effects":{"reputation":12,"goals":1,"attrs":{"shooting":1}}},"fail":{"text":"射门没压住。球高出横梁，飞进了后排看台。你懊恼地捶了下大腿。","effects":{"stamina":-3}},"critical":{"text":"【灵光一闪】世界波。球像一颗出膛的炮弹，砸进网窝，网绳还在颤。全场站起来。","effects":{"reputation":20,"goals":1,"attrs":{"shooting":2},"flags":{"keySuccess":true}}}},
          {"id":"Q","sit":"attack","text":"调整一步，推射远角","check":{"attrs":["shooting","resolve"],"difficulty":32,"tag":"射门+决断"},"success":{"text":"你多调整了一步。推射。球贴着草皮滚入远角。稳。","effects":{"reputation":10,"goals":1,"attrs":{"shooting":1}}},"fail":{"text":"调整慢了。后卫伸脚一挡。球弹走了。","effects":{"stamina":-3}}},
          {"id":"R","sit":"balanced","text":"分给位置更好的队友","check":{"attrs":["passing","vision"],"difficulty":28,"tag":"传球+视野"},"success":{"text":"你没贪。横传。队友推射空门得手。他朝你指了指。","effects":{"reputation":7,"assists":1,"attrs":{"passing":1}}},"fail":{"text":"横传力量大了。队友没追上。球出了底线。","effects":{"stamina":-3}}},
          {"id":"S","sit":"balanced","text":"护球观察，等空当","check":{"attrs":["positioning","balance"],"difficulty":26,"tag":"站位+平衡"},"success":{"text":"你护住球，等防线露出破绽。一记直塞，队友插上造险。","effects":{"reputation":5,"attrs":{"positioning":1}}},"fail":{"text":"你被挤开了。后背撞在广告牌上，铁皮冰凉。","effects":{"stamina":-3}}},
          {"id":"T","sit":"defense","text":"丢球就地反抢","check":{"attrs":["tackle","intercept"],"difficulty":24,"tag":"铲断+拦截"},"success":{"text":"射门被封堵后你就地反抢，掐断了对方的出球。肺在灼烧。","effects":{"reputation":5,"attrs":{"tackle":1}}},"fail":{"text":"反抢扑空。对方顺势推进。你只能看着他们的背影。","effects":{"stamina":-4}}}
        ]
      },
      {
        text: "对方反击。皮球打穿了整条防线，对方前锋单刀直入。你是最近的回追者。风灌进耳朵。",
        sit: "defense",
        choices: [
          {"id":"U","sit":"defense","text":"全速回追，背后滑铲","check":{"attrs":["tackle","speed"],"difficulty":33,"tag":"铲断+速度"},"success":{"text":"你{elementAdj}地拍马赶到。一记干净的滑铲，球捅出底线。","effects":{"reputation":8,"attrs":{"tackle":1}}},"fail":{"text":"回追慢了一步。滑铲落空。对方晃过门将得分。","effects":{"stamina":-6}},"critical":{"text":"【灵光一闪】铁壁回追。你的滑铲把球和人一起留在了底线外。","effects":{"reputation":14,"attrs":{"tackle":2,"speed":1},"flags":{"keySuccess":true}}}},
          {"id":"V","sit":"defense","text":"用速度缠住他","check":{"attrs":["speed","stamina"],"difficulty":30,"tag":"速度+耐力"},"success":{"text":"你咬牙回追，死死缠住他。他甩不开你，只能减速。","effects":{"reputation":7,"attrs":{"speed":1}}},"fail":{"text":"你追了，但腿灌了铅。他一步抹过你。","effects":{"stamina":-6}}},
          {"id":"W","sit":"defense","text":"卡住身位，封射门角度","check":{"attrs":["positioning","balance"],"difficulty":29,"tag":"站位+平衡"},"success":{"text":"你边退边卡住身位。对方被迫走外线，射门偏出。","effects":{"reputation":6,"attrs":{"positioning":1}}},"fail":{"text":"对方一个变向，你重心丢了。他推射得手。","effects":{"stamina":-5}}},
          {"id":"X","sit":"balanced","text":"断球后长传反击","check":{"attrs":["passing","vision"],"difficulty":28,"tag":"传球+视野"},"success":{"text":"你断球后直接长传找前场。化守为攻。","effects":{"reputation":7,"attrs":{"passing":1}}},"fail":{"text":"长传力量大了。出了边线。","effects":{"stamina":-4}}},
          {"id":"Y","sit":"defense","text":"赌一把，连人带球拦下","check":{"attrs":["resolve","power"],"difficulty":33,"tag":"决断+力量"},"success":{"text":"你豁出去了。一个肩撞把人球一起拦下。球权是你的。","effects":{"reputation":6,"attrs":{"resolve":1}}},"fail":{"text":"你扑得太凶。对方一晃，你摔在草皮上。","effects":{"stamina":-6}}}
        ]
      }
    ]
  },

  "GK_门线型": {
    desc: "反应扑救、稳如磐石",
    events: [
      {
        text: "你是门线型门将。反应。扑救。稳如磐石。你站在门线上，就是对方前锋的绝望。",
        sit: "defense",
        choices: [
          {"id":"A","sit":"defense","text":"门线神扑","check":{"attrs":["positioning","resolve"],"difficulty":34,"tag":"站位+决断"},"success":{"text":"对方近在咫尺的射门。你反应神速。扑出去了。","effects":{"reputation":10,"attrs":{"positioning":1}}},"fail":{"text":"反应慢了。球进了。","effects":{"stamina":-5}},"critical":{"text":"【灵光一闪】你高接低挡，把对方必进球一次次拒之门外。一夫当关。","effects":{"reputation":16,"attrs":{"positioning":2,"resolve":1},"flags":{"keySuccess":true}}}},
          {"id":"B","sit":"defense","text":"封角度","check":{"attrs":["positioning","balance"],"difficulty":30,"tag":"站位+平衡"},"success":{"text":"你封住角度。对方射门打偏。","effects":{"reputation":7,"attrs":{"positioning":1}}},"fail":{"text":"角度没封住。球进了。","effects":{"stamina":-4}}},
          {"id":"C","sit":"defense","text":"扑单刀","check":{"attrs":["positioning","speed"],"difficulty":32,"tag":"站位+速度"},"success":{"text":"对方单刀。你出击。扑出去了。","effects":{"reputation":8,"attrs":{"positioning":1}}},"fail":{"text":"出击晚了。被过。","effects":{"stamina":-5}}},
          {"id":"D","sit":"balanced","text":"摘球发动反击","check":{"attrs":["passing","vision"],"difficulty":28,"tag":"传球+视野"},"success":{"text":"你摘球。手抛球发动快反。","effects":{"reputation":7,"attrs":{"passing":1}}},"fail":{"text":"手抛球被断。","effects":{"stamina":-3}}},
          {"id":"E","sit":"defense","text":"指挥防线","check":{"attrs":["iq","pressure"],"difficulty":27,"tag":"球商+抗压"},"success":{"text":"你指挥防线。收紧。对方没空当。","effects":{"reputation":6,"attrs":{"iq":1}}},"fail":{"text":"防线漏人。","effects":{"stamina":-4}}}
        ]
      },
      {
        text: "对方起脚了。球带着旋转飞向球门。所有人的目光都聚在你身上。你是最后一道墙。",
        sit: "defense",
        choices: [
          {"id":"F","sit":"defense","text":"侧身飞扑","check":{"attrs":["positioning","resolve"],"difficulty":33,"tag":"站位+决断"},"success":{"text":"你判断对了方向。侧身飞扑。指尖把球托出横梁。","effects":{"reputation":10,"attrs":{"positioning":1}}},"fail":{"text":"你扑错了方向。球进了。你捶了下草皮。","effects":{"stamina":-5}},"critical":{"text":"【灵光一闪】神扑。你整个人横在空中，把必进球拒之门外。全场惊呼。","effects":{"reputation":16,"attrs":{"positioning":2,"resolve":1},"flags":{"keySuccess":true}}}},
          {"id":"G","sit":"defense","text":"稳住站位，封住角度","check":{"attrs":["positioning","balance"],"difficulty":30,"tag":"站位+平衡"},"success":{"text":"你没贸然扑。稳住站位。对方射门角度被封死，打偏了。","effects":{"reputation":7,"attrs":{"positioning":1}}},"fail":{"text":"你站位偏了。球从缝隙里钻进去。","effects":{"stamina":-4}}},
          {"id":"H","sit":"defense","text":"果断出击，缩小角度","check":{"attrs":["positioning","speed"],"difficulty":32,"tag":"站位+速度"},"success":{"text":"你果断出击。单刀。你张开双臂。对方慌了，射偏。","effects":{"reputation":8,"attrs":{"positioning":1}}},"fail":{"text":"你出击晚了。对方挑射。球进了。","effects":{"stamina":-5}}},
          {"id":"I","sit":"balanced","text":"摘球后手抛球发动反击","check":{"attrs":["passing","vision"],"difficulty":28,"tag":"传球+视野"},"success":{"text":"你稳稳摘球。手抛球发动快反。队友险些单刀。","effects":{"reputation":7,"attrs":{"passing":1}}},"fail":{"text":"手抛球力量小了。被对方拦截。","effects":{"stamina":-3}}},
          {"id":"J","sit":"defense","text":"大声指挥防线站位","check":{"attrs":["iq","pressure"],"difficulty":27,"tag":"球商+抗压"},"success":{"text":"你大声指挥。防线收紧。对方找不到空当。","effects":{"reputation":6,"attrs":{"iq":1}}},"fail":{"text":"防线没听你的。漏人。对方射门。你补救不及。","effects":{"stamina":-4}}}
        ]
      },
      {
        text: "对方一记直塞打穿防线。前锋高速插上。出击，还是守门线？电光石火。",
        sit: "defense",
        choices: [
          {"id":"K","sit":"defense","text":"果断出击，脚下解围","check":{"attrs":["positioning","speed"],"difficulty":33,"tag":"站位+速度"},"success":{"text":"你冲出禁区。抢在对方之前。一脚把球踢出边线。清道夫。","effects":{"reputation":9,"attrs":{"positioning":1}}},"fail":{"text":"你出击慢了。对方先一步捅射。球进了。","effects":{"stamina":-5}},"critical":{"text":"【灵光一闪】出击如闪电。你在禁区外把球解围，还顺势发动了反击。","effects":{"reputation":15,"attrs":{"positioning":2,"speed":1},"flags":{"keySuccess":true}}}},
          {"id":"L","sit":"defense","text":"守住门线，等他射","check":{"attrs":["positioning","balance"],"difficulty":31,"tag":"站位+平衡"},"success":{"text":"你沉住气。守门线。对方射门。你扑出去了。","effects":{"reputation":8,"attrs":{"positioning":1}}},"fail":{"text":"你站死了。对方推射远角。进了。","effects":{"stamina":-4}}},
          {"id":"M","sit":"defense","text":"张开双臂，压迫射门角度","check":{"attrs":["pressure","resolve"],"difficulty":30,"tag":"抗压+决断"},"success":{"text":"你冲出来张开双臂。对方压力之下射偏。","effects":{"reputation":7,"attrs":{"pressure":1}}},"fail":{"text":"对方很冷静。晃过你。推空门。","effects":{"stamina":-5}}},
          {"id":"N","sit":"balanced","text":"解围后长传找前场","check":{"attrs":["passing","vision"],"difficulty":29,"tag":"传球+视野"},"success":{"text":"你解围后直接长传找前场。化守为攻。","effects":{"reputation":7,"attrs":{"passing":1}}},"fail":{"text":"长传力量大了。出了边线。","effects":{"stamina":-3}}},
          {"id":"O","sit":"defense","text":"指挥后卫补位","check":{"attrs":["iq","pressure"],"difficulty":27,"tag":"球商+抗压"},"success":{"text":"你大喊。后卫回追补位。危机化解。","effects":{"reputation":6,"attrs":{"iq":1}}},"fail":{"text":"后卫没补上。对方单刀。你扑救不及。","effects":{"stamina":-4}}}
        ]
      },
      {
        text: "对方围攻。皮球在禁区前沿倒来倒去。你是防线最后一块砖。每个空当都得有人补。",
        sit: "defense",
        choices: [
          {"id":"P","sit":"defense","text":"提前预判，卡住空当","check":{"attrs":["positioning","iq"],"difficulty":30,"tag":"站位+球商"},"success":{"text":"你提前半步卡住空当。对方的直塞被你 intercept 下来。","effects":{"reputation":7,"attrs":{"positioning":1}}},"fail":{"text":"你判断错了方向。空当被打穿。","effects":{"stamina":-4}},"critical":{"text":"【灵光一闪】定海神针。你像能预知未来，每一次补位都恰到好处。","effects":{"reputation":13,"attrs":{"positioning":2,"iq":1},"flags":{"keySuccess":true}}}},
          {"id":"Q","sit":"defense","text":"头球解围","check":{"attrs":["heading","balance"],"difficulty":29,"tag":"头球+平衡"},"success":{"text":"传中飞来。你一头把它顶出禁区。干脆。","effects":{"reputation":6,"attrs":{"heading":1}}},"fail":{"text":"头球顶呲了。球落在对方脚下。又是一脚射门。","effects":{"stamina":-4}}},
          {"id":"R","sit":"defense","text":"封堵射门","check":{"attrs":["positioning","pressure"],"difficulty":31,"tag":"站位+抗压"},"success":{"text":"对方起脚。你伸腿封堵。球打在你腿上弹出。疼。但值。","effects":{"reputation":7,"attrs":{"pressure":1}}},"fail":{"text":"你封晚了。球从你身边飞过。进了。","effects":{"stamina":-5}}},
          {"id":"S","sit":"balanced","text":"解围后组织出球","check":{"attrs":["passing","vision"],"difficulty":28,"tag":"传球+视野"},"success":{"text":"你断球后冷静出球。后场组织。没盲目开大脚。","effects":{"reputation":6,"attrs":{"passing":1}}},"fail":{"text":"出球被断。对方二次进攻。","effects":{"stamina":-4}}},
          {"id":"T","sit":"defense","text":"指挥防线整体前压造越位","check":{"attrs":["iq","pressure"],"difficulty":30,"tag":"球商+抗压"},"success":{"text":"你一声喊。防线整体前压。对方越位。战术成功。","effects":{"reputation":7,"attrs":{"iq":1}}},"fail":{"text":"防线没统一。造越位失败。对方单刀。","effects":{"stamina":-5}}}
        ]
      },
      {
        text: "角球。你站在禁区里。两个人夹着你。球还没开出，肘部和肩膀已经开始较劲。",
        sit: "balanced",
        choices: [
          {"id":"U","sit":"attack","text":"旱地拔葱，抢点攻门","check":{"attrs":["heading","balance"],"difficulty":34,"tag":"头球+平衡"},"success":{"text":"你拔地而起。额头闷响。球砸进网窝。两个人还挂在你身上。","effects":{"reputation":12,"goals":1,"attrs":{"heading":1}}},"fail":{"text":"起跳被干扰。头球顶偏。","effects":{"stamina":-4}},"critical":{"text":"【灵光一闪】泰山压顶。你带着两个人升空，把球砸进网窝。网绳断了三根。","effects":{"reputation":18,"goals":1,"attrs":{"heading":2},"flags":{"keySuccess":true}}}},
          {"id":"V","sit":"attack","text":"后插上，抢第二落点","check":{"attrs":["positioning","shooting"],"difficulty":31,"tag":"站位+射门"},"success":{"text":"第一点被顶出。你抢到第二落点。凌空。进了。","effects":{"reputation":11,"goals":1,"attrs":{"positioning":1}}},"fail":{"text":"第二落点没抢到。被解围。","effects":{"stamina":-3}}},
          {"id":"W","sit":"balanced","text":"头球摆渡找队友","check":{"attrs":["heading","passing"],"difficulty":29,"tag":"头球+传球"},"success":{"text":"你头球摆渡。后点队友推射得手。","effects":{"reputation":8,"assists":1,"attrs":{"heading":1}}},"fail":{"text":"摆渡力量不对。队友没够到。","effects":{"stamina":-3}}},
          {"id":"X","sit":"balanced","text":"卡住身位护球","check":{"attrs":["positioning","strength"],"difficulty":27,"tag":"站位+对抗"},"success":{"text":"你卡住身位。第二落点是你的。还有机会。","effects":{"reputation":5,"attrs":{"positioning":1}}},"fail":{"text":"你被挤开。球权丢了。","effects":{"stamina":-3}}},
          {"id":"Y","sit":"defense","text":"回防防备快反","check":{"attrs":["intercept","speed"],"difficulty":24,"tag":"拦截+速度"},"success":{"text":"角球被解围后对方快反。你提前回追截下。","effects":{"reputation":6,"attrs":{"intercept":1}}},"fail":{"text":"回追慢了一步。对方反击造险。","effects":{"stamina":-4}}}
        ]
      }
    ]
  },

  "GK_出击型": {
    desc: "出击解围、清道夫门将",
    events: [
      {
        text: "你是出击型门将。清道夫。你活动范围大，敢出击，脚下技术好。你是后场多出来的一个后卫。",
        sit: "defense",
        choices: [
          {"id":"A","sit":"defense","text":"出击解围","check":{"attrs":["positioning","speed"],"difficulty":33,"tag":"站位+速度"},"success":{"text":"对方直塞。你冲出禁区。一脚解围。清道夫。","effects":{"reputation":9,"attrs":{"positioning":1}}},"fail":{"text":"出击慢了。被挑射。","effects":{"stamina":-5}},"critical":{"text":"【灵光一闪】你出击如闪电，禁区外解围还顺势发动反击。门卫。","effects":{"reputation":15,"attrs":{"positioning":2,"speed":1},"flags":{"keySuccess":true}}}},
          {"id":"B","sit":"defense","text":"扑单刀","check":{"attrs":["positioning","resolve"],"difficulty":32,"tag":"站位+决断"},"success":{"text":"对方单刀。你出击。张开双臂。扑出去了。","effects":{"reputation":8,"attrs":{"positioning":1}}},"fail":{"text":"被晃过。推空门。","effects":{"stamina":-5}}},
          {"id":"C","sit":"balanced","text":"长传发动进攻","check":{"attrs":["passing","vision"],"difficulty":30,"tag":"传球+视野"},"success":{"text":"你摘球。一记长传。精准找到前锋。","effects":{"reputation":8,"assists":1,"attrs":{"passing":1}}},"fail":{"text":"长传出界。","effects":{"stamina":-3}}},
          {"id":"D","sit":"defense","text":"守门线扑救","check":{"attrs":["positioning","balance"],"difficulty":30,"tag":"站位+平衡"},"success":{"text":"你退回门线。扑救。化解险情。","effects":{"reputation":7,"attrs":{"positioning":1}}},"fail":{"text":"扑救脱手。补射进了。","effects":{"stamina":-4}}},
          {"id":"E","sit":"defense","text":"指挥防线","check":{"attrs":["iq","pressure"],"difficulty":27,"tag":"球商+抗压"},"success":{"text":"你指挥防线。整体压上。","effects":{"reputation":6,"attrs":{"iq":1}}},"fail":{"text":"防线没跟上。","effects":{"stamina":-4}}}
        ]
      },
      {
        text: "对方一记直塞打穿防线。前锋高速插上。出击，还是守门线？电光石火。",
        sit: "defense",
        choices: [
          {"id":"F","sit":"defense","text":"果断出击，脚下解围","check":{"attrs":["positioning","speed"],"difficulty":33,"tag":"站位+速度"},"success":{"text":"你冲出禁区。抢在对方之前。一脚把球踢出边线。清道夫。","effects":{"reputation":9,"attrs":{"positioning":1}}},"fail":{"text":"你出击慢了。对方先一步捅射。球进了。","effects":{"stamina":-5}},"critical":{"text":"【灵光一闪】出击如闪电。你在禁区外把球解围，还顺势发动了反击。","effects":{"reputation":15,"attrs":{"positioning":2,"speed":1},"flags":{"keySuccess":true}}}},
          {"id":"G","sit":"defense","text":"守住门线，等他射","check":{"attrs":["positioning","balance"],"difficulty":31,"tag":"站位+平衡"},"success":{"text":"你沉住气。守门线。对方射门。你扑出去了。","effects":{"reputation":8,"attrs":{"positioning":1}}},"fail":{"text":"你站死了。对方推射远角。进了。","effects":{"stamina":-4}}},
          {"id":"H","sit":"defense","text":"张开双臂，压迫射门角度","check":{"attrs":["pressure","resolve"],"difficulty":30,"tag":"抗压+决断"},"success":{"text":"你冲出来张开双臂。对方压力之下射偏。","effects":{"reputation":7,"attrs":{"pressure":1}}},"fail":{"text":"对方很冷静。晃过你。推空门。","effects":{"stamina":-5}}},
          {"id":"I","sit":"balanced","text":"解围后长传找前场","check":{"attrs":["passing","vision"],"difficulty":29,"tag":"传球+视野"},"success":{"text":"你解围后直接长传找前场。化守为攻。","effects":{"reputation":7,"attrs":{"passing":1}}},"fail":{"text":"长传力量大了。出了边线。","effects":{"stamina":-3}}},
          {"id":"J","sit":"defense","text":"指挥后卫补位","check":{"attrs":["iq","pressure"],"difficulty":27,"tag":"球商+抗压"},"success":{"text":"你大喊。后卫回追补位。危机化解。","effects":{"reputation":6,"attrs":{"iq":1}}},"fail":{"text":"后卫没补上。对方单刀。你扑救不及。","effects":{"stamina":-4}}}
        ]
      },
      {
        text: "对方起脚了。球带着旋转飞向球门。所有人的目光都聚在你身上。你是最后一道墙。",
        sit: "defense",
        choices: [
          {"id":"K","sit":"defense","text":"侧身飞扑","check":{"attrs":["positioning","resolve"],"difficulty":33,"tag":"站位+决断"},"success":{"text":"你判断对了方向。侧身飞扑。指尖把球托出横梁。","effects":{"reputation":10,"attrs":{"positioning":1}}},"fail":{"text":"你扑错了方向。球进了。你捶了下草皮。","effects":{"stamina":-5}},"critical":{"text":"【灵光一闪】神扑。你整个人横在空中，把必进球拒之门外。全场惊呼。","effects":{"reputation":16,"attrs":{"positioning":2,"resolve":1},"flags":{"keySuccess":true}}}},
          {"id":"L","sit":"defense","text":"稳住站位，封住角度","check":{"attrs":["positioning","balance"],"difficulty":30,"tag":"站位+平衡"},"success":{"text":"你没贸然扑。稳住站位。对方射门角度被封死，打偏了。","effects":{"reputation":7,"attrs":{"positioning":1}}},"fail":{"text":"你站位偏了。球从缝隙里钻进去。","effects":{"stamina":-4}}},
          {"id":"M","sit":"defense","text":"果断出击，缩小角度","check":{"attrs":["positioning","speed"],"difficulty":32,"tag":"站位+速度"},"success":{"text":"你果断出击。单刀。你张开双臂。对方慌了，射偏。","effects":{"reputation":8,"attrs":{"positioning":1}}},"fail":{"text":"你出击晚了。对方挑射。球进了。","effects":{"stamina":-5}}},
          {"id":"N","sit":"balanced","text":"摘球后手抛球发动反击","check":{"attrs":["passing","vision"],"difficulty":28,"tag":"传球+视野"},"success":{"text":"你稳稳摘球。手抛球发动快反。队友险些单刀。","effects":{"reputation":7,"attrs":{"passing":1}}},"fail":{"text":"手抛球力量小了。被对方拦截。","effects":{"stamina":-3}}},
          {"id":"O","sit":"defense","text":"大声指挥防线站位","check":{"attrs":["iq","pressure"],"difficulty":27,"tag":"球商+抗压"},"success":{"text":"你大声指挥。防线收紧。对方找不到空当。","effects":{"reputation":6,"attrs":{"iq":1}}},"fail":{"text":"防线没听你的。漏人。对方射门。你补救不及。","effects":{"stamina":-4}}}
        ]
      },
      {
        text: "对方围攻。皮球在禁区前沿倒来倒去。你是防线最后一块砖。每个空当都得有人补。",
        sit: "defense",
        choices: [
          {"id":"P","sit":"defense","text":"提前预判，卡住空当","check":{"attrs":["positioning","iq"],"difficulty":30,"tag":"站位+球商"},"success":{"text":"你提前半步卡住空当。对方的直塞被你 intercept 下来。","effects":{"reputation":7,"attrs":{"positioning":1}}},"fail":{"text":"你判断错了方向。空当被打穿。","effects":{"stamina":-4}},"critical":{"text":"【灵光一闪】定海神针。你像能预知未来，每一次补位都恰到好处。","effects":{"reputation":13,"attrs":{"positioning":2,"iq":1},"flags":{"keySuccess":true}}}},
          {"id":"Q","sit":"defense","text":"头球解围","check":{"attrs":["heading","balance"],"difficulty":29,"tag":"头球+平衡"},"success":{"text":"传中飞来。你一头把它顶出禁区。干脆。","effects":{"reputation":6,"attrs":{"heading":1}}},"fail":{"text":"头球顶呲了。球落在对方脚下。又是一脚射门。","effects":{"stamina":-4}}},
          {"id":"R","sit":"defense","text":"封堵射门","check":{"attrs":["positioning","pressure"],"difficulty":31,"tag":"站位+抗压"},"success":{"text":"对方起脚。你伸腿封堵。球打在你腿上弹出。疼。但值。","effects":{"reputation":7,"attrs":{"pressure":1}}},"fail":{"text":"你封晚了。球从你身边飞过。进了。","effects":{"stamina":-5}}},
          {"id":"S","sit":"balanced","text":"解围后组织出球","check":{"attrs":["passing","vision"],"difficulty":28,"tag":"传球+视野"},"success":{"text":"你断球后冷静出球。后场组织。没盲目开大脚。","effects":{"reputation":6,"attrs":{"passing":1}}},"fail":{"text":"出球被断。对方二次进攻。","effects":{"stamina":-4}}},
          {"id":"T","sit":"defense","text":"指挥防线整体前压造越位","check":{"attrs":["iq","pressure"],"difficulty":30,"tag":"球商+抗压"},"success":{"text":"你一声喊。防线整体前压。对方越位。战术成功。","effects":{"reputation":7,"attrs":{"iq":1}}},"fail":{"text":"防线没统一。造越位失败。对方单刀。","effects":{"stamina":-5}}}
        ]
      },
      {
        text: "断球。抬头。对方全线压上，身后是一片开阔地。机会。只有三秒。",
        sit: "attack",
        choices: [
          {"id":"U","sit":"attack","text":"长途奔袭，一条龙","check":{"attrs":["speed","stamina"],"difficulty":35,"tag":"速度+耐力"},"success":{"text":"你{elementAdj}地从中场杀到禁区。过人。射门。进了。全场沸腾。","effects":{"reputation":13,"goals":1,"attrs":{"speed":1}}},"fail":{"text":"奔袭到最后，腿软了。射门偏出。","effects":{"stamina":-6}},"critical":{"text":"【灵光一闪】单骑闯关。你撕碎了整条防线。所有人都站起来了。","effects":{"reputation":20,"goals":1,"attrs":{"speed":2,"stamina":1},"flags":{"keySuccess":true}}}},
          {"id":"V","sit":"attack","text":"分球给位置更好的队友","check":{"attrs":["passing","vision"],"difficulty":29,"tag":"传球+视野"},"success":{"text":"你没贪功。分球。队友推射空门。","effects":{"reputation":9,"assists":1,"attrs":{"passing":1}}},"fail":{"text":"分球力量大了。队友没追上。","effects":{"stamina":-3}}},
          {"id":"W","sit":"balanced","text":"带球推进，吸引防守再分","check":{"attrs":["dribble","iq"],"difficulty":31,"tag":"盘带+球商"},"success":{"text":"你带球推进，吸引两人包夹，分球。队友空位破门。","effects":{"reputation":9,"assists":1,"attrs":{"dribble":1}}},"fail":{"text":"带球被断。反击夭折。","effects":{"stamina":-4}}},
          {"id":"X","sit":"balanced","text":"减速控球，稳住节奏","check":{"attrs":["rhythm","iq"],"difficulty":27,"tag":"节奏+球商"},"success":{"text":"你没急。减速控球。等队友落位。重新组织。","effects":{"reputation":5,"attrs":{"rhythm":1}}},"fail":{"text":"你一减速。对方回防到位。机会没了。","effects":{"stamina":-3}}},
          {"id":"Y","sit":"defense","text":"回追防备对方反抢","check":{"attrs":["tackle","speed"],"difficulty":25,"tag":"铲断+速度"},"success":{"text":"反击被断后你反抢，没让对方打二次反击。","effects":{"reputation":5,"attrs":{"tackle":1}}},"fail":{"text":"反抢扑空。对方长传。你回追得很狼狈。","effects":{"stamina":-5}}}
        ]
      }
    ]
  }

};
