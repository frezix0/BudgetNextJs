# 💰 BudgetApp

Aplikasi manajemen anggaran pribadi yang **sederhana dan modern**, dibangun menggunakan **Next.js** dan **PostgreSQL**.  
BudgetApp membantu Anda mencatat pengeluaran, mengelola anggaran, dan memantau keuangan dengan mudah dalam satu tempat.

---

## 🚀 Fitur Utama

- 🔐 **Autentikasi Pengguna**  
  Pendaftaran dan login aman menggunakan **NextAuth.js (Credentials Provider)**.

- 📊 **Manajemen Anggaran (Budget)**  
  Fungsionalitas **CRUD (Create, Read, Update, Delete)** untuk mengelola pos-pos anggaran Anda.

- 💸 **Manajemen Pengeluaran (Expense)**  
  Catat dan kelola setiap transaksi yang terhubung ke pos anggaran tertentu.

- ⚡ **Ringkasan Cepat**  
  Menampilkan **sisa anggaran dan total anggaran** dalam format Rupiah (IDR).

- 📅 **Penyortiran Pengeluaran**  
  Urutkan daftar pengeluaran berdasarkan **tanggal, nama, atau jumlah**.

- 🌙 **Mode Gelap/Terang**  
  Tema yang dapat diganti untuk pengalaman pengguna yang nyaman di berbagai kondisi cahaya.

- 🔔 **Notifikasi Instan**  
  Sistem notifikasi menggunakan **Zustand** untuk umpan balik aksi pengguna secara real-time.

---

## 🧩 Tumpukan Teknologi (Tech Stack)

| Kategori | Teknologi |
|-----------|------------|
| **Frontend Framework** | Next.js 14 (App Router) |
| **Bahasa Pemrograman** | TypeScript |
| **Database** | PostgreSQL |
| **ORM** | Prisma |
| **Autentikasi** | NextAuth.js |
| **Manajemen Data Asinkron** | TanStack Query |
| **Manajemen State Lokal** | Zustand |
| **Styling** | Tailwind CSS |
| **Ikon** | Lucide React |

---

## ⚙️ Memulai Proyek

Ikuti langkah-langkah berikut untuk menjalankan proyek **BudgetApp** secara lokal.

### 📦 Prasyarat

Pastikan Anda telah menginstal:
- [Node.js](https://nodejs.org/) (versi sesuai dengan `package.json`)
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)

---

### 🧠 1. Instalasi

Clone repositori dan instal dependensi:

```bash
git clone https://github.com/frezix0/budgetnextjs/BudgetNextJs-main.git
cd BudgetNextJs-main
npm install
# atau
yarn install
# atau
pnpm install
```

### 🧩 2. Konfigurasi Lingkungan

Buat file .env.local di root proyek dan tambahkan variabel lingkungan berikut:

```bash
Ganti dengan string koneksi database PostgreSQL Anda
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

Ganti dengan secret acak yang kuat (misalnya hasil dari: openssl rand -base64 32)
NEXTAUTH_SECRET="YOUR_NEXTAUTH_SECRET"
```

### 🗄️ 3. Setup Database

Jalankan migrasi Prisma dan seeding data awal:

```bash
Terapkan skema database
npx prisma migrate dev --name init

Isi database dengan data demo (opsional)
npm run prisma:seed
```

Data demo mencakup satu akun pengguna:

Email: demo@budgetapp.com
Password: password123

### 🖥️ 4. Menjalankan Aplikasi

Jalankan server pengembangan:

```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
```

Aplikasi akan berjalan di:
👉 http://localhost:3000
