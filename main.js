//Create factory function for player

const createPlayer = (sign, name) => {
    return {sign, name}
}

const boardModule = (()=>{
    let _board = []
    let _whosTurn = 'x';
    let playerOne = createPlayer('x', "Player 1" );
    let playerTwo = createPlayer('o', "Player 2" );
    let tie = false;
    let winner = '';


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
        console.log({row, col});
        return _board[row][col] == '';
    }

    const changeTurn = () => {
        if (_whosTurn == 'x'){
            _whosTurn = 'o';
        } else {
            _whosTurn = 'x';
        }
    }

    const _isBoardFull = () => {
        for (let row  = 0; row < _board.length; row++){
            for (let col = 0 ; col < board[0].length; col++){
                if (board[row][col] = ''){
                    return false;
                }
            }
        }
        return false;
    }

    const playerWon = (row, col, player) => {
        let win = true;
        //checkRow
        for(let i = 0; i < 3; i ++) {
            if (_board[i][col] != player.symbol) {
                win = false;
                break;}
        }
        if (win) {return true}
        win = true;
        for (let i = 0; i < 3; i++){
            if (_board[col][i] != player.symbol) {
                win = false
                break;}
        }
        if (win) {return true};

        win = true;
        //Backward diagnal
        for (let i  = 0; i < 3; i ++){
            if (_board[i][i] != player){
                break;
                return false
            }
        }
        if (win) {return true};

        //Forward diagonal
        win = true;
        for(let i=0; i < 3; i++){
            if(matrix[i][3-i-1]!=player){
                win=false;
                break;
            }
        }
        if (win) {return true};

        return false;

    }
    const isGameOver = () => {
        return (!tie && winner != '');
    }

    const move = (row, col) => {
        if (validMove(row, col)){
            _board[row][col] = _whosTurn;

            if(isGameOver){
                let result = document.querySelector('.result');
                if(tie){
                    result = "Tie game"
                }
                else {
                    result = winner;
                }
            }
        }
        if (_whosTurn == 'x'){
            _whosTurn = 'o';
        } else {
            _whosTurn = 'x';
        }
    }

    //Public Methods
    return {
        getWhosTurn,
        isGameOver,
        move,
        getBoard,
        newGame
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

    }

    return {
        render
    }
})();

boardModule.newGame();
document.querySelectorAll('.cell').forEach((cell) => {
    cell.addEventListener('click', (e)=>{
        if(boardModule.!isGameOver()){
            let position = parseInt(e.target.dataset.pos);
            let row = Math.floor(position/3);
            let col = position%3;
            boardModule.move(row, col)
            displayControllerModule.render();
        }

    })
})

//Create Module for Board
