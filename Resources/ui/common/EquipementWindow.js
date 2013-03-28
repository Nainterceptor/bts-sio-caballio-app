function EquipementWindow(id, name) {
	var self = Ti.UI.createWindow({
		title: name,
		barColor: '#013435',
		orientationModes: [
			Titanium.UI.PORTRAIT,
			Titanium.UI.LANDSCAPE_LEFT,
			Titanium.UI.LANDSCAPE_RIGHT
		]
	});
	var view = Ti.UI.createView({
		width:'100%',
		height:'100%',
		layout:'vertical',
		backgroundColor:'white'
	});
	var loginView = require('ui/common/LoginWindow');
	var login = new loginView();
    if (Ti.Platform.name == 'iPhone OS')
        backgroundColor:'white'
    else
        backgroundColor:'black'
	//
	// NAVBAR
	//
	var logout = Titanium.UI.createButton({
		title: 'Déconnexion',
		backgroundColor:'#336699'
	
	});
	logout.addEventListener('click', function(e) { 
		Ti.App.fireEvent('logout');
	});
	var emptyView = Titanium.UI.createView();
	Ti.App.addEventListener('logout', function(e) {
		if (Ti.Platform.name == 'iPhone OS')
			self.setRightNavButton(emptyView);
		Titanium.App.Properties.removeProperty("token");
		self.add(login);
		login.show();
		view.hide();
		self.remove(logout);
	});
	var infoTitle = Titanium.UI.createLabel({
		top:10,
		left:10,
		text:'Informations',
		font:{fontSize:30, fontFamily: 'Times New Roman'},
		color: '#333333'
	});
	view.add(infoTitle);
	
	var libelle = Titanium.UI.createLabel({
		top: 5,
		left:10,
		font:{fontFamily: 'Times New Roman'},
		color: '#333333'
	})
	view.add(libelle);

	var dateAjout = Titanium.UI.createLabel({
		top: 5,
		left:10,
		font:{fontFamily: 'Times New Roman'},
		color: '#333333'
	})
	view.add(dateAjout);
    
	var centre = Titanium.UI.createLabel({
		top: 5,
		left:10,
		font:{fontFamily: 'Times New Roman'},
		color: '#333333'
	})
	view.add(centre);

	var gerant = Titanium.UI.createLabel({
		top: 5,
		left:10,
		font:{fontFamily: 'Times New Roman'},
		color: '#333333'
	})
	view.add(gerant);
	Ti.App.addEventListener('login', function(e) {
		view.show();
		login.hide();
		if (Ti.Platform.name == 'iPhone OS')
			self.setRightNavButton(logout);
		view.addEventListener('pageReady',function(equipement) {
			libelle.text = 'Libellé : ' + equipement.libelle;
			dateAjout.text = 'Date d\'ajout : ' + equipement.dateAjout;
			centre.text = 'Centre : ' + equipement.centre;
			if(equipement.firstname == null && equipement.lastname == null)
				gerant.text = 'Gérant : Non renseigné';
			else if(equipement.firstname == null && equipement.lastname != null)
				gerant.text = 'Gérant : ' + equipement.lastname;
			else if(equipement.lastname == null && equipement.firstname != null)
				gerant.text = 'Gérant : ' + equipement.firstname;
			else
				gerant.text = 'Gérant : ' + equipement.firstname + ' ' + equipement.lastname;
		});
		/**
		 * XHR
		 */
	    var xhr = Ti.Network.createHTTPClient();
	    xhr.open("GET","http://poney.spider4all.fr/ws/" 
	    			   + encodeURIComponent(Titanium.App.Properties.getString("token")) 
	    			   + "/equipement/" 
	    			   + encodeURIComponent(id) 
	    			   + ".json"
	    		);
	    xhr.onload = function() {
	    	equipement = JSON.parse(xhr.responseText)
	    	view.fireEvent('pageReady', equipement);
	    }
	    xhr.onerror = function() {
		  alert('Erreur :' + xhr.status);    
		};
	    xhr.send();
	    /**
	     * FIN XHR
	     */
		// add table view to the window
	});
	if(Titanium.App.Properties.getString("token", false) == false)
		Ti.App.fireEvent('logout');
	else
		Ti.App.fireEvent('login');
	self.add(view);	
	return self;
};

module.exports = EquipementWindow;
