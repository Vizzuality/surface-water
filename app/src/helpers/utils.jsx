import 'whatwg-fetch';

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

/**
 * Fetch the ressource using the Fetch API and reject the promise in case the
 * timeout has been triggered. Return a promise.
 * @param  {String}  url     url to fetch
 * @param  {Number}  timeout time in ms
 * @return {Promise}
 */
export function fetchWithTimeout(url, timeout) {
  return new Promise((resolve, reject) => {
    fetch(url).then(resolve, reject);
    setTimeout(() => reject(new Error('timeout')), timeout);
  });
};

/**
 * Return the contact email used accross the website. The aim of the function is
 * to hide the real email address to the bots by decoding the ROT13-encoded
 * version of it.
 * @return {String} contact email
 */
export function generateContactEmail() {
  const contactEmail = 'qna@rnegutrabzr.bet';
  const decoder = str => {
    return str.replace(/[a-zA-Z]/g, c => {
      return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
    });
  };
  return decoder(contactEmail);
};
