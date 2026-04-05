/**
 * SEO component
 *
 * Renders per-page <title>, <meta description>, Open Graph, Twitter Card,
 * and canonical tags using react-helmet-async.
 *
 * Usage:
 *   <SEO
 *     title="Services | Coast to Coast Marine Transportation Thailand"
 *     description="..."
 *     path="/services"
 *   />
 */

import { Helmet } from "react-helmet-async";

const SITE_NAME = "Coast to Coast Marine Transportation Thailand";
const BASE_URL  = "https://www.coasttocoastmarinetransportationthailand.com";
// A hosted OG image — use the logo mark as a reliable fallback
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;

interface SEOProps {
  /** Full page title — will be shown in browser tab and Google results */
  title: string;
  /** 150–160 character description for Google and social previews */
  description: string;
  /** URL path for this page, e.g. "/services" */
  path: string;
  /** Optional override for OG image */
  image?: string;
}

export default function SEO({ title, description, path, image }: SEOProps) {
  const canonical = `${BASE_URL}${path}`;
  const ogImage   = image ?? DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      {/* ── Primary ── */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* ── Open Graph (Facebook, LINE, WhatsApp, iMessage) ── */}
      <meta property="og:type"        content="website" />
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:title"       content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url"         content={canonical} />
      <meta property="og:image"       content={ogImage} />
      <meta property="og:image:width"  content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale"      content="en_TH" />

      {/* ── Twitter / X Card ── */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={ogImage} />
    </Helmet>
  );
}
