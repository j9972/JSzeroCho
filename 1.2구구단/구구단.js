var n1 = Math.ceil(Math.random() * 9);
var n2 = Math.ceil(Math.random() * 9);
var result = n1 * n2;

const rn = document.querySelector('.randomNum');
const ab = document.querySelector('.actionBox');
const ma = document.querySelector('.myAnswer');
const rs = document.querySelector('.resultScreen');

rn.textContent = String(n1) + '곱하기' + String(n2) + '는?';

ab.addEventListener('submit', (e) => {
    e.preventDefault();
    if(result === Number(ma.value)) {
        rs.textContent = '정답입니다';
        n1 = Math.ceil(Math.random() * 9);
        n2 = Math.ceil(Math.random() * 9);
        result = n1 * n2;
        rn.textContent = String(n1) + '곱하기' + String(n2) + '는?';
        ma.focus();
        ma.value = '';
    }
    else {
        rs.textContent = '틀렸습니다. 다시 입력하세요';
        ma.focus();
        ma.value = '';
    }
})
