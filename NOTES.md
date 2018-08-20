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

# 2. Argument

- Function with one argument is called **unary function**
- Function with two arguments is called **binary function**
- Function with three or more arguments is called **n-ary** function.
- In fp javascript, try to use unary and binary functions as much as possible.

## 2.1 some util functions

make unary or binary fn

```js
// unary wrapper
function unary(fn) {
  return function(arg) {
    return fn(arg);
  };
}

// binary wrapper
function binary(fn) {
  return function(arg1, arg2) {
    return fn(arg1, arg2);
  };
}
```

flip the arguments

```js
function flipArgs(fn) {
  return function flipped(arg1, arg2, ...args) {
    return fn(arg2, arg1, ...args);
  };
}
```

reversed all the arguments

```js
function reverseArgs(fn) {
  return function reversed(...args) {
    return fn(...args.reverse());
  };
}
```

spread all the arguments

```js
function spreadArgs(fn) {
  return function spreaded(argArr) {
    return fn(...argArr);
  };
}
```

## 2.2 Point Free Style

Point-free basically means, get rid of the function mapping, directly pass it.

```js
foo(function(arg) {
  // <- arg
  return bar(arg); // <- arg
  // we don't really need this mapping anymore
});

foo(bar); // point-free style
```

\*Any function that returns a true / false value is called **predicate** function.

```js
function isOdd(val) {
  return val % 2 === 1;
}

function isEven(val) {
  // <- point
  return !isOdd(val); // <- point
}
```

Not function: takes a predicate function as its input and return the opposite value of the function's return value

```js
function not(fn) {
  return function negated(...args) {
    return !fn(...args);
  };
}

var isEven = not(isOdd);
```

```js
function when(fn) {
  return function(predicateFn) {
    return function(...args) {
      if (predicateFn(...args)) {
        return fn(...args);
      }
    };
  };
}
```

3. Function Composition

Function composition can make the data flow more obvious and declearative, we can see exactly how the data flows from the start to the end, and see the path of the data flow.

```js
function sum(x, y) {
  return x + y;
}

function mult(x, y) {
  return x * y;
}

// (3 * 4) + 5
var x_y = mult(3, 4); // <- intermedian variable
sum(x_y, 5); // 17

function multAndSum(x, y, z) {
  return sum(mult(x, y), z);
}

multAndSum(3, 4, 5);
```

Extract the `pipe` pattern (a "machine" that makes "machines")

```js
function pipe2(fn1, fn2) {
  return function pipped(arg1, arg2, arg3) {
    return fn2(fn1(arg1, arg2), arg3);
  };
}

var multAndSum = pipe2(mult, sum);
```

## 3.1 Compose vs Pipe

- They do same thing, make one "machine" that consist of multiple small "machines"
- The data flows from the start to the end
- The only difference is the order of the input `function` are reversed

```js
// the execution direction is from right to left
foo(bar(baz(2)));

// right to left
compose(
  foo,
  bar,
  baz
)(2);

// left to right
pipe(
  baz,
  bar,
  foo
)(2);
```

## 3.2 ComposeRight example

```js
function composeRight(fn2, fn1) {
  return function comp(...args) {
    return fn2(fn1(...args));
  };
}
```

- This is only an example of **hard code** function that composes two functions
- Notice that the `comp` function and the `fn1` function can take up any number of arguments, but fn2 only takes one argument
- In fp, we always try to use unary as much as possible, and there are tricks such as `curry` and `unary` can convert n-ary function into unary.

# 4. Immutability

- The `const` keyword only gives a variable re-assignment immutability.

```js
var x = 1;
x = 2; // allowed

const x = 1;
x = 123; // not allowed

const z = [1, 2, 3];
z[0] = 1000; // still allowed
```

- What we really care is not this re-assignment immutability, it's the value re-immutability.

- If we pass the value by reference, and everyone can mutate the value, there is a big problem.

