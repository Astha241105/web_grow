import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  fetchQuizQuestions,
  submitQuizAnswer,
} from "../components/store/slices/quizpart";
import { submitFinalQuiz } from "../components/store/slices/finish";
import { fetchEventDetails } from "../components/store/slices/eventdetails"; 
import "./quiz.css";

const Quiz = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { totalQuestions, quizId, eventId } = location.state || {
    totalQuestions: 0,
    quizId: null,
    eventId: null,
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [attemptedQuestions, setAttemptedQuestions] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const { question, loading, error, finalSubmitStatus } = useSelector(
    (state) => state.quiz
  );

  const eventDetails = useSelector((state) => state.eventDetails.data);

  useEffect(() => {
    if (eventId) {
      dispatch(fetchEventDetails(eventId));
    }
  }, [dispatch, eventId]);

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
      dispatch(
        submitQuizAnswer({
          quizId,
          questionId: question.id,
          answer: selectedOption,
          selectedOption,
        })
      );
    }

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
      navigate("/leader", { state: { quizId } });
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
                      className={selectedOption === option ? "selected1" : ""}
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
            disabled={
              loading || attemptedQuestions >= totalQuestions || !selectedOption
            }
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

        {eventDetails && (
          <div id="event-details">
            <h3>Event Details:</h3>
            <p>
              <strong>Title:</strong> {eventDetails.title}
            </p>
            <p>
              <strong>Description:</strong> {eventDetails.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
