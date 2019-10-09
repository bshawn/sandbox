import React from "react";
import ReactDOM from "react-dom";
import BlockElement from "./block-element";
import { Block } from "../data/block";
import { shallow, mount, fireEvent } from "enzyme";

let block: Block;
beforeEach(() => {
  block = fakeBlock();
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BlockElement block={block} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("displays raw data when expanded", () => {
  const blockElem = mount(<BlockElement block={block} />);
  blockElem.find(".clickable").simulate("click");
  expect(blockElem.find("code")).toHaveLength(1);
});

it("hides raw data when loaded", () => {
  const blockElem = mount(<BlockElement block={block} />);
  expect(blockElem.find("code")).toHaveLength(0);
});

function fakeBlock(): Block {
  const block1 = new Block();
  block1.id = "1";
  block1.raw = "raw";
  return block1;
}
