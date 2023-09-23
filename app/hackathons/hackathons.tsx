import Image1 from './ethglobalny.png';
import Image2 from './ethglobalinstanbul.png';

export default function Hackathons() {
  return (
    <div className="main">
      <div className="card-container">
        <div className="card">
          <img
            src={Image1.src} // Utilisez .src pour obtenir l'URL
            className="card-image"
          />
          <button className="card-button">Let's MAAATCH 🔥</button>
        </div>

        <div className="card">
          <img
            src={Image2.src} // Utilisez .src pour obtenir l'URL
            className="card-image"
          />
          <button className="card-button">Let's MAAATCH 🔥</button>
        </div>
      </div>
    </div>
  );
}
