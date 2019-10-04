/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function(n) {
    let result = 0;
    let x = 1;
    for (let i = 0; i < 32; i++) {
        if (n & x) result ++;
        x *= 2;
    }
    return result
};
console.log(hammingWeight(1));