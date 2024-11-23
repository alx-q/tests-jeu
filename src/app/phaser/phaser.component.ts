import { Component } from '@angular/core';
import Phaser, { Scene } from 'phaser';

@Component({
  selector: 'app-phaser',
  standalone: true,
  imports: [],
  templateUrl: './phaser.component.html',
  styleUrl: './phaser.component.css'
})
export class PhaserComponent {
  game: Phaser.Game | undefined;

  ngOnInit(): void {
    this.runGame("MainPhaserScene")
  }

  ngOnDestroy() {
    if (this.game) {
      this.game.destroy(true);
    }
  }

  runGame(name: string) {
    if (this.game) {
      this.game.destroy(true);
    }

    let scene = MainPhaserScene

    switch (name) {
      case "MainPhaserScene":
        scene = MainPhaserScene;
        break;
      case "AssetsPhaserScene":
        scene = AssetsPhaserScene;
        break;
      case "InterfacePhaserScene":
        scene = InterfacePhaserScene;
        break;
      case "RenderingPhaserScene":
        scene = RenderingPhaserScene;
        break;
      case "ControlsPhaserScene":
        scene = ControlsPhaserScene;
        break;
      case "MovementPhaserScene":
        scene = MovementPhaserScene;
        break;
      case "CollisionPhaserScene":
        scene = CollisionPhaserScene;
        break;
      case "ParticulesPhaserScene":
        scene = ParticulesPhaserScene;
        break;
      case "SonsPhaserScene":
        scene = SonsPhaserScene;
        break;
    }

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 },
          debug: false
        }
      },
      scene: [
        scene
      ]
    };

    this.game = new Phaser.Game(config);
  }
}

class MainPhaserScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainPhaserScene' });
  }

  preload() {
  }

  create() {
    this.add.text(80, 100, 'Hello World! Phaser', {
      font: '32px Arial',
      color: '#ffffff'
    });

    this.add.text(80, 150, 'Selectionner l\'une des options si dessus', {
      font: '32px Arial',
      color: '#ffffff'
    });
  }

  override update() {
  }
}

class AssetsPhaserScene extends Phaser.Scene {
  constructor() {
    super({ key: 'AssetsPhaserScene' });
  }

  preload() {
    this.load.image('png', '/assets/test.png');
    this.load.image('jpg', '/assets/test.jpg');
    this.load.image('bmp', '/assets/test.bmp');
    this.load.image('gif', '/assets/test.gif');
  }

  create() {
    this.add.text(25, 25, 'Tests Assets Phaser', {
      font: '16px Arial',
      color: '#ffffff'
    });

    let imgpng = this.add.image(25, 80, 'png');
    let imgjpg = this.add.image(25, 300, 'jpg');
    let imgbmp = this.add.image(300, 80, 'bmp');
    let imggif = this.add.image(300, 300, 'gif');

    imgpng.setOrigin(0, 0);
    imgjpg.setOrigin(0, 0);
    imgbmp.setOrigin(0, 0);
    imggif.setOrigin(0, 0);
  }

  override update() {
  }
}

class InterfacePhaserScene extends Phaser.Scene {
  constructor() {
    super({ key: 'InterfacePhaserScene' });
  }

  preload() {
    this.load.image('play', '/assets/buttons/png/Rect-Light-Default/Play.png');
    this.load.image('pause', '/assets/buttons/png/Square-Light-Default/Pause.png');
    this.load.image('sound', '/assets/buttons/png/Square-Light-Default/Sound-Three.png');
  }

  create() {
    this.add.text(25, 25, 'Test Interface Phaser', {
      font: '16px Arial',
      color: '#ffffff'
    });
    let playButton = this.add.image(350, 450, 'play').setInteractive().setOrigin(0, 0).setScale(1.2);
    let pauseButton = this.add.image(735, 15, 'pause').setInteractive().setOrigin(0, 0);
    let soundButton = this.add.image(675, 15, 'sound').setInteractive().setOrigin(0, 0);

    let text = this.add.text(270, 350, '', { fontSize: '32px', color: '#fff' });

    let titre = this.add.text(180, 150, 'Urban Chase', { font: '72px Arial', color: '#fff' });

    playButton.on('pointerdown', () => {
      text.setText('Play Clique');
    });
    playButton.on('pointerover', () => {
      playButton.setTint(0x93d800);
    });
    playButton.on('pointerout', () => {
      playButton.clearTint();
    });

    pauseButton.on('pointerdown', () => {
      text.setText('Pause Clique');
    });
    pauseButton.on('pointerover', () => {
      pauseButton.setTint(0x0097ff);
    });
    pauseButton.on('pointerout', () => {
      pauseButton.clearTint();
    });

    soundButton.on('pointerdown', () => {
      text.setText('Son Clique');
    });
    soundButton.on('pointerover', () => {
      soundButton.setTint(0xffd700);
    });
    soundButton.on('pointerout', () => {
      soundButton.clearTint();
    });
  }

