// utils start
function not(fn) {
  return function(...args) {
    return !fn(...args);
  };
}

function bindWithContext(fn, context) {
  return function(...args) {
    return fn.bind(context, ...args);
  };
}

function when(fn) {
  return function(predicateFn) {
    return function(...args) {
      if (predicateFn(...args)) {
        return fn(...args);
      }
    };
  };
}
// utils end

// function output(txt) {
//   console.log(txt);
// }

var output = bindWithContext(console.log, console);

// function printIf(predicate) {
//   return function(msg) {
//     if (predicate(msg)) {
//       output(msg);
//     }
//   };
// }

var printIf = when(output);

function isShortEnough(str) {
  return str.length <= 5;
}

// function isLongEnough(str) {
//   return !isShortEnough(str);
// }

var isLongEnough = not(isShortEnough);

var msg1 = "Hello";
var msg2 = msg1 + " World";

printIf(isShortEnough)(msg1); // Hello
printIf(isShortEnough)(msg2);
printIf(isLongEnough)(msg1);
printIf(isLongEnough)(msg2); // Hello World
