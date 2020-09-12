var 스크린 = document.querySelector('#screen');
// call stack을 피하기 위해서 scope를 이용해서 해결
// 비동기 함수는 callstack에 들어갔다가 함수가 호출되면 튀어 나간다는것 인지하기
var 시작시간;
var 끝시간;
var 기록 = [];
var 타임아웃;

//시간 측정 방법 1
// console.time('시간');


// 시간 측정 방법 2 -> new date보다 정밀한 시간 측정에서 좋다
// var 시작시간 = performance.now();

// 시간 측정 방법 3 -> 가장 많이 쓰는 방법
// var 시작시간 = new Date();

스크린.addEventListener('click', function() {
    // 방법 1 ) console.timeEnd('시간');
    // 방법 2 ) var 끝시간 = performance.now();
    if(스크린.classList.contains('waiting')) {   // 현재 대기 상태인지 파악
        스크린.classList.remove('waiting');
        스크린.classList.add('ready');
        스크린.textContent = '초록색이 되면 클릭하세요';
        타임아웃 = setTimeout(function() {
            시작시간 = new Date();
            스크린.click();
        }, Math.floor(Math.random() * 1000) +2000);
    } else if (스크린.classList.contains('ready')) { // 준비 상태
        if(!시작시간) { // 부정 클릭
            clearTimeout(타임아웃);
            스크린.classList.remove('ready');
            스크린.classList.add('waiting');
            스크린.textContent = '너무 성급해요';
        } else {
            스크린.classList.remove('ready');
            스크린.classList.add('now');
            스크린.textContent = '클릭하세요';
        }
    } else if (스크린.classList.contains('now')) { // 시작 상태
        끝시간 = new Date();
        console.log('반응속도', 끝시간 - 시작시간, 'ms');
        기록.push(끝시간 - 시작시간);
        시작시간 = null;
        끝시간 = null;
        스크린.classList.remove('now');
        스크린.classList.add('waiting');
        스크린.textContent = '클릭해서 시작하세요.';
    }
});