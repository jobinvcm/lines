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

  function drawGridLines(
    ctx,
    height,
    width,
    numberOfLines,
    coords,
    factors,
    colors,
    spacing
  ) {
    var Xs = coords.startX;
    var Ys = coords.startY;
    var Xe = coords.endX;
    var Ye = coords.endY;

    var startXSpacing = spacing * factors.startXFactor;
    var startYSpacing = spacing * factors.startYFactor;
    var endXSpacing = spacing * factors.endXFactor;
    var endYSpacing = spacing * factors.endYFactor;

    var yLess;
    var yMore;

    var mul = 0.5;

    for (var i = 1; i <= numberOfLines; i++) {
      yLess = Ys < -100;
      yMore = Ye > height;

      for (var j = 0; j < 4; j++) {
        drawLineNow(
          ctx,
          yLess ? Xs + j * startXSpacing : Xs - j * startXSpacing * mul,
          yLess ? Ys - j * startYSpacing * mul : Ys - j * startYSpacing,
          yMore ? Xe - j * endXSpacing : Xe + j * endXSpacing * mul,
          yMore ? Ye + j * endYSpacing * mul : Ye + j * endYSpacing,
          colors[j]
        );
      }
      Xs = yLess ? Xs + 4 * startXSpacing : Xs - 4 * startXSpacing * mul;
      Ys = yLess ? Ys - 4 * mul * startYSpacing : Ys - 4 * startYSpacing;
      Xe = yMore ? Xe - 4 * endXSpacing : Xe + 4 * endXSpacing * mul;
      Ye = yMore ? Ye + 4 * mul * endYSpacing : Ye + 4 * endYSpacing;
    }
  }

  function calculateDiff(V1, V2, T) {
    return T / (V2 - V1);
  }

  function drawGrid(ctx, height, width, scroll_pos, spacing) {
    console.log(scroll_pos);
    var startX = 0;
    var startY = height / 4 - scroll_pos / 5;
    var endX = width;
    var endY = 0.1 * height + scroll_pos / 5;
    var numberOfLines = 20;
    var startXFactor = 1.5;
    var endXFactor = 1;
    var startYFactor = 1;
    var endYFactor = 1.5;
    var colors = {
      0: "#fff",
      1: "#fff",
      2: "#fff",
      3: "#fff"
    };

    if (scroll_pos > 0 && scroll_pos < 900) {
      // startY =
      //   0.25 * height + (scroll_pos * height) / calculateDiff(0.25, 2, 900);
      // startXFactor = 1.5 + scroll_pos / calculateDiff(1.5, 4, 900);
      // endY =
      //   0.1 * height + (scroll_pos * height) / calculateDiff(0.1, -0.5, 900);
      // startYFactor = 1 + scroll_pos / calculateDiff(1, 2.5, 900);
      // endYFactor = 1.5 + scroll_pos / calculateDiff(1.5, 0.75, 900);
      // console.log(
      //   `startY = ${startY}, startXFactor = ${startXFactor}, endY = ${endY}, startYFactor = ${startYFactor}, endYfactor = ${endYFactor}`
      // );
      // spacing = spacing - scroll_pos / 100;
    }

    if (scroll_pos > 300) {
      colors = {
        0: "#d3d3d3",
        1: "#d3d3d3",
        2: "#d3d3d3",
        3: "#d3d3d3"
      };
    }

    if (scroll_pos > 500) {
      var diffScrollPos = scroll_pos - 500;
      spacing = 20;
      startY = height;
      endX = width;
      startX = 0;
      endY = -height / 2;
      startXFactor = 2;
      endYFactor = 1.5;
      startYFactor = 2;
      endXFactor = 1;
      numberOfLines = 12;
      spacing = spacing - diffScrollPos / 100;
      // startY =
      //   2 * height + (diffScrollPos * height) / calculateDiff(2, 0.5, 600);
      // endY =
      //   -0.5 * height + (diffScrollPos * height) / calculateDiff(-0.5, 1, 600);
      // startXFactor = 4 + diffScrollPos / calculateDiff(4, 0.6, 600);
      // endXFactor = 1 + diffScrollPos / calculateDiff(1, 2, 600);
      // startYFactor = 2.5 + diffScrollPos / calculateDiff(2.5, 1, 600);
    }

    if (scroll_pos > 1500) {
      colors = {
        0: color1,
        1: color2,
        2: color3,
        3: color4
      };
      spacing = 20;

      startY = 0.5 * height;
      endY = height;
      startX = 0;
      endX = width;
      startXFactor = 0.6;
      endXFactor = 2;
      startYFactor = 1;
      endYFactor = 0.75;
    }

    var factors = {
      startXFactor: startXFactor,
      endXFactor: endXFactor,
      startYFactor: startYFactor,
      endYFactor: endYFactor
    };

    var coords = {
      startX: startX,
      startY: startY,
      endX: endX,
      endY: endY
    };

    drawGridLines(
      ctx,
      height,
      width,
      numberOfLines,
      coords,
      factors,
      colors,
      spacing
    );
  }
  var init = function (scroll_pos) {
    var canvas = document.getElementById("canvas");
    var height = window.innerHeight;
    var width = window.innerWidth;

    canvas.height = height;
    canvas.width = width;

    var ctx = canvas.getContext("2d");

    ctx.translate(0, scroll_pos / 25);
    var spacing = 20;
    drawGrid(ctx, height, width, scroll_pos, spacing);
  };

  let last_known_scroll_position = 0;
  let ticking = false;
  init(0);
  function doSomething(scroll_pos) {
    var t0 = performance.now();
    init(scroll_pos);
    var t1 = performance.now();

    console.log(`performance ${t1 - t0}`);
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
