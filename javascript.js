const tiles = document.getElementsByClassName('tile');
const pOne = document.getElementById('pOne');
const pTwo = document.getElementById('pTwo');
const reset = document.getElementById('reset');

//gameboard object
function gameBoard() {
    this.board = [tiles[0].textContent, tiles[1].textContent, tiles[2].textContent,
                    tiles[3].textContent, tiles[4].textContent, tiles[5].textContent, 
                    tiles[6].textContent, tiles[7].textContent, tiles[8].textContent]
    //add event listener for tiles and pass in function                
    this.click = (tile) => {
        for (i = 0; i < tiles.length; i++) {
            let e = tiles[i];
            e.addEventListener('click', tile);
        }
    }
}


const myBoard = new gameBoard();
console.log(myBoard.board);

//player one object
function playerOne() {
    this.sign = "X";
    this.moveList = [];
    this.turn = (e, index) => {
        e.textContent = this.sign;
        this.moveList.push(index);
    }
}
//player two object
function playerTwo() {
    this.sign = "O";
    this.moveList = [];
}
//computer object

//game function
function play() {
    
}