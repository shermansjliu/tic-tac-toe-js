//Create factory function for player

const createPlayer = (symbol, name) => {
    return {symbol, name}
}

const boardModule = (()=>{
    let _board = []
    let _whosTurn = 'x';
    let playerOne = createPlayer('x', "Player 1" );
    let playerTwo = createPlayer('o', "Player 2" );
    let tie = false;
    let _winner = ''

    const getWhosTurn = () => {
        return _whosTurn;
    }
    const createBoard = ()=>{
        for(let i = 0; i < 3; i++){
            _board.push(['','',''])
        }
    }
    const newGame= () => {
        _board = []
        createBoard();

    }
    const getBoard = ()=> {
        return _board;
    }
    const validMove = (row, col) => {
        return _board[row][col] == '';
    }
    const getWinner = () => {
        return _winner;
    }
    const _isBoardFull = () => {
        for (let row  = 0; row < 3; row++){
            for (let col = 0 ; col < 3 ;col++){
                if (_board[row][col] == ''){
                    return false;
                }
            }
        }
        return true;
    }

    const playerWon = (row, col, playerSymbol) => {
        let win = true;
        //checkRow
        for(let i = 0; i < 3; i ++) {
            if (_board[i][col] != playerSymbol) {
                win = false;
                break;
            }
        }

        win = true;
        for (let i = 0; i < 3; i++){
            if (_board[i][col] != playerSymbol) {
                win = false
                break;}
        }


        if (win) {return true};

        win = true;
        //Backward diagnal
        for (let i  = 0; i < 3; i ++){
            if (_board[i][i] != playerSymbol){
                win = false
                break;

            }
        }

        if (win) {return true};

        //Forward diagonal
        win = true;
        for(let i=0; i < 3; i++){
            if(_board[i][3-i-1]!=playerSymbol){
                win=false;
                break;
            }
        }

        if (win) {return true};
        return false;
    }
    const isGameOver = () => {

        return (!tie && _winner != '');
    }

    const move = (row, col) => {
        if (validMove(row, col) ){
            _board[row][col] = _whosTurn;
            if (playerWon(row, col, getWhosTurn())){
                    _winner = getWhosTurn();
                }
                else if (_isBoardFull()){
                    tie = true;
                }
                if (_whosTurn == 'x'){
                    _whosTurn = 'o';
                } else {
                    _whosTurn = 'x';
                }
            }
    }

    //Public Methods
    return {
        getWhosTurn,
        isGameOver,
        move,
        getBoard,
        newGame,
        getWinner
    }
})();

//Create Module for DisplayController
const displayControllerModule = (function() {
    const  _cells = [...document.querySelectorAll('.cell')]
    const render = () => {
        for(let row = 0 ; row < 3; row++){
            for (let col = 0; col < 3; col++) {
                let index = row*3+col;
                let board = boardModule.getBoard();
                if(board[row][col] != ''){
                    _cells[index].textContent = board[row][col];
                }

            }
        }
        let result = document.querySelector('.result');
        if(boardModule.isGameOver()){
            if (boardModule.getWinner() != '')
                result.textContent = boardModule.getWinner();
        } else if(boardModule.tie){ result.textContent = "Tie";}
    }

    return {
        render
    }
})();

boardModule.newGame();
document.querySelectorAll('.cell').forEach((cell) => {
    cell.addEventListener('click', (e)=>{
        let position = parseInt(e.target.dataset.pos);
        let row = Math.floor(position/3);
        let col = position%3;
        if(!boardModule.isGameOver()){
            boardModule.move(row, col);
            displayControllerModule.render();
        }
    })
})

//Create Module for Board
