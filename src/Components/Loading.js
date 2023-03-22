import React from "react";
import loading from "./Spinner_black_3.gif";

const Loading = () => {
  return (
    <div className="text-center">
      <img src={loading} alt="Loading" />
    </div>
  );
};
export default Loading;