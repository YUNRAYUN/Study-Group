// 틀린 풀이
function solution(number) {
  let answer = 0;
  let count = 0;
  for (let i = 0; i < number.length; i++) {
    if (number[i] < 0) answer -= number[i];
    answer += number[i];
    if (answer === 0) count++;
  }
  return count;
}

////////
function solution(number) {
  let answer = 0;
  for (let i = 0; i < number.length; i++) {
    for (let j = i + 1; j < number.length; j++) {
      for (let k = j + 1; k < number.length; k++) {
        if (number[i] + number[j] + number[k] === 0) answer++;
      }
    }
  }
  return answer;
}
