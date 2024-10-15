import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ResponsiveBar } from '@nivo/bar';
import './ArtistCard.css';

const flags = require.context('../../assets/flags', false, /\.svg$/);
const socialIcons = require.context('../../assets/social-icons', false, /\.svg$/);
const rankDownIcon = require('../../assets/ranks/rank-down.svg').default;
const rankUpIcon = require('../../assets/ranks/rank-up.svg').default;

const ArtistCard = () => {
  const { artist_uuid } = useParams();
  const [artistData, setArtistData] = useState(null);

  useEffect(() => {
    fetch(`https://mocky.viberate.com/api/v1/${artist_uuid}`)
      .then((response) => response.json())
      .then((data) => setArtistData(data.data))
      .catch((error) => console.error('Error fetching artist data:', error));
  }, [artist_uuid]);

  if (!artistData) {
    return <div>Loading artist details...</div>;
  }

  const countryCode = artistData.country.code.toLowerCase();
  const flagSrc = flags(`./${countryCode}.svg`);

  const currentRank = artistData.rank_categories.current.overall;
  const previousRank = artistData.rank_categories.previous.overall;
  const rankIcon = currentRank < previousRank ? rankUpIcon : currentRank > previousRank ? rankDownIcon : null;

  const mostPopularData = artistData.most_popular_in.map((city) => ({
    city: city.city,
    value: city.value,
  }));

  const getSocialIcon = (channel) => {
    const channelKey = channel.toLowerCase();
    try {
      return socialIcons(`./${channelKey}.svg`);
    } catch (e) {
      return null;
    }
  };

  return (
    <div className="background-container">
      <div className="artist-card">
        {/* Display Artist Image */}
        <img src={artistData.image} alt={artistData.name} className="artist-image" />

        {/* Display Artist Name */}
        <h2 className="artist-name">{artistData.name}</h2>

        {/* Display Country */}
        <p className="artist-info">
          <strong>Country:</strong> {artistData.country.name}
          <img src={flagSrc} alt={`${artistData.country.name} flag`} className="flag-icon"/>
        </p>

        {/* Display Genre and Subgenres */}
        <p className="artist-info"><strong>Genre:</strong> {artistData.genre.name}</p>
        {artistData.subgenres && artistData.subgenres.length > 0 && (
          <p className="artist-info"><strong>Subgenres:</strong> {artistData.subgenres.map((subgenre) => subgenre.name).join(', ')}</p>
        )}

        {/* Display Rank Information */}
        <div className="rank-info">
          <p className="artist-info">
            <strong>Current Rank:</strong> {currentRank}
            {rankIcon && (
              <img src={rankIcon} alt={currentRank < previousRank ? "Rank Up" : "Rank Down"} style={{ width: '16px', marginLeft: '5px' }} />
            )}
          </p>
        </div>

        {/* Display 'Most Popular In' cities as bar chart */}
        <h4 className="section-title">Most Popular In</h4>
        <div style={{ height: 300 }}>
          <ResponsiveBar
            data={mostPopularData}
            keys={['value']}
            indexBy="city"
            margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
            padding={0.3}
            colors={{ scheme: 'nivo' }}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'City',
              legendPosition: 'middle',
              legendOffset: 32,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Popularity (%)',
              legendPosition: 'middle',
              legendOffset: -40,
            }}
          />
        </div>

        {/* Display Social Links */}
        <h4 className="section-title">Social Links</h4>
        <ul className="social-links">
          {artistData.social_links.map((social, index) => (
            <li key={index}>
              <a href={social.link} target="_blank" rel="noopener noreferrer">
                {getSocialIcon(social.channel) && (
                  <img src={getSocialIcon(social.channel)} alt={`${social.channel} icon`} />
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArtistCard;
