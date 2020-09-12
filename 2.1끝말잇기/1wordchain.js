var word = document.getElementsByClassName('randomBox');
var resultScreen = document.getElementById('resultBox');
var inputScreen = document.getElementsByClassName('inputBox');
var outline = document.getElementsByClassName('Box');

word[0].textContent = '제로초';

outline[0].addEventListener('submit', function(e) {
    e.preventDefault();
    if(word[0].textContent[word[0].textContent.length - 1] === inputScreen[0].value[0]) {
        resultScreen.textContent = '딩동댕';
        word[0].textContent = inputScreen[0].value;
        inputScreen[0].focus();
        inputScreen[0].value ='';
    }
    else {
        inputScreen[0].focus();
        inputScreen[0].value ='';
        resultScreen.textContent = '땡';
    }
})







