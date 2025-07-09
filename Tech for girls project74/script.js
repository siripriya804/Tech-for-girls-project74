let counter = 0;
const whatsappBtn = document.getElementById("whatsappBtn");
const counterDisplay = document.getElementById("counter");
const submitBtn = document.getElementById("submitBtn");
const form = document.getElementById("registrationForm");
const message = document.getElementById("message");

if (localStorage.getItem("submitted") === "true") {
  disableForm();
}

whatsappBtn.addEventListener("click", () => {
  if (counter < 5) {
    const url = "https://api.whatsapp.com/send?text=Hey%20Buddy,%20Join%20Tech%20For%20Girls%20Community!";
    window.open(url, '_blank');
    counter++;
    counterDisplay.textContent = Click count: ${counter}/5;
    if (counter >= 5) {
      whatsappBtn.disabled = true;
      counterDisplay.textContent = "Sharing complete. Please continue.";
      submitBtn.disabled = false;
    }
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (counter < 5) {
    alert("Please share on WhatsApp 5 times before submitting.");
    return;
  }

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const college = document.getElementById("college").value;
  const file = document.getElementById("screenshot").files[0];

  const formData = new FormData();
  formData.append("name", name);
  formData.append("phone", phone);
  formData.append("email", email);
  formData.append("college", college);
  formData.append("file", file);

  // Replace with your Google Apps Script Web App URL
  const scriptURL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

  try {
    await fetch(scriptURL, {
      method: 'POST',
      body: formData
    });
    message.textContent = "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!";
    disableForm();
    localStorage.setItem("submitted", "true");
  } catch (err) {
    alert("Something went wrong. Please try again.");
  }
});

function disableForm() {
  const inputs = form.querySelectorAll("input, button");
  inputs.forEach(input => input.disabled = true);
  message.textContent = "🎉 Your submission has already been recorded.";
}