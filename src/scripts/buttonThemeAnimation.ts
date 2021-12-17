import {HTMLId} from "./interfaces";

/*elem.disabled === true ? false : true*/
function changeDisabledField(elem: HTMLInputElement): void {
    elem.disabled = elem.disabled !== true;
}

export function animateCreateNewListElemButton(idSkillInput: HTMLId, idPercentInput: HTMLId, idCreateButton: HTMLId): void {
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