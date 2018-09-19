import { Directive } from "@angular/core";
import { NsRowComponent } from "./ns-row.component";

@Directive({
    selector: '[ns-row]'
})
export class NsRowDirective extends NsRowComponent {}