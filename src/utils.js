 

export function arrayFlat(arr = []) {
  //there is already a flat method in javascript
 return arr.flat()
}
export function arrayFilter(arr, callback) {
  return Array.prototype.filter.call(arr, callback);
}
export function arrayUnique(arr) {
  const uniqueArray = [];
  for (let i = 0; i < arr.length; i += 1) {
    if (uniqueArray.indexOf(arr[i]) === -1) uniqueArray.push(arr[i]);
  }
  return uniqueArray;
}
export function toCamelCase(string) {
  return string
    .toLowerCase()
    .replace(/-(.)/g, (match, group) => group.toUpperCase());
}
