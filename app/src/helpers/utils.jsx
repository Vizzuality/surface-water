/**
 * Format a number as a percentage. Values under 1% are represented as "< 1%".
 * @param  {Number} nb number to format
 * @return {String}    percentage
 */
export function formatPercentage(nb) {
  if(nb === 0) return '0%';
  let res = Math.round(nb * 10000) / 100;
  return (res === 0 ? '< 0.01' : res) + '%';
};

/**
 * Debounce the passed function
 * Source: https://davidwalsh.name/function-debounce
 * @param  {function} func      function to Debounce
 * @param  {Number}   wait      interval without calls after which execute the
 *                              function
 * @param  {Boolean}  immediate if true, execute on the leading edge, otherwise
 *                              the trailing one
 */
export function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
