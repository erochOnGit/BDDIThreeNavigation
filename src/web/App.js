import React from "react";
import ThreeContainer from "./components/ThreeContainer/ThreeContainer";
import EnhanceApp from "./EnhanceApp";

const App = props => {
  return (
    <div>
      <ThreeContainer />
    </div>
  );
};
export default EnhanceApp()(App);
