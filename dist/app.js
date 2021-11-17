var ThemeChanger = /** @class */ (function () {
    function ThemeChanger(nameClassLightTheme, themeVisibilityHTMLElement) {
        this.themeVisibilityHTMLElement = document.querySelector("body");
        this.nameClassLightTheme = nameClassLightTheme;
        if (themeVisibilityHTMLElement) {
            this.themeVisibilityHTMLElement = themeVisibilityHTMLElement;
        }
    }
    ThemeChanger.prototype.toggleClassTheme = function () {
        this.themeVisibilityHTMLElement.classList.toggle(this.nameClassLightTheme);
    };
    return ThemeChanger;
}());
function changeThemeListener() {
    var button = document.getElementById('checkbox_theme');
    var themeChanger = new ThemeChanger("light-mode", document.querySelector("#body"));
    button.addEventListener('click', function () {
        themeChanger.toggleClassTheme();
    });
}
var skillList = /** @class */ (function () {
    function skillList(idButtonNewProgressElem, idForm, idInputProgressName, idInputProgressPercent, idListWrapperElements, localStorageName, inputsInfoAboutProgressClass) {
        this.idButtonNewProgressElem = idButtonNewProgressElem;
        this.form = document.getElementById(idForm);
        this.idInputProgressName = idInputProgressName;
        this.idInputProgressPercent = idInputProgressPercent;
        this.listWrapperElements = document.getElementById(idListWrapperElements);
        this.localStorageName = localStorageName;
        this.inputsInfoAboutProgressClass = inputsInfoAboutProgressClass;
    }
    skillList.prototype.deleteProgressElemListener = function () {
        var _this = this;
        this.listWrapperElements.addEventListener('change', function (event) {
            var changeNode = event.target;
            changeNode.parentElement.remove();
            _this.saveLocalStorage();
        });
    };
    skillList.prototype.inputPercentListener = function () {
        var percentInput = document.getElementById("percent-input");
        var percentHTMLInputElem = percentInput;
        percentHTMLInputElem.addEventListener('input', function validate() {
            if (parseInt(this.value) > 100 || parseInt(this.value) < 0) {
                percentInput.classList.add("invalid-text");
            }
            else {
                percentInput.classList.remove("invalid-text");
            }
        });
    };
    skillList.prototype.submitProgressElemListener = function () {
        var _this = this;
        this.form.addEventListener('submit', function (e) {
            e.preventDefault();
            var _a = _this.getTwoInputValueByClass(_this.inputsInfoAboutProgressClass), value1 = _a.value1, value2 = _a.value2;
            var skillList = _this.listWrapperElements;
            if (!SkillListControl.addNewSkillElem(skillList, value1, value2)) {
                alert('К сожалению, Вы не можете добавить больше 6 навыков. Удалите что-нибудь для добавления.');
                return;
            }
            _this.saveLocalStorage();
        });
    };
    skillList.prototype.loadLocalStorage = function () {
        if (localStorage.getItem('skills')) {
            document.getElementById('skills-list').innerHTML = localStorage.getItem('skills');
        }
    };
    skillList.prototype.saveLocalStorage = function () {
        localStorage.setItem('skills', document.getElementById("skills-list").innerHTML);
    };
    skillList.prototype.getTwoInputValueByClass = function (className) {
        var value1 = document.getElementsByClassName(className)[0].value;
        var value2 = parseInt(document.getElementsByClassName(className)[1].value);
        return { value1: value1, value2: value2 };
    };
    return skillList;
}());
var SkillListControl = /** @class */ (function () {
    function SkillListControl() {
    }
    SkillListControl.addNewSkillElem = function (skillList, skill, percent) {
        if (skillList.children.length >= 6) {
            return false;
        }
        var newSkillLiElem = this.getNewSkillLiElem(skill, percent);
        skillList.innerHTML += newSkillLiElem;
        return true;
    };
    SkillListControl.getNewSkillLiElem = function (skill, percent) {
        return "\n            <li class=\"skills-list__elem\">\n                " + (skill + ":") + "\n                <div style=\"flex: 1\"></div>\n                <div class=\"skills-list__progress-wrapper\">\n                    <div class=\"skills-list__progress-done\" style=\"width: " + percent + "%\">\n                        " + (percent >= 10 ? percent + "%" : "") + "\n                    </div>\n                </div>\n                <input id=\"checkbox-del" + (new Date).getTime() + "\" type=\"checkbox\"  width=\"100px\" alt=\"\"\n                       class=\"skills-list__delete-btn\"/>\n                <label for=\"checkbox-del" + (new Date).getTime() + "\" class=\"skills-list__label-delete-btn\"></label>\n            </li>";
    };
    return SkillListControl;
}());
function buttonAnimateTransform() {
    var skillInput = document.getElementById("skill-input");
    var percentInput = document.getElementById("percent-input");
    var addBtn = document.getElementById("add-skill-btn");
    var skillHTMLInputElem = skillInput;
    var percentHTMLInputElem = percentInput;
    addBtn.addEventListener("click", function () {
        addBtn.classList.toggle("close");
        skillInput.classList.toggle("square");
        skillHTMLInputElem.disabled = skillHTMLInputElem.disabled !== true;
        percentInput.classList.toggle("square");
        percentHTMLInputElem.disabled = percentHTMLInputElem.disabled !== true;
    });
}
document.addEventListener("DOMContentLoaded", function () {
    var skillList1 = new skillList("add-skill-btn", "skill-input-form", "skill-input", "percent-input", "skills-list", 'skills', 'input');
    skillList1.loadLocalStorage();
    changeThemeListener();
    buttonAnimateTransform();
    skillList1.inputPercentListener();
    skillList1.submitProgressElemListener();
    skillList1.deleteProgressElemListener();
});
System.register("interface", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
