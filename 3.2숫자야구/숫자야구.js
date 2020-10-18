//var numberSub;
let numberArr;

function randomNumbering() {
    const numberSub = [0,1,2,3,4,5,6,7,8,9];
    numberArr = [];
    for(var i = 0; i < 4; i++) {
        var moved = numberSub.splice(Math.floor(Math.random() * (9-i)), 1)[0];
        numberArr.push(moved);
    }
    console.log(numberArr);
}

randomNumbering();

const preStatus = document.querySelector('#presentStatus');
const forBox = document.querySelector('#Box');
const inBox = document.querySelector('#inputBox');

preStatus.textContent ='0을 포함해 9까지 숫자 중에 4개를 적으세요';


let wrong = 0;
forBox.addEventListener('submit', (e) => {
    e.preventDefault();
    const ans = inBox.value;
    console.log(ans);
    // 한번에 맞는 경우
    if(ans === numberArr.join('')) {
        preStatus.textContent = 'Home Run';
        inBox.value = '';
        inBox.focus();
        randomNumbering();
    }
    // 틀리는 경우
    else {
        //wrong++;
        // 10번안에 못맞추는경우
        if( wrong > 10 ) {
            preStatus.textContent = '시도 횟수가 10번을 넘겼습니다. 정답은' + numberArr.join(',') + '입니다';
            inBox.value = '';
            inBox.focus();
            randomNumbering();
            wrong = 0;
        }
        // 10번안에 맞추는 경우 strike랑 ball로 나누기
        else {
            const ansArr = ans.split('');
            let strike = 0;
            let ball = 0;

            const set = new Set(ansArr);
            if(ansArr.length !== set.size) {
                preStatus.textContent = '동일한 숫자를 쳤습니다. 다시쳐주세요.';
                inBox.value = '';
                inBox.focus();
                return;
            }

            // if(ansArr[0]===ansArr[1] || ansArr[0]===ansArr[2] || ansArr[0]===ansArr[3] ||
            //     ansArr[1]===ansArr[2] || ansArr[1]===ansArr[3] || ansArr[2]===ansArr[3]) {
            //     preStatus.textContent = '동일한 숫자를 쳤습니다. 다시쳐주세요.';
            //     inBox.value = '';
            //     inBox.focus();
            //     return;
            // }

            wrong++;
            console.log(wrong);
            //스트라이크
            for(var i = 0; i < 4; i++) {
                if(Number(ansArr[i]) === numberArr[i]) {
                    strike++;
                }
                // 볼
                else if (numberArr.indexOf(Number(ansArr[i])) > -1) {
                    ball++;
                }
            }
            console.log('strike',strike,'ball' , ball);
            preStatus.textContent = strike + '스트라이크' + ball + '볼입니다.'
            inBox.value = '';
            inBox.focus();
        }
    }
})