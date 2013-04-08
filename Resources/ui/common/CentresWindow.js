function CentresWindow(title) {
	var self = Ti.UI.createWindow({
		title:title,
		barColor: '#013435'
	});
	function formatDate()
	{
		var date = new Date();
		var datestr = date.getMonth()+'/'+date.getDate()+'/'+date.getFullYear();
			datestr+=' '+date.getHours()+':'+date.getMinutes();
		return datestr;
	}
	if (Ti.Platform.name == 'iPhone OS') {
        self.backgroundColor = 'white';
    } else {
        self.backgroundColor = 'black';
    }
    
	var tableview = Ti.UI.createTableView();

	function getData() {
	    var xhr = Ti.Network.createHTTPClient();
	    xhr.open("GET","http://caballio.spider4all.fr/ws/centres.json");
	    xhr.onload = function() {
	    	var data = [];
	    	var centres = JSON.parse(xhr.responseText);
			for(c in centres) {
				data.push(
					Ti.UI.createTableViewRow({
						title: centres[c].nom, 
						hasChild:true,
						id: centres[c].id,
						nom: centres[c].nom,
						font:{fontSize: 20, fontFamily: 'Times New Roman'}
					})
				);
			}
			tableview.data = data;
			self.title = title;
	     }; 
	    xhr.onerror = function() {
		  alert('Erreur de communication :' + xhr.status);
		  self.title = title;
		};
	    xhr.send();		
	}
	tableview.addEventListener('dragEnd', function() {
		self.title += '...';
		getData();
	});
	getData();
	// create table view event listener
	tableview.addEventListener('click', function(e)
	{
		if (e.rowData.id)
		{
			var centre = require('ui/common/CentreWindow'),
			win = new centre(e.rowData.id, e.rowData.nom);

			self.containingTab.open(win,{animated:true});
		}
	});
	
	// add table view to the window
	self.add(tableview);	
	return self;
};

module.exports = CentresWindow;
