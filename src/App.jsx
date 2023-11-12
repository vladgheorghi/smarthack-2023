import React, { useState } from 'react';
import './App.css'; // Assuming you have a separate CSS file
import { SearchBar } from './components/SearchBar';
import axios from 'axios';

var globalShow = false;

export async function postName(name) {

  try {
    var res = await axios.post('http://localhost:4000/post_name', {
      name
    })
    
  } catch (errors) {
    console.log(errors);
  }
}

function App() {
  const [leftSearch, setLeftSearch] = useState('');
  const [rightSearch, setRightSearch] = useState('');

  const handleLeftSearchChange = (e) => {
    setLeftSearch(e.target.value);
  };

  const handleRightSearchChange = (e) => {
    setRightSearch(e.target.value);
  };

  return (
    <div className="app-container">
      <div className="Header">
        <h1 className="title">Wizard Tribe Comparator</h1>
      </div>
      <div className="search-container">
        <SearchBar
          placeholder="Search Left"
          value={leftSearch}
          onChange={handleLeftSearchChange}
        />
      </div>

      <div className="search-container1">
        <SearchBar
          placeholder="Search Right"
          value={rightSearch}
          onChange={handleRightSearchChange}
        />
      </div>
    </div>
  );
}

export default App;