/*
        ████████╗ ██████╗ ███╗   ███╗
        ╚══██╔══╝██╔═══██╗████╗ ████║
           ██║   ██║   ██║██╔████╔██║█████╗
           ██║   ██║   ██║██║╚██╔╝██║╚════╝
           ██║   ╚██████╔╝██║ ╚═╝ ██║
           ╚═╝    ╚═════╝ ╚═╝     ╚═╝

███████╗██╗   ██╗ ██████╗██╗  ██╗███████╗██████╗ ██╗   ██╗
██╔════╝██║   ██║██╔════╝██║ ██╔╝██╔════╝██╔══██╗╚██╗ ██╔╝
█████╗  ██║   ██║██║     █████╔╝ █████╗  ██████╔╝ ╚████╔╝
██╔══╝  ██║   ██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗  ╚██╔╝
██║     ╚██████╔╝╚██████╗██║  ██╗███████╗██║  ██║   ██║
╚═╝      ╚═════╝  ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝   ╚═╝
*/

$(window).on("load", function () {
  canvas = document.getElementById('game');
  fuelDisp = document.getElementById('fuelspan');
  scoreDisp = document.getElementById('scorespan');
  hiscoreDisp = document.getElementById('hiscorespan');
  speedDisp = document.getElementById('speedo');
  pointDisp = document.getElementById('pointspan');
  context = canvas.getContext('2d');
  canvas.width = screen.availWidth - 150;
  canvas.height = screen.availHeight - 300;
  groundPadY = canvas.height - 32;
  setTimeout(() => menu(), 250);
});
var canvas;
var fuelDisp;
var scoreDisp;
var context;
var hiscoreDisp;
var speedDisp;
var pointDisp;
var groundPadY;
var groundPadX = 100;
var floatPadY = 100;
var floatPadX = 100;
var jismCount = 0;
var fuelmoder = 0.75;
var gear = 1.5;
var gAng = 35;
var gc = 2;
var tank = 2;
var count = 0;
var img = {
  small: new Image(32, 32),
  son1: new Image(32, 32),
  son2: new Image(32, 32),
  med: new Image(32, 32),
  mon1: new Image(32, 32),
  mon2: new Image(32, 32),
  large: new Image(32, 32),
  lon1: new Image(32, 32),
  lon2: new Image(32, 32),
  explode: new Image(64, 64),
  sjism: new Image(32, 32),
  mjism: new Image(32, 32),
  ljism: new Image(32, 32),
  floatPad: new Image(64, 32),
  landGreenNeg: new Image(128, 32),
  landGreenNone: new Image(128, 32),
  landGreenPos: new Image(128, 32),
  landRedNeg: new Image(128, 32),
  landRedNone: new Image(128, 32),
  landRedPos: new Image(128, 32),
};

img.small.src = "lib/ShipSoff.png";
img.son1.src = "lib/ShipSon1.png";
img.son2.src = "lib/ShipSon2.png";
img.med.src = "lib/ShipMoff.png";
img.mon1.src = "lib/ShipMon1.png";
img.mon2.src = "lib/ShipMon2.png";
img.large.src = "lib/ShipLoff.png";
img.lon1.src = "lib/ShipLon1.png";
img.lon2.src = "lib/ShipLon2.png";
img.explode.src = "lib/explode.png";
img.sjism.src = "lib/ShipSjism.png";
img.mjism.src = "lib/ShipMjism.png";
img.ljism.src = "lib/ShipLjism.png";
img.floatPad.src = "lib/FloatingPad.png";
img.landGreenNeg.src = "lib/LandGreenNeg.png";
img.landGreenNone.src = "lib/LandGreenNone.png";
img.landGreenPos.src = "lib/LandGreenPos.png";
img.landRedNeg.src = "lib/LandRedNeg.png";
img.landRedNone.src = "lib/LandRedNone.png";
img.landRedPos.src = "lib/LandRedPos.png";
var flip = 0;
var fuelStart = 4000;
var ship = {
  x: getRandomInt(150,650),
  y: 150,
  vx: 0,
  vy: 0,
  rot: 0,
  fuel: 4000,
};
var rcs = 1;
var alerted = false;
var landed = false;
var padland = true;
var padcash = true;
var gravity = 0.08;
var gcheat = false;
var wind = 0;
var accel = 2.2;
var pp = 0;
var hiscore = 0;
var cunt = {
  w: false,
  a: false,
  s: false,
  d: false,
  f: false,
  space: false,
};
var TO_RADIANS = Math.PI / 180;
var score = 0;
var gameOver = false;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function setWind() {
  wind = 3 - getRandomInt(0, 7);
}

