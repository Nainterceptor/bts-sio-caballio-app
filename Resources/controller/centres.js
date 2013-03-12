var win = Titanium.UI.currentWindow;
function getCentres() {  
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
					id: centres[c].id
				})
			);
			table.data = data;
		}
     }; 
    xhr.onerror = function() {
	  alert('Erreur :' + xhr.status);    
	};
    xhr.send();
}

// create table view event listener
tableview.addEventListener('click', function(e) {
	if (e.rowData.id) {
		var centre = require('controller/centre.js');
		win = new centre();
		_args.containingTab.open(win,{animated:true});
	}
});
var table = Ti.UI.createTableView();
getCentres();
win.add(table);