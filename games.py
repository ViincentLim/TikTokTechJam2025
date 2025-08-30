game_1 = """
 <!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <title>Simple Phaser Puzzle</title>
    <script src="https://cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.min.js"></script>
    <style>
        body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #333;
            overflow: hidden; /* Prevent scrollbars */
        }
        canvas {
            display: block;
            margin: auto;
            max-width: 100%;
            max-height: 100vh;
        }
    </style>
</head>
<body>

<script>
    function onGameOver(success) {
        console.log("onGameOver called with:", success);
        window.webkit?.messageHandlers?.onGameOver?.postMessage(success);
        window.parent.postMessage(success, "*");
    }

    class GameScene extends Phaser.Scene {
        constructor() {
            super('GameScene');
        }

        preload() {
            // No assets to preload, using graphics
        }

        create() {
            this.cameras.main.setBackgroundColor('#282c34');

            // Set up game parameters
            this.shapes = [];
            this.targetShape = null;
            this.gameOver = false;
            this.timer = null;

            // Display instructions
            this.instructionText = this.add.text(this.sys.game.config.width / 2, 100, 'Tap the RED SQUARE!', {
                fontFamily: 'Arial',
                fontSize: '32px',
                color: '#ffffff'
            }).setOrigin(0.5);

            this.createShapes();

            // Game ends in 15 seconds
            this.time.delayedCall(15000, this.loseGame, [], this);

            // Add a console log for debugging
            console.log("GameScene created. Look for the red square!");
        }

        createShapes() {
            const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00]; // Red, Green, Blue, Yellow
            const shapeTypes = ['square', 'circle'];
            const shapeSize = 100;
            const padding = 20;
            const gridCols = 3;
            const gridRows = 3;

            const startX = (this.sys.game.config.width - (gridCols * shapeSize + (gridCols - 1) * padding)) / 2 + shapeSize / 2;
            const startY = (this.sys.game.config.height - (gridRows * shapeSize + (gridRows - 1) * padding)) / 2 + shapeSize / 2;

            // Array to hold potential target positions
            let possibleTargetPositions = [];

            for (let i = 0; i < gridRows; i++) {
                for (let j = 0; j < gridCols; j++) {
                    const x = startX + j * (shapeSize + padding);
                    const y = startY + i * (shapeSize + padding);

                    possibleTargetPositions.push({x, y, index: this.shapes.length}); // Store index for later assignment

                    const randomColor = Phaser.Utils.Array.GetRandom(colors.filter(c => c !== 0xff0000)); // Avoid red for non-target shapes 
initially
                    const randomShapeType = Phaser.Utils.Array.GetRandom(shapeTypes);

                    let shapeGraphics;
                    if (randomShapeType === 'square') {
                        shapeGraphics = this.add.graphics({ fillStyle: { color: randomColor } });
                        shapeGraphics.fillRect(x - shapeSize / 2, y - shapeSize / 2, shapeSize, shapeSize);
                    } else { // circle
                        shapeGraphics = this.add.graphics({ fillStyle: { color: randomColor } });
                        shapeGraphics.fillCircle(x, y, shapeSize / 2);
                    }

                    shapeGraphics.setInteractive(new Phaser.Geom.Rectangle(x - shapeSize / 2, y - shapeSize / 2, shapeSize, shapeSize), 
Phaser.Geom.Rectangle.Contains);

                    this.shapes.push({
                        graphics: shapeGraphics,
                        color: randomColor,
                        type: randomShapeType,
                        x: x,
                        y: y,
                        isTarget: false
                    });
                }
            }

            // Select a random position for the target (RED SQUARE)
            const targetPosition = Phaser.Utils.Array.RemoveRandomElement(possibleTargetPositions);
            const targetIndex = targetPosition.index;

            // Update the shape at the target index to be a RED SQUARE
            const existingShape = this.shapes[targetIndex];
            existingShape.graphics.clear(); // Clear previous graphic
            existingShape.color = 0xff0000; // Red
            existingShape.type = 'square'; // Square
            existingShape.graphics.fillStyle(0xff0000);
            existingShape.graphics.fillRect(existingShape.x - shapeSize / 2, existingShape.y - shapeSize / 2, shapeSize, shapeSize);
            existingShape.isTarget = true;
            this.targetShape = existingShape;

            // Add event listeners after target is set
            this.shapes.forEach(shape => {
                shape.graphics.on('pointerdown', () => this.handleShapeClick(shape));
            });

            console.log("Target shape selected:", this.targetShape.color, this.targetShape.type, "at", this.targetShape.x,
this.targetShape.y);
        }

        handleShapeClick(clickedShapeObject) {
            if (this.gameOver) return;

            if (clickedShapeObject.isTarget) {
                this.winGame();
            } else {
                this.loseGame();
            }
        }

        winGame() {
            if (this.gameOver) return;
            this.gameOver = true;
            console.log("Player wins!");
            this.instructionText.setText('You Win!').setColor('#00ff00');
            onGameOver(true);
        }

        loseGame() {
            if (this.gameOver) return;
            this.gameOver = true;
            console.log("Player loses!");
            this.instructionText.setText('You Lose!').setColor('#ff0000');
            onGameOver(false);
        }
    }

    const config = {
        type: Phaser.AUTO,
        parent: 'game-container', 
        width: 360, 
        height: 640, 
        scene: GameScene,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            orientation: Phaser.Scale.PORTRAIT
        }
    };

    const game = new Phaser.Game(config);

    // Add a container for the game canvas if parent is defined
    document.addEventListener('DOMContentLoaded', () => {
        if (config.parent && !document.getElementById(config.parent)) {
            const gameContainer = document.createElement('div');
            gameContainer.id = config.parent;
            document.body.appendChild(gameContainer);
        }
    });

</script>

</body>
</html>
"""

