function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
/**
 * 
 * Input: [1,7,0,7,-8,null,null]
 * Output: 2
 * Explanation:
 * Level 1 sum = 1.
 * Level 2 sum = 7 + 0 = 7.
 * Level 3 sum = 7 + -8 = -1.
 * So we return the level with the maximum sum which is level 2.} root
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxLevelSum = function (root) {
  let ret = []

  let recursion = function(cur_level, node) {
    if (node) {
      ret[cur_level] ? ret[cur_level] += node.val : ret[cur_level] = node.val;
      recursion(cur_level + 1, node.left);
      recursion(cur_level + 1, node.right);
    }
  }
  recursion(0, root);
  console.log(ret);
  return ret.reduce((max, v, vindex) => v > max[0] ? [v, vindex] : max, [0, 0])[1] + 1;
};
module.exports = {
  maxLevelSum,
  inputs: [
    { 
      val: 1, 
      left: { 
        val: 7, 
        left: {
          val: 1,
          left: null,
          right: null,
        },
        right: { 
          val: 3, 
          left: {
            val: 10,
            left: null,
            right: null
          }, 
          right: null  
        }
      },
      right: {
        val: 1, 
        left: {},
        right: { val: 1, left: null, right: null }
      }
    },
    { 
      val: 2, 
      left: { 
        val: 7, 
        left: {
          val: 1,
            left: { val: 1, left: null, right: null },
            right: { val: 1, left: null, right: null },
        },
        right: { 
          val: 3, 
          left: {
            val: 10,
            left: null,
            right: null
          }, 
          right: null  
        }
      },
      right: {
        val: 1, 
        left: {
          val: 1,
          left: { val: 1, left: null, right: null },
          right: { val: 1, left: null, right: null },
        },
        right: { val: 1, left: null, right: null }
      }
    }
  ]
}