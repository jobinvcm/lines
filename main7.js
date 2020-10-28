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
          Xs + j * startXSpacing,
          Ys - j * startYSpacing,
          Xe - j * endXSpacing,
          Ye + j * endYSpacing,
          colors[j]
        );
      }
      Xs = Xs + 4 * startXSpacing;
      Ys = Ys - 4 * startYSpacing;
      Xe = Xe - 4 * endXSpacing;
      Ye = Ye + 4 * endYSpacing;
    }
  }

  function calculateDiff(V1, V2, T) {
    return T / (V2 - V1);
  }

  function drawGrid(ctx, height, width, scroll_pos, spacing) {
    console.log(scroll_pos);
    var startX = -width / 2;
    var startY = height / 4;
    var endX = width * 1.5;
    var endY = 0.1 * height;
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
    var newScrollPos;
    if (scroll_pos < 300) {
      spacing = spacing - scroll_pos / 50;
    }

    if (scroll_pos > 200 && scroll_pos <= 900) {
      newScrollPos = scroll_pos - 200;
      startX =
        -0.5 * width + (newScrollPos * width) / calculateDiff(-0.5, -1.5, 700);
      startY =
        0.25 * height + (newScrollPos * height) / calculateDiff(0.25, 1.5, 700);
      endX = 1.5 * width + (newScrollPos * width) / calculateDiff(1.5, 2, 700);
      startXFactor = 1.5 + newScrollPos / calculateDiff(1.5, 2, 700);
      endY =
        0.1 * height + (newScrollPos * height) / calculateDiff(0.1, -0.5, 700);
      startYFactor = 1 + newScrollPos / calculateDiff(1, 2, 700);
      endYFactor = 1.5 + newScrollPos / calculateDiff(1.5, 2, 700);
      console.log(
        `startY = ${startY}, startXFactor = ${startXFactor}, endY = ${endY}, startYFactor = ${startYFactor}, endYfactor = ${endYFactor}`
      );
    }

    if (scroll_pos >= 300) {
      spacing = spacing - 300 / 50 + (scroll_pos - 300) / 50;
      colors = {
        0: "#d3d3d3",
        1: "#d3d3d3",
        2: "#d3d3d3",
        3: "#d3d3d3"
      };
    }

    if (scroll_pos > 800) {
      spacing = 20 - (scroll_pos - 800) / 50;
      colors = {
        0: "#c0cad3",
        1: "#c0cad3",
        2: "#d8bbbc",
        3: "#d8bbbc"
      };
    }

    if (scroll_pos > 1200) {
      spacing = 12 + (scroll_pos - 1200) / 40;
      colors = {
        0: "#a4bcd3",
        1: "#9fcdae",
        2: "#e0979a",
        3: "#e2c39e"
      };
    }

    if (scroll_pos > 1400) {
      colors = {
        0: "#7eaad4",
        1: "#76c890",
        2: "#ea686d",
        3: "#efb674"
      };
    }

    if (scroll_pos > 900) {
      startX = (-3 * width) / 2;
      startY = height * 1.5;
      endX = width * 2;
      endY = -height / 2;
      startXFactor = 2;
      endYFactor = 2;
      startYFactor = 2;
      endXFactor = 1;
    }

    if (scroll_pos > 1200 && scroll_pos <= 1600) {
      newScrollPos = scroll_pos - 1200;
      startX =
        -1.5 * width + (newScrollPos * width) / calculateDiff(-1.5, -2, 400);
      startY =
        1.5 * height + (newScrollPos * height) / calculateDiff(1.5, 0.5, 400);
      endX = 2 * width + (newScrollPos * width) / calculateDiff(2, 1.5, 400);
      endY =
        -height / 2 + (newScrollPos * height) / calculateDiff(-0.5, 1, 400);
      startXFactor = 2 + newScrollPos / calculateDiff(2, 3, 400);
      endXFactor = 1 + newScrollPos / calculateDiff(1, 2, 400);
      startYFactor = 2 + newScrollPos / calculateDiff(2, 2, 400);
      endYFactor = 2 + newScrollPos / calculateDiff(2, 0.5, 400);
    }
    console.log("spacing", spacing);

    if (scroll_pos >= 1600) {
      colors = {
        0: color1,
        1: color2,
        2: color3,
        3: color4
      };
      spacing = 20 - (scroll_pos - 1600) / 200;
      startX = -2 * width;
      startY = 0.5 * height;
      endY = height;
      endX = 1.5 * width;
      startXFactor = 3;
      endXFactor = 2;
      startYFactor = 2;
      endYFactor = 0.5;
      numberOfLines = 21;
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

    ctx.translate(0, scroll_pos / 20);
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
