// var 로 만들어 놓고 const let으로 바꾸는 리팩토링

var imgSpot = 0;
var rsp = {
    rock : '0',
    sis : '-142px',
    paper : '-284px',
};

function cpt(imgSpot) {
    //Object.entries(객체) -> 객체를 배열로 바꿀 수 있다.
    return Object.entries(rsp).find((v) => {
        return v[1] === imgSpot;
        // v[1]에서 1인 이유는 rsp에서 좌표 idx가 1
    })[0];
}

var itv;
function itvMaker() {
    itv = setInterval(() => {
        if( imgSpot === rsp.rock ) {
            imgSpot = rsp.sis;
        } else if (imgSpot === rsp.sis) {
            imgSpot = rsp.paper;
        } else {
            imgSpot = rsp.rock;     
        }
        document.querySelector('#computer').style.background = 
        'url(https://en.pimg.jp/023/182/267/1/23182267.jpg)' + imgSpot + ' 0';
    }, 100);
}

itvMaker();

var score = {
    sis : 1,
    rock : 0,
    paper : -1,
}

var rsb = document.querySelector('.resultBox');

var count = 0;
document.querySelectorAll('.btn').forEach( (btn) =>  {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        clearInterval(itv); // 인터벌 중지
        setTimeout(() => {
            itvMaker();
        }, 1000);
        var myChoice = this.textContent;
        var myScore = score[myChoice];
        var cptScore = score[cpt(imgSpot)];
        var scoreGap = myScore - cptScore;
        console.log(myChoice, myScore , cptScore , scoreGap);
        if (scoreGap === 0) {
            rsb.textContent = '비 - 김';
            console.log('비겼습니다');
            count++;
        }
        else if ([-2, 1].includes(scoreGap)){
            rsb.textContent = '짐';
            console.log('졌습니다 ㅠㅠ.');
            count++;
        }
        else if ([-1, 2].includes(scoreGap)) {
            rsb.textContent = '이 - 김';
            console.log('이겼습니다!!');
            count++;
        } else {
            rsb.textContent = 'error';
            console.log('뭔가 잘못됨');
        }
        if(count > 3) {
            clearInterval(itv);
            rsb[0].textContent = '종료됩니다';
            count = 0;
        }
    })
})

