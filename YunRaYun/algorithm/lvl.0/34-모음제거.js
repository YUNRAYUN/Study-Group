/*
문제 설명
영어에선 a, e, i, o, u 다섯 가지 알파벳을 모음으로 분류합니다. 
문자열 my_string이 매개변수로 주어질 때 모음을 제거한 문자열을 return하도록 solution 함수를 완성해주세요.
*/

function solution(my_string) {
  const str = "aeiou";

  let newString = my_string.split("");

  for (let i = 0; i < str.length; i++) {
    for (let j = 0; j < my_string.length; j++) {
      if (newString.includes(str[i])) {
        newString.splice(newString.indexOf(str[i]), 1);
      }
    }
  }

  return newString.join("");
}
