import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NsRowComponent } from "./ns-row.component";
import { NsColComponent } from "./ns-col.component";
import { NsRowDirective } from "./ns-row.directive";
import { NsColDirective } from "./ns-col.directive";

@NgModule({
    declarations: [ NsRowComponent, NsRowDirective, NsColComponent, NsColDirective  ],
    exports     : [ NsRowComponent, NsRowDirective, NsColComponent, NsColDirective  ],
    imports     : [ CommonModule ]
})
export class NsGridModule {}