import {
  BedDouble,
  CarFront,
  Coffee,
  Compass,
  Heart,
  Mountain,
  Palmtree,
  Plane,
  Sparkles,
  Utensils,
} from "lucide-react";
import { images } from "@/data/images";
import type {
  Deal,
  Destination,
  HolidayPackage,
  Hotel,
  JourneyStage,
  Mood,
  TravelService,
  TravelStory,
} from "@/types/travel";

export const travelServices: TravelService[] = [
  { id: "flights-trains", label: "Flights & Train Bookings", summary: "Travel arrangements made simple.", href: "#enquiry", icon: Plane },
  { id: "hotels-resorts", label: "Hotels & Resorts", summary: "Stay options based on your preferences and budget.", href: "#enquiry", icon: BedDouble },
  { id: "tours", label: "Domestic & International Tours", summary: "Explore India and destinations around the world.", href: "#destinations", icon: Compass },
  { id: "transportation", label: "Transportation", summary: "Cabs, transfers and local travel coordination.", href: "#enquiry", icon: CarFront },
  { id: "honeymoon", label: "Honeymoon & Couple Trips", summary: "Trips planned around your special moments.", href: "#enquiry", icon: Heart },
  { id: "group-corporate", label: "Family, Group & Corporate Travel", summary: "Travel solutions for every kind of traveller.", href: "#enquiry", icon: Sparkles },
];

export const destinations: Destination[] = [
  { id: "sikkim", city: "Sikkim", country: "India", region: "Himalayas", image: images.destinations.sikkim, temperature: "10–20°C", startingPrice: 14999, currency: "INR", travelDuration: "3h from Bagdogra", coordinates: [27.53, 88.51], note: "Gangtok, Tsomgo Lake, Lachung & Yumthang Valley." },
  { id: "darjeeling", city: "Darjeeling", country: "India", region: "West Bengal", image: images.destinations.darjeeling, temperature: "12–19°C", startingPrice: 9999, currency: "INR", travelDuration: "2.5h from Siliguri", coordinates: [27.04, 88.26], note: "Queen of the Hills, tea gardens & sunrise over Kanchenjunga." },
  { id: "bhutan", city: "Bhutan", country: "Bhutan", region: "Eastern Himalayas", image: images.destinations.bhutan, temperature: "14–22°C", startingPrice: 28999, currency: "INR", travelDuration: "4h from Phuentsholing", coordinates: [27.51, 89.63], note: "Tiger's Nest, Paro, Thimphu and serene Dzong architecture." },
  { id: "nepal", city: "Nepal", country: "Nepal", region: "Himalayan Kingdom", image: images.destinations.nepal, temperature: "15–25°C", startingPrice: 19999, currency: "INR", travelDuration: "1h flight from Delhi/Kolkata", coordinates: [27.71, 85.32], note: "Kathmandu Valley, Pokhara lakes & panoramic mountain vistas." },
  { id: "kashmir", city: "Kashmir", country: "India", region: "Paradise on Earth", image: images.destinations.kashmir, temperature: "8–18°C", startingPrice: 21999, currency: "INR", travelDuration: "Direct flight to Srinagar", coordinates: [34.08, 74.79], note: "Shikara rides on Dal Lake, Gulmarg gondola & Pahalgam meadows." },
  { id: "thailand", city: "Thailand", country: "Thailand", region: "Southeast Asia", image: images.destinations.thailand, temperature: "28–34°C", startingPrice: 34999, currency: "INR", travelDuration: "3.5h flight from Kolkata", coordinates: [13.75, 100.50], note: "Bangkok city vibrancy, Phuket beaches & Phi Phi island tours." },
  { id: "vietnam", city: "Vietnam", country: "Vietnam", region: "Southeast Asia", image: images.destinations.vietnam, temperature: "22–30°C", startingPrice: 39999, currency: "INR", travelDuration: "4h flight from Kolkata", coordinates: [21.02, 105.83], note: "Ha Long Bay cruise, Da Nang Golden Bridge & lantern-lit Hoi An." },
  { id: "bali", city: "Bali", country: "Indonesia", region: "Island Life", image: images.destinations.bali, temperature: "27°C", startingPrice: 42999, currency: "INR", travelDuration: "7h from India", coordinates: [-8.34, 115.09], note: "The island where mornings feel slower, beaches and temples." },
  { id: "maldives", city: "Maldives", country: "Maldives", region: "Indian Ocean", image: images.destinations.maldives, temperature: "29°C", startingPrice: 49999, currency: "INR", travelDuration: "2h 45m from India", coordinates: [3.2, 73.22], note: "Overwater bungalows, turquoise waters and ultimate relaxation." },
  { id: "dubai", city: "Dubai", country: "UAE", region: "Middle East", image: images.destinations.dubai, temperature: "32°C", startingPrice: 36999, currency: "INR", travelDuration: "3h 30m flight", coordinates: [25.2, 55.27], note: "Burj Khalifa, desert safari, luxury shopping & world-class theme parks." },
];

