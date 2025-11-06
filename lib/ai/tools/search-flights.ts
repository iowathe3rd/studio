import { tool } from "ai";
import { z } from "zod";

export const searchFlights = tool({
  description:
    "Search for flights between two locations. Use this when users ask about flights, airline tickets, or travel between cities.",
  inputSchema: z.object({
    from: z
      .string()
      .describe(
        "The departure city or airport code, e.g., 'New York', 'JFK', 'San Francisco'"
      ),
    to: z
      .string()
      .describe(
        "The arrival city or airport code, e.g., 'London', 'LHR', 'Tokyo'"
      ),
    date: z
      .string()
      .optional()
      .describe(
        "The departure date in ISO format (YYYY-MM-DD). If not provided, use current date."
      ),
  }),
  execute: ({ from, to, date }) => {
    // Airport code mapping for common cities
    const airportCodes: Record<
      string,
      { code: string; city: string; name: string }
    > = {
      "new york": {
        code: "JFK",
        city: "New York",
        name: "John F. Kennedy International",
      },
      jfk: {
        code: "JFK",
        city: "New York",
        name: "John F. Kennedy International",
      },
      "san francisco": {
        code: "SFO",
        city: "San Francisco",
        name: "San Francisco International",
      },
      sfo: {
        code: "SFO",
        city: "San Francisco",
        name: "San Francisco International",
      },
      london: { code: "LHR", city: "London", name: "Heathrow" },
      lhr: { code: "LHR", city: "London", name: "Heathrow" },
      tokyo: { code: "NRT", city: "Tokyo", name: "Narita International" },
      nrt: { code: "NRT", city: "Tokyo", name: "Narita International" },
      paris: { code: "CDG", city: "Paris", name: "Charles de Gaulle" },
      cdg: { code: "CDG", city: "Paris", name: "Charles de Gaulle" },
      "los angeles": {
        code: "LAX",
        city: "Los Angeles",
        name: "Los Angeles International",
      },
      lax: {
        code: "LAX",
        city: "Los Angeles",
        name: "Los Angeles International",
      },
    };

    const getAirportInfo = (location: string) => {
      const normalized = location.toLowerCase().trim();
      return (
        airportCodes[normalized] || {
          code: location.toUpperCase().slice(0, 3),
          city: location,
          name: `${location} Airport`,
        }
      );
    };

    const departureInfo = getAirportInfo(from);
    const arrivalInfo = getAirportInfo(to);

    // Generate departure time
    const departureDate = date ? new Date(date) : new Date();
    departureDate.setHours(
      8 + Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 60)
    );

    // Calculate arrival time (random duration between 2-14 hours)
    const durationHours = 2 + Math.floor(Math.random() * 12);
    const durationMinutes = Math.floor(Math.random() * 60);
    const arrivalDate = new Date(departureDate);
    arrivalDate.setHours(
      arrivalDate.getHours() + durationHours,
      arrivalDate.getMinutes() + durationMinutes
    );

    const airlines = [
      "United",
      "Delta",
      "American",
      "British Airways",
      "Lufthansa",
      "Emirates",
    ];
    const statuses: Array<
      "on-time" | "delayed" | "cancelled" | "boarding" | "departed"
    > = ["on-time", "on-time", "on-time", "delayed", "boarding"];
    const classes = ["Economy", "Premium Economy", "Business", "First Class"];

    const flightNumber = `${Math.floor(Math.random() * 9000) + 1000}`;
    const airline = airlines[Math.floor(Math.random() * airlines.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const flightClass = classes[Math.floor(Math.random() * classes.length)];
    const basePrice = 200 + Math.random() * 1500;

    return {
      flightNumber,
      airline,
      departure: {
        airport: departureInfo.name,
        city: departureInfo.city,
        code: departureInfo.code,
        time: departureDate.toISOString(),
        gate: `${String.fromCharCode(65 + Math.floor(Math.random() * 8))}${Math.floor(Math.random() * 30) + 1}`,
      },
      arrival: {
        airport: arrivalInfo.name,
        city: arrivalInfo.city,
        code: arrivalInfo.code,
        time: arrivalDate.toISOString(),
        gate: `${String.fromCharCode(65 + Math.floor(Math.random() * 8))}${Math.floor(Math.random() * 30) + 1}`,
      },
      duration: `${durationHours}h ${durationMinutes}m`,
      status,
      price: Number.parseFloat(basePrice.toFixed(2)),
      class: flightClass,
    };
  },
});
