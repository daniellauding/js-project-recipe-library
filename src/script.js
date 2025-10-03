/* Version 1
  ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ "Här är enkel" variant av projektet vecka 1                                                                     │
  └─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
 */

// Hämta delar av kortet vi vill ändra
// const titleEl = document.querySelector(".recipe-card__title");
// const cuisineEl = document.querySelector(".recipe-card__cuisine");
// const timeEl = document.querySelector(".recipe-card__time");

// Funktion: uppdatera kortet baserat på filter och sort
// const updateCard = () => {
// Hitta aktiva knappar
// const activeCuisine = document.querySelector(".filter-group:first-child .filter-button--active").innerText;
// const activeSort = document.querySelector(".filter-group:last-child .filter-button--active").innerText;

// Standardvärden (om "All" är valt)
// let title = "🍽️ Recipe card title";
// let cuisine = "Type";
// let time = "XX minutes";

// Filtrering med if/else
// if (activeCuisine === "Italy") {
//   title = "🍝 Spaghetti Carbonara";
//   cuisine = "Italian";
//   time = "25 minutes";
// } else if (activeCuisine === "USA") {
//   title = "🍔 Cheeseburger";
//   cuisine = "USA";
//   time = "20 minutes";
// } else if (activeCuisine === "China") {
//   title = "🥡 Fried Rice";
//   cuisine = "China";
//   time = "30 minutes";
// }

// Uppdatera kortet med nya värden
// titleEl.innerText = title;
// cuisineEl.innerHTML = `<span>Cuisine:</span> ${cuisine}`;

// Lägg på sorteringspil ⬆️ eller ⬇️
// timeEl.innerHTML = `<span>Time:</span> ${time} ${activeSort === "Ascending" ? "⬆️" : "⬇️"}`;
// };

// Event: klick på filterknappar
// document.querySelectorAll(".filter-button").forEach(button => {
// button.addEventListener("click", () => {
// const group = button.closest(".filter-group__buttons");

// Ta bort active från alla knappar i samma grupp
// group.querySelectorAll(".filter-button").forEach(btn => btn.classList.remove("filter-button--active"));

// Lägg till active på klickad knapp
// button.classList.add("filter-button--active");

// Uppdatera receptkortet
//     updateCard();
//   });
// });

// Kör en gång när sidan laddas
// updateCard();


/* Version 2
  ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Nedanstående är för kommande veckor tror jag, där man kan dynamiskt hämta recept och filter, m.m från           │
  │ constants/js                                                                                                    │
  │ fil                                                                                                             │
  └─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
 */

// // #### En array med olika filtergrupper som vi vill kunna filtrera recepten på
// const filters = [
//   {
//     key: "diets",
//     values: [
//       "Vegan",
//       "Vegetarian",
//       "Gluten-free",
//       "Dairy-free"
//     ],
//   },
//   {
//     key: "cuisine",
//     values: [
//       "Mediterranean",
//       "Middle Eastern",
//       "Asian", "Italian",
//       "Mexican"
//     ]
//   },
//   {
//     key: "cookingTime",
//     values: [
//       "Under 15 min",
//       "15-30 min",
//       "30-60 min",
//       "over 60 min"
//     ]
//   },
//   {
//     key: "qtyIngredients",
//     values: [
//       "Under 5 ingredients",
//       "6-10 ingredients",
//       "11-15 ingredients",
//       "Over 16 ingredients"
//     ]
//   },
// ]

// // #### Skriver ut hela filters-arrayen i konsolen
// // console.log(filters);

// // #### Skriver ut värdena (values) för det andra filtret (index 1), alltså "cuisine"
// // console.log(filters[1].values);

// // #### Skapar en ny array med endast nycklarna ("diets", "cuisine", osv.)
// // console.log("alla keys", filters.map(filter => filter.key));

// // #### Skapar en ny array med alla värde-arrayer från varje filter
// // console.log("alla values", filters.map(filter => filter.values));

// // #### Söker efter första objektet där key är "cuisine"
// // console.log("hej", filters.find(filter => filter.key === "cuisine"));

// // #### Försöker skapa en array med de första värdena i varje objekt – men ger inte vad man tror!
// // console.log(filters.map(filter => Object.values(filter)[0]).flat());

// // #### Loopar igenom varje filter och skriver ut key + values som formaterad text
// // filters.forEach(filter => {
// //   console.log(`${filter.key}:`, filter.values);
// // });

