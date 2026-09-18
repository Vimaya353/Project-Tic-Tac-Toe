const Gameboard = (() => {
const board = ["", "", "", "", "", "", "", "", ""];

const getBoard = () => board;

const setMark = (index, mark) => {
    if (board[index] === "") {
        board[index] = mark;
        return true;
    }

    return false;
};

const reset = () => {
    board.fill("");
};

return {
    getBoard,
    setMark,
    reset
};


})();

const Player = (name, mark) => {
return {
name,
mark
};
};

const GameController = (() => {
let player1;
let player2;
let currentPlayer;
let gameOver = false;


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

const startGame = (player1Name, player2Name) => {
    player1 = Player(player1Name, "X");
    player2 = Player(player2Name, "O");

    currentPlayer = player1;
    gameOver = false;

    Gameboard.reset();
};

const playRound = (index) => {
    if (gameOver) {
        return;
    }

    const moveMade = Gameboard.setMark(index, currentPlayer.mark);

    if (!moveMade) {
        return;
    }

    if (checkWinner()) {
        gameOver = true;
        return;
    }

    if (checkTie()) {
        gameOver = true;
        return;
    }

    switchPlayer();
};

const switchPlayer = () => {
    currentPlayer =
        currentPlayer === player1
            ? player2
            : player1;
};

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
    return Gameboard
        .getBoard()
        .every((cell) => cell !== "");
};

const getCurrentPlayer = () => currentPlayer;

const isGameOver = () => gameOver;

const resetGame = () => {
    Gameboard.reset();
    currentPlayer = player1;
    gameOver = false;
};

return {
    startGame,
    playRound,
    getCurrentPlayer,
    isGameOver,
    resetGame
};


})();

const DisplayController = (() => {
const gameboardElement = document.querySelector("#gameboard");
const turnDisplay = document.querySelector("#turn-display");
const resultDisplay = document.querySelector("#result");


const render = () => {
    const board = Gameboard.getBoard();

    gameboardElement.innerHTML = "";

    board.forEach((cell, index) => {
        const cellElement = document.createElement("button");

        cellElement.classList.add("cell");
        cellElement.textContent = cell;
        cellElement.dataset.index = index;

        cellElement.addEventListener("click", () => {
            GameController.playRound(index);
            render();
            updateMessage();
        });

        gameboardElement.appendChild(cellElement);
    });
};

const updateMessage = () => {
    const currentPlayer = GameController.getCurrentPlayer();

    if (!currentPlayer) {
        return;
    }

    if (GameController.isGameOver()) {
        const board = Gameboard.getBoard();

        const winner = checkWinnerForDisplay(board);

        if (winner) {
            resultDisplay.textContent =
                `${currentPlayer.name} wins!`;

            turnDisplay.textContent = "";
        } else {
            resultDisplay.textContent = "It's a tie!";
            turnDisplay.textContent = "";
        }

        return;
    }

    turnDisplay.textContent =
        `${currentPlayer.name}'s turn (${currentPlayer.mark})`;

    resultDisplay.textContent = "";
};

const checkWinnerForDisplay = (board) => {
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

    return winningCombinations.some((combination) => {
        const [a, b, c] = combination;

        return (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        );
    });
};

const clearMessages = () => {
    turnDisplay.textContent = "";
    resultDisplay.textContent = "";
};

return {
    render,
    updateMessage,
    clearMessages
};


})();

const startButton = document.querySelector("#start-button");
const restartButton = document.querySelector("#restart-button");

const player1Input = document.querySelector("#player1-name");
const player2Input = document.querySelector("#player2-name");

startButton.addEventListener("click", () => {
const player1Name =
player1Input.value.trim() || "Player 1";


const player2Name =
    player2Input.value.trim() || "Player 2";

GameController.startGame(player1Name, player2Name);

DisplayController.render();
DisplayController.updateMessage();

restartButton.style.display = "inline-block";


});

restartButton.addEventListener("click", () => {
GameController.resetGame();


DisplayController.render();
DisplayController.updateMessage();


});

DisplayController.render();
