(function () {
  var color1 = "#629cd4";
  var color2 = "#57c479";
  var color3 = "#f2444b";
  var color4 = "#f8ac54";
  // var color1 = "#eee";
  // var color2 = "#eee";
  // var color3 = "#eee";
  // var color4 = "#eee";
  // var color1 = "#fff";
  // var color2 = "#fff";
  // var color3 = "#fff";
  // var color4 = "#fff";

  var canvas = document.getElementById("canvas");
  var height = window.innerHeight;
  var width = window.innerWidth;
  var spacing = 10;
  function drawLineNow(ctx, startX, startY, endX, endY, color) {
    ctx.beginPath();
    console.log(`startx - ${startX} starty - ${startY}`);
    console.log(`endx - ${endX} endy - ${endY}`);
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = color;
    ctx.stroke();
  }

  function drawXGrid(
    ctx,
    startX,
    startY,
    endX,
    endY,
    spacing,
    numberOfGrids,
    startFactor,
    endFactor,
    scdroll_pos
  ) {
    var newEndY = endY;
    var newStartY = startY;
    var spacingStart = spacing * startFactor;
    var spacingEnd = spacing * endFactor;
    var newStartX = startX;
    var newEndX = endX;

    for (var i = 0; i < numberOfGrids; i++) {
      drawLineNow(ctx, newStartX, newStartY, newEndX, newEndY, color1);
      drawLineNow(
        ctx,
        newStartX - spacingStart * i,
        newStartY,
        newEndX + spacingEnd,
        newEndY,
        color2
      );
      drawLineNow(
        ctx,
        newStartX - 2 * spacingStart * i,
        newStartY,
        newEndX + 2 * spacingEnd,
        newEndY,
        color3
      );
      drawLineNow(
        ctx,
        newStartX - 3 * spacingStart * i,
        newStartY,
        newEndX + 3 * spacingEnd,
        newEndY,
        color4
      );

      newStartX = newStartX - 4 * spacingStart * i;
      newEndX = newEndX + 4 * spacingEnd;
    }
  }

  function drawYGrid(
    ctx,
    startX,
    startY,
    endX,
    endY,
    spacing,
    numberOfGrids,
    startFactor,
    endFactor,
    xSpacingFactor,
    scdroll_pos,
    color1,
    color2,
    color3,
    color4
  ) {
    var newEndY = endY;
    var newStartY = startY;
    var spacingStart = spacing * startFactor;
    var spacingEnd = spacing * endFactor;
    var newStartX = startX;
    var newEndX = endX;
    var topOfY = false;
    var bottomOfY = false;
    var xStartFactor = 2;
    var xEndFactor = 3;
    var j = 1;
    for (var i = 1; i < numberOfGrids + 1; i++) {
      topOfY = newStartY < 0;
      bottomOfY = newEndY > height;
      xStartFactor = (numberOfGrids + 2 - i) / 3;
      xEndFactor = (numberOfGrids + 2 - i) / 2;

      drawLineNow(ctx, newStartX, newStartY, newEndX, newEndY, color1);
      drawLineNow(
        ctx,
        topOfY ? newStartX + xStartFactor * spacing : newStartX,
        topOfY ? newStartY : newStartY - spacingStart,
        bottomOfY ? newEndX - xEndFactor * spacing : newEndX,
        bottomOfY ? newEndY : newEndY + spacingEnd * j,
        color2
      );
      drawLineNow(
        ctx,
        topOfY ? newStartX + xStartFactor * 2 * spacing : newStartX,
        topOfY ? newStartY : newStartY - 2 * spacingStart,
        bottomOfY ? newEndX - xEndFactor * 2 * spacing : newEndX,
        bottomOfY ? newEndY : newEndY + 2 * spacingEnd * j,
        color3
      );
      drawLineNow(
        ctx,
        topOfY ? newStartX + xStartFactor * 3 * spacing : newStartX,
        topOfY ? newStartY : newStartY - 3 * spacingStart,
        bottomOfY ? newEndX - xEndFactor * 3 * spacing : newEndX,
        bottomOfY ? newEndY : newEndY + 3 * spacingEnd * j,
        color4
      );

      newStartY = topOfY ? newStartY : newStartY - 4 * spacingStart;
      newEndY = bottomOfY ? newEndY : newEndY + 4 * spacingEnd * j;
      newStartX = topOfY ? newStartX + xStartFactor * 4 * spacing : newStartX;
      newEndX = bottomOfY ? newEndX - xEndFactor * 4 * spacing : newEndX;
      if (!bottomOfY) {
        j++;
      }
    }
  }
  function drawLines(
    ctx,
    height,
    width,
    spacing,
    scroll,
    color1,
    color2,
    color3,
    color4
  ) {
    var numberOfGrids = 16;

    spacing = 10 - scroll / 200;
    var startX = 0;
    var startY = 0.25 * height;
    var endX = width;
    var endY = 0;
    var endFactor = 1;
    drawYGrid(
      ctx,
      startX,
      startY,
      endX,
      endY,
      spacing,
      numberOfGrids,
      2,
      endFactor,
      2,
      scroll,
      color1,
      color2,
      color3,
      color4
    );
  }

  function drawVerticalGrid(
    ctx,
    startX,
    startY,
    endX,
    endY,
    spacing,
    numberOfGrids,
    startFactor,
    endFactor,
    xSpacingFactor,
    scroll_pos,
    color1,
    color2,
    color3,
    color4
  ) {
    var newStartY = startY;
    var newEndX = endX;
    var yLess = false;
    var newStartX = startX;

    var j = 0;
    for (var i = 1; i <= numberOfGrids; i++) {
      yLess = newStartY < -100 ? true : false;

      drawLineNow(ctx, newStartX, newStartY, newEndX, endY, color1);
      drawLineNow(
        ctx,
        yLess ? newStartX + j * spacing : newStartX,
        yLess ? newStartY : newStartY - spacing * startFactor,
        newEndX - spacing * endFactor,
        endY,
        color2
      );
      drawLineNow(
        ctx,
        yLess ? newStartX + 2 * j * spacing : newStartX,
        yLess ? newStartY : newStartY - 2 * spacing * startFactor,
        newEndX - 2 * spacing * endFactor,
        endY,
        color3
      );
      drawLineNow(
        ctx,
        yLess ? newStartX + 3 * j * spacing : newStartX,
        yLess ? newStartY : newStartY - 3 * spacing * startFactor,
        newEndX - 3 * spacing * endFactor,
        endY,
        color4
      );

      newStartY = yLess
        ? newStartY - 3 * spacing * startFactor
        : newStartY - 4 * spacing * startFactor;
      newEndX = newEndX - 4 * spacing * endFactor;
      newStartX = yLess ? newStartX + 4 * j * spacing : newStartX;
      j = yLess ? j + 1 : j;
    }
  }
  function drawVerticalLines(
    ctx,
    height,
    width,
    spacing,
    scroll_pos,
    color1,
    color2,
    color3,
    color4
  ) {
    var startX = 0;
    var startY = height / 2;
    var endX = 0.75 * width;
    var endY = height;
    var startFactor = 1;
    var endFactor = 2;
    var xSpacingFactor = 1;
    var numberOfGrids = 18;
    drawVerticalGrid(
      ctx,
      startX,
      startY,
      endX,
      endY,
      spacing,
      numberOfGrids,
      startFactor,
      endFactor,
      xSpacingFactor,
      scroll_pos,
      color1,
      color2,
      color3,
      color4
    );
  }

  var init = function (scroll_pos) {
    canvas.height = height;
    canvas.width = width;

    var ctx = canvas.getContext("2d");

    // ctx.rotate(Math.PI / 2);
    // ctx.translate(-height, -width / 2);
    ctx.lineWidth = 1;
    if (scroll_pos < 600) {
      drawLines(
        ctx,
        height,
        width,
        spacing,
        scroll_pos,
        "#fff",
        "#fff",
        "#fff",
        "#fff"
      );
    } else if ((scroll_pos > 600) & (scroll_pos < 1500)) {
      drawVerticalLines(
        ctx,
        height,
        width,
        spacing,
        scroll_pos,
        color1,
        color2,
        color3,
        color4
      );
    }
  };

  let last_known_scroll_position = 0;
  let ticking = false;

  init(0);
  function doSomething(scroll_pos) {
    var t0 = performance.now();
    init(scroll_pos);
    var t1 = performance.now();
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
