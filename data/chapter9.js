/* data/chapter9.js — 第九章《五院·全风格》v3.0 剧本版
 * 主题：一个赛季内踢遍五院。五种风格。五种成长。化域突破。
 * 年龄：18岁 | 事件数：10
 */
window.CHAPTER9 = { events: [

  { id: "ch9_opening", chapter: 9, type: "match",
    text: ["对手：青木院。","球在转。嘭。嘭。嘭。他们不停。一脚出球。你追。你追不上。","第六十脚。你的腿在烧。第八十脚。你的肺在炸。","他们还在传。"],
    system: "【第九章·五院·全风格 开启。五种风格。五种绝望。五种成长。】",
    opponent: { name: "青木院", element: "木", strength: 48 }, teamBase: 36,
    result: {
      bigwin: { text: "你赢了。青木院的百脚传球。你断了。你反击了。你赢了。", effects: { reputation: 12 } },
      win: { text: "你赢了。2-1。他们的传球停了。因为你不再追了。你开始预判了。", effects: { reputation: 10 } },
      draw: { text: "平了。1-1。你的体力在第七十分钟见底了。但你撑住了。", effects: { reputation: 5 } },
      lose: { text: "0-2。输了。你的体力在第七十分钟就见底了。他们还在传。你弯着腰。喘。", effects: { stamina: -15, demonValue: 2 } }
    },
    next: "ch9_chiyan" },

  { id: "ch9_chiyan", chapter: 9, type: "match",
    text: ["对手：赤焰院。","开场三十秒。他们射了。从三十米。球带着弧线。砸在横梁上。你的耳朵在嗡。","他们不传。他们射。从任何角度。任何距离。不讲理。"],
    opponent: { name: "赤焰院", element: "火", strength: 50 }, teamBase: 36,
    result: {
      bigwin: { text: "你赢了。对攻。你比他们更不讲理。", effects: { reputation: 12, goals: 2 } },
      win: { text: "你赢了。3-2。对攻。你进了两个。他们进了两个。但你多一个。", effects: { reputation: 10, goals: 2 } },
      draw: { text: "平了。2-2。对攻。你进了两个。痛快。", effects: { reputation: 8, goals: 2 } },
      lose: { text: "2-4。输了。但你进了两个。对攻赤焰院。虽败犹荣。", effects: { reputation: 8, goals: 2 } }
    },
    next: "ch9_houtu" },

  { id: "ch9_houtu", chapter: 9, type: "match",
    text: ["对手：厚土院。","角球。又是角球。第三个了。同一个人开。同一个点。同一个人顶。","你跳了。你顶到了。但没他高。没他重。球砸进网里。闷响。"],
    opponent: { name: "厚土院", element: "土", strength: 48 }, teamBase: 36,
    result: {
      bigwin: { text: "你赢了。厚土院。山。你搬动了。", effects: { reputation: 12 } },
      win: { text: "你赢了。1-0。一个角球都没给他们。", effects: { reputation: 10 } },
      draw: { text: "平了。0-0。山不动。你也不动。", effects: { reputation: 5 } },
      lose: { text: "0-1。输了。一个角球。一个头球。够了。你站在原地。喘。", effects: { demonValue: 3 } }
    },
    next: "ch9_halfseason" },

  { id: "ch9_halfseason", chapter: 9,
    text: ["七场。两胜五负。","五院。你踢了四个。输了四个。只赢了两支升班马。","「我们。」{companion1Name}说。「是不是太弱了？」","你站起来。「不是弱。是——还差一点。一个境界。他们化域。我们通脉。」","「那就突破。」你说。"],
    effects: { demonValue: 4, flags: { halfSeasonCrisis: true } },
    next: "ch9_threshold" },

  { id: "ch9_threshold", chapter: 9,
    text: ["你开始疯狂修炼。五行室。灵脉核心。每天六个小时。","灵力在经脉里冲。越来越猛。但——过不去。","通脉巅峰。化域的门槛。像一堵墙。","「急不得。」教练说。「化域不是撞出来的。是——悟出来的。」","「悟什么？」","「你自己的道。」"],
    effects: { coreAttrs: 2, flags: { huayuThreshold: true } },
    next: "ch9_enlighten" },

  { id: "ch9_enlighten", chapter: 9,
    text: ["那天。比赛。第七十分钟。你累了。腿在抖。肺在烧。","但你没停。你拿球。面前是三个人。","你没想。你没算。你没判断。你只是——踢了。","球过了第一个人。过了第二个。过了第三个。射门。进了。","你站在原地。那堵墙。没了。","化域。你突破了。"],
    system: "【境界突破：通脉 → 化域。灵力化域，感知质变。】",
    effects: { allAttrsFlat: 4, reputation: 10, flags: { realmBreakthrough: "化域" } },
    next: "ch9_after" },

  { id: "ch9_after", chapter: 9,
    text: ["化域之后。一切不一样了。","你看到了。以前看不到的东西。空当。节奏。时机。","下一场。你进了两个。助攻了一个。再下一场。三个。","{companion1Name}看着你。「你变了。变强了。」","「……能不能别这么装。」","你笑了。"],
    effects: { reputation: 15, matches: 2, wins: 2 },
    next: "ch9_legend_duel" },

  { id: "ch9_legend_duel", chapter: 9, type: "match",
    text: ["你化域了。他们也化域了。第一次。你和传奇球员。站在同一条线上。","德罗巴·焚天。化域巅峰。","你看着他。他看着你。「来了？」「来了。」"],
    opponent: { name: "传奇·正面交锋", element: "火", strength: 56 }, teamBase: 38,
    result: {
      bigwin: { text: "你赢了。你过了一个传奇。射了。进了。他愣了。然后——鼓掌。", effects: { reputation: 20, goals: 1, flags: { legendDuel: true } } },
      win: { text: "你赢了。2-1。他进了一个。你进了两个。赛后他走过来。「不错。比上次好。」", effects: { reputation: 18, flags: { legendDuel: true } } },
      draw: { text: "平了。1-1。你和他。各进一个。他笑了。「下次。」", effects: { reputation: 15, flags: { legendDuel: true } } },
      lose: { text: "输了。1-2。他过了你。射了。进了。「还早。」他说。但你笑了。差一点。就差一点。", effects: { reputation: 15, demonValue: 3, flags: { legendDuel: true } } }
    },
    next: "ch9_endseason" },

  { id: "ch9_endseason", chapter: 9,
    text: ["十四场。化域之后。你赢了五场。平了四场。输了五场。","排名：第四。季后赛。","但你的声望。够了。"],
    effects: { reputation: 5 },
    next: "ch9_summon" },

  { id: "ch9_summon", chapter: 9,
    text: ["一封信。盖着国印。","「兹选拔入国家队。备战本届五行大会。」","你看着那封信。","{companion1Name}也收到了。","「一起。」他说。第三次了。","「一起。」"],
    effects: { flags: { nationalTeamSelected: true }, reputation: 10, chapter: 1 },
    next: "ch10_opening" }

] };
