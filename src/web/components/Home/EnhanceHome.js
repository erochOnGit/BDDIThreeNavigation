import React from "react";
import { compose, lifecycle } from "recompose";

const EnhanceHome = () =>
    compose(
        lifecycle({
            componentDidMount() {
                let clickable = document.querySelector(".link-btn");
                clickable.addEventListener("click", () => {
                    alert("a malibu");
                });
            }
        })
    );

export default EnhanceHome;
