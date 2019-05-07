//TEXTURE
import imgMap from "../../../assets/Texture/Leather/Leather_001_NRM.png";
import imgDisp from "../../../assets/Texture/Leather/Leather_001_DISP.png";


export default class Heart {
    constructor() {
        let geometry = new THREE.SphereBufferGeometry(.25, 20, 20 );

        let textureLoader = new THREE.TextureLoader();
        let texture = textureLoader.load(imgMap);
        //let textureColor = textureLoader.load(imgColor);
        let textureDisp = textureLoader.load(imgDisp);
        let material = new THREE.MeshPhongMaterial({
            color: 0X000000,
            normalMap: texture,
            displacementMap: textureDisp,
            displacementScale: .15,
            normalScale: new THREE.Vector2(1, 1),
            transparent: true,
            opacity: .7
        });
        this.mesh = new THREE.Mesh( geometry, material );
        this.mesh.position.y = - 0.05;
        this.mesh.position.z =  0.15;
    }
}
