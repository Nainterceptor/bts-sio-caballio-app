function EquipementWindow(id, name) {
	var self = Ti.UI.createWindow({
		title: name,
		backgroundColor: 'white',
		barColor: '#013435',
		orientationModes: [
			Titanium.UI.PORTRAIT,
			Titanium.UI.LANDSCAPE_LEFT,
			Titanium.UI.LANDSCAPE_RIGHT
		]
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
		self.setRightNavButton(emptyView);
		Titanium.App.Properties.removeProperty("token");
		var loginView = require('ui/common/LoginView');
		var login = new loginView();
		self.add(login);
	});

	Ti.App.addEventListener('login', function(e) {
		self.setRightNavButton(logout);
		Ti.App.addEventListener('pageReady',function(equipement) {
			var view = Ti.UI.createView({
				width:'100%',
				height:'100%',
				layout:'vertical'
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
				text: 'Libellé : ' + equipement.libelle,
				font:{fontFamily: 'Times New Roman'},
				color: '#333333'
			})
			view.add(libelle);

			var dateAjout = Titanium.UI.createLabel({
				top: 5,
					left:10,
				text: 'Date d\'ajout : ' + equipement.dateAjout,
				font:{fontFamily: 'Times New Roman'},
				color: '#333333'
			})
			view.add(dateAjout);

			var centre = Titanium.UI.createLabel({
				top: 5,
					left:10,
				text: 'Centre : ' + equipement.centre,
				font:{fontFamily: 'Times New Roman'},
				color: '#333333'
			})
			view.add(centre);
			
			var gerantNom;
			if(equipement.firstname == null && equipement.lastname == null) {
				gerantNom = 'Non renseigné';
			} else if(equipement.firstname == null && equipement.lastname != null) {
				gerantNom = equipement.lastname;
			} else if(equipement.lastname == null && equipement.firstname != null) {
				gerantNom = equipement.firstname;
			} else {
				gerantNom = equipement.firstname + ' ' + equipement.lastname;
			}

			var gerant = Titanium.UI.createLabel({
				top: 5,
					left:10,
				text: 'Gérant : ' + gerantNom,
				font:{fontFamily: 'Times New Roman'},
				color: '#333333'
			})
			view.add(gerant);
			self.add(view);	
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
	    	Ti.App.fireEvent('pageReady', equipement);
	    }
	    xhr.onerror = function() {
		  alert('Erreur :' + xhr.status);    
		};
	    xhr.send();
	    /**
	     * FIN XHR
	     */

		logout.addEventListener('click', function(e) { 
			Ti.App.fireEvent('logout');
		});
		// add table view to the window
	});
	if(Titanium.App.Properties.getString("token", false) == false) {
		Ti.App.fireEvent('logout');
	} else {
		Ti.App.fireEvent('login');
	}
	return self;
};

module.exports = EquipementWindow;
