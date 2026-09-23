document.addEventListener("DOMContentLoaded", async () => {

    const headerContainer =
        document.getElementById("header-container");

    if (!headerContainer) {
        return;
    }

    try {

        const response =
            await fetch("header.html");

        if (!response.ok) {
            throw new Error(
                "Не удалось загрузить header"
            );
        }

        headerContainer.innerHTML =
            await response.text();

        // Инициализация меню после загрузки header
        initMegaMenu();

        // Инициализация ссылок каталога
        initCatalogLinks();

    } catch (error) {

        console.error(
            "Ошибка загрузки header:",
            error
        );
    }

});


/* =========================================
   MEGA MENU
   ========================================= */

function initMegaMenu() {

    const megaItems =
        document.querySelectorAll(".mega-item");

    megaItems.forEach(item => {

        const link =
            item.querySelector(":scope > .mega-link");

        const popup =
            item.querySelector(":scope > .mega-popup");

        // Если у пункта нет вложенного меню,
        // обработчик не нужен
        if (!link || !popup) {
            return;
        }

        link.addEventListener("click", event => {

            // На компьютере работает CSS :hover
            if (window.innerWidth > 991.98) {
                return;
            }

            // На мобильном не переходим по #
            event.preventDefault();

            // Не даём событию открыть/закрыть
            // родительские пункты
            event.stopPropagation();

            const parent =
                item.parentElement;

            // Закрываем соседние пункты
            parent
                .querySelectorAll(
                    ":scope > .mega-item.open"
                )
                .forEach(openItem => {

                    if (openItem !== item) {

                        openItem.classList.remove(
                            "open"
                        );

                    }

                });

            // Переключаем текущий пункт
            item.classList.toggle("open");

        });

    });

}


/* =========================================
   ССЫЛКИ КАТАЛОГА
   ========================================= */

function initCatalogLinks() {

    document
        .querySelectorAll(".catalog-link")
        .forEach(link => {

            link.addEventListener("click", () => {

                const json =
                    link.dataset.json;

                const filters =
                    link.dataset.filterConfig;

                if (!json) {
                    return;
                }

                const url =
                    new URL(
                        link.href,
                        window.location.href
                    );

                url.searchParams.set(
                    "json",
                    json
                );

                if (filters) {

                    url.searchParams.set(
                        "filters",
                        filters
                    );

                }

                link.href =
                    url.toString();

            });

        });

}