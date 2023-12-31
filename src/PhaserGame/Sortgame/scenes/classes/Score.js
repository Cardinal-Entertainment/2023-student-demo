import Phaser from "phaser";

export default class Score extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, scale, rotation, score) {
        super(scene, x, y);
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.constRotation = rotation;
        this.updateScore(score);
    }

    updateScore(score) { //changes the score text
        if (this.constRotation === 0) {
            if (this.scoreText === undefined){
                this.scoreText = this.scene.add.text(this.x, this.y, score.toString(), { fontSize: 100 + "px", fontFamily: 'TruculentaBold' ,fill: '#2CF8AE', align: 'center' }).setOrigin(0.5, 0.5).setDepth(this.depth + 2);
            }
            else {
                this.scoreText.setText(score)
            }

        }
        else { //180 degree rotation
            if (this.scoreText === undefined) {
                this.scoreText = this.scene.add.text(this.x, this.y, score.toString(), { fontSize: 100 + "px", fontFamily: 'TruculentaBold',fill: '#2CF8AE', align: 'center' }).setOrigin(0.5, 0.5).setDepth(this.depth + 2);
            }
            else {
               this.scoreText.setText(score)
            }        
        }
    }
}

// Register a function to the gameobjectfactory, allowing you to use this.add.<objectname>
Phaser.GameObjects.GameObjectFactory.register("score", function (x, y, scale, rotation, score) {
    const scoreInst = new Score(this.scene, x, y, scale, rotation, score );

    this.displayList.add(scoreInst);
    this.updateList.add(scoreInst);

    return scoreInst;
})
