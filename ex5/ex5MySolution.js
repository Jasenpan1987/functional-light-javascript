// lazy
function foo(x, y) {
  return function total() {
    return x + y;
  };
}

// egger
function foo2(x, y) {
  var sum = x + y;
  return function total() {
    return sum;
  };
}

// lazy and egger
function foo3(x, y) {
  var sum;
  return function total() {
    if (sum === undefined) {
      sum = x + y;
    }
    return sum;
  };
}

var x = foo(3, 4);

x(); // 7
x(); // 7
