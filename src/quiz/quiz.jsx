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

  const { totalQuestions, eventId } = location.state || { totalQuestions: 0, eventId: null };

  const [currentPage, setCurrentPage] = useState(1);
  const [attemptedQuestions, setAttemptedQuestions] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [questionsAnswered, setQuestionsAnswered] = useState([]);
  const [showFinishConfirmation, setShowFinishConfirmation] = useState(false);

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
    if (eventDetails) {
      const endTime = new Date(eventDetails.endTime);
      const currentTime = new Date();
      const remainingTime = Math.max(0, endTime - currentTime);
      setTimeLeft(remainingTime);

      const interval = setInterval(() => {
        const newTimeLeft = Math.max(0, endTime - new Date());
        setTimeLeft(newTimeLeft);

        if (newTimeLeft <= 0) {
          clearInterval(interval);
          handleFinishQuiz();
        }
      }, 1000);

      setTimerInterval(interval);
    }

    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [eventDetails]);

  useEffect(() => {
    if (eventId && currentPage <= totalQuestions) {
      dispatch(fetchQuizQuestions({ eventId, page: currentPage }));
    }
  }, [dispatch, eventId, currentPage, totalQuestions]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption && question?.id) {
      // Only submit answer and mark as answered if not already answered
      if (!questionsAnswered.includes(currentPage)) {
        dispatch(
          submitQuizAnswer({
            eventId,
            questionId: question.id,
            answer: selectedOption,
            selectedOption,
          })
        );
  
      
        setQuestionsAnswered((prev) => [...prev, currentPage]);
        setAttemptedQuestions((prevAttempted) => prevAttempted + 1);
      }
  
   
      if (currentPage < totalQuestions) {
        setCurrentPage((prevPage) => prevPage + 1);
        setSelectedOption(null);
      } else {
        setSelectedOption(null);
      }
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      setSelectedOption(null);
    }
  };

  const confirmFinishQuiz = () => {
    if (window.confirm("Are you sure you want to submit the quiz?")) {
      handleFinishQuiz();
    }
  };
  
  const handleFinishQuiz = () => {
    dispatch(submitFinalQuiz({ eventId })).then(() => {
      navigate("/leader", { state: { eventId } });
    });
  };

  const handleCancelFinish = () => {
    setShowFinishConfirmation(false);
  };

  const progressPercentage = (attemptedQuestions / totalQuestions) * 100;

  const formatTime = (timeInMs) => {
    const minutes = Math.floor(timeInMs / 60000);
    const seconds = Math.floor((timeInMs % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div id="quiz-component-background">
      <div id="quiz-component">
        <div id="time-quiz">
          <img src="/quizclock.svg" alt="Quiz Timer" />
          <div id="time-quiz-time-left">
            Time Left: {formatTime(timeLeft)}
          </div>
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
  disabled={loading || !selectedOption}
>
  {currentPage === totalQuestions ? "Submit Answer" : "Next"}
</button>


          <button
            id="quiz-finish-button"
            onClick={confirmFinishQuiz}
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