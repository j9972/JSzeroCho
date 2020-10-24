var turn = 'X';
var juls = Array.from(document.querySelectorAll('.jul'));
var cans = [...Array.from(juls).map(item => Array.from(item.children))];
var taBox = document.querySelector('#tableBox');
var resBox = document.querySelector('#resultBox');

// TODO: 오류해결
// 1. 컴퓨터 차례일때 내가 선택한 칸에서 O <-> X 가 된다 => subCan의 문제 (filter부분 tdClass였어야함, 위치 순서)
// 2. 한번씩 컴퓨터 차례인데 사라진다. ( 행동을 안함 ) => 1번 문제 해결하면서 됨.
// 2-1. 이유..? => 빈칸을 다시 부르는데 있어서 그 부분이랑 subCan을 필터하는부분의 위치때문
// 3. O의 승리를 부르지 않음 ( setTimeout 부분에 reset 인자를 false 두니까 해결 )

// 잘 된다.
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

var call = function(e) {
    if(turn === 'O') {
        return;
    }
    var idxjul = juls.indexOf(e.target.parentNode);
    var idxcan = cans[idxjul].indexOf(e.target);
    
    if(cans[idxjul][idxcan].textContent !== '') {
        console.log('빈칸이 아닙니다.', cans[idxjul][idxcan].textContent, 'a');
        resBox.textContent = '빈칸이 아닙니다 다시 클릭하세요.';
    } 
    else {
        console.log('빈칸입니다');
        cans[idxjul][idxcan].textContent = turn;

        var result = resultingCheck(idxjul, idxcan);
        var subCan = [];
        
        cans.forEach((trClass) => {
            trClass.forEach((tdClass) => {
                subCan.push(tdClass);
            })
        })
        subCan = subCan.filter((tdClass) => {
            return !tdClass.textContent
        });
        //win
        if(result) {
            reset(false);
        }
        // 빈칸이 없음 -> 무승부
        else if(subCan.length === 0) {
            reset(true);
        }
        else {
            if(turn === 'X') {
                turn = 'O';
            } 
            setTimeout(() => {
                console.log('컴퓨터의 차례입니다');
                var cptChosing = subCan[Math.floor(Math.random() * subCan.length)];
                cptChosing.textContent = turn;

                var idxjul = juls.indexOf(e.target.parentNode);
                var idxcan = cans[idxjul].indexOf(e.target);
                var result = resultingCheck(idxjul, idxcan);

                if(result) {
                    reset(false);
                }
                turn = 'X';
            }, 1000)
        }
    }
}


function reset(sameResult) {
    if(sameResult) {
        resBox.textContent ='비겼습니다';
    } else {
        resBox.textContent = turn + '님이 승리하였습니다';
    }
    setTimeout(() => {
        //resBox.textContent = '';
        cans.forEach((trClass) => {
            trClass.forEach((tdClass) => {
                tdClass.textContent = '';
            })
        });
        turn = 'X';
    },1000);
}

document.querySelectorAll('.can').forEach((tc) => {
    tc.addEventListener('click', (e) => {
        call(e);
    })
})