document.addEventListener('DOMContentLoaded', () => {
    const boardElement = document.getElementById('sudoku-board');
    const messageElement = document.getElementById('message');
    const newGameBtn = document.getElementById('new-game-btn');
    const checkBtn = document.getElementById('check-btn');
    const solveBtn = document.getElementById('solve-btn');

    let currentPuzzle = {};

    const puzzles = [
        {
            board: [
                [5, 3, 0, 0, 7, 0, 0, 0, 0],
                [6, 0, 0, 1, 9, 5, 0, 0, 0],
                [0, 9, 8, 0, 0, 0, 0, 6, 0],
                [8, 0, 0, 0, 6, 0, 0, 0, 3],
                [4, 0, 0, 8, 0, 3, 0, 0, 1],
                [7, 0, 0, 0, 2, 0, 0, 0, 6],
                [0, 6, 0, 0, 0, 0, 2, 8, 0],
                [0, 0, 0, 4, 1, 9, 0, 0, 5],
                [0, 0, 0, 0, 8, 0, 0, 7, 9]
            ],
            solution: [
                [5, 3, 4, 6, 7, 8, 9, 1, 2],
                [6, 7, 2, 1, 9, 5, 3, 4, 8],
                [1, 9, 8, 3, 4, 2, 5, 6, 7],
                [8, 5, 9, 7, 6, 1, 4, 2, 3],
                [4, 2, 6, 8, 5, 3, 7, 9, 1],
                [7, 1, 3, 9, 2, 4, 8, 5, 6],
                [9, 6, 1, 5, 3, 7, 2, 8, 4],
                [2, 8, 7, 4, 1, 9, 6, 3, 5],
                [3, 4, 5, 2, 8, 6, 1, 7, 9]
            ]
        }
    ];

    function newGame() {
        currentPuzzle = puzzles[0]; // For simplicity, always use the first puzzle
        boardElement.innerHTML = '';
        messageElement.textContent = '';

        for (let r = 0; r < 9; r++) {
            const rowElement = document.createElement('div');
            rowElement.classList.add('row');
            for (let c = 0; c < 9; c++) {
                const cell = document.createElement('input');
                cell.type = 'number';
                cell.classList.add('cell');
                cell.id = `cell-${r}-${c}`;
                cell.min = 1;
                cell.max = 9;

                if (currentPuzzle.board[r][c] !== 0) {
                    cell.value = currentPuzzle.board[r][c];
                    cell.disabled = true;
                    cell.classList.add('pre-filled');
                }
                rowElement.appendChild(cell);
            }
            boardElement.appendChild(rowElement);
        }
    }

    function checkSolution() {
        let isCorrect = true;
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                const cell = document.getElementById(`cell-${r}-${c}`);
                cell.classList.remove('incorrect');
                if (cell.value && parseInt(cell.value) !== currentPuzzle.solution[r][c]) {
                    cell.classList.add('incorrect');
                    isCorrect = false;
                }
            }
        }
        messageElement.textContent = isCorrect ? 'Congratulations! You solved it!' : 'There are some errors. Keep trying!';
    }

    function solveSudoku() {
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                const cell = document.getElementById(`cell-${r}-${c}`);
                cell.value = currentPuzzle.solution[r][c];
                cell.classList.remove('incorrect');
            }
        }
        messageElement.textContent = 'Here is the solution.';
    }

    newGameBtn.addEventListener('click', newGame);
    checkBtn.addEventListener('click', checkSolution);
    solveBtn.addEventListener('click', solveSudoku);

    // Initial game load
    newGame();
});