/* data/chapter17.js — 第十七章《风暴·心魔》（21-22岁·生涯最大危机）
 * 事件链：伤 → 诊断 → 心魔R1(check) → 心魔R2(check) → 失败门 → 复健 → 复出(match) → 新生 → 告别赛通知 → ch18
 * 说明：伤病+心魔BOSS战（双回合检定）。双回合皆败→end_dusk（黯然离场）。
 *       复出后set comeback flag。章末age+1。
 */
window.CHAPTER17 = { events: [

  { id: "ch17_opening", chapter: 17,
    text: ["那天。训练。","你一个变向。膝盖——","响了。","不是正常的响。是——断的响。","你倒了。","疼。不是疼。是——空。你的腿。不是你的了。","「担架！」有人喊。","你被抬走了。"],
    effects: { flags: { injured: true }, stamina: 0 },
    next: "ch17_diagnosis" },

  { id: "ch17_diagnosis", chapter: 17,
    text: ["「前交叉韧带。」医生说。「手术。复健。至少八个月。」","八个月。","你坐在病床上。看着那条腿。","{companion1Name}坐在旁边。没说话。","「八个月。」你说。","「嗯。」","「可能回不来。」","「你会的。」","「你怎么知道？」","「因为你。」他说。「是你。」"],
    effects: { demonValue: 10, flags: { diagnosis: true } },
    next: "ch17_demon_r1" },

  { id: "ch17_demon_r1", chapter: 17,
    text: ["夜里。","你醒了。","黑暗里。有个声音。","「你完了。」","你坐起来。「谁？」","「我。」那个声音说。「你的心魔。」","「滚。」","「滚不了。」它笑了。「我住在你心里。六年了。从你第一次输球开始。从你第一次被碾压开始。从你第一次怀疑自己开始。」","「我没怀疑过。」","「你怀疑了。」它说。「每一次。你只是不说。」"],
    choices: [
      { id: "A", text: "「我不听。」",
        check: { attrs: ["resolve", "composure"], difficulty: 40, tag: "心魔·抗拒" },
        success: { text: "你闭上眼。它还在说。但你不在乎了。", effects: { demonValue: -5 }, next: "ch17_demon_r2" },
        fail: { text: "你闭上眼。但它的声音更大了。", effects: { demonValue: 5, flags: { demonRound1Fail: true } }, next: "ch17_demon_r2" } },
      { id: "B", text: "「你说得对。但我还在。」",
        check: { attrs: ["resolve"], difficulty: 36, tag: "心魔·承认" },
        success: { text: "它沉默了。然后笑了。「有意思。」", effects: { demonValue: -8 }, next: "ch17_demon_r2" },
        fail: { text: "它笑了。「承认了？好。那更完了。」", effects: { demonValue: 3, flags: { demonRound1Fail: true } }, next: "ch17_demon_r2" } }
    ] },

  { id: "ch17_demon_r2", chapter: 17,
    text: ["它没走。","「第二回合。」它说。","「来。」你说。"],
    choices: [
      { id: "A", text: "「我还会踢。」",
        check: { attrs: ["resolve", "dribbling"], difficulty: 42, tag: "心魔·意志" },
        success: { text: "它不说话了。黑暗安静了。你睡了。", effects: { demonValue: -10 }, next: "ch17_rehab" },
        fail: { text: "它笑了。「你信吗？」", effects: { demonValue: 5 }, next: "ch17_demon_fail_gate" } },
      { id: "B", text: "「就算不踢了。我也活过。」",
        check: { attrs: ["composure"], difficulty: 38, tag: "心魔·释然" },
        success: { text: "它叹了口气。「行。你赢了。这次。」", effects: { demonValue: -12 }, next: "ch17_rehab" },
        fail: { text: "它沉默了。但你知道。它还在。", effects: { demonValue: 2 }, next: "ch17_demon_fail_gate" } }
    ] },

  { id: "ch17_demon_fail_gate", chapter: 17,
    choices: [
      { id: "A", text: "……", effects: {}, next: "end_dusk", when: { flag: "demonRound1Fail" } },
      { id: "B", text: "……", effects: { demonValue: -3 }, next: "ch17_rehab", when: { notFlag: "demonRound1Fail" } }
    ] },

  { id: "ch17_rehab", chapter: 17,
    text: ["手术。成功。","复健。","第一天。你站不起来。","第一周。你能走了。","第一个月。你能跑了。","第三个月。你能碰球了。","{companion1Name}每天来。帮你做复健。","「疼吗？」","「不疼。」","「骗人。」","「……有一点。」","「忍着。」","「嗯。」"],
    effects: { stamina: 20, coreAttrs: 1, flags: { rehabDone: true } },
    next: "ch17_comeback" },

  { id: "ch17_comeback", chapter: 17, type: "match",
    text: ["八个月后。","你站在场边。","教练看着你。「准备好了吗？」","「嗯。」","「不勉强。」","「我知道。」","你走进去。草皮。灯光。看台。","你深吸一口气。","你回来了。"],
    opponent: { name: "复出之战", element: "木", strength: 40 }, teamBase: 38,
    result: {
      bigwin: { text: "你踢了。没进球。没助攻。但你踢了。全场起立。你回来了。", effects: { reputation: 10, demonValue: -5 } },
      win: { text: "你踢了。全场起立。你回来了。", effects: { reputation: 10, demonValue: -5 } },
      draw: { text: "你踢了。没赢。但你踢了。全场起立。", effects: { reputation: 8, demonValue: -3 } },
      lose: { text: "你踢了。输了。但你踢了。全场起立。你不在乎。", effects: { reputation: 5, demonValue: -3 } }
    },
    next: "ch17_renewed" },

  { id: "ch17_renewed", chapter: 17,
    text: ["你回来了。","不是以前的你。是——新的你。","更慢。但更稳。更弱。但更——懂。","「你变了。」{companion1Name}说。","「嗯。」","「变好了。」","「嗯。」","「……能不能别这么装。」","你笑了。"],
    effects: { demonValue: -10, flags: { renewed: true, comeback: true } },
    next: "ch17_farewell" },

  { id: "ch17_farewell", chapter: 17,
    text: ["一封信。","「兹邀请{playerName}参加'五行告别赛'。五大洲传奇齐聚。最后一场。」","最后一场。","你看着那封信。","{companion1Name}也收到了。","「一起。」他说。最后一次。","「一起。」"],
    effects: { flags: { farewellInvited: true }, chapter: 1, age: 1 },
    next: "ch18_opening" }

] };
