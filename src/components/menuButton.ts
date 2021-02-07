import { TSDom } from "../ts-dom/tsDom";
import { TSDomElement } from "../ts-dom/tsDomElement";
import { TSDomWait } from "../ts-dom/tsDomWait";
import { LessonsTrack } from "./lessonsTrack";

export class MenuButton{
  private readonly TSDOM: TSDom;
  private readonly TSDOMWAIT: TSDomWait;
  private titleHeader: TSDomElement;
  private titleWraper: TSDomElement;
  private isHide: boolean;

  constructor(tsDom: TSDom, tsDomWait: TSDomWait){
    this.TSDOM = tsDom;
    this.TSDOMWAIT = tsDomWait;
    
    this.isHide = false;
  }

  private async hideTitleHeader():Promise<void>{
    try {
      this.titleHeader = await this.TSDOMWAIT.until(".lesson-video.card .card-header .title");
    } catch (error) {
      this.titleHeader = await this.TSDOMWAIT.until(".lesson-video.card .card-header .title-video");
    }
    
    this.titleWraper = this.TSDOM.getElement(".lesson-video.card .card-header .row");
    
    if(!this.vefifyIfHasDownloadIcon()){
      this.titleHeader.removeClass(["col-md-11"]);
      this.titleHeader.addClass(["col-md-10"]);
    }else{
      this.titleHeader.removeClass(["col-md-10"]);
      this.titleHeader.addClass(["col-md-9"]);
    }
  }

  private vefifyIfHasDownloadIcon(): boolean{
    try {
      const donwloadIcon = this.TSDOM.getElement(".lesson-video.card .card-header .row .text-right");
      return true;
    } catch (error) {
      return false;
    }    
  }

  private createButton(): TSDomElement{
    const buttonWrap = this.TSDOM.createElement("div");
    buttonWrap.addClass(["col-md-1"]);
    //buttonWrap.element.setAttribute("href", "#");

    const button = this.TSDOM.createElement("i");
    button.element.setAttribute("style", "font-size: 24px; color: rgb(255, 255, 255); font-family: FontAwesome; font-weight: normal; font-style: normal; cursor: pointer;");
    button.element.innerHTML = "";
    buttonWrap.element.appendChild(button.element);

    return buttonWrap;
  }

  public async show(lessonsTrack: LessonsTrack): Promise<void>{
    await this.hideTitleHeader();
    
    const button = this.createButton();
    button.element.addEventListener("click", (event) => {
      if(this.isHide){
        lessonsTrack.show();
        this.isHide = false;
      }else{
        lessonsTrack.hide();
        this.isHide = true;
      }      
    });

    this.titleWraper.element.appendChild(button.element);
  }      
}