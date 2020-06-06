import * as grab from 'crabby-grab';
let ball = grab.id('ball');
let ball_t = ball.style.top;
let ball_l = ball.style.left;
let paddle = grab.id('paddle');
let leftWall = grab.id('leftWall');
let topWall = grab.id('topWall');
let rightWall = grab.id('rightWall');
let mouse_x = 0;
let speed_x;
let speed_y;
let direction = "bottomRight";
let previousDirection = null;
let em;
let beep = grab.id('beep');
let scoreEl = grab.id('score');
let score;
let megalovania = grab.id('soundtrack');
grab.class('large-button', 0).addEventListener('click', () => {
  play();
});
document.onmousemove = setMouseX;
window.onload = () => {
  megalovania.play();
}
let play = () => {
  score = 0;
  speed_x = 1.5;
  speed_y = 1.5;
  ball.style.top = "100px";
  ball.style.left = "100px";
  playSound(beep);
  grab.class('home-menu', 0).classList.add("in-game");
  scoreEl.classList.replace("on-menu", "game-started");
  paddle.classList.replace("on-menu", "game-started");
  ball.classList.replace("on-menu", "game-started");
  leftWall.classList.replace("on-menu", "game-started");
  topWall.classList.replace("on-menu", "game-started");
  rightWall.classList.replace("on-menu", "game-started");
  window.setTimeout(function() {
    // GAME LOOP
    ball.style.transitionDelay = "0s";
    ball.style.transition = "none";
    paddle.style.transitionDelay = "0s";
    paddle.style.transition = "0s";
    getEms();
    let loop = window.setInterval(function() {
        paddle.style.left = (mouse_x - (3.5 * em)) + "px";
        ball_t = ball.style.top;
        ball_l = ball.style.left;
        move(direction);
        if (isCollide(ball, paddle)) {
          playSound(beep);
          score++;
          renderScore();
          speed_x++;
          speed_y++;
          speed_y = speed_y / 1.1;
          if (direction == "bottomRight") {
            direction = "topRight";
          } else if (direction == "bottomLeft") {
            direction = "topLeft";
          }
        } else if (isCollide(ball, rightWall)) {
          playSound(beep);
          if (direction == "topRight") {
            direction = "topLeft"
          } else if (direction == "bottomRight") {
            direction = "bottomLeft";
          }
        } else if (isCollide(ball, topWall)) {
          playSound(beep);
          if (direction == "topLeft") {
            direction = "bottomLeft";
          } else {
            direction = "bottomRight";
          }
        } else if (isCollide(ball, leftWall)) {
          playSound(beep);
          if (direction == "bottomLeft") {
            direction = "bottomRight";
          } else if (direction == "topLeft") {
            direction = "topRight";
          }
        } else if (ball_t.substring(0, ball_t.length - 2) > window.innerHeight) {
          window.clearInterval(loop);
          gameOver();
        }
      },
      6);
  }, 1000)
}

function setMouseX(event) {
  mouse_x = event.clientX;
};

function getEms() {
  var div = grab.id('testDiv');
  div.style.height = '1em';
  return (em = div.offsetHeight);
}

function renderScore() {
  scoreEl.innerText = score;
}

function move(dir) {
  if (dir == "bottomRight") {
    ball_t = parseInt(ball_t.substring(0, ball_t.length - 2)) + speed_y;
    ball_l = parseInt(ball_l.substring(0, ball_l.length - 2)) + speed_x;
  } else if (dir == "topRight") {
    ball_t = parseInt(ball_t.substring(0, ball_t.length - 2)) + -speed_y;
    ball_l = parseInt(ball_l.substring(0, ball_l.length - 2)) + speed_x;
  } else if (dir == "top") {
    ball_t = parseInt(ball_t.substring(0, ball_t.length - 2)) + -speed_y;
    ball_l = parseInt(ball_l.substring(0, ball_l.length - 2)) + -speed_x;
  } else if (dir == "topLeft") {
    ball_t = parseInt(ball_t.substring(0, ball_t.length - 2)) + -speed_y;
    ball_l = parseInt(ball_l.substring(0, ball_l.length - 2)) + -speed_x;
  } else if (dir == "bottomLeft") {
    ball_t = parseInt(ball_t.substring(0, ball_t.length - 2)) + speed_y;
    ball_l = parseInt(ball_l.substring(0, ball_l.length - 2)) + -speed_x;
  } else {
    window.clearInterval(loop);
    alert("Looks like there's an error.");
  }
  ball_t = ball_t + "px";
  ball_l = ball_l + "px";
  ball.style.top = ball_t;
  ball.style.left = ball_l;
}

function gameOver() {
  ball.style.transitionDelay = "1s";
  ball.style.transition = "0.3s";
  paddle.style.transitionDelay = "1s";
  paddle.style.transition = "0.3s";
  grab.class('home-menu', 0).classList.add("in-game");
  scoreEl.classList.replace("game-started", "on-menu");
  paddle.classList.replace("game-started", "on-menu");
  ball.classList.replace("game-started", "on-menu");
  leftWall.classList.replace("game-started", "on-menu");
  topWall.classList.replace("game-started", "on-menu");
  rightWall.classList.replace("game-started", "on-menu");
  megalovania.pause();
  grab.class('home-menu', 0).classList.remove("in-game");
  window.setTimeout(function() {
    score = 0;
    renderScore();
    megalovania.currentTime = 0;
    megalovania.play();
  }, 2000)
}

function playSound(s) {
  if (s.paused) {
    s.play();
  } else {
    s.currentTime = 0;
    s.play();
  }
}

function isCollide(a, b) {
  var aRect = a.getBoundingClientRect();
  var bRect = b.getBoundingClientRect();

  return !(
    ((aRect.top + aRect.height) < (bRect.top)) ||
    (aRect.top > (bRect.top + bRect.height)) ||
    ((aRect.left + aRect.width) < bRect.left) ||
    (aRect.left > (bRect.left + bRect.width))
  );
}