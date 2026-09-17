# Product Requirements Document (PRD)

## Fantasi Coffee Mobile POS

**Version:** 2.0\
**Platform:** Android\
**Frontend:** React Native + Expo\
**Routing:** Expo Router\
**Styling:** NativeWind

---

# 1. Project Overview

## 1.1 Product Description

Fantasi Coffee Mobile POS adalah aplikasi mobile berbasis Android yang dirancang untuk membantu operasional Fantasi Coffee dalam mengelola transaksi penjualan, menu, kategori, inventory, karyawan, serta pemesanan oleh pengguna.

Aplikasi memiliki tiga role utama:

- **Admin**
- **Kasir**
- **Pengguna**

Sistem dikembangkan secara bertahap melalui empat iterasi agar setiap bagian utama dapat dikembangkan, diuji, dan dievaluasi secara terstruktur.

---

# 2. Product Goals

## 2.1 Business Goals

Aplikasi bertujuan untuk:

- Mempercepat proses transaksi penjualan.
- Mengurangi kesalahan dalam pencatatan pesanan.
- Mempermudah pengelolaan menu dan kategori.
- Membantu pengelolaan inventory.
- Mendigitalisasi pencatatan transaksi.
- Menyediakan laporan keuangan harian.
- Menyediakan kanal pemesanan bagi pengguna.
- Menyediakan dashboard untuk membantu Admin memantau kondisi operasional.

## 2.2 User Goals

Pengguna aplikasi diharapkan dapat:

- Login dengan mudah.
- Mengakses fitur sesuai role.
- Mengelola data sesuai hak akses.
- Melakukan transaksi dengan cepat.
- Melihat dan memilih menu dengan mudah.
- Melakukan checkout dan pembayaran.
- Melihat status pesanan.

---

# 3. User Roles

## 3.1 Admin

Admin merupakan role yang memiliki akses terhadap fungsi manajemen dan informasi keseluruhan sistem.

### Hak akses

- Login dan logout.
- Melihat dashboard.
- Mengelola karyawan.
- Mengelola user.
- Mengelola role.
- Mengelola kategori.
- Mengelola menu.
- Mengelola inventory.
- Melihat transaksi.
- Melihat laporan penjualan.
- Melihat laporan pemasukan.
- Melihat laporan pengeluaran.
- Melihat laporan keuangan harian.

### Dashboard Admin

Dashboard hanya dapat diakses oleh Admin.

Dashboard menampilkan ringkasan:

- Penjualan hari ini.
- Jumlah transaksi hari ini.
- Total pemasukan.
- Total pengeluaran.
- Ringkasan keuangan.
- Produk/menu terlaris.
- Kondisi inventory.
- Transaksi terbaru.

---

## 3.2 Kasir

Kasir berfokus pada operasional transaksi penjualan.

### Hak akses

- Login dan logout.
- Mengakses POS.
- Mencari menu.
- Memilih kategori menu.
- Menambahkan menu ke keranjang.
- Mengubah jumlah item.
- Menghapus item.
- Memilih tipe order.
- Memilih metode pembayaran.
- Memproses pembayaran.
- Menyelesaikan transaksi.
- Melihat transaksi yang diproses.

Kasir tidak memiliki akses terhadap:

- Manajemen karyawan.
- Manajemen user.
- Manajemen menu.
- Manajemen kategori.
- Manajemen inventory.
- Dashboard Admin.
- Pengaturan sistem.

---

## 3.3 Pengguna

Pengguna merupakan customer yang menggunakan aplikasi untuk melakukan pemesanan.

### Hak akses

- Melihat menu.
- Melihat kategori menu.
- Melihat detail menu.
- Menambahkan menu ke keranjang.
- Mengubah jumlah item.
- Menghapus item.
- Melakukan checkout.
- Melakukan pembayaran.
- Melihat status pesanan.

Pengguna tidak memiliki akses terhadap fitur manajemen internal.

---

# 4. Scope & Iteration

