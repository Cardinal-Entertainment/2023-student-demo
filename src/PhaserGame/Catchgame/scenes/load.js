import Phaser from "phaser";
import { updateHighScore } from "../../../utils/nakama";


export class Load extends Phaser.Scene {
  constructor() {
    super({
      key: 'Load'
    });

    this.fallingObjects = [];
    this.score = 0;
    this.scoreText = null;
    this.gameOverModal = null;
    this.gameOver = false;
    this.timer = 60;
    this.timerText = null;
    this.timerEvent = null;
    this.caughtCards = [];
    this.lostCards = [];
    this.cardsCaughtText = null;
    this.cardsLostText = null;
    this.rotationSpeed = 0.02;
    this.elapsedTime = 0;
    this.initialFallingSpeed = 20;
  }

  loadFont(name, url) {
    var newFont = new FontFace(name, `url(${url})`);
    newFont.load().then(function (loaded) {
      document.fonts.add(loaded);
    }).catch(function (error) {
      console.error(error);
      return error;
    });
  }

  preload() {
    this.load.image("red", "./images/1_or_11.png");
    this.load.image("white", "./images/double.png");
    this.load.image("blue", "./images/redraw.png");
    this.load.image("purple", "./images/resurrect.png");
    this.load.image("steal", "./images/steal.png");
    this.load.image("tie_breaker", "./images/tie_breaker.png");
    this.load.image("skull", "./images/back.png");
    this.load.image("bg_overlay", "./images/bg_overlay_catch.png");
    this.load.image("bg_back", "./images/bg_back_catch.png");

    this.load.image("skull_end", "./images/512x512.png");
    this.load.image("blue_button", "./images/blue_button_300.png");
    this.load.image("red_button", "./images/red_button_300.png");
    this.load.image("popup", "./images/game_over_popup.png");

    this.loadFont('Truculenta', './fonts/Truculenta-Regular.ttf');
    this.loadFont('TruculentaBold', './fonts/Truculenta-Black.ttf');

    this.load.audio("game", "./sounds/catchgame.mp3");
    this.load.audio("click", "./sounds/click-catch.mp3");
    this.load.audio("wrong", "./sounds/wrong.mp3");
    this.load.audio("gameover", "./sounds/gameover.mp3");

  }

