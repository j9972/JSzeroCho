var tetris = document.querySelector('#tetris');
var tetrisData = [];
var currentBlock;
var nextBlock;
var currentTopLeft = [0, 3]; // 도형이 시작되는 지점
var blocks = [
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
const InvalidBlock = value => (value === undefined && value > 10);

function init() {
    const fragment = document.createDocumentFragment();
    [...Array(20).fill()].forEach((col,i) => {
        const tr = document.createElement('tr');
        fragment.appendChild(tr);
        [...Array(10).fill()].forEach((row,j) => {
            const td = document.createElement('td');
            tr.appendChild(td);
        });
        // 실수 1. fill() 인자에 0을 넣지 않았고 테트리스 데이터에 column을 push를 해야하는데 appendChild를 함
        const column = Array(10).fill(0);
        tetrisData.push(column);
    })
    tetris.appendChild(fragment);
}

// 문제 1
function draw() {
    tetris.forEach((col,i) => {
        col.forEach((row,j) => {
            if(row > 0) { // 문제 1. 뒷 부분 어떻게 색을 넣나?
                tetris.children[i].children[j].className = tetrisData[i][j] >= 10 ? [tetrisData[i][j] / 10 - 1] : [tetrisData[i][j] - 1];
            } 
        })
    })
}

// 문제2. 
function drawNext() {
    const nextTable = document.querySelector('.next-table');
    nextTable.querySelectorAll('tr').forEach((col, i) => {
        Array.from(col.children).forEach((row,j) => {
            if(nextBlock.shape[0][i] && nextBlock.shape[0][i][j] > 0) {
                nextTable.querySelectorAll('tr')[i].children[j].className = colors[nextBlock.numCode - 1];
            }
            else {
                nextTable.querySelectorAll('tr')[i].children[j].className = 'white';
            }
        })
    })
}

function generate() {
    if(!currentBlock) {
        currentBlock = blocks[Math.floor(Math.random() * blocks.length)];
    }
    else {
        currentBlock = nextBlock;
    }
    currentBlock.currentShapeIndex = 0;
    nextBlock = blocks[Math.floor(Math.random() * blocks.length)];
    drawNext();
    currentTopLeft = [-1,3];
    let isGameOver = false;

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
                tetrisData[i][j+3] = currentBlock.numCode;
            }
        });
    });

    if(isGameOver) {
        clearInterval(int);
        draw();
        alert('종료');
    }
    else {
        draw();
    }
}

let int = setInterval(tick, 2000);
init();
generate();