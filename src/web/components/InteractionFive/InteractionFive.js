import Interaction from "../ThreeContainer/Interaction";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as dat from 'dat.gui';
import fontFile from '../../assets/Fonts/made_canvas/MADE Canvas_Regular.jsonn';
import { TweenMax } from "gsap/TweenMax";

//OBJECT
import Landscape from "./Landscape/Landscape";
import fleur4 from "src/web/assets/meshs/flowerBasis.glb"; //BEGIN SCALE 0.6
import GlowSphere from "./GlowSphere/GlowSphere";

import flower1 from "src/web/assets/meshs/flower1.glb";
import flower2 from "src/web/assets/meshs/flower2.glb";
import flower3 from "src/web/assets/meshs/flower3.glb";
import flower4 from "src/web/assets/meshs/flower4.glb";
import flower5 from "src/web/assets/meshs/flower5.glb";
import flower6 from "src/web/assets/meshs/flower6.glb";
import flower7 from "src/web/assets/meshs/flower7.glb";
import flower8 from "src/web/assets/meshs/flower8.glb";
import flower9 from "src/web/assets/meshs/flower9.glb";
import flower10 from "src/web/assets/meshs/flower10.glb";
import flower11 from "src/web/assets/meshs/flower11.glb";
import flowerFast from "src/web/assets/meshs/flowerFast.glb";

//TEXTURES
import imgColor from "./Textures/paper_texture.png"
import imgMap from "./Textures/paper_texture_10_noemal.png"
//import imgDisp from "./Textures/paper_texture_10_bump.png"

let smokeParticles = [];
let clock = new THREE.Clock();

