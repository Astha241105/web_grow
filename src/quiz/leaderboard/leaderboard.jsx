import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchQuizResults, fetchLeaderboard } from "../../components/store/slices/quizresult2";  // Import the actions for results and leaderboard

const Leaderboard = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { quizId } = location.state || { quizId: null };
  console.log(quizId)

  const { result, leaderboard, status, error } = useSelector((state) => state.quizfinal);

  useEffect(() => {
    if (quizId) {
      dispatch(fetchQuizResults({ quizId }));
      dispatch(fetchLeaderboard({ quizId }));
      console.log("yes")
    }
  }, [dispatch, quizId]);

  return (
    <div>
      <h2>Leaderboard</h2>

      {status === "loading" && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {result && (
        <div>
          <h3>Quiz Result:</h3>
          <p>{result.message}</p> 
        </div>
      )}

      {leaderboard && (
        <div>
          <h3>Leaderboard:</h3>
          <ul>
            {leaderboard.map((item, index) => (
              <li key={index}>
                {item.rank}. {item.name} - {item.score}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
