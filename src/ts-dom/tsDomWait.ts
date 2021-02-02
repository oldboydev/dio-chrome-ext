import { TSDom } from "./tsDom";
import { TSDomElement } from "./tsDomElement";

export class TSDomWait{
  private tsDom: TSDom;
  private timeout: number;
  private maxRetryAttemps: number;

  constructor(tsDom: TSDom, timeout?: number, maxRetryAttemps?: number){
    this.tsDom = tsDom;
    this.timeout = timeout ? timeout : 1000;
    this.maxRetryAttemps = maxRetryAttemps ? maxRetryAttemps : 5;
  }

  private sleep(ms: number){
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async until(selector: string): Promise<TSDomElement>{
    let attemptsCount = 0;
    let timeout = this.timeout;

    do{
      try {
        const element = this.tsDom.getElement(selector);
        return element;
      } catch (error) {
        await this.sleep(timeout);
        attemptsCount++;
        timeout = timeout * 2;
      }
    }while(attemptsCount < this.maxRetryAttemps);

    throw new Error(`Element for selector: ${selector} not found, after ${attemptsCount} retry attempts`);
  }
}