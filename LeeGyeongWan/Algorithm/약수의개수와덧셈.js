<p>약수의 개수와 덧셈</p>;

function solution(left, right) {
  let answer = 0;
  let count = 0;
  for (let i = left; i <= right; i++) {
    answer = 0;
    for (let j = 1; j <= right; j++) {
      if (i % j === 0) answer++;
    }

    if (answer % 2 === 0) {
      count += i;
    } else {
      count -= i;
    }
  }
  return count;
}
