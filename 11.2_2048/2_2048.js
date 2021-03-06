const table = document.querySelector('#table');
const score = document.querySelector('#score');
let data = [];
let drag;
let dragging;
let startSpot;

function reset() {
    const fragment = document.createDocumentFragment();
    [1,2,3,4].forEach(() => {
        let wData = [];
        data.push(wData);
        const tr = document.createElement('tr');
        [1,2,3,4].forEach(() => {
            wData.push(0);
            const td = document.createElement('td');
            tr.appendChild(td)
        })
        fragment.appendChild(tr);
    })
    table.appendChild(fragment);
}

function randomDrawing() {
    let empty = [];
    data.forEach((wData,i) => {
        wData.forEach((hData, j) => {
            if(!hData) {
                empty.push([i,j]);
            }
        })
    });
    if(empty.length === 0) {
        alert('게임종료' + score.textContent);
        // textContent를 쓰면 안된다. 이유는 화면을 비우는거지 textContent는 화면이 아니라 점수를 비우는것
        table.innerHTML = '';
        reset();
    } else {
        // empty 배열을 이렇게 넣는것인가? 맞음
        let randomBox = empty[Math.floor(Math.random() * empty.length)];
        // data를 표현할떄 이중배열이 맞는것인가? 맞음
        data[randomBox[0]][randomBox[1]] = 2;
        // textContent를 써서 숫자 랜덤 생성이 안됬었다. 데이터와 화면 일치 문제인거같음
        drawing();
    }
}

function drawing() {
    // 이 부분이 에러인데 테이블이 꽉차게 숫자가 들어가있다. -> 해결안은 forEach문을 돌릴때 [1,2,3,4].forEach로 돌려서 숫자가 다 들어갔다
    data.forEach((wData, i) => {
        wData.forEach((hData, j) => {
            // 행데이터가 0이 아니라면 그 부분에 숫자를 넣어준다.
            console.log(hData); // hData가 0으로 뜬다....
            if(hData > 0) {
                // table의 표현이 맞는지 아니면 data로 표현을 하는게 맞는건지? 맞음
                table.children[i].children[j].textContent = hData;
            }
            else {
                table.children[i].children[j].textContent = '';
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
    let endSpot = [e.clientX, e.clientY];
    let diffX = endSpot[0] - startSpot[0];
    let diffY = endSpot[1] - startSpot[1];
    // console.log("x거리 : " + diffX, "y거리 : " + diffY);
    let way;
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
    else if(diffX > 0 && Math.abs(diffX) / Math.abs(diffY) < 1) {
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
                        if(newData[i][newData[i].length - 1] && newData[i][newData[i].length - 1] === hData) {
                            newData[i][newData[i].length - 1] *= 2;
                            let point = parseInt(score.textContent, 10);
                            score.textContent = point + newData[i][newData[i].length - 1];
                        }
                        else {
                            newData[i].push(hData);
                        }
                    }
                })
            });
            console.log(newData);
            [1,2,3,4].forEach((wData,i) => {
                [1,2,3,4].forEach((hData, j) => {
                    data[i][j] = newData[i][j] || 0;
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
                            let point = parseInt(score.textContent, 10);
                            score.textContent = point + newData[i][0];
                        }
                        else {
                            newData[i].unshift(hData);
                        }
                    }
                })
            });
            console.log(newData);
            [1,2,3,4].forEach((wData,i) => {
                [1,2,3,4].forEach((hData, j) => {
                    data[i][3 - j] = newData[i][j] || 0;
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
                        if(newData[j][newData[j].length - 1] && newData[j][newData[j].length - 1] === hData) {
                            newData[j][newData[j].length - 1] *= 2;
                            let point = parseInt(score.textContent, 10);
                            score.textContent = point + newData[j][newData[j].length - 1];
                        }
                        else {
                            newData[j].push(hData);
                        }
                    }
                })
            });
            console.log(newData);
            [1,2,3,4].forEach((wData,i) => {
                [1,2,3,4].forEach((hData, j) => {
                    data[j][i] = newData[i][j] || 0;
                })
            })
            break;
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
                            let point = parseInt(score.textContent, 10);
                            score.textContent = point + newData[j][0];
                        }
                        else {
                            newData[j].unshift(hData);
                        }
                    }
                })
            });
            console.log(newData);
            [1,2,3,4].forEach((wData,i) => {
                [1,2,3,4].forEach((hData, j) => {
                    data[3 - j][i] = newData[i][j] || 0;
                })
            })
            break;
    }
    drawing();
    randomDrawing();
})