const hamburger = document.querySelector('.hamburger');
const mainNav = document.querySelector('.main-nav');
const navActions = document.querySelector('.nav-actions');
const navLinks = document.querySelectorAll('.main-nav a');
const hero = document.querySelector('.hero');
const thumbs = document.querySelectorAll('.thumb');
const contactForm = document.querySelector('#contactForm');
const plusButtons = document.querySelectorAll('.plus-toggle');
const revealItems = document.querySelectorAll('.reveal');
const smallPlus = document.querySelector('.small-plus');
const searchForm = document.querySelector('#siteSearchForm');
const searchInput = document.querySelector('#site-search');
const searchResults = document.querySelector('#searchResults');

const searchableItems = [
  {
    title: 'Home',
    subtitle: 'Halaman utama dan tombol Hubungi Kami',
    target: '#home',
    keywords: 'beranda program media visual desain hero hubungi kami'
  },
  {
    title: 'Jasa Foto & Video',
    subtitle: 'Layanan fotografi dan videografi',
    target: '#services',
    keywords: 'jasa foto video fotografi videografi layanan photo shoot shooting'
  },
  {
    title: 'Jasa Desain',
    subtitle: 'Paket desain grafis dan editing',
    target: '#pricing',
    keywords: 'jasa desain design grafis editing harga paket penawaran logo'
  },
  {
    title: 'Portfolio',
    subtitle: 'Hasil project dan contoh karya',
    target: '#projects',
    keywords: 'portfolio portofolio hasil project karya lamaran wedding logo'
  },
  {
    title: 'Blog',
    subtitle: 'Informasi tentang layanan Media Visual Desain',
    target: '#about',
    keywords: 'blog about tentang informasi penjelasan media visual desain'
  },
  {
    title: 'Kontak',
    subtitle: 'Form pesan, email, dan nomor telepon',
    target: '#contact',
    keywords: 'kontak contact pesan email telepon phone username kirim get in'
  },
  {
    title: 'Fotografi',
    subtitle: 'Detail layanan foto profesional',
    target: '#services',
    keywords: 'fotografi foto prewedding lamaran produk dokumentasi'
  },
  {
    title: 'Videografi',
    subtitle: 'Detail layanan video profesional',
    target: '#services',
    keywords: 'videografi video wedding event cinematic company profile'
  },
  {
    title: 'Editing',
    subtitle: 'Layanan editing video dan konten digital',
    target: '#services',
    keywords: 'editing edit video reels youtube konten digital'
  },
  {
    title: 'Desain Grafis',
    subtitle: 'Desain logo dan materi promosi',
    target: '#services',
    keywords: 'desain design grafis logo promosi visual media sosial'
  },
  {
    title: 'Harga Fotografi',
    subtitle: 'Paket fotografi Rp. 1,5 juta',
    target: '#pricing',
    keywords: 'harga biaya paket fotografi foto rp 1,5 juta'
  },
  {
    title: 'Harga Videografi',
    subtitle: 'Paket videografi Rp. 3 juta',
    target: '#pricing',
    keywords: 'harga biaya paket videografi video rp 3 juta'
  },
  {
    title: 'Harga Editing',
    subtitle: 'Paket editing Rp. 5 juta',
    target: '#pricing',
    keywords: 'harga biaya paket editing edit video rp 5 juta'
  },
  {
    title: 'Harga Desain Grafis',
    subtitle: 'Paket desain grafis Rp. 2 juta',
    target: '#pricing',
    keywords: 'harga biaya paket desain design grafis logo rp 2 juta'
  }
];

function closeMobileMenu() {
  hamburger.classList.remove('is-active');
  mainNav.classList.remove('is-open');
  navActions.classList.remove('is-open');
  hamburger.setAttribute('aria-expanded', 'false');
}

function normalizeText(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s&]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function closeSearchResults() {
  if (!searchInput || !searchResults) {
    return;
  }

  searchResults.classList.remove('is-open');
  searchResults.innerHTML = '';
  searchInput.setAttribute('aria-expanded', 'false');
}

function getSearchMatches(query) {
  const cleanQuery = normalizeText(query);

  if (!cleanQuery) {
    return [];
  }

  const terms = cleanQuery.split(' ');

  return searchableItems
    .filter((item) => {
      const searchableText = normalizeText(`${item.title} ${item.subtitle} ${item.keywords}`);
      return terms.every((term) => searchableText.includes(term));
    })
    .slice(0, 6);
}

function renderSearchResults(query) {
  if (!searchInput || !searchResults) {
    return;
  }

  const matches = getSearchMatches(query);

  if (!normalizeText(query)) {
    closeSearchResults();
    return;
  }

  searchResults.innerHTML = '';

  if (!matches.length) {
    const emptyResult = document.createElement('div');
    emptyResult.className = 'search-result-empty';
    emptyResult.innerHTML = '<strong>Tidak ditemukan</strong><span>Coba cari: fotografi, editing, portfolio, kontak.</span>';
    searchResults.appendChild(emptyResult);
  } else {
    const fragment = document.createDocumentFragment();

    matches.forEach((item, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'search-result-item';
      button.setAttribute('role', 'option');
      button.setAttribute('data-target', item.target);
      button.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
      button.innerHTML = `<strong>${item.title}</strong><span>${item.subtitle}</span>`;
      fragment.appendChild(button);
    });

    searchResults.appendChild(fragment);
  }

  searchResults.classList.add('is-open');
  searchInput.setAttribute('aria-expanded', 'true');
}

