/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) return [i, j]
    }
  }
  return 'not found'
};

var inputs = [[2, 7, 11, 15], 9]
module.exports = { twoSum, inputs }

console.log('[1][sample]');
console.log(`twoSum([2, 7, 11, 15], 9)`);
console.log('result:', twoSum([2,7,11,15], 9));