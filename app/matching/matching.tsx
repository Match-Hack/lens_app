import React, { useState, useEffect } from 'react';
import './matching.css';
import { useActiveProfile } from "@lens-protocol/react-web";
import { getFilteredProfile } from '../api/callTaMere';
import { useSearchParams } from 'next/navigation'

export default function Matching() {
  const [profiles, setProfiles] = useState([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const { data: wallet, loading } = useActiveProfile();
  const searchParams = useSearchParams()
  const hack_name = searchParams.get('hack_name')

  useEffect(() => {
    // Chargez les profils depuis votre API au montage du composant
    console.log(wallet?.handle, hack_name, loading)
    if(!loading && wallet?.handle !== undefined && hack_name !== null && profiles.length === 0){
      getFilteredProfile(wallet?.handle ?? "",hack_name)
        .then((data) => {
          console.log("data", data)
          setProfiles(data.Social);
        })
        .catch((error) => {
          console.error('Erreur lors du chargement des profils :', error);
        });
    }
    console.log("profiles", profiles)
    if(profiles.length >0){
      console.log("profiles", profiles)
    }
  }, [loading, wallet?.handle,profiles]);

  const handleSwipeLeft = () => {
    // Enregistrez la décision de swipe à gauche (passer) via votre API si nécessaire
    // Passez au profil suivant
    setCurrentProfileIndex(currentProfileIndex + 1);
  };

  const handleSwipeRight = () => {
    // Enregistrez la décision de swipe à droite (like) via votre API si nécessaire
    // Passez au profil suivant
    setCurrentProfileIndex(currentProfileIndex + 1);
  };

  const loadNextProfile = () => {
    // Si nous avons atteint la fin de la liste des profils, rechargez les profils depuis l'API
    if (currentProfileIndex >= profiles.length - 1) {
      getFilteredProfile(wallet?.handle ?? "",hack_name)
        .then((data) => {
          setProfiles(data.Social);
          setCurrentProfileIndex(0);
        })
        .catch((error) => {
          console.error('Erreur lors du chargement des profils :', error);
        });
    } else {
      // Passez simplement au profil suivant
      setCurrentProfileIndex(currentProfileIndex + 1);
    }
  };

  const currentProfile = profiles[currentProfileIndex];

 

  return (
    <div className="main">
      {loading && <p>Loading...</p>}
      {currentProfile && !loading ? (
        <div className="profile-card">
          {/* Affichez ici les informations du profil avec styles */}
          <div className="profile-image">
            <img src={currentProfile.profileImage} alt={currentProfile.profileName} />
          </div>
          <h1 className="profile-name">{currentProfile.profileName}</h1>
          <p className="profile-bio">{currentProfile.profileBio}</p>
          <p className="profile-display-name">{currentProfile.profileDisplayName}</p>

          {/* Boutons Swipe et Pass */}
          <div className="buttons">
            <button onClick={handleSwipeLeft} className="swipe-left-button">❌</button>
            <button onClick={handleSwipeRight} className="swipe-right-button">✅</button>
          </div>
        </div>
      ) : (
        <p className="no-profiles-message">No more profiles to display.</p>
      )}

      {profiles.length > 0 && currentProfileIndex >= profiles.length && (
        <button onClick={loadNextProfile} className="load-next-button">Load More Profile</button>
      )}
    </div>
  );
}
