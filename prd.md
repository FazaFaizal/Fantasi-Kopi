# Product Requirements Document (PRD)

## Project

**Manguna Coffee Mobile POS**

Version: 1.0  
Date: 2026-08-02  
Platform: Android (React Native + Expo)

---

# 1. Overview

Manguna Coffee Mobile POS adalah aplikasi mobile berbasis React Native yang digunakan untuk membantu operasional kasir dan manajemen produk di Manguna Coffee.

Aplikasi ditujukan untuk:

- Kasir
- Admin
- Pemilik usaha
- Pelanggan

## Current Progress

Status per 2026-08-02:

- Project sudah menggunakan Expo SDK 54 dengan Expo Router.
- NativeWind sudah dikonfigurasi untuk Expo/Metro melalui `babel.config.js`, `metro.config.js`, `tailwind.config.js`, `global.css`, dan `nativewind-env.d.ts`.
- Main tabs sudah tersedia: Dashboard, POS, Produk, dan Profil.
- Route bawaan `explore` masih ada, tetapi sudah disembunyikan dari tab bar.
- Dashboard awal sudah memakai data dummy untuk ringkasan penjualan dan pesanan terbaru.
- Halaman POS sudah dibuat dengan data dummy dan interaksi lokal.
- Halaman Produk dan Profil masih berupa placeholder.
- Belum ada integrasi API, autentikasi, database lokal, printer, atau persistence transaksi.

## Verified Checks

- `npx tsc --noEmit`: pass
- `npm run lint`: pass
- `npx expo install --check`: dependencies up to date
- `npx expo export --platform web`: pass

---

# 2. Goals

## Business Goals

- Mempercepat proses transaksi
- Mengurangi kesalahan input pesanan
- Mempermudah manajemen produk
- Menyediakan pencatatan transaksi digital

## User Goals

- Login dengan cepat
- Menemukan produk dengan mudah
- Melakukan checkout dengan cepat
- Mengelola produk dari perangkat mobile

---

# 3. Tech Stack

| Layer     | Technology   |
| --------- | ------------ |
| Frontend  | React Native |
| Framework | Expo SDK 54  |
| Routing   | Expo Router  |
| Styling   | NativeWind   |

---

# 4. Architecture

## Folder Structure

```text
app/
features/
components/
services/
store/
utils/
constants/
assets/
```

## Pattern

- Hybrid Feature-Based Architecture
- Shared UI Components
- Feature Isolation
- Route-driven Navigation

---

# 5. User Roles

## Admin

- Login
- Lihat dashboard
- Kelola produk
- Lihat transaksi

## Cashier

- Login
- Gunakan POS
- Checkout transaksi

## Customer

- Order
- Isi data pelanggan, dengan cache local device
- Checkout transaksi

---

# 6. Features

## 6.1 Authentication

### User Story

Sebagai pengguna, saya ingin login agar dapat mengakses aplikasi.

### Functional Requirements

- Input email/username
- Input password
- Show/hide password
- Validasi form
- Simpan session login
- Logout

### Success Criteria

- Login berhasil &lt; 3 detik
- Session tetap aktif setelah aplikasi dibuka kembali

---

## 6.2 Dashboard

### User Story

Sebagai admin, saya ingin melihat ringkasan operasional.

### Functional Requirements

- Total penjualan hari ini
- Jumlah transaksi hari ini
- Jumlah produk
- Shortcut ke POS
- Shortcut ke produk

---

## 6.3 Product Management

### User Story

Sebagai admin, saya ingin mengelola produk.

### Functional Requirements

#### List Produk

- Tampilkan semua produk
- Search produk
- Pull to refresh

#### Tambah Produk

- Nama produk
- Harga
- Kategori
- Foto produk
- Status aktif

#### Edit Produk

- Ubah data produk
- Simpan perubahan

#### Hapus Produk

- Konfirmasi penghapusan
- Soft delete (recommended)

### Validation

- Nama wajib
- Harga &gt; 0

---

## 6.4 POS

### User Story

Sebagai kasir, saya ingin melakukan transaksi dengan cepat.

### Current Dummy Implementation

Halaman POS saat ini sudah tersedia sebagai prototipe lokal dengan data dummy.

Fitur yang sudah ada:

- Header order dummy: `Order #MGN-2408 - Meja 03`
- Identitas kasir dummy: `Bayu`
- Search produk berdasarkan nama atau kode produk
- Filter kategori: Semua, Kopi, Non Kopi, Makanan, Dessert
- Daftar produk dummy dengan nama, kategori, kode, stok, dan harga
- Tambah produk ke keranjang
- Kurangi quantity produk dari keranjang
- Hapus item otomatis ketika quantity menjadi 0
- Ringkasan keranjang
- Perhitungan subtotal, service fee, pajak 10%, dan total bayar
- Tombol bayar yang menampilkan alert transaksi dummy

Data dummy yang digunakan:

- Es Kopi Susu
- Americano
- Cappuccino
- Matcha Latte
- Lemon Tea
- Croissant
- Chicken Toast
- Brownies

Limitasi saat ini:

- Keranjang masih disimpan di state lokal screen.
- Checkout belum menyimpan transaksi.
- Belum ada input uang diterima dan hitung kembalian.
- Belum ada diskon, voucher, metode pembayaran, atau split bill.
- Belum ada integrasi stok asli dari backend.

