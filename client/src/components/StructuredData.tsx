/**
 * StructuredData
 *
 * Injects JSON-LD structured data into the page <head> for Google.
 * Renders:
 *   - LocalBusiness schema (tells Google what the business is, where, contact)
 *   - Service schema (describes the core vessel relocation service)
 *
 * This is invisible to visitors but significantly improves how Google
 * understands and displays the business in search results.
 */

import { Helmet } from "react-helmet-async";

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://coasttocoast-thailand.com/#business",
  "name": "Coast to Coast Marine Transportation Thailand",
  "alternateName": "Coast to Coast Marine Transportation",
  "description":
    "Thailand's specialist in safe, professional oversized vessel relocation between the Gulf of Thailand and the Andaman Sea. A subsidiary of Phuket Marine Oracle Co., Ltd.",
  "url": "https://coasttocoast-thailand.com",
  "logo": "https://coasttocoast-thailand.com/logo-mark-v4.png",
  "image": "https://coasttocoast-thailand.com/og-image.jpg",
  "email": "brentmcinnes000@gmail.com",
  "parentOrganization": {
    "@type": "Organization",
    "name": "Phuket Marine Oracle Co., Ltd.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Phuket",
      "addressCountry": "TH",
    },
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Phuket",
    "addressRegion": "Phuket Province",
    "addressCountry": "TH",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 7.8804,
    "longitude": 98.3923,
  },
  "areaServed": [
    {
      "@type": "Place",
      "name": "Gulf of Thailand",
    },
    {
      "@type": "Place",
      "name": "Andaman Sea",
    },
    {
      "@type": "City",
      "name": "Phuket",
    },
    {
      "@type": "City",
      "name": "Pattaya",
    },
    {
      "@type": "City",
      "name": "Bangkok",
    },
  ],
  "priceRange": "$$",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
    ],
    "opens": "08:00",
    "closes": "18:00",
  },
  "sameAs": [
    "https://www.youtube.com/shorts/8_Vxj5agMEA",
  ],
};

const service = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Vessel Relocation — Gulf of Thailand to Andaman Sea",
  "description":
    "Professional overland marine transport of powerboats, keel yachts and catamarans between Thailand's Gulf and Andaman coasts. Crane out at Chumphon, 80 km overland land bridge to Ranong, crane in to the Andaman Sea. Vessels up to 15 m length, 5.5 m beam, 32 tonnes. Under 7 days door to door.",
  "provider": {
    "@type": "LocalBusiness",
    "@id": "https://coasttocoast-thailand.com/#business",
  },
  "areaServed": {
    "@type": "Country",
    "name": "Thailand",
  },
  "serviceType": "Marine Vessel Transport",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "THB",
    "availability": "https://schema.org/InStock",
    "url": "https://coasttocoast-thailand.com/contact",
  },
};

const faqPage = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How long does it take to transport a vessel from Pattaya to Phuket?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The full door-to-door journey from Pattaya to Phuket takes under 7 days, adding approximately 50 engine hours to your vessel's log — compared to 12+ days and 500+ engine hours via the traditional open-ocean route.",
      },
    },
    {
      "@type": "Question",
      "name": "What types of vessels can you transport?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We transport powerboats, keel yachts, and catamarans up to 15 metres in length, 5.5 metres beam, 5.5 metres height, and 32 tonnes in weight.",
      },
    },
    {
      "@type": "Question",
      "name": "Do you transport vessels in both directions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We operate in both directions — Gulf of Thailand to Andaman Sea, and Andaman Sea to Gulf of Thailand. Routes include Pattaya to Phuket, Phuket to Pattaya, Bangkok to Phuket, and Phuket to Bangkok.",
      },
    },
    {
      "@type": "Question",
      "name": "What is the overland land bridge route?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vessels are craned out of the water at Chumphon on the Gulf coast, loaded onto a specialist low-deck trailer with a custom-fabricated transit cradle, and transported 80 km overland across the Kra Isthmus to Ranong, where a 100-tonne crane relaunches them into the Andaman Sea.",
      },
    },
  ],
};

export default function StructuredData() {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(localBusiness)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(service)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqPage)}
      </script>
    </Helmet>
  );
}
