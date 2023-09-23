import React, { useState, useEffect } from 'react';
import './matching.css';
export default function Matching() {
  const [profiles, setProfiles] = useState([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);

  useEffect(() => {
    // Chargez les profils depuis votre API au montage du composant
    fetchProfilesFromAPI()
      .then((data) => {
        setProfiles(data.profiles);
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des profils :', error);
      });
  }, []);

  const fetchProfilesFromAPI = () => {
    // Effectuez un appel à votre API pour obtenir une liste de profils
    // Remplacez cette fonction par l'appel réel à votre API
    // L'API doit renvoyer une liste de profils au format JSON
    return fetch('votre-url-de-l-api')
      .then((response) => response.json())
      .catch((error) => {
        console.error('Erreur lors de la requête vers l\'API :', error);
      });
  };

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
      fetchProfilesFromAPI()
        .then((data) => {
          setProfiles(data.profiles);
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
      {currentProfile ? (
        <div className="profile-card">
          {/* Affichez ici les informations du profil, y compris la photo et la description */}
          <h1>{currentProfile.name}</h1>
          <p>{currentProfile.description}</p>
          <img src={currentProfile.photo} alt={currentProfile.name} />

          {/* Boutons Swipe et Pass */}
          <div className="buttons">
            <button onClick={handleSwipeLeft}>Swipe Left</button>
            <button onClick={handleSwipeRight}>Swipe Right</button>
          </div>
        </div>
      ) : (
        <p>No more profiles to display.</p>
      )}

      {/* Bouton pour charger le profil suivant */}
      <button onClick={loadNextProfile}>Load Next Profile</button>
    </div>
  );
}
