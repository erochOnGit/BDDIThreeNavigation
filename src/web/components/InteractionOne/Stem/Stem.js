export default class Stem {
    constructor() {
        function CustomSinCurve( scale ) {

            THREE.Curve.call( this );

            this.scale = ( scale === undefined ) ? 1 : scale;

        }

        CustomSinCurve.prototype = Object.create( THREE.Curve.prototype );
        CustomSinCurve.prototype.constructor = CustomSinCurve;

        CustomSinCurve.prototype.getPoint = function ( t ) {

            let tx = t * 2 - 1.5;
            let ty = Math.sin( .5 * Math.PI * t );
            let tz = 0;

            return new THREE.Vector3( tx, ty, tz ).multiplyScalar( this.scale );

        };

        let path = new CustomSinCurve( 10 );
        let tigeGeometry = new THREE.TubeBufferGeometry( path, 20, .6, 10, false );
        let tigeMaterial = new THREE.MeshPhongMaterial({color: 0x222222 ,transparent:true, opacity:.5});
        this.mesh = new THREE.Mesh( tigeGeometry, tigeMaterial );

        this.mesh.position.set(-.1,-2.5,0);
        this.mesh.scale.set(.15,.25,.05);
        this.mesh.rotation.set(0,4.6,.4);
    }

}
