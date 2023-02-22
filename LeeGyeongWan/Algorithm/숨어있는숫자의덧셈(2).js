function solution(my_string) {
  let result = 0;

  for (let i = 0; i < my_string.length; i++) {
    let tmp = 0;

    while (!Number.isNaN(Number(my_string[i]))) {
      tmp += my_string[i];

      i++;
    }
    result += Number(tmp);
  }
  return result;
}
