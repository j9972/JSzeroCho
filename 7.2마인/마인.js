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

    // 지뢰의 위치를 알기 쉽게 내림차순으로 정렬
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
                    // 지뢰의 개수를 파악해서 나타내는것
                    var minNum = neighbor.filter((v) => {
                        return [codeGraph.mineScore, codeGraph.flagMine, codeGraph.questMine].includes(v);
                    }).length;
                    
                    // minNum || ' ' 이 순서가 ' ' || minNum 한번에 터지기는 하는데 숫자가 안나오고 빈칸으로 나오는 에러가 난다.
                    e.currentTarget.textContent = minNum || ' ';
                    dataSet[line][box] = codeGraph.opened;

                    if(minNum === 0) {
                        var neighborBox = [];
                        if( tbody.children[line - 1]) {
                            // concat으로 배열을 삽입한것을 원래의 변수에 다시 저장을 해줘야 한다.
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
                        // (v) => !!v 이거는 undefined이나 null 등을 없애준다.
                        neighborBox.filter((v) => !!v).forEach((sidebox) => {
                            var parentTr = e.currentTarget.parentNode;
                            var parentTbody = e.currentTarget.parentNode.parentNode;
                            var ssidebox = Array.prototype.indexOf.call(parentTr.children, sidebox);
                            var ssideline = Array.prototype.indexOf.call(parentTbody.children, parentTr);
    
                            /*
                            if(dataSet[ssideline][ssidebox] !== codeGraph.mineScore) {
                                sidebox.click();
                            }
                            */
                           // 이 방식으로 가능하다
                            if(dataSet[ssideline][ssidebox] === codeGraph.normal, codeGraph.flag, codeGraph.questMark) {
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