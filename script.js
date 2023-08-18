
const Player = (name, sign) => {
    const getSign = () => sign;
    return {name, sign, getSign};
}

const ro = Player('Ro', 'X');
console.log(ro.getSign());
const bert = Player('Bert', 'O');
console.log(bert.getSign());


const gameBoard = (() => {
    let inactiveCells = [];
    let cells = document.querySelectorAll(".cell");
    var flag = 1;
    
    const cellClickListener = (event) => {
        const cell = event.target;
            if (cell.value === "0") {
                
                if (flag === 1) {
                    cell.value = "1";
                    cell.innerHTML = 'X';
                    flag = 0;
                    console.log(flag);
                } else if (flag === 0) {
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
                            console.log(`X Won!`);
                        } else {
                            console.log(`O Won!`);
                        }
                        cells.forEach(cell => {
                            cell.removeEventListener("click", cellClickListener);
                            cell.disabled = true; 
                        });
                        return;
                    }
                }
    
                if (inactiveCells.length === 9) {
                    console.log("It's a draw!");
                }
            }
        }
    cells.forEach(cell => cell.addEventListener("click", cellClickListener));
})();
    
    



