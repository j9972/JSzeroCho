// var 로 만들어 놓고 const let으로 바꾸는 리팩토링

var imgspot = 0;
var rsp = {
    rock : '0',
    sis : '-142px',
    paper : '-284px'
}

function cpt(imgspot) {
    return Object.entries(rsp).find((v) => {
        return v[1] === imgspot;
    })[0];
}

var itv;
function itvm() {
    itv = setInterval(() => {
        if(imgspot === rsp.rock) {
            imgspot = rsp.sis;
        }else if (imgspot === rsp.sis) {
            imgspot = rsp.paper;
        }else if (imgspot === rsp.paper) {
            imgspot = rsp.rock; 
        }
        document.querySelector('#computer').style.background =
        'url(https://en.pimg.jp/023/182/267/1/23182267.jpg)' + imgspot + '0';
    }, 100);
}
itvm();

var score = {
    sis : 1,
    rock : 0,
    paper : -1
}

var res = document.querySelector('.resultBox');

var count = 0;
document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        clearInterval(itv);
        setTimeout(() => {
            itvm()
        }, 100);
        var myChoice = this.textContent;
        var myScore = score[myChoice];
        var cptScore = score[cpt(imgspot)];
        var scoregap = myScore - cptScore;
        if(scoregap === 0) {
            res.textContent ='비김';
            console.log('비김');
            count++;
        } else if(scoregap === socregap.includes[-2,1]) {
            res.textContent ='짐';
            console.log('짐');
            count++;
        } else if(scoregap === socregap.includes[-1,2]) {
            res.textContent ='이김';
            console.log('이김');
            count++;
        } else if(scoregap > 2 || scoregap < -2) {
            res.textContent ='에러';
            console.log('에러');
            count++;
        } else if(count > 3) {
            clearInterval(itv);
            res.textContent ='3번의 시도가 넘어서 종료 합니다';
            console.log('종료');
        }
    })
})