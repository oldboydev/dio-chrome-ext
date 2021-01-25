import { TSDomElement } from "./ts-dom/tsDomElement";

function bootstrap(): void{
  console.log("init content script");

  try {
    const trackLessons = new TSDomElement(".track-lessons");
    const lessonContent = new TSDomElement(".lesson-content");
    const titleHeader = new TSDomElement(".lesson-video card.card-header .title");
  } catch (error) {
    console.log(error);
  }
}

bootstrap();