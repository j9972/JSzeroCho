// 결과가 일단 alert도 나오면서 console창에 나오기 / 결과가 브라우저 화면에 나오기
// 카드의 개수를 12개가 아닌 16개로 늘림
var w = 4;
var h = 4;
var startTime;
var endTime;
var colors = ['red','red','yellow','yellow','purple','purple','black','black','pink','pink','green','green','aqua','aqua','gray','gray' ];
var colorSub = colors.slice();
var color = [];
var clicked = [];
var completed = [];
var flag;

function shuffle() {
    for(var i = 0; colorSub.length > 0; i++) {
        color = color.concat(colorSub.splice(Math.floor(Math.random () * colorSub.length), 1)[0]);
        console.log(color[i]);
    }
}

function cardSetting(w,h) {
    flag = false;
    for(let i = 0; i < w * h; i++) {
        const cd = document.querySelector('.card');
        const clone = cd.cloneNode(true);
        // 복사된 카드에 색을 넣어야 하는 부분
        clone.querySelector('.card-back').style.backgroundColor = color[i];
        document.body.appendChild(clone);

        (function(c) {
            clone.addEventListener('click', () => { 
                // TODO: 2장인지 보고 색이 같은지 보고 12장 다 채웠는지 보기
                if(flag && !completed.includes(c)) {
                    c.classList.toggle('flipped');
                    clicked.push(c);
                    if(clicked.length === 2) {
                        if(clicked[0].querySelector('.card-back').style.backgroundColor === clicked[1].querySelector('.card-back').style.backgroundColor) {
                            completed.push(clicked[0]);
                            completed.push(clicked[1]);
                            clicked = [];
                            if(completed.length === 16) {
                                setTimeout(() => {
                                    endTime = new Date();
                                    console.log((endTime - startTime) / 1000 + '초');
                                    alert((endTime - startTime) / 1000 + '초');
                                    document.querySelector('.wrapper').innerHTML = '';
                                    startTime = null;
                                    colorSub = colors.slice();
                                    completed = [];
                                    shuffle();
                                    cardSetting(w,h);
                                }, 1000);
                            }
                        }
                        else {
                            flag = false;
                            setTimeout(() => {
                                clicked[0].classList.remove('flipped');
                                clicked[1].classList.remove('flipped');
                                clicked = [];
                                flag = true;
                            }, 1000);
                        }
                    }
                }
            })
        })(clone);
        document.querySelector('.wrapper').appendChild(clone);
    }

    // 먼저 한장씩 카드들을 돌려서 외울 시간을 줘야 한다.
    document.querySelectorAll('.card').forEach((card, idx) => {
        setTimeout(() => {
            card.classList.add('flipped');
        }, 1000 + idx * 150);
    });

    // 5초 뒤에 카드들을 다시 뒤집어 줘야 한다.
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