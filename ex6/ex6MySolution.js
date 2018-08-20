// function mult(x,y,z) {
// 	return x * y * z;
// }

function mult(product, num1, ...nums) {
  if (num1 === undefined) {
    return product;
  }

  if (product === 0 || num1 === 0) {
    return 0;
  }

  if (nums.length === 0) {
    return product * num1;
  }

  return product * mult(num1, ...nums);
}

console.log(mult(3, 4, 5)); // 60

console.log(mult(3, 4, 5, 6)); // Oops!
