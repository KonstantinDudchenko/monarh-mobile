export function renderProducts(
    products,
    container
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

    products.forEach(product => {

        const col = document.createElement("div");

        col.className =
            "col-xl-4 col-lg-6 col-md-6 col-sm-6";

        col.innerHTML = createProductCard(product);

        container.appendChild(col);
    });
}


function createProductCard(product) {

    return `
        <div class="card h-100 product-card">

            <img
                src="${product.image}"
                class="card-img-top"
                alt="${escapeHtml(product.name)}"
                loading="lazy"
            >

            <div class="card-body d-flex flex-column">

                <h5 class="card-title">
                    ${escapeHtml(product.name)}
                </h5>

                <p class="card-text text-muted">
                    ${escapeHtml(product.description || "")}
                </p>

                <div class="mt-auto">

                    <div class="fw-bold fs-5 mb-2">
                        ${product.price} ₽
                    </div>

                    <button
                        class="btn btn-warning w-100"
                        type="button"
                    >
                        Подробнее
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