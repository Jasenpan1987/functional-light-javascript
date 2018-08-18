function foo(x) {
  y++;
  z = x * y;
}

var y = 5,
  z;

foo(20);
z; // 120

foo(25);
z; // 175

// 1. wrapper
function bar(x, y) {
  var z;
  foo(x);
  return [y, z];

  function foo(x) {
    y++;
    z = x * y;
  }
}

bar(20, 5); // [6, 120]

bar(25, 6); // [7, 175]

// 2. reset
function bar(curX, curY) {
  var [oriY, oriZ] = [y, z];
  y = curY;

  foo(curX);

  var [newY, newZ] = [y, z];
  [y, z] = [oriY, oriZ];
  return [newY, newZ];
}

bar(20, 5); // [6, 120]

bar(25, 6); // [7, 175]
