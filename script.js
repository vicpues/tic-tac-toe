// + board object
//   o board array
//   o create board from scratch ()
//   o reset board ()
//   o set square to "x", "o" or "" 
//   o read square
//   - read line/across/diagonal from square
//   + read ALL lines from a square

const X = "x";
const O = "o";

const board = (function() {
    const boardSize = 3;
    const boardArray = [];

    // Init
    _createBoard();

    function _createBoard() {
        for ( let row = 0;  row < boardSize;  row++ ) {
            const currentRow = [];
            for (let col = 0; col < boardSize; col++) {
                currentRow.push("");
            };
            boardArray.push(currentRow);
        };
    }

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

    function readRow(row) {
        return boardArray[row].slice();
    }

    function readCol(col) {
        const colArray = [];
        for (row of boardArray) {
            colArray.push(row[col]);
        };
        return colArray;
    }

    function readDiagonals(col, row) {
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

        readRow,
        readCol,
        readDiagonals,
    };

})();
