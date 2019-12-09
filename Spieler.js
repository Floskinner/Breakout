class Spieler{

  constructor(xPosition){
    this.breite = 100;
    this.hoehe = 10;

    this.position = createVector(width / 2, height - this.hoehe * 2);
  }

  run(){
    this.update();
    this.show();
  }

  update(){
    this.position.x = mouseX;
  }

  show(){
    rectMode(CENTER);
    fill(255);
    rect(this.position.x, this.position.y, this.breite, this.hoehe);
  }
}
