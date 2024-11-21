import React from "react";

const Card = ({ children, className }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className || ""}`}>
      {children}
    </div>
  );
};

const CardHeader = ({ children }) => {
  return <div className="border-b border-gray-200 pb-2 mb-2">{children}</div>;
};

const CardTitle = ({ children }) => {
  return <h3 className="text-lg font-bold">{children}</h3>;
};

const CardContent = ({ children }) => {
  return <div>{children}</div>;
};

export { Card, CardHeader, CardTitle, CardContent };
