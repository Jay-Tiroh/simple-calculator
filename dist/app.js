// selecting elements

const topOutput = document.querySelector(".calculation");
const result = document.querySelector(".result");
const btns = document.querySelectorAll(".btn");
const yellowBtns = document.querySelectorAll(".yellow");
const brackets = document.querySelectorAll(".brace");

// mutation observer
const mutationObserver = new MutationObserver(() => {
  currentValue = topOutput.innerHTML;
  equation += currentValue;
  console.log(equation);
});

result.innerHTML = 0;
// VARIABLES
let evaluated = false;
let equation;
let storedInput = [];
let currentValue;
let ans;

// EVENT LISTENERS
brackets.forEach((brace) => {
  brace.addEventListener("click", (e) => {
    let symbol = e.currentTarget.dataset.sign;
    symbol === "leftBracket"
      ? (topOutput.innerHTML += `(`)
      : (topOutput.innerHTML += `)`);
  });
});

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const thisBtn = e.currentTarget;
    const value = thisBtn.innerHTML;
    let symbol = e.currentTarget.dataset.sign;

    if (evaluated) {
      clear(topOutput);
      evaluated = false;
      topOutput.innerHTML = ans;
    }

    if (e.currentTarget.classList.contains("digit")) {
      topOutput.innerHTML += value;
    }

    if (e.currentTarget.classList.contains("yellow")) {
      //   console.log(e.currentTarget);
      topOutput.innerHTML += symbol;
    }

    if (e.currentTarget.classList.contains("clear-btn")) {
      clear(topOutput);
      result.innerHTML = 0;
    }

    if (e.currentTarget.classList.contains("equals")) calculate();
    // equation = calculate();
  });
});

// yellowBtns.forEach((btn) => {
//   btn.addEventListener("click", (e) => {
//     let operation = e.target.dataset.operator;

//     // // mutationObserver.disconnect();
//     // currentValue = topOutput.innerHTML;
//     // storedInput.push(currentValue);
//     // result.innerHTML = currentValue;
//     // clear(topOutput);
//     // // console.log(currentValue);

//     // if (operation === "add") {
//     //   storedInput.push("+");

//     //   //   console.log(equation);
//     //   if (isStored % 2 === 1) {
//     //     mutationObserver.disconnect();
//     //     isStored++;
//     //     calculate();
//     //   } else {
//     //     // mutationObserver.observe(topOutput, {
//     //     //   childList: true,
//     //     //   subtree: true,
//     //     //   CharacterData: true,
//     //     //   characterDataOldValue: true,
//     //     // });
//     //     isStored++;
//     //   }
//     // }
//   });
// });

// FUNCTIONS

function calculate() {
  //   storedInput.forEach((item) => {
  //     equation += item;
  //   });
  //   console.log(equation);
  equation = topOutput.innerHTML;
  result.innerHTML = eval(equation);
  evaluated = true;
  ans = result.innerHTML;
}

function clear(item) {
  item.innerHTML = "";
}

//   if (isStored && e.currentTarget.classList.contains("plus")) {
//     accumulator += parseInt(storedInput);
//     topOutput.innerHTML = "";
//     result.innerHTML = accumulator;
//   }
//   if (isStored && e.currentTarget.classList.contains("multiplication")) {
//     accumulator *= parseInt(storedInput);
//     topOutput.innerHTML = "";
//     result.innerHTML = accumulator;
//   }
//   if (isStored && e.currentTarget.classList.contains("division")) {
//     accumulator /= parseInt(storedInput);
//     topOutput.innerHTML = "";
//     result.innerHTML = accumulator;
//   }

// function calculate(btn) {
//   let storedInput = topOutput.innerHTML;
//   let resultOutput = result.innerHTML;
//   isStored++;
//   topOutput.innerHTML = "";
//   resultOutput = storedInput;
//   accumulator = storedInput;
//   if (btn.classList.contains("minus")) {
//     let operation = accumulator - topOutput;
//   }
//   return operation;
// }

// if (e.currentTarget.classList.contains("yellow")) {
//       let storedInput = [];
//       let iteration = storedInput.length;
//       let enteredValue = 0;
//       let isClicked = 0;

//       if (iteration === 0) {
//         storedInput.push(Number(topOutput.innerHTML));
//         let num = storedInput[iteration];
//         result.innerHTML = num;
//         topOutput.innerHTML = "";
//         accumulator = storedInput[iteration];
//         isClicked++;
//       }

//       if (isClicked > 0 && e.currentTarget.classList.contains("equals")) {
//         // if (e.currentTarget.classList.contains("minus")) {
//         enteredValue = getInput();
//         // storedInput[isClicked] = enteredValue;

//         //   storedInput = topOutput.innerHTML;
//         //   accumulator -= parseInt(storedInput);
//         //   topOutput.innerHTML = "";
//         setTimeout(() => {
//           if (!enteredValue) result.innerHTML = accumulator;
//           else {
//             result.innerHTML = accumulator - enteredValue;
//           }
//         }, 2000);
//       }
//       function getInput() {
//         setInterval(() => {
//           let number = Number(topOutput.innerHTML);
//           return number;
//         }, 1000);
//       }
