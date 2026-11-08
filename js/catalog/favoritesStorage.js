
const STORAGE_KEY = "monarhFavorites";

// Получить уникальный ключ товара
export function getProductKey(product) {
    return product.id
        ? String(product.id)
        : `${product.name}::${product.image}`;
}

// Получить все избранные товары
export function getFavorites() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
        return [];
    }
}

// Проверить, находится ли товар в избранном
export function isFavorite(product) {
    const key = getProductKey(product);

    return getFavorites().some(
        item => getProductKey(item) === key
    );
}

// Добавить или удалить товар
export function toggleFavorite(product) {
    const favorites = getFavorites();
    const key = getProductKey(product);

    const index = favorites.findIndex(
        item => getProductKey(item) === key
    );

    if (index !== -1) {
        favorites.splice(index, 1);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
        return false;
    }

    favorites.push(product);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));

    return true;
}
