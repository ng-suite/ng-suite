import { Component } from "@angular/core";

@Component({
    selector: 'ns-demo-grid-basic',
    template: `
    <div ns-row>
        <div ns-col nsSpan="12">col-12</div>
        <div ns-col nsSpan="12">col-12</div>
    </div>
    <div ns-row>
        <div ns-col nsSpan="8">col-8</div>
        <div ns-col nsSpan="8">col-8</div>
        <div ns-col nsSpan="8">col-8</div>
    </div>
    <div ns-row>
        <div ns-col nsSpan="6">col-6</div>
        <div ns-col nsSpan="6">col-6</div>
        <div ns-col nsSpan="6">col-6</div>
        <div ns-col nsSpan="6">col-6</div>
    </div>`
})
export class NsDemoGridBasicComponent {}