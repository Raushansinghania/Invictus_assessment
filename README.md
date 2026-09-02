# FairShare 💸

> **Bug Fixing & Improvement Assignment**

FairShare is a web application for managing and splitting shared expenses among a group of people.

It is designed for situations such as trips, vacations, dinners, or group activities where different people pay for different expenses. The application keeps track of **who paid, who participated in an expense, how much each person owes, and how the group can settle its final balances**.

This repository contains my **completed bug-fixing and improvement work** on the provided FairShare application.

---

## 📌 Assignment Overview

The objective of this assignment was to:

* Understand the existing FairShare application.
* Run and test the application using realistic scenarios.
* Identify bugs and incorrect behavior.
* Fix the issues without rebuilding the application from scratch.
* Preserve the existing functionality while improving its reliability.
* Document the discovered bugs and their resolutions in `BUGS.md`.

The application was tested from the perspective of a real user managing expenses during a group trip.

---

## 💡 How FairShare Works

Every expense contains four important pieces of information:

| Information      | Description                           |
| ---------------- | ------------------------------------- |
| **Description**  | What the expense was for              |
| **Amount**       | Total amount paid                     |
| **Payer**        | Person who actually paid the merchant |
| **Participants** | People who should share the expense   |

For example, if one person pays ₹1,200 for a cab used by three other people, the payer and the participants can be different.

FairShare should correctly represent that relationship rather than assuming that the person who paid must also be part of the split.

---

## ⚖️ Expense Splitting

### Equal Split

If three people share a ₹900 dinner equally:

```text
₹900 ÷ 3 = ₹300 per person
```

The individual shares must add up to exactly:

```text
₹300 + ₹300 + ₹300 = ₹900
```

The application should avoid losing or creating money because of rounding.

### Uneven Split

Some expenses are not shared equally.

For example:

```text
Total Expense = ₹1,000

Person A = 50%
Person B = 30%
Person C = 20%
```

The resulting shares are:

```text
Person A = ₹500
Person B = ₹300
Person C = ₹200
```

Total:

```text
₹500 + ₹300 + ₹200 = ₹1,000
```

---

## 💳 Payer vs. Participants

The person who pays an expense does not necessarily have to be one of the participants.

Example:

> Aman pays ₹1,200 for a cab that was used by Rahul, Rohit, and Priya.

The correct interpretation is:

```text
Payer:
Aman → ₹1,200

Participants:
Rahul
Rohit
Priya
```

Aman should receive the appropriate reimbursement, while people who did not use the cab should not be charged.

---

## 📊 Running Balance

FairShare calculates each person's overall position across all expenses.

The basic calculation is:

```text
Balance = Total Paid − Total Personal Share
```

### Positive Balance

A positive balance means the person has paid more than their share.

```text
+₹600
```

The group owes this person ₹600.

### Negative Balance

A negative balance means the person has paid less than their share.

```text
-₹300
```

The person needs to pay ₹300.

### Zero Balance

```text
₹0
```

The person's expenses are completely settled.

For a closed group, the balances should always satisfy:

```text
Sum of all balances = ₹0
```

---

## 🤝 Settle Up

The settle-up functionality converts the final balances into suggested payments.

For example:

```text
Aman   +₹600
Rahul  -₹300
Rohit  -₹300
```

A possible settlement is:

```text
Rahul → Aman : ₹300
Rohit → Aman : ₹300
```

After these transfers:

```text
Aman   ₹0
Rahul  ₹0
Rohit  ₹0
```

Everyone is settled.

---

# 🐛 Bugs Identified & Fixed

All identified issues and their resolutions are documented in:

**`BUGS.md`**

The bug-fixing process focused on areas such as:

* Expense calculations
* Equal splitting
* Percentage-based splitting
* Rounding
* Payer and participant relationships
* Running balances
* Settle-up calculations
* Adding and editing expenses
* Adding people
* Expense filtering
* Data persistence
* UI state consistency

Each issue was investigated using actual application behavior before implementing the fix.

---

## 🧪 Testing Approach

The application was tested using different realistic expense scenarios rather than relying only on the existing demo data.

Examples included:

### Scenario 1 — Equal Expense

```text
₹900 dinner
3 participants
Equal split
```

### Scenario 2 — Uneven Expense

```text
₹1,000 expense
50% / 30% / 20% split
```

### Scenario 3 — Payer Not Included

```text
₹1,200 cab
1 payer
3 participants
```

### Scenario 4 — Multiple Expenses

Several people pay for different expenses across the same trip to verify that the final balances remain consistent.

### Scenario 5 — Persistence

Expenses and changes were checked after refreshing the application to ensure that the displayed information remained consistent with the stored data.

---

# 🛠️ Tech Stack

The project uses the technology stack provided with the original application.

* **JavaScript / TypeScript**
* **Web application frontend**
* **Browser Local Storage**
* **Node.js**
* **npm**
* **Git / GitHub**

> No additional libraries were introduced as part of the assignment.

---

# 🚀 Running the Project

### Prerequisites

You need:

* **Node.js 18 or newer**
* **npm**

Check your Node.js version:

```bash
node --version
```

### Installation

Clone the repository:

```bash
git clone <YOUR-REPOSITORY-URL>
```

Navigate to the project:

```bash
cd <PROJECT-DIRECTORY>
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL provided by the terminal.

Usually:

```text
http://localhost:5173
```

---

# 💾 Restoring Demo Data

The demo group is stored in the browser's Local Storage.

To restore the original demo data:

1. Open **Developer Tools**.
2. Go to **Application**.
3. Open **Local Storage**.
4. Locate `fairshare-v1`.
5. Delete the entry.
6. Refresh the page.

The original demo data will be recreated.

---

# 📁 Project Documentation

| File         | Purpose                               |
| ------------ | ------------------------------------- |
| `README.md`  | Project and assignment overview       |
| `BUGS.md`    | Bugs identified and fixes implemented |
| Source files | Application implementation            |

---

# 🎯 Assignment Outcome

Through this assignment, I worked on an existing codebase rather than creating a new application from scratch.

The main focus was on:

* Understanding existing code
* Debugging
* Tracing incorrect calculations
* Handling edge cases
* Maintaining data consistency
* Testing user workflows
* Making targeted code changes
* Documenting bugs and fixes

The completed repository contains both the **application improvements** and the corresponding **bug documentation in `BUGS.md`**.

---

## 👨‍💻 Submission

This repository represents my completed FairShare bug-fixing assignment, including:

* ✅ Fixed application issues
* ✅ Tested expense and settlement workflows
* ✅ Updated `BUGS.md`
* ✅ Preserved the existing application structure
* ✅ No unnecessary dependencies added
