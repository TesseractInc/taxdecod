type SnippetAnswerBlockProps = {
  question: string;
  answer: string;
  bullets?: string[];
};

export default function SnippetAnswerBlock({
  question,
  answer,
  bullets = [],
}: SnippetAnswerBlockProps) {
  const safeBullets = bullets.filter(Boolean).slice(0, 6);

  return (
    <section
      className="mt-10 rounded-[28px] border px-6 py-6"
      style={{
        borderColor: "var(--line)",
        background: "var(--card-strong)",
      }}
    >
      <p className="text-sm font-medium app-accent">Quick answer</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight app-title">
        {question}
      </h2>
      <p className="mt-4 text-sm leading-8 app-copy sm:text-base">{answer}</p>

      {safeBullets.length > 0 ? (
        <ul className="mt-5 space-y-2 text-sm leading-8 app-copy sm:text-base">
          {safeBullets.map((bullet) => (
            <li key={bullet}>• {bullet}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}