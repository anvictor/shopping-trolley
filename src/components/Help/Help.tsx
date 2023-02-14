import React, { useState } from "react";
import Languages from "../object.json";
import "./Help.css";
export const Help = () => {
  const [currentLang, setCurrentLang] = useState("UA");
  const handleLangClicked = (e: any) => {
    setCurrentLang(e.target.dataset.value);
  };
  const Buttons = () => (
    <div className="langButtonsWrapper">
      {Languages.buttonTitles.map((lang, index) => (
        <span
          key={lang}
          data-value={lang}
          className={lang === currentLang ? "current lang" : "lang"}
          onClick={handleLangClicked}
        >
          [{lang}]
          {index < lang.length && <span className="divider">{" / "}</span>}
        </span>
      ))}
    </div>
  );
  const helpTexsts: any = {
    EN: Languages["EN"],
    RU: Languages["RU"],
    UA: Languages["UA"],
  };
  const title = helpTexsts[currentLang].title;
  const values = helpTexsts[currentLang].values;

  return (
    <>
      <Buttons />
      <h2>{title}</h2>
      <ol>
        {values.map((value: string) => (
          <li key={value}>{value}</li>
        ))}
      </ol>
    </>
  );
};

export default Help;
