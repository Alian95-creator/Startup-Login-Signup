const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const container = document.querySelector(".container");
const toggleButtons = document.querySelectorAll(".toggle");
const errorCard = document.getElementById("error-card");

// Toggle login/signup
toggleButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    if(container.classList.contains("signup-active")){
      container.classList.remove("signup-active");
      container.classList.add("login-active");
      loginForm.classList.add("active");
      signupForm.classList.remove("active");
    } else {
      container.classList.remove("login-active");
      container.classList.add("signup-active");
      signupForm.classList.add("active");
      loginForm.classList.remove("active");
    }
  });
});

// ===== LOGIN FakeStore API =====
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const response = await fetch("https://fakestoreapi.com/auth/login", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({username,password})
    });
    if(!response.ok) throw new Error("Login gagal — coba lagi!");
    const data = await response.json();
    localStorage.setItem("authToken", data.token);
    alert("Login berhasil! Token: " + data.token);
  } catch(error){ alert(error.message); }
});

// ===== SIGNUP Simulasi =====
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const terms = document.getElementById("terms").checked;

  if(!terms){ alert("Setujui syarat dulu 😅"); return; }

  const userData = {name,email,password};
  localStorage.setItem("signupData", JSON.stringify(userData));
  alert("Signup berhasil! Silahkan login sekarang.");
  signupForm.reset();
});


loginForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  // Validasi sederhana
  const emailValid = email.includes("@") && email.includes(".");
  const passwordValid = password.length >= 6;

  // Dummy akun bener (biar realistis)
  const correctEmail = "admin@gmail.com";
  const correctPassword = "123456";

  if (!emailValid || !passwordValid || email !== correctEmail || password !== correctPassword) {
    showError();
  } else {
    alert("Login berhasil!");
  }
});

function showError() {
  errorCard.classList.add("active");
}

function closeError() {
  errorCard.classList.remove("active");
}