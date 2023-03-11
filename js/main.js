const elDog = document.querySelector('.dog');
const elPlayBoard = document.querySelector('.board');
const elHouse = document.querySelector('.house');
const elCat = document.querySelector('.cat');
const elHelloText = document.querySelector('.hello');
const elCountDogs = document.querySelector('select[class=countDogs]');

let X, Y;
let countDogs;
let dogs = [];

//розмір ігрового поля
console.log('Поле:', elPlayBoard.clientHeight, elPlayBoard.clientWidth);

const randCoord = (itemLnk) => {
    let maxX = elPlayBoard.clientWidth - itemLnk.clientWidth;
    let maxY = elPlayBoard.clientHeight - itemLnk.clientHeight;
    X = Math.floor(Math.random()*maxX);
    Y = Math.floor(Math.random()*maxY);
}

const renderItem = (itemLnk) => {
    randCoord(itemLnk);
    itemLnk.style.left = `${X}px`;
    itemLnk.style.top = `${Y}px`;
}

const renderDogs = (itemLnk) => {
    randCoord(itemLnk);
    itemLnk.style.left = `${X}px`;          
    itemLnk.style.top = `${Y}px`;
    //або можна ще так:
    //lnkItem.style.transform = `translate(${X}px, ${Y}px)`;
}

renderItem(elHouse);
renderItem(elCat);

elCountDogs.addEventListener('change', (ev) => {
    countDogs = ev.target.value;
    for(let i=1; i<=countDogs; i=i+1) {
        renderItem(elDog);
        console.log(i, elDog);
    }
});

// let _html = elPlayBoard.innerHTML;

// const renderArrayDogs = (countDogs) => {
//     for( let i=1; i<=countDogs; i=i+1) {
//         renderDogs(elDog);
//         dogs.push({X, Y});
//         console.log(dogs);
//         _html = _html + '<div class="dog"></div>';
//     }
//     elPlayBoard.innerHTML = _html;
// }



const game = () => {
    // renderDogs(elDog);
    // if((X>=houseX-50)&&(X<=houseX+80)&&(Y>=houseY-50)&&(Y<=houseY+120)) {
    //     elHelloText.innerHTML = `<h1>Вітаю, цуценя вдома!</h1><h2>Якщо хочеш зіграти ще, онови сторінку.</h2>`;
    //     elDog.removeEventListener('click', game);
    // }
}

elDog.addEventListener('click', game);


