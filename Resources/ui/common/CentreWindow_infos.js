function CentreWindow_infos(centre) {
		var self = Ti.UI.createWebView();
		Ti.App.addEventListener('pageReady',function(centre) {
			var html = '<html><head></head>';
			html += '<body>';
			html += '<h1>Adresse</h1>'
			html += '<p>' + centre.nom + '<br />' + centre.adresse + '<br />' + centre.codePostal + ' ' + centre.ville;
			html += '</p>';
			html += '<h1>Autres</h1>';
			html += '<p>';
			html += 'Date : ' + centre.date + '<br />';
			html += 'Gérant : ' + centre.gerant_prenom + ' ' + centre.gerant_nom;
			html += '</p>';
			html += '</body>';
			html += '</html>';
			self.html = html;
		});

		return self;
}

module.exports = CentreWindow_infos;
