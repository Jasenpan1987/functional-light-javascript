# 1. Pure functions

- Pure function is a function that takes an input and returns an output.
- Every time we call a pure function, it should always give us the exact same result.
- Side effects are bad for read and reason our code, so avoid it as much as we can.
- There is no way that we can remove all of our side effects from the code.
- We should centralize or encapsulte all the side effect togather and when there is a bug, this place is where we should look at first.

## 1.1 Purify a impure function

```js
// bad impure function
function f() {
  y = 2 * Math.pow(x, 2) + 3; // ref variables outside f

  // has no return value
}
```

To purify it, there are two techniques:

- 1. wrap it inside a pure function and give it an isolated context.

```js
function F(x) {
  var y;
  f();
  return y;
  function f() {
    y = 2 * Math.pow(x, 2) + 3;
  }
}
```

- 2. Use the reset technique if we can't wrap it.

```js
function f() {
  y = 2 * Math.pow(x, 2) + 3;
}

function F(currentX) {
  var [oriX, oriY] = [x, y];
  x = currentX;
  f();
  var newY = y;
  [x, y] = [oriX, oriY];
  return newY;
}

var x, y;
F(3); // 21

F(5); // 53
```

Each call should be isolated, `F(3)` should be have nothing to do with `F(5)`.
