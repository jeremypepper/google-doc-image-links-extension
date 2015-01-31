'use strict';

var enabledCheckbox = document.getElementById("enabled-checkbox");

chrome.runtime.sendMessage({method: "getOptions"}, function(options) {
	console.log('got response', options);
	enabledCheckbox.checked = options.enabled;
});

chrome.runtime.onMessage.addListener = function(request) {
	if (request.method === "optionsChanged") {
		console.log("option changed", request.options);
		event.target.checked = request.options.enabled;
	}
};

enabledCheckbox.onchange = function(event) {
	console.log("checkbox state", event.target.checked);
	chrome.runtime.sendMessage(
	{
		method: "setOptions",
		options: {
			enabled: event.target.checked
		}
	}, function() {});
};
