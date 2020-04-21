import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnChanges,
} from '@angular/core';
import { find } from 'lodash';

@Component({
  selector: 'app-data-item',
  templateUrl: './data-item.component.html',
  styleUrls: ['./data-item.component.css'],
})
export class DataItemComponent implements OnInit, OnChanges {
  @Input() dataElement: any;
  @Input() dataValues: any;
  @Input() isActive: boolean;
  @Input() selectionList: any[];

  selectionOptions: any[];

  @Output() dataValueUpdate: EventEmitter<{
    id: string;
    value: string;
  }> = new EventEmitter<{
    id: string;
    value: string;
  }>();

  constructor() {}

  ngOnChanges() {
    this._setSelectionOptions();
  }

  ngOnInit(): void {}

  onDataValueUpdate(e) {
    if (e) {
      let value = e.value;

      if (e.target) {
        e.stopPropagation();
        value = e.target.value ? e.target.value.trim() : undefined;
      }

      if (value) {
        this.dataValueUpdate.emit({
          id: this.dataElement.id,
          value,
        });
      }
    }
  }

  private _setSelectionOptions() {
    if (!this.dataElement && !this.selectionList) {
      return [];
    }

    const currentGroup = find(this.selectionList, [
      'id',
      this.dataValues[this.dataElement.parentId],
    ]);

    let selectedOptions = !this.dataElement.parentId
      ? this.selectionList
      : currentGroup && currentGroup.members
      ? currentGroup.members
      : [{ id: '', name: '', isDisabled: true }];

    if (!selectedOptions) {
      selectedOptions = [{ id: '', name: '', isDisabled: true }];
    }

    this.selectionOptions = [
      { id: '', name: '-- Select/None --', isDisabled: true },
      ...selectedOptions,
    ];
  }
}
