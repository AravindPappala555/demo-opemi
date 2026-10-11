/**
 * PrimeFlix - Dynamic Streaming Platform Logic
 * Netflix + Prime Video Hybrid Features:
 * - Smooth Carousel Arrow Navigation
 * - Genre Filter Tabs
 * - Live Search Filtering
 * - Cinematic Details / Trailer Modal
 * - Interactive Watchlist with Toast Notifications
 */

// 1. Navbar Scroll Effect
window.addEventListener('scroll', () => {
  const nav = document.getElementById('main-nav');
  if (window.scrollY > 40) {
    nav.style.backgroundColor = 'rgba(11, 14, 20, 0.98)';
  } else {
    nav.style.backgroundColor = 'transparent';
  }
});

// 2. Carousel Horizontal Scroll Navigation
function scrollRow(carouselId, direction) {
  const carousel = document.getElementById(carouselId);
  if (!carousel) return;
  const scrollAmount = 600 * direction;
  carousel.scrollBy({
    left: scrollAmount,
    behavior: 'smooth'
  });
}

// 3. Category Filter Tabs
function filterGenre(genre) {
  const buttons = document.querySelectorAll('.pill-filter');
  buttons.forEach(btn => btn.classList.remove('active'));

  // Highlight clicked button
  event.target.classList.add('active');

  const rows = document.querySelectorAll('.movie-row-section');
  rows.forEach(row => {
    const rowCategory = row.getAttribute('data-category');
    if (genre === 'all' || rowCategory === genre || row.id === 'my-list') {
      row.classList.remove('hidden-row');
    } else {
      row.classList.add('hidden-row');
    }
  });

  // If selecting spiderman, scroll smoothly to Spider-Man section
  if (genre === 'spiderman') {
    const spideySection = document.getElementById('spiderman-universe');
    if (spideySection) {
      spideySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

// 4. Live Search Filter
const searchInput = document.getElementById('movie-search-input');
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.movie-card');

    cards.forEach(card => {
      const title = card.querySelector('.card-movie-title')?.textContent.toLowerCase() || '';
      const genres = card.querySelector('.card-genres')?.textContent.toLowerCase() || '';

      if (title.includes(query) || genres.includes(query) || query === '') {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });

    // Check if sections have visible cards
    const rows = document.querySelectorAll('.movie-row-section');
    rows.forEach(row => {
      const visibleCards = row.querySelectorAll('.movie-card[style*="display: block"]');
      if (query !== '' && visibleCards.length === 0) {
        row.style.opacity = '0.3';
      } else {
        row.style.opacity = '1';
      }
    });
  });
}

// 5. Cinematic Details / Trailer Modal
function openTrailerModal(title, bannerUrl, year, duration, match, description) {
  const modal = document.getElementById('movie-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalYear = document.getElementById('modal-year');
  const modalDuration = document.getElementById('modal-duration');
  const modalMatch = document.getElementById('modal-match');
  const modalDesc = document.getElementById('modal-description');

  if (modalTitle) modalTitle.textContent = title;
  if (modalImg) modalImg.src = bannerUrl;
  if (modalYear) modalYear.textContent = year;
  if (modalDuration) modalDuration.textContent = duration;
  if (modalMatch) modalMatch.textContent = match;
  if (modalDesc) modalDesc.textContent = description;

  if (modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function closeTrailerModal() {
  const modal = document.getElementById('movie-modal');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
}

function closeModalOnBackdrop(event) {
  if (event.target.id === 'movie-modal') {
    closeTrailerModal();
  }
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeTrailerModal();
  }
});

// 6. Interactive Watchlist & Toast Notification
let watchlistItems = new Set(['Spider-Man: No Way Home']);

function toggleWatchlist(btnElement, movieTitle) {
  const toast = document.getElementById('toast');
  const countSpan = document.getElementById('watchlist-count');

  if (watchlistItems.has(movieTitle)) {
    watchlistItems.delete(movieTitle);
    if (toast) toast.textContent = `Removed "${movieTitle}" from Watchlist`;
    if (btnElement && btnElement.classList.contains('plus-circle')) {
      btnElement.textContent = '+';
    }
  } else {
    watchlistItems.add(movieTitle);
    if (toast) toast.textContent = `Added "${movieTitle}" to Watchlist!`;
    if (btnElement && btnElement.classList.contains('plus-circle')) {
      btnElement.textContent = '✓';
    }
  }

  if (countSpan) countSpan.textContent = watchlistItems.size;

  // Show Toast
  if (toast) {
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
}
