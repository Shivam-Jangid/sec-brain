export function randomVal(len:number){
    const str = "cdjbckfdsfioh73947fbne@";
    const length = str.length;
    let ans = ""
    for(let i=0; i<length; i++){
        ans = ans + str[Math.floor((Math.random()*length))];
    }
return ans;
}