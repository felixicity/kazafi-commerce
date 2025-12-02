import { Product } from "../types";
import { SingleProduct } from "../types";
import { Coupon } from "../types";

export const products = [
      {
            id: 1,
            name: "Ada Chairs",
            price: 50000,
            image: "/images/ada-l-shaped-sofas-39870010196190-Photoroom.png",
      },
      {
            id: 2,
            name: "Ada Sofas",
            price: 45000,
            image: "/images/ada-sofas-39870048829662-Photoroom.png",
      },
      {
            id: 3,
            name: "Ada Sofas (Variant)",
            price: 47000,
            image: "/images/ada-sofas-39870048862430-Photoroom.png",
      },
      {
            id: 4,
            name: "Alausa Sofas",
            price: 65000,
            image: "/images/alausa-sofas-39870436081886-Photoroom.png",
      },
      {
            id: 5,
            name: "Amakisi Prime Table",
            price: 35000,
            image: "/images/amakisi-prime-table-tables-39870509940958-Photoroom.png",
      },
      {
            id: 6,
            name: "Bisoye Sofas",
            price: 56000,
            image: "/images/bisoye-sofas-39870832738526-Photoroom.png",
      },
      {
            id: 7,
            name: "Bosun Coffee Table",
            price: 22000,
            image: "/images/bosun-coffee-tables-39870899257566-Photoroom.png",
      },
      {
            id: 8,
            name: "Dinma Duo Sofas",
            price: 60000,
            image: "/images/dinma-duo-sofas-39871330287838-Photoroom.png",
      },
      {
            id: 9,
            name: "Femi Occasional Chair",
            price: 18000,
            image: "/images/femi-occasional-chairs-39871554978014-Photoroom.png",
      },
      {
            id: 10,
            name: "Hamida Sofa",
            price: 52000,
            image: "/images/hamida-sofa-sofas-39871566053598-Photoroom.png",
      },
      {
            id: 11,
            name: "Ikenga Occasional Chair",
            price: 19000,
            image: "/images/ikenga-occasional-chairs-39871636668638-Photoroom.png",
      },
      {
            id: 12,
            name: "Obi",
            price: 75000,
            image: "/images/obi-39950930903262-Photoroom-2.png",
      },
      {
            id: 13,
            name: "Shobo Chair",
            price: 16000,
            image: "/images/shobo-chair-occasional-chairs-39880825012446-Photoroom.png",
      },
];

export const MOCK_PRODUCTS: Product[] = [
      {
            id: 1,
            name: "Essential Oversized Tee",
            category: "T-Shirts",
            price: 45.0,
            originalPrice: 60.0,
            description: "A classic fit tee made from organic cotton.",
            imagePlaceholder: "https://placehold.co/400x500/A0A0A0/FFFFFF?text=Tee+A",
            variants: {
                  color: [
                        { name: "Black", hex: "#000000" },
                        { name: "White", hex: "#FFFFFF" },
                  ],
                  sizes: ["S", "M", "L", "XL"],
            },
            reviews: { rating: 4.8, count: 124 },
      },
      {
            id: 2,
            name: "Performance Joggers",
            category: "Pants",
            price: 89.99,
            description: "Moisture-wicking fabric for intense workouts.",
            imagePlaceholder: "https://placehold.co/400x500/808080/FFFFFF?text=Joggers+B",
            variants: {
                  color: [
                        { name: "Navy", hex: "#000080" },
                        { name: "Grey", hex: "#808080" },
                  ],
                  sizes: ["XS", "S", "M", "L"],
            },
            reviews: { rating: 4.5, count: 88 },
      },
      {
            id: 3,
            name: "Tech Fleece Hoodie",
            category: "Hoodies",
            price: 120.0,
            description: "Lightweight and warm fleece material.",
            imagePlaceholder: "https://placehold.co/400x500/B0C4DE/FFFFFF?text=Hoodie+C",
            variants: {
                  color: [{ name: "Heather Gray", hex: "#C0C0C0" }],
                  sizes: ["M", "L", "XL", "XXL"],
            },
            reviews: { rating: 4.9, count: 210 },
      },
      {
            id: 4,
            name: "Slim Fit Denim",
            category: "Pants",
            price: 95.0,
            description: "Classic denim jeans with a modern slim fit.",
            imagePlaceholder: "https://placehold.co/400x500/4682B4/FFFFFF?text=Denim+D",
            variants: {
                  color: [
                        { name: "Indigo", hex: "#4B0082" },
                        { name: "Black", hex: "#000000" },
                  ],
                  sizes: ["S", "M", "L", "XL", "XXL"], // Mock size as numbers here for variety
            },
            reviews: { rating: 3.9, count: 55 },
      },
];

export const MOCK_PRODUCT_SINGLE: SingleProduct = {
      id: 1,
      name: "Essential Oversized Tee",
      category: "T-Shirts",
      price: 45.0,
      originalPrice: 60.0,
      description: "A classic fit tee made from organic cotton, perfect for everyday comfort.",
      longDescription:
            "The Essential Oversized Tee is crafted from 100% sustainably sourced organic cotton, offering a perfect blend of comfort and modern street style. Its relaxed, dropped-shoulder fit provides maximum breathability, making it ideal for everyday wear or light training. Available in core colors, this tee is a foundational piece for any modern wardrobe. Durable stitching ensures longevity and shape retention after multiple washes.",
      imagePlaceholder: "/images/ada-sofas-39870048829662-Photoroom.png",
      variants: {
            color: [
                  { name: "Black", hex: "#000000" },
                  { name: "White", hex: "#FFFFFF" },
                  { name: "Olive Green", hex: "#6B8E23" },
                  { name: "Heather Gray", hex: "#C0C0C0" },
            ],
            sizes: ["S", "M", "L", "XL", "XXL"],
      },
      reviews: { rating: 4.8, count: 124 },
      materials: [
            { title: "Composition", detail: "100% Organic, Ring-Spun Cotton" },
            { title: "Weight", detail: "240 GSM (Heavyweight)" },
            { title: "Sourcing", detail: "Fair Trade Certified Factory" },
            { title: "Care", detail: "Machine wash cold, tumble dry low" },
      ],
};

export const MOCK_ORDERS: Order[] = [
      { id: "ORD-2023-4001", date: "Oct 15, 2024", status: "Delivered", total: 125.99, items: 3 },
      { id: "ORD-2023-4002", date: "Sep 28, 2024", status: "Shipped", total: 45.0, items: 1 },
      { id: "ORD-2023-4003", date: "Aug 01, 2024", status: "Processing", total: 299.5, items: 5 },
      { id: "ORD-2023-4004", date: "Jul 10, 2024", status: "Delivered", total: 72.9, items: 2 },
];

export const MOCK_COUPONS: Coupon[] = [
      { code: "WELCOME20", discount: "20% OFF", expiry: "Dec 31, 2024", valid: true },
      { code: "SHIPFREE", discount: "Free Shipping", expiry: "Jan 30, 2025", valid: true },
      { code: "OLDCODE", discount: "$10 OFF", expiry: "Jun 01, 2024", valid: false },
];

export const MOCK_USER = {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      phone: "555-123-4567",
      address: "123 Commerce St, Suite 4B, Anytown, CA 90210",
};
