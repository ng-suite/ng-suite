import { Component, OnInit, Optional, Host, Renderer2, ElementRef, Input, HostBinding, OnChanges } from "@angular/core";

import { NsUpdateHostClassComponent, isNotNil } from "../core";
import { NsRowComponent } from "./ns-row.component";
import { NsRowDirective } from "./ns-row.directive";

export interface EmbeddedProperty {
    span: number;
    pull: number;
    push: number;
    offset: number;
    order: number;
}

@Component({
    selector           : 'ns-col',
    preserveWhitespaces: false,
    templateUrl        : './ns-col.component.html'
})
export class NsColComponent extends NsUpdateHostClassComponent implements OnInit, OnChanges {

    private el: HTMLElement;
    private prefixCls = 'ns-col';

    @Input() nsSpan: number;
    @Input() nsOrder: number;
    @Input() nsOffset: number;
    @Input() nsPush: number;
    @Input() nsPull: number;
    @Input() nsXs: number | EmbeddedProperty;
    @Input() nsSm: number | EmbeddedProperty;
    @Input() nsMd: number | EmbeddedProperty;
    @Input() nsLg: number | EmbeddedProperty;
    @Input() nsXl: number | EmbeddedProperty;
    @Input() nsXXl: number | EmbeddedProperty;

    @HostBinding('style.padding-left.px')
    get paddingLeft(): number {
        return this.nsRow && this.nsRow.actualGutter / 2;
    }

    @HostBinding('style.padding-right.px')
    get paddingRight(): number {
        return this.nsRow && this.nsRow.actualGutter / 2;
    }

    get nsRow(): NsRowComponent {
        return this.nsRowComponent || this.nsRowDirective;
    }

    private setClassMap(): void {
        const classMap = {
            [ `${this.prefixCls}-${this.nsSpan}` ]         : isNotNil(this.nsSpan),
            [ `${this.prefixCls}-order-${this.nsOrder}` ]  : isNotNil(this.nsOrder),
            [ `${this.prefixCls}-offset-${this.nsOffset}` ]: isNotNil(this.nsOffset),
            [ `${this.prefixCls}-pull-${this.nsPull}` ]    : isNotNil(this.nsPull),
            [ `${this.prefixCls}-push-${this.nsPush}` ]    : isNotNil(this.nsPush),
            ...this.generateClass()
        };
        this.updateHostClass(this.el, classMap);
    }

    private generateClass(): object {
        const listOfSizeInputName = [ 'nsXs', 'nsSm', 'nsMd', 'nsLg', 'nsXl', 'nsXXl' ];
        const listClassMap = {};
        listOfSizeInputName.forEach(name => {
            const sizeName = name.replace('nz', '').toLowerCase();
            if (isNotNil(this[ name ])) {
            if ((typeof(this[ name ]) === 'number') || (typeof (this[ name ]) === 'string')) {
                listClassMap[ `${this.prefixCls}-${sizeName}-${this[ name ]}` ] = true;
            } else {
                listClassMap[ `${this.prefixCls}-${sizeName}-${this[ name ].span}` ] = this[ name ] && isNotNil(this[ name ].span);
                listClassMap[ `${this.prefixCls}-${sizeName}-pull-${this[ name ].pull}` ] = this[ name ] && isNotNil(this[ name ].pull);
                listClassMap[ `${this.prefixCls}-${sizeName}-push-${this[ name ].push}` ] = this[ name ] && isNotNil(this[ name ].push);
                listClassMap[ `${this.prefixCls}-${sizeName}-offset-${this[ name ].offset}` ] = this[ name ] && isNotNil(this[ name ].offset);
                listClassMap[ `${this.prefixCls}-${sizeName}-order-${this[ name ].order}` ] = this[ name ] && isNotNil(this[ name ].order);
            }
            }

        });
        return listClassMap;
    }

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2,
        @Optional() @Host() private nsRowComponent: NsRowComponent,
        @Optional() @Host() private nsRowDirective: NsRowDirective
    ) {
        super(renderer);
        this.el = this.elementRef.nativeElement;
    }

    ngOnInit() {
        this.setClassMap();
    }

    ngOnChanges() {
        this.setClassMap();
    }
    
}