$(document).ready(function() {
  var colors = ["#C91111", "#D84E09", "#FF8000", "#F6EB20", "#51C201", "#1C8E0D", "#09C5F4", "#2862B9", "#7E44BC", "#FCA8CC", "#943F07", "#000000"];

  var penInfo = {
    radius: 1,
    color: "#C91111",
    alpha: 0.5,
    lastX: 0,
    lastY: 0,
    active: false
  };

  $("#generate-btn").click(function() {
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
  });
  $("#clear-btn").click(function() {
    var canvas = $("#coloring-page")[0];
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  });
  $("#print-btn").click(function() {
    var canvas = $("#coloring-page")[0];
    var img = canvas.toDataURL("image/png", "file");
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
    var canvas = $("#coloring-page")[0];
    var img = canvas.toDataURL("image/png", "file");
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
});
