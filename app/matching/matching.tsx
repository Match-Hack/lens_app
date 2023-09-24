import React, { useState, useEffect } from 'react';
import './matching.css';
import { useActiveProfile } from "@lens-protocol/react-web";
import { getFilteredProfile, like } from '../api/callTaMere';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import MatchLogo from './matchlogo.png';

export default function Matching() {
  const [profiles, setProfiles] = useState([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [isMatch, setIsMatch] = useState(false); // Ajout de l'état pour gérer les matches
  const { data: wallet, loading } = useActiveProfile();
  const searchParams = useSearchParams();
  const hack_name = searchParams.get('hack_name');

  // Fonction asynchrone pour charger les profils depuis l'API
  const loadProfilesFromAPI = async () => {
    try {
      if (!loading && wallet?.handle !== undefined && hack_name !== null) {
        const data = await getFilteredProfile(wallet?.handle ?? "", hack_name);
        if (data !== null) {
          setProfiles(data);
          setCurrentProfileIndex(0); // Réinitialise l'index actuel
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement des profils :', error);
    }
  };

  useEffect(() => {
    // Chargez les profils depuis votre API au montage du composant
    loadProfilesFromAPI(); // Appelez la fonction asynchrone ici
  }, [loading, wallet?.handle]);

  const handleSwipeLeft = () => {
    // Enregistrez la décision de swipe à gauche (passer) via votre API si nécessaire
    // Passez au profil suivant
    setCurrentProfileIndex(currentProfileIndex + 1);
  };

  const handleSwipeRight = async () => {
    try {
      // Enregistrez la décision de swipe à droite (like) via votre API
      const result = await like(wallet!?.handle, (currentProfile as any).handle);
      if (result) {
        // Si c'est un match, mettez à jour l'état pour afficher le message
        setIsMatch(true);
      }
      // Une fois que le like est enregistré, passez au profil suivant
      setCurrentProfileIndex(currentProfileIndex + 1);
    } catch (error) {
      console.error('Erreur lors du swipe à droite :', error);
    }
  };

  const handleMatchClick = () => {
    // En cliquant sur "It's a MATCH !", passez au profil suivant
    setIsMatch(false); // Réinitialise l'état de match
    setCurrentProfileIndex(currentProfileIndex + 1);
  };

  const currentProfile = profiles[currentProfileIndex];

  return (
    <div className="main">
      {loading && (
        <div>
          <img
            src={MatchLogo.src} // Utilisez .src pour obtenir l'URL
            className="match-image"
          />
          <p>Loading...</p>
        </div>
      )}

      {!loading && profiles.length === 0 && (
        <p>Wait a little bit...</p>
      )}

      {currentProfile && !isMatch && (
        <div className="profile-card">
          {/* Affichez ici les informations du profil avec styles */}
          <div className="profile-image">
            <Link href={`/profile/${(currentProfile as any).handle}`}>
              {(currentProfile as any).picture?.uri ? (
                <img src={(currentProfile as any).picture.uri} alt={(currentProfile as any).name} />
              ) : (currentProfile as any).picture?.original?.url ? (
                <img src={(currentProfile as any).picture.original.url} alt={(currentProfile as any).name} />
              ) : (
                <p>No profile picture available</p>
              )}
            </Link>
          </div>
          <h1 className="profile-name">{(currentProfile as any).name}</h1>
          <p className="profile-bio">{(currentProfile as any).bio}</p>
          <p className="profile-display-name">{(currentProfile as any).handle}</p>

          {/* Affichez les POAPs en commun */}
          {(currentProfile as any).commonPoaps && (currentProfile as any).commonPoaps.length > 0 ? (
            <div className="poap-container">
              <h2><b>POAPs in Common:</b></h2>
              <div className="poap-list">
                {(currentProfile as any).commonPoaps.map((poap, index) => (
                  <div className="poap-item" key={index}>
                    <p>{poap.eventName}</p>
                    <img
                      className="poap-image"
                      src={poap.contentValue.image.extraSmall}
                      alt={`POAP ${poap.eventName}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="poap-container">
              <p>No POAPs in common</p>
            </div>
          )}

          {/* Boutons Swipe et Pass */}
          <div className="buttons">
            <button onClick={handleSwipeLeft} className="swipe-left-button">❌</button>
            <button onClick={handleSwipeRight} className="swipe-right-button">✅</button>
          </div>
        </div>
      )}

      {isMatch && (
        <div>
          {/* Utilisez la classe CSS pour styliser le message */}
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

      {!loading && profiles.length > 0 && currentProfileIndex >= profiles.length && (
        <div>
        <p className="no-profiles-message">No more profiles to display.</p>
        <button onClick={loadProfilesFromAPI} className="load-next-button">Load More Profile</button>
        </div>
      )}
    </div>
  );
}
