import * as grab from 'crabby-grab';
let ball = grab.id('ball');
let ball_t = ball.style.top;
let ball_l = ball.style.left;
let paddle = grab.id('paddle');
let mouse_x = 0;
let em;
let beep = grab.id('beep');
grab.class('large-button', 0).addEventListener('click', () => {
  play();
});
document.onmousemove = setMouseX;
let play = () => {
  beep.play();
  grab.class('home-menu', 0).classList.add("in-game");
  paddle.classList.replace("on-menu", "game-started");
  ball.classList.replace("on-menu", "game-started");
  window.setTimeout(function() {
    // GAME LOOP
    ball.style.transitionDelay = "0s";
    ball.style.transition = "none";
    paddle.style.transitionDelay = "0s";
    paddle.style.transition = "0s";
    getEms();
    let loop = window.setInterval(function() {
      ball_t = ball.style.top;
      ball_l = ball.style.left;
      ball_t = parseInt(ball_t.substring(0, ball_t.length - 2)) + 5;
      ball_l = parseInt(ball_l.substring(0, ball_l.length - 2)) + 3;
      ball_t = ball_t + "px";
      ball_l = ball_l + "px";
      ball.style.top = ball_t;
      ball.style.left = ball_l;
      paddle.style.left = (mouse_x - (3.5 * em)) + "px";
      // console.log("Top: " + ball_t + " Left: " + ball_l);
      if (isCollide(ball, paddle)) {
        beep.play();
        window.clearInterval(loop);
      }
    }, 20);
  }, 2000)
}

function setMouseX(event) {
  mouse_x = event.clientX;
};

function getEms() {
  var div = grab.id('testDiv');
  div.style.height = '1em';
  return (em = div.offsetHeight);
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