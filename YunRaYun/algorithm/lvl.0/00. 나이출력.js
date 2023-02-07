/* 
문제 설명
머쓱이는 40살인 선생님이 몇 년도에 태어났는지 궁금해졌습니다. 
나이 age가 주어질 때, 2022년을 기준 출생 연도를 return 하는 solution 함수를 완성해주세요.
*/

function solution(age) {
  const curYear = 2022;
  const bornYear = curYear - age + 1;
  return bornYear;
}
