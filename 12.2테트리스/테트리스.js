const tetris = document.querySelector('#tetris');
let tetrisData = [];
let currentBlock;
let nextBlock;
let currentTopLeft = [0, 3]; // 도형이 시작되는 지점
const blocks = [
  {
    name: 's', // 네모
    center: false,
    numCode: 1,
    color: 'red',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [0, 1, 1], // 1 부분이 도형의 모양
        [0, 1, 1],
      ]
    ],
  },
  {
    name: 't', // T자
    center: true,
    numCode: 2,
    color: 'orange',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0],
      ],
    ]
  },
  {
    name: 'z', // 지그재그
    center: true,
    numCode: 3,
    color: 'yellow',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1],
      ],
      [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0],
      ],
      [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0],
      ],
    ]
  },
  {
    name: 'zr', // 반대 지그재그
    center: true,
    numCode: 4,
    color: 'green',
    startRow: 1,
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0],
      ],
      [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1],
      ],
    ]
  },
  {
    name: 'l', // L자
    center: true,
    numCode: 5,
    color: 'blue',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0],
      ],
      [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1],
      ],
    ]
  },
  {
    name: 'lr', // 반대 L자
    center: true,
    numCode: 6,
    color: 'navy',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
      ],
      [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
      ],
    ]
  },
  {
    name: 'b', // 1자
    center: true,
    numCode: 7,
    color: 'violet',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
      ],
    ]
  },
];


const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'navy', 'violet'];

const activeBlock = value => (value > 0 && value < 10);
const InvalidBlock = value => (value === undefined || value >= 10);

function init() {
    const fragment = document.createDocumentFragment();
    [...Array(20).fill()].forEach((col,i) => {  // fill함수에 인자가 없는건 빈칸으로 20칸을 만들겠다는 의미
        const tr = document.createElement('tr');
        fragment.appendChild(tr);
        [...Array(10).fill()].forEach((row,j) => {
            const td = document.createElement('td');
            tr.appendChild(td);
        });
        // 실수 1. fill() 인자에 0을 넣지 않았고 테트리스 데이터에 column을 push를 해야하는데 appendChild를 함
        const column = Array(10).fill(0); // 기본적으로 0으로 가지고 있어야 블럭이 있는 칸은 1로써 블럭의 유무를 알려준다
        tetrisData.push(column);
    })
    tetris.appendChild(fragment);
}

function draw() {
    tetrisData.forEach((col,i) => {
        col.forEach((row,j) => {
            if(row > 0) { // 문제 1. 뒷 부분 어떻게 색을 넣나?
              // tetrisData[i][j] 하나의 빈칸을 의미, 얘는 0~9의 idx를 갖음
              tetris.children[i].children[j].className = tetrisData[i][j] >= 10 ? colors[tetrisData[i][j] / 10 - 1] : colors[tetrisData[i][j] - 1];
              // tetris.children[i].children[j].className = colors[tetrisData[i][j] - 1]; // 쌓였을때 보이지가 않음
              // tetris.children[i].children[j].className = colors[tetrisData[i][j] / 10 - 1]; // 처음에 보이지 않음
            } 
            else { // 이 부분에 빈칸이 아닌 white를 쓰면 블럭들이 흰색으로 바뀌며 사라진다.
              tetris.children[i].children[j].className = '';
            }
        })
    })
}

function drawNext() { // 작은 테이블을 만들어 다음에 나올 블럭을 생성ㄴ
    const nextTable = document.querySelector('#next-table');
    nextTable.querySelectorAll('tr').forEach((col, i) => {
        // 그냥 col이 아닌 Array.from(col.childre)를 한것으로 부터 nextTable.querySelectorAll('tr')[i].children[j] 이런식으로 쓰일것을 유추
        Array.from(col.children).forEach((row,j) => {
            if(nextBlock.shape[0][i] && nextBlock.shape[0][i][j] > 0) {
              // nextBlock.shape[0][i] 이 조건은 블럭의 존재 유무를 따진거 + [j]의 의미는 블럭의 모양들 보면 첫번째 행에는 빈칸을 두기 때문인것 같음
              // nextBlock.shape[0]은 각 block을 첫번째 모형으로 fix한것이다.
              nextTable.querySelectorAll('tr')[i].children[j].className = colors[nextBlock.numCode - 1];
              // nextTable.querySelectorAll('tr')[i].children[j] 이 모양은 html 코드가 각 tr(행) 마다로 td가 나눠져서 그런듯
            }
            else {
              nextTable.querySelectorAll('tr')[i].children[j].className = 'white';
            }
        })
    })
}

