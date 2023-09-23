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
    // Simulation de l'appel à votre API avec des données fictives
    return new Promise((resolve, reject) => {
      // Données fictives de profils
      const fakeProfiles = {
        profiles: [
          {
            profileName: 'John Doe',
            profileBio: 'Software Developer',
            profileDisplayName: 'John',
            profileImage: 'john.jpg',
          },
          {
            profileName: 'Jane Smith',
            profileBio: 'Designer',
            profileDisplayName: 'Jane',
            profileImage: 'jane.jpg',
          },
          {
            profileName: 'Bob Johnson',
            profileBio: 'Data Analyst',
            profileDisplayName: 'Bob',
            profileImage: 'bob.jpg',
          },
        ],
      };

      // Simuler un délai d'attente de 1 seconde (comme une requête HTTP)
      setTimeout(() => {
        resolve(fakeProfiles);
      }, 1000);
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
