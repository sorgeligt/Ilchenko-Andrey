export type HTMLId = string;
export type HTMLClass = string;

export interface ProgressList {
    listWrapperElements: HTMLElement;
    form: HTMLElement;
    inputProgressName: HTMLElement;
    inputProgressPercent: HTMLElement;
    inputsClassName: HTMLClass;
    maxListElemsQuantity: number;

    submitProgressElemListener(): void;

    deleteProgressElemListener(): void;

    inputValidateListener(): void;
}


export interface Conserved {
    localStorageName: string;

    loadLocalStorage(listWrapperElements: HTMLElement): void;

    saveLocalStorage(listWrapperElements: HTMLElement): void;
}

export interface SimpleEventListener {
    deleteListener(): void;

    submitListener(): void;

    inputValidateListener(): void;
}
