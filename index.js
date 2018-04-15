'use strict';
import shave from 'shave';

export default function (target, options = {}) {
	if (!target) {
		throw new Error('`target` is required');
	}

	if (typeof target === 'string') {
		target = document.querySelectorAll(target);
	}

	const maxLines = options.maxLines || 2;
	const className = `${options.classname || 'js-shave'}-text`;

	const elements = target instanceof NodeList ?
		Array.prototype.slice.call(target) :
		[...target];

	elements.forEach(element => {
		const textProp = element.textContent === undefined ? 'innerText' : 'textContent';
		let shaveElement = element.querySelector(`.${className}`);

		// Reset if we've been here before
		if (shaveElement) {
			const span = shaveElement.querySelector('.js-shave-char');

			// Nuke the ellipsis
			if (span) {
				shaveElement.removeChild(span);
			}

			element[textProp] = element[textProp]; // eslint-disable-line no-self-assign
		}

		// Strip whitespace (textContent does not do whitespace normalization)
		const spanText = element[textProp].replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();

		const spanHtml = `<span class="${className}">${spanText}</span>`;
		element.innerHTML = spanHtml;

		shaveElement = element.querySelector(`.${className}`);
		const rects = shaveElement.getClientRects();

		// Only shave if the text is long enough
		if (rects.length > 1 && rects.length > maxLines) {
			const rectHeight = rects[1].top - rects[0].top;
			const maxHeight = rectHeight * maxLines;

			if (maxHeight > 0) {
				shave(shaveElement, maxHeight, options);
			}
		}
	});

	return elements;
}
