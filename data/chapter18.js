/* data/chapter18.js — 第十八章《传奇·序章》（22岁·终章）
 * 事件链：终章回望 → 五行归一(杂灵根隐藏) → 终极抉择(留守/远赴/退役/教练) → 复出抉择(退役线) → 告别赛 → 结局分发
 * 说明：终章。终极抉择设 choiceStay/choiceTianguang/choiceRetire/choiceCoach 四大旗标；
 *       退役线可复出(设 comeback)；杂灵根专属"五行归一"(设 wuxingGuiyi，when.mixedRoot)。
 *       ch18_end 为 ending_dispatch，由引擎 dispatchEnding 综合判定10种结局。
 */
window.CHAPTER18 = { events: [

  // 开场：终章回望
  {
    id: "ch18_opening",
    chapter: 18,
    text: [
      "二十二岁。你站在职业生涯的巅峰，回望来路。从蹴鞠庙那道光，到矿坑边的破布球；从省赛的青涩，到世青赛的封神；从淬炼营的悬崖，到职业赛场的灯。",
      "金木水火土，五行流转。爱恨成败，皆成文章。你踢穿了市联赛，踢穿了全国，踢穿了五洲。一步一个脚印，从微末走到燎原。",
      "可路总有分岔。前方有几条路，每一条，都通向不同的人生。这一次，你要为自己，写下最后一笔。"
    ],
    system: "【第十八章·传奇·序章 开启。终章，从一次回望开始。】",
    next: "ch18_wuxing"
  },

  // 五行归一（杂灵根专属隐藏事件）
  {
    id: "ch18_wuxing",
    chapter: 18,
    text: [
      "某个雨夜。你独自回到青云城蹴鞠庙。庙祝早已仙逝，供桌上积了灰，只余那方测灵石，还是凉的。",
      "你把手按上去。指尖触到石面的瞬间——金木水火土，五色灵光同时亮起。体内像有五条河在奔涌、碰撞。",
      "原来，杂灵根不是废根。五行俱全，方能五行归一。这扇门，只有你能叩开。"
    ],
    system: "【隐藏机缘：五行归一。唯杂灵根可触发。】",
    choices: [
      { id: "A", text: "叩开五行之门：五行归一，废根不废人", when: { mixedRoot: true },
        check: { attrs: ["resolve", "iq"], difficulty: 45, tag: "决断+球商" }, next: "ch18_final_choice",
        success: { text: "你引五行之力归于一脉。疼。像骨头在重组。然后——通了。测灵石光芒大盛，比觉醒那天更亮。杂灵根，原来是钥匙。", effects: { reputation: 15, attrs: { resolve: 3, iq: 2, shooting: 2 }, flags: { wuxingGuiyi: true } } },
        fail: { text: "五行之力冲突剧烈，你被震退三步，后背撞在墙上。没归一。但门后的光，你看见了。", effects: { stamina: -10, attrs: { resolve: 1 } } },
        critical: { text: "【灵光一闪】五行归一。天地灵力为你倒卷。你周身五色流光环绕，雨滴悬在半空。庙祝若还在，大概会笑着说：老夫没骗你吧。", effects: { reputation: 25, attrs: { resolve: 4, iq: 3, shooting: 3 }, flags: { wuxingGuiyi: true, keySuccess: true } } }
      },
      { id: "B", text: "收起杂念：路，在脚下，不在石头上", effects: { attrs: { resolve: 1 } }, next: "ch18_final_choice" }
    ]
  },

  // 终极抉择（四条路，四种人生）
  {
    id: "ch18_final_choice",
    chapter: 18,
    text: [
      "二十二岁的夏天。合同到期。桌上四份文件，你一份份翻过：",
      "留守青云——母队的续约合同，A4纸，打印的。球迷在官网留言：回来。一城一队，一生；",
      "征战五洲——天罡联赛豪门的天价合同，铜版纸，烫金字。世界之巅，你已站过，还想再站一次；",
      "因伤退役——体检报告夹在中间。膝盖的片子你看了太多遍。急流勇退，也是一种活法；",
      "转身执教——青训营的聘书。把一身技艺传给下一代。薪火相传。"
    ],
    system: "【终极抉择。你的选择，将决定这段传奇的终章。】",
    choices: [
      { id: "A", text: "留守青云：一城一人，一生一队", effects: { reputation: 10, bonds: { agui: 15 }, flags: { choiceStay: true } }, next: "ch18_farewell" },
      { id: "B", text: "征战五洲：去世界之巅，踢最纯粹的球", effects: { reputation: 12, flags: { choiceTianguang: true } }, next: "ch18_farewell" },
      { id: "C", text: "因伤退役：急流勇退，把最好的留在巅峰", effects: { reputation: 5, flags: { choiceRetire: true } }, next: "ch18_comeback" },
      { id: "D", text: "转身执教：薪火相传，把球交给下一代", effects: { reputation: 8, flags: { choiceCoach: true } }, next: "ch18_farewell" }
    ]
  },

  // 复出抉择（仅退役线触发）
  {
    id: "ch18_comeback",
    chapter: 18,
    text: [
      "退役发布会后，你回到空荡荡的家。球鞋收进柜子，球衣叠好放平。手指抚过号码，布面已经起毛了。",
      "可深夜里，隔壁小孩在拍球。砰。砰。砰。你翻了个身，睡不着。梦里全是草皮的味道。",
      "一年后，母队的电话打来：「球队需要你。回来吧。」你握着手机，膝盖隐隐发酸。心跳很快。"
    ],
    system: "【退役之后，命运又递来一次机会。复出，还是就此别过？】",
    choices: [
      { id: "A", text: "复出：我听见皮球的声音，就睡不着", effects: { reputation: 8, attrs: { resolve: 2 }, flags: { comeback: true } }, next: "ch18_farewell" },
      { id: "B", text: "就此别过：把最好的自己，留在回忆里", effects: { demonValue: -5, attrs: { iq: 1 }, reputation: 2, flags: { gracefulExit: true } }, next: "ch18_farewell" }
    ]
  },

  // 告别赛（生涯代表战·match）
  {
    id: "ch18_farewell",
    chapter: 18,
    type: "match",
    text: [
      "最后一战。如期而至。",
      "对手是「宿命之队」——武石、石破岳、布澜门将。那些逼出过最强你的对手，今夜齐聚。",
      "武石站在阵前，朝你勾了勾手指。没说话。不需要。",
      "你弯腰系紧鞋带，踏上草皮。膝盖咔嗒响了一声。这一战，不为冠军，不为合同。只为这十年。为矿坑边那个踢破布球的少年。"
    ],
    opponent: { name: "宿命之队·武石领衔", element: "水", strength: 62 },
    teamBase: 37,
    fallback_choices: [
      { id: "A", sit: "attack", text: "最后一舞，倾尽全力", check: { attrs: ["shooting", "resolve"], difficulty: 48, tag: "射门+决断" },
        success: { text: "终场前，你{elementAdj}地一脚爆射。布澜门将扑了，没够到。球进了。十年。一球。够了。", effects: { reputation: 15, goals: 1, attrs: { shooting: 1 } } },
        fail: { text: "射门被布澜门将扑出。他站起来，朝你笑了一下：「还是老样子。」你也笑了。", effects: { stamina: -7 } },
        critical: { text: "【灵光一闪】你在告别战轰出职业生涯最后一球。全场起立。武石站在门线前，鼓了掌。那是他第一次为你鼓掌。", effects: { reputation: 28, goals: 1, attrs: { shooting: 2, resolve: 1 }, flags: { keySuccess: true } } }
      },
      { id: "B", sit: "balanced", text: "用传球，向所有对手致敬", check: { attrs: ["passing", "vision"], difficulty: 44, tag: "传球+视野" },
        success: { text: "你送出一脚直塞，与武石完成了一次撞墙配合。跨越十年。胜负之外，是惺惺相惜。", effects: { reputation: 10, assists: 1, bonds: { zhaolin: 15 }, attrs: { passing: 1 } } },
        fail: { text: "传球被石破岳拦截。他朝你点了下头。没说话。但那个点头，比什么都重。", effects: { stamina: -6 } }
      },
      { id: "C", sit: "defense", text: "享受比赛：输赢之外，还有热爱", check: { attrs: ["rhythm", "pressure"], difficulty: 38, tag: "节奏+抗压" },
        success: { text: "你踢得从容。仿佛回到了矿坑边那个下午，破布球，土场地，没有观众。原来这才是足球最初的样子。", effects: { reputation: 6, demonValue: -10, attrs: { rhythm: 1 } } },
        fail: { text: "你太放松了，被对手打了一个反击。但你没恼。笑着跑回去了。", effects: { stamina: -5 } }
      }
    ],
    result: {
      bigwin: { text: "告别战大胜。终场哨响，所有宿敌围过来，一一拥抱。武石最后一个。他拍了拍你的背，没说话。十年。圆满。", effects: { reputation: 12, flags: { keySuccess: true } } },
      win:     { text: "告别战获胜。武石与你交换球衣。他说了四个字：「后会有期。」然后转身走了。", effects: { reputation: 8 } },
      draw:    { text: "告别战战平。没有输家。只有十个热爱足球的人，站在草皮上，不想走。", effects: { reputation: 4 } },
      lose:    { text: "告别战告负。但你笑了。能和最强的对手踢最后一场，本身就是圆满。", effects: { reputation: 2, demonValue: -5 } }
    },
    next: "ch18_end"
  },

  // 结局分发（引擎综合判定10种结局）
  {
    id: "ch18_end",
    chapter: 18,
    type: "ending_dispatch",
    text: [
      "终场哨响。灯光渐暗。你站在球场中央。",
      "十年。从蹴鞠庙那道光，到矿坑边的破布球。从省赛的青涩，到世青赛的封神。从淬炼营的悬崖，到职业赛场的灯。",
      "金木水火土。五行流转。爱恨成败。皆成文章。",
      "该写最后一笔了。"
    ],
    system: "【第十八章·传奇·序章 完。正在为你判定结局……】"
  }

] };