// // #### Funktion för att skapa HTML för varje recept och visa dem på sidan
// const renderRecipes = (recipesToRender) => {
//   const recipeCards = recipesToRender.map(recipe => {
//     return `
//       <article class="recipe-card">
//         <img class="recipe-card__image" src="${recipe.image}" alt="${recipe.title}" />
//         <div class="recipe-card__content">
//           <h3 class="recipe-card__title">${recipe.title}</h3>
//           <p class="recipe-card__cuisine"><span>Cuisine:</span> ${recipe.cuisine}</p>
//           <p class="recipe-card__time"><span>Time:</span> ${recipe.cookingTime}</p>
//           <div class="recipe-card__ingredients">
//             <h4 class="recipe-card__ingredients-title">Ingredients</h4>
//             <ul class="recipe-card__ingredients-list">
//               ${recipe.ingredients.map(ing => `<li class="recipe-card__ingredients-item">${ing}</li>`).join("")}
//             </ul>
//           </div>
//         </div>
//       </article>
//     `;
//   });

//   // #### Hämtar sektionen i HTML där recepten ska visas
//   const recipeSection = document.querySelector(".recipe-library__items");

//   // #### Lägger in alla receptkort i sektionen
//   recipeSection.innerHTML = recipeCards.join("");
// };

// // #### Funktion för att hämta användarens valda filter och sorteringsinställning
// const getSelectedFilterAndSort = () => {
//   const selected = document.querySelectorAll(".filter-button--active");

//   let cuisineFilter = "All";
//   let sortDirection = "Descending";

//   // #### Går igenom varje aktiv knapp för att se vilken grupp den tillhör
//   selected.forEach(button => {
//     const groupTitle = button.closest(".filter-group").querySelector(".filter-group__title").innerText;

//     if (groupTitle.includes("kitchen")) {
//       cuisineFilter = button.innerText;
//     }

//     if (groupTitle.includes("time")) {
//       sortDirection = button.innerText;
//     }
//   });

//   return { cuisineFilter, sortDirection };
// };

// // #### Funktion för att filtrera och sortera recepten beroende på användarens val
// const filterAndSortRecipes = () => {
//   const { cuisineFilter, sortDirection } = getSelectedFilterAndSort();

//   let result = [...recipes];

//   // #### Filtrerar på kök om ett specifikt val gjorts
//   if (cuisineFilter !== "All") {
//     result = result.filter(recipe => recipe.cuisine === cuisineFilter);
//   }

//   // #### Sorterar recepten utifrån tillagningstid (strängar som "Under 15 min" översätts till siffror)
//   const getTimeValue = (timeString) => {
//     if (timeString.includes("Under 15")) return 10;
//     if (timeString.includes("15-30")) return 22.5;
//     if (timeString.includes("30-60")) return 45;
//     if (timeString.includes("Over 60")) return 90;
//     return 999; // fallback
//   };

//   // #### Sorterar recepten på tillagningstid (OBS: just nu funkar ej eftersom time är sträng!)
//   result.sort((a, b) => {
//     const timeA = getTimeValue(a.cookingTime);
//     const timeB = getTimeValue(b.cookingTime);

//     if (sortDirection === "Ascending") return timeA - timeB;
//     return timeB - timeA;
//   });

//   renderRecipes(result);
// };

// // #### Lägger till klick-event på varje filterknapp
// document.querySelectorAll(".filter-button").forEach(button => {
//   button.addEventListener("click", () => {
//     const group = button.closest(".filter-group__buttons");

//     // #### Tar bort aktiv klass från alla knappar i gruppen
//     group.querySelectorAll(".filter-button").forEach(btn => {
//       btn.classList.remove("filter-button--active");
//     });

//     // #### Gör den klickade knappen aktiv
//     button.classList.add("filter-button--active");

//     // #### Filtrerar och sorterar recepten baserat på det nya valet
//     filterAndSortRecipes();
//   });
// });

// // #### Lista med recept – varje recept är ett objekt med detaljer som vi kan filtrera på
const recipes = [
  {
    id: 1,
    title: "Avocado Toast",
    image: "https://dummyimage.com/600x400/000/fff",
    servings: 4,
    diets: ["Vegan", "Dairy-free"],
    cuisine: "Mediterranean",
    readyInMinutes: 15,
    qtyIngredients: "Under 5 ingredients",
    ingredients: [
      "Bread",
      "Avocado",
      "Lemon",
      "Salt"
    ],
    pricePerServing: 3.0,
    popularity: 92
  },
  {
    id: 2,
    title: "Spaghetti Carbonara",
    image: "https://dummyimage.com/600x400/000/fff",
    servings: 2,
    diets: ["Gluten-free"], // maybe with gluten-free pasta!
    cuisine: "Italian",
    readyInMinutes: 20,
    qtyIngredients: "6-10 ingredients",
    ingredients: [
      "Pasta",
      "Eggs",
      "Bacon",
      "Parmesan",
      "Pepper"
    ],
    pricePerServing: 2.5,
    popularity: 85
  },
  {
    id: 3,
    title: "Falafel Wrap",
    image: "https://dummyimage.com/600x400/000/fff",
    servings: 3,
    diets: ["Vegetarian"],
    cuisine: "Middle Eastern",
    readyInMinutes: 60,
    qtyIngredients: "6-10 ingredients",
    ingredients: [
      "Falafel",
      "Pita",
      "Hummus",
      "Lettuce",
      "Tomatoes"
    ],
    pricePerServing: 4.0,
    popularity: 78
  },
  {
    id: 4,
    title: "Vegan Curry",
    image: "https://dummyimage.com/600x400/000/fff",
    servings: 4,
    diets: ["Vegan", "Gluten-free", "Dairy-free"],
    cuisine: "Asian",
    readyInMinutes: 90,
    qtyIngredients: "11-15 ingredients",
    ingredients: [
      "Chickpeas",
      "Coconut Milk",
      "Spinach",
      "Curry Paste",
      "Onion",
      "Garlic"
    ],
    pricePerServing: 2.8,
    popularity: 88
  }
];

