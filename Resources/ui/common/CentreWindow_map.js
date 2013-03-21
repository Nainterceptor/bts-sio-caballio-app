function CentreWindow_map(centre) {
		var self = Titanium.Map.createView({
			mapType: Titanium.Map.STANDARD_TYPE,
			animate: true,
    		regionFit: true
		});
		Ti.App.addEventListener('pageReady',function(centre) {
			self.region = {latitude: centre.latitude, longitude: centre.longitude, latitudeDelta:0.1, longitudeDelta:0.1}
			var annotation = Titanium.Map.createAnnotation({
				latitude: centre.latitude,
				longitude: centre.longitude,
				title: centre.nom,
				subtitle: centre.firstname + ' ' + centre.lastname,
				animate:true
			});
			self.addAnnotation(annotation);
			self.selectAnnotation(annotation);
		});
		//@Todo : MAP
		return self;
}

module.exports = CentreWindow_map;
