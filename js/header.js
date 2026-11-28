/*
document.addEventListener("DOMContentLoaded", async () => {
    const headerContainer = document.getElementById("header-container");

    try {
        const response = await fetch("header.html");

        if (!response.ok) {
            throw new Error("Не удалось загрузить Header");
        }

        headerContainer.innerHTML = await response.text();

    } catch (error) {
        console.error("Ошибка загрузки Header:", error);
    }
});*/
