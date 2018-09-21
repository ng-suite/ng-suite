
import { Component, QueryList, ViewChildren } from '@angular/core';
import { NsCodeBoxComponent } from '../../share/ns-codebox/ns-codebox.component';

@Component({
  selector     : 'ns-demo-{{component}}',
  preserveWhitespaces: false,
  templateUrl  : './{{language}}.html'
})
export class {{componentName}} {
  expanded = false;
  @ViewChildren(NsCodeBoxComponent) codeBoxes: QueryList<NsCodeBoxComponent>;

  goLink(link: string) {
    window.location.hash = link;
  }

  expandAllCode(): void {
    this.expanded = !this.expanded;
    this.codeBoxes.forEach(code => {
      // code.nsExpanded = this.expanded;
    });
  }
{{code}}
{{rawCode}}
}