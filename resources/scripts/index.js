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

    return {updateSquare, drawBoard}


})();

const GameBoard = () => {
    for (let i=0; i <3; i++) {
        gameBody.appendChild(displayController.drawRow());
    }
}

const Game = (() => {
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
        // need to fix logic of when winning happens
        if ( isWinner(history.squares) || e.target.textContent) return;
        console.log(history.squares)
        let player = history.xIsNext ? 'X': 'O';
        let square = e.target.dataset.square;
        history.squares[square] = player;
    
        Game.setHistory(
            history.squares,
            history.round++,
            !history.xIsNext
        )

        displayController.updateSquare(e, player)
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
                console.log('weiner!')
              return squares[a];
            }
          }
          return null;
    }

    return {setHistory, playRound}

})();


function handleClick(e) {
    // console.log(e.target.textContent)
    Game.playRound(e);


}

// const gameBody = document.querySelector('.game-board');
// gameBody.appendChild(displayController.drawRow());
// gameBody.appendChild(displayController.drawRow());
// gameBody.appendChild(displayController.drawRow());

displayController.drawBoard();
const squareButtons = document.querySelectorAll('.square');
squareButtons.forEach(square => square.addEventListener('click', handleClick))

