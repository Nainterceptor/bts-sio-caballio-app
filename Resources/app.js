var commonStyle = require('style/common');
var ApplicationTabGroup = require('ui/common/ApplicationTabGroup');

//Windows
var centresWindow = Ti.UI.createWindow({  
    title:'Centres',
    url:'controller/centres.js'
});

var chevauxWindow = Ti.UI.createWindow({  
    title:'Chevaux',
    url:'controller/chevaux.js'
});

var equipementsWindow = Ti.UI.createWindow({  
    title:'Chevaux',
    url:'controller/equipements.js'
});

//Tabs
var centresTab = Titanium.UI.createTab({
    title:'Centres',
    window:centresWindow
});

var chevauxTab = Titanium.UI.createTab({
    title:'Chevaux',
    window:chevauxWindow
});

var equipementsTab = Titanium.UI.createTab({
    title:'Equipements',
    window:equipementsWindow
});

//Load Tabs
var tabs = Titanium.UI.createTabGroup();
tabs.addTab(centresTab);
tabs.addTab(chevauxTab);
tabs.addTab(equipementsTab);
tabs.open();