Pengembangan aplikasi dibagi menjadi empat iterasi.

## Iterasi 1 — Authentication & Employee Management

Fokus:

- Login.
- Logout.
- Session management.
- Manajemen karyawan.
- Manajemen user.
- Role management.

## Iterasi 2 — Menu & Inventory Management

Fokus:

- Manajemen kategori.
- Manajemen menu.
- Manajemen inventory.

## Iterasi 3 — POS & Financial Report

Fokus:

- POS.
- Transaksi.
- Pembayaran.
- Riwayat transaksi.
- Laporan penjualan.
- Laporan pemasukan.
- Laporan pengeluaran.
- Laporan keuangan harian.

## Iterasi 4 — Customer Ordering & Admin Dashboard

Fokus:

- Menu customer.
- Keranjang customer.
- Checkout.
- Pembayaran customer.
- Status pesanan.
- Dashboard Admin.

---

# 5. Functional Requirements

# 5.1 Authentication

## User Story

Sebagai pengguna aplikasi, saya ingin login menggunakan akun saya agar dapat mengakses fitur berdasarkan role.

## Requirements

- Login menggunakan email dan password.
- Validasi email.
- Validasi password.
- Show/hide password.
- Menampilkan pesan ketika kredensial tidak valid.
- Menyimpan session setelah login berhasil.
- Mengarahkan pengguna ke halaman sesuai role.
- Logout.
- Session berakhir ketika logout.

## Role Redirect

```text
Admin
  ↓
Admin Dashboard

Kasir
  ↓
POS

Pengguna
  ↓
Customer Menu
```

---

# 5.2 Manajemen Karyawan

**Role:** Admin

Admin dapat mengelola data karyawan.

## List Karyawan

Menampilkan:

- Nama.
- Email.
- Role.
- Status akun.

Fitur:

- Search.
- Filter.
- Refresh.

## Tambah Karyawan

Data minimal:

- Nama.
- Email.
- Password/account credential.
- Role.
- Status.

## Edit Karyawan

Admin dapat mengubah:

- Nama.
- Email.
- Role.
- Status.

## Hapus Karyawan

Admin dapat menghapus atau menonaktifkan akun karyawan.

Penghapusan data sebaiknya mempertimbangkan kebutuhan histori transaksi.

---

# 5.3 Manajemen User

**Role:** Admin

Manajemen user digunakan untuk mengatur akun yang dapat mengakses sistem.

Data user minimal:

```text
id
name
email
password
role
status
created_at
updated_at
```

Role:

```text
admin
kasir
pengguna
```

Admin dapat:

- Melihat user.
- Menambahkan user.
- Mengubah user.
- Mengubah role.
- Mengaktifkan/nonaktifkan user.

---

# 5.4 Manajemen Kategori

**Role:** Admin

Admin dapat mengelola kategori menu.

## Data kategori

```text
id
name
description
status
created_at
updated_at
```

Fitur:

- Menampilkan kategori.
- Menambahkan kategori.
- Mengubah kategori.
- Menghapus kategori.
- Mengaktifkan/nonaktifkan kategori.

---

# 5.5 Manajemen Menu

**Role:** Admin

Admin dapat mengelola seluruh menu yang tersedia.

## Data menu

Minimal:

```text
id
category_id
name
description
price
image
status
created_at
updated_at
```

## Fitur

### List Menu

- Menampilkan menu.
- Search menu.
- Filter berdasarkan kategori.
- Filter berdasarkan status.
- Refresh.

### Tambah Menu

Admin dapat memasukkan:

- Nama menu.
- Deskripsi.
- Harga.
- Kategori.
- Foto.
- Status aktif.

### Edit Menu

Admin dapat mengubah informasi menu.

### Hapus Menu

Admin dapat menghapus atau menonaktifkan menu.

Soft delete direkomendasikan untuk menjaga histori transaksi.

---

# 5.6 Manajemen Inventory

**Role:** Admin

Inventory digunakan untuk mencatat dan memantau persediaan bahan atau item yang digunakan dalam operasional.

