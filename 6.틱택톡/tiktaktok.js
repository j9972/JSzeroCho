var 바디 = document.body;
var 테이블 = document.createElement('테이블');
var 줄들 = [];
var 칸들 = [];
var 턴 = 'X';
var 결과 = document.createElement('div');

function 결과체크(몇줄, 몇칸) {
    // 세칸 다 채워짐?
    var 다참 = false;
    // 가로줄 검산
    if(칸들[몇줄][0].textContent === 턴 && 칸들[몇줄][1].textContent === 턴 && 칸들[몇줄][2].textContent === 턴 ) {
        다참 = true;
    }
    // 세로줄 검사
    if (칸들[0][몇칸].textContent === 턴 && 칸들[1][몇칸].textContent === 턴 && 칸들[2][몇칸].textContent) {
        다참 = true;
    } 
    // 대각선 검사
    if (
        칸들[0][0].textContent === 턴 && 칸들[1][1].textContent === 턴 && 칸들[2][2].textContent === 턴
    ) {
        다참 = true;
    }
    if (
        칸들[0][2].textContent === 턴 && 칸들[1][1].textContent === 턴 && 칸들[2][0].textContent === 턴
    ){
        다참 = true;
    }

    return 다참;
}

function 초기화(무승부) {
    if(무승부) {
        결과.textContent = '무승부';
    }else {
        결과.textContent = 턴+'님이 승리';
    }
    // 초기화
    턴 = 'X';
    setTimeout(function() {
        결과.textContent = ' '
        칸들.forEach(function (줄) { // forEach -> 배열에 대한 반복문 = 2차열 배열이 되는것이다.
            줄.forEach(function (칸) {
                칸.textContent = ''; //false인 값들
            });
        });
        턴 = 'X';
    }, 1000);
}

var 비동기콜백 = function(e) { //칸을 클릭 했을때
    if( 턴 === 'O') { //컴퓨터의 턴일때 내가 클릭하지 않도록
        return;
    }
    var 몇줄 = 줄들.indexOf(e.target.parentNode);
    var 몇칸 = 칸들[몇줄].indexOf(e.target);

    if (칸들[몇줄][몇칸].textContent !== '') { // 칸이 이미 채워져 있는가
        console.log('빈캅이 아닙니다');
    } else {
        console.log('빈칸입니다');
        칸들[몇줄][몇칸].textContent = 턴;
        var 승리여부 = 결과체크(몇줄, 몇칸);
        // 모든 칸이 다 찼는지 검사
        var 후보칸 = [];
        칸들.forEach(function (줄) {
            줄.forEach(function (칸) {
                후보칸.push(칸);
            });
        });
        후보칸 = 후보칸.filter(function (칸) {
            return !칸.textContent 
        }); //false인 값: false, 0, '',NaN, Null, undefined,false
        // 다 찼으면
        // === true이면 === 생략가능
        if(승리여부) {  // 이겼을 경우
            초기화(false);
        } else if (후보칸.length === 0) {
            초기화(true);
        } else { // 다 안차면
            if(턴 === 'X') {
                턴 = 'O';
            } 
            setTimeout(function() {
                // 빈 칸 중 하나를 고르기
                console.log('컴퓨터의 턴입니다.');
                
                var 선택칸 = 후보칸[Math.floor(Math.random() * 후보칸.length)]; //random으로 하나의 후보칸을 고른것
                선택칸.textContent = 턴;
                var 몇줄 = 줄들.indexOf(e.target.parentNode);
                var 몇칸 = 칸들[몇줄].indexOf(e.target);
                var 승리여부 = 결과체크(몇줄, 몇칸);
                // 다 찼으면
                if(승리여부) { // 컴퓨터가 이겼을 경우
                    초기화();
                }
                // 나한테 턴을 넘긴다
                턴 = 'X'
            }, 1000);
        }
    }
};

