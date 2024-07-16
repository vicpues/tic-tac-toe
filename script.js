const X = "x";
const O = "o";

const board = (function() {
    const boardSize = 3;
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
        return [
            _readCol(col),
            _readRow(row),
            ..._readDiagonals(col, row)
        ];
    }

    function _createBoard() {
        for ( let row = 0;  row < boardSize;  row++ ) {
            const currentRow = [];
            for (let col = 0; col < boardSize; col++) {
                currentRow.push("");
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
        const diagonals = [];

        // Diagonal starting at (0, 0), all squares are [i][i]
        if (row === col) {
            const topLeftDiagonal = [];
            for (let i = 0;  i < boardSize;  i++) {
                topLeftDiagonal.push(boardArray[i][i]);
            };
            diagonals.push(topLeftDiagonal);
        };

        // Diagonal starting at (n-1, 0), all squares are i + i + 1 == n
        if ( (row + col + 1) === boardSize ) {
            const topRightDiagonal = [];
            for (let i = 0;  i < boardSize;  i++) {
                topRightDiagonal.push(boardArray[boardSize - (i+1)][i])
            };
            diagonals.push(topRightDiagonal);
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


// + gameLogic object
//   - player objects
//   + switch player turn
//   + see current player turn
//   + determine if a line is a winner

const logic = (function() {
    const player1Name = "Player 1";
    const player2Name = "Player 2";

    const players = [
        new Player(player1Name, X),
        new Player(player2Name, O),
    ];

    let currentPlayer = 0;

    function switchPlayer() {
        currentPlayer = (currentPlayer === 0)
            ? 1
            : 0
    }

    function getCurrentPlayer() {
        return players[currentPlayer];
    }

    return {
        getCurrentPlayer,

        switchPlayer,
    }

})();


function Player(name, token) {
    this.name = name;
    this.token = token;
}

