
var isTriangle = function(side1, side2, side3){
  console.log(side1 + "," + side2 + "," + side3);
  return (side1 + side2) > side3 &&
          (side1 + side3) > side2 &&
          (side3 + side2) > side1;
}

var inputFile = process.argv[2];

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream(inputFile)
});

var count = 0;
lineReader.on('line', function (line) {
  sides = line.split(/\s+/);
  console.log(sides);
  if(isTriangle(parseInt(sides[3]), parseInt(sides[1]), parseInt(sides[2]))) {
    count++;
  } else {
    console.log("Not a triangle: " + line);
  }
});
lineReader.on('close', function (line) {
  console.log("Number of triangles: " + count);
});
