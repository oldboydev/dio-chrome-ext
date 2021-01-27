import { TSDom } from "./ts-dom/tsDom";
import { TSDomElement } from "./ts-dom/tsDomElement";

function bootstrap(): void{
  console.log("init content script");

  const tsDom = new TSDom();

  try {
    //get elements 
    const trackLessons = tsDom.getElement(".track-lessons");
    const lessonContent = tsDom.getElement(".lesson-content");
    const titleHeader = tsDom.getElement(".lesson-video.card .card-header .title");
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

bootstrap();