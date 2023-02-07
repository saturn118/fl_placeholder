export default function FireComponent({}) {}

/////////////

let pixelate = false;
let background = false;

interface Position {
  x: number;
  y: number;
}

class Ember {
  emberBlobs: any[] = [];
  embers: any;

  constructor(colors: number[], app: any, pixelate = false) {
    this.embers = new PIXI.Container();

    if (pixelate) {
      this.embers.filters = [new PIXI.filters.PixelateFilter()];
    }

    colors.map(color => {
      var circle = new PIXI.Graphics();
      circle.lineStyle(0);
      circle.beginFill(color, 1);
      circle.drawCircle(0, 0, 10);
      circle.endFill();

      this.emberBlobs.push(app.renderer.generateTexture(circle));
    });

    setInterval(() => {
      this.addEmber();
    }, 300);
  }

  stoke() {
    let amount = 40 + Math.round(Math.random() * 20);
    for (let i = 0; i < amount; i++) {
      this.addEmber();
    }
  }

  makeBlob() {
    let texture = this.emberBlobs[
      Math.floor(Math.random() * this.emberBlobs.length)
    ];
    let blob = new PIXI.Sprite(texture);
    blob.anchor.set(0.5);
    let scaleScale = Math.random();
    blob.scale.set(0.4 * scaleScale, 0.5 * scaleScale);
    return blob;
  }

  addEmber() {
    let time = this.time * (0.3 + Math.random() * 0.6);
    let blob = this.makeBlob();
    this.embers.addChild(blob);

    let bezier = [
      {
        x: Math.random() * 100 - 50,
        y: -100
      },
      {
        x: Math.random() * 200 - 100,
        y: -100 + Math.random() * -20
      },
      {
        x: Math.random() * 200 - 100,
        y: -100 + Math.random() * -50
      },
      {
        x: Math.random() * 200 - 100,
        y: -200 + Math.random() * -50
      },
      {
        x: Math.random() * 300 - 150,
        y: -250 + Math.random() * -100
      },
      { x: Math.random() * 500 - 250, y: -500 + Math.random() * -150 }
    ];
    TweenMax.to(blob, time / 2, {
      delay: time / 2,
      ease: Power1.easeOut,
      alpha: 0
    });
    TweenMax.to(blob.position, time, {
      ease: Power1.easeOut,
      bezier: bezier,
      onComplete: () => {
        this.embers.removeChild(blob);
        blob = null;
      }
    });
  }

  get time() {
    return 2 + Math.random() * 1.5;
  }
}

class Fire {
  flame: any;
  cutout: any;
  fire: any;

  fireBlob: any;
  cutoutBlob: any;

  constructor(color: number, app, pixelate = false) {
    this.flame = new PIXI.Container();
    this.cutout = new PIXI.Container();
    this.fire = new PIXI.Container();

    this.flame.addChild(this.fire);
    this.flame.addChild(this.cutout);

    this.fire.alpha = 0.7;

    var circle = new PIXI.Graphics();
    circle.lineStyle(0);
    circle.beginFill(color, 1);
    circle.drawCircle(0, 0, 35);
    circle.endFill();
    this.fireBlob = app.renderer.generateTexture(circle);

    var cutoutCircle = new PIXI.Graphics();
    cutoutCircle.lineStyle(0);
    cutoutCircle.beginFill(0x000000, 1);
    cutoutCircle.drawCircle(0, 0, 40);
    cutoutCircle.endFill();
    this.cutoutBlob = app.renderer.generateTexture(cutoutCircle);

    let filters = {
      bloom: new PIXI.filters.AdvancedBloomFilter(0.45, 0.5, 0.5),
      pixel: pixelate
        ? new PIXI.filters.PixelateFilter()
        : new PIXI.filters.VoidFilter(),
      void: new PIXI.filters.VoidFilter()
    };

    this.flame.filters = [filters.bloom, filters.pixel, filters.void];

    this.flame.filters[this.flame.filters.length - 1].blendMode =
      PIXI.BLEND_MODES.SCREEN;

    setInterval(() => {
      this.addFlame();
      this.addCutout(Math.random() > 0.5 ? true : false);
    }, 50);
  }

  makeBlob(texture) {
    let blob = new PIXI.Sprite(texture);
    blob.anchor.set(0.5);
    return blob;
  }

  addCutout(left) {
    let time = this.time * (0.7 + Math.random() * 0.2);
    let blob = this.makeBlob(this.cutoutBlob);
    this.cutout.addChild(blob);
    let scale = [1, 0.75 + Math.random() * 1];
    blob.position.x = (130 + Math.random() * 50) * (left ? -1 : 1);
    let targetX = (5 + Math.random() * 60) * (left ? -1 : 1);
    blob.scale.set(scale[0]);
    TweenMax.to(blob, time, {
      ease: Power1.easeIn,
      pixi: { x: targetX, y: -270, scaleX: scale[1], scaleY: scale[1] },
      onComplete: () => {
        this.cutout.removeChild(blob);
        blob = null;
      }
    });
  }

