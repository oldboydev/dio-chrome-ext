import { TSDom } from "./ts-dom/tsDom";
import { TSDomElement } from "./ts-dom/tsDomElement";
import { TSDomWait } from "./ts-dom/tsDomWait";
import config, { Config } from "./config";

chrome.runtime.onMessage.addListener(async (message: any, sender: any, sendResponse: any) => {
  await bootstrap(config);
});

async function bootstrap(config: Config): Promise<void>{
  console.log("init content script");

  const tsDom = new TSDom();
  const tsDomWait = new TSDomWait(tsDom);

  try {
    //get elements 
    const trackLessons = await tsDomWait.until(".track-lessons");
    const lessonContent = tsDom.getElement(".lesson-content");
    
    let titleHeader: TSDomElement;
    try {
      titleHeader = await tsDomWait.until(".lesson-video.card .card-header .title");
    } catch (error) {
      titleHeader = await tsDomWait.until(".lesson-video.card .card-header .title-video");
    }
    
    const titleWraper = tsDom.getElement(".lesson-video.card .card-header .row");

    trackLessons.addClass(["d-none"]);
    lessonContent.removeClass(["col-md-8"]);
    titleHeader.removeClass(["col-md-11"]);
    titleHeader.addClass(["col-md-10"]);
    
    const buttonWrap = tsDom.createElement("div");
    buttonWrap.addClass(["col-md-1"]);

    const button = tsDom.createElement("button");
    button.addClass(["btn", "btn-dark"]);
    button.element.innerHTML = "menu";
    buttonWrap.element.appendChild(button.element);

    titleWraper.element.appendChild(buttonWrap.element);

  } catch (error) {
    console.log(error);
  }
}

(async () => {
  await bootstrap(config);
})();