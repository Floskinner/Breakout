class GegnerManager {

  constructor(){
    this.spielfeldHeigth = height * 0.66;
    this.grid = this.createGrid();
  }

  createGrid(){
    let anzahlSpalten = 10;
    let hoeheGegner = 20;
    let anzahlReihen = parseInt(this.spielfeldHeigth / hoeheGegner, 10);

    let startGrid = this.create2DArray(anzahlSpalten, anzahlReihen);

    startGrid = this.fillGrid(startGrid);
    return startGrid;
  }

  newLine(){
    for ( let x = 0; x < this.grid.length; x++ ){
      let tmp0 = this.grid[x][0].isDead;
      for ( let y = 1; y < this.grid[x].length; y++ ){
        let tmp1 = this.grid[x][y].isDead;

        this.grid[x][y].isDead = tmp0;
        tmp0 = tmp1;
      }
      this.grid[x][0].isDead = false;
    }
  }

  checkWon(){
    for ( let x = 0; x < this.grid.length; x++ ){
      let y = this.grid[x].length-1;

      if ( !this.grid[x][y].isDead ){
        return true;
      }
    }
    return false;
  }

  checkBallHit(positionBall, radiusBall){
    for ( let y = this.grid[0].length-1; y >= 0; y-- ){
      for ( let x = 0; x < this.grid.length; x++ ){
        let hit = this.grid[x][y].checkBallHit(positionBall, radiusBall);
        if (hit != 0){
          return hit;
        }
      }
    }
    return 0;
  }

  fillGrid(startGrid){
    let startAnzahlReihen = 5;

    let breiteGegner = width / startGrid.length;
    let hoeheGegner = this.spielfeldHeigth / startGrid[0].length;

    for ( let y = 0; y < startGrid[0].length; y++ ){
      let yPosition = y * hoeheGegner;

      for ( let x = 0; x < startGrid.length; x++ ){
        let xPosition = x * breiteGegner;
        startGrid[x][y] = new Gegner(xPosition, yPosition, breiteGegner, hoeheGegner);
        if ( y >= startAnzahlReihen ){
          startGrid[x][y].isDead = true;
        }
      }
    }
    return startGrid;
  }

  create2DArray(cols, rows){
    let arr = new Array(cols);
    for (var i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
    }
    return arr
  }

  showGrid(){
    for (var x = 0; x < this.grid.length; x++) {
      for (var y = 0; y < this.grid[x].length; y++) {
        this.grid[x][y].show();
      }
    }
  }

  showDeadline(){
    let x = 1;
    let y = this.grid[x].length - 1;
    let lastGegner = this.grid[x][y];
    let yPosition  = lastGegner.yPosition;

    stroke(87, 87, 87);
    line(0, yPosition, width, yPosition);
    stroke(0);
  }
}
