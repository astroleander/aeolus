/**
 * @param {string} s
 * @return {number}
 */
var getMapIndex = function(c) {
  switch(c) {
    case 'I':
      return 1;
    case 'V':
      return 5;
    case 'X':
      return 10;
    case 'L':
      return 50;
    case 'C':
      return 100;
    case 'D':
      return 500;
    case 'M':
      return 1000;
  }
}
var romanToInt = function(s) {
  let stack = [];
  let curNum, lastStackNum;
  let sum, ret = 0;
  for (let c = 0; c <=s.length; c++) {
    curNum = getMapIndex(s[c])
    lastStackNum = stack[stack.length- 1] || 0
    console.log(curNum, lastStackNum)
    // 若小于当前栈，代表本次数字群结束
    // 如 MCM = 1000 + 900
    if (!curNum || curNum < lastStackNum) {
      // clear stack
      for (let index = 0; index < stack.length; index++) {
        console.log(stack[index] !== stack[stack.length-1])
        if (index !== stack.length - 1 && stack[index] !== stack[stack.length-1]) {
          ret -= stack[index]
        } else {
          ret += stack[index]
        }
      }
      stack = []      
    } 
    if( curNum ) stack.push(curNum)
  }
  console.log(stack)
  console.log(ret)
  return ret
};
console.log('start')
romanToInt('III')
romanToInt('MCMXCIV')