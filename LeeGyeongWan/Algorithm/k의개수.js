function solution(i, j, k) {
  var answer = "";
  let sum = [];
  let char = String(k);

  for (let a = i; a <= j; a++) {
    answer += a;
  }
  let arr = answer.split("");

  for (let b = 0; b < arr.length; b++) {
    if (arr[b].includes(char)) {
      sum.push(arr[b]);
    }
  }

  return sum.length;
}
