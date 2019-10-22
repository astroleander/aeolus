/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
  let result = 0; 
  let ng = false;
  if (x < 0) { 
      x = Math.abs(x); 
      ng = true; 
    }
  while (x !== 0) {
    result = result * 10 + x % 10;
    x = Math.floor(x / 10);
  }
  return ng ? 
    -result < -2147483648? 0: -result :
    result > 2147483647? 0: result
};
console.log(reverse(-321));
module.exports = {
  reverse,
  inputs: [-400]
}