for(var i = 1; i <= 3; i++) {
    var 줄 = document.createElement('tr');
    줄들.push(줄);
    칸들.push([]);
    for ( var j = 1; j <= 3; j++) {
        var 칸 = document.createElement('td');
        칸.addEventListener('click', 비동기콜백);
        칸들[i-1].push(칸);
        줄.appendChild(칸);
    }
    테이블.appendChild(줄);
}
바디.appendChild(테이블);
바디.appendChild(결과);





// var turn = 'X';
// // var juls = [];
// var juls = Array.from(document.querySelectorAll('.jul'));
// ex) Array.from('foo') ->  Array ["f" , "o", "o"]
// var cans = [...Array.from(juls).map(item => Array.from(item.children))];
// // js 파일 => 줄들 [tr, tr, tr] => 칸들 [[td, td, td], [td, td, td], [td, td, td]]
// var tableId = document.querySelector('#tableBox');
// var resultId = document.querySelector('#resultBox');

// var callbackFunc = function(e) {
//     if(turn === 'O') {
//         return;
//     }

//     var idxjul = juls.indexOf(e.target.parentNode);
//     var idxcan = cans[idxjul].indexOf(e.target);

//     if(cans[idxjul][idxcan].textContent !== '') {
//         console.log("빈칸이 아닙니다");
//     } else {
//         console.log("빈칸입니다");
//         cans[idxjul][idxcan].textContent = turn;
//         var result = CheckingTheResult(idxjul, idxcan);

//         var subcan = [];
//         cans.forEach((trClass) => {
//             trClass.forEach((tdClass) => {
//                 subcan.push(tdClass);
//             });
//         });
//         subcan = subcan.filter((tdClass) => {
//             return !tdClass.textContent;
//         });
//         // win
//         if(result) {
//             reset(false);
//         } 
//         // 자리가 없어서 reset
//         else if ( subcan.length === 0 ) {
//             reset(true);
//         } else {
//             if(turn === 'X') {
//                 turn = 'O';
//             }
//             setTimeout(() => {
//                 console.log("컴퓨터의 턴입니다");
//                 var chosingCan = subcan[Math.floor(Math.random() * subcan.length)];
//                 chosingCan.textContent = turn;

//                 var idxjul = juls.indexOf(e.target.parentNode);
//                 var idxcan = cans[idxjul].indexOf(e.target);
//                 var result = CheckingTheResult(idxjul,idxcan);

//                 if(result) {
//                     reset();
//                 }
//                 turn = 'X';
//             },1000);
//         }
//     }
// }


// function CheckingTheResult(idxjul,idxcan) {
//     var fulling = false;
//     // 세로줄
//     if(cans[0][idxcan].textContent==turn && cans[1][idxcan].textContent==turn && cans[2][idxcan].textContent==turn ) {
//         fulling = true;
//     }
//     // 가로줄
//     if(cans[idxjul][0].textContent==turn && cans[idxjul][1].textContent==turn && cans[idxjul][2].textContent==turn ) {
//         fulling = true;
//     }
//     // 대각선
//     if(cans[0][0].textContent == turn && cans[1][1].textContent == turn && cans[2][2].textContent == turn ) {
//         fulling = true;
//     }
//     if(cans[0][2].textContent == turn && cans[1][1].textContent == turn && cans[0][2].textContent == turn ) {
//         fulling = true;
//     }
//     return fulling;
// }

// function reset(samsam) {
//     if(samsam) {
//         resultId.textContent = '무승부';
//     } else {
//         resultId.textContent = turn + '님이 승리';
//     }
//     turn = 'X';
//     setTimeout(() => {
//         resultId.textContent = '';
//         cans.forEach((trClass) => {
//             trClass.forEach((tdClass) => {
//                 tdClass.textContent = '';
//             });
//         });
//         turn = 'X';
//     },1000);
// }

// //*
// document.querySelectorAll('.can').forEach((tc) => {
//     tc.addEventListener('click', (e) => {
//         callbackFunc(e);
//     });
// });
// /*/
// tdClass.addEventListener('click', callbackFunc);
// //*/

