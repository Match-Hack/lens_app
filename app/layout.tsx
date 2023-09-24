// app/layout.tsx
"use client";
import React from 'react';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { LensProvider, LensConfig, production } from '@lens-protocol/react-web';
import { bindings as wagmiBindings } from '@lens-protocol/wagmi';
import Navbar from './Navbar';
import { MainContext } from '../context';
import { Client, Conversation } from '@xmtp/xmtp-js';
import { ethers } from 'ethers';
import { useState, useRef } from 'react';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const { polygonMumbai, polygon } = require('wagmi/chains');
const { publicClient, webSocketPublicClient } = configureChains([polygonMumbai, polygon], [publicProvider()]);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: [
    new InjectedConnector({
      options: {
        shimDisconnect: false,
      },
    }),
  ],
});

const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: production,
};

export default function XMTPApp({ Component, pageProps }: AppProps) {
  const [client, setClient] = useState<Client | undefined>();
  const [provider, setProvider] = useState<any>(null);
  const [address, setAddress] = useState('');
  const [currentConversation, setCurrentConversation] = useState<Conversation | undefined>();
  const profilesRef = useRef({});

  async function connect() {
    const addresses = await window.ethereum.send('eth_requestAccounts');
    setAddress(addresses.result[0]);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    initClient(provider);
  }

  async function initClient(wallet: any) {
    if (wallet && !client) {
      try {
        const signer = wallet.getSigner();
        const xmtp = await Client.create(signer, {
          env: 'production',
        });
        setClient(xmtp);
      } catch (e) {
        console.error(e);
      }
    }
  }

  return (
    <WagmiConfig config={config}>
      <LensProvider config={lensConfig}>
        <div>
          <Navbar />
          <MainContext.Provider
            value={{
              provider,
              client,
              connect,
              address,
              currentConversation,
              setCurrentConversation,
              profilesRef,
            }}
          >
            <Component {...pageProps} />
          </MainContext.Provider>
        </div>
      </LensProvider>
    </WagmiConfig>
  );
}