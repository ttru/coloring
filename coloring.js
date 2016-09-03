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
    ctx.fillStyle = "#000000";
    ctx.globalCompositeOperation = "source-over";
    return true;
  }
  return false;
};

Drawer.prototype.rotatePoint = function(x, y, originX, originY, angle) {
  var translatedX = x - originX;
  var translatedY = originY - y;
  var rotatedX = translatedX * Math.cos(angle) - translatedY * Math.sin(angle);
  var rotatedY = translatedX * Math.sin(angle) + translatedY * Math.cos(angle);
  return [rotatedX + originX, originY - rotatedY];
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

Ring.prototype.getRandomLayer = function() {
  var layers = ["triangle", "rectangle", "semicircle", "circle", "bar", "teardrop", "flame", "starburst", "wave", "heart"];
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
      case "heart":
        this.drawHeartLayer(i);
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
    var numRects = layer * this.symmetry;
    var angleInterval = 2 * Math.PI / numRects;
    var startAngle = (layer % 2) * angleInterval / 2;
    var baseRadius = (layer - 0.5) * this.unitLength;
    var tipRadius = (layer + 0.5) * this.unitLength;
    for (var i = 0; i < numRects; i++) {
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
    var numBars = layer * this.symmetry;
    var angleInterval = 2 * Math.PI / numBars;
    var startAngle = (layer % 2) * angleInterval / 2;
    var baseRadius = (layer - 0.5) * this.unitLength;
    var tipRadius = (layer + 0.5) * this.unitLength;
    for (var i = 0; i < numBars; i++) {
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
    var numDrops = layer * this.symmetry;
    var angleInterval = 2 * Math.PI / numDrops;
    var startAngle = (layer % 2) * angleInterval / 2;
    var baseRadius = (layer - 0.5) * this.unitLength;
    var tipRadius = (layer + 0.5) * this.unitLength;
    var controlRadius = baseRadius + (tipRadius - baseRadius) / 3;
    for (var i = 0; i < numDrops; i++) {
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
    var numFlames = layer * this.symmetry;
    var angleInterval = 2 * Math.PI / numFlames;
    var startAngle = (layer % 2) * angleInterval / 2;
    var baseRadius = (layer - 0.5) * this.unitLength;
    var tipRadius = (layer + 0.5) * this.unitLength;
    var controlRadius = baseRadius + (tipRadius - baseRadius) / 3;
    for (var i = 0; i < numFlames; i++) {
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
    var numBursts = layer * this.symmetry;
    var angleInterval = 2 * Math.PI / numBursts;
    var startAngle = (layer % 2) * angleInterval / 2;
    var baseRadius = (layer - 0.5) * this.unitLength;
    var tipRadius = (layer + 0.5) * this.unitLength;
    for (var i = 0; i < numBursts; i++) {
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

Ring.prototype.drawHeartLayer = function(layer) {
  if (this.setContextParams()) {
    var ctx = this.canvas.getContext('2d');
    var numHearts = layer * this.symmetry;
    var angleInterval = 2 * Math.PI / numHearts;
    var startAngle = (layer % 2) * angleInterval / 2;
    var baseRadius = (layer - 0.5) * this.unitLength;
    var tipRadius = (layer + 0.85) * this.unitLength;
    var length = tipRadius - baseRadius;
    for (var i = 0; i < numHearts; i++) {
      var angle = startAngle + i * angleInterval;
      var baseX = Math.cos(angle) * baseRadius + this.centerX;
      var baseY = Math.sin(angle) * baseRadius + this.centerY;
      var tipX = Math.cos(angle) * tipRadius + this.centerX;
      var tipY = Math.sin(angle) * tipRadius + this.centerY;
      var firstCPX = baseX + Math.cos(angle - Math.PI / 3) * length;
      var firstCPY = baseY + Math.sin(angle - Math.PI / 3) * length;
      var secondCPX = baseX + Math.cos(angle + Math.PI / 3) * length;
      var secondCPY = baseY + Math.sin(angle + Math.PI / 3) * length;
      var cleftX = Math.cos(angle) * (baseRadius + length / 2) + this.centerX;
      var cleftY = Math.sin(angle) * (baseRadius + length / 2) + this.centerY;
      ctx.beginPath();
      ctx.moveTo(baseX, baseY);
      ctx.bezierCurveTo(firstCPX, firstCPY, tipX, tipY, cleftX, cleftY);
      ctx.moveTo(baseX, baseY);
      ctx.bezierCurveTo(secondCPX, secondCPY, tipX, tipY, cleftX, cleftY);
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
  if (Drawer.prototype.setContextParams.call(this)) {
    var ctx = this.canvas.getContext('2d');
    ctx.lineWidth = 4;
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
      case "heart":
        this.drawHeartLayer(i);
        break;
    }
  }
  this.drawDivider(i);
  this.drawStarburstLayer(i);
}

var Star = function(canvas, radius, centerX, centerY, angleOffset) {
  Drawer.call(this, canvas);
  this.radius = radius;
  this.centerX = centerX;
  this.centerY = centerY;
  this.angleOffset = angleOffset;
}

Star.prototype = Object.create(Drawer.prototype);

Star.constructor = Star;

Star.prototype.setContextParams = function() {
  if (Drawer.prototype.setContextParams.call(this)) {
    var ctx = this.canvas.getContext('2d');
    ctx.lineWidth = 2;
    return true;
  }
  return false;
};

Star.prototype.draw = function() {
  if (this.setContextParams()) {
    var ctx = this.canvas.getContext('2d');
    ctx.beginPath();
    var angle = Math.PI / 2 + this.angleOffset;
    var tipX = this.centerX + Math.cos(angle) * this.radius;
    var tipY = this.centerY - Math.sin(angle) * this.radius;
    ctx.moveTo(tipX, tipY);
    for (var i = 0; i < 5; i++) {
      var jointX = this.centerX + Math.cos(angle + Math.PI / 5) * this.radius / 2;
      var jointY = this.centerY - Math.sin(angle + Math.PI / 5) * this.radius / 2;
      ctx.lineTo(jointX, jointY);
      angle += 2 * Math.PI / 5;
      tipX = this.centerX + Math.cos(angle) * this.radius;
      tipY = this.centerY - Math.sin(angle) * this.radius;
      ctx.lineTo(tipX, tipY);
    }
    ctx.stroke();
  }
}

var AltStar = function(canvas, radius, centerX, centerY) {
  Drawer.call(this, canvas);
  this.radius = radius;
  this.centerX = centerX;
  this.centerY = centerY;
}

AltStar.prototype = Object.create(Drawer.prototype);

AltStar.constructor = AltStar;

AltStar.prototype.setContextParams = function() {
  if (Drawer.prototype.setContextParams.call(this)) {
    var ctx = this.canvas.getContext('2d');
    ctx.lineWidth = 2;
    return true;
  }
  return false;
};

AltStar.prototype.draw = function() {
  if (this.setContextParams()) {
    var ctx = this.canvas.getContext('2d');
    ctx.beginPath();
    var startX = this.centerX + Math.cos(0) * this.radius;
    var startY = this.centerY - Math.sin(0) * this.radius;
    ctx.moveTo(startX, startY);
    for (var angle = Math.PI / 2; angle <= 2 * Math.PI; angle += Math.PI / 2) {
      var nextX = this.centerX + Math.cos(angle) * this.radius;
      var nextY = this.centerY - Math.sin(angle) * this.radius;
      ctx.quadraticCurveTo(this.centerX, this.centerY, nextX, nextY);
    }
    ctx.globalCompositeOperation = "destination-out";
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
    ctx.stroke();
  }
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
    var planetGap = (Math.max(this.canvas.width, this.canvas.height) - 2 * sunRadius) / (2 * this.numPlanets + 3);
    var planetRadius = 9 * planetGap / 20;
    var starBorderRadius = sunRadius + (this.numPlanets + 1) * planetGap;
    var pageDiagonal = Math.sqrt(Math.pow(this.canvas.width, 2) + Math.pow(this.canvas.height, 2));
    var starRadius = 5 * planetRadius / 8;
    for (var currentBorder = starBorderRadius; currentBorder <= pageDiagonal / 2; currentBorder += (10 * starRadius / 4)) {
      var starAngleIncrement = 2 * Math.asin(starRadius / currentBorder) * (5 / 4);
      for (var angle = 0; angle < 2 * Math.PI; angle += starAngleIncrement) {
        var starX = centerX + currentBorder * Math.cos(angle);
        var starY = centerY - currentBorder * Math.sin(angle);
        var star = new Star(this.canvas, starRadius, starX, starY, angle + Math.PI / 2);
        star.draw();
      }
    }
    for (var i = 0; i < 40; i++) {
      var altStarRadius = planetRadius * (1/4 + 1 * Math.random() / 2);
      var angle = Math.random() * 2 * Math.PI;
      var minRadius = sunRadius + altStarRadius * (5 / 4);
      var truncatedRadius = (this.canvas.width < this.canvas.height) ?
        Math.sqrt(Math.pow(this.canvas.width / 2, 2) + Math.pow(Math.tan(angle) * this.canvas.width / 2, 2)) :
        Math.sqrt(Math.pow(this.canvas.height / 2, 2) + Math.pow((this.canvas.height / 2) / Math.tan(angle), 2));
      var maxRadius = Math.min(starBorderRadius, truncatedRadius) - altStarRadius * (5 / 4);
      var radius = Math.random() * (maxRadius - minRadius) + minRadius;
      var altStarX = centerX + Math.cos(angle) * radius;
      var altStarY = centerY + Math.sin(angle) * radius;
      var altStar = new AltStar(this.canvas, altStarRadius, altStarX, altStarY);
      altStar.draw();
    }
    this.setContextParams();
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
      ctx.globalCompositeOperation = "destination-out";
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(planetX, planetY, planetRadius, shadowAngle - Math.PI / 2, shadowAngle + Math.PI / 2);
      ctx.fill();
    }
  }
}

var Tree = function(canvas, trunkWidth, trunkHeight, levels, branchFactor, branchProbability) {
  Drawer.call(this, canvas);
  this.trunkWidth = trunkWidth;
  this.trunkHeight = trunkHeight;
  this.levels = levels;
  this.branchFactor = branchFactor + 2;
  this.branchProbability = branchProbability;
}

Tree.prototype = Object.create(Drawer.prototype);

Tree.constructor = Tree;

Tree.prototype.draw = function() {
  if (this.setContextParams()) {
    var ctx = this.canvas.getContext('2d');
    ctx.beginPath();
    var argsArray = [];
    ctx.moveTo(this.canvas.width / 2 - 2 * this.trunkWidth / 3, 2 * this.canvas.height / 3);
    var cpDistX = (Math.random() < 0.5) ? Math.random() * this.trunkWidth / 3 : - Math.random() * this.trunkWidth / 3;
    var cpDistY = this.canvas.height / 6 * Math.random();
    var leftCPX = this.canvas.width / 2 - 2 * this.trunkWidth / 3 + cpDistX;
    var rightCPX = this.canvas.width / 2 + 2 * this.trunkWidth / 3 + cpDistX;
    var cpY = 2 * this.canvas.height / 3 - cpDistY;
    ctx.quadraticCurveTo(leftCPX, cpY, this.canvas.width / 2 - this.trunkWidth / 2, this.canvas.height / 2);
    this.drawTree(Math.min(3, this.levels), 0, this.canvas.width / 2, this.canvas.height / 2, this.trunkWidth, this.trunkHeight, argsArray);
    ctx.quadraticCurveTo(rightCPX, cpY, this.canvas.width / 2 + 2 * this.trunkWidth / 3, 2 * this.canvas.height / 3);
    //ctx.closePath();
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.save();
    ctx.clip();
    ctx.lineWidth = 2;
    ctx.beginPath();
    var step = 50;
    var baseDev = 200;
    var varDev = 100;
    for (var x = 0; x < this.canvas.width; x += step) {
      ctx.moveTo(x, 0);
      var deviation = (Math.random() < 0.5) ? baseDev + Math.random() * varDev : -baseDev - Math.random() * varDev;
      ctx.lineTo(x + deviation, this.canvas.height);
    }
    for (var y = 0; y < this.canvas.height; y += 50) {
      ctx.moveTo(0, y);
      var deviation = (Math.random() < 0.5) ? baseDev + Math.random() * varDev : -baseDev - Math.random() * varDev;
      ctx.lineTo(this.canvas.width, y + deviation);
    }
    ctx.stroke();
    ctx.restore();
    ctx.lineWidth = 4;
    for (var i = 0; i < argsArray.length; i++) {
      ctx.beginPath();
      ctx.moveTo(argsArray[i].baseCenterX - Math.cos(argsArray[i].angle) * argsArray[i].trunkWidth / 2, argsArray[i].baseCenterY + Math.sin(argsArray[i].angle) * argsArray[i].trunkWidth / 2)
      this.drawTree(this.levels - 3, argsArray[i].angle, argsArray[i].baseCenterX, argsArray[i].baseCenterY, argsArray[i].trunkWidth, argsArray[i].trunkHeight);
      ctx.closePath();
      //ctx.fillStyle = "#FFFFFF";
      ctx.fill();
      ctx.stroke();
    }
    ctx.lineWidth = 3;
    var grassHeight = this.canvas.height / 9;
    var grassWidth = 30;
    var topmostBase = 13 * this.canvas.height / 18;
    var grassLevel = 0;
    for (var currentBase = topmostBase; currentBase - grassHeight <= this.canvas.height; currentBase += grassHeight / 2, grassLevel++) {
      var xOffset = (grassLevel % 2) * grassWidth / 2;
      for (var x = xOffset; x <= this.canvas.width; x += grassWidth) {
        var height = grassHeight + Math.random() * grassHeight / 3;
        var tipX = x + grassWidth / 2;
        var xDist = (Math.random() < 0.5) ? grassWidth * Math.random() : -grassWidth * Math.random();
        var yDist = height * Math.random();
        ctx.beginPath();
        ctx.moveTo(x, currentBase);
        ctx.quadraticCurveTo(x + xDist, currentBase - yDist, x + grassWidth / 2, currentBase - height);
        ctx.quadraticCurveTo(x + grassWidth + xDist, currentBase - yDist, x + grassWidth, currentBase);
        ctx.globalCompositeOperation = "destination-out";
        ctx.fill();
        ctx.globalCompositeOperation = "source-over";
        ctx.stroke();
      }
    }
  }
}

Tree.prototype.drawTree = function(level, angle, baseCenterX, baseCenterY, trunkWidth, trunkHeight, argsArray) {
  var ctx = this.canvas.getContext('2d');
  var leftBase = this.rotatePoint(baseCenterX - trunkWidth / 2, baseCenterY, baseCenterX, baseCenterY, angle);
  var rightBase = this.rotatePoint(baseCenterX + trunkWidth / 2, baseCenterY, baseCenterX, baseCenterY, angle);
  var cpDistX = (Math.random() < 0.5) ? trunkWidth / 3 + Math.random() * trunkWidth / 3 : -trunkWidth / 3 - Math.random() * trunkWidth / 3;
  var cpDistY = trunkHeight * Math.random();
  var leftCP = this.rotatePoint(baseCenterX - trunkWidth / 2 + cpDistX, baseCenterY - cpDistY, baseCenterX, baseCenterY, angle);
  var rightCP = this.rotatePoint(baseCenterX + trunkWidth / 2 + cpDistX, baseCenterY - cpDistY, baseCenterX, baseCenterY, angle);
  if (level === 0) {
    var tip = this.rotatePoint(baseCenterX, baseCenterY - trunkHeight, baseCenterX, baseCenterY, angle);
    ctx.quadraticCurveTo(leftCP[0], leftCP[1], tip[0], tip[1]);
    ctx.quadraticCurveTo(rightCP[0], rightCP[1], rightBase[0], rightBase[1]);
    if (argsArray) {
      argsArray.push({
        "angle": angle,
        "baseCenterX": baseCenterX,
        "baseCenterY": baseCenterY,
        "trunkWidth": trunkWidth,
        "trunkHeight": trunkHeight
      });
    }
  } else {
    var leftTop = this.rotatePoint(baseCenterX - trunkWidth / 2, baseCenterY - trunkHeight, baseCenterX, baseCenterY, angle);
    var rightTop = this.rotatePoint(baseCenterX + trunkWidth / 2, baseCenterY - trunkHeight, baseCenterX, baseCenterY, angle);
    var branchOutPoints = new Array(this.branchFactor - 1);
    for (var i = 1; i < this.branchFactor; i++) {
      var branchAngle = (4 / 3) * Math.PI - (5 / 3) * Math.PI * i / this.branchFactor;
      var pointX = baseCenterX + Math.cos(branchAngle) * trunkWidth;
      var pointY = baseCenterY - trunkHeight - ((Math.sqrt(3) / 2) * trunkWidth) - Math.sin(branchAngle) * trunkWidth;
      branchOutPoints[i - 1] = this.rotatePoint(pointX, pointY, baseCenterX, baseCenterY, angle);
    }
    var branchArray = new Array(this.branchFactor);
    for (var i = 0; i < branchArray.length; i++) {
      if (i === 0 || i === branchArray.length - 1) {
        branchArray[i] = false;
      } else {
        branchArray[i] = (Math.random() < this.branchProbability);
      }
    }
    ctx.quadraticCurveTo(leftCP[0], leftCP[1], leftTop[0], leftTop[1]);
    var newWidth = 2 * trunkWidth * Math.sin((5 / 3) * Math.PI / (2 * this.branchFactor));
    var newHeight = trunkHeight * (newWidth / trunkWidth);
    for (var i = 0; i < this.branchFactor; i++) {
      if (branchArray[i]) {
        var branchAngle = (4 / 3) * Math.PI - (5 / 3) * Math.PI * (i + 1 / 2) / this.branchFactor;
        var pointX, pointY;
        pointX = (branchOutPoints[i - 1][0] + branchOutPoints[i][0]) / 2;
        pointY = (branchOutPoints[i - 1][1] + branchOutPoints[i][1]) / 2;
        this.drawTree(level - 1, angle + branchAngle - Math.PI / 2, pointX, pointY, newWidth, newHeight, argsArray);
      } else {
        if (i !== 0 && branchArray[i - 1]) {
          for (var j = i + 1; j < this.branchFactor; j++) {
            if (branchArray[j]) {
              break;
            }
          }
          if (j !== this.branchFactor) {
            var leftBranchAngle = (4 / 3) * Math.PI - (5 / 3) * Math.PI * (i + 1 / 2) / this.branchFactor;
            var rightBranchAngle = (4 / 3) * Math.PI - (5 / 3) * Math.PI * (j - 1 / 2) / this.branchFactor;
            var midAngle = (leftBranchAngle + rightBranchAngle) / 2;
            var midX = baseCenterX + Math.cos(midAngle) * (1 / 2) * trunkWidth;
            var midY = baseCenterY - trunkHeight - ((Math.sqrt(3) / 2) * trunkWidth) - Math.sin(midAngle) * (1 / 2) * trunkWidth;
            var rotatedMid = this.rotatePoint(midX, midY, baseCenterX, baseCenterY, angle);
            ctx.lineTo(rotatedMid[0], rotatedMid[1]);
          }
        }
        if (i !== this.branchFactor - 1 && branchArray[i + 1]) {
          ctx.lineTo(branchOutPoints[i][0], branchOutPoints[i][1]);
        }
      }
    }
    ctx.lineTo(rightTop[0], rightTop[1]);
    ctx.quadraticCurveTo(rightCP[0], rightCP[1], rightBase[0], rightBase[1]);
  }
}

var Flower = function(canvas, centerX, centerY, petalLength, symmetry, petalSymmetry, angleOffset, borderedPetals) {
  Drawer.call(this, canvas);
  this.centerX = centerX;
  this.centerY = centerY;
  this.petalLength = petalLength;
  this.symmetry = (typeof symmetry != 'undefined') ? symmetry : ((Math.random() < 0.5) ? 5 : 6);
  this.petalSymmetry = (typeof petalSymmetry != 'undefined') ? petalSymmetry : (Math.random() < 0.5);
  this.angleOffset = (typeof angleOffset != 'undefined') ? angleOffset : (Math.random() * 2 * Math.PI);
  this.borderedPetals = (typeof borderedPetals != 'undefined') ? borderedPetals : Math.random() < 0.5;
  this.petalAngle = 2 * Math.PI / this.symmetry;
  this.circleRadius = this.petalLength / 4;
  this.borderScaleFactor = 0.8;
  if (this.petalSymmetry) {
    this.cpAngleOffset = Math.random() * this.petalAngle / 2;
    this.cpRadius = this.circleRadius + (3 / 2) * Math.random() * this.petalLength;
    this.centerLine = Math.random() < 0.5;
    var centerLineDev = Math.random() * this.circleRadius * ((this.borderedPetals) ? 1 : this.borderScaleFactor);
    this.centerLineRadius = (3 / 2) * this.circleRadius + centerLineDev;
  } else {
    this.leftCPAngleOffset = Math.random() * this.petalAngle / 2;
    this.leftCPRadius = this.circleRadius + (3 / 2) * Math.random() * this.petalLength;
    this.rightCPAngleOffset = Math.random() * this.petalAngle / 2;
    this.rightCPRadius = this.circleRadius + (3 / 2) * Math.random() * this.petalLength;
  }
};

Flower.prototype = Object.create(Drawer.prototype);

Flower.constructor = Flower;

Flower.prototype.drawScaledPetals = function(scale) {
  var ctx = this.canvas.getContext('2d');
  var scaledPetalLength = this.petalLength * scale;
  for (var i = 0; i < this.symmetry; i++) {
    var centralAngle = this.angleOffset + this.petalAngle * i;
    var leftAngle = centralAngle - this.petalAngle / 2;
    var rightAngle = centralAngle + this.petalAngle / 2;
    var centralStartX = this.centerX + Math.cos(centralAngle) * this.circleRadius;
    var centralStartY = this.centerY - Math.sin(centralAngle) * this.circleRadius;
    var leftStartX = this.centerX + Math.cos(leftAngle) * this.circleRadius;
    var leftStartY = this.centerY - Math.sin(leftAngle) * this.circleRadius;
    var rightStartX = this.centerX + Math.cos(rightAngle) * this.circleRadius;
    var rightStartY = this.centerY - Math.sin(rightAngle) * this.circleRadius;
    var leftTipX = this.centerX + Math.cos(leftAngle) * scaledPetalLength;
    var leftTipY = this.centerY - Math.sin(leftAngle) * scaledPetalLength;
    var rightTipX = this.centerX + Math.cos(rightAngle) * scaledPetalLength;
    var rightTipY = this.centerY - Math.sin(rightAngle) * scaledPetalLength;
    var tipX = this.centerX + Math.cos(centralAngle) * scaledPetalLength;
    var tipY = this.centerY - Math.sin(centralAngle) * scaledPetalLength;
    if (this.petalSymmetry) {
      var leftCPAngle = centralAngle - this.cpAngleOffset;
      var rightCPAngle = centralAngle + this.cpAngleOffset;
      var leftCPX = this.centerX + Math.cos(leftCPAngle) * scale * this.cpRadius;
      var leftCPY = this.centerY - Math.sin(leftCPAngle) * scale * this.cpRadius;
      var rightCPX = this.centerX + Math.cos(rightCPAngle) * scale * this.cpRadius;
      var rightCPY = this.centerY - Math.sin(rightCPAngle) * scale * this.cpRadius;
      ctx.beginPath();
      ctx.moveTo(this.centerX, this.centerY);
      ctx.lineTo(this.leftStartX, this.leftStartY);
      ctx.bezierCurveTo(leftTipX, leftTipY, leftCPX, leftCPY, tipX, tipY);
      ctx.bezierCurveTo(rightCPX, rightCPY, rightTipX, rightTipY, rightStartX, rightStartY);
      ctx.lineTo(this.rightStartX, this.rightStartY);
      ctx.globalCompositeOperation = "destination-out";
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
      ctx.stroke();
    } else {
      var leftCPAngle = centralAngle - this.leftCPAngleOffset;
      var rightCPAngle = centralAngle + this.rightCPAngleOffset;
      var leftCPX = this.centerX + Math.cos(leftCPAngle) * scale * this.leftCPRadius;
      var leftCPY = this.centerY - Math.sin(leftCPAngle) * scale * this.leftCPRadius;
      var rightCPX = this.centerX + Math.cos(rightCPAngle) * scale * this.rightCPRadius;
      var rightCPY = this.centerY - Math.sin(rightCPAngle) * scale * this.rightCPRadius;
      ctx.beginPath();
      ctx.moveTo(leftStartX, leftStartY);
      ctx.bezierCurveTo(leftTipX, leftTipY, leftCPX, leftCPY, tipX, tipY);
      ctx.bezierCurveTo(rightCPX, rightCPY, rightTipX, rightTipY, rightStartX, rightStartY);
      ctx.globalCompositeOperation = "destination-out";
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
      ctx.stroke();
    }
  }
};

Flower.prototype.draw = function() {
  if (this.setContextParams()) {
    var ctx = this.canvas.getContext('2d');

    this.drawScaledPetals(1);
    if (this.borderedPetals) {
      this.drawScaledPetals(this.borderScaleFactor);
    }
    ctx.beginPath();
    ctx.arc(this.centerX, this.centerY, this.circleRadius, 0, 2 * Math.PI);
    ctx.globalCompositeOperation = "destination-out";
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
    ctx.stroke();

    for (var i = 0; i < this.symmetry; i++) {
      var centralAngle = this.angleOffset + this.petalAngle * i;
      if (this.centerLine) {
        var centralStartX = this.centerX + Math.cos(centralAngle) * this.circleRadius;
        var centralStartY = this.centerY - Math.sin(centralAngle) * this.circleRadius;
        var scaledCenterLineRadius = this.centerLineRadius;
        var centralLineEndX = this.centerX + Math.cos(centralAngle) * this.centerLineRadius;
        var centralLineEndY = this.centerY - Math.sin(centralAngle) * this.centerLineRadius;
        ctx.beginPath();
        ctx.moveTo(centralStartX, centralStartY);
        ctx.lineTo(centralLineEndX, centralLineEndY);
        ctx.stroke();
      }
    }

  }
};

var Flowerbed = function(canvas) {
  this.canvas = canvas;
};

Flowerbed.prototype = Object.create(Drawer.prototype);

Flowerbed.constructor = Flowerbed;

Flowerbed.prototype.draw = function() {
  var stripeHeight = this.canvas.height / 5;
  var maxLength = stripeHeight / 2;
  for (var row = 0; row < this.canvas.height / stripeHeight; row++) {
    var x = Math.random() * maxLength - (row % 2) * maxLength;
    while (x < this.canvas.width) {
      var length = maxLength / 3 + (2 / 3) * maxLength * Math.random();
      var y = length + (row * stripeHeight) + (stripeHeight - 2 * length) * Math.random();
      var flower = new Flower(this.canvas, x, y, length);
      flower.draw();
      x += (2 * length + Math.random() * maxLength);
    }
  }
};

var Book = function(canvas, baseX, baseY, bookWidth, bookHeight, angle, shelfHeight) {
  this.canvas = canvas;
  this.baseX = (angle >= 0) ? baseX : baseX + Math.abs(bookHeight * Math.sin(angle));
  this.baseY = baseY;
  this.bookWidth = bookWidth;
  this.bookHeight = bookHeight;
  this.angle = angle;
  this.originX = (this.angle >= 0) ? this.baseX + this.bookWidth : this.baseX;
  this.originY = this.baseY;
}

Book.prototype = Object.create(Drawer.prototype);

Book.constructor = Book;

Book.prototype.draw = function() {
  if (this.setContextParams()) {
    var ctx = this.canvas.getContext('2d');
    var leftBase = this.rotatePoint(this.baseX, this.baseY, this.originX, this.originY, -this.angle);
    var rightBase = this.rotatePoint(this.baseX + this.bookWidth, this.baseY, this.originX, this.originY, -this.angle);
    var leftTop = this.rotatePoint(this.baseX, this.baseY - this.bookHeight, this.originX, this.originY, -this.angle);
    var rightTop = this.rotatePoint(this.baseX + this.bookWidth, this.baseY - this.bookHeight, this.originX, this.originY, -this.angle);
    ctx.beginPath();
    ctx.moveTo(leftBase[0], leftBase[1]);
    ctx.lineTo(leftTop[0], leftTop[1]);
    ctx.lineTo(rightTop[0], rightTop[1]);
    ctx.lineTo(rightBase[0], rightBase[1]);
    ctx.closePath();
    ctx.stroke();
    this.drawStyle();
  }
};

Book.prototype.drawStyle = function() {
  var styles = Array(10).fill("plain");
  styles[0] = "line";
  styles[1] = "doubleline";
  styles[2] = "square";
  var style = styles[Math.floor(Math.random() * styles.length)];
  switch (style) {
    case "line":
      var numLines = Math.floor(Math.random() * 4) + 1;
      this.drawLines(numLines);
      break;
    case "doubleline":
      var numLines = Math.floor(Math.random() * 4) + 1;
      this.drawDoubleLines(numLines);
      break;
    case "square":
      this.drawSquare();
      break;
  }
};

Book.prototype.drawLines = function(numLines) {
  var ctx = this.canvas.getContext('2d');
  var symmetry = Math.random() < 0.5;
  if (symmetry) {
    var width = this.bookHeight / numLines;
    for (var i = 1; i < numLines; i++) {
      var y = this.baseY - this.bookHeight + width * i;
      var left = this.rotatePoint(this.baseX, y, this.originX, this.originY, -this.angle);
      var right = this.rotatePoint(this.baseX + this.bookWidth, y, this.originX, this.originY, -this.angle);
      var oldWidth = ctx.lineWidth;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(left[0], left[1]);
      ctx.lineTo(right[0], right[1]);
      ctx.closePath();
      ctx.stroke();
      ctx.lineWidth = oldWidth;
    }
  } else {
    var maxWidth = this.bookHeight / numLines;
    var lastY = this.baseY - this.bookHeight;
    for (var i = 1; i < numLines; i++) {
      var width = (0.5 + 0.5 * Math.random()) * maxWidth;
      var y = lastY + width;
      var left = this.rotatePoint(this.baseX, y, this.originX, this.originY, -this.angle);
      var right = this.rotatePoint(this.baseX + this.bookWidth, y, this.originX, this.originY, -this.angle);
      var oldWidth = ctx.lineWidth;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(left[0], left[1]);
      ctx.lineTo(right[0], right[1]);
      ctx.closePath();
      ctx.stroke();
      ctx.lineWidth = oldWidth;
    }
  }
};

Book.prototype.drawDoubleLines = function(numLines) {
  var ctx = this.canvas.getContext('2d');
  var width = this.bookHeight / numLines;
  var lineGap = this.bookHeight / 20;
  for (var i = 1; i < numLines; i++) {
    var y = this.baseY - this.bookHeight + width * i;
    var leftTop = this.rotatePoint(this.baseX, y - lineGap / 2, this.originX, this.originY, -this.angle);
    var rightTop = this.rotatePoint(this.baseX + this.bookWidth, y - lineGap / 2, this.originX, this.originY, -this.angle);
    var leftBottom = this.rotatePoint(this.baseX, y + lineGap / 2, this.originX, this.originY, -this.angle);
    var rightBottom = this.rotatePoint(this.baseX + this.bookWidth, y + lineGap / 2, this.originX, this.originY, -this.angle);
    var oldWidth = ctx.lineWidth;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(leftTop[0], leftTop[1]);
    ctx.lineTo(rightTop[0], rightTop[1]);
    ctx.closePath();
    ctx.stroke();
    ctx.moveTo(leftBottom[0], leftBottom[1]);
    ctx.lineTo(rightBottom[0], rightBottom[1]);
    ctx.closePath();
    ctx.stroke();
    ctx.lineWidth = oldWidth;
  }
};

Book.prototype.drawSquare = function() {
  var topGap = this.bookHeight / 6 + Math.random() * this.bookHeight / 12;
  var sideGap = this.bookWidth / 6 + Math.random() * this.bookWidth / 6;
  var height = this.bookHeight / 6 + Math.random() * this.bookHeight / 12;
  var bottomLeft = this.rotatePoint(this.baseX + sideGap, this.baseY - this.bookHeight + topGap + height, this.originX, this.originY, -this.angle);
  var bottomRight = this.rotatePoint(this.baseX + this.bookWidth - sideGap, this.baseY - this.bookHeight + topGap + height, this.originX, this.originY, -this.angle);
  var topLeft = this.rotatePoint(this.baseX + sideGap, this.baseY - this.bookHeight + topGap, this.originX, this.originY, -this.angle);
  var topRight = this.rotatePoint(this.baseX + this.bookWidth - sideGap, this.baseY - this.bookHeight + topGap, this.originX, this.originY, -this.angle);
  var ctx = this.canvas.getContext('2d');
  ctx.beginPath();
  var oldWidth = ctx.lineWidth;
  ctx.lineWidth = 2;
  ctx.moveTo(bottomLeft[0], bottomLeft[1]);
  ctx.lineTo(topLeft[0], topLeft[1]);
  ctx.lineTo(topRight[0], topRight[1]);
  ctx.lineTo(bottomRight[0], bottomRight[1]);
  ctx.closePath();
  ctx.stroke();
  ctx.lineWidth = oldWidth;
}

var Bookshelf = function(canvas, numShelves, shelfThickness) {
  this.canvas = canvas;
  this.numShelves = numShelves;
  this.shelfThickness = shelfThickness;
  this.shelfHeight = (this.canvas.height - (this.numShelves + 1) * this.shelfThickness) / this.numShelves;
};

Bookshelf.prototype = Object.create(Drawer.prototype);

Bookshelf.constructor = Bookshelf;

Bookshelf.prototype.draw = function() {
  if (this.setContextParams()) {
    var ctx = this.canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(0, this.shelfThickness);
    ctx.lineTo(this.canvas.width, this.shelfThickness);
    ctx.stroke();
    for (var i = 0; i < this.numShelves; i++) {
      var shelfBaseY = (this.shelfThickness + this.shelfHeight) * (i + 1);
      var currentX = -this.canvas.width / 80;
      var prevAngle = 0;
      var prevHeight = 0;
      while (currentX < this.canvas.width) {
        var bookRatio = 3 + Math.random() * 7;
        var bookHeight = (0.5 + Math.random() * 0.5) * this.shelfHeight;
        var bookWidth = bookHeight / bookRatio;
        var angle = 0;
        if (prevAngle === 0 && prevHeight >= bookHeight) {
          angle = (Math.random() < 0.9) ? 0 : -Math.PI / 16 + Math.random() * Math.PI / 8;
        }
        if (prevAngle !== 0 && prevHeight >= bookHeight) {
          bookHeight = prevHeight + Math.random() * (this.shelfHeight - prevHeight);
        }
        var book = new Book(this.canvas, currentX, shelfBaseY, bookWidth, bookHeight, angle, this.shelfHeight);
        book.draw();
        currentX += Math.abs(bookHeight * Math.sin(angle)) + Math.abs(bookWidth * Math.cos(angle));
        prevAngle = angle;
        prevHeight = bookHeight;
      }
      ctx.beginPath();
      ctx.moveTo(0, shelfBaseY);
      ctx.lineTo(this.canvas.width, shelfBaseY);
      ctx.moveTo(0, shelfBaseY + this.shelfThickness);
      ctx.lineTo(this.canvas.width, shelfBaseY + this.shelfThickness);
      ctx.stroke();
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
    var pageCanvas = $("#coloring-page")[0];
    if (pageCanvas.getContext) {
      var ctx = pageCanvas.getContext('2d');
      ctx.clearRect(0, 0, pageCanvas.width, pageCanvas.height);
    }
    var coloringCanvas = $("#coloring-layer")[0];
    if (coloringCanvas.getContext) {
      var ctx = coloringCanvas.getContext('2d');
      ctx.clearRect(0, 0, coloringCanvas.width, coloringCanvas.height);
    }
    var selectedPattern = $($(".pattern.selected")[0]).html();
    switch (selectedPattern) {
      case "Rings":
        var ring = new Ring(pageCanvas, 15, true);
        ring.draw();
        break;
      case "Planets":
        var planetDiagram = new PlanetDiagram(pageCanvas, 6);
        planetDiagram.draw();
        break;
      case "Trees":
        var tree = new Tree(pageCanvas, pageCanvas.width / 10, pageCanvas.height / 8, 5, 8, 0.7);
        tree.draw();
        break;
      case "Flowerbed":
        var flowerbed = new Flowerbed(pageCanvas);
        flowerbed.draw();
        break;
      case "Bookshelf":
        var bookshelf = new Bookshelf(pageCanvas, 6, pageCanvas.height / 60);
        bookshelf.draw();
        break;
      default:
        testHappy();
    }
    var ctx = pageCanvas.getContext('2d');
    ctx.lineWidth = 8;
    ctx.strokeStyle = "#000000";
    ctx.strokeRect(0, 0, pageCanvas.width, pageCanvas.height);

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
