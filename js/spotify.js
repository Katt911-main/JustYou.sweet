// js/spotify.js
document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");
  const currentTrack = document.getElementById("currentTrack");

  // Dummy data sementara
  const dummySongs = [
    {
      title: "Perfect",
      artist: "Ed Sheeran",
      image: "https://i.scdn.co/image/ab67616d0000b273f03f3d93926ab9dd98ec2bb4",
      url: "https://open.spotify.com/track/0tgVpDi06FyKpA1z0VMD4v"
    },
    {
      title: "Love Story",
      artist: "Taylor Swift",
      image: "https://i.scdn.co/image/ab67616d0000b27377b1de7f70d0cc4b535a1d7e",
      url: "https://open.spotify.com/track/0n2JZRebgWFhXguIDwd9qF"
    },
    {
      title: "Daylight",
      artist: "David Kushner",
      image: "https://i.scdn.co/image/ab67616d0000b2736f08bc07ccf4175da8b87e2f",
      url: "https://open.spotify.com/track/2XvOEK6DlR2bGQVDmOyGXh"
    }
  ];

  // ===== SEARCH SONG =====
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = searchInput.value.toLowerCase();

    const results = dummySongs.filter(song =>
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query)
    );

    if (results.length === 0) {
      searchResults.innerHTML = `<p class="empty">Tidak ada lagu yang cocok.</p>`;
      return;
    }

    searchResults.innerHTML = "";
    results.forEach(song => {
      const track = document.createElement("div");
      track.classList.add("track-item");
      track.innerHTML = `
        <img src="${song.image}" alt="${song.title}">
        <div class="track-item-info">
          <h4>${song.title}</h4>
          <p>${song.artist}</p>
        </div>
      `;
      track.addEventListener("click", () => playSong(song));
      searchResults.appendChild(track);
    });
  });

  // ===== PLAY SONG =====
  const playSong = (song) => {
    currentTrack.innerHTML = `
      <img src="${song.image}" alt="${song.title}">
      <h3>${song.title}</h3>
      <p>${song.artist}</p>
      <a href="${song.url}" target="_blank">
        <button class="play-btn">Play di Spotify</button>
      </a>
    `;

    // Simpan lagu yang diputar agar pacar kamu lihat juga
    localStorage.setItem("currentSong", JSON.stringify(song));
  };

  // Load lagu yang terakhir diputar
  const lastSong = localStorage.getItem("currentSong");
  if (lastSong) {
    playSong(JSON.parse(lastSong));
  }
});
