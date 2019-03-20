import React from "react";
import { compose, lifecycle } from "recompose";
import Canvas3D from "./Canvas3D";
import * as THREE from "three";
var OrbitControls = require("three-orbit-controls")(THREE);

const ThreeContainer = () =>
  compose(
    lifecycle({
      componentDidMount() {
        let can3d = new Canvas3D({
          container: document.querySelector(".threeContainer")
        });
      }
    })
  );

export default ThreeContainer;
