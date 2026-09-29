import { destinations, holidayPackages, travelStories } from "@/data/travel-content";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TravelAgency",
      name: "Dream Hawai Adda",
      description: "Premier travel agency and tour operator in Siliguri, West Bengal helping you plan and book domestic and international journeys.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Siliguri",
        addressRegion: "West Bengal",
        addressCountry: "IN"
      },
      inLanguage: "en-IN",
    },
    {
      "@type": "ItemList",
      name: "Featured destinations",
      itemListElement: destinations.map((destination, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: { "@type": "Place", name: `${destination.city}, ${destination.country}`, description: destination.note },
      })),
    },
    {
      "@type": "ItemList",
      name: "Holiday route ideas",
      itemListElement: holidayPackages.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: { "@type": "TouristTrip", name: item.title, description: item.description, touristType: "Leisure traveller" },
      })),
    },
    ...travelStories.map((story) => ({ "@type": "Article", headline: story.title, description: story.excerpt, image: story.image.src })),
  ],
};

export function StructuredData() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />;
}
