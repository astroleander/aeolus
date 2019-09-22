/**
 * Given a sorted array, two integers k and x,
 * find the k closest elements to x in the array.
 * The result should also be sorted in ascending order.
 * If there is a tie, the smaller elements are always preferred.
 */
/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
const findMaxOneIndex = (ret, x) => {
  let max_one_idx = 0;
  for (let index = 0; index < ret.length; index++) {
    if ((ret[index] - x) * (ret[index] - x) > (ret[max_one_idx] - x) * (ret[max_one_idx] - x)) {
      max_one_idx = index
    }
  }
  return max_one_idx
}

var findClosestElements = function(arr, k, x) {
  const ret = Array(k).fill(Infinity)
  let max_idx = 0
  for (let index = 0; index < arr.length; index++) {
    max_idx = findMaxOneIndex(ret, x)
    if ((arr[index] - x) * (arr[index] - x) < (ret[max_idx] - x) * (ret[max_idx] - x)) {
      ret[max_idx] = arr[index]
    }
    // console.log(ret)
  }
  ret.forEach((e, idx) => e === Infinity ? ret[idx] = undefined:'')
  return ret.sort((a,b) => a-b)
};
// TODO： 以K的大小去构建一个最小堆，在数据变大的环境下明显是更好的选择


// findClosestElements([1, 2, 3, 4, 5], 4, 3);
let r;
r = findClosestElements([0,1,2,2,5,5,7,9,11,11,13,16,16,17,17,17,17,20,21,21,22,23,25,30,30,31,32,32,32,34,34,38,38,39,39,41,41,42,43,44,46,47,48,48,48,49,50,52,54,54,57,57,58,59,59,60,61,63,63,63,63,64,64,64,67,68,71,72,72,73,75,76,76,77,78,78,79,83,83,83,83,84,85,86,90,91,92,93,93,94,96,96,96,97,98,98,98,98,98,99]
  ,94
  ,47)
// r = findClosestElements([1, 2, 3, 4, 5, 6, 11, 13, 16, 18, -1, 20, -124, 213, 22, 213 , 12561, 76], 5, 22);
// r = findClosestElements([], 1, 2)
console.log(r)