function ChevauxWindow(title) {
	var self = Ti.UI.createWindow({
		title:title,
		barColor: '#013435'
	});
	var tableview = Ti.UI.createTableView();
	var cheval = require('ui/common/ChevalWindow');
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
			var cheval = require('ui/common/ChevalWindow');
			var win = new cheval(e.rowData.id, e.rowData.nom);

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
		    xhr.open("GET","http://poney.spider4all.fr/ws/" + encodeURIComponent(Titanium.App.Properties.getString("token")) + "/chevaux.json");
		    xhr.onload = function() {
		    	var data = [];
		    	var chevaux = JSON.parse(xhr.responseText);
				for(e in chevaux) {
					data.push(
						Ti.UI.createTableViewRow({
							title: chevaux[e].nom, 
							hasChild:true,
							id: chevaux[e].id,
							nom: chevaux[e].nom,
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
	if(Titanium.App.Properties.getString("token", false) == false) {
		Ti.App.fireEvent('logout');
	} else {
		Ti.App.fireEvent('login');
	}
	return self;
};

module.exports = ChevauxWindow;
