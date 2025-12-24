// --- KONFIGURASI ---
let input = "";
const correctCode = "2025"; 
const correctCode2 = "2512";
const song = document.getElementById("mySong");

// --- FUNGSI PASSCODE ---
function pressKey(num) {
    if (input.length < 4) {
        input += num;
        let display = document.getElementById("display-text");
        
        // Efek angka muncul sebentar lalu jadi titik
        let dots = "• ".repeat(input.length - 1);
        display.innerText = dots + num + " ";

        setTimeout(() => {
            display.innerText = "• ".repeat(input.length);
        }, 500);
    }

    if (input.length === 4) {
        setTimeout(() => {
            if (input === correctCode) {
                loginSuccess(); // Untuk "2025 with u"
            } else if (input === "2512") { // Ganti manual atau pakai variabel correctCode2
                loginSuccessXmas(); 
            } else {
                loginError();
            }
        }, 600);
    }
}

function backspace() {
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

    // Efek transisi keluar (Fade Out)
    ps.style.opacity = "0";
    
    setTimeout(() => {
        ps.classList.add("hidden");
        mm.classList.remove("hidden");
        // Efek transisi masuk (Fade In)
        setTimeout(() => mm.style.opacity = "1", 50);
    }, 400);
}

let typingTimer; // Variabel untuk mengontrol timer

function loginSuccessXmas() {
    const ps = document.getElementById("passcode-screen");
    const xm = document.getElementById("xmas-menu");
    const wrapper = document.getElementById("xmas-typewriter-wrapper");
    
    // Gunakan .innerHTML tanpa .trim() terlebih dahulu untuk tes
    const sourceElement = document.getElementById("xmas-text-source");
    const sourceHTML = sourceElement.innerHTML; 

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

function typeWriterHTML(html, element) {
    let i = 0;
    element.innerHTML = ""; 
    
    // Bersihkan teks dari br atau baris baru
    let cleanText = html.replace(/&lt;br&gt;/g, "\n").replace(/<br>/g, "\n").trim();

    function typing() {
        if (i < cleanText.length) {
            let char = cleanText.charAt(i);
            
            if (char === "\n") {
                element.innerHTML += "<br>";
            } else {
                element.innerHTML += char;
            }

            // Real-time Bold (*teks*)
            let currentContent = element.innerHTML;
            if (currentContent.includes("*")) {
                element.innerHTML = currentContent.replace(/\*(.*?)\*/g, "<b>$1</b>");
            }

            i++;
            
            // Auto scroll ke bawah
            const modalContent = element.parentElement;
            modalContent.scrollTop = modalContent.scrollHeight;
            
            typingTimer = setTimeout(typing, 30); 
        } else {
            // --- INI BAGIAN YANG MEMUNCULKAN TEKS SETELAH SELESAI ---
            // Membuat div baru agar tidak mengganggu teks typewriter
            const triggerDiv = document.createElement("div");
            triggerDiv.style.textAlign = "center";
            triggerDiv.style.marginTop = "20px";
            triggerDiv.style.opacity = "0";
            triggerDiv.style.transition = "opacity 1s ease";
            
            triggerDiv.innerHTML = `
                <p style="font-size: 0.85rem; color: #888;">
                    <span onclick="openXmasGallery()" style="color: #ffb7ce; cursor: pointer; text-decoration: underline; font-weight: bold;">
                        let's see our Christmas photo here
                    </span>
                </p>
            `;
            
            element.appendChild(triggerDiv);
            
            // Munculkan dengan efek halus
            setTimeout(() => {
                triggerDiv.style.opacity = "1";
            }, 100);
        }
    }
    typing();
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
    if (song.paused) {
        song.play();
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

function createSnow() {
    const container = document.getElementById('snow-container');
    const snowflakeCount = 50; // Jumlah butiran salju

    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        
        // Ukuran acak antara 2px - 5px
        const size = Math.random() * 3 + 2 + 'px';
        snowflake.style.width = size;
        snowflake.style.height = size;
        
        // Posisi horizontal acak
        snowflake.style.left = Math.random() * 100 + 'vw';
        
        // Kecepatan jatuh acak antara 3s - 8s
        const duration = Math.random() * 3 + 8 + 's';
        snowflake.style.animationDuration = duration;
        
        // Delay acak agar tidak jatuh barengan
        snowflake.style.animationDelay = Math.random() * 5 + 's';
        
        // Efek blur halus
        snowflake.style.filter = `blur(${Math.random() * 1}px)`;

        container.appendChild(snowflake);
    }
}

// Panggil fungsi saat web dibuka

createSnow();




