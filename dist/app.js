// selecting elements

const topOutput = document.querySelector(".calculation");
const result = document.querySelector(".result");
const shiftText = document.querySelector(".shift-text");
const shiftBtn = document.querySelector(".shift-btn");
const navBtns = document.querySelectorAll(".nav-btn");
const btns = document.querySelectorAll(".btn");
const yellowBtns = document.querySelectorAll(".yellow");
const brackets = document.querySelectorAll(".brace");
const menuBtn = document.querySelector(".menu-btn");

result.innerHTML = 0;

// VARIABLES
let evaluated = false;
let storedInput = [];
let currentValue;
let ans;
let equation;
let shiftOn = false;
let history = [];
let currentIndex;

// EVENT LISTENERS

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    clear(topOutput);
    result.innerHTML = "0";
  }, 2000);
  updateHistory();
  topOutput.innerHTML = "press SHIFT + AC to clear history";
  result.innerHTML = "not perfect yet tho";
});

menuBtn.addEventListener("click", () => {
  topOutput.innerHTML = "bros abeg later";
  result.innerHTML = "I don tire";

  setTimeout(() => {
    clear(topOutput);
    clear(result);
  }, 2000);
});

brackets.forEach((brace) => {
  brace.addEventListener("click", (e) => {
    let symbol = e.currentTarget.dataset.sign;
    if (symbol === "leftBracket") {
      topOutput.innerHTML += `(`;
      storedInput.push(`(`);
    } else {
      topOutput.innerHTML += `)`;
      storedInput.push(`)`);
    }
  });
});

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const thisBtn = e.currentTarget;
    const value = thisBtn.innerHTML;
    let symbol = e.currentTarget.dataset.sign;
    shiftText.classList.add("hidden");
    if (evaluated) {
      clear(topOutput);
      evaluated = false;
      if (
        thisBtn.classList.contains("digit") ||
        thisBtn.classList.contains("delete")
      ) {
        topOutput.innerHTML = "";
        storedInput.length = 0;
      } else {
        topOutput.innerHTML = ans;
      }
    }

    if (thisBtn.classList.contains("digit")) {
      topOutput.innerHTML += value;
      storedInput.push(value);
    }

    if (thisBtn.classList.contains("yellow")) {
      topOutput.innerHTML += symbol;
      storedInput.push(symbol);
    }

    if (thisBtn.classList.contains("clear-btn")) {
      clear(topOutput);
      result.innerHTML = 0;
      storedInput.length = 0;
      currentIndex = history.length - 1;
      if (shiftOn) clearHistory();
    }

    if (thisBtn.classList.contains("delete")) {
      storedInput.pop();
      topOutput.innerHTML = topOutput.innerHTML.slice(0, -1);
    }

    // if (thisBtn.classList.contains("shift-btn")) {
    //   shiftText.classList.remove("hidden");
    // }
    if (e.currentTarget.classList.contains("equals")) {
      calculate();
    }
    shiftOn = false;
  });
});

shiftBtn.addEventListener("click", () => {
  if (shiftText.classList.contains("hidden")) {
    shiftText.classList.remove("hidden");
    shiftOn = true;
  } else {
    shiftText.classList.add("hidden");
    shiftOn = false;
  }
});

navBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const thisBtn = e.currentTarget;
    console.log(history);
    if (history.length > 0) {
      if (thisBtn.classList.contains("prev") && currentIndex > 0) {
        if (currentIndex === history.length - 1) {
          updateDisplay(currentIndex);
          currentIndex--;
        } else {
          currentIndex--;
          updateDisplay(currentIndex);
        }
      }
      if (
        thisBtn.classList.contains("next") &&
        currentIndex < history.length - 1
      ) {
        if (currentIndex === history.length - 1) updateDisplay(currentIndex);
        else {
          currentIndex++;
          updateDisplay(currentIndex);
        }
      }
    } else {
      setTimeout(() => {
        clear(topOutput);
        result.innerHTML = "0";
      }, 2000);
      clear(result);
      topOutput.innerHTML = "No previous History";
    }
  });
});

// FUNCTIONS

function addToLocalStorage(expression, solution) {
  const item = { expression, solution };
  let history = getLocalStorage();
  history.push(item);
  localStorage.setItem("history", JSON.stringify(history));
}

function getLocalStorage() {
  return localStorage.getItem("history")
    ? JSON.parse(localStorage.getItem("history"))
    : [];
}

function calculate() {
  let answer;
  equation = storedInput.join("").replace(/(\))([0-9])/g, "$1*$2");
  equation = equation.replace(/([0-9])(\()/g, "$1*$2");
  console.log(equation);
  // console.log(equation);
  let errorFound = false;
  try {
    answer = eval(equation);
    result.innerHTML = answer;
    ans = answer;
    addToLocalStorage(equation, ans);
    history = getLocalStorage();
    currentIndex = history.length - 1;
  } catch (error) {
    error.message = `calculation error.
    check input.`;
    result.style.textAlign = "center";
    result.innerHTML = error.message;
    errorFound = true;
  }
  if (errorFound) {
    evaluated = false;
    storedInput.length = 0;
    setTimeout(() => {
      clear(topOutput);
      clear(result);
    }, 2000);
  } else {
    evaluated = true;
  }
}

function clear(item) {
  item.innerHTML = "";
}

function clearHistory() {
  localStorage.clear();
  history.length = 0;
}

function updateDisplay(index) {
  topOutput.innerHTML = history[index].expression;
  result.innerHTML = history[index].solution;
}

function updateHistory() {
  history = getLocalStorage();
  currentIndex = history.length - 1;
}
