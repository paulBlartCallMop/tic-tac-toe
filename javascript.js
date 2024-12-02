const gameBoard = (function () {
    let board = [];

    for (let i = 0; i < 9; i++) {
        board.push('');
    }

    let turn = 1;

    const reset = () => {
        for (let i = 0; i < 9; i++) {
            board[i] = '';
        }

        turn = 1;
    }

    const move = (player, slot) => {
        if (board[slot] === '') {
            board[slot] = player;
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
        linesToCheck.forEach((line) => {
            let lineIsWinning = true;
            line.forEach((tile) => {
                if (board[tile] != player) {
                    lineIsWinning = false;
                }
            });
            if (lineIsWinning) {
                return true;
            }
        });
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

    return {reset, move, update, checkWin, checkFull}
})();

let Players = {
    'x': 'Player 1',
    'o': 'Player 2'
};


