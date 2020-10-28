(function () {
  var color1 = "#629cd4";
  var color2 = "#57c479";
  var color3 = "#f2444b";
  var color4 = "#f8ac54";
  // var color1 = "#eee";
  // var color2 = "#eee";
  // var color3 = "#eee";
  // var color4 = "#eee";

  function drawLineNow(ctx, startX, startY, endX, endY, color) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = color;
    ctx.stroke();
  }

  function drawGrid(
    ctx,
    startY,
    height,
    width,
    spacing,
    scroll,
    numberOfGrids,
    startFactor,
    endFactor
  ) {
    var newEndY = 0.25 * height;
    var newStartY = startY;
    var spacingStart = spacing * startFactor;
    var spacingEnd = spacing * endFactor;
    var newStartX = 0 - 100;

    for (var i = 0; i < numberOfGrids; i++) {
      drawLineNow(ctx, newStartX, newStartY, width, newEndY, color1);
      drawLineNow(
        ctx,
        newStartX - spacing,
        newStartY - spacingStart,
        width,
        newEndY + spacingEnd,
        color2
      );
      drawLineNow(
        ctx,
        newStartX - 2 * spacing,
        newStartY - spacingStart * 2,
        width,
        newEndY + spacingEnd * 2,
        color3
      );
      drawLineNow(
        ctx,
        newStartX - 3 * spacing,
        newStartY - spacingStart * 3,
        width,
        newEndY + spacingEnd * 3,
        color4
      );

      newStartY = newStartY - spacingStart * 4;
      newEndY = newEndY + spacingEnd * 4;
      newStartX = newStartX - 4 * spacing;
    }
  }

  function drawLines(ctx, height, width, spacing, scroll) {
    var numberOfGrids = 20;

    var startY = height * 0.7 + scroll / 5;
    drawGrid(
      ctx,
      startY,
      height - scroll * 1.5,
      width,
      spacing + scroll / 75,
      scroll,
      numberOfGrids,
      1,
      1
    );
  }

  function init(scroll) {
    var canvas = document.getElementById("canvas");
    var height = window.innerHeight;
    var width = window.innerWidth;
    var spacing = 15;

    canvas.height = height;
    canvas.width = width;

    var ctx = canvas.getContext("2d");

    ctx.lineWidth = 2;

    console.log("scroll");
    ctx.translate(0, scroll / 15);
    ctx.rotate((-(scroll / 500) * Math.PI) / 180);
    drawLines(ctx, height, width, spacing + scroll / 150, scroll);
  }

  init(0);

  let last_known_scroll_position = 0;
  let ticking = false;

  function doSomething(scroll_pos) {
    var t0 = performance.now();
    init(scroll_pos);
    var t1 = performance.now();

    console.log("time taken to update", t1 - t0);
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
