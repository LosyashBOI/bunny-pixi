import * as PIXI from 'pixi.js';
import {Easing, Group, Tween} from "tweedle.js";

const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x1099bb,
});
document.body.appendChild(app.view);

const bunny = PIXI.Sprite.from('https://pixijs.io/examples/examples/assets/bunny.png');
bunny.anchor.set(0.5);
bunny.position.set(app.screen.width / 2, app.screen.height / 2);

const jumpButton = new PIXI.Text('Jump', {
    fontSize: 30,
    fill: 'white',
});
jumpButton.anchor.set(0.5, 1);
jumpButton.position.set(app.screen.width / 2, app.screen.height - 50);

jumpButton.interactive = true;
jumpButton.cursor = 'pointer';
jumpButton.on('pointerdown', handleJump);

let idleTimeout = setTimeout(rotation, 5000);

function rotation() {
    bunny.rotation += 0.01;
    idleTimeout = setTimeout(rotation, 16);
}

function handleJump() {
    clearTimeout(idleTimeout);
    new Tween(bunny)
        .to({ y: "-100" }, 500)
        .easing(Easing.Back.In)
        .chain(new Tween(bunny)
            .to({y: app.screen.height / 2}, 500)
            .easing(Easing.Bounce.Out)
            .onComplete(() => idleTimeout = setTimeout(rotation, 5000)))
        .start();
}

function animate() {
    Group.shared.update();
    requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
    bunny.position.set(app.screen.width / 2, app.screen.height / 2);
    jumpButton.position.set(app.screen.width / 2, app.screen.height - 30);
});


app.stage.addChild(bunny);
app.stage.addChild(jumpButton);

animate();