## Data Inventory

Minimal:

```text
id
name
unit
stock
minimum_stock
created_at
updated_at
```

## Fitur

- Melihat inventory.
- Menambahkan item inventory.
- Mengubah data inventory.
- Menghapus item inventory.
- Menambah stok.
- Mengurangi stok.
- Melakukan stock adjustment.
- Menampilkan stok minimum.
- Memberikan indikator ketika stok berada di bawah batas minimum.

## Stock Status

```text
Normal
Low Stock
Out of Stock
```

## Integrasi dengan Penjualan

Ketika transaksi berhasil, inventory dapat diperbarui berdasarkan item yang terjual.

Implementasi pengurangan bahan berdasarkan resep menu dapat dikembangkan sebagai bagian dari mekanisme inventory.

---

# 5.7 POS

**Role:** Kasir

POS merupakan fitur utama untuk transaksi penjualan oleh Kasir.

## Product Selection

Kasir dapat:

- Melihat daftar menu.
- Mencari menu.
- Memfilter kategori.
- Memilih menu.

## Cart

Kasir dapat:

- Menambahkan menu.
- Menambah quantity.
- Mengurangi quantity.
- Menghapus item.
- Melihat subtotal.
- Melihat total transaksi.

## Order Type

POS mendukung:

```text
Dine-in
Takeaway
Delivery
```

Untuk dine-in dapat tersedia informasi meja.

## Customer Information

Jika diperlukan, Kasir dapat memasukkan:

- Nama customer.
- Nomor meja.
- Informasi order lainnya.

## Payment

Metode pembayaran:

- Cash.
- QRIS.
- Debit.

Untuk pembayaran cash:

```text
Total
↓
Uang diterima
↓
Kembalian
```

Sistem menghitung kembalian secara otomatis.

## Checkout

Setelah pembayaran berhasil:

- Transaksi disimpan.
- Status transaksi diperbarui.
- Keranjang dikosongkan.
- Stok diperbarui.
- Sistem menampilkan konfirmasi transaksi.

---

# 5.8 Transaction Management

**Role:** Admin dan Kasir\*\*

Sistem menyimpan seluruh transaksi yang telah dibuat.

## Data transaksi

Minimal:

```text
id
order_number
user_id
order_type
subtotal
tax
service_fee
total
payment_method
payment_status
order_status
created_at
updated_at
```

## Transaction Item

```text
id
transaction_id
product_id
quantity
price
subtotal
```

## Status

Payment:

```text
Pending
Paid
Failed
```

Order:

```text
Pending
Processing
Ready
Completed
Cancelled
```

---

# 5.9 Laporan Keuangan Harian

**Role:** Admin

Admin dapat melihat laporan berdasarkan periode.

## Laporan Penjualan

Menampilkan:

- Jumlah transaksi.
- Total penjualan.
- Produk terjual.
- Produk paling banyak terjual.

## Laporan Pemasukan

Menampilkan pemasukan yang tercatat pada periode tertentu.

## Laporan Pengeluaran

Admin dapat mencatat pengeluaran operasional.

Data minimal:

```text
id
description
amount
category
date
created_by
created_at
updated_at
```

Contoh kategori:

- Bahan baku.
- Operasional.
- Peralatan.
- Lainnya.

## Laporan Harian

Menampilkan ringkasan:

```text
Penjualan
+ Pemasukan
- Pengeluaran
----------------
Ringkasan Keuangan
```

Laporan dapat difilter berdasarkan tanggal.

---

# 5.10 Customer Menu

**Role:** Pengguna

Pengguna dapat melihat menu yang tersedia untuk dipesan.

## Requirements

- Menampilkan kategori.
- Menampilkan daftar menu.
- Search menu.
- Filter kategori.
- Menampilkan foto menu.
- Menampilkan nama menu.
- Menampilkan harga.
- Menampilkan status ketersediaan.

Menu yang tidak aktif tidak ditampilkan sebagai menu yang dapat dipesan.

