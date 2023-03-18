const elDog = document.querySelector('.dog');
const elPlayBoard = document.querySelector('.board');
const elHouse = document.querySelector('.house');
const elCat = document.querySelector('.cat');
const elHelloText = document.querySelector('.hello');
const elCountDogs = document.querySelector('select[class=countDogs]');
const elCountCats = document.querySelector('select[class=countCats]');
const elBtnGo = document.querySelector('button[name=btnPush]');

let X, Y;
let countDogs, countCats;
let dogs = [];
let cats = [];
//let house, cat, dog = [];
let htmlDogsArr = '';
let htmlCatsArr = '';
let itemX, itemY;

//розмір ігрового поля
console.log('Поле:', elPlayBoard.clientHeight, elPlayBoard.clientWidth);

const randCoord = (itemLnk) => {
    let maxX = elPlayBoard.clientWidth - itemLnk.clientWidth;
    let maxY = elPlayBoard.clientHeight - itemLnk.clientHeight;
    X = Math.floor(Math.random()*maxX);
    Y = Math.floor(Math.random()*maxY);
}

//функція, щоб відмалювати об'єкт, який зустрічається на полі єдиний раз
const renderItem = (itemLnk) => {
    randCoord(itemLnk);
    console.log('house', X, Y);
    itemX = X;
    itemY = Y;
    itemLnk.style.left = `${X}px`;
    itemLnk.style.top = `${Y}px`;
}  

    // itemLnk.style.left = `${X}px`;          
    // itemLnk.style.top = `${Y}px`;
    //або можна ще так:
    //lnkItem.style.transform = `translate(${X}px, ${Y}px)`;}

const renderDogs = () => {
    const htmlDogsArr = dogs.map((item) => {
        _html = `<div class="dog" style="left: ${item.dogX}px; top: ${item.dogY}px;"></div>`;
        return _html;
    }).join(' ');  
       
    elPlayBoard.insertAdjacentHTML('afterbegin', htmlDogsArr);
    //elPlayBoard.innerHTML = htmlDogsArr;
};

const renderCats = () => {
    const htmlCatsArr = cats.map((item) => {
        _html = `<div class="cat" style="left: ${item.catX}px; top: ${item.catY}px;"></div>`;
        return _html;
    }).join(' ');
    
    elPlayBoard.insertAdjacentHTML('beforeend', htmlCatsArr);
    //elPlayBoard.innerHTML = htmlCatsArr;
};

elCountDogs.addEventListener('change', (ev) => {
    countDogs = ev.target.value;
    for(let i=1; i<=countDogs; i=i+1) {
        randCoord(elDog);
        let dogX = X;
        let dogY = Y;
        let dogID = i;
        dogs.push({dogID, dogX, dogY});  
    }
    console.log('dog', dogs);
});

elCountCats.addEventListener('change', (ev) => {
    countCats = ev.target.value;
    for(let i=1; i<=countCats; i=i+1) {
        randCoord(elCat);
        let catX = X;
        let catY = Y;
        let catID = i;
        cats.push({catID, catX, catY});
    }
    console.log('cat', cats);
});

elBtnGo.addEventListener('click', () => {
    
    renderItem(elHouse);
    renderCats();  
    renderDogs();
    elHelloText.style.display = 'none';
    
})

elPlayBoard.addEventListener('click', (ev) => {
    if(ev.target.classList.value != 'board') {
        
       console.log(ev.target.clientWidth);
    }
});



//const game = () => {
    // renderDogs(elDog);
    // if((X>=houseX-50)&&(X<=houseX+80)&&(Y>=houseY-50)&&(Y<=houseY+120)) {
    //     elHelloText.innerHTML = `<h1>Вітаю, цуценя вдома!</h1><h2>Якщо хочеш зіграти ще, онови сторінку.</h2>`;
    //     elDog.removeEventListener('click', game);
    // }
//}

// elDog.addEventListener('click', game);


