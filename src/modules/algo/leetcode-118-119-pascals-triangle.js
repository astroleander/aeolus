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
    for(let i = 0; i < numRows + 1; i++) {
      // 第 i 行有 i 个数
      newarr = [1]
      for (let j = 1; j < i; j++) {
        newarr[j] = (array[j-1] || 0) + (array[j] || 0)
      }
      array = newarr
    }
    return [array, newarr.length + array.length]
  }

  export {
    dp, table
  }