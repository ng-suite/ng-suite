import { Directive } from "@angular/core";
import { NsColComponent } from "./ns-col.component";

@Directive({
    selector: '[ns-col]'
})
export class NsColDirective extends NsColComponent {}