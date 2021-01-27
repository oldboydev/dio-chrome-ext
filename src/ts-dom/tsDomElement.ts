export class TSDomElement{
  private readonly _element: Element | null;

  constructor(element: Element){
    this._element = element;
  }

  public addClass(classesToAdd: string[]): void{
    this._element.classList.add(...classesToAdd);
  }

  public removeClass(classesToRemove: string[]): void{
    this._element.classList.remove(...classesToRemove);
  }

  get element(): Element | null{
    return this._element;
  }
}