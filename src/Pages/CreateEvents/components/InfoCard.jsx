import React from "react";

const InfoCard = ({ iconSrc, title, value }) => {
  return (
    <div className="bg-teal-600 text-white rounded-lg shadow-md p-4 flex gap-6 items-center w-[328px] md:w-[388px]">
      <div className="text-2xl ">
        {iconSrc ? (
          <img
            src={iconSrc}
            alt={title}
            style={{ width: "40px", height: "40px" }}
          />
        ) : (
          <span>📅</span>
        )}
      </div>
      <div>
        <h4 className="text-sm font-semibold">{title}</h4>
        <p className="text-lg">{value}</p>
      </div>
    </div>
  );
};

export default InfoCard;
