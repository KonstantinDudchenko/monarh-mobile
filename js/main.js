document.addEventListener("DOMContentLoaded", async () => {

    const headerContainer =
        document.getElementById("header-container");

    if (!headerContainer) {
        return;
    }

    try {

        const response = await fetch("header.html");

        if (!response.ok) {
            throw new Error("Не удалось загрузить header");
        }

        headerContainer.innerHTML = await response.text();

    } catch (error) {
        console.error("Ошибка загрузки header:", error);
    }

});

document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".catalog-link").forEach(link => {

        link.addEventListener("click", () => {

            const json = link.dataset.json;
            const filters = link.dataset.filterConfig;

            const url = new URL(link.href, window.location.href);

            url.searchParams.set("json", json);
            url.searchParams.set("filters", filters);

            link.href = url.toString();
        });

    });

});