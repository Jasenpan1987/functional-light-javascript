// code here! :)
// Q1 Write two functions, each which return a fixed number (different from each other) when called.
function getNum1() {
  return 4;
}

function getNum2() {
  return 7;
}

// Write an add(..) function that takes two numbers and adds them and returns the result. Call add(..) with the results of your two functions from (1) and print the result to the console.
function add(a, b) {
  return a + b;
}

console.log(add(getNum1(), getNum2()));

// Write an add2(..) that takes two functions instead of two numbers, and it calls those two functions and then sends those values to add(..), just like you did in (2) above.
function add2(fn1, fn2) {
  return add(fn1(), fn2());
}

console.log(add2(getNum1, getNum2));

// 4. Replace your two functions from (1) with a single function that takes a value and returns a function back, where the returned function will return the value when it's called.
function getNum(val) {
  return function() {
    return val;
  };
}

// 5.Write an addn(..) that can take an array of 2 or more functions, and using only add2(..), adds them together. Try it with a loop. Try it without a loop (recursion). Try it with built-in array functional helpers (map/reduce).
function addn1(fnArr) {
  var result = 0;
  for (var i = 0; i < fnArr.length; i += 2) {
    if (typeof fnArr[i + 1] === "function") {
      result += add2(fnArr[i], fnArr[i + 1]);
    } else {
      result += add2(fnArr[i], getNum(0));
    }
  }
  return result;
}

function addn1b(fnArr) {
  let fns = [...fnArr];
  while (fns.length > 2) {
    let [fn0, fn1, ...others] = fns;
    fns = [
      function() {
        return add2(fn0, fn1);
      },
      ...others
    ];
  }
  return add2(...fns);
}

function addn2(fnArr) {
  var result = 0;
  return rec(...fnArr);
  function rec(fn1, fn2, ...fns) {
    if (fn1 === undefined) {
      return result;
    }

    if (fn2 === undefined) {
      return (result += add2(fn1, getNum(0)));
    }

    result += add2(fn1, fn2);
    return rec(...fns);
  }
}

function addn2b([fn0, fn1, ...fns]) {
  if (fns.length > 0) {
    return addn2b([
      function() {
        return add2(fn0, fn1);
      },
      ...fns
    ]);
  }
  return add2(fn0, fn1);
}

function addn3(fnArr) {
  return fnArr.reduce(function(total, fn) {
    return total + add2(fn, getNum(0));
  }, 0);
}

function addn3b(fns) {
  return fns.reduce(function(composedFn, fn) {
    return function() {
      return add2(composedFn, fn);
    };
  })();
}
// console.log(addn3([getNum(3), getNum(5), getNum(2), getNum(4)]));

// 6. Start with an array of odd and even numbers (with some duplicates), and trim it down to only have unique values.
function removeDuplicate(arr) {
  return arr.reduce(function(prev, num) {
    if (!prev.find(num)) {
      return [...prev, num];
    }
    return prev;
  }, []);

  return Object.keys(obj).map(Number);
}

console.log(removeDuplicate([4, 2, 1, 2, 4, 6]));

// 7.Filter your array to only have even numbers in it.
function withOnlyEven(arr) {
  return arr.filter(x => x % 2 === 0);
}
console.log(withOnlyEven([4, 2, 1, 2, 4, 6]));

// 8. Map your values to functions, using (4), and pass the new list of functions to the addn(..) from (5).
function getTotal(nums) {
  return addn1(nums.map(getNum));
}

console.log(getTotal([4, 2, 1, 2, 4, 6]));
