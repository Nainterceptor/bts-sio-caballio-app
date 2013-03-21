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
		top:10,
		left:30,
		width:200,
		height:'auto'
	});
	
	self.add(username);
	
	var userField = Titanium.UI.createTextField({
		hintText:'Entrer le nom d\'utilisateur',
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
		top:75,
		left:30,
		width:200,
		height:'auto'
	});
	
	self.add(passwordLabel);
	
	var passwordField = Titanium.UI.createTextField({
		hintText:'Entrer le mot de passe',
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
		left:30,
		height:30,
		width:250
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
