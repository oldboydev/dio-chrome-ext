import { TSDomElement } from "./tsDomElement";

export class TSDom{

  createElement(elementType: string): TSDomElement{
    const element = document.createElement(elementType);

    return new TSDomElement(element);
  }

  getElement(selector: string): TSDomElement{
    const domElement = document.querySelector(selector);

    if(domElement === null){
      throw new Error(`Element for selector: ${selector} not found`);
    }

    return new TSDomElement(domElement);
  }

  getElements(selector: string): TSDomElement[]{
    const domElements = document.querySelectorAll(selector);

    if(domElements.length === 0){
      throw new Error(`Elements for selector: ${selector} not found`);
    }

    const elements: TSDomElement[] = [];
    domElements.forEach( (value, index, parent) => {
      const tsDomElement = new TSDomElement(value);
      elements.push(tsDomElement);
    });

    return elements;
  }
}