// game loop
function loop() {
  if (!gameOver) {
    requestAnimationFrame(loop);
  }
  // slow game loop to 30 fps instead of 60 (60/2 = 30)
  if (++count < 2) {
    return;
  }
  count = 0;
  context.clearRect(0, 0, canvas.width, canvas.height);
  if (cunt.space) {
    jismCount++;
  } else {
    jismCount = 0;
  }
  if (cunt.space && jismCount < 31) {
    if (Math.abs(ship.vx) < 0.1) {
      ship.vx = 0;
    }
    if (Math.abs(ship.vy) < 0.1) {
      ship.vx = 0;
    }
    if (Math.abs(ship.vx) >= 8) {
      ship.vx *= 0.6;
    }
    else if (Math.abs(ship.vx) >= 4) {
      ship.vx *= 0.75;
    }
    else if (Math.abs(ship.vx) > 0.8) {
      ship.vx *= 0.9;
    } else {
      ship.vx *= 0.95;
    }
    if (Math.abs(ship.vy) >= 8) {
      ship.vy *= 0.6;
    } else if (Math.abs(ship.vy) >= 4) {
      ship.vy *= 0.75;
    } else if (Math.abs(ship.vy) > 1.2) {
      ship.vy *= 0.9;
    } else {
      ship.vy *= 0.95;
    }
    ship.fuel -= 10 * fuelmoder;
    if (ship.fuel < 0) {
      ship.fuel = 0;
    }
    fuelDisp.innerHTML = "&nbsp;" + Math.round(ship.fuel) + "kg";
    const per = (ship.fuel / fuelStart) * 100 + "%";
    fuelDisp.style.width = per;
  }
  else if (cunt.w || cunt.s) {
    let div = (cunt.w) ? 10 : 15;
    div -= (alerted) ? 1 : -0.5;
    div += (tank - 1) / 3;
    const acc = (accel / div) - (ship.fuel / 75000);
    //ship.vy -= 0.1;
    if (ship.fuel > 0) {
      if (ship.rot === 0) {
        ship.vy -= acc;
      } else if (ship.rot === 90) {
        ship.vx += acc;
      } else if (ship.rot === 180) {
        ship.vy += acc;
      } else if (ship.rot === 270) {
        ship.vx -= acc;
      } else if (ship.rot < 90) {
        const pr = ship.rot / 90;
        ship.vx += acc * pr;
        ship.vy -= acc - (acc * pr);
      } else if (ship.rot < 180) {
        const pr = (ship.rot - 90) / 90;
        ship.vy += acc * pr;
        ship.vx += acc - (acc * pr);
      } else if (ship.rot < 270) {
        const pr = (ship.rot - 180) / 90;
        ship.vx -= acc * pr;
        ship.vy += acc - (acc * pr);
      } else {
        const pr = (ship.rot - 270) / 90;
        ship.vy -= acc * pr;
        ship.vx -= acc - (acc * pr);
      }
      const fu = (cunt.w) ? 3 : 2;
      ship.fuel -= fu * fuelmoder;
      if (ship.fuel < 0) {
        ship.fuel = 0;
      }
      fuelDisp.innerHTML = "&nbsp;" + Math.round(ship.fuel) + "kg";
      const per = (ship.fuel / fuelStart) * 100 + "%";
      fuelDisp.style.width = per;
    }
  }
  if (!padland && !landed) {
    ship.vy += gravity;
    if (Math.abs(ship.vx) > 1) {
      ship.vx *= 0.995;
    }
    if (ship.vy < -1) {
      ship.vx *= 0.99;
    }
  }
  if (Math.abs(ship.vx) < 1.5 && !landed && !padland) {
    if (ship.y <= canvas.height - 100) {
      ship.vx += (wind * 0.0025);
    } else {
      ship.vx += (wind * 0.0015);
    }
  }
  /*if (cunt.s) {
    ship.vy += 0.1;
  }*/
  if (cunt.a && !landed && !padland) {
    //ship.vx -= 0.1;
    if (cunt.w) {
      ship.rot -= 1;
    }
    switch (rcs) {
      case 1:
        ship.rot -= 1;
        break;
      case 2:
        ship.rot -= 1.5;
        break;
      case 3:
        ship.rot -= 2;
    }
  }
  if (cunt.d && !landed && !padland) {
    //ship.vx += 0.1;
    if (cunt.w) {
      ship.rot += 1;
    } else if (cunt.s) {
      ship.rot += 0.5;
    }
    switch(rcs) {
      case 1:
        ship.rot += 1;
        break;
      case 2:
        ship.rot += 1.5;
        break;
      case 3:
        ship.rot += 2;
    }
  }
  if (ship.rot >= 360) {
    ship.rot -= 360;
  }
  if (ship.rot < 0) {
    ship.rot += 360;
  }
  if (ship.vx > 5) {
    ship.vx = 5;
  } else if (ship.vx < -5) {
    ship.vx = -5;
  }
  if (ship.vy > 5) {
    ship.vy = 5;
  } else if (ship.vy < -7) {
    ship.vy = -7;
  }
  const spd = (Math.abs(ship.vy) + Math.abs(ship.vx)) * 4;
  const spddec = Math.round((spd % 1) * 10);
  const spdm = Math.floor(spd);
  const spdsp = (spdm < 10) ? "&nbsp;" : "";
  speedDisp.innerHTML = `${spdsp}${spdm}.${spddec} m/s`;
  if (spdm > gear * 4) {
    speedDisp.style.color = "red";
  } else if (spdm > gear * 3) {
    speedDisp.style.color = "gold";
  } else {
    speedDisp.style.color = "white";
  }
  // move snake by it's velocity
  ship.x += ship.vx;
  ship.y += ship.vy;
  // wrap ship position horizontally on edge of screen
  if (ship.x < 0) {
    ship.x = canvas.width;
  } else if (ship.x > canvas.width) {
    ship.x = 0;
  }
  if ((ship.x >= floatPadX - 16 && ship.x <= floatPadX + 80) && (ship.y >= floatPadY - 16 && ship.y <= floatPadY + 48)) {
    if (Math.abs(ship.vx) + Math.abs(ship.vy) > gear || (ship.rot >= gAng && ship.rot <= 360 - gAng)) {
      gameOver = true;
      padland = true;
      setTimeout(function () {
        alert(`BOOM! You are dead...\nAt least you crashed ON the platform...\nFinal Velocity: ${spdm}.${spddec} m/s.`);
        menu();
      }, 500);
    }
    else if (!padland && ship.y >= floatPadY - 16 && ship.x >= floatPadX + 10 && ship.x <= floatPadX + 54) {
      if (!padcash) {
        ship.vy = 0;
        points();
        $("#outputdiv").empty().append(`Cargo Retrieved! &nbsp; Velocity: ${spdm}.${spddec} m/s.`);
        ship.y = floatPadY-16;
        alerted = false;
        landed = false;
        padland = true;
        cunt.w = false;
        cunt.a = false;
        cunt.d = false;
        cunt.s = false;
        cunt.space = false;
        jismCount = 0;
        ship.rot = 0;
        padcash = true;
        setWind();
        groundPadLoc();
      } else {
        ship.vy = 0;
        padland = true;
        cunt.w = false;
        cunt.a = false;
        cunt.d = false;
        cunt.s = false;
        cunt.space = false;
        jismCount = 0;
        ship.rot = 0;
        ship.y = floatPadY-16;
      }
    }
    else if(!padland) {
      gameOver = true;
      padland = true;
      setTimeout(function () {
        alert(`BOOM! You are dead...\nWhole sky out there, and you run into the platform...\nFinal Velocity: ${spdm}.${spddec} m/s.`);
        menu();
      }, 500);
    }
    ship.vx = 0;
  } else {
    padland = false;
  }
  if (ship.y >= canvas.height - 24 && ship.x > groundPadX + 10 && ship.x < groundPadX + 118) {
    ship.y = canvas.height - 24;
    if (Math.abs(ship.vx) + Math.abs(ship.vy) > gear || (ship.rot >= gAng && ship.rot <= 360 - gAng)) {
      gameOver = true;
      landed = true;
      setTimeout(function () {
        alert(`BOOM! You are dead...\nYou were supposed to land a little slower than that...\nFinal Velocity: ${spdm}.${spddec} m/s.`);
        menu();
      }, 500);
    } else if (!alerted) {
      points();
      $("#outputdiv").empty().append(`Hooray! Another successful delivery! &nbsp; Velocity: ${spdm}.${spddec} m/s.`);
      alerted = true;
      landed = true;
      cunt.w = false;
      cunt.a = false;
      cunt.d = false;
      cunt.s = false;
      cunt.space = false;
      jismCount = 0;
      ship.rot = 0;
      padcash = false;
      setWind();
      floatPadLoc();
    } else if (cunt.f) {
      if (score > 0 && ship.fuel < fuelStart) {
        score -= 1;
        ship.fuel += 5;
        ship.fuel = Math.min(ship.fuel, fuelStart);
        scoreDisp.innerHTML = score;
        fuelDisp.innerHTML = "&nbsp;" + ship.fuel;
        const per = (ship.fuel / fuelStart) * 100 + "%";
        fuelDisp.style.width = per;
      }
    }
    ship.vx = 0;
    ship.vy = 0;
  }
  else if (ship.y >= canvas.height - 16) {
    ship.y = canvas.height - 16;
    if (Math.abs(ship.vx) + Math.abs(ship.vy) > gear || (ship.rot >= gAng && ship.rot <= 360 - gAng)) {
      gameOver = true;
      landed = true;
      setTimeout(function () {
        alert(`BOOM! Timecocked again!\n  You are dead...\nFinal Velocity: ${spdm}.${spddec} m/s.`);
        menu();
      }, 500);
    } else if (!landed) {
      $("#outputdiv").empty().append(`It was a successful landing, just in the wrong place. &nbsp; Velocity: ${spdm}.${spddec} m/s.`);
      landed = true;
      cunt.w = false;
      cunt.a = false;
      cunt.d = false;
      cunt.s = false;
      cunt.space = false;
      jismCount = 0;
      ship.rot = 0;
      setWind();
    }
    ship.vx = 0;
    ship.vy = 0;
  } else if (ship.y <= canvas.height - 400) {
    //alerted = false;
    //$("#outputdiv").empty().append("CARGO READY!");
  } else if (!alerted && ship.y <= canvas.height - 20) {
    landed = false;
  } else if (ship.y <= canvas.height - 38) {
    landed = false;
  }
  const px = Math.round(ship.x);
  const py = Math.round(ship.y);
  //context.drawImage(shipImg,ship.x,ship.y,32,32);
  let gpimg;
  if (alerted) {
    if (wind < -1) {
      gpimg = img.landRedNeg;
    } else if (wind > 1) {
      gpimg = img.landRedPos;
    } else {
      gpimg = img.landRedNone;
    }
  }
  else {
    if (wind < -1) {
      gpimg = img.landGreenNeg;
    } else if (wind > 1) {
      gpimg = img.landGreenPos;
    } else {
      gpimg = img.landGreenNone;
    }
  }
  context.drawImage(gpimg, groundPadX, groundPadY, 128, 32);
  context.drawImage(img.floatPad, floatPadX, floatPadY, 64, 32);
  if(gameOver) {
    context.drawImage(img.explode, ship.x - 32, ship.y - 32, 64, 64);
  } else {
    let shiz;
    flip ++;
    switch(tank) {
      case 1:
        if (cunt.space && jismCount < 31) {
          shiz = img.sjism;
        } else if (!cunt.w && !cunt.s) {
          shiz = img.small;
        } else if (flip > 2) {
          shiz = img.son2;
        } else {
          shiz = img.son1;
        }
        break;
      case 2:
        if (cunt.space && jismCount < 31) {
          shiz = img.mjism;
        } else if (!cunt.w && !cunt.s) {
          shiz = img.med;
        } else if (flip > 2) {
          shiz = img.mon2;
        } else {
          shiz = img.mon1;
        }
        break;
      case 3:
        if (cunt.space && jismCount < 31) {
          shiz = img.mjism;
        } else if (!cunt.w && !cunt.s) {
          shiz = img.large;
        } else if (flip > 2) {
          shiz = img.lon2;
        } else {
          shiz = img.lon1;
        }
        break;
    }
    if (flip > 3) {
      flip = 0;
    }
    rotateAndPaintImage(context, shiz, ship.rot * TO_RADIANS, px, py, 16, 16);
  }
}

