function CentreWindow(id, title) {
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'white',
		orientationModes: [
			Titanium.UI.PORTRAIT,
			Titanium.UI.LANDSCAPE_LEFT,
			Titanium.UI.LANDSCAPE_RIGHT
		]
	});
	
	var tools = require('ui/common/tools');
	
	Ti.Gesture.addEventListener('orientationchange',function(e)	{
		var orientation = tools.getOrientation(e.orientation);
		alert(orientation);
	});
	
	var webview = Ti.UI.createWebView({url:'ui/common/Centre.html'});
	var views = [];
	
	/**
	 * XHR
	 */
    var xhr = Ti.Network.createHTTPClient();
    xhr.open("GET","http://poney.spider4all.fr/ws/centre/" + id + ".json");
    xhr.onload = function() {
    	centre = JSON.parse(xhr.responseText)
    	Ti.App.fireEvent('pageReady',centre);
    }
    xhr.onerror = function() {
	  alert('Erreur :' + xhr.status);    
	};
    xhr.send();
    /**
     * FIN XHR
     */
	var infosWindow = require('ui/common/CentreWindow_infos');
	var infos = new infosWindow();
	var mapWindow = require('ui/common/CentreWindow_map');
	var map = new mapWindow();
	
	var scrollView = Titanium.UI.createScrollableView({
		views: [infos, map],
		showPagingControl:true,
		pagingControlHeight:30,
		maxZoomScale:2.0,
		currentPage:1
	});
	// add table view to the window
	self.add(scrollView);	
	return self;
};

module.exports = CentreWindow;
