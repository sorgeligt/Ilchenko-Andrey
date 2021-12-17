import {Conserved, SimpleEventListener} from "./interfaces";

export class Skill {
    skill: string;
    percent: number;

    constructor(skill: string, percent: number) {
        this.skill = skill;
        this.percent = percent;
    }

    getSkillName(): string {
        return this.skill;
    }

    getPercent(): number {
        return this.percent;
    }
}

export class SkillView {
    static getVisualisation(skill: Skill): string {
        if (skill.getSkillName().includes("<script>")) {
            alert("Failed");
        }
        return `
            <li class="skills-list__elem">
                ${skill.getSkillName() + ":"}
                <div class="flex-box-full"></div>
                <div class="skills-list__progress-wrapper">
                    <div class="skills-list__progress-done" style="width: ${skill.getPercent()}%">
                        ${skill.getPercent() >= 10 ? skill.getPercent() + "%" : ""}
                    </div>
                </div>
                <input id="checkbox-del${(new Date).getTime()}" type="checkbox"  width="100px" alt=""
                       class="skills-list__delete-btn"/>
                <label for="checkbox-del${(new Date).getTime()}" class="skills-list__label-delete-btn"></label>
            </li>`;
    }
}

export class SkillListSaver implements Conserved {
    localStorageName: string;

    constructor(localStorageName: string) {
        this.localStorageName = localStorageName;
    }

    loadLocalStorage(listWrapperElements: HTMLElement) {
        if (localStorage.getItem(this.localStorageName)) {
            listWrapperElements.innerHTML = localStorage.getItem(this.localStorageName);
        }
    }

    saveLocalStorage(listWrapperElements: HTMLElement) {
        localStorage.setItem(this.localStorageName, listWrapperElements.innerHTML);
    }
}

export class SkillListListeners implements SimpleEventListener {
    listWrapperElements: HTMLElement;
    inputProgressPercent: HTMLElement;
    form: HTMLElement;
    inputs: HTMLCollectionOf<Element>;
    storageEntry: SkillListSaver;
    skillListEntry: SkillListControl;

    constructor(listWrapperElements: HTMLElement, inputProgressPercent: HTMLElement, form: HTMLElement,
                inputs: HTMLCollectionOf<Element>, storageEntry: SkillListSaver, skillListEntry: SkillListControl) {
        this.listWrapperElements = listWrapperElements;
        this.inputProgressPercent = inputProgressPercent;
        this.form = form;
        this.inputs = inputs;
        this.storageEntry = storageEntry;
        this.skillListEntry = skillListEntry;
    }

    deleteListener() {
        this.listWrapperElements.addEventListener('change', (event) => {
            this.skillListEntry.deleteSkill(event.target as Element)
            this.storageEntry.saveLocalStorage(this.listWrapperElements);
        })
    }

    submitListener() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            const value1: string = (this.inputs[0] as HTMLInputElement).value;
            const value2: number = parseInt((this.inputs[1] as HTMLInputElement).value);
            if (!this.skillListEntry.addNewSkill(new Skill(value1, value2), this.listWrapperElements)) {
                alert('К сожалению, Вы не можете добавить больше 6 навыков. Удалите что-нибудь для добавления.')
                return;
            }
            this.storageEntry.saveLocalStorage(this.listWrapperElements);
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
}

export class SkillListControl {
    maxListElemsQuantity: number;

    constructor(maxListElemsQuantity: number) {
        this.maxListElemsQuantity = maxListElemsQuantity;
    }

    addNewSkill(skill: Skill, listWrapperElements: HTMLElement): boolean {
        if (listWrapperElements.children.length >= this.maxListElemsQuantity) {
            return false;
        }
        let newSkillLiElem = SkillView.getVisualisation(skill);
        listWrapperElements.innerHTML += newSkillLiElem;
        return true;
    }

    deleteSkill(target: Element): void {
        target.parentElement.remove();
    }
}