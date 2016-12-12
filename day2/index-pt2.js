
var keypad = [
  [null,null,"1",null,null],
  [null,"2","3","4",null],
  ["5","6","7","8","9"],
  [null,"A","B","C",null],
  [null,null,"D",null,null]
];

var processMove = function(coor, move){
    var newMove;
    var bound = function(pos){
      return (pos<0)? 0 : (pos>2 ? 2 : pos);
    }
    var applyMove = function(pos, deltaX, deltaY){
      var x = pos.x + deltaX;
      var y = pos.y + deltaY;
      if(y>= 0 && y < keypad.length &&
          x >= 0 && x < keypad[y].length &&
          keypad[y][x]!=null){
        return {x : x, y : y};
      } else {
        return pos;
      }
    }
    switch(move){
      case "R": return applyMove(coor, 1, 0);
      case "D": return applyMove(coor, 0, 1);
      case "L": return applyMove(coor, -1, 0);
      case "U": return applyMove(coor, 0, -1);
    };
    return newMove;
}

var translateCoor = function(coor){
  return keypad[coor.y][coor.x]
};

var input = process.argv.slice(2)

var combo = [];

input.reduce(
  function(coor, moveSeq){
    console.log("Processing moves:" + moveSeq  + " from key " + translateCoor(coor));
      var moves = moveSeq.split("");
      var key = moves.reduce(
        function(coor, move){
          console.log("Processing move:" + move + " from key " + translateCoor(coor));
          return processMove(coor, move);
        },
        coor
      );
      combo.push(translateCoor(key));
      return key;
  },
  {x:0, y:2}
);

console.log(combo);
