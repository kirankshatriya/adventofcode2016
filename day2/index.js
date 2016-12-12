

var processMove = function(coor, move){
    var newMove;
    var bound = function(pos){
      return (pos<0)? 0 : (pos>2 ? 2 : pos);
    }
    switch(move){
      case "R": newMove = {x : bound(coor.x + 1), y : coor.y}; break;
      case "D": newMove = {x : coor.x, y : bound(coor.y - 1)}; break;
      case "L": newMove = {x : bound(coor.x - 1), y : coor.y}; break;
      case "U": newMove = {x : coor.x, y : bound(coor.y + 1)}; break;
    };
    return newMove;
}

var translateCoor = function(coor){
  return ([
    ["7", "8", "9"],
    ["4", "5", "6"],
    ["1", "2", "3"]
  ])[coor.y][coor.x]
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
  {x:1, y:1}
);

console.log(combo);
