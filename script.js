const Gameboard = (() => {

    const board = ["", "", "", "", "", "", "", "", ""];

    return {
        getBoard() {
            return board;
        },

        setMark(index,mark) {
            board[index] = mark;
        },

        reset() {
            board.fill("");
        }
    }
})();

Gameboard.setMark(0,"x");

console.log(Gameboard.getBoard());

const Player = (name,mark) => {
    return {
        name,
        mark
    };
};


