import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'; // Import useDispatch
import './part-profile.css';
import Edit from "./edit-profile/edit";
import Registered from './registered/registered';
import Badges from './badges/badges';
import Watchlist from './watchlist/watchlist';
import Certificate from './certificate/certificate';
import { fetchRegisteredEvents } from '../components/store/slices/registeredevent'; 

const Partprofile = () => {
  const [selectedOption, setSelectedOption] = useState('Edit'); 
  const dispatch = useDispatch();

  useEffect(() => {

    if (selectedOption === 'Registrations') {
      console.log("dispatch")
      dispatch(fetchRegisteredEvents());
    }
  }, [selectedOption, dispatch]);

  const renderContent = () => {
    switch (selectedOption) {
      case 'Registrations':
        return <Registered />; 
      case 'Badges':
        return <Badges />;
      case 'Watchlist':
        return <Watchlist />;
      case 'Certificates':
        return <Certificate />;
      default:
        return <Edit />;
    }
  };

  return (
    <div id="part-profile-render">
      <div id="part-profile">
        <div id="my-profile">My Profile</div>
        <div id="part-profile-details">
          <img id="part-profile-details-img" alt="Profile" />
          <div id="part-profile-details-details">
            <div id="part-profile-details-name">Astha</div>
            <div className="part-profile-details-e-and-i">email@example.com</div>
            <div className="part-profile-details-e-and-i">Institute Name</div>
          </div>
          <img id="edit-part-profile" src="/edit-profile.svg" alt="Edit Profile" />
        </div>

        <div id="part-profile-options">
          <div
            className="part-profile-options-list"
            onClick={() => setSelectedOption('Registrations')}
          >
            <img src="/registered.svg" alt="Registrations" />
            <div className="part-profile-options-list-1">Registrations/Applications</div>
          </div>
          <div
            className="part-profile-options-list"
            onClick={() => setSelectedOption('Badges')}
          >
            <img src="/badge.svg" alt="Badges" />
            <div className="part-profile-options-list-1">Badges and Coins</div>
          </div>
          <div
            className="part-profile-options-list"
            onClick={() => setSelectedOption('Watchlist')}
          >
            <img src="/liked.svg" alt="Watchlist" />
            <div className="part-profile-options-list-1">Watchlist</div>
          </div>
          <div
            className="part-profile-options-list"
            onClick={() => setSelectedOption('Certificates')}
          >
            <img src="/certificate.svg" alt="Certificates" />
            <div className="part-profile-options-list-1">Certificates</div>
          </div>
          <div
            className="part-profile-options-list"
            onClick={() => setSelectedOption('Logout')}
          >
            <img src="/logout.svg" alt="Logout" />
            <div className="part-profile-options-list-1">Log out</div>
          </div>
        </div>

        <div id="part-profile-content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Partprofile;
