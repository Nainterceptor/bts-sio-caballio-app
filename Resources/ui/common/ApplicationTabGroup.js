// Keep a reference to this window so it does not get collected on Android.
Ti.include('/ui/common/overrideTabs.js');
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
		backgroundColor: '#013435', 
		color: '#fff', 
		font:{fontSize: 15, fontFamily: 'Times New Roman'},
		window: centresWin
	});
	centresWin.containingTab = centresTab;
	self.addTab(centresTab);
	
	var chevauxTab = Ti.UI.createTab({
		title: 'Chevaux',
		backgroundColor: '#013435', 
		color: '#fff', 
		font:{fontSize: 15, fontFamily: 'Times New Roman'},
		window: chevauxWin
	});
	chevauxWin.containingTab = chevauxTab;
	self.addTab(chevauxTab);
	
	var equipementsTab = Ti.UI.createTab({
		title: 'Equipements',
		backgroundColor: '#013435', 
		color: '#fff', 
		font:{fontSize: 15, fontFamily: 'Times New Roman'},
		window:equipementsWin
	});
	equipementsWin.containingTab = equipementsTab;
	self.addTab(equipementsTab);
	
	if (Ti.Platform.name == 'iPhone OS') {
        overrideTabs(
			self, // The tab group
			{ backgroundColor: '#013435', color: '#fff', font:{fontSize: 15, fontFamily: 'Times New Roman'} }, // View parameters for the background
			{ backgroundColor: '#002425', color: '#fff', style: 0, font:{fontSize: 15, fontFamily: 'Times New Roman'} }, // View parameters for selected tabs
			{ backgroundColor: '#013435', color: '#fff', style: 0, font:{fontSize: 15, fontFamily: 'Times New Roman'} } // View parameters for deselected tabs
		);
   	}
	
	self.model = Ti.Platform.model;
	
	return self;
};

module.exports = ApplicationTabGroup;
