// op -> opened Box , stoppingflag - 중단하는 부분
var tbody = document.querySelector('#table tbody');
var dataSet = [];
var stopingFlag = false;
var op = 0;
var codeGraph = {
    opened: -1,
    questMark: -2,
    flag: -3,
    flagMine: -4,
    questMine: -5,
    mineScore: 1,
    normal: 0,
}

document.querySelector('#exec').addEventListener('click', (e) => {
    tbody.innerHTML = '';
    stopingFlag = false;
    var res = document.querySelector('#result').textContent = '';
    

    var hor = parent(document.querySelector('#hor').value);
    var ver = parent(document.querySelector('#ver').value);
    var mine = parent(document.querySelector('#mine').value);
    console.log(hor,ver,mine);

    // 위치
    var sub = Array(ver * hor).fill().map((component, idx) => {
        return idx;
    });

    var shuffle = [];
    for(var i = 0; i < sub.length; i++) {
        var moved = sub.splice(Math.floor(Math.random() * sub.length), 1)[0];
        shuffle.push(moved);
    }
    console.log(shuffle);

    // 테이블
    for(var i = 0; i < ver; i++){
        var arr = [];
        var tr = document.createElement('tr');
        dataSet.push(tr);
        for(var i = 0; i < hor; i++) {
            arr.push(codeGraph.normal);
            var td = document.createElement('td');

            // 우클릭
            td.addEventListener('contextmenu', (e) => {
                if(stopingFlag) {
                    return;
                }
                e.preventDefault();

                var parentTr = e.currentTarget.parentNode;
                var parentTbody = e.currentTarget.parentNode.parentNode;
                var box = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
                var line = Array.prototype.indexOf.call(parentTbody.children, parentTr);

                // 점수도 바꿔야 하고 클래스도 바꾸고 이미지도 바꿔야 한다.
                if(e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X') {
                    currentTarget.add('flag');
                    currentTarget.textContent = '!';
                    if(e.currentTarget === codeGraph.mineScore) {
                        e.currentTarget = codeGraph.flagMine;
                    }
                    else {
                        e.currentTarget = codeGraph.flag;
                    }
                }
                else if(e.currentTarget.textContent === '!') {
                    currentTarget.remove('flag');
                    currentTarget.add('question');
                    currentTarget.textContent = '?';
                    if() {

                    } else {

                    }
                }
                else if(e.currentTarget.textContent === '?') {
                    currentTarget.remove('question');
                    currentTarget.textContent = '' || currentTarget.textContent = 'X';
                }

                if(dataSet[line][box].textContent === '' || dataSet[line][box].textContent === 'X') {

                    dataSet[line][box] = flagMine;
                }
                else {
                    dataSet[line][box].textContent === '!'
                    dataSet[line][box] = flag;
                }

                if(dataSet[line][box].textContent === '!') {
                    dataSet[line][box].remove('flag');
                    dataSet[line][box].add('question');
                    dataSet[line][box].textContent === '?'
                }
                else {

                }
                if (dataSet[line][box].textContent === '?') {
                    dataSet[line][box].remove('question');
                    dataSet[line][box].textContent === '' || dataSet[line][box].textContent === 'X';
                }
                else {
                }
            });

            // 좌클릭
            document.addEventListener('click', (e) => {
                if(stopingFlag) {
                    return;
                }

                var parentTr = e.currentTarget.parentNode;
                var parentTbody = e.currentTarget.parentNode.parentNode;
                var box = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
                var line = Array.prototype.indexOf.call(parentTbody.children, parentTr);

            });

            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    // 심기
    for(var k = 0; k < ver * hor - mine; k++) {
        var h = Math.floor(shuffle[k] / ver);
        var w = shuffle[k] % 10;
        sub.children[h].children[w] = 'X';
        dataSet[line][box].textContent = codeGraph.mineScore;
    }

})