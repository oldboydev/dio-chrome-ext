import config from "./config";

chrome.webNavigation.onHistoryStateUpdated.addListener((req) => {
  console.log(req);

  if(config.validateUrl(new URL(req.url))){
    console.log("valid, send message");
    chrome.tabs.sendMessage(req.tabId, { type: "PAGE_RENDERED" });
  }
});