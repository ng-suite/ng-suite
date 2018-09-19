import { Renderer2 } from "@angular/core";

export class NsUpdateHostClassComponent {

    private classMap = {};

    updateHostClass(el: HTMLElement, classMap: object): void {
        this.removeClass(el, this.classMap);
        this.classMap = { ...classMap };
        this.addClass(el, this.classMap);
    }

    private removeClass(el: HTMLElement, classMap: object): void {
        for (const i in classMap) {
            if (classMap.hasOwnProperty(i)) {
                this.renderer2.removeClass(el, i);
            }
        }
    }

    private addClass(el: HTMLElement, classMap: object): void {
        for (const i in classMap) {
            if (classMap.hasOwnProperty(i)) {
                if (classMap[ i ]) {
                    this.renderer2.addClass(el, i);
                }
            }
        }
    }

    constructor(private renderer2: Renderer2) {}

}