---

# 5.11 Customer Cart

**Role:** Pengguna

Pengguna dapat memasukkan menu ke keranjang.

## Requirements

- Add item.
- Increase quantity.
- Decrease quantity.
- Remove item.
- Menampilkan subtotal.
- Menampilkan total.

State keranjang harus tetap konsisten selama pengguna berada dalam proses pemesanan.

---

# 5.12 Customer Checkout

**Role:** Pengguna

Pengguna dapat melakukan checkout terhadap item yang berada di keranjang.

## Checkout Flow

```text
Menu
 ↓
Product
 ↓
Add to Cart
 ↓
Cart
 ↓
Checkout
 ↓
Payment
 ↓
Order Confirmation
 ↓
Order Status
```

## Checkout Information

Minimal:

- Item pesanan.
- Quantity.
- Total.
- Tipe order.
- Informasi customer.
- Metode pembayaran.

## Payment

Metode pembayaran dapat meliputi:

- QRIS.
- Cash, jika mekanisme pemesanan memungkinkan pembayaran di kasir.

Integrasi payment gateway dapat ditambahkan sesuai kebutuhan implementasi.

---

# 5.13 Order Status

**Role:** Pengguna

Pengguna dapat melihat perkembangan pesanan.

Status:

```text
Pending
   ↓
Processing
   ↓
Ready
   ↓
Completed
```

Jika transaksi dibatalkan:

```text
Cancelled
```

---

# 5.14 Admin Dashboard

**Role:** Admin only

Dashboard merupakan halaman utama Admin untuk memantau kondisi operasional.

## Summary

- Penjualan hari ini.
- Jumlah transaksi.
- Total pemasukan.
- Total pengeluaran.
- Ringkasan keuangan.

## Operational Information

- Produk/menu terlaris.
- Inventory dengan stok rendah.
- Transaksi terbaru.

## Dashboard Flow

```text
Admin Login
    ↓
Dashboard
    ├── Sales Summary
    ├── Financial Summary
    ├── Best Selling Products
    ├── Inventory Alert
    └── Recent Transactions
```

---

# 6. Navigation

## 6.1 Authentication Flow

```text
Splash / Initial Check
        ↓
   Authentication
        ↓
      Login
        ↓
   Role Detection
        │
   ┌────┼────┐
   │    │    │
 Admin Kasir Pengguna
   │    │    │
   ↓    ↓    ↓
Dashboard POS  Menu
```

## 6.2 Admin Navigation

```text
Dashboard
Karyawan
Menu
Kategori
Inventory
Transaksi
Laporan
Profil
```

## 6.3 Kasir Navigation

```text
POS
Transaksi
Profil
```

## 6.4 Pengguna Navigation

```text
Menu
Keranjang
Pesanan
Profil
```

---

# 7. User Flow

## 7.1 Admin

```text
Login
 ↓
Dashboard
 ├── Karyawan
 ├── Menu
 ├── Kategori
 ├── Inventory
 ├── Transaksi
 ├── Laporan
 └── Profil
```

## 7.2 Kasir

```text
Login
 ↓
POS
 ↓
Pilih Menu
 ↓
Keranjang
 ↓
Checkout
 ↓
Payment
 ↓
Transaksi Berhasil
```

## 7.3 Pengguna

```text
Login / Access
 ↓
Menu
 ↓
Pilih Produk
 ↓
Keranjang
 ↓
Checkout
 ↓
Payment
 ↓
Order Confirmation
 ↓
Order Status
```

---

# 8. Technical Architecture

## 8.1 Technology Stack

| Layer          | Technology                 |
| -------------- | -------------------------- |
| Mobile         | React Native               |
| Framework      | Expo                       |
| Routing        | Expo Router                |
| Styling        | NativeWind                 |
| Architecture   | Hybrid Feature-Based       |
| Backend        | API                        |
| Database       | Relational Database        |
| Authentication | Token-based authentication |

---

# 9. Application Architecture

