(function () {
	function copyText(text) {
		if (navigator.clipboard && window.isSecureContext) {
			return navigator.clipboard.writeText(text);
		}

		var textArea = document.createElement('textarea');
		textArea.value = text;
		textArea.setAttribute('readonly', '');
		textArea.style.position = 'fixed';
		textArea.style.opacity = '0';
		document.body.appendChild(textArea);
		textArea.select();
		document.execCommand('copy');
		document.body.removeChild(textArea);
		return Promise.resolve();
	}

	document.querySelectorAll('[data-copy-target]').forEach(function (button) {
		button.addEventListener('click', function () {
			var target = document.querySelector(button.dataset.copyTarget);
			var label = button.querySelector('.copy-label');
			if (!target) {
				return;
			}

			copyText(target.textContent.trim()).then(function () {
				var originalLabel = label ? label.textContent : button.textContent;
				if (label) {
					label.textContent = 'Copied!';
				} else {
					button.textContent = 'Copied!';
				}
				window.setTimeout(function () {
					if (label) {
						label.textContent = originalLabel;
					} else {
						button.textContent = originalLabel;
					}
				}, 1600);
			});
		});
	});

	var sectionLinks = Array.prototype.slice.call(document.querySelectorAll('.topbar-links a[href^="#"]'));
	var linkedSections = sectionLinks.map(function (link) {
		return document.querySelector(link.getAttribute('href'));
	}).filter(Boolean);

	function updateActiveSection() {
		var currentSection = linkedSections[0];
		linkedSections.forEach(function (section) {
			if (section.getBoundingClientRect().top <= 130) {
				currentSection = section;
			}
		});

		sectionLinks.forEach(function (link) {
			var isActive = currentSection && link.getAttribute('href') === '#' + currentSection.id;
			link.classList.toggle('active', isActive);
			if (isActive) {
				link.setAttribute('aria-current', 'location');
			} else {
				link.removeAttribute('aria-current');
			}
		});
	}

	if (sectionLinks.length) {
		window.addEventListener('scroll', updateActiveSection, { passive: true });
		updateActiveSection();
	}
}());
