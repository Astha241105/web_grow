import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchQuizResults, fetchLeaderboard } from "../../components/store/slices/quizresult2"; 
import "./leaderboard.css"

const Leaderboard = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { eventId } = location.state || { eventId: null };
  console.log(eventId)

  const { result, leaderboard, status, error } = useSelector((state) => state.quizfinal);

  useEffect(() => {
    if (eventId) {
      dispatch(fetchQuizResults({ eventId }));
      dispatch(fetchLeaderboard({ eventId }));
      console.log("yes")
    }
  }, [dispatch, eventId]);

  return (
    <div id="leaderboard">
      <div id="leaderboard-head">
        <img src="/back3.svg"></img>
        <div id="leaderboard-head-1">Leaderboard</div>
      </div>
      <div id="leaderboard-details">
        <div  id="leaderboard-details-leaderboaard">
        <div  className="leaderboard-positions" id="leaderboard-positions-2">
          <img className="leaderboard-positions-image"></img>
          <div className="leaderboard-positions-name">lorem1</div>
          <div className="leaderboard-positions-score">Lorem.</div>
          <div className="leaderboard-positions-number">2</div>
        </div>
          <div className="leaderboard-positions" id="leaderboard-positions-1">
          <img className="leaderboard-positions-image"></img>
          <div className="leaderboard-positions-name">lorem1</div>
          <div className="leaderboard-positions-score">lorem1</div>
          <div  className="leaderboard-positions-number">1</div>
          </div>
          <div  className="leaderboard-positions" id="leaderboard-positions-3">
          <img className="leaderboard-positions-image"></img>
          <div className="leaderboard-positions-name">lorem</div>
          <div className="leaderboard-positions-score">lorem</div>
          <div  className="leaderboard-positions-number">3</div>
          </div>
        </div>
        <div id="leaderboard-details-your-score">
          <div id="leaderboard-details-result-rank">Your Rank  {}</div>
          <div id="leaderboard-details-result-score">Your Score  {}</div>
          <div id="leaderboard-details-result-score-details">
            <div></div>
          </div>
          <div></div>
        </div>
      </div>
       <div id="leaderboard-all-participants">
       </div>
    </div>
  );
};

export default Leaderboard;
