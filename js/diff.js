'use strict';

var canvas = document.getElementById('canv');
var ctx = canvas.getContext('2d');

var MAX_FLIES = 15;
var FLY_XSPEED_RANGE = [-1, 1];
var FLY_YSPEED_RANGE = [-0.5, 0.5];
var FLY_SIZE_RANGE = [1, 5];
var FLY_LIFESPAN_RANGE = [75, 150];

var flies = [];

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function Fly(options) {
  if (!options) { options = {}; }

  this.x = options.x || randomRange(0, canvas.width);
  this.y = options.y || randomRange(0, canvas.height);
  this.xSpeed = options.xSpeed || randomRange(FLY_XSPEED_RANGE[0], FLY_XSPEED_RANGE[1]);
  this.ySpeed = options.ySpeed || randomRange(FLY_YSPEED_RANGE[0], FLY_YSPEED_RANGE[1]);
  this.size = options.size || randomRange(FLY_SIZE_RANGE[0], FLY_SIZE_RANGE[1]);
  this.lifeSpan = options.lifeSpan || randomRange(FLY_LIFESPAN_RANGE[0], FLY_LIFESPAN_RANGE[1]);
  this.age = 0;

  this.colors = options.colors || {
    red: 207,
    green: 255,
    blue: 4,
    alpha: 0
  };
}

function fitToScreen(element) {
  element.width = window.innerWidth;
  element.height = window.innerHeight;
}

function clearScreen() {
  ctx.beginPath();
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fill();
}

function createFlies() {
  if (flies.length !== MAX_FLIES) {
    flies.push(new Fly());
  }
}

function moveFlies() {
  flies.forEach(function(fly) {
    fly.x += fly.xSpeed;
    fly.y += fly.ySpeed;
    fly.age++;

    if (fly.age < fly.lifeSpan / 2) {
      fly.colors.alpha += 1 / (fly.lifeSpan / 2);

      if (fly.colors.alpha > 1) { fly.colors.alpha = 1; }
    } else {
      fly.colors.alpha -= 1 / (fly.lifeSpan / 2);

      if (fly.colors.alpha < 0) { fly.colors.alpha = 0; }
    }
  });
}

function removeFlies() {
  var i = flies.length;

  while (i--) {
    var fly = flies[i];

    if (fly.age >= fly.lifeSpan) {
      flies.splice(i, 1);
    }
  }
}

function drawFlies() {
  flies.forEach(function(fly) {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(' + fly.colors.red + ', ' + fly.colors.green + ', ' + fly.colors.blue + ', ' + fly.colors.alpha + ')';
    ctx.arc(
      fly.x,
      fly.y,
      fly.size,
      0,
      Math.PI * 2,
      false
    );
    ctx.fill();
  });
}

function render() {
  clearScreen();
  createFlies();
  moveFlies();
  removeFlies();
  drawFlies();
}

window.addEventListener('resize', function() {
  fitToScreen(canvas);
});

fitToScreen(canvas);

(function animationLoop() {
  window.requestAnimationFrame(animationLoop);
  render();
})();

setTimeout(function() {
  document.querySelector("#talk h2").classList.remove("fadeIn");
  document.querySelector("#talk h2").classList.add("fadeOut");
}, 2000);

setTimeout(function() {
  document.querySelector("#talk").innerHTML = "<h2 class='thin fadeIn'><strong>선물</strong> 받고싶지?</h2>";
}, 3000);

setTimeout(function() {
  document.querySelector("#talk h2").classList.remove("fadeIn");
  document.querySelector("#talk h2").classList.add("fadeOut");
}, 5000);

setTimeout(function() {
  document.querySelector("#talk").innerHTML = "<h2 class='thin fadeIn'><strong>퀴즈</strong>를 잘 풀어봐</h2>";
}, 6000);

setTimeout(function() {
  document.querySelector("#talk h2").classList.remove("fadeIn");
  document.querySelector("#talk h2").classList.add("fadeOut");
}, 8000);

setTimeout(function() {
  document.querySelector("#talk").remove();
  document.querySelector("#first").classList.remove("none");
  document.querySelector("#first").classList.add("box");
}, 10000);


document.querySelector("#submit").onclick = function() {
  let pw = document.getElementById("password");
  if ( checkAnswer(pw.value) ) {
    window.location.href="quiz"
  }
  else {
    pw.classList.add("error")
  }
}

function checkAnswer(val) {
  if (val === "ABSDSAFsa9f90912KOGKELSGKV2149sfa") {

    let expiredDate = new Date();
    expiredDate.setHours(expiredDate.getHours() + 14);

    document.cookie = "current=0;expires=" + expiredDate.toUTCString(); + "domain=jisu.jaeyoon.io;path=/"

    return true;
  }
  return false;
}

