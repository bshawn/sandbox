import React from "react";
import ReactDOM from "react-dom";
import LoadButton from "./load-button";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LoadButton isLoading={false} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("displays the word 'Load' when not loading", () => {
  const btn = shallow(<LoadButton isLoading={false} />);
  expect(btn.text()).toEqual("Load");
});
