var numArr;
var numSub;

function choseNum() {
    numSub = [1,2,3,4,5,6,7,8,9];
    numArr = [];
    for (var i = 0; i < 4; i++) {
        var numByMe = numSub.splice(Math.floor(Math.random() * (9-i)), 1)[0]; // 여기 1이 있어서 뽑힌 숫자는 배열에서 지워진다는 의미
        numArr.push(numByMe);
    }
}
choseNum();
console.log(numArr);

var resultBox = document.getElementById('presentStatus');
var mainBox = document.getElementById('Box');
var my = document.getElementById('inputBox');

var wrongNum = 0;
mainBox.addEventListener('submit', function (e) {
    e.preventDefault();
    var ans = my.value;
    var ansArr = ans.split('');
    /* 중복되는 수의 개수를 찾기
    var count = 0;
    for(var i = 0; i < array.length; ++i){
        if(array[i] == 2) 2가 몇개인지 알아 보고 싶을때. -> 중복되는 숫자가 몇개인지 알고 싶을때
            count++;
    }
    */
    // ansArr.includes(ansArr[i]) => ansArr에서 중복되는거를 찾아줌 -> 개수로 연결 시키기
    var count = ansArr.length;
    for(var i = 0; i < count; i++) { // 내가 입력하는 숫자가 중복이 되면 엔터를 못치게 하기
        if(ansArr.includes(ansArr[i]) ) {
            resultBox.textContent = '중복되는 수를 작성했으므로 다시 쓰세요';
            e.preventDefault();
            my.focus();
            my.vaule = '';
        }
    }
    // 내가 쓴 답이 정답일경우
    // 문자.split(구분자) -> 배열
    // 배열.join(구분자) -> 문자
    if(ans === numArr.join('')) {
        resultBox.textContent ='홈런';
        my.focus();
        my.vaule = '';
        choseNum();
        wrongNum = 0;
    } else { // strike 랑 ball 나타내기
        ansArr;
        var strike = 0;
        var ball = 0;
        wrongNum++;
        console.log(wrongNum);
        if(wrongNum > 10) {
            resultBox.textContent = '10번 넘게 틀려서 정답은' + numArr.join(',') + '였습니다';
            my.focus();
            my.vaule = '';
            choseNum();
            wrongNum = 0;
        }else {
            for(var i = 0; i < 4; i++) {
                if(Number(ansArr[i]) === numArr[i]) {
                    strike++;
                } else if(numArr.indexOf(Number(ansArr[i])) > -1) {
                    ball++;
                }
            }
            resultBox.textContent = strike + '스트라이크' + ball + '볼입니다';
            my.focus();
            my.vaule = '';
        }
    }
});
