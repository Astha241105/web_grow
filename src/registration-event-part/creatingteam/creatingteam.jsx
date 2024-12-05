import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeams } from '../../components/store/slices/listofteams';
import { joinTeamRequest } from '../../components/store/slices/joinrequest';
import { createTeam } from '../../components/store/slices/creatingteampart'; 
import { fetchParticipantProfile } from '../../components/store/slices/participantprofile'; // Add this import for fetching participant details
import './creatingteam.css';

const Creatingteam = () => {
  const location = useLocation();
  const { eventId } = location.state || {}; 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selected, setSelected] = useState('create');
  const [teamName, setTeamName] = useState('');
  const [publicTeam, setPublicTeam] = useState(true); 
  const [errorMessage, setErrorMessage] = useState('');
  const [participants, setParticipants] = useState([]);  // State to store participant details

  const { teams, loading: teamsLoading } = useSelector((state) => state.teams);
  const { loading: joinRequestLoading } = useSelector((state) => state.teamRequest);
  const { profile, isLoading: participantLoading, error } = useSelector((state) => state.participant);

  useEffect(() => {
    if (eventId) {
      dispatch(fetchTeams(eventId));
      dispatch(fetchParticipantProfile()); 
    }
  }, [dispatch, eventId]);

  useEffect(() => {
    if (profile) {
      setParticipants(profile);
    }
  }, [profile]);

  const team1 = teams?.data || [];
  const handleCancelTeam = () => {
    const confirmCancel = window.confirm("Are you sure you want to cancel creating the team?");
    if (confirmCancel) {
      navigate('/'); // Redirect to the home page
    }
  };
  
  const handleCreateTeam = () => {
    if (!eventId) {
      console.error('Event ID is not available');
      return;
    }
 
    const existingTeam = team1.find((team) => team.name.toLowerCase() === teamName.toLowerCase());
    if (existingTeam) {
      setErrorMessage('Team with this name already exists.');
      return;
    }

    const teamData = { teamName, public: publicTeam };
    dispatch(createTeam({ eventId, teamData }))
      .unwrap()
      .then((response) => {
        console.log('Team created successfully:', response);
        navigate(`/`); 
      })
      .catch((error) => {
        console.error('Failed to create team:', error);
      });
  };

  const handleRequestToJoinTeam = (teamId) => {
    dispatch(joinTeamRequest(teamId)) 
      .unwrap()
      .then(() => {
        console.log('Request to join team sent');
      })
      .catch((error) => {
        console.error('Failed to send join request:', error);
      });
  };
  return (
    <div id="create-or-join">
      <div id="create-and-cancel">
        <div id="create-and-join">
          <div
            id="creating-team"
            className={selected === 'create' ? 'active' : ''}
            onClick={() => setSelected('create')}
          >
            Create team
          </div>
          <div
            id="joining-team"
            className={selected === 'join' ? 'active' : ''}
            onClick={() => setSelected('join')}
          >
            Join team
          </div>
        </div><div id="cancel-part-team" onClick={handleCancelTeam}>
  Cancel Team
</div>
      </div>

      {selected === 'create' && (
        <div id="create-team-name">
          <label className="create-team-name-label">Team name</label>
          <input
            id="create-team-name-input"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Enter team name"
          />
          <div className="create-team-name-label">Team Members</div>
          <div id="team-members">
            {participantLoading ? (
              <p>Loading participants...</p>
            ) : profile ? (
              <div key={profile.id} className="team-member">
                <p style={{ fontSize: "18px", fontWeight: "600", margin: "10px 20" }}>
                 {profile.firstname} {profile.lastname} (Team Leader)
                                                        </p>
                <p style={{ fontSize: "18px", fontWeight: "600", margin: "10px 20" }}>{profile.email}</p>
              </div>
            ) : (
              <p>No participants available.</p>
            )}
          </div>
        </div>
      )}

      {selected === 'join' && !teamsLoading && (
        <div id="join-teams">
          <div style={{ fontSize: "24px", fontWeight: "600", margin: "30px 00px" }}>Your Profile</div>
           <div id="team-members">
            {participantLoading ? (
              <p>Loading participants...</p>
            ) : profile ? (
              <div key={profile.id} className="team-member">
                <p style={{ fontSize: "18px", fontWeight: "600", margin: "10px 20" }}>
                 {profile.firstname} {profile.lastname}
                                                        </p>
                <p style={{ fontSize: "18px", fontWeight: "600", margin: "10px 20" }}>{profile.email}</p>
              </div>
            ) : (
              <p>No participants available.</p>
            )}
          </div>
          <h3  style={{ fontSize: "16px", fontWeight: "500", margin: "30px 0px" }}>Request to Join</h3>
          <div id="line2"></div>
          {team1.length === 0 ? (
            <p>No teams available for this event.</p>
          ) : (
            team1.map((team) => (
              <div key={team.id} className="team-card">
                <div>
                <h5 style={{ fontSize: "18px", fontWeight: "500" }}>{team.leaderName}({team.name})</h5>
                <h5 style={{ fontSize: "18px", fontWeight: "500" }}>{team.leaderEmail}</h5></div>
                <button
                  onClick={() => handleRequestToJoinTeam(team.id)}
                  disabled={joinRequestLoading}
                >
                  {joinRequestLoading ? 'Requesting' : 'Request'}
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {selected === 'create' && (
        <button onClick={handleCreateTeam} id="create-team">Create Team</button>
      )}
    </div>
  );
};

export default Creatingteam;
