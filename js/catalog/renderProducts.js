
import { createProductCard } from "./createProductCard.js";
import { openProductModal } from "./productModal.js";

import {
    toggleFavorite,
    getProductKey
} from "./favoritesStorage.js";

export function renderProducts(
    products,
    container,
    filters = {},
    onFavoriteChange = null
) {
    container.innerHTML = "";

    if (!products.length) {
        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-light text-center">
                    Товары не найдены
                </div>
            </div>
        `;
        return;
    }

    products.forEach((product, index) => {
        const col = document.createElement("div");

        col.className = "col-12 col-sm-6 col-md-4 col-lg-3";
        col.innerHTML = createProductCard(product, index);

        container.appendChild(col);
    });

    container.onclick = (event) => {

        // Избранное
        const favoriteButton = event.target.closest(
            "[data-favorite-button]"
        );

        if (favoriteButton) {
            const product = products.find(item =>
                getProductKey(item) === favoriteButton.dataset.productKey
            );

            if (!product) return;

            const added = toggleFavorite(product);

            favoriteButton.innerHTML = `
                <i class="bi ${added ? "bi-heart-fill" : "bi-heart"}"></i>
            `;

            favoriteButton.setAttribute(
                "aria-pressed",
                String(added)
            );

            if (onFavoriteChange) {
                onFavoriteChange();
            }

            return;
        }

        // Подробнее
        const button = event.target.closest("[data-product-index]");

        if (!button) return;

        const index = Number(button.dataset.productIndex);
        const product = products[index];

        if (product) {
            openProductModal(product, filters);
        }
    };
}
