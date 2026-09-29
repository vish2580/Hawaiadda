import type { MediaAsset } from "@/types/travel";

const unsplash = (id: string, width = 1800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;

// One controlled inventory for prototype media. Replace at this boundary with owned/CDN assets.
export const images = {
  hero: { src: unsplash("photo-1573790387438-4da905039392", 2400), alt: "Dramatic green cliffs above turquoise ocean in Bali", width: 2400, height: 1600 },
  destinations: {
    sikkim: { src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1800&q=82", alt: "Majestic snow-capped peaks of Kanchenjunga in Sikkim", width: 1800, height: 1200, focalPoint: "center" },
    darjeeling: { src: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1800&q=82", alt: "Lush green tea gardens and mountain slopes in Darjeeling", width: 1800, height: 1200, focalPoint: "center" },
    bhutan: { src: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1800&q=82", alt: "Iconic cliffside Tiger's Nest monastery in Bhutan", width: 1800, height: 1200, focalPoint: "center" },
    nepal: { src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1800&q=82", alt: "Himalayan range and tranquil valleys of Nepal", width: 1800, height: 1200, focalPoint: "center" },
    kashmir: { src: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1800&q=82", alt: "Traditional Shikara on Dal Lake in Srinagar, Kashmir with snow-capped mountain backdrop", width: 1800, height: 1200, focalPoint: "center" },
    thailand: { src: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1800&q=82", alt: "Emerald waters and limestone cliffs of Thailand", width: 1800, height: 1200, focalPoint: "center" },
    vietnam: { src: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1800&q=82", alt: "Breathtaking seascape of Ha Long Bay in Vietnam", width: 1800, height: 1200, focalPoint: "center" },
    bali: { src: unsplash("photo-1537996194471-e657df975ab4"), alt: "Bali temple surrounded by tropical water and mountains", width: 1800, height: 1200 },
    maldives: { src: unsplash("photo-1514282401047-d79a71a590e8"), alt: "A tropical island surrounded by the turquoise waters of the Maldives", width: 1800, height: 1200 },
    dubai: { src: unsplash("photo-1512453979798-5ea266f8880c"), alt: "Dubai skyline across the water at dusk", width: 1800, height: 1200 },
    leh: { src: unsplash("photo-1605649487212-47bdab064df7"), alt: "A mountain road winding through the high desert near Leh", width: 1800, height: 1200, focalPoint: "center" },
    jaipur: { src: unsplash("photo-1599661046289-e31897846e41"), alt: "Ornate rose-coloured architecture in Jaipur", width: 1800, height: 1200, focalPoint: "center" },
    kyoto: { src: unsplash("photo-1493976040374-85c8e12f0c0e"), alt: "A quiet traditional street in Kyoto", width: 1800, height: 1200, focalPoint: "center" },
    zanzibar: { src: unsplash("photo-1586861635167-e5223aadc9fe"), alt: "Turquoise water meeting the shore in Zanzibar", width: 1800, height: 1200, focalPoint: "center" },
  },
  deals: {
    goa: { src: unsplash("photo-1512343879784-a960bf40e7f2"), alt: "A palm-lined beach in Goa", width: 1600, height: 1200 },
    dubai: { src: unsplash("photo-1512453979798-5ea266f8880c"), alt: "Dubai skyline seen across the water", width: 1600, height: 1200 },
    udaipur: { src: unsplash("photo-1595658658481-d53d3f999875"), alt: "A lakeside palace in Udaipur", width: 1600, height: 1200 },
  },
  hotels: {
    fort: { src: unsplash("photo-1564501049412-61c2a3083791"), alt: "A heritage hotel courtyard glowing at dusk", width: 1800, height: 1200 },
    coast: { src: unsplash("photo-1582719478250-c89cae4dc85b"), alt: "A calm coastal hotel room opening to the sea", width: 1800, height: 1200 },
    forest: { src: unsplash("photo-1510798831971-661eb04b3739"), alt: "A secluded lodge surrounded by forest", width: 1800, height: 1200 },
  },
  packages: {
    spiti: { src: unsplash("photo-1626015365107-35a15e2a7c09"), alt: "Cold desert mountains in Spiti Valley", width: 1800, height: 1200 },
    kerala: { src: unsplash("photo-1602216056096-3b40cc0c9944"), alt: "A houseboat moving through Kerala backwaters", width: 1800, height: 1200 },
    morocco: { src: unsplash("photo-1489749798305-4fea3ae63d43"), alt: "Sunlit earth-toned architecture in Morocco", width: 1800, height: 1200 },
  },
  stories: {
    food: { src: unsplash("photo-1504674900247-0877df9cc836"), alt: "A shared table filled with regional dishes", width: 1400, height: 1000 },
    train: { src: unsplash("photo-1473445361085-b9a07f55608b"), alt: "A train passing through a wide landscape", width: 1400, height: 1000 },
    mountains: { src: unsplash("photo-1464822759023-fed622ff2c3b"), alt: "Mountain ridges fading into the distance", width: 1400, height: 1000 },
  },
  personalized: { src: unsplash("photo-1519671282429-b44660ead0a7", 2000), alt: "A road leading toward distant mountains at dusk", width: 2000, height: 1300 },
  social: { src: unsplash("photo-1519671282429-b44660ead0a7", 1200), alt: "A distant mountain road", width: 1200, height: 630 },
} satisfies Record<string, MediaAsset | Record<string, MediaAsset>>;
