# Sudoku-Solver
Project Description
This project is a Sudoku Solver application created with React. Users can interact with a 9x9 Sudoku grid, where they can manually enter numbers, check if the current state is solvable or completed, solve the entire puzzle automatically, or reset the grid.
Features
- **Interactive Grid**: Users can fill in numbers manually in each cell.
- **Check Solution**: Validates if the current Sudoku state is on track to be solved.
- **Solve Sudoku**: Automatically solves the puzzle using a backtracking algorithm.
- **Reset Puzzle**: Resets the grid to its initial state.

Install the dependencies: npm install
start the project : npm start
Code Overview
Key Components and Functions
SudokuSolver Component: Main React component containing the Sudoku grid, input handlers, and button actions.

getDeepCopy: Creates a deep copy of the initial Sudoku grid to prevent state mutations.

onInputChange: Handles user input in each grid cell. This function ensures that only valid numbers (1-9) are entered, and updates the Sudoku grid accordingly.

CompareSudokus: Compares the current grid with the solved grid to check if the puzzle is solved or if it can be solved from the current state. Returns an object indicating if the puzzle is complete or solvable.

Solver: A recursive function implementing the backtracking algorithm to find a solution for the Sudoku puzzle. It uses helper functions to ensure the numbers follow Sudoku rules.

Helper Functions:

checkRow, checkCol, checkBox: Validate if a number can be placed in a row, column, or 3x3 subgrid without violating Sudoku rules.
checkValid: Combines the above functions to confirm a valid placement.
getNext: Determines the next cell to check based on the current position.
checksoduku: Compares the current state of the grid to a solved version. Alerts the user if the puzzle is complete, unsolvable, or incomplete but still solvable.

solvesoduku: Solves the puzzle by using the Solver function and updates the grid with the solution.

resetsoduku: Resets the Sudoku grid to its original, unsolved state.

