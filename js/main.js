//UNDONE: css styling verbeteren (positie midden op het scherm)
//UNDONE: slang staart einde
//UNDONE: game is responsive
//UNDONE: game online zetten
//BUG: blauwe bal kan soms in de positie van de slange staart voorkomen  

let boardSize = 10;//bepaald hoe groot het veld moet zijn met de getallen 0-9 in dit geval
let board = document.getElementById("board");//dit is het bord
let keyboardInput = document.getElementById("keyboardInput");//dit zorgt ervoor dat je met de pijltoetsen kan besturen
//let direction = [0,0]; //alternatief
let direction = 0;//Dit is het begin directie het is 0 omdat de slang in het begin niet beweegt
let foodIsEaten = true;//als het voedsel wordt opgegeten wodt ie niet veranderd van plek maar als de slang het balltje aanraakt word het false en dan gaat er iets gebeuren (het verplaatsen dus)
let snakePosition = { x: Math.floor(boardSize / 2), y: Math.floor(boardSize / 2) }; //doordat je de horizontale as (x) en de verticale as (y) allebei deelt door 2 komt de slang in het midden uit bij het starten van het spel
let foodPosition = { x: 0, y: 0 };//hier laat je zien dat het blauwe balletje random wordt verplaatst in tijdens het laden het spel en als de slang het balletje raakt

let snakePositions = [];//Dat slaat alle posities van de hele slang op. geen integer = oneindig doorgaan met het voedsel binnen happen
// snakePositions.push("x" + snakePosition.x + "y" + snakePosition.y);

function drawBoard() {
    //drawBoard (maakt het speelveld dat is opgebouwd uit div elementen met een unieke id)
    for (let y = 0; y < boardSize; y++) {
        for (let x = 0; x < boardSize; x++) {
            board.innerHTML += "<div id='x" + x + "y" + y + "' class='cell'>x" + x + "y" + y + "</div>";
        }
        board.innerHTML += "<br>";
    }
}

function clearBoard() {
    //clearBoard (maak het bord leeg door de class van alle blokjes terug te zetten naar cell)
    document.querySelectorAll('.cell').forEach(function (cell) {
        cell.className = "cell";
    });

}

// updatesnakePosition

function updatesnakePosition() {

    //snakePosition.y += direction[1]; //alternatief
    //snakePosition.x += direction[0]; //alternatief   

    if (direction == 1) {//pijltje naar boven en de slang gaat verder naar boven (y is verticaal en de nummer word van boven naar onder geteld dus -1 = omhoog)
        snakePosition.y = snakePosition.y - 1;
    }
    if (direction == 2) {//pijltje naar beneden en de slang gaat verder naar beneden (y is verticaal en de nummer word van boven naar onder geteld dus +1 = omlaag)
        snakePosition.y = snakePosition.y + 1;
    }
    if (direction == 3) {//pijltje naar rechts en de slang gaat verder naar rechts (x is horizontaal en de nummer word van links naar rechts geteld dus +1 = rechts)
        snakePosition.x = snakePosition.x + 1;
    }
    if (direction == 4) {//pijltje naar links en de slang gaat verder naar links (x is horizontaal en de nummer word van links naar rechts geteld dus -1 = links)
        snakePosition.x = snakePosition.x - 1;
    }

    snakePositions.shift();
    snakePositions.push("x" + snakePosition.x + "y" + snakePosition.y);

}

//resetGame

function resetGame() {//hiermee gaat snake naar het middenstartpunt tijdens het restten van het spel
    //direction = [0,0]; //alternatief
    direction = 0;
    snakePosition = { x: Math.floor((boardSize - 1) / 2), y: Math.floor((boardSize - 1) / 2) };
    snakePositions = [];
    snakePositions.push("x" + snakePosition.x + "y" + snakePosition.y);
}

//collisionBoarderCheck

