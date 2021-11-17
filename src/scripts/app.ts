import {Conserved, HTMLClass, HTMLId, ProgressList} from "./interfaces";

class ThemeControl {
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

class SkillList implements ProgressList, Conserved {
    form: HTMLElement;
    inputProgressName: HTMLElement;
    inputProgressPercent: HTMLElement;
    inputsClassName: HTMLClass;
    listWrapperElements: HTMLElement;
    localStorageName: string;
    maxListElemsQuantity: number;

    constructor(idButtonNewProgressElem: HTMLId, idForm: HTMLId, idInputProgressName: HTMLId,
                idInputProgressPercent: HTMLId, idListWrapperElements: HTMLId, localStorageName: string,
                inputsClassName: HTMLClass, maxListElemsQuantity: number) {
        this.form = document.getElementById(idForm);
        this.inputProgressName = document.getElementById(idInputProgressName);
        this.inputProgressPercent = document.getElementById(idInputProgressPercent);
        this.listWrapperElements = document.getElementById(idListWrapperElements);
        this.localStorageName = localStorageName;
        this.inputsClassName = inputsClassName;
        this.maxListElemsQuantity = maxListElemsQuantity;
    }

    deleteProgressElemListener() {
        this.listWrapperElements.addEventListener('change', (event) => {
            const changeNode: HTMLInputElement = event.target as HTMLInputElement;
            changeNode.parentElement.remove();
            this.saveLocalStorage();
        })
    }

    inputValidateListener() {
        const percentInput: HTMLElement = this.inputProgressPercent;
        const invalidStyleClass: string = "invalid-text";
        (percentInput as HTMLInputElement).addEventListener('input', function validate() {
            if (parseInt(this.value) > 100 || parseInt(this.value) < 0) {
                percentInput.classList.add(invalidStyleClass);
            } else {
                percentInput.classList.remove(invalidStyleClass);
            }
        })
    }

    submitProgressElemListener() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            const {value1, value2} = SkillList.getTwoInputValueByClass(this.inputsClassName);
            if (!this.addNewSkillElem(value1, value2)) {
                alert('К сожалению, Вы не можете добавить больше 6 навыков. Удалите что-нибудь для добавления.')
                return;
            }
            this.saveLocalStorage();
        })
    }

    loadLocalStorage() {
        if (localStorage.getItem(this.localStorageName)) {
            this.listWrapperElements.innerHTML = localStorage.getItem(this.localStorageName);
        }
    }

    saveLocalStorage() {
        localStorage.setItem(this.localStorageName, this.listWrapperElements.innerHTML);
    }

    private static getTwoInputValueByClass(className: string): { value1: string, value2: number } {
        const value1: string = (document.getElementsByClassName(className) as
            HTMLCollectionOf<HTMLInputElement>)[0].value;
        const value2: number = parseInt((document.getElementsByClassName(className) as
            HTMLCollectionOf<HTMLInputElement>)[1].value);
        return {value1, value2};
    }

    private addNewSkillElem(skill: string, percent: number): boolean {
        if (this.listWrapperElements.children.length >= this.maxListElemsQuantity) {
            return false;
        }
        let newSkillLiElem = SkillList.getNewSkillLiElem(skill, percent);
        this.listWrapperElements.innerHTML += newSkillLiElem;
        return true;
    }

    private static getNewSkillLiElem(skill: string, percent: number): string {
        return `
            <li class="skills-list__elem">
                ${skill + ":"}
                <div style="flex: 1"></div>
                <div class="skills-list__progress-wrapper">
                    <div class="skills-list__progress-done" style="width: ${percent}%">
                        ${percent >= 10 ? percent + "%" : ""}
                    </div>
                </div>
                <input id="checkbox-del${(new Date).getTime()}" type="checkbox"  width="100px" alt=""
                       class="skills-list__delete-btn"/>
                <label for="checkbox-del${(new Date).getTime()}" class="skills-list__label-delete-btn"></label>
            </li>`;
    }
}

/*elem.disabled === true ? false : true*/
function changeDisabledField(elem: HTMLInputElement): void {
    elem.disabled = elem.disabled !== true;
}

function animateCreateNewListElemButton(idSkillInput: HTMLId, idPercentInput: HTMLId, idCreateButton: HTMLId): void {
    const skillInput: HTMLElement = document.getElementById(idSkillInput);
    const percentInput: HTMLElement = document.getElementById(idPercentInput);
    const createButton: HTMLElement = document.getElementById(idCreateButton);

    createButton.addEventListener("click", () => {
        createButton.classList.toggle("close");
        skillInput.classList.toggle("square");
        changeDisabledField(skillInput as HTMLInputElement);
        percentInput.classList.toggle("square");
        changeDisabledField(percentInput as HTMLInputElement);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const skillList1: SkillList = new SkillList("add-skill-btn", "skill-input-form",
        "skill-input", "percent-input", "skills-list",
        'skills', 'input', 6);
    let themeControl: ThemeControl = new ThemeControl('light-mode', 'checkbox_theme',
        "body");
    skillList1.loadLocalStorage();
    themeControl.changeThemeListener();
    animateCreateNewListElemButton("skill-input", "percent-input", "add-skill-btn");
    skillList1.inputValidateListener();
    skillList1.submitProgressElemListener();
    skillList1.deleteProgressElemListener();
});