/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
var reverseBits = function(n) {
    let x = 1;
    let result = 0;
    let idx = 31;
    while (x < 4294967296) {
        console.log((n & x ? 1 : 0) * (2 >> idx))
        result += (n & x ? 1 : 0) * (2 >> idx);
        // x <<= 1;
        x *= 2;
        idx--;
    }
    return result;
};
console.log(reverseBits(2048))
module.exports = {
    reverseBits,
    inputs: [2048]
}