var trailingZeroes = function(n) {
    let result = 0;
    while (n !== 0) {
        result += ~~(n / 5);
        n /= 5;
    }
    return result
}
console.log(trailingZeroes(625));