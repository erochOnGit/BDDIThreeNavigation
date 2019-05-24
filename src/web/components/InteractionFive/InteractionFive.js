import Interaction from "../ThreeContainer/Interaction";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as dat from 'dat.gui';
import fontFile from '../../assets/Fonts/made_canvas/MADE Canvas_Regular.jsonn';

//OBJECT
import Landscape from "./Landscape/Landscape";
import fleur4 from "src/web/assets/meshs/flower4.glb";
import GlowSphere from "./GlowSphere/GlowSphere";

//TEXTURES
import imgColor from "./Textures/paper_texture_10.png"
import imgMap from "./Textures/paper_texture_10_noemal.png"
import imgDisp from "./Textures/paper_texture_10_bump.png"

let smokeParticles = [];
let clock = new THREE.Clock();

export default class InteractionFive extends Interaction {
    constructor({ camera, scene }) {
        super();

        this.camera = camera;
        /**
         * objects
         */
        this.loading = 0;
        this.mixer;
        this.loader = new GLTFLoader();

        //LANDSCAPE
        this.landscape = new Landscape();
        this.objects.push(this.landscape);

        //GLOW SPHERE
        this.glowSphere = new GlowSphere({ camera: this.camera });
        this.objects.push(this.glowSphere);

        //TEXT
        let fontLoads = new THREE.FontLoader();
        console.log(fontLoads, fontFile)
        fontLoads.load( fontFile, ( font ) => {
            this.titleText = new THREE.TextGeometry( 'R E B O R N', {font: font, size: 1, height: .2,} );
            this.fontMat = new THREE.MeshBasicMaterial({ color: 0xffffff ,transparent:true});
            this.fontMesh = new THREE.Mesh(this.titleText, this.fontMat);
            this.objects.push( {mesh:this.fontMesh} );
            this.fontMesh.position.set(-3.2,-1.5,-4.5);
            this.fontMesh.rotation.x = .4;
        });

        /*    var geometry = new THREE.SphereBufferGeometry( 1, 32, 32 );
            var material = new THREE.MeshBasicMaterial( {color: 0x0000ff, transparent: true, opacity: 0.5} );
            this.sphere = new THREE.Mesh( geometry, material );
            this.objects.push({ mesh: this.sphere });*/

        // loader.load(
        //   fleur4,
        //   gltf => {
        //     // called when the resource is loaded
        //     const model = gltf.scene;
        //     var material2 = new THREE.MeshLambertMaterial({ color: 0xa65e00 });
        //     for (let i = 0; i < gltf.scene.children.length; i++) {
        //       gltf.scene.children[i].traverse(function(child) {
        //         if (child instanceof THREE.Mesh) {
        //           // apply custom material
        //           child.material = material2;
        //         }
        //       });
        //     }
        //     // gltf.scene.children.foreach(child => {
        //     //   // var material = new THREE.MeshFaceMaterial(materials);
        //     //   child.traverse(function(child) {
        //     //     if (child instanceof THREE.Mesh) {
        //     //       // apply custom material
        //     //       child.material = material2;
        //     //     }
        //     //   });

        //     this.objects.push({ mesh: model });
        //     // this.mixer = new THREE.AnimationMixer(model);
        //     // gltf.animations.forEach(clip => {
        //     //   this.mixer.clipAction(clip).play();
        //     // });
        //     // });
        //   },
        //   xhr => {
        //     // called while loading is progressing
        //     console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
        //     this.loading = (xhr.loaded / xhr.total) * 100;
        //   },
        //   error => {
        //     // called when loading has errors
        //     console.error("An error happened", error);
        //   }
        // );


        /**
         * smoke
         */

        let colorSmoke =  '#500050' ;

        THREE.ImageUtils.crossOrigin = ''; //Need this to pull in crossdomain images from AWS
        let light = new THREE.DirectionalLight(0xffffff,0.5);
        light.position.set(-1,0,1);

        let smokeTexture = THREE.ImageUtils.loadTexture('https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/Smoke-Element.png');
        let smokeMaterial = new THREE.MeshLambertMaterial({color: colorSmoke, opacity:.4, map: smokeTexture,alphaTest:0.1, transparent: true});
        let smokeGeo = new THREE.PlaneGeometry(13,8);

        for (let p = 0; p < 150; p++) {
            let particle = new THREE.Mesh(smokeGeo,smokeMaterial);
            particle.position.set(Math.random()*2-1.5,Math.random()*2-7.5,Math.random()*1.1-1);
            particle.rotation.x = -.3;
            particle.rotation.z = Math.random() * 2.5;
            //scene.add(particle);
            this.objects.push({mesh:particle})
            smokeParticles.push(particle);
        }


        /**
         * lights
         */
        this.ambientLight = new THREE.AmbientLight(0x404040); // soft white light
        this.lights.push(this.ambientLight);


        let sphereSize = 0.1;
        this.pointLight = new THREE.PointLight(0x03E2FF, 1.6, 23); //Cyan center 35%
        this.lights.push(this.pointLight);
        //this.pointLight.position.set(-.5,1.5,.5)
        this.pointLight.position.set(2,.4,.56)

        this.pointLightHelper = new THREE.PointLightHelper(this.pointLight, sphereSize);
        //this.objects.push({ mesh: this.pointLightHelper });


        this.pointLightCircle = new THREE.PointLight(0x002BFF, 2.5, 5); //Blue back
        this.lights.push(this.pointLightCircle);
        this.pointLightCircle.position.set(1,.6,.8)

        this.pointLightCircleHelper = new THREE.PointLightHelper(this.pointLightCircle, sphereSize);
        //this.objects.push({ mesh: this.pointLightCircleHelper });


        this.pointLightPurp = new THREE.PointLight(0x8000FF, 1, 100); //Purple front
        this.lights.push(this.pointLightPurp);
        this.pointLightPurp.position.set(.6,-1,-.9)

        this.pointLightPurpHelper = new THREE.PointLightHelper(this.pointLightPurp, sphereSize);
        //this.objects.push({ mesh: this.pointLightPurpHelper });


        /**
         * events
         */

        /**
         * loadingGltf
         */
        this.loadingGltf.push({
            loader: this.loader,
            glb: fleur4,
            success: success => gltf => {
                // called when the resource is loaded
                this.model = gltf.scene;
                //console.log('Animation', gltf.animations)
                let textureLoader = new THREE.TextureLoader();
                let texture = textureLoader.load(imgMap);
                let textureColor = textureLoader.load(imgColor);
                let textureDisp = textureLoader.load(imgDisp);
                let material2 = new THREE.MeshPhongMaterial({
                    color: '#dc5aa4',
                    emissive:'0x6b45a0',
                    specular:'0x2968c3',
                    shininess:'100',
                    //normalMap: textureDisp,
                    map: textureColor,
                    displacementMap: texture,
                    displacementScale: 1,
                    normalScale: new THREE.Vector2(1, 1)
                }); // 0xa65e00 Yel
                for (let i = 0; i < gltf.scene.children.length; i++) {
                    gltf.scene.children[i].traverse(function(child) {
                        if (child instanceof THREE.Mesh) {
                            child.material = material2;
                        }
                    });
                }
                this.model.rotation.x = .67;//.2
                this.model.rotation.y = .3;
                this.model.position.z = -2;
                this.model.scale.set(.6,.6,.6)
                this.objects.push({ mesh: this.model });
                this.parameters(this.model);
                this.registerEvents(this.model, this.fontMesh);
                success();
            },
            pending: xhr => {
                // called while loading is progressing
                console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
            },
            error: error => {
                // called when loading has errors
                console.error("An error happened", error);
            }
        });

    }

