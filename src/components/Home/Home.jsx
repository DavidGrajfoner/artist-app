import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Artist Analytics</h1>
      <p className="home-description">
        In today's rapidly evolving music industry, artists are more than just performers; they are data-driven entrepreneurs. 
        Viberate empowers musicians with advanced analytics that help them understand their audience, track trends, and optimize their marketing strategies. 
      </p>
      <p className="home-description">
        By harnessing data on streaming behaviors, social media engagement, and demographic insights, artists can make informed decisions that enhance their reach and impact. 
        Our platform serves as a bridge, connecting artists with their fans, while providing the tools necessary for growth and success in a competitive landscape.
      </p>
      <p className="home-description">
        With Viberate, musicians can unlock their full potential, explore new opportunities for collaboration, and ultimately create a lasting legacy in the world of music.
      </p>
    </div>
  );
};

export default Home;
