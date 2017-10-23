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
    this.isDrawn = false;

    this.jitter = function () {
        this.vec1.x += 2 * Math.random() - 1;
        this.vec1.y += 2 * Math.random() - 1;
    };

    this.draw = function (ctx) {
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(vec1.x, vec1.y);
        ctx.lineTo(vec2.x, vec2.y);
        ctx.stroke();
    };

    this.getLeftBranch = function () {
        var modifiedVec = this.vec1.copy().sub(this.vec2),
            branch = modifiedVec.copy().rotate(180 + 25);

        return new Tree(vec2, vec2.copy().add(branch.div(new Vector(1.6, 1.4))));
    };

    this.getRightBranch = function () {
        var modifiedVec = this.vec1.copy().sub(this.vec2),
            branch = modifiedVec.copy().rotate(180 - 25);

        return new Tree(vec2, vec2.copy().add(branch.div(new Vector(1.6, 1.4))));;
    };
};

var canvas = document.getElementById("container"),
    ctx = canvas.getContext("2d");

var myTree,
    branches = [],
    updateCounter;

function init() {
    myTree = new Tree(new Vector(canvas.width / 2, canvas.height - 100), new Vector(canvas.width / 2, canvas.height - 200));
    branches.push(myTree);
    this.updateCounter = 0;
    for (var j = 0; j < 4; j++)
        for (var i = branches.length - 1; i >= 0; i--) {
            if (!branches[i].isDrawn) {
                branches.push(branches[i].getLeftBranch());
                branches.push(branches[i].getRightBranch());
                branches[i].isDrawn = true;
            }
        }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (branches.length > 0) branches.forEach(function (i) {
        i.draw(ctx);
    });

    if (branches.length > 0) branches.forEach(function (i) {
        i.jitter();
    });

    updateCounter++;
}

function onKeyPress(e) {}

function onMouseClick() {
    //var tempArr = myTree.getNewBranches();
    //for (var i = 0; i < 2; i++) {
    //    var tempTree = new Tree(myTree.vec2, tempArr[i]);
    //    branches.push(tempTree);
    //}
    //for (var i = branches.length - 1; i >= 0; i--)
    //{
    //    if (!branches[i].isDrawn)
    //    {
    //        branches.push(branches[i].getLeftBranch());
    //        branches.push(branches[i].getRightBranch());
    //        branches[i].isDrawn = true;
    //    }
    //}

    //console.log(branches);
}

function main() {
    canvas.width = 640;
    canvas.height = 760;

    init();
    setInterval(update, 30 / 1000);
} main();