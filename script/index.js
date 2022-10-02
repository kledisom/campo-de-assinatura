document.addEventListener("DOMContentLoaded", () => {
  const pincel = {
    ativo: false,
    movendo: false,
    pos: { x: 0, y: 0 },
    posAnterior: null,
  };

  const tela = document.querySelector("#tela");
  const ctx = tela.getContext("2d");

  /*   tela.width = 400;
  tela.height = 100; */

  const desenharLinha = (linha) => {
    ctx.beginPath();
    ctx.moveTo(linha.posAnterior.x, linha.posAnterior.y);
    ctx.lineTo(linha.pos.x, linha.pos.y);
    ctx.stroke();
  };

  //capturar movimento do mouse
  tela.onmousedown = (e) => {
    pincel.ativo = true;
  };
  tela.onmouseup = (e) => {
    pincel.ativo = false;
  };
  tela.onmousemove = (e) => {
    pincel.pos.x = e.clientX;
    pincel.pos.y = e.clientY;
    pincel.movendo = true;
  };

  //capturar movimento touch
  tela.addEventListener("touchstart", (e) => {
    var rect = tela.getBoundingClientRect();
    pincel.ativo = true;
/*     pincel.pos.x = e.touches[0].clientX - rect.left;
    pincel.pos.y = e.touches[0].clientY - rect.top;  */
  });
  tela.addEventListener("touchend", (e) => {
    pincel.ativo = false;
    pincel.posAnterior = null;
    console.log(pincel.posAnterior);
  });
  tela.addEventListener("touchmove", (e) => {
    var rect = tela.getBoundingClientRect();

    pincel.pos.x = e.touches[0].clientX - rect.left;
    pincel.pos.y = e.touches[0].clientY - rect.top;
    pincel.movendo = true;
    ciclo();
  });

  const ciclo = () => {
    ctx.strokeStyle = "blue"; //cor da linha
    ctx.lineJoin = "round";
    ctx.lineWidth = 2; //espessura da linha

    if (pincel.ativo && pincel.movendo && pincel.posAnterior) {
      desenharLinha({
        pos: pincel.pos,
        posAnterior: pincel.posAnterior,
      });
      pincel.movendo = false;
    }
    pincel.posAnterior = { x: pincel.pos.x, y: pincel.pos.y };
    console.log(pincel.posAnterior);
  };
});
























/* var canvasWidth = 400;
var canvasHeight = 100;
var canvasDiv = document.getElementById("canvasDiv");
canvas = document.createElement("canvas");
canvas.setAttribute("width", canvasWidth);
canvas.setAttribute("height", canvasHeight); 
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

  context.strokeStyle = "#ff0000"; //cor da linha
  //context.lineJoin = "round"; 
  context.lineWidth = 3; //espessura da linha

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
 */