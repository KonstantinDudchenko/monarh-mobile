fetch("footer.html")
    .then(response => {
        if (!response.ok) {
            throw new Error("Ошибка загрузки footer");
        }
        return response.text();
    })
    .then(html => {
        document.getElementById("footer-container").innerHTML = html;
    })
    .catch(error => console.error(error));