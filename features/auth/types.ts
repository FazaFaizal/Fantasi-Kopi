export type Role = "admin" | "kasir" | "pengguna";

export type UserStatus = "active" | "inactive";

export type AppUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
  password?: string;
  createdAt: string;
  updatedAt: string;
};

export type UserInput = {
  name: string;
  email: string;
  password?: string;
  role: Role;
  status: UserStatus;
};

export function roleLabel(role: Role) {
  switch (role) {
    case "admin":
      return "Admin";
    case "kasir":
      return "Kasir";
    default:
      return "Pengguna";
  }
}

export function roleDescription(role: Role) {
  switch (role) {
    case "admin":
      return "Akses penuh manajemen operasional";
    case "kasir":
      return "Mengelola transaksi penjualan";
    default:
      return "Melihat menu dan membuat pesanan";
  }
}
