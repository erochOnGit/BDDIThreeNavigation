export default class InteractionOne {
    constructor(scene) {
        this.meshes = [];
        this.addSphere(scene);
    }
    addSphere(scene) {
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        var sphere = new THREE.Mesh(geometry, material);
        this.meshes.push(sphere);
        scene.add(sphere);
    }
}
