# TodoNe! Application

TodoNe! adalah aplikasi manajemen tugas yang memungkinkan pengguna untuk menambahkan, mengedit, dan mengelola daftar tugas dengan prioritas berbeda.

## Struktur Project

Proyek ini terdiri dari dua bagian utama:

```
/todone
  /frontend    # React/Next.js aplikasi frontend
  /backend     # Express.js REST API backend
```

## Persyaratan

- Node.js (v16.x atau lebih tinggi)
- npm atau yarn
- Git

## Cara Setup

### Penting: Keamanan File .env

⚠️ **Catatan Penting**: File `.env` seharusnya ditambahkan ke dalam `.gitignore` untuk mencegah informasi sensitif seperti kredensial database atau API keys terpublish ke repository publik. Pastikan untuk menambahkan file berikut ke dalam `.gitignore` Anda:

```
# .gitignore
.env
.env.local
.env.development
.env.production
```

Jika file `.env` Anda sudah terlanjur ter-commit, ikuti langkah berikut:
1. Tambahkan file ke `.gitignore`
2. Hapus file dari tracking Git dengan `git rm --cached .env`
3. Commit perubahan: `git commit -m "Remove .env from tracking"`

### Langkah 1: Clone Repository

```bash
# Clone repository
git clone https://github.com/fauzanridho/todone.git

# Pindah ke direktori project
cd todone
```

### Langkah 2: Setup Frontend

```bash
# Masuk ke direktori frontend
cd frontend

# Install dependencies
npm install
# atau
yarn install

# Copy file .env.example menjadi .env.local
cp .env.example .env.local

# Edit file .env.local untuk mengatur API endpoint
# NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

### Langkah 3: Setup Backend

```bash
# Masuk ke direktori backend
cd ../backend

# Install dependencies
npm install
# atau
yarn install

# Copy file .env.example menjadi .env
cp .env.example .env

# Edit file .env sesuai kebutuhan
# PORT=5001
# DATABASE_URL=your_database_connection_string
```

## Cara Menjalankan Aplikasi

### Menjalankan Backend

```bash
# Masuk ke direktori backend (jika belum)
cd backend

# Jalankan server dalam mode development
npm run dev
# atau
yarn dev
```

Backend akan berjalan pada `http://localhost:5001` secara default.

### Menjalankan Frontend

```bash
# Masuk ke direktori frontend (jika belum)
cd frontend

# Jalankan server dalam mode development
npm run dev
# atau
yarn dev
```

Frontend akan berjalan pada `http://localhost:3000` secara default.

## Fitur Aplikasi

- Manajemen tugas (tambah, edit, hapus)
- Prioritas tugas (Rendah, Sedang, Tinggi)
- Status penyelesaian tugas
- Deskripsi tugas
- Tampilan yang responsif

## Teknologi yang Digunakan

### Frontend
- Next.js
- React
- Redux (Redux Toolkit)
- Tailwind CSS

### Backend
- Express.js
- MongoDB/PostgreSQL/MySQL (sesuaikan dengan database yang digunakan)
- Mongoose/Sequelize/Prisma (sesuaikan dengan ORM yang digunakan)

## Struktur Database

Aplikasi menggunakan model Todo dengan struktur:

```
Todo {
  id: string
  title: string
  description: string (optional)
  priority: 'low' | 'medium' | 'high'
  completed: boolean
  createdAt: Date
  updatedAt: Date
}
```

## API Endpoints

- `GET /api/todos` - Mendapatkan semua todo
- `POST /api/todos` - Membuat todo baru
- `GET /api/todos/:id` - Mendapatkan detail todo berdasarkan ID
- `PUT /api/todos/:id` - Mengupdate todo berdasarkan ID
- `DELETE /api/todos/:id` - Menghapus todo berdasarkan ID

## Kontribusi

Jika ingin berkontribusi pada project ini, silakan ikuti langkah-langkah berikut:

1. Fork repository
2. Buat branch fitur baru (`git checkout -b feature/amazing-feature`)
3. Commit perubahan (`git commit -m 'Add some amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request

## Lisensi

Distributed under the MIT License. Lihat `LICENSE` file untuk informasi lebih lanjut.

## Kontak

Fauzan Ridho - [GitHub](https://github.com/fauzanridho)

Link Project: [https://github.com/fauzanridho/todone](https://github.com/fauzanridho/todone)