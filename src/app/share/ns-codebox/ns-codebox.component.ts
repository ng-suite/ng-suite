import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector     : 'ns-code-box',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './ns-codebox.component.html',
  styleUrls    : [ './ns-codebox.less']
})
export class NsCodeBoxComponent implements OnInit {

  @Input() nsTitle: string;
  @Input() nsId: string;
  
  constructor() {

  }

  ngOnInit() {
  }
}
