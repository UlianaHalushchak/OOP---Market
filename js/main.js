let arrayOfProducts = [];
let arrayOfUserBasket = [];

function productItem(id, name, place, weigh, price, img) {
    this.id    = id;
    this.name  = name;
    this.place = place;
    this.weigh = weigh;
    this.price = price;
    this.img   = img;
}

function addProductItem(id, name, place, weigh, price, img) {
        var product = new productItem(id, name, place, weigh, price, img);
        arrayOfProducts.push(product);
    }

initProductItems();


function initProductItems() {
    addProductItem(1, "Apple",       "fruit",          100, 1.2, "img/fruits/apple.png");
    addProductItem(2, "Lemon",       "fruit",          100, 0.8, "img/fruits/lemon.png");
    addProductItem(3, "Orange",      "fruit",          100, 2.0, "img/fruits/orange.png");
    addProductItem(4, "Eggplant",    "vegetables",     100, 1.8, "img/vegetables/eggplant.png");
    addProductItem(5, "Onion",       "vegetables",     100, 0.8, "img/vegetables/onion.png");
    addProductItem(6, "Green beans", "vegetables",     100, 0.5, "img/vegetables/green-beans.png");
    addProductItem(7, "Milk",        "dairy products", 100, 1.9, "img/dairy-products/milk.png");
    addProductItem(8, "Cheese",      "dairy products", 100, 2.3, "img/dairy-products/cheese.png");
    addProductItem(9, "Butter",      "dairy products", 100, 1.9, "img/dairy-products/butter.png");
    addProductItem(10, "Cookie",     "baking",         100, 1.0, "img/baking/cookie.png");
    addProductItem(11, "Doughnut",   "baking",         100, 1.5, "img/baking/doughnut.png");
    addProductItem(12, "Cake",       "baking",         100, 2.5, "img/baking/cake.png");
}

renderProductItems();

function renderProductItems() {

    for (let i = 0; i < arrayOfProducts.length; i++) {
        let textId    = arrayOfProducts[i].id;
        let textWeigh = arrayOfProducts[i].weigh;
        let textImg   = arrayOfProducts[i].img;

        let textName  = arrayOfProducts[i].name;
        let textPrice = arrayOfProducts[i].price;
        let textPlace = arrayOfProducts[i].place;


        listOfItems(textId, textName, textWeigh, textPrice, textPlace, textImg);
    }
}

function listOfItems(textId, textName, textWeigh, textPrice, textPlace, textImg) {
    let content = document.getElementById('product-content');

    let div = document.createElement('div');
    let img = document.createElement('img');


    img.setAttribute('src', textImg);
    img.setAttribute('width', '120px');
    img.setAttribute('alt', textImg);

    div.setAttribute('id', textId);
    div.setAttribute('class', 'item');

    let divName = document.createElement('div');
    let divWeigh = document.createElement('div');
    let divPrice = document.createElement('div');
    let divPlace = document.createElement('div');
    let divImg = document.createElement('div');

    let inputTypeNumber = document.createElement('input');
    inputTypeNumber.setAttribute('type', 'number')
    inputTypeNumber.setAttribute('value', textWeigh)

    divName.setAttribute('class', 'product-name');
    divWeigh.setAttribute('class', 'product-weight');
    divPrice.setAttribute('class', 'product-price');
    divPlace.setAttribute('class', 'product-place');
    divImg.setAttribute('class', 'product-img');

    textName = document.createTextNode(textName);
    textPrice = document.createTextNode(textPrice + "$");
    textPlace =  document.createTextNode(textPlace);

    divName.appendChild(textName);
    divWeigh.appendChild(inputTypeNumber);
    divPrice.appendChild(textPrice);
    divPlace.appendChild(textPlace);
    divImg.appendChild(img);

    div.appendChild(divName);
    div.appendChild(divPlace);
    div.appendChild(divImg);
    div.appendChild(divPrice);
    div.appendChild(divWeigh);


    let buyButton = renderButton('Buy', 'buy-button')
    let weighButton = renderButton('Weigh', 'weigh-button')

    div.appendChild(buyButton);
    div.appendChild(weighButton);

    return content.appendChild(div);
}

eventToClickBuyButton();

function renderButton(textNode, cssClassName) {
    let button = document.createElement('button');
    let text = document.createTextNode(textNode);
    button.setAttribute('class', 'button-template ' + cssClassName);

    button.appendChild(text);

    return button;
}

