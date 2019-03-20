import Canvas3D from "./components/Canvas3D";
import Interface from "./components/Interface";

export default class App {
  constructor() {
    this.step = 0;
    this.container;
    this.title;
    this.canvas3D;
    this.appendCanvas3D();
    this.interface;
    this.appendInterface();
  }
  appendInterface() {
    this.interface = new Interface(this.canvas3D);
    this.interface.display();
  }
  appendCanvas3D() {
    this.canvas3D = new Canvas3D();
    this.canvas3D.hide();
  }
  setCurrentStep(step) {
    this.step = step;
  }
}
