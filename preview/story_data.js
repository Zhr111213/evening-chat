import META from "../src/data/story_meta.js";
import park from "../src/data/scenes/park.js";
import cafe from "../src/data/scenes/cafe.js";
import cinema from "../src/data/scenes/cinema.js";
import seaside from "../src/data/scenes/seaside.js";
import market from "../src/data/scenes/market.js";
import bookstore from "../src/data/scenes/bookstore.js";
import busstop from "../src/data/scenes/busstop.js";
import mall from "../src/data/scenes/mall.js";
import home from "../src/data/scenes/home.js";
import riverside from "../src/data/scenes/riverside.js";
import hotel from "../src/data/hotel.js";
import night from "../src/data/night.js";

const SCENES = [park, cafe, cinema, seaside, market, bookstore, busstop, mall, home, riverside];
const SCENE_BY_ID = Object.fromEntries(SCENES.map((scene) => [scene.id, scene]));

// 浏览器预览仍然一次性载入全部文本，方便直接打开本地文件检查界面。
// 手表端使用 src/assets/story 下的 txt，按场景读取。
export default {
  ...META,
  scenes: SCENES,
  loadScene(id) {
    return Promise.resolve(SCENE_BY_ID[id]);
  },
  loadHotel() {
    return Promise.resolve(hotel);
  },
  loadNight() {
    return Promise.resolve(night);
  }
};