// 다시 만들때 추가할 기능 생각했음 
function generate() {
    // 현재 블럭이 있고 없고로 따라서 없으면 현재 블럭을 랜덤 생성을 하고 아니면 다음 블럭을 현재의 블럭으로 불러오기
    if(!currentBlock) {
        currentBlock = blocks[Math.floor(Math.random() * blocks.length)];
    }
    else {
        currentBlock = nextBlock;
    }
    currentBlock.currentShapeIndex = 0;
    nextBlock = blocks[Math.floor(Math.random() * blocks.length)]; // 다음 블럭 생성
    drawNext(); // 작은 테이블 안에다가 다음에 생길 블럭을 미리 그려서 확인해보기
    currentTopLeft = [-1,3]; // 블럭의 생성은 원래 맨 위의 행이 아닌 그 다음의 행에 그려지도록 코드를 짜서 시작되는 부분의 위치를  한칸 위로 올림
    let isGameOver = false; // flag의 역할 false로 시작을 함으로써 처음에 멈추지 않게 만들기

    // slice(1)을 함으로써 2 x 3 블록으로 만들어 준다.
    // 추가 기능 : 게임을 해보니까 tetrisData[i][j+3] 이 자리에 닿아야 게임 오버  => 이 부분은 한번더 할때 맨 위층 전면에 해당하도록 만들어보기
    currentBlock.shape[0].slice(1).forEach((col,i) => {
        col.forEach((row,j) => {
            if(row && tetrisData[i][j+3]) {
                isGameOver = true;
            }
        });
    });

    currentBlock.shape[0].slice(1).forEach((col,i) => {
        col.forEach((row,j) => {
            if(row) {
              // 블럭이 만들어지는 위치를 지정해주는코드
                tetrisData[i][j+3] = currentBlock.numCode;
            }
        });
    });

    if(isGameOver) {
      clearInterval(int);
      draw(); // 게임이 끝나고 말고를 떠나 다시 블럭을 그려주기
      alert('종료');
    }
    else {
      draw();
    }
}

function checkRows() {
  const fullRows = [];
  tetrisData.forEach((col,i) => {
    let count = 0;
    col.forEach((row,j) => {
      if(row > 0) {
        count++;
      }
    });
    if(count == 10) {
      fullRows.push(i);
    }
  });
  const fullRowsCount = fullRows.length;
  tetrisData = tetrisData.filter((row,i) => !fullRows.includes(i));
  // 꽉찬 부분을 지워주는 코드

  for(let i = 0; i < fullRowsCount; i++) {
    tetrisData.unshift([0,0,0,0,0,0,0,0,0,0]);
  }
  // 이 부분은 꽉찬 블럭은 지워지고 가장 윗부분쪽에 새롭게 행을 만들어 주는 코드
  
  let score = parseInt(document.querySelector('#score').textContent);
  // 점수 변수 지정,  parseInt의 인자는 string이랑 radix인데 이는 의미없는 수 같음
  score += fullRowsCount ** 2;
  // 점수가 더해지는 원리는 지워지는 행들의 제곱수이다. ex) 3줄이 한번에 지워지면 한번에 9점이 오르는 방법
  document.querySelector('#score').textContent = String(score);
  // 점수를 밑에 표현해주는것
}

