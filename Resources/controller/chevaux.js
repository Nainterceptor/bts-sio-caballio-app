var win = Titanium.UI.currentWindow;
Titanium.App.Properties.getString("user");
var webView = Titanium.UI.createWebView({
	url: "http://poney.spider4all.fr/"
})

win.add(webView);
