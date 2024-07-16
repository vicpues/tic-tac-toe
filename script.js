// + board object
//   - board array
//   - create board from scratch ()
//   + reset board ()
//   + set square to "x", "o" or "" 
//   + read square
//   - read line/across/diagonal from square
//   + read ALL lines from a square

const board = (function() {
    const numberOfRows = 3;
    const numberOfColumns = 3;
    const boardArray = [];

    // Init
    createBoard();

    function createBoard() {
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

    return {
        getBoard
    };

})();
