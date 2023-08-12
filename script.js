const container = document.querySelector('.container');
const cells = document.querySelectorAll('.cell');
const playerChoiceContainer = document.querySelector('.player-choice-container');

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = cell.getAttribute('data-index');

        GameBoard.gameBoardArr[index] = currentPlayer.marker;
        cell.textContent = currentPlayer.marker;
        
        console.log(GameBoard.gameBoardArr);
    }, { once: true });
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

let currentPlayer = Player.player1;