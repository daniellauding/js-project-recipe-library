# Project: Recipe Library

A week-5 exercise from Technigo’s **Advanced JavaScript & TypeScript** course.  
Goal: practice **functions, conditionals, and basic DOM manipulation** by building a tiny UI with **one filter** and **one sorting option** that updates a placeholder recipe card.

---

## What’s this about?

This week is all about foundations:
- Read user input (which button is active)
- Use **functions** and **conditionals** to decide what to show
- Update the UI dynamically via the **DOM**
- Keep JavaScript **minimal** (no arrays, no API yet)

Next weeks (6–7) we’ll replace hardcoded conditionals with real data and `.map()/.filter()`, then add API calls.

---

## Tech / What I built with

- **HTML/CSS** for layout and styling
- **Vanilla JavaScript** (no frameworks)
  - `addEventListener` for clicks
  - `classList` to toggle active state
  - `querySelector` to read/write DOM
  - Simple **functions** and **if/else**

---

## Project requirements (from the brief)

- Build the HTML structure:
  - Input fields for filters and sorting options
  - A **placeholder** recipe card
- Style to match the Figma design as closely as possible
- Write JavaScript functions to handle user selections
- Use conditional statements to display a message/result based on input
- Users can select **at least one filter**
- Users can select **at least one sorting option**
- Be responsive from **320px** up to **1600px+**

---

## How it works (this week’s scope)

- The UI has:
  - One **filter group** (e.g., cuisine: All / Italy / USA / China)
  - One **sort group** (time: Ascending / Descending)
- When a button is clicked:
  1. The button becomes “active” (CSS class)
  2. A function (`updateCard`) reads the active buttons
  3. A simple `if/else` updates the placeholder card (title, cuisine, time)
  4. A small arrow (⬆️/⬇️) reflects the chosen sort

> There’s no list rendering or real sorting yet — that comes next week.

---

## If you want to run it

1. Clone or download this repo
2. Open `index.html` in your browser
3. That’s it — no build tools or npm needed

---

## What I learned

- Structuring logic into **small functions**
- **Conditionals** to branch UI behavior
- DOM updates with `innerText/innerHTML`
- Managing active state with `classList`

---

## Accessibility notes

- Buttons are real `<button>` elements (keyboard focus, roles)
- Clear visible focus state in CSS
- Semantic headings for groups

---

## Next steps (weeks 6–7)

- Replace `if/else` with a **recipes array**, render with `.map()`
- Filter with `.filter()` and **actually sort** by time
- Optional: fetch data from an API and handle loading/error states

---

## Changelog

- **Sep 2025**: Week 5 version — minimal JS, single card, filter + sort placeholders

---

Built in Lund with lots of coffee ☕