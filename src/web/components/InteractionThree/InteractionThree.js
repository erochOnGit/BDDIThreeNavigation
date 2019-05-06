import Interaction from "../ThreeContainer/Interaction";
import Simplex from "perlin-simplex";
import Ring from "./Ring/Ring";
import dat from "dat.gui";
import Microphone from "./Microphone/Microphone";

export default class InteractionThree extends Interaction {
  constructor() {
    super();

    /**
     * objects
     */
    this.rings = [];

    let r = new Ring({
      innerRadius: 1,
      radius: 5,
      segment: 256,
      wireframe: false,
      seed: 0.1,
      opacity: 0.2
    });
    this.rings.push(r);
    r.mesh.position.set(0, 0, -7);

    for (let i = 0; i < 50; i++) {
      let ring = new Ring({
        innerRadius: 1,
        radius: 1.01,
        segment: 256,
        wireframe: false,
        seed: i * 0.05
      });
      this.rings.push(ring);
      ring.mesh.position.set(0, 0, i * 0.01);
    }

    this.rings.forEach(ring => {
      this.objects.push(ring);
    });

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
     * other
     */
    this.mic = new Microphone();
  }

  update(time) {
    //do nothing forthe moment
    this.rings.forEach(ring => {
      ring.update(time);
    });
  }
}
