// c와 다르게 두개이상의 for문을 쓸 필요가 없다
// ('*'.repeat(star).length) 이렇게 하면 12345 이렇게 사이즈를 나타낼 수 있다.

// 별이 점점 늘어나게 하는 반복문
// for( var star = 1; star <= 5; star++) {
//     console.log('*'.repeat(star));
// }

// 별이 점점 줄어들게 하는 반복문
// for( var star = 5; star >= 1; star--) {
//     console.log('*'.repeat(star));
// }

// 5개부터 찍히는 대신에 왼쪽 벽이 아닌 오른쪽 벽에 생기는 방법
// 별은 한개씩 줄고 공백이 하나씩 늘어나는 방법
// for (var star = 5; star >= 1; star --) {
//     console.log(' '.repeat(5 - star)+'*'.repeat(star))
// }

// 아래로 피라미드
// for (var star = 9; star >= 1; star -= 2) {
//     console.log(' '.repeat((9 - star) / 2)+'*'.repeat(star))
// }

// 피라미드
// for(var star = 1; star <= 5; star += 2) {
//     console.log(' '.repeat((5-star)/2)+'*'.repeat(star)+' '.repeat((5-star)/2))
// }

// 마름모
for(var star = 1; star <= 5; star += 2) {
    console.log(' '.repeat((5-star)/2)+'*'.repeat(star)+' '.repeat((5-star)/2))
}
