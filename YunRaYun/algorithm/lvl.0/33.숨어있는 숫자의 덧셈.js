/*
문제 설명
문자열 my_string이 매개변수로 주어집니다.
 my_string안의 모든 자연수들의 합을 return하도록 solution 함수를 완성해주세요.
*/

function solution(my_string) {
  var string = my_string.split("");
  let result = 0;
  for (let i = 0; i < my_string.length; i++) {
    if (Number(string[i])) {
      result = result + Number(string[i]);
    }
  }

  return result;
}
