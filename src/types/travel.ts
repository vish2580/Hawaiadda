import type { LucideIcon } from "lucide-react";

export type TravelServiceId =
  | "flights"
  | "hotels"
  | "trains"
  | "buses"
  | "cabs"
  | "packages"
  | "flights-trains"
  | "hotels-resorts"
  | "tours"
  | "transportation"
  | "honeymoon"
  | "group-corporate"
  | "family-corporate";
export type FlightTripMode = "round-trip" | "one-way" | "multi-city";
export type CabinClass = "Economy" | "Premium economy" | "Business" | "First";
export type CurrencyCode = "INR";

export type MediaAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  focalPoint?: string;
};

export type TravelService = {
  id: TravelServiceId;
  label: string;
  summary: string;
  href: string;
  icon: LucideIcon;
};

export type Destination = {
  id: string;
  city: string;
  country: string;
  region: string;
  image: MediaAsset;
  temperature: string;
  startingPrice: number;
  currency: CurrencyCode;
  travelDuration: string;
  coordinates: [number, number];
  note: string;
};

export type Mood = {
  id: string;
  label: string;
  prompt: string;
  description: string;
  destinationIds: string[];
  icon: LucideIcon;
};

export type Deal = {
  id: string;
  title: string;
  route: string;
  kind: string;
  price: number;
  currency: CurrencyCode;
  qualifier: string;
  note: string;
  image: MediaAsset;
};

export type Hotel = {
  id: string;
  name: string;
  location: string;
  character: string;
  price: number;
  currency: CurrencyCode;
  qualifier: string;
  image: MediaAsset;
};

export type HolidayPackage = {
  id: string;
  title: string;
  place: string;
  image: MediaAsset;
  days: number;
  pace: string;
  price: number;
  currency: CurrencyCode;
  inclusions: string[];
  description: string;
};

export type TravelStory = {
  id: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  image: MediaAsset;
};

export type JourneyStage = {
  id: string;
  label: string;
  href: string;
};

export type SearchInput = {
  service: TravelServiceId;
  tripMode: FlightTripMode;
  from: string;
  to: string;
  departure: string;
  returnDate?: string;
  travellers: number;
  cabinClass: CabinClass;
};

export type SearchAcknowledgement = {
  requestId: string;
  status: "demo-only";
  message: string;
};

export type AssistantMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};
