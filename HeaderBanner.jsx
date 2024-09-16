// Import the React library to use JSX and create the component
import React from 'react';

// Import the NYU logo image to be used in the header banner
import NYU from './assets/NYU.png';

// Import CSS styles specific to this component
import './index.css'; 

// Define the HeaderBanner functional component
const HeaderBanner = ({ userName }) => {
  return (
    // Container div for the header banner, applies styles from index.css
    <div className="header-banner">
      {/* Container for the logo, includes the NYU logo image */}
      <div className="logo-container">
        {/* Display the NYU logo with an alt text for accessibility */}
        <img src={NYU} alt="NYU Logo" className="nyu-logo" />
      </div>
      {/* Container for user information, such as the user's name and logout link */}
      <div className="user-info">
        {/* Display the user's name */}
        <span className="user-name">{userName}</span>
        {/* Logout link with a class for styling, directs to the logout page */}
        <a href="/logout" className="logout-link">Log Out</a>
      </div>
    </div>
  );
};

// Export the HeaderBanner component so it can be used in other parts of the application
export default HeaderBanner;
