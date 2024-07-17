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

        _switchPlayer();
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

    function _switchPlayer() {
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

        _switchPlayer,
        _arrayIsWinner,
    }

})();


const debug = (function(){

    // Init
    _printBoard();

    function _printBoard() {
        const output = []
        for (let row of board.getBoard()) {
            output.push(row.join("  ") + "\n")
        };
        console.log(output.join(""))
    }

    return {
        _printBoard,
    };

})();


function Player(name, token) {
    this.name = name;
    this.token = token;
}

