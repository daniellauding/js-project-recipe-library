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

// This is the website web address we ask for new recipes from
const URL = `https://api.spoonacular.com/recipes/random?number=15&apiKey=f9a94c32c70844888eebfba758e10f35`

// This is a magic function that tries to get recipes from a box on your computer or from the internet
const fetchRecipes = async () => {
  
  try {
    
    // First, we try to find recipes saved on your computer already (localStorage)
    const cachedRecipes = localStorage.getItem("recipes");

    if (cachedRecipes) {
      // If we found some, we open the box and use those recipes
      console.log("Using cached recipes from localStorage");
      const parsedCache = JSON.parse(cachedRecipes);
      
      // #### Kontrollera om det är direkt en array eller {recipes: [...]}
      const recipeArray = Array.isArray(parsedCache) ? parsedCache : parsedCache.recipes || [];
      console.table(recipeArray);
      return recipeArray;
    }
    
    // If the box was empty, we ask the internet for new recipes
    const response = await fetch(URL);
    
    // If the internet says something is wrong, we throw an error
    if (!response.ok) {
      // #### Special handling for quota exceeded (status 402 = Payment Required)
      if (response.status === 402) {
        console.warn('🎯 API quota exceeded for today! 😎 Using local recipes instead.');
        showQuotaMessage(); // ← Show user-friendly message
        return recipes; // ← Return local recipes when quota is reached
      }
      throw Error(`HTTP error! Status: ${response.status}`);
    }
    
    // If everything is fine, we open the new recipes
    const data = await response.json();
    
    // #### API:et returnerar {recipes: [...]} så vi behöver extrahera recepten
    const apiRecipes = data.recipes || [];
    
    // #### Kontrollera att vi fick en array med recept
    if (!Array.isArray(apiRecipes) || apiRecipes.length === 0) {
      console.log("API returnerade inga recept, använder lokala recept");
      return recipes;
    }
    
    // We save the new recipes into the box on your computer for later (localStorage)
    localStorage.setItem("recipes", JSON.stringify(apiRecipes));
    console.log("Fetched recipes from API");
    console.table(apiRecipes);
    
    // Return the new recipes to the caller
    return apiRecipes;
  } catch (error) {
    // Uh oh! Something went wrong. Let's tell the computer and use the recipes we already know.
    console.error('Error fetching recipes:', error);
    console.log('Using local recipes from our code as a fallback')
    return recipes; // fallback to local recipes if fetch or localStorage fails
    
  }
}

// #### Funktion för att visa quota-meddelande till användaren
const showQuotaMessage = () => {
  const recipesWrapper = document.getElementById('recipes');
  if (recipesWrapper) {
    const quotaMessage = document.createElement('div');
    quotaMessage.className = 'quota-message';
    quotaMessage.innerHTML = `
      <div style="
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 20px;
        border-radius: 10px;
        text-align: center;
        margin: 20px 0;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      ">
        <h3 style="margin: 0 0 10px 0;">🎯 API Quota Reached!</h3>
        <p style="margin: 0;">We've reached our daily API limit 😎<br>
        Showing you some delicious local recipes instead!</p>
      </div>
    `;
    recipesWrapper.insertBefore(quotaMessage, recipesWrapper.firstChild);
    
    // #### Ta bort meddelandet efter 5 sekunder
    setTimeout(() => {
      if (quotaMessage.parentNode) {
        quotaMessage.parentNode.removeChild(quotaMessage);
      }
    }, 5000);
  }
};

// #### Variabel för att lagra alla recept (från API eller lokala)
let allRecipes = recipes; // ← Börja med lokala recept som backup

// #### Starta appen genom att hämta recept
fetchRecipes().then(fetchedRecipes => {
  allRecipes = fetchedRecipes; // ← Spara API-recepten här
  
  // #### Visa recepten när de är klara
  showRecipes(allRecipes);
  filterAndSortRecipes(); // ← Uppdatera även filtreringen
});

// #### Hämta element från DOMet
const buttonRandomElement = document.getElementById('btn-random');
const filtersRoot = document.querySelector(".recipe-library__filters");

