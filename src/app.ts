function changeThemeListener() {
    const button: HTMLElement = document.getElementById('checkbox_theme');
    button.addEventListener('click', () => {
        document.querySelector("#body").classList.toggle("light-mode");
    });
}

document.addEventListener("DOMContentLoaded", changeThemeListener);

//const input1 = document.getElementById("search-input1");
const input2 = document.getElementById("search-input2");
const input3 = document.getElementById("search-input3");
const searchBtn = document.getElementById("search-btn");

const expand = () => {
    searchBtn.classList.toggle("close");
    searchBtn.classList.toggle("plus");
        // input1.classList.toggle("square");
        // input1.classList.toggle("hidden");
    input2.classList.toggle("square");
    input2.classList.toggle("hidden");
    input3.classList.toggle("square");
    input3.classList.toggle("hidden");
};

searchBtn.addEventListener("click", expand);
