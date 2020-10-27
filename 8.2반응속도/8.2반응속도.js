var box = document.querySelector('#screen');
var res = document.querySelector('#result');
var startingTime;
var endingTime;
var dateTime;
var recording = [];

box.addEventListener('click', () => {
    if(box.classList.contains('waiting')) {
        box.classList.remove('waiting');
        box.classList.add('ready');
        box.textContent = '초록색이 되면 클릭하세요';
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
        recording.push(endingTime - startingTime + 'ms');
        res.textContent = endingTime - startingTime + 'ms';
        startingTime = null;
        endingTime = null;
        box.classList.remove('now');
        box.classList.add('waiting');
        box.textContent = '클릭해서 다시 시작하세여';
    }
});