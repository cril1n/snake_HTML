let up = false;
let down = false;
let right = true;
let left = false;
let alive = true;

document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'ArrowUp':
            up = true;
            down = false;
            left = false;
            right = false;
            break;
        case 'ArrowDown':
            up = false;
            down = true;
            left = false;
            right = false;
            break;
        case 'ArrowRight':
            up = false;
            down = false;
            left = false;
            right = true;
            break;
        case 'ArrowLeft':
            up = false;
            down = false;
            left = true;
            right = false;
            break;
        default:
            break;
    }
});

let food = document.getElementById('food');
let fY;
let fX;

function foodGen() {
    fY = Math.random() * 99;
    fY = Math.trunc(fY);
    fX = Math.random() * 99;
    fX = Math.trunc(fX);
    if ((fX % 2) == 1) {
        fX = fX + 1;
    }
    if ((fY % 2) == 1) {
        fY = fY + 1;
    }
    food.classList.remove('d-none');
    food.style.top = `${fY}%`;
    food.style.left = `${fX}%`;
}

foodGen();

let X;
let Y;

snakeParts = [];
head = { x: 30, y: 50 };
part1 = { x: 28, y: 50 };
part2 = { x: 26, y: 50 };
snakeParts.push(head);
snakeParts.push(part1);
snakeParts.push(part2);

let score = document.getElementById('score');
let scoreCounter = 0;

let movement = 2;

function moveSnake() {

    if (X == fX && Y == fY) {
        scoreCounter++;
        score.innerHTML = 'Score： ' + scoreCounter;
        foodGen();
    } else {
        snakeParts.pop();
    }

    headX = snakeParts[0].x;
    headY = snakeParts[0].y;

    if (up) {
        newHead = { x: headX, y: headY - movement }
        snakeParts.unshift(newHead);
        showSnake();
    }
    if (down) {
        newHead = { x: headX, y: headY + movement }
        snakeParts.unshift(newHead);
        showSnake();
    }
    if (right) {
        newHead = { x: headX + movement, y: headY }
        snakeParts.unshift(newHead);
        showSnake();
    }
    if (left) {
        newHead = { x: headX - movement, y: headY }
        snakeParts.unshift(newHead);
        showSnake();
    }
}

const snake = document.getElementById('snake');
const ground = document.getElementById('ground');
let delay = 100;

function showSnake() {

    const snakeDel = ground.querySelectorAll('.snakepart');
    snakeDel.forEach(element => {
        element.remove();
    });

    snakeParts.forEach(part => {
        clone = snake.cloneNode(true);
        clone.style.top = `${part.y}%`;
        clone.style.left = `${part.x}%`;
        clone.style.display = '';
        ground.appendChild(clone);
    });

    X = snakeParts[0].x;
    Y = snakeParts[0].y;

    if (X >= 100 || X < 0) {
        alive = false;
    }
    if (Y >= 100 || Y < 0) {
        alive = false;
    }
    for (let i = 1; i < snakeParts.length; i++) {
        if (snakeParts[i].y == Y && snakeParts[i].x == X) {
            alive = false;
        }
    }

    if (alive) {
        setTimeout(() => {
            moveSnake();
        }, delay);
    } else {
        modalContent = document.getElementById('corpoModal');
        modalContent.innerHTML = 'You have lost! <br> Your score is: ' + scoreCounter;
        var modal1 = new bootstrap.Modal(document.getElementById('MainModal'));
        modal1.show();
    }

}



showSnake();





