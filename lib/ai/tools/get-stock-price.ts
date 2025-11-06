import { tool } from "ai";
import { z } from "zod";

export const getStockPrice = tool({
  description:
    "Get the current stock price and details for a given stock symbol. Use this when users ask about stock prices, market data, or company stock information.",
  inputSchema: z.object({
    symbol: z
      .string()
      .describe(
        "The stock symbol (ticker) to get the price for, e.g., AAPL, GOOGL, TSLA"
      ),
  }),
  execute: ({ symbol }) => {
    // Simulated stock data - in production, use a real API like Alpha Vantage, Yahoo Finance, etc.
    const mockStockData: Record<string, any> = {
      AAPL: {
        symbol: "AAPL",
        price: 178.72,
        change: 2.34,
        changePercent: 1.33,
        high: 179.99,
        low: 176.23,
        open: 177.15,
        previousClose: 176.38,
        volume: 52_430_000,
        marketCap: "$2.8T",
      },
      GOOGL: {
        symbol: "GOOGL",
        price: 142.56,
        change: -1.23,
        changePercent: -0.86,
        high: 144.32,
        low: 141.89,
        open: 143.78,
        previousClose: 143.79,
        volume: 28_750_000,
        marketCap: "$1.8T",
      },
      TSLA: {
        symbol: "TSLA",
        price: 248.43,
        change: 12.87,
        changePercent: 5.46,
        high: 251.24,
        low: 235.67,
        open: 236.92,
        previousClose: 235.56,
        volume: 115_234_000,
        marketCap: "$789B",
      },
      MSFT: {
        symbol: "MSFT",
        price: 428.35,
        change: 3.21,
        changePercent: 0.75,
        high: 430.12,
        low: 425.67,
        open: 426.89,
        previousClose: 425.14,
        volume: 24_567_000,
        marketCap: "$3.2T",
      },
      AMZN: {
        symbol: "AMZN",
        price: 178.25,
        change: -2.45,
        changePercent: -1.36,
        high: 181.34,
        low: 177.12,
        open: 180.67,
        previousClose: 180.7,
        volume: 42_123_000,
        marketCap: "$1.9T",
      },
    };

    const upperSymbol = symbol.toUpperCase();

    if (mockStockData[upperSymbol]) {
      return mockStockData[upperSymbol];
    }

    // Generate random data for unknown symbols
    const basePrice = Math.random() * 500 + 50;
    const change = (Math.random() - 0.5) * 20;
    const changePercent = (change / basePrice) * 100;

    return {
      symbol: upperSymbol,
      price: Number.parseFloat(basePrice.toFixed(2)),
      change: Number.parseFloat(change.toFixed(2)),
      changePercent: Number.parseFloat(changePercent.toFixed(2)),
      high: Number.parseFloat((basePrice + Math.random() * 10).toFixed(2)),
      low: Number.parseFloat((basePrice - Math.random() * 10).toFixed(2)),
      open: Number.parseFloat(
        (basePrice + (Math.random() - 0.5) * 5).toFixed(2)
      ),
      previousClose: Number.parseFloat((basePrice - change).toFixed(2)),
      volume: Math.floor(Math.random() * 100_000_000),
      marketCap: `$${(Math.random() * 3 + 0.5).toFixed(1)}T`,
    };
  },
});
