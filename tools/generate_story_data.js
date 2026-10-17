const fs = require("node:fs");
const path = require("node:path");
const LZString = require("lz-string");

const projectRoot = path.resolve(__dirname, "..");
const dataRoot = path.join(projectRoot, "src", "data");
const sceneRoot = path.join(dataRoot, "scenes");
const contentRoot = path.join(projectRoot, "content");
const assetRoot = path.join(projectRoot, "src", "assets", "story");
const assetSceneRoot = path.join(assetRoot, "scenes");

fs.mkdirSync(sceneRoot, { recursive: true });
fs.mkdirSync(path.join(contentRoot, "scenes"), { recursive: true });
fs.mkdirSync(assetSceneRoot, { recursive: true });

const scenes = [
  { id: "park", name: "公园" },
  { id: "cafe", name: "咖啡馆" },
  { id: "cinema", name: "电影院" },
  { id: "seaside", name: "海边" },
  { id: "market", name: "夜市" },
  { id: "bookstore", name: "书店" },
  { id: "busstop", name: "公交站" },
  { id: "mall", name: "商场" },
  { id: "home", name: "家里" },
  { id: "riverside", name: "江边" }
];

const sceneContexts = [
  "在{scene}的灯光下，",
  "晚风掠过{scene}时，",
  "周围的声音慢慢安静下来，{scene}只剩我们，",
  "在{scene}待久了，我忽然不想太早离开，",
  "{scene}的夜色落在你肩上，",
  "我们停在{scene}一个不显眼的角落，",
  "在{scene}的人群边缘，",
  "{scene}的空气里有一点潮湿的暖意，",
  "我看了一眼{scene}远处的灯，",
  "在{scene}短暂的安静里，",
  "{scene}的风从我们之间穿过去，",
  "在{scene}，脚步声显得格外清楚，",
  "{scene}的光落在你的侧脸上，",
  "我们在{scene}慢慢走着，没有赶时间，",
  "在{scene}稍远一点的位置，",
  "{scene}的喧闹被我们甩在身后，",
  "坐在{scene}的一角，",
  "{scene}的夜色刚好遮住我发烫的耳朵，",
  "你在{scene}停下来等我，",
  "我们并肩看着{scene}的灯，",
  "在{scene}最安静的那几分钟里，",
  "{scene}的地面还留着一点雨后的光，",
  "{scene}的风把你的声音吹得很轻，",
  "我跟着你走进{scene}更深一点的地方，",
  "{scene}里有种让人放松的味道，",
  "我们绕开{scene}的人群，",
  "你回过头时，{scene}的灯正好亮着，",
  "在{scene}靠窗的位置，",
  "{scene}的夜色把距离藏得很好，",
  "这一刻的{scene}，好像只属于我们，"
];

const ambientBodies = [
  "我忽然觉得今晚的风很温柔。",
  "你没有催我，只安静地站在旁边。",
  "我们谁都没有先提离开。",
  "灯光落在你眼睛里，很好看。",
  "我听见远处有人笑，却没听清在说什么。",
  "这一刻很普通，我却想记住。",
  "我偷偷看了你一眼，又移开视线。",
  "你低头笑的时候，我也笑了。",
  "空气里有一点凉，我却觉得很暖。",
  "我们之间隔着一点距离，刚刚好。",
  "你说了一句什么，我没听清，只点了点头。",
  "风把你的衣角吹到我手边。",
  "我忽然希望时间慢一点。",
  "周围的声音像被推远了。",
  "你没有看我，我却一直在看你。",
  "我很自然地往你那边靠近了一点。",
  "这个夜晚比我想象中更好。",
  "我们安静了一会儿，没有觉得尴尬。",
  "你问我累不累，我摇了摇头。",
  "我把这一刻悄悄记在心里。"
];

const transitionTemplates = [
  "我忽然很想去{scene}，你愿意陪我走一段吗？",
  "前面的路正好通向{scene}，我们换个地方吧。",
  "我还没在晚上去过{scene}，今天一起去看看？",
  "这里太吵了，不如去{scene}待一会儿。",
  "我刚刚想起{scene}附近有个很安静的角落。",
  "现在去{scene}，应该刚好能看到夜色。",
  "我有点想去{scene}，你陪我一起吧。",
  "反正还不晚，我们绕去{scene}看看？",
  "听说{scene}今晚很适合散步，我们过去吧。",
  "我想和你换个地方，去{scene}怎么样？"
];

