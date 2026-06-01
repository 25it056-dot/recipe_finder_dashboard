const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const recipeContainer = document.getElementById("recipeContainer");

const modal = document.getElementById("recipeModal");
const closeModal = document.getElementById("closeModal");
const recipeDetails = document.getElementById("recipeDetails");

async function searchRecipes(query = "chicken") {

    recipeContainer.innerHTML = "<h2>Loading...</h2>";

    try {

        const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
        );

        const data = await response.json();

        if (!data.meals) {
            recipeContainer.innerHTML =
                "<h2>No recipes found.</h2>";
            return;
        }

        displayRecipes(data.meals);

    } catch (error) {

        recipeContainer.innerHTML =
            "<h2>Error loading recipes.</h2>";

    }
}

function displayRecipes(meals) {

    recipeContainer.innerHTML = "";

    meals.forEach(meal => {

        const card = document.createElement("div");

        card.classList.add("recipe-card");

        card.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
            <button onclick="showRecipe('${meal.idMeal}')">
                View Recipe
            </button>
        `;

        recipeContainer.appendChild(card);
    });
}

async function showRecipe(id) {

    try {

        const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );

        const data = await response.json();

        const meal = data.meals[0];

        recipeDetails.innerHTML = `
            <h2>${meal.strMeal}</h2>

            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">

            <h3>Category: ${meal.strCategory}</h3>

            <h3>Area: ${meal.strArea}</h3>

            <br>

            <h3>Instructions</h3>

            <p>${meal.strInstructions}</p>

            <br>

            <a href="${meal.strYoutube}"
               target="_blank">
               Watch Tutorial
            </a>
        `;

        modal.style.display = "block";

    } catch (error) {

        alert("Failed to load recipe.");

    }
}

searchBtn.addEventListener("click", () => {

    const query = searchInput.value.trim();

    if (query) {
        searchRecipes(query);
    }

});

searchInput.addEventListener("keypress", e => {

    if (e.key === "Enter") {
        searchBtn.click();
    }

});

closeModal.addEventListener("click", () => {

    modal.style.display = "none";

});

window.onclick = e => {

    if (e.target === modal) {
        modal.style.display = "none";
    }

};

searchRecipes();
