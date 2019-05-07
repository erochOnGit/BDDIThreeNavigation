import React from "react";
import { compose, lifecycle } from "recompose";

const EnhanceToto = () =>
  compose(
    lifecycle({
      componentDidMount() {
        let clickable = document.querySelector(".toto");
        clickable.addEventListener("click", () => {
          alert("a malibu");
        });
      }
    })
  );

export default EnhanceToto;
