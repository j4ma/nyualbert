// src/App.jsx
import React from 'react';
import Homepage from './Homepage';
import HeaderBanner from './HeaderBanner';  // Import without .jsx extension, as it's optional
import './index.css';

function App() {
  const userName = "John Doe"; // Replace with actual user name

  return (
    <div className="App">
      <HeaderBanner userName={userName} />
      <Homepage />
      {/* Other components */}
    </div>
  );
}

export default App;
