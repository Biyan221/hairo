const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const toast = $('#toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

// Mobile navigation
const menuToggle = $('#menuToggle');
const mainNav = $('#mainNav');
menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  mainNav.classList.toggle('open', !isOpen);
  document.body.classList.toggle('no-scroll', !isOpen && window.innerWidth <= 820);
});
$$('.nav-link, .mobile-nav-actions a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('no-scroll');
}));

// Search controls: front-end demonstration only.
const dateInput = $('#dateInput');
const today = new Date();
dateInput.min = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
$('#searchButton').addEventListener('click', () => {
  const location = $('#locationInput').value.trim();
  const service = $('#serviceSelect').value;
  const date = dateInput.value;
  const params = [];
  if (location) params.push(`lokasi ${location}`);
  if (service) params.push(`layanan ${service}`);
  if (date) params.push(`tanggal ${new Date(`${date}T00:00:00`).toLocaleDateString('id-ID', {day:'numeric',month:'long',year:'numeric'})}`);
  showToast(params.length ? `Pilihan pencarian: ${params.join(' · ')}. Ini masih demo UI.` : 'Pilih lokasi, layanan, atau tanggal untuk memulai pencarian.');
  $('#explore').scrollIntoView({ behavior: 'smooth', block: 'start' });
  if (service) filterSalonCards(service);
});

function filterSalonCards(term) {
  const normalized = term.toLowerCase();
  let count = 0;
  $$('.salon-card').forEach(card => {
    const searchable = `${card.dataset.name} ${card.dataset.category} ${card.dataset.service} ${card.dataset.location}`.toLowerCase();
    const show = !term || searchable.includes(normalized) || normalized === 'haircut' && searchable.includes('haircut');
    card.hidden = !show;
    if (show) count++;
  });
  if (!count) showToast(`Belum ada contoh bisnis untuk "${term}". Coba layanan lain.`);
}
$$('[data-service]').forEach(button => button.addEventListener('click', () => {
  const service = button.dataset.service;
  $('#serviceSelect').value = ['Haircut','Hair Coloring','Hair Treatment','Hair Styling','Nail & Beauty'].includes(service) ? service : '';
  $$('.service-chip').forEach(chip => chip.classList.toggle('selected', chip === button));
  filterSalonCards(service === 'Barbershop' ? 'Barbershop' : service === 'Salon Pria' ? 'Salon' : service === 'Salon Wanita' ? 'Salon' : service);
  $('#explore').scrollIntoView({ behavior: 'smooth', block: 'start' });
}));

// Favorites are intentionally in-memory only, not persisted.
$$('.favorite-btn').forEach(button => button.addEventListener('click', () => {
  const saved = button.getAttribute('aria-pressed') !== 'true';
  button.setAttribute('aria-pressed', String(saved));
  button.textContent = saved ? '♥' : '♡';
  const name = button.closest('.salon-card').dataset.name;
  showToast(saved ? `${name} ditambahkan ke favorit demo.` : `${name} dihapus dari favorit demo.`);
}));


// Business detail dialog
const detailModal = $('#detailModal');

function openBusinessDetail(card) {
  if (!card || !detailModal) return;

  const img = $('.salon-photo img', card);
  const title = $('h3', card)?.textContent.trim() || card.dataset.name || 'Nama salon';
  const category = $('.salon-tag', card)?.textContent.trim() || card.dataset.category || 'Salon';
  const location = $('.salon-location', card)?.textContent.trim() || card.dataset.location || '';
  const rating = $('.rating', card)?.textContent.trim() || '';
  const price = $('.salon-bottom strong', card)?.textContent.trim() || 'Hubungi salon';

  const modalImage = $('#modalImage');
  if (modalImage && img) {
    modalImage.src = img.currentSrc || img.src;
    modalImage.alt = img.alt || `Foto ${title}`;
  }

  $('#modalTitle').textContent = title;
  $('#modalTag').textContent = category.toUpperCase();
  $('#modalLocation').textContent = location;
  $('#modalRating').textContent = rating;
  $('#modalService').textContent = (card.dataset.service || 'Haircut Hair Styling').split(/\s+/).join(', ');
  $('#modalPrice').textContent = price;

  detailModal.showModal();
}

