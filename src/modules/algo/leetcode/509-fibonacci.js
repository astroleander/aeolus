/**
 * @param {number} N
 * @return {number}
 */
const fib_table = function (N) {
  const table = [0, 1]
  if (N === 0) return 0 
  else if (N === 1) return 1 
  for (let i = 2; i <= N; i++) {
    table[i] = table[i-1] + table[i-2]
  }
  return table[N]
}

module.exports = {
  fib_table,
  inputs: [4]
}