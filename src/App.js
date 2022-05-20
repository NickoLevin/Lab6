import "./App.css";
import React, { useState } from "react";

const defaultState = {
  arab: "",
  rim: "",
};

function App() {
  const [type, setType] = useState(false);
  const [formData, setFormData] = useState(defaultState);
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    if (e.target.getAttribute("name") === "arab") {
      setFormData({ arab: e.target.value, rim: arabToRim(e.target.value) });
    } else {
      setFormData({
        arab: rimToArab(e.target.value.toUpperCase()),
        rim: e.target.value.toUpperCase(),
      });
    }
  };

  const rimToArab = (string) => {
    if (!string) return "";
    setError(false);
    let map = {
      Z: 2000,
      M: 1000,
      D: 500,
      C: 100,
      L: 50,
      X: 10,
      V: 5,
      I: 1,
    };
    let descendingError = false;
    let moreThanThreeTimesRepeatError = false;
    let notValidChar = false;

    for (let idx = 0; idx < string.length - 1; idx++) {
      if (
        map[string[idx]] < map[string[idx + 1]] &&
        string[idx] + string[idx + 1] !== "IV" &&
        string[idx] + string[idx + 1] !== "IX" &&
        string[idx] + string[idx + 1] !== "XL" &&
        string[idx] + string[idx + 1] !== "XC" &&
        string[idx] + string[idx + 1] !== "CD" &&
        string[idx] + string[idx + 1] !== "CM"
      ) {
        descendingError = true;
      }
    }

    for (let char of string.split("")) {
      if (
        string.split("").filter((el) => el === char.toUpperCase()).length > 3
      ) {
        moreThanThreeTimesRepeatError = true;
      }

      if (!"ZMCDXIVL".includes(char.toUpperCase())) {
        notValidChar = true;
      }
    }

    setError(descendingError || moreThanThreeTimesRepeatError || notValidChar);

    return [...string.toUpperCase()].reduce(
      (previousValue, currentValue, currentIndex, array) =>
        map[array[currentIndex + 1]] > map[currentValue]
          ? previousValue - map[currentValue]
          : previousValue + map[currentValue],
      0
    );
  };

  const arabToRim = (number) => {
    let map = [
      2000,
      "Z",
      1000,
      "M",
      900,
      "CM",
      500,
      "D",
      400,
      "CD",
      100,
      "C",
      90,
      "XC",
      50,
      "L",
      40,
      "XL",
      10,
      "X",
      9,
      "IX",
      5,
      "V",
      4,
      "IV",
      1,
      "I",
    ];
    let value = "";
    for (let idx = 0; number > 0 && idx < map.length; idx += 2) {
      while (number >= map[idx]) {
        value += map[idx + 1];
        number -= map[idx];
      }
    }
    return value;
  };

  return (
    <div className="App">
      <h1>Лабораторная №8</h1>
      <div>
        Перевести {type ? "арабские" : "римские"} в
        {!type ? " арабские" : " римские"}{" "}
        <button
          onClick={() => {
            setType(!type);
            setFormData(defaultState);
            setError(false);
          }}
        >
          Поменять
        </button>
      </div>
      <div
        className="labels"
        style={{ flexDirection: !type ? "column-reverse" : "column" }}
      >
        <label className={type && error ? "label_error" : ""}>
          Арабские
          <input
            placeholder={type ? "Введите: 123" : "Ответ..."}
            onChange={handleChange}
            type="number"
            name="arab"
            disabled={!type}
            value={formData.arab}
          />
        </label>
        <label className={!type && error ? "label_error" : ""}>
          Римские
          <input
            placeholder={!type ? "Введите: CXX" : "Ответ..."}
            onChange={handleChange}
            type="text"
            name="rim"
            disabled={type}
            value={formData.rim}
          />
        </label>
      </div>
    </div>
  );
}

export default App;