game_2 = """
<html><head></head><body>



    <title>Phaser Puzzle</title>
    <script src="https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.min.js"></script>
    <style>
        body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #222; }
    </style>


<script>

    function onGameOver(success) {
        window.webkit?.messageHandlers?.onGameOver?.postMessage(success);
        window.parent.postMessage(success, "*");
    }

    class PuzzleScene extends Phaser.Scene {
        constructor() {
            super({ key: 'PuzzleScene' });
            this.isGameOver = false;
            this.timeLeft = 15;
        }

        create() {
            const centerX = this.cameras.main.width / 2;
            const SHAPE_SIZE = 100;
            const SHAPE_COLOR = 0xeeeeee;
            const TARGET_COLOR = 0x444444;
            const SUCCESS_COLOR = 0x00ff00;
            const FAIL_COLOR = 0xff0000;

            const targetZone = this.add.zone(centerX, 200, SHAPE_SIZE, SHAPE_SIZE).setRectangleDropZone(SHAPE_SIZE, SHAPE_SIZE);
            const graphics = this.add.graphics();
            graphics.lineStyle(4, TARGET_COLOR);
            graphics.strokeRect(targetZone.x - targetZone.input.hitArea.width / 2, targetZone.y - targetZone.input.hitArea.height / 2, targetZone.input.hitArea.width, targetZone.input.hitArea.height);

            const correctShape = this.add.rectangle(centerX - 200, 500, SHAPE_SIZE, SHAPE_SIZE, SHAPE_COLOR).setInteractive();
            correctShape.name = 'correct';
            const wrongShape1 = this.add.circle(centerX, 500, SHAPE_SIZE / 2, SHAPE_COLOR).setInteractive();
            wrongShape1.name = 'wrong';
            const wrongShape2 = this.add.triangle(centerX + 200, 475, 0, SHAPE_SIZE, SHAPE_SIZE, SHAPE_SIZE, SHAPE_SIZE / 2, 0).setFillStyle(SHAPE_COLOR).setInteractive();
            wrongShape2.name = 'wrong';

            const shapes = [correctShape, wrongShape1, wrongShape2];
            shapes.forEach(shape => {
                this.input.setDraggable(shape);
                shape.setData('startX', shape.x);
                shape.setData('startY', shape.y);
            });

            this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
                gameObject.x = dragX;
                gameObject.y = dragY;
            });

            this.input.on('dragend', (pointer, gameObject, dropped) => {
                if (!dropped) {
                    gameObject.x = gameObject.getData('startX');
                    gameObject.y = gameObject.getData('startY');
                }
            });

            this.input.on('drop', (pointer, gameObject, dropZone) => {
                if (this.isGameOver) return;
                
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;
                gameObject.input.enabled = false;

                if (gameObject.name === 'correct') {
                    gameObject.setFillStyle(SUCCESS_COLOR);
                    this.endGame(true);
                } else {
                    if(gameObject.type === 'Triangle') gameObject.setFillStyle(FAIL_COLOR);
                    else gameObject.fillColor = FAIL_COLOR;
                    this.endGame(false);
                }
            });

            this.timerText = this.add.text(centerX, 50, Time: ${this.timeLeft}, { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
            this.gameTimer = this.time.addEvent({
                delay: 1000,
                callback: () => {
                    if (this.isGameOver) return;
                    this.timeLeft--;
                    this.timerText.setText(`Time: ${this.timeLeft}`);
                    if (this.timeLeft <= 0) {
                        this.endGame(false);
                    }
                },
                callbackScope: this,
                loop: true
            });
        }

        endGame(didWin) {
            if (this.isGameOver) return;
            this.isGameOver = true;
            this.gameTimer.remove();
            this.input.enabled = false;
            onGameOver(didWin);

            this.cameras.main.shake(200, 0.01);
            const message = didWin ? "YOU WIN!" : "YOU LOSE!";
            const messageText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, message, {
                fontSize: '64px',
                fill: '#fff',
                backgroundColor: '#000000a0',
                padding: { x: 20, y: 10 }
            }).setOrigin(0.5);
        }
    }

    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        backgroundColor: '#1a1a1a',
        scene: PuzzleScene
    };

    const game = new Phaser.Game(config);
</script>


<canvas width="800" height="600"></canvas></body></html>
"""

