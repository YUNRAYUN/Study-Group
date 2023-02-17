function solution(s) {
    let ans = [];
    
    let sArr = s.split("");
     
  console.log(sArr)
    sArr.forEach((item) => {
                 // console.log(s,item)
                 // console.log("index",s.indexOf(item))
                 // console.log("last",s.lastIndexOf(item))
        if(s.indexOf(item) === s.lastIndexOf(item)){
            ans.push(item);
        }
    })
    
    return ans.sort().join("");
}
