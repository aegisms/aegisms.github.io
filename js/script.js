function showGreeting() {
  const hour = new Date().getHours();
  let message;

  if (hour < 12) {
    message = "Good Morning!";
  } else if (hour < 18) {
    message = "Good Afternoon!";
  } else {
    message = "Good Evening!";
  }

  const greetingEl = document.getElementById("greeting");
  if (greetingEl) {
    greetingEl.textContent = message;
  }
}

showGreeting();
