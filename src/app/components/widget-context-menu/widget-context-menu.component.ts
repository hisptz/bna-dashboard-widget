import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-widget-context-menu',
  templateUrl: './widget-context-menu.component.html',
  styleUrls: ['./widget-context-menu.component.css']
})
export class WidgetContextMenuComponent implements OnInit {
  @Input()
  x;
  @Input()
  y;
  @Input()
  dataItem;

  @Output()
  openEditForm: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  onToggleEdit(e, dataItem) {
    // console.log(dataItem);
    this.openEditForm.emit({
      [dataItem]: this.dataItem,
      [this.dataItem.isActive]: true
    });
  }
}
