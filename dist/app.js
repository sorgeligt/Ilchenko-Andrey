function changeThemeListener() {
    const button = document.getElementById('checkbox_theme');
    button.addEventListener('click', () => {
        document.querySelector("#body").classList.toggle("light-mode");
    });
}

document.addEventListener("DOMContentLoaded", changeThemeListener);
