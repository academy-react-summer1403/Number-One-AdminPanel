import React from "react";
import "./cominsoon.css";
import ComponentSpinner from "../spinner/Loading-spinner";

const ComingSoon = () => {
  return (
    <div className="coming-holder">
      <div>
        <h1 className="coming-text">به زودی</h1>
        <p className="coming-paragraph">
          متاسفم! در حال حاضر این بخش از دسترس خارج شده و در حال بروزرسانی
          میباشد
        </p>
        <div>
          <ComponentSpinner />
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
