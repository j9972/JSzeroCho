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
var res = document.querySelector('#result');

document.querySelector('#exec').addEventListener('click', (e) => {
    tbody.innerHTML = '';
    dataSet = [];
    op = 0;
    stopingFlag = false;
    res.textContent = '';
    
    var hor = parseInt(document.querySelector('#hor').value);
    var ver = parseInt(document.querySelector('#ver').value);
    var mine = parseInt(document.querySelector('#mine').value);
    console.log(hor,ver,mine);

    // 위치
    var sub = Array(ver * hor).fill().map((component, idx) => {
        return idx;
    });
    // sub.length가 100이다. -> while의 조건이 100부터 81까지 총 20개.

    var shuffle = [];
    while(sub.length > hor * ver - mine) {
        var moved = sub.splice(Math.floor(Math.random() * sub.length), 1)[0];
        shuffle.push(moved);
    }
    console.log(shuffle);

    // 테이블
    for(var i = 0; i < ver; i++){
        var arr = [];
        var tr = document.createElement('tr');
        dataSet.push(arr);
        for(var i = 0; i < hor; i++) {
            var td = document.createElement('td');
            arr.push(codeGraph.normal);

            // 우클릭
            td.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                if(stopingFlag) {
                    return;
                }

                var parentTr = e.currentTarget.parentNode;
                var parentTbody = e.currentTarget.parentNode.parentNode;
                var box = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
                var line = Array.prototype.indexOf.call(parentTbody.children, parentTr);

                if(dataSet[line][box] === codeGraph.opened) {
                    return;
                } 

                // 점수도 바꿔야 하고 클래스도 바꾸고 이미지도 바꿔야 한다.
                if(e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X') {
                    e.currentTarget.classList.add('flag');
                    e.currentTarget.textContent = '!';
                    if(dataSet[line][box] === codeGraph.mineScore) {
                        dataSet[line][box] = codeGraph.flagMine;
                    }
                    else {
                        dataSet[line][box] = codeGraph.flag;
                    }
                }
                else if(e.currentTarget.textContent === '!') {
                    e.currentTarget.classList.remove('flag');
                    e.currentTarget.classList.add('question');
                    e.currentTarget.textContent = '?';
                    if(dataSet[line][box] === codeGraph.flagMine) {
                        dataSet[line][box] = codeGraph.questMine;
                    } else {
                        dataSet[line][box] = codeGraph.questMark;
                    }
                }
                else if(e.currentTarget.textContent === '?') {
                    e.currentTarget.classList.remove('question');
                    if(dataSet[line][box] === codeGraph.questMine) {
                        e.currentTarget.textContent = 'X';
                        dataSet[line][box] = codeGraph.mineScore;
                    } else {
                        e.currentTarget.textContent = '';
                        dataSet[line][box] = codeGraph.normal;
                    }
                }
            });

            // 좌클릭
            td.addEventListener('click', (e) => {
                if(stopingFlag) {
                    return;
                }

                var parentTr = e.currentTarget.parentNode;
                var parentTbody = e.currentTarget.parentNode.parentNode;
                var box = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
                var line = Array.prototype.indexOf.call(parentTbody.children, parentTr);

                if([codeGraph.opened, codeGraph.flagMine, codeGraph.questMine, codeGraph.flag, codeGraph.questMark].includes(dataSet[line][box])) {
                    return;
                }

                e.currentTarget.classList.add('opened');
                op++;

                if(dataSet[line][box] === codeGraph.mineScore) {
                    e.currentTarget.textContent = '펑';
                    res.textContent = '실패';
                    stopingFlag = true;
                }
                else {
                    var neighbor = [ dataSet[line][box - 1], dataSet[line][box + 1] ];
                    if(dataSet[line - 1]) {
                        neighbor = neighbor.concat(dataSet[line - 1][box - 1], dataSet[line - 1][box], dataSet[line - 1][box + 1]);
                    }
                    if(dataSet[line + 1]) {
                        neighbor = neighbor.concat(dataSet[line + 1][box - 1], dataSet[line + 1][box], dataSet[line + 1][box + 1]);
                    }
                    var neighborMineNum = neighbor.filter((v) => {
                        return  [codeGraph.flagMine, codeGraph.questMine, codeGraph.mineScore].includes(v);
                    }).length;
                    e.currentTarget.textContent = '' || neighborMineNum;
                    dataSet[line][box] = codeGraph.opened;

                    if(neighborMineNum === 0) {
                        var neighborBox =[];
                        if(tbody.children[line - 1]) {
                            neighborBox = neighborBox.concat([
                                tbody.children[line - 1].children[box - 1], 
                                tbody.children[line - 1].children[box], 
                                tbody.children[line - 1].children[box + 1]
                            ]);
                        }
                        neighborBox = neighborBox.concat([
                            tbody.children[line].children[box - 1], 
                            tbody.children[line].children[box + 1]
                        ]);
                        if(tbody.children[line + 1]) {
                            neighborBox = neighborBox.concat([
                                tbody.children[line + 1].children[box - 1], 
                                tbody.children[line + 1].children[box], 
                                tbody.children[line + 1].children[box + 1]
                            ]);
                        }
                        neighborBox.filter((v) => !!v).forEach((sideBox) => {
                            var parentTr = e.currentTarget.parentNode;
                            var parentTbody = e.currentTarget.parentNode.parentNode;
                            var ssidebox = Array.prototype.indexOf.call(parentTr.children, sideBox);
                            var ssideline = Array.prototype.indexOf.call(parentTbody.children, parentTr);
                            if(dataSet[ssideline][ssidebox] !== codeGraph.mineScore) {
                                sideBox.click();
                            }
                        });
                    }
                }
                if(op === ver * hor - mine) {
                    stopingFlag = true;
                    res.textContent ='승리';
                }
            });
            tr.appendChild(td);
        };
        tbody.appendChild(tr);
    };

    // 심기
    for(var k = 0; k < shuffle.length; k++) { // ex shuffle[k] === 59
        var h = Math.floor(shuffle[k] / hor); // floor 반내림 
        var w = shuffle[k] % ver;// 0 ~ 9 ( % === 나머지 )
        tbody.children[h].children[w].textContent = 'X';
        dataSet[h][w] = codeGraph.mineScore;
    }
})