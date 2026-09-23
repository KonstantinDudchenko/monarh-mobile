export function renderCatalogTitle(
    title,
    productsCount
) {

    const titleElement =
        document.getElementById("catalogTitle");

    const countElement =
        document.getElementById("productsCount");

    if (titleElement) {
        titleElement.textContent =
            title || "Каталог";
    }

    if (countElement) {

        countElement.textContent =
            formatProductsCount(productsCount);
    }
}


function formatProductsCount(count) {

    if (count === 0) {
        return "Ничего не найдено";
    }

    if (
        count % 10 === 1 &&
        count % 100 !== 11
    ) {
        return `${count} товар`;
    }

    if (
        count % 10 >= 2 &&
        count % 10 <= 4 &&
        (
            count % 100 < 10 ||
            count % 100 >= 20
        )
    ) {
        return `${count} товара`;
    }

    return `${count} товаров`;
}