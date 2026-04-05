type SeoRealityCardProps = {
  label?: string;
  children: React.ReactNode;
};

export default function SeoRealityCard({
  label = "Salary reality",
  children,
}: SeoRealityCardProps) {
  return (
    <section className="app-card rounded-[28px] p-6">
      <p className="text-sm app-subtle">{label}</p>
      <div className="mt-3 text-lg leading-8 app-copy">{children}</div>
    </section>
  );
}