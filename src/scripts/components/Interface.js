export default class Interface {
  constructor(scene) {
    this.scene = scene;
    this.container = document.createElement("div");
    this.container.id = "container";
    this.titre = document.createElement("h1");
    this.titre.innerText = "Titre";
    this.container.appendChild(this.titre);
    document.body.appendChild(this.container);
    this.button = document.createElement("button");
    this.button.innerText = "first Interaction";
    this.button.addEventListener("click", this.displayScene.bind(this));
    this.container.appendChild(this.button);
  }
  // TODO : here we have to pass the scene via the method and not by the constructor of the class ... maybe. 
  displayScene() {
    this.scene.display();
  }
  hide() {
    this.container.style.display = "none";
  }
  display() {
    this.container.style.display = "block";
  }
}
