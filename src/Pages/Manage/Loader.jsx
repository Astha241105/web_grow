import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-[300px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#008080] border-solid"></div>
    </div>
  );
};

export default Loader;
