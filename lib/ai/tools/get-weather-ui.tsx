import { tool } from "ai";
import { z } from "zod";
import { Weather } from "@/components/weather";

async function geocodeCity(
  city: string
): Promise<{ latitude: number; longitude: number } | null> {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
    );

    if (!response.ok) return null;

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      return null;
    }

    const result = data.results[0];
    return {
      latitude: result.latitude,
      longitude: result.longitude,
    };
  } catch {
    return null;
  }
}

export const getWeatherUI = tool({
  description:
    "Get the current weather at a location. You can provide either coordinates or a city name.",
  inputSchema: z.object({
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    city: z
      .string()
      .describe("City name (e.g., 'San Francisco', 'New York', 'London')")
      .optional(),
  }),
  async *generate(input) {
    // Show loading state
    yield (
      <div className="relative flex w-full flex-col gap-4 rounded-3xl bg-gradient-to-br from-sky-400 via-blue-500 to-blue-600 p-6 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 animate-pulse rounded-full bg-white/30" />
          <div className="flex-1">
            <div className="mb-2 h-6 w-32 animate-pulse rounded bg-white/30" />
            <div className="h-4 w-48 animate-pulse rounded bg-white/20" />
          </div>
        </div>
        <div className="h-24 animate-pulse rounded-xl bg-white/20" />
        <p className="text-center text-sm text-white/80">
          Loading weather for {input.city || "location"}...
        </p>
      </div>
    );

    let latitude: number;
    let longitude: number;

    // Geocode city if provided
    if (input.city) {
      const coords = await geocodeCity(input.city);
      if (!coords) {
        return (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400">
            Could not find coordinates for "{input.city}". Please check the city
            name.
          </div>
        );
      }
      latitude = coords.latitude;
      longitude = coords.longitude;
    } else if (input.latitude !== undefined && input.longitude !== undefined) {
      latitude = input.latitude;
      longitude = input.longitude;
    } else {
      return (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-700 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-400">
          Please provide either a city name or both latitude and longitude
          coordinates.
        </div>
      );
    }

    // Fetch weather data
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m&daily=sunrise,sunset&timezone=auto`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const weatherData = await response.json();

      if (input.city) {
        weatherData.cityName = input.city;
      }

      // Return the Weather component with data
      return <Weather weatherAtLocation={weatherData} />;
    } catch (error) {
      return (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400">
          Failed to fetch weather data. Please try again later.
        </div>
      );
    }
  },
});
