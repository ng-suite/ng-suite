import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSuiteModule } from 'ng-suite';

import { NsCodeBoxModule } from "./ns-codebox";


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgSuiteModule,
        NsCodeBoxModule
    ],
    exports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgSuiteModule,
        NsCodeBoxModule
    ]
})
export class ShareModule {}