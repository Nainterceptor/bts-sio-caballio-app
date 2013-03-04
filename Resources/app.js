// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#ECE8DD');
if (Titanium.Platform.osname === 'iphone' || Titanium.Platform.osname === 'ipad') {
	var os = "iOs";
}
else if (Titanium.Platform.osname === 'mobileweb'){
	var os = "Mobile";
}
else {
	var os = "Android";
}



//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Poney App',
    url:'views/poney.js'
});

if(os == 'iOs') {
	var tab1 = Titanium.UI.createTab({
	   	icon: Titanium.UI.iPhone.SystemIcon.BOOKMARKS, 
	    title:'Poney',
	    window:win1
	});
} else {
	var tab1 = Titanium.UI.createTab({
	    title:'Poney',
	    window:win1
	});
}


// create tab group
var tabGroup = Titanium.UI.createTabGroup();

//
//  add tabs
//
tabGroup.addTab(tab1);

// open tab group
tabGroup.open();