function rotateAndPaintImage(context, image, angleInRad, positionX, positionY, axisX, axisY) {
  context.translate(positionX, positionY);
  context.rotate(angleInRad);
  context.drawImage(image, -axisX, -axisY, 32, 32);
  context.rotate(-angleInRad);
  context.translate(-positionX, -positionY);
}
// listen to keyboard events to move the ship
document.addEventListener("keydown", function (e) {

  // left arrow key
  if (e.which === 37 || e.which === 65) {
    cunt.a = true;
  }
  // up arrow key
  else if (e.which === 38 || e.which === 87) {
    cunt.w = true;
  }
  // right arrow key
  else if (e.which === 39 || e.which === 68) {
    cunt.d = true;
  }
  else if (e.which === 32) {
    cunt.space = true;
  }
  // down arrow key
  else if (e.which === 40 || e.which === 83) {
    cunt.s = true;
  }
  else if (e.which === 70) {
    cunt.f = true;
  }
});
document.addEventListener("keyup", function (e) {

  // left arrow key
  if (e.which === 37 || e.which === 65) {
    cunt.a = false;
  }
  // up arrow key
  else if (e.which === 38 || e.which === 87) {
    cunt.w = false;
  }
  // right arrow key
  else if (e.which === 39 || e.which === 68) {
    cunt.d = false;
  }
  else if (e.which === 32) {
    cunt.space = false;
  }
  // down arrow key
  else if (e.which === 40 || e.which === 83) {
    cunt.s = false;
  }
  else if (e.which === 70) {
    cunt.f = false;
  }
});

