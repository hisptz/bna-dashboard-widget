import { Injectable } from '@angular/core';

import { NgxDhis2HttpClientService } from 'ngx-dhis2-http-client';

@Injectable({
  providedIn: 'root'
})
export class RootCauseAnalysisWidgetService {

  constructor(private http: NgxDhis2HttpClientService) { }
  getWidget () {
    return this.http.get("dataStore/bnaWidget");
  }
  createtWidget () { }
}

