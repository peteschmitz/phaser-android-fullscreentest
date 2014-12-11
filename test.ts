/**
 * Created by Pete on 12/10/2014.
 */

///<reference path="phaser.d.ts"/>
///<reference path="testState.ts"/>

window.onload = function() {
    new Test();
};

class Test extends Phaser.Game {

    constructor(){
        super(
            800,
            600,
            Phaser.AUTO,
            "content",
            {init:this.init, create:this.create, preload:this.preload},
            false,
            true
        );
    }

    init() {
        this.scale.fullScreenScaleMode = Phaser.ScaleManager.RESIZE;
    }

    preload() {

    }

    create() {
        this.state.add("test", new TestState(), true);
    }
}