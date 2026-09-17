import { AppUser } from "./types";

export const DEMO_ACCOUNTS = [
  { role: "Admin", email: "admin@fantasi.coffee", password: "admin123" },
  { role: "Kasir", email: "kasir@fantasi.coffee", password: "kasir123" },
  { role: "Pengguna", email: "user@fantasi.coffee", password: "user123" },
];

export const INITIAL_USERS: AppUser[] = [
  {
    id: "usr-admin",
    name: "Bayu Pratama",
    email: "admin@fantasi.coffee",
    role: "admin",
    status: "active",
    password: "admin123",
    createdAt: "2026-09-01T08:00:00.000Z",
    updatedAt: "2026-09-01T08:00:00.000Z",
  },
  {
    id: "usr-kasir",
    name: "Nadia Putri",
    email: "kasir@fantasi.coffee",
    role: "kasir",
    status: "active",
    password: "kasir123",
    createdAt: "2026-09-02T08:00:00.000Z",
    updatedAt: "2026-09-02T08:00:00.000Z",
  },
  {
    id: "usr-user",
    name: "Raka Customer",
    email: "user@fantasi.coffee",
    role: "pengguna",
    status: "active",
    password: "user123",
    createdAt: "2026-09-03T08:00:00.000Z",
    updatedAt: "2026-09-03T08:00:00.000Z",
  },
  {
    id: "usr-barista",
    name: "Salsa Anjani",
    email: "salsa@fantasi.coffee",
    role: "kasir",
    status: "active",
    password: "salsa123",
    createdAt: "2026-09-04T08:00:00.000Z",
    updatedAt: "2026-09-04T08:00:00.000Z",
  },
  {
    id: "usr-inactive",
    name: "Dimas Haryono",
    email: "dimas@fantasi.coffee",
    role: "pengguna",
    status: "inactive",
    password: "dimas123",
    createdAt: "2026-09-05T08:00:00.000Z",
    updatedAt: "2026-09-05T08:00:00.000Z",
  },
];
