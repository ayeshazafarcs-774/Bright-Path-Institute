
"use strict";

// MOBILE NAVIGATION
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.textContent = open ? "✕" : "☰";
  menuBtn.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.textContent = "☰";
    menuBtn.setAttribute("aria-expanded", "false");
  });
});



const tutorSelect = document.getElementById("tutor");
const subjectSelect = document.getElementById("subject");

const tutorSubjects = {
  "Ayesha": ["Computer Science"],
  "Nimra": ["English", "Biology"],
  "Ahmad": ["Mathematics", "Physics"],
  "Warda": ["Chemistry"],
  "Iram": ["Urdu", "Pakistan Studies"],
  "Fozia": [
    "Islamiat",
    "Quran with Tajweed",
    "Translation of the Holy Quran"
  ]
};

function updateSubjects() {
  const tutor = tutorSelect.value.trim();
  const subjects = tutorSubjects[tutor] || [];

  subjectSelect.innerHTML =
    '<option value="">Choose a subject</option>';

  subjects.forEach(subject => {
    const option = document.createElement("option");
    option.value = subject;
    option.textContent = subject;
    subjectSelect.appendChild(option);
  });

  subjectSelect.disabled = subjects.length === 0;
}

tutorSelect.addEventListener("change", updateSubjects);
updateSubjects();


function updateSubjects() {
  const tutor = tutorSelect.value;
  const subjects = tutorSubjects[tutor] || [];

  subjectSelect.innerHTML =
    '<option value="">Choose a subject</option>';

  subjects.forEach(subject => {
    const option = document.createElement("option");
    option.value = subject;
    option.textContent = subject;
    subjectSelect.appendChild(option);
  });

  if (subjects.length === 1) {
    subjectSelect.value = subjects[0];
  }
}

tutorSelect.addEventListener("change", updateSubjects);

document.querySelectorAll("[data-tutor]").forEach(button => {
  button.addEventListener("click", () => {
    tutorSelect.value = button.dataset.tutor;
    updateSubjects();
  });
});


// CONTACT FORM - AJAX SUBMISSION

const inquiryForm = document.getElementById("studentInquiryForm");
const formStatus = document.getElementById("formStatus");

if (inquiryForm) {
  inquiryForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const submitButton = inquiryForm.querySelector(
      'button[type="submit"]'
    );

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    if (formStatus) {
      formStatus.textContent = "Submitting your inquiry...";
    }

    try {
      const response = await fetch(inquiryForm.action, {
        method: "POST",
        body: new FormData(inquiryForm),
        headers: {
          Accept: "application/json"
        }
      });

      const result = await response.json();

      if (
        !response.ok ||
        (result.success !== true && result.success !== "true")
      ) {
        throw new Error("Submission failed");
      }

      // Open professional Thank You page
      window.location.href = "thank-you.html";

    } catch (error) {
      if (formStatus) {
        formStatus.textContent =
          "Unable to confirm submission. Please try again.";
      }

      submitButton.disabled = false;
      submitButton.textContent = "Send My Inquiry ↗";
    }
  });
}


// IMAGE FALLBACK
document.querySelectorAll(".teacher-photo img").forEach(img => {
  img.addEventListener("error", () => {
    img.style.display = "none";

    const placeholder = document.createElement("div");
    placeholder.textContent = "✦";
    placeholder.style.cssText = `
      display:grid;
      place-items:center;
      height:100%;
      font-size:80px;
      color:#493b94;
    `;

    img.parentElement.appendChild(placeholder);
  });
});

