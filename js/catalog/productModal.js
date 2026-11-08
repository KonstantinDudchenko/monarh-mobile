import { attributeLabels } from "./attributeLabels.js";

// ======================================================
// Открытие модального окна товара
// ======================================================

export function openProductModal(product, filters = {}) {

    const modal = document.getElementById("productModal");

    // Заполняем основную информацию
    document.getElementById("modalProductTitle").textContent =
        product.name || "Товар";

    document.getElementById("modalProductPrice").textContent =
        `${product.price ?? ""} ₽`;

    document.getElementById("modalProductDescription").textContent =
        product.description || "";

    // Заполняем фотографию
    const image = document.getElementById("modalProductImage");

    image.src = product.image || "";
    image.alt = product.name || "Товар";

    // Получаем все характеристики
    const attributes = Object.entries(product.attributes || {});

    document.getElementById("modalProductAttributes").innerHTML =
        attributes.map(([key, value]) => {

           const config = filters[key] || {};

           const label = attributeLabels[key] || config.label || key;
           const unit = config.unit || "";

            let formattedValue;

            if (typeof value === "boolean") {
                formattedValue = value ? "Да" : "Нет";
            } else if (Array.isArray(value)) {
                formattedValue = value.join(", ");
            } else {
                formattedValue = value ?? "";
            }

            if (unit && formattedValue !== "") {
                formattedValue += ` ${unit}`;
            }

            return `
                <div class="d-flex justify-content-between gap-3 border-bottom py-2">
                    <span class="text-muted">
                        ${escapeHtml(label)}
                    </span>

                    <span class="text-end fw-medium">
                        ${escapeHtml(formattedValue)}
                    </span>
                </div>
            `;

        }).join("");

    // Открываем Bootstrap Modal
    bootstrap.Modal.getOrCreateInstance(modal).show();
}


// Защита HTML
function escapeHtml(value) {

    const div = document.createElement("div");
    div.textContent = value ?? "";

    return div.innerHTML;
}

// Открытие фотографии на весь экран
document.getElementById("modalProductImage")
    .addEventListener("click", () => {

        const source = document.getElementById("modalProductImage").src;

        const fullscreenImage = document.getElementById("fullscreenImage");

        fullscreenImage.src = source;

        bootstrap.Modal
            .getOrCreateInstance(document.getElementById("imageModal"))
            .show();
    });