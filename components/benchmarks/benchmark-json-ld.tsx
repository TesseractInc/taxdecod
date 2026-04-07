type BenchmarkJsonLdProps = {
  title: string;
  description: string;
  url: string;
};

export default function BenchmarkJsonLd({
  title,
  description,
  url,
}: BenchmarkJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}