### Functional Requirements

#### Cari Produk

- Search realtime

#### Tambah ke Keranjang

- Tap produk untuk menambah

#### Keranjang

- Ubah qty
- Hapus item
- Lihat subtotal

#### Checkout

- Total bayar
- Input uang diterima
- Hitung kembalian
- Simpan transaksi

### Next POS Requirements

- Tambah pilihan tipe order: dine-in, takeaway, delivery
- Input nomor meja atau nama pelanggan
- Input uang diterima
- Hitung kembalian otomatis
- Pilih metode pembayaran: cash, QRIS, debit
- Clear cart setelah checkout sukses
- Simpan transaksi ke API `POST /api/orders`
- Tampilkan loading, success, dan error state checkout
- Validasi stok saat item ditambahkan

### Success Criteria

- Tambah produk &lt; 200 ms
- Checkout &lt; 5 detik

---

# 7. Navigation

## Auth Flow

```text
Login
  ↓
Dashboard
```

## Main Tabs

```text
Dashboard
POS
Produk
Profil
```

## Product Flow

```text
Produk
  ├── Tambah Produk
  └── Edit Produk
```

---

# 8. UI / UX Guidelines

## Theme

### Primary

`#D1001F`

### Secondary

`#F59E0B`

### Background

`#FFF7F5`

### Surface

`#FFFFFF`

### Text

`#1F2937`

---

## Radius

- Card: 24px
- Button: 16px
- Input: 16px

---

## Typography

- Heading: Poppins
- Body: Inter

---

# 9. Shared Components

## AppButton

Variants:

- primary
- secondary
- danger

## AppInput

- label
- error
- secureTextEntry

## AppCard

- rounded
- shadow
- padding

## AppHeader

- title
- back button
- action button

---

# 10. API Endpoints

## Auth

```http
POST /api/login
POST /api/logout
GET  /api/me
```

## Products

```http
GET    /api/products
POST   /api/products
GET    /api/products/{id}
PUT    /api/products/{id}
DELETE /api/products/{id}
```

## POS

```http
POST /api/orders
GET  /api/orders
```

---

# 11. Data Models

## Product

```json
{
  "id": 1,
  "name": "Cappuccino",
  "price": 25000,
  "category": "Coffee",
  "image": "https://...",
  "is_active": true
}
```

## Cart Item

```json
{
  "product_id": 1,
  "name": "Cappuccino",
  "price": 25000,
  "qty": 2,
  "subtotal": 50000
}
```

## Order

```json
{
  "id": 1,
  "total": 50000,
  "cash_received": 100000,
  "change": 50000,
  "items": []
}
```

---

# 12. State Management

## Global Store

- theme
- app loading
- network status

## Auth Store

- user
- token
- isAuthenticated

## Cart Store

- items
- addItem
- removeItem
- updateQty
- clearCart

---

# 13. Security

- HTTPS only
- Token authentication
- Secure token storage
- Auto logout on unauthorized

---

# 14. Performance Requirements

| Requirement       | Target     |
| ----------------- | ---------- |
| App startup       | &lt; 3s    |
| Screen transition | &lt; 300ms |
| Product search    | &lt; 200ms |
| Checkout          | &lt; 5s    |

---

# 15. Offline Handling

Phase 1:

- No full offline support
- Show network status
- Retry failed requests

---

# 16. Error Handling

- Toast for success
- Toast for error
- Empty state
- Loading state
- Retry button

---

# 17. Analytics (Optional)

- Login count
- Total transactions
- Most sold products

---

# 18. Future Scope

## Phase 2

- Printer thermal
- QR ordering
- Customer management
- Discount & voucher
- Sales report

## Phase 3

- Inventory
- Multi-branch
- Employee attendance
- Expense tracking

---

# 19. Development Milestones

## Milestone 1 - Foundation

- [x] Expo setup
- [x] NativeWind setup
- [x] Routing
- [x] Theme
- [x] Shared components awal

## Milestone 2 - Authentication

- [ ] Login
- [ ] Session
- [ ] Logout

## Milestone 3 - Product Management

- [ ] List
- [ ] Create
- [ ] Edit
- [ ] Delete

## Milestone 4 - POS

- [x] Dummy product list
- [x] Search
- [x] Category filter
- [x] Cart quantity controls
- [x] Dummy payment summary
- [ ] Cash received input
- [ ] Change calculation
- [ ] API checkout

## Milestone 5 - Polishing

- [ ] Loading
- [ ] Error handling
- [x] Empty cart state
- [ ] Performance

---

# 20. Acceptance Criteria

## Login

- User dapat login dengan kredensial valid

## Product

- CRUD produk berfungsi

## POS

- Produk dapat ditambahkan ke keranjang
- Total dihitung otomatis
- Transaksi tersimpan

## UX

- Tidak ada crash pada alur utama
- Tampilan konsisten dengan tema Manguna Coffee

---

# 21. Recommended Initial Structure

```text
app/
features/
  auth/
  product/
  pos/
components/
  ui/
services/
store/
utils/
constants/
assets/
```

---

# 22. Conclusion

Dokumen ini menjadi acuan pengembangan aplikasi Manguna Coffee Mobile POS menggunakan React Native, Expo, NativeWind, dan arsitektur Hybrid Feature-Based agar aplikasi mudah dikembangkan, konsisten, dan scalable untuk kebutuhan operasional cafe.
