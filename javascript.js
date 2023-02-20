const tiles = document.getElementsByClassName('tile');
const pOne = document.getElementById('pOne');
const pTwo = document.getElementById('pTwo');
const reset = document.getElementById('reset');
const winner = document.getElementById('winner');
const playerOneName = document.getElementById('playerOneName');
const playerTwoName = document.getElementById('playerTwoName');
const start = document.getElementById('start');
const boardContainer = document.getElementById('boardContainer');
const setupForm = document.getElementById('setupForm');
const playerOneHeader = document.getElementById('playerOneHeader');
const playerTwoHeader = document.getElementById('playerTwoHeader');
const playerOneScore = document.getElementById('playerOneScore');
const playerTwoScore = document.getElementById('playerTwoScore');
const winnerContainer = document.getElementById('winnerContainer');
const sidebarBtn = document.getElementById('openSidebar');
const sideBar = document.getElementById('sideBar');
const sideBarOneName = document.getElementById('sideBarOneName');
const sideBarTwoName = document.getElementById('sideBarTwoName');
const sideBarStart = document.getElementById('sideBarStart');


start.addEventListener('click', function(){
    let validation = validate(playerOneName, playerTwoName);
    if (validation) {
        startGame();
    }
});
sidebarBtn.addEventListener('click', openSideBar);


function validate(inputOne, inputTwo) {
    let inputList = [inputOne, inputTwo];
    for (i = 0; i < inputList.length; i++) {
        let e = inputList[i];
        if (e.value === "") {
            e.style.border = "2px solid red";
            return false;
        } else {
            e.style.border = "2px solid #475569";
        }
    }
    return true;
}


//start game 
function startGame() {
    //create objects and set default variables
    const board = new gameBoard();
    board.newBoard();
    const playerOne = new player("X", playerOneName.value);
    const playerTwo = new player("O", playerTwoName.value);
    playerOneHeader.textContent = playerOneName.value + ":";
    playerTwoHeader.textContent = playerTwoName.value + ":";
    playerOneScore.textContent = playerOne.score;
    playerTwoScore.textContent = playerTwo.score;

    //change visibility of board
    boardContainer.style.visibility = 'visible';
    setupForm.style.visibility = 'hidden';

    function gameBoard() {
        this.gameOver = false;
        //attach tiles to board object
        this.turnCount = 1;
        this.board = {};
        this.newBoard = () => {
            for (i = 0; i < tiles.length; i++) {
            let e = tiles[i];
            e.textContent = "";
            this.board[e.id] = e.textContent;
            }
        }
        //add event listener for tiles and pass in function                
        for (i = 0; i < tiles.length; i++) {
            let e = tiles[i];
            e.addEventListener('click', playTurn);
        }
    
        reset.addEventListener('click', resetGame);
    }
    
    //player object
    function player(sign, name) {
        this.name = name;
        this.sign = sign;
        this.score = 0;
        this.playedTurn = false;
        this.turn = (e) => {
            e.textContent = this.sign;
        }
    }
    
    
    //game function
    function playTurn() {
        console.log(board.turnCount);
        //figures out who's turn it is and checks if element is empty
        if (playerOne.playedTurn === false && this.textContent === "" && !board.gameOver) {
            playerOne.turn(this, this.id);
            playerOne.playedTurn = true; 
            board.board[this.id] = playerOne.sign;
            checkVictory(playerOne);
            board.turnCount += 1;
        } else if (playerOne.playedTurn === true && this.textContent === "" && !board.gameOver) {
            playerTwo.turn(this, this.id);
            playerOne.playedTurn = false;
            board.board[this.id] = playerTwo.sign;
            checkVictory(playerTwo);
            board.turnCount += 1;
        }
    }
    
    //See if anyone wins
    function checkVictory(player) {
        let b = Object.values(board.board);
        const conditions = [b.slice(0,3), b.slice(3, 6), b.slice(6, 9), [b[0], b[3], b[6]], [b[1], b[4], b[7]], [b[2], b[5], b[8]], [b[0], b[4], b[8]], [b[2], b[4], b[6]]];
        for (i = 0; i < conditions.length; i++) {
            if (conditions[i][0] === player.sign && conditions[i][1] === player.sign && conditions[i][2] === player.sign && board.turnCount < 10) {
                victory(player);
            } else if (board.turnCount === 9) {
                draw();
            }
        }
        return false;
         
    }
    
    function victory(player) {
        winner.textContent = `${player.name} is the winner!`
        player.score += 1;
        playerOneScore.textContent = playerOne.score;
        playerTwoScore.textContent = playerTwo.score;
        board.gameOver = true;
        reset.style.visibility = 'visible';
        winnerContainer.style.visibility = 'visible';
        board.turnCount = 0;
    }

    function draw() {
        winner.textContent = "The game is a draw!"
        board.gameOver = true;
        board.turnCount = 0;
        reset.style.visibility = 'visible';
        winnerContainer.style.visibility = 'visible';
    }
    
    function resetGame() {
        board.board = {};
        board.newBoard();
        playerOne.playedTurn = false;
        board.gameOver = false;
        winner.textContent = "";
        reset.style.visibility = 'hidden';
        winnerContainer.style.visibility = 'hidden';
    }

    sideBarStart.addEventListener('click', function(){
        let validation = validate(sideBarOneName, sideBarTwoName);
        if (validation) {
            playerOneHeader.textContent = sideBarOneName.value + ":";
            playerTwoHeader.textContent = sideBarTwoName.value + ":";
            playerOne.name = sideBarOneName.value;
            playerTwo.name = sideBarTwoName.value;
            playerOne.score = 0;
            playerTwo.score = 0;
            playerOneScore.textContent = playerOne.score;
            playerTwoScore.textContent = playerTwo.score;
            resetGame();
            openSideBar();
            sideBarOneName.value = "";
            sideBarTwoName.value = "";
        }
        
    })
    
}

let sideBarStatus = false;
//open and close sidebar
function openSideBar() {
    if (!sideBarStatus) {
        sidebarBtn.style.right = '-235px';
        sidebarBtn.textContent = "<";
        sideBar.style.visibility = 'visible';
        sideBarStatus = true;
    } else {
        sidebarBtn.style.right = '-30px';
        sidebarBtn.textContent = ">";
        sideBar.style.visibility = 'hidden';
        sideBarStatus = false;
    }
    
}
