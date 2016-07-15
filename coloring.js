$(document).ready(function() {
  $("#generate-btn").click(function() {
    var canvas = $("#coloring-page")[0];
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      ctx.lineWidth = 3;
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
      //win.focus();
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
});
