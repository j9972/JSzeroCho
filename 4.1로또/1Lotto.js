var subNum = Array(45).fill().map((component, idx) => {
    return idx + 1;
});

var suffle = [];
while(subNum.length > 0) {
    var movingNum = subNum.splice(Math.floor(Math.random() * subNum.length), 1)[0];
    suffle.push(movingNum);
}
console.log(suffle);

var bonus = suffle[suffle.length - 1];
var winNum = suffle.slice(0,6).sort((r,p) => {
    return r - p;
});

var resultBox = document.querySelector('#결과창');

// 빨 주 노 파 초
function colorPrint(num , resultBox) {
    var ball = document.createElement('div');
    ball.textContent = num;
    ball.className = 'ball';
    if(num <= 10) {
        ball.style.background = 'red';
    } else if( num <= 20 ) {
        ball.style.background = 'orange';
    } else if( num <= 30 ) {
        ball.style.background = 'yellow';
    } else if( num <= 40 ) {
        ball.style.background = 'blue';
    } else if( num <= 45 ) {
        ball.style.background = 'green';
    }
    resultBox.appendChild(ball);
}

for(var i = 0; i < winNum.length; i++) {
    (function closer(j) {
        setTimeout(() => {
            colorPrint(winNum[j], resultBox);
        }, (j + 1) * 1000);
    }) (i);
}

setTimeout( () => {
    var cell = document.querySelector('.보너스');
    colorPrint(bonus, cell);
}, 7000);