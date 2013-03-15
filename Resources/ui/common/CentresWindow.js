function CentresWindow(title) {
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'white'
	});
	

	var tableview = Ti.UI.createTableView();
	function getData() {
	    var xhr = Ti.Network.createHTTPClient();
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
	}

	var refresh = Ti.UI.createButton();
	if (Ti.Platform.osname !== 'mobileweb'){
		refresh.systemButton = Ti.UI.iPhone.SystemButton.REFRESH;
	}
	refresh.addEventListener('click', function() {
		setTimeout(function(){
			getData();
		}, 1000);
	});
	
	if (Ti.Platform.name == 'iPhone OS') {
		self.rightNavButton = refresh;
	} else {
		refresh.top = 5;
		refresh.title = "Refresh";
		refresh.width = 200;
		self.add(refresh);
	}
	getData();
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
