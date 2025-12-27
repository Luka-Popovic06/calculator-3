import { useState, useEffect } from "react";
import Button from "./Button";
import { calculatorButtons } from "./data.js";
import "./App.css";

function App() {
  const [calculatorState, setCalculatorState] = useState({
    firstOperand: "",
    secondOperand: "",
    operator: "",
  });

  const calculate = (a, b, operator) => {
    if (a === "" && b === "" && operator === "") return;
    const numA = Number(a);
    const numB = Number(b);
    switch (operator) {
      case "+":
        return numA + numB;
      case "-":
        return numA - numB;
      case "/":
        return numA / numB;
      case "*":
        return numA * numB;
      default:
        return;
    }
  };

  const handleButtonClick = (value, first) => {
    //moram da stavim da ovo ne sme da se izvrsava
    //if first === ""
    //if first !== "" second !== "" operaion!==""
    switch (value) {
      case "-":
      case "+":
      case "*":
      case "/":
        setCalculatorState((prev) =>
          prev.operator === ""
            ? {
                operator: value,
                secondOperand: prev.firstOperand,
                firstOperand: "",
              }
            : {
                secondOperand: calculate(
                  prev.secondOperand,
                  prev.firstOperand,
                  prev.operator
                ),
                firstOperand: "",
                operator: value,
              }
        );
        break;
      case "=":
        setCalculatorState((prev) => ({
          firstOperand: calculate(
            prev.secondOperand,
            prev.firstOperand,
            prev.operator
          ),
          secondOperand: "",
          operator: "",
        }));
        break;
      case ".":
        if (!first.includes(".") && first !== "") {
          setCalculatorState((prev) => ({
            ...prev,
            firstOperand: `${prev.firstOperand}${value}`,
          }));
        }
        break;
      default:
        setCalculatorState((prev) => ({
          ...prev,
          firstOperand: `${prev.firstOperand}${value}`,
        }));
        return;
    }
  };
  return (
    <>
      <div className="display">
        <div className="output-secondary">{`${calculatorState.secondOperand} ${calculatorState.operator}`}</div>
        <div className="output-main">
          {String(calculatorState.firstOperand)}
        </div>
      </div>
      <div className="buttons-box">
        {calculatorButtons.map((btn, index) => (
          <Button
            key={index}
            clickAction={() =>
              handleButtonClick(btn.text, calculatorState.firstOperand)
            }
            btnType={btn.type}
            variation={btn.variation}
          >
            {btn.text}
          </Button>
        ))}
      </div>
    </>
  );
}

export default App;
