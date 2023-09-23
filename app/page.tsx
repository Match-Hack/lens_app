"use client"; // Marquez cette ligne comme un Client Component
import {
  useWalletLogin,
  useWalletLogout,
  useActiveProfile,
} from "@lens-protocol/react-web";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import Link from 'next/link';
import ImageLens from './logo_lens.png';

export default function Authentication() {
  const { execute: login, isPending: isLoginPending } = useWalletLogin();
  const { execute: logout } = useWalletLogout();
  const { data: wallet, loading } = useActiveProfile();
  const { isConnected } = useAccount();
  const { disconnectAsync } = useDisconnect();

  const { connectAsync } = useConnect({
    connector: new InjectedConnector(),
  });

  const onLoginClick = async () => {
    if (isConnected) {
      await disconnectAsync();
    }

    const { connector } = await connectAsync();

    if (connector instanceof InjectedConnector) {
      const walletClient = await connector.getWalletClient();

      await login({
        address: walletClient.account.address,
      });
    }
  };

  return (
    <div className="main">
    <div className="description-container">
      <div className="description">
      {loading && <p>Loading...</p>}
    
      {!wallet && !loading && (
        <div>
        <h1 className="title">Authentication</h1>
        <button
          className="principal-button"
          disabled={isLoginPending}
          onClick={onLoginClick}
        >
          Sign in
        </button>
        </div>
      )}
      
      {wallet && !loading && (
        
        <div>
          <div className="redirect">
            <Link href="/hackathons">
              <button>🔥Hackathons & Hackers🔥</button>
            </Link>
          </div>
          <div className="ma-ligne"></div>
          <img
            src={ImageLens.src} // Utilisez .src pour obtenir l'URL
            className="lens-image"
          />
          <h1 className="title">Your profile 🌱</h1>
          
          <h2><b>{wallet.handle}</b></h2>
          <p>{wallet.bio}</p>
          <button
            onClick={logout}
            className="principal-button"
          >
            Sign out
          </button>
        </div>
      )}
      </div>
    </div>
    </div>
  );
}
