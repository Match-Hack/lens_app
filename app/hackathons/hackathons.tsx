import Image1 from './ethglobalny.png';
import Image2 from './ethglobalinstanbul.png';
import Link from 'next/link';

export default function Hackathons() {
  return (
    <div className="main">
      <div className="card-container">
        <div className="card">
          <img
            src={Image1.src} // Utilisez .src pour obtenir l'URL
            className="card-image"
          />
          <Link href="/matching?hack_name=ETHGLOBAL_PARIS">
            <button className="card-button">Let's MAAATCH 🔥</button>
          </Link>
        </div>

        <div className="card">
          <img
            src={Image2.src} // Utilisez .src pour obtenir l'URL
            className="card-image"
          />
          <Link href="/matching?hack_name=ETHGLOBAL_INSTANBUL">
            <button className="card-button">Let's MAAATCH 🔥</button>
          </Link>

          
        </div>
      </div>
    </div>
  );
}
