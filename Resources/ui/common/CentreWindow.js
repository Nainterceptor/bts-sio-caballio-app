function CentreWindow(id, title) {
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'white'
	});
	
	var webview = Ti.UI.createWebView({url:'ui/common/Centre.html'});
	/**
	 * XHR
	 */
    var xhr = Ti.Network.createHTTPClient();
    xhr.open("GET","http://poney.spider4all.fr/ws/centre/" + id + ".json");
    
    xhr.onload = function() {
    	centre = JSON.parse(xhr.responseText)
	    Ti.App.fireEvent('pageReady',centre);
	    //alert(centre);
    	
     }; 
    xhr.onerror = function() {
	  alert('Erreur :' + xhr.status);    
	};
    xhr.send();
    /**
     * FIN XHR
     */

	// add table view to the window
	self.add(webview);	
	return self;
};

module.exports = CentreWindow;
