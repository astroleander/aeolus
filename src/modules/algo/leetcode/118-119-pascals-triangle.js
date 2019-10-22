function table(numRows) {
    if (numRows < 1) return [];
    const array = [[1]];
    for (let row = 0; row < numRows; row++) {
      array.push([]);
      for (let idx = 0; idx < row + 1; idx++) {
        if (row === 0) continue;
        array[row].push( 
          (array[row - 1] && array[row - 1][idx - 1] || 0) +
          (array[row - 1] && array[row - 1][idx] || 0)
        )
      }
    }
    array.pop()
    return [array[array.length - 1], [].concat(...array).length]
  }
  
/**
 * 其实上面那个也是 dp, 这里只是按照题目[119]要求优化至 O(n) 的空间复杂度
 * https://leetcode.com/explore/featured/card/recursion-i/251/scenario-i-recurrence-relation/1660/
 */
function dp(numRows) {
  if (numRows < 1) return [];
  let array = [1];
  let newarr
  // i 标记了当前行
  for(let i = 0; i < numRows + 1; i++) {
    // 每一行的第一个数必然是 1
    newarr = [1]
    // 第 i 行有 i 个数
    for (let j = 1; j < i; j++) {
      // 对新的一行求和
      newarr[j] = (array[j-1] || 0) + (array[j] || 0)
    }
    // 只保留当前行, 舍弃旧的结果
    array = newarr
  }
  // 第二个参数也是一个小 dp,  当前结果长度 = 新的这行的长度 + 以前的长度,  累计计算出总的杨辉三角大小
  return [array, newarr.length + array.length]
}

module.exports = {
  dp,
  table,
  inputs: [20]
}