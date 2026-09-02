# Bugs found

---

## Bug 1

**How to reproduce:** Open the app. The expense list says “Newest first”. The first row was Wine (7 Mar) while Board game (15 Mar) was further down.

**What is wrong:** The list was showing oldest expenses first. Newest should be at the top.

**What I changed:** Fixed the expense sorting logic in `src/components/ExpenseList.jsx` so expenses are displayed in descending date order (`dateValue(b.date) - dateValue(a.date)`), ensuring the newest expense appears first.

---

## Bug 2

**How to reproduce:** Open the app and use the “Paid by” filter to select a specific member, such as Aisha Khan.

**What is wrong:** The filter shows no matching expenses because the selected member ID from the dropdown is a string (e.g., `"1"`) while expense payer IDs are numbers (e.g., `1`), causing strict inequality check `e.paidBy !== paidBy` to fail.

**What I changed:** Converted both IDs to strings in `src/App.jsx` using `String(e.paidBy) !== String(paidBy)` before comparing them in the filter logic.

---

## Bug 3

**How to reproduce:** Add an expense such as $100 and split it equally between 3 people.

**What is wrong:** The three shares were calculated as $33.33 each, giving a total of $99.99 instead of the original $100.00, losing 1 cent.

**What I changed:** Updated `splitEqual` in `src/lib/money.js` so that the final share receives the remaining pennies (`total - assigned`), ensuring all shares sum up exactly to the original amount.

---

## Bug 4

**How to reproduce:** Add an expense where the payer is not included in the “Split between” members (for example, Aisha pays $100 for an Uber split only between Bob and Charlie).

**What is wrong:** An extra subtraction block in `src/lib/balances.js` deducted an additional share from the payer even though they were not part of the split, causing inaccurate negative balances and violating group balance conservation.

**What I changed:** Removed the extra payer deduction block from `computeBalances` in `src/lib/balances.js`. Now only members included in the split have their shares deducted, and the payer receives their full payment credit.

---

## Bug 5

**How to reproduce:** Add a new member using the "Add member" form and check the “Paid so far” section in Summary cards.

**What is wrong:** The calculated member list remains stale because the `useMemo` hook in `src/components/SummaryCards.jsx` only had `[expenses]` in its dependency array and omitted `members`.

**What I changed:** Updated the dependency array in `src/components/SummaryCards.jsx` to `[members, expenses]`, so "Paid so far" recalculates immediately when a new member is added.

---

## Bug 6

**How to reproduce:** Add a percentage-split expense where the percentage shares require rounding, for example a $10 expense split using 33.33%, 33.33%, and 33.34%.

**What is wrong:** Independent rounding of each percentage share can cause the sum of dollar amounts to deviate from the original bill amount ($9.99 instead of $10.00). In addition, strict float equality `=== 100` in validation can fail due to precision limits.

**What I changed:** Updated `splitByPercent` in `src/lib/money.js` to assign the exact remainder to the last member, and updated `percentsSumTo100` to check within floating-point tolerance (`Math.abs(total - 100) < 0.001`).

---

## Bug 7

**How to reproduce:** Open the settle-up panel when a debtor owes the exact amount a creditor is owed (e.g., Debtor owes $50 and Creditor is owed $50).

**What is wrong:** In `src/lib/settle.js`, the `else` branch in the transfer calculation loop (`d.amount === c.amount`) advanced the pointers without pushing a transfer object into the `transfers` array, leaving the debt unsettled.

**What I changed:** Refactored the transfer generation loop in `src/lib/settle.js` using `Math.min(d.amount, c.amount)` to record the transfer and properly advance both indices.
