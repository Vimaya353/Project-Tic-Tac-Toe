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

const GameController = (() => {

    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");

    let currentPlayer = player1;

    const playRound = (index) => {

        if (Gameboard.getBoard()[index] !== "") {
            return;
        }

        Gameboard.setMark(index, currentPlayer.mark);

        if (checkWinner()) {
            console.log(`${currentPlayer.name} wins!`);
            return;
        }

        if (checkTie()) {
            console.log("It's a tie!");
            return;
        }

        switchPlayer();
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkWinner = () => {
    const board = Gameboard.getBoard();

        return winningCombinations.some((combination) => {
            const [a, b, c] = combination;

            return (
                board[a] !== "" &&
                board[a] === board[b] &&
                board[a] === board[c]
            );
        });
    };

    const checkTie = () => {
        return Gameboard.getBoard().every((cell) => cell !== "");
    };

    return {
        playRound
    };

})();


console.log(Gameboard.getBoard());