// 아래로 한칸 내리는 함수
function tick() {
  const nextTopLeft = [currentTopLeft[0] + 1, currentTopLeft[1]]; // 이 변수는 블럭의 생성지점을 위로 한칸 올려준거같은데 currentTopLeft[1]이거는 row의 인자를 의미하는거같은데
  const activeBlocks = [];
  let canGoDown = true;
  let currentBlockShape = currentBlock.shape[currentBlock.currentShapeIndex];
  for (let i = currentTopLeft[0]; i < currentTopLeft[0] + currentBlockShape.length; i++) { // 아래 블럭이 있으면
    if (i < 0 || i >= 20) continue;
    for (let j = currentTopLeft[1]; j < currentTopLeft[1] + currentBlockShape.length; j++) {
      console.log(i, j);
      if (activeBlock(tetrisData[i][j])) { // 현재 움직이는 블럭이면
        activeBlocks.push([i, j]);
        if (InvalidBlock(tetrisData[i + 1] && tetrisData[i + 1][j])) {
          // i + 1은 currentTopLeft[0] + 1 이렇게 한칸을 위로 올려줘서 그럼
          console.log('아래 블럭이 있다!', i, j, tetrisData[i][j], tetrisData[i + 1] && tetrisData[i + 1][j], JSON.parse(JSON.stringify(tetrisData)));
          canGoDown = false;
        }
      }
    }
  }
  if (!canGoDown) {
    activeBlocks.forEach((blocks) => {
      tetrisData[blocks[0]][blocks[1]] *= 10; // 10이 row의 길이를 의미하나..? 다른수로 바꾸니까 블럭이 그 이상의 열로 내려가면 사라짐 10 이상은 내려오면 블럭의 색이 바뀜/ 사라짐
    });
    checkRows(); // 지워질 줄 있나 확인
    generate(); // 새 블록 생성
    return false;
  } else if (canGoDown) {
    for (let i = tetrisData.length - 1; i >= 0; i--) {
      // 변수는 열의 위치를 나타내는것
      const col = tetrisData[i];
      col.forEach((row, j) => {
        // 조건은 블럭이 존재하며, 블럭의 위치가 10칸을 벗어나지 않았을때
        if (row < 10 && tetrisData[i + 1] && tetrisData[i + 1][j] < 10) {
          tetrisData[i + 1][j] = row;
          tetrisData[i][j] = 0;
          // 여기가 의미하는건 이제 새롭게 블럭이 생성되면서 행이 새롭게 만들어짐을 의미하는거
        }
      });
    }
    currentTopLeft = nextTopLeft; // 다음 tick때 한번 지나가고 나서의 일이니까 currenttopLeft 재 정비
    draw();
    return true;
  }
}

let int = setInterval(tick, 2000);
init();
generate();

// 멈추는건 클릭 이벤트로 해서 인터벌 리셋
document.querySelector('#stop').addEventListener('click', () => {
  clearInterval(int);
});

document.querySelector('#start').addEventListener('click', () => {
  if(int) { // 하고있는 도중에 누르는경우 -> 인터벌 리셋
    clearInterval(int)
  }
  else { // 멈춰 있는경우 다시 시작
    int = setInterval(tick, 2000);
  }
});

// document.querySelector('#mute').addEventListener('click', () => {
//   if(document.querySelector('#bgm').paused) {
//     document.querySelector('#bgm').play();
//   }
//   else {
//     document.querySelector('#bgm').pause();
//   }
// })