  addFlame() {
    let time = this.time;
    let blob = this.makeBlob(this.fireBlob);
    this.fire.addChild(blob);
    let scale = [1.2 + Math.random(), 0.5 + Math.random()];
    let bezier = [
      {
        x: 0,
        y: 0
      },
      {
        x: Math.random() * 100 - 50,
        y: Math.random() * -20
      },
      {
        x: Math.random() * 100 - 50,
        y: Math.random() * -50 + -50
      },
      { x: 0, y: -150 + Math.random() * -100 }
    ];
    blob.scale.set(scale[0]);
    TweenMax.to(blob, time, {
      ease: Power1.easeIn,
      bezier: bezier,
      ease: Power0.easeOut
    });
    TweenMax.to(blob, time, {
      pixi: { scaleX: scale[1], scaleY: scale[1] },
      onComplete: () => {
        this.fire.removeChild(blob);
        blob = null;
      }
    });
  }

  get time() {
    return 1 + Math.random() * 0.4;
  }

  set y(y) {
    this.flame.position.y = y;
  }
  set x(x) {
    this.flame.position.x = x;
  }
  set scale(s) {
    this.flame.scale.set(s);
  }
}

class Stage {
  app: any;
  stage: any;
  flamesContainer: any;
  flames = [];

  constructor(canvas: HTMLElement, pixelate = false, background = false) {
    this.app = new PIXI.Application(window.innerWidth, window.innerHeight, {
      antialias: true,
      backgroundColor: background ? 0x0f0f0f : 0x11111d
    });
    canvas.appendChild(this.app.view);

    this.stage = new PIXI.Container();
    this.flamesContainer = new PIXI.Container();

    if (background) {
      var background = PIXI.Sprite.fromImage(
        "https://assets.ste.vg/codepen/fire-background.png"
      );
      var light = PIXI.Sprite.fromImage(
        "https://assets.ste.vg/codepen/light.png"
      );

      this.add(background);
      this.add(light, this.flamesContainer);

      background.anchor.set(0.5);
      background.scale.set(0.8);
      background.position.y = -150;

      light.anchor.set(0.5);
      light.scale.set(1);
      light.position.y = 20;

      setInterval(() => {
        light.alpha = 0.3 + Math.random() * 0.2;
      }, 50);
    }

    this.add(this.stage, this.app.stage);
    this.add(this.flamesContainer);

    this.flamesContainer.scale.set(0.75);

    let flames = [
      { color: 0xe23b00, scale: 1, offset: -30 },
      { color: 0xfe8200, scale: 1, offset: -10 },
      { color: 0xfbe416, scale: 0.9, offset: 10 },
      { color: 0xfdfdb4, scale: 0.7, offset: 30 }
    ];

    let ember = new Ember([0xfe9c00, 0xfea600, 0xe27100], this.app, pixelate);
    this.add(ember.embers, this.flamesContainer);

    flames.map(settings => {
      let fire = new Fire(settings.color, this.app, pixelate);
      this.flames.push(fire);
      fire.y = settings.offset;
      fire.scale = settings.scale;
      fire.flame.pivot.set(0, 10);

      this.add(fire.flame, this.flamesContainer);
    });

    this.onResize();
    let f = this.flames.map(fire => fire.flame);
    f.pop();
    this.stokeAnimation = new TimelineMax();
    this.stokeAnimation.to(f, 0.3, {
      ease: Power2.easeOut,
      pixi: { scaleY: 1.2, scaleX: 1.15 }
    });
    this.stokeAnimation.to(f, 1.4, {
      ease: Bounce.easeOut,
      pixi: { scaleY: 1, scaleX: 1 }
    });
    this.stokeAnimation.stop();

    window.addEventListener("resize", e => {
      this.onResize();
    });
    window.addEventListener("click", e => {
      ember.stoke();
      this.stokeAnimation.restart();
    });
  }

  onResize = function() {
    this.app.renderer.resize(window.innerWidth, window.innerHeight);
    this.stage.position.x = window.innerWidth / 2;
    this.stage.position.y = window.innerHeight * 0.75;
  };

  add = function(element: any, container = this.stage) {
    container.addChild(element);
  };

  remove = function(element: any, container = this.stage) {
    container.removeChild(element);
  };
}

let stage = new Stage(document.getElementById("canvas"), pixelate, background);
