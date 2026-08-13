const GOOGLE_FORM_ACTION = "https://docs.google.com/forms/d/e/1FAIpQLSeGb542cQbc69Os1tCDwvO400-iaq2u5dWi4uhiuwf_9Msr4g/formResponse";

const signupForm = document.getElementById("signup-form");

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const status = document.getElementById("signup-status");
    const submitBtn = signupForm.querySelector(".signup-submit");
    const formData = new FormData(signupForm);

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting…";

    try {
      await fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });
      status.textContent = "Thanks — we've got your details and will be in touch.";
      status.classList.add("success");
      signupForm.reset();
    } catch (err) {
      status.textContent = "Something went wrong. Please try again.";
      status.classList.add("error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit";
    }
  });
}