const actions = [
  {
    id: "a01",
    label: "并肩走",
    responses: [
      "你放慢脚步，和我并肩沿着路往前走。",
      "你走在外侧，替我把风挡住了一半。",
      "我们谁都没急着开口，只听着彼此的脚步声。",
      "我往你那边挪了半步，肩膀刚好碰到你。",
      "你忽然停在岔路口，回头问我往哪边走。"
    ]
  },
  {
    id: "a02",
    label: "找地方坐下",
    responses: [
      "你侧过身来，认真听我把话说完。",
      "我们坐下以后，周围的声音慢慢静了下来。",
      "我把手里的东西放在一边，专心看着你。",
      "你问一句，我就忍不住多说了几句。",
      "我们之间隔着一点距离，却一点都不尴尬。"
    ]
  },
  {
    id: "a03",
    label: "一起看风景",
    responses: [
      "你顺着我的目光看过去，轻声说真好看。",
      "我们一起停在原地，看远处的灯慢慢亮起。",
      "你指给我看一处很不起眼的风景。",
      "我没有急着说话，只偷偷看了你一眼。",
      "你说下次还想来，我悄悄记住了。"
    ]
  },
  {
    id: "a04",
    label: "问她今天怎么样",
    responses: [
      "你问我今天怎么样，我一下子不知道怎么回答。",
      "你没有催，只等着我慢慢说。",
      "我把那些小烦恼讲给你听，你没有笑我。",
      "你说累了就告诉你，我忽然轻松了一点。",
      "你一句一句问得很细，我第一次觉得被理解。"
    ]
  },
  {
    id: "a05",
    label: "逗她笑",
    responses: [
      "你说了一句很冷的笑话，我还是笑了。",
      "你看见我憋笑，故意又补了一句。",
      "我假装不理你，嘴角却先抬了起来。",
      "你学着我刚才的语气，我没忍住笑出声。",
      "我反过来逗你，你笑得比我还明显。"
    ]
  },
  {
    id: "a06",
    label: "分享耳机",
    responses: [
      "你把一只耳机递过来，我把左耳给了你。",
      "耳机线把我们拉得很近，谁都没有退开。",
      "你点开一首很慢的歌，周围的街声都远了。",
      "我跟着旋律轻轻点头，你看了我一眼。",
      "一首歌放完，我们还是靠在一起。"
    ]
  },
  {
    id: "a07",
    label: "牵住她的手",
    responses: [
      "你把手伸过来时，我迟疑了一下，还是握住了。",
      "指尖相碰的那一刻，我没有躲。",
      "你轻轻扣住我的手，掌心是暖的。",
      "我假装只是怕路滑，才没有松开。",
      "你握得不紧，却一直没有放开。"
    ]
  },
  {
    id: "a08",
    label: "再靠近一点",
    responses: [
      "你往我这边靠近一点，我没有退开。",
      "我们之间的距离只剩下一小段呼吸。",
      "我低下头，听见自己的心跳有点快。",
      "你问我怎么了，我说没什么。",
      "你笑了一下，又稍微退开半步。"
    ]
  },
  {
    id: "a09",
    label: "拍一张合照",
    responses: [
      "你举起手机说要拍一张，我下意识站直了。",
      "你找了一个刚好能装下我们的角度。",
      "快门按下去之前，你忽然笑了。",
      "照片里我们靠得比平时更近。",
      "我看了一眼那张照片，没有舍得删。"
    ]
  },
  {
    id: "a10",
    label: "喂她吃一口",
    responses: [
      "你把手里的吃的递到我嘴边，我愣了一下。",
      "我咬了一小口，味道其实没尝清。",
      "你说想尝尝我的那一份，我们换了手里的东西。",
      "你把最后一口留给我，我没有推回去。",
      "你问我还要不要，我点了点头。"
    ]
  },
  {
    id: "a11",
    label: "说悄悄话",
    responses: [
      "你凑近我耳边说话，我只听见自己的心跳。",
      "你把声音压得很低，周围的声音都退远了。",
      "我假装没听清，让你再说一遍。",
      "你说了一句只有我能听见的话。",
      "我往你那边偏了偏头，没有躲开。"
    ]
  },
  {
    id: "a12",
    label: "安静听她说",
    responses: [
      "你说起一件小事，我安静地听完。",
      "你声音低下去时，我没有打断你。",
      "你把平时不会说的话告诉我，我记住了。",
      "你说完以后轻轻松了一口气。",
      "我只说了一句：我在听。"
    ]
  },
  {
    id: "a13",
    label: "摸摸她的头发",
    responses: [
      "你抬手替我把额前的头发拨开，我没有躲。",
      "你的指尖从我发梢旁轻轻掠过。",
      "你把被风吹乱的头发别到我耳后。",
      "我低下头，耳朵慢慢热了起来。",
      "你说这样就不会挡住眼睛了。"
    ]
  },
  {
    id: "a14",
    label: "整理衣领",
    responses: [
      "你看见我的衣领歪了，伸手替我整理好。",
      "你低头认真整理那一小块布料，离我很近。",
      "你的手停在原处，我一时忘了退开。",
      "你问我会不会觉得你太爱管闲事。",
      "我说不会，声音比平时轻。"
    ]
  },
  {
    id: "a15",
    label: "安静陪她一会儿",
    responses: [
      "我们都没有说话，却没有觉得尴尬。",
      "你靠在我旁边，安静地待着。",
      "我听见你平稳的呼吸，忽然不想开口。",
      "周围的灯一盏一盏暗下来，我们还在原地。",
      "你轻轻碰了碰我的手臂，我看向你。"
    ]
  },
  {
    id: "a16",
    label: "抱住她",
    responses: [
      "我张开手的时候，你犹豫了一下，还是靠了过来。",
      "你靠进我怀里时，我听见你轻轻叹了口气。",
      "我轻轻抱住你，没有问发生了什么。",
      "你的额头碰到我的肩膀，我抱得更稳了一点。",
      "我们谁都没有先松手。"
    ]
  },
  {
    id: "a17",
    label: "送一个小礼物",
    responses: [
      "我把那个小东西递给你，你低头看了很久。",
      "你说不用破费，却还是收进了口袋。",
      "我假装只是顺手买的，其实挑了很久。",
      "你问我为什么选这个，我说因为像你。",
      "那个礼物不贵，但我想让你记住。"
    ]
  },
  {
    id: "a18",
    label: "认真夸她",
    responses: [
      "我认真看着你，说今天这样很好看。",
      "我没有绕弯，直接说你笑起来很漂亮。",
      "你被我说得有点不好意思，却没有反驳。",
      "我说这不是客套话，你才慢慢笑了。",
      "你没有躲开我的视线，只轻声说了句谢谢。"
    ]
  },
  {
    id: "a19",
    label: "靠在她肩上",
    responses: [
      "你往我肩上靠了一下，又很快坐直。",
      "我没有动，只把肩膀往你那边送了送。",
      "你靠着我时，声音比刚才轻了很多。",
      "我听见你的呼吸慢慢变稳。",
      "你说就靠一会儿，我说好。"
    ]
  },
  {
    id: "a20",
    label: "把手放在她的腿上",
    responses: [
      "我的手轻轻放在你的腿上，你没有立刻退开。",
      "我的指尖刚碰到你，就停下来看你的反应。",
      "你低头看了一眼，轻声问我是不是紧张。",
      "我告诉你，如果不舒服就告诉我。",
      "你把手覆在我的手背上，没有移开。"
    ]
  },
  {
    id: "a21",
    label: "和她对视",
    responses: [
      "我转头看你时，你刚好也在看我。",
      "我们谁都没有先移开视线。",
      "你的眼睛里有灯光，也有点紧张。",
      "我忽然忘了自己刚才想说什么。",
      "你轻轻笑了一下，我才回过神来。"
    ]
  },
  {
    id: "a22",
    label: "告诉她喜欢她",
    responses: [
      "我看着你，把喜欢两个字认真说出口。",
      "我没有绕弯，只说这不是一时冲动。",
      "你安静地听我把话讲完。",
      "我告诉你，不急着要一个答案。",
      "你低下头，嘴角慢慢弯了起来。"
    ]
  },
  {
    id: "a23",
    label: "问她的心意",
    responses: [
      "我问你对我是什么感觉，你沉默了一会儿。",
      "你没有立刻回答，只把手握得更紧。",
      "你说还需要一点时间，我点了点头。",
      "我问你愿不愿意再靠近一点。",
      "你没有说话，却往我这边靠近了半步。"
    ]
  },
  {
    id: "a24",
    label: "聊以后",
    responses: [
      "你问我以后想做什么，我说想和你一起。",
      "我们聊起明天，也聊起更远一点的事。",
      "你说以后可以常来，我记住了。",
      "我问你下次什么时候见面，你笑了。",
      "我们没有把以后说得很满，却都留了位置。"
    ]
  },
  {
    id: "a25",
    label: "握紧她的手",
    responses: [
      "你忽然把我的手握紧，我看向你。",
      "我没有问为什么，只也握紧了一点。",
      "你的手心有点热，却没有松开。",
      "我们隔着人群，手一直牵在一起。",
      "那一刻，我觉得安心。"
    ]
  },
  {
    id: "a26",
    label: "吻她的额头",
    responses: [
      "你低头吻了一下我的额头，我愣住了。",
      "你的动作很轻，像在确认我会不会躲。",
      "我没有退开，只把眼睛闭上了。",
      "你退开以后，我还站在原地。",
      "我听见自己的心跳，比刚才更清楚。"
    ]
  },
  {
    id: "a27",
    label: "一起沉默",
    responses: [
      "我们安静地待着，谁都没有找话题。",
      "你看着远处，我看着你的侧脸。",
      "我忽然觉得沉默也很好。",
      "你轻轻呼吸，我就知道你在身边。",
      "这一刻，不需要再说什么。"
    ]
  },
  {
    id: "a28",
    label: "送她回家",
    responses: [
      "你把我送到楼下，却没有立刻走。",
      "我站在门口，和你又多说了几句。",
      "你问我到了没有，我说还没有上楼。",
      "你抬头看了一眼窗户，说灯亮着就好。",
      "我说你回去以后给我发消息。"
    ]
  },
  {
    id: "a29",
    label: "约明天见",
    responses: [
      "你说那我们明天见，我点了点头。",
      "我问你明天什么时候有空，你说听我的。",
      "你把明天的事说得像已经很确定。",
      "我说好，明天还在老地方见。",
      "你笑了一下，我就开始期待明天。"
    ]
  },
  {
    id: "a30",
    label: "说晚安",
    responses: [
      "你说晚安，声音比平时轻。",
      "我也说晚安，却没有马上挂断。",
      "你让我早点睡，我答应了。",
      "电话那头安静了一会儿，你才挂断。",
      "这一句晚安，我等了很久。"
    ]
  }
];

