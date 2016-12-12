

var walk = function(startPos, startDir, moveArr){
  var dir = startDir;
  var pos = startPos;
  var path = [];
  var revisits = [];
  var hereBefore = function(coor){
    var wasHereBefore = false
    path.forEach(
      function(elem){
        wasHereBefore = (wasHereBefore) || (elem.x === coor.x && elem.y === coor.y);
      }
    );
    return wasHereBefore;
  };
  var printFriendlyCoor = function(pos){
    return "(" + pos.x + "," + pos.y + ")";
  }
  path.push(startPos);
  moveArr.forEach(
    function(move){
      var trimmedMove = move.trim().replace(",","");
      var turnDirection = trimmedMove[0];
      dir = turn(dir, turnDirection);
      var numSteps = parseInt(trimmedMove.substring(1));
      for(var i = 0; i < numSteps; i++){
        var pos = step(dir, 1, path[path.length-1]);
        if(hereBefore(pos)==true){

          revisits.push(pos);
        }
        path.push(pos);
      }
      console.log(move
        + ": "
        + printFriendlyCoor(path[path.length-1-numSteps])
        + " -> "
        + printFriendlyCoor(path[path.length-1])
        + " and facing " + dir
      );
    }
  );
  console.log("revisits:");
  revisits.forEach(
    function(elem){
        console.log(printFriendlyCoor(elem));
    }
  );
  return path[path.length-1];
};


var turn = function(currentDir, turn){
  if(turn!="L" && turn!="R"){
    throw "Invalid turn: " + turn;
  } else {
    switch(currentDir){
      case "N": return turn==="L"? "W" : "E";
      case "S": return turn==="L"? "E" : "W";
      case "E": return turn==="L"? "N" : "S";
      case "W": return turn==="L"? "S" : "N";
      default: throw "Invalid direction: " + currentDir;
    }
  }
}

var step = function(dir, steps, pos){
  var newPos = function(deltaX, deltaY, pos){
    return {x : pos.x + deltaX, y: pos.y + deltaY};
  }
  if(pos.x == undefined || pos.x == null
    || pos.y == null || pos.y == undefined){
    //throw e
    throw "Invalid postion: " + JSON.stringify(pos);
  } else {
    switch(dir){
      case "E" : return newPos(steps, 0, pos);
      case "W" : return newPos(-steps, 0, pos);
      case "N" : return newPos(0, steps, pos);
      case "S" : return newPos(0, -steps, pos);
      default: throw "Invalid direction: " + dir;
    }
  }
}

var moves = process.argv.slice(2)
var endPos = walk({x: 0, y: 0}, "N", moves);
console.log(endPos);
