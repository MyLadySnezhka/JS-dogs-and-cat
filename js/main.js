const elDog = document.querySelector('.dog');
const elPlayBoard = document.querySelector('.board');
const elHouse = document.querySelector('.house');
const elCat = document.querySelector('.cat');
const elHelloText = document.querySelector('.hello');
const elCountDogs = document.querySelector('select[class=countDogs]');
const elCountCats = document.querySelector('select[class=countCats]');
const elBtnGo = document.querySelector('button[name=btnPush]');
const gameOverText = document.querySelector('.atCat');
const gameOverOK = document.querySelector('.atHome');
const elGameOver = document.querySelector('.gameover');


let catID, catX, catY;
let countDogs, countCats;
let cats = [];
let dogs = [];
let htmlDogsArr = '';
let htmlCatsArr = '';
let itemX, itemY;
let houseX, houseY;
let X, Y, xNew, yNew;
let xLeft, yTop, xMid, yMid, xRight, yDown, xWidth, yHeight;
let itemPlayArr = [];

//розмір ігрового поля
const borderX = elPlayBoard.clientWidth;
const borderY = elPlayBoard.clientHeight;
//const borderY = window.innerHeight;
console.log('Поле:', borderX, borderY);

const randCoord = (itemLnk) => {
    let maxX = borderX - itemLnk.clientWidth;
    let maxY = borderY - itemLnk.clientHeight;
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

const renderStart = () => {
    elDog.style.left = '15%';
    elDog.style.top = '13vh';
    elHouse.style.left = '43%';
    elHouse.style.top = '10vh';
    elCat.style.left = '75%';
    elCat.style.top = '15vh';
}

const renderHouse = () => {
    elHouse.style.left = '0%';
    elHouse.style.top = '0vh';
    randCoord(elHouse);
    houseX = X;
    houseY = Y;
    const itemName = 'house';
    const itemX = X;
    const itemY = Y;
    itemPlayArr.push(itemName, itemX, itemY);
    // elHouse.style.left = `${houseX}px`; 
    // elHouse.style.top = `${houseY}px`;  
    _html = `<div class="house" style="left: ${houseX}px; top: ${houseY}px;"></div>`;
    elPlayBoard.insertAdjacentHTML('afterbegin', _html);
}

const renderDogs = () => {
    const htmlDogsArr = dogs.map((item) => {
        _html = `<div class="dog" style="left: ${item.dogX}px; top: ${item.dogY}px;"></div>`;
        return _html;
    }).join(' ');  
       
    elPlayBoard.insertAdjacentHTML('beforeend', htmlDogsArr);
    //elPlayBoard.innerHTML = htmlDogsArr;
};

const renderCats = () => {
    const htmlCatsArr = cats.map((item) => {
        _html = `<div class="cat" style="left: ${item.catX}px; top: ${item.catY}px;"></div>`;
        return _html;
    }).join(' ');
    
    elPlayBoard.insertAdjacentHTML('afterbegin', htmlCatsArr);
    //elPlayBoard.innerHTML = htmlCatsArr;
};

renderStart();

elCountDogs.addEventListener('change', (ev) => {
    dogs = [];
    countDogs = ev.target.value;
    for(let i=1; i<=countDogs; i=i+1) {
        randCoord(elDog);
        let dogX = X;
        let dogY = Y;
        let dogID = i;
        dogs.push({dogID, dogX, dogY});  
        const itemName = 'dog';
        const itemX = X;
        const itemY = Y;
    itemPlayArr.push(itemName, itemX, itemY);
    }
//    console.log('dog', dogs);
});

elCountCats.addEventListener('change', (ev) => {
    cats = [];                        
    countCats = ev.target.value;
    for(let j=1; j<=countCats; j=j+1) {
        randCoord(elCat);
        let catX = X;
        let catY = Y;
        let catID = j;

        cats.push({catID, catX, catY});
        // if ((cats[j].catX=cats[j-1].catX)&&(cats[j].catY=cats[j-1].catY)) {
        //     cats.push({catID, catX, catY});
        //     j = j+1};
        const itemName = 'cat';
        const itemX = X;
        const itemY = Y;
        itemPlayArr.push(itemName, itemX, itemY);
    }
    //console.log('cat', cats);
});

elBtnGo.addEventListener('click', () => {
    elHelloText.style.display = 'none'; 
    renderHouse(elHouse);  
    console.log('house', houseX, houseY, elHouse.style.left, elHouse.style.top);
    renderCats();  
    console.log('cat', cats);
    renderDogs();
    console.log('dog', dogs);
    //console.log(elPlayBoard);
    //console.log(itemPlayArr);
})

elPlayBoard.addEventListener('click', (ev) => {
    console.log(ev.target.className);
    //if(ev.target.className='dog') {
    if((ev.target.classList.value!='board')&&(ev.target.className!='house')&&(ev.target.className!='cat')) {
        xLeft = parseInt(ev.target.style.left);
        yTop = parseInt(ev.target.style.top);
        xWidth = parseInt(ev.target.clientWidth);
        yHeight = parseInt(ev.target.clientHeight);
        xRight = xLeft + xWidth;
        yDown = yTop + yHeight;
        xMid = xLeft + xWidth/2;
        yMid = yTop + yHeight/2;

        let mouseX = ev.pageX;
        let mouseY = ev.pageY;
                
        if((mouseX>xLeft)&&(mouseX<xMid)&&(mouseY>yTop)&&(mouseY<yMid)) {
            //console.log('верхний левый угол', xLeft, xMid, yTop, yMid);
            xNew = xLeft + xWidth/2;
            yNew = yTop + yHeight/2;
            //console.log('новое положение', xNew, yNew);
        } else if ((mouseX>xMid)&&(mouseX<xRight)&&(mouseY>yTop)&&(mouseY<yMid)) {
            //console.log('верхний правый угол');
            xNew = xLeft - xWidth/2;
            yNew = yTop + yHeight/2;
            //console.log('новое положение', xNew, yNew);
        } else if ((mouseX>xLeft)&&(mouseX<xMid)&&(mouseY>yMid)&&(mouseY<yDown)) {
            //console.log('нижний левый угол');
            xNew = xLeft + xWidth/2;
            yNew = yTop - yHeight/2;
            //console.log('новое положение', xNew, yNew);
        } else if ((mouseX>xMid)&&(mouseX<xRight)&&(mouseY>yMid)&&(mouseY<yDown)) {
            //console.log('нижний правый угол');
            xNew = xLeft - xWidth/2;
            yNew = yTop - yHeight/2;
            //console.log('новое положение', xNew, yNew);
        }

        //альтернатива для переміщення:
        //lnkItem.style.transform = `translate(${X}px, ${Y}px)`;}

        //перевірка, чи не вийшов за межі поля
        if ((xNew>=0)&&(xNew<=(borderX-xWidth))&&(yNew>=0)&&(yNew<=(borderY-yHeight))) {
            xLeft = xNew;
            yTop = yNew;
        } else {if(xNew<=0) {xLeft = 0};
               if(xNew>(borderX-xWidth)) {xLeft = borderX-xWidth};
               if(yNew<=0) {yTop = 0};
               if(yNew>borderY-yHeight) {yTop=borderY-yHeight};
            }  
            ev.target.style.left = `${xLeft}px`;
            ev.target.style.top = `${yTop}px`;

        //чи зайшов додому    
        if((xLeft>=houseX-50)&&(xLeft<=houseX+80)&&(yTop>=houseY-50)&&(yTop<=houseY+120)) {
            //elPlayBoard.innerHTML = `<span class="atHome">Вітаю, цуценя вдома!<br>Якщо хочеш зіграти ще, онови сторінку.</span>`;
            ev.target.style.display = 'none';
            countDogs = countDogs - 1;
            if (countDogs===0) {
                gameOverOK.classList.add('show');
                elGameOver.classList.add('shadow');
            }
        }; 
        
        //чи натрапив на кота
        cats.map ((item) => {
            if((xLeft>=item.catX-50)&&(xLeft<=item.catX+160)&&(yTop>=item.catY-50)&&(yTop<=item.catY+160)) {
                //elPlayBoard.innerHTML = `<span class="atCat">МЯУ!!!<br>Не треба ображати кицьку!!!<br><br>Якщо хочеш зіграти ще, онови сторінку.</span>`;
                gameOverText.classList.add('show');
                elGameOver.classList.add('shadow');
            }
        })
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


