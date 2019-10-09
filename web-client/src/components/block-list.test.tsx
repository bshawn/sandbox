import React from "react";
import ReactDOM from "react-dom";
import BlockList from "./block-list";
import { Block } from "../data/block";
import { shallow, mount } from "enzyme";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BlockList blocks={[]} isLoading={false} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("displays 'Loading...' if isLoading is set to true", () => {
  const blockList = shallow(<BlockList blocks={[]} isLoading={true} />);
  const contentDiv = blockList.find("div");
  expect(contentDiv.text()).toEqual("Loading...");
});

it("displays 'No data loaded' if no blocks are rendered", () => {
  const blockList = shallow(<BlockList blocks={[]} isLoading={false} />);
  const contentDiv = blockList.find("div");
  expect(contentDiv.text()).toEqual("No data loaded");
});

it("renders the correct number of BlockElements", () => {
  const blockList = mount(
    <BlockList blocks={fakeBlocks()} isLoading={false} />
  );
  const blocks = blockList.find(".card");
  expect(blocks).toHaveLength(4);
});

function fakeBlocks(): Block[] {
  const block1 = new Block();
  block1.id = "1";
  const block2 = new Block();
  block2.id = "2";
  const block3 = new Block();
  block3.id = "3";
  const block4 = new Block();
  block4.id = "4";
  return [block1, block2, block3, block4];
}
