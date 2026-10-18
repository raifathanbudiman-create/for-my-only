/* =========================================================
   1. KONFIGURASI UTAMA (UBAH ISI DI SINI)
   ========================================================= */
const CONFIG = {
    partnerName: "ica",               // Nama panggilan pacarmu
    senderName: "rai",    // Namamu
    anniversaryDate: "19-10-2026",  // Tanggal jadian / momen spesial
    
    // Isi surat rahasia (bisa gunakan \n untuk baris baru)
    secretLetter: `Halo sayangku, sangat aku syukuri bisa kembali ada dipelukanmu lagi. Segala lara kita di masa itu sudah jadi tawa dan canda hari ini. Aku mau selalu menjadi lebih baik buat kita. Aku bakal terus belajar, seperti yang aku bilang kalau aku punya kesempatan lagi aku bakal gunkan kesempatan itu sebaik mungkin sayang. Kamu tau? ternyata mudah untuk buat diri aku happy, yaitu cukup melihat kamu happy aja. Senyuman kamu selalu bisa buat hati aku tenang, mata kamu selalu buat aku hilang arah, cantik dan lucunya kamu selalu buat aku bersyukur. Terimakasih sayangku sudah kasih aku kesempatan buat jadi lebih baik, Aku sayang kamu kemarin, sayang kamu hari ini, dan sayang kamu selamanya.`,

    // Kartu Alasan Mencintai di Halaman 2 (Bisa ditambah / dikurangi)
    reasons: [
        { title: "Perfect for me", text: "Kamu lengkapi kurang aku, kamu tambal lubang aku, kamu obati luka aku" },
        { title: "Too good to be true", text: "Masih belum bisa percaya kalo dihidup aku muncul bidadari" },
        { title: "Gonna be a good mother", text: "Baiknya sifat kamu membuat aku yakin kamu adalah orang yang tepat" },
        { title: "A God's blessing", text: "Selalu aku syukuri setiap detik bersama kamu, selalu kamu yang aku harapkan" }
    ]
};

/* =========================================================
   2. LOGIKA FLIPBOOK / NAVIGASI HALAMAN
   ========================================================= */
let currentPage = 1;
const totalPages = 5;

// Fungsi Membalik Halaman (Lanjut / Sebelum)
function turnPage(direction) {
    playWebAudioBg(); // Jalankan musik lembut saat navigasi diklik

    const newPage = currentPage + direction;

    // Pastikan tidak melompat keluar dari rentang 1 s.d 5
    if (newPage < 1 || newPage > totalPages) return;

    // Sembunyikan halaman lama
    const oldPageEl = document.querySelector(`.page[data-page="${currentPage}"]`);
    if (oldPageEl) {
        oldPageEl.classList.remove('active');
    }

    // Tampilkan halaman baru
    currentPage = newPage;
    const newPageEl = document.querySelector(`.page[data-page="${currentPage}"]`);
    if (newPageEl) {
        newPageEl.classList.add('active');
    }

    // Update Angka Indikator Halaman
    const pageNumEl = document.getElementById('current-page-num');
    if (pageNumEl) {
        pageNumEl.textContent = currentPage;
    }

    // Atur Status Tombol (Disabled jika di awal / akhir)
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (prevBtn) prevBtn.disabled = (currentPage === 1);
    if (nextBtn) nextBtn.disabled = (currentPage === totalPages);
}

/* =========================================================
   3. LOGIKA AMPLOP SURAT RAHASIA
   ========================================================= */
function toggleEnvelope() {
    playWebAudioBg();
    const letterEl = document.getElementById('letter-content');
    const envContainer = document.querySelector('.letter-paper');
    
    if (envContainer) {
        if (envContainer.style.display === 'block') {
            envContainer.style.display = 'none';
        } else {
            envContainer.style.display = 'block';
            envContainer.style.animation = 'fadeIn 0.5s ease';
        }
    }
}

/* =========================================================
   4. LIGHTBOX MEMBESARKAN FOTO POLAROID
   ========================================================= */
