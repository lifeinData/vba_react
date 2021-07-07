import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const TestPage = (props) => {
  useEffect( () => {
    console.log("this is history from useEffect", props.match);
  })
  const testHistory = () => {
    console.log("this is history ", props.match);
  };
  return (
    <div>
      <h1>test Page</h1>
      {testHistory()}
    </div>
  );
};

export default TestPage;
