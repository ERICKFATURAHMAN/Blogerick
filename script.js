/**
 * 1. AUTO-SLIDE CAROUSEL UNTUK FOTO HERO
 */
let currentHeroSlide = 0;
let heroSlideInterval = null;
const SLIDE_DELAY_MS = 3500;

function showHeroSlide(index) {
  const slides = document.querySelectorAll('#heroSlider .hero-slide');
  const dots = document.querySelectorAll('#heroSliderDots .dot');
  if (!slides.length) return;

  if (index >= slides.length) {
    currentHeroSlide = 0;
  } else if (index < 0) {
    currentHeroSlide = slides.length - 1;
  } else {
    currentHeroSlide = index;
  }

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === currentHeroSlide);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentHeroSlide);
  });
}

function goToHeroSlide(index) {
  showHeroSlide(index);
  resetHeroSlideTimer();
}

function startHeroSlideTimer() {
  heroSlideInterval = setInterval(() => {
    showHeroSlide(currentHeroSlide + 1);
  }, SLIDE_DELAY_MS);
}

function resetHeroSlideTimer() {
  clearInterval(heroSlideInterval);
  startHeroSlideTimer();
}

/**
 * 2. EFEK PARALLAX SVG DESKTOP
 */
document.addEventListener('mousemove', function (e) {
  if (window.innerWidth < 920) return;
  const svgLines = document.querySelector('.animated-lines-svg');
  if (!svgLines) return;

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const deltaX = (e.clientX - centerX) / 45;
  const deltaY = (e.clientY - centerY) / 45;

  svgLines.style.transform = `translate3d(${deltaX * -1}px, ${deltaY * -1}px, 0)`;
});

/**
 * 3. FILTER KATEGORI SKILL
 */
function filterSkill(category, clickedButton) {
  const allButtons = document.querySelectorAll('.tab-btn');
  allButtons.forEach((btn) => btn.classList.remove('active'));
  clickedButton.classList.add('active');

  const skillItems = document.querySelectorAll('#skillGrid .soft-item');
  skillItems.forEach((item) => {
    const itemCat = item.getAttribute('data-category');
    if (category === 'all' || itemCat === category) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

/**
 * 4. MODAL VIDEO VIEWER (GOOGLE DRIVE & CAROUSEL)
 */
const skillVideos = [
  {
    title: "02. Skill Video 1: Video Editing Proyek FoodTech HI-YOU",
    url: "https://drive.google.com/file/d/1DF4uceEHc_k2wIgYZdsiGvFxrrrZNY4F/preview",
    narrative: "Proses editing dan penyusunan narasi visual untuk kampanye proyek FoodTech HI-YOU (SaaS pengelolaan sisa makanan). Mengemas data dampak intervensi lapangan 14 hari—penurunan plate waste 23,46% dan konversi sampah organik—menjadi konten video edukatif dan persuasif."
  },
  {
    title: "02. Skill Video 2: Trainer & Konsultan Desain Proyek AWIS TEPANG",
    url: "https://drive.google.com/file/d/1eHtRX3OBIAQmwrsqpf5I_1eizwMLY3gr/preview",
    narrative: "Dokumentasi peran sebagai trainer desain grafis Canva sekaligus konsultan media intervensi perilaku (Nudge Theory) bersama Pemkab Karawang, melatih 6 Mojang Jajaka Karawang untuk kampanye penekanan sampah makanan hingga turun 18,03%."
  }
];

let currentModalVideoIndex = 0;
let isSkillGalleryMode = false;

function openSkillVideoGallery() {
  isSkillGalleryMode = true;
  currentModalVideoIndex = 0;
  renderModalVideo();

  const navBar = document.getElementById('modalVideoNavBar');
  if (navBar) navBar.style.display = 'flex';

  document.getElementById('videoModal').classList.add('active');
}

function renderModalVideo() {
  const current = skillVideos[currentModalVideoIndex];
  const titleEl = document.getElementById('modalTitle');
  const driveFrame = document.getElementById('modalDriveFrame');
  const narrativeEl = document.getElementById('modalNarrativeText');
  const counterPill = document.getElementById('videoCounterPill');

  titleEl.textContent = current.title;
  narrativeEl.textContent = current.narrative;
  driveFrame.src = current.url;

  if (counterPill) {
    counterPill.textContent = `Video ${currentModalVideoIndex + 1} dari ${skillVideos.length}`;
  }
}

function nextModalVideo() {
  if (!isSkillGalleryMode) return;
  currentModalVideoIndex = (currentModalVideoIndex + 1) % skillVideos.length;
  renderModalVideo();
}

function prevModalVideo() {
  if (!isSkillGalleryMode) return;
  currentModalVideoIndex = (currentModalVideoIndex - 1 + skillVideos.length) % skillVideos.length;
  renderModalVideo();
}

function openSingleVideoModal(title, videoSrc, narrativeText) {
  isSkillGalleryMode = false;
  const modal = document.getElementById('videoModal');
  const titleEl = document.getElementById('modalTitle');
  const driveFrame = document.getElementById('modalDriveFrame');
  const narrativeEl = document.getElementById('modalNarrativeText');
  const navBar = document.getElementById('modalVideoNavBar');

  titleEl.textContent = title;
  narrativeEl.textContent = narrativeText;
  driveFrame.src = videoSrc;

  if (navBar) navBar.style.display = 'none';
  modal.classList.add('active');
}

function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  const driveFrame = document.getElementById('modalDriveFrame');

  if (driveFrame) driveFrame.src = '';
  if (modal) modal.classList.remove('active');
}

function closeModalOnBg(event) {
  if (event.target.id === 'videoModal') {
    closeVideoModal();
  }
}

/**
 * 5. MODAL PDF SERTIFIKAT
 */
function openPdfModal(title, pdfPath) {
  const modal = document.getElementById('pdfModal');
  const titleEl = document.getElementById('pdfModalTitle');
  const iframe = document.getElementById('pdfViewerFrame');
  const downloadLink = document.getElementById('pdfDownloadLink');

  titleEl.textContent = title;
  iframe.src = pdfPath;
  downloadLink.href = pdfPath;

  modal.classList.add('active');
}

function closePdfModal() {
  const modal = document.getElementById('pdfModal');
  const iframe = document.getElementById('pdfViewerFrame');

  if (iframe) iframe.src = '';
  if (modal) modal.classList.remove('active');
}

function closePdfOnBg(event) {
  if (event.target.id === 'pdfModal') {
    closePdfModal();
  }
}

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeVideoModal();
    closePdfModal();
  }
});

