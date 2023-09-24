"use client";
import { Conversation } from "@xmtp/react-sdk";

import { Client } from "@xmtp/xmtp-js";
import * as ethers from 'ethers'
import { useEffect, useState } from "react";
import "./messaging.css"; 

export default function ChatModule() {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum)
  const signer = provider.getSigner();
  const wallet = signer;
  console.log("wallet : ",wallet); 

  const receiver = "0x3F11b27F323b62B159D2642964fa27C46C841897";//"0x3F11b27F323b62B159D2642964a27C46C841897";

  const [xmtp, setXmtp] = useState<Client | null>(null);
  const [conversation, setConversation] = useState<Conversation | null>(null);

  useEffect(() => {
    const loadClient = (async () => {
      // Start a conversation with XMTP
      if (!wallet || xmtp) return;
      let tmpXmtp = await Client.create(wallet);
      const isOnNetwork = await Client.canMessage(
        receiver,
        { env: "production" },
      );
      if(!isOnNetwork){
        alert("Contact is not on the network. Chat unavailable");
        return;
      }
      setXmtp(tmpXmtp);
      setConversation(await tmpXmtp.conversations.newConversation(
        receiver
      ));
      getMessages(tmpXmtp);
    }
    );
    loadClient();
  }, [wallet]);

  // continuously listen for new messages
  setInterval(() => {
    (async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      try {
        console.log('scanning ...');

        for await (const message of await conversation!.streamMessages()) {
          if (message.senderAddress === xmtp!.address) {
            // This message was sent from me
            continue;
          }
          console.log(`New message from ${message.senderAddress}: ${message.content}`);
          getMessages(xmtp);
        }
      }
      catch (e){
        console.error(e);
      }
        // wait for 3 seconds
        await new Promise((resolve) => setTimeout(resolve, 3000));
    }
    );
  }, 2000);

  const sendMessage = async (data: string) => {
    // Send a message
    console.log("___sending message___");
    if (!conversation) return;
    await conversation.send(data).then((res: any) => {
      console.log("response: ", res);
    });
    // empty input field
    const inputData = document.getElementById('newMessage');
    if (inputData) {
      (inputData as HTMLInputElement).value = '';
    }
    // update messages
    getMessages(xmtp);
  }


  async function getMessages(xmtp: any) {
    // Create the client with your wallet. This will connect to the XMTP development network by default
    const allMessages = [];
    for (const conversation of await xmtp.conversations.list()) {
      allMessages.push(await conversation.messages());
    }

    // replace element with id 'messages' with messages*
    const messages = document.getElementById('messages');
    if (messages) {
      const messagesDisplayed: string = allMessages[0].map((message: any) => {
        const time = message.sent.toString()
          .split('2023 ')[1]
          .split(' GMT+0200')[0]
          .split(':')
        return `<p>${time[0] + ':' + time[1]}\t|\t${message.senderAddress} sent:\t\t${message.content}</p>`
      }).join('');
      console.log("messagesDisplayed: ", messagesDisplayed);
      messages.innerHTML = messagesDisplayed;
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>XMTP</h1>
      </div>
      <div className="chat-messages">
        {/* Render chat messages here */}
      </div>
      <div className="chat-input">
        <input id="newMessage" className="chat-input-field" placeholder="Type a message..."></input>
        <button className="chat-send-button" onClick={async () => {
          const isOnNetwork = await Client.canMessage(
            receiver,
            { env: "production" },
          );
          if (!isOnNetwork) {
            alert("Contact is not on the network. Chat unavailable");
            return;
          }
          sendMessage(
            (document.getElementById('newMessage') as HTMLInputElement).value
          );
        }}>Send</button>
      </div>
    </div>
  );
}

