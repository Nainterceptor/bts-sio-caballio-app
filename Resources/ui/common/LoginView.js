function LoginView() {
	var self = Ti.UI.createView({
		title: 'Se connecter',
		backgroundColor: 'white'
	});
	//
	//  CREATE FIELD ONE
	//
	var username = Titanium.UI.createLabel({
		color:'#000',
		text:'Nom d\'utilisateur',
		font:{fontSize: 15,fontFamily: 'Times New Roman'},
		top:10,
		left:30,
		width:200,
		height:'auto'
	});
	
	self.add(username);
	
	var userField = Titanium.UI.createTextField({
		hintText:'Entrer le nom d\'utilisateur',
		font:{fontFamily: 'Times New Roman'},
		height:35,
		top:35,
		left:30,
		width:250,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	self.add(userField);
	
	//
	//  CREATE FIELD TWO
	//
	var passwordLabel = Titanium.UI.createLabel({
		color:'#000',
		text:'Mot de passe',
		font:{fontSize: 15,fontFamily: 'Times New Roman'},
		top:75,
		left:30,
		width:200,
		height:'auto'
	});
	
	self.add(passwordLabel);
	
	var passwordField = Titanium.UI.createTextField({
		hintText:'Entrer le mot de passe',
		font:{fontFamily: 'Times New Roman'},
		passwordMask: true,
		height:35,
		top:100,
		left:30,
		width:250,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	self.add(passwordField);
	
	//
	// CREATE BUTTON
	//
	var login = Titanium.UI.createButton({
		title:'Se connecter',
		top:170,
		left:65,
		height:45,
		width:180,
		backgroundGradient: {
	        type: 'linear',
	        startPoint: { x: '0%', x: '0%' },
        	endPoint: { y: '100%', y: '100%' },
	        colors: [ '#017464', '#015B4E']
	   	},
	   	backgroundImage: 'none',
		borderRadius: 6,
		borderColor : 'rgba(0, 0, 0, 0.25)',
		borderWidth : 1,
		font:{fontSize:25, fontFamily: 'Times New Roman'},
		color: '#fff'
	});
	login.addEventListener('touchstart', function() {
		login.setBackgroundGradient({
			type: 'linear',
	        startPoint: { x: '100%', x: '100%' },
        	endPoint: { y: '0%', y: '0%' },
	        colors: [ '#017464', '#015B4E']
		});
	});
	login.addEventListener('touchend', function() {
		login.setBackgroundGradient({
			type: 'linear',
	        startPoint: { x: '0%', x: '0%' },
        	endPoint: { y: '100%', y: '100%' },
	        colors: [ '#017464', '#015B4E']
		});
	});
	login.addEventListener("click", function() {
		var username = encodeURIComponent(userField.value);
		var password = encodeURIComponent(passwordField.value);
		/**
		 * XHR
		 */
	    var xhr = Ti.Network.createHTTPClient();
	    xhr.open("GET","http://poney.spider4all.fr/ws/login/" + password + '/' + username + ".json");
	    xhr.onload = function() {
	    	reponse = JSON.parse(xhr.responseText)
	    	if(reponse.login == true) {
	    		Titanium.App.Properties.setString("token", reponse.token)
	    		Ti.App.fireEvent('login');
	    	}
	    }
	    xhr.onerror = function() {
		  	alert('Erreur :' + xhr.status);
		};
	    xhr.send();
	    /**
	     * FIN XHR
	     */
	});
	self.add(login);
	return self;
};

module.exports = LoginView;
