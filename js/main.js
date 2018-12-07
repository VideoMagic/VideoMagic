let c = document.getElementById('canv');
let $ = c.getContext('2d');


let col = function(x, y, r, g, b) {
  $.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
  $.fillRect(x, y, 1,1);
}
let R = function(x, y, t) {
  return( Math.floor(182 + 64*Math.cos( (x*x-y*y)/300 + t )) );
}

let G = function(x, y, t) {
  return( Math.floor(182 + 64*Math.sin( (x*x*Math.cos(t/4)+y*y*Math.sin(t/3))/300 ) ) );
}

let B = function(x, y, t) {
  return( Math.floor(182 + 64*Math.sin( 5*Math.sin(t/9) + ((x-100)*(x-100)+(y-100)*(y-100))/1100) ));
}

let t = 0;

let run = function() {
  for(x=0;x<=35;x++) {
    for(y=0;y<=35;y++) {
      col(x, y, R(x,y,t), G(x,y,t), B(x,y,t));
    }
  }
  t = t + 0.050;
  window.requestAnimationFrame(run);
}

run();

// Instanciating a new countdown with all defaults
new Countdown();

// Instanciating a custom countdown
let countdown = new Countdown({
    selector: '#timer',
    msgBefore: "새로고침해주세요",
    msgAfter: "",
    msgPattern: "{hours} 시간&nbsp; {minutes} 분&nbsp; {seconds} 초",
    dateStart: new Date(),
    dateEnd: new Date('2018/03/20 00:00'), // 20 00:00
    leadingZeros: true,
    onEnd: function() {
      showStart();
    }
});

// Init
let bd = new Date('2018/03/20 00:00'),
    now = new Date();
if (bd < now) {
  document.querySelector(".help").remove();
  showStart();
}

// change effect
function showStart() {
  document.querySelector("#timer").classList.add("wide");
  setTimeout(function() {
    document.querySelector("#description").remove();
    document.querySelector("#canv").remove();
  }, 1000);
  setTimeout(function() {
    document.querySelector("#wrapper").innerHTML = "<a class='btn fadeIn' href='diff'></a>";
  }, 1000);
}