function groundPadLoc() {
  groundPadX = getRandomInt(200, (canvas.width - 328));
}

function floatPadLoc(shipAdj = false) {
  floatPadX = getRandomInt(200, (canvas.width - 236));
  if (shipAdj) {
    ship.x = floatPadX + 32;
    ship.y = floatPadY - 16;
  }
}

// start the game
function gamestart(){
  $("#UIdiv").empty();
  refillFuel();
  groundPadLoc();
  floatPadLoc(true);
  score = 0;
  gameOver = false;
  alerted = false;
  landed = false;
  padland = true;
  ship.vx = 0;
  ship.vy = 0;
  ship.rot = 0;
  pp = 0;
  cunt.w = false;
  cunt.a = false;
  cunt.d = false;
  cunt.s = false;
  cunt.space = false;
  jismCount = 0;
  fuelDisp.innerHTML = "&nbsp;" + ship.fuel;
  const per = Math.round((ship.fuel / fuelStart) * 100) + "%";
  fuelDisp.style.width = per;
  pointDisp.innerHTML = "0";
  scoreDisp.innerHTML = "0";
  setWind();
  setTimeout(() => requestAnimationFrame(loop), 500);
}

function points(){
  let base = 100;
  switch(rcs) {
    case 0:
      base *= 1.5;
      break;
    case 1:
      base *= 1.2;
      break;
    case 2:
      // no bonus
      break;
    case 3:
      base *= 0.85;
  }
  /*switch(tank) {
    case 1:
      base *= 1.25;
      break;
    case 2:
      base *= 1;
      break;
    case 3:
      base *= 0.75;
      break;
  }*/
  switch (gc) {
    case 1:
      base *= 1.3;
      break;
    case 2:
      base *= 1;
      break;
    case 3:
      base *= 0.75;
      break;
  }
  if (gcheat) {
    base *= 0.35;
  }
  base = Math.floor(base);
  score += base;
  pp += base;
  if (pp > hiscore) {
    hiscore = pp;
  }
  scoreDisp.innerHTML = score;
  hiscoreDisp.innerHTML = hiscore;
  pointDisp.innerHTML = pp;
}

