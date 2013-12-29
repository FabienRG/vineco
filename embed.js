if (!window.VINE_EMBEDS) {
	window.VINE_EMBEDS = true;
	window.VINE_DEBUG = [];

	function hasClass(element, className) {
		return element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
	}

	function addClass(element, className) {
		if (!this.hasClass(element, className)) element.className += " " + className;
	}

	function removeClass(element, className) {
		if (hasClass(element, className)) {
	    	var regex = new RegExp('(\\s|^)' + className + '(\\s|$)');
			element.className = element.className.replace(regex, ' ');
		}
	}

	window.setInterval(function () {
		var embeds = document.querySelectorAll('iframe[src*="vine.co"]');
		for (var i = 0; i < embeds.length; i++) {

			if (hasClass(embeds[i], 'loaded')) {

				var topPosition = embeds[i].getBoundingClientRect().top;
				if (topPosition > -300 && topPosition < document.documentElement.clientHeight) {
					if (!hasClass(embeds[i], 'playing')) {
						window.VINE_DEBUG.push(embeds[i].src + ' entered screen');
						addClass(embeds[i], 'playing');
						embeds[i].contentWindow.postMessage('pause', '*');
					}
				} else {
					if (hasClass(embeds[i], 'playing')) {
						removeClass(embeds[i], 'playing');
						embeds[i].contentWindow.postMessage('play', '*');
					}
				}
			}

		}
	}, 100);