game_3 = """
<!DOCTYPE html>
<html>
<head>
    <title>Simple Puzzle Game</title>
    <script src="https://cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.min.js"></script>
    <style>
        body { margin: 0; padding: 0; overflow: hidden; background-color: #000; }
    </style>
</head>
<body>
<div id="game-container"></div>

<script>


    function onGameOver(success) {
        window.webkit?.messageHandlers?.onGameOver?.postMessage(success);
        window.parent.postMessage(success, "*");
        console.log("Game Over! Win: " + success.win);
    }

    class PuzzleGameScene extends Phaser.Scene {
        constructor() {
            super({ key: 'PuzzleGameScene' });
            this.score = 0;
            this.targetColor = null;
            this.shapes = [];
            this.colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00]; // Red, Green, Blue, Yellow
            this.colorNames = { 0xff0000: 'Red', 0x00ff00: 'Green', 0x0000ff: 'Blue', 0xffff00: 'Yellow' };
            this.targetColorText = null;
            this.instructionsText = null;
            this.timerText = null;
            this.timerEvent = null;
        }

        preload() {
            // No assets to preload
        }

        create() {
            console.log("Game created. 'this' in create:", this);

            this.instructionsText = this.add.text(this.game.config.width / 2, 50, 'Tap the shape with the matching color!', {
                fontFamily: 'Arial', fontSize: '24px', fill: '#ffffff'
            }).setOrigin(0.5);

            this.add.text(this.game.config.width / 2, 100, 'Time remaining: ', { fontFamily: 'Arial', fontSize: '20px', fill: '#ffffff' 
}).setOrigin(0.5);
            this.timerText = this.add.text(this.game.config.width / 2, 130, '15', { fontFamily: 'Arial', fontSize: '36px', fill: '#ffffff' 
}).setOrigin(0.5);

            this.targetColorText = this.add.text(this.game.config.width / 2, 200, '', { fontFamily: 'Arial', fontSize: '36px', fill: '#ffffff'
}).setOrigin(0.5);

            this.setupRound();

            this.timerEvent = this.time.addEvent({
                delay: 15000, // 15 seconds
                callback: this.onTimeUp,
                callbackScope: this,
                loop: false
            });
        }

        update() {
            if (this.timerEvent && !this.timerEvent.paused) {
                const remainingTime = Math.ceil((this.timerEvent.delay - this.timerEvent.elapsed) / 1000);
                this.timerText.setText(remainingTime.toString());
            }
        }

        setupRound() {
            console.log("setupRound called. 'this' in setupRound:", this);
            console.log("this.add in setupRound:", this.add);

            // Clear previous shapes
            this.shapes.forEach(shape => shape.destroy());
            this.shapes = [];

            // Pick a random target color
            this.targetColor = Phaser.Utils.Array.GetRandom(this.colors);
            this.targetColorText.setText('Find the ' + this.colorNames[this.targetColor] + ' shape!');
            this.targetColorText.setColor('#' + this.targetColor.toString(16).padStart(6, '0')); // Set text color to target color

            const shapeSize = 100;
            const startX = (this.game.config.width - (this.colors.length * shapeSize + (this.colors.length - 1) * 20)) / 2 + shapeSize / 2;
            const yPos = this.game.config.height / 2;

            let availableColors = Phaser.Utils.Array.Shuffle(this.colors.slice()); // Shuffle all available colors

            for (let i = 0; i < this.colors.length; i++) {
                let color = availableColors[i];
                let xPos = startX + i * (shapeSize + 20);

                let graphics = this.add.graphics({ fillStyle: { color: color } });

                // Randomly choose between a circle and a square
                if (Math.random() < 0.5) {
                    graphics.fillCircle(0, 0, shapeSize / 2);
                } else {
                    graphics.fillRect(-shapeSize / 2, -shapeSize / 2, shapeSize, shapeSize);
                }
                graphics.x = xPos;
                graphics.y = yPos;

                graphics.setInteractive(
                    new Phaser.Geom.Rectangle(-shapeSize/2, -shapeSize/2, shapeSize, shapeSize),
                    Phaser.Geom.Rectangle.Contains
                );

                graphics.color = color; // Store the color with the shape
                graphics.on('pointerdown', () => this.onShapeClicked(graphics));

                this.shapes.push(graphics);
            }

            console.log("Round setup. Target color: ", this.colorNames[this.targetColor]);
        }
        
        showResultText(message, color) {
            const resultText = this.add.text(this.game.config.width / 2, this.game.config.height - 150, message, {
                fontFamily: 'Arial',
                fontSize: '48px',
                fill: color
            }).setOrigin(0.5);
        
            this.tweens.add({
                targets: resultText,
                alpha: 0,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => resultText.destroy()
            });
        }



        onShapeClicked(clickedShape) {
            console.log("Shape clicked. Color: ", this.colorNames[clickedShape.color]);

            // Flash outline
            const outline = this.add.graphics();
            outline.lineStyle(6, 0xffffff);
            outline.strokeRect(
                clickedShape.x - 50,
                clickedShape.y - 50,
                100,
                100
            );
            this.time.delayedCall(300, () => outline.destroy());

            if (clickedShape.color === this.targetColor) {
                console.log("Correct!");
                this.showResultText("Correct!", "#00ff00");
                onGameOver({ win: true });
                this.timerEvent.remove();
            } else {
                console.log("Incorrect!");
                this.showResultText("Wrong!", "#ff0000");
                onGameOver({ win: false });
                this.timerEvent.remove();
            }
        }


        onTimeUp() {
            console.log("Time's up!");
            onGameOver({ win: false });
        }
    }

    const config = {
        type: Phaser.AUTO,
        width: 450, // For a 9:16 aspect ratio on mobile (e.g., 450x800)
        height: 800,
        backgroundColor: '#333333',
        parent: 'game-container',
        scene: PuzzleGameScene // Reference the class
    };

    new Phaser.Game(config);
</script>

</body>
</html>
"""