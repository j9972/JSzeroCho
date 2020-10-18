const ranBox = document.querySelector('.randomBox');
const foBox = document.querySelector('.Box');
const inBox = document.querySelector('.inputBox');
const resBox = document.querySelector('#resultBox');

var arr = [];

ranBox.textContent = '힘내자';

foBox.addEventListener('submit', (e) => {
    e.preventDefault();
    // TODO: 이미 적었던 답들은 중복으로 정답을 적을 수 없도록 하는것
    if(ranBox.textContent[ranBox.textContent.length - 1] === inBox.value[0]) {
        var found = arr.find(item => item === inBox.value);
        if(found) {
            resBox.textContent = '중복답안입니다.';
            inBox.focus();
            inBox.value = '';
        }
        else {
            ranBox.textContent = inBox.value;
            inBox.focus();
            inBox.value = '';
            resBox.textContent = '딩동댕';
            arr.push(ranBox.textContent);
            console.log(arr);
        }
    }
    else {
        resBox.textContent = '땡';
        inBox.focus();
        inBox.value = '';
    }
})