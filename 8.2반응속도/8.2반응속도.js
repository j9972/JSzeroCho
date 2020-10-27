const box = document.querySelector('#screen');
const res = document.querySelector('#result');
let startingTime;
let endingTime;


box.addEventListener('click', () => {
    let recording = [];
    let dateTime;
    if(box.classList.contains('waiting')) {
        box.classList.remove('waiting');
        box.classList.add('ready');
        box.textContent = '초록색이 되면 클릭하세요';
        // setTimeout을 이용한 시작과 끝의 시점을 체크 해볼 수 있다.
        dateTime = setTimeout(() => {
            startingTime = new Date();
            box.click();
            console.log(startingTime);
        }, Math.floor(Math.random() * 1000) + 2000);
    }
    else if (box.classList.contains('ready')) {
        if(!startingTime) {
            clearTimeout(dateTime);
            box.classList.remove('ready');
            box.classList.add('waiting');
            box.textContent = '성급했어요.';
        }
        else {
            box.classList.remove('ready');
            box.classList.add('now');
            box.textContent = '클릭하세요';
        }
    }
    else if(box.classList.contains('now')) {
        endingTime = new Date();
        console.log(endingTime - startingTime + 'ms');
        // 기록을 저장하는 방법은 push매소드를 사용하면 된다.
        recording.push(endingTime - startingTime + 'ms');
        res.textContent = endingTime - startingTime + 'ms';
        // 여 밑부분이 초기화 하는 방법이다.
        startingTime = null;
        endingTime = null;
        box.classList.remove('now');
        box.classList.add('waiting');
        box.textContent = '클릭해서 다시 시작하세여';
    }
});