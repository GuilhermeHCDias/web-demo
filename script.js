const button = document.getElementById("actionButton");
const counter = document.getElementById("counter");

let clicks = 0;

button.addEventListener("click", () => {
  clicks += 1;
  counter.textContent = `You have clicked ${clicks} times.`;
});
