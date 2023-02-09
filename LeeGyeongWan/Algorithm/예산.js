//잘못된 풀이 아직
function solution(d, budget) {
  let answer = 0;
  for (let i = 0; i < d.length; i++) {
    for (let j = i + 1; j < d.length; j++) {
      for (let k = j + 1; k < d.length; k++) {
        console.log("i", d[i], "j", d[j], " k ", d[k]);
        if (d[i] + d[j] + d[k] < budget) answer++;
      }
    }
  }
  return answer;
}

////
function solution(d, budget) {
  //낮은 수부터 예산 금액에 빼줘야 지원할수 있는 부서를 최대로 구할수 있어서 sort로 오름차순으로 이후에
  //for문으로 지원예산금에 부서들의 예산금액을 빼주고 answer에 지원한 부서만큼의 카운트를 새기위해 1씩 더해주고 예산금액이 남은 부서예산금액보다 작아지면 지원할수 없기 때문에 반복문을 멈추어준다
  d.sort((a, b) => a - b);
  let answer = 0;
  for (let i = 0; i < d.length; i++) {
    if (d[i] > budget) break;
    console.log(d[i], budget);
    budget -= d[i];
    answer++;
  }
  return answer;
}
