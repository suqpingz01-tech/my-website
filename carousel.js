  // ---- 1. ข้อมูลการ์ด (แทนที่ด้วยข้อมูลจริงของคุณ / ดึงจาก API ก็ได้) ----
  const games = [
    { img: "img/4.png", title: "【バニー・水着コス追加】池袋セクサロイド女学園 Ver1.5.1",  views: "1.2k", tag: "🔥 Most Popular", href: "day video/day4.html" , font: "'Poppins', sans-serif", color: "white"},
    { img: "img/13.2.png",title: "Four Nights at the Burger Shop",     views: "1k", tag: "🔥 Trending Now",  href: "day video/day13.html" , font: "'Poppins', sans-serif", color: "white"},
    { img: "img/8.png",title: "おーらるえっち♡ぷれいやー",          views: "1.1k", tag: "🚀 Most downloaded",       href: "day video/day8.html" , font: "'Poppins', sans-serif", color: "white"},
    { img: "img/1.png",title: "My maid dream of Electric sheep",        views: "600", tag: "🎯 Staff Picks", href: "https://example.com/game/4" , font: "'Poppins', sans-serif", color: "white"},
    { img: "",title: "None",      views: "None", tag: "❤️ Most Liked",       href: "https://" , font: "'Poppins', sans-serif", color: "white"},
    { img: "img/4.png",title: "【バニー・水着コス追加】池袋セクサロイド女学園 Ver1.5.1",       views: "1.2k", tag: "👁 Most Viewed",  href: "day video/day4.html" , font: "'Poppins', sans-serif", color: "white"},
  ];

  // ---- 2. สร้างการ์ดแต่ละใบ ----
  const track = document.getElementById('track');
  games.forEach(game => {
    const card = document.createElement('a');
    card.className = 'card';
    card.href = game.href;          // <-- ลิงก์ไปหน้ารายละเอียด (คลิกเข้าไปได้จริง)
    card.target = '_blank';
    card.rel = 'noopener';
    card.innerHTML = `
      <div class="thumb">
        <img src="${game.img}" alt="thumbnail" class="thumb-img">
        <div class="views-badge">👁 ${game.views}</div>
        <div class="thumb-gradient"></div>
        <div class="card-caption"
        style="font-family:${game.font}; color:${game.color};">
        ${game.title}
    </div>
      </div>
      <div class="card-body">
        <span class="tag">${game.tag}</span>
        <div class="views-text">
          👁 ${game.views} views
        </div>
      </div>
    `;
    track.appendChild(card);
  });

  // ---- 3. ตรรกะปุ่มเลื่อนถัดไป / ย้อนกลับ ----
  const viewport = document.querySelector('.carousel-viewport');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const cardWidth = 260 + 16; // ความกว้างการ์ด + gap
  const scrollAmount = cardWidth; // เลื่อนทีละ 1 การ์ด
  let position = 0;

  function getMaxScroll(){
    // ป้องกันค่าติดลบ เผื่อการ์ดทั้งหมดพอดีกับ viewport อยู่แล้ว
    return Math.max(track.scrollWidth - viewport.clientWidth, 0);
  }

  function updateTrack(){
    const maxScroll = getMaxScroll();
    // clamp ตำแหน่งทุกครั้งกันเคสค้าง เช่น resize หน้าจอ
    position = Math.min(Math.max(position, 0), maxScroll);
    track.style.transform = `translateX(-${position}px)`;
    prevBtn.disabled = position <= 0;
    nextBtn.disabled = position >= maxScroll;
  }

  nextBtn.addEventListener('click', () => {
    position = position + scrollAmount;
    updateTrack();
  });

  prevBtn.addEventListener('click', () => {
    position = position - scrollAmount;
    updateTrack();
  });

  window.addEventListener('resize', updateTrack);
  updateTrack();