

var walk = function(startPos, startDir, moveArr){
  var dir = startDir;
  var pos = startPos;
  moveArr.forEach(
    function(move){
      var trimmedMove = move.trim().replace(",","");
      var turnDirection = trimmedMove[0];
      var numSteps = parseInt(trimmedMove.substring(1));
      dir = turn(dir, turnDirection);
      var newPos = step(dir, numSteps, pos);
      var printFriendlyCoor = function(pos){
        return "(" + pos.x + "," + pos.y + ")";
      }
      console.log(move
        + ": "
        + printFriendlyCoor(pos)
        + " -> "
        + printFriendlyCoor(newPos)
        + " and facing " + dir
      );

      pos = newPos;
    }
  );
  return pos;
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
