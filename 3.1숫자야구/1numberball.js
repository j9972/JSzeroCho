var numArr;
var numSub;

function choseNUM() {
    numSub = [1,2,3,4,5,6,7,8,9];
    numArr = [];
    for(var i=0;i<4;i++) {
        var MovingNum = numSub.splice(Math.floor(Math.random() * (9-i)), 1)[0];
        numArr.push(MovingNum);
    }
}

choseNUM();
console.log(numArr);

var resultBox = document.getElementById('presentStatus');
var mainBox = document.getElementById('Box');
var my = document.getElementById('inputBox');

var wrongTry = 0;
mainBox.addEventListener('submit' , (e) => {
    e.preventDefault();
    var ans = my.value;
    // 한번에 맞힌 경우
    if(ans == numArr.join('')) {
        resultBox.textContent = '홈런';
        my.focus();
        my.value = '';
        choseNUM();
        wrongTry = 0;
    }
    // 틀린경우
    else {
        var ansArr = ans.split('');
        var strike = 0;
        var ball = 0;
        wrongTry++;
        // 10번 안에 못맞춘 경우
        if( wrongTry > 10) {
            resultBox.textContent = '10번 안에 못 맞췄습니다. 정답은 ' + numArr.join(',') + '입니다.';
            my.focus();
            my.value = '';
            choseNUM();
            wrongTry = 0;
        }
        else {
            for(var i = 0; i < 4; i++) {
                //strike
                if(Number(ansArr[i]) === numArr[i]) {
                    strike++;
                }
                else if(numArr.indexOf(Number(ansArr[i])) > -1 ) {
                    ball++;
                }
            }
            resultBox.textContent = strike + '스트라이크' + ball + '볼입니다';
            my.focus();
            my.value = '';
        }
    }
})