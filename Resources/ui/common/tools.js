function tools() {
	function getOrientation(o)
	{ //Came from orientation.js, but we didn't need the buttons and such
		switch (o) {
			case Titanium.UI.PORTRAIT:
				return 'portrait';
			case Titanium.UI.UPSIDE_PORTRAIT:
				return 'upside portrait';
			case Titanium.UI.LANDSCAPE_LEFT:
				return 'landscape left';
			case Titanium.UI.LANDSCAPE_RIGHT:
				return 'landscape right';
			case Titanium.UI.FACE_UP:
				return 'face up';
			case Titanium.UI.FACE_DOWN:
				return 'face down';
			case Titanium.UI.UNKNOWN:
				return 'unknown';
		}
	}
}
module.exports = tools;