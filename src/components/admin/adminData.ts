import type { CameraCategory } from "@/types";

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  stock: number;
  sku: string;
}

export interface AdminProduct {
  id: string;
  name: string;
  brand: string;
  category: CameraCategory;
  pricePerDay: number;
  sku: string;
  stock: number;
  lowStockThreshold: number;
  image: string;
  imageAlt: string;
  description: string;
  available: boolean;
  variants: ProductVariant[];
}

export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Refunded" | "Cancelled";

export interface OrderItem {
  productId: string;
  name: string;
  qty: number;
  pricePerDay: number;
  days: number;
}

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
  title: string;
  gender: string;
  pronouns: string;
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customer: OrderCustomer;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  createdAt: string;
  trackingNumber: string | null;
  shippingLabel: string | null;
  notes: string;
}

export const categoryOptions: { label: string; value: CameraCategory }[] = [
  { label: "Mirrorless", value: "Mirrorless" },
  { label: "DSLR", value: "DSLR" },
  { label: "Cinema", value: "Cinema" },
  { label: "Drone", value: "Drone" },
  { label: "Action", value: "Action" },
  { label: "Film", value: "Film" },
];

export const titleOptions = ["Mr.", "Ms.", "Mx.", "Dr.", "Prof.", "No Title"];
export const genderOptions = ["Female", "Male", "Non-Binary", "Prefer Not to Say", "Self-Describe"];
export const pronounOptions = ["she/her", "he/him", "they/them", "she/they", "he/they", "Other"];

export const orderStatusOptions: OrderStatus[] = ["Pending", "Processing", "Shipped", "Delivered", "Refunded", "Cancelled"];

export function statusToVariant(status: OrderStatus): "success" | "warning" | "danger" | "info" | "neutral" {
  switch (status) {
    case "Delivered": return "success";
    case "Processing": return "info";
    case "Shipped": return "info";
    case "Pending": return "warning";
    case "Refunded": return "neutral";
    case "Cancelled": return "danger";
    default: return "neutral";
  }
}

export const initialProducts: AdminProduct[] = [
  {
    id: "p1",
    name: "Canon EOS R5",
    brand: "Canon",
    category: "Mirrorless",
    pricePerDay: 89,
    sku: "CAN-R5-001",
    stock: 5,
    lowStockThreshold: 2,
    image: "https://images.pexels.com/photos/19969445/pexels-photo-19969445.jpeg?auto=compress&cs=tinysrgb&h=200&w=300",
    imageAlt: "Canon EOS R5 mirrorless camera body in black",
    description: "Full-frame 45MP mirrorless with 8K internal recording.",
    available: true,
    variants: [
      { id: "v1", name: "Kit", value: "Body + 24-105mm", stock: 3, sku: "CAN-R5-KIT" },
      { id: "v2", name: "Body Only", value: "Body only", stock: 2, sku: "CAN-R5-BODY" },
    ],
  },
  {
    id: "p2",
    name: "Sony Alpha A7 IV",
    brand: "Sony",
    category: "Mirrorless",
    pricePerDay: 75,
    sku: "SON-A74-001",
    stock: 1,
    lowStockThreshold: 2,
    image: "https://images.pexels.com/photos/19969452/pexels-photo-19969452.jpeg?auto=compress&cs=tinysrgb&h=200&w=300",
    imageAlt: "Sony Alpha A7 IV mirrorless camera in black",
    description: "33MP hybrid full-frame with 4K 60p video.",
    available: true,
    variants: [
      { id: "v1", name: "Body Only", value: "Body only", stock: 1, sku: "SON-A74-BODY" },
    ],
  },
  {
    id: "p3",
    name: "RED KOMODO 6K",
    brand: "RED",
    category: "Cinema",
    pricePerDay: 175,
    sku: "RED-KOM-001",
    stock: 3,
    lowStockThreshold: 1,
    image: "https://images.pexels.com/photos/10395639/pexels-photo-10395639.jpeg?auto=compress&cs=tinysrgb&h=200&w=300",
    imageAlt: "RED KOMODO 6K cinema camera in black",
    description: "6K Super35 global shutter cinema camera.",
    available: true,
    variants: [
      { id: "v1", name: "Standard", value: "Body + monitor", stock: 2, sku: "RED-KOM-STD" },
      { id: "v2", name: "Pro Kit", value: "Body + monitor + lenses", stock: 1, sku: "RED-KOM-PRO" },
    ],
  },
  {
    id: "p4",
    name: "DJI Mavic 3 Pro",
    brand: "DJI",
    category: "Drone",
    pricePerDay: 65,
    sku: "DJI-MAV3-001",
    stock: 0,
    lowStockThreshold: 2,
    image: "https://images.pexels.com/photos/3823555/pexels-photo-3823555.jpeg?auto=compress&cs=tinysrgb&h=200&w=300",
    imageAlt: "DJI Mavic 3 Pro drone with Hasselblad camera folded",
    description: "Hasselblad camera drone with 5.1K video and 46-min flight.",
    available: false,
    variants: [
      { id: "v1", name: "Fly More Combo", value: "Drone + extra batteries", stock: 0, sku: "DJI-MAV3-FMC" },
    ],
  },
  {
    id: "p5",
    name: "GoPro HERO12 Black",
    brand: "GoPro",
    category: "Action",
    pricePerDay: 25,
    sku: "GP-H12-001",
    stock: 8,
    lowStockThreshold: 3,
    image: "https://images.pexels.com/photos/36996854/pexels-photo-36996854.jpeg?auto=compress&cs=tinysrgb&h=200&w=300",
    imageAlt: "GoPro HERO12 Black action camera in black",
    description: "5.3K60 action camera with HyperSmooth 6.0 stabilization.",
    available: true,
    variants: [
      { id: "v1", name: "Standard", value: "Camera only", stock: 5, sku: "GP-H12-STD" },
      { id: "v2", name: "Creator Kit", value: "Camera + mods", stock: 3, sku: "GP-H12-CRT" },
    ],
  },
  {
    id: "p6",
    name: "Nikon Z8",
    brand: "Nikon",
    category: "Mirrorless",
    pricePerDay: 95,
    sku: "NIK-Z8-001",
    stock: 4,
    lowStockThreshold: 2,
    image: "https://images.pexels.com/photos/32130078/pexels-photo-32130078.jpeg?auto=compress&cs=tinysrgb&h=200&w=300",
    imageAlt: "Nikon Z8 mirrorless camera body in black",
    description: "45.7MP stacked sensor with 8K/60p N-RAW.",
    available: true,
    variants: [
      { id: "v1", name: "Body Only", value: "Body only", stock: 4, sku: "NIK-Z8-BODY" },
    ],
  },
];