export const whyUsPoints = [
  {
    number: "01",
    title: "Flexible Planning",
    description: "Travel plans built around you.",
    icon: Compass,
    highlight: "100% Customized"
  },
  {
    number: "02",
    title: "Personalised Assistance",
    description: "A travel expert to guide you through the process.",
    icon: Heart,
    highlight: "1-on-1 Dedicated Support"
  },
  {
    number: "03",
    title: "Competitive Pricing",
    description: "Options that fit your requirements and budget.",
    icon: Sparkles,
    highlight: "Best Value Guaranteed"
  },
  {
    number: "04",
    title: "End-to-End Coordination",
    description: "Hotels, transportation and travel bookings handled together.",
    icon: CarFront,
    highlight: "Hassle-Free Logistics"
  },
  {
    number: "05",
    title: "Experienced Travel Team",
    description: "Practical guidance from planning to booking.",
    icon: Mountain,
    highlight: "Local & Global Expertise"
  },
];

export const howItWorksSteps = [
  {
    step: "01",
    title: "Share Your Details",
    description: "Tell us your destination, dates and number of travellers.",
    icon: Compass,
  },
  {
    step: "02",
    title: "Talk to Our Expert",
    description: "We’ll understand your requirements and preferences.",
    icon: Heart,
  },
  {
    step: "03",
    title: "Plan & Book",
    description: "We arrange the right travel, stay and transportation options.",
    icon: BedDouble,
  },
  {
    step: "04",
    title: "Travel",
    description: "You enjoy the journey while we help coordinate the details.",
    icon: Plane,
  },
];

export const moods: Mood[] = [
  { id: "slow", label: "Relaxation", prompt: "I want nowhere to rush to", description: "Long breakfasts, one good base and days with breathing room.", destinationIds: ["bali", "maldives"], icon: Coffee },
  { id: "wild", label: "Mountains", prompt: "I want the landscape to lead", description: "High roads, open water and a little useful uncertainty.", destinationIds: ["leh", "zanzibar"], icon: Mountain },
  { id: "together", label: "Romantic", prompt: "I want time that feels shared", description: "Private corners, beautiful meals and very few logistics.", destinationIds: ["jaipur", "kyoto"], icon: Heart },
  { id: "taste", label: "Food", prompt: "I travel table first", description: "Markets at dawn, neighbourhood kitchens and stories served slowly.", destinationIds: ["jaipur", "kyoto"], icon: Utensils },
  { id: "sun", label: "Beach", prompt: "I need salt air and bare feet", description: "Warm water, quiet shores and afternoons without an agenda.", destinationIds: ["maldives", "bali"], icon: Palmtree },
  { id: "wonder", label: "Adventure", prompt: "Show me what I would not pick", description: "An unexpected pairing built around your pace, not a trend.", destinationIds: ["leh", "jaipur"], icon: Sparkles },
];

