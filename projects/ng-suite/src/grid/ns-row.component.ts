import { Component, OnInit, Renderer2, ElementRef, Input, HostListener } from "@angular/core";

import { NsUpdateHostClassComponent, matchMedia } from "../core";

export type NsJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between';
export type NsAlign = 'top' | 'middle' | 'bottom';
export type NsType = 'flex' | null;
export type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

export interface BreakpointMap {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    xxl?: string;
}

const responsiveMap: BreakpointMap = {
    xs : '(max-width: 575px)',
    sm : '(min-width: 576px)',
    md : '(min-width: 768px)',
    lg : '(min-width: 992px)',
    xl : '(min-width: 1200px)',
    xxl: '(min-width: 1600px)'
};

@Component({
    selector           : 'ns-row',
    preserveWhitespaces: false,
    templateUrl        : './ns-row.component.html'
})
export class NsRowComponent extends NsUpdateHostClassComponent implements OnInit {

    private gutter: number | object;
    private type: NsType;
    private align: NsAlign = 'top';
    private justify: NsJustify = 'start';
    private el: HTMLElement;
    private prefixCls = 'ns-row';
    private breakPoint: Breakpoint;
    public actualGutter: number;

    @Input()
    set nsType(value: NsType) {
        this.type = value;
        this.setClassMap();
    }

    get nsType(): NsType {
        return this.type;
    }

    @Input()
    set nsAlign(value: NsAlign) {
        this.align = value;
        this.setClassMap();
        console.log(value);
    }

    get nsAlign(): NsAlign {
        return this.align;
    }

    @Input()
    set nsJustify(value: NsJustify) {
        this.justify = value;
        this.setClassMap();
    }

    get nsJustify(): NsJustify {
        return this.justify;
    }

    @Input()
    set nsGutter(value: number | object) {
        this.gutter = value;
        this.updateGutter();
        this.setStyle();
    }

    get nsGutter(): number | object {
        return this.gutter;
    }

    calculateGutter(): number {
        if (typeof this.nsGutter !== 'object') {
            return this.nsGutter;
        } else if (this.breakPoint && this.nsGutter[ this.breakPoint ]) {
            return this.nsGutter[ this.breakPoint ];
        } else {
            return;
        }
    }

    updateGutter(): void {
        this.actualGutter = this.calculateGutter();
    }

    private setStyle(): void {
        this.renderer.setStyle(this.el, 'margin-left', `-${this.actualGutter / 2}px`);
        this.renderer.setStyle(this.el, 'margin-right', `-${this.actualGutter / 2}px`);
    }  

    private setClassMap(): void {
        const classMap = {
            [ `${this.prefixCls}` ]                                 : !this.nsType,
            [ `${this.prefixCls}-${this.nsType}` ]                  : this.nsType,
            [ `${this.prefixCls}-${this.nsType}-${this.nsAlign}` ]  : this.nsType && this.nsAlign,
            [ `${this.prefixCls}-${this.nsType}-${this.nsJustify}` ]: this.nsType && this.nsJustify
        };
        this.updateHostClass(this.el, classMap);
    }

    @HostListener('window:resize', [ '$event' ])
    onWindowResize(e: UIEvent): void {
        this.watchMedia();
    }

    private watchMedia(): void {
        Object.keys(responsiveMap).map((screen: Breakpoint) => {
        const matchBelow = matchMedia(responsiveMap[ screen ]).matches;
        if (matchBelow) {
            this.breakPoint = screen;
        }
        });
        this.updateGutter();
        this.setStyle();
    }

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) {
        super(renderer);
        this.el = this.elementRef.nativeElement;
    }

    ngOnInit() {
        this.setClassMap();
    }

}