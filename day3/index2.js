
var isTriangle = function(side1, side2, side3){
  return ((side1 + side2) > side3 &&
          (side1 + side3) > side2 &&
          (side3 + side2) > side1)?1:0;
}

var inputFile = process.argv[2];

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream(inputFile)
});

var numTriangles = 0;
var col1 = [];
var col2 = [];
var col3 = [];
lineReader.on('line', function (line) {
  sides = line.split(/\s+/);
  col1.push(parseInt(sides[1]));
  col2.push(parseInt(sides[2]));
  col3.push(parseInt(sides[3]));
  if(col1.length === 3){
    numTriangles += isTriangle(col1[0], col1[1], col1[2]);
    numTriangles += isTriangle(col2[0], col2[1], col2[2]);
    numTriangles += isTriangle(col3[0], col3[1], col3[2]);
    col1=[];
    col2=[];
    col3=[];
  }
});
lineReader.on('close', function (line) {
  console.log("Number of triangles: " + numTriangles);
});
