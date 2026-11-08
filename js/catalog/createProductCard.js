
import {
    isFavorite,
    getProductKey
} from "./favoritesStorage.js";

export function createProductCard(product, index) {

    const favorite = isFavorite(product);
    const productKey = getProductKey(product);

    return `
        <div class="card h-100 product-card">

            <div class="ratio ratio-1x1 bg-light">
                <img
                    src="${escapeHtml(product.image || "")}"
                    class="object-fit-contain p-3"
                    alt="${escapeHtml(product.name || "Товар")}"
                    loading="lazy"
                >
            </div>

            <div class="card-body d-flex flex-column">

                <h5 class="card-title">
                    ${escapeHtml(product.name || "")}
                </h5>

                <div class="fw-bold fs-5 mt-auto mb-3">
                    ${escapeHtml(product.price ?? "")} ₽
                </div>

                <div class="d-flex gap-2">

                    <button
                        class="btn btn-outline-dark flex-grow-1"
                        type="button"
                        data-product-index="${index}"
                    >
                        Подробнее
                    </button>

                    <button
                        class="btn btn-outline-danger favorite-btn"
                        type="button"
                        data-favorite-button
                        data-product-key="${escapeHtml(productKey)}"
                        aria-label="Добавить в избранное"
                        aria-pressed="${favorite}"
                    >
                        <i class="bi ${favorite ? "bi-heart-fill" : "bi-heart"}"></i>
                    </button>

                </div>
            </div>
        </div>
    `;
}

function escapeHtml(value) {
    const div = document.createElement("div");
    div.textContent = value ?? "";
    return div.innerHTML;
}
