import React from "react";
import { compose, lifecycle, withHandlers, withState } from "recompose";
import Canvas3D from "./Canvas3D";
import * as THREE from "three";
var OrbitControls = require("three-orbit-controls")(THREE);

const ThreeContainer = props =>
  compose(
    lifecycle({
      componentDidMount() {
        let can3d = new Canvas3D({
          container: document.querySelector(".threeContainer"),
          setStep: this.props.setStep
        });
        this.props.setCanvas(can3d);
      }
    })
  );

export default ThreeContainer;
