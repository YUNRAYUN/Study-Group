function solution(n, arr1, arr2) {
  const answer = [];

  for (let i = 0; i < arr1.length; i++) {
    answer[i] = "";

    // 지도 1의 암호를 2진법으로 변환 후, n길이 만큼 앞에서부터 "0"으로 채운다
    const map1 = arr1[i].toString(2).padStart(n, "0");

    // 지도2의 암호를 2진법으로 변환 후, n길이 만큼 앞에서부터 "0"으로 채운다
    const map2 = arr2[i].toString(2).padStart(n, "0");

    for (let j = 0; j < map1.length; j++) {
      //둘중 하나라도 벽인 경우 전제지도 answer에도 벽이므로 # 넣어주고
      if (map1[j] === "1" || map2[j] === "1") {
        answer[i] += "#";
      } else {
        //아닐떄는 빈칸으로
        answer[i] += " ";
      }
    }
  }
  return answer;
}
