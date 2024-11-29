import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeams } from '../../components/store/slices/listofteams';
import { fetchEvents } from '../../components/store/slices/listofevents';
import { joinTeamRequest } from '../../components/store/slices/joinrequest';
import { createTeam } from '../../components/store/slices/creatingteampart'; 
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

 
  const { teams, loading: teamsLoading } = useSelector((state) => state.teams);
  const { loading: joinRequestLoading } = useSelector((state) => state.teamRequest);

  
  useEffect(() => {
    if (eventId) {
      dispatch(fetchTeams(eventId));
    }
  }, [dispatch, eventId]);

  const team1 = teams?.data || [];


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
    const participantId = 123; 
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
        </div>
        <div id="cancel-part-team">Cancel Team</div>
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
        </div>
      )}


      {selected === 'join' && !teamsLoading && (
        <div id="join-teams">
          <h3>Teams available to join</h3>
          {team1.length === 0 ? (
            <p>No teams available for this event.</p>
          ) : (
            team1.map((team) => (
              <div key={team.id} className="team-card">
                <h5>{team.name}</h5>
                <button
                  onClick={() => handleRequestToJoinTeam(team.id)}
                  disabled={joinRequestLoading}
                >
                  {joinRequestLoading ? 'Sending request...' : 'Request to Join'}
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {selected === 'create' && (
        <button onClick={handleCreateTeam}>Create Team</button>
      )}
    </div>
  );
};

export default Creatingteam;
