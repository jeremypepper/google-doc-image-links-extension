'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

///chrome.browserAction.setBadgeText({text: '\'Allo'});

// chrome.tabs.onUpdated.addListener(function (tabId) {
//   chrome.pageAction.show(tabId);
// });

// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab) {
  // want to match "https://docs.google.com/*/document/*"
  if (tab.url) {
    console.log(changeInfo.url);
    if (change.url.search(/https:\/\/docs\.google\.com\/.*\/document\/.*/)) {
      chrome.pageAction.show(tabId);
    }
  }
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);

var options = {
  enabled: true
};

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
      "from a content script:" + sender.tab.url :
      "from the extension");
    if (request.method === "getOptions") {
      if (sender.tab) {
        chrome.pageAction.show(sender.tab.id);
      }
      sendResponse(options);
    }
    if (request.method === "setOptions") {
      options = request.options;
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log("sending message to tabs", tabs, tabs[0].id);
        chrome.tabs.sendMessage(tabs[0].id, {
          method: "optionsChanged",
          options: options
        }, function() {
        });
      });
      //chrome.runtime.sendMessage({method: "optionsChanged"}, function(options) {
      // });
    }
  });

console.log('\'Allo \'Allo! Event Page for Browser Action');
