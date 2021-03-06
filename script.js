const board = document.querySelector('#board');
const cells = document.querySelectorAll('.cell');
const winState = document.querySelector('#winningMessage');
const winMessage = document.querySelector('#message');
const resetBtn = document.querySelector('#reset');
const newGameBtn = document.querySelector('#newGameBtn');
const symbol_X = ' x';
const symbol_O = ' o';
let X_wins = 0;
let O_wins = 0;

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startGame();
newGameBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', startGame);

function startGame(e){  
    cells.forEach((cell) => {
        cell.classList.remove(symbol_X.trim());
        cell.classList.remove(symbol_O.trim());
        winState.classList.remove('show');
        cell.removeEventListener('click', handler);
        cell.addEventListener('click', handler, { once: true });
    });
    if (e?.target.id === 'reset'){
        X_wins = 0;
        O_wins = 0;
        document.querySelector('#x').innerHTML = X_wins;
        document.querySelector('#o').innerHTML = O_wins;
    }
}

function handler(e) {
    let currentState = board.className;

    if (currentState.endsWith(symbol_X)) {
        e.target.className += symbol_X;
        if(check(symbol_X)) {
            X_wins++;
            document.querySelector('#x').innerHTML = X_wins;
            winState.className += ' show'; 
            winMessage.innerText = `${symbol_X.trim().toLocaleUpperCase()} WINS!`;
        }
        board.className = currentState.replace(symbol_X, symbol_O);
    } else {
        e.target.className += symbol_O;
        if(check(symbol_O)) {
            O_wins++;
            document.querySelector('#o').innerHTML = O_wins;
            winState.className += ' show';
            winMessage.innerText = `${symbol_O.trim().toLocaleUpperCase()} WINS!`;
        }
        board.className = currentState.replace(symbol_O, symbol_X);
    }
}

function check(symbol) {
    return winningPatterns.some((pattern) => {
        return pattern.every((index) => {
            return cells[index].className.endsWith(symbol);
        })
    })
}

// function reset() {
    
// }