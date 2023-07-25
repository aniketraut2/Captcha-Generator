// Selecting necessary DOM elements
const captchaTextBox = document.querySelector(".captcha_box input");
const refreshButton = document.querySelector(".refresh_button");
const captchaInputBox = document.querySelector(".captcha_input input");
const message = document.getElementById("message");
const submitButton = document.getElementById("submitBtnClick");

// Variable to store generated captcha
let captchaText = null;

// Function to generate captcha
const generateCaptcha = () => {
  const randomString = Math.random().toString(36).substring(2, 7);
  const randomStringArray = randomString.split("");
  const changeString = randomStringArray.map((char) => (Math.random() > 0.5 ? char.toUpperCase() : char));
  captchaText = changeString.join("   "); // The captcha characters are separated by three spaces for better readability
  captchaTextBox.value = captchaText;
};

const refreshBtnClick = (event) => {
  event.preventDefault(); // Prevent form submission
  generateCaptcha();
  captchaInputBox.value = "";
  captchaKeyUpValidate();
};

const captchaKeyUpValidate = () => {
  // Toggle submit button disabled attribute based on captcha input field.
  submitButton.disabled = !captchaInputBox.value;

  if (!captchaInputBox.value) {
    message.innerText = "";
    message.classList.remove("correct", "incorrect");
  }
};

// Function to validate the entered captcha
const submitBtnClick = (event) => {
  event.preventDefault(); // Prevent form submission
  captchaText = captchaText.split("").filter((char) => char !== " ").join("");
  message.classList.add("active");

  // Check if the entered captcha text is correct or not
  if (captchaInputBox.value === captchaText) {
    message.innerText = "Entered Captcha is Correct";
    message.classList.remove("incorrect");
    message.classList.add("correct");
  } else {
    message.innerText = "Entered Captcha is inCorrect";
    message.classList.remove("correct");
    message.classList.add("incorrect");
  }

  // Hide the message after a few seconds
  setTimeout(() => {
    message.classList.remove("active");
  }, 3000); // 3 seconds
};

// Add event listeners for the refresh button, captchaInputBox, and form submission
refreshButton.addEventListener("click", refreshBtnClick);
captchaInputBox.addEventListener("keyup", captchaKeyUpValidate);
submitButton.addEventListener("click", submitBtnClick);

// Generate initial captcha on page load
generateCaptcha();
