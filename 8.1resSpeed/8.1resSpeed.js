var Box = document.querySelector('#screen');
var startTime;
var endTime;
var timeOut;
var record = [];

//아쿠아 - 레드 - 초록
Box.addEventListener('click', () => {
    if(Box.classList.contains('waiting')) {
        Box.classList.remove('waiting');
        Box.classList.add('ready');
        Box.textContent = '초록색이 되면 클릭하세요';
        timeOut = setTimeout(() => {
            startTime = new Date();    
            Box.click();
        },Math.floor(Math.random() * 1000) + 2000);
    }
    else if(Box.classList.contains('ready')) {
        if(!startTime) {
            clearTimeout(timeOut);
            Box.classList.remove('ready');
            Box.classList.add('waiting');
            Box.textContent = '성급합니다 다시 하세요';
        } else {
            Box.classList.remove('ready');
            Box.classList.add('now');
            Box.textContent = '클릭하세요';
        }
    }
    else if(Box.classList.contains('now')) {
        endTime = new Date();
        console.log(endTime - startTime + 'ms');
        record.push(endTime - startTime + 'ms');
        startTime = null;
        endTime = null;
        Box.classList.remove('now');
        Box.classList.add('waiting');
        Box.textContent = '클릭해서 시작하세요.';
    }
});