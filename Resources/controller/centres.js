var win = Titanium.UI.currentWindow;
var model = require('models/centres');
var webView = Titanium.UI.createWebView({
	url: "http://poney.spider4all.fr/"
})

win.add(webView);
