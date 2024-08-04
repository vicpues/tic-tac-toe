const X = "x";
const O = "o";
const EMPTY = "_";

const INVALID = "invalid";
const WIN = "win";
const DRAW = "draw";

const boardSize = 3;
const player1Name = "Player 1";
const player2Name = "Player 2";


const board = (function() {
    const boardArray = [];

    // Init
    _createBoard();

    function getBoard() {
        return boardArray.slice();
    }

    function resetBoard() {
        boardArray.length = 0;
        _createBoard();
    }

    function setSquare(col, row, string) {
        boardArray[row][col] = string;
    }

    function readSquare(col, row) {
        return boardArray[row][col];
    }

    function readLines(col, row) {
        return {
            col: _readCol(col),
            row: _readRow(row),
            ..._readDiagonals(col, row)
        };
    }

    function _createBoard() {
        for ( let row = 0;  row < boardSize;  row++ ) {
            const currentRow = [];
            for (let col = 0; col < boardSize; col++) {
                currentRow.push(EMPTY);
            };
            boardArray.push(currentRow);
        };
    }

    function _readRow(row) {
        return boardArray[row].slice();
    }

    function _readCol(col) {
        const colArray = [];
        for (row of boardArray) {
            colArray.push(row[col]);
        };
        return colArray;
    }

    function _readDiagonals(col, row) {
        // In an n * n 2d array, the squares with n-long diagonals are:
        // Those where col == row
        // Those where col + row = n  (add 1 to compensate for 0 index)
        const diagonals = {
            topRightDiagonal: null,
            topLeftDiagonal: null,
        };

        // Diagonal starting at (0, 0), all squares are [i][i]
        if (row === col) {
            const diagonal = [];
            for (let i = 0;  i < boardSize;  i++) {
                diagonal.push(boardArray[i][i]);
            };
            diagonals.topLeftDiagonal = diagonal;
        };

        // Diagonal starting at (n-1, 0), all squares are i + i + 1 == n
        if ( (row + col + 1) === boardSize ) {
            const diagonal = [];
            for (let i = 0;  i < boardSize;  i++) {
                diagonal.push(boardArray[boardSize - (i+1)][i])
            };
            diagonals.topRightDiagonal = diagonal;
        };

        return diagonals;
    }

    return {
        getBoard,
        resetBoard,
        setSquare,
        readSquare,
        readLines,
    };

})();


const logic = (function() {

    const players = [
        new Player(player1Name, X),
        new Player(player2Name, O),
    ];

    let currentTurn = 0;

    function getCurrentPlayer() {
        return players[currentTurn % 2];
    }

    function makeMove(col, row) {
        if (board.readSquare(col, row) !== EMPTY) {
            return INVALID;
        };
        
        board.setSquare(col, row, getCurrentPlayer().token);

        if (moveHasWon(col, row)) {
            return WIN;
        };

        if (currentTurn === (boardSize ** 2) - 1 ){
            return DRAW;
        };
    }

    function moveHasWon(col, row) {
        const lines = board.readLines(col, row);
        for (let line in lines) {
            if ( lines[line]  &&  _arrayIsWinner(lines[line]) ) {
                return true
            };
        };
        return false;
    }

    function switchPlayer() {
        currentTurn++
    }

    function _arrayIsWinner(arr) {
        for (let square of arr) {
            if (square !== getCurrentPlayer().token) {
                return false;
            };
        };
        return true;
    }

    return {
        getCurrentPlayer,
        makeMove,
        moveHasWon,
        switchPlayer,
    }

})();


const interface = (function(doc) {
    const dom = _cacheDom();
    _bindEvents();
    renderBoard();
    _renderPlayer();

    function renderBoard() {
        const squares = board.getBoard().flat();
        const xClass = "x-square";
        const oClass = "o-square";
        for (let i = 0;  i < squares.length;  i++) {
            const value = squares[i];
            const cell = dom.cells[i];
            if (value === X) {
                cell.classList.add(xClass);
            } else if (value === O) {
                cell.classList.add(oClass);
            } else {
                cell.classList.remove(xClass);
                cell.classList.remove(oClass);
            };
        };
    }

    function _bindEvents() {
        for (cell of dom.cells) {
            cell.addEventListener("click", moveEvent);
        };
    }

    function moveEvent(event) {
        const status = logic.makeMove(
            event.target.dataset.x,
            event.target.dataset.y
        );

        renderBoard();

        if (!status) {
            logic.switchPlayer();
            _renderPlayer();
        } else if (status !== INVALID) {
            gameEnd(status);
        };
    }

    function gameEnd(status) {
        let message;
        if (status === WIN) {
            message = `${logic.getCurrentPlayer().name} wins this round!`;
        } else if (status === DRAW) {
            message = `It's a draw!`;
        };
        dom.statusMessage.textContent = message;
    }

    function clearStatus() {
        dom.statusMessage.textContent = "";
    }

    function _renderPlayer() {
        const oTurnClass = "o-turn";
        const currentPlayer = logic.getCurrentPlayer();
        if (currentPlayer.token === O) {
            dom.currentPlayer.classList.add(oTurnClass);
        } else {
            dom.currentPlayer.classList.remove(oTurnClass);
        };
    }

    function _cacheDom() {
        return {
            playerOneInput: doc.querySelector("#player-1-name"),
            playerTwoInput: doc.querySelector("#player-2-name"),
            playerOneScore: doc.querySelector("#player-1-score"),
            playerTwoScore: doc.querySelector("#player-2-score"),
            currentPlayer: doc.querySelector("#current-player"),
            board: doc.querySelector("#board"),
            statusMessage: doc.querySelector("#status-message"),
            playAgain: doc.querySelector("#play-again"),
            resetButton: doc.querySelector("#reset-button"),
            cells: Array.from(doc.querySelectorAll(".game-cell"))
        }
    }

    return {
        renderBoard,

        _renderPlayer,
        dom,
    };

})(document);


const debug = function(){
    // Init
    _mainLoop();

    function _mainLoop() {
        while (true) {
            _printBoard();
            const input = _askInput();
            const result = logic.makeMove(input.col, input.row);

            if (result === INVALID) {
                console.log("That square is already taken, try again");
            };

            if (result === WIN) {
                _printBoard();
                alert(`The game is over! \n ${logic.getCurrentPlayer().token} won!`);
                break;
            };

            if (result === DRAW) {
                _printBoard();
                alert(`The game is over! \n It was a draw!`);
                break;
            }
        }
    }

    function _printBoard() {
        const output = []
        for (let row of board.getBoard()) {
            output.push(row.join("  ") + "\n")
        };
        console.log(output.join("") + "\n")
    }

    function _askInput() {
        const firstLine = `It's ${logic.getCurrentPlayer().token}'s turn\n`;
        const col = Number(prompt(firstLine + "Pick a column"));
        const row = Number(prompt(firstLine + "Pick a row"));
        return { row, col };
    }

};


function Player(name, token) {
    this.name = name;
    this.token = token;
    this.score = 0;

    this.addPoint = function() {
        this.score++
    };
}
