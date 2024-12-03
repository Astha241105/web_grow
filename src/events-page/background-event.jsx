import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchEventDetailsPublic } from '../components/store/slices/publiceventdetails';
import './background-event.css';
import './event-name/eventname.css';
import './nav-event/navEvent.css';
import './details/details.css';
import './details/Dates/dates.css';
import "./participant-details/participantDetails.css"

const BackgroundEvent = () => {
  const location = useLocation();
  const { eventId } = location.state || {};

  const dispatch = useDispatch();
  const { event, status, error } = useSelector((state) => state.eventDetailsPublic);

  useEffect(() => {
    if (eventId) {
      console.log('Registering for event ID:', eventId);
      dispatch(fetchEventDetailsPublic(eventId));
    }
  }, [dispatch, eventId]);

  if (status === 'loading') {
    return <div>Loading event details...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (!event) {
    return <div>No event details available</div>;
  }

  const lastUpdate = event.lastUpdate;
  const date = new Date(lastUpdate);
  const formattedDate = date.toLocaleDateString('en-US');

  const dateregi = new Date(event.registerEnd);
  const registerend = dateregi.toLocaleDateString('en-US');

  const dateregis = new Date(event.registerEnd);
  const registerstart = dateregis.toLocaleDateString('en-US');

  const dateTime = new Date(event.startTime);
  const formattedDatestart = dateTime.toLocaleDateString('en-US');
  const formattedTimestart = dateTime.toLocaleTimeString('en-US');

  const dateTimeend = new Date(event.endTime);
  const formattedDateend = dateTimeend.toLocaleDateString('en-US');
  const formattedTimeend = dateTimeend.toLocaleTimeString('en-US');

  function capitalizeFirstLetter(sentence) {
    if (!sentence) return '';
    return sentence
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  return (
    <div id="background-event">
      <div id="background-event-all-details">
        <div id="for-content-and-image">
          <div id="eventname-back">
            <div id="name-of-event">{capitalizeFirstLetter(event.title)}</div>
            <div id="institute">
              <img className="event-name-images" src="/college.svg" alt="college" />
              <div className="eventname-text">
                {capitalizeFirstLetter(event.host.organization)}
              </div>
            </div>
            <div id="type-event">
              <img className="event-name-images" src="/deadline.svg" alt="event type" />
              <div className="eventname-text">Deadline : {registerend}</div>
            </div>
            <div id="location">
              <img className="event-name-images" src="/location.svg" alt="location" />
              <div className="eventname-text">
                {capitalizeFirstLetter(event.location)}
              </div>
            </div>
            <div id="event-updatedon">
              <div id="event-updatedon-1">Updated on:&nbsp;</div>
              <div>{formattedDate}</div>
            </div>
            <div id="event-skill">{capitalizeFirstLetter(event.mode)}</div>
            <button id="phone-register-now">Register Now</button>
          </div>
          <div>
            <img id="logo-of-event" src={`${event.imageUrl}`} alt="Event Logo" />
          </div>
        </div>
        <div id="phone-block-event">
        <div  id="registered1"className='part-details-info1'>
        <img className="part-details-img1" src="/people.svg" alt="Registered Icon" />
        <div className="minor-details1">
        <div  >Registered Candidates</div>
        <div>400</div></div>
      </div>
      <div id="team1" className='part-details-info1'>
        <img className="part-details-img1" src="/team.svg" alt="Team Size Icon" />
        <div  className="minor-details1">
        <div>Team Size</div>
        <div>400</div></div>
      </div>
      <div id="deadline1" className='part-details-info1'>
        <img className="part-details-img1" src="/deadline.svg" alt="Deadline Icon" />
        <div className="minor-details1">
        <div  >Deadline</div>
        <div>400</div></div>
      </div>
        </div>
        <div id="event-details">
          {event.timelineEntries && event.timelineEntries.length > 0 && (
            <div id="stages-and-timeline">
              <div id="stages-and-timeline-head">Stages and timeline</div>
              <div id="stages-and-timeline-content">
                {event.timelineEntries.map((entry, index) => (
                  <div className="stages-and-timeline-1" key={index}>
                    <div>
                      <div className="stages-and-timeline-1-head">{`Day ${entry.day}`}</div>
                      <div className="stages-and-timeline-1-content">{entry.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div id="stages-and-timeline">
            <div id="stages-and-timeline-head">Date and Deadline</div>
            <div id="stages-and-timeline-content">
              <div className="stages-and-timeline-1">
                <div>
                  <div className="stages-and-timeline-1-head">
                    Registration Start from:
                  </div>
                  <div className="stages-and-timeline-1-content">
                    {registerstart}
                  </div>
                </div>
                <div>
                  <div className="stages-and-timeline-1-head">
                    Registration Ends on:
                  </div>
                  <div className="stages-and-timeline-1-content">
                    {registerend}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="stages-and-timeline">
            <div id="stages-and-timeline-head">Details</div>
            <div id="stages-and-timeline-content">
              <div className="stages-and-timeline-1">
                <div>
                  <div className="stages-and-timeline-1-head">Introduction</div>
                  <div className="stages-and-timeline-1-content">{event.description}</div>
                </div>
                <div>
                  <div className="stages-and-timeline-1-head">Team and Eligibility</div>
                  <div className="stages-and-timeline-1-content">
                    {event.maxTeamSize
                      ? `Team of minimum ${event.maxTeamSize} and maximum ${event.maxTeamSize} is allowed.`
                      : 'Individual participation is allowed.'}
                  </div>
                </div>
                <div>
                  {(event.location || event.url) && (
                    <div>
                      <div className="stages-and-timeline-1-head">
                        {event.location ? 'Venue' : 'URL'}
                      </div>
                      <div className="stages-and-timeline-1-content">
                        {event.location
                          ? capitalizeFirstLetter(event.location)
                          : event.url}
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <div className="stages-and-timeline-1-head">Timeline</div>
                  <div className="stages-and-timeline-1-content">
                    Event Start from: {formattedDatestart} {formattedTimestart}
                    <br />
                    Event Ends on: {formattedDateend} {formattedTimeend}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="organizer-details">
          <div id="stages-and-timeline-head">Organizers</div>
          <div id="stages-and-timeline-content">
            <div className="stages-and-timeline-1">
              {event.host && (
                <div className="organizer-details-blocks">
                  <img
                    className="organizer-details-blocks-image"
                    src={`${event.host.imageUrl}`}
                    alt=""
                  />
                  <div>
                    <div className="organizer-details-blocks-text-1">
                      {event.host.firstName} {event.host.lastName}
                    </div>
                    <div className="organizer-details-blocks-text-2">{event.host.email}</div>
                  </div>
                </div>
              )}

              {event.administrators && event.administrators.length > 0 && (
                <div>
                  {event.administrators.map((admin, index) => (
                    <div className="organizer-details-blocks" key={index}>
                      <img
                        className="organizer-details-blocks-image"
                        src={`${admin.imageUrl}`}
                        alt=""
                      />
                      <div>
                        <div className="organizer-details-blocks-text-1">
                          {admin.firstName} {admin.lastName}
                        </div>
                        <div className="organizer-details-blocks-text-2">
                          {admin.username}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div id="background-event-all-details-participant">
      <div id="part-details">
      <div id="part-details-1">
        <div>
          <div id="name-part">Name</div>
          <div id="email-part">Email</div>
        </div>
        <div id="part-eligible"><img id="tick-svg"src="/tick.svg"></img>Eligible</div>
      </div>
      <button id="see-details"><span>See Details<br></br>
          (Check your team status)</span></button>
          <div id="line"></div>
      <div  id="registered"className='part-details-info'>
        <img className="part-details-img" src="/people.svg" alt="Registered Icon" />
        <div className="minor-details">
        <div  >Registered Candidates</div>
        <div>400</div></div>
      </div>
      <div id="team" className='part-details-info'>
        <img className="part-details-img" src="/team.svg" alt="Team Size Icon" />
        <div  className="minor-details">
        <div>Team Size</div>
        <div>400</div></div>
      </div>
      <div id="deadline" className='part-details-info'>
        <img className="part-details-img" src="/deadline.svg" alt="Deadline Icon" />
        <div className="minor-details">
        <div  >Deadline</div>
        <div>400</div></div>
      </div>
    </div>
      </div>
    </div>
  );
};

export default BackgroundEvent;
