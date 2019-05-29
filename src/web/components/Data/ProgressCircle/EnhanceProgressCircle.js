import React from "react";
import {
  compose,
  lifecycle,
  withProps,
  withHandlers,
  withState
} from "recompose";

let stepTotal = 4; // get this globally

const EnhanceProgressCircle = props =>
  compose(
    withProps(props => ({
      width: props.width || 120,
      height: props.height || 120
    })),
    withState("circle", "setCircle", props => (
      <circle
        className="progress-ring__circle"
        stroke="white"
        strokeWidth="4"
        fill="transparent"
        r={props.width / 2 - 8}
        cx={props.width / 2}
        cy={props.height / 2}
      />
    )),
    withState("lastMovemento", "setLastMovemento", 0),
    withState("radius", "setRadius", props => props.circle.props.r),
    withState(
      "circumference",
      "setCircumference",
      props => props.radius * 2 * Math.PI
    ),
    withHandlers({
      setProgress: props => percent => {
        const offset =
          props.circumference - (percent / 1000) * props.circumference;
        props.setCircle({
          ...props.circle,
          props: {
            ...props.circle.props,
            strokeDasharray: `${props.circumference} ${props.circumference}`,
            strokeDashoffset: offset
          }
        });
      }
    }),
    lifecycle({
      componentDidMount() {
        if (this.props.radius) {
          if (this.props.circumference) {
            this.props.setCircle({
              ...this.props.circle,
              props: {
                ...this.props.circle.props,
                strokeDasharray: `${this.props.circumference} ${
                  this.props.circumference
                }`,
                strokeDashoffset: `${this.props.circumference}`
              }
            });
          }
        }
      },
      componentDidUpdate(prevProps) {
        if (document.querySelector(".video-container").style.opacity === "0") {
          if (this.props.outer && this.props.step != prevProps.step) {
            const offset = (this.props.step / stepTotal) * 1000;
            this.props.setProgress(offset);
          } else if (
            this.props.finishState - 1 == this.props.step &&
            this.props.userData &&
            this.props.userData[this.props.finishState - 1] &&
            this.props.userData[this.props.finishState - 1].movemento &&
            this.props.lastMovemento !=
              this.props.userData[this.props.finishState - 1].movemento
          ) {
            if (this.props.circle.props.strokeDashoffset > 0) {
              this.props.setProgress(
                this.props.userData[this.props.finishState - 1].movemento * 100
              );
              this.props.setLastMovemento(
                this.props.userData[this.props.finishState - 1].movemento
              );
            }
          }
        }
      }
    })
  );

export default EnhanceProgressCircle;
