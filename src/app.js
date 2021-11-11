document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('checkbox_theme').onclick = function () {
        document.querySelector("#body").classList.toggle("light-mode");
    }
})
