import React from "react";
import { render } from "react-dom";
import Pet from "./Pet";

const App = () => {
  return (
    <div>
      <h1 id="something-important">Adopt Me!</h1>
      <Pet name="Phoebe" animal="Dog" breed="Labrador" />
      <Pet name="Doink" animal="Cat" breed="Stray-cat" />
      <Pet name="MyBird" animal="Bird" breed="Pigeon" />
    </div>
  );
};

render(<App />, document.getElementById("root"));
