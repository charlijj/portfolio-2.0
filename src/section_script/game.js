export function run_game(start) {
  const startStopButton = document.getElementById("gameStartStopButton");

  if (window.innerWidth < 1200) {
    load_game(false);
    load_menu(false);
  }
  if (start) {
    startStopButton.value = "Stop";
    load_menu(false);
    load_game(true);
  } else {
    startStopButton.value = "Start";
    load_game(false);
    load_menu(true);
  }
}

function load_game(load) {
  const mainCVS = document.getElementById("game-canvas");
  const score = document.getElementById("scoreDisplay");
  const ctx = mainCVS.getContext("2d");
  ctx.imageSmoothingEnabled = true;

  class InputHandler {
    constructor() {
      this.keys = {};
      window.addEventListener("keydown", (event) => {
        if (event.repeat) {
          return;
        }
        if (
          [
            "w",
            "a",
            "s",
            "d",
            "ArrowRight",
            "ArrowLeft",
            "ArrowUp",
            "ArrowDown",
          ].includes(event.key) &&
          !(event.key in this.keys)
        ) {
          this.keys[event.key] = true;
        }
      });
      window.addEventListener("keyup", (event) => {
        if (event.key in this.keys) {
          delete this.keys[event.key];
        }
      });
    }
  }

  class Player {
    constructor(gameWidth, gameHeight) {
      this.playerImage = new Image();
      this.playerImage.src = process.env.PUBLIC_URL + "/img/game/spaceship.png";
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.width = 20;
      this.height = 40;
      this.x = gameWidth / 2 - this.width / 2;
      this.y = this.gameHeight - this.height * 2;
      this.speed = 0;
      this.yVelocity = 0;
    }

    draw() {
      ctx.drawImage(this.playerImage, this.x, this.y, this.width, this.height);
    }

    detectCollision(asteroid) {
      if (
        this.x < asteroid.asteroidX + asteroid.asteroidWidth &&
        this.x + this.width > asteroid.asteroidX &&
        this.y < asteroid.asteroidY + asteroid.asteroidWidth &&
        this.y + this.height > asteroid.asteroidY
      ) {
        return true;
      }

      return false;
    }

    update(input) {
      let horizontalMovement = 0;
      let verticalMovement = 0;

      if (input.keys["d"] || input.keys["ArrowRight"]) {
        horizontalMovement += 1;
      }
      if (input.keys["a"] || input.keys["ArrowLeft"]) {
        horizontalMovement -= 1;
      }
      if (input.keys["w"] || input.keys["ArrowUp"]) {
        verticalMovement -= 1;
      }
      if (input.keys["s"] || input.keys["ArrowDown"]) {
        verticalMovement += 1;
      }

      // Normalize diagonal movement
      if (horizontalMovement !== 0 && verticalMovement !== 0) {
        horizontalMovement /= Math.sqrt(2);
        verticalMovement /= Math.sqrt(2);
      }

      this.x += horizontalMovement * 5;
      this.y += verticalMovement * 5;

      if (this.x < 0) {
        this.x = 0;
      }
      if (this.x > this.gameWidth - this.width) {
        this.x = this.gameWidth - this.width;
      }
      if (this.y < 0) {
        this.y = 0;
      }
      if (this.y > this.gameHeight - this.height) {
        this.y = this.gameHeight - this.height;
      }
    }
  }

  const AsteroidsImage = new Image();
  AsteroidsImage.src = process.env.PUBLIC_URL + "/img/game/asteroid.png";

  class AsteroidsCaller {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;

      this.spawnTimeout = true;

      this.smallAsteroidWidth = 25;
      this.smallAsteroidSpeed = 5;
      this.smallAsteroidReload = -200;
      this.smallAsteroid1 = null;
      this.smallAsteroid2 = null;

      this.medAsteroidWidth = 35;
      this.medAsteroidSpeed = 3;
      this.medAsteroidReload = -100;
      this.medAsteroid1 = null;
      this.medAsteroid2 = null;

      this.bigAsteroidWidth = 50;
      this.bigAsteroidSpeed = 2;
      this.bigAsteroidReload = -100;
      this.bigAsteroid = null;
    }

    createAsteroids() {
      // constructor(gameWidth, gameHeight, width, x, y, speed, reloadTime)
      this.smallAsteroid1 = new Asteroid(
        this.gameWidth,
        this.gameHeight,
        this.smallAsteroidWidth,
        0,
        0,
        this.smallAsteroidSpeed,
        this.smallAsteroidReload
      );
      this.smallAsteroid2 = new Asteroid(
        this.gameWidth,
        this.gameHeight,
        this.smallAsteroidWidth,
        0,
        0,
        this.smallAsteroidSpeed,
        this.smallAsteroidReload
      );
      this.medAsteroid1 = new Asteroid(
        this.gameWidth,
        this.gameHeight,
        this.medAsteroidWidth,
        0,
        0,
        this.medAsteroidSpeed,
        this.medAsteroidReload
      );
      this.medAsteroid2 = new Asteroid(
        this.gameWidth,
        this.gameHeight,
        this.medAsteroidWidth,
        0,
        0,
        this.medAsteroidSpeed,
        this.medAsteroidReload
      );
      this.bigAsteroid = new Asteroid(
        this.gameWidth,
        this.gameHeight,
        this.bigAsteroidWidth,
        0,
        0,
        this.bigAsteroidSpeed,
        this.bigAsteroidReload
      );
    }

    draw() {
      if (this.spawnTimeout) {
        this.createAsteroids();

        this.smallAsteroid1.asteroidY -=
          this.smallAsteroidReload - Math.random() * 1000;
        this.smallAsteroid2.asteroidY -=
          this.smallAsteroidReload - Math.random() * 1000;
        this.medAsteroid1.asteroidY -=
          this.medAsteroidReload - Math.random() * 1000;
        this.medAsteroid2.asteroidY -=
          this.medAsteroidReload - Math.random() * 1000;
        this.bigAsteroid.asteroidY -=
          this.bigAsteroidReload - Math.random() * 1000;

        this.spawnTimeout = false;
      }

      this.smallAsteroid1.draw();
      this.smallAsteroid2.draw();
      this.medAsteroid1.draw();
      this.medAsteroid2.draw();
      this.bigAsteroid.draw();
    }
  }

  class Asteroid {
    constructor(gameWidth, gameHeight, width, x, y, speed, reloadTime) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.asteroidWidth = width;
      this.asteroidY = y;
      this.asteroidX = x;
      this.asteroidSpeed = speed;
      this.reload = reloadTime;
    }

    draw() {
      if (this.asteroidX == 0) {
        this.asteroidX = Math.random() * this.gameWidth;

        if (this.asteroidX < this.asteroidWidth) {
          this.asteroidX = this.asteroidWidth;
        } else if (this.asteroidX > this.gameWidth - this.asteroidWidth) {
          this.asteroidX = this.gameWidth - this.asteroidWidth;
        }
      }

      ctx.drawImage(
        AsteroidsImage,
        this.asteroidX,
        this.asteroidY,
        this.asteroidWidth,
        this.asteroidWidth
      );

      this.asteroidY += this.asteroidSpeed;

      if (this.asteroidY > this.gameHeight) {
        this.asteroidY = this.reload - Math.random() * 1000;
        this.asteroidX = 0;
      }
    }
  }

  if (load) {
    const input = new InputHandler();
    const player = new Player(mainCVS.width, mainCVS.height);
    const asteroids = new AsteroidsCaller(mainCVS.width, mainCVS.height);

    function animate() {
      ctx.clearRect(0, 0, mainCVS.width, mainCVS.height);
      player.draw(ctx, null);
      player.update(input);
      asteroids.draw(ctx, player);

      if (
        player.detectCollision(asteroids.bigAsteroid) ||
        player.detectCollision(asteroids.smallAsteroid1) ||
        player.detectCollision(asteroids.smallAsteroid2) ||
        player.detectCollision(asteroids.medAsteroid1) ||
        player.detectCollision(asteroids.medAsteroid2)
      ) {
        cancelAnimationFrame(animate);
        end_game(score.value);
      }

      score.value++;

      requestAnimationFrame(animate);
    }
    animate();
  } else {
    end_game(score.value);
  }

  function end_game(score) {
    window.localStorage.setItem("prevScore", score);

    if (!window.localStorage.getItem("highScore")) {
      window.localStorage.setItem("highScore", "0");
    }

    let highScore = parseInt(window.localStorage.getItem("highScore"));
    score = parseInt(score);

    if (score > highScore) {
      window.localStorage.setItem("highScore", score);
    }
    ctx.clearRect(0, 0, mainCVS.width, mainCVS.height);
    window.location.reload();
  }
}

function load_menu(load) {
  const menu = document.getElementById("gameMenu");

  if (load) {
    menu.style.opacity = "1";
  } else {
    menu.style.opacity = "0";
  }
}
