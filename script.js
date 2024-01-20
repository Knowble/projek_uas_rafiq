// time counter
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

setInterval(getTime, 1000);

function getTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
  t = setTimeout(function() {
    getTime()
  }, 500);
}


// mouse handling
const cursorRounded = document.querySelector('.rounded-cursor');

let cursorX = 0;
let cursorY = 0;
let velocityX = 0;
let velocityY = 0;
const lagFactor = 0.03; 
const friction = 0.8; 
const defaultCursorSize = 25;

const moveCursor = () => {
  const deltaX = mouseX - cursorX;
  const deltaY = mouseY - cursorY;

  velocityX += deltaX * lagFactor;
  velocityY += deltaY * lagFactor;

  velocityX *= friction;
  velocityY *= friction;

  cursorX += velocityX;
  cursorY += velocityY;

  const cursorSize = parseFloat(cursorRounded.style.width) || defaultCursorSize;
  const offsetX = (cursorSize - defaultCursorSize) / 2 + 10;
  const offsetY = (cursorSize - defaultCursorSize) / 2 + 10;

  cursorRounded.style.transform = `translate3d(${cursorX - offsetX}px, ${cursorY - offsetY}px, 0)`;

  requestAnimationFrame(moveCursor);
};

let mouseX = 0;
let mouseY = 0;

const updateMousePosition = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
};

document.body.addEventListener('mousemove', (e) => {
  const isCursorPointer = window.getComputedStyle(e.target).cursor === 'pointer';

  if (isCursorPointer) {
    cursorRounded.style.transition = 'background-color 0.5s, width 0.5s, height 0.5s, border 0.5s';
    cursorRounded.style.backgroundColor = '#808080a8';
    cursorRounded.style.border = '0px';
    cursorRounded.style.width = '35px';
    cursorRounded.style.height = '35px';
  } else {
    cursorRounded.style.transition = 'background-color 0.5s, width 0.5s, height 0.5s, border 0.5s';
    cursorRounded.style.backgroundColor = 'transparent';
    cursorRounded.style.border = '2px solid #fff';
    cursorRounded.style.width = '25px';
    cursorRounded.style.height = '25px';
  }

  updateMousePosition(e);
});

moveCursor();
