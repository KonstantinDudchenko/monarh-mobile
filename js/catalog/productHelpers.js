export function renderAttribute(key, value, filters = {}) {

    const filter = filters[key];

    if (!filter) return "";

    const label = filter.label || key;
    const unit = filter.unit || "";

    let formattedValue;

    if (typeof value === "boolean") {
        formattedValue = value ? "Да" : "Нет";
    }
    else if (Array.isArray(value)) {
        formattedValue = value.map(formatValue).join(", ");
    }
    else if (value !== null && typeof value === "object") {
        formattedValue = Object.entries(value)
            .map(([key, val]) => `${key}: ${formatValue(val)}`)
            .join(", ");
    }
    else {
        formattedValue = String(value ?? "");
    }

    if (unit && formattedValue) {
        formattedValue += ` ${unit}`;
    }

    return `
        <div class="product-attribute">
            <span class="product-attribute-name">
                ${escapeHtml(label)}:
            </span>
            <span class="product-attribute-value">
                ${escapeHtml(formattedValue)}
            </span>
        </div>
    `;
}


function formatValue(value) {

    if (typeof value === "boolean") return value ? "Да" : "Нет";

    if (value === null || value === undefined) return "";

    return String(value);
}


function escapeHtml(value) {
    const div = document.createElement("div");
    div.textContent = value ?? "";
    return div.innerHTML;
}