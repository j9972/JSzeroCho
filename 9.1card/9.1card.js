var w = 4;
var h = 3;
var colors = ['red', 'red', 'orange', 'orange', 'green', 'green', 'yellow', 'yellow', 'white', 'white', 'pink', 'pink'];
var colorSub = colors.slice();
var color = [];
var flag;
var startTime;
var clickedCard = [];
var completedCard = [];

function shuffle() {
    for(var i = 0; colorSub.length > 0; i++) {
        color = color.concat(colorSub.splice(Math.floor(Math.random() * colorSub.length), 1)); // 배열의 요소가 랜덤으로 빠지면 그것을 새로운 배열 color에 넣는게 concat이다.
    }
}
shuffle();
console.log(color);

// 1. shuffle을 안치면 일단 color[i]가 undefine 
// 2. shuffle을 쳐도 그 다음 판에 color[i]가 undefine , shuffle()을 console에 넣으면 undefine이 뜸

// 3. card div의 원본이 계속 있어서 13개가 된다.
// 4. 원본은 클릭이 되지 않는다. 

function cardSetting(w,h) {
    flag = false;
    for(var i = 0; i < w * h ; i++) {
        const cd = document.getElementsByClassName('card')[0];
        const clone = cd.cloneNode(true);
        //console.log(cd,clone);
        console.log(color[i]); // -> undefined 나는 지점
        clone.getElementsByClassName('card-back')[0].style.backgroundColor = color[i];
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
                        if(clickedCard[0].getElementsByClassName('card-back')[0].style.backgroundColor === clickedCard[1].getElementsByClassName('card-back')[0].style.backgroundColor) {
                            completedCard.push(clickedCard[0]);
                            completedCard.push(clickedCard[1]);
                            clickedCard = [];
                            // 전부 고른 경우
                            if(completedCard.length == 12) {
                                setTimeout(() => {
                                    var endTime = new Date();
                                    alert('걸린시간은 :' +( endTime - startTime ) / 1000+ '초');
                                    console.log('걸린시간은 :' +( endTime - startTime ) / 1000+ '초');
                                    document.querySelector('.wrapper').innerHTML = '';
                                    startTime = null;
                                    completedCard = [];
                                    colorSub = colors.slice();
                                    color = [];
                                    cardSetting(w,h);
                                    shuffle();
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
cardSetting(w,h);
