import React from "react";
import axios from "axios";

const Test = () => {
  const getRequest = async () => {
    const response = await axios.get("/request", {
      params: {
        input: "This is the test input",
      },
    });

    console.log(response);
  };

  return <div onClick={() => getRequest()}>hey</div>;
};

export default Test;
