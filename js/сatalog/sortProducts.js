export function sortProducts(
    products,
    sortType
) {

    const sortedProducts = [...products];

    switch (sortType) {

        case "price-asc":

            sortedProducts.sort(
                (a, b) =>
                    Number(a.price) -
                    Number(b.price)
            );

            break;

        case "price-desc":

            sortedProducts.sort(
                (a, b) =>
                    Number(b.price) -
                    Number(a.price)
            );

            break;

        default:
            break;
    }

    return sortedProducts;
}