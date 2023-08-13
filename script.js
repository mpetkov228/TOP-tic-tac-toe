const playerChoiceContainer = document.querySelector('.player-choice-container');

playerChoiceContainer.addEventListener('click', (event) => {
    if (event.target.className == 'player-one') {
        currentPlayer = Player.player1;
        return;
    }
    if (event.target.className == 'player-two') {
        currentPlayer = Player.player2;
        return;
    }
});

const GameBoard = (function () {
    const gameBoardArr = ['', '', '', '', '', '', '', '', ''];

    return {
        gameBoardArr
    };
})();

const Player = (function () {
    const playerFactory = (name, marker) => {
        return { name, marker };
    }
    
    const player1 = playerFactory('player1', 'X');
    const player2 = playerFactory('player2', 'O');

    return {
        player1,
        player2
    };
})();

const PlayGame = (function () {
    const cells = document.querySelectorAll('.cell');

    const addEvents = () => {
        cells.forEach(cell => {
            cell.addEventListener('click', () => {
                const index = cell.getAttribute('data-index');
        
                GameBoard.gameBoardArr[index] = currentPlayer.marker;
                cell.textContent = currentPlayer.marker;
                
                GameLogic.determineOutcome(GameBoard.gameBoardArr);
            }, { once: true });
        });
    }
    
    return {
        addEvents
    };
})();

const GameLogic = (function () {
    const checkRows = (arr) => {
        if (arr[0] == arr[1] && arr[0] == arr[2] && (arr[0] == 'X' || arr[0] == 'O')) {
            return true;
        } else if (arr[3] == arr[4] && arr[3] == arr[5] && (arr[3] == 'X' || arr[3] == 'O')) {
            return true;
        } else if (arr[6] == arr[7] && arr[6] == arr[8] && (arr[6] == 'X' || arr[6] == 'O')) {
            return true;
        }
    
        return false;
    }

    const checkColumns = (arr) => {
        if (arr[0] == arr[3] && arr[0] == arr[6] && (arr[0] == 'X' || arr[0] == 'O')) {
            return true;
        } else if (arr[1] == arr[4] && arr[1] == arr[7] && (arr[1] == 'X' || arr[1] == 'O')) {
            return true;
        } else if (arr[2] == arr[5] && arr[2] == arr[8] && (arr[2] == 'X' || arr[2] == 'O')) {
            return true;
        }
    
        return false;
    }

    const checkDiagonals = (arr) => {
        if (arr[0] == arr[4] && arr[0] == arr[8] && (arr[0] == 'X' || arr[0] == 'O')) {
            return true;
        }
        if (arr[2] == arr[4] && arr[2] == arr[6] && (arr[2] == 'X' || arr[2] == 'O')) {
            return true;
        }
    
        return false;
    }

    const determineOutcome = (arr) => {
        if (checkRows(arr)) {
            console.log('winner rows');
        } else if (checkColumns(arr)) {
            console.log('winner columns');
        } else if (checkDiagonals(arr)) {
            console.log('winner diagonals');
        }
    };

    return {
        determineOutcome
    };
})();

let currentPlayer = Player.player1;
PlayGame.addEvents();