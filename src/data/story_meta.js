import night from './night.js'

const ACTIONS = [
  {
    "id": "a01",
    "label": "并肩走"
  },
  {
    "id": "a02",
    "label": "找地方坐下"
  },
  {
    "id": "a03",
    "label": "一起看风景"
  },
  {
    "id": "a04",
    "label": "问她今天怎么样"
  },
  {
    "id": "a05",
    "label": "逗她笑"
  },
  {
    "id": "a06",
    "label": "分享耳机"
  },
  {
    "id": "a07",
    "label": "牵住她的手"
  },
  {
    "id": "a08",
    "label": "再靠近一点"
  },
  {
    "id": "a09",
    "label": "拍一张合照"
  },
  {
    "id": "a10",
    "label": "喂她吃一口"
  },
  {
    "id": "a11",
    "label": "说悄悄话"
  },
  {
    "id": "a12",
    "label": "安静听她说"
  },
  {
    "id": "a13",
    "label": "摸摸她的头发"
  },
  {
    "id": "a14",
    "label": "整理衣领"
  },
  {
    "id": "a15",
    "label": "安静陪她一会儿"
  },
  {
    "id": "a16",
    "label": "抱住她"
  },
  {
    "id": "a17",
    "label": "送一个小礼物"
  },
  {
    "id": "a18",
    "label": "认真夸她"
  },
  {
    "id": "a19",
    "label": "靠在她肩上"
  },
  {
    "id": "a20",
    "label": "把手放在她的腿上"
  },
  {
    "id": "a21",
    "label": "和她对视"
  },
  {
    "id": "a22",
    "label": "告诉她喜欢她"
  },
  {
    "id": "a23",
    "label": "问她的心意"
  },
  {
    "id": "a24",
    "label": "聊以后"
  },
  {
    "id": "a25",
    "label": "握紧她的手"
  },
  {
    "id": "a26",
    "label": "吻她的额头"
  },
  {
    "id": "a27",
    "label": "一起沉默"
  },
  {
    "id": "a28",
    "label": "送她回家"
  },
  {
    "id": "a29",
    "label": "约明天见"
  },
  {
    "id": "a30",
    "label": "说晚安"
  }
]
const ROUNDS = [["a01","a02","a03"],["a04","a05","a06"],["a07","a08","a09"],["a10","a11","a12"],["a13","a14","a15"],["a16","a17","a18"],["a19","a20","a21"],["a22","a23","a24"],["a25","a26","a27"],["a28","a29","a30"]]
const HOTEL_ACTIONS = [
  {
    "id": "h01",
    "label": "确认水温",
    "group": "bath"
  },
  {
    "id": "h02",
    "label": "递毛巾",
    "group": "bath"
  },
  {
    "id": "h03",
    "label": "站到花洒旁",
    "group": "bath"
  },
  {
    "id": "h04",
    "label": "帮她擦湿发",
    "group": "bath"
  },
  {
    "id": "h05",
    "label": "在蒸汽里聊天",
    "group": "bath"
  },
  {
    "id": "h06",
    "label": "关掉水龙头",
    "group": "bath"
  },
  {
    "id": "h07",
    "label": "递睡衣",
    "group": "bath"
  },
  {
    "id": "h08",
    "label": "吹头发",
    "group": "bath"
  },
  {
    "id": "h09",
    "label": "隔着磨砂门说话",
    "group": "bath"
  },
  {
    "id": "h10",
    "label": "关灯",
    "group": "intimacy"
  },
  {
    "id": "h11",
    "label": "牵手躺下",
    "group": "intimacy"
  },
  {
    "id": "h12",
    "label": "拥抱",
    "group": "intimacy"
  },
  {
    "id": "h13",
    "label": "吻额头",
    "group": "intimacy"
  },
  {
    "id": "h14",
    "label": "耳边说话",
    "group": "intimacy"
  },
  {
    "id": "h15",
    "label": "再靠近",
    "group": "intimacy"
  },
  {
    "id": "h16",
    "label": "确认边界",
    "group": "intimacy"
  },
  {
    "id": "h17",
    "label": "只抱着",
    "group": "intimacy"
  },
  {
    "id": "h18",
    "label": "靠肩",
    "group": "intimacy"
  },
  {
    "id": "h19",
    "label": "听她呼吸",
    "group": "intimacy"
  },
  {
    "id": "h20",
    "label": "盖被子",
    "group": "intimacy"
  },
  {
    "id": "h21",
    "label": "说晚安",
    "group": "intimacy"
  },
  {
    "id": "h22",
    "label": "选电影",
    "group": "movie"
  },
  {
    "id": "h23",
    "label": "调字幕",
    "group": "movie"
  },
  {
    "id": "h24",
    "label": "分享零食",
    "group": "movie"
  },
  {
    "id": "h25",
    "label": "讨论剧情",
    "group": "movie"
  },
  {
    "id": "h26",
    "label": "她靠过来",
    "group": "movie"
  },
  {
    "id": "h27",
    "label": "暂停电影",
    "group": "movie"
  },
  {
    "id": "h28",
    "label": "说悄悄话",
    "group": "movie"
  },
  {
    "id": "h29",
    "label": "关掉电视",
    "group": "movie"
  },
  {
    "id": "h30",
    "label": "一起睡着",
    "group": "movie"
  }
]
const SCENE_CATALOG = [
  {
    "id": "park",
    "name": "公园"
  },
  {
    "id": "cafe",
    "name": "咖啡馆"
  },
  {
    "id": "cinema",
    "name": "电影院"
  },
  {
    "id": "seaside",
    "name": "海边"
  },
  {
    "id": "market",
    "name": "夜市"
  },
  {
    "id": "bookstore",
    "name": "书店"
  },
  {
    "id": "busstop",
    "name": "公交站"
  },
  {
    "id": "mall",
    "name": "商场"
  },
  {
    "id": "home",
    "name": "家里"
  },
  {
    "id": "riverside",
    "name": "江边"
  }
]

