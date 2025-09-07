// Navigasi antar tab
const navButtons = document.querySelectorAll('.nav-btn');
const tabs = document.querySelectorAll('.tab-content');

navButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Hapus active dari semua tombol
    navButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Ganti konten tab
    const target = button.getAttribute('data-target');
    tabs.forEach(tab => {
      tab.classList.remove('active');
      if (tab.id === target) {
        tab.classList.add('active');
      }
    });
  });
});

// Tombol logout
const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', () => {
  alert("Berhasil logout. Sampai jumpa! 🐻");
  window.location.href = "index.html";
});
