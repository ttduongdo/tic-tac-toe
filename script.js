const dialog = document.querySelector('.dialog');

const Player = (sign) => {
    const getSign = () => sign;
    return {sign, getSign};
}

const playerOne = Player();

const playerTwo = Player();




const gameBoard = (() => {
    let inactiveCells = [];
    let cells = document.querySelectorAll(".cell");
    var flag = 1;
    const message = dialog.querySelector(".message")
    var xScore = 0;
    var oScore = 0;
    
    const x = document.querySelector(".X.score");
    const o = document.querySelector(".O.score");
    const cellClickListener = (event) => {
        const cell = event.target;
            if (cell.value === "0") {
                
                if (flag === 1) {
                    cell.value = "1";
                    cell.innerHTML = 'X';
                    flag = 0;
                    console.log(flag);
                } else {
                    cell.value = "2";
                    cell.innerHTML = 'O';
                    flag = 1;
                    console.log(flag);
                }
                inactiveCells.push(cell);
                console.log(inactiveCells);

                cell.removeEventListener("click", cellClickListener);
                
                const winConditions = [
                    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
                    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
                    [0, 4, 8], [2, 4, 6]            // Diagonals
                ];
    
                for (const condition of winConditions) {
                    const [a, b, c] = condition;
                    if (
                        cells[a].value === cells[b].value &&
                        cells[b].value === cells[c].value &&
                        (cells[a].value === "1" || cells[a].value === "2")
                    ) {
                        if (cells[a].value === "1") {
                            xScore += 1;
                            message.innerHTML = `X Won!`;
                            dialog.showModal();
                        } else {
                            oScore += 1;
                            message.innerHTML = `O Won!`;
                            dialog.showModal();
                        }
                        x.innerHTML = `${xScore}`;
                        o.innerHTML = `${oScore}`;
                        cells.forEach(cell => {
                            cell.removeEventListener("click", cellClickListener);
                            cell.disabled = true; 
                        });
                        return;
                    }
                }
    
                if (inactiveCells.length === 9) {
                    xScore += 1;
                    oScore += 1;
                    x.innerHTML = `${xScore}`;
                    o.innerHTML = `${oScore}`;
                    message.innerHTML = "It's a draw!";
                    dialog.showModal();
                }
            }
        }
    const resetGame = () => {
        cells.forEach(cell => {
            cell.value = "0";
            cell.innerHTML = "";
            cell.disabled = false;
        });

        inactiveCells = [];
        flag = 1;
        dialog.close();
        
        cells.forEach(cell => cell.addEventListener("click", cellClickListener));
    };

    cells.forEach(cell => cell.addEventListener("click", cellClickListener));

    const resetButton = dialog.querySelector('button[value="again"]');
    resetButton.addEventListener("click", resetGame);

    const cancelButton = dialog.querySelector('button[value="cancel"]');
    cancelButton.addEventListener("click", () => {
        dialog.close();
    });

    // return {
    //     cells,
    //     resetGame,
    // };
})();









