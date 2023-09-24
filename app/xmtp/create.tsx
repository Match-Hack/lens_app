"use client";
import { isValidAddress, useStartConversation } from "@xmtp/react-sdk";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Client } from "@xmtp/react-sdk";
import * as ethers from 'ethers'
import { useRouter } from 'next/router';

export default function StartConversation() {
  const router = useRouter();
  const { data } = router.query;
  console.log(data);

  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();
  const wallet = signer;

  const receiver = "0x3F11b27F323b62B159D2642964fa27C46C841897";

  const [xmtp, setXmtp] = useState<Client | null>(null);

  useEffect(() => {
    const loadClient = async () => {
      // Start a conversation with XMTP
      if (!wallet || xmtp) return;
      let tmpXmtp = await Client.create(wallet);
      const isOnNetwork = await Client.canMessage(receiver, { env: "production" });
      if (!isOnNetwork) {
        alert("Contact is not on the network. Chat unavailable");
        return;
      }
      setXmtp(tmpXmtp);
    };

    loadClient();
  }, [wallet, xmtp, receiver]);

  const PREFIX = 'lens.dev/dm';
  const buildConversationId = (profileIdA: string, profileIdB: string) => {
    const profileIdAParsed = parseInt(profileIdA, 16);
    const profileIdBParsed = parseInt(profileIdB, 16);
    return profileIdAParsed < profileIdBParsed
      ? `${PREFIX}/${profileIdA}-${profileIdB}`
      : `${PREFIX}/${profileIdB}-${profileIdA}`;
  };

  const handleStartConversation = async () => {
    if (!xmtp) return;
    const profile1 = "profile1"; // Replace with the actual profile ID or data you want to use
    const profile2 = "profile2"; // Replace with the actual profile ID or data you want to use

    const conversationId = buildConversationId(profile1, profile2);

    const conv = await xmtp.conversations.newConversation("krkmu.lens", {
      conversationId,
      metadata: {},
    });

    console.log(conv);
  };

  return (
    <div>
      <button onClick={handleStartConversation}>Start conversation</button>
    </div>
  );
}
    


/*

export const StartConversation: React.FC = () => {
  const [peerAddress, setPeerAddress] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { startConversation } = useStartConversation();

  const handleAddressChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPeerAddress(e.target.value);
    },
    [],
  );

  const handleMessageChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setMessage(e.target.value);
    },
    [],
  );

  const handleStartConversation = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (peerAddress && message) {
        setIsLoading(true);
        const conversation = await startConversation(peerAddress, message);
        setIsLoading(false);
      }
    },
    [message, peerAddress, startConversation],
  );

  return (
    <form onSubmit={handleStartConversation}>
      <input
        name="addressInput"
        type="text"
        onChange={handleAddressChange}
        disabled={isLoading}
      />
      <input
        name="messageInput"
        type="text"
        onChange={handleMessageChange}
        disabled={isLoading || !isValidAddress(peerAddress)}
      />
    </form>
  );
};*/