// app/page.tsx
'use client'
import { useExploreProfiles } from '@lens-protocol/react-web'
import Link from 'next/link'
import {Publications, Theme} from "@lens-protocol/widgets-react";

export default function Nader() {
  const { data: profiles } = useExploreProfiles({
    limit: 25
  })
  
  return (
    
    <div className='p-20'>
      <Publications
      handle="nader"
      theme={Theme.dark}/>
      </div>
      
  )
}