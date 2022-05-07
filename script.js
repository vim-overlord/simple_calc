class Calculator {
  constructor(prevText, currText) {
    this.prevText = prevText;
    this.currText = currText;
    this.clear();
  }
  clear() {
    this.curr = "";
    this.prev = "";
    this.op = undefined;
  }
  delete() {
    this.curr = this.curr.toString().slice(0, -1);
  }
  append(num) {
    if (num === "." && this.curr.includes(".")) return;
    this.curr = this.curr.toString() + num.toString();
  }
  chooseOperation(op) {
    if (this.curr === "") return;
    if (this.prev !== "") this.compute();
    this.op = op;
    if (this.op === "xy") this.op = "^";
    this.prev = this.curr;
    this.curr = "";
  }
  compute() {
    let res;
    const prevNum = parseFloat(this.prev);
    const currNum = parseFloat(this.curr);

    if (isNaN(prevNum) || isNaN(currNum)) return;
    switch (this.op) {
      case "+":
        res = prevNum + currNum;
        break;
      case "-":
        res = prevNum - currNum;
        break;
      case "*":
        res = prevNum * currNum;
        break;
      case "/":
        res = prevNum / currNum;
        break;
      case "%":
        res = prevNum % currNum;
        break;
      case "^":
        res = Math.pow(prevNum, currNum);
        break;
      default:
        return;
    }
    this.curr = res;
    this.op = undefined;
    this.prev = "";
  }
  getDisplayNumber(num) {
    const strNum = num.toString();
    const intDigits = parseFloat(strNum.split(".")[0]);
    const decDigits = strNum.split(".")[1];
    let intDisplay;

    if (isNaN(intDigits)) intDisplay = "";
    else
      intDisplay = intDigits.toLocaleString("en", { maximumFractionDigits: 0 });
    if (decDigits != null) return `${intDisplay}.${decDigits}`;
    else return intDisplay;
  }
  update() {
    this.currText.innerText = this.getDisplayNumber(this.curr);
    if (this.op != null) {
      this.prevText.innerText = `${this.getDisplayNumber(this.prev)} ${
        this.op
      }`;
    } else this.prevText.innerText = "";
  }
}

const numButtons = document.querySelectorAll("[data-num]");
const opButtons = document.querySelectorAll("[data-op]");
const eqButton = document.querySelector("[data-eq]");
const delButton = document.querySelector("[data-del]");
const acButton = document.querySelector("[data-ac]");
const prevText = document.querySelector("[data-prev]");
const currText = document.querySelector("[data-curr]");
const calc = new Calculator(prevText, currText);

numButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calc.append(button.innerText);
    calc.update();
  });
});
opButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calc.chooseOperation(button.innerText);
    calc.update();
  });
});
eqButton.addEventListener("click", (button) => {
  calc.compute();
  calc.update();
});
acButton.addEventListener("click", (button) => {
  calc.clear();
  calc.update();
});
delButton.addEventListener("click", (button) => {
  calc.delete();
  calc.update();
});
