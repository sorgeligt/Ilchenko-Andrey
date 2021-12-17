import {HTMLClass, HTMLId} from "./interfaces";

export class ThemeControl {
    private readonly nameClassLightTheme: HTMLClass;
    private readonly buttonChangeTheme: HTMLElement;
    /*Element for adding a light theme class*/
    private readonly themeVisibilityHTMLElement: HTMLElement;

    constructor(nameClassLightTheme: HTMLClass, idButtonChangeTheme: HTMLId, idThemeVisibilityHTMLElement: HTMLId) {
        this.nameClassLightTheme = nameClassLightTheme;
        this.buttonChangeTheme = document.getElementById(idButtonChangeTheme);
        this.themeVisibilityHTMLElement = document.querySelector(idThemeVisibilityHTMLElement);
    }

    public changeThemeListener(): void {
        this.buttonChangeTheme.addEventListener('click', () => {
            this.toggleClassTheme();
        });
    }

    private toggleClassTheme(): void {
        this.themeVisibilityHTMLElement.classList.toggle(this.nameClassLightTheme);
    }
}