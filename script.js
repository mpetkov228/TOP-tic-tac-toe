const body = document.querySelector('body');

const GameBoard = (function () {
    const gameBoardArr = ['', '', '', '', '', '', '', '', ''];

    const resetGameBoardArr = () => {
        for (let i = 0; i < gameBoardArr.length; i++) {
            gameBoardArr[i] = '';
        }
    };

    return {
        gameBoardArr,
        resetGameBoardArr
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

    const resetGameBoard = () => {
        for (let cell of cells) {
            cell.textContent = '';
        }
    };

    const addEvents = () => {
        cells.forEach(cell => {
            cell.addEventListener('click', () => {
                const index = cell.getAttribute('data-index');
                
                if (GameBoard.gameBoardArr[index] != '' && cell.textContent != '') {
                    return;
                }

                GameBoard.gameBoardArr[index] = currentPlayer.marker;
                cell.textContent = currentPlayer.marker;
                
                let result = GameLogic.determineOutcome(GameBoard.gameBoardArr);
                console.log(GameBoard.gameBoardArr)

                if (result != undefined) {
                    DisplayController.displayWinner(result);
                    return;
                }

                if (currentPlayer.marker == 'X') {
                    currentPlayer = Player.player2;
                } else if (currentPlayer.marker == 'O') {
                    currentPlayer = Player.player1;
                }

            });
        });
    }
    
    return {
        addEvents,
        resetGameBoard
    };
})();

const DisplayController = (function () {
    const removeElement = () => {
        const resultDiv = document.querySelector('.result-div');
        resultDiv.remove();
    }

    const handleRestart = () => {
        PlayGame.resetGameBoard();
        GameBoard.resetGameBoardArr();
        removeElement();
    };


    const createGameResultElement = (result) => {
        const div = document.createElement('div');
        div.className = 'result-div';

        const resultTextDiv = document.createElement('div');
        resultTextDiv.className = 'result-text';
        const restartBtn = document.createElement('button');
        restartBtn.className = 'restart-btn';
        restartBtn.textContent = 'Restart';
        restartBtn.addEventListener('click', handleRestart);

        if (result == 'win') {
            resultTextDiv.textContent = Player.player1.name + ' wins!';
        } else if (result == 'loss') {
            resultTextDiv.textContent = Player.player2.name + ' wins!';
        } else if (result == 'draw') {
            resultTextDiv.textContent = 'Draw!';
        }
        
        div.appendChild(resultTextDiv);
        div.appendChild(restartBtn);

        return div;
    };

    const displayWinner = (result) => {
        const div = createGameResultElement(result);
        body.appendChild(div);
    };

    return {
        displayWinner
    };
})();

const GameLogic = (function () {
    const checkRows = (arr) => {
        if (arr[0] == arr[1] && arr[0] == arr[2] && (arr[0] == 'X' || arr[0] == 'O')) {
            return arr[0];
        } else if (arr[3] == arr[4] && arr[3] == arr[5] && (arr[3] == 'X' || arr[3] == 'O')) {
            return arr[3];
        } else if (arr[6] == arr[7] && arr[6] == arr[8] && (arr[6] == 'X' || arr[6] == 'O')) {
            return arr[6];
        }
    
        return '';
    }

    const checkColumns = (arr) => {
        if (arr[0] == arr[3] && arr[0] == arr[6] && (arr[0] == 'X' || arr[0] == 'O')) {
            return arr[0];
        } else if (arr[1] == arr[4] && arr[1] == arr[7] && (arr[1] == 'X' || arr[1] == 'O')) {
            return arr[1];
        } else if (arr[2] == arr[5] && arr[2] == arr[8] && (arr[2] == 'X' || arr[2] == 'O')) {
            return arr[2];
        }
    
        return '';
    }

    const checkDiagonals = (arr) => {
        if (arr[0] == arr[4] && arr[0] == arr[8] && (arr[0] == 'X' || arr[0] == 'O')) {
            return arr[0];
        }
        if (arr[2] == arr[4] && arr[2] == arr[6] && (arr[2] == 'X' || arr[2] == 'O')) {
            return arr[2];
        }
    
        return '';
    }

    const checkWinner = (arr) => {
        let winner = checkRows(arr);

        if (winner == '') {
            winner = checkColumns(arr);
        }
        if (winner == '') {
            winner = checkDiagonals(arr);
        }

        return winner;
    };

    const determineOutcome = (arr) => {
        let winner = checkWinner(arr);

        if (winner == '' && !arr.includes('')) {
            return 'draw';
        }

        if (winner == 'X') {
            return 'win';
        }

        if (winner == 'O') {
            return 'loss';
        }

    };

    return {
        determineOutcome
    };
})();

let currentPlayer = Player.player1;
PlayGame.addEvents();