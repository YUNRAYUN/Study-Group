

function solution(balls, share) {
    var answer = 0;
    
    //n! 팩토리얼 구하는 공식  4! = 4*3*2*1   n! = n * (n-1) * (n-2)...* 1이 될때까지곱하는 
    
    //nCr = n! / ((n -r)! * r!)  //팩토리얼을 세개 해주어야함 그럼 밑에 코드를 3번 반족해줘야함 
    const n = balls
    const r = share
    
    let nP = 1
    for( let i = n;  i >= 1; i--){
        nP *= i
    }
    let nR = 1
    for( let i = n - r;  i >= 1; i--){
        nR *= i
    }
     let rP = 1
    for( let i = r ;  i >= 1; i--){
        rP *= i
    }
    answer = Math.floor(nP / (nR * rP))
    //  Math.floor 부분을 Math.round로 바꾸면 정답이 나옴 Math.floor로 했을때는 오버플로우 현상이 일어난거 같은데 
    return answer;
}



// //nCr = n! / ((n -r)! * r!)  //팩토리얼을 세개 해주어야함 그럼 밑에 코드를 3번 반족해줘야함  여기서 (n -r)!은  n!을 하다 보면 (n -r)!나와서 약분을 하면 
//nPr+1 / r! 순열 구하는공식으로 구할수 있다  그래서 팩토리얼 구하는 공식을 두개만 만들어서 해주면 된다 nPr+1만 구하는 코드만 짜면 될거같다 
// 4P2 = 4 * 3 , 5P4 = 5 * 4 * 3 * 2 r값에 들어가는 숫자의 갯수만큼만 팩토리얼을 구하는
function solution(balls, share) {
    var answer = 0;
    
    //n! 팩토리얼 구하는 공식  4! = 4*3*2*1   n! = n * (n-1) * (n-2)...* 1이 될때까지곱하는 
    
    //nCr = n! / ((n -r)! * r!)  //팩토리얼을 세개 해주어야함 그럼 밑에 코드를 3번 반족해줘야함 
    const n = balls
    const r = share
    
    let nP = 1
    for( let i = n;  i >= n - r +1; i--){
        nP *= i
    }
    // let nR = 1
    // for( let i = n - r;  i >= 1; i--){
    //     nR *= i
    // }
     let rP = 1
    for( let i = r ;  i >= 1; i--){
        rP *= i
    }
    answer = Math.floor(nP /   rP))
    //  Math.floor 부분을 Math.round로 바꾸면 정답이 나옴 Math.floor로 했을때는 오버플로우 현상이 일어난거 같은데 
    return answer;
}