Aplikasi menggunakan **Hybrid Feature-Based Architecture** dengan pemisahan fitur berdasarkan domain.

```text
app/
features/
├── auth/
├── dashboard/
├── employee/
├── user/
├── category/
├── product/
├── inventory/
├── pos/
├── transaction/
├── report/
└── customer/

components/
├── ui/
├── form/
└── common/

services/
├── api/
├── auth/
└── storage/

store/

utils/

constants/

assets/
```

## Prinsip

- Feature isolation.
- Shared UI components.
- Centralized styling.
- Centralized API service.
- Role-based navigation.
- Separation antara UI, business logic, dan API communication.

---

# 10. State Management

Global state minimal mencakup:

## Auth State

```text
user
token
role
isAuthenticated
```

## Cart State

```text
items
subtotal
total
addItem()
removeItem()
updateQty()
clearCart()
```

## Application State

```text
theme
networkStatus
loading
```

State management dapat menggunakan library yang sesuai dengan kebutuhan implementasi.

---

# 11. API Requirements

## Authentication

```http
POST /api/login
POST /api/logout
GET  /api/me
```

## Users

```http
GET    /api/users
POST   /api/users
GET    /api/users/{id}
PUT    /api/users/{id}
DELETE /api/users/{id}
```

## Categories

```http
GET    /api/categories
POST   /api/categories
GET    /api/categories/{id}
PUT    /api/categories/{id}
DELETE /api/categories/{id}
```

## Products

```http
GET    /api/products
POST   /api/products
GET    /api/products/{id}
PUT    /api/products/{id}
DELETE /api/products/{id}
```

## Inventory

```http
GET  /api/inventory
POST /api/inventory
PUT  /api/inventory/{id}
POST /api/inventory/{id}/stock-in
POST /api/inventory/{id}/stock-out
```

## Orders

```http
GET  /api/orders
POST /api/orders
GET  /api/orders/{id}
PUT  /api/orders/{id}
```

## Reports

```http
GET /api/reports/sales
GET /api/reports/income
GET /api/reports/expenses
GET /api/reports/daily
```

## Dashboard

```http
GET /api/dashboard
```

Dashboard endpoint hanya dapat digunakan oleh Admin.

---

# 12. Data Model

## User

```text
users
├── id
├── name
├── email
├── password
├── role
├── status
├── created_at
└── updated_at
```

## Category

```text
categories
├── id
├── name
├── description
├── status
├── created_at
└── updated_at
```

## Product

```text
products
├── id
├── category_id
├── name
├── description
├── price
├── image
├── status
├── created_at
└── updated_at
```

## Inventory

```text
inventory
├── id
├── name
├── unit
├── stock
├── minimum_stock
├── created_at
└── updated_at
```

## Order

```text
orders
├── id
├── order_number
├── user_id
├── order_type
├── subtotal
├── tax
├── service_fee
├── total
├── payment_method
├── payment_status
├── order_status
├── created_at
└── updated_at
```

## Order Item

```text
order_items
├── id
├── order_id
├── product_id
├── quantity
├── price
└── subtotal
```

## Expense

```text
expenses
├── id
├── description
├── category
├── amount
├── date
├── created_by
├── created_at
└── updated_at
```

---

# 13. UI/UX Requirements

## Design Principles

Aplikasi harus:

- Mudah digunakan.
- Konsisten antar halaman.
- Memiliki hierarchy informasi yang jelas.
- Meminimalkan jumlah langkah dalam transaksi.
- Memberikan feedback terhadap setiap aksi pengguna.
- Memiliki loading, empty, success, dan error state.

## Theme

### Primary

```text
#D1001F
```

### Secondary

```text
#F59E0B
```

### Background

```text
#FFF7F5
```

### Surface

```text
#FFFFFF
```

### Text

```text
#1F2937
```

## Typography

- Heading: Poppins.
- Body: Inter.

## Border Radius

```text
Card: 24px
Button: 16px
Input: 16px
```

