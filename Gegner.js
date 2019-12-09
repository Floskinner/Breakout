class Gegner{

  constructor(x, y, breite, hoehe){
    this.xPosition = x;
    this.yPosition = y;

    this.breite = breite;
    this.hoehe  = hoehe;

    this.isDead = false;
  }

  checkBallHit(positionBall, radiusBall){
    if ( !this.isDead ){
      let ballY = positionBall.y;
      let ballX = positionBall.x;

      if ( this.yPosition + this.hoehe > ballY - radiusBall && this.yPosition < ballY + radiusBall ) {

        // Only left or right in small spot
        if( this.yPosition + this.hoehe - radiusBall/2 > ballY - radiusBall  && this.yPosition + radiusBall/2 < ballY + radiusBall ){
          // Check left hit
          if ( this.xPosition < ballX + radiusBall && this.xPosition + radiusBall/2 > ballX - radiusBall ){
              this.isDead = true;
              return 2;
          }
          // Check right hit
          if ( this.xPosition + this.breite - radiusBall/2 < ballX + radiusBall && this.xPosition + this.breite > ballX - radiusBall ){
            this.isDead = true;
            return 2;
          }
        }
        // Check center hit
        if ( this.xPosition < ballX + radiusBall && this.xPosition + this.breite > ballX - radiusBall ){
          this.isDead = true;
          return 1;
        }
      }
    }
    return 0;
  }

  respawn(x){
    this.isDead = false;
  }


  show(){
    if ( !this.isDead ){
      fill(255);
      rectMode(CORNER);
      rect(this.xPosition, this.yPosition, this.breite, this.hoehe, 150);
    }
    // else {
    //   fill(255, 100);
    //   rectMode(CORNER);
    //   rect(this.xPosition, this.yPosition, this.breite, this.hoehe, 150);
    // }
  }
}
