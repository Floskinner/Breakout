let gm;
let punkteanzeige;
let speedBall;
let restartButton;

function setup(){
  let cv = createCanvas(windowWidth - 20, windowHeight - 150);
  cv.parent('canvas');
  background(51);

  punkteanzeige = createP();
  punkteanzeige.parent('punkte');


// ==== Add DOM elemets === //
// ======================== //

// == Add Speedcontroll of the Ball == \\
  let divSpeedBall = createDiv();
  divSpeedBall.parent("controller");

  let beschreibungSpeed = createSpan("Change the Speed from the Ball:  ");
  speedBall = createSlider(1, 15, 6, 0.5);

  divSpeedBall.child(beschreibungSpeed);
  divSpeedBall.child(speedBall);

// == Add Restart Button == \\
  restartButton = createButton('restart', 'restart');
  restartButton.parent("controller");
  restartButton.mousePressed(restartGame);

  gm = new GameMaster();
}

function draw(){
  background(51);
  gm.playGame();
}

function restartGame(){
  gm = new GameMaster();
}

class GameMaster{
  constructor(){
    this.newGame();
  }

  playGame(){
    if ( !this.gameOver ){
      this.spieler.run();
      this.ball.run();
      this.checkSpielerKollision();
      this.checkGegnerKollision();

      this.gegnerManager.showGrid();
      this.gegnerManager.showDeadline();

      this.updatePunkteanzeige();
      this.checkGameOver();
    }
    else {
      this.spieler.show();
      this.ball.show();
      this.gegnerManager.showGrid();
      this.gegnerManager.showDeadline();
      this.showGameOver();

      clearInterval(this.newGegnerInterval);
    }
  }

  checkGameOver(){
    let ballOut = this.ball.isOutOfCanvas();
    let gegnerWon = this.gegnerManager.checkWon();

    this.gameOver = ballOut || gegnerWon;
  }

  showGameOver(){
    let textGameOver = 'Game Over!';
    let textPunkte = 'Punkte: ' + this.punkte;

    textSize(32);
    textAlign(CENTER);
    text(textGameOver, width / 2, height / 2);
    text(textPunkte, width / 2, height / 2 + 32 );
  }

  newGame(){
    this.spieler = new Spieler();
    this.ball = new Ball();
    this.gegnerManager = new GegnerManager();

    this.punkte = 0;

    let zeitBisNeueLinie = 10000;
    this.newGegnerInterval = setInterval( this.createNewLine.bind(this), zeitBisNeueLinie);

    this.gameOver = false;
  }

  createNewLine(){
    this.gegnerManager.newLine();
  }

  checkSpielerKollision(){
    let ballX = this.ball.position.x;
    let ballY = this.ball.position.y;
    let ballRadius = this.ball.durchmesser / 2;

    let spielerX = this.spieler.position.x;
    let spielerY = this.spieler.position.y;
    let spielerRadiusH = this.spieler.hoehe / 2;
    let spielerRadiusB = this.spieler.breite / 2;

    if ( ballY + ballRadius > spielerY - spielerRadiusH && ballY - ballRadius < spielerY + spielerRadiusH ) {
      if ( ballX + ballRadius > spielerX - spielerRadiusB && ballX - ballRadius < spielerX + spielerRadiusB ){
        let distanceToCenter = abs((spielerX-spielerRadiusB) - ballX);
        let newAngle = map(distanceToCenter, 0, spielerRadiusB*2, -160, -30)

        let newBallY = spielerY - spielerRadiusH - ballRadius;
        this.ball.hitPlayer(newBallY, newAngle);
      }
    }
  }

  checkGegnerKollision(){
    let ballPosition = this.ball.position;
    let ballRadius = this.ball.durchmesser / 2;

    let hitGegner = this.gegnerManager.checkBallHit(ballPosition, ballRadius);
    switch (hitGegner) {
      case 1:
        this.ball.convertYGeschwindigkeit();
        this.punkte += 100;
        break;
      case 2:
        this.ball.convertXGeschwindigkeit();
        this.punkte += 100;
        break;
    }
  }

  updatePunkteanzeige(){
    punkteanzeige.html(this.punkte);
  }

}
