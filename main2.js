(function () {
  var color1 = "#629cd4";
  var color2 = "#57c479";
  var color3 = "#f2444b";
  var color4 = "#f8ac54";

  function drawLineNow(ctx, startX, startY, endX, endY, color) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = color;
    ctx.stroke();
  }

  function drawYGrid(
    ctx,
    startY,
    endY,
    endX,
    spacing,
    lines,
    startFactor,
    endFactor
  ) {
    var newStartY = startY;
    var newEndY = endY;

    for (var i = 0; i < lines; i++) {
      drawLineNow(ctx, 0, newStartY, endX, newEndY, color1);
      drawLineNow(
        ctx,
        0,
        newStartY - startFactor * spacing,
        endX,
        newEndY + endFactor * spacing,
        color2
      );
      drawLineNow(
        ctx,
        0,
        newStartY - startFactor * spacing * 2,
        endX,
        newEndY + endFactor * spacing * 2,
        color3
      );
      drawLineNow(
        ctx,
        0,
        newStartY - startFactor * spacing * 3,
        endX,
        newEndY + endFactor * spacing * 3,
        color4
      );

      newStartY = newStartY - startFactor * spacing * 4;
      newEndY = newEndY + endFactor * spacing * 4;
    }
  }

  function drawYParallelGrid(
    ctx,
    startY,
    endY,
    endX,
    spacing,
    lines,
    startFactor,
    endFactor
  ) {
    var newStartY = startY;
    var newEndY = endY;
    var newStartX = 0;

    for (var i = 0; i < lines; i++) {
      drawLineNow(ctx, newStartX, newStartY, endX, newEndY, color1);
      drawLineNow(
        ctx,
        newStartX - spacing,
        newStartY + startFactor * spacing,
        endX,
        newEndY - endFactor * spacing,
        color2
      );
      drawLineNow(
        ctx,
        newStartX - 2 * spacing,
        newStartY + startFactor * spacing * 2,
        endX,
        newEndY - endFactor * spacing * 2,
        color3
      );
      drawLineNow(
        ctx,
        newStartX - 3 * spacing,
        newStartY + startFactor * spacing * 3,
        endX,
        newEndY - endFactor * spacing * 3,
        color4
      );

      newStartY = newStartY + startFactor * spacing * 4;
      newEndY = newEndY - endFactor * spacing * 4;
      newStartX = newStartX - spacing * 4;
    }
  }

  function drawlines(ctx, height, width, spacing, scroll) {
    var startY = height;
    var endY = (2 * height) / 5;

    drawYGrid(
      ctx,
      startY,
      endY,
      width,
      spacing - scroll / 100,
      8,
      3 + scroll / 100,
      1 + scroll / 200
    );
    drawYParallelGrid(
      ctx,
      startY,
      endY,
      width,
      spacing / 2 + scroll / 200,
      8,
      6 - scroll / 200,
      2 - scroll / 300
    );
  }

  function init(scroll = 0) {
    var canvas = document.getElementById("canvas");
    var height = window.innerHeight;
    var width = window.innerWidth;

    var spacing = 20;
    canvas.height = height;
    canvas.width = width;
    var ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;

    ctx.rotate(Math.PI / 180);
    drawlines(ctx, height, width, spacing, scroll);
  }

  var startSpacing = 80;
  init(startSpacing);

  let last_known_scroll_position = 0;
  let ticking = false;

  function doSomething(scroll_pos) {
    init(scroll_pos);
  }

  window.addEventListener("scroll", function (e) {
    last_known_scroll_position = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(function () {
        doSomething(last_known_scroll_position);
        ticking = false;
      });

      ticking = true;
    }
  });
})();
