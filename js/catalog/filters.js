export function createFilters(
    products,
    container,
    onFilterChange,
    filtersConfig = {}
) {

    container.innerHTML = `
        <h5 class="filters-title p-4">Фильтры товаров</h5>
    `;

    if (!products.length) {
        return;
    }

    const attributes = {};

    products.forEach(product => {

        if (!product.attributes) {
            return;
        }

        Object.entries(product.attributes).forEach(
            ([key, value]) => {

                if (
                    value === null ||
                    value === undefined
                ) {
                    return;
                }

                if (!attributes[key]) {
                    attributes[key] = new Set();
                }

                attributes[key].add(
                    String(value)
                );
            }
        );
    });

    Object.entries(attributes).forEach(
        ([key, values]) => {

            const config =
                filtersConfig[key];

            if (!config) {
                return;
            }

            const wrapper =
                document.createElement("div");

            wrapper.className = "mb-4";

            const title =
                document.createElement("h6");

            title.textContent =
                config.label || key;

            wrapper.appendChild(title);

            const uniqueValues =
                [...values];

            if (isBoolean(uniqueValues)) {

                createBooleanFilter(
                    wrapper,
                    key,
                    uniqueValues,
                    onFilterChange
                );

            } else {

                createSelectFilter(
                    wrapper,
                    key,
                    uniqueValues,
                    onFilterChange,
                    config
                );
            }

            container.appendChild(wrapper);
        }
    );
}


function createSelectFilter(
    container,
    key,
    values,
    onFilterChange,
    config = {}
) {

    const select =
        document.createElement("select");

    select.className = "form-select";

    select.dataset.filter = key;

    const allOption =
        document.createElement("option");

    allOption.value = "";
    allOption.textContent = "Все";

    select.appendChild(allOption);

    values.sort((a, b) =>
        a.localeCompare(
            b,
            "ru",
            {
                numeric: true
            }
        )
    );

    values.forEach(value => {

        const option =
            document.createElement("option");

        option.value = value;

        option.textContent =
            formatValue(
                value,
                config
            );

        select.appendChild(option);
    });

    select.addEventListener(
        "change",
        () => {

            onFilterChange(
                key,
                select.value
            );
        }
    );

    container.appendChild(select);
}


function createBooleanFilter(
    container,
    key,
    values,
    onFilterChange
) {

    const select =
        document.createElement("select");

    select.className = "form-select";

    select.dataset.filter = key;

    const allOption =
        document.createElement("option");

    allOption.value = "";
    allOption.textContent = "Все";

    select.appendChild(allOption);

    values.forEach(value => {

        const option =
            document.createElement("option");

        option.value = value;

        option.textContent =
            value === "true"
                ? "Да"
                : "Нет";

        select.appendChild(option);
    });

    select.addEventListener(
        "change",
        () => {

            onFilterChange(
                key,
                select.value
            );
        }
    );

    container.appendChild(select);
}


export function filterProducts(
    products,
    activeFilters
) {

    return products.filter(product => {

        if (!product.attributes) {
            return Object.keys(
                activeFilters
            ).length === 0;
        }

        return Object.entries(
            activeFilters
        ).every(
            ([key, selectedValue]) => {

                if (
                    selectedValue === "" ||
                    selectedValue === null ||
                    selectedValue === undefined
                ) {
                    return true;
                }

                const productValue =
                    product.attributes[key];

                return String(productValue) ===
                    String(selectedValue);
            }
        );
    });
}


function isBoolean(values) {

    return values.every(
        value =>
            value === "true" ||
            value === "false"
    );
}


function formatValue(
    value,
    config = {}
) {

    if (value === "true") {
        return "Да";
    }

    if (value === "false") {
        return "Нет";
    }

    if (config.unit) {
        return `${value} ${config.unit}`;
    }

    return value;
}