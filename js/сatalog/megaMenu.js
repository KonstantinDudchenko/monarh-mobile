document.addEventListener("DOMContentLoaded", () => {

    const megaItems =
        document.querySelectorAll(".mega-item");

    megaItems.forEach(item => {

        const link =
            item.querySelector(":scope > .mega-link");

        if (!link) {
            return;
        }

        const submenu =
            item.querySelector(":scope > .mega-popup");

        if (!submenu) {
            return;
        }

        link.addEventListener("click", (event) => {

            // Работаем только на мобильных
            if (window.innerWidth > 991) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            // Закрываем соседние пункты
            const parent =
                item.parentElement;

            parent
                .querySelectorAll(":scope > .mega-item.active")
                .forEach(activeItem => {

                    if (activeItem !== item) {
                        activeItem.classList.remove("active");
                    }
                });

            // Открываем / закрываем текущий
            item.classList.toggle("active");
        });

    });

});