import React from "react";
import {
  compose,
  lifecycle,
  withProps,
  withHandlers,
  withState
} from "recompose";
import { MorphSVGPlugin, TweenMax, Power2, TimelineLite } from "gsap/TweenMax";
let stepTotal = 4; // get this globally

const EnhanceProgressCircle = props =>
  compose(
    withProps(props => ({
      width: props.width || 120,
      height: props.height || 120
    })),
    withState("baseCircle", "setBaseCircle", props => (
      <circle
        className={`${
          props.lineStyle == "dotted" ? "progress-ring-dot__circle" : ""
        } ${
          props.lineStyle == "transparent"
            ? "progress-ring-transparent__circle"
            : ""
        }`}
        stroke="white"
        strokeWidth="4"
        fill="transparent"
        r={Math.abs(props.width / 2 - 8)}
        cx={props.width / 2}
        cy={props.height / 2}
      />
    )),
    withState("circle", "setCircle", props => (
      <circle
        className="progress-ring__circle"
        stroke="white"
        strokeWidth="4"
        fill="transparent"
        r={Math.abs(props.width / 2 - 8)}
        cx={props.width / 2}
        cy={props.height / 2}
      />
    )),
    withState("baseTweeningOffset", "setBaseTweeningOffset", 0),
    withState("tweeningOffset", "setTweeningOffset", 0),
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
      },
      setBaseProgress: props => percent => {
        const offset =
          props.circumference - (percent / 1000) * props.circumference;

        props.setBaseCircle({
          ...props.baseCircle,
          props: {
            ...props.baseCircle.props,
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
            if (this.props.baseStep) {
              const offset = ((this.props.baseStep + 1) / stepTotal) * 1000;

              let tweener = {
                value: this.props.baseTweeningOffset
              };
              TweenMax.to(tweener, 1, {
                value: offset,
                ease: Sine.easeOut,
                onUpdate: () => {
                  this.props.setBaseProgress(tweener.value);
                },
                onComplete: () => {
                  this.props.setBaseTweeningOffset(tweener.value);
                }
              });
            }
          }
        }
      },
      componentDidUpdate(prevProps) {
        if (this.props.outer && this.props.baseStep != prevProps.baseStep) {
          const offset = ((this.props.baseStep + 1) / stepTotal) * 1000;

          let tweener = {
            value: this.props.baseTweeningOffset
          };
          TweenMax.to(tweener, 1, {
            value: offset,
            ease: Sine.easeOut,
            onUpdate: () => {
              this.props.setBaseProgress(tweener.value);
            },
            onComplete: () => {
              this.props.setBaseTweeningOffset(tweener.value);
            }
          });
        }
        if (
          (document.querySelector(".video-container") &&
            document.querySelector(".video-container").style.opacity === "0") ||
          (document.querySelector(".video-player") &&
            document.querySelector(".video-player").style.opacity === "0") ||
          this.props.noVideo
        ) {
          if (this.props.outer && this.props.step != prevProps.step) {
            const offset = (this.props.step / stepTotal) * 1000;
            let tweener = {
              value: this.props.tweeningOffset
            };
            TweenMax.to(tweener, 1, {
              value: offset,
              ease: Sine.easeOut,
              onUpdate: () => {
                this.props.setProgress(offset);
              },
              onComplete: () => {
                this.props.setTweeningOffset(tweener.value);
              }
            });
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
                this.props.userData[this.props.finishState - 1].movemento * 25
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