    registerEvents(model, flower) {
        document.querySelector('body').addEventListener( "mousemove", function( event ) {
            const x = ((event.pageX - (window.innerWidth / 2)) / (window.innerWidth / 2)) * 10;
            const y = ((event.pageY - (window.innerHeight / 2)) / (window.innerHeight / 2)) * 5;
            model.rotation.set((x/75)+0.75,(y/10)+0.3,0);
            model.position.set(x/100,.67,(-y/100)-1.8);
            console.log(this.fontMesh)
            flower.rotation.set((x/150),(y/150),0);
            flower.position.set((x/100)-3.3,-1.5,-4.5);
        });
    }



    evolveSmoke(delta) {
        let sp = smokeParticles.length;
        while(sp--) {
            smokeParticles[sp].rotation.z += (delta * 0.1);
        }
    }

    update(time) {
        //LANDSCAPE ANIMATION
        let delta = clock.getDelta();
        this.evolveSmoke(delta);
        this.landscape.update();
        if (this.mixer != undefined) this.mixer.update(time);

        /*this.pointLight.position.x = Math.cos(time * 0.329) * 1;
        this.pointLight.position.y = Math.sin(time * 0.283) * 1;
        this.pointLight.position.z = Math.sin(time * 0.474) * 0.1;
        this.pointLightCircle.position.x = Math.cos(time * -0.474) * 1.6;
        this.pointLightCircle.position.y = Math.sin(time * -0.474) * 1.6;*/

        this.model.position.y = Math.sin(time * -0.674) * .1;

    }

