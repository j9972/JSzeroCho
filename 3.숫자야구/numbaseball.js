var 바디 = document.body;
var 숫자후보;
var 숫자배열;

function 숫자뽑기() {
    숫자후보 = [1,2,3,4,5,6,7,8,9];
    숫자배열 = [];
    for(var i = 0; i < 4; i++) {
        var 뽑은것 = 숫자후보.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        숫자배열.push(뽑은것);
        //splice 특성상 배열을 넣어줘야 한다 [0] 이거 안붙으면 배열로 출력됨.
        //[0]은 배열의 첫번째 것부터 시작을 해서 뽑는다는 것을 의미하는것이다.
        //push 때문에 문자가 하나 뽑히고 나면 그 수는 사라진다.
        //floor은 내림함수
    }
}

숫자뽑기();
console.log(숫자배열);

var 결과 = document.createElement('h1');
바디.append(결과);
var 폼 = document.createElement('form');
document.body.append(폼);
var 입력창 = document.createElement('input');
폼.append(입력창);
입력창.type = 'text';
입력창.maxLength = 4;
var 버튼 = document.createElement('button');
버튼.textContent = '입력!';
폼.append(버튼);

var 틀린횟수 = 0;
폼.addEventListener('submit', function 비동기(e) { //엔터 치면 실행
    e.preventDefault(); // 새로고침 안되게 하는 것 이거 없으면 새로고침 계속함
    var 답 = 입력창.value;
    if (답 === 숫자배열.join('')) { 
        // 문자.split(구분자) -> 배열
        // 배열.join(구분자) -> 문자
        결과.textContent = '홈런';   
        입력창.value = '';
        입력창.focus();
        숫자뽑기();
        틀린횟수 = 0;
    } else { // 답이 틀리면
        var 답배열 = 답.split('');
        var 스트라이크 = 0;
        var 볼 = 0;
        틀린횟수++;
        if (틀린횟수 > 10) {
            결과.textContent = '10번 넘게 틀려서 실패! 답은' + 숫자배열.join(',') + '였습니다.';
            입력창.value = '';
            입력창.focus();
            숫자뽑기();
            틀린횟수 = 0;
        } else { 
            for(var i = 0; i <= 3; i++) { 
                if(Number(답배열[i]) === 숫자배열[i]) { //같은 자리인지
                    스트라이크++;
                } else if (숫자배열.indexOf(Number(답배열[i])) > -1 ) {
                    // 배열.indexOf(값) 이것은 값의 위치를 알수있음 없으면 -1
                    // 같은 자리인것은 스트라이크에서 걸려서 그냥 숫자만 확인
                    볼++;
                }
            }
            결과.textContent = 스트라이크 + '스트라이크' + 볼 + '볼입니다.';
            입력창.value = '';
            입력창.focus();
        }
    }
});