import React from "react";
import { Link } from "react-router-dom";

const notFoundPage = () => {
  return (
    <div>
      <h1>Oops, page not found</h1>
      <Link to="/">Back to main page</Link>
    </div>
  );
};

export default notFoundPage;