window.addEventListener('keydown', (e) => {
  switch(e.code) {
    case 'ArrowLeft': {
      const nextTopLeft = [currentTopLeft[0], currentTopLeft[1] - 1]; // 한칸 왼쪽을 의미
      let isMovable = true;
      let currentBlockShape = currentBlock.shape[currentBlock.currentShapeIndex];
      for(let i = currentTopLeft[0]; i < currentTopLeft[0] + currentBlockShape.length; i++) { // 조건은 도형이 생기는 지점의 열을 의미
        if(!isMovable) break;
        for(let j= currentTopLeft[1]; j < currentTopLeft[1] + currentBlockShape.length; j++) { // 조건은 도형이 생겼을때 2번째 열을 의미
          if(!tetrisData[i] || !tetrisData[i][j]) continue; // 데이터의 열이 아니거나 지정칸이 아니면 그 부분은 나오게끔 하기
          if(activeBlock(tetrisData[i][j]) && InvalidBlock(tetrisData[i] && tetrisData[i][j - 1])) {
            console.log(i, j, tetrisData[i][j], tetrisData[i][j-1]);
            isMovable = false; // 움직이는 블럭이 못움직이는 블럭을 만났을때 멈추게 만들기
          }
        }
      }
      console.log('left', 'isMovable', isMovable);
      if(isMovable) {
        // 움직일수있는 도형일때 현재 시작점의 왼쪽 끝 좌표를 지정
        currentTopLeft = nextTopLeft;
        tetrisData.forEach((col,i) => {
          for(let j = 0; j < col.length; j++) {
            const row = col[j]; // 행에 대해서 지정
            if(tetrisData[i][j - 1] === 0 && row < 10) { // tetrisData[i][j - 1] === 0 가장 왼쪽을 의미 => 가장 왼쪽이면서 행이 꽉차지 않았을때를 의미
              console.log(row, tetrisData[i][j - 1], i, j);
              tetrisData[i][j - 1] = row; // 끝임을 지정하는거
              tetrisData[i][j] = 0;
            }
          }
        })
        draw();
      }
      break;
    }
    case 'ArrowRight': {
      const nextTopLeft = [currentTopLeft[0], currentTopLeft[1] + 1];
      let isMovable = true;
      let currentBlockShape = currentBlock.shape[currentBlock.currentShapeIndex];
      for(let i = currentTopLeft[0]; i < currentTopLeft[0] + currentBlockShape.length; i++) {
        if(!isMovable) break;
        for(let j= currentTopLeft[1]; j < currentTopLeft[1] + currentBlockShape.length; j++) {
          if(!tetrisData[i] || !tetrisData[i][j]) continue;
          if(activeBlock(tetrisData[i][j]) && InvalidBlock(tetrisData[i] && tetrisData[i][j + 1])) {
            console.log(i, j);
            isMovable = false;
          }
        }
      }
      if(isMovable) {
        currentTopLeft = nextTopLeft;
        tetrisData.forEach((col,i) => {
          for(let j = col.length - 1; j >= 0 ; j--) {
            const row = col[j];
            if(tetrisData[i][j + 1] === 0 && row < 10) {
              tetrisData[i][j + 1] = row;
              tetrisData[i][j] = 0;
            }
          }
        })
        draw();
      }
      break;
    }
    case 'ArrowDown': { // 아래로 한칸 내리는 함수호출 ( tick )
      tick();
    }
  }
})

window.addEventListener('keyup', (e) => {
  switch (e.code) {
    case 'ArrowUp': { // 방향 전환
      let currentBlockShape = currentBlock.shape[currentBlock.currentShapeIndex];
      let isChangeable = true; // 블럭의 모양을 변하게 만들때 확인하는 flag이다.
      const nextShapeIndex = currentBlock.currentShapeIndex + 1 === currentBlock.shape.length // 삼항 연산자로 블럭의 모양 idx를 지정
        ? 0
        : currentBlock.currentShapeIndex + 1;
      const nextBlockShape = currentBlock.shape[nextShapeIndex];
      for (let i = currentTopLeft[0]; i < currentTopLeft[0] + currentBlockShape.length; i++) { // 돌린 이후 공간 체크
        if (!isChangeable) break;
        for (let j = currentTopLeft[1]; j < currentTopLeft[1] + currentBlockShape.length; j++) {
          if (!tetrisData[i]) continue;
          if (nextBlockShape[i - currentTopLeft[0]][j - currentTopLeft[1]] > 0 && InvalidBlock  (tetrisData[i] && tetrisData[i][j])) {
            console.log(i, j);
            isChangeable = false;
          }
        }
      }
      console.log('isChangeable', isChangeable);
      if (isChangeable) {
        console.log('isChangeable', JSON.parse(JSON.stringify(currentBlock)), nextBlockShape);
        while (currentTopLeft[0] < 0) {
          tick();
        }
        for (let i = currentTopLeft[0]; i < currentTopLeft[0] + currentBlockShape.length; i++) { // 돌린 이후 공간 체크
          for (let j = currentTopLeft[1]; j < currentTopLeft[1] + currentBlockShape.length; j++) {
            if (!tetrisData[i]) continue;
            let nextBlockShapeCell = nextBlockShape[i - currentTopLeft[0]][j - currentTopLeft[1]];
            if (nextBlockShapeCell > 0 && tetrisData[i][j] === 0) {
              // 다음 모양은 있는데 현재 칸이 없으면
              tetrisData[i][j] = currentBlock.numCode;
            } else if (nextBlockShapeCell === 0 && tetrisData[i][j] && tetrisData[i][j] < 10) {
              // 다음 모양은 없는데  현재 칸이 있으면
              tetrisData[i][j] = 0;
            }
          }
        }
        currentBlock.currentShapeIndex = nextShapeIndex;
      }
      draw();
      break;
    }
    case 'Space': // 한방에 쭉 떨구기
      while (tick()) {}
      break;
  }
});



