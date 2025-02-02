const gameBoard = (function () {
    let board = [];

    for (let i = 0; i < 9; i++) {
        board.push('');
    }

    let locked = false;

    const toggleLock = () => {
        locked = !locked;
    }

    let turn = 1;

    const reset = () => {
        for (let i = 0; i < 9; i++) {
            board[i] = '';
        }

        turn = 1;
        locked = false;
    }

    const move = (player, slot) => {
        if (locked) {
            return false;
        }
        if (board[slot] === '') {
            board[slot] = player;
            turn++;
            return true;
        }
        return false;
    }

    const update = () => {
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach((tile) => {
            tile.textContent = board[parseInt(tile.id)]
        });
    }

    const linesToCheck = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    const checkWin = (player) => {
        for (let index = 0; index < linesToCheck.length; index++) {
            let isLineWinning = true;
            linesToCheck[index].forEach((tile) => {
                if (board[tile] != player) {
                    isLineWinning = false;
                }
            });
            if (isLineWinning) {
                return true;
            }
        }
        return false;
    }

    const checkFull = () => {
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                return false;
            }
        }
        return true;
    }

    const getTurnCount = () => {
        return turn;
    }

    return {reset, move, update, checkWin, checkFull, getTurnCount,toggleLock}
})();

let Players = {
    'x': 'Player 1',
    'o': 'Player 2'
};


const board = document.querySelector('.board');
const message = document.querySelector('.message');

board.addEventListener('click', (e) => {
    const currentMove = parseInt(e.target.id);
    const currentPlayer = gameBoard.getTurnCount() % 2 === 0 ? 'o' : 'x';
    if (gameBoard.move(currentPlayer, currentMove)) {
        gameBoard.update();
        if (gameBoard.checkWin(currentPlayer)) {
            message.textContent = `${Players[currentPlayer]} wins!`;
            gameBoard.toggleLock();
        } else if (gameBoard.checkFull()) {
            message.textContent = 'Tie!';
            gameBoard.toggleLock();
        } else {
            message.textContent = `${Players[(gameBoard.getTurnCount() % 2 === 0) ? 'o':'x']}'s turn.`
        }
    }
});

const newGameButton = document.querySelector('form button');
const player1 = document.querySelector('#player1');
const player2 = document.querySelector('#player2');

newGameButton.addEventListener('click', (e) => {
    Players['x'] = (player1.value === '') ? 'Player 1' : player1.value;
    Players['o'] = (player2.value === '') ? 'Player 2' : player2.value;
    e.preventDefault();
    gameBoard.reset();
    gameBoard.update();
    message.textContent = `${Players['x']}'s turn.`
});