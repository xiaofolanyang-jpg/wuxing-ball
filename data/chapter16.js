/* data/chapter16.js — 第十六章《巅峰·抉择》（21岁·化域巅峰）
 * 事件链：化域巅峰瓶颈 → 最后赛季(蒙太奇match) → 宿敌最后一战(match) → 三择(继续/执教/离开)
 *         → 门(条件分流) → 继续修炼/执教传承/江湖离开 → 心魔前兆 → ch17
 * 说明：生涯核心抉择。三条路线影响结局判定（choiceCoach/choiceRetire）。
 *       宿敌羁绊圆满。心魔值开始攀升。
 */
window.CHAPTER16 = { events: [

  { id: "ch16_opening", chapter: 16,
    text: ["化域巅峰。89。","差一点。差那一点。","天人合一。90。","你撞了。又撞了。又撞了。","过不去。","「不是撞的。」营主的声音。他来看你了。「是——放的。」","「放什么？」","「放你自己。」","你不懂。"],
    effects: { flags: { peakBottleneck: true } },
    next: "ch16_season" },

  { id: "ch16_season", chapter: 16, type: "match",
    text: ["最后一个赛季。","你踢了。不是为了赢。是为了——踢。","每一场。你都全力以赴。但不是为了比分。是为了——那一脚。那一个瞬间。","四场。三胜一平。你不在乎排名了。"],
    opponent: { name: "巅峰联赛·最后赛季", element: "土", strength: 44 }, teamBase: 46,
    result: {
      bigwin: { text: "四场全胜。你不在乎。但你踢了。每一脚都是道。", effects: { reputation: 10, coreAttrs: 2 } },
      win: { text: "三胜一平。够了。你不在乎排名。你在乎那一脚。", effects: { reputation: 10, coreAttrs: 2 } },
      draw: { text: "两胜两平。你笑了。无所谓。", effects: { reputation: 5, coreAttrs: 1 } },
      lose: { text: "输了。你不在乎。真的不在乎。", effects: { reputation: 5 } }
    },
    next: "ch16_rival" },

  { id: "ch16_rival", chapter: 16, type: "match",
    text: ["最后一场。对手：沈惊寒。","你们对视。","「最后一次了。」他说。","「嗯。」","「全力以赴。」","「当然。」"],
    opponent: { name: "宿敌·最后一战", element: "金", strength: 50 }, teamBase: 46,
    result: {
      bigwin: { text: "你赢了。大胜。他走过来。第一次。他抱了你。「谢了。这六年。」", effects: { reputation: 10, bonds: { sudi: 10 } } },
      win: { text: "你赢了。他走过来。第一次。他抱了你。「谢了。这六年。」「谢什么。」「谢你逼我。」你笑了。「你也是。」", effects: { reputation: 10, bonds: { sudi: 10 } } },
      draw: { text: "平了。他走过来。伸出手。「谢了。这六年。」你握了。", effects: { reputation: 8, bonds: { sudi: 10 } } },
      lose: { text: "你输了。他走过来。第一次。他抱了你。「谢了。这六年。」你笑了。「你也是。」", effects: { reputation: 8, bonds: { sudi: 10 } } }
    },
    next: "ch16_choice" },

  { id: "ch16_choice", chapter: 16,
    text: ["赛季结束。","你站在十字路口。","三条路。"],
    choices: [
      { id: "A", text: "继续踢——追求天人合一",
        effects: { flags: { continuePlaying: true } }, next: "ch16_path_gate" },
      { id: "B", text: "退役·执教——薪火相传",
        effects: { flags: { retireCoach: true, choiceCoach: true } }, next: "ch16_path_gate" },
      { id: "C", text: "退役·离开——江湖再见",
        effects: { flags: { retireLeave: true, choiceRetire: true } }, next: "ch16_path_gate" }
    ] },

  { id: "ch16_path_gate", chapter: 16,
    choices: [
      { id: "A", text: "……", effects: {}, next: "ch16_continue", when: { flag: "continuePlaying" } },
      { id: "B", text: "……", effects: {}, next: "ch16_coach", when: { flag: "retireCoach" } },
      { id: "C", text: "……", effects: {}, next: "ch16_leave", when: { flag: "retireLeave" } }
    ] },

  { id: "ch16_continue", chapter: 16,
    text: ["你继续修炼。","不是为了比赛。是为了——那一点。","天人合一。","你坐在五行室里。一天。两天。三天。","第四天。你睁开眼。","还是89。","你笑了。「不急。」"],
    effects: { coreAttrs: 1, flags: { cultivating: true } },
    next: "ch16_demon" },

  { id: "ch16_coach", chapter: 16,
    text: ["你回到了{academyName}。","不是球员。是教练。","你站在场边。看着那群十四岁的孩子。","「今天。」你说。「基本功。接。停。传。一百组。」","他们看着你。像当年你看李教习一样。","你笑了。"],
    effects: { flags: { coaching: true } },
    next: "ch16_demon" },

  { id: "ch16_leave", chapter: 16,
    text: ["你走了。","没告诉任何人。只留了一张纸条。","「球。我还会踢。只是换个地方。」","你背着包。走在路上。","远处。有个小球场。几个孩子在踢球。","你停下来。看了很久。","一个球滚到你脚边。","你捡起来。扔回去。","「谢了！大叔！」","你笑了。继续走。"],
    effects: { flags: { wandering: true } },
    next: "ch16_demon" },

  { id: "ch16_demon", chapter: 16,
    text: ["最近。你睡不好。","梦里全是比赛。全是失败。全是——","「你不够好。」","你醒了。汗湿了枕头。","你看着天花板。","「没事。」你说。「没事。」"],
    effects: { demonValue: 5, flags: { demonForeshadow: true }, chapter: 1, age: 1 },
    next: "ch17_opening" }

] };
