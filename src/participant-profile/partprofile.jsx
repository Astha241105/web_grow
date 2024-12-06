import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { useNavigate, useLocation } from 'react-router-dom';
import './part-profile.css';
import Edit from "./edit-profile/edit";
import Registered from './registered/registered';
import Badges from './badges/badges';
import Watchlist from './watchlist/watchlist';
import Certificate from './certificate/certificate';
import { fetchRegisteredEvents } from '../components/store/slices/registeredevent';
import { fetchFavoriteEvents } from '../components/store/slices/favouriteevents'; 
import { fetchParticipantProfile } from '../components/store/slices/participantprofile'; 

const Partprofile = () => {
  const [selectedOption, setSelectedOption] = useState('Edit');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { profile, isLoading, error } = useSelector((state) => state.participant);

  useEffect(() => {
    dispatch(fetchParticipantProfile());
  }, [dispatch]);

  // Handle fetching data for selected options
  useEffect(() => {
    if (selectedOption === 'Registrations') {
      dispatch(fetchRegisteredEvents());
    } else if (selectedOption === 'Watchlist') {
      dispatch(fetchFavoriteEvents());
    }
  }, [selectedOption, dispatch]);

  // Handle screen resizing
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle navigation based on selected option
  const navigateToOption = (option) => {
    setSelectedOption(option);
    if (isMobile) {
      switch (option) {
        case 'Registrations':
          navigate('/registration2');
          break;
        case 'Badges':
          navigate('/coins');
          break;
        case 'Watchlist':
          navigate('/watchlist');
          break;
        default:
          navigate('/edit');
      }
    }
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear all local storage data
    navigate('/'); // Redirect to the home page
  };

  const renderContent = () => {
    if (isMobile) {
      // On mobile screens, render based on routes
      switch (location.pathname) {
        case '/registration2':
          return <Registered />;
        case '/coins':
          return <Badges />;
        case '/watchlist':
          return <Watchlist />;
        case '/edit':
          return <Edit />;
        default:
          return <Edit />;
      }
    } else {
      // On larger screens, render content based on selectedOption
      switch (selectedOption) {
        case 'Registrations':
          return <Registered />;
        case 'Badges':
          return <Badges />;
        case 'Watchlist':
          return <Watchlist />;
        default:
          return <Edit />;
      }
    }
  };

  return (
    <div id="part-profile-render">
      <div id="part-profile">
        <div id="my-profile">My Profile</div>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : profile ? (
          <div id="part-profile-details">
            <img id="part-profile-details-img" src={profile.imageUrl} alt="Profile" />
            <div id="part-profile-details-details">
              <div id="part-profile-details-name">
                {profile.firstname || 'First Name'} {profile.lastname}
              </div>
              <div className="part-profile-details-e-and-i">{profile.email || 'Email'}</div>
            </div>
            <img
              id="edit-part-profile"
              src="/edit-profile.svg"
              alt="Edit Profile"
              onClick={() => navigateToOption('Edit')}
            />
          </div>
        ) : (
          <div>No profile data available.</div>
        )}

        <div id="part-profile-options">
          <div
            className="part-profile-options-list"
            onClick={() => navigateToOption('Registrations')}
          >
            <img src="/registered.svg" alt="Registrations" />
            <div className="part-profile-options-list-1">Registrations/Applications</div>
          </div>
          <div
            className="part-profile-options-list"
            onClick={() => navigateToOption('Badges')}
          >
            <img src="/badge.svg" alt="Badges" />
            <div className="part-profile-options-list-1">Badges and Coins</div>
          </div>
          <div
            className="part-profile-options-list"
            onClick={() => navigateToOption('Watchlist')}
          >
            <img src="/liked.svg" alt="Watchlist" />
            <div className="part-profile-options-list-1">Watchlist</div>
          </div>
          <div className="part-profile-options-list" onClick={handleLogout}>
            <img src="/logout.svg" alt="Logout" />
            <div className="part-profile-options-list-1">Log out</div>
          </div>
        </div>
      </div>
      <div id="part-profile-content">{renderContent()}</div>
    </div>
  );
};

export default Partprofile;
