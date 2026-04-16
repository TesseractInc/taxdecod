type SnippetBlockProps = {
  question: string;
  answer: string;
  bullets?: string[];
};

export default function SnippetBlock({
  question,
  answer,
  bullets,
}: SnippetBlockProps) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold app-title">{question}</h2>

      <p className="mt-3 app-copy">{answer}</p>

      {bullets && bullets.length > 0 ? (
        <ul className="mt-4 space-y-2 app-copy">
          {bullets.map((bullet) => (
            <li key={bullet}>• {bullet}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}