# Akar Nusantara - E-commerce Produk Budaya Indonesia (Prototipe Frontend)

Ini adalah prototipe frontend untuk sebuah website e-commerce sederhana yang berfokus pada penjualan produk-produk budaya Indonesia, seperti makanan khas, kerajinan tangan, dan pakaian tradisional. Proyek ini dibangun untuk mendemonstrasikan alur pengguna dasar dalam sebuah aplikasi e-commerce.

## Fitur Utama
* **Halaman Beranda (Homepage):**
    * Menampilkan kategori populer.
    * Menampilkan produk "Big Deals" dengan countdown timer.
    * Navbar dengan navigasi kategori, pencarian (UI), favorit, keranjang, dan profil (UI).
    * Footer dengan informasi dan navigasi.
* **Halaman Kategori Produk:**
    * Menampilkan produk berdasarkan kategori utama (misalnya, Makanan, Seni, Pakaian).
    * Produk dikelompokkan berdasarkan wilayah/pulau.
    * Fitur "Lihat Lebih Banyak / Lebih Sedikit" untuk setiap kelompok wilayah.
* **Halaman Detail Produk:**
    * Menampilkan informasi lengkap produk: gambar, nama, lokasi penjual, harga (termasuk diskon), deskripsi, dan nilai gizi (khusus makanan).
    * Tombol "Tambah ke Keranjang".
    * Tombol/Ikon "Tambah ke Favorit".
    * Input jumlah produk.
* **Halaman Favorit:**
    * Menampilkan daftar produk yang telah ditandai sebagai favorit oleh pengguna.
    * Kemampuan untuk menghapus produk dari daftar favorit.
    * Data favorit disimpan menggunakan `localStorage`.
* **Simulasi Keranjang Belanja:**
    * Tombol "Tambah ke Keranjang" akan menambahkan item ke `localStorage` (dasar).
    * Jumlah item di keranjang pada navbar akan terupdate (berdasarkan `localStorage`).
    * (Halaman keranjang belanja `cart.html` telah direncanakan, fungsionalitasnya akan membaca dari `localStorage`).

## Teknologi yang Digunakan

* HTML5
* CSS3 (dengan beberapa gaya kustom di `css/style.css`)
* JavaScript (ES6+)
* Vue.js (versi 2.x, digunakan melalui CDN)
* Bootstrap 5 (untuk layout dan komponen UI)
* Bootstrap Icons (untuk ikon)
* Data Produk: Disimpan dalam file `data/products.json` dan dimuat menggunakan `Workspace` API.
* Penyimpanan Lokal: `localStorage` digunakan untuk simulasi fitur keranjang belanja dan item favorit.

## Cara Menjalankan Proyek

1.  **Prasyarat:**
    * Web browser modern (Chrome, Firefox, Edge, Safari).
2.  **Unduh atau Clone Proyek:**
    * Pastikan semua file dan folder proyek (`index.html`, `css/`, `js/`, `assets/`, `data/`, dll.) berada dalam satu folder utama (misalnya, `Lokalin`).

