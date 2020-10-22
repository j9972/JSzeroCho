var turn = 'X';
var juls = Array.from(document.querySelectorAll('.jul'));
var cans = [...Array.from(juls).map(item => Array.from(item.children))];
var taBox = document.querySelector('#tableBox');
var resBox = document.querySelector('#resultBox');

var call = function(e) {
    if(turn === 'O') {
        return;
    }
    var idxjul = juls.indexOf(e.target.parentNode);
    var idxcan = cans[idxjul].indexOf(e.target);
    cans[idxjul][idxcan].textContent = turn;
    
    if(cans[idxjul][idxcan].textContent !== '') {
        console.log('빈칸이 아닙니다.', cans[idxjul][idxcan].textContent, 'a');
        resBox.textContent ='빈칸이 아닙니다 다시 클릭하세요.';
    } else {
        console.log('빈칸입니다');
        var result = resultingCheck(idxjul, idxcan);
        var subCan = [];
        
        subCan = subCan.filter((v) => {
            return !v.textContent;
        })
        
        cans.forEach((trClass) => {
            trClass.forEach((tdClass) => {
                subCan.push(tdClass);
            })
        })
        //win
        if(result) {
            reset(false);
        }
        // 빈칸이 없음 -> 무승부
        if(subCan.length === 0) {
            reset(true);
        }
        else {
            if(turn === 'X') {
                turn = 'O';
            } 

            setTimeout(() => {
                var cptChosing = subCan[Math.floor(Math.random() * subCan.length)];
                cptChosing.textContent = turn;

                var idxjul = juls.indexOf(e.target.parentNode);
                var idxcan = cans[idxjul].indexOf(e.target);
                var result = resultingCheck(idxjul, idxcan);

                if(result) {
                    reset();
                }
                turn = 'X';
            }, 1000)
        }
    }
}


function resultingCheck(idxjul, idxcan) {
    var full = false;
    //세로
    if(cans[0][idxcan].textContent === turn && cans[1][idxcan].textContent === turn && cans[2][idxcan].textContent === turn) {
        full = true;
    }
    //가로
    else if (cans[idxjul][0].textContent === turn &&cans[idxjul][1].textContent === turn &&cans[idxjul][2].textContent === turn ) {
        full = true;
    }
    //대각
    else if (cans[0][2].textContent === turn && cans[1][1].textContent === turn && cans[2][0].textContent === turn) {
        full = true;
    }
    else if (cans[0][0].textContent === turn && cans[1][1].textContent === turn && cans[2][2].textContent === turn) {
        full = true;
    }
    return full;
}

function reset(sameResult) {
    if(sameResult) {
        resBox.textContent ='비겼습니다';
    } else {
        resBox.textContent = turn + '님이 승리하였습니다';
    }
    setTimeout(() => {
        resBox.textContent = '';
        cans.forEach((trClass) => {
            trClass.forEach((tdClass) => {
                tdClass.textContent = '';
            })
        })
        turn = 'X';
    },1000);
}

document.querySelectorAll('.can').forEach((tc) => {
    tc.addEventListener('click', (e) => {
        call(e);
    })
})