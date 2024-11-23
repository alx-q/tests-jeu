import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import * as me from 'melonjs';

@Component({
  selector: 'app-melon',
  standalone: true,
  imports: [],
  templateUrl: './melon.component.html',
  styleUrl: './melon.component.css'
})
export class MelonComponent {
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement> | undefined;

  ngAfterViewInit() {
    me.device.onReady(() => {
      me.video.init(800, 600, { parent: this.canvas!.nativeElement });
      this.loadResources();
    });
  }

  loadResources() {
    // Register scenes
    me.state.set(1, new MainMelonScene());
    me.state.set(2, new AssetsMelonScene());
    me.state.set(3, new InterfaceMelonScene());
    me.state.set(4, new RenderingMelonScene());
    me.state.set(5, new ControlsMelonScene());
    me.state.set(6, new DeplacementMelonScene());
    me.state.set(7, new CollisionMelonScene());
    me.state.set(8, new ParticulesMelonScene());
    me.state.set(9, new SonsMelonScene());

    // Start with the main scene
    me.state.change(1, true);
  }



  runGame(name: string) {
    switch (name) {
      case "MainMelonScene":
        me.state.change(1, true);
        break;
      case "AssetsMelonScene":
        me.state.change(2, true);
        break;
      case "InterfaceMelonScene":
        me.state.change(3, true);
        break;
      case "RenderingMelonScene":
        me.state.change(4, true);
        break;
      case "ControlsMelonScene":
        me.state.change(5, true);
        break;
      case "MovementMelonScene":
        me.state.change(6, true);
        break;
      case "CollisionMelonScene":
        me.state.change(7, true);
        break;
      case "ParticulesMelonScene":
        me.state.change(8, true);
        break;
      case "SonsMelonScene":
        me.state.change(9, true);
        break;
    }
  }

}

class MainMelonScene extends me.Stage {
  override onResetEvent() {
    me.game.world.backgroundColor.parseCSS('#202020');

    me.game.world.addChild(new me.Text(100, 100, {
      font: 'Arial',
      size: 24,
      fillStyle: '#ffffff',
      textBaseline: 'left',
      textAlign: 'left',
      text: 'Hello World! Melon!'
    }));

    me.game.world.addChild(new me.Text(100, 170, {
      font: 'Arial',
      size: 24,
      fillStyle: '#ffffff',
      textBaseline: 'left',
      textAlign: 'left',
      text: 'Selectionner l\'une des options si-dessus'
    }));
  }

  override onDestroyEvent() {
    // Cleanup your main scene
  }
}


class AssetsMelonScene extends me.Stage {
  override onResetEvent() {
    const resources = [
      { name: "imagePng", type: "image", src: "assets/test.png" },
      { name: "imageJpg", type: "image", src: "assets/test.jpg" },
      { name: "imageBmp", type: "image", src: "assets/test.bmp" },
      { name: "imageGif", type: "image", src: "assets/test.gif" }
    ];
    me.loader.preload(resources, this.loaded.bind(this));
  }

  loaded() {
    let imagePng = new me.Sprite(70, 70, { image: me.loader.getImage("imagePng") });
    let imageJpg = new me.Sprite(350, 70, { image: me.loader.getImage("imageJpg") });
    let imageBmp = new me.Sprite(70, 300, { image: me.loader.getImage("imageBmp") });
    let imageGif = new me.Sprite(350, 300, { image: me.loader.getImage("imageGif") });

    imagePng.anchorPoint.set(0, 0)
    imageJpg.anchorPoint.set(0, 0)
    imageBmp.anchorPoint.set(0, 0)
    imageGif.anchorPoint.set(0, 0)

    me.game.world.addChild(new me.Text(25, 25, {
      font: 'Arial',
      size: 16,
      fillStyle: '#ffffff',
      textBaseline: 'left',
      textAlign: 'left',
      text: 'Test Chargement des assets Melon'
    }));

    me.game.world.addChild(imagePng);
    me.game.world.addChild(imageJpg);
    me.game.world.addChild(imageBmp);
    me.game.world.addChild(imageGif);

    me.game.world.backgroundColor.setColor(255, 255, 255, 0);
  }

  override onDestroyEvent() {

  }
}

