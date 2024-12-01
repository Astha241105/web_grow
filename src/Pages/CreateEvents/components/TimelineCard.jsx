import React, { useState } from "react";

const TimelineCard = ({ type, data, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);

  const renderContent = () => {
    switch (type) {
      case "Stages and Timeline":
        return (
          <section className="flex items-center  gap-5">
            <img
              src="https://via.placeholder.com/100x60"
              alt="Event Logo"
              className="w-20 h-12 object-contain"
            />
            <div className="p-4 border border-black rounded-lg w-full">
              {isEditing ? (
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-blue-500 text-lg font-medium"
                  placeholder="This will be an online quiz on Webgrow. You will be given 2 minutes to answer a question."
                  value={data.description}
                  onChange={(e) =>
                    onEdit({ ...data, description: e.target.value })
                  }
                />
              ) : (
                <p className="font-medium">{data.description}</p>
              )}
              <span>{data.date || "To be announced"}</span>
            </div>
          </section>
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
              <p>{data.date}</p>
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
      case "Rewards":
        return (
          <div className="space-y-4">
            {data.rewards.map((reward, index) => (
              <div
                key={index}
                className="p-4 border border-black rounded-lg shadow-sm flex flex-col"
              >
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      className="w-full bg-transparent border-b text-black border-gray-400 focus:outline-none focus:border-blue-500 text-lg font-medium"
                      placeholder="Add description"
                      value={reward.description}
                      onChange={(e) =>
                        onEdit({
                          rewards: data.rewards.map((r, i) =>
                            i === index
                              ? { ...r, description: e.target.value }
                              : r
                          ),
                        })
                      }
                    />
                    <h5 className="font-bold text-black text-lg mt-2">
                      {reward.title}
                    </h5>
                  </>
                ) : (
                  <>
                    <h5 className="font-bold text-lg">{reward.title}</h5>
                    <p className="text-gray-600 mt-2">
                      {reward.description || "Add Description"}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        );
      default:
        return <p>No data available</p>;
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    onEdit(data);
  };

  return (
    <div className="border border-black  rounded-md p-4 md:p-8 md:mx-11">
      <div className="flex flex-col justify-between">
        <div className="flex justify-between">
          {(type === "Stages and Timeline" || type === "Rewards") && (
            <span className="text-[#FF0000] text-[9px] md:text-base font-medium">
              This is a demo representation, add the round to view the user's
              preview!
            </span>
          )}
          {onEdit && (
            <button
              onClick={isEditing ? handleSave : handleEdit}
              className="text-blue-500"
            >
              <img src="blue_pen.svg" alt="edit" />
            </button>
          )}
        </div>
        <h3 className="font-semibold mt-2 mb-5 text-2xl">{type}</h3>
      </div>
      {renderContent()}
    </div>
  );
};

export default TimelineCard;
