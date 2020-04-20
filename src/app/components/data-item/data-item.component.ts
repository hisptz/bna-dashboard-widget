import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-data-item',
  templateUrl: './data-item.component.html',
  styleUrls: ['./data-item.component.css'],
})
export class DataItemComponent implements OnInit {
  @Input() dataElement: any;
  @Input() dataValues: any;
  @Input() isActive: boolean;

  @Output() dataValueUpdate: EventEmitter<{
    id: string;
    value: string;
  }> = new EventEmitter<{
    id: string;
    value: string;
  }>();
  constructor() {}

  ngOnInit(): void {}

  onDataValueUpdate(e) {
    if (e) {
      e.stopPropagation();
      const value = e.target ? e.target.value.trim() : undefined;
      if (value) {
        this.dataValueUpdate.emit({
          id: this.dataElement.id,
          value,
        });
      }
    }
  }
}
