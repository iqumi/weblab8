export type Invoice = {
  id: string;
  amount: number;
  status: "paid" | "free";
};

export type StatusTotals = { paid: number; free: number };

export function sumByStatus(invoices: readonly Invoice[]): StatusTotals {
  return invoices.reduce<StatusTotals>(
    (totals, invoice) => ({
      ...totals,
      [invoice.status]: totals[invoice.status] + invoice.amount,
    }),
    { paid: 0, free: 0 },
  );
}

const mixedInvoices: readonly Invoice[] = [
  { id: "inv-1", amount: 100, status: "paid" },
  { id: "inv-2", amount: 40, status: "free" },
  { id: "inv-3", amount: 250.5, status: "paid" },
  { id: "inv-4", amount: 10, status: "free" },
];

console.log("mixed:", sumByStatus(mixedInvoices));
console.log("empty:", sumByStatus([]));
console.log("input unchanged:", mixedInvoices.length, "invoices");
