import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { postName } from "../App"
import "./SearchBar.css";

export let valueGlobal = "";

export const SearchBar = ({ onChange, value }) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
    valueGlobal = value;
  };

  const pressedEnter = (e) => {
    if (e.key == 'Enter' || e.keyCode == 13) {
      postName(valueGlobal);
    }
  }

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={(e) => pressedEnter(e)}
      />
    </div>
  );
};