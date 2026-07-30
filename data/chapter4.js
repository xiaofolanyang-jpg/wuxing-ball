/* data/chapter4.js — 第四章《淬炼营·存活》v3.0 剧本版
 * 主题：淬炼营第二阶段。组队联赛。从散沙到团队。生死战。
 * 年龄：15-16岁 | 时间跨度：6周（后3周） | 事件数：10
 * 事件链：碰撞 → 战术确定 → 成型 → 默契 → 危机 → 休息日 → 生死战(6节点) → 半决赛(6节点) → 决赛(6节点) → 离营
 */
window.CHAPTER4 = { events: [

  // ===== 事件1：第三场·碰撞（比赛·转折） =====
  {
    id: "ch4_opening",
    chapter: 4,
    text: [
      "第三场。你赢了，2-1。",
      "但赢得不漂亮，中间吵了三次。{companion1Name}和后卫差点打起来。",
      "「你他妈为什么不回防！」",
      "「你他妈为什么不传球！」",
      "你站在中间，把两个人拉开。",
      "「够了。」你说。「赢了。」",
      "他们不说话了，但眼神还是狠的。"
    ],
    system: "【第四章·淬炼营·存活 开启。从散沙到团队，中间隔着争吵、汗水和信任。】",
    effects: { reputation: 3, demonValue: 1, bonds: { tongpao: 1 }, matches: 1, wins: 1 },
    next: "ch4_tactic"
  },

  // ===== 事件2：战术确定（选择·战术） =====
  {
    id: "ch4_tactic",
    chapter: 4,
    text: [
      "第四场前，你们开了个会。",
      "「得定个打法。」你说。「不能每场都乱踢。」",
      "五个人看着你，等你说。"
    ],
    choices: [
      { id: "A", text: "传控——球在脚下，不丢，慢慢磨", effects: { flags: { tactic: "possession" } }, next: "ch4_form" },
      { id: "B", text: "反击——让他们攻，我们等，然后一刀", effects: { flags: { tactic: "counter" } }, next: "ch4_form" },
      { id: "C", text: "高压——从第一秒就抢，抢到他们喘不过气", effects: { flags: { tactic: "press" } }, next: "ch4_form" },
      { id: "D", text: "防反——先不丢，然后找机会", effects: { flags: { tactic: "defend" } }, next: "ch4_form" }
    ]
  },

  // ===== 事件3：第五场·成型（比赛·羁绊激活） =====
  {
    id: "ch4_form",
    chapter: 4,
    text: [
      "第五场。你们赢了，3-0。",
      "不是个人。是团队。",
      "{companion1Name}断球，传给你，你回做，他前插，你直塞，他射。进了！",
      "整个过程，七秒，三脚球。",
      "你们对视了一下，笑了。"
    ],
    system: "【羁绊「同袍」激活：同场检定成功率+5%。】",
    effects: { reputation: 5, bonds: { tongpao: 2 }, matches: 1, wins: 1, flags: { bondTongpao: true } },
    next: "ch4_sync"
  },

  // ===== 事件4：第六场·默契（比赛·羁绊升级） =====
  {
    id: "ch4_sync",
    chapter: 4,
    text: [
      "第六场。赢了，2-1。",
      "但这场不一样。你和{companion1Name}的配合，已经不是「配合」了。是本能。",
      "他不用看你，你不用看他。球到人到，人到球到。",
      "「你不用看。」赛后他说。「他在。」"
    ],
    system: "【羁绊升级：同袍 → 默契。同场检定+8%，暴击率+5%。】",
    effects: { reputation: 4, bonds: { moqi: 2 }, matches: 1, wins: 1, flags: { bondMoqi: true } },
    next: "ch4_crisis"
  },

  // ===== 事件5：第七场·危机（剧情·低谷） =====
  {
    id: "ch4_crisis",
    chapter: 4,
    text: [
      "第七场。输了，0-3。",
      "不是技术问题，是体力。六周了。你的腿像灌了铅，{companion1Name}的脚踝肿了，后卫的膝盖在响。",
      "更衣室里。没人说话。",
      "「还有两场。」你说，声音哑的。「赢一场，就进四强。」",
      "没人应。",
      "你站起来。「明天，休息，不练了。」"
    ],
    effects: { stamina: -15, demonValue: 4, matches: 1 },
    next: "ch4_rest"
  },

  // ===== 事件6：休息日（剧情·恢复） =====
  {
    id: "ch4_rest",
    chapter: 4,
    text: [
      "你没去训练场。你去了城里的河边。",
      "{companion1Name}跟来了。他脚踝还肿着，一瘸一拐。",
      "你们坐在河边，没说话，看了一个小时的水。",
      "「你怕吗？」他突然问。",
      "「怕什么？」",
      "「淘汰。」",
      "你想了想。「不怕。」",
      "「我有点。」他说。「不是怕输，是怕——回去之后，什么都不是。」",
      "你看着河。「不会的。」",
      "「你怎么知道？」",
      "「因为你踢得好。」你说。「不管在哪，你都踢得好。」",
      "他笑了。「你也是。」"
    ],
    effects: { stamina: 20, demonValue: -5, bonds: { tongpao: 3 } },
    next: "ch4_do_or_die"
  },

  // ===== 事件7：第八场·生死（比赛·6节点） =====
  {
    id: "ch4_do_or_die",
    chapter: 4,
    type: "match",
    text: [
      "第八场。赢了就进四强。输了——看别人脸色。",
      "对手排名第三。强。",
      "哨响。"
    ],
    opponent: { name: "淬炼营·第三名", element: "水", strength: 42 },
    teamBase: 32,
    result: {
      bigwin: { text: "哨响。大胜！你们五个抱在一起。{companion1Name}在吼，后卫在哭。四强，稳稳的。", effects: { reputation: 12, flags: { campSemifinal: true } } },
      win:     { text: "哨响。{lastScore}，赢了！你们五个抱在一起。{companion1Name}在吼，后卫在哭。四强。", effects: { reputation: 10, flags: { campSemifinal: true } } },
      draw:    { text: "平了，{lastScore}。不够，但也没输。最后一场，还得拼。", effects: { reputation: 3, demonValue: 3 } },
      lose:    { text: "输了，{lastScore}。你坐在场边，腿在抖。不是累，是怕。看别人脸色的滋味，你不想再尝。", effects: { reputation: -3, demonValue: 6 } }
    },
    next: "ch4_semi"
  },

  // ===== 事件8：半决赛（比赛·BOSS战） =====
  {
    id: "ch4_semi",
    chapter: 4,
    type: "match",
    text: [
      "半决赛。对手：排名第一的队伍。里面有三个通脉境的。",
      "你们全是凝形。差了一个大境界。",
      "「怕吗？」营主站在场边，看着你们。",
      "「不怕。」五个人齐声。",
      "他笑了。第一次。"
    ],
    opponent: { name: "淬炼营·第一名", element: "火", strength: 48 },
    teamBase: 32,
    result: {
      bigwin: { text: "赢了！大胜通脉境！全场安静了两秒，然后——轰。营主站在场边，没鼓掌，但他点了头。", effects: { reputation: 18, flags: { campFinal: true } } },
      win:     { text: "赢了！{lastScore}，绝杀！终场哨响的时候你跪在地上。通脉境又怎样，你赢了。", effects: { reputation: 15, flags: { campFinal: true } } },
      draw:    { text: "平了。加时，点球。你们输了。四强，不差，但你不甘心。", effects: { reputation: 10, flags: { campSemifinalist: true } } },
      lose:    { text: "输了。通脉境，差了一个大境界。你坐在场边，喘，腿在抖。四强，不差，但你不甘心。", effects: { reputation: 10, flags: { campSemifinalist: true } } }
    },
    next: "ch4_final_gate"
  },

  // 决赛门控：根据半决赛结果路由
  {
    id: "ch4_final_gate",
    chapter: 4,
    text: "",
    choices: [
      { id: "A", when: { flag: "campFinal" }, text: "继续", next: "ch4_final" },
      { id: "B", when: { notFlag: "campFinal" }, text: "继续", next: "ch4_leave" }
    ]
  },

  // ===== 事件9：决赛（比赛·最终战） =====
  {
    id: "ch4_final",
    chapter: 4,
    type: "match",
    text: [
      "决赛。",
      "营主站在场边，没说话，只是看着。",
      "你看着对面。五个人，最强的五个。",
      "「走。」你说。"
    ],
    opponent: { name: "淬炼营·决赛对手", element: "土", strength: 52 },
    teamBase: 32,
    result: {
      bigwin: { text: "冠军。你站在场中央，风把汗吹凉了。营主走过来。第一次，他伸了手。「不错。」他说。两个字，比什么都重。", effects: { reputation: 30, flags: { campChampion: true } } },
      win:     { text: "冠军。哨响的时候你没动，站了两秒，然后——吼！五个人抱在一起。营主在场边，笑了。第二次。", effects: { reputation: 30, flags: { campChampion: true } } },
      draw:    { text: "亚军。点球输了。你站在场边，看着对面庆祝。差一点，就差一点。", effects: { reputation: 20, flags: { campRunner: true } } },
      lose:    { text: "亚军。输了。你坐在场边，喘，腿在抖。差一点，就差一点。营主走过来，拍了拍你后脑勺。「下次。」", effects: { reputation: 20, flags: { campRunner: true } } }
    },
    next: "ch4_leave"
  },

  // ===== 事件10：离营（剧情·收束） =====
  {
    id: "ch4_leave",
    chapter: 4,
    text: [
      "六周结束了。",
      "你站在训练基地门口，包在肩上，和来的时候一样。",
      "{companion1Name}站在你旁边。",
      "「回去。」他说。「然后——挑战者联赛。」",
      "「嗯。」",
      "「然后——天罡联赛。」",
      "「嗯。」",
      "「然后——」他看着远处。「五行大会。」",
      "你没说话。但你笑了。",
      "营主的声音从身后传来。「别回头。往前走。」",
      "你没回头。"
    ],
    system: "【淬炼营结束。根据最终排名获得对应奖励。返回学院。】",
    effects: { chapter: 1, age: 1 },
    next: "ch5_opening"
  }

] };
