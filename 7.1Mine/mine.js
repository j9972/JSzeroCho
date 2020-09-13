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

document.querySelector('#exec').addEventListener('click', () => {
    tbody.innerHTML = '';
    dataSet = [];
    op = 0;
    // 못쓴 부분
    stopingFlag = false;
    document.querySelector('#result').textContent = '';
    var hor = parseInt(document.querySelector('#hor').value); // 가로
    var ver = parseInt(document.querySelector('#ver').value); // 세로
    var mine = parseInt(document.querySelector('#mine').value);
    console.log(hor, ver, mine);

    //지뢰 위치
    var sub = Array(hor * ver).fill().map(function (com, idx) {
        return idx;
    });

    var shuffle = [];
    while (sub.length > hor * ver - mine) {
      var movedValue = sub.splice(Math.floor(Math.random() * sub.length), 1)[0];
      shuffle.push(movedValue);
    }
    console.log(shuffle);

    //지뢰 테이블
    for(var i = 0; i < ver; i++) {
        var arr = [];
        var tr = document.createElement('tr');
        dataSet.push(arr)
        for(var j = 0; j < hor; j++) {
            var td = document.createElement('td');
            arr.push(codeGraph.normal);
            // 우클릭으로 빈칸/X => 깃발 => 물음표 => 빈칸/X 만들기
            td.addEventListener('contextmenu', (e)=> {  
                e.preventDefault();

                if (stopingFlag) {
                    return;
                } 
                var parentsTr = e.currentTarget.parentNode;
                var parentsTbody = e.currentTarget.parentNode.parentNode;
                var box = Array.prototype.indexOf.call(parentsTr.children, e.currentTarget);
                var line = Array.prototype.indexOf.call(parentsTbody.children, parentsTr);

                if(e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X') {
                    e.currentTarget.classList.add('flag');
                    e.currentTarget.textContent = '!';
                    if(dataSet[line][box] === codeGraph.mineScore){
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
                    }
                    else {
                        dataSet[line][box] = codeGraph.questMark;
                    }
                }
                else if(e.currentTarget.textContent === '?') {
                    e.currentTarget.classList.remove('question');
                    if(dataSet[line][box] === codeGraph.questMine) {
                        e.currentTarget.textContent = 'X';
                        dataSet[line][box] = codeGraph.mineScore;
                    }
                    else {
                        e.currentTarget.textContent = '';
                        dataSet[line][box] = codeGraph.normal;
                    }
                }
            });
            // 좌클릭으로 누르기
            td.addEventListener('click', (e) => {
                if (stopingFlag) {
                    return;
                } 

                var parentsTr = e.currentTarget.parentNode;
                var parnetsTbody = e.currentTarget.parentNode.parentNode;
                var box = Array.prototype.indexOf.call(parentsTr.children, e.currentTarget);
                var line = Array.prototype.indexOf.call(parnetsTbody.children, parentsTr);

                // 놓친 부분
                if([codeGraph.opened, codeGraph.flag, codeGraph.flagMine, codeGraph.questMine, codeGraph.mark].includes(dataSet[line][box])) {
                    return;
                }

                e.currentTarget.classList.add('opened');
                op++;

                if(dataSet[line][box] === codeGraph.mineScore) {
                    e.currentTarget.textContent = '펑';
                    document.querySelector('#result').textContent = '실패';
                    stopingFlag = true;
                }
                else {
                    var neighbor = [dataSet[line][box - 1], dataSet[line][box + 1]];
                    if(dataSet[line - 1]){
                        neighbor = neighbor.concat([dataSet[line - 1][box - 1], dataSet[line - 1][box], dataSet[line - 1][box + 1]]);
                    }
                    if(dataSet[line + 1]){
                        neighbor = neighbor.concat([dataSet[line + 1][box - 1], dataSet[line + 1][box], dataSet[line + 1][box + 1]]);
                    }
                    // 놓친 부분
                    var neighborMineNum = neighbor.filter((v) => {
                        return[codeGraph.flagMine, codeGraph.questMine, codeGraph.mineScore].includes(v);
                    }).length;
                    e.currentTarget.textContent = neighborMineNum || '';
                    dataSet[line][box] = codeGraph.opened;

                    if(neighborMineNum === 0){
                        // 주변 8칸 동시 오픈
                        var neighborBox = [];
                        if( tbody.children[line - 1]) {
                            neighborBox = neighborBox.concat([
                                tbody.children[line - 1].children[box - 1],
                                tbody.children[line - 1].children[box],
                                tbody.children[line - 1].children[box + 1],
                            ]);
                        }
                        neighborBox = neighborBox.concat([
                            tbody.children[line].children[box - 1],
                            tbody.children[line].children[box + 1],
                        ]);

                        if( tbody.children[line + 1]) {
                            neighborBox = neighborBox.concat([
                                tbody.children[line + 1].children[box - 1],
                                tbody.children[line + 1].children[box],
                                tbody.children[line + 1].children[box + 1],
                            ]);
                        }
                        neighborBox.filter((v) => !!v).forEach((sideBox) => {
                            var parentsTr = e.currentTarget.parentNode;
                            var parnetsTbody = e.currentTarget.parentNode.parentNode;
                            var sideSideBox = Array.prototype.indexOf.call(parentsTr.children, sideBox);
                            var sideSideLine = Array.prototype.indexOf.call(parnetsTbody.children, parentsTr);
                            if(dataSet[sideSideLine][sideSideBox] !== codeGraph.mineScore) {
                                sideBox.click();
                            }
                        });
                    }
                }
                if(op === hor * ver - mine) {
                    stopingFlag = true;
                    document.querySelector('#result').textContent = '승리';
                }
            });
            tr.appendChild(td);
        };
        tbody.appendChild(tr);
    };
    
    //지뢰 심기 -> 다시 보기
    for(var k = 0; k < shuffle.length; k++) {
        var w = shuffle[k] % ver;
        var h = Math.floor(shuffle[k] / hor);
        tbody.children[h].children[w].textContent = 'X';
        dataSet[h][w] = codeGraph.mineScore;
    }
});