// #### 
const showRecipes = (recipesToShow) => {
  // #### Hämtar sektionen i HTML där recepten ska visas
  const showRecipesWrapper = document.getElementById('recipes');

  // #### Säkerhetskontroll: kontrollera att recipesToShow är en array
  if (!Array.isArray(recipesToShow)) {
    console.error("recipesToShow är inte en array:", recipesToShow);
    recipesToShow = recipes; // ← Använd backup-recept
  }

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
      activePopularity = "All";
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
    
    // #### Hantera olika ingredient-format från API vs lokala recept
    let ingredientsList = "";
    if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
      // ← Lokala recept: ingredients är array av strängar
      ingredientsList = recipe.ingredients.map(ing => `<li class="recipe-card__ingredients-item">${ing}</li>`).join("");
    } else if (recipe.extendedIngredients && Array.isArray(recipe.extendedIngredients)) {
      // ← API-recept: extendedIngredients är array av objekt
      ingredientsList = recipe.extendedIngredients.map(ing => `<li class="recipe-card__ingredients-item">${ing.original || ing.name}</li>`).join("");
    } else {
      // ← Backup om inga ingredienser finns
      ingredientsList = `<li class="recipe-card__ingredients-item">Ingredients not available</li>`;
    }
    
    return `
    <article class="recipe-card ${featuredClass}">
      <img class="recipe-card__image" src="${recipe.image}" alt="${recipe.title}" />
        <div class="recipe-card__content">
          <span class="recipe-card__like">
            <i data-lucide="heart"></i>
          </span>
          <h3 class="recipe-card__title">${recipe.title}</h3>
          <p class="recipe-card__cuisine"><span>Cuisine:</span> ${recipe.cuisine || (recipe.cuisines && recipe.cuisines.length > 0 ? recipe.cuisines[0] : "International")}</p>
          <p class="recipe-card__time"><span>Time:</span> ${recipe.readyInMinutes || "Unknown"} min</p>
          <div class="recipe-card__ingredients">
            <h4 class="recipe-card__ingredients-title">Ingredients</h4>
            <ul class="recipe-card__ingredients-list">
              ${ingredientsList}
            </ul>
          </div>
        </div>
    </article>
  `}).join("");

  // #### Lägger in alla receptkort i sektionen
  showRecipesWrapper.innerHTML = recipeCard;
  lucide.createIcons();
};

// #### Recepten visas nu via initializeRecipes() funktionen

// #### Funktion för att visa vilket recept som helst
const showRandomRecipe = () => {
  const diceNumbers = ["dice-1", "dice-2", "dice-3", "dice-4", "dice-5", "dice-6"];
  const randomRecipe = [allRecipes[Math.floor(Math.random() * allRecipes.length)]];
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
    values: ["All", "Italian", "Mediterranean", "Asian", "Middle Eastern", "European", "American", "Southern", "Mexican", "French", "Indian", "Thai"]
  },
  {
    key: "popularity",
    title: "Filter on popularity",
    style: "filter-button--primary",
    values: ["All", "Very Popular", "Popular", "Less Popular"]
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
let activePopularity = "All";
let activeSort = "Descending";

// #### 3. Funktion för att filtrera och sortera recepten
function filterAndSortRecipes() {
  let list = [...allRecipes]; // ← Använd allRecipes istället för recipes

  // Filtrera på kök
  if (activeCuisine !== "All") {
    list = list.filter(r => {
      // #### Hantera både lokala recept (cuisine) och API-recept (cuisines)
      if (r.cuisine) {
        return r.cuisine === activeCuisine;
      } else if (r.cuisines && Array.isArray(r.cuisines)) {
        return r.cuisines.includes(activeCuisine);
      }
      return false;
    });
  }

  // #### Filtrera på popularitet
  if (activePopularity !== "All") {
    list = list.filter(r => {
      const popularity = r.popularity || r.aggregateLikes || 0; // ← API kan använda aggregateLikes
      
      if (activePopularity === "Very Popular") {
        return popularity >= 85; // ← 85+ = Very Popular
      } else if (activePopularity === "Popular") {
        return popularity >= 70 && popularity < 85; // ← 70-84 = Popular
      } else if (activePopularity === "Less Popular") {
        return popularity < 70; // ← Under 70 = Less Popular
      }
      return true;
    });
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
        } else if (groupTitle.includes("popularity")) {
          activePopularity = button.innerText;
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
