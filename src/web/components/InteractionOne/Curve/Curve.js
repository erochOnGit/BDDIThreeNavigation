export default class Curve {
    constructor({ groupPollen }) {
        this.groupLine = new THREE.Group();

        for(let i = 0 ; i < groupPollen.children.length ;i++) {
            let curve = new THREE.CubicBezierCurve3(
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(0, this.generateRandom(-1, 1), 0),
                new THREE.Vector3(groupPollen.children[i].position.x, groupPollen.children[i].position.y, groupPollen.children[i].position.z)
            );
            let curveGeometry = new THREE.Geometry();
            curveGeometry.vertices = curve.getPoints(10);
            let curveMaterial = new THREE.LineBasicMaterial({color: 0x010102,transparent:true, opacity: 1});

            this.curveLine = new THREE.Line(curveGeometry, curveMaterial);
            this.groupLine.add( this.curveLine );
            groupPollen.add(this.groupLine);
        }
    }
    generateRandom(min, max) {
        let num = Math.floor(Math.random() * (max - min + 1)) + min;
        return (num === 0) ? this.generateRandom(min, max) : num;
    }
}
