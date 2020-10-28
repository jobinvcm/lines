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

    var xLess;
    var xMore;

    var mul = 1;

    for (var i = 1; i <= numberOfLines; i++) {
      xLess = Xs < -0.5 * width;
      xMore = Xe > 1.5 * width;

      for (var j = 0; j < 4; j++) {
        drawLineNow(
          ctx,
          xLess ? Xs : Xs - j * startXSpacing,
          xLess ? Ys + j * startYSpacing : Ys,
          xMore ? Xe : Xe + j * endXSpacing,
          xMore ? Ye - j * endYSpacing : Ye,
          colors[j]
        );
      }
      Xs = xLess ? Xs - 4 * mul * startXSpacing : Xs - 4 * startXSpacing;
      Ys = xLess ? Ys + 4 * startYSpacing : Ys;
      Xe = xMore ? Xe : Xe + 4 * endXSpacing;
      Ye = xMore ? Ye - 4 * endYSpacing : Ye;
    }
  }

  function calculateDiff(V1, V2, T) {
    return T / (V2 - V1);
  }

  function drawGrid(ctx, height, width, scroll_pos, spacing) {
    var startX = 0.75 * width;
    var startY = 0;
    var endX = 0.7 * width;
    var endY = height;
    var numberOfLines = 20;
    var startXFactor = 2;
    var endXFactor = 1;
    var startYFactor = 2;
    var endYFactor = 1;
    var colors = {
      0: "#fff",
      1: "#fff",
      2: "#fff",
      3: "#fff"
    };
    // spacing = spacing - scroll_pos / 100;

    if (scroll_pos > 300) {
      colors = {
        0: "#d3d3d3",
        1: "#d3d3d3",
        2: "#d3d3d3",
        3: "#d3d3d3"
      };
    }

    if (scroll_pos > 900) {
      var startX = 0.75 * width;
      var startY = 0;
      var endX = 0.7 * width;
      var endY = height;
      var numberOfLines = 16;
      var startXFactor = 1.5;
      var endXFactor = 1;
      var startYFactor = 1;
      var endYFactor = 1;
    }

    if (scroll_pos > 1500) {
      colors = {
        0: color1,
        1: color2,
        2: color3,
        3: color4
      };
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

  window.addEventListener("resize", function () {
    init(window.scrollY);
  });
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
