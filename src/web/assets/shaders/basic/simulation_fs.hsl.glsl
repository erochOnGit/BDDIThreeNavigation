//basic simulation: displays the particles in place.
uniform sampler2D color;
varying vec2 vUv;
float higherValue;
float smallerValue;
float midRangeValue;
float luminance;
float saturation;
float hue;
void main() {
    
    vec3 col = texture2D( color, vUv ).rgb;

    //calculate the luminance
    if(col.r > col.g){
        if(col.r > col.b){
            higherValue = col.r;
            if(col.g>col.b){
                smallerValue = col.b;
                midRangeValue = col.g;
            } else {
                smallerValue = col.g;
                midRangeValue = col.b;
            }
        }else{
           higherValue = col.b ;
           smallerValue = col.g;
           midRangeValue = col.r;
        }
    } else {
        if(col.g > col.b){
            higherValue = col.g;
            if(col.r > col.b){
                smallerValue = col.b;
                midRangeValue = col.r;
            } else {
                smallerValue = col.r;
                midRangeValue = col.b;
            }
        }else{
           higherValue = col.b ;
           smallerValue = col.r;
           midRangeValue = col.g;
        }
    }
    luminance = (higherValue + smallerValue) /2.;
    //calculate the saturation
    if(luminance<0.5){
        saturation = (higherValue-smallerValue)/(higherValue+smallerValue);
    }else{
        saturation = ( higherValue-smallerValue)/(2.0-higherValue-smallerValue);
    }

    //calculate hue
    if(higherValue == col.r) {
        hue = (col.g-col.b)/(higherValue-smallerValue);
    } else if (higherValue == col.g) {
        hue = 2.0 + (col.b-col.r)/(higherValue-smallerValue);
    } else {
        hue = 4.0 + (col.r-col.g)/(higherValue-smallerValue);
    }
    float h = hue/10.;

    gl_FragColor = vec4( h, saturation, luminance, 1.0 );
}