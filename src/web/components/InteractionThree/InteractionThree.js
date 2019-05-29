import Interaction from "../ThreeContainer/Interaction";
import Simplex from "perlin-simplex";
import Ring from "./Ring/Ring";
import dat from "dat.gui";
import Microphone from "./Microphone/Microphone";
import Landscape from "./Landscape/Landscape";
import Stem from "./Stem/Stem";

export default class InteractionThree extends Interaction {
  constructor() {
    super();

    /**
     * objects
     */
    this.rings = [];

    this.firstTubeSimplex = new Simplex();
    this.secondTubeSimplex = new Simplex();
    this.thirdTubeSimplex = new Simplex();
    this.fourthTubeSimplex = new Simplex();
    for (let i = 0; i < 15; i++) {
      let ring = new Ring({
        innerRadius: 1,
        radius: 1.05,
        segment: 256,
        wireframe: false,
        // seed: i * 0.008,
        ondulaire: i * 0.05,
        tubulaire: i * 0.0,
        opacity: 0.2,
        simplex: this.firstTubeSimplex
      });
      this.rings.push(ring);
    }
    for (let i = 0; i < 10; i++) {
      let ring = new Ring({
        innerRadius: 0.8,
        radius: 1.15,
        segment: 256,
        wireframe: false,
        // seed: i * 0.008,
        ondulaire: i * 0.03,
        opacity: 0.03,
        simplex: this.thirdTubeSimplex
      });
      this.rings.push(ring);
    }
    for (let i = 0; i < 10; i++) {
      let ring = new Ring({
        innerRadius: 0.6,
        radius: 1.3,
        segment: 256,
        wireframe: false,
        // seed: i * 0.008,
        ondulaire: i * 0.03,
        opacity: 0.025,
        simplex: this.fourthTubeSimplex
      });
      this.rings.push(ring);
    }

    this.rings.forEach((ring, index) => {
      ring.mesh.position.set(0, 0, index * 0.04);
    });

    this.rings.forEach(ring => {
      this.objects.push(ring);
    });

    this.landscape = new Landscape();
    this.objects.push(this.landscape);

    //STEM
    this.stem = new Stem();
    this.objects.push(this.stem);

    /**
     * lights
     */
    let spotLight = new THREE.DirectionalLight(0xffffff, 0.1);
    spotLight.position.set(200, 200, 200);
    this.lights.push(spotLight);

    // let spotLight2 = new THREE.DirectionalLight(0xff88ff, 0.3);
    // spotLight2.position.set(-50, 60, 60);
    // this.lights.push(spotLight2);

    let spotLight3 = new THREE.DirectionalLight(0x7e7fe8, 0.4);
    spotLight3.position.set(0, 0, 20);
    spotLight3.lookAt(0, 0, 0);
    this.lights.push(spotLight3);

    /**
     * event
     */
    this.events.push();

    /**
     * Trackings
     */
    this.mic = new Microphone();
    this.trackings.push({
      tracker: { name: this.mic },
      start: () => {
        this.mic.init();
      },
      stop: () => {
        this.mic.stop();
      }
    });
  }

  update(time, t, userData, updateUserData, interactionIndex) {
    //do nothing forthe moment
    this.landscape.update();
      //LIGHT MOVEMENT
      this.stem.mesh.position.x = (Math.cos(time * 1.329) *.01) + .22;

    // update the userdata state
    let userDataUpdate = userData;
    Object.assign(userDataUpdate[interactionIndex], {
      movemento: userDataUpdate[interactionIndex].movemento
        ? userDataUpdate[interactionIndex].movemento + this.mic.volume / 1000
        : this.mic.volume / 1000
    });
    updateUserData(userDataUpdate);

    this.rings.forEach((ring, index) => {
      ring.update(
        time,
        this.mic.spectrum[Math.round((index / 50) * 511)] * 0.001 || 0,
        this.mic.volume || 0
      );
    });
  }
}
