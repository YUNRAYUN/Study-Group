//틀린풀이
function solution(sizes) {
  var answer = 0;

  for (let i = 0; i < sizes.length; i++) {
    //console.log(sizes[i] , i)
    for (let j = i; j < i; j++) {
      console.log(sizes[i][j], j);
    }
  }
  return answer;
}

/////

function solution(sizes) {
  let answer = 0;
  let w = [];
  let h = [];
  sizes.map((ele, idx) => {
    ele.sort((a, b) => b - a);
    ele.map((ele2, idx2) => {
      if (idx2 === 0) w.push(ele2);
      if (idx2 === 1) h.push(ele2);
    });
  });
  answer = Math.max(...w) * Math.max(...h);
  return answer;
}
