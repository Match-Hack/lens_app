"use client";
import Image1 from './ethglobalny.png';
import Image2 from './ethglobalinstanbul.png';
import { registerForHackathon } from '../api/callTaMere';
import { useActiveProfile } from "@lens-protocol/react-web";

export default function Hackathons() {
  const { data: wallet, loading } = useActiveProfile();

  const Register = async (hack_name: string) => {
    try {
      await registerForHackathon(wallet?.handle ?? "", hack_name);
      // Une fois que l'enregistrement est terminé, effectuez la redirection
      console.log("Enregistrement au hackathon réussi !");
      window.location.href = `/matching?hack_name=${hack_name}`;
    } catch (error) {
      // Gérer les erreurs si nécessaire
      console.error("Erreur lors de l'enregistrement au hackathon :", error);
    }
  };

  return (
    <div className="main">
      <div className="card-container">
        <div className="card">
          <img
            src={Image1.src} // Utilisez .src pour obtenir l'URL
            className="card-image"
          />
          <button
            className="card-button"
            onClick={() => Register("ETHGLOBAL_NY")}
          >
            Let's MAAATCH 🔥
          </button>
        </div>

        <div className="card">
          <img
            src={Image2.src} // Utilisez .src pour obtenir l'URL
            className="card-image"
          />
          <button
            className="card-button"
            onClick={() => Register("ETHGLOBAL_INSTANBUL")}
          >
            Let's MAAATCH 🔥
          </button>
        </div>
      </div>
    </div>
  );
}
