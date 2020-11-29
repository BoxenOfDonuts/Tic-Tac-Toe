const displayController = (() => {
    const _square = (i) => {
        let button = document.createElement('button');
        button.classList.add('square');
        button.textContent = null;
        button.setAttribute('data-square', i)
        return button
    }

    const _row = () => {
        const div = document.createElement('div');
        div.classList.add('board-row');

        return div
    }

    const drawBoard = () => {
        const gameBody = document.querySelector('.game-board');
        let row = _row();
        for (let i=0; i<=9; i++) {
            if (i % 3 === 0 && i !=0) {
                gameBody.appendChild(row)
                row = _row();
            }
            row.appendChild(_square(i));
        }
    }

    const updateSquare = (e, player) => {
        e.target.textContent = player
    }

    const updateStatus = (text) => {
        const status = document.querySelector('.winner');
        status.textContent = text
    }

    return {updateSquare, drawBoard, updateStatus}


})();

const GameBoard = () => {
    for (let i=0; i <3; i++) {
        gameBody.appendChild(displayController.drawRow());
    }
}


const Player = (name, piece) => {
    const getName = () => name;
    const getPiece = () => piece;

    return {getName, getPiece}
    
}


const Game = (() => {
    let winner = false;
    let round = 0;
    let history = { squares: Array(9).fill(null),
        round: round,
        xIsNext: true,
    }

    const setHistory = (squares, round, xIsNext) => {
        history.squares = squares
        history.round = round
        history.xIsNext = xIsNext;
    }

    const playRound = (e) => {
        if (winner || e.target.textContent) return;
        let player = history.xIsNext ? player1.getPiece(): player2.getPiece();
        let square = e.target.dataset.square;
        history.squares[square] = player;
    
        setHistory(
            history.squares,
            history.round++,
            !history.xIsNext
        )

        displayController.updateSquare(e, player)
        //isWinner(history.squares);
        if (isWinner(history.squares)) {
            displayController.updateStatus(`Winner, ${history.xIsNext ? player1.getName(): player2.getName()}!`);
        } else if (!_allValidMoves(history.squares)) {
            displayController.updateStatus("Tie Game!");
        } else {
            displayController.updateStatus(`Next Player ${history.xIsNext ? player1.getName(): player2.getName()}`);
        }
    }
    
    const isWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
          ];
          for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                winner = true;
                return true;
            //   return squares[a];
            }
          }
          return null;
    }

    const computerPlayer = () => {
        // returns good indexes 
        const validMoves = _allValidMoves(history.squares)
        if (!validMoves) {console.log("crap"); return}
        const random = Math.floor(Math.random() * (validMoves.length-1));

        console.log(validMoves[random])

        const e =  document.querySelector(`button[data-square='${validMoves[random]}']`)
        e.click();

    }

    const _allValidMoves = (array) => {
        const arr = [];
        for (const [index, element] of array.entries()) {
            if (!element) { arr.push(index) }
        }
        if (arr.length === 0) {
            return false;
        } else {
            return arr;
        }
    }


    return {playRound, computerPlayer, _allValidMoves}

})();


function handleClick(e) {
    // console.log(e.target.textContent)
    console.log(e)
    //Game.playRound(e);

}

function startGame(e) {
    const name1 = document.querySelector('#player1').value || 'Player 1';
    const name2 = document.querySelector('#player2').value || 'Player 2';
    const setup = document.querySelector('.setup');

    
    player1 = Player(name1, 'X');
    player2 = Player(name2, 'O');

    setup.remove();
    displayController.drawBoard();
    const squareButtons = document.querySelectorAll('.square');
    squareButtons.forEach(square => square.addEventListener('click', handleClick));



}

// function handleKey(e) {
//     const player1 = Player(String(this.value))
//     console.log(player1.getName())
// }

// const squareButtons = document.querySelectorAll('.square');
// //const players = document.querySelectorAll('.players input[type=text]');
// squareButtons.forEach(square => square.addEventListener('click', handleClick));
// //players.forEach(player => player.addEventListener('keyup', handleKey));
const startButton = document.querySelector('#start-button');
startButton.addEventListener('click', startGame);
let player1, player2;