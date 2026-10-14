
// ======================================================
// Отрисовка товаров
// ======================================================

export function renderProducts(
    products,
    container,
    filters = {}
) {

    container.innerHTML = "";


    // --------------------------------------------------
    // Товары отсутствуют
    // --------------------------------------------------

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


    // --------------------------------------------------
    // Создаём карточки
    // --------------------------------------------------

    products.forEach(
        (product, index) => {

            const col =
                document.createElement(
                    "div"
                );


            col.className =
                "col-xl-4 col-lg-6 col-md-6 col-sm-6";


            col.innerHTML =
                createProductCard(
                    product,
                    index,
                    filters
                );


            container.appendChild(
                col
            );
        }
    );
}


// ======================================================
// Создание карточки товара
// ======================================================

function createProductCard(
    product,
    index,
    filters = {}
) {

    // --------------------------------------------------
    // Получаем характеристики
    // --------------------------------------------------

    const attributes =
        Object.entries(
            product.attributes || {}
        );


    // --------------------------------------------------
    // Первые 3 характеристики
    // --------------------------------------------------

    const mainAttributes =
        attributes.slice(
            0,
            3
        );


    // --------------------------------------------------
    // Остальные характеристики
    // --------------------------------------------------

    const additionalAttributes =
        attributes.slice(
            3
        );


    // Уникальный ID для Bootstrap collapse

    const detailsId =
        `product-details-${index}`;


    // --------------------------------------------------
    // Карточка
    // --------------------------------------------------

    return `

        <div class="card h-100 product-card">


            <!-- ====================================== -->
            <!-- Изображение -->
            <!-- ====================================== -->

            <img
                src="${escapeHtml(
                    product.image || ""
                )}"

                class="card-img-top"

                alt="${escapeHtml(
                    product.name || "Товар"
                )}"

                loading="lazy"
            >


            <div class="card-body d-flex flex-column">


                <!-- ================================== -->
                <!-- Название -->
                <!-- ================================== -->

                <h5 class="card-title">

                    ${escapeHtml(
                        product.name || ""
                    )}

                </h5>


                <!-- ================================== -->
                <!-- Описание -->
                <!-- ================================== -->

                ${
                    product.description
                        ? `

                            <p class="card-text text-muted">

                                ${escapeHtml(
                                    product.description
                                )}

                            </p>

                        `
                        : ""
                }


                <!-- ================================== -->
                <!-- Первые 3 характеристики -->
                <!-- ================================== -->

                ${
                    mainAttributes.length
                        ? `

                            <div class="product-main-attributes mb-3">

                                ${mainAttributes
                                    .map(([key, value]) =>
                                            renderAttribute(key, value, filters)).join("")}

                            </div>
                        `
                        : ""
                }


                <div class="mt-auto">


                    <!-- ================================== -->
                    <!-- Цена -->
                    <!-- ================================== -->

                    <div class="fw-bold fs-5 mb-2">

                        ${escapeHtml(
                            product.price ?? ""
                        )}

                        ₽

                    </div>


                    <!-- ================================== -->
                    <!-- Остальные характеристики -->
                    <!-- ================================== -->

                    ${
                        additionalAttributes.length
                            ? `

                                <button
                                    class="btn btn-outline-secondary w-100 mb-2"
                                    type="button"

                                    data-bs-toggle="collapse"

                                    data-bs-target="#${detailsId}"

                                    aria-expanded="false"

                                    aria-controls="${detailsId}"
                                >

                                    Характеристики

                                </button>


                                <div
                                    class="collapse"
                                    id="${detailsId}"
                                >

                                    <div class="product-attributes mb-3">

                                        ${additionalAttributes
                                            .map(
                                                ([key, value]) =>
                                                    renderAttribute(
                                                        key,
                                                        value,
                                                        filters
                                                    )
                                            )
                                            .join("")}

                                    </div>

                                </div>

                            `
                            : ""
                    }
                </div>

            </div>

        </div>

    `;
}


// ======================================================
// Отрисовка одной характеристики
// ======================================================

function renderAttribute(
    key,
    value,
    filters = {}
) {

    // --------------------------------------------------
    // Получаем описание характеристики
    // --------------------------------------------------

    const filter =
        filters[key];


    // Если характеристики нет
    // в filters.json — не выводим

    if (!filter) {

        return "";
    }


    // Русское название

    const label =
        filter.label || key;


    // Единица измерения

    const unit =
        filter.unit || "";


    // --------------------------------------------------
    // Форматируем значение
    // --------------------------------------------------

    let formattedValue;


    // Boolean

    if (
        typeof value === "boolean"
    ) {

        formattedValue =
            value
                ? "Да"
                : "Нет";
    }


    // Массив

    else if (
        Array.isArray(value)
    ) {

        formattedValue =
            value
                .map(
                    item =>
                        formatValue(item)
                )
                .join(", ");
    }


    // Объект

    else if (
        value !== null &&
        typeof value === "object"
    ) {

        formattedValue =
            Object.entries(value)
                .map(
                    ([key, val]) =>
                        `${key}: ${formatValue(val)}`
                )
                .join(", ");
    }


    // Обычное значение

    else {

        formattedValue =
            String(
                value ?? ""
            );
    }


    // Добавляем единицу измерения

    if (
        unit &&
        formattedValue
    ) {

        formattedValue +=
            ` ${unit}`;
    }


    // --------------------------------------------------
    // HTML характеристики
    // --------------------------------------------------

    return `

        <div class="product-attribute">

            <span class="product-attribute-name">

                ${escapeHtml(
                    label
                )}:

            </span>


            <span class="product-attribute-value">

                ${escapeHtml(
                    formattedValue
                )}

            </span>

        </div>

    `;
}


// ======================================================
// Форматирование значения
// ======================================================

function formatValue(value) {

    if (
        typeof value === "boolean"
    ) {

        return value
            ? "Да"
            : "Нет";
    }


    if (
        value === null ||
        value === undefined
    ) {

        return "";
    }


    return String(value);
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

