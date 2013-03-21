function EquipementsWindow(title) {
	var self = Ti.UI.createWindow({
		title:title
	});
    if (Ti.Platform.name == 'iPhone OS') {
        backgroundColor:'white'
    } else {
        backgroundColor:'black'
    }
	Ti.App.addEventListener('logout', function(e) {
		Titanium.App.Properties.removeProperty("token");
		var loginView = require('ui/common/LoginView');
		var login = new loginView();
		self.add(login);
	});

	Ti.App.addEventListener('login', function(e) {
			var tableview = Ti.UI.createTableView();	
			function getData() {
			    var xhr = Ti.Network.createHTTPClient();
			    xhr.open("GET","http://poney.spider4all.fr/ws/" + encodeURIComponent(Titanium.App.Properties.getString("token")) + "/equipements.json");
			    xhr.onload = function() {
			    	var data = [];
			    	var equipements = JSON.parse(xhr.responseText);
					for(e in equipements) {
						data.push(
							Ti.UI.createTableViewRow({
								title: equipements[e].libelle, 
								hasChild:true,
								id: equipements[e].id,
								nom: equipements[e].libelle
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
					var centre = require('ui/common/EquipementWindow'),
					win = new centre(e.rowData.id, e.rowData.nom);
		
					self.containingTab.open(win,{animated:true});
				}
			});
			// add table view to the window
			self.add(tableview);	
	});
	if(Titanium.App.Properties.getString("token", false) == false) {
		Ti.App.fireEvent('logout');
	} else {
		Ti.App.fireEvent('login');
	}
	return self;
};

module.exports = EquipementsWindow;
