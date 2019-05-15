import React from "react";
import enhanceToto from "./EnhanceToto";
import './toto.scss'

let toto = () => {
  return <div className="toto">jfaoziefe m'en fou</div>;
};

export default enhanceToto()(toto);
