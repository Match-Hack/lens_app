'use client'; 
import React from 'react';
import Link from 'next/link';
import { useWalletLogin, useWalletLogout, useActiveProfile } from "@lens-protocol/react-web";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import ImageLens from './lens_match.png';
import MatchLogo from './matchlogo.png';

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
          {loading && (
            <div>
              <img
                src={MatchLogo.src}
                className="match-image"
              />
              <p>Loading...</p>
            </div>
          )}

          {!wallet && !loading && (
            <div>
              <h1 className="title">Authentication</h1>
              <p className="description-text">
                Connect your wallet with your <b>Lens profile</b> to access your account and discover hackathons
                and hackers.
              </p>
              <img
                src={ImageLens.src}
                className="lens-image"
              />
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
                <img
                  src={MatchLogo.src}
                  className="match-image"
                />
                <Link href="/hackathons">
                  <button>Discover Hackathons & Hackers🔥</button>
                </Link>
              </div>
              <div className="ma-ligne"></div>
              {wallet.picture ? (
                <img
                  src={(wallet.picture as any).picture?.uri || (wallet.picture as any).original?.url || ImageLens.src}
                  alt="Profile Picture"
                  className='profile-image'
                />
              ) : (
                <img
                  src={ImageLens.src}
                  alt="Profile Picture"
                  className="lens-image"
                />
              )}
              <h1 className="title">Your profile 🌱</h1>
              <h2><b>{wallet.handle}</b></h2>
              <p>{wallet.bio}</p>
              <Link href="/myprofile" className='principal-button'>
                Edit my profile
              </Link>
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