    parameters(model) {
        //Gui

        console.log(this.ambientLight)
        let gui = new dat.GUI();
        //gui.addColor(palette, 'color1');
        let Light = gui.addFolder('Light');
        let poslight1 = Light.addFolder('Light1');
        poslight1.add(this.pointLight.position, 'x', -2, 2).listen();
        poslight1.add(this.pointLight.position, 'y', -2, 2).listen();
        poslight1.add(this.pointLight.position, 'z', -2, 2).listen();
        poslight1.add(this.pointLight, 'distance', 0, 30).listen();
        poslight1.add(this.pointLight, 'intensity', 0, 5).listen();
        //poslight1.addColor(this.pointLight.color, 'r').onChange(setValue);
        let poslight2 = Light.addFolder('Light2');
        poslight2.add(this.pointLightCircle.position, 'x', -2, 2).listen();
        poslight2.add(this.pointLightCircle.position, 'y', -2, 2).listen();
        poslight2.add(this.pointLightCircle.position, 'z', -2, 2).listen();
        poslight2.add(this.pointLightCircle, 'distance', 0, 30).listen();
        poslight2.add(this.pointLightCircle, 'intensity', 0, 5).listen();
        let poslight3 = Light.addFolder('Light3');
        poslight3.add(this.pointLightPurp.position, 'x', -2, 2).listen();
        poslight3.add(this.pointLightPurp.position, 'y', -2, 2).listen();
        poslight3.add(this.pointLightPurp.position, 'z', -2, 2).listen();
        poslight3.add(this.pointLightPurp, 'distance', 0, 30).listen();
        poslight3.add(this.pointLightPurp, 'intensity', 0, 5).listen();

        let Camera = gui.addFolder('Camera');
        let rotCamera = Camera.addFolder('Rotation');
        rotCamera.add(this.camera.rotation, 'x', -1, 1).listen();
        rotCamera.add(this.camera.rotation, 'y', -1, 1).listen();
        rotCamera.add(this.camera.rotation, 'z', -1, 1).listen();
        rotCamera.add(this.camera.position, 'x', -10, 10).listen();
        rotCamera.add(this.camera.position, 'y', -10, 10).listen();
        rotCamera.add(this.camera.position, 'z', -10, 10).listen();

        let Model = gui.addFolder('Model');
        let posModel = Model.addFolder('Position');
        posModel.add(model.position, 'x', -2, 2).listen();
        posModel.add(model.position, 'y', -2, 2).listen();
        posModel.add(model.position, 'z', -2, 2).listen();
        let rotModel = Model.addFolder('Rotation');
        rotModel.add(model.rotation, 'x', 0, 3).listen();
        rotModel.add(model.rotation, 'y', -2, 2).listen();
        rotModel.add(model.rotation, 'z', -2, 2).listen();
        let scalModel = Model.addFolder('Scale');
        scalModel.add(model.scale, 'x', 0, 2).listen();
        scalModel.add(model.scale, 'y', 0, 2).listen();
        scalModel.add(model.scale, 'z', 0, 2).listen();
        let colModel = Model.addFolder('Color');
        let conf = { color : '#ff9fd6' };
        colModel.addColor(conf, 'color').onChange( function(colorValue) {
            for (let i = 0; i < model.children.length; i++) {
                model.children[i].traverse(function(child) {
                    if (child instanceof THREE.Mesh) {
                        child.material.color.set(colorValue);
                    }
                });
            }
        });
        colModel.addColor(conf, 'color').onChange( (value) => {
            this.ambientLight.color.set(value)
        });

        //poslight3.add(this.pointLight.position, 'x', -10, 10).listen();
        //poslight3.add(this.pointLight.position, 'y', -10, 10).listen();
        //poslight3.add(this.pointLight.position, 'z', -10, 10).listen();

    }
}
