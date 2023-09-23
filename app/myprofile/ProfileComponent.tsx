"use client"; // Marquez cette ligne comme un Client Component
import React from 'react';
import { useActiveProfile } from "@lens-protocol/react-web";
import Link from 'next/link';

export default function MyProfile() {
  const { data: wallet, error, loading } = useActiveProfile();

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  if (wallet === null) return <p>No active profile</p>;

  // Divisez les statistiques en deux groupes
  const firstStats = [
    { label: 'Comments Count:', value: wallet.stats.commentsCount || 'None' },
    { label: 'Mirrors Count:', value: wallet.stats.mirrorsCount || 'None' },
    { label: 'Posts Count:', value: wallet.stats.postsCount || 'None' },
    { label: 'Total Collects:', value: wallet.stats.totalCollects || 'None' },
  ];

  const secondStats = [
    { label: 'Total Comments:', value: wallet.stats.totalComments || 'None' },
    { label: 'Total Followers:', value: wallet.stats.totalFollowers || 'None' },
    { label: 'Total Following:', value: wallet.stats.totalFollowing || 'None' },
    { label: 'Total Mirrors:', value: wallet.stats.totalMirrors || 'None' },
  ];

  return (
    <div className="profile-container">
      <h1 className='title'>My Profile</h1>
      <div className="profile-picture">
        {wallet.picture ? (
          <img src={wallet.picture.original.url} alt="Profile Picture" className='profile-image' />
        ) : (
          <div className="no-picture">No Picture</div>
        )}
      </div>
      <div className="stats-container">
        <div className="stats-group">
          {firstStats.map((stat) => (
            <div key={stat.label} className="stat-item">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
            </div>
          ))}
        </div>
        <div className="stats-group">
          {secondStats.map((stat) => (
            <div key={stat.label} className="stat-item">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
      <table className="profile-table">
        <tbody>
          <tr>
            <td className="table-label">Name:</td>
            <td>{wallet.name || 'None'}</td>
          </tr>
          <tr>
            <td className="table-label">Bio:</td>
            <td>{wallet.bio || 'None'}</td>
          </tr>
          <tr>
            <td className="table-label">Handle:</td>
            <td><b>{wallet.handle || 'None'}</b></td>
          </tr>
          <tr>
            <td className="table-label">Interests:</td>
            <td>{wallet.interests.length ? wallet.interests.join(', ') : 'None'}</td>
          </tr>
          <tr>
            <td className="table-label">Location:</td>
            <td>{wallet.attributes.location.attribute.value || 'None'}</td>
          </tr>
          <tr>
            <td className="table-label">Education:</td>
            <td>{wallet.attributes.education.attribute.value || 'None'}</td>
          </tr>
          <tr>
            <td className="table-label">Experience:</td>
            <td>{wallet.attributes.experience.attribute.value || 'None'}</td>
          </tr>
          <tr>
            <td className="table-label">Projects:</td>
            <td>{wallet.attributes.projects.attribute.value || 'None'}</td>
          </tr>
          <tr>
            <td className="table-label">Skills:</td>
            <td>{wallet.attributes.skills.attribute.value || 'None' }</td>
          </tr>
        </tbody>
      </table>
      <Link href="/" className='principal-button'>
        Go Home
      </Link>
    </div>
  );
}
