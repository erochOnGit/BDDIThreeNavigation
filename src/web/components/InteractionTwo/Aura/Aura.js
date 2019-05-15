export default class Dada {
    constructor({ groupPollen, posAuraX, posAuraY, rayon, x, y, rand}) {
        let geometry = new THREE.SphereBufferGeometry(rand, 8, 7 );
        let material = new THREE.MeshPhongMaterial({color:0xfffffff, transparent:true, opacity: 1-(rand*15)});
        this.mesh = new THREE.Mesh( geometry, material );

        this.mesh.position.x = THREE.Math.randFloat(rayon, rayon+ (rand*10) * 2) * Math.cos(y) * Math.sin(x);
        this.mesh.position.y = THREE.Math.randFloat(rayon, rayon+ (rand*10) * 1.1) * Math.sin(y) * Math.sin(x);
        this.mesh.position.z = -rand*10;

        posAuraX.push(this.mesh.position.x)
        posAuraY.push(this.mesh.position.y)

        let scale = THREE.Math.randFloat(.3, 3)
        let scale2 = THREE.Math.randFloat(.8, 1.2)
        this.mesh.scale.set(scale*(scale2), scale, 0.001)

        //BEGIN ANIMATION
        if(this.mesh.position.x != 0) {
            groupPollen.add(this.mesh);
        }
    }
}
