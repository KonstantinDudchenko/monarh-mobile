let lastScroll = 0;

const header = document.getElementById("header-container");

window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    // В самом верху Header всегда виден
    if (currentScroll <= 100) {
        header.classList.remove("header-hidden");
    }
    // Прокрутка вниз
    else if (currentScroll > lastScroll) {
        header.classList.add("header-hidden");
    }
    // Прокрутка вверх
    else {
        header.classList.remove("header-hidden");
    }

    lastScroll = currentScroll;
});