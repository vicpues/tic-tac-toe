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

    return {
        getBoard,
        resetBoard,
        setSquare,
        readSquare,

        readRow,
        readCol,
    };

})();
