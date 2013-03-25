function EquipementsWindow(title) {
	var self = Ti.UI.createWindow({
		title:title,
		barColor: '#013435'
	});
    if (Ti.Platform.name == 'iPhone OS') {
        backgroundColor:'white'
    } else {
        backgroundColor:'black'
    }
	//
	// NAVBAR
	//
	var logout = Titanium.UI.createButton({
		title: 'Déconnexion',
		backgroundColor:'#336699'
	});
	var emptyView = Titanium.UI.createView({});
	Ti.App.addEventListener('logout', function(e) {
		if (Ti.Platform.name == 'iPhone OS')
			self.setRightNavButton(emptyView);
		Titanium.App.Properties.removeProperty("token");
		var loginView = require('ui/common/LoginWindow');
		var login = new loginView();
		self.add(login);
	});

	Ti.App.addEventListener('login', function(e) {
			if (Ti.Platform.name == 'iPhone OS')
				self.setRightNavButton(logout);
			if (Ti.Platform.name == 'android') {
				self.add(logout);
				logout.top = 5;
			}
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
								libelle: equipements[e].libelle,
								font:{fontSize: 20, fontFamily: 'Times New Roman'}
							})
						);
					}
					tableview.data = data;
					self.title = title;
			     }; 
			    xhr.onerror = function() {
				  alert('Erreur :' + xhr.status);
				  self.title = title;
				};
			    xhr.send();		
			}
			tableview.addEventListener('dragEnd', function() {
				self.title += '...';
				getData();
			});
			getData();
			// create table view event listener
			tableview.addEventListener('click', function(e)
			{
				if (e.rowData.id)
				{
					var equipement = require('ui/common/EquipementWindow'),
					win = new equipement(e.rowData.id, e.rowData.libelle);
		
					self.containingTab.open(win,{animated:true});
				}
			});

			logout.addEventListener('click', function(e) { 
				Ti.App.fireEvent('logout');
			});
			// add table view to the window
			if (Ti.Platform.name == 'android') {
				tableview.top = 40;
			}
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
