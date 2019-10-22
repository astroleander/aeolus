/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

var mergeTwoLists = function (l1, l2) {
  let head = new ListNode('head')
  let cur = head

  while (l1 && l2) {
    if (l1.val < l2.val) {
      cur.next = l1
      l1 = l1.next
    } else {
      cur.next = l2
      l2 = l2.next
    }
    cur = cur.next
  }

  while (l1) {
    cur.next = l1
    l1 = l1.next
    cur = cur.next
  }

  while (l2) {
    cur.next = l2
    l2 = l2.next
    cur = cur.next
  }

  return head.next
};

module.exports = {
  mergeTwoLists,
  inputs: [
    { val: 1, next: {val: 5, next: {val: 66, next: null}}},
    { val: 2, next: {val: 4, next: {val: 71, next: null}}}
  ]
}