function setActiveSearchItem(nextIndex) {
  const items = Array.from(searchResults.querySelectorAll('.search-result-item'));

  if (!items.length) {
    return;
  }

  items.forEach((item) => {
    item.classList.remove('is-active');
    item.setAttribute('aria-selected', 'false');
  });

  const safeIndex = (nextIndex + items.length) % items.length;
  items[safeIndex].classList.add('is-active');
  items[safeIndex].setAttribute('aria-selected', 'true');
  items[safeIndex].focus();
}

function goToSearchTarget(targetSelector) {
  const target = document.querySelector(targetSelector);

  if (!target || !searchInput) {
    return;
  }

  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  closeMobileMenu();
  closeSearchResults();
  searchInput.value = '';
  searchInput.blur();
}

if (searchForm && searchInput && searchResults) {
  searchInput.addEventListener('input', () => {
    renderSearchResults(searchInput.value);
  });

  searchInput.addEventListener('focus', () => {
    if (searchInput.value.trim()) {
      renderSearchResults(searchInput.value);
    }
  });

  searchInput.addEventListener('keydown', (event) => {
    const items = Array.from(searchResults.querySelectorAll('.search-result-item'));

    if (event.key === 'Escape') {
      closeSearchResults();
      searchInput.blur();
      return;
    }

    if (!items.length) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveSearchItem(0);
    }
  });

  searchResults.addEventListener('keydown', (event) => {
    const items = Array.from(searchResults.querySelectorAll('.search-result-item'));
    const activeIndex = items.findIndex((item) => item.classList.contains('is-active'));

    if (event.key === 'Escape') {
      closeSearchResults();
      searchInput.focus();
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveSearchItem(activeIndex + 1);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (activeIndex <= 0) {
        searchInput.focus();
        items.forEach((item) => item.classList.remove('is-active'));
      } else {
        setActiveSearchItem(activeIndex - 1);
      }
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      const activeItem = document.activeElement.closest('.search-result-item');
      if (activeItem) {
        goToSearchTarget(activeItem.dataset.target);
      }
    }
  });

  searchResults.addEventListener('click', (event) => {
    const selectedItem = event.target.closest('.search-result-item');

    if (selectedItem) {
      goToSearchTarget(selectedItem.dataset.target);
    }
  });

  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const matches = getSearchMatches(searchInput.value);

    if (matches.length) {
      goToSearchTarget(matches[0].target);
    } else {
      renderSearchResults(searchInput.value || ' ');
    }
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.search-wrap')) {
      closeSearchResults();
    }
  });
}

if (hamburger) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('is-active');
    mainNav.classList.toggle('is-open', isOpen);
    navActions.classList.toggle('is-open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));

    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    closeMobileMenu();
  });
});

thumbs.forEach((thumb) => {
  thumb.addEventListener('click', () => {
    // Thumbnail hanya sebagai menu visual. Background hero dibuat tetap konsisten.
    thumbs.forEach((item) => item.classList.remove('active'));
    thumb.classList.add('active');
  });
});

function setError(input, message) {
  const group = input.closest('.field-group');
  const errorText = group.querySelector('.error-message');

  group.classList.add('has-error');
  errorText.textContent = message;
}

function clearError(input) {
  const group = input.closest('.field-group');
  const errorText = group.querySelector('.error-message');

  group.classList.remove('has-error');
  errorText.textContent = '';
}

function isEmailValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = contactForm.username;
    const phone = contactForm.phone;
    const email = contactForm.email;
    let isValid = true;

    [username, phone, email].forEach(clearError);

    if (!username.value.trim()) {
      setError(username, 'Username wajib diisi.');
      isValid = false;
    }

    if (!phone.value.trim()) {
      setError(phone, 'Nomor telepon wajib diisi.');
      isValid = false;
    } else if (phone.value.replace(/\D/g, '').length < 9) {
      setError(phone, 'Nomor telepon terlalu pendek.');
      isValid = false;
    }

    if (!email.value.trim()) {
      setError(email, 'Email wajib diisi.');
      isValid = false;
    } else if (!isEmailValid(email.value.trim())) {
      setError(email, 'Format email belum valid.');
      isValid = false;
    }

    if (isValid) {
      alert('Pesan berhasil dikirim. Tim kami akan menghubungi Anda.');
      contactForm.reset();
    }
  });

  contactForm.querySelectorAll('input').forEach((input) => {
    input.addEventListener('input', () => clearError(input));
  });
}

plusButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.service-card');
    const isOpen = card.classList.toggle('is-open');

    button.classList.toggle('is-open', isOpen);
    button.setAttribute('aria-expanded', String(isOpen));
    button.textContent = isOpen ? '−' : '+';
  });
});

if (smallPlus) {
  smallPlus.addEventListener('click', () => {
    const isOpen = smallPlus.classList.toggle('is-open');
    smallPlus.textContent = isOpen ? '−' : '+';

    if (isOpen) {
      smallPlus.previousElementSibling.textContent = 'Momen penting butuh konsep, pencahayaan, sudut gambar, dan editing yang rapi agar hasilnya layak dikenang.';
    } else {
      smallPlus.previousElementSibling.textContent = 'Abadikan momen paling indah dan berkesan dalam hidup Anda.';
    }
  });
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('show'));
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 992) {
    closeMobileMenu();
  }
});
