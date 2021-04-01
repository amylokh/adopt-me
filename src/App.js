import React from "react";
import { render } from "react-dom";
import Pet from "./Pet";

const App = () => {
  return React.createElement("div", { id: "something-important" }, [
    React.createElement("h1", {}, "Adopt me!"),
    React.createElement(Pet, {
      name: "Phoebe",
      animal: "Dog",
      breed: "Labrador",
    }),
    React.createElement(Pet, {
      name: "Doink",
      animal: "Cat",
      breed: "Stray-cat",
    }),
    React.createElement(Pet, {
      name: "MyBird",
      animal: "Bird",
      breed: "Pigeon",
    }),
  ]);
};

render(React.createElement(App), document.getElementById("root"));
