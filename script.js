// --- KONFIGURASI ---
let input = "";
const correctCode2 = "2512";
const specialCode = "3006";
const song = document.getElementById("mySong");
const display = document.getElementById("display-text");

// --- FUNGSI PASSCODE ---
function pressKey(num) {
    if (!display) return;

    if (input.length < 4) {
        input += num;
        
        // Efek angka muncul sebentar lalu jadi titik
        let dots = "• ".repeat(input.length - 1);
        display.innerText = dots + num + " ";

        setTimeout(() => {
            display.innerText = "• ".repeat(input.length);
        }, 500);
    }

    if (input.length === 4) {
        setTimeout(() => {
            // 2512 tetap alur christmas
             if (input === correctCode2) {
                loginSuccessXmas();
            }
            // 3006 tetap alur sendiri, tidak ikut 2025
            else if (input === specialCode) {
                loginSuccessSakura();
            }
            else {
                loginError();
            }
        }, 600);
    }
}

function backspace() {
    if (!display) return;

    if (input.length > 0) {
        // Menghapus 1 karakter terakhir dari variabel input
        input = input.substring(0, input.length - 1);
        
        let display = document.getElementById("display-text");
        
        // Update tampilan titik-titik di layar
        if (input.length === 0) {
            display.innerText = "Enter Passcode";
        } else {
            display.innerText = "• ".repeat(input.length);
        }
    }
}

function loginSuccess() {
    const ps = document.getElementById("passcode-screen");
    const mm = document.getElementById("main-menu");

    modalStack = ["main-menu"];
    ps.style.opacity = "0";
    
    setTimeout(() => {
        ps.classList.add("hidden");
        mm.classList.remove("hidden");
        setTimeout(() => mm.style.opacity = "1", 50);
    }, 400);
}

let modalStack = [];

function pushModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    modalStack.push(id);
    el.classList.remove("hidden");
    requestAnimationFrame(() => {
        el.style.opacity = "1";
    });
}

function openModal(id) {
    const current = document.getElementById(id);
    if (!current) return;

    if (modalStack[modalStack.length - 1] !== id) {
        modalStack.push(id);
    }

    current.classList.remove("hidden");
    requestAnimationFrame(() => {
        current.style.opacity = "1";
    });
}

function closeTopModal() {
    const id = modalStack.pop();
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    el.style.opacity = "0";
    setTimeout(() => {
        el.classList.add("hidden");
    }, 300);
}

function closeAllModals() {
    while (modalStack.length) {
        const id = modalStack.pop();
        const el = document.getElementById(id);
        if (el) {
            el.style.opacity = "0";
            el.classList.add("hidden");
        }
    }
}

let typingTimer; // Variabel untuk mengontrol timer

function loginSuccessXmas() {
    const ps = document.getElementById("passcode-screen");
    const xm = document.getElementById("xmas-menu");
    const wrapper = document.getElementById("xmas-typewriter-wrapper");
    
    const sourceElement = document.getElementById("xmas-text-source");
    const sourceHTML = sourceElement.innerHTML; 

    modalStack = ["xmas-menu"];
    clearTimeout(typingTimer);
    wrapper.innerHTML = ""; 

    ps.style.opacity = "0";
    setTimeout(() => {
        ps.classList.add("hidden");
        xm.classList.remove("hidden");
        setTimeout(() => {
            xm.style.opacity = "1";
            typeWriterHTML(sourceHTML, wrapper);
        }, 50);
    }, 500);
}

function loginSuccessSakura() {
    const ps = document.getElementById("passcode-screen");
    const sakura = document.getElementById("sakura-menu");

    modalStack = ["sakura-menu"];
    ps.style.opacity = "0";
    setTimeout(() => {
        ps.classList.add("hidden");
        sakura.classList.remove("hidden");
        setTimeout(() => {
            sakura.style.opacity = "1";
        }, 50);
    }, 400);
}

