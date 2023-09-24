import React, { useState, useEffect } from 'react';
import './matching.css';
import { useActiveProfile } from "@lens-protocol/react-web";
import { getFilteredProfile, like, getPoapInCommon } from '../api/callTaMere';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import MatchLogo from './matchlogo.png';

export default function Matching() {
  const [profiles, setProfiles] = useState([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [isMatch, setIsMatch] = useState(false);
  const [poap, setPoap] = useState([]);
  const [isLoadingPoap, setIsLoadingPoap] = useState(true); // Ajout de l'état pour suivre le chargement des POAP
  const { data: wallet, loading } = useActiveProfile();
  const searchParams = useSearchParams();
  const hack_name = searchParams.get('hack_name');

  const loadProfilesFromAPI = async () => {
    try {
      if (!loading && wallet?.handle !== undefined && hack_name !== null) {
        const data = await getFilteredProfile(wallet?.handle ?? "", hack_name);
        if (data !== null) {
          setProfiles(data);
          setCurrentProfileIndex(0);
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement des profils :', error);
    }
  };

  const loadPoapInCommon = async () => {
    try {
      const poapData = await getPoapInCommon(wallet?.handle ?? "", currentProfile.handle);
      setPoap(poapData);
      setIsLoadingPoap(false); // Marquez le chargement des POAP comme terminé
    } catch (error) {
      console.error('Erreur lors du chargement des POAP en commun :', error);
      setIsLoadingPoap(false); // Marquez le chargement des POAP comme terminé même en cas d'erreur
    }
  };

  useEffect(() => {
    loadProfilesFromAPI();
  }, [loading, wallet?.handle]);

  const currentProfile = profiles[currentProfileIndex];

  useEffect(() => {
    if (currentProfile) {
      loadPoapInCommon();
    }
  }, [currentProfile]);

  const handleSwipeLeft = () => {
    setCurrentProfileIndex(currentProfileIndex + 1);
  };

  const handleSwipeRight = async () => {
    try {
      const result = await like(wallet?.handle, currentProfile.handle);
      if (result) {
        setIsMatch(true);
      }
      setCurrentProfileIndex(currentProfileIndex + 1);
    } catch (error) {
      console.error('Erreur lors du swipe à droite :', error);
    }
  };

  const handleMatchClick = () => {
    setIsMatch(false);
    setCurrentProfileIndex(currentProfileIndex + 1);
  };

  return (
    <div className="main">
      {loading && (
        <div>
          <img
            src={MatchLogo.src}
            className="match-image"
          />
          <p>Loading...</p>
        </div>
      )}

      {currentProfile && !loading && !isMatch && (
        <div className="profile-card">
          <div className="profile-image">
            <Link href={`/profile/${currentProfile.handle}`}>
              {currentProfile.picture?.uri ? (
                <img src={currentProfile.picture.uri} alt={currentProfile.name} />
              ) : currentProfile.picture?.original?.url ? (
                <img src={currentProfile.picture.original.url} alt={currentProfile.name} />
              ) : (
                <p>No profile picture available</p>
              )}
            </Link>
          </div>
          <h1 className="profile-name">{currentProfile.name}</h1>
          <p className="profile-bio">{currentProfile.bio}</p>
          <p className="profile-display-name">{currentProfile.handle}</p>

          {isLoadingPoap ? (
            <p>Loading POAP data...</p>
          ) : (
            <div className="poap-container">
              <h2>POAPs in Common:</h2>
              {poap !== null && poap.length > 0 ? (
                <ul>
                  {poap.map((item, index) => (
                    <li key={index}>
                      Event ID: {item.eventId}<br />
                      Event Name: {item.eventName}<br />
                      Content Value: {JSON.stringify(item.contentValue)}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No POAP in common</p>
              )}
            </div>
          )}

          <div className="buttons">
            <button onClick={handleSwipeLeft} className="swipe-left-button">❌</button>
            <button onClick={handleSwipeRight} className="swipe-right-button">✅</button>
          </div>
        </div>
      )}

      {isMatch && (
        <div>
          <div className="description-container">
            <div className="description">
              <p className="match-message"><b>🔥It's a MATCH !🔥</b></p>
              <button onClick={handleMatchClick} className="principal-button">⏭️Continue swiping</button>
              <button
                className="principal-button"
                onClick={async () => {
                  try {
                    const lensProfileAddress = profiles[currentProfileIndex - 1].ownedBy;
                  console.log('lensProfileAddress', lensProfileAddress);

                    await navigator.clipboard.writeText(lensProfileAddress as string);
                    console.log('Lens profile address copied to clipboard');
                    window.open('https://xmtp.chat/', '_blank');
                  } catch (err) {
                    console.warn('Failed to write lens profile address to the clipboard.', err);
                  }
                  // Open new tab
                  

                  // Copy lens profile address to clipboard
                  
                  // Try to write to clipboard
                  
                }}
              >
                📱Go to Messaging
              </button>
            </div>
          </div>
        </div>
      )}

      {!loading && currentProfileIndex >= profiles.length && (
        <button onClick={loadProfilesFromAPI} className="load-next-button">Load More Profile</button>
      )}

      {!loading && !currentProfile && (
        <p className="no-profiles-message">No more profiles to display.</p>
      )}
    </div>
  );
}
