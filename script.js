const container = document.querySelector('.container');

const GameBoard = (function () {
    const gameBoardArr = ['', 'O', '', '', '', '', '', '', 'X'];


    const renderBoard = () => {
        for (let cell of gameBoardArr) {
            const div = document.createElement('div');
            div.textContent = cell;
            container.appendChild(div);
        }
    }

    return {
        renderBoard
    };
})();

const playerFactory = (name, marker) => {
    return { name, marker };
}

const player1 = playerFactory('player1', 'X');
const player2 = playerFactory('player2', 'O');

GameBoard.renderBoard();