---

# 14. Shared Components

Komponen UI digunakan kembali untuk menjaga konsistensi.

## AppButton

Variants:

```text
primary
secondary
danger
```

## AppInput

Properties:

```text
label
placeholder
error
secureTextEntry
```

## AppCard

Properties:

```text
rounded
shadow
padding
```

## AppHeader

Properties:

```text
title
back button
action button
```

Komponen tambahan dapat dibuat ketika terdapat kebutuhan yang digunakan oleh beberapa feature.

---

# 15. Security

Aplikasi harus menerapkan:

- HTTPS.
- Token-based authentication.
- Secure token storage.
- Role-based authorization.
- Validasi input.
- Server-side authorization.
- Auto logout ketika session/token tidak valid.

Role harus divalidasi pada backend, bukan hanya disembunyikan pada frontend.

---

# 16. Error Handling

Aplikasi harus memiliki state untuk:

## Loading

Menampilkan indikator ketika data sedang diproses.

## Empty State

Menampilkan informasi ketika belum terdapat data.

## Error State

Menampilkan pesan ketika request gagal.

## Retry

Pengguna dapat mencoba kembali request yang gagal.

## Success Feedback

Operasi yang berhasil memberikan feedback kepada pengguna.

---

# 17. Offline Handling

Pada tahap awal, aplikasi tidak menyediakan full offline support.

Aplikasi minimal:

- Menampilkan status koneksi.
- Menampilkan error ketika tidak terdapat koneksi.
- Menyediakan retry request.
- Tidak menganggap transaksi berhasil sebelum server memberikan konfirmasi.

---

# 18. Performance Requirements

| Requirement       |    Target |
| ----------------- | --------: |
| App startup       | < 3 detik |
| Screen transition |  < 300 ms |
| Product search    |  < 200 ms |
| Checkout          | < 5 detik |

Target dapat dievaluasi kembali berdasarkan kondisi perangkat dan koneksi jaringan.

---

# 19. Testing

Testing dilakukan pada setiap iterasi.

## Functional Testing

Memastikan setiap requirement dapat dijalankan sesuai spesifikasi.

## Authentication Testing

- Login valid.
- Login invalid.
- Logout.
- Session.
- Role authorization.

## CRUD Testing

Dilakukan untuk:

- User.
- Karyawan.
- Kategori.
- Menu.
- Inventory.

## Transaction Testing

- Add product.
- Update quantity.
- Remove product.
- Calculate total.
- Payment.
- Checkout.
- Transaction persistence.

## Customer Ordering Testing

- Browse menu.
- Add to cart.
- Checkout.
- Payment.
- Order status.

## Acceptance Testing

Setiap iterasi harus memiliki acceptance criteria sebelum dinyatakan selesai.

---

# 20. Acceptance Criteria

## Iterasi 1

Iterasi dianggap selesai apabila:

- Admin dapat login.
- Kasir dapat login.
- Pengguna dapat login.
- Logout berjalan.
- Session dapat dipertahankan.
- Admin dapat mengelola karyawan.
- Admin dapat mengelola user.
- Role tersimpan dan diterapkan dengan benar.
- User hanya dapat mengakses fitur sesuai role.

## Iterasi 2

Iterasi dianggap selesai apabila:

- Admin dapat melakukan CRUD kategori.
- Admin dapat melakukan CRUD menu.
- Menu dapat dikategorikan.
- Admin dapat mengelola inventory.
- Stok dapat bertambah dan berkurang.
- Sistem dapat menunjukkan kondisi stok rendah.

## Iterasi 3

Iterasi dianggap selesai apabila:

- Kasir dapat membuat transaksi.
- Produk dapat ditambahkan ke keranjang.
- Quantity dapat diubah.
- Total dihitung otomatis.
- Pembayaran dapat diproses.
- Transaksi tersimpan.
- Riwayat transaksi tersedia.
- Admin dapat melihat laporan penjualan.
- Admin dapat melihat pemasukan.
- Admin dapat melihat pengeluaran.
- Admin dapat melihat laporan keuangan harian.

