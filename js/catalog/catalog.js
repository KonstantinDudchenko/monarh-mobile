
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

import {
    renderCatalogTitle
} from "./catalogTitle.js";

// ======================================================
// Состояние каталога
// ======================================================

let allProducts = [];

let filteredProducts = [];

let activeFilters = {};

let currentSort = "default";

let filtersConfig = {};


// ======================================================
// Параметры URL
// ======================================================

const params =
    new URLSearchParams(
        window.location.search
    );

const jsonFile =
    params.get("json");

const filtersFile =
    params.get("filters");

const title =
    params.get("title");


// ======================================================
// DOM
// ======================================================

const filtersContainer =
    document.getElementById("filters");

const productsGrid =
    document.getElementById("productsGrid");

const sortSelect =
    document.getElementById("sortProducts");


// ======================================================
// Загрузка конфигурации фильтров
// ======================================================

async function loadFilters(file) {

    if (!file) {

        throw new Error(
            "Файл фильтров не указан"
        );
    }


    const response =
        await fetch(file);


    if (!response.ok) {

        throw new Error(
            `Не удалось загрузить файл фильтров: ${response.status}`
        );
    }


    return await response.json();
}


// ======================================================
// Инициализация каталога
// ======================================================

async function initCatalog() {

    try {

        // ----------------------------------------------
        // Загружаем товары
        // ----------------------------------------------

        allProducts =
            await loadProducts(
                jsonFile
            );


        // ----------------------------------------------
        // Загружаем настройки фильтров
        // ----------------------------------------------

        filtersConfig =
            await loadFilters(
                filtersFile
            );


        // ----------------------------------------------
        // Начальное состояние
        // ----------------------------------------------

        filteredProducts =
            [...allProducts];


        // ----------------------------------------------
        // Заголовок каталога
        // ----------------------------------------------

        renderCatalogTitle(
            title,
            filteredProducts.length
        );


        // ----------------------------------------------
        // Создаём фильтры
        // ----------------------------------------------

        createFilters(
            allProducts,
            filtersContainer,
            handleFilterChange,
            filtersConfig
        );


        // ----------------------------------------------
        // Выводим товары
        // ----------------------------------------------

        renderCatalog();

    } catch (error) {

        console.error(error);

        showError(
            error.message
        );
    }
}


// ======================================================
// Изменение фильтра
// ======================================================

function handleFilterChange(
    key,
    value
) {

    if (
        value === "" ||
        value === null ||
        value === undefined
    ) {

        delete activeFilters[key];

    } else {

        activeFilters[key] =
            value;
    }


    // Фильтруем товары

    filteredProducts =
        filterProducts(
            allProducts,
            activeFilters
        );


    // Перерисовываем каталог

    renderCatalog();
}


// ======================================================
// Отрисовка каталога
// ======================================================

function renderCatalog() {

    // Сначала сортируем
    const products =
        sortProducts(
            filteredProducts,
            currentSort
        );


    // Затем выводим карточки
    renderProducts(
        products,
        productsGrid,
        filtersConfig
    );


    // Обновляем количество
    renderCatalogTitle(
        title,
        products.length
    );
}


// ======================================================
// Сортировка
// ======================================================

if (sortSelect) {

    sortSelect.addEventListener(
        "change",
        event => {

            currentSort =
                event.target.value;

            renderCatalog();
        }
    );
}


// ======================================================
// Ошибка
// ======================================================

function showError(message) {

    if (!productsGrid) {
        return;
    }


    productsGrid.innerHTML = `

        <div class="col-12">

            <div class="alert alert-danger">

                Не удалось загрузить каталог.

                <br>

                ${escapeHtml(message)}

            </div>

        </div>

    `;
}


// ======================================================
// Защита от HTML
// ======================================================

function escapeHtml(value) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        value ?? "";

    return div.innerHTML;
}


// ======================================================
// Запуск
// ======================================================

initCatalog();

