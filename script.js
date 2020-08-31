var snake;
var SNAKE_WIDTH = 20;
var food;

function setup() {
  createCanvas(500, 500);
  frameRate(10);
  snake = new Snake();
  foodLocation();
  // food = createVector(random(width), random(height));
}

function draw() {
  background(51);
  snake.death();
  snake.update();
  snake.show();
  if (snake.eat(food)) {
    foodLocation();
  }
  fill(255, 0, 100);
  rect(food.x, food.y, SNAKE_WIDTH, SNAKE_WIDTH);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.direction(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    snake.direction(0, 1);
  } else if (keyCode === LEFT_ARROW) {
    snake.direction(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    snake.direction(1, 0);
  }
}

function foodLocation() {
  food = createVector(
    floor(random(0, floor(width / SNAKE_WIDTH))) * SNAKE_WIDTH,
    floor(random(0, floor(height / SNAKE_WIDTH))) * SNAKE_WIDTH
  );
}

// snake object

function Snake() {
  this.x = 0;
  this.y = 0;
  this.xVelocity = 1;
  this.yVelocity = 0;
  this.total = 0;
  this.tail = [];
  document.getElementById('length').innerText = this.total;

  this.update = function () {
    document.getElementById('length').innerText = this.total;
    if (this.total === this.tail.length) {
      for (let i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    this.tail[this.total - 1] = createVector(this.x, this.y);

    this.x = this.x + this.xVelocity * SNAKE_WIDTH;
    this.y = this.y + this.yVelocity * SNAKE_WIDTH;

    this.x = constrain(this.x, 0, width - SNAKE_WIDTH);
    this.y = constrain(this.y, 0, width - SNAKE_WIDTH);
  };

  this.show = function () {
    fill(255);
    for (let i = 0; i < this.total; i++) {
      rect(this.tail[i].x, this.tail[i].y, SNAKE_WIDTH, SNAKE_WIDTH);
    }
    rect(this.x, this.y, SNAKE_WIDTH, SNAKE_WIDTH);
  };

  this.direction = function (x, y) {
    this.xVelocity = x;
    this.yVelocity = y;
  };

  this.eat = function (pos) {
    if (pos.x === this.x && pos.y === this.y) {
      this.total++;
      return true;
    } else return false;
  };

  this.death = function () {
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      if (this.x === pos.x && this.y === pos.y) {
        this.total = 0;
        this.tail = [];
      }
    }
  };
}
