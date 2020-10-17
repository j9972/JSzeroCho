// while(true) {
//     var num1 = Math.ceil(Math.random()*9);
//     var num2 = Math.ceil(Math.random()*9);
//     var result = num1 * num2;
//     var condition = true;
//     while(condition) {
//         var answer = prompt(String(num1) + '곱하기' + String(num2) + '는?');
//         if(result === Number(answer)) {
//             alert('딩동댕');
//             condition = false;
//         }else {
//             alert('떙');
//         }
//     }


var num1 = Math.ceil(Math.random()*9);
var num2 = Math.ceil(Math.random()*9);
var result = num1 * num2;

var word = document.getElementsByClassName('randomNum')
var Box1 = document.getElementsByClassName('actionBox');
var inputBox1 = document.getElementsByClassName('myAnswer');
var resultBox1 = document.getElementsByClassName('resultScreen');
//console.log(Box1);

word[0].textContent =String(num1) + '곱하기' + String(num2) + '는?';

Box1[0].addEventListener('submit', function (e) {
    e.preventDefault();
    if(result === Number(inputBox1[0].value)) {
        resultBox1[0].textContent = '정답입니다.';
        num1 = Math.ceil(Math.random()*9);
        num2 = Math.ceil(Math.random()*9);
        result = num1 * num2;
        word[0].textContent = String(num1) + '곱하기' + String(num2) + '는?';
        inputBox1[0].focus();
        inputBox1[0].value = '';
    } else {
        resultBox1[0].textContent = '오류입니다.';
        inputBox1[0].value = '';
        inputBox1[0].focus();
    }
});