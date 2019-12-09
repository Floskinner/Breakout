class Ball{

  constructor(){
    this.position = createVector(width/2, height/2);
    // this.geschwindigkeit = p5.Vector.fromAngle(random(radians(135), radians(45)), 1);
    this.geschwindigkeit = createVector(0,1);
    this.durchmesser = 30;
  }

  run(){
    this.checkBorders();
    this.applyForce();
    this.show();
  }

  applyForce() {
    this.geschwindigkeit.setMag(speedBall.value());
    this.position.add(this.geschwindigkeit);
  }

  show() {
    rectMode(CENTER);
    fill(255);
    rect(this.position.x, this.position.y, this.durchmesser, this.durchmesser);
  }

  resetPosition(){
    this.position = createVector(width/2, height/2);
    this.geschwindigkeit = p5.Vector.fromAngle(random(radians(-45), radians(45)), 3);
  }

  checkBorders(){
    let radiusBall = this.durchmesser / 2;

    if ( this.position.x - radiusBall < 0 || this.position.x + radiusBall > width ){
      this.convertXGeschwindigkeit();
    }
    if ( this.position.y - radiusBall <= 0 ) {
      this.convertYGeschwindigkeit();
    }
  }

  isOutOfCanvas(){
    if ( this.position.y - this.durchmesser/2 > height ){
      return true;
    }
    return false;
  }

  hitPlayer(newY, newAngle){
    let newGeschwindigkeit = p5.Vector.fromAngle(radians(newAngle), this.geschwindigkeit.mag());

    this.position.y = newY;
    this.geschwindigkeit = newGeschwindigkeit;
  }

  convertXGeschwindigkeit(){
    this.geschwindigkeit.x *= -1;
  }

  convertYGeschwindigkeit(){
    this.geschwindigkeit.y *= -1;
  }
}