export const initialOrders: AdminOrder[] = [
  {
    id: "o1",
    orderNumber: "CRS-1001",
    customer: { fullName: "Jordan Mitchell", email: "jordan.m@email.com", phone: "+1 555-0101", title: "Mx.", gender: "Non-Binary", pronouns: "they/them" },
    items: [{ productId: "p1", name: "Canon EOS R5", qty: 1, pricePerDay: 89, days: 3 }],
    status: "Pending",
    total: 267,
    createdAt: "2026-09-22T14:30:00Z",
    trackingNumber: null,
    shippingLabel: null,
    notes: "Customer requested pickup on the 24th.",
  },
  {
    id: "o2",
    orderNumber: "CRS-1002",
    customer: { fullName: "Sarah Chen", email: "s.chen@email.com", phone: "+1 555-0102", title: "Ms.", gender: "Female", pronouns: "she/her" },
    items: [{ productId: "p3", name: "RED KOMODO 6K", qty: 1, pricePerDay: 175, days: 5 }],
    status: "Processing",
    total: 875,
    createdAt: "2026-09-21T09:15:00Z",
    trackingNumber: null,
    shippingLabel: null,
    notes: "",
  },
  {
    id: "o3",
    orderNumber: "CRS-1003",
    customer: { fullName: "Marcus Washington", email: "marcusw@email.com", phone: "+1 555-0103", title: "Mr.", gender: "Male", pronouns: "he/him" },
    items: [
      { productId: "p5", name: "GoPro HERO12 Black", qty: 2, pricePerDay: 25, days: 7 },
      { productId: "p2", name: "Sony Alpha A7 IV", qty: 1, pricePerDay: 75, days: 7 },
    ],
    status: "Shipped",
    total: 875,
    createdAt: "2026-09-20T16:45:00Z",
    trackingNumber: "TRK-9X4-2847",
    shippingLabel: "LBL-2026-09-20-003",
    notes: "",
  },
  {
    id: "o4",
    orderNumber: "CRS-1004",
    customer: { fullName: "Aisha Patel", email: "aisha.p@email.com", phone: "+1 555-0104", title: "Dr.", gender: "Female", pronouns: "she/her" },
    items: [{ productId: "p6", name: "Nikon Z8", qty: 1, pricePerDay: 95, days: 2 }],
    status: "Delivered",
    total: 190,
    createdAt: "2026-09-18T11:00:00Z",
    trackingNumber: "TRK-7K2-1129",
    shippingLabel: "LBL-2026-09-18-004",
    notes: "Returned in excellent condition.",
  },
  {
    id: "o5",
    orderNumber: "CRS-1005",
    customer: { fullName: "Robin Fitzgerald", email: "robin.f@email.com", phone: "+1 555-0105", title: "Mx.", gender: "Non-Binary", pronouns: "they/them" },
    items: [{ productId: "p4", name: "DJI Mavic 3 Pro", qty: 1, pricePerDay: 65, days: 4 }],
    status: "Refunded",
    total: 260,
    createdAt: "2026-09-17T13:20:00Z",
    trackingNumber: "TRK-5M1-9921",
    shippingLabel: "LBL-2026-09-17-005",
    notes: "Refund issued due to weather cancellation.",
  },
];
