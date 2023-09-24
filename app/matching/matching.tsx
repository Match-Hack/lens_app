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
      const result = await like(wallet?.handle, currentProfile.handle);
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

      {currentProfile && !loading && !isMatch ? (
        <div className="profile-card">
          {/* Affichez ici les informations du profil avec styles */}
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

          {/* Boutons Swipe et Pass */}
          <div className="buttons">
            <button onClick={handleSwipeLeft} className="swipe-left-button">❌</button>
            <button onClick={handleSwipeRight} className="swipe-right-button">✅</button>
          </div>
        </div>
      ) : isMatch ? (
        <div>
          {/* Utilisez la classe CSS pour styliser le message */}
          <div className="description-container">
            <div className="description">
              <p className="match-message"><b>🔥It's a MATCH !🔥</b></p>
              <button onClick={handleMatchClick} className="principal-button">⏭️Continue swiping</button>
              {/* Bouton pour la page de messagerie */}
              <Link href="/messaging"> {/* Assurez-vous que "/messaging" est le bon chemin */}
                <button className="principal-button">📱Go to Messaging</button>
              </Link>
            </div>
          </div>
        </div>
      ) : !loading && (
        <p className="no-profiles-message">No more profiles to display.</p>
      )}

      {profiles.length > 0 && currentProfileIndex >= profiles.length && (
        <button onClick={loadProfilesFromAPI} className="load-next-button">Load More Profile</button>
      )}
    </div>
  );
}
