import React, { useState } from "react";

const TimelineCard = ({ type, data }) => {
  const initialStages = Array.isArray(data) ? data : [data];

  const [stages, setStages] = useState(
    initialStages.map((stage) => ({
      ...stage,
      isEditable: false,
      day: stage.day || "Day 1",
    }))
  );

  // Toggle edit mode for a specific stage
  const toggleEditMode = (index) => {
    setStages((prevStages) =>
      prevStages.map((stage, i) =>
        i === index ? { ...stage, isEditable: !stage.isEditable } : stage
      )
    );
  };

  // Handle input changes
  const handleChange = (index, key, value) => {
    setStages((prevStages) =>
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
    setStages((prevStages) => [...prevStages, newStage]);
  };

  // Delete a stage
  const deleteStage = (index) => {
    setStages((prevStages) => prevStages.filter((_, i) => i !== index));
  };

  const renderContent = () => {
    switch (type) {
      case "Stages and Timeline":
        return (
          <div>
            {stages.map((stage, index) => (
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
          </div>
        );
      case "Deadlines":
        return (
          <section className="flex items-center  gap-5">
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
          <section className="flex items-center  gap-5">
            <img
              src="https://via.placeholder.com/100x60"
              alt="Event Logo"
              className="w-20 h-12 object-contain"
            />
            <div className="p-4 w-full">
              <h4 className="font-medium">{data.name}</h4>
              <p>{data.email}</p>
              <p>{data.phone}</p>
            </div>
          </section>
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