- `Object.freeze` is a quick way to achieve the value immutability, but it's shallow.

```js
var x = Object.freeze([1, 2, 3, [4, 5]]);

x[0] = 100; // not work
x[3][0] = 100; // allowed
```

- If we really need a deep immutable data structure, there are libraries such as `immutablejs` and `mori` to help us do that.

- When we create a function, don't mutate the input value because this will create side effects.

Bad:

```js
function doubleMutable(list) {
  for (var i = 0; i < list.length; i++) {
    list[i] = list[i] * 2;
  }
}

var list = [1, 2, 3];
doubleMutable(list); // return undefined
list; // [2, 4, 6]
```

Good:

```js
function doubleImmutable(list) {
  var newList = [];
  for (var i = 0; i < list.length; i++) {
    newList[i] = list[i] * 2;
  }
  return newList;
}

var list = [1, 2, 3];
doubleImmutable(list); // [2, 4, 6]
list; // [1, 2, 3]
```

# 5. Closure and Side Effect

Closure is when a function remembers the variables around it even the function is executed elsewhere.

```js
function unary(fn) {
  return function(arg) {
    return fn(arg);
  };
}
```

when calling `unary` with a function, it returns a function that remembers the `fn` and have the ability to access it.

## 5.1 Lazy and Egger

This code is lazy, because the addtion part only executed when we called total. This is good if we need to define multiple `foo`s and don't even know if the returned function will ever gets executed.

```js
function foo(x, y) {
  return function total() {
    return x + y;
  };
}
```

This code is egger, because the addtion part will executed when we return the `total` back. This is good if we need to call the same `total` multiple times.

```js
function foo2(x, y) {
  var sum = x + y;
  return function total() {
    return sum;
  };
}
```

We have a way to stand in the middle, when the `total` gets called first time, it will do the addtion part, but if we call it later, it will straight return the value that it remembered.

```js
function foo3(x, y) {
  var sum;
  return function total() {
    if (sum === undefined) {
      sum = x + y;
    }
    return sum;
  };
}
```

## 5.2 Referencial Transparency

This term means if we subtitute the function call with the value it produces, there should be no impact for the system. For example:

```js
var x = foo(3, 4);
x(); // 7
var y = 3 + x(); // is identical with y = 3 + 4
```

## 5.3 Generalized to specialized

```js
function add(x, y) {
  return x + y;
}

function partial(fn, ...firstArgs) {
  return function applied(...secondArgs) {
    return fn(...firstArgs, ...secondArgs);
  };
}

var addTo10 = partial(add, 10);
addTo10(3); // 13
```

The `add` function is a generalized function, it doesn't remember any specific values of the input. The `addTo10` is a specialized version of `add`.

Curring vs partial application:

- They both specializing a generalized function.
- Partial application take some of the arguments now and the rest of them later.
- Curring is giving multiple level of specializations where parital application only gives two levels of specialization. It is like collection the arguments bits by bits and returns the result after it has all the arguments.

# 6. Recursion

- Proper tail call enabled in es6, that enpowers recursion a lot.
- Use recursion when iteration / loop.
- More declearative than imperative.

Let's say we will iterate a list of numbers and calculate the sum, one way we can implement that is using the loop

```js
function sumIter(...nums) {
  var sum = 0;
  for (var i = 0; i < nums.length; i++) {
    sum += nums[i];
  }

  return sum;
}

sumIter(1, 4, 2, 5, 7, 2);
```

The alternative way by using recursion is like this:

```js
function sumRec(sum, ...nums) {
  // base condition:
  if (nums.length === 0) {
    return sum;
  }

  return sumRec(...nums);
}

sumIter(1, 4, 2, 5, 7, 2);
```

A more effecient recursion:

```js
function sumRec(sum, num, ...nums) {
  if (num === undefined) {
    return sum;
  }

  if (nums.length === 0) {
    return sum + num;
  }

  return sum + sumRec(num, ...nums);
}
```
