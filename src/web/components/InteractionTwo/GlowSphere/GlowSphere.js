import glowVertexShader from '../../../assets/shaders/GlowShader/glowVertex.glsl';
import glowFragmentShader from '../../../assets/shaders/GlowShader/glowFragment.glsl';

export default class GlowSphere {
    constructor({ camera }) {
        let sphereGeom = new THREE.SphereGeometry(1.3, 32, 16);
        let customMaterial = new THREE.ShaderMaterial(
            {
                uniforms:
                    {
                        "c": {type: "f", value: 0.3},
                        "p": {type: "f", value: 4},
                        glowColor: {type: "c", value: new THREE.Color(0x22DDBB)}, //0x0069ff clearly
                        viewVector: {type: "v3", value: camera.position}
                    },
                vertexShader: glowVertexShader,
                fragmentShader: glowFragmentShader,
                side: THREE.FrontSide,
                blending: THREE.AdditiveBlending,
                transparent: true
            });

        this.mesh = new THREE.Mesh(sphereGeom, customMaterial);
        this.mesh.position.z = 1;
    }

}
