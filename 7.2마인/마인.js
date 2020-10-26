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

document.querySelector('#exec').addEventListener('click', () => {
    tbody.innerHTML = '';
    res.textContent = '';
    op = 0;
    stopingFlag = false;

    var hor = parseInt(document.querySelector('#hor').value);
    var ver = parseInt(document.querySelector('#ver').value);
    var mine = parseInt(document.querySelector('#mine').value);
    console.log(hor, ver, mine);

    //지뢰 위치 
    var sub = Array(hor * ver).fill().map((v, idx) => {
        return idx;
    });
    
    var shuffle = [];
    while(sub.length > hor * ver - mine) {
        var moved = sub.splice(Math.floor(Math.random() * sub.length), 1)[0];
        shuffle.push(moved);
    };
    console.log(shuffle);

    var sortMineSpot = shuffle.slice(0,20).sort((r,p) => {
        return r - p;
    })
    console.log('sortMineSpot', sortMineSpot);

    //지뢰 테이블
    for(var i = 0; i < hor; i++) {
        var arr = [];
        var tr = document.createElement('tr');
        dataSet.push(arr);
        for(var j = 0; j < ver; j++) {
            arr.push(codeGraph.normal);
            var td = document.createElement('td');

            // 우클릭 ( 빈칸/X -> ! -> ?)
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
                // e.currentTarget.classList.add('flag')
                if(e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X') {
                    e.currentTarget.classList.add('flag');
                    e.currentTarget.textContent = '!'
                    if(dataSet[line][box] === codeGraph.mineScore) {
                        dataSet[line][box] = codeGraph.flagMine;
                    }
                    else if(dataSet[line][box] === codeGraph.normal) {
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
                    else if(dataSet[line][box] === codeGraph.flag) {
                        dataSet[line][box] = codeGraph.questMark;
                    }
                }
                else if (e.currentTarget.textContent === '?') {
                    e.currentTarget.classList.remove('question');
                    if(dataSet[line][box] === codeGraph.questMine) {
                        dataSet[line][box] = codeGraph.mineScore;
                        e.currentTarget.textContent = 'X';
                    }
                    else if(dataSet[line][box] === codeGraph.questMark) {
                        dataSet[line][box] = codeGraph.normal;
                        e.currentTarget.textContent = '';
                    }
                }
            });

            // 좌클릭 ( 칸 누르기 )
            td.addEventListener('click', (e) => {
                if(stopingFlag) {
                    return;
                }

                var parentTr = e.currentTarget.parentNode;
                var parentTbody = e.currentTarget.parentNode.parentNode;
                var box = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
                var line = Array.prototype.indexOf.call(parentTbody.children, parentTr);

                if([codeGraph.opened, codeGraph.questMark, codeGraph.questMine, 
                    codeGraph.flag, codeGraph.flagMine].includes(dataSet[line][box])) {
                    return;
                }

                e.currentTarget.classList.add('opened');
                op++;
                // 0 이 뜨고 한번에 터지지도 않음
                if(dataSet[line][box] === codeGraph.mineScore ) {
                    e.currentTarget.textContent = '펑';
                    res.textContent = '실패';
                    stopingFlag = true;
                }
                else {
                    var neighbor = [ dataSet[line][box - 1], dataSet[line][box + 1] ];
                    if(dataSet[line - 1]) {
                        neighbor = neighbor.concat([ dataSet[line - 1][box - 1] , dataSet[line - 1][box], dataSet[line - 1][box + 1] ]);
                    }
                    if(dataSet[line + 1]) {
                        neighbor = neighbor.concat([ dataSet[line + 1][box - 1] , dataSet[line + 1][box], dataSet[line + 1][box + 1] ]);
                    }
                    var minNum = neighbor.filter((v) => {
                        return [codeGraph.mineScore, codeGraph.flagMine, codeGraph.questMine].includes(v);
                    }).length;
                    
                    e.currentTarget.textContent = minNum || ' ';
                    dataSet[line][box] = codeGraph.opened;

                    if(minNum === 0) {
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
                        neighborBox.filter((v) => !!v).forEach((sidebox) => {
                            var parentTr = e.currentTarget.parentNode;
                            var parentTbody = e.currentTarget.parentNode.parentNode;
                            var ssidebox = Array.prototype.indexOf.call(parentTr.children, sidebox);
                            var ssideline = Array.prototype.indexOf.call(parentTbody.children, parentTr);
    
                            if(dataSet[ssideline][ssidebox] !== codeGraph.mineScore) {
                                sidebox.click();
                            }
                        });          
                    }
                }
                if(op === hor * ver - mine) {
                    res.textContent = '승리';
                    stopingFlag = true;
                }
            });
            tr.appendChild(td);
        };
        tbody.appendChild(tr);
    };

    //지뢰 심기
    for(var k = 0; k < shuffle.length; k++) {
        var h = Math.floor(shuffle[k] / hor);
        var w = shuffle[k] % ver;
        tbody.children[h].children[w] = 'X';
        dataSet[h][w] = codeGraph.mineScore;
    };
})