export async function loadProducts(jsonFile) {

    if (!jsonFile) {
        throw new Error("JSON-файл не указан");
    }

    const response = await fetch(jsonFile);

    if (!response.ok) {
        throw new Error(
            `Не удалось загрузить JSON: ${response.status}`
        );
    }

    return await response.json();
}