var sub = Array(45).fill().map((component, idx) => {
    return idx + 1;
})
// 여기 문제있음 랜덤으로 뽑히지가 않고 개수가 너무 많음
var shuffle = [];
for(var i = 0; i < sub.length; i++) {
    var moved = sub.splice(Math.floor(Math.random() * sub.length), 1)[0];
    shuffle.push(moved);
}
console.log(shuffle);

var bonus = shuffle[shuffle.length - 1];
var winNum = shuffle.slice(0,6).sort((r,p) => {
    return r - p;
})
console.log('보너스',bonus,'당첨번호',winNum);

const result = document.querySelector('#결과창');

function colorPoint(num, result) {
    var ball = document.createElement('div');
    ball.textContent = num;
    ball.className = 'ball';
    if(num <= 10) {
      ball.style.background = 'red';
    } else if(num <= 20) {
        ball.style.background = 'orange';
    } else if(num <= 30) {
        ball.style.background = 'yellow';
    } else if(num <= 40) {
        ball.style.background = 'blue';
    } else if(num <= 45) {
        ball.style.background = 'green';
    }
    result.appendChild(ball);
}

for(let i = 0; i < winNum.length; i++) {
    setTimeout(function call() {
        colorPoint(winNum[i], result);
    }, 1000 + i *1000);
}

setTimeout(() => {
    const cell = document.querySelector('.보너스');
    colorPoint(bonus,cell);
}, 7000);

/*

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

(function pick() {
    for(let i = 0; i < winNum.length; i++) {
        setTimeout((j) => {
            var cell = document.createElement('div');
            colorPoint(winNum[i], cell);
            console.log(cell);
            result.appendChild(cell);
        },(j * 1000))
    }
})

setTimeout(() => {
    colorPoint(winNum,bonus)
}, 7000)
*/