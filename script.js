const cells = document.querySelectorAll('[data-cell]');
const gameBoard = document.getElementById('game-board');
let isCircleTurn = false;

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleClick = (e) => {
    const cell = e.target;
    const currentClass = isCircleTurn ? 'circle' : 'x';
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
};

const placeMark = (cell, currentClass) => {
    cell.classList.add(currentClass);
};

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;
};

const checkWin = (currentClass) => {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
};

const isDraw = () => {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle');
    });
};

const endGame = (draw) => {
    if (draw) {
        alert('Draw!');
    } else {
        alert(`${isCircleTurn ? "O's" : "X's"} Wins!`);
    }
    resetGame();
};

const resetGame = () => {
    cells.forEach(cell => {
        cell.classList.remove('x', 'circle');
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    isCircleTurn = false;
};

// cells.forEach(cell => {
//     cell.addEventListener('click', handleClick, { once: true });
// });
restartButton.addEventListener('click', resetGame);

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});