function eventToClickBuyButton() {
    let buyButtons = document.getElementsByClassName('buy-button');
    let weighButtons = document.getElementsByClassName('weigh-button');

    for (let i = 0; i < buyButtons.length; i++) {
        buyButtons[i].onclick = onButtonClick;
    }

    for (let i = 0; i < weighButtons.length; i++) {
        weighButtons[i].onclick = onButtonClick;
    }
}

function onButtonClick() {
    let button = this;
    let parent = button.parentElement;
    let child = parent.childNodes;
    let buttonClassName = button.className;

    let classSelectorName = 'product-name';
    let classSelectorPrice = 'product-price';
    let classSelectorWeigh = 'product-weight';

    let nameOfIdProduct = null;
    let priceOfIdProduct = null;
    let weighOfIdProduct = null;

    let maxTotal = 15;

    for (let i = 0; i < child.length; i++) {
        if (child[i].className == classSelectorName) {
            nameOfIdProduct = child[i].textContent;
        }
    }

    for (let i = 0; i < child.length; i++) {
        if (child[i].className == classSelectorPrice) {
            priceOfIdProduct = parseFloat(child[i].textContent).toFixed(1);
        }
    }

    for (let i = 0; i < child.length; i++) {
        if (child[i].className == classSelectorWeigh) {
            weighOfIdProduct = parseFloat(child[i].firstChild.value).toFixed(1);
        }
    }


    let resultWeigh = userPrice(priceOfIdProduct, weighOfIdProduct);
    let text = nameOfIdProduct +
                "\nWeigh are: " + weighOfIdProduct +
                "\nPrice: " + resultWeigh + "$";

    if (buttonClassName == "button-template weigh-button") {
        alert(text)
    } else {
        if (arrayOfUserBasket.length >= maxTotal) {
            alert("Sorry, limit of basket are 15 items");
        } else {
            userBasket(nameOfIdProduct, priceOfIdProduct, weighOfIdProduct);
        }
    }
}

function userBasket(name, price, weigh) {
    let ul = document.getElementById('user-items');
    let li = document.createElement('li');
    let strongPrice = document.createElement('strong');
    let strongName = document.createElement('strong');

    let resultPrice = userPrice(price, weigh);

    arrayOfUserBasket.push(resultPrice);
    totalPrice(arrayOfUserBasket);

    resultPrice = document.createTextNode(resultPrice + "$");


    name = document.createTextNode(name + " ")
    price = document.createTextNode(price + "$ ")
    weigh = document.createTextNode(weigh + "g are ")

    strongPrice.appendChild(resultPrice);
    strongName.appendChild(name);

    li.appendChild(strongName);
    li.appendChild(price);
    li.appendChild(weigh);
    li.appendChild(strongPrice);

    return ul.appendChild(li);
}

function userPrice(price, weigh) {
    let resultPrice = price * weigh / 100;
    resultPrice = parseFloat(resultPrice).toFixed(2);
    return resultPrice;
}

function totalPrice(arr) {
    let id = document.getElementById('total-price');
    id.innerHTML = "";

    let sum = 0;

    for(let i = 0; i < arr.length; i++) {
        let current = parseFloat(arr[i]);
        sum += current;
    }

    sum = parseFloat(sum).toFixed(2);

    let text = document.createTextNode("Total price are: " + sum + "$");

    id.appendChild(text);

}

searchProduct();
function searchProduct() {
    let inputSearch = document.getElementById('findItems');

    inputSearch.onkeyup = function() {
        let filter = inputSearch.value.toUpperCase();
        let content = document.getElementById('product-content');
        content.innerHTML = "";

        for (let i = 0; i < arrayOfProducts.length; i++) {

            let textId    = arrayOfProducts[i].id;
            let textWeigh = arrayOfProducts[i].weigh;
            let textImg   = arrayOfProducts[i].img;

            let textName  = arrayOfProducts[i].name;
            let textPrice = arrayOfProducts[i].price;
            let textPlace = arrayOfProducts[i].place;

            if ((textName.toUpperCase().indexOf(filter) > -1) ||
            (textPlace.toUpperCase().indexOf(filter) > -1)) {
                listOfItems(textId, textName, textWeigh, textPrice, textPlace, textImg);
                eventToClickBuyButton();
            }
        }
    };
}
