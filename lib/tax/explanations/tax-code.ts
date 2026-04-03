type TaxCodeInsight = {
  title: string;
  status: "normal" | "warning" | "alert";
  summary: string;
  details: string;
};

export function getTaxCodeInsight(rawTaxCode: string): TaxCodeInsight {
  const taxCode = rawTaxCode.trim().toUpperCase();

  if (!taxCode) {
    return {
      title: "No tax code entered",
      status: "warning",
      summary: "Add your tax code to get a more useful payslip explanation.",
      details:
        "A tax code helps determine how much tax-free income you receive and how PAYE is applied to your salary.",
    };
  }

  if (taxCode === "1257L") {
    return {
      title: "Standard UK tax code",
      status: "normal",
      summary:
        "1257L is the most common tax code and usually means you are receiving the standard Personal Allowance.",
      details:
        "This normally means you can earn the usual tax-free allowance before Income Tax starts being deducted. For many employees, this is the expected code.",
    };
  }

  if (taxCode === "BR") {
    return {
      title: "Basic Rate tax code",
      status: "warning",
      summary:
        "BR usually means all income from this job is being taxed at the basic rate, with no Personal Allowance applied here.",
      details:
        "This can happen with a second job or if HMRC has not assigned your allowance to this employment. If this is your only job, it may be worth checking.",
    };
  }

  if (taxCode === "D0") {
    return {
      title: "Higher Rate tax code",
      status: "warning",
      summary:
        "D0 usually means all income from this job is being taxed at the higher rate.",
      details:
        "This can be correct in some cases, especially for additional income sources, but it can also lead to surprisingly high deductions if applied unexpectedly.",
    };
  }

  if (taxCode === "D1") {
    return {
      title: "Additional Rate tax code",
      status: "alert",
      summary:
        "D1 usually means all income from this job is being taxed at the additional rate.",
      details:
        "This is uncommon for most users and can create very high deductions. If this is unexpected, your tax code should be reviewed carefully.",
    };
  }

  if (taxCode === "0T") {
    return {
      title: "No allowance tax code",
      status: "warning",
      summary:
        "0T usually means no Personal Allowance is being applied to this pay.",
      details:
        "This can happen when HMRC does not yet have full details or when temporary PAYE treatment is being used. It can result in more tax being deducted than expected.",
    };
  }

  if (taxCode.startsWith("K")) {
    return {
      title: "K tax code detected",
      status: "alert",
      summary:
        "A K tax code usually means deductions are being increased because tax is being collected for benefits, unpaid tax from previous years, or other adjustments.",
      details:
        "This can make payslips look unusually harsh. It does not always mean something is wrong, but it is definitely a code users usually want explained properly.",
    };
  }

  if (/^\d{3,4}[A-Z]+$/.test(taxCode)) {
    return {
      title: "Recognised PAYE-style tax code",
      status: "normal",
      summary:
        "This looks like a standard PAYE tax code format with a numeric allowance component and a letter suffix.",
      details:
        "It may still contain adjustments depending on your personal circumstances, but structurally it looks like a normal UK tax code format.",
    };
  }

  return {
    title: "Unusual or custom-looking tax code",
    status: "warning",
    summary:
      "This code does not match the most common employee tax code patterns.",
    details:
      "It may still be valid, but it is worth checking against your HMRC records or payslip if your deductions look higher or lower than expected.",
  };
}