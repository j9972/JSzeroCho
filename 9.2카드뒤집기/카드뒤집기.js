// 결과가 일단 alert도 나오면서 console창에 나오기 / 결과가 브라우저 화면에 나오기
var w = 4;
var h = 3;
var startTime;
var endTime;
var colors = ['red','red','yellow','yellow','purple','purple','black','black','pink','pink','green','green' ];
var colorSub = colors.slice();
var color = [];
var clicked = [];
var completed = [];
var flag;

// function shuffle() {
//     for(var i = 0; colorSub.length > 0; i++) {
//         color = colors.concat(colors.splice(Math.floor(Math.random () * colorSub.length), 1)[0]);
//         console.log(color);
//     }
// }

function cardSetting(w,h) {
    flag = false;
    for(let i = 0; i < w * h; i++) {
        const cd = document.querySelector('.card');
        const clone = cd.cloneNode(true);
        // 복사된 카드에 색을 넣어야 하는 부분
        clone.querySelector('.card-back').style.backgroundColor = color[i];
        document.body.appendChild(clone);

        (function(c) {
            clone.addEventListener('click', (c) => { 
                // TODO: 2장인지 보고 색이 같은지 보고 12장 다 채웠는지 보기
                if(flag && !completed.includes(c)) {
                    c.classList.toggle('flipped');
                    completed.push(clicked);
                    if(clicked === 2) {
                        if(clicked[0].style.backgroundColor === clicked[1].style.backgroundColor) {
                            completed.push(clicked[0]);
                            completed.push(clicked[1]);
                            clicked = [];
                            if(completed.length === 12) {
                                setTimeout(() => {
                                    endTime = new Date();
                                    console.log((endTime - startTime) / 1000 + 'ms');
                                    alert((endTime - startTime) / 1000 + 'ms');
                                    startTime = null;
                                    color = [];
                                    clicked = [];
                                    completed = [];
                                }, 1000);
                            }
                        }
                        else {
                            c.classList.remove('flipped');
                        }
                    }
                }
            })
        })(clone);
        document.querySelector('.wrapper').appendChild(clone);
    }

    document.querySelectorAll('.card').forEach((card, idx) => {
        setTimeout(() => {
            card.classList.add('flipped');
        }, 1000 + idx * 100);
    });

    setTimeout(() => {
        document.querySelectorAll('.card').forEach((card, idx) => {
            card.classList.remove('flipped');
        })
        flag = true;
        startTime = new Date();
    },5000);
}

shuffle();
cardSetting(w,h)