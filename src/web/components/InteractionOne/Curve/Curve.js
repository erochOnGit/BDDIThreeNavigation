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

    update(t,groupPollen,i) {
        //LINE POSITION
        this.groupLine.children[i].geometry.vertices[1].x += Math.cos((t * 0.001) + groupPollen.children[i].position.x) * 0.0005;
        this.groupLine.children[i].geometry.vertices[1].y += Math.sin((t * 0.001) + groupPollen.children[i].position.y) * 0.0005;
        this.groupLine.children[i].geometry.vertices[1].z += Math.sin((t * 0.001) + groupPollen.children[i].position.z) * 0.0001;
        this.groupLine.children[i].geometry.verticesNeedUpdate = true;
    }
    updateCurvePos(movemento,random){
        if(movemento > 0.08){
            let tline = new TimelineLite();
            tline.to(this.groupLine.children[random].position, 100 , { x:Math.random() * (60 + 30 ) - 30, y:Math.random() * (40 + 20 ) - 20, z:Math.random() * (50 + 30 ) - 30, ease:Elastic.easeOut, useFrames:true})
        }
    }
}
