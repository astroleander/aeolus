/**
 * @param {string[]} strs
 * @return {string}
 */
var minus = function(prefix, str) {
    let minus_prefix = ""
    for (let c = 0; c < prefix.length; c++) {
        if (prefix[c] !== str[c]) {
            return minus_prefix;
        }
        minus_prefix += prefix[c]
    }
    return minus_prefix
}
var longestCommonPrefix = function(strs) {
    if (!strs.length) return ""
    let prefix = strs[0]
    for (let idx = 1; idx < strs.length; idx++) {
        prefix = minus(prefix, strs[idx])
    }
    console.log(prefix)
    return prefix
};
longestCommonPrefix(["flower", "flow", "flight"])
longestCommonPrefix(["abcde", "flow", "flight"])
longestCommonPrefix(["abcde", "", ""])
longestCommonPrefix(["abcde"])
longestCommonPrefix([])
longestCommonPrefix(["abcde", "abcdd", "abcdwrihqwf", 'abcdaswqw'])