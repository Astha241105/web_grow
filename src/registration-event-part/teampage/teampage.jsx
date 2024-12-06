// teampage.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchTeamDetails } from '../../components/store/slices/teamdetails'; // Import the slice
import './teampage.css';

const Teampage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { eventId } = location.state || {}; // Extract eventId from state

  const { teamName, leader, members } = useSelector((state) => state.teamDetails.data || {});
  const loading = useSelector((state) => state.teamDetails.loading);
  const error = useSelector((state) => state.teamDetails.error);

  useEffect(() => {
    if (eventId) {
      dispatch(fetchTeamDetails(eventId)); // Dispatch action to fetch team details
    }
  }, [dispatch, eventId]);

  if (loading) return <p>Loading team details...</p>;
  if (error) return <p>Error fetching team details: {error}</p>;

  return (
    <div id="teampage">
      <div id="team-details">
        <div id="team-details-1">
          <div id="my-team">My Team</div>
          <div id="team-name">Team Name: {teamName}</div>
          <div id="team-members">
            {leader && (
              <div className="team-member">
                <div style={{fontSize:"18px",fontWeight:"500"}}>{leader.firstname} {leader.lastname} (Team Leader)</div> 
                <div style={{fontSize:"18px",fontWeight:"500"}}>{leader.email}</div>
              </div>
            )}
            {members &&
              members.map((member, index) => (
                <div className="team-member" key={index}>
                  <div style={{fontSize:"18px",fontWeight:"500"}}>{member.firstname} {member.lastname}</div> 
                  <div style={{fontSize:"18px",fontWeight:"500"}}>{member.email}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teampage; // Make sure the export is default