function collisionCheck() {
    //checkt of de slang buiten het speelveld komt
    if (snakePosition.x < 0 || snakePosition.y < 0 || snakePosition.x > boardSize - 1 || snakePosition.y > boardSize - 1) { resetGame() }

    //checken of slag zichzelf raakt = als positie van het hoofd hetzelfde is als een van de posities van het lijf

    let snakePositionControle = "x"+snakePosition.x+"y"+snakePosition.y;
    
    for(let i=0;i<snakePositions.length-1;i++)
    {
        if (snakePositionControle==snakePositions[i])
        {
            //console.log("botsing tegen eigen lijf!!!!");
            resetGame();
        }
    }


}

//drawSnake

function drawSnake() {//dit uitgezet anders gaat de snake te snel
    // let snakeHeadsnakePosition = "x" + snakePosition.x + "y" + snakePosition.y;
    // document.getElementById(snakeHeadsnakePosition).className += " bodySnake";
    for (let i = 0; i < snakePositions.length; i++) {
        if (i == 0) {
            //TODO: staart wordt getekend
           
            //document.getElementById(snakePositions[i]).className += " bodyTail";
            //document.getElementById(snakePositions[i]).className += " bodyHeadDirection" + direction;
      
        }
        if (i == snakePositions.length - 1) {
            //DONE: hoofd wordt getekend
            document.getElementById(snakePositions[i]).className += " bodyHead";
            document.getElementById(snakePositions[i]).className += " bodyHeadDirection" + direction;
        }
        console.log(snakePositions[i]);
        document.getElementById(snakePositions[i]).className += " bodySnake";
    }

    document.getElementById("keyboardInput").innerHTML = snakePositions.length;

}

//drawFood

function drawFood() {
    if (foodIsEaten) {
        //
        //TODO: zorg er voor dat het voedsel nooit op de slang kan komen te staan!!
        //
        let xRandom = Math.floor(Math.random() * (boardSize - 1));
        let yRandom = Math.floor(Math.random() * (boardSize - 1));
        foodPosition.x = xRandom;
        foodPosition.y = yRandom;
        foodIsEaten = false;
    }
    let foodPositionID = "x" + foodPosition.x + "y" + foodPosition.y;
    document.getElementById(foodPositionID).className += " food";
}

function snakeEatsFood() {
    if (snakePosition.x == foodPosition.x && snakePosition.y == foodPosition.y) {
        console.log("Yummy!!!!!!");
        foodIsEaten = true;
        snakePositions.push("x" + snakePosition.x + "y" + snakePosition.y);
        console.log(snakePositions);
    }
}
//gameLoop
let timeCounter = 0;
function gameLoop() {

    updatesnakePosition();//slang beweegt
    collisionCheck();//kijkt dat de slang ergens tegen aan botst.
    clearBoard();//maakt bij alle divs de class "cell" aan.
    drawFood();//maakt de blauwe balletje met gebruik van css
    drawSnake();//maakt de slang met gebruik van css
    snakeEatsFood();//checkt als de slang het eten eet.

    timeCounter++;
    var timeoutTime = 550 - snakePositions.length * 30 - timeCounter / 2;
    if (timeoutTime < 100) {
        timeoutTime = 100;
    }
    // console.log(timeoutTime); //start de tijd in console
    setTimeout(gameLoop, timeoutTime);//Deze moet niet uitgezet worden want dan beweegt de slang niet
}

//start Game here......

drawBoard();

// setInterVal werkt niet als je de slang sneller wilt laten gaan...
// TODO: werk met window.requestAnimationFrame i.p.v. setInterval
//

setTimeout(gameLoop, 0);

// keyboard controls

window.addEventListener("keydown", function (event) {

    if (event.key == "ArrowUp") {
        //direction = [0,-1]; //alternatief
        if (direction != 2) {
            direction = 1;
        }
    }
    if (event.key == "ArrowDown") {
        //direction = [0,1]; //alternatief
        if (direction != 1) {
            direction = 2;
        }
    }
    if (event.key == "ArrowRight") {
        //direction = [1,0]; //alternatief
        if (direction != 4) {
            direction = 3;
        }
    }
    if (event.key == "ArrowLeft") {
        //direction = [-1,0]; //alternatief
        if (direction != 3) {
            direction = 4;
        }

    }

   keyboardInput.innerHTML = "direction:" + direction;
}, true);