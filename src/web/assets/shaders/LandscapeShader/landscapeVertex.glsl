//color
varying vec3 vPosition;


// Déformation de la sphere
// Light blog.edankwan.com/post/three-js-advanced-tips-shadow
void main() {

    vPosition = position;

    vec3 pos = position;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

}