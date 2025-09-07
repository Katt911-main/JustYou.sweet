// Element
const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

// Toggle tab
loginTab.addEventListener('click', () => {
  loginForm.classList.remove('hidden');
  registerForm.classList.add('hidden');
  loginTab.classList.add('active');
  registerTab.classList.remove('active');
});

registerTab.addEventListener('click', () => {
  registerForm.classList.remove('hidden');
  loginForm.classList.add('hidden');
  registerTab.classList.add('active');
  loginTab.classList.remove('active');
});

// Dummy login validation
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  // hanya Vieqi dan Rara yang bisa login
  if (email === "vieqi@example.com" && password === "030") {
    alert("Login sukses! Welcome Vieqi ❤️");
    window.location.href = "dashboard.html";
  } else if (email === "rara@example.com" && password === "030") {
    alert("Login sukses! Welcome Rara ❤️");
    window.location.href = "dashboard.html";
  } else {
    alert("Email atau password salah! 🥺");
  }
});

// Dummy register simulation
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert("Register sukses! Silakan login.");
  loginTab.click();
});
