/* data/chapter15.js — 第十五章《天脉灵泉》（20岁·五行大会之后）
 * 事件链：灵泉奖励 → 声望巅峰 → 邀请无数 → 归来 → 新目标 → 修炼新阶段 → ch16
 * 说明：奖励结算章。全属性+5。回归{academyName}。确立天人合一目标。
 */
window.CHAPTER15 = { events: [

  { id: "ch15_opening", chapter: 15,
    text: ["天脉灵泉。","你站在灵泉边。灵力像温水一样泡着你。不。不是温水。是——岩浆。是洪水。是——天。","你的灵根在共鸣。你的经脉在扩张。你的属性在——飞。","灵力灌入每一条经脉。像六年。像十年。像一辈子。全在这一刻。"],
    effects: { allAttrsFlat: 5, flags: { spiritSpring: true } },
    next: "ch15_fame" },

  { id: "ch15_fame", chapter: 15,
    text: ["五行大会冠军。","你的声望。如日中天。","「国手」。不。比国手更高。","「洲手」。","五大洲。都知道你的名字。","走在路上。有人喊你的名字。你习惯了。或者没习惯。"],
    effects: { reputation: 20, flags: { continentalFame: true } },
    next: "ch15_invites" },

  { id: "ch15_invites", chapter: 15,
    text: ["邀请。无数的邀请。","五院。全部。传奇球队。国家队。永久席位。","你看着那些信。","{companion1Name}坐在旁边。「选哪个？」","「不选。」你说。「回去。」","「回哪？」","「回{academyName}。」","他笑了。「你疯了。」","「可能。」","「我跟你。」","「我知道。」"],
    effects: { flags: { returnChoice: true } },
    next: "ch15_return" },

  { id: "ch15_return", chapter: 15,
    text: ["你回去了。","{academyName}。","铁门还在。漆还是掉的。但牌子换了。新的。亮的。","李教习站在门口。他老了。头发白了。但眼睛还是那样。","「回来了？」","「回来了。」","「走。训练。」","你笑了。"],
    effects: { flags: { returned: true }, demonValue: -5 },
    next: "ch15_goal" },

  { id: "ch15_goal", chapter: 15,
    text: ["「下一步。」你说。","{companion1Name}看着你。「什么？」","「天人合一。」","他沉默了。","「你疯了。」他说。「天人合一。百年一遇。」","「那就做百年的那个。」","他看着你。看了很久。","「我陪你。」他说。","「我知道。」"],
    effects: { flags: { tianrenGoal: true } },
    next: "ch15_cultivate" },

  { id: "ch15_cultivate", chapter: 15,
    text: ["你开始修炼。","不是为了比赛。不是为了声望。是为了——道。","天人合一。","你坐在五行室里。闭上眼。","灵力在经脉里流。很慢。很稳。","不急。","你有时间。"],
    effects: { coreAttrs: 3, flags: { finalArcStart: true }, chapter: 1, age: 1 },
    next: "ch15_guiyi_gate" },

  { id: "ch15_guiyi_gate", chapter: 15,
    choices: [
      { id: "A", text: "……", effects: {}, next: "ch15_guiyi", when: { mixedRoot: true } },
      { id: "B", text: "……", effects: {}, next: "ch16_opening", when: { notMixedRoot: true } }
    ] },

  { id: "ch15_guiyi", chapter: 15,
    text: ["五行室里。第五天。","你的灵根——震了。","金。木。水。火。土。五种灵力。同时。在经脉里。","不是冲突。是——共鸣。","五行归一。","你的灵根在融合。五种颜色变成一种。无色。透明。像光。","你睁开眼。世界不一样了。","你看到了。灵力的形状。风的颜色。草的呼吸。","这就是——天人合一的门。"],
    effects: { allAttrsFlat: 3, flags: { wuxingGuiyi: true } },
    next: "ch16_opening" }

] };