function showSakuraPanel(panel) {
    const menu = document.getElementById("sakura-menu-panel");
    const things = document.getElementById("sakura-things-panel");
    const letter = document.getElementById("sakura-letter-panel");
    const gallery = document.getElementById("sakura-gallery-panel");
    const backBtn = document.getElementById("sakura-back-btn");

    [menu, things, letter, gallery].forEach(el => el.classList.add("hidden"));

    if (panel === "menu") {
        menu.classList.remove("hidden");
        if (backBtn) backBtn.textContent = "Back";
    } else if (panel === "things") {
        things.classList.remove("hidden");
        if (backBtn) backBtn.textContent = "Back";
    } else if (panel === "letter") {
        letter.classList.remove("hidden");
        if (backBtn) backBtn.textContent = "Back";
    } else if (panel === "gallery") {
        gallery.classList.remove("hidden");
        if (backBtn) backBtn.textContent = "Back";
    }
}

function toggleSakuraBack() {
    const sakura = document.getElementById("sakura-menu");
    if (!sakura) return;
    backToPasscode('sakura-menu');
}

function openThingsModal() {
    const modal = document.getElementById("things-modal");
    if (!modal) return;
    openModal("things-modal");
}

function closeThingsModal() {
    const modal = document.getElementById("things-modal");
    if (!modal) return;
    if (modalStack[modalStack.length - 1] === "things-modal") {
        modalStack.pop();
    }
    modal.style.opacity = "0";
    setTimeout(() => modal.classList.add("hidden"), 300);
}

function closeMessageSection() {
    const modal = document.getElementById("message-section");
    if (!modal) return;
    if (modalStack[modalStack.length - 1] === "message-section") {
        modalStack.pop();
    }
    modal.style.opacity = "0";
    setTimeout(() => modal.classList.add("hidden"), 300);
}

function closeGallerySection() {
    const modal = document.getElementById("gallery-section");
    if (!modal) return;
    if (modalStack[modalStack.length - 1] === "gallery-section") {
        modalStack.pop();
    }
    modal.style.opacity = "0";
    setTimeout(() => modal.classList.add("hidden"), 300);
}

function openSecretMessage() {
    const modal = document.getElementById("secret-message-modal");
    if (!modal) return;
    const envelope = document.querySelector("#secret-message-modal .secret-envelope");
    if (envelope) {
        envelope.classList.remove("open");
        envelope.classList.remove("letter-out");
    }
    openModal("secret-message-modal");
}

function closeSecretMessage() {
    const modal = document.getElementById("secret-message-modal");
    if (!modal) return;
    const envelope = document.querySelector("#secret-message-modal .secret-envelope");
    if (envelope) {
        envelope.classList.remove("open");
        envelope.classList.remove("letter-out");
    }
    if (modalStack[modalStack.length - 1] === "secret-message-modal") {
        modalStack.pop();
    }
    modal.style.opacity = "0";
    setTimeout(() => modal.classList.add("hidden"), 300);
}

function toggleSecretEnvelope(event) {
    if (event) event.stopPropagation();
    const envelope = document.querySelector("#secret-message-modal .secret-envelope");
    if (!envelope) return;

    if (envelope.classList.contains("open")) {
        envelope.classList.remove("open");
        envelope.classList.remove("letter-out");
    } else {
        envelope.classList.add("open");
        envelope.classList.remove("letter-out");
    }
}

function toggleLetterReveal(event) {
    if (event) event.stopPropagation();
    const envelope = document.querySelector("#secret-message-modal .secret-envelope");
    if (!envelope || !envelope.classList.contains("open")) return;
    envelope.classList.toggle("letter-out");
}

function typeWriterHTML(html, element) {
    let i = 0;
    element.innerHTML = ""; 
    let cleanText = html.replace(/&lt;br&gt;/g, "\n").replace(/<br>/g, "\n").trim();

    function typing() {
        if (i < cleanText.length) {
            let char = cleanText.charAt(i);
            if (char === "\n") {
                element.innerHTML += "<br>";
            } else {
                element.innerHTML += char;
            }

            // Real-time Bold formatting
            let currentContent = element.innerHTML;
            if (currentContent.includes("*")) {
                element.innerHTML = currentContent.replace(/\*(.*?)\*/g, "<b>$1</b>");
            }

            i++;
            const modalContent = element.parentElement;
            modalContent.scrollTop = modalContent.scrollHeight;
            typingTimer = setTimeout(typing, 30); 
        } else {
            // --- MUNCULKAN TEKS SETELAH SELESAI KETIK ---
            const linkDiv = document.createElement("div");
            linkDiv.className = "fade-in-text";
            linkDiv.innerHTML = `
                <span onclick="openXmasGallery()" style="color: #4b7f52ff; font-weight: bold; cursor: pointer; text-decoration: none; font-size: 0.9rem;">
                    let's see our Christmas photo, click me!
                </span>
            `;
            element.appendChild(linkDiv);
            const modalContent = element.parentElement;
            modalContent.scrollTop = modalContent.scrollHeight;
        }
    }
    typing();
}