  override update() {
  }
}

class RenderingPhaserScene extends Phaser.Scene {
  constructor() {
    super({ key: 'RenderingPhaserScene' });
  }

  preload() {
    this.load.image('panneaux', '/assets/city/cityfirstprops/stroke1.png');
    this.load.image('routes', '/assets/city/citysecondprops/strokecitysecondcityprops0001.png');
    this.load.image('vehicules', '/assets/city/vehicles/vehicles0007.png');
  }

  create() {
    this.add.text(25, 25, 'Tests Rendering Phaser', {
      font: '16px Arial',
      color: '#ffffff'
    });

    const texturesVehicules = this.textures.get('vehicules');
    texturesVehicules.add('voiture police', 0, 465, 1752, 245, 245); // x, y, width, height
    texturesVehicules.add('voiture', 0, 1315, 1825, 200, 200);

    const texturesRoutes = this.textures.get('routes');
    texturesRoutes.add('route droite', 0, 874, 746, 348, 186);

    const texturesPanneaux = this.textures.get('panneaux');
    texturesPanneaux.add('feu circulation', 0, 1100, 1550, 80, 500);

    this.add.sprite(300, 100, 'routes', 'route droite').setOrigin(0, 0).setScale(0.5);
    this.add.sprite(300, 168, 'routes', 'route droite').setOrigin(0, 0).setScale(0.5);
    this.add.sprite(300, 236, 'routes', 'route droite').setOrigin(0, 0).setScale(0.5);
    this.add.sprite(300, 304, 'routes', 'route droite').setOrigin(0, 0).setScale(0.5);
    this.add.sprite(300, 372, 'routes', 'route droite').setOrigin(0, 0).setScale(0.5);
    this.add.sprite(300, 440, 'routes', 'route droite').setOrigin(0, 0).setScale(0.5);

    this.add.sprite(395, 210, 'vehicules', 'voiture').setOrigin(0, 0).setScale(0.25);
    this.add.sprite(395, 400, 'vehicules', 'voiture police').setOrigin(0, 0).setScale(0.20);

    this.add.sprite(452, 50, 'panneaux', 'feu circulation').setOrigin(0, 0).setScale(0.2);
  }

  override update() {
  }
}

class ControlsPhaserScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ControlsPhaserScene' });
  }

  keytext: any

  preload() {
  }

  create() {
    this.add.text(25, 25, 'Tests Controles Phaser', {
      font: '16px Arial',
      color: '#ffffff'
    });

    this.add.text(400, 200, 'Appuyer sur les fleches, le A et ESPACE', { fontSize: '32px', color: '#fff' }).setOrigin(0.5);
    this.keytext = this.add.text(400, 300, '', { fontSize: '32px', color: '#fff' }).setOrigin(0.5);

    // Create key listeners
    this.input.keyboard!.on('keydown',
      (event: any) => {
        if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.UP) {
          this.keytext.setText("Touche UP");
        } else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.DOWN) {
          this.keytext.setText("Touche DOWN");
        } else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.LEFT) {
          this.keytext.setText("Touche LEFT");
        } else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.RIGHT) {
          this.keytext.setText("Touche RIGHT");
        } else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.A) {
          this.keytext.setText("Touche A");
        } else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.SPACE) {
          this.keytext.setText("Touche SPACE");
        } else {
          this.keytext.setText("Key Code: " + event.keyCode);
        }
      }
      , this);
    this.input.keyboard!.on('keyup',
      () => {
        this.keytext.setText("");
      }
      , this);
  }


  override update() {

  }
}

class MovementPhaserScene extends Phaser.Scene {
  route: Phaser.GameObjects.TileSprite | undefined;

  constructor() {
    super({ key: 'MovementPhaserScene' });
  }

  preload() {
    this.load.image('vehicules', '/assets/city/vehicles/vehicles0007.png');
    this.load.image('routes', '/assets/city/citysecondprops/strokecitysecondcityprops0001.png');
  }

  create() {
    this.add.text(25, 25, 'Tests Mouvements Phaser', {
      font: '16px Arial',
      color: '#ffffff'
    });

    const texturesVehicules = this.textures.get('vehicules');
    texturesVehicules.add('voiture', 0, 1315, 1825, 200, 200);

    const texturesRoutes = this.textures.get('routes');
    texturesRoutes.add('route droite', 0, 874, 746, 348, 136);


    this.route = this.add.tileSprite(410, 300, 348, 600, 'routes', 'route droite');

    let voiture = this.add.sprite(315, 400, 'vehicules', 'voiture').setOrigin(0, 0).setScale(1);
    this.physics.add.existing(voiture);
    let body = voiture.body as Phaser.Physics.Arcade.Body;
    body.setVelocity(0, -10);
  }