$$('.detail-btn').forEach(button => {
  button.addEventListener('click', () => {
    openBusinessDetail(button.closest('.salon-card'));
  });
});

$$('.salon-photo > img').forEach(img => {
  img.addEventListener('click', () => {
    openBusinessDetail(img.closest('.salon-card'));
  });
});

$('#modalClose').addEventListener('click', () => detailModal.close());

detailModal.addEventListener('click', event => {
  if (event.target === detailModal) detailModal.close();
});

$('#modalBook').addEventListener('click', () => {
  detailModal.close();
  showToast('Alur booking lengkap akan dibuat pada tahap halaman berikutnya.');
  $('#search').scrollIntoView({ behavior: 'smooth', block: 'center' });
});


function scrollSalons(direction) {
  const grid = $('#salonGrid');
  const card = $('.salon-card', grid);
  if (!card) return;
  const amount = card.getBoundingClientRect().width + 18;
  grid.scrollBy({ left: amount * direction, behavior: 'smooth' });
}
$('#prevSalon').addEventListener('click', () => scrollSalons(-1));
$('#nextSalon').addEventListener('click', () => scrollSalons(1));


const reviews = [
  {quote:'Akhirnya bisa bandingin beberapa salon sebelum booking. Nggak perlu chat satu-satu cuma buat tanya harga dan jadwal.', name:'Nadia Putri', meta:'Customer HAiro · Jakarta', avatar:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'},
  {quote:'Aku suka karena pilihan salon dan barber-nya beragam. Bisa cari sesuai style, bukan sekadar yang paling dekat.', name:'Raka Pratama', meta:'Customer HAiro · Bandung', avatar:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80'},
  {quote:'Tampilan harga dan layanan dari awal bikin proses pilih salon terasa lebih praktis. Simple dan nggak ribet.', name:'Alya Maharani', meta:'Customer HAiro · Yogyakarta', avatar:'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=120&q=80'}
];
let reviewIndex = 0;
function changeReview(direction) {
  reviewIndex = (reviewIndex + direction + reviews.length) % reviews.length;
  const review = reviews[reviewIndex];
  $('#reviewQuote').textContent = review.quote;
  $('#reviewName').textContent = review.name;
  $('#reviewMeta').textContent = review.meta;
  $('#reviewAvatar').src = review.avatar;
}
$('#prevReview').addEventListener('click', () => changeReview(-1));
$('#nextReview').addEventListener('click', () => changeReview(1));


$('#newsletterForm').addEventListener('submit', event => {
  event.preventDefault();
  const email = $('#newsletterEmail').value.trim();
  $('#newsletterFeedback').textContent = `Terima kasih! ${email} sudah masuk di demo newsletter.`;
  $('#newsletterEmail').value = '';
});


const partnerModal = $('#partnerModal');
$$('a[href="#partner-form"]').forEach(link => link.addEventListener('click', event => {
  event.preventDefault();
  partnerModal.showModal();
}));
$('#partnerModalClose').addEventListener('click', () => partnerModal.close());
partnerModal.addEventListener('click', event => { if (event.target === partnerModal) partnerModal.close(); });
$('#partnerForm').addEventListener('submit', event => {
  event.preventDefault();
  $('#partnerFeedback').textContent = 'Terima kasih! Formulir demo berhasil divalidasi. Data belum dikirim ke server.';
  showToast('Formulir minat mitra demo berhasil divalidasi.');
  $('#partnerForm').reset();
});


window.addEventListener('resize', () => {
  if (window.innerWidth > 820) {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  }
});
