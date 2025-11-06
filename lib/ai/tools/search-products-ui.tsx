import { tool } from "ai";
import { z } from "zod";
import {
  ProductCard,
  ProductCardLoading,
} from "@/components/generative-ui/product-card";

export const searchProductsUI = tool({
  description:
    "Search for products to buy online. Use this when users ask about shopping, products, or want to buy something.",
  inputSchema: z.object({
    query: z
      .string()
      .describe(
        "The product name or search query, e.g., 'laptop', 'headphones', 'running shoes'"
      ),
    category: z
      .string()
      .optional()
      .describe(
        "Optional category filter, e.g., 'electronics', 'clothing', 'books'"
      ),
  }),
  async *generate({ query, category }) {
    // Show loading state
    yield (
      <div className="flex gap-4 overflow-x-auto py-2">
        <ProductCardLoading />
        <ProductCardLoading />
        <ProductCardLoading />
      </div>
    );

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Mock product database
    const products = [
      {
        id: "1",
        name: "Apple MacBook Pro 16-inch",
        description:
          "Powerful laptop with M3 Max chip, 36GB RAM, and 1TB SSD. Perfect for professionals.",
        price: 2499.99,
        originalPrice: 2799.99,
        rating: 4.8,
        reviewCount: 1247,
        imageUrl:
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
        inStock: true,
        category: "Electronics",
        brand: "Apple",
      },
      {
        id: "2",
        name: "Sony WH-1000XM5 Wireless Headphones",
        description:
          "Industry-leading noise cancellation with premium sound quality and 30-hour battery life.",
        price: 349.99,
        originalPrice: 399.99,
        rating: 4.7,
        reviewCount: 3421,
        imageUrl:
          "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
        inStock: true,
        category: "Electronics",
        brand: "Sony",
      },
      {
        id: "3",
        name: "Nike Air Zoom Pegasus 40",
        description:
          "Responsive running shoes with excellent cushioning. Designed for daily training and long runs.",
        price: 129.99,
        rating: 4.6,
        reviewCount: 892,
        imageUrl:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        inStock: true,
        category: "Sports",
        brand: "Nike",
      },
      {
        id: "4",
        name: "Kindle Paperwhite Signature Edition",
        description:
          "Premium e-reader with 32GB storage, wireless charging, and adjustable warm light.",
        price: 189.99,
        originalPrice: 209.99,
        rating: 4.9,
        reviewCount: 5632,
        imageUrl:
          "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=500",
        inStock: true,
        category: "Electronics",
        brand: "Amazon",
      },
      {
        id: "5",
        name: "Samsung Galaxy S24 Ultra",
        description:
          "Latest flagship smartphone with 200MP camera, S Pen, and titanium frame.",
        price: 1199.99,
        rating: 4.7,
        reviewCount: 2156,
        imageUrl:
          "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500",
        inStock: false,
        category: "Electronics",
        brand: "Samsung",
      },
      {
        id: "6",
        name: "Levi's 501 Original Fit Jeans",
        description:
          "Classic straight-leg jeans made with quality denim. A timeless wardrobe staple.",
        price: 69.99,
        originalPrice: 98.0,
        rating: 4.5,
        reviewCount: 4521,
        imageUrl:
          "https://images.unsplash.com/photo-1542272454315-7f6d6a38d4e9?w=500",
        inStock: true,
        category: "Clothing",
        brand: "Levi's",
      },
    ];

    // Simple search algorithm
    const searchTerms = query.toLowerCase().split(" ");
    let filteredProducts = products.filter((product) => {
      const productText =
        `${product.name} ${product.description} ${product.brand} ${product.category}`.toLowerCase();
      return searchTerms.some((term) => productText.includes(term));
    });

    // Filter by category if provided
    if (category) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }

    // If no results, return a random subset
    if (filteredProducts.length === 0) {
      filteredProducts = products.slice(0, 3);
    }

    // Return top 3 results as UI components
    const topProducts = filteredProducts.slice(0, 3);

    return (
      <div className="flex gap-4 overflow-x-auto py-2">
        {topProducts.map((product) => (
          <ProductCard data={product} key={product.id} />
        ))}
      </div>
    );
  },
});
