// tutorial from Franks laboratory

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var particles = [];
var particlesCount = 5;
var mouseDown = false;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const mousePos = {
  x: undefined,
  y: undefined,
};

class Particle {
  constructor() {
    this.x = mousePos.x;
    this.y = mousePos.y;
    this.hue = 0;
    this.color = "hsla(" + this.hue + ", 100%" + ", 50%" + ", 1)";
    this.size = Math.random() * 10 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 6 + 1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) {
      this.size -= 0.1;
    }

    this.hue += 1;
    if (this.hue > 40) {
      this.hue = 40;
    }
    this.color = "hsla(" + this.hue + ", 100%" + ", 50%" + ", 1)";
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.shadowColor = this.color;
    ctx.shadowBlur = "10";
    ctx.fill();
  }
}

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

canvas.addEventListener("mousedown", function (event) {
  mousePos.x = event.x;
  mousePos.y = event.y;
  mouseDown = true;
});

canvas.addEventListener("touchstart", function (event) {
  // console.log(event);
  mousePos.x = event.touches[0].clientX;
  mousePos.y = event.touches[0].clientY;
  mouseDown = true;
});

canvas.addEventListener("mouseup", function () {
  mouseDown = false;
});

canvas.addEventListener("touchend", function () {
  mouseDown = false;
});

canvas.addEventListener("mouseleave", function () {
  mouseDown = false;
});

canvas.addEventListener("touchmove", function (event) {
  mousePos.x = event.touches[0].clientX;
  mousePos.y = event.touches[0].clientY;
});

canvas.addEventListener("mousemove", function (event) {
  mousePos.x = event.x;
  mousePos.y = event.y;
});

function particlesHandler() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].draw();
    particles[i].update();

    if (particles[i].size < 0.3) {
      particles.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.fillStyle = "rgba(0,0,0,0.1)";
  // ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (mouseDown) {
    for (i = 0; i < particlesCount; i++) {
      particles.push(new Particle());
    }
  }
  particlesHandler();
  requestAnimationFrame(animate);
}

animate();
