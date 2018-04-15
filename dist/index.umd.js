(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.shavette = factory());
}(this, (function () { 'use strict';

  function shave(target, maxHeight) {
    var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (!maxHeight) throw Error('maxHeight is required');
    var els = typeof target === 'string' ? document.querySelectorAll(target) : target;
    if (!els) return;

    var character = opts.character || '…';
    var classname = opts.classname || 'js-shave';
    var spaces = opts.spaces || true;
    var charHtml = '<span class="js-shave-char">' + character + '</span>';

    if (!('length' in els)) els = [els];
    for (var i = 0; i < els.length; i += 1) {
      var el = els[i];
      var styles = el.style;
      var span = el.querySelector('.' + classname);
      var textProp = el.textContent === undefined ? 'innerText' : 'textContent';

      // If element text has already been shaved
      if (span) {
        // Remove the ellipsis to recapture the original text
        el.removeChild(el.querySelector('.js-shave-char'));
        el[textProp] = el[textProp]; // nuke span, recombine text
      }

      var fullText = el[textProp];
      var words = spaces ? fullText : fullText.split(' ');

      // If 0 or 1 words, we're done
      if (words.length < 2) continue;

      // Temporarily remove any CSS height for text height calculation
      var heightStyle = styles.height;
      styles.height = 'auto';
      var maxHeightStyle = styles.maxHeight;
      styles.maxHeight = 'none';

      // If already short enough, we're done
      if (el.offsetHeight <= maxHeight) {
        styles.height = heightStyle;
        styles.maxHeight = maxHeightStyle;
        continue;
      }

      // Binary search for number of words which can fit in allotted height
      var max = words.length - 1;
      var min = 0;
      var pivot = void 0;
      while (min < max) {
        pivot = min + max + 1 >> 1; // eslint-disable-line no-bitwise
        el[textProp] = spaces ? words.slice(0, pivot) : words.slice(0, pivot).join(' ');
        el.insertAdjacentHTML('beforeend', charHtml);
        if (el.offsetHeight > maxHeight) max = spaces ? pivot - 2 : pivot - 1;else min = pivot;
      }

      el[textProp] = spaces ? words.slice(0, max) : words.slice(0, max).join(' ');
      el.insertAdjacentHTML('beforeend', charHtml);
      var diff = spaces ? words.slice(max) : words.slice(max).join(' ');

      el.insertAdjacentHTML('beforeend', '<span class="' + classname + '" style="display:none;">' + diff + '</span>');

      styles.height = heightStyle;
      styles.maxHeight = maxHeightStyle;
    }
  }

  function index (target) {
  	var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  	if (!target) {
  		throw new Error('`target` is required');
  	}

  	if (typeof target === 'string') {
  		target = document.querySelectorAll(target);
  	}

  	var maxLines = options.maxLines || 2;
  	var className = (options.classname || 'js-shave') + '-text';

  	var elements = target instanceof NodeList ? Array.prototype.slice.call(target) : [].concat(target);

  	elements.forEach(function (element) {
  		var textProp = element.textContent === undefined ? 'innerText' : 'textContent';
  		var shaveElement = element.querySelector('.' + className);

  		// Reset if we've been here before
  		if (shaveElement) {
  			var span = shaveElement.querySelector('.js-shave-char');

  			// Nuke the ellipsis
  			if (span) {
  				shaveElement.removeChild(span);
  			}

  			element[textProp] = element[textProp]; // eslint-disable-line no-self-assign
  		}

  		// Strip whitespace (textContent does not do whitespace normalization)
  		var spanText = element[textProp].replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();

  		var spanHtml = '<span class="' + className + '">' + spanText + '</span>';
  		element.innerHTML = spanHtml;

  		shaveElement = element.querySelector('.' + className);
  		var rects = shaveElement.getClientRects();

  		// Only shave if the text is long enough
  		if (rects.length > 1 && rects.length > maxLines) {
  			var rectHeight = rects[1].top - rects[0].top;
  			var maxHeight = rectHeight * maxLines;

  			if (maxHeight > 0) {
  				shave(shaveElement, maxHeight, options);
  			}
  		}
  	});

  	return elements;
  }

  return index;

})));
