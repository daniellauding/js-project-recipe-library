// En array med olika filtergrupper som vi vill kunna filtrera recepten på
const filters = [
  {
    key: "diets",
    values: [
      "Vegan",
      "Vegetarian",
      "Gluten-free",
      "Dairy-free"
    ],
  },
  {
    key: "cuisine",
    values: [
      "Mediterranean",
      "Middle Eastern",
      "Asian", "Italian",
      "Mexican"
    ]
  },
  {
    key: "cookingTime",
    values: [
      "Under 15 min",
      "15-30 min",
      "30-60 min",
      "over 60 min"
    ]
  },
  {
    key: "qtyIngredients",
    values: [
      "Under 5 ingredients",
      "6-10 ingredients",
      "11-15 ingredients",
      "Over 16 ingredients"
    ]
  },
]

// Skriver ut hela filters-arrayen i konsolen
// console.log(filters);

// Skriver ut värdena (values) för det andra filtret (index 1), alltså "cuisine"
// console.log(filters[1].values);

// Skapar en ny array med endast nycklarna ("diets", "cuisine", osv.)
// console.log("alla keys", filters.map(filter => filter.key));

// Skapar en ny array med alla värde-arrayer från varje filter
// console.log("alla values", filters.map(filter => filter.values));

// Söker efter första objektet där key är "cuisine"
// console.log("hej", filters.find(filter => filter.key === "cuisine"));

// Försöker skapa en array med de första värdena i varje objekt – men ger inte vad man tror!
// console.log(filters.map(filter => Object.values(filter)[0]).flat());

// Loopar igenom varje filter och skriver ut key + values som formaterad text
// filters.forEach(filter => {
//   console.log(`${filter.key}:`, filter.values);
// });

// Lista med recept – varje recept är ett objekt med detaljer som vi kan filtrera på
const recipes = [
  {
    title: "Avocado Toast",
    image: "https://dummyimage.com/600x400/000/fff",
    diets: ["Vegan", "Dairy-free"],
    cuisine: "Mediterranean",
    cookingTime: "Under 15 min",
    qtyIngredients: "Under 5 ingredients",
    ingredients: ["Bread", "Avocado", "Lemon", "Salt"]
  },
  {
    title: "Spaghetti Carbonara",
    image: "https://dummyimage.com/600x400/000/fff",
    diets: ["Gluten-free"], // maybe with gluten-free pasta!
    cuisine: "Italian",
    cookingTime: "15-30 min",
    qtyIngredients: "6-10 ingredients",
    ingredients: ["Pasta", "Eggs", "Bacon", "Parmesan", "Pepper"]
  },
  {
    title: "Falafel Wrap",
    image: "https://dummyimage.com/600x400/000/fff",
    diets: ["Vegetarian"],
    cuisine: "Middle Eastern",
    cookingTime: "30-60 min",
    qtyIngredients: "6-10 ingredients",
    ingredients: ["Falafel", "Pita", "Hummus", "Lettuce", "Tomatoes"]
  },
  {
    title: "Vegan Curry",
    image: "https://dummyimage.com/600x400/000/fff",
    diets: ["Vegan", "Gluten-free", "Dairy-free"],
    cuisine: "Asian",
    cookingTime: "30-60 min",
    qtyIngredients: "11-15 ingredients",
    ingredients: ["Chickpeas", "Coconut Milk", "Spinach", "Curry Paste", "Onion", "Garlic"]
  }
];

// Funktion för att skapa HTML för varje recept och visa dem på sidan
const renderRecipes = (recipesToRender) => {
  const recipeCards = recipesToRender.map(recipe => {
    return `
      <article class="recipe-card">
        <img class="recipe-card__image" src="${recipe.image}" alt="${recipe.title}" />
        <div class="recipe-card__content">
          <h3 class="recipe-card__title">${recipe.title}</h3>
          <p class="recipe-card__cuisine"><span>Cuisine:</span> ${recipe.cuisine}</p>
          <p class="recipe-card__time"><span>Time:</span> ${recipe.cookingTime}</p>
          <div class="recipe-card__ingredients">
            <h4 class="recipe-card__ingredients-title">Ingredients</h4>
            <ul class="recipe-card__ingredients-list">
              ${recipe.ingredients.map(ing => `<li class="recipe-card__ingredients-item">${ing}</li>`).join("")}
            </ul>
          </div>
        </div>
      </article>
    `;
  });

  // Hämtar sektionen i HTML där recepten ska visas
  const recipeSection = document.querySelector(".recipe-library__items");

  // Lägger in alla receptkort i sektionen
  recipeSection.innerHTML = recipeCards.join("");
};

// Funktion för att hämta användarens valda filter och sorteringsinställning
const getSelectedFilterAndSort = () => {
  const selected = document.querySelectorAll(".filter-button--active");

  let cuisineFilter = "All";
  let sortDirection = "Descending";

  // Går igenom varje aktiv knapp för att se vilken grupp den tillhör
  selected.forEach(button => {
    const groupTitle = button.closest(".filter-group").querySelector(".filter-group__title").innerText;

    if (groupTitle.includes("kitchen")) {
      cuisineFilter = button.innerText;
    }

    if (groupTitle.includes("time")) {
      sortDirection = button.innerText;
    }
  });

  return { cuisineFilter, sortDirection };
};

// Funktion för att filtrera och sortera recepten beroende på användarens val
const filterAndSortRecipes = () => {
  const { cuisineFilter, sortDirection } = getSelectedFilterAndSort();

  let result = [...recipes];

  // Filtrerar på kök om ett specifikt val gjorts
  if (cuisineFilter !== "All") {
    result = result.filter(recipe => recipe.cuisine === cuisineFilter);
  }

  // Sorterar recepten utifrån tillagningstid (strängar som "Under 15 min" översätts till siffror)
  const getTimeValue = (timeString) => {
    if (timeString.includes("Under 15")) return 10;
    if (timeString.includes("15-30")) return 22.5;
    if (timeString.includes("30-60")) return 45;
    if (timeString.includes("Over 60")) return 90;
    return 999; // fallback
  };

  // Sorterar recepten på tillagningstid (OBS: just nu funkar ej eftersom time är sträng!)
  result.sort((a, b) => {
    const timeA = getTimeValue(a.cookingTime);
    const timeB = getTimeValue(b.cookingTime);

    if (sortDirection === "Ascending") return timeA - timeB;
    return timeB - timeA;
  });

  renderRecipes(result);
};

// Lägger till klick-event på varje filterknapp
document.querySelectorAll(".filter-button").forEach(button => {
  button.addEventListener("click", () => {
    const group = button.closest(".filter-group__buttons");

    // Tar bort aktiv klass från alla knappar i gruppen
    group.querySelectorAll(".filter-button").forEach(btn => {
      btn.classList.remove("filter-button--active");
    });

    // Gör den klickade knappen aktiv
    button.classList.add("filter-button--active");

    // Filtrerar och sorterar recepten baserat på det nya valet
    filterAndSortRecipes();
  });
});

// Visar alla recept direkt när sidan laddas
renderRecipes(recipes);