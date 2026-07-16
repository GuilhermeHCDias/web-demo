const button = document.getElementById("actionButton");
const resetButton = document.getElementById("resetButton");
const counter = document.getElementById("counter");

let clicks = 0;

function render() {
  if (clicks > 0 && clicks % 10 === 0) {
    counter.textContent = `Nice! ${clicks} clicks and counting.`;
  } else {
    counter.textContent = `You have clicked ${clicks} times.`;
  }
}

button.addEventListener("click", () => {
  clicks += 1;
  render();
});

resetButton.addEventListener("click", () => {
  clicks = 0;
  render();
});
