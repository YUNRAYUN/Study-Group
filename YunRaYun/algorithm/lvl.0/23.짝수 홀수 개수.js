/*
문제 설명
정수가 담긴 리스트 num_list가 주어질 때, 
num_list의 원소 중 짝수와 홀수의 개수를 담은 배열을 return 하도록 solution 함수를 완성해보세요.
*/

function solution(num_list) {
  var answer = [];
  var even = [];
  for (let i = 0; i < num_list.length; i++) {
    if (num_list[i] % 2 === 0) {
      even.push(i);
    }
    answer = [even.length, num_list.length - even.length];
  }
  return answer;
}
