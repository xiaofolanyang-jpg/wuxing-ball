/* data/chapter11.js — 第十一章《传奇·交锋》v3.0 剧本版
 * 主题：联赛冠军争夺。传奇球员全面交锋。声望巅峰。
 * 年龄：19岁 | 事件数：8
 */
window.CHAPTER11 = { events: [

  { id: "ch11_opening", chapter: 11,
    text: ["这个赛季。你不一样了。","化域境。国家队成员。","你不再是「升班马」。你是——contender。","前五场。四胜一平。排名第一。"],
    system: "【第十一章·传奇·交锋 开启。冠军。传奇。五行大会前的最后考验。】",
    effects: { reputation: 10, matches: 5, wins: 4 },
    next: "ch11_tianwang" },

  { id: "ch11_tianwang", chapter: 11, type: "match",
    text: ["第八场。天王山。","对手排名第二。差你一分。赢了。冠军稳了。输了。一切重来。","两万人。全在喊。你听不见。你只听到自己的心跳。"],
    opponent: { name: "天罡·天王山", element: "金", strength: 54 }, teamBase: 40,
    result: {
      bigwin: { text: "大胜。冠军稳了。两万人全在喊你的名字。", effects: { reputation: 15, flags: { titleWon: true } } },
      win: { text: "赢了。2-1。冠军稳了。{companion1Name}把你扑倒。「冠军！我们是冠军！」", effects: { reputation: 12, flags: { titleWon: true } } },
      draw: { text: "平了。2-2。差一点。但还有机会。", effects: { reputation: 8 } },
      lose: { text: "输了。1-2。一切重来。你坐在场边。喘。", effects: { demonValue: 4 } }
    },
    next: "ch11_champion_gate" },

  { id: "ch11_champion_gate", chapter: 11,
    text: "赛季结算。",
    choices: [
      { id: "A", when: { flag: "titleWon" }, text: "继续", next: "ch11_champion" },
      { id: "B", when: { notFlag: "titleWon" }, text: "继续", next: "ch11_legends" }
    ]
  },

  { id: "ch11_champion", chapter: 11,
    text: ["哨响。冠军。","两万人。全在喊。","{companion1Name}把你扑倒。所有人压上来。你被埋在底下。","你笑了。在人群底下。你笑了。"],
    effects: { reputation: 30, flags: { champion: true } },
    next: "ch11_legends" },

  { id: "ch11_legends", chapter: 11, type: "match",
    text: ["季后赛。决赛。对面。五个传奇。五个。化域。","「五个。」{companion1Name}说。声音很平。","「怕吗？」","「我他妈的怕。」","你笑了。「那就对了。」"],
    opponent: { name: "五传奇·决赛", element: "火", strength: 62 }, teamBase: 40,
    result: {
      bigwin: { text: "你赢了。五个传奇。你赢了。全场起立。你站在场中央。这是你的人生。", effects: { reputation: 25 } },
      win: { text: "你赢了。2-1。五个传奇。你进了一个。全场起立。", effects: { reputation: 22, goals: 1 } },
      draw: { text: "平了。1-1。你进了一个。在五个传奇面前。全场起立。", effects: { reputation: 20, goals: 1 } },
      lose: { text: "1-3。输了。但你进了一个。在五个传奇面前。全场起立。虽败犹荣。", effects: { reputation: 20, goals: 1 } }
    },
    next: "ch11_peak" },

  { id: "ch11_peak", chapter: 11,
    text: ["赛季结束。你的声望。","「球星」。不。比球星更高。「国手」。","五行大会。在等你。"],
    effects: { flags: { starLevel: true } },
    next: "ch11_rival_peace" },

  { id: "ch11_rival_peace", chapter: 11,
    text: ["赛季末。你遇到了沈惊寒。不是比赛。是偶遇。","「五行大会。」他说。","「嗯。」","「我们可能是一队。也可能不是。」","他笑了。「不管是不是。决赛见。」","「决赛见。」"],
    effects: { bonds: { sudi: 2 }, flags: { rivalRespect: true } },
    next: "ch11_inherit" },

  { id: "ch11_inherit", chapter: 11,
    text: ["训练基地。晚上。你在加练。","一个人走过来。很老。头发白了。但眼睛很亮。退役传奇。","「你。过来。我教你一个东西。只教一次。」","他动了。你看到了。那不是踢球。那是——道。","和营主教你的不一样。这是——另一条路。"],
    system: "【传承羁绊解锁。主属性成长永久+20%。】",
    effects: { coreAttrs: 4, flags: { inheritance: true } },
    next: "ch11_depart" },

  { id: "ch11_depart", chapter: 11,
    text: ["五行大会。明天。","你站在宿舍里。收拾包。{companion1Name}坐在床上。看着你。","「紧张？」","「……有一点。」","他笑了。「我也是。」","你拉上包的拉链。「走。睡觉。明天——五行大会。」"],
    effects: { flags: { assemblyEve: true }, chapter: 1 },
    next: "ch12_opening" }

] };
