import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postStagesData } from "../../../components/store/slices/stagesTimelineSlice";
import { fetchEventAdministrators } from "../../../components/store/slices/administratorsSlice";

const TimelineCard = ({ type, data, eventId }) => {
  const dispatch = useDispatch();
  const { stages, loading, error } = useSelector(
    (state) => state.stagesTimeline
  );

  const {
    administrators,
    loading: administratorsLoading,
    error: administratorsError,
  } = useSelector((state) => state.administrators);

  const initialStages = Array.isArray(data) ? data : [data];

  const [stagesData, setStagesData] = useState(
    initialStages.map((stage, index) => ({
      ...stage,
      isEditable: false,
      day: stage.day || `Day ${index + 1}`, // Ensure Day is in string format for display
    }))
  );

  useEffect(() => {
    if (type === "Contact the organiser" && eventId) {
      dispatch(fetchEventAdministrators(eventId));
    }
  }, [dispatch, type, eventId]);

  // Toggle edit mode for a specific stage
  const toggleEditMode = (index) => {
    setStagesData((prevStages) =>
      prevStages.map((stage, i) =>
        i === index ? { ...stage, isEditable: !stage.isEditable } : stage
      )
    );
  };

  // Handle input changes
  const handleChange = (index, key, value) => {
    setStagesData((prevStages) =>
      prevStages.map((stage, i) =>
        i === index ? { ...stage, [key]: value } : stage
      )
    );
  };

  // Add a new stage
  const addNewStage = () => {
    const newStage = {
      description: "",
      day: "Day",
      isEditable: true, // New stage starts in edit mode
    };
    setStagesData((prevStages) => [...prevStages, newStage]);
  };

  // Delete a stage
  const deleteStage = (index) => {
    setStagesData((prevStages) => prevStages.filter((_, i) => i !== index));
  };

  // Submit stages data to API
  const submitStages = () => {
    if (eventId) {
      // Log the stages data before dispatching the action
      console.log("Submitting Stages Data:", stagesData);

      dispatch(postStagesData({ eventId, stages: stagesData }));
    }
  };

  const renderContent = () => {
    switch (type) {
      case "Stages and Timeline":
        return (
          <div>
            {stagesData.map((stage, index) => (
              <section key={index} className="flex items-center gap-5 mb-4">
                <div
                  className="w-20 h-12 flex items-center justify-center"
                  style={{
                    backgroundImage: 'url("div-bg.svg")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "10px",
                  }}
                >
                  {stage.isEditable ? (
                    <input
                      type="text"
                      value={stage.day}
                      onChange={(e) =>
                        handleChange(index, "day", e.target.value)
                      }
                      className="border p-2 rounded w-full text-center"
                    />
                  ) : (
                    <p className="text-center font-medium">{stage.day}</p>
                  )}
                </div>

                <div className="p-4 border border-black rounded-lg w-full flex items-center justify-between">
                  {stage.isEditable ? (
                    <input
                      type="text"
                      value={stage.description}
                      onChange={(e) =>
                        handleChange(index, "description", e.target.value)
                      }
                      className="border p-2 rounded w-full mr-4"
                    />
                  ) : (
                    <p className="mr-4">
                      {stage.description || "Add Description"}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => toggleEditMode(index)}
                  className="text-blue-500"
                >
                  {stage.isEditable ? "Save" : "Edit"}
                </button>
                <button
                  onClick={() => deleteStage(index)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </section>
            ))}
            <button
              onClick={addNewStage}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add New Stage
            </button>
            <button
              onClick={submitStages}
              className="bg-green-500 text-white px-4 py-2 rounded mt-4"
            >
              Submit Stages
            </button>
          </div>
        );
      case "Deadlines":
        return (
          <section className="flex items-center gap-5">
            <img
              src="https://via.placeholder.com/100x60"
              alt="Event Logo"
              className="w-20 h-12 object-contain"
            />
            <div className="p-4 w-full">
              <h4>{data.title}</h4>
              <p className="font-semibold">{data.date}</p>
            </div>
          </section>
        );
      case "Contact the organiser":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {administratorsLoading ? (
              <p>Loading administrators...</p>
            ) : administratorsError ? (
              <p>Error: {administratorsError}</p>
            ) : (
              administrators.map((admin) => (
                <section
                  key={admin.id}
                  className="border border-gray-300 rounded-lg p-4 flex items-center gap-5"
                >
                  <img
                    src={admin.imageUrl || "https://via.placeholder.com/100x60"}
                    alt={`${admin.firstName} ${admin.lastName}`}
                    className="w-20 h-12 object-contain rounded"
                  />
                  <div className="p-4 w-full">
                    <h4 className="font-medium">
                      {`${admin.firstName} ${admin.lastName}`.trim()}
                    </h4>
                    <p>{admin.email}</p>
                    {admin.designation && (
                      <p className="text-gray-600 text-sm">
                        {admin.designation}
                      </p>
                    )}
                  </div>
                </section>
              ))
            )}
          </div>
        );
      default:
        return <p>No data available</p>;
    }
  };

  return (
    <div className="border border-black rounded-md p-4 md:p-8 md:mx-11">
      <div className="flex flex-col justify-between">
        <div className="flex justify-between">
          {type === "Stages and Timeline" && (
            <span className="text-[#FF0000] text-[9px] md:text-base font-medium">
              This is a demo representation, add the round to view the user’s
              preview!
            </span>
          )}
        </div>
        <h3 className="font-semibold mt-2 mb-5 text-2xl">{type}</h3>
      </div>
      {renderContent()}
    </div>
  );
};

export default TimelineCard;