// Fungsi kontrol Galeri Natal
function openXmasGallery() {
    document.getElementById("xmas-gallery-modal").classList.add("show-pop");
}

function closeXmasGallery() {
    const modal = document.getElementById("xmas-gallery-modal");
    
    // Tambah class animasi keluar
    modal.classList.add("out-pop");
    
    // Tunggu animasi selesai (300ms) baru hilangkan modalnya
    setTimeout(() => {
        modal.classList.remove("show-pop");
        modal.classList.remove("out-pop");
    }, 300);
}

const fotoArray = [
    "20251210_145019.jpg", 
    "20251210_161636.jpg", 
    "20251210_161653.jpg", 
    "20251210_161658.jpg",
    "20251210_161718.jpg",
    "20251210_161724.jpg",
    "20251210_161751.jpg",
    "20251210_161757.jpg",
    "20251210_162252.jpg",
    "20251210_163245.jpg",
    "20251210_163302.jpg",
    "20251210_164339.jpg",
    "20251210_195431.jpg",
    "20251210_195435.jpg",
    "20251210_195439.jpg",
    "20251210_195528.jpg",
    "20251210_195533.jpg",
];

let currentIdx = 0;

// Fungsi Khusus Galeri Natal (Infinite Loop)
function openXmasBig(src) {
    const grid = document.getElementById("xmas-grid");
    const container = document.getElementById("xmas-photo-view-container");
    const bigImg = document.getElementById("xmas-big-img");

    // Cari urutan foto
    let fileName = src.split('/').pop();
    currentIdx = fotoArray.indexOf(fileName);

    bigImg.src = src;
    grid.style.display = "none"; // Sembunyikan grid
    container.style.display = "block"; // Munculkan foto besar
}

function nextXmasImg() {
    currentIdx = (currentIdx >= fotoArray.length - 1) ? 0 : currentIdx + 1;
    document.getElementById("xmas-big-img").src = fotoArray[currentIdx];
}

function prevXmasImg() {
    currentIdx = (currentIdx <= 0) ? fotoArray.length - 1 : currentIdx - 1;
    document.getElementById("xmas-big-img").src = fotoArray[currentIdx];
}

function backToGrid() {
    const grid = document.getElementById("xmas-grid");
    const container = document.getElementById("xmas-photo-view-container");

    // Sembunyikan foto besar, tampilkan kembali grid foto kecil
    container.style.display = "none";
    grid.style.display = "grid";
}

// Tambahkan ini di dalam closeXmasGallery agar saat dibuka lagi balik ke grid
function closeXmasGallery(e) {
    if (e && e.target !== e.currentTarget && e.target.tagName !== 'BUTTON') return;
    
    const modal = document.getElementById("xmas-gallery-modal");
    modal.classList.add("out-pop");
    
    setTimeout(() => {
        modal.classList.remove("show-pop");
        modal.classList.remove("out-pop");
        // Reset tampilan ke grid
        document.getElementById("xmas-grid").style.display = "grid";
        document.getElementById("xmas-photo-view-container").style.display = "none";
    }, 300);
}

// Fungsi Back yang mereset segalanya
function backToPasscode(currentMenuId) {
    clearTimeout(typingTimer); // Matikan animasi ngetik
    const current = document.getElementById(currentMenuId);
    const ps = document.getElementById("passcode-screen");

    current.style.opacity = "0";
    setTimeout(() => {
        current.classList.add("hidden");
        ps.classList.remove("hidden");
        setTimeout(() => ps.style.opacity = "1", 50);
        input = ""; // Reset input passcode
        document.getElementById("display-text").innerText = "Enter Passcode"; 
    }, 500);
}

function loginError() {
    const display = document.getElementById("display-text");
    display.innerText = "WRONG";
    display.style.color = "#ff5252"; // Beri warna merah saat salah

    setTimeout(() => {
        display.style.color = "#607d8b"; // Kembalikan warna semula
        clearPass();
    }, 1000);
}

function clearPass() {
    input = "";
    document.getElementById("display-text").innerText = "Enter Passcode";
}

