var turn = 'X';
// var juls = [];
var juls = Array.from(document.querySelectorAll('.jul'));
var cans = [...Array.from(juls).map(item => Array.from(item.children))];
// js 파일 => 줄들 [tr, tr, tr] => 칸들 [[td, td, td], [td, td, td], [td, td, td]]
var tableId = document.querySelector('#tableBox');
var resultId = document.querySelector('#resultBox');

var callbackFunc = function(e) {
    if(turn === 'O') {
        return;
    }

    var idxjul = juls.indexOf(e.target.parentNode);
    var idxcan = cans[idxjul].indexOf(e.target);

    if(cans[idxjul][idxcan].textContent !== '') {
        console.log("빈칸이 아닙니다");
    } else {
        console.log("빈칸입니다");
        cans[idxjul][idxcan].textContent = turn;
        var result = CheckingTheResult(idxjul, idxcan);

        var subcan = [];
        cans.forEach((trClass) => {
            trClass.forEach((tdClass) => {
                subcan.push(tdClass);
            });
        });
        subcan = subcan.filter((tdClass) => {
            return !tdClass.textContent;
        });
        // win
        if(result) {
            reset(false);
        } 
        // 자리가 없어서 reset
        else if ( subcan.length === 0 ) {
            reset(true);
        } else {
            if(turn === 'X') {
                turn = 'O';
            }
            setTimeout(() => {
                console.log("컴퓨터의 턴입니다");
                var chosingCan = subcan[Math.floor(Math.random() * subcan.length)];
                chosingCan.textContent = turn;

                var idxjul = juls.indexOf(e.target.parentNode);
                var idxcan = cans[idxjul].indexOf(e.target);
                var result = CheckingTheResult(idxjul,idxcan);

                if(result) {
                    reset();
                }
                turn = 'X';
            },1000);
        }
    }
}


function CheckingTheResult(idxjul,idxcan) {
    var fulling = false;
    // 세로줄
    if(cans[0][idxcan].textContent==turn && cans[1][idxcan].textContent==turn && cans[2][idxcan].textContent==turn ) {
        fulling = true;
    }
    // 가로줄
    if(cans[idxjul][0].textContent==turn && cans[idxjul][1].textContent==turn && cans[idxjul][2].textContent==turn ) {
        fulling = true;
    }
    // 대각선
    if(cans[0][0].textContent == turn && cans[1][1].textContent == turn && cans[2][2].textContent == turn ) {
        fulling = true;
    }
    if(cans[0][2].textContent == turn && cans[1][1].textContent == turn && cans[0][2].textContent == turn ) {
        fulling = true;
    }
    return fulling;
}

function reset(samsam) {
    if(samsam) {
        resultanId.textContent = '무승부';
    } else {
        resultId.textContent = turn + '님이 승리';
    }
    turn = 'X';
    setTimeout(() => {
        resultId.textContent = '';
        cans.forEach((trClass) => {
            trClass.forEach((tdClass) => {
                tdClass.textContent = '';
            });
        });
        turn = 'X';
    },1000);
}

//*
document.querySelectorAll('.can').forEach((tc) => {
    tc.addEventListener('click', (e) => {
        callbackFunc(e);
    });
});
/*/
tdClass.addEventListener('click', callbackFunc);
//*/