function updateFuel() {
  const sel = $("#startFuel").val();
  switch (sel) {
    case "small":
      tank = 1;
      fuelStart = 2000;
      ship.fuel = 2000;
      break;
    case "medium":
      tank = 2;
      fuelStart = 4000;
      ship.fuel = 3000;
      break;
    case "large":
      tank = 3;
      fuelStart = 6000;
      ship.fuel = 4000;
      break;
    default:
      tank = 2;
      fuelStart = 4000;
      ship.fuel = 3000;
      break;
  }
  $("#fuelmax").empty().append(fuelStart);
}

function refillFuel() {
  switch (tank) {
    case 1:
      fuelStart = 2000;
      ship.fuel = 2000;
      break;
    case 2:
      fuelStart = 4000;
      ship.fuel = 3000;
      break;
    case 3:
      fuelStart = 6000;
      ship.fuel = 4000;
      break;
    default:
      fuelStart = 4000;
      ship.fuel = 3000;
      break;
  }
}

function updateRCS() {
  const sel = $("#startRCS").val();
  switch (sel) {
    case "none":
      rcs = 0;
      $("#condom").empty().append("None");
      break;
    case "small":
      rcs = 1;
      $("#condom").empty().append("PleasureBurst");
      break;
    case "medium":
      rcs = 2;
      $("#condom").empty().append("TrojanCock");
      break;
    case "large":
      rcs = 3;
      $("#condom").empty().append("DuraMax PE");
      break;
    default:
      rcs = 1;
      $("#condom").empty().append("PleasureBurst");
      break;
  }
}

