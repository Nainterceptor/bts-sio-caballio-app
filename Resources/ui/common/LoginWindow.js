function LoginView() {
	var view = Ti.UI.createView({
		title: 'Se connecter',
		backgroundColor: 'white',
		layout:'vertical'
	});
	//
	//  CREATE FIELD ONE
	//
	var username = Titanium.UI.createLabel({
		color:'#000',
		text:'Nom d\'utilisateur',
		top: 10
	});
	
	view.add(username);
	
	var userField = Titanium.UI.createTextField({
		hintText:'Entrer le nom d\'utilisateur',
		top: 10,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	view.add(userField);
	
	//
	//  CREATE FIELD TWO
	//
	var passwordLabel = Titanium.UI.createLabel({
		color:'#000',
		text:'Mot de passe',
		top: 10
	});
	
	view.add(passwordLabel);
	
	var passwordField = Titanium.UI.createTextField({
		hintText: 'Entrer le mot de passe',
		passwordMask: true,
		top: 10,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	view.add(passwordField);
	
	//
	// CREATE BUTTON
	//
	var login = Titanium.UI.createButton({
		title:'Se connecter',
		top: 10,
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
		if(username == '' || password == '') {
			alert('Le nom d\'utilisateur et le mot de passe sont nécessaires');
		} else {
			/**
			 * XHR
			 */
		    var xhr = Ti.Network.createHTTPClient();
		    xhr.open("GET","http://caballio.spider4all.fr/ws/login/" + password + '/' + username + ".json");
		    xhr.onload = function() {
		    	reponse = JSON.parse(xhr.responseText)
		    	if(reponse.login == true) {
		    		Titanium.App.Properties.setString("token", reponse.token);
		    		Ti.App.fireEvent('login');
		    	} else {
		    		alert('Mot de passe ou nom d\'utilisateur incorrect');
		    	}
		    }
		    xhr.onerror = function() {
			  alert('Erreur :' + xhr.status);    
			};
		    xhr.send();
		    /**
		     * FIN XHR
		     */
	   }
	});
	
	view.add(login);
	return view;
};

module.exports = LoginView;
