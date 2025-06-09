const boardElement = document.getElementById('sudoku-board');
const message = document.getElementById('message');

const puzzles = [
  {
    puzzle: [
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
  },
  {
    puzzle: [
      [0, 0, 6, 0, 0, 0, 2, 0, 0],
      [0, 5, 0, 0, 9, 0, 0, 6, 0],
      [4, 0, 0, 7, 0, 6, 0, 0, 3],
      [0, 0, 5, 0, 0, 0, 9, 0, 0],
      [0, 9, 0, 8, 0, 4, 0, 1, 0],
      [0, 0, 8, 0, 0, 0, 4, 0, 0],
      [1, 0, 0, 4, 0, 9, 0, 0, 6],
      [0, 4, 0, 0, 1, 0, 0, 9, 0],
      [0, 0, 9, 0, 0, 0, 5, 0, 0]
    ],
    solution: [
      [9, 1, 6, 3, 8, 5, 2, 7, 4],
      [8, 5, 7, 2, 9, 4, 3, 6, 1],
      [4, 2, 3, 7, 1, 6, 8, 5, 9],
      [6, 8, 5, 1, 7, 2, 9, 4, 3],
      [2, 9, 1, 8, 6, 4, 7, 3, 5],
      [7, 3, 4, 9, 5, 1, 6, 2, 8],
      [1, 7, 2, 4, 3, 9, 5, 8, 6],
      [5, 4, 8, 6, 1, 7, 1, 9, 2],
      [3, 6, 9, 5, 2, 8, 1, 2, 7]
    ]
  }
];

let puzzle = [];
let solution = [];

function pickRandomPuzzle() {
  const random = puzzles[Math.floor(Math.random() * puzzles.length)];
  puzzle = JSON.parse(JSON.stringify(random.puzzle));
  solution = JSON.parse(JSON.stringify(random.solution));
}

function renderBoard() {
  boardElement.innerHTML = '';
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const val = puzzle[r][c];
      const cell = document.createElement('input');
      cell.type = 'text';
      cell.maxLength = 1;
      cell.classList.add('cell');
      cell.dataset.row = r;
      cell.dataset.col = c;
      if (val !== 0) {
        cell.value = val;
        cell.classList.add('prefilled');
        cell.disabled = true;
      }
      boardElement.appendChild(cell);
    }
  }
  message.textContent = '';
}

function newGame() {
  pickRandomPuzzle();
  renderBoard();
}

function checkSolution() {
  const cells = document.querySelectorAll('.cell');
  let correct = true;
  message.textContent = '';

  cells.forEach(cell => {
    const r = +cell.dataset.row;
    const c = +cell.dataset.col;
    if (!cell.classList.contains('prefilled')) {
      const val = parseInt(cell.value);
      if (val !== solution[r][c]) {
        cell.classList.add('invalid');
        correct = false;
      } else {
        cell.classList.remove('invalid');
      }
    }
  });

  if (correct) {
    message.textContent = '✅ Congratulations! Puzzle Solved!';
    message.style.color = 'green';
  } else {
    message.textContent = '❌ Some entries are incorrect.';
    message.style.color = 'red';
  }
}

window.onload = () => {
  pickRandomPuzzle();
  renderBoard();
};
