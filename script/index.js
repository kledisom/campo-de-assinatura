var canvasWidth = 400;
var canvasHeight = 100;
var canvasDiv = document.getElementById("canvasDiv");
canvas = document.createElement("canvas");
/* canvas.setAttribute("width", canvasWidth);
canvas.setAttribute("height", canvasHeight); */
canvas.setAttribute("id", "canvas");
canvasDiv.appendChild(canvas);
if (typeof G_vmlCanvasManager != "undefined") {
  canvas = G_vmlCanvasManager.initElement(canvas);
}
context = canvas.getContext("2d");

$("#canvas").mousedown(function (e) {
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;

  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});

$("#canvas").mousemove(function (e) {
  if (paint) {
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});

$("#canvas").mouseup(function (e) {
  paint = false;
});

$("#canvas").mouseleave(function (e) {
  paint = false;
});

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

function addClick(x, y, dragging) {
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
}

// Set up touch events for mobile, etc
canvas.addEventListener(
  "touchstart",
  function (e) {
    mousePos = getTouchPos(canvas, e);
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousedown", {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    canvas.dispatchEvent(mouseEvent);
  },
  false
);

canvas.addEventListener(
  "touchend",
  function (e) {
    var mouseEvent = new MouseEvent("mouseup", {});
    canvas.dispatchEvent(mouseEvent);
  },
  false
);

canvas.addEventListener(
  "touchmove",
  function (e) {
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    canvas.dispatchEvent(mouseEvent);
  },
  false
);

// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
  var rect = canvasDom.getBoundingClientRect();
  return {
    x: touchEvent.touches[0].clientX - rect.left,
    y: touchEvent.touches[0].clientY - rect.top,
  };
}

// Prevent scrolling when touching the canvas
document.body.addEventListener(
  "touchstart",
  function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  },
  false
);
document.body.addEventListener(
  "touchend",
  function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  },
  false
);
document.body.addEventListener(
  "touchmove",
  function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  },
  false
);

function redraw() {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

  context.strokeStyle = "#000";
  context.lineJoin = "round";
  context.lineWidth = 3;

  for (var i = 0; i < clickX.length; i++) {
    context.beginPath();
    if (clickDrag[i] && i) {
      context.moveTo(clickX[i - 1], clickY[i - 1]);
    } else {
      context.moveTo(clickX[i] - 1, clickY[i]);
    }
    context.lineTo(clickX[i], clickY[i]);
    context.closePath();
    context.stroke();
  }
}
