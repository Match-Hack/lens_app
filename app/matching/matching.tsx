// matching.tsx
import React, { useEffect } from 'react';

export default function Matching({ hack_name }) {
  useEffect(() => {
    // Utilisez la valeur de hack_name ici
    console.log(`Hack Name: ${hack_name}`);
  }, [hack_name]);

  if(typeof hack_name !== 'string'|| hack_name === ""){
    return <p>Loading...</p>;
    }

  return (
    <div>
      <h1>Matching Component</h1>
        <p>hack_name: {hack_name}</p>
    </div>
  );
}
