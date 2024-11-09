import React, { useState } from 'react';
import './style.css';

const initial = [
    [-1, 5, -1, 9, -1, -1, -1, -1, -1],
    [8, -1, -1, -1, 4, -1, 3, -1, 7],
    [-1, -1, -1, 2, 8, -1, 1, 9, -1],
    [5, 3, 8, 6, -1, 7, 9, 4, -1],
    [-1, 2, -1, 3, -1, 1, -1, -1, -1],
    [1, -1, 9, 8, -1, 4, 6, 2, 3],
    [9, -1, 7, 4, -1, -1, -1, -1, -1],
    [-1, 4, 5, -1, -1, -1, 2, -1, 9],
    [-1, -1, -1, -1, 3, -1, -1, 7, -1]
];

function SudokuSolver() {
    const [sudoku, setSudoku] = useState(getDeepCopy(initial));

    function getDeepCopy(arr) {
        return JSON.parse(JSON.stringify(arr));
    }

    function onInputChange(e, row, col) {
        const val = parseInt(e.target.value) || -1;
        const grid = getDeepCopy(sudoku);
        if (val === -1 || (val >= 1 && val <= 9)) {
            grid[row][col] = val;
        }
        setSudoku(grid);
    }

    function CompareSudokus(current, solved) {
        let res = {
            isComplete: true,
            isSolvable: true
        };
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (current[i][j] !== solved[i][j]) {
                    if (current[i][j] !== -1) {
                        res.isSolvable = false;
                    }
                    res.isComplete = false;
                }
            }
        }
        return res;
    }

    function checksoduku() {
        let sudokusolve = getDeepCopy(initial);
        Solver(sudokusolve);
        let compare = CompareSudokus(sudoku, sudokusolve);
        if (compare.isComplete) {
            alert("Congratulations! You Have Solved");
        } else if (compare.isSolvable) {
            alert("Keep Going");
        } else {
            alert("Sudoku Can't be Solved, try again");
        }
    }

    function checkRow(grid, row, num) {
        return grid[row].indexOf(num) === -1;
    }

    function checkCol(grid, col, num) {
        return grid.map(row => row[col]).indexOf(num) === -1;
    }

    function checkBox(grid, row, col, num) {
        let boxArr = [];
        let rowStart = row - (row % 3);
        let colStart = col - (col % 3);
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                boxArr.push(grid[rowStart + i][colStart + j]);
            }
        }
        return boxArr.indexOf(num) === -1;
    }

    function checkValid(grid, row, col, num) {
        return checkRow(grid, row, num) && checkCol(grid, col, num) && checkBox(grid, row, col, num);
    }

    function getNext(row, col) {
        return col !== 8 ? [row, col + 1] : row !== 8 ? [row + 1, 0] : [0, 0];
    }

    function Solver(grid, row = 0, col = 0) {
        if (grid[row][col] !== -1) {
            let isLast = row >= 8 && col >= 8;
            if (!isLast) {
                let [newRow, newCol] = getNext(row, col);
                return Solver(grid, newRow, newCol);
            }
        }
        for (let num = 1; num <= 9; num++) { // Change loop condition
            if (checkValid(grid, row, col, num)) {
                grid[row][col] = num;
                let [newRow, newCol] = getNext(row, col);
                if (newRow === 0 && newCol === 0) return true;
                if (Solver(grid, newRow, newCol)) return true;
            }
        }
        grid[row][col] = -1;
        return false;
    }

    function solvesoduku() {
        let sudokusolve = getDeepCopy(initial);
        Solver(sudokusolve);
        setSudoku(sudokusolve);
    }

    function resetsoduku() {
        setSudoku(getDeepCopy(initial));
    }

    return (
        <div className='Main'>
            <div className='Header'>
                <h2>Sudoku Solver</h2>
                <table className='grid-table'>
                    <tbody>
                        {Array.from({ length: 9 }).map((_, rowIndex) => (
                            <tr key={rowIndex} className={(rowIndex + 1) % 3 === 0 ? 'bBorder' : ''}>
                                {Array.from({ length: 9 }).map((_, colIndex) => (
                                    <td key={`${rowIndex}-${colIndex}`} className={(colIndex + 1) % 3 === 0 ? 'rBorder' : ''}>
                                        <input
                                            type="text"
                                            onChange={(e) => onInputChange(e, rowIndex, colIndex)}
                                            value={sudoku[rowIndex][colIndex] === -1 ? '' : sudoku[rowIndex][colIndex]}
                                            className='CellInput'
                                            disabled={initial[rowIndex][colIndex] !== -1}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='buttonContainer'>
                    <button className='checkButton' onClick={checksoduku}>Check</button>
                    <button className='solveButton' onClick={solvesoduku}>Solve</button>
                    <button className='resetButton' onClick={resetsoduku}>Reset</button>
                </div>
            </div>
        </div>
    );
}

export default SudokuSolver;
