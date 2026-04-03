"use client";

import { jsPDF } from "jspdf";
import { Download } from "lucide-react";
import { CalculatorInput, TakeHomeResult } from "../../types/tax";
import { calculateSalaryScore } from "../../lib/tax/explanations/salary-score";
import { getSalaryLeaderboard } from "../../lib/tax/explanations/salary-leaderboard";
import { getUnderpaidDetector } from "../../lib/tax/explanations/underpaid-detector";

type DownloadReportButtonProps = {
  values: CalculatorInput;
  result: TakeHomeResult;
  filename?: string;
};

function currency(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function DownloadReportButton({
  values,
  result,
  filename = "taxdecod-salary-report.pdf",
}: DownloadReportButtonProps) {
  const handleDownload = () => {
    const doc = new jsPDF({
      unit: "pt",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const colors = {
      ink: "#0f172a",
      muted: "#64748b",
      line: "#dbe7f3",
      sky: "#0ea5e9",
      skyDark: "#0369a1",
      emerald: "#059669",
      rose: "#e11d48",
      amber: "#d97706",
      soft: "#f7fbff",
      white: "#ffffff",
    };

    const score = calculateSalaryScore(result);
    const leaderboard = getSalaryLeaderboard(result);
    const underpaid = getUnderpaidDetector(values, result);

    let y = 145;

    const addHeader = () => {
      doc.setFillColor(colors.sky);
      doc.rect(0, 0, pageWidth, 112, "F");

      doc.setTextColor(colors.white);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(24);
      doc.text("TaxDecod Salary Report", 48, 48);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.text("Decode your salary. Understand every deduction.", 48, 70);

      doc.setDrawColor(255, 255, 255);
      doc.setLineWidth(0.5);
      doc.line(48, 84, pageWidth - 48, 84);

      doc.setFontSize(10);
      doc.text(
        `Generated for ${currency(result.grossAnnual)} salary • Tax code ${values.taxCode || "—"}`,
        48,
        100
      );

      y = 145;
    };

    const addFooter = () => {
      doc.setDrawColor(colors.line);
      doc.line(48, pageHeight - 50, pageWidth - 48, pageHeight - 50);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(colors.muted);
      doc.text(
        "TaxDecod • UK salary intelligence report • Estimates may vary from your actual payslip.",
        48,
        pageHeight - 32
      );
    };

    const ensureSpace = (needed: number) => {
      if (y + needed > pageHeight - 70) {
        addFooter();
        doc.addPage();
        addHeader();
      }
    };

    const addSectionTitle = (title: string, subtitle?: string) => {
      ensureSpace(42);

      doc.setTextColor(colors.ink);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text(title, 48, y);

      if (subtitle) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(colors.muted);
        doc.text(subtitle, 48, y + 16);
        y += 34;
      } else {
        y += 24;
      }
    };

    const addMetricRow = (
      label: string,
      value: string,
      tone: "default" | "positive" | "negative" | "accent" = "default"
    ) => {
      ensureSpace(44);

      const color =
        tone === "positive"
          ? colors.emerald
          : tone === "negative"
          ? colors.rose
          : tone === "accent"
          ? colors.skyDark
          : colors.ink;

      doc.setDrawColor(colors.line);
      doc.setFillColor(colors.soft);
      doc.roundedRect(48, y, pageWidth - 96, 34, 10, 10, "FD");

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(colors.muted);
      doc.text(label, 64, y + 21);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(color);
      const valueWidth = doc.getTextWidth(value);
      doc.text(value, pageWidth - 64 - valueWidth, y + 21);

      y += 44;
    };

    const addParagraph = (text: string) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10.5);
      doc.setTextColor(colors.muted);

      const lines = doc.splitTextToSize(text, pageWidth - 96);
      ensureSpace(lines.length * 15 + 12);

      doc.text(lines, 48, y);
      y += lines.length * 15 + 10;
    };

    const addBadgeRow = (label: string, value: string, color: string) => {
      const wrapped = doc.splitTextToSize(value, 260);
      const badgeHeight = Math.max(32, wrapped.length * 14 + 16);

      ensureSpace(badgeHeight + 12);

      doc.setFillColor(color);
      doc.roundedRect(48, y, 160, badgeHeight, 10, 10, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(colors.white);
      doc.text(label, 62, y + 20);

      doc.setTextColor(colors.ink);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text(wrapped, 220, y + 20);

      y += badgeHeight + 14;
    };

    addHeader();

    addSectionTitle("Salary snapshot", "Your core salary result at a glance");
    addMetricRow("Gross annual salary", currency(result.grossAnnual));
    addMetricRow("Estimated net annual pay", currency(result.netAnnual), "positive");
    addMetricRow("Estimated net monthly pay", currency(result.netMonthly), "positive");
    addMetricRow("Total deductions", currency(result.totalDeductionsAnnual), "negative");

    addSectionTitle("Deduction breakdown");
    addMetricRow("Income Tax", currency(result.incomeTaxAnnual), "accent");
    addMetricRow("National Insurance", currency(result.nationalInsuranceAnnual), "accent");
    addMetricRow("Pension", currency(result.pensionAnnual));
    addMetricRow("Student Loan", currency(result.studentLoanAnnual));

    addSectionTitle("Salary Reality Score");
    addBadgeRow("Reality score", `${score.score}/100`, colors.skyDark);
    addParagraph(`${score.label}: ${score.message}`);

    addSectionTitle("Leaderboard signal");
    addBadgeRow("Salary band", leaderboard.band, colors.emerald);
    addParagraph(leaderboard.summary);

    addSectionTitle("Under-pressure signal");
    addBadgeRow(
      "Current signal",
      underpaid.title,
      underpaid.status === "solid"
        ? colors.emerald
        : underpaid.status === "borderline"
        ? colors.amber
        : colors.rose
    );
    addParagraph(underpaid.summary);

    if (underpaid.points.length > 0) {
      addSectionTitle("Why this may feel true");
      underpaid.points.slice(0, 4).forEach((point) => addParagraph(`• ${point}`));
    }

    addSectionTitle("Reference setup");
    addMetricRow("Tax code", values.taxCode || "—");
    addMetricRow("Region", values.region === "scotland" ? "Scotland" : "England / Wales / NI");
    addMetricRow("Pension contribution", `${values.pensionPercent}%`);
    addMetricRow(
      "Student loan plan",
      values.studentLoanPlan === "none" ? "No student loan" : values.studentLoanPlan.toUpperCase()
    );

    addFooter();
    doc.save(filename);
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium text-white hover-lift"
      style={{
        background:
          "linear-gradient(135deg, var(--primary-2) 0%, var(--primary) 100%)",
      }}
    >
      <Download className="h-4 w-4" />
      Download PDF report
    </button>
  );
}