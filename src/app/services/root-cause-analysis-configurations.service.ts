import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService} from '@hisptz/ngx-dhis2-http-client';
import { RootCauseAnalysisConfigurations } from '../models/root-cause-analysis-configurations';
import * as helper from '../helpers/index';
import {catchError,map} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RootCauseAnalysisConfigurationsService {

  constructor(private http: NgxDhis2HttpClientService) { }
  getConfigurationId(){
    return 'myrcaconfig';
  }
  getConfiguration(configurationId) {
    return this.http.get(`dataStore/rca-config/${configurationId}`).pipe(catchError((error: any) => {
      if (error.status !== 404) {
              return throwError(error);
      }
      const dataSetElementDetails: any = [ {
        dataElementName: "OrgUnit",
        dataElementId: helper.generateUid(),
        valueType: "AUTO_FILLED",
        isLabel: true,
        isInput: false,
        isSelect: false
      },
      {
        dataElementName: "Period",
        dataElementId: helper.generateUid(),
        valueType: "AUTO_FILLED",
        isLabel: true,
        isInput: false,
        isSelect: false
      },
      {
        dataElementName: "Intervention",
        dataElementId: helper.generateUid(),
        valueType: "AUTO_FILLED",
        isLabel: true,
        isInput: false,
        isSelect: false
      },
      {
        dataElementName: "Bottleneck",
        dataElementId: helper.generateUid(),
        valueType: "TEXT",
        isLabel: false,
        isInput: false,
        isSelect: true
      },
      {
        dataElementName: "Indicator",
        dataElementId: helper.generateUid(),
        valueType: "TEXT",
        isLabel: false,
        isInput: false,
        isSelect: true
      },
      {
        dataElementName: "Root cause",
        dataElementId: helper.generateUid(),
        valueType: "TEXT",
        isLabel: false,
        isInput: true,
        isSelect: false
      },
      {
        dataElementName: "Solution",
        dataElementId: helper.generateUid(),
        valueType: "TEXT",
        isLabel: false,
        isInput: true,
        isSelect: false
      }];
      const configurationObject: RootCauseAnalysisConfigurations = {id: configurationId, configurationName:"Root Cause Analysis Widget", datasetElements: dataSetElementDetails };
        return this.http.post('dataStore/rca-config/' + configurationObject.id, configurationObject).pipe(map(() => {
          this.http.get(`dataStore/rca-config/${configurationId}`)
        }
      )
      );
  })
  )
  }

}
