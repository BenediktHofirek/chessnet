import React from "react";

const Notation = ({ gameRecord }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>White</th>
            <th>Black</th>
          </tr>
        </thead>
        <tbody>
            {Array.apply(null, Array(gameRecord.length % 2 ? gameRecord.length/2 : gameRecord))}
        </tbody>
      </table>
    </div>
  );
};

export default Notation;
