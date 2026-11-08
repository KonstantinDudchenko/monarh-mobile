
import { renderProducts } from "./catalog/renderProducts.js";

const PRODUCTS_URL = "data/popularProduct/popularProducts.json";

async function loadPopularProducts() {
    const container = document.getElementById("popularProductsGrid");

    if (!container) {
        console.error("Не найден контейнер popularProductsGrid");
        return;
    }

    try {
        const response = await fetch(PRODUCTS_URL);

        if (!response.ok) {
            throw new Error(`Ошибка загрузки JSON: ${response.status}`);
        }

        const products = await response.json();

        if (!Array.isArray(products)) {
            throw new Error("JSON должен содержать массив товаров");
        }

        renderProducts(products, container);

    } catch (error) {
        console.error("Ошибка загрузки популярных товаров:", error);

        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-warning text-center">
                    Не удалось загрузить популярные товары.
                </div>
            </div>
        `;
    }
}

loadPopularProducts();
