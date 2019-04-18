/**
 * 
 * 这道题的核心在于你在写js的时候和在写C++的时候并不一样，
 * js的节点操作会带着其子节点一起挪动，尽管变量时指向一个对象，
 * 但是其并非指针
 */
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
  const head = new ListNode('head')
  let cur = head

  while (l1 && l2) {
    if (l1.val < l2.val) {
      cur.next = l1;
      l1 = l1.next
    } else {
      cur.next = l2;
      l2 = l2.next
    }
  }

  while(l1) {
    cur.next = l1
    l1 = l1.next
  }

  while(l2) {
    cur.next = l2
    l2 = l2.next
  }
};