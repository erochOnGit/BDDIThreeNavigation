export default class Microphone {
  constructor(_fft) {
    this.FFT_SIZE = _fft || 1024;
    this.spectrum = [];
    this.volume = this.vol = 0;
    this.peak_volume = 0;
    var self = this;
    var audioContext = new AudioContext();
    var SAMPLE_RATE = audioContext.sampleRate;
    console.log("iniiiitilaiteiozon");
    // this is just a browser check to see
    // if it supports AudioContext and getUserMedia
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia =
      navigator.getUserMedia || navigator.webkitGetUserMedia;
    // now just wait until the microphone is fired up
    this.init();
  }

  init() {
    try {
      this.startMic(new AudioContext());
    } catch (e) {
      console.error(e);
      alert("Web Audio API is not supported in this browser", e);
    }
  }

  startMic(context) {
    console.log("startmic", this);
    navigator.getUserMedia({ audio: true }, processSound.bind(this), error);
    function processSound(stream) {
      // analyser extracts frequency, waveform, etc.
      var analyser = context.createAnalyser();
      analyser.smoothingTimeConstant = 0.2;
      console.log("fft?", this.FFT_SIZE);
      analyser.fftSize = this.FFT_SIZE;
      var node = context.createScriptProcessor(this.FFT_SIZE * 2, 1, 1);
      node.onaudioprocess = this.audioProcess(analyser).bind(this);
      var input = context.createMediaStreamSource(stream);
      input.connect(analyser);
      analyser.connect(node);
      node.connect(context.destination);
    }
    function error() {
      console.log(arguments);
    }
  }

  audioProcess(analyser) {
    return function() {
      // bitcount returns array which is half the FFT_SIZE
      this.spectrum = new Uint8Array(analyser.frequencyBinCount);
      // getByteFrequencyData returns amplitude for each bin
      analyser.getByteFrequencyData(this.spectrum);
      // getByteTimeDomainData gets volumes over the sample time
      // analyser.getByteTimeDomainData(this.spectrum);
      this.vol = this.getRMS(this.spectrum);
      // get peak - a hack when our volumes are low
      if (this.vol > this.peak_volume) this.peak_volume = this.vol;
      this.volume = this.vol;
      console.log(this.volume);
    };
  }
  //////// SOUND UTILITIES  ////////
  ///// ..... we going to put more stuff here....
  getRMS(spectrum) {
    var rms = 0;
    for (var i = 0; i < spectrum.length; i++) {
      rms += spectrum[i] * spectrum[i];
    }
    rms /= spectrum.length;
    rms = Math.sqrt(rms);
    return rms;
  }
}