  create() {
    this.cameras.main.fadeIn(500, 0, 0, 0);

    this.backgroundMusic = this.sound.add('game', { loop: true });
    this.backgroundMusic.play();

    let bg = this.add.image(0, 0, 'bg_overlay').setOrigin(0, 0);
    let scaleX = this.cameras.main.width / bg.width;
    let scaleY = this.cameras.main.height / bg.height;
    let scale = Math.max(scaleX, scaleY);
    bg.setScale(scale);

    this.bgBack = this.add.image(this.cameras.main.width / 1.7, this.cameras.main.height / 2, 'bg_back');
    this.bgBack.setScale(2.5);
    this.bgBack.setDepth(-4);

    const textStyle = {
      fontFamily: 'TruculentaBold',
      fontSize: '80px',
      fill: 'orange'
    };

    const textStyle1 = {
      fontFamily: 'TruculentaBold',
      fontSize: '80px',
      fill: '#fff'
    };

    this.scoreText = this.add.text(this.cameras.main.width - 2900, 200, 'Score: 0', textStyle);
    this.scoreText.setOrigin(1, 0);

    this.timerText = this.add.text(
      100,
      200,
      `Time: ${this.timer}`,
      {
        fontFamily: 'TruculentaBold',
        fontSize: '120px',
        fill: 'orange',
      }
    ).setDepth(5);
    this.timerText.setOrigin(0, 0);

    //Insert Return Button
    const returnButton = this.add.image(this.scale.width / 5, this.scale.height / 16, 'red_button').setScale(1.2).setInteractive();
    returnButton.on('pointerup', () => {
        window.location.href = '/minigames/'; // Move to Home
    });

    // Add text for the return button
    const returnButtonText = this.add.text(this.scale.width / 5, this.scale.height / 16, 'Return Home', {
        font: '55px TruculentaBold',
        fill: '#ffffff'
    });
    returnButtonText.setOrigin(0.5);    


    this.summary1 = this.add.text(this.cameras.main.width - 3630, 400, 'CATCH AS MANY', {font: '80px TruculentaBold', fill: '#fff'});
    this.summary2 = this.add.text(this.cameras.main.width - 3600, 600, 'CARDS AS YOU', textStyle1);
    this.summary3 = this.add.text(this.cameras.main.width - 3650, 800, 'CAN BEFORE TIME', textStyle1);
    this.summary4 = this.add.text(this.cameras.main.width - 3550, 1000, 'RUNS OUT!', textStyle1);

    this.cardsCaughtText = this.add.text(
      this.cameras.main.width - 2900,
      400,
      'Cards Caught: 0',
      {
        fontFamily: 'TruculentaBold',
        fontSize: '50px',
        fill: 'orange',
      }
    );

    

    this.cardsLostText = this.add.text(
      this.cameras.main.width - 2900,
      500,
      'Cards Lost: 0',
      {
        fontFamily: 'TruculentaBold',
        fontSize: '50px',
        fill: 'red',
      }
    );

    let fallingSpeed = this.initialFallingSpeed;

    this.startTimer();

    this.physics.world.setBounds(0, 0, this.game.config.width, this.game.config.height);

    const cardSpawnInterval = 500;

    const onCardClick = (card) => {
      if (this.gameOver) return;

      const cardIndex = this.fallingObjects.indexOf(card);

      if (cardIndex !== -1) {
        this.fallingObjects.splice(cardIndex, 1);

        let scoreToAdd = 0;
        let cardKey = '';
        switch (card.texture.key) {
          case 'blue':
            scoreToAdd = 1;
            cardKey = 'Blue Card';
            break;
          case 'white':
            scoreToAdd = 2;
            cardKey = 'White Card';
            break;
          case 'red':
            scoreToAdd = 4;
            cardKey = 'Red Card';
            break;
          case 'purple':
            scoreToAdd = 8;
            cardKey = 'Purple Card';
            break;
          default:
            break;
        }

        this.score += scoreToAdd;
        this.scoreText.setText(`Score: ${this.score}`);

        if (scoreToAdd > 0) {
          this.caughtCards.push(cardKey);
        } else {
          this.lostCards.push(cardKey);
        }

        this.cardsCaughtText.setText(`Cards Caught: ${this.caughtCards.length}`);
        this.cardsLostText.setText(`Cards Lost: ${this.lostCards.length}`);



        card.destroy();
      }
    };

    // const saveTopScores = () => {
    //   const topScores = [];

    //   topScores.push({ score: this.score, date: new Date().toISOString() });

    //   const existingScoresJSON = localStorage.getItem('topScores');
    //   if (existingScoresJSON) {
    //     const existingScores = JSON.parse(existingScoresJSON);

    //     topScores.push(...existingScores);
    //     topScores.sort((a, b) => b.score - a.score);

    //     topScores.splice(5);
    //   }

    //   localStorage.setItem('topScores', JSON.stringify(topScores));
    // };

    const stopGame = () => {
      this.stopBackgroundMusic();
      this.playGameOver();
      console.log('Game Over!');
      this.gameOver = true;

     

      this.gameOverContainer = this.add.container(this.cameras.main.width / 2, this.cameras.main.height / 2);
      this.gameOverContainer.setDepth(10);

      const modalBackground = this.add.image(0, 0, 'popup');
      this.gameOverContainer.add(modalBackground);

      const skullEndImage = this.add.image(0, -500, 'skull_end');
      this.gameOverContainer.add(skullEndImage);

  

      const gameOver = this.add.text(1950, modalBackground.y + 900, `GAME OVER!`, {
        fontSize: '120px',
        fill: 'skyblue'
      }).setDepth(15);
      gameOver.setOrigin(0.5, 0);

      const scoreText = this.add.text(1950, modalBackground.y + 1100, `Score: ${this.score}`, {
        fontSize: '80px',
        fill: 'green'
      }).setDepth(15);
      scoreText.setOrigin(0.5, 0);

      const caughtCardsCountText = this.add.text(0, modalBackground.y + 130, `Cards Caught: ${this.caughtCards.length}`, {
        fontFamily: 'Truculenta',
        fontSize: '60px',
        fill: '#fff'
      }).setDepth(15);
      caughtCardsCountText.setOrigin(0.5, 0);
      this.gameOverContainer.add(caughtCardsCountText);

      const lostCardsCountText = this.add.text(0, modalBackground.y + 200, `Cards Lost: ${this.lostCards.length}`, {
        fontFamily: 'Truculenta',
        fontSize: '60px',
        fill: '#fff'
      }).setDepth(15);
      lostCardsCountText.setOrigin(0.5, 0);
      this.gameOverContainer.add(lostCardsCountText);

      const blueButton = this.add.image(modalBackground.x - 350, modalBackground.y + 450, 'blue_button')
        .setInteractive()
        .on('pointerdown', () => {
          console.log('Restart clicked');
          this.gameOverContainer.destroy();
          this.resetGameState();
        });
      this.gameOverContainer.add(blueButton);

      const redButton = this.add.image(modalBackground.x + 350, modalBackground.y + 450, 'red_button')
        .setInteractive()
        .on('pointerdown', () => {
          console.log('Go to homepage clicked');
          this.gameOverContainer.destroy();
          window.location.href = '/minigames'; 
        });
      this.gameOverContainer.add(redButton);

      const restartText = this.add.text(blueButton.x, blueButton.y, 'PLAY AGAIN', {
        fontFamily: 'Truculenta',
        fontSize: '50px',
        fill: '#fff'
      }).setOrigin(0.5, 0.5);
      this.gameOverContainer.add(restartText);

      const homepageText = this.add.text(redButton.x, redButton.y, 'EXIT', {
        fontFamily: 'Truculenta',
        fontSize: '50px',
        fill: '#fff'
      }).setOrigin(0.5, 0.5);
      this.gameOverContainer.add(homepageText);

      //saveTopScores();
      updateHighScore(this.score, 'minigame_catch');
    };





    
    const spawnCard = () => {
      if (this.gameOver) return;
    
      let objectKey;
      const rand = Math.random();
    
      const minX = this.game.config.width * 0.4;
      const maxX = this.game.config.width * 0.7;
      const randomX = Phaser.Math.Between(minX, maxX);
    
      if (rand <= 0.575) {
        objectKey = 'blue';
      } else if (rand <= 0.75) {
        objectKey = 'white';
      } else if (rand <= 0.875) {
        objectKey = 'red';
      } else if (rand <= 0.9) {
        objectKey = 'purple';
      } else {
        objectKey = 'skull';
      }
    
      const card = this.add.image(randomX, Phaser.Math.Between(-200, -50), objectKey)
        .setDisplaySize(350, 530);
    
      card.setInteractive();
      card.on('pointerdown', () => {
        if (objectKey === 'blue' || objectKey === 'white' || objectKey === 'red' || objectKey === 'purple') {
          this.playClickSound();
        }
        if (objectKey === 'skull') {
          this.playWrongSound();
        }
        onCardClick(card);
      });
    
      if (objectKey === 'skull') {
        card.setScale(1.5);
        card.on('pointerdown', () => {
          stopGame();
        });
      }
    
      this.fallingObjects.push(card);
    
      const minFallingSpeed = 20;
      const maxFallingSpeed = 50;
      const timeFactor = this.timer >= 0 ? 1 - this.timer / 60 : 0;
      const fallingSpeed = minFallingSpeed + (maxFallingSpeed - minFallingSpeed) * timeFactor;
    
      card.y += fallingSpeed;
    
      card.setDepth(-3);
    
      // Determine rotation direction (left or right)
      const rotationDirection = Math.random() < 0.5 ? -1 : 1;
      const rotationSpeed = (Math.random() * 0.02 + 0.01) * rotationDirection; // Random rotation speed
    
      card.rotationSpeed = rotationSpeed;
    };
    








    this.time.addEvent({
      delay: 60000,
      callback: stopGame,
    });

    this.time.addEvent({
      delay: cardSpawnInterval,
      loop: true,
      callback: spawnCard,
    });

   
  }

