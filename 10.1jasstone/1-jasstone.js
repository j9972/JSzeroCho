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
var turn = false;
var turnBtn = document.querySelector('#turn-btn');

function makingHeroAgain(hero) {
    hero.innerHTML = '';
    cardDom();
}

function fromDeckToField() {
    // obj를 인자로 둬야하나?
    var obj = 내턴? me : partner;
    // this 부분이 뭔지 모르겠음
    var currentCostScore = Number(this.cost.textContent);
    if(currentCostScore < data.cost) {
        return 'end';
    }
    // INFO 부분에 뭐가 들어가야하나?
    var idx = INFO.indexOf(data);
    deckData.splice(idx, 1);
    fieldData.push(data);
    필드다시그리기();
    덱다시그리기();
    data.field = true;
    obj.cost.textContent = currentCostScore - data.cost;
}


function turnAction() {
    // 내턴 어떻게 표현?
    var ourTeam = 내턴 ? me : partner;
    var partnerTeam = 내턴 ? partner : me;
    // Parameters여기 뭐로 표현?
    if(Parameters.classList.contains('card-turnover')) {
        return;
    }
    // 여기 써있는 data는 인자로 있어야 할거같음
    var partnerCard = 내턴? !data.mine : data.mine;
    if(partnerCard && ourTeam.card.clicked) {
        data.hp -= ourTeam.card.clicked.att;
        if(data.hp <= 0) {
            // INFO 부분에 뭐가 들어가야하나?
            var idx = INFO.indexOf(data);
            if( idx <= -1) { // 쫄병죽음
                // Parameters여기 뭐로 표현?
                Parameters.fieldData.splice(idx, 1);
            }
            // else 문이 아니라 else if 로 해야하는거 같은데 조건을 모르겠음
            else { // 영웅 죽음
                alert('승리');
                setting();
            }
        }
        else {
            화면다시그리기();
            // Parameters여기 뭐로 표현?
            Parameters.remove('card-selected');
            Parameters.add('card-turnover')
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
        obj.classList.add('card-selected');
        ourTeam.clicked = card;
        ourTeam.clickedData = data;
    }else {
        if(덱에서필드로(me, partner) !== 'end') {
            내턴 ? meDeckMaking(1) : partnerDeckMaking(1)
        }
    }
}

// 인자하나가 뭔지 모르겠음
function cardDom(hero,dom,) {
    document.querySelector('.card-hidden .card').cloneNode(true);
    this.att = document.querySelector('.card-att');
    this.hp = document.querySelector('.card-hp');
    this.cost = document.querySelector('.card-cost');
    
    // 얘를 appendChild로 묶어줘야하는거 같은데 뭐로 묶는지 모르겠음
    var name = document.createElement('div');
    name.textContent = 'hero';

    if(hero) {
        this.cost.style.display = none;
    }
    // dom 부분에 뭘 넣어야 할지를 모르겠음
    dom.addEventListener('click', () => {
        turnAction();
    })
    dom.appendChild()
}

function fieldDrawing(obj) {
    field.innerHTML = '';
    obj.forEach(() => {
        cardDom();
    })
}

function deckDrawing(obj) {
    deck.innerHTML = '';
    obj.forEach(() => {
        cardDom();
    })
}

function partnerDeckMaking(num) {
    for(let i = 0; i < num.length; i++) {
        partner.deckData.push(cardFactory(true, false));
        덱다시그리기();
    }
}

function partnerDeckMaking(num) {
    for(let i = 0; i < num.length; i++) {
        partner.deckData.push(cardFactory(true, true));
        덱다시그리기();
    }
}

function makingPartnerHero() {
    partner.heroData = cardFactory(true, false);
    cardDom();
}

function makingMyHero() {
    me.heroData = cardFactory(true, true);
    cardDom();
}

function Card(hero, Mycard) {
    if(hero) {
        this.att = Math.ceil(Math.random() * 2);
        this.hp = Math.ceil(Math.random() * 5) + 25;
        this.hero = true;
        this.field = true;
    }
    else {
        this.att = Math.ceil(Math.random() * 5);
        this.hp = Math.ceil(Math.random() * 5);
        this.cost = Math.floor(Math.random() * 10);
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
    상대덱생성(5);
    내덱생성(5);
    상대영웅생성();
    내영웅생성();
    화면그리기(상대);
    화면그리기(나);
}
// 내턴을 어떻게 표현했더라
turnBtn.addEventListener('click', (obj) => {
    // 밑에 부분을 어떻게 표현할지 모르곘음 obj이걸 변수 선언으로 해야하는것인가? / 내턴을 어떻게 표현
    obj = 내턴? me : partner;

    // toggle 안에 뭘 써야 하나?
    document.querySelector('#rival').classList.toggle('turn');
    document.querySelector('#my').classList.toggle('turn');

    필드다시그리기();
    영웅다시그리기();

    turn = !turn;
    // 조건문에 내턴임을 알려야 함
    if(turn) {
        me.cost.textContent = 10;
    }
    else {
        partner.cost.textContent = 10;
    }
})