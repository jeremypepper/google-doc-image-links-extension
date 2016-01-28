'use strict';
function run() {
	function ce(tag, html) {
		var el = document.createElement(tag);
		el.innerHTML = html;
		return el;
	}

	function isVisible(element) {
		if (element.style.display === "none") {
			return false;
		}
		if (element.parentNode && element.parentNode === document) {
			return isVisible(element.parentNode);
		} else {
			// made it to the root of the document and nothing is hidden, therefore visible
			return true;
		}
	}
	var handler = function (event) {
		var href, i;
		function createLink() {
			var a = ce('A');
			a.href = href;
			a.innerHTML = 'Image link';
			a.setAttribute('target', '_blank');
			a.id = 'imglink' + i;
			return a;
		}

		if (event.target.tagName === 'image') {
			href = event.target.getAttribute('xlink:href');
			var linksContainer = document.querySelectorAll('.kix-embedded-entity-links-container');

			for (i =0; i < linksContainer.length; i++ ) {
				var lastElement = linksContainer[i].children[linksContainer[i].children.length -1];
				if (!isVisible(lastElement)) {
					var borders = document.querySelectorAll(".docs-squarehandleselectionbox-border");
					for (i = 0; i < borders.length; i++) {
						var border = borders[i];
						var a = createLink();
						console.log(border.style.top + border.style.height);
						a.style.top = border.style.top + border.style.height;
						a.style.right = 0;
						border.parentNode.appendChild(a);
					}
				} else {
					if (lastElement.id.search('imglink') === 0) {
						lastElement.href = href;
					} else {
						linksContainer[i].appendChild(ce('span', ' | '));
						linksContainer[i].appendChild(createLink());
					}
				}
			}
		}
	};
	document.addEventListener('click', handler, false);

	var style = ce('STYLE', '.docs-squarehandleselectionbox-border{display:none}');
	document.getElementsByTagName('head')[0].appendChild(style);

	var enableRightClick = function (event) {
		if (event.target.id.search(/imglink/) === 0) {
			event.stopPropagation();
			return false;
		}
	};
	document.addEventListener('contextmenu', enableRightClick, true);
}

run();