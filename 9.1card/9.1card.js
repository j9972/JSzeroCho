var w = 4;
var h = 3;
var colors = ['red', 'red', 'orange', 'orange', 'green', 'green', 'yellow', 'yellow', 'purple', 'purple', 'pink', 'pink'];
// slice 함수는 배열의 어느 부분을 짤라서 보여주거나 , 인자가 없다면 전체를 보여주는 것이다.
var colorSub = colors.slice();
var color = [];
var flag;
var startTime;
var clickedCard = [];
var completedCard = [];

// 문제점 -> 첫번째 할때는 잘되는데 두번째 할때 카드의 색이 없다. 해결

function shuffle() {
    for(var i = 0; colorSub.length > 0; i++) {
        color = color.concat(colorSub.splice(Math.floor(Math.random() * colorSub.length), 1)[0]);
         // 배열의 요소가 랜덤으로 빠지면 그것을 새로운 배열 color에 넣는게 concat이다.
         console.log(color); // 이거는 그냥 빈 배열인데 for문으로 하나씩 색이 들어간다.
    }
}

function cardSetting(w,h) {
    flag = false;
    for(var i = 0; i < w * h ; i++) {
        const cd = document.querySelector('.card');
        const clone = cd.cloneNode(true);
        //console.log(cd,clone);
        console.log(color[i]); // -> undefined 나는 지점 / 여기서 선택된 색이 나오는것이다,
        clone.querySelector('.card-back').style.backgroundColor = color[i];
        document.body.appendChild(clone);
        
        (function (c) {
            // 클릭했을때 발생하는거 
            clone.addEventListener('click', () => {
                // 클린했을때 flag가 참이고 완성된 카드에 없는 색일때 가능
                if(flag && !completedCard.includes(c)) {
                    c.classList.toggle('flipped');
                    clickedCard.push(c);
                    if(clickedCard.length === 2) {
                        // 색이 맞는경우
                        if(clickedCard[0].querySelector('.card-back').style.backgroundColor === clickedCard[1].querySelector('.card-back').style.backgroundColor) {
                            completedCard.push(clickedCard[0]);
                            completedCard.push(clickedCard[1]);
                            clickedCard = [];
                            
                            // 전부 고른 경우
                            if(completedCard.length == 12) {
                                setTimeout(() => {
                                    var endTime = new Date();
                                    alert('걸린시간은 :' + ( endTime - startTime ) / 1000+ '초');
                                    console.log('걸린시간은 :' + ( endTime - startTime ) / 1000+ '초');
                                    document.querySelector('.wrapper').innerHTML = '';
                                    colorSub = colors.slice();
                                    completedCard = [];
                                    color = [];
                                    startTime = null;
                                    shuffle();
                                    cardSetting(w,h);
                                }, 1000);
                            }
                        }
                        // 색이 다른 경우
                        else {
                            flag = false;
                            setTimeout(() => {
                                flag = true;
                                clickedCard[0].classList.remove('flipped');
                                clickedCard[1].classList.remove('flipped');
                                clickedCard = [];
                            }, 1000);
                        }
                    }
                }
            });
        })(clone);
        document.querySelector('.wrapper').appendChild(clone);
    }
    
    document.querySelectorAll('.card').forEach( (card, idx) => {
        setTimeout(() => {
            card.classList.add('flipped');
        }, 1000 + 100 * idx);
    });

    setTimeout(() => {
        document.querySelectorAll('.card').forEach((card, idx) => {
            card.classList.remove('flipped');
        });
        flag = true;
        startTime = new Date();
    }, 5000);
}
shuffle();
cardSetting(w,h);