class InterfaceMelonScene extends me.Stage {
  textInfo: me.Text | undefined;
  override onResetEvent() {
    const resources = [
      { name: "play", type: "image", src: "/assets/buttons/png/Rect-Light-Default/Play.png" },
      { name: "pause", type: "image", src: "/assets/buttons/png/Square-Light-Default/Pause.png" },
      { name: "sound", type: "image", src: "/assets/buttons/png/Square-Light-Default/Sound-Three.png" },
    ];
    me.loader.preload(resources, this.loaded.bind(this));
  }

  loaded() {
    me.game.world.addChild(new me.Text(25, 25, {
      font: 'Arial',
      size: 16,
      fillStyle: '#ffffff',
      textBaseline: 'left',
      textAlign: 'left',
      text: 'Text Interactivité Melon'
    }));

    this.textInfo = new me.Text(400, 300, {
      font: 'Arial',
      size: 24,
      fillStyle: '#ffffff',
      textBaseline: 'left',
      textAlign: 'center',
      text: 'Cliquer sur un bouton'
    });
    this.textInfo.anchorPoint.set(0, 0)

    let btnPlay = new Button(350, 450, this.clickTxt)
    let btnPause = new Button(735, 15, this.clickTxt)
    let btnSound = new Button(675, 15, this.clickTxt)

    btnPlay.anchorPoint.set(0, 0)
    btnPause.anchorPoint.set(0, 0)
    btnSound.anchorPoint.set(0, 0)

    me.game.world.addChild(btnPlay);
    me.game.world.addChild(btnPause);
    me.game.world.addChild(btnSound);
    me.game.world.addChild(this.textInfo);

    me.game.world.addChild(btnPlay);

    me.game.world.backgroundColor.setColor(255, 255, 255, 0);
  }

  clickTxt() {
    this.textInfo!.setText('Button Clicked!');
  }

  override onDestroyEvent() {

  }
}


class Button extends me.UITextButton {
  public onClickHandler: any;
  constructor(x: number, y: number, onClickHandler: any) {
    super(x, y, {
      text: 'Play',
      borderWidth: 200,
      borderHeight: 20,
      backgroundColor: '#00aa0080',
      hoverColor: '#00ff00ff'
    });
    this.anchorPoint.set(0.5, 0.5);
    this.onClickHandler = onClickHandler;
  }
  override onClick() {
    this.onClickHandler();
    return true;
  }
}

class RenderingMelonScene extends me.Stage {
  override onResetEvent() {
    const resources = [
      { name: "panneaux", type: "image", src: "/assets/city/cityfirstprops/stroke1.png" },
      { name: "routes", type: "image", src: "/assets/city/citysecondprops/strokecitysecondcityprops0001.png" },
      { name: "vehicules", type: "image", src: "/assets/city/vehicles/vehicles0007.png" },
    ];
    me.loader.preload(resources, this.loaded.bind(this));
  }

  loaded() {
    me.game.world.addChild(new me.Text(25, 25, {
      font: 'Arial',
      size: 16,
      fillStyle: '#ffffff',
      textBaseline: 'left',
      textAlign: 'left',
      text: 'Test Rendering des sprites Melon'
    }));

    me.game.world.addChild(new me.Sprite(70, 70, { image: me.loader.getImage("vehicules") }));

    var textureAtlas = new me.video.renderer.Texture(
      { framewidth: 200, frameheight: 200 },
      me.loader.getImage("vehicules")
    );

    var region = textureAtlas.getRegion(1315, 1825, 200, 200);
    var sprite = new me.Sprite(0, 0, { image: region });

    me.game.world.addChild(sprite);

    me.game.world.backgroundColor.setColor(255, 255, 255, 0);
  }

  override onDestroyEvent() {

  }
}


class ControlsMelonScene extends me.Stage {
  text: me.Text | undefined;

