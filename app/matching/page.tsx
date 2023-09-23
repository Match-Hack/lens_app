// pages/matching-page.tsx
"use client";
import { useSearchParams } from 'next/navigation'
import React from 'react';
import Matching from './matching';

export default function MatchingPage() {
    const searchParams = useSearchParams()
 
    const hack_name = searchParams.get('hack_name')
    console.log(hack_name)
  // Vérifiez si hack_name est défini
  if (typeof hack_name !== 'string') {
    return <p>Loading...</p>;
  }

  return (
    <div className="">
      <Matching hack_name={hack_name}></Matching>
    </div>
  );
}
