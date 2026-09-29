// Backward-compatible exports for the original globe and legacy narrative modules.
// New homepage sections import from travel-content directly.
import { destinations as structuredDestinations, holidayPackages, journeyStages } from "@/data/travel-content";

export const destinations = structuredDestinations.map((item) => ({
  ...item,
  image: item.image.src,
  fare: new Intl.NumberFormat("en-IN", { style: "currency", currency: item.currency, maximumFractionDigits: 0 }).format(item.startingPrice),
  duration: item.travelDuration,
}));

export const journeys = holidayPackages.map((item) => ({ ...item, image: item.image.src }));

// Verifiable product-state signals rather than customer or partner claims.
export const travelSignals = [
  { value: String(journeyStages.length), label: "clear stages from inspiration to a useful hand-off" },
  { value: "6", label: "travel services represented in one planning surface" },
  { value: "0", label: "invented live results shown in this product preview" },
];
