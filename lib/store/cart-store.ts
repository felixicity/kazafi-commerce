import { SingleProduct } from "../types";
import { Coupon } from "../types";

export const products = [
      {
            id: 1,
            name: "Ada Chairs",
            price: 50000,
            image: "/images/ada-l-shaped-sofas-39870010196190-Photoroom.png",
            category: "T-Shirts",
            instock: 17,
            status: "active",
      },
      {
            id: 2,
            name: "Ada Sofas",
            price: 45000,
            image: "/images/ada-sofas-39870048829662-Photoroom.png",
            category: "T-Shirts",
            instock: 17,
            status: "active",
      },
      {
            id: 3,
            name: "Ada Sofas (Variant)",
            price: 47000,
            image: "/images/ada-sofas-39870048862430-Photoroom.png",
            category: "T-Shirts",
            instock: 17,
            status: "active",
      },
      {
            id: 4,
            name: "Alausa Sofas",
            price: 65000,
            image: "/images/alausa-sofas-39870436081886-Photoroom.png",
            category: "T-Shirts",
            instock: 17,
            status: "active",
      },
      {
            id: 5,
            name: "Amakisi Prime Table",
            price: 35000,
            image: "/images/amakisi-prime-table-tables-39870509940958-Photoroom.png",
            category: "Furniture",
            instock: 17,
            status: "active",
      },
      {
            id: 6,
            name: "Bisoye Sofas",
            price: 56000,
            image: "/images/bisoye-sofas-39870832738526-Photoroom.png",
            category: "T-Shirts",
            instock: 29,
            status: "archived",
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
            category: "T-Shirts",
            instock: 29,
            status: "archived",
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
            category: "T-Shirts",
            instock: 8,
            status: "active",
      },
      {
            id: 12,
            name: "Obi",
            price: 75000,
            image: "/images/obi-39950930903262-Photoroom-2.png",
            category: "T-Shirts",
            instock: 17,
            status: "active",
      },
      {
            id: 13,
            name: "Shobo Chair",
            price: 16000,
            image: "/images/shobo-chair-occasional-chairs-39880825012446-Photoroom.png",
            category: "T-Shirts",
            instock: 29,
            status: "archived",
      },
];

export const MOCK_PRODUCT_SINGLE: SingleProduct = {
      id: 1,
      name: "Essential Oversized Tee",
      category: "T-Shirts",
      description: "A classic fit tee made from organic cotton, perfect for everyday comfort.",
      details: "The Essential Oversized Tee is crafted from 100% sustainably sourced organic cotton, offering a perfect blend of comfort and modern street style. Its relaxed, dropped-shoulder fit provides maximum breathability, making it ideal for everyday wear or light training. Available in core colors, this tee is a foundational piece for any modern wardrobe. Durable stitching ensures longevity and shape retention after multiple washes.",
      variations: [
            {
                  color: { name: "Black", hex: "#000000" },
                  price: 45000,
                  discount: 10,
                  imageURLs: [".imageseno-chair-occasional-chairs-39871458214110-Photoroom (1).png"],
                  stock: 15,
            },
            {
                  color: { name: "White", hex: "FFFFFF" },
                  price: 43200,
                  imageURLs: [".images\bosun-coffee-tables-39870899257566-Photoroom.png"],
                  stock: 5,
            },
      ],
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
