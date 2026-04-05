import type { Metadata } from "next";

const SITE_NAME = "TaxDecod";
const BASE_URL = "https://taxdecod.com";

type SeoMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function buildSeoMetadata({
  title,
  description,
  path,
}: SeoMetadataInput): Metadata {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${BASE_URL}${normalizedPath}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_GB",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}