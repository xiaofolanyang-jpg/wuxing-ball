/* data/chapter10.js — 第十章《转会·离别》v3.0 剧本版
 * 主题：转会窗的抉择与后果。留守/转会/离别/双人叙事线。
 * 年龄：18-19岁 | 事件数：8
 */
window.CHAPTER10 = { events: [

  // 门控：根据ch7转会选择路由
  { id: "ch10_opening", chapter: 10,
    text: "赛季结束，转会窗。五院全部发来了邀请，五封。",
    choices: [
      { id: "A", when: { flag: "stayed" }, text: "继续", next: "ch10_stay" },
      { id: "B", when: { flag: "transferred" }, text: "继续", next: "ch10_outsider" },
      { id: "C", when: { flag: "transferredTogether" }, text: "继续", next: "ch10_together" },
      { id: "D", when: { flag: "companionLeft" }, text: "继续", next: "ch10_farewell" }
    ]
  },

  // 留守线
  { id: "ch10_stay", chapter: 10,
    text: ["你留了。","学院升了级，新设施，新学员。你是队长。","「队长。」李教习把袖标递给你。「你戴。」","你接了。袖标很轻，但你知道，它很重。"],
    effects: { flags: { captain: true }, reputation: 5 },
    next: "ch10_newseason" },

  // 离别线
  { id: "ch10_farewell", chapter: 10,
    text: ["他走了。","你站在空了的宿舍里。他的床铺还在，被子叠得整整齐齐，枕头底下压着一张纸条。","「我走了。但球还在。下次见面，我铲你。」","你笑了，把纸条折好，放在口袋里。"],
    effects: { demonValue: 5, flags: { companionLeft: true } },
    next: "ch10_newseason" },

  // 融入线
  { id: "ch10_outsider", chapter: 10,
    text: ["新学院，新队服，新一切。你是「外来者」。","训练的时候，没人传给你。比赛的时候，没人看你。","「你得证明。」教练说。「这里不是你的学院，你是借来的。」","你点头。证明。"],
    effects: { demonValue: 3, flags: { outsider: true } },
    next: "ch10_prove" },

  // 双人线
  { id: "ch10_together", chapter: 10,
    text: ["你们一起去了。新学院，新队服。但至少——你们还在一起。","「又是新人。」{companion1Name}说。","「嗯。」","「又要证明。」","「走。」"],
    effects: { bonds: { tongpao: 3 }, flags: { together: true } },
    next: "ch10_newseason" },

  // 证明（融入线专属）
  { id: "ch10_prove", chapter: 10,
    text: ["第一场，你进了两个。第二场，你助攻了三个。第三场，你过了所有人。","更衣室里，有人开始和你说话了。","「不错。」队长说。","「明天，战术会，你来。」","你来了。"],
    effects: { reputation: 10, demonValue: -3, flags: { proved: true } },
    next: "ch10_newseason" },

  // 赛季新起点
  { id: "ch10_newseason", chapter: 10,
    text: ["新赛季，新起点。","不管你在哪，不管你是谁。球是一样的，场是一样的。","你踢了三场，{seasonRecord}。你站稳了。"],
    effects: { reputation: 8, matches: 3, wins: 2 },
    next: "ch10_national_camp" },

  // 国家队报到
  { id: "ch10_national_camp", chapter: 10,
    text: ["国家队报到日。","你穿着国家队的队服，站在训练基地门口。","{companion1Name}站在你旁边。","「五行大会。」他说。","「嗯。」","「五大洲。」","「我们。」","你走进去。"],
    effects: { flags: { nationalTeamCamp: true }, chapter: 1 },
    next: "ch11_opening" }

] };
