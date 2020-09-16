var tbody = document.querySelector('#table tbody');
var dataset = [];
var 중단플래그 = false;
var 열은칸 = 0;
var 코드표 = {
    연칸: -1,
    물음표: -2,
    깃발: -3,
    깃발지뢰: -4,
    물음표지뢰: -5,
    지뢰: 1,
    보통칸: 0,
}

document.querySelector('#exec').addEventListener('click', function() {
    // 내부 먼저 초기화
    tbody.innerHTML = '';
    document.querySelector('#result').textContent = '';
    dataset = [];
    열은칸 = 0;
    중단플래그 = false;
    var hor = parseInt(document.querySelector('#hor').value);
    var ver = parseInt(document.querySelector('#ver').value);
    var mine = parseInt(document.querySelector('#mine').value);
    console.log(hor,ver,mine);

    // 지뢰 위치 뽑기
    var 후보군 = Array(hor * ver).fill().map(function(요소, 인덱스) { // 후보군 코드는 몇부터 몇까지 배열을 만들고 싶다 이럴때 많이쓰니까 외우기
        return 인덱스;
    });
    var 셔플 = [];
    while(후보군.length > hor * ver - mine) { //지뢰의 개수 20개만큼
        var 이동값 = 후보군.splice(Math.floor(Math.random() * 후보군.length), 1)[0];
        셔플.push(이동값);
    }

    console.log(셔플);
    // 지뢰 테이블 만들기
    for( var i = 0;  i < ver; i++) { //세로를 만들고 가로를 만들기
        var arr = [];
        var tr = document.createElement('tr');
        dataset.push(arr);
        for( var j = 0; j < hor; j++) {
            arr.push(코드표.보통값);
            var td = document.createElement('td');
            td.addEventListener('contextmenu' ,function(e) {
                e.preventDefault();
                if (중단플래그) {
                    return;
                }
                var 부모tr = e.currentTarget.parentNode;
                var 부모tbody = e.currentTarget.parentNode.parentNode;
                var 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget);
                var 줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
                if(e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X'){
                // 데이터와 화면을 일치 시키는것 밑에 두줄
                    e.currentTarget.textContent = '!';
                    e.currentTarget.classList.add('flag');
                    if(dataset[줄][칸] === 코드표.지뢰) {
                        dataset[줄][칸] = 코드표.깃발지뢰;
                    } else {
                        dataset[줄][칸] = 코드표.깃발;
                    }
                } else if (e.currentTarget.textContent === '!') {
                    e.currentTarget.textContent = '?';
                    e.currentTarget.classList.remove('flag');
                    e.currentTarget.classList.add('question');
                    if(dataset[줄][칸] === 코드표.깃발지뢰) {
                        dataset[줄][칸] = 코드표.물음표지뢰;
                    } else {
                        dataset[줄][칸] = 코드표.물음표;
                    }
                } else if (e.currentTarget.textContent === '?') {
                    e.currentTarget.classList.remove('question');
                    if (dataset[줄][칸] === 코드표.물음표지뢰) {// data는 빈칸일때 1을 넣어줘야 한다. 기본칸
                        e.currentTarget.textContent = 'X';
                        dataset[줄][칸] = 코드표.지뢰;
                    } else {
                        e.currentTarget.textContent = '';
                        dataset[줄][칸] = 코드표.보통칸;
                    }
                }
            });
            td.addEventListener('click', function(e) {
                if (중단플래그) {
                    return;
                } //return으로 함수를 멈추기
                // 클릭 했을때 주변 지뢰 개수
                var 부모tr = e.currentTarget.parentNode;
                var 부모tbody = e.currentTarget.parentNode.parentNode;
                var 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget);
                var 줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
                if ([코드표.연칸,코드표.깃발,코드표.깃발지뢰,코드표.물음표지뢰,코드표.물음표].includes(dataset[줄][칸])) {
                    return;
                }

                e.currentTarget.classList.add('opened');
                열은칸++;
               
                if(dataset[줄][칸] === 코드표.지뢰) {
                    e.currentTarget.textContent = '펑';
                    document.querySelector('#result').textContent = '실패 ㅠ';
                    중단플래그 = true;
                } else {
                    // concat 은 배열과 배열을 합쳐서 새로운 배열을 만든다.
                    // push로 했을때 어떻게 나오는지도 보기
                    var 주변 = [ dataset[줄][칸 - 1],dataset[줄][칸 + 1] ];
                    if (dataset[줄 - 1]) {
                        주변 = 주변.concat([dataset[줄 - 1][칸 - 1], dataset[줄 - 1][칸] , dataset[줄 - 1][칸 + 1]]);
                        // 주변.push(dataset[줄 - 1][칸 - 1]);
                        // 주변.push(dataset[줄 - 1][칸]);
                        // 주변.push(dataset[줄 - 1][칸 + 1]); 이렇게도 가능하다
                    } 
                    if (dataset[줄+1]) {
                        주변 = 주변.concat([dataset[줄 + 1][칸 - 1], dataset[줄 + 1][칸], dataset[줄 + 1][칸 + 1]]);
                    }
                    var 주변지뢰개수 = 주변.filter(function(v) { // filter 함수는 배열에서 filter하는것
                        return [코드표.지뢰, 코드표.깃발지뢰, 코드표.물음표지뢰].includes(v);
                    }).length;
                    // 거짓인 값: false, ' ', 0, null , undefined, NaN
                    e.currentTarget.textContent = 주변지뢰개수 || ''; // 주변지뢰개수가 거짓인 값이면 빈문자열을 써라라는 뜻
                    dataset[줄][칸] = 코드표.연칸;
                    if(주변지뢰개수 === 0) {
                        var 주변칸 = [];
                        if(tbody.children[줄-1]){
                            주변칸 = 주변칸.concat([
                                tbody.children[줄 - 1].children[칸 - 1],
                                tbody.children[줄 - 1].children[칸],
                                tbody.children[줄 - 1].children[칸 + 1]
                            ]);
                        }
                        주변칸 = 주변칸.concat([
                            tbody.children[줄].children[칸 - 1],
                            tbody.children[줄].children[칸 + 1]
                        ]);
                        if(tbody.children[줄+1]) {
                            주변칸 = 주변칸.concat([
                                tbody.children[줄 + 1].children[칸 - 1],
                                tbody.children[줄 + 1].children[칸],
                                tbody.children[줄 + 1].children[칸 + 1]   
                            ]);
                        }
                        주변칸.filter((v) => !!v).forEach(function(옆칸) {
                            var 부모tr = e.currentTarget.parentNode;
                            var 부모tbody = e.currentTarget.parentNode.parentNode;
                            var 옆칸칸 = Array.prototype.indexOf.call(부모tr.children, 옆칸);
                            var 옆칸줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
                            if(dataset[옆칸줄][옆칸칸] !== 코드표.지뢰) {
                                옆칸.click();
                            }
                        });
                        //filter((v) => !!v) 배열에서 undefine,null,빈문자열을 제거해준다
                    }
                }
                if(열은칸 === hor * ver - mine) {
                    중단플래그 = true;
                    document.querySelector('#result').textContent = '승리!';
                }
            });
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    // 지뢰 심기
    for(var k = 0; k < 셔플.length; k++) { // 예 60
        var 세로 = Math.floor(셔플[k] / ver); // 예 7 -> 6
        var 가로 = 셔플[k] % ver; // 예 0 -> 0
        tbody.children[세로].children[가로].textContent = 'X'; // 세로 = tr 가로 = td 라고 생각
        dataset[세로][가로] = 코드표.지뢰; 
    }
});


// 오른쪽 마우스 클릭 이벤트는 contextmenu 이벤트이다.
// target 은 eventListenr가 실제로 발생하는애
// currentTarget은 eventlistener가 담겨있는 대상
// 재귀함수는 반복문을 함수로 표현을 한것이다.