(function () {
	var trigger = document.querySelector('#logo a');
	var modal = document.getElementById('travel-map');
	var closeButton = modal && modal.querySelector('.travel-map-close');
	var clickCount = 0;
	var clickTimer;

	if (!trigger || !modal || !closeButton) {
		return;
	}

	function openMap() {
		modal.hidden = false;
		document.body.classList.add('travel-map-open');
		closeButton.focus();
	}

	function closeMap() {
		modal.hidden = true;
		document.body.classList.remove('travel-map-open');
		trigger.focus();
	}

	trigger.addEventListener('click', function (event) {
		clickCount += 1;
		window.clearTimeout(clickTimer);

		if (clickCount === 5) {
			event.preventDefault();
			clickCount = 0;
			openMap();
			return;
		}

		clickTimer = window.setTimeout(function () {
			clickCount = 0;
		}, 1400);
	});

	closeButton.addEventListener('click', closeMap);

	modal.addEventListener('click', function (event) {
		if (event.target === modal) {
			closeMap();
		}
	});

	document.addEventListener('keydown', function (event) {
		if (event.key === 'Escape' && !modal.hidden) {
			closeMap();
		}
	});
}());
