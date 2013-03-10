var win = Titanium.UI.currentWindow;
function getCentres() {  
    var xhr = Titanium.Network.createHTTPClient();
    xhr.open("GET","http://poney.spider4all.fr/app_dev.php/ws/centre/index.json");
    xhr.onload = function() {
    	var data = [];
    	var centres = JSON.parse(xhr.responseText);
		for(c in centres) {
			data.push(Ti.UI.createTableViewRow({title: centres[c].nom}));
			table.data = data;
		}
     }; 
    xhr.onerror = function() {
	  alert('Erreur :' + xhr.status);    
	};
    xhr.send();
}
var table = Ti.UI.createTableView();
getCentres();
win.add(table);