function openLightbox(imgEl) {
    // Cek apakah modal lightbox sudah ada, jika belum buatkan otomatis
    let modal = document.getElementById('dynamic-lightbox');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'dynamic-lightbox';
        modal.style.cssText = `
            position: fixed;
            top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0,0,0,0.85);
            display: flex; flex-direction: column;
            justify-content: center; align-items: center;
            z-index: 1000; cursor: pointer; padding: 20px;
        `;
        
        modal.innerHTML = `
            <img id="lightbox-img" style="max-width: 90%; max-height: 75vh; border-radius: 8px; box-shadow: 0 5px 20px rgba(255,255,255,0.2);">
            <p id="lightbox-caption" style="color: #fff; margin-top: 15px; font-size: 1.1rem; font-style: italic; text-align: center;"></p>
            <small style="color: #aaa; margin-top: 10px;">(Klik di mana saja untuk menutup)</small>
        `;
        
        modal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        document.body.appendChild(modal);
    }

    const modalImg = document.getElementById('lightbox-img');
    const modalCap = document.getElementById('lightbox-caption');
    const parentCard = imgEl.closest('.polaroid-card');
    const captionText = parentCard ? parentCard.querySelector('.caption').textContent : '';

    modalImg.src = imgEl.src;
    modalCap.textContent = captionText;
    modal.style.display = 'flex';
}

/* =========================================================
   5. EFEK RAIN / PARTICLES (KELOPAK BUNGA & HATI)
   ========================================================= */
function createHearts() {
    const container = document.getElementById('hearts-container');
    if (!container) return;

    const icons = ['🌸', '✨', '💖', '🌹', '💌'];

    setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'heart-particle';
        particle.textContent = icons[Math.floor(Math.random() * icons.length)];
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
        particle.style.fontSize = (Math.random() * 10 + 14) + 'px';
        particle.style.opacity = Math.random() * 0.7 + 0.3;

        container.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 7000);
    }, 500);
}

/* =========================================================
   6. MUSIK LATAR BELAKANG (DANIEL CAESAR - ALWAYS)
   ========================================================= */
function playWebAudioBg() {
    const bgAudio = document.getElementById('bg-music');
    if (bgAudio && bgAudio.paused) {
        bgAudio.volume = 0.5; // Atur volume (0.0 sampai 1.0)
        bgAudio.play().catch(error => {
            console.log("Autoplay ditahan browser sampai pengguna mengklik layar.");
        });
    }
}

/* =========================================================
   7. INISIALISASI SAAT HALAMAN DIMUAT (LOAD)
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
    // Set Nama & Tanggal Spesial
    document.querySelectorAll('.recipient-name').forEach(el => el.textContent = CONFIG.partnerName);
    document.querySelectorAll('.sender-name').forEach(el => el.textContent = CONFIG.senderName);

    const annivEl = document.getElementById('anniv-date');
    if (annivEl) annivEl.textContent = CONFIG.anniversaryDate;

    // Set Isi Surat Rahasia
    const letterEl = document.getElementById('letter-content');
    if (letterEl) {
        letterEl.innerHTML = CONFIG.secretLetter.replace(/\n/g, '<br>');
    }

    // Render Kartu Alasan Mencintai
    const grid = document.getElementById('reasons-grid');
    if (grid && CONFIG.reasons) {
        grid.innerHTML = '';
        CONFIG.reasons.forEach((r, idx) => {
            const card = document.createElement('div');
            card.className = 'flip-card';
            card.innerHTML = `
                <strong style="color: var(--accent-color); display:block; margin-bottom:5px;">#${idx + 1} ${r.title}</strong>
                <p style="font-size:0.9rem; color:#555;">${r.text}</p>
            `;
            grid.appendChild(card);
        });
    }

    // Sembunyikan amplop secara default
    const envContainer = document.querySelector('.letter-paper');
    if (envContainer) {
        envContainer.style.display = 'none';
    }

    // Jalankan Efek Bunga Gugur
    createHearts();

    // Set status tombol navigasi awal
    turnPage(0);
});