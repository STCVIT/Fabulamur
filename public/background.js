chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.sendMessage(tab.id, { message: "load" });
});

function callLocalhost(info, tab) {
  chrome.tabs.update(info.tab, {
    url: `http://localhost:3000/?url=${info.pageUrl}`,
  });
  chrome.tabs.sendMessage(tabs[0].id, {
    url: `http://localhost:3000/?url=${info.pageUrl}`,
  });
}

var child1 = chrome.contextMenus.create({
  title: "Chat here",
  onclick: callLocalhost,
  contexts: ["all"],
});
