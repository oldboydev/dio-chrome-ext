chrome.webNavigation.onHistoryStateUpdated.addListener((req) => {
  console.log(req);
});