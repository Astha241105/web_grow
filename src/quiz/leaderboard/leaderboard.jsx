import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchQuizResults, fetchLeaderboard } from "../../components/store/slices/quizresult2";
import "./leaderboard.css";

const Leaderboard = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { eventId } = location.state || { eventId: null };

  const { quizResults, leaderboard, status, error } = useSelector((state) => state.quizresults);

  useEffect(() => {
    if (eventId) {
      dispatch(fetchQuizResults({ eventId }));
      dispatch(fetchLeaderboard({ eventId }));
    }
  }, [dispatch, eventId]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  const topScores = leaderboard?.topScores || [];
  const participantDetails = leaderboard?.participantDetails;

  return (
    <div id="leaderboard">
      <div id="leaderboard-head">
        <img src="/back3.svg" alt="Back Icon" />
        <div id="leaderboard-head-1">Leaderboard</div>
      </div>
      <div id="leaderboard-details">
        <div id="leaderboard-details-leaderboaard">
          {topScores.slice(0, 3).map((score, index) => (
            <div
              key={index}
              className="leaderboard-positions"
              id={`leaderboard-positions-${index + 1}`}
            >
              <img
                className="leaderboard-positions-image"
                src={score.imageUrl}
              />
              <div className="leaderboard-positions-name">{score.participantName}</div>
              <div className="leaderboard-positions-score">
                {score.correctAnswers}
              </div>
              <div className="leaderboard-positions-number">{index + 1}</div>
            </div>
          ))}
        </div>
        <div id="leaderboard-details-your-score">
          {participantDetails && (
            <>
              <div id="leaderboard-details-result-rank">
                Your Rank: {quizResults?.rank || "N/A"}
              </div>
              <div></div>
              <div id="leaderboard-details-result-score">
                <div>Total number of question {participantDetails.totalQuestions}</div>
                <div>Total number of correct answers {participantDetails.correctAnswers}</div>
                <div>Total number of question {participantDetails.totalQuestions-participantDetails.correctAnswers}</div>
              </div>
              <div id="coins-collected">
                <div id="coins-collected-text">Coins collected</div>
                <div style={{display: "flex", alignItems: "center"}}>
                <img id="coins-collected-image2" src="/coins.svg"></img>
                <div id="coins-collected-text">10 coins are collected for the quiz</div></div>
              </div>
              <div></div>
            </>
          )}
        </div>
      </div>
      <div id="leaderboard-all-participants">
      <table>
  <thead>
    <tr>
      <th>Rank</th>
      <th>Image</th>
      <th>Name</th>
      <th>Score</th>
    </tr>
  </thead>
  <tbody>
    {topScores.map((score, index) => (
      <tr key={index}>
        {/* Rank column */}
        <td>{index + 1}</td>
        <td>
          <img
            src={score.imageUrl || "/default-avatar.png"}
            alt={`${score.participantName}'s Avatar`}
            className="leaderboard-participant-image"
          />
        </td>
        <td>{score.participantName}</td>
        <td>{score.correctAnswers}</td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
    </div>
  );
};

export default Leaderboard;
