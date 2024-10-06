document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset');
    const startButton = document.getElementById('start-button');
    const board = document.querySelector('.board');
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = false;

    const winningConditions = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];

    startButton.addEventListener('click', () => {
        board.style.display = 'grid';
        resetButton.style.display = 'inline-block';
        startButton.style.display = 'none';
        gameActive = true;
    });

    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedIndex = clickedCell.getAttribute('data-index');

        if (gameState[clickedIndex - 1] !== '' || !gameActive) {
            return;
        }

        updateCell(clickedCell, clickedIndex - 1);
        checkForWinner();
    }

    function handleKeyPress(event) {
        const keyPressed = event.key;
        const validKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
        
        if (validKeys.includes(keyPressed)) {
            const index = parseInt(keyPressed) - 1;
            const targetCell = cells[index];

            if (gameState[index] === '' && gameActive) {
                updateCell(targetCell, index);
                checkForWinner();
            }
        }
    }

    function updateCell(cell, index) {
        gameState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkForWinner() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i].map(idx => idx - 1);
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];

            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                highlightWinningCells(winCondition);
                break;
            }
        }

        if (roundWon) {
            gameActive = false;
            setTimeout(() => {
                alert(`Player ${currentPlayer === 'X' ? 'O' : 'X'} wins!`);
                resetBoard();
            }, 100);
            return;
        }

        if (!gameState.includes('')) {
            gameActive = false;
            setTimeout(() => {
                alert('Draw!');
                resetBoard();
            }, 100);
        }
    }

    function highlightWinningCells(winCondition) {
        winCondition.forEach(index => {
            cells[index].classList.add('win');
        });
    }

    function resetBoard() {
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('win');
        });
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetBoard);
    document.addEventListener('keydown', handleKeyPress);
});