/**
 * 6. FLOATING VINYL MUSIC PLAYER
 */
const playlist = [
  { title: "DJ TYPEKU", src: "DJ1.mp3" },
  { title: "DJ SENCI", src: "DJ2.mp3" },
  { title: "DJ ALL NIGHT", src: "DJ3.mp3" }
];

let currentSongIndex = 0;

function loadSong(index) {
  const audio = document.getElementById('bgMusic');
  const title = document.getElementById('musicTitleText');

  currentSongIndex = (index + playlist.length) % playlist.length;
  audio.src = playlist[currentSongIndex].src;
  if (title) title.textContent = playlist[currentSongIndex].title;
}

function playSong() {
  const audio = document.getElementById('bgMusic');
  const disc = document.getElementById('vinylDisc');
  const btn = document.getElementById('btnMusicToggle');
  const eq = document.getElementById('musicEq');
  const status = document.getElementById('musicStatusText');

  audio.play().catch(() => {});
  if (disc) disc.classList.add('spinning');
  if (eq) eq.classList.add('active');
  if (btn) btn.textContent = '❚❚';
  if (status) status.textContent = `Song ${currentSongIndex + 1} of ${playlist.length}`;
}

function pauseSong() {
  const audio = document.getElementById('bgMusic');
  const disc = document.getElementById('vinylDisc');
  const btn = document.getElementById('btnMusicToggle');
  const eq = document.getElementById('musicEq');
  const status = document.getElementById('musicStatusText');

  audio.pause();
  if (disc) disc.classList.remove('spinning');
  if (eq) eq.classList.remove('active');
  if (btn) btn.textContent = '▶';
  if (status) status.textContent = 'Paused';
}

function toggleMusic() {
  const audio = document.getElementById('bgMusic');
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

function nextSong() {
  loadSong(currentSongIndex + 1);
  playSong();
}

function prevSong() {
  loadSong(currentSongIndex - 1);
  playSong();
}

/**
 * 7. CUSTOM SMOOTH SCROLL ENGINE (ANIMASI MELUNCUR PRESISI)
 */
function smoothScrollTo(targetPosition, duration = 800) {
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  // Rumus matematika pelambatan halus (ease-in-out)
  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  requestAnimationFrame(animation);
}

document.addEventListener('DOMContentLoaded', () => {
  startHeroSlideTimer();
  loadSong(0);

  const audio = document.getElementById('bgMusic');
  if (audio) {
    audio.addEventListener('ended', nextSong);
  }

  const sliderBox = document.getElementById('heroSlider');
  if (sliderBox) {
    sliderBox.addEventListener('mouseenter', () => clearInterval(heroSlideInterval));
    sliderBox.addEventListener('mouseleave', () => startHeroSlideTimer());
  }

  // Event listener tombol navigasi atas
  const navLinks = document.querySelectorAll('.quick-nav a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();

        const headerOffset = 80;
        const targetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;

        // Jalankan peluncuran visual selama 800ms
        smoothScrollTo(targetTop, 800);

        history.pushState(null, null, targetId);
      }
    });
  });
});