var Drawer = function(canvas) {
  this.canvas = canvas;
}

Drawer.prototype.draw = null;

Drawer.prototype.setContextParams = function() {
  if (this.canvas.getContext) {
    var ctx = this.canvas.getContext('2d');
    ctx.lineWidth = 3;
    ctx.globalAlpha = 1;
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#ffffff";
    return true;
  }
  return false;
};

var Ring = function(canvas, numLayers, fillCanvas, centerX, centerY, radius) {
  Drawer.call(this, canvas);
  this.numLayers = numLayers;
  if (fillCanvas) {
    this.centerX = canvas.width / 2;
    this.centerY = canvas.height / 2;
    this.unitLength = Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2)) / (2 * numLayers);
  } else {
    this.centerX = centerX;
    this.centerY = centerY;
    this.unitLength = radius / (numLayers + 0.5);
  }
  this.symmetry = (Math.random() < 0.5) ? 5 : 6;
};

Ring.prototype = Object.create(Drawer.prototype);

Ring.prototype.constructor = Ring;

Ring.prototype.setContextParams = function() {
  if (this.canvas.getContext) {
    var ctx = this.canvas.getContext('2d');
    ctx.lineWidth = 3;
    ctx.globalAlpha = 1;
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#ffffff";
    return true;
  }
  return false;
};

Ring.prototype.getRandomLayer = function() {
  var layers = ["triangle", "rectangle", "semicircle", "circle", "bar", "teardrop", "flame", "starburst", "wave"];
  var choice = Math.random();
  for (var i = 0; i < layers.length; i++) {
    if (choice < (i + 1) / layers.length) {
      return layers[i];
    }
  }
}

Ring.prototype.draw = function() {
  for (var i = 1; i <= this.numLayers; i++) {
    this.drawDivider(i);
    switch (this.getRandomLayer()) {
      case "triangle":
        this.drawTriangleLayer(i);
        break;
      case "rectangle":
        this.drawRectangleLayer(i);
        break;
      case "semicircle":
        this.drawSemicircleLayer(i);
        break;
      case "circle":
        this.drawCircleLayer(i);
        break;
      case "bar":
        this.drawBarLayer(i);
        break;
      case "teardrop":
        this.drawTeardropLayer(i);
        break;
      case "flame":
        this.drawFlameLayer(i);
        break;
      case "starburst":
        this.drawStarburstLayer(i);
        break;
      case "wave":
        this.drawWaveLayer(i);
        break;
    }
  }
  this.drawDivider(i);
};

Ring.prototype.drawDivider = function(layer) {
  if (this.setContextParams()) {
    var ctx = this.canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(this.centerX, this.centerY, (layer - 0.5) * this.unitLength, 0, 2 * Math.PI);
    ctx.stroke();
  }
}

