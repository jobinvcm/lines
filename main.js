(function () {
  function drawLineNow(ctx, startX, startY, endX, endY, color) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = color;
    ctx.stroke();
  }

  function drawGridCrossed(
    ctx,
    startX,
    endX,
    height,
    spacing,
    startFactor = 1,
    endFactor = 1,
    times = 1
  ) {
    var color1 = "#629cd4";
    var color2 = "#57c479";
    var color3 = "#f2444b";
    var color4 = "#f8ac54";
    var spacingStart = spacing * startFactor;
    var spacingEnd = spacing * endFactor;

    var newStartX = startX;
    var newEndX = endX;

    for (var i = 0; i < times; i++) {
      drawLineNow(ctx, newStartX, 0, newEndX, height, color1);
      drawLineNow(
        ctx,
        newStartX - spacingStart,
        0,
        newEndX + spacingEnd,
        height,
        color2
      );
      drawLineNow(
        ctx,
        newStartX - 2 * spacingStart,
        0,
        newEndX + 2 * spacingEnd,
        height,
        color3
      );
      drawLineNow(
        ctx,
        newStartX - 3 * spacingStart,
        0,
        newEndX + 3 * spacingEnd,
        height,
        color4
      );
      newStartX = newStartX - 4 * spacingStart;
      newEndX = newEndX + 4 * spacingEnd;
    }
  }
  function drawParallelGrid(
    ctx,
    startX,
    endX,
    startY,
    height,
    spacing,
    startFactor = 1,
    endFactor = 1,
    times = 1
  ) {
    var color1 = "#629cd4";
    var color2 = "#57c479";
    var color3 = "#f2444b";
    var color4 = "#f8ac54";
    var spacingStart = spacing * startFactor;
    var spacingEnd = spacing * endFactor;

    var newStartX = startX;
    var newEndX = endX;
    var newStartY = startY;

    for (var i = 0; i < times; i++) {
      drawLineNow(ctx, newStartX, newStartY, newEndX, height, color1);
      drawLineNow(
        ctx,
        newStartX - spacingStart,
        newStartY + spacing,
        newEndX + spacingEnd,
        height,
        color2
      );
      drawLineNow(
        ctx,
        newStartX - 2 * spacingStart,
        newStartY + 2 * spacing,
        newEndX + 2 * spacingEnd,
        height,
        color3
      );
      drawLineNow(
        ctx,
        newStartX - 3 * spacingStart,
        newStartY + 3 * spacing,
        newEndX + 3 * spacingEnd,
        height,
        color4
      );
      var factor = 1;
      newStartX = newStartX - factor * 4 * spacingStart;
      newEndX = newEndX + factor * 4 * spacingEnd;
      newStartY = newStartY + factor * 4 * spacing;
    }
  }

  function drawlines(ctx, height, width, spacing) {
    ctx.lineWidth = 2;
    var startX = width;
    var endX = 0;
    // drawGridCrossed(ctx, startX, endX, height + spacing + 10, spacing, 0.5, 1, 7);
    drawParallelGrid(
      ctx,
      startX - 0.5 * 7 * spacing,
      endX + 7 * spacing,
      -500,
      height + spacing * 10,
      spacing,
      3,
      2,
      20
    );
  }

  function init(spacing = -20) {
    var canvas = document.getElementById("canvas");
    var height = window.innerHeight;
    var width = window.innerWidth;

    canvas.height = height;
    canvas.width = width;
    var ctx = canvas.getContext("2d");

    ctx.translate(-400, -1000 - spacing * 10);
    drawlines(ctx, height + 1000, width, spacing);
  }

  var startSpacing = 80;
  init(startSpacing);

  let last_known_scroll_position = 0;
  let ticking = false;

  function doSomething(scroll_pos) {
    init(startSpacing - scroll_pos / 20);
    console.log(startSpacing - scroll_pos / 1);
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
