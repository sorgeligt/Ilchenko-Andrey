function changeThemeListener() {
    const button: HTMLElement = document.getElementById('checkbox_theme');
    button.addEventListener('click', () => {
        document.querySelector("#body").classList.toggle("light-mode");
    });
}

document.addEventListener("DOMContentLoaded", changeThemeListener);

const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

const expand = () => {
    searchBtn.classList.toggle("close");
    searchBtn.classList.toggle("plus");
    input.classList.toggle("square");
};

searchBtn.addEventListener("click", expand);