const rounds = [
  ["a01", "a02", "a03"],
  ["a04", "a05", "a06"],
  ["a07", "a08", "a09"],
  ["a10", "a11", "a12"],
  ["a13", "a14", "a15"],
  ["a16", "a17", "a18"],
  ["a19", "a20", "a21"],
  ["a22", "a23", "a24"],
  ["a25", "a26", "a27"],
  ["a28", "a29", "a30"]
];

const bathContexts = [
  "浴室里蒸汽很轻，",
  "花洒的水声停下来以后，",
  "热水让镜面蒙了一层雾，",
  "我站在浴室门口，先问了你一句，",
  "你把毛巾递过来时，",
  "地上的水迹映着暖灯，",
  "洗完澡以后，湿发贴在颈侧，",
  "浴室里只剩下很轻的水声，",
  "你把水温调低了一点，",
  "我把干净的衣服放在门边，",
  "蒸汽把我们的声音变得很轻，",
  "你在磨砂门后问我还好吗，",
  "我拿着吹风机站在你身后，"
];

const intimacyContexts = [
  "床头灯只剩一盏时，",
  "房间安静下来以后，",
  "你把灯关掉的那一刻，",
  "窗帘没有完全拉严，",
  "我们并肩躺下以后，",
  "被子盖到肩膀的时候，",
  "你在我耳边说话时，",
  "房间里的空调声很轻，",
  "我侧过身去看你，",
  "你的手碰到我的手背，",
  "灯光暗下来以后，",
  "我听见你的呼吸慢下来，",
  "你把额头靠过来，"
];

