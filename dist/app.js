(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
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
var SkillList = /** @class */ (function () {
    function SkillList(idButtonNewProgressElem, idForm, idInputProgressName, idInputProgressPercent, idListWrapperElements, localStorageName, inputsClassName, maxListElemsQuantity) {
        this.form = document.getElementById(idForm);
        this.inputProgressName = document.getElementById(idInputProgressName);
        this.inputProgressPercent = document.getElementById(idInputProgressPercent);
        this.listWrapperElements = document.getElementById(idListWrapperElements);
        this.localStorageName = localStorageName;
        this.inputsClassName = inputsClassName;
        this.maxListElemsQuantity = maxListElemsQuantity;
    }
    SkillList.prototype.deleteProgressElemListener = function () {
        var _this = this;
        this.listWrapperElements.addEventListener('change', function (event) {
            var changeNode = event.target;
            changeNode.parentElement.remove();
            _this.saveLocalStorage();
        });
    };
    SkillList.prototype.inputValidateListener = function () {
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
    SkillList.prototype.submitProgressElemListener = function () {
        var _this = this;
        this.form.addEventListener('submit', function (e) {
            e.preventDefault();
            var _a = SkillList.getTwoInputValueByClass(_this.inputsClassName), value1 = _a.value1, value2 = _a.value2;
            if (!_this.addNewSkillElem(value1, value2)) {
                alert('К сожалению, Вы не можете добавить больше 6 навыков. Удалите что-нибудь для добавления.');
                return;
            }
            _this.saveLocalStorage();
        });
    };
    SkillList.prototype.loadLocalStorage = function () {
        if (localStorage.getItem(this.localStorageName)) {
            this.listWrapperElements.innerHTML = localStorage.getItem(this.localStorageName);
        }
    };
    SkillList.prototype.saveLocalStorage = function () {
        localStorage.setItem(this.localStorageName, this.listWrapperElements.innerHTML);
    };
    SkillList.getTwoInputValueByClass = function (className) {
        var value1 = document.getElementsByClassName(className)[0].value;
        var value2 = parseInt(document.getElementsByClassName(className)[1].value);
        return { value1: value1, value2: value2 };
    };
    SkillList.prototype.addNewSkillElem = function (skill, percent) {
        if (this.listWrapperElements.children.length >= this.maxListElemsQuantity) {
            return false;
        }
        var newSkillLiElem = SkillList.getNewSkillLiElem(skill, percent);
        this.listWrapperElements.innerHTML += newSkillLiElem;
        return true;
    };
    SkillList.getNewSkillLiElem = function (skill, percent) {
        return "\n            <li class=\"skills-list__elem\">\n                " + (skill + ":") + "\n                <div style=\"flex: 1\"></div>\n                <div class=\"skills-list__progress-wrapper\">\n                    <div class=\"skills-list__progress-done\" style=\"width: " + percent + "%\">\n                        " + (percent >= 10 ? percent + "%" : "") + "\n                    </div>\n                </div>\n                <input id=\"checkbox-del" + (new Date).getTime() + "\" type=\"checkbox\"  width=\"100px\" alt=\"\"\n                       class=\"skills-list__delete-btn\"/>\n                <label for=\"checkbox-del" + (new Date).getTime() + "\" class=\"skills-list__label-delete-btn\"></label>\n            </li>";
    };
    return SkillList;
}());
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
document.addEventListener("DOMContentLoaded", function () {
    var skillList1 = new SkillList("add-skill-btn", "skill-input-form", "skill-input", "percent-input", "skills-list", 'skills', 'input', 6);
    var themeControl = new ThemeControl('light-mode', 'checkbox_theme', "body");
    skillList1.loadLocalStorage();
    themeControl.changeThemeListener();
    animateCreateNewListElemButton("skill-input", "percent-input", "add-skill-btn");
    skillList1.inputValidateListener();
    skillList1.submitProgressElemListener();
    skillList1.deleteProgressElemListener();
});
},{}],2:[function(require,module,exports){
"use strict";
exports.__esModule = true;
},{}]},{},[1,2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0VBO0lBTUksc0JBQVksbUJBQThCLEVBQUUsbUJBQTJCLEVBQUUsNEJBQW9DO1FBQ3pHLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQztRQUMvQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQywwQkFBMEIsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLDRCQUE0QixDQUFDLENBQUM7SUFDM0YsQ0FBQztJQUVNLDBDQUFtQixHQUExQjtRQUFBLGlCQUlDO1FBSEcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtZQUM3QyxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyx1Q0FBZ0IsR0FBeEI7UUFDSSxJQUFJLENBQUMsMEJBQTBCLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQXJCQSxBQXFCQyxJQUFBO0FBRUQ7SUFTSSxtQkFBWSx1QkFBK0IsRUFBRSxNQUFjLEVBQUUsbUJBQTJCLEVBQzVFLHNCQUE4QixFQUFFLHFCQUE2QixFQUFFLGdCQUF3QixFQUN2RixlQUEwQixFQUFFLG9CQUE0QjtRQUNoRSxJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsb0JBQW9CLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FB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QyxDQUFDO0lBRTFFLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7UUFDbkMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEMsbUJBQW1CLENBQUMsVUFBOEIsQ0FBQyxDQUFDO1FBQ3BELFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hDLG1CQUFtQixDQUFDLFlBQWdDLENBQUMsQ0FBQztJQUMxRCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFFRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUU7SUFDMUMsSUFBTSxVQUFVLEdBQWMsSUFBSSxTQUFTLENBQUMsZUFBZSxFQUFFLGtCQUFrQixFQUMzRSxhQUFhLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFDN0MsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMxQixJQUFJLFlBQVksR0FBaUIsSUFBSSxZQUFZLENBQUMsWUFBWSxFQUFFLGdCQUFnQixFQUM1RSxNQUFNLENBQUMsQ0FBQztJQUNaLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzlCLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQ25DLDhCQUE4QixDQUFDLGFBQWEsRUFBRSxlQUFlLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDaEYsVUFBVSxDQUFDLHFCQUFxQixFQUFFLENBQUM7SUFDbkMsVUFBVSxDQUFDLDBCQUEwQixFQUFFLENBQUM7SUFDeEMsVUFBVSxDQUFDLDBCQUEwQixFQUFFLENBQUM7QUFDNUMsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQge0NvbnNlcnZlZCwgSFRNTENsYXNzLCBIVE1MSWQsIFByb2dyZXNzTGlzdH0gZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xuXG5jbGFzcyBUaGVtZUNvbnRyb2wge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgbmFtZUNsYXNzTGlnaHRUaGVtZTogSFRNTENsYXNzO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgYnV0dG9uQ2hhbmdlVGhlbWU6IEhUTUxFbGVtZW50O1xuICAgIC8qRWxlbWVudCBmb3IgYWRkaW5nIGEgbGlnaHQgdGhlbWUgY2xhc3MqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgdGhlbWVWaXNpYmlsaXR5SFRNTEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3IobmFtZUNsYXNzTGlnaHRUaGVtZTogSFRNTENsYXNzLCBpZEJ1dHRvbkNoYW5nZVRoZW1lOiBIVE1MSWQsIGlkVGhlbWVWaXNpYmlsaXR5SFRNTEVsZW1lbnQ6IEhUTUxJZCkge1xuICAgICAgICB0aGlzLm5hbWVDbGFzc0xpZ2h0VGhlbWUgPSBuYW1lQ2xhc3NMaWdodFRoZW1lO1xuICAgICAgICB0aGlzLmJ1dHRvbkNoYW5nZVRoZW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWRCdXR0b25DaGFuZ2VUaGVtZSk7XG4gICAgICAgIHRoaXMudGhlbWVWaXNpYmlsaXR5SFRNTEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGlkVGhlbWVWaXNpYmlsaXR5SFRNTEVsZW1lbnQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjaGFuZ2VUaGVtZUxpc3RlbmVyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmJ1dHRvbkNoYW5nZVRoZW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy50b2dnbGVDbGFzc1RoZW1lKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgdG9nZ2xlQ2xhc3NUaGVtZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50aGVtZVZpc2liaWxpdHlIVE1MRWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKHRoaXMubmFtZUNsYXNzTGlnaHRUaGVtZSk7XG4gICAgfVxufVxuXG5jbGFzcyBTa2lsbExpc3QgaW1wbGVtZW50cyBQcm9ncmVzc0xpc3QsIENvbnNlcnZlZCB7XG4gICAgZm9ybTogSFRNTEVsZW1lbnQ7XG4gICAgaW5wdXRQcm9ncmVzc05hbWU6IEhUTUxFbGVtZW50O1xuICAgIGlucHV0UHJvZ3Jlc3NQZXJjZW50OiBIVE1MRWxlbWVudDtcbiAgICBpbnB1dHNDbGFzc05hbWU6IEhUTUxDbGFzcztcbiAgICBsaXN0V3JhcHBlckVsZW1lbnRzOiBIVE1MRWxlbWVudDtcbiAgICBsb2NhbFN0b3JhZ2VOYW1lOiBzdHJpbmc7XG4gICAgbWF4TGlzdEVsZW1zUXVhbnRpdHk6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKGlkQnV0dG9uTmV3UHJvZ3Jlc3NFbGVtOiBIVE1MSWQsIGlkRm9ybTogSFRNTElkLCBpZElucHV0UHJvZ3Jlc3NOYW1lOiBIVE1MSWQsXG4gICAgICAgICAgICAgICAgaWRJbnB1dFByb2dyZXNzUGVyY2VudDogSFRNTElkLCBpZExpc3RXcmFwcGVyRWxlbWVudHM6IEhUTUxJZCwgbG9jYWxTdG9yYWdlTmFtZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgIGlucHV0c0NsYXNzTmFtZTogSFRNTENsYXNzLCBtYXhMaXN0RWxlbXNRdWFudGl0eTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkRm9ybSk7XG4gICAgICAgIHRoaXMuaW5wdXRQcm9ncmVzc05hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZElucHV0UHJvZ3Jlc3NOYW1lKTtcbiAgICAgICAgdGhpcy5pbnB1dFByb2dyZXNzUGVyY2VudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkSW5wdXRQcm9ncmVzc1BlcmNlbnQpO1xuICAgICAgICB0aGlzLmxpc3RXcmFwcGVyRWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZExpc3RXcmFwcGVyRWxlbWVudHMpO1xuICAgICAgICB0aGlzLmxvY2FsU3RvcmFnZU5hbWUgPSBsb2NhbFN0b3JhZ2VOYW1lO1xuICAgICAgICB0aGlzLmlucHV0c0NsYXNzTmFtZSA9IGlucHV0c0NsYXNzTmFtZTtcbiAgICAgICAgdGhpcy5tYXhMaXN0RWxlbXNRdWFudGl0eSA9IG1heExpc3RFbGVtc1F1YW50aXR5O1xuICAgIH1cblxuICAgIGRlbGV0ZVByb2dyZXNzRWxlbUxpc3RlbmVyKCkge1xuICAgICAgICB0aGlzLmxpc3RXcmFwcGVyRWxlbWVudHMuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjaGFuZ2VOb2RlOiBIVE1MSW5wdXRFbGVtZW50ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgICAgICAgICBjaGFuZ2VOb2RlLnBhcmVudEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGlzLnNhdmVMb2NhbFN0b3JhZ2UoKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBpbnB1dFZhbGlkYXRlTGlzdGVuZXIoKSB7XG4gICAgICAgIGNvbnN0IHBlcmNlbnRJbnB1dDogSFRNTEVsZW1lbnQgPSB0aGlzLmlucHV0UHJvZ3Jlc3NQZXJjZW50O1xuICAgICAgICBjb25zdCBpbnZhbGlkU3R5bGVDbGFzczogc3RyaW5nID0gXCJpbnZhbGlkLXRleHRcIjtcbiAgICAgICAgKHBlcmNlbnRJbnB1dCBhcyBIVE1MSW5wdXRFbGVtZW50KS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uIHZhbGlkYXRlKCkge1xuICAgICAgICAgICAgaWYgKHBhcnNlSW50KHRoaXMudmFsdWUpID4gMTAwIHx8IHBhcnNlSW50KHRoaXMudmFsdWUpIDwgMCkge1xuICAgICAgICAgICAgICAgIHBlcmNlbnRJbnB1dC5jbGFzc0xpc3QuYWRkKGludmFsaWRTdHlsZUNsYXNzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGVyY2VudElucHV0LmNsYXNzTGlzdC5yZW1vdmUoaW52YWxpZFN0eWxlQ2xhc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHN1Ym1pdFByb2dyZXNzRWxlbUxpc3RlbmVyKCkge1xuICAgICAgICB0aGlzLmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IHt2YWx1ZTEsIHZhbHVlMn0gPSBTa2lsbExpc3QuZ2V0VHdvSW5wdXRWYWx1ZUJ5Q2xhc3ModGhpcy5pbnB1dHNDbGFzc05hbWUpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLmFkZE5ld1NraWxsRWxlbSh2YWx1ZTEsIHZhbHVlMikpIHtcbiAgICAgICAgICAgICAgICBhbGVydCgn0Jog0YHQvtC20LDQu9C10L3QuNGOLCDQktGLINC90LUg0LzQvtC20LXRgtC1INC00L7QsdCw0LLQuNGC0Ywg0LHQvtC70YzRiNC1IDYg0L3QsNCy0YvQutC+0LIuINCj0LTQsNC70LjRgtC1INGH0YLQvi3QvdC40LHRg9C00Ywg0LTQu9GPINC00L7QsdCw0LLQu9C10L3QuNGPLicpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zYXZlTG9jYWxTdG9yYWdlKCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgbG9hZExvY2FsU3RvcmFnZSgpIHtcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMubG9jYWxTdG9yYWdlTmFtZSkpIHtcbiAgICAgICAgICAgIHRoaXMubGlzdFdyYXBwZXJFbGVtZW50cy5pbm5lckhUTUwgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmxvY2FsU3RvcmFnZU5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2F2ZUxvY2FsU3RvcmFnZSgpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5sb2NhbFN0b3JhZ2VOYW1lLCB0aGlzLmxpc3RXcmFwcGVyRWxlbWVudHMuaW5uZXJIVE1MKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBnZXRUd29JbnB1dFZhbHVlQnlDbGFzcyhjbGFzc05hbWU6IHN0cmluZyk6IHsgdmFsdWUxOiBzdHJpbmcsIHZhbHVlMjogbnVtYmVyIH0ge1xuICAgICAgICBjb25zdCB2YWx1ZTE6IHN0cmluZyA9IChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzTmFtZSkgYXNcbiAgICAgICAgICAgIEhUTUxDb2xsZWN0aW9uT2Y8SFRNTElucHV0RWxlbWVudD4pWzBdLnZhbHVlO1xuICAgICAgICBjb25zdCB2YWx1ZTI6IG51bWJlciA9IHBhcnNlSW50KChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzTmFtZSkgYXNcbiAgICAgICAgICAgIEhUTUxDb2xsZWN0aW9uT2Y8SFRNTElucHV0RWxlbWVudD4pWzFdLnZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHt2YWx1ZTEsIHZhbHVlMn07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGROZXdTa2lsbEVsZW0oc2tpbGw6IHN0cmluZywgcGVyY2VudDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmxpc3RXcmFwcGVyRWxlbWVudHMuY2hpbGRyZW4ubGVuZ3RoID49IHRoaXMubWF4TGlzdEVsZW1zUXVhbnRpdHkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbmV3U2tpbGxMaUVsZW0gPSBTa2lsbExpc3QuZ2V0TmV3U2tpbGxMaUVsZW0oc2tpbGwsIHBlcmNlbnQpO1xuICAgICAgICB0aGlzLmxpc3RXcmFwcGVyRWxlbWVudHMuaW5uZXJIVE1MICs9IG5ld1NraWxsTGlFbGVtO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBnZXROZXdTa2lsbExpRWxlbShza2lsbDogc3RyaW5nLCBwZXJjZW50OiBudW1iZXIpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgPGxpIGNsYXNzPVwic2tpbGxzLWxpc3RfX2VsZW1cIj5cbiAgICAgICAgICAgICAgICAke3NraWxsICsgXCI6XCJ9XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cImZsZXg6IDFcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2tpbGxzLWxpc3RfX3Byb2dyZXNzLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNraWxscy1saXN0X19wcm9ncmVzcy1kb25lXCIgc3R5bGU9XCJ3aWR0aDogJHtwZXJjZW50fSVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICR7cGVyY2VudCA+PSAxMCA/IHBlcmNlbnQgKyBcIiVcIiA6IFwiXCJ9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cImNoZWNrYm94LWRlbCR7KG5ldyBEYXRlKS5nZXRUaW1lKCl9XCIgdHlwZT1cImNoZWNrYm94XCIgIHdpZHRoPVwiMTAwcHhcIiBhbHQ9XCJcIlxuICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInNraWxscy1saXN0X19kZWxldGUtYnRuXCIvPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjaGVja2JveC1kZWwkeyhuZXcgRGF0ZSkuZ2V0VGltZSgpfVwiIGNsYXNzPVwic2tpbGxzLWxpc3RfX2xhYmVsLWRlbGV0ZS1idG5cIj48L2xhYmVsPlxuICAgICAgICAgICAgPC9saT5gO1xuICAgIH1cbn1cblxuLyplbGVtLmRpc2FibGVkID09PSB0cnVlID8gZmFsc2UgOiB0cnVlKi9cbmZ1bmN0aW9uIGNoYW5nZURpc2FibGVkRmllbGQoZWxlbTogSFRNTElucHV0RWxlbWVudCk6IHZvaWQge1xuICAgIGVsZW0uZGlzYWJsZWQgPSBlbGVtLmRpc2FibGVkICE9PSB0cnVlO1xufVxuXG5mdW5jdGlvbiBhbmltYXRlQ3JlYXRlTmV3TGlzdEVsZW1CdXR0b24oaWRTa2lsbElucHV0OiBIVE1MSWQsIGlkUGVyY2VudElucHV0OiBIVE1MSWQsIGlkQ3JlYXRlQnV0dG9uOiBIVE1MSWQpOiB2b2lkIHtcbiAgICBjb25zdCBza2lsbElucHV0OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkU2tpbGxJbnB1dCk7XG4gICAgY29uc3QgcGVyY2VudElucHV0OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkUGVyY2VudElucHV0KTtcbiAgICBjb25zdCBjcmVhdGVCdXR0b246IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWRDcmVhdGVCdXR0b24pO1xuXG4gICAgY3JlYXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGNyZWF0ZUJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKFwiY2xvc2VcIik7XG4gICAgICAgIHNraWxsSW5wdXQuY2xhc3NMaXN0LnRvZ2dsZShcInNxdWFyZVwiKTtcbiAgICAgICAgY2hhbmdlRGlzYWJsZWRGaWVsZChza2lsbElucHV0IGFzIEhUTUxJbnB1dEVsZW1lbnQpO1xuICAgICAgICBwZXJjZW50SW5wdXQuY2xhc3NMaXN0LnRvZ2dsZShcInNxdWFyZVwiKTtcbiAgICAgICAgY2hhbmdlRGlzYWJsZWRGaWVsZChwZXJjZW50SW5wdXQgYXMgSFRNTElucHV0RWxlbWVudCk7XG4gICAgfSk7XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgICBjb25zdCBza2lsbExpc3QxOiBTa2lsbExpc3QgPSBuZXcgU2tpbGxMaXN0KFwiYWRkLXNraWxsLWJ0blwiLCBcInNraWxsLWlucHV0LWZvcm1cIixcbiAgICAgICAgXCJza2lsbC1pbnB1dFwiLCBcInBlcmNlbnQtaW5wdXRcIiwgXCJza2lsbHMtbGlzdFwiLFxuICAgICAgICAnc2tpbGxzJywgJ2lucHV0JywgNik7XG4gICAgbGV0IHRoZW1lQ29udHJvbDogVGhlbWVDb250cm9sID0gbmV3IFRoZW1lQ29udHJvbCgnbGlnaHQtbW9kZScsICdjaGVja2JveF90aGVtZScsXG4gICAgICAgIFwiYm9keVwiKTtcbiAgICBza2lsbExpc3QxLmxvYWRMb2NhbFN0b3JhZ2UoKTtcbiAgICB0aGVtZUNvbnRyb2wuY2hhbmdlVGhlbWVMaXN0ZW5lcigpO1xuICAgIGFuaW1hdGVDcmVhdGVOZXdMaXN0RWxlbUJ1dHRvbihcInNraWxsLWlucHV0XCIsIFwicGVyY2VudC1pbnB1dFwiLCBcImFkZC1za2lsbC1idG5cIik7XG4gICAgc2tpbGxMaXN0MS5pbnB1dFZhbGlkYXRlTGlzdGVuZXIoKTtcbiAgICBza2lsbExpc3QxLnN1Ym1pdFByb2dyZXNzRWxlbUxpc3RlbmVyKCk7XG4gICAgc2tpbGxMaXN0MS5kZWxldGVQcm9ncmVzc0VsZW1MaXN0ZW5lcigpO1xufSk7Il19
