import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchQuizQuestions, submitQuizAnswer } from "../components/store/slices/quizpart";
import { submitFinalQuiz } from "../components/store/slices/finish";
import "./quiz.css";

const Quiz = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { totalQuestions, quizId } = location.state || { totalQuestions: 0, quizId: null };

  const [currentPage, setCurrentPage] = useState(1);
  const [attemptedQuestions, setAttemptedQuestions] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const { question, loading, error, finalSubmitStatus } = useSelector((state) => state.quiz);

  // Fetch the question only if the current page is within the total number of questions
  useEffect(() => {
    if (quizId !== null && currentPage <= totalQuestions) {
      dispatch(fetchQuizQuestions({ quizId, page: currentPage }));
    }
  }, [dispatch, quizId, currentPage, totalQuestions]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption && question?.id) {
      dispatch(submitQuizAnswer({
        quizId,
        questionId: question.id,
        answer: selectedOption,
        selectedOption,
      }));
    }

    // Move to the next question only if the total questions are not exceeded
    if (attemptedQuestions < totalQuestions) {
      setCurrentPage((prevPage) => prevPage + 1);
      setAttemptedQuestions((prevAttempted) => prevAttempted + 1);
      setSelectedOption(null);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      setSelectedOption(null);
    }
  };

  const handleFinishQuiz = () => {
    dispatch(submitFinalQuiz({ quizId })).then(() => {
      // After final submission, navigate to leaderboard
      navigate("/leader", { state: { quizId } }); // Pass quizId to the leaderboard route
    });
  };

  const progressPercentage = (attemptedQuestions / totalQuestions) * 100;

  return (
    <div id="quiz-component-background">
      <div id="quiz-component">
        <div id="time-quiz">
          <img src="/quizclock.svg" alt="Quiz Timer" />
          <div id="time-quiz-time-left">Time Left</div>
        </div>

        <div id="quiz-progress">
          <div>
            <strong>Total Questions:</strong> {totalQuestions}
          </div>
          <div>
            <strong>Questions Attempted:</strong> {attemptedQuestions}
          </div>

          <div id="progress-bar-container">
            <div
              id="progress-bar"
              style={{
                width: `${progressPercentage}%`,
              }}
            ></div>
          </div>
        </div>

        <div id="quiz-question">
          {loading ? (
            <div>Loading question...</div>
          ) : error ? (
            <div>Error loading question: {error}</div>
          ) : (
            question && (
              <div id="full-ques">
                <h3 id="quiz-question-number">Question {currentPage}</h3>
                <h3 id="quiz-question">{question.questionText}</h3>
                <ul id="quiz-option-list">
                  {question.options.map((option, index) => (
                    <li
                      id="quiz-option-list-options"
                      key={index}
                      className={selectedOption === option ? "selected" : ""}
                      onClick={() => handleOptionSelect(option)}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>

        <div id="quiz-buttons">
          <button
            id="quiz-previous-button"
            onClick={handlePreviousQuestion}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <button
            id="quiz-next-button"
            onClick={handleNextQuestion}
            disabled={loading || attemptedQuestions >= totalQuestions || !selectedOption}
          >
            Next
          </button>

          <button
            id="quiz-finish-button"
            onClick={handleFinishQuiz}
            disabled={finalSubmitStatus === "loading"}
          >
            Finish
          </button>
        </div>

        {finalSubmitStatus && (
          <div id="quiz-final-status">
            {finalSubmitStatus === "success"
              ? "Quiz submitted successfully!"
              : finalSubmitStatus}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
