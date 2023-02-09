<p>정수 내림차순으로 배치하기</p>


function solution(n) {
let str = String(n).split("").sort((a,b)=> b-a).join("")

    return Number(str)

}

////
function solution(n) {
return Number(String(n).split("").sort((a,b)=> b-a).join(""))