function updateGear() {
  const sel = $("#startGear").val();
  switch (sel) {
    case "small":
      gear = 1.25;
      gAng = 30;
      gc = 1;
      $("#gearname").empty().append("Chicken Leg LLC");
      break;
    case "medium":
      gear = 1.5;
      gAng = 35;
      gc = 2;
      $("#gearname").empty().append("ThirdLeg Corp");
      break;
    case "large":
      gear = 1.75;
      gAng = 40;
      gc = 3;
      $("#gearname").empty().append("MuscleFuta Inc.");
      break;
    default:
      gear = 1.25;
      gAng = 35;
      gc = 1;
      $("#gearname").empty().append("Chicken-Gear");
      break;
  }
}

function gravchek(){
  if (document.getElementById("gravcheat").checked) {
    gravity = 0.04;
    gcheat = true;
  } else {
    gravity = 0.08;
    gcheat = false;
  }
}

function menu(){
  const output = `<div id='menu'><img src="lib/TimeCockShip.png" style="position:absolute; top: 5px; left: 5px; z-index:55;"><h1 style="margin: 10px;">Welcome to JimboTech Shipping</h1><p>&nbsp; &nbsp; Hello new employee, and welcome to the exciting world of rocket-powered cargo delivery! As a new pilot, you will be in charge of a top-of-the-line TimeCock rocket craft. Your objective is to land the TimeCock safely on the cargo delivery pad as many times as you can. Head back to the pickup pad to collect new cargo, because landing without cargo is pointless! Take care, for the winds of tomfuckery will keep blowing your ship as well, making landing more difficult. As expected for the winds of tomfuckery, their direction will change with each takeoff... Outfit your ship to best match your abilities. Remember that expensive parts will be deducted from your bonus checks!</p><b>Choose the size of your fuel balls:</b> <select id="startFuel" name="startFuel" value="small"  onchange="updateFuel()">
        <option value="medium">C.U.M. Tanks [4000kg]</option>
        <option value="small">Jimbo Tanks [2000kg]</option>
        <option value="large">FloodTek Tanks [6000kg]</option>
      </select><br><i>Fuel adds weight to the timecock, and reduces your acceleration when thrusting. All options are free.</i><br><br>
      <b>Select your C.O.N.D.O.M.:</b> <select id="startRCS" name="startRCS" value="none"  onchange="updateRCS()">
        <option value="small"> PleasureBurst [30 deg/s]</option>
        <option value="none"> NONE </option>
        <option value="medium"> TrojanCock [45 deg/s]</option>
        <option value="large"> DuraMax PE [60 deg/s]</option>
        </select><br><i>a C.O.N.D.O.M. allows you to rotate when not thrusting, and allows you to rotate faster while thrusting (like an RCS).</i><br><br>
        <b>Select your landing gear:</b> <select id="startGear" name="startGear" value="small"  onchange="updateGear()">
        <option value="medium"> ThirdLeg Corp [6 m/s]</option>
        <option value="small"> Chicken Leg LLC [5 m/s]</option>
        <option value="large"> MuscleFuta Inc. [7 m/s]</option>
        </select><br><i>Your landing gear determines the maximum safe velocity (and angle) you can land at.</i><br><br>
        Half Gravity Mode: <input type="checkbox" id="gravcheat" name="gravcheat" onchange="gravchek()"> <br><br>
      <input type="button" value="START!!!" onclick="gamestart()"> <input type="button" value="How To Play" onclick="gameinst()"><br><div id="strats"></div></div>`;
  $("#UIdiv").append(output);
}

