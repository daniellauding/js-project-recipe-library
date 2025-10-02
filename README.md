# Project: Recipe Library

A Week 6 project from Technigo’s **Advanced JavaScript & TypeScript** course.  
Goal: work with **arrays, objects, loops**, and dynamic **DOM rendering** by creating a recipe app where users can **filter**, **sort**, and **randomize** recipes from real data.

---

## What’s this about?

This week is all about **moving from hardcoded UI to data-driven components**:
- Display recipes from a real `recipes` array
- Use `.map()` to render HTML dynamically
- Use `.filter()` to narrow results by user input
- Use `.sort()` to reorder results by time or ingredients
- Update the DOM based on what the user selects
- Keep everything modular and clean using **functions**

---

## Tech / What I built with

- **HTML/CSS** for structure and layout
- **Vanilla JavaScript**
  - `map()`, `filter()`, `sort()` for array logic
  - `addEventListener()` for interactivity
  - `innerHTML` and `classList` for DOM updates
  - Modular **render + logic functions**
  - `Math.random()` for picking a random recipe

---

## Project requirements (from the brief)

- Display all recipes from a `recipes` array when the page loads :white_check_mark:
- Enable filtering by at least one property (e.g. cuisine, diet, time)
- Enable sorting by at least one property (e.g. time or ingredients count)
- Include a "random recipe" button :white_check_mark:
- Show an empty state when no recipes match the filter
- Responsive design (320px → 1600px+ screens)

---

## How it works (this week’s scope)

- A `recipes` array contains full recipe data (title, image, ingredients, etc.)
- All recipes are rendered using `.map().join("")` into the DOM
- When a user selects a **filter** or **sort option**:
  1. A function updates the active class
  2. Filtering and sorting functions return a new array
  3. `renderRecipes()` displays the updated list
- A random button uses `Math.random()` to pick one recipe
- If no recipes match, a friendly "no results" message is shown

---

## If you want to run it

1. Clone or download this repo
2. Open `index.html` in your browser
3. That’s it — no build tools or npm needed

---

## What I learned

- How to loop and transform arrays with `.map()`
- How to build **reusable rendering functions**
- How to structure filtering and sorting logic in clean ways
- How to update the DOM based on data changes
- Importance of `.join("")` to avoid comma issues in HTML
- How to pick a random item from an array

---

## Accessibility notes

- Real `<button>` elements used for better accessibility
- Focus state is styled for keyboard navigation
- Semantic structure (headings, lists, image alt text)

---

## Next steps (week 7+)

- Add real recipe data using a public API
- Handle **loading** and **error** states when fetching
- Add more filters and refine sort logic
- Explore user input fields and search

---

## Changelog

- **Sep 2025 – Week 5**: Basic UI with placeholder data and conditionals
- **Oct 2025 – Week 6**: Switched to real data with arrays, objects, `.map()`, `.filter()`, and dynamic rendering

---

Built in Lund with lots of coffee ☕ and way too many console.logs 📟