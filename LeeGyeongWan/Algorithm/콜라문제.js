function solution(a, b, n) {
  let answer = 0;

  // 빈병의 개수가 콜라를 받기위한 개수보다 크면 반복한다.
  while (n >= a) {
    // 빈병의 개수와 받기위한 개수의 나머지를 구한다.
    const remain = n % a;

    // 빈병의 개수와 받기위한 개수를 나눠주고
    // 빈병을 가져다 주면 마트에서 주는 개수를 곱한다.
    n = Math.floor(n / a) * b;

    // n은 새로 받아온 콜라의 개수가 되므로
    // answer에 더해준다.
    answer += n;

    // 미리 구해둔 나머지를 기존 빈병에 추가해
    // 다음 계산에 이용한다.
    n += remain;
  }

  return answer;
}
