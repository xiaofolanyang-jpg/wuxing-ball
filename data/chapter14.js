/* data/chapter14.js — 第十四章《决赛》（20岁·五行大会·决赛）
 * 事件链：通道 → 决赛(match·BOSS) → 结果门 → 加时点球(check) → 颁奖 → 赛后通道 → ch15
 * 说明：决赛BOSS战(str62·天人合一对手)。胜→冠军颁奖；平/负→加时点球检定。
 */
window.CHAPTER14 = { events: [

  { id: "ch14_opening", chapter: 14,
    text: ["通道。","五万人。","你站在通道里。腿在抖。","{companion1Name}在你旁边。他也在抖。","「别抖。」你说。","「你也是。」","你笑了。他笑了。","你走出去。","五万个声音。像海。像山。像——天。"],
    effects: { demonValue: 5, flags: { finalMatch: true } },
    next: "ch14_match" },

  { id: "ch14_match", chapter: 14, type: "match",
    text: ["五行大会·决赛。","对手核心。天人合一。96。","上半场。你冲了。他让你过了。轻描淡写。他拿球。你被过了。你甚至没反应过来。","下半场。他展开了领域。天人合一的领域。空气变了。你喘不过气。","最后三分钟。2-2。他站在你面前。差距。很大。但你不在乎。"],
    opponent: { name: "五行大会·决赛", element: "水", strength: 62 }, teamBase: 44,
    result: {
      bigwin: { text: "【灵光一闪】你的领域。展开了。天人合一。你突破了。他的领域。碎了。球进了。世界安静了。然后——轰。五万人。", effects: { reputation: 50, goals: 1, allAttrsFlat: 5, flags: { assemblyChampion: true, wuxingChamp: true, tianrenBreakthrough: true } } },
      win: { text: "你冲了。他挡了。你变了向。他——吃了。你过了。射了。进了。3-2。你跪在地上。五万人在喊。", effects: { reputation: 30, goals: 1, flags: { assemblyChampion: true, wuxingChamp: true } } },
      draw: { text: "终场。2-2。加时。没人进球。点球。", effects: { stamina: -10 } },
      lose: { text: "终场。2-3。他的领域。你没能破。你跪在地上。五万人在喊他的名字。", effects: { demonValue: 10, reputation: 15 } }
    },
    next: "ch14_gate" },

  { id: "ch14_gate", chapter: 14,
    choices: [
      { id: "A", text: "……", effects: {}, next: "ch14_ceremony", when: { flag: "assemblyChampion" } },
      { id: "B", text: "……", effects: {}, next: "ch14_extra", when: { notFlag: "assemblyChampion" } }
    ] },

  { id: "ch14_extra", chapter: 14,
    text: ["点球。","你站在点球点前。五万人。安静了。","你看着门将。他看着你。","你深吸一口气。","助跑。三步。","你射了。"],
    choices: [
      { id: "A", text: "全力。右上角。",
        check: { attrs: ["resolve"], difficulty: 44, tag: "点球" },
        success: { text: "进了。球砸入死角。门将扑了方向。你赢了。五行大会。冠军。", effects: { reputation: 30, goals: 1, flags: { assemblyChampion: true, wuxingChamp: true } }, next: "ch14_ceremony" },
        fail: { text: "偏了。擦着立柱。你跪在地上。结束了。亚军。", effects: { demonValue: 8, reputation: 15 }, next: "ch14_tunnel" } },
      { id: "B", text: "推射。中路。赌他扑。",
        check: { attrs: ["composure"], difficulty: 40, tag: "点球" },
        success: { text: "他扑了。你推了中路。球滚进去了。你赢了。", effects: { reputation: 30, goals: 1, flags: { assemblyChampion: true, wuxingChamp: true } }, next: "ch14_ceremony" },
        fail: { text: "他没扑。他站在中路。看着球滚过来。抱住了。你输了。", effects: { demonValue: 10, reputation: 15 }, next: "ch14_tunnel" } }
    ] },

  { id: "ch14_ceremony", chapter: 14,
    text: ["天脉灵泉。","你捧着那座奖杯。它很重。比你想的重。","五万人在喊。五种旗帜在飘。","{companion1Name}站在你旁边。他也在哭。","「我们。」他说。声音哑的。「他妈的。我们。」","你笑了。你也在哭。","国主站在主席台上。他鼓了掌。"],
    effects: { reputation: 50, flags: { ceremonyDone: true } },
    next: "ch14_tunnel" },

  { id: "ch14_tunnel", chapter: 14,
    text: ["通道里。","他站在对面。那个天人合一。他看着你。","「你赢了。」他说。或者。「下次。」","他伸出手。","你握了。","「天人合一。」他说。「你快了。」","你点头。","他走了。","你站在通道里。看着他的背影。","天人合一。快了。"],
    effects: { bonds: { chuanqi: 5 }, flags: { assemblyEnd: true }, chapter: 1 },
    next: "ch15_opening" }

] };
