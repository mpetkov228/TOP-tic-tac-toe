const container = document.querySelector('.container');

const GameBoard = (function () {
    const gameBoardArr = ['X', 'O', 'X', 'X', 'O', 'O', 'X', 'O', 'X'];

    return {
        gameBoardArr
    };
})();

const board = GameBoard.gameBoardArr;

for (let cell of board) {
    const div = document.createElement('div');
    div.textContent = cell;
    container.appendChild(div);
}