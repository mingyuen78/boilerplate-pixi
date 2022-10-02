import * as PIXI from 'pixi.js'

const app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x1099bb,
    view: document.querySelector('#scene')
});

let loader = PIXI.Loader.shared;

loader.add("avatar", "assets/walkcycle.json");
loader.onProgress.add(handleOnProgress);
loader.onLoad.add(handleLoadAsset);
loader.onError.add(handleLoadError);
loader.load(handleLoadComplete);
let img;

function handleOnProgress(loader) {
    console.log(loader.progress + "% loaded");
}

function handleLoadAsset(loader, resource) {
    console.log("asset loaded " + resource.name);
}

function handleLoadError() {
    console.error("load error");
}

function handleLoadComplete() {
    var sheet = loader.resources["avatar"];
    console.log("loader", sheet.spritesheet);

    img = new PIXI.AnimatedSprite(sheet.spritesheet.animations["walk"]);
    img.anchor.x = 0.5;
    img.anchor.y = 0.5;

    app.stage.addChild(img);

    img.animationSpeed = 0.3;
    img.play();

    img.onLoop = () => {
        //console.log('loop');
    }
    img.onFrameChange = () => {
        //console.log('currentFrame', img.currentFrame);
    }
    img.onComplete = () => {
        //console.log('done');
    }

    app.ticker.add(animate);
}

function animate() {
    img.x = app.renderer.screen.width / 2;
    img.y = app.renderer.screen.height / 2;
}