type id = string;

interface ProgressList {
    listWrapperElements: HTMLElement;
    localStorageName: string;
    form: HTMLElement;
    idInputProgressName: id;
    inputsInfoAboutProgressClass: string;
    idInputProgressPercent: id;
    idButtonNewProgressElem: id;
    submitProgressElemListener() : void;
    deleteProgressElemListener() : void;
    inputPercentListener() : void;
    loadLocalStorage() : void;
    saveLocalStorage() : void;
}
class ThemeChanger {
    private readonly nameClassLightTheme: string;
    private readonly themeVisibilityHTMLElement: HTMLElement = document.querySelector("body");

    constructor(nameClassLightTheme: string);
    constructor(nameClassLightTheme: string, themeVisibilityHTMLElement: HTMLElement);
    constructor(nameClassLightTheme: string, themeVisibilityHTMLElement?: HTMLElement) {
        this.nameClassLightTheme = nameClassLightTheme;
        if (themeVisibilityHTMLElement) {
            this.themeVisibilityHTMLElement = themeVisibilityHTMLElement;
        }
    }
    toggleClassTheme() {
        this.themeVisibilityHTMLElement.classList.toggle(this.nameClassLightTheme);
    }
}
function changeThemeListener() {
    const button: HTMLElement = document.getElementById('checkbox_theme');
    let themeChanger = new ThemeChanger("light-mode", document.querySelector("#body"));
    button.addEventListener('click', () => {
        themeChanger.toggleClassTheme();
    });
}


class skillList implements ProgressList {
    idButtonNewProgressElem: id;
    form: HTMLElement;
    idInputProgressName: id;
    inputsInfoAboutProgressClass: string;
    idInputProgressPercent: id;
    listWrapperElements: HTMLElement;
    localStorageName: string;


    constructor(idButtonNewProgressElem: id, idForm: id, idInputProgressName: id, idInputProgressPercent: id,
                idListWrapperElements: id, localStorageName: string, inputsInfoAboutProgressClass:string) {
        this.idButtonNewProgressElem = idButtonNewProgressElem;
        this.form = document.getElementById(idForm);
        this.idInputProgressName = idInputProgressName;
        this.idInputProgressPercent = idInputProgressPercent;
        this.listWrapperElements = document.getElementById(idListWrapperElements);
        this.localStorageName = localStorageName;
        this.inputsInfoAboutProgressClass = inputsInfoAboutProgressClass;
    }

    deleteProgressElemListener() {
        this.listWrapperElements.addEventListener('change', (event) => {
            let changeNode: HTMLInputElement = event.target as HTMLInputElement;
            changeNode.parentElement.remove();
            this.saveLocalStorage()
        })
    }

    inputPercentListener() {
        const percentInput: HTMLElement = document.getElementById("percent-input");
        const percentHTMLInputElem = percentInput as HTMLInputElement;
        percentHTMLInputElem.addEventListener('input', function validate() {
            if (parseInt(this.value) > 100 || parseInt(this.value) < 0) {
                percentInput.classList.add("invalid-text");
            } else {
                percentInput.classList.remove("invalid-text");
            }
        })
    }

    submitProgressElemListener() {
        this.form.addEventListener('submit', (e)=> {
            e.preventDefault();
            const {value1, value2} = this.getTwoInputValueByClass(this.inputsInfoAboutProgressClass);
            const skillList = this.listWrapperElements;
            if (!SkillListControl.addNewSkillElem(skillList, value1, value2)) {
                alert('К сожалению, Вы не можете добавить больше 6 навыков. Удалите что-нибудь для добавления.')
                return;
            }
            this.saveLocalStorage();
        })
    }

    loadLocalStorage() {
        if (localStorage.getItem('skills')) {
            document.getElementById('skills-list').innerHTML = localStorage.getItem('skills');
        }
    }

    saveLocalStorage() {
        localStorage.setItem('skills', document.getElementById("skills-list").innerHTML);
    }
    getTwoInputValueByClass(className: string): { value1: string, value2: number } {
        const value1: string = (document.getElementsByClassName(className) as
            HTMLCollectionOf<HTMLInputElement>)[0].value;
        const value2: number = parseInt((document.getElementsByClassName(className) as
            HTMLCollectionOf<HTMLInputElement>)[1].value);
        return {value1, value2};
    }

}

class SkillListControl {
    static addNewSkillElem(skillList: HTMLElement, skill: string, percent: number): boolean {
        if (skillList.children.length >= 6) {
            return false;
        }
        let newSkillLiElem = this.getNewSkillLiElem(skill, percent);
        skillList.innerHTML += newSkillLiElem;
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


function buttonAnimateTransform() {
    const skillInput: HTMLElement = document.getElementById("skill-input");
    const percentInput: HTMLElement = document.getElementById("percent-input");
    const addBtn: HTMLElement = document.getElementById("add-skill-btn");

    const skillHTMLInputElem = skillInput as HTMLInputElement;
    const percentHTMLInputElem = percentInput as HTMLInputElement;

    addBtn.addEventListener("click", () => {
        addBtn.classList.toggle("close");

        skillInput.classList.toggle("square");

        skillHTMLInputElem.disabled = skillHTMLInputElem.disabled !== true;

        percentInput.classList.toggle("square");
        percentHTMLInputElem.disabled = percentHTMLInputElem.disabled !== true;
    });

}


document.addEventListener("DOMContentLoaded", () => {
    let skillList1 = new skillList("add-skill-btn","skill-input-form",
        "skill-input", "percent-input", "skills-list",
        'skills', 'input');
    skillList1.loadLocalStorage();
    changeThemeListener();
    buttonAnimateTransform();
    skillList1.inputPercentListener();
    skillList1.submitProgressElemListener();
    skillList1.deleteProgressElemListener();
});

