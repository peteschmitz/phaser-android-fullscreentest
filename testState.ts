/**
 * Created by Pete on 12/10/2014.
 */

///<reference path="2.2.1/phaser.d.ts"/>

class TestState extends Phaser.State {

    create() {
        super.create();

        var signals:any[] = [
            {s: this.scale.enterFullScreen, t: "Enter Full Screen"},
            {s: this.scale.enterIncorrectOrientation, t: "Enter Incorrect Orientation"},
            {s: this.scale.enterLandscape, t: "Enter Landscape"},
            {s: this.scale.enterPortrait, t: "Enter Portrait"},
            //{s: this.scale.fullScreenFailed, t: "Full Screen Failed"},
            {s: this.scale.leaveFullScreen, t: "Leave Full Screen"},
            {s: this.scale.leaveIncorrectOrientation, t: "Leave Incorrect Orientation"}
            //{s: this.scale.onFullScreenChange, t: "On Full Screen Change"},
            //{s: this.scale.onFullScreenError, t: "On Full Screen Error"},
            //{s: this.scale.onFullScreenInit, t: "On Full Screen Init"},
            //{s: this.scale.onOrientationChange, t: "On Orientation Change"},
            //{s: this.scale.onSizeChange, t: "On Size Change"}
        ];

        var test:TestState = this;
        signals.forEach(signal => {
            var sig:Phaser.Signal = <Phaser.Signal> signal.s;
            if (sig) sig.add(function() {test.printTest(<string> signal.t);}, test);
        });

        this.printTest("None");
        var button:Phaser.Button = new Phaser.Button(this.game, 20, 20);
        button.addChild(new Phaser.Text(this.game, 0, 0, "Fullscreen", {fill: "white"}));
        button.events.onInputDown.add(this.fullscreen, this);
        this.stage.addChild(button);
    }

    fullscreen() {
        this.scale.startFullScreen(true);
    }

    text:Phaser.Text;
    signals:string[];
    printTest(signal:string) {
        if (!this.text){
            this.signals = [];
            this.text = new Phaser.Text(this.game, 50, 50, "", {font: "12pt verdana", fill: "white"});
            this.stage.addChild(this.text);
        }
        this.signals.unshift(signal);
        if (this.signals.length > 5){
            this.signals.pop();
        }

        var t:string = "";
        t += "Is Desktop? " + this.game.device.desktop + "\n";
        t += "Height: " + this.scale.height + "\n";
        t += "Width: " + this.scale.width + "\n";
        //t += "Is Fullscreen Supported? " + this.scale.compatibility.supportsFullScreen + "\n";
        t += "Is Fullscreen? " + this.scale.isFullScreen + "\n";
        t += "Is Landscape? " + this.scale.isLandscape + "\n";
        t += "\n";
        t += "Aspect Ratio: " + this.scale.aspectRatio + "\n";
        t += "Src Aspect rto: " + this.scale.sourceAspectRatio + "\n";
        t += "Pixel Ratio: " + this.game.device.pixelRatio + "\n";
        t += "Bounds: " + this.scale.bounds.toString() + "\n";
        //t += "Parent Bounds: " + this.scale.getParentBounds().toString() + "\n";
        t += "Scale Factor: " + this.scale.scaleFactor.toString() + "\n";
        t += "\n";

        t += "Last 5 Signals: \n";
        this.signals.forEach(signalCall => {
           t += signalCall + "\n";
        });

        this.text.setText(t);
    }
}