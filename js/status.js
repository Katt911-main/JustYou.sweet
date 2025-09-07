// js/status.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("statusForm");
  const statusList = document.getElementById("statusList");

  const loadStatus = () => {
    const statuses = JSON.parse(localStorage.getItem("statuses")) || [];
    statusList.innerHTML = "";

    if (statuses.length === 0) {
      statusList.innerHTML = `<p class="empty">Belum ada status yang diupload.</p>`;
      return;
    }

    statuses.forEach((status, index) => {
      const card = document.createElement("div");
      card.classList.add("status-card");
      card.innerHTML = `
        <img src="${status.image}" alt="Status">
        <p>${status.caption}</p>
        <button onclick="deleteStatus(${index})" class="delete-btn">Hapus</button>
      `;
      statusList.appendChild(card);
    });
  };

  window.deleteStatus = (index) => {
    const statuses = JSON.parse(localStorage.getItem("statuses")) || [];
    statuses.splice(index, 1);
    localStorage.setItem("statuses", JSON.stringify(statuses));
    loadStatus();
  };

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const imageInput = document.getElementById("statusImage").files[0];
      const caption = document.getElementById("statusCaption").value.trim();

      if (!imageInput || !caption) return alert("Isi semua data!");

      const reader = new FileReader();
      reader.onload = function (event) {
        const statuses = JSON.parse(localStorage.getItem("statuses")) || [];
        statuses.push({ image: event.target.result, caption });
        localStorage.setItem("statuses", JSON.stringify(statuses));
        form.reset();
        loadStatus();
      };
      reader.readAsDataURL(imageInput);
    });
  }

  loadStatus();
});