function gameinstclose() {
  $("#strats").empty();
}

function gameinst() {
  const output = `<div id="menu"><p><b>INSTRUCTIONS:</b>
  <br>Use W or ↑ to <b>thrust</b>, use a or ← to rotate counterclockwise, and use d or → to rotate clockwise.
  <br>You can also fire your engines in efficiency mode using s or ↓, this reduces thrust by 25% and engine gimble by 50%, but uses 2/3 the fuel.
  <br>Pressing the spacebar will activate the J.I.S.M. which will decrease all velocity similar to airbrakes, but guzzles from your fuel balls.
  <br>While safely landed at the delivery pad, hold f to purchase fuel using your bonus money.
  <br>If replaying, you will keep the same settings from your previous flight (unless you change them).
  <br>A green light on the ground station indicates that your cargo is ready and you can land.
  <br>The wind flag shows wind direction. A <i>limp</i> flag indicates light or no wind.
  <br>Impacting the pickup platform, or landing too far off the side will cause an explosion.
  <br>Fuel has mass, and will reduce the acceleration caused by your motor.
  <br>Your cargo has mass as well, and also reduces the acceleration of your motor.
  </p><br><p>
  <b>STRATEGY:</b><br>
  There's no fuel to purchase on the pickup platform, so ensure you have enough to get there and return to the delivery pad, even if the location is far away.
  <br>The more fuel you carry, the lower your fuel efficiency, so keeping the balls topped up will be more expensive than sticking to the lowest safe amount.
  <br>Unlike reality, if you move off the edge of the screen to the left or right, you will appear on the opposite side. You can use this to get to your destination with less travel.
  <br>Wind will only increase your horizontal speed to a limited amount. likewise, your TimeCock can also reach terminal velocity. The most efficient use of fuel is to decelerate near your destination rather than attempt to maintain a low speed for the entire trip.
  <br>The J.I.S.M. uses a lot of fuel, but is very effective at reducing speed. It's effectiveness is greater at higher speeds, and very low at low speeds. It can only be sustained for 1 second, but shorter uses are probably sufficient.
  <br>Your engines and J.I.S.M. will shut down automatically on touchdown, so you do not need to worry about releasing the keys at the last second.
  <br>weaker C.O.N.D.O.M. and landing gear will make landings more difficult, but also give you a larger bonus (and therefore more fuel) to work with.
  <br>Larger fuel tanks do not affect your bonus, but they also add a little extra mass to your ship.</p><br><input type="button" value="Close" onclick="gameinstclose()">`;
  $("#strats").append(output);
}

