var table = document.getElementById('table');
var data = [];
var score = document.getElementById('score');

// 열(w)이 가로 행(h)이 세로

function reset() {
    var fragment = document.createDocumentFragment();
    [1,2,3,4].forEach( () => {
        var wData = [];
        data.push(wData);
        var tr = document.createElement('tr');
        [1,2,3,4].forEach(() => {
            wData.push(0);
            var td = document.createElement('td');
            tr.appendChild(td);
        });
        fragment.appendChild(tr);
    });
    table.appendChild(fragment);
}

function randomMaking() {
    var emptyArray = []
    data.forEach((wData, i) => {
        wData.forEach((hData, j) =>{
            if(!hData) {
                emptyArray.push([i,j]);
            }
        });
    });
    if(emptyArray.length == 0) {
        // 게임 오버
        alert('게임오버: ' + score.textContent);
        table.innerHTML = '';
        reset();
    }
    else {
        // 랜덤한 자리에 2 생성
        var randomBox = emptyArray[Math.floor(Math.random() * emptyArray.length)];
        data[randomBox[0]][randomBox[1]] = 2;
        drawing();
    }
}

function drawing() {
    data.forEach((wData, i) => {
        wData.forEach((hData, j) => {
            if(hData > 0) {
                table.children[i].children[j].textContent = hData;
            } else {
                table.children[i].children[j].textContent = '';
            }
        });
    });
}

reset();
randomMaking();
drawing();

var draging = false;
var drag = false;
var starting;
var ending;

window.addEventListener('mousedown', (e) => {
    drag = true;
    starting = [e.clientX, e.clientY]
});
window.addEventListener('mousemove', (e) => {
    if(drag) {
        draging = true;
    }
});
window.addEventListener('mouseup', (e) => {
    ending = [e.clientX, e.clientY];
    if(draging) {
        var way;
        var diffX = ending[0] - starting[0];
        var diffY = ending[1] - starting[1];
        if(diffX < 0 && Math.abs(diffX) / Math.abs(diffY) > 1) {
            way = 'left'
        } 
        else if(diffX > 0 && Math.abs(diffX) / Math.abs(diffY) > 1 ) {
            way = 'right'
        }
        else if(diffY > 0 && Math.abs(diffX) / Math.abs(diffY) < 1) {
            way = 'down'
        }
        else if(diffY < 0 && Math.abs(diffX) / Math.abs(diffY) < 1) {
            way = 'up'
        }
        console.log(diffX, diffY, way);
    };
    drag = false;
    draging = false;

    switch(way) {
        case 'left':
            var newData = [
                [],
                [],
                [],
                [],
            ];
            data.forEach((wData, i) => {
                wData.forEach((hData, j) => {
                    if(hData) {
                        // 숫자 합쳐지면서 두배되기
                        if(newData[i][newData[i].length - 1] && newData[i][newData[i].length - 1] === hData) {
                            newData[i][newData[i].length - 1] *= 2;
                            var point = parseInt(score.textContent , 10);
                            score.textContent = point + newData[i][newData[i].length - 1];
                        }
                        // 숫자 안합쳐지고 쌓이기
                        else {
                            newData[i].push(hData);
                        }
                    }
                });
            });
            console.log(newData);
            [1,2,3,4].forEach( (wData, i) => {
                [1,2,3,4].forEach( (hData, j) => {
                    data[i][j] = newData[i][j] || 0;
                });
            });
            break;
        case 'right':
            var newData = [
                [],
                [],
                [],
                [],
            ]
            data.forEach((wData, i) => {
                wData.forEach((hData, j) => {
                    if(hData) {
                        // 숫자 합쳐지면서 두배되기
                        if(newData[i][0] && newData[i][0] === hData) {
                            newData[i][0] *= 2;
                            var point = parseInt(score.textContent , 10);
                            score.textContent = point + newData[i][0];
                        }
                        // 숫자 안합쳐지고 쌓이기
                        else {
                            newData[i].unshift(hData);
                        }
                    }
                });
            });
            console.log(newData);
            [1,2,3,4].forEach( (wData, i) => {
                [1,2,3,4].forEach( (hData, j) => {
                    data[i][3 - j] = newData[i][j] || 0;
                });
            });
            break;
        case 'up':
            var newData = [
                [],
                [],
                [],
                [],
            ]
            data.forEach((wData, i) => {
                wData.forEach((hData, j) => {
                    if(hData) {
                        // 숫자 합쳐지면서 두배되기
                        if(newData[j][newData[j].length - 1] && newData[j][newData[j].length - 1] === hData) {
                            newData[j][newData[j].length - 1] *= 2;
                            var point = parseInt(score.textContent , 10);
                            score.textContent = point + newData[j][newData[j].length - 1];
                        }
                        // 숫자 안합쳐지고 쌓이기
                        else {
                            newData[j].push(hData);
                        }
                    }
                });
            });
            console.log(newData);
            [1,2,3,4].forEach( (wData, i) => {
                [1,2,3,4].forEach( (hData, j) => {
                    data[j][i] = newData[i][j] || 0;
                });
            });
            break;
        case 'down':
            var newData = [
                [],
                [],
                [],
                [],
            ]
            data.forEach((wData, i) => {
                wData.forEach((hData, j) => {
                    if(hData) {
                        // 숫자 합쳐지면서 두배되기
                        if(newData[j][0] && newData[j][0] === hData) {
                            newData[j][0] *= 2;
                            var point = parseInt(score.textContent , 10);
                            score.textContent = point + newData[j][0];
                        }
                        // 숫자 안합쳐지고 쌓이기
                        else {
                            newData[j].unshift(hData);
                        }
                    }
                });
            });
            console.log(newData);
            [1,2,3,4].forEach( (wData, i) => {
                [1,2,3,4].forEach( (hData, j) => {
                    data[3 - j][i] = newData[i][j] || 0;
                });
            });
            break;
    }
    drawing();
    randomMaking();
});