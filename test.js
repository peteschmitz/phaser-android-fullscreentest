/**
 * Created by Pete on 12/10/2014.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="2.2.1/phaser.d.ts"/>
var TestState = (function (_super) {
    __extends(TestState, _super);
    function TestState() {
        _super.apply(this, arguments);
    }
    TestState.prototype.create = function () {
        _super.prototype.create.call(this);
        var signals = [
            { s: this.scale.enterFullScreen, t: "Enter Full Screen" },
            { s: this.scale.enterIncorrectOrientation, t: "Enter Incorrect Orientation" },
            { s: this.scale.enterLandscape, t: "Enter Landscape" },
            { s: this.scale.enterPortrait, t: "Enter Portrait" },
            { s: this.scale.leaveFullScreen, t: "Leave Full Screen" },
            { s: this.scale.leaveIncorrectOrientation, t: "Leave Incorrect Orientation" }
        ];
        var test = this;
        signals.forEach(function (signal) {
            var sig = signal.s;
            if (sig)
                sig.add(function () {
                    test.printTest(signal.t);
                }, test);
        });
        this.printTest("None");
        var button = new Phaser.Button(this.game, 20, 20);
        button.addChild(new Phaser.Text(this.game, 0, 0, "Fullscreen", { fill: "white" }));
        button.events.onInputDown.add(this.fullscreen, this);
        this.stage.addChild(button);
    };
    TestState.prototype.fullscreen = function () {
        this.scale.startFullScreen(true);
    };
    TestState.prototype.printTest = function (signal) {
        if (!this.text) {
            this.signals = [];
            this.text = new Phaser.Text(this.game, 50, 50, "", { font: "12pt verdana", fill: "white" });
            this.stage.addChild(this.text);
        }
        this.signals.unshift(signal);
        if (this.signals.length > 5) {
            this.signals.pop();
        }
        var t = "";
        t += "Phaser Version: " + Phaser.VERSION + "\n";
        t += "Click 'Fullscreen' to request fullscreen.\n\n";
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
        this.signals.forEach(function (signalCall) {
            t += signalCall + "\n";
        });
        this.text.setText(t);
    };
    return TestState;
})(Phaser.State);
/**
 * Created by Pete on 12/10/2014.
 */
///<reference path="2.2.1/phaser.d.ts"/>
///<reference path="testState.ts"/>
window.onload = function () {
    new Test();
};
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        _super.call(this, 800, 600, Phaser.AUTO, "content", { init: this.init, create: this.create, preload: this.preload }, false, true);
    }
    Test.prototype.init = function () {
        this.scale.fullScreenScaleMode = Phaser.ScaleManager.RESIZE;
    };
    Test.prototype.preload = function () {
    };
    Test.prototype.create = function () {
        this.state.add("test", new TestState(), true);
    };
    return Test;
})(Phaser.Game);
//# sourceMappingURL=test.js.map