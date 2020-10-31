var table = document.querySelector('#table');
var score = document.querySelector('#score');
var data = [];
var drag = false;
var dragging = false;
var startSpot;
var endSpot;

function reset() {
    var fragment = document.createDocumentFragment();
    [1,2,3,4].forEach(() => {
        var wData = [];
        var tr = document.createElement('tr');
        data.push(wData);
        [1,2,3,4].forEach(() => {
            var td = document.createElement('td');
            wData.push(0);
            tr.appendChild(td)
        })
        fragment.appendChild(tr);
    })
    table.appendChild(fragment);
}

function randomDrawing() {
    var empty = [];
    data.forEach((wData,i) => {
        wData.forEach((hData, j) => {
            if(!hData) {
                empty.push([i,j]);
            }
        })
    });
    if(empty.length === 0) {
        alert('게임종료');
        // textContent를 쑤는것이 맞는지 모르곘음
        table.textContent.innerHTML = '';
        reset();
    } else {
        // empty 배열을 이렇게 넣는것인가?
        var randomBox = empty[Math.floor(Math.random() * empty.length)];
        // data를 표현할떄 이중배열이 맞는것인가?
        data[randomBox[0]][randomBox[1]].textContent = 2;
        drawing();
    }
}

function drawing() {
    [1,2,3,4].forEach((wData, i) => {
        [1,2,3,4].forEach((hData, j) => {
            // 행데이터가 0이 아니라면 그 부분에 숫자를 넣어준다.
            if(hData > 0) {
                // table의 표현이 맞는지 아니면 data로 표현을 하는게 맞는건지?
                table.children[i].children[j].textContent = hData;
            }
            else {
                table.children[i].children[j].textContent = ' ';
            }
        })
    })
}

reset();
randomDrawing();
drawing();


window.addEventListener('mousedown', (e) => {
    drag = true;
    startSpot = [e.clientX, e.clientY];
})
window.addEventListener('mousemove', (e) => {
    if(drag) {
        dragging = true;
    }
})
window.addEventListener('mouseup', (e) => {
    endSpot = [e.clientX, e.clientY];
    var diffX = endSpot[0] - startSpot[0];
    var diffY = endSpot[1] - startSpot[1];
    console.log("x거리 : " + diffX, "y거리 : " + diffY);
    var way;
    if(diffX < 0 && Math.abs(diffX) / Math.abs(diffY) > 1) {
        way = 'left';
        console.log('왼쪽');
    }
    else if(diffX > 0 && Math.abs(diffX) / Math.abs(diffY) > 1) {
        way = 'right';
        console.log('오른쪽');
    }
    else if(diffY < 0 && Math.abs(diffX) / Math.abs(diffY) < 1) {
        way = 'up';
        console.log('위쪽');
    }
    else if(diffX < 0 && Math.abs(diffX) / Math.abs(diffY) < 1) {
        way = 'down';
        console.log('아래쪽');
    }
    drag = false;
    dragging = false;
    switch(way) {
        case 'left':
            newData = [
                [],
                [],
                [],
                [],
            ];
            data.forEach((wData, i) => {
                wData.forEach((hData, j) => {
                    if(hData) {
                        if(newData[i][newData.length - 1] && newData[i][newData.length - 1] === hData) {
                            newData[i][newData.length - 1] *= 2;
                            var point = parseInt(socre.textContent, 10);
                            score.textContent = point + newData[i][newData.length - 1];
                        }
                        else {
                            newData[i].push(hData);
                        }
                    }
                })
            });

            [1,2,3,4].forEach((wData,i) => {
                [1,2,3,4].forEach((hData, j) => {
                    data[i][j] = newData[i][j] || '';
                })
            })
            break;
        case 'right':
            newData = [
                [],
                [],
                [],
                [],
            ];
            data.forEach((wData, i) => {
                wData.forEach((hData, j) => {
                    if(hData) {
                        if(newData[i][0] && newData[i][0] === hData) {
                            newData[i][0] *= 2;
                            var point = parseInt(socre.textContent, 10);
                            score.textContent = point + newData[i][0];
                        }
                        else {
                            newData[i].unshift(hData);
                        }
                    }
                })
            });

            [1,2,3,4].forEach((wData,i) => {
                [1,2,3,4].forEach((hData, j) => {
                    data[3-i][j] = newData[i][j] || '';
                })
            })
            break;
        case 'up':
            newData = [
                [],
                [],
                [],
                [],
            ];
            data.forEach((wData, i) => {
                wData.forEach((hData, j) => {
                    if(hData) {
                        if(newData[j][newData.length - 1] && newData[j][newData.length - 1] === hData) {
                            newData[j][newData.length - 1] *= 2;
                            var point = parseInt(socre.textContent, 10);
                            score.textContent = point + newData[j][newData.length - 1];
                        }
                        else {
                            newData[j].push(wData);
                        }
                    }
                })
            });

            [1,2,3,4].forEach((wData,i) => {
                [1,2,3,4].forEach((hData, j) => {
                    data[j][i] = newData[i][j] || '';
                })
            })
            break
        case 'down':
            newData = [
                [],
                [],
                [],
                [],
            ];
            data.forEach((wData, i) => {
                wData.forEach((hData, j) => {
                    if(hData) {
                        if(newData[j][0] && newData[j][0] === hData) {
                            newData[j][0] *= 2;
                            var point = parseInt(socre.textContent, 10);
                            score.textContent = point + newData[j][0];
                        }
                        else {
                            newData[j].unshift(wData);
                        }
                    }
                })
            });

            [1,2,3,4].forEach((wData,i) => {
                [1,2,3,4].forEach((hData, j) => {
                    data[j - 3][i] = newData[i][j] || '';
                })
            })
            break;
    }
})



