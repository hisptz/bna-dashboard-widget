import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnChanges,
} from '@angular/core';
import { find } from 'lodash';
import { DataElement } from 'src/app/store/models/data-element.model';

@Component({
  selector: 'app-data-item',
  templateUrl: './data-item.component.html',
  styleUrls: ['./data-item.component.css'],
})
export class DataItemComponent implements OnInit, OnChanges {
  @Input() dataElement: DataElement;
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

  @Output() dataValuesUpdate: EventEmitter<{
    [id: string]: [string];
  }> = new EventEmitter<{
    [id: string]: [string];
  }>();

  constructor() {}

  ngOnChanges() {
    this._setSelectionOptions();
  }

  ngOnInit(): void {}

  onDataValueUpdate(e, groupSelection?: boolean) {
    if (e) {
      let value = e.value;

      if (e.target) {
        e.stopPropagation();
        value = e.target.value ? e.target.value.trim() : undefined;
      }

      if (value) {
        if (groupSelection) {
          const selectedOption = find(this.selectionOptions, ['id', value]);

          this.dataValuesUpdate.emit({
            [this.dataElement.id]: selectedOption ? selectedOption.name : '',
            [this.dataElement.associatedId]: value,
          });
        } else {
          this.dataValueUpdate.emit({
            id: this.dataElement.id,
            value,
          });
        }
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