  update() {
    const minFallingSpeed = 20;
    const maxFallingSpeed = 50;
    const timeFactor = (this.timer >= 0 ? 1 - (this.timer / 60) : 0);
    const fallingSpeed = minFallingSpeed + (maxFallingSpeed - minFallingSpeed) * timeFactor;
  
    this.fallingObjects.forEach((object, index) => {
      object.y += fallingSpeed;
  
      if (object.y > this.game.config.height) {
        this.fallingObjects.splice(index, 1);
        this.lostCards.push(object.texture.key);
        this.cardsLostText.setText(`Cards Lost: ${this.lostCards.length}`);
        object.destroy();
      }
  
      object.rotation += object.rotationSpeed; // Apply the card's rotation speed
    });
  }
  

  resetGameState() {
    window.location.reload();
  }

  startTimer() {
    if (!this.timerEvent) {
      this.timerEvent = this.time.addEvent({
        delay: 1000,
        callback: this.timerCallback.bind(this),
        loop: true,
      });
    }
  }

  timerCallback() {
    if (!this.gameOver) {
      this.timer--;

      if (this.timer <= 0) {
        this.timer = 0;
        this.stopBackgroundMusic();
        this.playGameOver();
        console.log('Game Over!');
        this.gameOver = true;
      }

      this.timerText.setText(`Time: ${this.timer}`);
    }
  }

  stopBackgroundMusic() {
    if (this.backgroundMusic) {
      this.backgroundMusic.stop();
    }
  }

  playClickSound() {
    this.sound.play('click');
  }

  playWrongSound() {
    this.sound.play('wrong');
  }

  playGameOver() {
    this.sound.play('gameover');
  }

 
}
