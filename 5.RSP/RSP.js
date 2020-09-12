var 이미지좌표 = 0;
var 가위바위보 = {
    바위: '0', 
    가위: '-142px',
    보: '-284px',
};
    // 많은 언어를 지원하고 싶으면 ['0', '바위', 'rock']
    // 또 다른 방법은 객첼ㄹ 하나 더 써도 된다. 
    // 바위 = {
    //     한국어: '바위',
    //     영어: 'rock',    
    //     값: '0'
    // }

    // Object.entries(객체) 롤 객체를 배열로 만들수있다
    // find는 말 그대로 찾는건데 ()안에 함수가 들어온다 
    //-> find 도 반복문이지만 원하는것을 찾으면 true로 멈춘다 
function 컴퓨터의선택(이미지좌표) {
    return Object.entries(가위바위보).find((v) => {
        return v[1] === 이미지좌표;
    })[0];
}
// 배열.find는 반복문이지만 , return이 true면 멈춘다.
// 1차원 배열은 indexOf를 쓰고 2차원 배열은 find나 findIndex를 이다.

var 인터벌;
function 인터벌메이커() {
    인터벌 = setInterval(() =>  {
        if( 이미지좌표 === 가위바위보.바위) {
            이미지좌표 = 가위바위보.가위;
        } else if (이미지좌표 === 가위바위보.가위) {
            이미지좌표 = 가위바위보.보;
        } else {
            이미지좌표 = 가위바위보.바위;     
        }
        document.querySelector('#computer').style.background = 
        'url(https://en.pimg.jp/023/182/267/1/23182267.jpg)' + 이미지좌표 + ' 0';
    }, 100);
}

인터벌메이커();

var 점수표 = {
    가위: 1,
    바위: 0,
    보: -1,
  };

document.querySelectorAll('.btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        clearInterval(인터벌); // setInterval 중지
        setTimeout(function() {
            인터벌메이커();
        }, 1000);
        var 나의선택 = this.textContent;
        console.log(나의선택);
        var 나의점수 = 점수표[나의선택];
        console.log(나의점수);
        var 컴퓨터점수 = 점수표[컴퓨터의선택(이미지좌표)];
        var 점수차 = 나의점수 - 컴퓨터점수;
        if (점수차 === 0) {
            console.log('비겼습니다');
        } else if ([-1, 2].includes(점수차)) {
            console.log('이겼습니다!!');
        } else {
            console.log('졌습니다 ㅠㅠ.');
        }
    });
});

var 시작값 = 3;
var 인터벌2 = setInterval(function() {
  if (시작값 === 0) {
    console.log('종료!!!');
    return clearInterval(인터벌2);
  }
  console.log(시작값);
  시작값 -= 1;
}, 1000);