// --- FUNGSI NAVIGASI & MENU ---

function showSection(hideId, showId) {
    const hideEl = document.getElementById(hideId);
    const showEl = document.getElementById(showId);
    
    hideEl.style.opacity = "0";
    setTimeout(() => {
        hideEl.classList.add("hidden");
        showEl.classList.remove("hidden");
        setTimeout(() => showEl.style.opacity = "1", 50);
    }, 400);
}

function logout() {
    const mm = document.getElementById("main-menu");
    const ps = document.getElementById("passcode-screen");

    closeAllModals();
    mm.style.opacity = "0";
    setTimeout(() => {
        mm.classList.add("hidden");
        clearPass();
        ps.classList.remove("hidden");
        setTimeout(() => ps.style.opacity = "1", 50);
    }, 400);
}

// --- FUNGSI MUSIK ---

function toggleMusic() {
    const btn = document.getElementById("playBtn");
    if (!song || !btn) return;

    if (song.paused) {
        song.play().catch(() => {
            btn.innerText = "▶";
        });
        btn.innerText = "II";
    } else {
        song.pause();
        btn.innerText = "▶";
    }
}

// --- FUNGSI GALLERY ---

let currentImgIndex = 0;
let allImages = [];

function viewImg(src) {
    const viewer = document.getElementById("img-viewer");
    const fullImg = document.getElementById("full-img");
    
    // 1. Ambil semua list gambar yang ada di gallery-grid
    const imgElements = document.querySelectorAll(".gallery-grid img");
    allImages = Array.from(imgElements).map(img => img.src);
    
    // 2. Cari index gambar yang sedang diklik
    currentImgIndex = allImages.indexOf(src);
    
    // 3. Tampilkan gambar
    fullImg.src = src;
    viewer.classList.remove("hidden");
    viewer.classList.add("active"); // Sesuai dengan CSS baru
    setTimeout(() => viewer.style.opacity = "1", 50);
}

// Fungsi untuk menutup gambar
function closeImg() {
    const viewer = document.getElementById("img-viewer");
    viewer.style.opacity = "0";
    setTimeout(() => {
        viewer.classList.add("hidden");
        viewer.classList.remove("active");
    }, 400);
}

// Fungsi untuk geser gambar (Next & Prev)
function changeImg(step) {
    currentImgIndex += step;
    
    // Kalau sudah di gambar terakhir, balik ke awal
    if (currentImgIndex >= allImages.length) {
        currentImgIndex = 0;
    }
    // Kalau di gambar pertama klik back, pergi ke gambar terakhir
    if (currentImgIndex < 0) {
        currentImgIndex = allImages.length - 1;
    }
    
    // Ganti src gambar dengan yang baru
    document.getElementById("full-img").src = allImages[currentImgIndex];
}

// Tambahan: Supaya bisa tutup modal kalau klik area kosong
document.getElementById("img-viewer").addEventListener("click", function(e) {
    if (e.target === this) {
        closeImg();
    }
});

function createSakuraEffect() {
    const canvas = document.getElementById('fireworks-canvas');
    if (!canvas || !canvas.getContext) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const petals = [];

    class Petal {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * -canvas.height;
            this.size = Math.random() * 10 + 6;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 1.5 + 0.8;
            this.rotation = Math.random() * Math.PI;
            this.rotationSpeed = Math.random() * 0.03 - 0.015;
            this.opacity = Math.random() * 0.6 + 0.4;
            this.color = Math.random() > 0.5
                ? 'rgba(255, 192, 203, ' + this.opacity + ')'
                : 'rgba(255, 230, 240, ' + this.opacity + ')';
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.beginPath();
            ctx.ellipse(0, 0, this.size * 0.6, this.size * 0.45, 0, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.rotation += this.rotationSpeed;

            if (this.y > canvas.height + this.size) {
                this.y = -this.size;
                this.x = Math.random() * canvas.width;
            }

            if (this.x < -this.size * 3) this.x = canvas.width + this.size * 3;
            if (this.x > canvas.width + this.size * 3) this.x = -this.size * 3;
        }
    }

    function spawnPetals() {
        const count = Math.floor(window.innerWidth / 18);
        for (let i = 0; i < count; i++) {
            petals.push(new Petal());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        petals.forEach(petal => {
            petal.update();
            petal.draw();
        });
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    spawnPetals();
    animate();
}

createSakuraEffect();
