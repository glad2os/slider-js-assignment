const blockLeft = document.getElementById('block-left');
const blockMain = document.getElementById('block-main');
const blockRight = document.getElementById('block-right');

const images = {
    0: 'blobid0.png', 1: 'blobid1.png', 2: 'blobid2.png', 3: 'blobid3.png', 4: 'blobid4.png'
}

const count = Object.keys(images).length;
let currentImageIndex = 1;

Element.prototype.changeBackground = function (imageIndex) {
    this.style.backgroundImage = `url(assets/images/${images[imageIndex]})`;
}

blockLeft.changeBackground(0);
blockMain.changeBackground(1);
blockRight.changeBackground(2);

blockMain.onclick = () => document.location.href = `image.html?id=${images[currentImageIndex]}`;

blockLeft.onclick = () => changeImageWithAnimation(currentImageIndex - 1);
blockRight.onclick = () => changeImageWithAnimation(currentImageIndex + 1);

let timeout = undefined;

function changeImageWithAnimation(expectedIndex) {
    clearTimeout(timeout);

    currentImageIndex = mod(expectedIndex, count);

    blockLeft.changeBackground(mod(currentImageIndex - 1, count));
    blockMain.changeBackground(currentImageIndex);
    blockRight.changeBackground(mod(currentImageIndex + 1, count));

    blockMain.classList.remove("fade-in");
    timeout = setTimeout(() => {
        blockMain.classList.add("fade-in");
        timeout = setTimeout(() => blockMain.classList.remove("fade-in"), 1000);
    }, 12)
}

function mod(n, m) {
    return ((n % m) + m) % m;
}

/*
    Favourites block
 */
let counter = 0;
let addToFavourites = document.querySelector('.buttons').children[0];
let RemoveFromFavourites = document.querySelector('.buttons').children[1];

addToFavourites.onclick = () => {
    if (counter + 1 === 6) {
        document.querySelector('.message').style.display = 'block';
        return;
    }
    let elem = document.createElement('div');
    elem.innerHTML = `<img width='50px' height='50px' src='assets/images/${images[currentImageIndex]}'>`;
    document.querySelector('.favorites').insertAdjacentElement('beforeend', elem);
    counter++;
}

RemoveFromFavourites.onclick = () => {
    let children = document.querySelector('.favorites').children;
    if (children.length > 0) {
        children[children.length - 1].remove();
        counter -= 1;
    }
}

/*
    Message block
 */
let clear = document.querySelector('.message').querySelector('.buttons').children[0];
let close = document.querySelector('.message').querySelector('.buttons').children[1];

clear.onclick = () => {
    counter = 0;
    document.querySelector('.message').style.display = 'none';
    document.querySelector('.favorites').innerHTML = '';
}

close.onclick = () => document.querySelector('.message').style.display = 'none';
