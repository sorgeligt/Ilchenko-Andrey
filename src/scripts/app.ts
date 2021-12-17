import {ThemeControl} from "./theme";
import {animateCreateNewListElemButton} from "./buttonThemeAnimation"
import {SkillListControl, SkillListListeners, SkillListSaver} from "./skillList"


document.addEventListener("DOMContentLoaded", () => {
    // theme changer
    const themeControl: ThemeControl = new ThemeControl('light-mode', 'checkbox_theme',
        "body");
    themeControl.changeThemeListener();

    //animate theme button
    animateCreateNewListElemButton("skill-input", "percent-input", "add-skill-btn");

    //init fields for skillListListeners
    const skillListSaver = new SkillListSaver("skills");
    const skillListControl = new SkillListControl(6);
    const listWrapperElements: HTMLElement = document.getElementById("skills-list");
    const inputProgressPercent = document.getElementById("percent-input");
    const form = document.getElementById("skill-input-form");
    const inputs = document.getElementsByClassName("input");
    const skillListListeners = new SkillListListeners(listWrapperElements, inputProgressPercent, form,
        inputs, skillListSaver, skillListControl);

    // upload local storage
    skillListSaver.loadLocalStorage(listWrapperElements);

    //listeners for control skill list
    skillListListeners.inputValidateListener();
    skillListListeners.submitListener();
    skillListListeners.deleteListener();
});

