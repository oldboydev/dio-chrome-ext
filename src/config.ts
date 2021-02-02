export class Config{
  private readonly _urlRoot: string;
  private readonly _allowedUrlPaths: string[];

  constructor(urlRoot: string, allowedUrlPaths: string[]){
    this._urlRoot = urlRoot;
    this._allowedUrlPaths = allowedUrlPaths;
  }

  public validateUrl(url: URL): boolean{
    const splitPath = url.pathname.split("/");

    if(url.origin === this._urlRoot){
     if(this._allowedUrlPaths.includes(splitPath[1])){
       return true;
     }
    }
    
    return false;
  }

  get urlRoot(): string{
    return this._urlRoot;
  }

  get allowedUrlPaths(): string[]{
    return this._allowedUrlPaths;
  }
}

const config = new Config(
  "https://web.digitalinnovation.one", 
  ["course", "project", "lab"]
);

export default config;