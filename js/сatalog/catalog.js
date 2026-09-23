import { loadProducts }
    from "./loadProducts.js";

import {
    createFilters,
    filterProducts
} from "./filters.js";

import { renderProducts }
    from "./renderProducts.js";

import { sortProducts }
    from "./sortProducts.js";

import { renderCatalogTitle }
    from "./catalogTitle.js";


let allProducts = [];

let filteredProducts = [];

let activeFilters = {};

let currentSort = "default";


const params =
    new URLSearchParams(
        window.location.search
    );

const jsonFile =
    params.get("json");

const title =
    params.get("title");


const filtersContainer =
    document.getElementById("filters");

const productsGrid =
    document.getElementById("productsGrid");

const sortSelect =
    document.getElementById("sortProducts");


async function initCatalog() {

    try {

        allProducts =
            await loadProducts(jsonFile);

        filteredProducts =
            [...allProducts];

        renderCatalogTitle(
            title,
            filteredProducts.length
        );

        createFilters(
            allProducts,
            filtersContainer,
            handleFilterChange
        );

        renderCatalog();

    } catch (error) {

        console.error(error);

        showError(error.message);
    }
}


function handleFilterChange(
    key,
    value
) {

    if (value === "") {

        delete activeFilters[key];

    } else {

        activeFilters[key] = value;
    }

    filteredProducts =
        filterProducts(
            allProducts,
            activeFilters
        );

    renderCatalog();
}


function renderCatalog() {

    let products =
        sortProducts(
            filteredProducts,
            currentSort
        );

    renderProducts(
        products,
        productsGrid
    );

    renderCatalogTitle(
        title,
        products.length
    );
}


sortSelect.addEventListener(
    "change",
    event => {

        currentSort =
            event.target.value;

        renderCatalog();
    }
);


function showError(message) {

    productsGrid.innerHTML = `
        <div class="col-12">
            <div class="alert alert-danger">
                Не удалось загрузить каталог.
                <br>
                ${message}
            </div>
        </div>
    `;
}


initCatalog();