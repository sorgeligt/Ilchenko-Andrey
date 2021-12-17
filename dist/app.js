(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var theme_1 = require("./theme");
var buttonThemeAnimation_1 = require("./buttonThemeAnimation");
var skillList_1 = require("./skillList");
document.addEventListener("DOMContentLoaded", function () {
    // theme changer
    var themeControl = new theme_1.ThemeControl('light-mode', 'checkbox_theme', "body");
    themeControl.changeThemeListener();
    //animate theme button
    (0, buttonThemeAnimation_1.animateCreateNewListElemButton)("skill-input", "percent-input", "add-skill-btn");
    //init fields for skillListListeners
    var skillListSaver = new skillList_1.SkillListSaver("skills");
    var skillListControl = new skillList_1.SkillListControl(6);
    var listWrapperElements = document.getElementById("skills-list");
    var inputProgressPercent = document.getElementById("percent-input");
    var form = document.getElementById("skill-input-form");
    var inputs = document.getElementsByClassName("input");
    var skillListListeners = new skillList_1.SkillListListeners(listWrapperElements, inputProgressPercent, form, inputs, skillListSaver, skillListControl);
    // upload local storage
    skillListSaver.loadLocalStorage(listWrapperElements);
    //listeners for control skill list
    skillListListeners.inputValidateListener();
    skillListListeners.submitListener();
    skillListListeners.deleteListener();
});
},{"./buttonThemeAnimation":2,"./skillList":4,"./theme":5}],2:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.animateCreateNewListElemButton = void 0;
/*elem.disabled === true ? false : true*/
function changeDisabledField(elem) {
    elem.disabled = elem.disabled !== true;
}
function animateCreateNewListElemButton(idSkillInput, idPercentInput, idCreateButton) {
    var skillInput = document.getElementById(idSkillInput);
    var percentInput = document.getElementById(idPercentInput);
    var createButton = document.getElementById(idCreateButton);
    createButton.addEventListener("click", function () {
        createButton.classList.toggle("close");
        skillInput.classList.toggle("square");
        changeDisabledField(skillInput);
        percentInput.classList.toggle("square");
        changeDisabledField(percentInput);
    });
}
exports.animateCreateNewListElemButton = animateCreateNewListElemButton;
},{}],3:[function(require,module,exports){
"use strict";
exports.__esModule = true;
},{}],4:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.SkillListControl = exports.SkillListListeners = exports.SkillListSaver = exports.SkillView = exports.Skill = void 0;
var Skill = /** @class */ (function () {
    function Skill(skill, percent) {
        this.skill = skill;
        this.percent = percent;
    }
    Skill.prototype.getSkillName = function () {
        return this.skill;
    };
    Skill.prototype.getPercent = function () {
        return this.percent;
    };
    return Skill;
}());
exports.Skill = Skill;
var SkillView = /** @class */ (function () {
    function SkillView() {
    }
    SkillView.getVisualisation = function (skill) {
        if (skill.getSkillName().includes("<script>")) {
            alert("Failed");
        }
        return "\n            <li class=\"skills-list__elem\">\n                " + (skill.getSkillName() + ":") + "\n                <div class=\"flex-box-full\"></div>\n                <div class=\"skills-list__progress-wrapper\">\n                    <div class=\"skills-list__progress-done\" style=\"width: " + skill.getPercent() + "%\">\n                        " + (skill.getPercent() >= 10 ? skill.getPercent() + "%" : "") + "\n                    </div>\n                </div>\n                <input id=\"checkbox-del" + (new Date).getTime() + "\" type=\"checkbox\"  width=\"100px\" alt=\"\"\n                       class=\"skills-list__delete-btn\"/>\n                <label for=\"checkbox-del" + (new Date).getTime() + "\" class=\"skills-list__label-delete-btn\"></label>\n            </li>";
    };
    return SkillView;
}());
exports.SkillView = SkillView;
var SkillListSaver = /** @class */ (function () {
    function SkillListSaver(localStorageName) {
        this.localStorageName = localStorageName;
    }
    SkillListSaver.prototype.loadLocalStorage = function (listWrapperElements) {
        if (localStorage.getItem(this.localStorageName)) {
            listWrapperElements.innerHTML = localStorage.getItem(this.localStorageName);
        }
    };
    SkillListSaver.prototype.saveLocalStorage = function (listWrapperElements) {
        localStorage.setItem(this.localStorageName, listWrapperElements.innerHTML);
    };
    return SkillListSaver;
}());
exports.SkillListSaver = SkillListSaver;
var SkillListListeners = /** @class */ (function () {
    function SkillListListeners(listWrapperElements, inputProgressPercent, form, inputs, storageEntry, skillListEntry) {
        this.listWrapperElements = listWrapperElements;
        this.inputProgressPercent = inputProgressPercent;
        this.form = form;
        this.inputs = inputs;
        this.storageEntry = storageEntry;
        this.skillListEntry = skillListEntry;
    }
    SkillListListeners.prototype.deleteListener = function () {
        var _this = this;
        this.listWrapperElements.addEventListener('change', function (event) {
            _this.skillListEntry.deleteSkill(event.target);
            _this.storageEntry.saveLocalStorage(_this.listWrapperElements);
        });
    };
    SkillListListeners.prototype.submitListener = function () {
        var _this = this;
        this.form.addEventListener('submit', function (e) {
            e.preventDefault();
            var value1 = _this.inputs[0].value;
            var value2 = parseInt(_this.inputs[1].value);
            if (!_this.skillListEntry.addNewSkill(new Skill(value1, value2), _this.listWrapperElements)) {
                alert('К сожалению, Вы не можете добавить больше 6 навыков. Удалите что-нибудь для добавления.');
                return;
            }
            _this.storageEntry.saveLocalStorage(_this.listWrapperElements);
        });
    };
    SkillListListeners.prototype.inputValidateListener = function () {
        var percentInput = this.inputProgressPercent;
        var invalidStyleClass = "invalid-text";
        percentInput.addEventListener('input', function validate() {
            if (parseInt(this.value) > 100 || parseInt(this.value) < 0) {
                percentInput.classList.add(invalidStyleClass);
            }
            else {
                percentInput.classList.remove(invalidStyleClass);
            }
        });
    };
    return SkillListListeners;
}());
exports.SkillListListeners = SkillListListeners;
var SkillListControl = /** @class */ (function () {
    function SkillListControl(maxListElemsQuantity) {
        this.maxListElemsQuantity = maxListElemsQuantity;
    }
    SkillListControl.prototype.addNewSkill = function (skill, listWrapperElements) {
        if (listWrapperElements.children.length >= this.maxListElemsQuantity) {
            return false;
        }
        var newSkillLiElem = SkillView.getVisualisation(skill);
        listWrapperElements.innerHTML += newSkillLiElem;
        return true;
    };
    SkillListControl.prototype.deleteSkill = function (target) {
        target.parentElement.remove();
    };
    return SkillListControl;
}());
exports.SkillListControl = SkillListControl;
},{}],5:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.ThemeControl = void 0;
var ThemeControl = /** @class */ (function () {
    function ThemeControl(nameClassLightTheme, idButtonChangeTheme, idThemeVisibilityHTMLElement) {
        this.nameClassLightTheme = nameClassLightTheme;
        this.buttonChangeTheme = document.getElementById(idButtonChangeTheme);
        this.themeVisibilityHTMLElement = document.querySelector(idThemeVisibilityHTMLElement);
    }
    ThemeControl.prototype.changeThemeListener = function () {
        var _this = this;
        this.buttonChangeTheme.addEventListener('click', function () {
            _this.toggleClassTheme();
        });
    };
    ThemeControl.prototype.toggleClassTheme = function () {
        this.themeVisibilityHTMLElement.classList.toggle(this.nameClassLightTheme);
    };
    return ThemeControl;
}());
exports.ThemeControl = ThemeControl;
},{}]},{},[1,3,5,2,4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9hcHAudHMiLCJzcmMvc2NyaXB0cy9idXR0b25UaGVtZUFuaW1hdGlvbi50cyIsInNyYy9zY3JpcHRzL3NraWxsTGlzdC50cyIsInNyYy9zY3JpcHRzL3RoZW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxpQ0FBcUM7QUFDckMsK0RBQXFFO0FBQ3JFLHlDQUFnRjtBQUdoRixRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUU7SUFDMUMsZ0JBQWdCO0lBQ2hCLElBQU0sWUFBWSxHQUFpQixJQUFJLG9CQUFZLENBQUMsWUFBWSxFQUFFLGdCQUFnQixFQUM5RSxNQUFNLENBQUMsQ0FBQztJQUNaLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBRW5DLHNCQUFzQjtJQUN0QixJQUFBLHFEQUE4QixFQUFDLGFBQWEsRUFBRSxlQUFlLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFFaEYsb0NBQW9DO0lBQ3BDLElBQU0sY0FBYyxHQUFHLElBQUksMEJBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwRCxJQUFNLGdCQUFnQixHQUFHLElBQUksNEJBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakQsSUFBTSxtQkFBbUIsR0FBZ0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNoRixJQUFNLG9CQUFvQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDdEUsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3pELElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN4RCxJQUFNLGtCQUFrQixHQUFHLElBQUksOEJBQWtCLENBQUMsbUJBQW1CLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUM3RixNQUFNLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFFOUMsdUJBQXVCO0lBQ3ZCLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBRXJELGtDQUFrQztJQUNsQyxrQkFBa0IsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBQzNDLGtCQUFrQixDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3BDLGtCQUFrQixDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ3hDLENBQUMsQ0FBQyxDQUFDOzs7OztBQzdCSCx5Q0FBeUM7QUFDekMsU0FBUyxtQkFBbUIsQ0FBQyxJQUFzQjtJQUMvQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDO0FBQzNDLENBQUM7QUFFRCxTQUFnQiw4QkFBOEIsQ0FBQyxZQUFvQixFQUFFLGNBQXNCLEVBQUUsY0FBc0I7SUFDL0csSUFBTSxVQUFVLEdBQWdCLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDdEUsSUFBTSxZQUFZLEdBQWdCLFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDMUUsSUFBTSxZQUFZLEdBQWdCLFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7SUFFMUUsWUFBWSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtRQUNuQyxZQUFZLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2QyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QyxtQkFBbUIsQ0FBQyxVQUE4QixDQUFDLENBQUM7UUFDcEQsWUFBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEMsbUJBQW1CLENBQUMsWUFBZ0MsQ0FBQyxDQUFDO0lBQzFELENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQVpELHdFQVlDOzs7Ozs7OztBQ2pCRDtJQUlJLGVBQVksS0FBYSxFQUFFLE9BQWU7UUFDdEMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDM0IsQ0FBQztJQUVELDRCQUFZLEdBQVo7UUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVELDBCQUFVLEdBQVY7UUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUNMLFlBQUM7QUFBRCxDQWhCQSxBQWdCQyxJQUFBO0FBaEJZLHNCQUFLO0FBa0JsQjtJQUFBO0lBbUJBLENBQUM7SUFsQlUsMEJBQWdCLEdBQXZCLFVBQXdCLEtBQVk7UUFDaEMsSUFBSSxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzNDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNuQjtRQUNELE9BQU8sc0VBRUcsS0FBSyxDQUFDLFlBQVksRUFBRSxHQUFHLEdBQUcsNE1BR2dDLEtBQUssQ0FBQyxVQUFVLEVBQUUsdUNBQ3BFLEtBQUssQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsdUdBR3pDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsNkpBRW5CLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsMkVBQzVDLENBQUM7SUFDZixDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQW5CQSxBQW1CQyxJQUFBO0FBbkJZLDhCQUFTO0FBcUJ0QjtJQUdJLHdCQUFZLGdCQUF3QjtRQUNoQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7SUFDN0MsQ0FBQztJQUVELHlDQUFnQixHQUFoQixVQUFpQixtQkFBZ0M7UUFDN0MsSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1lBQzdDLG1CQUFtQixDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1NBQy9FO0lBQ0wsQ0FBQztJQUVELHlDQUFnQixHQUFoQixVQUFpQixtQkFBZ0M7UUFDN0MsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FoQkEsQUFnQkMsSUFBQTtBQWhCWSx3Q0FBYztBQWtCM0I7SUFRSSw0QkFBWSxtQkFBZ0MsRUFBRSxvQkFBaUMsRUFBRSxJQUFpQixFQUN0RixNQUFpQyxFQUFFLFlBQTRCLEVBQUUsY0FBZ0M7UUFDekcsSUFBSSxDQUFDLG1CQUFtQixHQUFHLG1CQUFtQixDQUFDO1FBQy9DLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxvQkFBb0IsQ0FBQztRQUNqRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsMkNBQWMsR0FBZDtRQUFBLGlCQUtDO1FBSkcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxVQUFDLEtBQUs7WUFDdEQsS0FBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQWlCLENBQUMsQ0FBQTtZQUN4RCxLQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2pFLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELDJDQUFjLEdBQWQ7UUFBQSxpQkFXQztRQVZHLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFVBQUMsQ0FBQztZQUNuQyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDbkIsSUFBTSxNQUFNLEdBQVksS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQXNCLENBQUMsS0FBSyxDQUFDO1lBQ2xFLElBQU0sTUFBTSxHQUFXLFFBQVEsQ0FBRSxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1RSxJQUFJLENBQUMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxFQUFFLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO2dCQUN2RixLQUFLLENBQUMseUZBQXlGLENBQUMsQ0FBQTtnQkFDaEcsT0FBTzthQUNWO1lBQ0QsS0FBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNqRSxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxrREFBcUIsR0FBckI7UUFDSSxJQUFNLFlBQVksR0FBZ0IsSUFBSSxDQUFDLG9CQUFvQixDQUFDO1FBQzVELElBQU0saUJBQWlCLEdBQVcsY0FBYyxDQUFDO1FBQ2hELFlBQWlDLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFNBQVMsUUFBUTtZQUMxRSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN4RCxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2FBQ2pEO2lCQUFNO2dCQUNILFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7YUFDcEQ7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFDTCx5QkFBQztBQUFELENBakRBLEFBaURDLElBQUE7QUFqRFksZ0RBQWtCO0FBbUQvQjtJQUdJLDBCQUFZLG9CQUE0QjtRQUNwQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsb0JBQW9CLENBQUM7SUFDckQsQ0FBQztJQUVELHNDQUFXLEdBQVgsVUFBWSxLQUFZLEVBQUUsbUJBQWdDO1FBQ3RELElBQUksbUJBQW1CLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDbEUsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxJQUFJLGNBQWMsR0FBRyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkQsbUJBQW1CLENBQUMsU0FBUyxJQUFJLGNBQWMsQ0FBQztRQUNoRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsc0NBQVcsR0FBWCxVQUFZLE1BQWU7UUFDdkIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBQ0wsdUJBQUM7QUFBRCxDQW5CQSxBQW1CQyxJQUFBO0FBbkJZLDRDQUFnQjs7Ozs7QUM1RzdCO0lBTUksc0JBQVksbUJBQThCLEVBQUUsbUJBQTJCLEVBQUUsNEJBQW9DO1FBQ3pHLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQztRQUMvQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQywwQkFBMEIsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLDRCQUE0QixDQUFDLENBQUM7SUFDM0YsQ0FBQztJQUVNLDBDQUFtQixHQUExQjtRQUFBLGlCQUlDO1FBSEcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtZQUM3QyxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyx1Q0FBZ0IsR0FBeEI7UUFDSSxJQUFJLENBQUMsMEJBQTBCLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQXJCQSxBQXFCQyxJQUFBO0FBckJZLG9DQUFZIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHtUaGVtZUNvbnRyb2x9IGZyb20gXCIuL3RoZW1lXCI7XG5pbXBvcnQge2FuaW1hdGVDcmVhdGVOZXdMaXN0RWxlbUJ1dHRvbn0gZnJvbSBcIi4vYnV0dG9uVGhlbWVBbmltYXRpb25cIlxuaW1wb3J0IHtTa2lsbExpc3RDb250cm9sLCBTa2lsbExpc3RMaXN0ZW5lcnMsIFNraWxsTGlzdFNhdmVyfSBmcm9tIFwiLi9za2lsbExpc3RcIlxuXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgICAvLyB0aGVtZSBjaGFuZ2VyXG4gICAgY29uc3QgdGhlbWVDb250cm9sOiBUaGVtZUNvbnRyb2wgPSBuZXcgVGhlbWVDb250cm9sKCdsaWdodC1tb2RlJywgJ2NoZWNrYm94X3RoZW1lJyxcbiAgICAgICAgXCJib2R5XCIpO1xuICAgIHRoZW1lQ29udHJvbC5jaGFuZ2VUaGVtZUxpc3RlbmVyKCk7XG5cbiAgICAvL2FuaW1hdGUgdGhlbWUgYnV0dG9uXG4gICAgYW5pbWF0ZUNyZWF0ZU5ld0xpc3RFbGVtQnV0dG9uKFwic2tpbGwtaW5wdXRcIiwgXCJwZXJjZW50LWlucHV0XCIsIFwiYWRkLXNraWxsLWJ0blwiKTtcblxuICAgIC8vaW5pdCBmaWVsZHMgZm9yIHNraWxsTGlzdExpc3RlbmVyc1xuICAgIGNvbnN0IHNraWxsTGlzdFNhdmVyID0gbmV3IFNraWxsTGlzdFNhdmVyKFwic2tpbGxzXCIpO1xuICAgIGNvbnN0IHNraWxsTGlzdENvbnRyb2wgPSBuZXcgU2tpbGxMaXN0Q29udHJvbCg2KTtcbiAgICBjb25zdCBsaXN0V3JhcHBlckVsZW1lbnRzOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2tpbGxzLWxpc3RcIik7XG4gICAgY29uc3QgaW5wdXRQcm9ncmVzc1BlcmNlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBlcmNlbnQtaW5wdXRcIik7XG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2tpbGwtaW5wdXQtZm9ybVwiKTtcbiAgICBjb25zdCBpbnB1dHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiaW5wdXRcIik7XG4gICAgY29uc3Qgc2tpbGxMaXN0TGlzdGVuZXJzID0gbmV3IFNraWxsTGlzdExpc3RlbmVycyhsaXN0V3JhcHBlckVsZW1lbnRzLCBpbnB1dFByb2dyZXNzUGVyY2VudCwgZm9ybSxcbiAgICAgICAgaW5wdXRzLCBza2lsbExpc3RTYXZlciwgc2tpbGxMaXN0Q29udHJvbCk7XG5cbiAgICAvLyB1cGxvYWQgbG9jYWwgc3RvcmFnZVxuICAgIHNraWxsTGlzdFNhdmVyLmxvYWRMb2NhbFN0b3JhZ2UobGlzdFdyYXBwZXJFbGVtZW50cyk7XG5cbiAgICAvL2xpc3RlbmVycyBmb3IgY29udHJvbCBza2lsbCBsaXN0XG4gICAgc2tpbGxMaXN0TGlzdGVuZXJzLmlucHV0VmFsaWRhdGVMaXN0ZW5lcigpO1xuICAgIHNraWxsTGlzdExpc3RlbmVycy5zdWJtaXRMaXN0ZW5lcigpO1xuICAgIHNraWxsTGlzdExpc3RlbmVycy5kZWxldGVMaXN0ZW5lcigpO1xufSk7XG5cbiIsImltcG9ydCB7SFRNTElkfSBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcblxyXG4vKmVsZW0uZGlzYWJsZWQgPT09IHRydWUgPyBmYWxzZSA6IHRydWUqL1xyXG5mdW5jdGlvbiBjaGFuZ2VEaXNhYmxlZEZpZWxkKGVsZW06IEhUTUxJbnB1dEVsZW1lbnQpOiB2b2lkIHtcclxuICAgIGVsZW0uZGlzYWJsZWQgPSBlbGVtLmRpc2FibGVkICE9PSB0cnVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYW5pbWF0ZUNyZWF0ZU5ld0xpc3RFbGVtQnV0dG9uKGlkU2tpbGxJbnB1dDogSFRNTElkLCBpZFBlcmNlbnRJbnB1dDogSFRNTElkLCBpZENyZWF0ZUJ1dHRvbjogSFRNTElkKTogdm9pZCB7XHJcbiAgICBjb25zdCBza2lsbElucHV0OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkU2tpbGxJbnB1dCk7XHJcbiAgICBjb25zdCBwZXJjZW50SW5wdXQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWRQZXJjZW50SW5wdXQpO1xyXG4gICAgY29uc3QgY3JlYXRlQnV0dG9uOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkQ3JlYXRlQnV0dG9uKTtcclxuXHJcbiAgICBjcmVhdGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICBjcmVhdGVCdXR0b24uY2xhc3NMaXN0LnRvZ2dsZShcImNsb3NlXCIpO1xyXG4gICAgICAgIHNraWxsSW5wdXQuY2xhc3NMaXN0LnRvZ2dsZShcInNxdWFyZVwiKTtcclxuICAgICAgICBjaGFuZ2VEaXNhYmxlZEZpZWxkKHNraWxsSW5wdXQgYXMgSFRNTElucHV0RWxlbWVudCk7XHJcbiAgICAgICAgcGVyY2VudElucHV0LmNsYXNzTGlzdC50b2dnbGUoXCJzcXVhcmVcIik7XHJcbiAgICAgICAgY2hhbmdlRGlzYWJsZWRGaWVsZChwZXJjZW50SW5wdXQgYXMgSFRNTElucHV0RWxlbWVudCk7XHJcbiAgICB9KTtcclxufSIsImltcG9ydCB7Q29uc2VydmVkLCBTaW1wbGVFdmVudExpc3RlbmVyfSBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2tpbGwge1xyXG4gICAgc2tpbGw6IHN0cmluZztcclxuICAgIHBlcmNlbnQ6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihza2lsbDogc3RyaW5nLCBwZXJjZW50OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnNraWxsID0gc2tpbGw7XHJcbiAgICAgICAgdGhpcy5wZXJjZW50ID0gcGVyY2VudDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTa2lsbE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5za2lsbDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQZXJjZW50KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGVyY2VudDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNraWxsVmlldyB7XHJcbiAgICBzdGF0aWMgZ2V0VmlzdWFsaXNhdGlvbihza2lsbDogU2tpbGwpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmIChza2lsbC5nZXRTa2lsbE5hbWUoKS5pbmNsdWRlcyhcIjxzY3JpcHQ+XCIpKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRmFpbGVkXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICA8bGkgY2xhc3M9XCJza2lsbHMtbGlzdF9fZWxlbVwiPlxyXG4gICAgICAgICAgICAgICAgJHtza2lsbC5nZXRTa2lsbE5hbWUoKSArIFwiOlwifVxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZsZXgtYm94LWZ1bGxcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJza2lsbHMtbGlzdF9fcHJvZ3Jlc3Mtd3JhcHBlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJza2lsbHMtbGlzdF9fcHJvZ3Jlc3MtZG9uZVwiIHN0eWxlPVwid2lkdGg6ICR7c2tpbGwuZ2V0UGVyY2VudCgpfSVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHtza2lsbC5nZXRQZXJjZW50KCkgPj0gMTAgPyBza2lsbC5nZXRQZXJjZW50KCkgKyBcIiVcIiA6IFwiXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cImNoZWNrYm94LWRlbCR7KG5ldyBEYXRlKS5nZXRUaW1lKCl9XCIgdHlwZT1cImNoZWNrYm94XCIgIHdpZHRoPVwiMTAwcHhcIiBhbHQ9XCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwic2tpbGxzLWxpc3RfX2RlbGV0ZS1idG5cIi8+XHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiY2hlY2tib3gtZGVsJHsobmV3IERhdGUpLmdldFRpbWUoKX1cIiBjbGFzcz1cInNraWxscy1saXN0X19sYWJlbC1kZWxldGUtYnRuXCI+PC9sYWJlbD5cclxuICAgICAgICAgICAgPC9saT5gO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2tpbGxMaXN0U2F2ZXIgaW1wbGVtZW50cyBDb25zZXJ2ZWQge1xyXG4gICAgbG9jYWxTdG9yYWdlTmFtZTogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGxvY2FsU3RvcmFnZU5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMubG9jYWxTdG9yYWdlTmFtZSA9IGxvY2FsU3RvcmFnZU5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZExvY2FsU3RvcmFnZShsaXN0V3JhcHBlckVsZW1lbnRzOiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmxvY2FsU3RvcmFnZU5hbWUpKSB7XHJcbiAgICAgICAgICAgIGxpc3RXcmFwcGVyRWxlbWVudHMuaW5uZXJIVE1MID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5sb2NhbFN0b3JhZ2VOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZUxvY2FsU3RvcmFnZShsaXN0V3JhcHBlckVsZW1lbnRzOiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMubG9jYWxTdG9yYWdlTmFtZSwgbGlzdFdyYXBwZXJFbGVtZW50cy5pbm5lckhUTUwpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2tpbGxMaXN0TGlzdGVuZXJzIGltcGxlbWVudHMgU2ltcGxlRXZlbnRMaXN0ZW5lciB7XHJcbiAgICBsaXN0V3JhcHBlckVsZW1lbnRzOiBIVE1MRWxlbWVudDtcclxuICAgIGlucHV0UHJvZ3Jlc3NQZXJjZW50OiBIVE1MRWxlbWVudDtcclxuICAgIGZvcm06IEhUTUxFbGVtZW50O1xyXG4gICAgaW5wdXRzOiBIVE1MQ29sbGVjdGlvbk9mPEVsZW1lbnQ+O1xyXG4gICAgc3RvcmFnZUVudHJ5OiBTa2lsbExpc3RTYXZlcjtcclxuICAgIHNraWxsTGlzdEVudHJ5OiBTa2lsbExpc3RDb250cm9sO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGxpc3RXcmFwcGVyRWxlbWVudHM6IEhUTUxFbGVtZW50LCBpbnB1dFByb2dyZXNzUGVyY2VudDogSFRNTEVsZW1lbnQsIGZvcm06IEhUTUxFbGVtZW50LFxyXG4gICAgICAgICAgICAgICAgaW5wdXRzOiBIVE1MQ29sbGVjdGlvbk9mPEVsZW1lbnQ+LCBzdG9yYWdlRW50cnk6IFNraWxsTGlzdFNhdmVyLCBza2lsbExpc3RFbnRyeTogU2tpbGxMaXN0Q29udHJvbCkge1xyXG4gICAgICAgIHRoaXMubGlzdFdyYXBwZXJFbGVtZW50cyA9IGxpc3RXcmFwcGVyRWxlbWVudHM7XHJcbiAgICAgICAgdGhpcy5pbnB1dFByb2dyZXNzUGVyY2VudCA9IGlucHV0UHJvZ3Jlc3NQZXJjZW50O1xyXG4gICAgICAgIHRoaXMuZm9ybSA9IGZvcm07XHJcbiAgICAgICAgdGhpcy5pbnB1dHMgPSBpbnB1dHM7XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlRW50cnkgPSBzdG9yYWdlRW50cnk7XHJcbiAgICAgICAgdGhpcy5za2lsbExpc3RFbnRyeSA9IHNraWxsTGlzdEVudHJ5O1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZUxpc3RlbmVyKCkge1xyXG4gICAgICAgIHRoaXMubGlzdFdyYXBwZXJFbGVtZW50cy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5za2lsbExpc3RFbnRyeS5kZWxldGVTa2lsbChldmVudC50YXJnZXQgYXMgRWxlbWVudClcclxuICAgICAgICAgICAgdGhpcy5zdG9yYWdlRW50cnkuc2F2ZUxvY2FsU3RvcmFnZSh0aGlzLmxpc3RXcmFwcGVyRWxlbWVudHMpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgc3VibWl0TGlzdGVuZXIoKSB7XHJcbiAgICAgICAgdGhpcy5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc3QgdmFsdWUxOiBzdHJpbmcgPSAodGhpcy5pbnB1dHNbMF0gYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlMjogbnVtYmVyID0gcGFyc2VJbnQoKHRoaXMuaW5wdXRzWzFdIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnNraWxsTGlzdEVudHJ5LmFkZE5ld1NraWxsKG5ldyBTa2lsbCh2YWx1ZTEsIHZhbHVlMiksIHRoaXMubGlzdFdyYXBwZXJFbGVtZW50cykpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCfQmiDRgdC+0LbQsNC70LXQvdC40Y4sINCS0Ysg0L3QtSDQvNC+0LbQtdGC0LUg0LTQvtCx0LDQstC40YLRjCDQsdC+0LvRjNGI0LUgNiDQvdCw0LLRi9C60L7Qsi4g0KPQtNCw0LvQuNGC0LUg0YfRgtC+LdC90LjQsdGD0LTRjCDQtNC70Y8g0LTQvtCx0LDQstC70LXQvdC40Y8uJylcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnN0b3JhZ2VFbnRyeS5zYXZlTG9jYWxTdG9yYWdlKHRoaXMubGlzdFdyYXBwZXJFbGVtZW50cyk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBpbnB1dFZhbGlkYXRlTGlzdGVuZXIoKSB7XHJcbiAgICAgICAgY29uc3QgcGVyY2VudElucHV0OiBIVE1MRWxlbWVudCA9IHRoaXMuaW5wdXRQcm9ncmVzc1BlcmNlbnQ7XHJcbiAgICAgICAgY29uc3QgaW52YWxpZFN0eWxlQ2xhc3M6IHN0cmluZyA9IFwiaW52YWxpZC10ZXh0XCI7XHJcbiAgICAgICAgKHBlcmNlbnRJbnB1dCBhcyBIVE1MSW5wdXRFbGVtZW50KS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uIHZhbGlkYXRlKCkge1xyXG4gICAgICAgICAgICBpZiAocGFyc2VJbnQodGhpcy52YWx1ZSkgPiAxMDAgfHwgcGFyc2VJbnQodGhpcy52YWx1ZSkgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBwZXJjZW50SW5wdXQuY2xhc3NMaXN0LmFkZChpbnZhbGlkU3R5bGVDbGFzcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwZXJjZW50SW5wdXQuY2xhc3NMaXN0LnJlbW92ZShpbnZhbGlkU3R5bGVDbGFzcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2tpbGxMaXN0Q29udHJvbCB7XHJcbiAgICBtYXhMaXN0RWxlbXNRdWFudGl0eTogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG1heExpc3RFbGVtc1F1YW50aXR5OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLm1heExpc3RFbGVtc1F1YW50aXR5ID0gbWF4TGlzdEVsZW1zUXVhbnRpdHk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkTmV3U2tpbGwoc2tpbGw6IFNraWxsLCBsaXN0V3JhcHBlckVsZW1lbnRzOiBIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChsaXN0V3JhcHBlckVsZW1lbnRzLmNoaWxkcmVuLmxlbmd0aCA+PSB0aGlzLm1heExpc3RFbGVtc1F1YW50aXR5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG5ld1NraWxsTGlFbGVtID0gU2tpbGxWaWV3LmdldFZpc3VhbGlzYXRpb24oc2tpbGwpO1xyXG4gICAgICAgIGxpc3RXcmFwcGVyRWxlbWVudHMuaW5uZXJIVE1MICs9IG5ld1NraWxsTGlFbGVtO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZVNraWxsKHRhcmdldDogRWxlbWVudCk6IHZvaWQge1xyXG4gICAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtIVE1MQ2xhc3MsIEhUTUxJZH0gZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRoZW1lQ29udHJvbCB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IG5hbWVDbGFzc0xpZ2h0VGhlbWU6IEhUTUxDbGFzcztcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgYnV0dG9uQ2hhbmdlVGhlbWU6IEhUTUxFbGVtZW50O1xyXG4gICAgLypFbGVtZW50IGZvciBhZGRpbmcgYSBsaWdodCB0aGVtZSBjbGFzcyovXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRoZW1lVmlzaWJpbGl0eUhUTUxFbGVtZW50OiBIVE1MRWxlbWVudDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lQ2xhc3NMaWdodFRoZW1lOiBIVE1MQ2xhc3MsIGlkQnV0dG9uQ2hhbmdlVGhlbWU6IEhUTUxJZCwgaWRUaGVtZVZpc2liaWxpdHlIVE1MRWxlbWVudDogSFRNTElkKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lQ2xhc3NMaWdodFRoZW1lID0gbmFtZUNsYXNzTGlnaHRUaGVtZTtcclxuICAgICAgICB0aGlzLmJ1dHRvbkNoYW5nZVRoZW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWRCdXR0b25DaGFuZ2VUaGVtZSk7XHJcbiAgICAgICAgdGhpcy50aGVtZVZpc2liaWxpdHlIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaWRUaGVtZVZpc2liaWxpdHlIVE1MRWxlbWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoYW5nZVRoZW1lTGlzdGVuZXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5idXR0b25DaGFuZ2VUaGVtZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVDbGFzc1RoZW1lKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0b2dnbGVDbGFzc1RoZW1lKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudGhlbWVWaXNpYmlsaXR5SFRNTEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSh0aGlzLm5hbWVDbGFzc0xpZ2h0VGhlbWUpO1xyXG4gICAgfVxyXG59Il19
