var imageSpot = 0;
var rsp = {
    rock : '0',
    sis : '-142px',
    paper : '-284px',
};

function cptPick(imageSpot) {
    return Object.entries(rsp).find((v) => {
        return v[1] === imageSpot;
    })[0];
}

var itv;
function itvMaker() {
    itv = setInterval(() => {
        if( imageSpot === rsp.rock ) {
            imageSpot = rsp.sis;
        } else if (imageSpot === rsp.sis) {
            imageSpot = rsp.paper;
        } else {
            imageSpot = rsp.rock;     
        }
        document.querySelector('#computer').style.background = 
        'url(https://en.pimg.jp/023/182/267/1/23182267.jpg)' + imageSpot + ' 0';
    }, 100);
}

itvMaker();

var score = {
    sis : 1,
    rock : 0,
    paper : -1,
}

var rsb = document.getElementsByClassName('resultBox');

var count = 0;
document.querySelectorAll('.btn').forEach( (btn) =>  {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        clearInterval(itv);
        setTimeout(() => {
            itvMaker();
        }, 1000);
        var myChoice = this.textContent;
        var myScore = score[myChoice];
        var cptScore = score[cptPick(imageSpot)];
        var scoreGap = myScore - cptScore;
        console.log(myChoice, myScore , cptScore , scoreGap);
        if (scoreGap === 0) {
            rsb[0].textContent = '비 - 김';
            console.log('비겼습니다');
            count++;
        }
        else if ([-2, 1].includes(scoreGap)){
            rsb[0].textContent = '짐';
            console.log('졌습니다 ㅠㅠ.');
            count++;
        }
        else if ([-1, 2].includes(scoreGap)) {
            rsb[0].textContent = '이 - 김';
            console.log('이겼습니다!!');
            count++;
        } else {
            rsb[0].textContent = 'error';
            console.log('뭔가 잘못됨');
        }
        if(count > 3) {
            clearInterval(itv);
            rsb[0].textContent = '종료됩니다';
            count = 0;
        }
    })
})

