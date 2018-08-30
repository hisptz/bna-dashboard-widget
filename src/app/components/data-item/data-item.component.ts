import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-data-item',
  templateUrl: './data-item.component.html',
  styleUrls: ['./data-item.component.css']
})
export class DataItemComponent implements OnInit {
@Input() dataSetElement: any;
@Input() rowData: any;
  constructor() { }

  ngOnInit() {
    console.log( 'DataElement', this.dataSetElement);
    console.log( 'DataArray', this.rowData);
  }
  

}
