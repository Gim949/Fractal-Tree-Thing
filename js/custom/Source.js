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
        this.x += vector.x;
        this.y += vector.y;
        return this;
    },

    //Subtracts vectors (ordering does matter)
    sub: function (vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    },

    //Multiplication
    mul: function (vector) {
        this.x *= vector.x;
        this.y *= vector.y;
        return this;
    },

    //Division
    div: function (vector) {
        this.x /= vector.x;
        this.y /= vector.y;
        return this;
    },

    rotate: function (angle) {
        var nx = this.x * Math.cos(angle * (Math.PI / 180)) - this.y * Math.sin(angle * (Math.PI / 180));
        var ny = this.x * Math.sin(angle * (Math.PI / 180)) + this.y * Math.cos(angle * (Math.PI / 180));

        this.x = nx;
        this.y = ny;

        return this;
    },

    //Returns a copy of the current vector
    copy: function () {
        return new Vector(this.x, this.y);
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

    this.getLeftBranch = function () {
        var modifiedVec = this.vec1.copy().sub(this.vec2),
        rightBranch = modifiedVec.copy().rotate(180 + 30);

        return new Tree(vec2, vec2.copy().add(rightBranch));
    }

    this.getRightBranch = function () {
        var modifiedVec = this.vec1.copy().sub(this.vec2),
            rightBranch = modifiedVec.copy().rotate(180 - 30);

        return new Tree(vec2, vec2.copy().add(rightBranch));
    }
};

var canvas = document.getElementById("container"),
    ctx = canvas.getContext("2d");

var myTree,
    branches = [];

function init() {
    myTree = new Tree(new Vector(canvas.width / 2, canvas.height), new Vector(canvas.width / 2, canvas.height - 100));
    branches.push(myTree);
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (branches.length > 0) branches.forEach(function (i) { i.draw(ctx); });
}

function onKeyPress(e) {}

function onMouseClick() {
    //var tempArr = myTree.getNewBranches();
    //for (var i = 0; i < 2; i++) {
    //    var tempTree = new Tree(myTree.vec2, tempArr[i]);
    //    branches.push(tempTree);
    //}
    for (var i = branches.length - 1; i >= 0; i--)
    {
        branches.push(myTree.getLeftBranch());
        branches.push(myTree.getRightBranch());
    }

    console.log(branches);
}

function main() {
    canvas.width = 640;
    canvas.height = 760;

    init();
    setInterval(update, 6 / 100);
} main();