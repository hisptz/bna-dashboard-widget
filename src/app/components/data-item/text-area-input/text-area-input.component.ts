import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-text-area-input',
  templateUrl: './text-area-input.component.html',
  styleUrls: ['./text-area-input.component.css']
})
export class TextAreaInputComponent implements OnInit {
  @Input() element: any;
  constructor() { }

  ngOnInit() {
  }

}
