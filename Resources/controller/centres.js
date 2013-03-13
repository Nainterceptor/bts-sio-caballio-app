function centres() {
	var self = Ti.UI.createWindow({
		title: "Centres",
		backgroundColor: 'white'
	})
	/**
	 * XHR
	 */
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
			table.data = data;
		}
     }; 
    xhr.onerror = function() {
	  alert('Erreur :' + xhr.status);    
	};
    xhr.send();
    /**
     * FIN XHR
     */
	var table = Ti.UI.createTableView();
	// create table view event listener
	table.addEventListener('click', function(e) {
		if (e.rowData.id) {
			self.containingTab.open(
				Ti.UI.createWindow({
					title: e.rowData.nom,
					url: 'controller/centre.js'
				})
			);
		}
	});
	
	
	self.add(table);
	return self
    
}
module.exports = centres