const movieContexts = [
  "电影刚开始的时候，",
  "荧幕的光落在墙上，",
  "你调字幕的时候，",
  "我们靠在床头看电影，",
  "电影放到一半时，",
  "你把零食递过来，",
  "我按下暂停键时，",
  "画面停在一句台词上，",
  "你靠过来的那一刻，",
  "电视的声音被调低以后，",
  "片尾曲响起来时，",
  "我关掉电视以后，",
  "电影还没放完，"
];

const hotelActions = [
  { id: "h01", group: "bath", label: "确认水温", responses: [
    "你先伸手试了试水温，又回头问我这样可以吗。",
    "水温刚好，我点了点头，却没有先走进去。",
    "你把水调低一点，说怕我觉得太热。",
    "我伸手碰了碰水流，确认不会太烫。",
    "你站在旁边等我，没有催我做决定。"
  ]},
  { id: "h02", group: "bath", label: "递毛巾", responses: [
    "你把干净的毛巾递给我，自己先转过身去。",
    "我接过毛巾时，你说不够再叫我。",
    "你把毛巾搭在门边，给我留了足够的空间。",
    "我问你毛巾够不够，你说你先用。",
    "我们隔着一点距离，把东西递给对方。"
  ]},
  { id: "h03", group: "bath", label: "站到花洒旁", responses: [
    "我站到花洒旁边，先问你需不需要我回避。",
    "你说可以留下来，但先各洗各的。",
    "水声盖住了一部分说话声，我靠近一点才听清。",
    "我把背对着你，听见你在另一边笑。",
    "花洒的水落下来，我们都没有越过说好的边界。"
  ]},
  { id: "h04", group: "bath", label: "帮她擦湿发", responses: [
    "你的手隔着毛巾落在我头发上，动作很轻。",
    "我低头让你擦干发尾，没有说话。",
    "你把湿发拢到一边，问我会不会弄疼。",
    "毛巾挡住了一部分视线，我只听见你的呼吸。",
    "我抬手接过毛巾，说剩下的我自己来。"
  ]},
  { id: "h05", group: "bath", label: "在蒸汽里聊天", responses: [
    "蒸汽里你的声音听起来比平时近。",
    "我们隔着一层水汽聊明天吃什么。",
    "你说今天有点累，我说那就早点休息。",
    "我靠在墙边听你说话，热水让房间暖起来。",
    "话题很普通，却让我慢慢放松下来。"
  ]},
  { id: "h06", group: "bath", label: "关掉水龙头", responses: [
    "你问我洗好了吗，我说可以关水了。",
    "水声停下后，房间忽然安静得明显。",
    "你把水龙头关紧，先递给我毛巾。",
    "我听见水滴落在地面上的声音。",
    "我们都没有急着说话。"
  ]},
  { id: "h07", group: "bath", label: "递睡衣", responses: [
    "你把睡衣放在门边，没有往里看。",
    "我换好衣服出来时，你正背对着我整理东西。",
    "你说如果不舒服可以换回来。",
    "我接过睡衣，发现你替我选了最宽松的一件。",
    "门开了一条缝，我们把衣服递过去。"
  ]},
  { id: "h08", group: "bath", label: "吹头发", responses: [
    "你拿着吹风机站在我身后，先问我风会不会太热。",
    "热风落在头发上，你的手指偶尔碰到发尾。",
    "我从镜子里看见你很认真。",
    "你说头发不吹干容易着凉。",
    "吹风机停下以后，房间又安静下来。"
  ]},
  { id: "h09", group: "bath", label: "隔着磨砂门说话", responses: [
    "你隔着磨砂门问我水够不够热。",
    "我听见你在门外放下东西，没有推门。",
    "你说毛巾放在门把手上，我应了一声。",
    "我们隔着一扇门聊了两句。",
    "你没有催我，只说你就在外面。"
  ]},
  { id: "h10", group: "intimacy", label: "关灯", responses: [
    "你把灯关掉以后，房间只剩下窗外的光。",
    "我在黑暗里听见你叫我的名字。",
    "你问我会不会不习惯，我说还好。",
    "我们隔着一点距离躺着，谁都没有先动。",
    "灯光暗下来以后，你的声音反而更清楚。"
  ]},
  { id: "h11", group: "intimacy", label: "牵手躺下", responses: [
    "你把手伸过来，我慢慢握住了。",
    "我们并肩躺着，手指松松地扣在一起。",
    "你没有靠得更近，只问我这样会不会不舒服。",
    "我的手心有点热，你说你也是。",
    "我听见两个人的呼吸慢慢变得一样。"
  ]},
  { id: "h12", group: "intimacy", label: "拥抱", responses: [
    "你侧过身来抱住我，动作很轻。",
    "我把手放在你背上，没有乱动。",
    "你问我这样可以吗，我点了点头。",
    "你的下巴碰到我的头发，我往你怀里靠了一点。",
    "我们抱了一会儿，谁都没有说话。"
  ]},
  { id: "h13", group: "intimacy", label: "吻额头", responses: [
    "你低头吻了吻我的额头，然后停下来看我。",
    "我闭上眼睛，没有躲开。",
    "你说如果不喜欢就告诉你。",
    "那个吻很轻，却让我心跳得很快。",
    "我睁开眼时，你还在很近的地方。"
  ]},
  { id: "h14", group: "intimacy", label: "耳边说话", responses: [
    "你在我耳边说了句晚安，我听见了。",
    "你的气息落在我耳边，我下意识缩了一下。",
    "你问我是不是怕痒，我小声说是。",
    "我只听清了半句话，却点了头。",
    "你也放低声音，像是怕惊动这一刻。"
  ]},
  { id: "h15", group: "intimacy", label: "再靠近", responses: [
    "你又靠近一点，我没有退开。",
    "我们之间只剩下一小段距离。",
    "你停下来问我可不可以。",
    "我伸手碰了碰你的手臂，算是回答。",
    "你没有再往前，只等我自己决定。"
  ]},
  { id: "h16", group: "intimacy", label: "确认边界", responses: [
    "你认真问我，今天到这里可不可以。",
    "我说想慢一点，你立刻点了点头。",
    "你把距离重新拉开一点，没有不高兴。",
    "你说我的感受比什么都重要。",
    "我忽然觉得被尊重也是亲密的一部分。"
  ]},
  { id: "h17", group: "intimacy", label: "只抱着", responses: [
    "你说今晚只抱着睡，我说好。",
    "你把我圈在怀里，没有别的动作。",
    "我听见你稳定的心跳，慢慢放松下来。",
    "你问我这样会不会压到头发。",
    "我们就这样安静地靠在一起。"
  ]},
  { id: "h18", group: "intimacy", label: "靠肩", responses: [
    "你靠在我肩上，说今天真的有点困。",
    "我让你靠得更舒服一点。",
    "你的头发蹭到我颈侧，我笑了一下。",
    "你说再靠五分钟，我说可以。",
    "五分钟后，你已经不怎么说话了。"
  ]},
  { id: "h19", group: "intimacy", label: "听她呼吸", responses: [
    "我听见你的呼吸慢慢变长。",
    "你说话的声音越来越轻，我让你别撑了。",
    "你含糊地应了一声，往我这边靠了靠。",
    "我替你把被子往上拉了拉。",
    "房间安静下来，只剩我们两个人的呼吸。"
  ]},
  { id: "h20", group: "intimacy", label: "盖被子", responses: [
    "我把被子拉到你肩膀，你说有点热。",
    "你把脚缩进被子里，我替你压好被角。",
    "我问你要不要把空调调高一点。",
    "你说不用，再盖一点就好。",
    "你说被照顾的感觉很好。"
  ]},
  { id: "h21", group: "intimacy", label: "说晚安", responses: [
    "你轻声说晚安，我回了一句。",
    "你说再聊一会儿，我就再陪你一会儿。",
    "你把手机放到床头，转过脸看我。",
    "我说睡吧，明天还要早起。",
    "你闭上眼睛，手却还搭在我手边。"
  ]},
  { id: "h22", group: "movie", label: "选电影", responses: [
    "你把片单递给我，让我先选。",
    "我问你想看轻松的还是很吵的，你说听我的。",
    "我们挑了十分钟，最后选了一部旧电影。",
    "你说不好看也可以中途换。",
    "我按下播放键时，你往我这边靠了一点。"
  ]},
  { id: "h23", group: "movie", label: "调字幕", responses: [
    "你问我字幕会不会太小，我说可以再大一点。",
    "你调字幕的时候，我把声音也调低了些。",
    "你问我听不听得清原声。",
    "我把字幕关掉又打开，最后决定留着。",
    "你说这样刚好，我们就没再动。"
  ]},
  { id: "h24", group: "movie", label: "分享零食", responses: [
    "你把零食递过来，我先让你挑。",
    "我们为了最后一块争了两句。",
    "你把包装袋放在我手边，方便我拿。",
    "我说这部片适合配甜的，你笑了。",
    "你低头拿零食时，肩膀碰到了我。"
  ]},
  { id: "h25", group: "movie", label: "讨论剧情", responses: [
    "你忽然问我有没有看懂刚才那一段。",
    "我解释了半天，你说好像更糊涂了。",
    "你猜错了凶手，我没有马上揭穿。",
    "我们暂停电影讨论了几分钟。",
    "你说和我一起看电影，比电影本身有意思。"
  ]},
  { id: "h26", group: "movie", label: "她靠过来", responses: [
    "你慢慢靠到我肩上，说这样比较舒服。",
    "我没有动，只把姿势放得更稳。",
    "你问我会不会麻，我说还好。",
    "电影还在放，你却没有再看屏幕。",
    "我低头时，你已经闭上了眼睛。"
  ]},
  { id: "h27", group: "movie", label: "暂停电影", responses: [
    "你按下暂停键，说想去倒杯水。",
    "画面停在一句没说完的台词上。",
    "你问我要不要一起暂停。",
    "我们趁暂停聊了几句和电影无关的话。",
    "回来以后，你坐得比刚才更近。"
  ]},
  { id: "h28", group: "movie", label: "说悄悄话", responses: [
    "你凑近我耳边评价了一句剧情，我没忍住笑。",
    "你怕吵到别人，声音压得很低。",
    "我也凑近你，回了一句。",
    "我们离得很近，电影的声音却很轻。",
    "那几句悄悄话，我比剧情记得更清楚。"
  ]},
  { id: "h29", group: "movie", label: "关掉电视", responses: [
    "你问我还看吗，我说有点困了。",
    "你把电视关掉，房间忽然暗下来。",
    "我听见片尾曲在最后一秒停住。",
    "你问我明天要不要把剩下的看完。",
    "我说可以，但你要陪我。"
  ]},
  { id: "h30", group: "movie", label: "一起睡着", responses: [
    "电影还没放完，你的呼吸已经慢下来。",
    "我按下暂停，没有叫醒你。",
    "你把头靠在我肩上，睡得很沉。",
    "我轻轻把毯子拉到你身上。",
    "我关掉电视，只留了一盏小灯。"
  ]}
];

