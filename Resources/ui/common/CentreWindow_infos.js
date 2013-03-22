function CentreWindow_infos() {
	var self = Ti.UI.createView({
		width:'100%',
		height:'100%',
		layout:'vertical'
	});
	
	Ti.App.addEventListener('pageReady',function(centre) {
		var titre2 = Titanium.UI.createLabel({
			top:10,
				left:10,
			text:'Adresse',
			font:{fontSize:30, fontFamily: 'Times New Roman'},
			color: '#333333'
		});
		self.add(titre2);
		
		var adresse = Titanium.UI.createLabel({
			top: 5,
				left:10,
			text: 'Adresse : ' + centre.adresse,
			font:{fontFamily: 'Times New Roman'},
			color: '#333333'
		})
		self.add(adresse);
		
		var ville = Titanium.UI.createLabel({
			top: 5,
				left:10,
			text: 'Ville : ' + centre.ville,
			font:{fontFamily: 'Times New Roman'},
			color: '#333333'
		})
		self.add(ville);
		
		var codePostal = Titanium.UI.createLabel({
			top: 5,
				left:10,
			text: 'Code Postal : ' + centre.codePostal,
			font:{fontFamily: 'Times New Roman'},
			color: '#333333'
		})
		self.add(codePostal);
		
		var tel = Titanium.UI.createLabel({
			top: 5,
				left:10,
			text: 'Telephone : '+ centre.telephone,
			font:{fontFamily: 'Times New Roman'},
			color: '#333333'
		});
		self.add(tel);
		
		var titre3 = Titanium.UI.createLabel({
			top: 10,
				left:10,
			text:'Gerant',
			font:{fontSize:30, fontFamily: 'Times New Roman'},
			color: '#333333'
		});
		self.add(titre3);
		
		var firstname = Titanium.UI.createLabel({
			top: 5,
				left:10,
			text: 'Nom : ' + centre.firstname,
			font:{fontFamily: 'Times New Roman'},
			color: '#333333'
		})
		self.add(firstname);
		
		var lastname = Titanium.UI.createLabel({
			top: 5,
				left:10,
			text: 'Prenom : ' + centre.lastname,
			font:{fontFamily: 'Times New Roman'},
			color: '#333333'
		})
		self.add(lastname);
	});
	return self;
}
module.exports = CentreWindow_infos;