export default class InteractionFive extends Interaction {
    constructor({ camera, scene, getUserData }) {
        super();

        this.getUserData = getUserData;
        this.float = false;
        this.rescale = false;
        this.camera = camera;
        this.tweening = false;
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
        // console.log(fontLoads, fontFile)
        fontLoads.load( fontFile, ( font ) => {
            this.titleText = new THREE.TextGeometry( 'R E B O R N', {font: font, size: 1, height: .2,} );
            this.fontMat = new THREE.MeshBasicMaterial({ color: 0xffffff ,transparent:true});
            this.fontMesh = new THREE.Mesh(this.titleText, this.fontMat);
            this.objects.push( {mesh:this.fontMesh} );
            this.fontMesh.position.set(-3.2,-1.5,-4.5);
            this.fontMesh.rotation.x = .4;
        });

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
         * tracking
         */
        this.trackings.push({
            start: () => {
                //console.log('Scene 5',this.getUserData());
                let score = 0;
                console.log(getUserData());
                for(let i=0; i<4; i++) {
                    score += this.getUserData()[i].movemento;
                    console.log('Your add: ', score)
                }
                console.log('Your score: ', score)

                let score0 = this.getUserData()[0].movemento;
                let score1 = this.getUserData()[1].movemento;
                let score2 = this.getUserData()[2].movemento;
                let score3 = this.getUserData()[3].movemento;

                let globalScore = score0 + score1 + score2 + score3;

                console.log('Global score: ', globalScore)

                let numberScore = document.createElement("div");
                numberScore.innerHTML = globalScore;
                numberScore.classList.add('global-score');
                document.querySelector('body').appendChild(numberScore);



                //FLOWER CHOICE
                let arrayFlower = [flower1,flower2,flower3,flower4,flower5,flower6,flower7,flower8,flower9,flower10,flower11];
                this.modelFlower;

                if(this.getUserData()[0].movemento < 10) {
                    this.modelFlower = flowerFast;
                } else {
                    this.modelFlower = arrayFlower[Math.floor(Math.random()*arrayFlower.length)];
                }
                this.loadingGltf[0].glb = this.modelFlower
            },
            stop: () => {}
        });

        /**
         * loadingGltf
         */

        this.loadingGltf.push({
            loader: this.loader,
            glb: this.modelFlower,
            success: success => gltf => {
                // called when the resource is loaded
                this.model = gltf.scene;
                //console.log('Animation', gltf.animations)
                let textureLoader = new THREE.TextureLoader();
                //let texture = textureLoader.load(imgMap);
                let textureColor = textureLoader.load(imgColor);
                //let textureDisp = textureLoader.load(imgDisp);
                let material2 = new THREE.MeshPhongMaterial({
                    color: '#dc5aa4',
                    emissive:'0x6b45a0',
                    specular:'0x2968c3',
                    shininess:'100',
                    //normalMap: textureDisp,
                    map: textureColor,
                    //displacementMap: texture,
                    //displacementScale: 1,
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
                this.model.position.y = 0;

                //this.model.scale.set(.006,.006,.006)
                //this.objects.push({ mesh: this.model });
                this.objects.push({ mesh: this.model });
                //this.parameters(this.model);
                this.registerEvents(this.model, this.fontMesh, getUserData);

                this.videoCont = document.querySelector('.video-container');
                this.videoPlayer = document.querySelector('.video-player');
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

    registerEvents(model, fontMesh, data) {
        /*document.querySelector('.skip-icon').addEventListener("click", ()=> {
            console.log('Model',model)

            //Apparition flower
            TweenMax.from(model.rotation,4,{y:-5,ease:Circ.easeInOut})
            TweenMax.from(model.position,4,{y:5,ease:Circ.easeInOut})
            for(let i=0; i<28;i++) {
                TweenMax.from(model.children[i].scale, 4, {x: 0.2, y: 0.2, y: 0.2, ease: Back.easeInOut.config(1.4)});
            }
            setTimeout(()=> {
                this.float = true;
            },4000)
        })*/

        document.querySelector('body').addEventListener( "mousemove", ( event ) => {
            const x = ((event.pageX - (window.innerWidth / 2)) / (window.innerWidth / 2)) * 10;
            const y = ((event.pageY - (window.innerHeight / 2)) / (window.innerHeight / 2)) * 5;

            if(this.float == true) {
                TweenMax.to(model.rotation, .2, {x: (x / 75) + 0.75, y: (y / 10) + 0.3, z: 0, ease: Circ.easeInOut})
                TweenMax.to(model.position, .2, {x: (x / 100), y: 0, z: (-y / 100) - 1.8, ease: Circ.easeInOut})
                TweenMax.to(fontMesh.rotation, .2, {x: (x / 150), y: (y / 150), z: 0, ease: Circ.easeInOut})
                TweenMax.to(fontMesh.position, .2, {x: (x / 100) - 3.3, y: -1.5, z: -4.5, ease: Circ.easeInOut})
            }
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

        //APARITION FLOWER AFTER MOTION REMOVE
        if(!this.tweening && (this.videoPlayer && this.videoPlayer.style.opacity > '.2' || this.videoCont && this.videoCont.style.opacity > '.2')) {

            //Apparition flower
            TweenMax.from(this.model.rotation,4,{y:-5,ease:Circ.easeInOut})
            TweenMax.from(this.model.position,4,{y:5,ease:Circ.easeInOut})

            if(this.model.children.length < 16) { //FAST FLOWER
                for(let i=0; i<13;i++) {
                    TweenMax.from(this.model.children[i].scale, 4, {x: 0.2, y: 0.2, y: 0.2, ease: Back.easeInOut.config(1.4)});
                }
            } else { //CHOICE FLOWER
                for(let i=0; i<28;i++) {
                    TweenMax.from(this.model.children[i].scale, 4, {x: 0.2, y: 0.2, y: 0.2, ease: Back.easeInOut.config(1.4)});
                }
            }


            //RESCALE FLOWER WITH DATA
            setTimeout(()=> {
                this.rescale = true;
            },2000)

            //ACTIVE FLOATING FLOWER
            setTimeout(()=> {
                this.float = true;
            },4000)

            this.tweening = true;
        }

        //RESCALE FLOWER WITH DATA
        if(this.rescale == true) {

            let scoreInt1 = this.getUserData()[0].movemento
            let scaleScore;
            let scaleScoreSec;


            //SCORE IMPACT SCALE
            if(scoreInt1 < 5) {
                console.log('inf a 5');
                scaleScore = 1
            }
            else if (scoreInt1 < 15){
                console.log('sup a 5');
                scaleScore = 1.15
                scaleScoreSec = 1.05
            }
            else if (scoreInt1 < 30){
                console.log('sup a 5');
                scaleScore = 1.05
                scaleScoreSec = 1.15
            }
            else if (scoreInt1 < 50){
                console.log('sup a 5');
                scaleScore = 1.1
                scaleScoreSec = 1.1
            }

            console.log('score',scoreInt1)
            console.log('scale',scaleScore)

            //FAST FLOWER
            if(this.model.children.length < 16) {
                for(let i=0; i<13;i++) {
                    TweenMax.to(this.model.children[i].scale, 3, {x: scaleScore, y: scaleScore, y: scaleScore, ease: Back.easeInOut.config(1.4)});
                }
            }
            //CHOICE FLOWER
            else {
                for(let i=0; i<13;i++) {
                    TweenMax.to(this.model.children[i].scale, 3, {x: scaleScore, y: scaleScore, y: scaleScore, ease: Back.easeInOut.config(1.4)});
                }
                for(let i=14; i<25;i++) {
                    TweenMax.to(this.model.children[i].scale, 3, {x: scaleScoreSec, y: scaleScoreSec, y: scaleScoreSec, ease: Back.easeInOut.config(1.4)});
                }
            }

            this.rescale = false
        }

        //ACTIVE FLOATING FLOWER
        if(this.float == true) {
            //this.model.position.y -= Math.sin(time * -0.674) * .0085;
            this.model.position.y -= Math.sin(time * -0.374) * .0065;
        }
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
        /*let colModel = Model.addFolder('Color');
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
        });*/

        //poslight3.add(this.pointLight.position, 'x', -10, 10).listen();
        //poslight3.add(this.pointLight.position, 'y', -10, 10).listen();
        //poslight3.add(this.pointLight.position, 'z', -10, 10).listen();

    }
}
