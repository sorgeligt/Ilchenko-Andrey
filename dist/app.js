document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('checkbox_theme').onclick = function () {
        let portfolioCardClassList = document.querySelector("#body").classList;
        portfolioCardClassList.toggle("light-mode");
    };
});
