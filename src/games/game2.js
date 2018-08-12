import axios from "axios";
import store from "../store/index.js";

var myGamePiece;
var myBackground;
var myObstacles = [];
var myScore;

function startGame() {
  myGamePiece = new component(
    100,
    36,
    "../../static/delorean.png",
    10,
    120,
    "image"
  );
  myGamePiece.gravity = 0.05;
  myScore = new component("30px", "Consolas", "#C51162", 280, 40, "text");
  myBackground = new component(
    1920,
    450,
    "../../static/road.png",
    0,
    0,
    "background"
  );
  myObstacles = [];
  myGameArea.start();
}

function restartGame() {
  myGameArea.stop();
  myGameArea.clear();
  startGame();
}

var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function() {
    if (this) {
      this.stop();
    }
    this.canvas.width = 1920;
    this.canvas.height = 450;
    this.canvas.style.backgroundColor = "#fafafa";
    this.context = this.canvas.getContext("2d");

    document.body.insertBefore(
      this.canvas,
      document.body.childNodes[document.body.childNodes.length - 1]
    );
    this.frameNo = 0;
    this.interval = null;
    this.interval = setInterval(updateGameArea, 20);
    window.addEventListener("keydown", e => {
      if (e.keyCode === 87) {
        accelerate(-3);
      }
      if (e.keyCode === 83) {
        accelerate(3);
      }
    });
    window.addEventListener("keyup", e => {
      if (e.keyCode === 87) {
        stopMove();
      }
      if (e.keyCode === 83) {
        stopMove();
      }
    });
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function() {
    clearInterval(this.interval);
  },
  close: function() {
    document.body.removeChild(this.canvas);
  }
};

function component(width, height, color, x, y, type) {
  this.type = type;
  if (type == "image" || type == "background") {
    this.image = new Image();
    this.image.src = color;
  }
  this.score = 0;
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function() {
    let ctx = myGameArea.context;
    if (type == "image" || type == "background") {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      if (type == "background") {
        ctx.drawImage(
          this.image,
          this.x + this.width,
          this.y,
          this.width,
          this.height
        );
      }
    } else if (this.type == "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = color;
      ctx.fillText(this.text, this.x, this.y);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  };
  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.type == "background") {
      if (this.x == -this.width) {
        this.x = 0;
      }
    }
    this.hitBottom();
    this.hitTop();
  };
  this.hitBottom = function() {
    var rockbottom = myGameArea.canvas.height - this.height;
    if (this.y > rockbottom) {
      this.y = rockbottom;
    }
    this.hitTop = function() {
      var rockTop = 0;
      if (this.y < rockTop) {
        this.y = rockTop;
      }
    };
  };
  this.crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + this.width;
    var mytop = this.y;
    var mybottom = this.y + this.height;
    var otherleft = otherobj.x;
    var otherright = otherobj.x + otherobj.width;
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + otherobj.height;
    var crash = true;
    if (
      mybottom < othertop ||
      mytop > otherbottom ||
      myright < otherleft ||
      myleft > otherright
    ) {
      crash = false;
    }
    return crash;
  };
}

function sendScoreToServer() {
  const requestBody = {
    userId: store.getters.user.id,
    gameId: 2,
    score: myGameArea.frameNo
  };
  axios({
    url: `https://localhost:44363/api/Results`,
    data: requestBody,
    method: "POST"
  })
    .then(console.log("norm"))
    .catch(err => console.error(err));
}

function updateGameArea() {
  var x, height, gap, minHeight, maxHeight, minGap, maxGap;
  for (let i = 0; i < myObstacles.length; i += 1) {
    if (myGamePiece.crashWith(myObstacles[i])) {
      myGameArea.stop();
      sendScoreToServer();
      return;
    }
  }
  myGameArea.clear();
  myBackground.speedX = -1;
  myBackground.newPos();
  myBackground.update();
  myGameArea.frameNo += 1;
  if (myGameArea.frameNo == 1 || everyinterval(150)) {
    x = myGameArea.canvas.width / 2.5;
    minHeight = 20;
    maxHeight = 200;
    height = Math.floor(
      Math.random() * (maxHeight - minHeight + 1) + minHeight
    );
    minGap = 90;
    maxGap = 200;
    gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
    myObstacles.push(new component(20, height, "#BF360C", x, 0));
    myObstacles.push(
      new component(20, x - height - gap, "#BF360C", x, height + gap)
    );
  }
  for (let i = 0; i < myObstacles.length; i += 1) {
    myObstacles[i].x += -1;
    myObstacles[i].update();
  }
  myScore.text = "SCORE: " + myGameArea.frameNo;
  myScore.update();
  myGamePiece.newPos();
  myGamePiece.update();
}

function everyinterval(n) {
  if ((myGameArea.frameNo / n) % 1 == 0) {
    return true;
  }
  return false;
}

function accelerate(n) {
  myGamePiece.speedY = n;
}

function closeGame() {
  myGameArea.stop();
  myGameArea.clear();
  myGameArea.close();
}

function stopMove() {
  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0;
}

export default {
  myGamePiece,
  myObstacles,
  myScore,
  startGame,
  myGameArea,
  component,
  updateGameArea,
  everyinterval,
  accelerate,
  restartGame,
  sendScoreToServer,
  closeGame
};
