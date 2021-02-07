import { TSDom } from "./ts-dom/tsDom";
import { TSDomElement } from "./ts-dom/tsDomElement";
import { TSDomWait } from "./ts-dom/tsDomWait";
import config, { Config } from "./config";
import { LessonsTrack } from "./components/lessonsTrack";
import { MenuButton } from "./components/menuButton";

chrome.runtime.onMessage.addListener(async (message: any, sender: any, sendResponse: any) => {
  await bootstrap(config);
});

async function bootstrap(config: Config): Promise<void>{
  if(config.validateUrl(new URL(window.location.toString()))){
    const tsDom = new TSDom();
    const tsDomWait = new TSDomWait(tsDom);

    const lessonsTrack = new LessonsTrack(tsDom, tsDomWait);
    const menuButton = new MenuButton(tsDom, tsDomWait);
    menuButton.show(lessonsTrack);
  }  
}

(async () => {
  await bootstrap(config);
})();