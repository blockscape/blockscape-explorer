import { isNil } from 'lodash';

export enum ToastType {
    Success,
    Info,
    Problem
}

export default class Toast {
    type: ToastType;
    title?: string;
    message: string;
    birth: Date;

    constructor(type: ToastType, m1: string, m2?: string) {
        this.type = type;
        if(isNil(m2)) {
            this.message = m1;
        }
        else {
            this.title = m1;
            this.message = m2;
        }

        this.birth = new Date();
    }

    // Convienience initializers for constructor

    static success(m1: string, m2?: string) {
        return new Toast(ToastType.Success, m1, m2);
    }

    static info(m1: string, m2?: string) {
        return new Toast(ToastType.Info, m1, m2);
    }

    static error(m1: string, m2?: string) {
        return new Toast(ToastType.Problem, m1, m2);
    }
}