  override onResetEvent() {
    me.input.bindKey(me.input.KEY.LEFT, "left");
    me.input.bindKey(me.input.KEY.RIGHT, "right");
    me.input.bindKey(me.input.KEY.UP, "up");
    me.input.bindKey(me.input.KEY.DOWN, "down");
    me.input.bindKey(me.input.KEY.SPACE, "space");

    me.game.world.addChild(new me.Text(25, 25, {
      font: 'Arial',
      size: 16,
      fillStyle: '#ffffff',
      textBaseline: 'left',
      textAlign: 'left',
      text: 'Test Controles Melon'
    }));

    this.text = new me.Text(400, 300, {
      font: 'Arial',
      size: 16,
      fillStyle: '#ffffff',
      textBaseline: 'center',
      textAlign: 'center',
      text: 'Cliquer sur une touche'
    });

    me.game.world.addChild(this.text)
  }

  override update() {
    if (me.input.isKeyPressed("left")) {
      this.text?.setText("LEFT Key")
    } else if (me.input.isKeyPressed("right")) {
      this.text?.setText("RIGHT Key")
    } else if (me.input.isKeyPressed("down")) {
      this.text?.setText("DOWN Key")
    } else if (me.input.isKeyPressed("up")) {
      this.text?.setText("UP Key")
    } else if (me.input.isKeyPressed("space")) {
      this.text?.setText("SPACE Key")
    } else {
      this.text?.setText("Cliquer sur une touche")
    }
    return true;
  }

  override onDestroyEvent() {

  }
}


class DeplacementMelonScene extends me.Stage {
  objet: me.Sprite | undefined;
  override onResetEvent() {
    const resources = [
      { name: "objet", type: "image", src: "/assets/buttons/png/Square-Light-Default/Podium.png" },
    ];

    me.game.world.addChild(new me.Text(25, 25, {
      font: 'Arial',
      size: 16,
      fillStyle: '#ffffff',
      textBaseline: 'left',
      textAlign: 'left',
      text: 'Test Deplacement Melon'
    }));
    me.loader.preload(resources, this.loaded.bind(this));
  }

  loaded() {
    this.objet = new me.Sprite(100, 100, {
      image: "objet"
    });

    me.game.world.addChild(this.objet);

    setInterval(() => {
      this.objet!.pos.set(Math.floor(Math.random() * 301), Math.floor(Math.random() * 301));
    }, 500)
  }
}


class CollisionMelonScene extends me.Stage {
  override onResetEvent() {
    me.game.world.addChild(new me.Text(25, 25, {
      font: 'Arial',
      size: 16,
      fillStyle: '#ffffff',
      textBaseline: 'left',
      textAlign: 'left',
      text: 'Test Collision Melon'
    }));
  }
}


class ParticulesMelonScene extends me.Stage {
  particleEmitter: me.ParticleEmitter | undefined;

  override onResetEvent() {
    const resources = [
      { name: "particule", type: "image", src: "/assets/buttons/png/Square-Light-Default/Podium.png" },
    ];
    me.loader.preload(resources, this.loaded.bind(this));
  }

  loaded() {
    me.game.world.addChild(new me.Text(25, 25, {
      font: 'Arial',
      size: 16,
      fillStyle: '#ffffff',
      textBaseline: 'left',
      textAlign: 'left',
      text: 'Test Particules Melon'
    }));

    /*this.particleEmitter = new me.ParticleEmitter(400, 300, {
      width: 10,
      height: 10,
      image: me.loader.getImage("particule"),
      totalParticles: 100,
      angle: 0,
      angleVariation: Math.PI * 2,
      speed: 2,
      speedVariation: 1,
      minLife: 1000,
      maxLife: 3000,
      gravity: 0.1,
      frequency: 100
    });

    me.game.world.addChild(this.particleEmitter);

    this.particleEmitter.streamParticles();
    */
  }

  override update(dt: any) {
    /*this.particleEmitter!.update(dt);*/
    return true;
  }
}

class SonsMelonScene extends me.Stage {
  override onResetEvent() {
    me.game.world.addChild(new me.Text(25, 25, {
      font: 'Arial',
      size: 16,
      fillStyle: '#ffffff',
      textBaseline: 'left',
      textAlign: 'left',
      text: 'Test Sons Melon'
    }));

    me.audio.init("mp3,ogg");

    const resources = [
      { name: "musique", type: "audio", src: "/sound/"},
    ];
    me.loader.preload(resources, this.loaded.bind(this));

    
  }

  loaded() {
    me.audio.play("musique", true);
  }
}
