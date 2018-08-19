function reverseArgs(fn) {
  return function reversed(...args) {
    return fn(...args.reverse());
  };
}

function increment(x) {
  return x + 1;
}
function decrement(x) {
  return x - 1;
}
function double(x) {
  return x * 2;
}
function half(x) {
  return x / 2;
}

// function compose(...fns) {
//   return pipe(...fns.reverse());
// }

function pipe(...fns) {
  return function comp(...args) {
    var [fn1, ...restFn] = fns;

    return restFn.reduce(function(prev, curFn) {
      return curFn(prev);
    }, fn1(...args));
  };
}

var compose = reverseArgs(pipe);

var f = compose(
  decrement,
  double,
  increment,
  half
);
var p = pipe(
  half,
  increment,
  double,
  decrement
);

f(3) === 4;
// true

f(3) === p(3);
// true