// #### Hämta element från DOMet
const buttonRandomElement = document.getElementById('btn-random');
const filtersRoot = document.querySelector(".recipe-library__filters");

// #### 
const showRecipes = (recipesToShow) => {
  // #### Hämtar sektionen i HTML där recepten ska visas
  const showRecipesWrapper = document.getElementById('recipes');

  // #### Funktion för att skapa HTML för varje recept och visa dem på sidan
  const recipeCard = recipesToShow.map(recipe => `
    <article class="recipe-card">
      <img class="recipe-card__image" src="${recipe.image}" alt="${recipe.title}" />
        <div class="recipe-card__content">
          <h3 class="recipe-card__title">${recipe.title}</h3>
          <p class="recipe-card__cuisine"><span>Cuisine:</span> ${recipe.cuisine}</p>
          <p class="recipe-card__time"><span>Time:</span> ${recipe.readyInMinutes} min</p>
          <div class="recipe-card__ingredients">
            <h4 class="recipe-card__ingredients-title">Ingredients</h4>
            <ul class="recipe-card__ingredients-list">
              ${recipe.ingredients.map(ing => `<li class="recipe-card__ingredients-item">${ing}</li>`).join("")}
            </ul>
          </div>
        </div>
    </article>
  `).join("");

  // #### Lägger in alla receptkort i sektionen
  showRecipesWrapper.innerHTML = recipeCard;

};

// #### Visar alla recept direkt när sidan laddas
showRecipes(recipes);

// #### Funktion för att visa vilket recept som helst
const showRandomRecipe = () => {
  const diceNumbers = ["dice-1", "dice-2", "dice-3", "dice-4", "dice-5", "dice-6"];
  const randomRecipe = [recipes[Math.floor(Math.random() * recipes.length)]];
  const randomDiceIcon = diceNumbers[Math.floor(Math.random() * diceNumbers.length)];
  const iconEl = buttonRandomElement.querySelector("[data-lucide], svg");

  iconEl.setAttribute("data-lucide", randomDiceIcon);
  lucide.createIcons();
  showRecipes(randomRecipe);
}

// #### Knappar för filtrering
buttonRandomElement.addEventListener('click', showRandomRecipe);

// #### Initiera Lucide icons
lucide.createIcons();

// #### 1. Här definierar vi vilka filtergrupper vi vill ha
// key = nyckel för att kunna läsa/filtrera
// label = rubrik som ska synas i UI
// values = alternativen som ska bli knappar
// style = CSS-klass för knapparna (primary/secondary)
const filterConfig = [
  {
    key: "cuisine",
    label: "Filter på kök",
    style: "filter-button--primary",
    values: ["All", "Mediterranean", "Middle Eastern", "Asian", "Italian"]
  },
  {
    key: "sort",
    label: "Sortera på tid",
    style: "filter-button--secondary",
    values: ["Descending", "Ascending"]
  }
];

// #### 2. State = det användaren valt just nu
const state = {
  cuisine: "All",
  sort: "Descending"
};

// #### 3. Funktion som bygger upp filtergrupperna från config
function renderFilters() {
  const groupsHtml = filterConfig.map(group => {
    const buttons = group.values.map(val => {
      const isActive = state[group.key] === val;
      return `
        <button
          class="filter-button ${group.style} ${isActive ? "filter-button--active" : ""}"
          data-group="${group.key}"
          data-value="${val}">
          ${val}
        </button>
      `;
    }).join("");

    return `
      <div class="filter-group">
        <h2 class="filter-group__title">${group.label}</h2>
        <div class="filter-group__buttons">${buttons}</div>
      </div>
    `;
  }).join("");

  // Behåll din random-knapp längst till höger
  const randomBtn = `
    <button id="btn-random" class="filter-button filter-button--secondary">
      <i data-lucide="dice-5"></i>
    </button>
  `;

  filtersRoot.innerHTML = groupsHtml + randomBtn;

  // Rendera om Lucide-ikonen
  lucide.createIcons();

  // Sätt tillbaka click-lyssnaren på random-knappen (den renderas om varje gång)
  document.getElementById("btn-random").addEventListener("click", showRandomRecipe);
}