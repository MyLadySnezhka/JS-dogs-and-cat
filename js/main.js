const elDog = document.querySelector('.dog');
const elPlayBoard = document.querySelector('.board');
const elHouse = document.querySelector('.house');
const elCat = document.querySelector('.cat');
const elHelloText = document.querySelector('.hello');
const elCountDogs = document.querySelector('select[class=countDogs]');
const elCountCats = document.querySelector('select[class=countCats]');
const elBtnGo = document.querySelector('button[name=btnPush]');

let X, Y;
let catID, catX, catY;
let countDogs, countCats;
let cats = [{catID, catX, catY}];
let dogs = [];
//let house, cat, dog = [];
let htmlDogsArr = '';
let htmlCatsArr = '';
let itemX, itemY;
let houseX, houseY;

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
    console.log('item rand', X, Y);
    itemX = X;
    itemY = Y;
    itemLnk.style.left = `${X}px`;
    itemLnk.style.top = `${Y}px`;
}

const renderHouse = () => {
    randCoord(elHouse);
    console.log('House', X, Y);
    houseX = X;
    houseY = Y;
    elHouse.style.left = `${X}px`;
    elHouse.style.top = `${Y}px`;
}

const renderStart = () => {
    elDog.style.left = '15%';
    elDog.style.top = '50vh';
    elHouse.style.left = '40%';
    elHouse.style.top = '50vh';
    elCat.style.left = '75%';
    elCat.style.top = '50vh';
}

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

renderStart();

elCountDogs.addEventListener('change', (ev) => {
    i = 1;
    dogs = [];
    countDogs = ev.target.value;
    for(let i=1; i<countDogs; i=i+1) {
        randCoord(elDog);
        let dogX = X;
        let dogY = Y;
        let dogID = i;
        dogs.push({dogID, dogX, dogY});  
    }
    console.log('dog', dogs);
});

elCountCats.addEventListener('change', (ev) => {
    j = 1;
    cats = [];
    // cats[0].catX = elCat.style.left;
    // cats[0].catY = elCat.style.top;
    countCats = ev.target.value;
    for(let j=1; j<countCats; ) {
        randCoord(elCat);
        let catX = X;
        let catY = Y;
        let catID = j;
        if ((cats[j].catX!=cats[j-1].catX)&&(cats[j].catY!=cats[j-1].catY)) {
            cats.push({catID, catX, catY})
            j = j+1};
    }
    console.log('cat', cats);
});

elBtnGo.addEventListener('click', () => {
    
    renderHouse();
    renderCats();  
    renderDogs();
    elHelloText.style.display = 'none';
    
})

//альтернатива для переміщення:
//lnkItem.style.transform = `translate(${X}px, ${Y}px)`;}

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