const hotelContexts = {
  bath: bathContexts,
  intimacy: intimacyContexts,
  movie: movieContexts
};

const hotelAmbient = [
  "房间里的灯调暗以后，声音也变轻了。",
  "空调的风声一直很稳。",
  "窗外偶尔有车经过。",
  "热水留下的暖意还没有散。",
  "床头的灯只照亮很小一块地方。",
  "电视待机灯在墙上亮着一点。",
  "你把手机调成了静音。",
  "我把窗帘拉得更严了一点。",
  "浴室的镜子还蒙着薄雾。",
  "房间里有很淡的洗发水味道。",
  "被子被拉开时发出很轻的声音。",
  "你说今天走了很多路。",
  "我把水杯放在床头。",
  "你问我明天几点起。",
  "走廊里传来很远的关门声。",
  "荧幕的光停在墙面上。",
  "你把遥控器放回床边。",
  "我听见热水壶轻轻响了一下。",
  "房间终于彻底安静下来。",
  "你翻身时，床单轻轻动了一下。",
  "我看了你一眼，又把视线移开。",
  "你说房间比想象中暖。",
  "我把拖鞋摆得整齐了一点。",
  "窗外没有星星，只有灯。",
  "你说话时没看我。",
  "我把手机屏幕按灭了。",
  "这部电影比想象中长。",
  "你抱着枕头坐在床头。",
  "我听见你很轻地笑了一声。",
  "你问我会不会认床。",
  "我说有一点，你说你也是。",
  "房间里的时间好像慢了下来。",
  "你把头发拢到耳后。",
  "我把空杯子放到一边。",
  "你没有催我关灯。",
  "我忽然觉得今晚可以晚一点睡。",
  "电影对白停在一句很短的话上。",
  "你靠过来以后，没有再动。",
  "我替你留了一盏小灯。",
  "你说今天其实很开心。",
  "我把窗帘的缝隙又合上一点。",
  "房间里有洗衣机很远的转动声。",
  "你说话时声音越来越小。",
  "我听见自己的呼吸也慢了。",
  "你把被子分给我一半。",
  "我把遥控器放在枕边。",
  "你没有再提明天的事。",
  "这一刻安静得刚好。",
  "我忽然不想打破这份安静。",
  "你闭上眼睛以后，房间只剩很轻的呼吸声。"
];

