import { TSDom } from "../ts-dom/tsDom";
import { TSDomElement } from "../ts-dom/tsDomElement";
import { TSDomWait } from "../ts-dom/tsDomWait";

export class LessonsTrack{
  private readonly TSDOM: TSDom;
  private readonly TSDOMWAIT: TSDomWait;
  private trackLessons: TSDomElement;
  private lessonContent: TSDomElement;

  constructor(tsDom: TSDom, tsDomWait: TSDomWait){
    this.TSDOM = tsDom;
    this.TSDOMWAIT = tsDomWait;
  }

  public async hide(): Promise<void>{
    //get elements 
    this.trackLessons = await this.TSDOMWAIT.until(".track-lessons");
    this.lessonContent = this.TSDOM.getElement(".lesson-content");

    this.trackLessons.addClass(["d-none"]);
    this.lessonContent.removeClass(["col-md-8"]);
  }

  public show(): void{
    this.trackLessons.removeClass(["d-none"]);
    this.lessonContent.addClass(["col-md-8"]);
  }
}