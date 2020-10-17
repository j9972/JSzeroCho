var rival_hero = document.getElementById('rival-hero');
var my_hero = document.getElementById('my-hero');
var rival_deck = document.getElementById('rival-deck');
var my_deck = document.getElementById('my-deck');
var rival_deck_data = [];
var my_deck_data = [];
var rival_hero_data;
var my_hero_data;

function makingRivalDeck(num) {
    for(var i = 0; i < num; i++) {
        rival_deck_data.push(cardFactory());
    }
    rival_deck_data.forEach((data) => {
        var card = document.querySelector('card-hidden .card').cloneNode(true);
        card.querySelector('card-cost').textContent = data.cost;
        card.querySelector('card-att').textContent = data.att;
        card.querySelector('card-hp').textContent = data.hp;
        rival_deck.appendChild(card);
    })
}

function makingMyDeck(num) {
    for(var i = 0; i < num; i++) {
        my_deck_data.push(cardFactory());
    }
    my_deck_data.forEach((data) => {
        var card = document.querySelector('card-hidden .card').cloneNode(true);
        card.querySelector('card-cost').textContent = data.cost;
        card.querySelector('card-att').textContent = data.att;
        card.querySelector('card-hp').textContent = data.hp;
        my_deck.appendChild(card);
    })
}

function makingRivalHero() {
    rival_hero_data = cardFactory();
}

function makingMyHero() {
    my_hero_data = cardFactory();
}

function Card(hero) {
    if(hero) {
        this.hp = Math.ceil(Math.random() * 5) + 25;
        this.att = Math.ceil(Math.random() * 5);
        this.cost = (this.att + this.hp) / 2;    
    } else {
        this.hp = Math.ceil(Math.random() * 5)
        ;
        this.att = Math.ceil(Math.random() * 5);
        this.cost = (this.att + this.hp) / 2; 
    }
}

function cardFactory() {
    return new Card();
}

function reset() {
    makingRivalDeck(5);
    makingMyDeck(5);
    makingRivalHero();
    makingMyHero();
}
reset();