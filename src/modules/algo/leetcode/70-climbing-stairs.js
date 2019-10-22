// https://leetcode.com/explore/featured/card/recursion-i/255/recursion-memoization/1662/
/**
 * @param {number} n
 * @return {number}
 */
const climbStairs = function (n) {
  /**
   * if we difined the ways of N -> ways(N)
   * then:
   *    ways(N) = ways(N-1) + ways(N-2) 
   *    ways(1) = 1
   *    ways(2) = 2
   *    ways(3) = ways(1) + ways(2)
   */
  if (n === 1) return 1
  else if (n === 2) return 2
  let table = [1, 2]
  for (let i = 2; i < n; i++) {
    table[i] = table[i-1] + table[i-2]
  }
  return table[n-1]
}

// export default {
//   climbStairs
// }
module.exports = {
  climbStairs,
  inputs:[55]
}