let board = document.getElementById('board');

for (let i = 1; i <= 25; i++) {
    const cellContainer = document.createElement('div');
    cellContainer.className = 'cellContainer';
    for (let j = 1; j <= 25; j++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        if (i % 2 == 0) {
            if (j % 2 == 0) {
                cell.style.backgroundColor = '#f2f2f2';
            } else {
                cell.style.backgroundColor = 'white';
            }
        } else {
            if (j % 2 == 0) {
                cell.style.backgroundColor = 'white';
            } else {
                cell.style.backgroundColor = '#f2f2f2';
            }
        }

        cellContainer.append(cell);
    }
    board.append(cellContainer);
}



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

    if (fX % 4 == 1) {
        fX -= 1;
    }
    if (fX % 4 == 2) {
        fX -= 2;
    }
    if (fX % 4 == 3) {
        fX += 1;
    }

    if (fY % 4 == 1) {
        fY -= 1;
    }
    if (fY % 4 == 2) {
        fY -= 2;
    }
    if (fY % 4 == 3) {
        fY += 1;
    }

    food.classList.remove('d-none');
    food.style.top = `${fY}%`;
    food.style.left = `${fX}%`;
}

foodGen();

let X;
let Y;

snakeParts = [];
head = { x: 40, y: 52 };
part1 = { x: 36, y: 52 };
part2 = { x: 32, y: 52 };
snakeParts.push(head);
snakeParts.push(part1);
snakeParts.push(part2);

let score = document.getElementById('score');
let scoreCounter = 0;

let movement = 4;

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
let speed = 80;  // speed of the snake (lower is faster)

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
        }, speed);
    } else {
        modalContent = document.getElementById('corpoModal');
        modalContent.innerHTML = 'You have lost! <br> Your score is: ' + scoreCounter;
        var modal1 = new bootstrap.Modal(document.getElementById('MainModal'));
        modal1.show();
    }

}



showSnake();





