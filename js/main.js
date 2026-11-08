document.addEventListener("DOMContentLoaded", async () => {   // Ждём полной загрузки DOM, затем запускаем async-колбэк

    const headerContainer =                                    // Ищем контейнер, в который будет вставлен header
        document.getElementById("header-container");

    if (!headerContainer) {                                    // Если контейнера нет на странице —
        return;                                                //   ничего не делаем и выходим
    }

    try {

        const response =                                       // Запрашиваем HTML-файл шапки
            await fetch("header.html");

        if (!response.ok) {                                    // Если сервер вернул не 2xx —
            throw new Error(                                   //   кидаем ошибку, чтобы попасть в catch
                "Не удалось загрузить header"
            );
        }

        headerContainer.innerHTML =                            // Вставляем полученный HTML в контейнер
            await response.text();

        // Инициализация меню после загрузки header
        initMegaMenu();                                        // Навешиваем обработчики на пункты мега-меню

        // Инициализация ссылок каталога
        initCatalogLinks();                                    // Навешиваем обработчики на ссылки каталога

    } catch (error) {

        console.error(                                         // Логируем ошибку загрузки шапки
            "Ошибка загрузки header:",
            error
        );
    }

});


/* =========================================
   MEGA MENU
   ========================================= */

function initMegaMenu() {                                      // Инициализация поведения мега-меню на мобильных

    const megaItems =                                          // Находим все пункты мега-меню
        document.querySelectorAll(".mega-item");

    megaItems.forEach(item => {                                // Проходим по каждому пункту

        const link =                                           // Ссылка верхнего уровня этого пункта (только прямая, :scope)
            item.querySelector(":scope > .mega-link");

        const popup =                                          // Выпадающее подменю этого пункта (только прямое)
            item.querySelector(":scope > .mega-popup");

        // Если у пункта нет вложенного меню,
        // обработчик не нужен
        if (!link || !popup) {                                 // Пропускаем пункты без ссылки или без подменю
            return;
        }

        link.addEventListener("click", event => {              // Клик по ссылке пункта

            // На компьютере работает CSS :hover
            if (window.innerWidth > 991.98) {                  // На десктопе ничего не перехватываем —
                return;                                        //   пусть работает hover через CSS
            }

            // На мобильном не переходим по #
            event.preventDefault();                            // Отменяем переход по ссылке на мобильном

            // Не даём событию открыть/закрыть
            // родительские пункты
            event.stopPropagation();                           // Останавливаем всплытие, чтобы не сработали обработчики выше

            const parent =                                     // Родительский контейнер списка пунктов
                item.parentElement;

            // Закрываем соседние пункты
            parent
                .querySelectorAll(                             // Ищем уже открытые пункты-соседи
                    ":scope > .mega-item.open"
                )
                .forEach(openItem => {

                    if (openItem !== item) {                   // Все открытые, кроме текущего —

                        openItem.classList.remove(             //   закрываем (убираем класс open)
                            "open"
                        );

                    }

                });

            // Переключаем текущий пункт
            item.classList.toggle("open");                     // Открываем/закрываем текущий пункт

        });

    });

}


/* =========================================
   ССЫЛКИ КАТАЛОГА
   ========================================= */

function initCatalogLinks() {                                  // Инициализация ссылок каталога (добавление параметров в URL)

    document
        .querySelectorAll(".catalog-link")                     // Находим все ссылки каталога
        .forEach(link => {

            link.addEventListener("click", () => {             // По клику на ссылку (до перехода)

                const json =                                   // Берём из data-атрибута имя json-конфига
                    link.dataset.json;

                const filters =                                // Берём из data-атрибута конфиг фильтров
                    link.dataset.filterConfig;

                if (!json) {                                   // Если json не задан —
                    return;                                    //   ничего не меняем в ссылке
                }

                const url =                                    // Собираем абсолютный URL из href ссылки
                    new URL(
                        link.href,
                        window.location.href
                    );

                url.searchParams.set(                          // Добавляем параметр ?json=...
                    "json",
                    json
                );

                if (filters) {                                 // Если есть конфиг фильтров —

                    url.searchParams.set(                      //   добавляем параметр ?filters=...
                        "filters",
                        filters
                    );

                }

                link.href =                                    // Записываем обновлённый URL обратно в ссылку —
                    url.toString();                            //   браузер перейдёт уже с нужными параметрами

            });

        });

}