Ring.prototype.drawCircleLayer = function(layer) {
  if (this.setContextParams()) {
    var numCircles = layer * this.symmetry;
    var angleInterval = 2 * Math.PI / numCircles;
    var startAngle = (layer % 2) * angleInterval / 2;
    var layerRadius = layer * this.unitLength;
    var baseRadius = (layer - 0.5) * this.unitLength;
    var tipRadius = (layer + 0.5) * this.unitLength;
    var circleRadius = this.unitLength / 3;
    var ctx = this.canvas.getContext('2d');
    for (var i = 0; i < numCircles; i++) {
      var angle = startAngle + i * angleInterval;
      var x = Math.cos(angle) * layerRadius + this.centerX;
      var y = Math.sin(angle) * layerRadius + this.centerY;
      ctx.beginPath();
      ctx.arc(x, y, circleRadius, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.stroke();
      var lineBaseX = Math.cos(angle + angleInterval / 2) * baseRadius + this.centerX;
      var lineBaseY = Math.sin(angle + angleInterval / 2) * baseRadius + this.centerY;
      var lineTipX = Math.cos(angle + angleInterval / 2) * tipRadius + this.centerX;
      var lineTipY = Math.sin(angle + angleInterval / 2) * tipRadius + this.centerY;
      ctx.beginPath();
      ctx.moveTo(lineBaseX, lineBaseY);
      ctx.lineTo(lineTipX, lineTipY);
      ctx.stroke();
    }
  }
};

Ring.prototype.drawTriangleLayer = function(layer) {
  if (this.setContextParams()) {
    var ctx = this.canvas.getContext('2d');
    var numTriangles = layer * this.symmetry;
    var angleInterval = 2 * Math.PI / numTriangles;
    var startAngle = (layer % 2) * angleInterval / 2;
    var baseRadius = (layer - 0.5) * this.unitLength;
    var tipRadius = (layer + 0.5) * this.unitLength - ctx.lineWidth;
    for (var i = 0; i < numTriangles; i++) {
      var angle = startAngle + i * angleInterval;
      var firstX = Math.cos(angle - angleInterval / 2) * baseRadius + this.centerX;
      var firstY = Math.sin(angle - angleInterval / 2) * baseRadius + this.centerY;
      var secondX = Math.cos(angle + angleInterval / 2) * baseRadius + this.centerX;
      var secondY = Math.sin(angle + angleInterval / 2) * baseRadius + this.centerY;
      var tipX = Math.cos(angle) * tipRadius + this.centerX;
      var tipY = Math.sin(angle) * tipRadius + this.centerY;
      ctx.beginPath();
      ctx.moveTo(firstX, firstY);
      ctx.lineTo(tipX, tipY);
      ctx.lineTo(secondX, secondY);
      ctx.stroke();
    }
  }
}

// Ring.prototype.drawTriangleLayer = function(layer) {
//   if (this.setContextParams()) {
//     var ctx = this.canvas.getContext('2d');
//     var numTriangles = 4 * this.symmetry;
//     var angleInterval = 2 * Math.PI / numTriangles;
//     var startAngle = (layer % 2) * angleInterval / 2;
//     var baseRadius = (layer - 0.5) * this.unitLength;
//     var tipRadius = (layer + 0.5) * this.unitLength - ctx.lineWidth / 2;
//     for (var i = 0; i < numTriangles; i++) {
//       var angle = startAngle + i * angleInterval;
//       var firstX = Math.cos(angle) * baseRadius + this.centerX;
//       var firstY = Math.sin(angle) * baseRadius + this.centerY;
//       var secondX = Math.cos(angle + angleInterval) * baseRadius + this.centerX;
//       var secondY = Math.sin(angle + angleInterval) * baseRadius + this.centerY;
//       var tipX = Math.cos(angle + angleInterval / 2) * tipRadius + this.centerX;
//       var tipY = Math.sin(angle + angleInterval / 2) * tipRadius + this.centerY;
//       ctx.beginPath();
//       ctx.moveTo(firstX, firstY);
//       ctx.lineTo(tipX, tipY);
//       ctx.lineTo(secondX, secondY);
//       ctx.stroke();
//     }
//   }
// }

Ring.prototype.drawSemicircleLayer = function(layer) {
  if (this.setContextParams()) {
    var ctx = this.canvas.getContext('2d');
    var numSemicircles = layer * this.symmetry;
    if (layer === 1) {
      numSemicircles = 2 * this.symmetry;
    }
    var angleInterval = 2 * Math.PI / numSemicircles;
    var startAngle = (layer % 2) * angleInterval / 2;
    var baseRadius = (layer - 0.5) * this.unitLength;
    var tipRadius = (layer + 0.5) * this.unitLength;
    var semicircularRadius = Math.sqrt(2 * Math.pow(baseRadius, 2) - 2 * Math.pow(baseRadius, 2) * Math.cos(angleInterval / 2));
    var semicircularAngle = Math.PI - angleInterval / 2;
    for (var i = 0; i < numSemicircles; i++) {
      var angle = startAngle + i * angleInterval;
      var x = Math.cos(angle) * baseRadius + this.centerX;
      var y = Math.sin(angle) * baseRadius + this.centerY;
      ctx.beginPath();
      ctx.arc(x, y, semicircularRadius, angle - semicircularAngle / 2, angle + semicircularAngle / 2);
      ctx.stroke();
      var lineBaseX = Math.cos(angle + angleInterval / 2) * baseRadius + this.centerX;
      var lineBaseY = Math.sin(angle + angleInterval / 2) * baseRadius + this.centerY;
      var lineTipX = Math.cos(angle + angleInterval / 2) * tipRadius + this.centerX;
      var lineTipY = Math.sin(angle + angleInterval / 2) * tipRadius + this.centerY;
      ctx.beginPath();
      ctx.moveTo(lineBaseX, lineBaseY);
      ctx.lineTo(lineTipX, lineTipY);
      ctx.stroke();
    }
  }
}

Ring.prototype.drawRectangleLayer = function(layer) {
  if (this.setContextParams()) {
    var ctx = this.canvas.getContext('2d');
    var numSemicircles = layer * this.symmetry;
    var angleInterval = 2 * Math.PI / numSemicircles;
    var startAngle = (layer % 2) * angleInterval / 2;
    var baseRadius = (layer - 0.5) * this.unitLength;
    var tipRadius = (layer + 0.5) * this.unitLength;
    for (var i = 0; i < numSemicircles; i++) {
      var angle = startAngle + i * angleInterval;
      var lineBaseX = Math.cos(angle + angleInterval / 2) * baseRadius + this.centerX;
      var lineBaseY = Math.sin(angle + angleInterval / 2) * baseRadius + this.centerY;
      var lineTipX = Math.cos(angle + angleInterval / 2) * tipRadius + this.centerX;
      var lineTipY = Math.sin(angle + angleInterval / 2) * tipRadius + this.centerY;
      ctx.beginPath();
      ctx.moveTo(lineBaseX, lineBaseY);
      ctx.lineTo(lineTipX, lineTipY);
      ctx.stroke();
    }
  }
}

Ring.prototype.drawBarLayer = function(layer) {
  if (this.setContextParams()) {
    var ctx = this.canvas.getContext('2d');
    var numSemicircles = layer * this.symmetry;
    var angleInterval = 2 * Math.PI / numSemicircles;
    var startAngle = (layer % 2) * angleInterval / 2;
    var baseRadius = (layer - 0.5) * this.unitLength;
    var tipRadius = (layer + 0.5) * this.unitLength;
    for (var i = 0; i < numSemicircles; i++) {
      var angle = startAngle + i * angleInterval;
      var leftAngle = angle + angleInterval / 10;
      var leftLineBaseX = Math.cos(leftAngle) * baseRadius + this.centerX;
      var leftLineBaseY = Math.sin(leftAngle) * baseRadius + this.centerY;
      var leftLineTipX = Math.cos(leftAngle) * tipRadius + this.centerX;
      var leftLineTipY = Math.sin(leftAngle) * tipRadius + this.centerY;
      ctx.beginPath();
      ctx.moveTo(leftLineBaseX, leftLineBaseY);
      ctx.lineTo(leftLineTipX, leftLineTipY);
      ctx.stroke();
      var rightAngle = angle - angleInterval / 10;
      var rightLineBaseX = Math.cos(rightAngle) * baseRadius + this.centerX;
      var rightLineBaseY = Math.sin(rightAngle) * baseRadius + this.centerY;
      var rightLineTipX = Math.cos(rightAngle) * tipRadius + this.centerX;
      var rightLineTipY = Math.sin(rightAngle) * tipRadius + this.centerY;
      ctx.beginPath();
      ctx.moveTo(rightLineBaseX, rightLineBaseY);
      ctx.lineTo(rightLineTipX, rightLineTipY);
      ctx.stroke();
    }
  }
}

Ring.prototype.drawTeardropLayer = function(layer) {
  if (this.setContextParams()) {
    var ctx = this.canvas.getContext('2d');
    var numSemicircles = layer * this.symmetry;
    var angleInterval = 2 * Math.PI / numSemicircles;
    var startAngle = (layer % 2) * angleInterval / 2;
    var baseRadius = (layer - 0.5) * this.unitLength;
    var tipRadius = (layer + 0.5) * this.unitLength;
    var controlRadius = baseRadius + (tipRadius - baseRadius) / 3;
    for (var i = 0; i < numSemicircles; i++) {
      var angle = startAngle + i * angleInterval;
      var lineBaseX = Math.cos(angle) * baseRadius + this.centerX;
      var lineBaseY = Math.sin(angle) * baseRadius + this.centerY;
      var lineTipX = Math.cos(angle) * tipRadius + this.centerX;
      var lineTipY = Math.sin(angle) * tipRadius + this.centerY;
      var leftControlAngle = angle + angleInterval / 2;
      var leftControlPointX = Math.cos(leftControlAngle) * controlRadius + this.centerX;
      var leftControlPointY = Math.sin(leftControlAngle) * controlRadius + this.centerY;
      ctx.beginPath();
      ctx.moveTo(lineBaseX, lineBaseY);
      ctx.quadraticCurveTo(leftControlPointX, leftControlPointY, lineTipX, lineTipY);
      ctx.stroke();
      var rightControlAngle = angle - angleInterval / 2;
      var rightControlPointX = Math.cos(rightControlAngle) * controlRadius + this.centerX;
      var rightControlPointY = Math.sin(rightControlAngle) * controlRadius + this.centerY;
      ctx.beginPath();
      ctx.moveTo(lineBaseX, lineBaseY);
      ctx.quadraticCurveTo(rightControlPointX, rightControlPointY, lineTipX, lineTipY);
      ctx.stroke();
    }
  }
}

Ring.prototype.drawFlameLayer = function(layer) {
  if (this.setContextParams()) {
    var ctx = this.canvas.getContext('2d');
    var numSemicircles = layer * this.symmetry;
    var angleInterval = 2 * Math.PI / numSemicircles;
    var startAngle = (layer % 2) * angleInterval / 2;
    var baseRadius = (layer - 0.5) * this.unitLength;
    var tipRadius = (layer + 0.5) * this.unitLength;
    var controlRadius = baseRadius + (tipRadius - baseRadius) / 3;
    for (var i = 0; i < numSemicircles; i++) {
      var angle = startAngle + i * angleInterval;
      var lineBaseX = Math.cos(angle) * baseRadius + this.centerX;
      var lineBaseY = Math.sin(angle) * baseRadius + this.centerY;
      var lineTipX = Math.cos(angle) * tipRadius + this.centerX;
      var lineTipY = Math.sin(angle) * tipRadius + this.centerY;
      var centerControlX = Math.cos(angle) * controlRadius + this.centerX;
      var centerControlY = Math.sin(angle) * controlRadius + this.centerY;
      var leftControlAngle = angle + angleInterval / 2;
      var leftControlPointX = Math.cos(leftControlAngle) * controlRadius + this.centerX;
      var leftControlPointY = Math.sin(leftControlAngle) * controlRadius + this.centerY;
      ctx.beginPath();
      ctx.moveTo(lineBaseX, lineBaseY);
      ctx.bezierCurveTo(leftControlPointX, leftControlPointY, centerControlX, centerControlY, lineTipX, lineTipY);
      ctx.stroke();
      var rightControlAngle = angle - angleInterval / 2;
      var rightControlPointX = Math.cos(rightControlAngle) * controlRadius + this.centerX;
      var rightControlPointY = Math.sin(rightControlAngle) * controlRadius + this.centerY;
      ctx.beginPath();
      ctx.moveTo(lineBaseX, lineBaseY);
      ctx.bezierCurveTo(rightControlPointX, rightControlPointY, centerControlX, centerControlY, lineTipX, lineTipY);
      ctx.stroke();
    }
  }
}

Ring.prototype.drawStarburstLayer = function(layer) {
  if (this.setContextParams()) {
    var ctx = this.canvas.getContext('2d');
    var numTriangles = layer * this.symmetry;
    var angleInterval = 2 * Math.PI / numTriangles;
    var startAngle = (layer % 2) * angleInterval / 2;
    var baseRadius = (layer - 0.5) * this.unitLength;
    var tipRadius = (layer + 0.5) * this.unitLength;
    for (var i = 0; i < numTriangles; i++) {
      var angle = startAngle + i * angleInterval;
      var firstX = Math.cos(angle - angleInterval / 2) * baseRadius + this.centerX;
      var firstY = Math.sin(angle - angleInterval / 2) * baseRadius + this.centerY;
      var secondX = Math.cos(angle + angleInterval / 2) * baseRadius + this.centerX;
      var secondY = Math.sin(angle + angleInterval / 2) * baseRadius + this.centerY;
      var tipX = Math.cos(angle) * tipRadius + this.centerX;
      var tipY = Math.sin(angle) * tipRadius + this.centerY;
      var firstControlX = Math.cos(angle - angleInterval / 2) * tipRadius + this.centerX;
      var firstControlY = Math.sin(angle - angleInterval / 2) * tipRadius + this.centerY;
      var secondControlX = Math.cos(angle + angleInterval / 2) * tipRadius + this.centerX;
      var secondControlY = Math.sin(angle + angleInterval / 2) * tipRadius + this.centerY;
      var centerControlX = Math.cos(angle) * baseRadius + this.centerX;
      var centerControlY = Math.sin(angle) * baseRadius + this.centerY;
      ctx.beginPath();
      ctx.moveTo(firstX, firstY);
      ctx.bezierCurveTo(firstX, firstY, centerControlX, centerControlY, tipX, tipY);
      ctx.moveTo(secondX, secondY);
      ctx.bezierCurveTo(secondX, secondY, centerControlX, centerControlY, tipX, tipY);
      ctx.stroke();
    }
  }
}

Ring.prototype.drawWaveLayer = function(layer) {
  if (this.setContextParams()) {
    var ctx = this.canvas.getContext('2d');
    var numTriangles = layer * this.symmetry;
    var angleInterval = 2 * Math.PI / numTriangles;
    var startAngle = (layer % 2) * angleInterval / 2;
    var baseRadius = (layer - 0.5) * this.unitLength;
    var tipRadius = (layer + 0.5) * this.unitLength;
    for (var i = 0; i < numTriangles; i++) {
      var angle = startAngle + i * angleInterval;
      var firstX = Math.cos(angle - angleInterval / 2) * baseRadius + this.centerX;
      var firstY = Math.sin(angle - angleInterval / 2) * baseRadius + this.centerY;
      var secondX = Math.cos(angle + angleInterval / 2) * baseRadius + this.centerX;
      var secondY = Math.sin(angle + angleInterval / 2) * baseRadius + this.centerY;
      var tipX = Math.cos(angle) * tipRadius + this.centerX;
      var tipY = Math.sin(angle) * tipRadius + this.centerY;
      var firstTopControlX = Math.cos(angle - angleInterval / 4) * tipRadius + this.centerX;
      var firstTopControlY = Math.sin(angle - angleInterval / 4) * tipRadius + this.centerY;
      var firstBottomControlX = Math.cos(angle - angleInterval / 4) * baseRadius + this.centerX;
      var firstBottomControlY = Math.sin(angle - angleInterval / 4) * baseRadius + this.centerY;
      var secondTopControlX = Math.cos(angle + angleInterval / 4) * tipRadius + this.centerX;
      var secondTopControlY = Math.sin(angle + angleInterval / 4) * tipRadius + this.centerY;
      var secondBottomControlX = Math.cos(angle + angleInterval / 4) * baseRadius + this.centerX;
      var secondBottomControlY = Math.sin(angle + angleInterval / 4) * baseRadius + this.centerY;
      ctx.beginPath();
      ctx.moveTo(firstX, firstY);
      ctx.bezierCurveTo(firstBottomControlX, firstBottomControlY, firstTopControlX, firstTopControlY, tipX, tipY);
      ctx.moveTo(secondX, secondY);
      ctx.bezierCurveTo(secondBottomControlX, secondBottomControlY, secondTopControlX, secondTopControlY, tipX, tipY);
      ctx.stroke();
    }
  }
}


var Sun = function(canvas, numLayers, centerX, centerY, radius) {
  Ring.call(this, canvas, numLayers, false, centerX, centerY, radius);
}

Sun.prototype = Object.create(Ring.prototype);

Sun.prototype.constructor = Sun;

Sun.prototype.setContextParams = function() {
  if (this.canvas.getContext) {
    var ctx = this.canvas.getContext('2d');
    ctx.lineWidth = 4;
    ctx.globalAlpha = 1;
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#ffffff";
    return true;
  }
  return false;
};

Sun.prototype.draw = function() {
  for (var i = 1; i < this.numLayers; i++) {
    this.drawDivider(i);
    switch (this.getRandomLayer()) {
      case "triangle":
        this.drawTriangleLayer(i);
        break;
      case "rectangle":
        this.drawRectangleLayer(i);
        break;
      case "semicircle":
        this.drawSemicircleLayer(i);
        break;
      case "circle":
        this.drawCircleLayer(i);
        break;
      case "bar":
        this.drawBarLayer(i);
        break;
      case "teardrop":
        this.drawTeardropLayer(i);
        break;
      case "flame":
        this.drawFlameLayer(i);
        break;
      case "starburst":
        this.drawStarburstLayer(i);
        break;
      case "wave":
        this.drawWaveLayer(i);
        break;
    }
  }
  this.drawDivider(i);
  this.drawStarburstLayer(i);
}

var PlanetDiagram = function(canvas, numPlanets) {
  Drawer.call(this, canvas);
  this.numPlanets = numPlanets;
}

PlanetDiagram.prototype = Object.create(Drawer.prototype);

PlanetDiagram.constructor = PlanetDiagram;

PlanetDiagram.prototype.draw = function() {
  var sunRadius = Math.min(this.canvas.width, this.canvas.height) / 4;
  var centerX = this.canvas.width / 2;
  var centerY = this.canvas.height / 2;
  var sun = new Sun(this.canvas, 5, centerX, centerY, sunRadius);
  sun.draw();
  if (this.setContextParams()) {
    var planetGap = (Math.max(this.canvas.width, this.canvas.height) - 2 * sunRadius) / (2 * this.numPlanets + 1);
    var planetRadius = 9 * planetGap / 20;
    for (var i = 1; i <= this.numPlanets; i++) {
      var radius = sunRadius + i * planetGap;
      var ctx = this.canvas.getContext('2d');
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.stroke();
      var planetX = Math.random() * this.canvas.width;
      var planetY = (i % 2 === 0) ? centerY + Math.sqrt(Math.pow(radius, 2) - Math.pow(planetX - centerX, 2)) :  centerY - Math.sqrt(Math.pow(radius, 2) - Math.pow(planetX - centerX, 2));

      var shadowAngle = Math.atan2(planetY - centerY, planetX - centerX);
      ctx.beginPath();
      ctx.arc(planetX, planetY, planetRadius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.arc(planetX, planetY, planetRadius, shadowAngle - Math.PI / 2, shadowAngle + Math.PI / 2);
      ctx.fill();
    }
  }
}

var testHappy = function() {
  var canvas = $("#coloring-page")[0];
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 3;
    ctx.globalAlpha = 1;
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(75,75,50,0,Math.PI*2,true); // Outer circle
    ctx.moveTo(110,75);
    ctx.arc(75,75,35,0,Math.PI,false);  // Mouth (clockwise)
    ctx.moveTo(65,65);
    ctx.arc(60,65,5,0,Math.PI*2,true);  // Left eye
    ctx.moveTo(95,65);
    ctx.arc(90,65,5,0,Math.PI*2,true);  // Right eye
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(675,875,50,0,Math.PI*2,true); // Outer circle
    ctx.moveTo(710,875);
    ctx.arc(675,875,35,0,Math.PI,false);  // Mouth (clockwise)
    ctx.moveTo(665,865);
    ctx.arc(660,865,5,0,Math.PI*2,true);  // Left eye
    ctx.moveTo(695,865);
    ctx.arc(690,865,5,0,Math.PI*2,true);  // Right eye
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(canvas.width,0);
    ctx.lineTo(canvas.width,canvas.height);
    ctx.lineTo(0,canvas.height);
    ctx.lineTo(0,0);
    ctx.stroke();
  }
};


$(document).ready(function() {
  var colors = ["#C91111", "#FF8000", "#F6EB20", "#51C201", "#1C8E0D", "#09C5F4", "#2862B9", "#7E44BC", "#AA0570", "#FCA8CC", "#943F07", "#000000", "#FFFFFF"];

  var penInfo = {
    radius: 2,
    color: "#C91111",
    alpha: 0.667,
    lastX: 0,
    lastY: 0,
    active: false
  };

  $("#generate-btn").click(function() {
    var canvas = $("#coloring-page")[0];
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    canvas = $("#coloring-layer")[0];
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    var selectedPattern = $($(".pattern.selected")[0]).html();
    switch (selectedPattern) {
      case "Rings":
        var ring = new Ring($("#coloring-page")[0], 20, true);
        ring.draw();
        break;
      case "Planets":
        var planetDiagram = new PlanetDiagram($("#coloring-page")[0], 10);
        planetDiagram.draw();
        break;
      default:
        testHappy();
    }

  });
  $("#clear-btn").click(function() {
    var canvas = $("#coloring-layer")[0];
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  });
  $("#print-btn").click(function() {
    var combinedCanvas = $("#combined-canvas")[0];
    var pageCanvas = $("#coloring-page")[0];
    var coloringCanvas = $("#coloring-layer")[0];
    var ctx = combinedCanvas.getContext('2d');
    ctx.clearRect(0, 0, combinedCanvas.width, combinedCanvas.height);
    ctx.drawImage(coloringCanvas, 0, 0);
    ctx.drawImage(pageCanvas, 0, 0);
    var img = combinedCanvas.toDataURL("image/png", "file");
    var win = window.open(img);
    if (win) {
      //Browser has allowed it to be opened
      win.focus();
      win.print();
    } else {
      //Browser has blocked it
      alert('Please allow popups for this website');
    }
  });
  $("#export-btn").click(function() {
    var combinedCanvas = $("#combined-canvas")[0];
    var pageCanvas = $("#coloring-page")[0];
    var coloringCanvas = $("#coloring-layer")[0];
    var ctx = combinedCanvas.getContext('2d');
    ctx.clearRect(0, 0, combinedCanvas.width, combinedCanvas.height);
    ctx.drawImage(coloringCanvas, 0, 0);
    ctx.drawImage(pageCanvas, 0, 0);
    var img = combinedCanvas.toDataURL("image/png", "file");
    var win = window.open(img);
    if (win) {
      //Browser has allowed it to be opened
      win.focus();
    } else {
      //Browser has blocked it
      alert('Please allow popups for this website');
    }
  });
  $("#coloring-layer").mousedown(function(e) {
    var canvas = $("#coloring-layer")[0];
    if (canvas.getContext) {
      // http://stackoverflow.com/questions/55677/how-do-i-get-the-coordinates-of-a-mouse-click-on-a-canvas-element/18053642#18053642
      var rect = canvas.getBoundingClientRect();
      var x = e.clientX - rect.left - parseInt($(canvas).css("border-left-width"),10);
      var y = e.clientY - rect.top - parseInt($(canvas).css("border-top-width"),10);
      penInfo.lastX = x;
      penInfo.lastY = y;
      penInfo.active = true;

      var ctx = canvas.getContext('2d');
      ctx.lineWidth = penInfo.radius * 2;
      ctx.globalAlpha = penInfo.alpha;
      ctx.strokeStyle = penInfo.color;
      ctx.fillStyle = penInfo.color;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.fillRect(x, y, penInfo.radius * 2, penInfo.radius * 2);
    }
  });
  $("#coloring-layer").mousemove(function(e) {
    if (penInfo.active) {
      var canvas = $("#coloring-layer")[0];
      if (canvas.getContext) {
        var rect = canvas.getBoundingClientRect();
        var x = e.clientX - rect.left - parseInt($(canvas).css("border-left-width"),10);
        var y = e.clientY - rect.top - parseInt($(canvas).css("border-top-width"),10);
        penInfo.lastX = x;
        penInfo.lastY = y;

        var ctx = canvas.getContext('2d');
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.moveTo(x, y);
      }
    }
  });
  $("*").mouseup(function(e) {
    if (penInfo.active) {
      var canvas = $("#coloring-layer")[0];
      if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.closePath();
        penInfo.active = false;
      }
    }
  });
  $(".pattern").click(function() {
    $("#dropdownMenu1").html($(this).html() + " <span class=\"caret\"></span>");
    $(".pattern").removeClass("selected");
    $(this).addClass("selected");
  });
  $(".color-swatch").each(function(i) {
    $(this).css("background-color", colors[i]);
  });
  $(".color-swatch").click(function() {
    penInfo.color = $(this).css("background-color");
    $(".color-swatch").removeClass("selected");
    $(this).addClass("selected");
  });
  if (localStorage) {
    if (localStorage.getItem("coloringPage")) {
      if ($("#coloring-page")[0].getContext) {
        var img = new Image();
        img.src = localStorage.getItem("coloringPage");
        var ctx = $("#coloring-page")[0].getContext('2d');
        ctx.drawImage(img, 0, 0);
      }
    }
    if (localStorage.getItem("coloringLayer")) {
      if ($("#coloring-page")[0].getContext) {
        var img = new Image();
        img.src = localStorage.getItem("coloringLayer");
        var ctx = $("#coloring-layer")[0].getContext('2d');
        ctx.drawImage(img, 0, 0);
      }
    }
  }
});

$(window).bind("beforeunload", function() {
  if (localStorage) {
    localStorage.setItem("coloringPage", $("#coloring-page")[0].toDataURL("image/png"));
    localStorage.setItem("coloringLayer", $("#coloring-layer")[0].toDataURL("image/png"));
  }
  return;
});
