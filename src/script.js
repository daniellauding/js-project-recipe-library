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
    diets: ["Gluten-free"],
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
    popularity: 78,
    featured: true,
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

  if (recipesToShow.length === 0) {
    // Visa tomt läge
    showRecipesWrapper.innerHTML = `
      <div class="empty-state">
        <p>😕 Inga recept matchar ditt val.</p>
        <button class="filter-button filter-button--secondary" id="reset-filters">
          Visa alla recept
        </button>
      </div>
    `;

    // Event för reset-knappen
    document.getElementById("reset-filters").addEventListener("click", () => {
      activeCuisine = "All";
      activeSort = "Descending";
      filterAndSortRecipes();
      // Uppdatera knapparnas aktiva status
      renderFilters();
    });

    return;
  }

  // #### Funktion för att skapa HTML för varje recept och visa dem på sidan
  const recipeCard = recipesToShow.map(recipe => {
    // Kolla om receptet ska vara "featured"
    const featuredClass = recipe.featured ? "recipe-card--featured" : "";
    return `
    <article class="recipe-card ${featuredClass}">
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
  `}).join("");

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
  randomRecipe[0].featured = false;
  showRecipes(randomRecipe);
}

// #### Knappar för filtrering
buttonRandomElement.addEventListener('click', showRandomRecipe);

// En lista (array) med filtergrupper
const filterConfig = [
  {
    key: "cuisine",
    title: "Filter on kitchen",
    style: "filter-button--primary",
    values: ["All", "Italian", "Mediterranean", "Asian", "Middle Eastern"]
  },
  {
    key: "sort",
    title: "Sort on time",
    style: "filter-button--secondary",
    values: ["Descending", "Ascending"]
  }
];

// Funktion för att rendera filter-knapparna
const renderFilters = () => {
  // Loopa igenom varje filtergrupp
  filterConfig.forEach(group => {
    // Hämta rätt container (t.ex. #filter-cuisine, #filter-sort)
    const container = document.getElementById(`filter-${group.key}`);

    // Bygg knapparna som HTML
    let buttonsHtml = "";
    group.values.forEach((val, index) => {
      // Första knappen (index 0) får "active"
      const activeClass = index === 0 ? "filter-button--active" : "";
      buttonsHtml += `
        <button class="filter-button ${group.style} ${activeClass}">
          ${val}
        </button>
      `;
    });

    // Lägg in rubrik + knappar i containern
    container.innerHTML = `
      <h2 class="filter-group__title">${group.title}</h2>
      <div class="filter-group__buttons">${buttonsHtml}</div>
    `;
  });

  // Om du använder Lucide för ikoner
  lucide.createIcons();
};

// #### Initiera Lucide icons
lucide.createIcons();

// #### 1. Rendera filter-knapparna direkt när sidan laddas
renderFilters();

// #### 2. State = nuvarande val
let activeCuisine = "All";
let activeSort = "Descending";

// #### 3. Funktion för att filtrera och sortera recepten
function filterAndSortRecipes() {
  let list = [...recipes]; // kopia

  // Filtrera på kök
  if (activeCuisine !== "All") {
    list = list.filter(r => r.cuisine === activeCuisine);
  }

  // Sortera på tid
  list.sort((a, b) => {
    return activeSort === "Ascending"
      ? a.readyInMinutes - b.readyInMinutes
      : b.readyInMinutes - a.readyInMinutes;
  });

  // Visa recepten
  showRecipes(list);
}

// #### 4. Funktion för att koppla klick-händelser till knapparna
function attachFilterListeners() {
  const allButtons = document.querySelectorAll(".filter-button");

  allButtons.forEach(button => {
    button.addEventListener("click", () => {
      const group = button.closest(".filter-group");

      if (group) {
        const groupTitle = group.querySelector("h2").innerText;

        if (groupTitle.includes("kitchen")) {
          activeCuisine = button.innerText;
        } else if (groupTitle.includes("time")) {
          activeSort = button.innerText;
        }

        // Ta bort active från alla knappar i samma grupp
        const groupButtons = group.querySelectorAll(".filter-button");
        groupButtons.forEach(b => b.classList.remove("filter-button--active"));

        // Lägg till active på den klickade
        button.classList.add("filter-button--active");

        filterAndSortRecipes();
      } else {
        // Om knappen INTE hör till en filtergrupp (random-knappen)
        showRandomRecipe();
      }
    });
  });
}

// #### 5. Koppla listeners (efter att filter är renderade)
attachFilterListeners();

// #### 6. Visa startlistan
filterAndSortRecipes();