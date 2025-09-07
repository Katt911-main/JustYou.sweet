/* photo.js
   Simple client-side feed:
   - saves posts to localStorage (base64 image + caption)
   - supports like toggle + comments
   - meant as mentahan sebelum konek ke backend
*/

(function () {
  // keys
  const STORAGE_KEY = 'justyou_posts_v1';
  const CURRENT_USER_KEY = 'justyou_user'; // optional

  // get current user name (fallback)
  const currentUser = localStorage.getItem(CURRENT_USER_KEY) || 'You';

  // DOM
  const photoInput = document.getElementById('photoInput');
  const previewWrap = document.getElementById('previewWrap');
  const previewImg = document.getElementById('previewImg');
  const removePreview = document.getElementById('removePreview');
  const captionInput = document.getElementById('captionInput');
  const uploadForm = document.getElementById('uploadForm');
  const feedEl = document.getElementById('feed');

  // helpers
  function uid() {
    return 'id-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
  }

  function readPosts() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error('readPosts error', e);
      return [];
    }
  }

  function savePosts(posts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function timeAgo(ts) {
    const s = Math.floor((Date.now() - ts) / 1000);
    if (s < 60) return `${s}s`;
    const m = Math.floor(s / 60);
    if (m < 60) return `${m}m`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h`;
    const d = Math.floor(h / 24);
    return `${d}d`;
  }

  // render feed
  function renderFeed() {
    const posts = readPosts().slice().reverse(); // newest first
    feedEl.innerHTML = '';

    if (!posts.length) {
      feedEl.innerHTML = `<div class="card"><p style="color:#7a6653;padding:12px">Belum ada momen. Upload foto dulu yuk ❤️</p></div>`;
      return;
    }

    posts.forEach(post => {
      const postEl = document.createElement('article');
      postEl.className = 'post fade-in';
      postEl.dataset.id = post.id;

      // header
      const headerHTML = `
        <div class="meta">
          <img class="avatar" src="${post.avatar || 'images/logo.png'}" alt="avatar">
          <div style="flex:1">
            <div style="font-weight:600;color:#5c4033">${escapeHtml(post.author || currentUser)}</div>
            <div style="font-size:0.85rem;color:#8b6f5e">${timeAgo(post.ts)}</div>
          </div>
        </div>
      `;

      // image
      const imgHTML = `<img class="post-img" src="${post.image}" alt="post image">`;

      // body
      const captionHTML = `<div class="post-body">
          <div class="caption">${escapeHtml(post.caption || '')}</div>
        </div>`;

      // actions
      const isLiked = (post.likes || []).includes(currentUser);
      const actionsHTML = `
        <div class="actions">
          <button class="like-btn" data-action="like">${isLiked ? '💖 Liked' : '🤍 Like'}</button>
          <div class="likes-count">${(post.likes || []).length} like(s)</div>
          <div style="flex:1"></div>
          <button class="comment-btn" data-action="toggleComments">💬 Komentar</button>
        </div>
      `;

      // comments
      const commentsHTML = `
        <div class="comments hidden">
          ${(post.comments || []).map(c => `<div class="comment"><strong>${escapeHtml(c.author)}:</strong> ${escapeHtml(c.text)}</div>`).join('')}
          <div class="add-comment">
            <input type="text" placeholder="Tulis komentar..." class="comment-input">
            <button class="btn-add-comment">Kirim</button>
          </div>
        </div>
      `;

      postEl.innerHTML = headerHTML + imgHTML + captionHTML + actionsHTML + commentsHTML;
      feedEl.appendChild(post
