/* data/chapter12.js — 第十二章《选拔·集训》v3.0 剧本版
 * 主题：国家队选拔。国主。集训。五行大会循环赛。
 * 年龄：19-20岁 | 事件数：8
 */
window.CHAPTER12 = { events: [

  { id: "ch12_opening", chapter: 12,
    text: ["国主。","他坐在训练基地的主席台上。不高。不壮。穿着便服。","但他坐在那里。所有人都安静了。","「五个人。」他说。「我选五个。」","他的目光扫过你。停了一秒。","「明天。公布名单。」"],
    system: "【第十二章·选拔·集训 开启。国主。五行大会。五大洲。】",
    effects: { demonValue: 3, flags: { lordSelection: true } },
    next: "ch12_roster" },

  { id: "ch12_roster", chapter: 12,
    text: ["第二天。名单贴在墙上。你挤过去。","第一个。第二个。第三个。{companion1Name}。第四个。","第五个。","你的。","你呼了一口气。","{companion1Name}从后面拍了一下你的肩。「走。训练。」"],
    effects: { flags: { nationalTeamConfirmed: true }, reputation: 5 },
    next: "ch12_training" },

  { id: "ch12_training", chapter: 12,
    text: ["五个人。第一次一起训练。不熟。","传球不到位。跑位重叠。防守漏人。","「再来。」教练说。再来。「再来。」再来。","三天后。好了一点。一周后。好了很多。","{companion1Name}和你。不需要磨合。你们踢了六年了。"],
    effects: { bonds: { tongpao: 3 }, flags: { teamForming: true } },
    next: "ch12_scout" },

  { id: "ch12_scout", chapter: 12,
    text: ["教练把五支对手的资料放在桌上。","霜牙队。铸铁洲。纪律。联防。零封。","星舞队。青岚洲。传控。灵巧。团队。","浪鼓队。潮音洲。即兴。节奏。不可预测。","炎角队。烈原洲。暴力。速度。身体。","铁轮队。磐石洲。精密。定位球。不可动摇。","「五支队伍。四种风格。一个冠军。」","你看着那些名字。咽了口唾沫。"],
    effects: { flags: { opponentsScouted: true } },
    next: "ch12_night" },

  { id: "ch12_night", chapter: 12,
    text: ["五行大会前夜。你睡不着。去了训练场。","{companion1Name}已经在了。他在颠球。","「你也睡不着？」","你们坐在场边。看着空荡荡的球场。","「六年了。」他说。「从土场。到这儿。」","「明天。」","「赢。」","「赢。」"],
    effects: { demonValue: -5, bonds: { tongpao: 3 }, flags: { assemblyNight: true } },
    next: "ch12_ceremony" },

  { id: "ch12_ceremony", chapter: 12,
    text: ["五行大会。开幕。","五支队伍。五个洲。五种颜色。","你站在通道里。外面是——五万人。","你走出去。灯光。草皮。看台。五万个声音。五种旗帜。","这就是五行大会。"],
    effects: { flags: { assemblyStart: true }, demonValue: 2 },
    next: "ch12_match1" },

  { id: "ch12_match1", chapter: 12, type: "match",
    text: ["第一场。五行大会。","对手是洲内最强。化域境。国家队级。","哨响。"],
    opponent: { name: "五行大会·首战", element: "水", strength: 54 }, teamBase: 40,
    result: {
      bigwin: { text: "赢了。五行大会首胜。五万人在喊。你踢了。五行大会。你踢了。", effects: { reputation: 12 } },
      win: { text: "赢了。2-1。五行大会首胜。你踢了。", effects: { reputation: 10 } },
      draw: { text: "平了。1-1。五行大会。你没输。", effects: { reputation: 5 } },
      lose: { text: "输了。0-2。五行大会。第一课。", effects: { demonValue: 3 } }
    },
    next: "ch12_loop" },

  { id: "ch12_loop", chapter: 12,
    text: ["第二场。第三场。第四场。","四场循环。每队踢四场。","你的战绩：两胜一平一负。排名第二。","决赛。","你看着对阵表。深吸一口气。"],
    effects: { reputation: 10, matches: 3, wins: 2, chapter: 1, age: 1 },
    next: "ch13_opening" }

] };
