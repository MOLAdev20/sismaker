# 🚀 Project Setup & Running Guide

README ini ditujukan untuk siapa pun yang **clone / download project ini dari Git**, supaya bisa jalan **lokal** maupun **production** tanpa drama.

---

## 🧱 Tech Stack

### Backend

- Node.js (Express)
- MySQL / MariaDB
- Prisma ORM
- JWT Auth

### Frontend

- React
- Vite
- React Router

### Infra (Production)

- VPS (Ubuntu)
- Nginx (reverse proxy)
- SSL (Let’s Encrypt / Certbot)
- Vercel (Frontend)

---

## 📂 Struktur Project

Project ini menggunakan **monorepo** dengan dua folder utama:

- `client` → Frontend (React + Vite)
- `server` → Backend (Express + Prisma + MySQL)

Struktur internal masing-masing folder tidak dibahas di README ini agar fokus ke **cara install & menjalankan project**.

---

## ⚙️ Prerequisites

Pastikan sudah terinstall:

- Node.js >= 18
- npm / pnpm / yarn
- MySQL / MariaDB
- Git

Cek versi:

```bash
node -v
npm -v
mysql --version
```

---

## 🔧 Server (Backend) Setup

### 1️⃣ Masuk ke folder server

```bash
cd server
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup environment variable

Buat file `.env`:

```env
DATABASE_URL="mysql://usr:pass@localhost:3306/db_name"
DATABASE_HOST="localhost"
DATABASE_PORT=3306
DATABASE_USER="usr"
DATABASE_PASSWORD="pass"
DATABASE_NAME="db_name"
PORT = 8080

JWT_SECRET="haiakusoreistrikamudarimasadepan"
```

> ⚠️ Pastikan database MySQL / MariaDB sudah dibuat

---

### 4️⃣ Prisma migrate

```bash
npx prisma migrate dev
```

atau (production):

```bash
npx prisma migrate deploy
```

---

### 5️⃣ Jalankan seed data

```bash
npx prisma db seed
```

---

## 🎨 Client (Frontend) Setup

### 1️⃣ Masuk ke folder client

```bash
cd client
```

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Setup environment variable

Buat file `.env`:

```env
VITE_API_URL=http://localhost:8080
```

Untuk production:

```env
VITE_API_URL=https://api-your-domain.com
```

---

## ▶️ Menjalankan Project (Recommended)

Project ini menggunakan **concurrently** di root project, jadi **tidak perlu menjalankan client dan server secara terpisah**.

### 1️⃣ Install dependencies root

```bash
npm install
```

### 2️⃣ Jalankan client + server sekaligus

```bash
npm run dev
```

Yang akan terjadi:

- Server jalan di `http://localhost:8080`
- Client jalan di `http://localhost:5173`

---

## 📌 Author

Built By Sabiilul Hikam

---
