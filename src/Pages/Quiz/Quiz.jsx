import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavHost from "../Host/NavHost";
import {
  createQuiz,
  resetQuizCreateState,
} from "../../components/store/slices/create_quiz_Slice";

const QuizCreator = () => {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.quizCreate);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "",
      options: ["", "", "", ""],
      correctOption: null,
    },
  ]);
  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: questions.length + 1,
        question: "",
        options: ["", "", "", ""],
      },
    ]);
  };

  const handleQuestionChange = (questionId, value) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId ? { ...q, question: value } : q
      )
    );
  };

  const handleOptionChange = (questionId, optionIndex, value) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          const newOptions = [...q.options];
          newOptions[optionIndex] = value;
          return { ...q, options: newOptions };
        }
        return q;
      })
    );
  };

  const handleDeleteQuestion = (questionId) => {
    setQuestions(questions.filter((q) => q.id !== questionId));
  };

  const handleCopyQuestion = (questionToCopy) => {
    const copiedQuestion = {
      ...questionToCopy,
      id: questions.length + 1,
    };
    setQuestions([...questions, copiedQuestion]);
  };

  const handleMoveQuestion = (currentIndex, direction) => {
    const updatedQuestions = [...questions];
    if (direction === "up" && currentIndex > 0) {
      [updatedQuestions[currentIndex], updatedQuestions[currentIndex - 1]] = [
        updatedQuestions[currentIndex - 1],
        updatedQuestions[currentIndex],
      ];
    } else if (direction === "down" && currentIndex < questions.length - 1) {
      [updatedQuestions[currentIndex], updatedQuestions[currentIndex + 1]] = [
        updatedQuestions[currentIndex + 1],
        updatedQuestions[currentIndex],
      ];
    }
    setQuestions(updatedQuestions);
  };
  const handleCorrectOptionChange = (questionId, optionIndex) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId ? { ...q, correctOption: optionIndex } : q
      )
    );
  };

  const handleSubmitQuiz = () => {
    if (!title.trim()) {
      alert("Please enter a quiz title");
      return;
    }

    if (questions.some((q) => !q.question.trim())) {
      alert("Please fill in all question texts");
      return;
    }

    if (questions.some((q) => q.correctOption === null)) {
      alert("Please select a correct answer for each question");
      return;
    }
    dispatch(
      createQuiz({
        eventId,
        title,
        description,
        questions,
      })
    );
  };

  useEffect(() => {
    if (success) {
      alert("Quiz created successfully!");
      setTitle("");
      setDescription("");
      setQuestions([
        {
          id: 1,
          question: "",
          options: ["", "", "", ""],
          correctOption: null,
        },
      ]);
      dispatch(resetQuizCreateState());
    }
  }, [success, dispatch]);
  useEffect(() => {
    if (error) {
      alert(`Quiz creation failed: ${error}`);
      dispatch(resetQuizCreateState());
    }
  }, [error, dispatch]);

  return (
    <div className="max-w-3xl mx-auto bg-white">
      <NavHost />
      <hr className="absolute w-full left-0 top-[60px] border-b border-black border-0" />
      <div className="p-5 mb-6">
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Opportunity Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 text-lg text-black font-semibold bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-black"
          />
          <img
            src="pen.svg"
            className="absolute left-[38%] cursor-pointer"
          ></img>
        </div>
        <label className="p-2  text-lg text-black font-semibold">
          Add Description
        </label>
        <textarea
          placeholder="Write something"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="resize-none placeholder:text-black w-full p-2 mt-2 min-h-[100px]  rounded-md focus:outline-none focus:border-teal-600 font-semibold"
        />
      </div>
      {questions.map((q, qIndex) => (
        <div
          key={q.id}
          className="border border-black rounded-lg mb-4 bg-white mx-4 py-3"
        >
          <div className="flex justify-between items-center mb-[10px] px-3 border-b border-black">
            <span className="font-[700]">Question {qIndex + 1}</span>
            <div className="flex gap-2">
              <button
                className="p-1 hover:bg-gray-100 rounded"
                onClick={() => handleMoveQuestion(qIndex, "up")}
                disabled={qIndex === 0}
              >
                <img
                  src="Arrow_up.svg"
                  className={qIndex === 0 ? "opacity-50" : ""}
                />
              </button>
              <button
                className="p-1 hover:bg-gray-100 rounded"
                onClick={() => handleMoveQuestion(qIndex, "down")}
                disabled={qIndex === questions.length - 1}
              >
                <img
                  src="Arrow_down.svg"
                  className={
                    qIndex === questions.length - 1 ? "opacity-50" : ""
                  }
                />
              </button>
              <button
                className="p-1 hover:bg-gray-100 rounded"
                onClick={() => handleCopyQuestion(q)}
              >
                <img src="copy.svg"></img>
              </button>
              <button
                className="p-1 hover:bg-gray-100 rounded"
                onClick={() => handleDeleteQuestion(q.id)}
              >
                <img src="dustbin.svg"></img>
              </button>
            </div>
          </div>
          <label className="m-4 py-6 font-medium">Question</label>
          <input
            type="text"
            placeholder="Question"
            value={q.question}
            onChange={(e) => handleQuestionChange(q.id, e.target.value)}
            className="w-full bg-[#F1F1F1] box-border p-2 m-4 border border-gray-200 placeholder-black focus:border-2 placeholder:font-medium rounded-[10px] focus:outline-none focus:border-teal-600"
          />

          <label className="m-4 py-6">Answers</label>

          <div className="space-y-2">
            {q.options.map((option, oIndex) => (
              <div key={oIndex} className="flex items-center relative">
                <div className="absolute left-4 w-[14px] h-[66px] top-0 bg-[#008080] rounded-l-[10px]"></div>
                <input
                  type="text"
                  placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
                  value={option}
                  onChange={(e) =>
                    handleOptionChange(q.id, oIndex, e.target.value)
                  }
                  className="flex-1 mb-3 ml-4 mr-4 p-5 pl-8 text-black placeholder-black border border-black focus:border-2 focus:border-teal-600 rounded-[10px] focus:outline-none font-medium"
                />
                <button
                  className={`relative -left-[67px] ml-2 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                    q.correctOption === oIndex
                      ? "bg-[#008080] "
                      : "bg-[#D9D9D9] hover:bg-[#A9A9A9]"
                  }`}
                  onClick={() => handleCorrectOptionChange(q.id, oIndex)}
                >
                  {q.correctOption === oIndex && (
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="flex items-center justify-between px-4 pb-4 space-x-3">
        <button
          onClick={handleAddQuestion}
          className="w-1/2 p-3 bg-white border-2 border-teal-600 text-teal-600 rounded-md font-medium hover:bg-teal-50 transition-colors duration-200"
        >
          + Add Questions
        </button>
        <button
          onClick={handleSubmitQuiz}
          disabled={loading}
          className="w-1/2 p-3 bg-teal-600 text-white rounded-md font-medium hover:bg-teal-700 transition-colors duration-200 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};
export default QuizCreator;
