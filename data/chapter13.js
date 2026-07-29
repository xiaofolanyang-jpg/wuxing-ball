/* data/chapter13.js — 第十三章《淘汰赛》（20岁·五行大会·淘汰赛）
 * 事件链：备战 → 宿敌同队 → 淘汰赛(match) → 赛后喘息 → 半决赛前夜 → 半决赛(match) → 决赛确定 → 决赛前夜 → ch14
 * 说明：两场BOSS战（淘汰赛str56/半决赛str58）。宿敌沈惊寒同队。
 */
window.CHAPTER13 = { events: [

  { id: "ch13_opening", chapter: 13,
    text: ["淘汰赛。单场。输了就回家。","教练把战术板拍在桌上。「明天。他们的核心是化域。国家队级。」","「怎么打？」你问。","「你。」教练指着你。「盯他。全场。」","「我一个人？」","「你不是一个人。」教练看着所有人。「你们是五个。」"],
    effects: { flags: { knockoutPrep: true } },
    next: "ch13_rival" },

  { id: "ch13_rival", chapter: 13,
    text: ["通道里。","你看到了沈惊寒。","他穿着——和你一样的队服。国家队。","「一队。」他说。","「一队。」你笑了。","「别拖后腿。」","「你也是。」"],
    effects: { bonds: { sudi: 5 }, flags: { rivalSameTeam: true } },
    next: "ch13_knockout" },

  { id: "ch13_knockout", chapter: 13, type: "match",
    text: ["五行大会·淘汰赛。","对手化域。国家队级。每一个节点都是生死。","哨响。"],
    opponent: { name: "五行大会·淘汰赛", element: "金", strength: 56 }, teamBase: 42,
    result: {
      bigwin: { text: "赢了。大胜。五行碰撞。你们碾过去了。", effects: { reputation: 15, goals: 1 } },
      win: { text: "赢了。最后五分钟。你断了他的球。反击。进了。", effects: { reputation: 12, goals: 1 } },
      draw: { text: "点球。你站在点球点前。射了。进了。险胜。", effects: { reputation: 8 } },
      lose: { text: "输了。0-1。你被过了。化域的压。你喘不过气。结束了。", effects: { demonValue: 5, reputation: 10 } }
    },
    next: "ch13_after" },

  { id: "ch13_after", chapter: 13,
    text: ["赢了。","更衣室里。所有人都在喘。","{companion1Name}坐在角落。膝盖上缠着冰袋。「下一场。谁？」","教练走进来。「半决赛。他们有两个传奇。」","沉默。","「怕吗？」教练问。","没人回答。","「好。」教练说。「怕就对了。怕了才认真。」"],
    effects: { stamina: -10, demonValue: 2, flags: { semifinalBound: true } },
    next: "ch13_semi_night" },

  { id: "ch13_semi_night", chapter: 13,
    text: ["半决赛前夜。","你站在阳台上。看着远处的体育场。灯还亮着。","{companion1Name}走过来。递了一瓶水。","「想什么？」","「想铁叔。」你说。","「想他干嘛？」","「他说。别弯。」","{companion1Name}笑了。「你没弯。」","「还没。」","「明天也不会。」"],
    effects: { demonValue: -3, bonds: { tongpao: 2 } },
    next: "ch13_semi" },

  { id: "ch13_semi", chapter: 13, type: "match",
    text: ["半决赛。","对手有两个传奇。化域。你的每一次触球都是极限。","最后三分钟。2-2。两个传奇站在对面。","你看着他们。「来。」"],
    opponent: { name: "五行大会·半决赛", element: "火", strength: 58 }, teamBase: 42,
    result: {
      bigwin: { text: "你的领域。展开了。不是化域的领域。是——天人合一的边缘。球进了。3-2。", effects: { reputation: 30, goals: 1, coreAttrs: 3, flags: { tianrenThreshold: true } } },
      win: { text: "你冲了。他挡了。你变了向。射了。进了。3-2。五万人在喊。", effects: { reputation: 20, goals: 1 } },
      draw: { text: "点球大战。你射了。进了。门将扑了方向。险胜。", effects: { reputation: 12 } },
      lose: { text: "输了。2-3。传奇就是传奇。你被碾了。季军赛。", effects: { reputation: 15, demonValue: 3 } }
    },
    next: "ch13_final_confirm" },

  { id: "ch13_final_confirm", chapter: 13,
    text: ["你赢了。","决赛。五行大会决赛。","对手的核心。天人合一。96。","你看着那个数字。","「他妈的。」{companion1Name}说。","「嗯。」","「怎么打？」","你想了想。「踢。」","「什么？」","「就踢。」你说。「不管他多强。就踢。」"],
    effects: { flags: { finalBound: true } },
    next: "ch13_final_night" },

  { id: "ch13_final_night", chapter: 13,
    text: ["决赛前夜。","你没去训练场。你去了河边。","{companion1Name}跟来了。你们坐在河边。和六年前一样。","「六年了。」他说。","「嗯。」","「从土场。到五行大会决赛。」","「明天。」","「明天。」","沉默。很长的沉默。","「不管赢不赢。」他说。「这六年。值了。」","你看着他。「会赢。」","他笑了。「你每次都这么说。」","「因为每次都赢了。」","「……闭嘴。」","你笑了。"],
    effects: { demonValue: -8, bonds: { tongpao: 5 }, flags: { finalNight: true }, chapter: 1, age: 0 },
    next: "ch14_opening" }

] };