## Iterasi 4

Iterasi dianggap selesai apabila:

- Pengguna dapat melihat menu.
- Pengguna dapat menambahkan produk ke keranjang.
- Pengguna dapat melakukan checkout.
- Pengguna dapat melakukan pembayaran.
- Pesanan tersimpan.
- Pengguna dapat melihat status pesanan.
- Admin dapat melihat dashboard keseluruhan.
- Data dashboard berasal dari data aktual sistem.

---

# 21. Development Roadmap

## Iterasi 1

```text
Authentication
      ↓
User Management
      ↓
Employee Management
      ↓
Role & Authorization
      ↓
Testing
```

## Iterasi 2

```text
Category
      ↓
Product/Menu
      ↓
Inventory
      ↓
Stock Management
      ↓
Testing
```

## Iterasi 3

```text
POS
 ↓
Cart
 ↓
Transaction
 ↓
Payment
 ↓
Financial Report
 ↓
Testing
```

## Iterasi 4

```text
Customer Menu
 ↓
Customer Cart
 ↓
Checkout
 ↓
Payment
 ↓
Order Status
 ↓
Admin Dashboard
 ↓
Final Testing
```

---

# 22. Out of Scope

Fitur berikut tidak termasuk dalam scope utama versi ini:

- Multi-branch.
- Employee attendance.
- Payroll.
- Customer loyalty program.
- Discount/voucher.
- Advanced promotion system.
- Full offline transaction.
- Integrasi printer thermal.
- Digital receipt melalui perangkat eksternal.
- Advanced business analytics.

Fitur tersebut dapat dipertimbangkan setelah scope utama selesai.

---

# 23. Project Success Criteria

Project dianggap berhasil apabila aplikasi mampu:

1. Menyediakan autentikasi dan authorization berdasarkan tiga role.
2. Membantu Admin mengelola data operasional utama.
3. Membantu Kasir melakukan transaksi melalui POS.
4. Mencatat transaksi secara digital.
5. Mengelola inventory.
6. Menyediakan laporan keuangan harian.
7. Memungkinkan Pengguna melakukan pemesanan melalui aplikasi.
8. Menampilkan status pesanan.
9. Menyediakan dashboard operasional khusus Admin.
10. Menjalankan seluruh alur utama tanpa crash.

---

# 24. Final Application Structure

```text
Fantasi Coffee Mobile POS

├── Authentication
│   ├── Login
│   └── Logout
│
├── Admin
│   ├── Dashboard
│   ├── Karyawan
│   ├── User
│   ├── Kategori
│   ├── Menu
│   ├── Inventory
│   ├── Transaksi
│   ├── Laporan
│   └── Profil
│
├── Kasir
│   ├── POS
│   ├── Transaksi
│   └── Profil
│
└── Pengguna
    ├── Menu
    ├── Keranjang
    ├── Checkout
    ├── Pesanan
    └── Profil
```

---

# 25. Conclusion

Fantasi Coffee Mobile POS dikembangkan sebagai aplikasi mobile Android untuk mendukung aktivitas operasional dan transaksi Fantasi Coffee.

Aplikasi menggunakan tiga role, yaitu Admin, Kasir, dan Pengguna. Pengembangan dilakukan dalam empat iterasi yang mencakup Authentication & Employee Management, Menu & Inventory Management, POS & Financial Report, serta Customer Ordering & Admin Dashboard.

Arsitektur aplikasi menggunakan Hybrid Feature-Based Architecture dengan React Native, Expo, Expo Router, dan NativeWind. Struktur tersebut dipilih agar setiap fitur memiliki pemisahan yang jelas, komponen UI dapat digunakan kembali, dan aplikasi dapat dikembangkan secara bertahap.

Dashboard bersifat khusus untuk Admin, sedangkan Kasir berfokus pada operasional POS dan Pengguna berfokus pada pemesanan menu melalui aplikasi.
