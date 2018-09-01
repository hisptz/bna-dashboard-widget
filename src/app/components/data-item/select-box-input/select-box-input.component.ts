import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-select-box-input',
  templateUrl: './select-box-input.component.html',
  styleUrls: ['./select-box-input.component.css']
})
export class SelectBoxInputComponent implements OnInit {
  @Input() element: any;
  constructor() { }

  ngOnInit() {
  }

}
