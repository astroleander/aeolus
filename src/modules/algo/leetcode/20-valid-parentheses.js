/**
 * @param {string} s
 * @return {boolean}
 */

/**
 * 
 * for each 符号 
 *          |- head 入栈
 *          |- tail 出栈
 *          |   |- tail 匹配 - 校验是否可以出栈 
 *          |       | * tail && 栈不为空
 *          |       |- √ 出栈
 *          |       |- x return flase
 *          |- 
 *  
 */
let isValid = function (s) {
  let stack = [];
  let c;
  for (let idx in s) {
    c = s[idx];
    if (c === '{' || c === '(' || c === '[') {
      console.log('push')
      stack.push(c)
    } else if (stack.length) {
      console.log('fired')
      if (c === ']' && stack[stack.length - 1] === '[') {
        console.log('pop', c, stack[stack.length - 1])
        stack.pop();
      } else if (c === '}' && stack[stack.length - 1] === '{') {
        console.log('pop', c, stack[stack.length - 1])
        stack.pop();
      } else if (c === ")" && stack[stack.length - 1] === '(') {
        console.log('pop', c, stack[stack.length - 1])
        stack.pop();
      } else {
        console.log(stack)
        return false
      }
    } else {
      return false
    }
  }
  console.log(stack);
  if (stack.length) return false;
  return true;
};

let test = '()'
console.log(isValid(test))