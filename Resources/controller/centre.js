var win = Titanium.UI.currentWindow;
function getCentre(id) {  
    var xhr = Titanium.Network.createHTTPClient();
    xhr.open("GET","http://poney.spider4all.fr/ws/centre/' + id + '.json");
    xhr.onload = function() {
    	var data = [];
    	var centre = JSON.parse(xhr.responseText);
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
getCentre();
win.add(table);