
import { getFavorites } from "./favoritesStorage.js";
import { renderProducts } from "./renderProducts.js";

const favoritesGrid = document.getElementById("favoritesGrid");

function renderFavorites() {

    const favorites = getFavorites();

    renderProducts(
        favorites,
        favoritesGrid,
        {},
        renderFavorites
    );
}

renderFavorites();
