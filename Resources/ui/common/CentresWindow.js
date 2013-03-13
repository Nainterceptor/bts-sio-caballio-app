function CentresWindow(title) {
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'white'
	});
	
	/**
	 * XHR
	 */
	var tableview = Titanium.UI.createTableView();
    var xhr = Titanium.Network.createHTTPClient();
    xhr.open("GET","http://poney.spider4all.fr/ws/centres.json");
    xhr.onload = function() {
    	var data = [];
    	var centres = JSON.parse(xhr.responseText);
		for(c in centres) {
			data.push(
				Ti.UI.createTableViewRow({
					title: centres[c].nom, 
					hasChild:true,
					id: centres[c].id,
					nom: centres[c].nom
				})
			);
		}
		tableview.data = data;
     }; 
    xhr.onerror = function() {
	  alert('Erreur :' + xhr.status);    
	};
    xhr.send();
    /**
     * FIN XHR
     */
	
	// create table view event listener
	tableview.addEventListener('click', function(e)
	{
		if (e.rowData.id)
		{
			var centre = require('ui/common/CentreWindow'),
			win = new centre(e.rowData.id, e.rowData.nom);

			self.containingTab.open(win,{animated:true});
		}
	});
	
	// add table view to the window
	self.add(tableview);	
	return self;
};

module.exports = CentresWindow;
