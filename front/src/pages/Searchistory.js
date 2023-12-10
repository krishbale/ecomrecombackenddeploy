import React from "react";

const Searchistory = ({ searchHistory }) => {
  return (
    <div>
      {searchHistory.length > 0 && (
        <ul>
          {searchHistory.map((search, index) => (
            <li key={index}>{search}</li>
          ))}
        </ul>
      )}{" "}
    </div>
  );
};

export default Searchistory;