export default {
  scenes: SCENE_CATALOG,
  actions: ACTIONS,
  rounds: ROUNDS,
  hotelActions: HOTEL_ACTIONS,
  night: night,
  affection: {
  "start": {
    "林知夏": 60,
    "苏遥": 0,
    "江晚": 30,
    "顾晴": 40
  },
  "stages": [
    {
      "name": "讨厌",
      "min": 0
    },
    {
      "name": "疏远",
      "min": 20
    },
    {
      "name": "普通",
      "min": 40
    },
    {
      "name": "好感",
      "min": 60
    },
    {
      "name": "心动",
      "min": 80
    }
  ],
  "bands": [
    {
      "id": "cold",
      "name": "讨厌",
      "min": 0,
      "max": 29
    },
    {
      "id": "low",
      "name": "低好感",
      "min": 30,
      "max": 59
    },
    {
      "id": "high",
      "name": "高好感",
      "min": 60,
      "max": 100
    }
  ],
  "actionDeltas": {
    "a01": {
      "delta": 1
    },
    "a02": {
      "delta": 1
    },
    "a03": {
      "delta": 1
    },
    "a04": {
      "delta": 2
    },
    "a05": {
      "delta": 2
    },
    "a06": {
      "delta": 2
    },
    "a07": {
      "delta": 3,
      "min": 40,
      "low": -2
    },
    "a08": {
      "delta": 2,
      "min": 50,
      "low": -2
    },
    "a09": {
      "delta": 1
    },
    "a10": {
      "delta": 2,
      "min": 40,
      "low": -1
    },
    "a11": {
      "delta": 2
    },
    "a12": {
      "delta": 2
    },
    "a13": {
      "delta": 3,
      "min": 50,
      "low": -2
    },
    "a14": {
      "delta": 2
    },
    "a15": {
      "delta": 2
    },
    "a16": {
      "delta": 4,
      "min": 60,
      "low": -3
    },
    "a17": {
      "delta": 3
    },
    "a18": {
      "delta": 2
    },
    "a19": {
      "delta": 3,
      "min": 60,
      "low": -2
    },
    "a20": {
      "delta": 2,
      "min": 80,
      "low": -5
    },
    "a21": {
      "delta": 2
    },
    "a22": {
      "delta": 4,
      "min": 50,
      "low": -2
    },
    "a23": {
      "delta": 1,
      "min": 60,
      "low": -3
    },
    "a24": {
      "delta": 3,
      "min": 60,
      "low": -1
    },
    "a25": {
      "delta": 3,
      "min": 50,
      "low": -2
    },
    "a26": {
      "delta": 4,
      "min": 70,
      "low": -4
    },
    "a27": {
      "delta": 1
    },
    "a28": {
      "delta": 2
    },
    "a29": {
      "delta": 2
    },
    "a30": {
      "delta": 1
    }
  },
  "riskyActions": [
    "a07",
    "a08",
    "a10",
    "a13",
    "a16",
    "a19",
    "a20",
    "a22",
    "a23",
    "a26"
  ],
  "diminishing": {
    "second": 0.5,
    "third": 0
  }
},
  counts: {
  "generatedAt": "2026-10-18T05:43:01.487Z",
  "sceneCount": 10,
  "scenePoolLines": 45000,
  "sceneAmbientLines": 5000,
  "transitionLines": 100,
  "hotelLines": 2000,
  "nightLines": 50,
  "toneLines": 16800,
  "riskyReactionLines": 1050,
  "total": 70000
},
  layout: {
    sceneActionCount: 30,
    scenePoolSize: 150,
    sceneAmbientSize: 500,
    sceneTransitionSize: 10,
    hotelPoolSize: 65,
    hotelAmbientSize: 50,
    tonePerPool: 560,
    riskyReactionPerPool: 35
  },
  balance: {
    startTransitionChance: 0.10,
    transitionStep: 0.02,
    minTransitionChance: 0,
    mainRounds: 10,
    nightRounds: 10
  }
}
