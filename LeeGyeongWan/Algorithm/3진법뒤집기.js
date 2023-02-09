<p>
3진법뒤집기
</p>

,,,
function solution(n) {
let answer =0

    let str3 =  n.toString(3).split("").reverse().join("")

    answer = parseInt( str3, 3)

    return answer;

}
,,,
