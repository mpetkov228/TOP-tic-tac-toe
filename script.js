const container = document.querySelector('.container');

const GameBoard = (function () {
    const gameBoardArr = ['X', 'O', 'X', 'X', 'O', 'O', 'X', 'O', 'X'];


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

GameBoard.renderBoard();