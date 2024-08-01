/**
 * @description Polyfill for Array class's flat method
 *
 */
Array.prototype.myflat = function () {
  const tempArr = [];
  for (let i = 0; i < this.length; i++) {
    if (Array.isArray(this[i])) {
      tempArr.push(...this[i].myflat());
    } else {
      tempArr.push(this[i]);
    }
  }
  return tempArr;
};

const inp = [0, 1, [2, [3, [4, 5]]]];

console.log(inp.myflat());
