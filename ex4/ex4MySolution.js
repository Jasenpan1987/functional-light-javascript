function lotteryNum() {
  return (Math.round(Math.random() * 100) % 58) + 1;
}

function pickNumber(list) {
  function recur(list, newNumber) {
    if (list.includes(newNumber) || newNumber === undefined) {
      return recur(list, lotteryNum());
    }
    return newNumber;
  }

  return [...list, recur(list)].sort(function(x, y) {
    return x - y;
  });
}

let luckyLotteryNumbers = [];

for (var i = 0; i < 6; i++) {
  luckyLotteryNumbers = pickNumber(Object.freeze(luckyLotteryNumbers));
}

console.log(luckyLotteryNumbers);
