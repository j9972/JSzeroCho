var partner = {
    hero: document.querySelector('#rival-hero'),
    deck: document.querySelector('#rival-deck'),
    field: document.querySelector('#rival-cards'),
    cost: document.querySelector('#rival-cost'),
    deckData: [],
    heroData: [],
    fieldData: [],
    clicked: null,
    clickedData: null,
  };
  
var me = {
    hero: document.querySelector('#my-hero'),
    deck: document.querySelector('#my-deck'),
    field: document.querySelector('#my-cards'),
    cost: document.querySelector('#my-cost'),
    deckData: [],
    heroData: [],
    fieldData: [],
    clicked: null,
    clickedData: null,
};
// turn의 디폴트값이 false 인지 true인지 모르겠음
// -> true면 내턴, false면 상대턴
var turn = true;
var turnBtn = document.querySelector('#turn-btn');

// 문제점 29. 인자를 두지 않음
function fromDeckToField(data, myTurn) {
    // obj를 인자로 둬야하나? 아니
    var obj = myTurn? me : partner;
    // this 부분이 뭔지 모르겠음 -> obj
    var currentCostScore = Number(obj.cost.textContent);
    if(currentCostScore < data.cost) {
        return 'end';
    }
    // INFO 부분에 뭐가 들어가야하나? -> obj.deckData가 필요함
    var idx = obj.deckData.indexOf(data);
    // 문제점 30. obj로 연결시켜줘야함
    obj.deckData.splice(idx, 1);
    obj.fieldData.push(data);
    fieldDrawing(obj);
    deckDrawing(obj);
    data.field = true;
    obj.cost.textContent = currentCostScore - data.cost;
}

// 문제점 28. 이 함수 자체를 빼먹음
function makeScreenAgain(myScreen) {
    var obj = myScreen ? me : partner; // 조건 ? 참 : 거짓;
    fieldDrawing(obj);
    deckDrawing(obj);
    makingHeroAgain(obj);
  }

function makingHeroAgain(obj) {
    // 문제점 27. 인자를 제대로 안쓰고 카드돔 함수의 인자를 안씀
    obj.hero.innerHTML = '';
    cardDom(obj.heroData, obj.hero, true);
}

function fieldDrawing(obj) {
    obj.field.innerHTML = '';
    obj.fieldData.forEach((data) => {
        cardDom(data, obj.field);
    })
}

function deckDrawing(obj) {
    // 문제점 16. 인자사용 잘못, forEach문 연결을 잘못 시킴
    obj.deck.innerHTML = '';
    obj.deckData.forEach((data) => {
        // 문제점 17 forEach문 인자를 안넣음
        cardDom(data,obj.deck);
    })
}

// 문제점 18. 함수 인자를 뭐를 넣어야 할지 몰랐음 -> 이 또한 외울것이 아닌데.....
function turnAction(card,data,myTurn) {
    // 내턴 어떻게 표현?
    var ourTeam = myTurn ? me : partner;
    var partnerTeam = myTurn ? partner : me;
    // Parameters여기 뭐로 표현? -> card
    // 문제점 19. 인자 표시를 안하니까 뭘 넣어야 하는지 모름
    if(card.classList.contains('card-turnover')) {
        return;
    }
    // 여기 써있는 data는 인자로 있어야 할거같음 -> 맞음
    var partnerCard = myTurn? !data.mine : data.mine;
    // 문제점 20. 아군의 선택카드는 그냥 간단하게 표시하면 됨.
    if(partnerCard && ourTeam.clicked) {
        data.hp -= ourTeam.clicked.att;
        if(data.hp <= 0) {
            // INFO 부분에 뭐가 들어가야하나? 적군의 필드 데이터
            // 문제점 21. 내가 지금 무슨 카드를 고르는건지 뭔 코딩을 하는건지 몰라하는거같음 -> 게임에 대한 이해도 향상 필요
            var idx = partnerTeam.fieldData.indexOf(data);
            // 문제점 22. indexOf는 -1 이하는 에러라는걸 잘못이해함
            if( idx > -1) { // 쫄병죽음
                // Parameters여기 뭐로 표현? 적군 
                // 문제점 23. 내가 지금 무슨 코딩을 하는지 몰라함.
                partnerTeam.fieldData.splice(idx, 1);
            }
            // else 문이 아니라 else if 로 해야하는거 같은데 조건을 모르겠음
            else { // 영웅 죽음
                alert('승리');
                setting();
            }
        }
        else {
            // 문제점 24. 인자를 쓰지 않음
            makeScreenAgain(!myTurn);
            // Parameters여기 뭐로 표현? 아군이 선택한 카드
            // 문제점 24. 내가 지금 무슨 코딩을 하는지 몰라함.
            ourTeam.clicked.remove('card-selected');
            ourTeam.clicked.add('card-turnover')
            ourTeam.clicked = null;
            ourTeam.clickedData = null;
        }
    }
    else if(partnerCard) {
        return;
    }
    // data는 인자인 부분 같음
    if(data.field) {
        document.querySelectorAll('.card').forEach((card) => {
            card.classList.remove('card-selected')
        })
        // 문제점 25. 인자에 card 가 있었다는걸 알았으면 했을텐데, 인자를 몰랐던 것
        card.classList.add('card-selected');
        ourTeam.clicked = card;
        ourTeam.clickedData = data;
    }else {
        // 문제점 26. 인자를 제대로 못씀
        if(fromDeckToField(data, myTurn) !== 'end') {
            myTurn ? myDeckMaking(1) : partnerDeckMaking(1);
        }
    }
}

