// 2D Vector
function Vector(x, y) {
    this.x = x;
    this.y = y;
}

Vector.prototype = {
    x: this.x,
    y: this.y,

    //Adds vectors
    add: function (vector) {
        return new Vector(this.x + vector.x, this.y + vector.y);
    },

    //Subtracts vectors (ordering does matter)
    sub: function (vector) {
        return new Vector(this.x - vector.x, this.y - vector.y);
    },

    //Multiplication
    mul: function (vector) {
        return new Vector(this.x * vector.x, this.y * vector.y);
    },

    //Division
    div: function (vector) {
        return new Vector(this.x / vector.x, this.y / vector.y);
    }
};

var Tree = function (vec1, vec2) {
    this.vec1 = vec1;
    this.vec2 = vec2;

    this.draw = function (ctx) {
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(vec1.x, vec1.y);
        ctx.lineTo(vec2.x, vec2.y);
        ctx.stroke();
    }

    this.getNewBranches = function () {
        var temp = [];
        rightBranch = new Vector(vec2.x + Math.sqrt(3) + Math.sqrt(Math.pow(Math.abs(vec2.x - vec1.x), 2) + Math.pow(Math.abs(vec2.y - vec1.y), 2)) / 1.5, vec2.y - Math.sqrt(Math.pow(Math.abs(vec2.x - vec1.x), 2) + Math.pow(Math.abs(vec2.y - vec1.y), 2)) / 1.5); //30 deg rotation
        leftBranch = new Vector(vec2.x - Math.sqrt(3) - Math.sqrt(Math.pow(Math.abs(vec2.x - vec1.x), 2) + Math.pow(Math.abs(vec2.y - vec1.y), 2)) / 1.5, vec2.y - Math.sqrt(Math.pow(Math.abs(vec2.x - vec1.x), 2) + Math.pow(Math.abs(vec2.y - vec1.y), 2)) / 1.5); //-30 deg rotation

        temp.push(leftBranch, rightBranch);
        return temp;
    }
};

var canvas = document.getElementById("container"),
    ctx = canvas.getContext("2d");

var myTree;
var branches = [];

function init() {
    myTree = new Tree(new Vector(canvas.width / 2, canvas.height), new Vector(canvas.width / 2, canvas.height - 100));
    branches.push(myTree);
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (branches.length > 0) branches.forEach(function (i) { i.draw(ctx); });
}

function onKeyPress(e) {
    
}

function onMouseClick() {
    //var tempArr = myTree.getNewBranches();
    //for (var i = 0; i < 2; i++) {
    //    var tempTree = new Tree(myTree.vec2, tempArr[i]);
    //    branches.push(tempTree);
    //}
    for (var i = branches.length - 1; i >= 0; i--)
        branches[i].getNewBranches().forEach(function (item) {
            console.log(branches);
            branches.push(new Tree(branches[i].vec2, item));
        });

    console.log(branches);
}

function main() {
    canvas.width = 640;
    canvas.height = 760;

    init();
    setInterval(update, 6 / 100);
} main();