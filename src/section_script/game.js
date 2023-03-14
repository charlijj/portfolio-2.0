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
      this.width = 33;
      this.height = 33;
      this.collisionBuffer = 5;
      this.x = gameWidth / 2 - this.width / 2;
      this.y = this.gameHeight - this.height * 2;
      this.speed = 0;
      this.yVelocity = 0;
      this.acceleration = 3;
    }

    draw() {
      ctx.drawImage(this.playerImage, this.x, this.y, this.width, this.height);
    }

    detectCollision(asteroid) {
      // Calculate the radius of the asteroid
      const asteroidRadius = asteroid.asteroidWidth / 2;
    
      // Calculate the center point of the asteroid
      const asteroidCenterX = asteroid.asteroidX + asteroidRadius;
      const asteroidCenterY = asteroid.asteroidY + asteroidRadius;
    
      // Calculate the coordinates of the center point of the player
      const playerCenterX = this.x + this.width / 2;
      const playerCenterY = this.y + this.height / 2;
    
      // Calculate the distance between the centers of the two objects
      const distanceX = playerCenterX - asteroidCenterX;
      const distanceY = playerCenterY - asteroidCenterY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
      // Calculate the combined radius of the two objects
      const combinedRadius = this.width / 2 + asteroidRadius;
    
      // Check if the distance between the centers of the two objects is less than the combined radius
      if (distance < combinedRadius) {
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

      this.x += horizontalMovement * this.acceleration;
      this.y += verticalMovement * this.acceleration;

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
      this.spawnTimeoutDistance = 1000;



      this.tinyAsteroidWidth = 18;
      this.tinyAsteroidSpeed = 5;
      this.tinyAsteroidReload = -200;
      this.tinyAsteroid = null;

      this.smallAsteroidWidth = 25;
      this.smallAsteroidSpeed = 4;
      this.smallAsteroidReload = -200;
      this.smallAsteroid1 = null;
      this.smallAsteroid2 = null;

      this.medAsteroidWidth = 35;
      this.medAsteroidSpeed = 3;
      this.medAsteroidReload = -150;
      this.medAsteroid1 = null;
      this.medAsteroid2 = null;

      this.bigAsteroidWidth = 50;
      this.bigAsteroidSpeed = 2;
      this.bigAsteroidReload = -100;
      this.bigAsteroid1 = null;
      this.bigAsteroid2 = null;

      this.massiveAsteroidWidth = 70;
      this.massiveAsteroidSpeed = 1.5;
      this.massiveAsteroidReload = -200;
      this.massiveAsteroid = null;

      this.allAsteroids = [];
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
      this.bigAsteroid1 = new Asteroid(
        this.gameWidth,
        this.gameHeight,
        this.bigAsteroidWidth,
        0,
        0,
        this.bigAsteroidSpeed,
        this.bigAsteroidReload
      );

      this.bigAsteroid2 = new Asteroid(
        this.gameWidth,
        this.gameHeight,
        this.bigAsteroidWidth,
        0,
        0,
        this.bigAsteroidSpeed,
        this.bigAsteroidReload
      );

      this.massiveAsteroid = new Asteroid(
        this.gameWidth,
        this.gameHeight,
        this.massiveAsteroidWidth,
        0,
        0,
        this.massiveAsteroidSpeed,
        this.massiveAsteroidReload
      );
      this.tinyAsteroid = new Asteroid(
        this.gameWidth,
        this.gameHeight,
        this.tinyAsteroidWidth,
        0,
        0,
        this.tinyAsteroidSpeed,
        this.tinyAsteroidReload
      );


      this.allAsteroids = [
        this.massiveAsteroid,
        this.tinyAsteroid,
        this.bigAsteroid1,
        this.bigAsteroid2,
        this.medAsteroid1,
        this.medAsteroid2,
        this.smallAsteroid1,
        this.smallAsteroid2,
      ];
    }

    draw() {
      if (this.spawnTimeout) {
        this.createAsteroids();

        this.smallAsteroid1.asteroidY -=
          this.smallAsteroidReload -
          Math.random() * 1000 -
          this.spawnTimeoutDistance;
        this.smallAsteroid2.asteroidY -=
          this.smallAsteroidReload -
          Math.random() * 1000 -
          this.spawnTimeoutDistance;
        this.medAsteroid1.asteroidY -=
          this.medAsteroidReload -
          Math.random() * 1000 -
          this.spawnTimeoutDistance;
        this.medAsteroid2.asteroidY -=
          this.medAsteroidReload -
          Math.random() * 1000 -
          this.spawnTimeoutDistance;
        this.bigAsteroid1.asteroidY -=
          this.bigAsteroidReload -
          Math.random() * 1000 -
          this.spawnTimeoutDistance;
        this.bigAsteroid2.asteroidY -=
          this.bigAsteroidReload -
          Math.random() * 1000 -
          this.spawnTimeoutDistance;
        this.massiveAsteroid.asteroidY -=
          this.bigAsteroidReload -
          Math.random() * 1000 -
          this.spawnTimeoutDistance;

        this.spawnTimeout = false;
      }

      this.smallAsteroid1.draw();
      this.medAsteroid1.draw();
      this.bigAsteroid1.draw();

      if (score.value > 1000) {
        this.smallAsteroid2.draw();
        this.medAsteroid2.draw();
        this.bigAsteroid2.draw();
        this.massiveAsteroid.draw();
        this.tinyAsteroid.draw();
      }
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

      for (const asteroid of asteroids.allAsteroids) {
        if (player.detectCollision(asteroid)) {
          cancelAnimationFrame(animate);
          end_game(score.value);
          break;
        }
      }

      score.value++;

      requestAnimationFrame(animate);
    }
    animate();
  } else {
    end_game(score.value);
    return;
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
    return;
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
