import React from 'react'
import "./part-profile.css"

const Partprofile = () => {
  return (
    <div id="part-profile">
        <div id="my-profile">My Profile</div>
        <div id="part-profile-details">
            <img id="part-profile-details-img"></img>
            <div id="part-profile-details-details">
              <div id="part-profile-details-name">Astha</div>
              <div className="part-profile-details-e-and-i">email</div>
              <div className="part-profile-details-e-and-i">institute</div>
            </div>
        </div>
        <div id="part-profile-options">
          <div className="part-profile-options-list"><img src="/registered.svg"></img><div className="part-profile-options-list-1">Registrations/Applications</div></div>
          <div className="part-profile-options-list"><img src="/badge.svg"></img><div className="part-profile-options-list-1">Badges and Coins</div></div>
          <div className="part-profile-options-list"><img src="/liked.svg"></img><div className="part-profile-options-list-1">Watchlist</div></div>
          <div className="part-profile-options-list"><img src="/certificate.svg"></img><div className="part-profile-options-list-1">Certificates</div></div>
          <div className="part-profile-options-list"><img src="/logout.svg"></img><div className="part-profile-options-list-1">Log out</div></div>
        </div>
      
    </div>
  )
}

export default Partprofile