const nightOutcomes = [
  {
    id: "parent",
    weight: 20,
    lines: [
      "家里来电话，说今晚要等你回去。",
      "你接完电话，脸上露出一点歉意。",
      "你说明天再继续聊，我点了点头。",
      "你把我送到路口，才转身回家。",
      "电话挂断以后，夜晚忽然安静了。",
      "你说改天再补今天没说完的话。",
      "我没有拦你，只让你路上小心。",
      "这一晚就停在这里，明天再见面。"
    ]
  },
  {
    id: "her_home",
    weight: 40,
    lines: [
      "你说想回自己家，我陪你走到楼下。",
      "你打了个哈欠，说今天真的有点困。",
      "我说改天再聊，你却说再陪我讲两句。",
      "你在门口站了一会儿，才拿出钥匙。",
      "电话那头传来你拉开被子的声音。",
      "你说再聊五分钟，声音已经有点含糊。",
      "我问你要不要睡，你说还想听我说话。",
      "你把手机放在枕边，呼吸慢慢变轻。"
    ]
  },
  {
    id: "her_empty",
    weight: 10,
    scene: "home",
    lines: [
      "你说家里今天没人，问我要不要上去坐一会儿。",
      "你站在楼道口等我，灯把影子拉得很长。",
      "你打开门，屋里安静得只剩我们的脚步声。",
      "你把多余的一双拖鞋放在我脚边。",
      "你说可以留下，但如果想回去也来得及。",
      "我在门口停了一下，问你是不是确定。",
      "你点了点头，说想我陪你。",
      "我们走进屋里，门在身后轻轻关上。"
    ]
  },
  {
    id: "your_empty",
    weight: 10,
    lines: [
      "我说家里今天没人，问你要不要来坐一会儿。",
      "你没有马上回答，先看了我一眼。",
      "我把邀请说得很轻，留足了你拒绝的余地。",
      "你说需要考虑一下，我点了点头。",
      "你把外套拉紧了一点，又松开。",
      "我问你是不是觉得太快，你说有一点。",
      "我没有再劝，只等你做决定。",
      "你最后点了点头，说那就去坐一会儿。"
    ],
    rejectionLines: [
      "你说今天还是想回自己家。",
      "你笑着摇头，说下次再说吧。",
      "你说现在去我家会有点紧张。",
      "你没有答应，也没有让我难堪。",
      "你说今晚想一个人静一静。",
      "你说还没准备好，我说明白。",
      "你把我的手握了一下，算是安慰。",
      "你说不是不想，只是想慢一点。",
      "我没有再追问，只说那我送你回去。",
      "你松了一口气，又对我笑了一下。"
    ]
  },
  {
    id: "hotel",
    weight: 20,
    scene: "hotel",
    lines: [
      "路过酒店时，你停下来抬头看了一眼。",
      "你说这个时间回去太晚了，不如住一晚。",
      "我问你是不是确定，你点了点头。",
      "前台把房卡递过来时，我们都没有先说话。",
      "电梯门关上以后，走廊的光变得很安静。",
      "你用房卡开了门，先站在门口等我。",
      "房间的灯亮起来，窗外是陌生的街。",
      "你说如果我不愿意，现在还可以换一间。"
    ]
  }
];