  override update() {
    this.route!.tilePositionY -= 2
  }
}


class CollisionPhaserScene extends Phaser.Scene {
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
  object: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;

  constructor() {
    super({ key: 'CollisionPhaserScene' });
  }

  preload() {
    this.load.image('1', '/assets/buttons/png/Square-Light-Default/Podium.png');
    this.load.image('2', '/assets/buttons/png/Square-Light-Default/Player.png');
  }

  create() {
    this.add.text(25, 25, 'Tests Collision Phaser', {
      font: '16px Arial',
      color: '#ffffff'
    });

    let texte = this.add.text(400, 200, 'Utiliser les fleches pour bouger', { fontSize: '24px', color: '#fff' }).setOrigin(0.5);


    this.player = this.physics.add.sprite(100, 100, '1');
    this.player.body.setCollideWorldBounds(true);
    this.object = this.physics.add.sprite(400, 300, '2');
    this.object.body.setCollideWorldBounds(true);
    this.object.body.setBounce(0)
    this.cursors = this.input.keyboard!.createCursorKeys();

    this.physics.add.collider(this.player, this.object, () => {
      texte.setText("COLLISION!")
    });
  }

  override update() {
    if (this.cursors!.left.isDown) {
      this.player!.setVelocityX(-160);
    } else if (this.cursors!.right.isDown) {
      this.player!.setVelocityX(160);
    } else {
      this.player!.setVelocityX(0);
    }

    if (this.cursors!.up.isDown) {
      this.player!.setVelocityY(-160);
    } else if (this.cursors!.down.isDown) {
      this.player!.setVelocityY(160);
    } else {
      this.player!.setVelocityY(0);
    }
  }
}

class ParticulesPhaserScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ParticulesPhaserScene' });
  }

  preload() {
    this.load.image('podium', '/assets/buttons/png/Square-Light-Default/Podium.png');
    this.load.image('vehicules', '/assets/city/vehicles/vehicles0007.png');
  }

  create() {
    this.add.text(25, 25, 'Tests Particules et Effets Speciaux Phaser', {
      font: '16px Arial',
      color: '#ffffff'
    });

    const texturesVehicules = this.textures.get('vehicules');
    texturesVehicules.add('voiture', 0, 1315, 1825, 200, 200);


    const emitter = this.add.particles(348, 300, 'podium', {
      x: { min: 0, max: 15 },
      y: 0,
      lifespan: 2000,
      speedY: { min: 200, max: 400 },
      scale: { start: 0.3, end: 0 },
      quantity: 1,
      blendMode: 'ADD'
    });

    const emitter2 = this.add.particles(452, 300, 'podium', {
      x: { min: 0, max: 15 },
      y: 0,
      lifespan: 2000,
      speedY: { min: 200, max: 400 },
      scale: { start: 0.3, end: 0 },
      quantity: 1,
      blendMode: 'ADD'
    });

    this.add.sprite(315, 120, 'vehicules', 'voiture').setOrigin(0, 0).setScale(1);
    
  }

  override update() {
  }
}

class SonsPhaserScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ParticulesPhaserScene' });
  }

  musiqueOn = true;

  preload() {
    this.load.image('musique', '/assets/buttons/png/Square-Light-Default/Music-On.png');
    this.load.image('effet', '/assets/buttons/png/Square-Light-Default/Star.png');

    this.load.audio('klaxon', '/sound/klaxon.mp3');
    this.load.audio('musique1', '/sound/musique.mp3');
  }

  create() {
    this.add.text(25, 25, 'Tests Sons Phaser', {
      font: '16px Arial',
      color: '#ffffff'
    });
    let effetButton = this.add.image(370, 450, 'effet').setInteractive().setOrigin(0, 0);

    this.add.text(400, 200, 'Ecoutez minutieusement la musique', { fontSize: '32px', color: '#fff' }).setOrigin(0.5);
    this.add.text(400, 300, 'Cliquer sur l\'etoile pour un effet', { fontSize: '32px', color: '#fff' }).setOrigin(0.5);

    let musique = this.sound.add('musique1', {
      loop: true,
      volume: 0.5
    });
    musique.play();

    let klaxon = this.sound.add('klaxon');

    effetButton.on('pointerdown', () => {
      klaxon.play()
    });
    effetButton.on('pointerover', () => {
      effetButton.setTint(0x0097ff);
    });
    effetButton.on('pointerout', () => {
      effetButton.clearTint();
    });
  }

  override update() {
  }
}


