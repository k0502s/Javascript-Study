var a = 1;
function outer() {
    console.log(a);
    
vunction inner() {
    console.log(a);
    var a = 3;
}    
    inner();
    
    console.log(a);
}
outer();
console.log(a);
