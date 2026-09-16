<script>
document.addEventListener('DOMContentLoaded', function () {

    const megaLinks = document.querySelectorAll(
        '.mega-menu .mega-item > .mega-link'
    );

    megaLinks.forEach(function (link) {

        link.addEventListener('click', function (e) {

            /* Только мобильная версия */
            if (window.innerWidth > 991.98) {
                return;
            }

            const item = this.parentElement;
            const popup = item.querySelector(':scope > .mega-popup');

            /* Если у пункта нет вложенного меню —
               обычная ссылка */
            if (!popup) {
                return;
            }

            /* Не переходим по # */
            e.preventDefault();
            e.stopPropagation();

            /* Закрываем соседние подменю */
            const parent = item.parentElement;

            parent.querySelectorAll(':scope > .mega-item.open').forEach(function (openItem) {

                if (openItem !== item) {
                    openItem.classList.remove('open');
                }

            });

            /* Открываем / закрываем текущее */
            item.classList.toggle('open');

        });

    });

});
</script>