export const deals: Deal[] = [
  { id: "goa-weekday", title: "Trade the weekend for the tide", route: "Delhi → Goa", kind: "Return flight idea", price: 7890, currency: "INR", qualifier: "indicative return fare", note: "Midweek departures often open up calmer beaches and better-value stays.", image: images.deals.goa },
  { id: "dubai-stopover", title: "Make the connection the trip", route: "Mumbai → Dubai", kind: "Flight + 3-night stay idea", price: 42800, currency: "INR", qualifier: "indicative per person", note: "A compact city break designed around an onward journey.", image: images.deals.dubai },
  { id: "udaipur-stay", title: "A longer lake-side pause", route: "Udaipur", kind: "4-night stay idea", price: 31600, currency: "INR", qualifier: "indicative for two", note: "Stay an extra night and let the old city unfold beyond the palace circuit.", image: images.deals.udaipur },
];

export const hotels: Hotel[] = [
  { id: "raas-devigarh", name: "The quiet fort", location: "Delwara, Rajasthan", character: "Heritage, restored with restraint", price: 24500, currency: "INR", qualifier: "indicative per night", image: images.hotels.fort },
  { id: "marari-coast", name: "The sea-facing hideaway", location: "Marari, Kerala", character: "Low-key coastal living", price: 16800, currency: "INR", qualifier: "indicative per night", image: images.hotels.coast },
  { id: "kumaon-lodge", name: "The forest room", location: "Kumaon, Uttarakhand", character: "Remote, warm and deliberately small", price: 13200, currency: "INR", qualifier: "indicative per night", image: images.hotels.forest },
];

export const holidayPackages: HolidayPackage[] = [
  { id: "spiti", title: "The road above the clouds", place: "Spiti Valley", image: images.packages.spiti, days: 9, pace: "Slow overland", price: 58900, currency: "INR", inclusions: ["Stays", "Road transfers", "Local host"], description: "A measured route through cold desert villages, family kitchens and old Buddhist valleys." },
  { id: "kerala", title: "Monsoon, at its own pace", place: "Kerala", image: images.packages.kerala, days: 7, pace: "Unhurried", price: 46700, currency: "INR", inclusions: ["Stays", "Breakfasts", "Private transfers"], description: "Rain-washed plantations, quiet backwaters and a final long lunch beside the Arabian Sea." },
  { id: "morocco", title: "Between medina and desert", place: "Morocco", image: images.packages.morocco, days: 11, pace: "Immersive", price: 128000, currency: "INR", inclusions: ["Stays", "Selected meals", "Guided days"], description: "Courtyard mornings in Fez, Atlas trails, then a night beneath an open Saharan sky." },
];

export const travelStories: TravelStory[] = [
  { id: "city-by-table", title: "How to understand a city by its breakfast", category: "Food trails", readTime: "6 min read", excerpt: "Start before the shutters rise. Three travellers share the morning rituals that made a place click.", image: images.stories.food },
  { id: "night-train", title: "In defence of the night train", category: "Ways to go", readTime: "8 min read", excerpt: "A moving room, an unhurried border and the peculiar intimacy of waking somewhere new.", image: images.stories.train },
  { id: "altitude", title: "What the mountains ask of your itinerary", category: "Field notes", readTime: "5 min read", excerpt: "Why acclimatisation is not empty time, and how a slower first day changes the whole journey.", image: images.stories.mountains },
];

export const journeyStages: JourneyStage[] = [
  { id: "imagine", label: "Imagine", href: "#escape" },
  { id: "discover", label: "Discover", href: "#discover" },
  { id: "shape", label: "Shape", href: "#personalized" },
  { id: "go", label: "Go", href: "#plan" },
];

export const discoverySuggestions = [
  { label: "Somewhere cool in May", value: "Leh" },
  { label: "A long food weekend", value: "Jaipur" },
  { label: "Quiet beaches, not beach clubs", value: "Zanzibar" },
  { label: "Autumn with good trains", value: "Kyoto" },
] as const;
