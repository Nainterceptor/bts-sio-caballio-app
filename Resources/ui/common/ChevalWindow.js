function ChevalWindow(id, name) {
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
		self.setRightNavButton(emptyView);
		Titanium.App.Properties.removeProperty("token");
		var loginView = require('ui/common/LoginWindow');
		var login = new loginView();
		self.add(login);
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
	
	var nourriture = Titanium.UI.createLabel({
		top: 5,
		left:10,
		font:{fontFamily: 'Times New Roman'},
		color: '#333333'
	})
	view.add(nourriture);

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
		if (Ti.Platform.name == 'iPhone OS')
			self.setRightNavButton(logout);
		view.addEventListener('pageReady',function(cheval) {
			libelle.text = 'Nom : ' + cheval.nom;
			nourriture.text = 'Nourriture : ' + cheval.quantite + 'kg/' + cheval.nourriture;
			dateAjout.text = 'Date d\'ajout : ' + cheval.nom;
			centre.text = 'Centre : ' + cheval.centre;
			if(cheval.prenom_proprio == null && cheval.nom_proprio == null)
				gerant.text = 'Gérant : Non renseigné';
			else if(cheval.prenom_proprio == null && cheval.nom_proprio != null)
				gerant.text = 'Gérant : ' + cheval.nom_proprio;
			else if(cheval.nom_proprio == null && cheval.prenom_proprio != null)
				gerant.text = 'Gérant : ' + cheval.prenom_proprio;
			else
				gerant.text = 'Gérant : ' + cheval.prenom_proprio + ' ' + cheval.nom_proprio;
		});
		/**
		 * XHR
		 */
	    var xhr = Ti.Network.createHTTPClient();
	    xhr.open("GET","http://poney.spider4all.fr/ws/" 
	    			   + encodeURIComponent(Titanium.App.Properties.getString("token")) 
	    			   + "/cheval/" 
	    			   + encodeURIComponent(id) 
	    			   + ".json"
	    		);
	    xhr.onload = function() {
	    	cheval = JSON.parse(xhr.responseText)
	    	view.fireEvent('pageReady', cheval);
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

module.exports = ChevalWindow;
