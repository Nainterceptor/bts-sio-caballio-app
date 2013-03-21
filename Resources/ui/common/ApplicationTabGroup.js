// Keep a reference to this window so it does not get collected on Android.
var messageWin;
function ApplicationTabGroup() {
	//create module instance
	var self = Ti.UI.createTabGroup(),
		CentresWindow = require('ui/common/CentresWindow'),
		ChevauxWindow = require('ui/common/ChevauxWindow'),
		EquipementsWindow = require('ui/common/EquipementsWindow');
	
	//create app tabs
	var centresWin = new CentresWindow('Centres'),
		chevauxWin = new ChevauxWindow('Chevaux'),
		equipementsWin = new EquipementsWindow('Equipements');

	
	var centresTab = Ti.UI.createTab({
		title: 'Centres',
		window: centresWin
	});
	centresWin.containingTab = centresTab;
	self.addTab(centresTab);
	
	var chevauxTab = Ti.UI.createTab({
		title: 'Chevaux',
		window: chevauxWin
	});
	chevauxWin.containingTab = chevauxTab;
	self.addTab(chevauxTab);
	
	var equipementsTab = Ti.UI.createTab({
		title: 'Equipements',
		window:equipementsWin
	});
	equipementsWin.containingTab = equipementsTab;
	self.addTab(equipementsTab);
	
	self.model = Ti.Platform.model;
	
	return self;
};

module.exports = ApplicationTabGroup;
