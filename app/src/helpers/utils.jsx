/**
 * Format a number as a percentage. Values under 1% are represented as "< 1%".
 * @param  {Number} nb number to format
 * @return {String}    percentage
 */
export function formatPercentage(nb) {
  if(nb === 0) return '0%';
  let res = Math.round(nb * 100);
  return (res === 0 ? '< 1' : res) + '%';
};
