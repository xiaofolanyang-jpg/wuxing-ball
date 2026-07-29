/* data/chapter7.js — 第七章《天罡联赛·首赛季》v3.0 剧本版
 * 主题：顶级联赛。面对五院。风格碰撞。传奇球员初体验。
 * 年龄：17岁 | 时间跨度：一个赛季 | 事件数：10
 * 事件链：开幕 → 金阙院(match) → 布澜院(match) → 首胜(match) → 传奇登场(match) → 排名 → 转会窗 → 宿敌复仇(match) → 赛季末 → 季后赛(match)
 */
window.CHAPTER7 = { events: [

  // ===== 事件1：开幕·五院 =====
  {
    id: "ch7_opening",
    chapter: 7,
    text: [
      "五洲天罡联赛。八支队伍。五院加三支升班马。",
      "你们是升班马。",
      "第一场。客场。你站在通道里。外面是两万人。",
      "两万。",
      "{companion1Name}在你旁边。他的手在抖。",
      "「别抖。」你说。",
      "「我没抖。」他说。「是兴奋。」",
      "你走出去。",
      "灯光。草皮。看台。两万个声音。",
      "这就是天罡。"
    ],
    system: "【第七章·天罡联赛·首赛季 开启。两万人。五院。传奇。你来了。】",
    effects: { flags: { tiangangDebut: true }, demonValue: 2 },
    next: "ch7_jinqve"
  },

  // ===== 事件2：第一场·金阙院风格（match·金） =====
  {
    id: "ch7_jinqve",
    chapter: 7,
    type: "match",
    text: [
      "对手：金阙院。",
      "他们不攻。他们守。五个人站成一条线。像一堵墙。",
      "你拿球。面前是五个人。没有空当。没有缝隙。",
      "你传。被断。再传。再被断。",
      "只有安静。和绝望。"
    ],
    opponent: { name: "金阙院", element: "金", strength: 50 },
    teamBase: 34,
    result: {
      bigwin: { text: "你赢了。金阙院。铁壁。你撕碎了它。全场安静了两秒。然后——轰。升班马赢了五院。", effects: { reputation: 15 } },
      win:     { text: "你赢了。1-0。金阙院的铁壁。你凿穿了。哨响的时候你跪在地上。", effects: { reputation: 12 } },
      draw:    { text: "平了。0-0。金阙院。你没输。但也没赢。铁壁就是铁壁。", effects: { reputation: 5 } },
      lose:    { text: "0-1。输了。不是被碾压。是被闷死了。他们不攻。他们只是等。等你失误。然后。一刀。", effects: { demonValue: 3, reputation: 2 } }
    },
    next: "ch7_bulan"
  },

  // ===== 事件3：第三场·布澜院风格（match·水） =====
  {
    id: "ch7_bulan",
    chapter: 7,
    type: "match",
    text: [
      "对手：布澜院。",
      "他们笑着踢球。",
      "你铲他。他过了你。然后他笑了。朝你笑。",
      "你怒了。你冲。他传了。不是传给你防的人。是传给一个你根本没注意到的位置。",
      "进球了。他跳了个舞。"
    ],
    opponent: { name: "布澜院", element: "水", strength: 48 },
    teamBase: 34,
    result: {
      bigwin: { text: "你赢了。布澜院。他们不笑了。你让他们不笑了。", effects: { reputation: 12 } },
      win:     { text: "你赢了。2-1。他们笑着踢。你咬着牙踢。你赢了。", effects: { reputation: 10 } },
      draw:    { text: "平了。2-2。他们进了两个。你也进了两个。那个进球，你过了两个人。{companion1Name}传的。", effects: { reputation: 5, goals: 1 } },
      lose:    { text: "1-3。输了。但你进了一个。那个进球，你过了两个人。{companion1Name}传的。升班马进球。够了。", effects: { reputation: 5, goals: 1 } }
    },
    next: "ch7_firstwin"
  },

  // ===== 事件4：第五场·首胜（match） =====
  {
    id: "ch7_firstwin",
    chapter: 7,
    type: "match",
    text: [
      "第五场。对手：另一支升班马。",
      "你们赢了。2-1。",
      "天罡联赛首胜。"
    ],
    opponent: { name: "升班马·同级别", element: "木", strength: 40 },
    teamBase: 34,
    result: {
      bigwin: { text: "大胜。更衣室里所有人都在吼。{companion1Name}站在凳子上。「我们！赢了！天罡！」", effects: { reputation: 10, demonValue: -5 } },
      win:     { text: "赢了。天罡首胜。更衣室里所有人都在吼。{companion1Name}站在凳子上。「我们！赢了！天罡！」你坐在角落。笑了。", effects: { reputation: 8, demonValue: -5 } },
      draw:    { text: "平了。差一点。但首胜还会来的。", effects: { reputation: 3 } },
      lose:    { text: "输了。连升班马都赢不了。你坐在更衣室。不想说话。", effects: { demonValue: 4 } }
    },
    next: "ch7_legend"
  },

  // ===== 事件5：传奇登场（match·赤焰院+传奇） =====
  {
    id: "ch7_legend",
    chapter: 7,
    type: "match",
    text: [
      "第八场。对手：赤焰院。",
      "第七十分钟。你领先。1-0。",
      "然后——替补席上。一个人站了起来。",
      "德罗巴·焚天。火灵根。化域境。",
      "他走进场的时候。空气变了。你感觉到了。灵力。不是通脉的那种。是——压。像山。像海。",
      "「传奇。」你听到有人喊。"
    ],
    opponent: { name: "赤焰院·传奇在场", element: "火", strength: 56 },
    teamBase: 34,
    result: {
      bigwin: { text: "你赢了。传奇在场。你赢了。德罗巴走过你身边的时候停了一下。「不错。」他说。然后走了。", effects: { reputation: 15, flags: { legendEncounter: true } } },
      win:     { text: "你赢了。2-1。传奇在场。你赢了。他经过你的时候。「不错。」两个字。比什么都重。", effects: { reputation: 12, flags: { legendEncounter: true } } },
      draw:    { text: "平了。1-1。传奇进了一个。你也进了一个。他经过你的时候。「不错。」", effects: { reputation: 8, flags: { legendEncounter: true } } },
      lose:    { text: "1-2。被逆转了。德罗巴进了一个。助攻了一个。你站在场中央。看着他走回替补席。他经过你的时候。停了一下。「不错。」他说。然后走了。", effects: { reputation: 5, flags: { legendEncounter: true } } }
    },
    next: "ch7_midseason"
  },

  // ===== 事件6：赛季中段·排名 =====
  {
    id: "ch7_midseason",
    chapter: 7,
    text: [
      "七场结束。两胜两平三负。排名第六。",
      "升班马。第六。不差。",
      "但不够。",
      "「前四。」你说。「季后赛。」",
      "{companion1Name}看着赛程表。「后面七场。五院还有三个。」",
      "「那又怎样。」",
      "他笑了。「没怎样。走。」"
    ],
    effects: { reputation: 3 },
    next: "ch7_transfer"
  },

  // ===== 事件7：转会窗·邀请（核心分支） =====
  {
    id: "ch7_transfer",
    chapter: 7,
    text: [
      "赛季中。转会窗开了。",
      "一封信。五院之一。",
      "「兹邀请转入。条件：全额奖学金+灵脉核心修炼+A级设施。」",
      "{companion1Name}也收到了。",
      "你们坐在宿舍里。看着那两封信。"
    ],
    choices: [
      { id: "A", text: "转会五院——新队服，新队友，新一切", effects: { flags: { transferred: true, choiceTianguang: true }, reputation: 5 }, next: "ch7_rival_match" },
      { id: "B", text: "留守{academyName}——你是核心", effects: { flags: { stayed: true, choiceStay: true }, bonds: { tongpao: 5 } }, next: "ch7_rival_match" },
      { id: "C", text: "和{companion1Name}一起转会", effects: { flags: { transferredTogether: true, choiceTianguang: true }, bonds: { tongpao: 3 }, reputation: 3 }, next: "ch7_rival_match" },
      { id: "D", text: "你留守，让{companion1Name}走", effects: { flags: { companionLeft: true, choiceStay: true }, demonValue: 5 }, next: "ch7_rival_match" }
    ]
  },

  // ===== 事件8：第十场·宿敌复仇（match） =====
  {
    id: "ch7_rival_match",
    chapter: 7,
    type: "match",
    text: [
      "你又遇到了沈惊寒。",
      "这次。你通脉了。他也通脉了。",
      "差距。没了。",
      "哨响。你冲了。他挡了。你变了向。他吃了。你过了。",
      "镜像。"
    ],
    opponent: { name: "沈惊寒·宿敌对决", element: "金", strength: 48 },
    teamBase: 36,
    result: {
      bigwin: { text: "大胜。你过了他三次。他笑了。赛后他走过来。伸出手。「下次。」你握了。「随时。」", effects: { reputation: 12, bonds: { sudi: 2 }, flags: { rivalFirstWin: true } } },
      win:     { text: "2-1。你赢了。第一次。你赢了沈惊寒。他走过来。伸出手。「下次。」他说。你握了。「随时。」", effects: { reputation: 10, bonds: { sudi: 2 }, flags: { rivalFirstWin: true } } },
      draw:    { text: "平了。1-1。你和他。面对面。谁也没赢。他看了你一眼。笑了。「下次。」", effects: { reputation: 5, bonds: { sudi: 1 } } },
      lose:    { text: "输了。1-2。他过了你。射了。进了。他朝你看了一眼。笑了。「下次。」", effects: { demonValue: 5, bonds: { sudi: 1 } } }
    },
    next: "ch7_endseason"
  },

  // ===== 事件9：赛季末·排名 =====
  {
    id: "ch7_endseason",
    chapter: 7,
    text: [
      "十四场结束。",
      "排名第四。",
      "季后赛。升班马。前四。",
      "{companion1Name}看着积分榜。笑了。「谁说的。升班马不行？」"
    ],
    effects: { reputation: 5, flags: { tiangangPlayoff: true } },
    next: "ch7_playoff"
  },

  // ===== 事件10：季后赛（match·高潮） =====
  {
    id: "ch7_playoff",
    chapter: 7,
    type: "match",
    text: [
      "半决赛。单场淘汰。",
      "两万人。全在喊。",
      "你听不见。你只听到自己的心跳。和球碰脚背的声音。"
    ],
    opponent: { name: "天罡·半决赛", element: "土", strength: 52 },
    teamBase: 36,
    result: {
      bigwin: { text: "大胜。决赛。升班马进决赛。全场在喊你的名字。", effects: { reputation: 15, flags: { tiangangFinal: true } } },
      win:     { text: "赢了。决赛。升班马进决赛。{companion1Name}把你扑倒。「我们！他妈的！决赛！」", effects: { reputation: 12, flags: { tiangangFinal: true } } },
      draw:    { text: "平了。加时。点球。输了。四强。不差。升班马。四强。够了。", effects: { reputation: 8 } },
      lose:    { text: "输了。四强。升班马。四强。你坐在场边。喘。够了。真的够了。", effects: { reputation: 8 } }
    },
    effects: { chapter: 1 },
    next: "ch8_opening"
  }

] };
