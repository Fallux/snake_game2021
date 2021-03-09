console.log("start2");
let boardsize = 12;
let board = document.getElementById("board");

function drawBoard() {
    for (let j = 0; j < boardsize; j++) {

        for (let i = 0; i < boardsize; i++) {
            board.innerHTML += "<div id='x" + i + "y" + j + "' class= 'cell'></div>";
        }
        board.innerHTML += "<br>";
    }
}

drawBoard();
//hoe streng wordt er naar gekeken met het overschrijven van de excacte lettergrote?
let halfBoardSize = Math.round(boardsize/2)-1;
let snakeHeadPosition = "x"+halfBoardSize+"y"+halfBoardSize;
console.log(snakeHeadPosition);
let head = document.getElementById(snakeHeadPosition).style.background="red";
