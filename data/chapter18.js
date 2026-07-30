/* data/chapter18.js — 第十八章《传奇·序章》（22岁·终章）
 * 事件链：齐聚 → 告别赛(match) → 赛后全场 → 彩蛋·铁叔 → 彩蛋·下一代 → 结局分发(ending_dispatch)
 * 说明：告别赛（传奇满编·str54）。赛后情感收束。双彩蛋。
 *       最终由 ending_dispatch 综合判定11种结局。
 */
window.CHAPTER18 = { events: [

  { id: "ch18_opening", chapter: 18,
    text: ["告别赛。","你站在通道里。","对面，十个人，十个传奇。化域，天人合一。","Wall·铁壁。Blaze·焚天。Deep·深海。Dance·天舞。King·皇帝。","全在。","沈惊寒站在你旁边，他穿着——和你一样的队服。","「最后一次。」他说。","「最后一次。」","「一起。」","「一起。」"],
    effects: { flags: { farewellMatch: true } },
    next: "ch18_match" },

  { id: "ch18_match", chapter: 18, type: "match",
    text: ["告别赛。十传奇同场。最高规格。","你拿球，面前是Wall·铁壁。化域。你冲了，他挡了，你变了向，他——吃了。你过了。全场起立。","Dance·天舞拿球。天人合一。他动了，你看到了。那是——道。你被过了。你笑了。","最后三分钟。你站在场中央。十个人，五万人。","你闭上眼。","土场。铁门。麻绳网。歪牌子。","铁叔。「别弯。」","李教习。「还行。」","{companion1Name}。「但是。」","营主。「往前走。」","你睁开眼。"],
    opponent: { name: "五行告别赛·传奇", element: "火", strength: 54 }, teamBase: 46,
    result: {
      bigwin: { text: "【灵光一闪】天人合一。你到了。球进了。五万人安静了。然后——轰。", effects: { reputation: 30, goals: 1, allAttrsFlat: 3, flags: { tianrenBreakthrough: true, farewellGoal: true } } },
      win: { text: "你射了，进了。你跪在地上。全场起立。", effects: { reputation: 20, goals: 1, flags: { farewellGoal: true } } },
      draw: { text: "你传了，{companion1Name}接了，射了，进了。你们抱在一起。全场起立。", effects: { reputation: 15, assists: 1, bonds: { shuangzi: 10 }, flags: { farewellGoal: true, twinsBest: true } } },
      lose: { text: "你射了，偏了。你笑了。没关系。", effects: { demonValue: -5, reputation: 10 } }
    },
    next: "ch18_after" },

  { id: "ch18_after", chapter: 18,
    text: ["哨响。","结束了。","五万人，全在喊，喊你的名字。","{companion1Name}走过来，他哭了。","「六年。」他说。","「六年。」你说。","「值了。」","「值了。」","你们抱在一起。","沈惊寒走过来，他也在哭。他伸出手。","你握了。","「谢了。」他说。","「谢你。」","所有传奇走过来。Wall·铁壁。Blaze·焚天。Dance·天舞。","他们鼓掌。","为你。"],
    effects: { demonValue: 0, flags: { farewellEnd: true } },
    next: "ch18_egg1" },

  { id: "ch18_egg1", chapter: 18,
    text: ["画面黑了。","然后——","矿坑。灯还亮着。","铁叔坐在棚子里，手里拿着收音机。","收音机里在播。「……{playerName}。{academyName}。球圣……」","他笑了。","他站起来，走到门口，看着远处。","「没弯。」他说。"],
    effects: {},
    next: "ch18_egg2" },

  { id: "ch18_egg2", chapter: 18,
    text: ["{academyName}。门口。","一个十四岁的孩子，站在铁门前。","他看着那块牌子。新的，亮的。","他走进去。","土场。不，是草皮了。五行室。灵脉核心。","一个老头坐在场边，嘴里叼着一根草。","「新来的？」","「嗯。」","「去那边。找教练。」","孩子走了。","老头看着他的背影，笑了。","「还行。」他说。"],
    effects: {},
    next: "ch18_dispatch" },

  { id: "ch18_dispatch", chapter: 18, type: "ending_dispatch",
    text: ["你的故事，到此为止。","或者，刚刚开始。"] }

] };
