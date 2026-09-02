export function formatMoney(amount) {
  const n = Number(amount);
  if (!Number.isFinite(n)) return "$0.00";
  const sign = n < 0 ? "-" : "";
  return `${sign}$${Math.abs(n).toFixed(2)}`;
}

export function splitEqual(amount, ids) {
  const n = ids.length || 1;
  const total = Number(amount);
  const base = Math.floor((total / n) * 100) / 100;
  const shares = {};
  let assigned = 0;

  ids.forEach((id, index) => {
    if (index === ids.length - 1) {
      shares[id] = Number((total - assigned).toFixed(2));
    } else {
      shares[id] = Number(base.toFixed(2));
      assigned += shares[id];
    }
  });

  return shares;
}

export function percentsSumTo100(percents) {
  const values = Object.values(percents).map(Number);
  const total = values.reduce((a, b) => a + b, 0);
  return Math.abs(total - 100) < 0.001;
}

export function splitByPercent(amount, percents) {
  const entries = Object.entries(percents);
  const shares = {};
  const total = Number(amount);
  let assigned = 0;

  entries.forEach(([id, pct], index) => {
    if (index === entries.length - 1) {
      shares[id] = Number((total - assigned).toFixed(2));
    } else {
      const share = Number(((total * Number(pct)) / 100).toFixed(2));
      shares[id] = share;
      assigned += share;
    }
  });

  return shares;
}

export function sharesForExpense(expense) {
  if (expense.splitType === "percent" && expense.percents) {
    return splitByPercent(expense.amount, expense.percents);
  }
  return splitEqual(expense.amount, expense.splitWith);
}