// 인자하나가 뭔지 모르겠음 -> data 
// 문제점 9. 인자를 알지 못함, 외울게 아닌데 외우려고 했던 거 같음
function cardDom(data ,dom, hero) {
    // 문제점 10. 복사해서 넣을 변수를 만들지 않고 함.
    var card = document.querySelector('.card-hidden .card').cloneNode(true);

    // 문제점 11. 복사해서 정보를 넣은 변수가 없어서 선언을 잘못함., textContent를 안쓰면 정보 어케 나타내냐 ㅡㅡ
    card.querySelector('.card-cost').textContent = data.cost;
    card.querySelector('.card-att').textContent = data.att;
    card.querySelector('.card-hp').textContent = data.hp;

    if(hero) {
        // cost를 안보이게 하는건데 앞에 어떻게 표현? -> querySelector써서 호출하고 해야함
        // 문제점 12. css 사용을 이상하게함. 그리고 none은 ' ' 이걸로 묶어줘야함
        card.querySelector('.card-cost').style.display = 'none';
        // 얘를 appendChild로 묶어줘야하는거 같은데 뭐로 묶는지 모르겠음
        var name = document.createElement('div');
        name.textContent = 'hero';
        // 문제점 13. 카드 변수를 설정을 안했어서 어떻게 appendChild매소드를 써야할지 몰랐다
        card.appendChild(name);
    }
    // dom 부분에 뭘 넣어야 할지를 모르겠음
    card.addEventListener('click', () => {
        // 문제점 14. 이벤트를 실행시키는곳을 잘못앎, 턴액션 함수 인자 안넣음
        turnAction(card, data, turn);
    });
    // 문제점 15. appendChild로 묶을 인자를 잘못생각함
    dom.appendChild(card);
}

// 체크할 상항 있음
function partnerDeckMaking(num) {
    for(let i = 0; i < num; i++) {
        // 체크 2. 이대로 실행이되면 false는 디폴트 값이다
        // 맞음.
        partner.deckData.push(cardFactory(false, false));
    }
    deckDrawing(partner);
}

function myDeckMaking(num) {
    // 문제점 6. i의 끝부분을 length를 달면 안되는데 달았다
    for(let i = 0; i < num; i++) {
        // 문제점 7. 덱은 영웅의 카드를 포함하지 않아야 함. 1번째인자가 true가 아닌 false가 맞음
        me.deckData.push(cardFactory(false, true));
    }
    // 문제점 8. 덱을 다시 그리는데 위치 잘못, 인자 안씀
    deckDrawing(me);
}

// 카드돔 인자쓰기. // 체크할 상항 있음
function makingPartnerHero() {
    // 체크 사항 2. 두번째 인자에 false값이 있어도 되는지 체크, 된다면 false 가 default 값이다.
    // false가 디폴트값임
    partner.heroData = cardFactory(true, false);
    // 여기 카드돔 인자들은 이따가
    // 문제점 5. 인자를 안씀
    cardDom();
}
// 카드돔 인자쓰기
function makingMyHero() {
    me.heroData = cardFactory(true, true);
    cardDom();
}

function Card(hero, Mycard) {
    if(hero) {
        this.att = Math.ceil(Math.random() * 2);
        this.hp = Math.ceil(Math.random() * 5) + 25;
        // 필드랑 영웅의 생성이 있어야 한다
        this.hero = true;
        this.field = true;
    }
    else {
        // floor가 아닌 ceil을 함으로써 0이 나오지 않게 하는것이다.
        this.att = Math.ceil(Math.random() * 5);
        // 1~5 floor였으면 0~4
        this.hp = Math.ceil(Math.random() * 5);
        // 문제4. cost는 랜덤값이 아닌 불변의 값으로 상대와 나의 cost를 같게 해야한다.
        this.cost = Math.floor((this.att + this.hp) / 2);
    }
    if(Mycard) {
        this.mine = true;
    }
}

function cardFactory(hero, Mycard) {
    return new Card(hero, Mycard);
}

function setting() {
    [partner, me].forEach((item) => {
        item.deckData = [],
        item.heroData = [],
        item.fieldData = [],
        item.clicked = null,
        item.clickedData = null
    });
    partnerDeckMaking(5);
    myDeckMaking(5);
    makingPartnerHero();
    makingMyHero();
    makeScreenAgain(false); 
    makeScreenAgain(true);
    // 문제3. false가 상대턴 true가 내턴 turn 부분에서 지정을 했음
}

turnBtn.addEventListener('click', () => {
    // 밑에 부분을 어떻게 표현할지 모르곘음 obj이걸 변수 선언으로 해야하는것인가? 
    //  -> 변수 선언으로 하고 함수 호출을 할때 인자로 사용 하기
    // 내턴을 어떻게 표현
    //  -> 맨위에 class호출할때 사용한 변수 사용
    var obj = turn? me : partner;

    // toggle 안에 뭘 써야 하나? -> turn을 뒤집어 줘야한다.
    document.querySelector('#rival').classList.toggle('turn');
    document.querySelector('#my').classList.toggle('turn');

    // 문제2. 함수호출에 인자를 넣지 않았음
    fieldDrawing(obj);
    makingHeroAgain(obj);

    turn = !turn;
    // 조건문에 내턴임을 알려야 함
    if(turn) {
        me.cost.textContent = 10;
    }
    else {
        partner.cost.textContent = 10;
    }
});

// 문제 1. 초기새팅을 호출하지 않았음
setting();