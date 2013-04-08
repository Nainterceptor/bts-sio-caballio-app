function EquipementsWindow(title) {
	var self = Ti.UI.createWindow({
		title:title,
		barColor: '#013435'
	});
	var tableview = Ti.UI.createTableView();
	var equipement = require('ui/common/EquipementWindow');
	var loginView = require('ui/common/LoginWindow');
	var login = new loginView();
	var logout = Titanium.UI.createButton({
		title: 'Déconnexion',
		backgroundColor:'#336699'
	});
    if (Ti.Platform.name == 'iPhone OS') {
        backgroundColor:'white'
    } else {
        backgroundColor:'black'
    }
	//
	// NAVBAR
	//

	var emptyView = Titanium.UI.createView({});
	Ti.App.addEventListener('logout', function(e) {
		if (Ti.Platform.name == 'iPhone OS')
			self.setRightNavButton(emptyView);
		Titanium.App.Properties.removeProperty("token");
		self.add(login);
		login.show();
		tableview.hide();
		self.remove(logout);
	});
	// create table view event listener
	tableview.addEventListener('click', function(e)
	{
		if (e.rowData.id)
		{
			var equipement = require('ui/common/EquipementWindow');
			var win = new equipement(e.rowData.id, e.rowData.libelle);
			Ti.API.log('foo');
			self.containingTab.open(win,{animated:true});
		}
	});
	Ti.App.addEventListener('login', function(e) {
		tableview.show();
		login.hide();
		logout.addEventListener('click', function(e) { 
			Ti.App.fireEvent('logout');
		});
		if (Ti.Platform.name == 'iPhone OS')
			self.setRightNavButton(logout);
		if (Ti.Platform.name == 'android') {
			self.add(logout);
			logout.top = 5;
		}
		function getData() {
		    var xhr = Ti.Network.createHTTPClient();
		    xhr.open("GET","http://caballio.spider4all.fr/ws/" + encodeURIComponent(Titanium.App.Properties.getString("token")) + "/equipements.json");
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
		// add table view to the window
		if (Ti.Platform.name == 'android') {
			tableview.top = 40;
		}
		self.add(tableview);	
	});
	self.addEventListener('focus', function() {
		if(Titanium.App.Properties.getString("token", false) == false) {
			Ti.App.fireEvent('logout');
		} else {
			Ti.App.fireEvent('login');
		}
	});
	return self;
};

module.exports = EquipementsWindow;
