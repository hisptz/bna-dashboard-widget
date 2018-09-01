import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-auto-filled-input',
  templateUrl: './auto-filled-input.component.html',
  styleUrls: ['./auto-filled-input.component.css']
})
export class AutoFilledInputComponent implements OnInit {
  @Input() element: any;
  @Input() orgUnit: string;
  @Input() period: string;
  @Input() dashboard: string;
  displayText: string;

  constructor() { }  
  ngOnInit() {
    this.displayText = this.textIdentifier();
  }

  textIdentifier(): string{
    if(this.element.name == 'OrgUnit'){
      return this.orgUnit;
    }else if(this.element.name == 'Period'){
      return this.period;
    }else if(this.element.name == 'Intervention'){
      return this.dashboard;
    }else{
      return this.element.name;
    }
  }

}