function fillScene(template, sceneName) {
  return template.replace(/\{scene\}/g, sceneName);
}

function toBlob(lines) {
  return lines.join("\n");
}

function writeModule(filePath, source) {
  fs.writeFileSync(filePath, source, "utf8");
}

const allSentences = [];
const manifest = {
  generatedAt: new Date().toISOString(),
  sceneCount: scenes.length,
  scenePoolLines: 0,
  sceneAmbientLines: 0,
  transitionLines: 0,
  hotelLines: 0,
  nightLines: 0,
  total: 0
};

const sceneModules = [];
const compressedScenes = {};

for (const scene of scenes) {
  const contexts = sceneContexts.map((item) => fillScene(item, scene.name));
  const pools = {};
  const sceneTextLines = [];

  for (const action of actions) {
    const poolLines = [];
    for (const context of contexts) {
      for (const response of action.responses) {
        poolLines.push(context + response);
      }
    }
    if (poolLines.length !== 150) {
      throw new Error(`${scene.id}/${action.id} expected 150 lines, got ${poolLines.length}`);
    }
    pools[action.id] = toBlob(poolLines);
    allSentences.push(...poolLines);
    sceneTextLines.push(...poolLines);
    manifest.scenePoolLines += poolLines.length;
  }

  const ambientLines = [];
  for (let i = 0; i < 25; i++) {
    for (const body of ambientBodies) {
      ambientLines.push(contexts[i] + body);
    }
  }
  if (ambientLines.length !== 500) {
    throw new Error(`${scene.id} expected 500 ambient lines, got ${ambientLines.length}`);
  }
  allSentences.push(...ambientLines);
  sceneTextLines.push(...ambientLines);
  manifest.sceneAmbientLines += ambientLines.length;

  const transitionLines = transitionTemplates.map((item) => fillScene(item, scene.name));
  if (transitionLines.length !== 10) {
    throw new Error(`${scene.id} expected 10 transitions`);
  }
  allSentences.push(...transitionLines);
  manifest.transitionLines += transitionLines.length;

  if (sceneTextLines.length !== 5000) {
    throw new Error(`${scene.id} expected 5000 lines, got ${sceneTextLines.length}`);
  }

  const sceneData = {
    id: scene.id,
    name: scene.name,
    pools,
    ambient: toBlob(ambientLines),
    transitions: toBlob(transitionLines)
  };

  // 手表运行时只读取这个紧凑文本文件，按“行为池 / 环境句 / 过渡句”固定顺序切分。
  const sceneAssetText = sceneTextLines.concat(transitionLines).join("\n") + "\n";
  fs.writeFileSync(path.join(assetSceneRoot, `${scene.id}.txt`), sceneAssetText, "utf8");
  compressedScenes[scene.id] = LZString.compressToEncodedURIComponent(sceneAssetText);

  const modulePath = path.join(sceneRoot, `${scene.id}.js`);
  writeModule(modulePath, `export default ${JSON.stringify(sceneData)}\n`);
  sceneModules.push({
    id: scene.id,
    name: scene.name,
    modulePath: `./scenes/${scene.id}.js`
  });

  fs.writeFileSync(
    path.join(contentRoot, "scenes", `${scene.id}.txt`),
    sceneTextLines.join("\n") + "\n",
    "utf8"
  );
}

