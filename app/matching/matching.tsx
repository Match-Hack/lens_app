"use client";
import React, { useState, useEffect } from 'react';
import './matching.css';
import { useActiveProfile } from "@lens-protocol/react-web";
import { getFilteredProfile } from '../api/callTaMere';
import { useSearchParams } from 'next/navigation';

export default function Matching() {
  const [profiles, setProfiles] = useState([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
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

  const handleSwipeRight = () => {
    // Enregistrez la décision de swipe à droite (like) via votre API si nécessaire
    // Passez au profil suivant
    setCurrentProfileIndex(currentProfileIndex + 1);
  };

  const currentProfile = profiles[currentProfileIndex];

  return (
    <div className="main">
      {loading && <p>Loading...</p>}
      {currentProfile && !loading ? (
        <div className="profile-card">
          {/* Affichez ici les informations du profil avec styles */}
          <div className="profile-image">
            <img src={currentProfile.picture?.uri} alt={currentProfile.name} />
          </div>
          <h1 className="profile-name">{currentProfile.name}</h1>
          <p className="profile-bio">{currentProfile.bio}</p>
          <p className="profile-display-name">{currentProfile.handle}</p>

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
        <button onClick={loadProfilesFromAPI} className="load-next-button">Load More Profile</button>
      )}
    </div>
  );
}
