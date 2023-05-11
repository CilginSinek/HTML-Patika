
import { render } from "@testing-library/react"
import React from 'react'
import Header from "./src/Header";
import filterEmoji from "./src/filterEmoji";
import EmojiResults from "./src/EmojiResults";
import SearchInput from "./src/SearchInput";
import "@testing-library/jest-dom";

describe("Header", () => {
  it('should render header Emoji Search', () => {
    const { getByText } = render(<Header />);
    const headerText = getByText("Emoji Search");
    //search header in document
    expect(headerText).toBeInTheDocument();
  });
});

describe("Can useful", () => {
  let container;
  beforeEach(()=>{
    //create test area
    const handleChange = jest.fn();
    const renderResults = render(<>
      <SearchInput textChange={handleChange} />
      <EmojiResults emojiData={filterEmoji("1234", 20)} />
    </>);
    container = renderResults.container;
  })
  it('search with emoji results', () => {
    // 2 div in search
    // in emoji results have 2 div 1. emoji-results 2. emoji-results-row
    expect(container.querySelectorAll('div')).toHaveLength(4);
  });
  it("can create input area", ()=>{
    expect(container.querySelectorAll("input")).toHaveLength(1);
  });
});

