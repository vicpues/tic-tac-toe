// + board object
//   o board array
//   o create board from scratch ()
//   o reset board ()
//   o set square to "x", "o" or "" 
//   + read square
//   - read line/across/diagonal from square
//   + read ALL lines from a square

const board = (function() {
    const numberOfRows = 3;
    const numberOfColumns = 3;
    const boardArray = [];

    // Init
    _createBoard();

    function _createBoard() {
        for ( let row = 0;  row < numberOfRows;  row++ ) {
            const currentRow = [];
            for (let col = 0; col < numberOfColumns; col++) {
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
    
    return {
        getBoard,
        resetBoard,
        setSquare,
    };

})();
