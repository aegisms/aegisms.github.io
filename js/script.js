// ===== Dynamic Greeting (Home page) =====
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


// ===== Contact Form Validation (Contact page) =====
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;

    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const messageField = document.getElementById("message");

    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("messageError").textContent = "";
    document.getElementById("formSuccess").textContent = "";

    if (nameField.value.trim() === "") {
      document.getElementById("nameError").textContent = "Name is required.";
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailField.value.trim())) {
      document.getElementById("emailError").textContent = "Enter a valid email.";
      isValid = false;
    }

    if (messageField.value.trim().length < 10) {
      document.getElementById("messageError").textContent = "Message must be at least 10 characters.";
      isValid = false;
    }

    if (isValid) {
      document.getElementById("formSuccess").textContent = "Message sent successfully!";
      document.getElementById("formSuccess").style.color = "green";
      contactForm.reset();
    }
  });
}


// ===== Interactive Projects Gallery (Projects page) =====
$(document).ready(function () {
  $(".thumb").on("click", function () {
    const title = $(this).data("title");
    const description = $(this).data("description");
    const imageSrc = $(this).attr("src");

    $("#mainImage").attr("src", imageSrc);
    $("#mainTitle").text(title);
    $("#mainDescription").text(description);
  });

  $(".thumb").on("mouseover", function () {
    $(this).css("opacity", "0.7");
  });
  $(".thumb").on("mouseout", function () {
    $(this).css("opacity", "1");
  });
});


// ===== My Articles (Home page) =====
const articleList = document.getElementById("articleList");

if (articleList) {
  fetch("https://dev.to/api/articles?username=ben&per_page=2")
    .then((response) => response.json())
    .then((articles) => {
      articles.forEach((article) => {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = article.url;
        link.textContent = article.title;
        link.target = "_blank";
        li.appendChild(link);
        articleList.appendChild(li);
      });
    })
    .catch((error) => {
      articleList.innerHTML = "<li>Could not load articles right now.</li>";
      console.error(error);
    });
}


// ===== Live Weather (Home page) =====
const weatherBtn = document.getElementById("getWeatherBtn");
const API_KEY = "YOUR_API_KEY_HERE"; // demo/restricted key — see README

if (weatherBtn) {
  weatherBtn.addEventListener("click", function () {
    const city = document.getElementById("cityInput").value.trim();
    const weatherResult = document.getElementById("weatherResult");

    if (city === "") {
      weatherResult.innerHTML = "<p style='color:red;'>Please enter a city name.</p>";
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    weatherResult.innerHTML = "<p>Loading...</p>";

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("City not found");
        }
        return response.json();
      })
      .then((data) => {
        const temp = data.main.temp;
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const cityName = data.name;

        weatherResult.innerHTML = `
          <h3>${cityName}</h3>
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
          <p>${temp}°C, ${description}</p>
        `;
      })
      .catch((error) => {
        weatherResult.innerHTML = "<p style='color:red;'>Could not fetch weather. Check the city name or your connection.</p>";
        console.error(error);
      });
  });
}
