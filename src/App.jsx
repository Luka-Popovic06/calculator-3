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

  const calculateResult = (a, b, operator) => {
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

  const processButtonValue = (value, first, second) => {
    switch (value) {
      case "-":
      case "+":
      case "*":
      case "/":
        if (first !== "") {
          setCalculatorState((prev) =>
            prev.operator === ""
              ? {
                  operator: value,
                  secondOperand: prev.firstOperand,
                  firstOperand: "",
                }
              : {
                  secondOperand: calculateResult(
                    prev.secondOperand,
                    prev.firstOperand,
                    prev.operator
                  ),
                  firstOperand: "",
                  operator: value,
                }
          );
        }
        break;
      case "=":
        if (first !== "" && second !== "") {
          setCalculatorState((prev) => ({
            firstOperand: calculateResult(
              prev.secondOperand,
              prev.firstOperand,
              prev.operator
            ),
            secondOperand: "",
            operator: "",
          }));
        }
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

  const deleteLastDigit = (first) => {
    if (first === "") return;
    setCalculatorState((prev) => ({
      ...prev,
      firstOperand: first.slice(0, -1),
    }));
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
            clickAction={() => handleButtonClick(btn.variation, btn.text)}
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
