export class TSDomElement{
  private readonly _element: Element | null;

  constructor(selector: string){
    this._element = this.getDomElement(selector);

    if(this._element === null){
      throw new Error(`Element with selector: ${selector} not found`)
    }
  }

  private getDomElement(selector: string): Element | null{
    return document.querySelector(selector);
  }

  public addClass(classesToAdd: string[]): void{
    this._element.classList.add(...classesToAdd);
  }

  public removeClass(classesToRemove: string[]): void{
    this._element.classList.remove(...classesToRemove);
  }

  get Element(): Element | null{
    return this._element;
  }
}