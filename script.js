const container = document.querySelector('.container');
const playerChoiceContainer = document.querySelector('.player-choice-container');

container.addEventListener('click', (event) => {
    if (event.target.className != 'cell') {
        return;
    }

    event.target.textContent = currentPlayer.marker;
});

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


    const renderBoard = () => {
        for (let cell of gameBoardArr) {
            const div = document.createElement('div');
            div.className = 'cell';
            div.textContent = cell;
            container.appendChild(div);
        }
    }

    return {
        renderBoard
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

let currentPlayer = Player.player1;

GameBoard.renderBoard();