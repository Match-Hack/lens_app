"use client"; 
import MyProfile from "./ProfileComponent";

export default function ProfileLoader() {
  
  return (
    <div className="main">
      <div className="description-container">
        <div className="description">
          <MyProfile></MyProfile>
        </div>
      </div>
    </div>
  );
}