const hotelData = { pools: {}, ambient: "" };
const hotelTextLines = [];
for (const action of hotelActions) {
  const contexts = hotelContexts[action.group];
  const poolLines = [];
  for (const context of contexts) {
    for (const response of action.responses) {
      poolLines.push(context + response);
    }
  }
  if (poolLines.length !== 65) {
    throw new Error(`${action.id} expected 65 lines, got ${poolLines.length}`);
  }
  hotelData.pools[action.id] = toBlob(poolLines);
  allSentences.push(...poolLines);
  hotelTextLines.push(...poolLines);
  manifest.hotelLines += poolLines.length;
}

hotelData.ambient = toBlob(hotelAmbient);
allSentences.push(...hotelAmbient);
hotelTextLines.push(...hotelAmbient);
manifest.hotelLines += hotelAmbient.length;

const hotelAssetText = hotelTextLines.join("\n") + "\n";
fs.writeFileSync(path.join(assetRoot, "hotel.txt"), hotelAssetText, "utf8");
compressedScenes.hotel = LZString.compressToEncodedURIComponent(hotelAssetText);

if (manifest.hotelLines !== 2000) {
  throw new Error(`hotel expected 2000, got ${manifest.hotelLines}`);
}

writeModule(path.join(dataRoot, "hotel.js"), `export default ${JSON.stringify(hotelData)}\n`);
fs.writeFileSync(path.join(contentRoot, "hotel.txt"), hotelTextLines.join("\n") + "\n", "utf8");

const nightLines = [];
for (const outcome of nightOutcomes) {
  nightLines.push(...outcome.lines);
  allSentences.push(...outcome.lines);
  if (outcome.rejectionLines) {
    nightLines.push(...outcome.rejectionLines);
    allSentences.push(...outcome.rejectionLines);
  }
}
manifest.nightLines = nightLines.length;

writeModule(
  path.join(dataRoot, "night.js"),
  `export default ${JSON.stringify({ outcomes: nightOutcomes })}\n`
);
fs.writeFileSync(path.join(contentRoot, "night.txt"), nightLines.join("\n") + "\n", "utf8");
fs.writeFileSync(
  path.join(contentRoot, "transitions.txt"),
  scenes
    .flatMap((scene) => transitionTemplates.map((item) => fillScene(item, scene.name)))
    .join("\n") + "\n",
  "utf8"
);

manifest.total = allSentences.length;

const duplicateMap = new Map();
for (const sentence of allSentences) {
  duplicateMap.set(sentence, (duplicateMap.get(sentence) || 0) + 1);
}
const duplicates = [...duplicateMap.entries()].filter(([, count]) => count > 1);

if (manifest.total !== 52150) {
  throw new Error(`expected 52150 total sentences, got ${manifest.total}`);
}
if (duplicates.length > 0) {
  throw new Error(`found ${duplicates.length} duplicate sentences: ${duplicates.slice(0, 5).map(([text]) => text).join(" | ")}`);
}

const sceneCatalog = sceneModules.map(({ id, name }) => ({ id, name }));
// 首屏只保留目录、按钮文案和小型夜间事件。场景与酒店正文放进 assets，
// 由页面按场景读取，不再把 4MB 以上的字符串塞进首页 JS。
const metaSource = `import night from './night.js'

const ACTIONS = ${JSON.stringify(actions.map(({ id, label }) => ({ id, label })), null, 2)}
const ROUNDS = ${JSON.stringify(rounds)}
const HOTEL_ACTIONS = ${JSON.stringify(hotelActions.map(({ id, label, group }) => ({ id, label, group })), null, 2)}
const SCENE_CATALOG = ${JSON.stringify(sceneCatalog, null, 2)}

export default {
  scenes: SCENE_CATALOG,
  actions: ACTIONS,
  rounds: ROUNDS,
  hotelActions: HOTEL_ACTIONS,
  night: night,
  counts: ${JSON.stringify(manifest, null, 2)},
  layout: {
    sceneActionCount: 30,
    scenePoolSize: 150,
    sceneAmbientSize: 500,
    sceneTransitionSize: 10,
    hotelPoolSize: 65,
    hotelAmbientSize: 50
  },
  balance: {
    startTransitionChance: 0.10,
    transitionStep: 0.02,
    minTransitionChance: 0,
    mainRounds: 10,
    nightRounds: 10
  }
}
`;

writeModule(path.join(dataRoot, "story_meta.js"), metaSource);

writeModule(
  path.join(dataRoot, "scene_compressed.js"),
  `// 由 tools/generate_story_data.js 生成。进入场景时只解压当前场景。\nexport default ${JSON.stringify(compressedScenes)}\n`
);

writeModule(path.join(contentRoot, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");

console.log(JSON.stringify({ manifest, duplicateCount: duplicates.length }, null, 2));
