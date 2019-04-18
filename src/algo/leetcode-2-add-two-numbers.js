/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let head = l1
  let isAdded = 0

  while (l1 && l2) {
    l1.val = l1.val + l2.val + isAdded
    isAdded = 0
    if (l1.val >= 10) {
      isAdded = 1
      l1.val = l1.val - 10
    }

    if ((isAdded === 1 || l2.next) && !l1.next) {
      l1.next = new ListNode(0)
    }

    if (l1.next && !l2.next) {
      l2.next = new ListNode(0)
    }

    l1 = l1.next
    l2 = l2.next
  }
  return head
};